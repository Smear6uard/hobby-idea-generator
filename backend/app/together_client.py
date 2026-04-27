from time import perf_counter

import httpx

from .config import settings
from .schemas import HobbyRequest


def _build_prompt(payload: HobbyRequest) -> str:
    return (
        "You are a hobby recommendation assistant.\n"
        "Given the user profile, suggest exactly 8 beginner-friendly hobbies.\n"
        "Return ONLY valid JSON as an array of hobby names.\n"
        f"Interests: {payload.interests}\n"
        f"Weekly time: {payload.weekly_time}\n"
        f"Budget: {payload.budget}\n"
    )


async def generate_from_together(payload: HobbyRequest) -> tuple[str, int, str]:
    prompt = _build_prompt(payload)
    body = {
        "model": settings.together_model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.4,
        "max_tokens": settings.max_output_tokens,
    }

    headers = {
        "Authorization": f"Bearer {settings.together_api_key}",
        "Content-Type": "application/json",
    }

    start = perf_counter()
    async with httpx.AsyncClient(timeout=settings.request_timeout_seconds) as client:
        response = await client.post(settings.together_api_url, json=body, headers=headers)
        response.raise_for_status()
    latency_ms = int((perf_counter() - start) * 1000)

    data = response.json()
    content = data["choices"][0]["message"]["content"]
    model = data.get("model", settings.together_model)
    return content, latency_ms, model
