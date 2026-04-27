# Hobby Generator MVP

Client-server web app that generates hobby ideas from user preferences using Together.ai.

## Stack
- Frontend: React + TypeScript + Vite
- Backend: FastAPI
- LLM: Together.ai chat completions

## MVP Features
- Single-page UI with 3 inputs: interests, weekly time, budget
- Generates hobby list through backend API
- Edit inputs and regenerate
- Guest-only flow
- Stateless backend

## Project Structure
- `frontend/` Vite app
- `backend/` FastAPI app

## Local Setup

### 1) Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set `APP_TOGETHER_API_KEY` in `backend/.env`.

Run API:
```bash
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Contract

### POST `/api/generate-hobbies`
Request:
```json
{
  "interests": "creative and active hobbies",
  "weekly_time": "3 hours",
  "budget": "$50"
}
```

Response:
```json
{
  "hobbies": ["Hobby A", "Hobby B"],
  "meta": {
    "model": "model-name",
    "latency_ms": 456,
    "fallback_used": false
  }
}
```

## Guardrails and Cost Controls
- JSON-first parsing with fallback extraction
- Low temperature and max tokens cap
- Request timeout and basic per-IP rate limiting

## Deployment Notes
- Frontend: Vercel/Netlify free tier
- Backend: Render/Railway free or low tier
- Configure environment variables in hosting dashboards

## Smoke Test Checklist
- `GET /health` returns `{"status":"ok"}`
- Valid form submission returns hobby list
- Empty input is blocked on client side
- Invalid/missing API key surfaces backend error
- Repeated rapid requests eventually return `429`
