from pydantic import BaseModel, Field


class HobbyRequest(BaseModel):
    interests: str = Field(min_length=1, max_length=500)
    weekly_time: str = Field(min_length=1, max_length=100)
    budget: str = Field(min_length=1, max_length=100)


class HobbyMeta(BaseModel):
    model: str
    latency_ms: int
    fallback_used: bool


class HobbyResponse(BaseModel):
    hobbies: list[str]
    meta: HobbyMeta
