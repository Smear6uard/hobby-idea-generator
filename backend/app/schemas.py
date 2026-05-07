from pydantic import BaseModel, Field


class HobbyRequest(BaseModel):
    interests: str = Field(min_length=1, max_length=500)
    weekly_time: str = Field(min_length=1, max_length=100)
    budget: str = Field(min_length=1, max_length=100)


class HobbyMeta(BaseModel):
    model: str
    latency_ms: int
    fallback_used: bool


class HobbyItem(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    materials: list[str] = Field(default_factory=list, max_length=6)


class HobbyResponse(BaseModel):
    hobbies: list[HobbyItem]
    meta: HobbyMeta
