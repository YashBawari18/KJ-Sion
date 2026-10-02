import io
import re
import json
import base64
import logging
import urllib.request
from typing import Optional, Tuple, Dict, Any
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from PIL import Image

from app.config import settings
from app.schemas import (
    AnalysisResponse,
    YouTubeAnalyzeRequest,
    ExplainRequest,
    ExplainResponse,
    SignalScores,
    PipelineStepStatus,
    AttentionJourneyStep,
    AttentionRegion
)
from app.cv_engine import engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("thumbnail_iq")

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Predicted visual attention analysis for YouTube thumbnails."
)

# Enable CORS for local Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing Thumbnail IQ Backend with real CV Engine...")
    # Demo safety warmup: Run a dummy 100x100 analysis to warm up OpenCV kernels
    try:
        dummy = Image.new("RGB", (160, 90), color=(100, 100, 100))
        engine.run_pipeline(dummy)
        logger.info("CV Engine warmed up successfully for instant demo response.")
    except Exception as e:
        logger.warning(f"Engine warmup completed with notice: {e}")

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Thumbnail IQ API",
        "version": settings.app_version,
        "docs_url": "/docs",
        "health_url": "/health"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Thumbnail IQ API",
        "version": settings.app_version,
        "cv_engine": "OpenCV Multi-Signal Attention Fusion",
        "disclaimer": "Predicted visual attention, not real eye tracking."
    }

def image_to_base64(pil_image: Image.Image, format: str = "JPEG") -> str:
    buffered = io.BytesIO()
    if format.upper() == "JPEG" and pil_image.mode in ("RGBA", "P"):
        pil_image = pil_image.convert("RGB")
    pil_image.save(buffered, format=format, quality=92)
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    mime = "image/jpeg" if format.upper() == "JPEG" else f"image/{format.lower()}"
    return f"data:{mime};base64,{img_str}"

def cv_image_to_base64(cv_bgr: np.ndarray, format: str = ".jpg") -> str:
    success, buffer = cv2.imencode(format, cv_bgr, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
    if not success:
        raise ValueError("Failed to encode CV image to base64")
    b64 = base64.b64encode(buffer).decode("utf-8")
    mime = "image/jpeg" if format.lower() in (".jpg", ".jpeg") else "image/png"
    return f"data:{mime};base64,{b64}"

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_thumbnail(file: UploadFile = File(...)):
    # 1. Validation
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file format. Please upload a PNG, JPG, JPEG, or WebP image."
        )

    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported image type: {file.content_type}. Please upload PNG, JPG, or WebP."
        )

    try:
        contents = await file.read()
        max_bytes = settings.max_upload_size_mb * 1024 * 1024
        if len(contents) > max_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File exceeds maximum upload size of {settings.max_upload_size_mb}MB."
            )

        # 2. Parse Image with PIL
        try:
            image = Image.open(io.BytesIO(contents))
            image.verify()  # verify integrity
            image = Image.open(io.BytesIO(contents))
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Corrupted or unreadable image file. Please try another image."
            )

        orig_w, orig_h = image.size

        # 3. Resize if oversized while preserving aspect ratio
        target_max = settings.max_dimension
        if max(orig_w, orig_h) > target_max:
            image.thumbnail((target_max, target_max), Image.Resampling.LANCZOS)
            logger.info(f"Resized image from ({orig_w}x{orig_h}) to {image.size}")

        proc_w, proc_h = image.size

        # 4. Convert original image back to base64 Data URI
        orig_base64 = image_to_base64(image, format="JPEG" if image.format != "PNG" else "PNG")

        # 5. Execute Real Attention Fusion Pipeline (Stage B)
        cv_result = engine.run_pipeline(image)

        # 6. Encode generated Heatmap Overlay to Base64 Data URI
        heatmap_base64 = cv_image_to_base64(cv_result["heatmap_bgr"])

        return AnalysisResponse(
            success=True,
            attention_score=cv_result["attention_score"],
            score_label="Prototype Design Score",
            image_metadata={
                "filename": file.filename or "uploaded_thumbnail",
                "width": proc_w,
                "height": proc_h,
                "aspect_ratio": f"{proc_w}:{proc_h}",
                "original_width": orig_w,
                "original_height": orig_h,
                "format": image.format or "JPEG"
            },
            original_image=orig_base64,
            heatmap=heatmap_base64,
            journey=cv_result["journey"],
            regions=cv_result["regions"],
            signals=cv_result["signals"],
            recommendations=cv_result["recommendations"],
            why_analysis=cv_result["why_analysis"],
            pipeline_steps=cv_result["pipeline_steps"],
            warnings=cv_result["warnings"],
            scientific_disclaimer="Predicted visual attention, not real eye tracking."
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing the thumbnail. Please try again or use another image."
        )

from app.llm_explainer import explainer

def extract_youtube_id(url_or_id: str) -> Optional[str]:
    """Extract standard 11-char YouTube video ID from various URL formats or raw ID."""
    clean = url_or_id.strip()
    patterns = [
        r'(?:v=|\/)([0-9A-Za-z_-]{11})(?:\S+)?',
        r'youtu\.be\/([0-9A-Za-z_-]{11})',
        r'shorts\/([0-9A-Za-z_-]{11})',
        r'embed\/([0-9A-Za-z_-]{11})',
        r'^([0-9A-Za-z_-]{11})$'
    ]
    for pattern in patterns:
        match = re.search(pattern, clean)
        if match:
            return match.group(1)
    return None

