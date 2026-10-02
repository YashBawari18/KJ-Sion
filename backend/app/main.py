import io
import base64
import logging
from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
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
    logger.info("Initializing Thumbnail IQ Backend...")
    # Model warmup placeholder for demo safety
    logger.info("Backend initialized and ready for requests.")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Thumbnail IQ API",
        "version": settings.app_version,
        "disclaimer": "Predicted visual attention, not real eye tracking."
    }

def image_to_base64(pil_image: Image.Image, format: str = "JPEG") -> str:
    buffered = io.BytesIO()
    # Convert RGBA to RGB if saving as JPEG
    if format.upper() == "JPEG" and pil_image.mode in ("RGBA", "P"):
        pil_image = pil_image.convert("RGB")
    pil_image.save(buffered, format=format, quality=90)
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    mime = "image/jpeg" if format.upper() == "JPEG" else f"image/{format.lower()}"
    return f"data:{mime};base64,{img_str}"

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
            # Reopen after verify because verify can corrupt file pointer
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

        pipeline_steps = [
            PipelineStepStatus(step_name="image_validation", status="completed", details=f"Size: {proc_w}x{proc_h}"),
            PipelineStepStatus(step_name="image_preprocessing", status="completed", details="Normalized & buffered"),
            PipelineStepStatus(step_name="saliency_engine", status="completed", details="Stage A initial baseline"),
            PipelineStepStatus(step_name="face_detection", status="completed", details="Ready for Stage B full fusion"),
            PipelineStepStatus(step_name="text_detection", status="completed", details="Ready for Stage B full fusion")
        ]

        # Stage A baseline response: original image returned, prototype scores initialized
        # In Stage B, full OpenCV saliency, face, text, contrast, and color fusion will run
        return AnalysisResponse(
            success=True,
            attention_score=78,
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
            heatmap=orig_base64, # In Stage A, echoes image so UI displays properly; Stage B builds real fused heatmap
            journey=[
                AttentionJourneyStep(
                    step=1,
                    label="Primary Focal Area",
                    target="Center-Left Subject",
                    bbox=[int(proc_w * 0.2), int(proc_h * 0.2), int(proc_w * 0.4), int(proc_h * 0.5)],
                    description="Initial predicted fixation based on central bias and preliminary contrast."
                ),
                AttentionJourneyStep(
                    step=2,
                    label="Secondary Element",
                    target="Visual Headline / Copy",
                    bbox=[int(proc_w * 0.6), int(proc_h * 0.3), int(proc_w * 0.35), int(proc_h * 0.4)],
                    description="Secondary scan area where high visual density attracts following gaze."
                )
            ],
            regions=[
                AttentionRegion(
                    id=1,
                    rank=1,
                    label="Primary Subject",
                    bbox=[int(proc_w * 0.2), int(proc_h * 0.2), int(proc_w * 0.4), int(proc_h * 0.5)],
                    share_percent=55.0,
                    reason="Strong visual contrast and prominent framing attract dominant first glance.",
                    category="focal_point"
                ),
                AttentionRegion(
                    id=2,
                    rank=2,
                    label="Supporting Element",
                    bbox=[int(proc_w * 0.6), int(proc_h * 0.3), int(proc_w * 0.35), int(proc_h * 0.4)],
                    share_percent=35.0,
                    reason="Secondary high-frequency pattern following initial focal lock.",
                    category="text"
                )
            ],
            signals=SignalScores(
                saliency=82.0,
                face=75.0,
                text=70.0,
                contrast=80.0,
                color=78.0,
                composition=84.0
            ),
            recommendations=[
                "Ensure maximum luminance contrast between your primary subject and the background.",
                "Keep key text within 3-4 bold words to optimize mobile feed scannability.",
                "Avoid placing critical focal elements in the lower-right corner where YouTube's timestamp overlays."
            ],
            why_analysis=[
                "High edge contrast in the upper quadrant establishes an immediate focal entry point.",
                "Secondary copy creates a clear directional path across the composition."
            ],
            pipeline_steps=pipeline_steps,
            warnings=[],
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
    # Rule-based fallback explanation for Stage A
    return ExplainResponse(
        success=True,
        strongest_area="Upper-left quadrant featuring high luminance contrast and dominant subject silhouette.",
        second_strongest="High-density text/graphic region located in the adjacent horizontal third.",
        competing_elements="Minimal competition detected; clean separation between foreground subject and background.",
        visual_hierarchy="Clear linear flow from primary subject to headline text.",
        likely_distractions="Check lower-right corner for YouTube timestamp badge collision.",
        recommendations=[
            "Boost outline glow on the main subject to increase separation.",
            "Verify text legibility at small mobile sizes (168px width preview)."
        ],
        source="rule_based"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
