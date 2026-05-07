from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    together_api_key: str = ""
    together_api_url: str = "https://api.together.xyz/v1/chat/completions"
    together_model: str = "Qwen/Qwen2.5-7B-Instruct-Turbo"
    request_timeout_seconds: int = 20
    max_output_tokens: int = 1024
    rate_limit_per_minute: int = 20
    frontend_origin: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=(".env", "../frontend/.env"),
        env_prefix="APP_",
        extra="ignore",
    )


settings = Settings()
