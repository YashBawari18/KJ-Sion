import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class AttentionWeights(BaseModel):
    saliency: float = 0.35
    face: float = 0.20
    text: float = 0.15
    contrast: float = 0.10
    color: float = 0.10
    composition: float = 0.10

class Settings(BaseModel):
    app_name: str = "Thumbnail IQ API"
    app_version: str = "1.0.0"
    max_upload_size_mb: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", "10"))
    max_dimension: int = int(os.getenv("MAX_IMAGE_DIMENSION", "1920"))
    default_weights: AttentionWeights = AttentionWeights()
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    llm_provider: str = os.getenv("LLM_PROVIDER", "gemini") # or "openai" or "fallback"

settings = Settings()