def fetch_youtube_metadata(video_id: str) -> Dict[str, Any]:
    """Fetch official video title and channel details using YouTube oEmbed (no API key required)."""
    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    req = urllib.request.Request(
        oembed_url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    )
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                data = json.loads(response.read().decode("utf-8"))
                return {
                    "title": data.get("title", f"YouTube Video ({video_id})"),
                    "channel_name": data.get("author_name", "YouTube Creator"),
                    "channel_url": data.get("author_url", None),
                    "provider": data.get("provider_name", "YouTube"),
                    "thumbnail_url": data.get("thumbnail_url", f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg")
                }
    except Exception as e:
        logger.warning(f"oEmbed fetch fallback for {video_id}: {e}")
    
    return {
        "title": f"YouTube Video ({video_id})",
        "channel_name": "YouTube Creator",
        "channel_url": f"https://www.youtube.com/watch?v={video_id}",
        "provider": "YouTube",
        "thumbnail_url": f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
    }

def fetch_youtube_thumbnail(video_id: str) -> Tuple[Image.Image, str]:
    """Fetch the highest available resolution thumbnail directly from YouTube CDN."""
    resolutions = [
        f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg",
        f"https://img.youtube.com/vi/{video_id}/sddefault.jpg",
        f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg",
    ]
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

    for url in resolutions:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=6) as response:
                if response.status == 200:
                    data = response.read()
                    # Some YouTube placeholders are 1x1 or < 2KB gray error thumbs
                    if len(data) > 3000:
                        img = Image.open(io.BytesIO(data))
                        img.verify()
                        img = Image.open(io.BytesIO(data))
                        return img, url
        except Exception:
            continue

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Unable to download a valid thumbnail for YouTube Video ID '{video_id}'. The video may be private or unavailable."
    )

@app.post("/youtube/analyze", response_model=AnalysisResponse)
async def analyze_youtube_video(req: YouTubeAnalyzeRequest):
    """
    Fetch live video metadata and highest-resolution thumbnail directly from YouTube,
    then execute the full Attention & Heatmap pipeline.
    """
    video_id = extract_youtube_id(req.url)
    if not video_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid YouTube link. Please provide a valid YouTube URL (e.g. https://www.youtube.com/watch?v=... or youtu.be/...)."
        )

    logger.info(f"Fetching real YouTube data for Video ID: {video_id}")
    
    # 1. Fetch metadata (Title, Channel, Author URL)
    meta = fetch_youtube_metadata(video_id)
    
    # 2. Fetch real thumbnail image from YouTube CDN
    image, thumb_url = fetch_youtube_thumbnail(video_id)
    orig_w, orig_h = image.size

    # 3. Resize if oversized
    target_max = settings.max_dimension
    if max(orig_w, orig_h) > target_max:
        image.thumbnail((target_max, target_max), Image.Resampling.LANCZOS)

    proc_w, proc_h = image.size

    # 4. Convert original to base64 Data URI
    orig_base64 = image_to_base64(image, format="JPEG")

    # 5. Execute Attention Pipeline
    cv_result = engine.run_pipeline(image)

    # 6. Encode generated Heatmap Overlay to Base64
    heatmap_base64 = cv_image_to_base64(cv_result["heatmap_bgr"])

    youtube_payload = {
        "video_id": video_id,
        "title": meta["title"],
        "channel_name": meta["channel_name"],
        "channel_url": meta.get("channel_url"),
        "thumbnail_url": thumb_url,
        "youtube_url": f"https://www.youtube.com/watch?v={video_id}"
    }

    return AnalysisResponse(
        success=True,
        attention_score=cv_result["attention_score"],
        score_label="Prototype Design Score",
        image_metadata={
            "filename": f"{video_id}.jpg",
            "title": meta["title"],
            "channel": meta["channel_name"],
            "width": proc_w,
            "height": proc_h,
            "aspect_ratio": f"{proc_w}:{proc_h}",
            "original_width": orig_w,
            "original_height": orig_h,
            "format": "JPEG"
        },
        original_image=orig_base64,
        heatmap=heatmap_base64,
        journey=cv_result["journey"],
        regions=cv_result["regions"],
        signals=cv_result["signals"],
        recommendations=cv_result["recommendations"],
        why_analysis=cv_result["why_analysis"],
        pipeline_steps=cv_result["pipeline_steps"],
        warnings=cv_result["warnings"],
        scientific_disclaimer="Predicted visual attention, not real eye tracking.",
        youtube_info=youtube_payload
    )

@app.post("/explain", response_model=ExplainResponse)
async def explain_analysis(req: ExplainRequest):
    try:
        return await explainer.explain(req.analysis_data, req.title)
    except Exception as e:
        logger.error(f"Explanation error: {e}", exc_info=True)
        return explainer._rule_based_fallback(req.analysis_data, req.title)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

