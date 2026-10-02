import io
import base64
import logging
from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from PIL import Image

from app.config import settings
from app.schemas import (
    AnalysisResponse,
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

@app.post("/explain", response_model=ExplainResponse)
async def explain_analysis(req: ExplainRequest):
    # Rule-based fallback explanation
    analysis = req.analysis_data
    regions = analysis.get("regions", [])
    signals = analysis.get("signals", {})

    strongest = "Central focal subjectCommanding prominent first-look fixation."
    second_strongest = "Supporting visual elements in adjacent composition quadrant."
    if len(regions) > 0:
        strongest = f"{regions[0].get('label', 'Primary Area')}: {regions[0].get('reason', '')}"
    if len(regions) > 1:
        second_strongest = f"{regions[1].get('label', 'Secondary Area')}: {regions[1].get('reason', '')}"

    competing = (
        "Clear hierarchy observed."
        if len(regions) < 2 or (regions[0].get("share_percent", 50) > 55)
        else "Competing visual weights detected between subject and secondary graphics. Consider increasing primary contrast."
    )

    return ExplainResponse(
        success=True,
        strongest_area=strongest,
        second_strongest=second_strongest,
        competing_elements=competing,
        visual_hierarchy="Clear sequential scanning path from primary anchor to secondary copy.",
        likely_distractions="Verify bottom-right corner is clear of YouTube's duration timestamp overlay.",
        recommendations=analysis.get("recommendations", [
            "Maintain strong contrast on key subject.",
            "Test legibility on mobile feed card."
        ]),
        source="rule_based"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
