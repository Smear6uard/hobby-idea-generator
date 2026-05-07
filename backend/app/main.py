import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .parser import parse_hobby_items
from .rate_limiter import InMemoryRateLimiter
from .schemas import HobbyItem, HobbyMeta, HobbyRequest, HobbyResponse
from .together_client import generate_from_together

app = FastAPI(title="Hobby Generator API")
rate_limiter = InMemoryRateLimiter(max_requests_per_minute=settings.rate_limit_per_minute)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/generate-hobbies", response_model=HobbyResponse)
async def generate_hobbies(payload: HobbyRequest, request: Request) -> HobbyResponse:
    client_ip = request.client.host if request.client else "unknown"
    if not rate_limiter.allow(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")

    if not settings.together_api_key:
        raise HTTPException(status_code=500, detail="Missing Together API key configuration.")

    try:
        raw_content, latency_ms, model = await generate_from_together(payload)
    except httpx.TimeoutException as exc:
        raise HTTPException(status_code=504, detail="LLM request timed out. Please retry.") from exc
    except httpx.HTTPStatusError as exc:
        provider_detail = exc.response.text.strip() or str(exc)
        raise HTTPException(
            status_code=502,
            detail=f"LLM provider rejected request ({exc.response.status_code}): {provider_detail}",
        ) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"LLM provider error: {exc}") from exc

    pairs, fallback_used = parse_hobby_items(raw_content)
    seen: dict[str, list[str]] = {}
    for name, materials in pairs:
        if name not in seen:
            seen[name] = materials
    hobbies: list[HobbyItem] = [
        HobbyItem(name=n, materials=m[:4]) for n, m in list(seen.items())[:10]
    ]
    if not hobbies:
        raise HTTPException(status_code=502, detail="Could not parse hobby suggestions from model output.")

    return HobbyResponse(
        hobbies=hobbies,
        meta=HobbyMeta(model=model, latency_ms=latency_ms, fallback_used=fallback_used),
    )
