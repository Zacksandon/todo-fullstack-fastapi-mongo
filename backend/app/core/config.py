from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    PORT: int = 10000

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()