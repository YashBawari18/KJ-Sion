from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class AttentionRegion(BaseModel):
    id: int
    rank: int
    label: str
    bbox: List[int] = Field(..., description="[x, y, width, height] in normalized or pixel coordinates")
    share_percent: float = Field(..., description="Estimated relative attention share (%)")
    reason: str
    category: str = Field(..., description="e.g. face, text, contrast, object, focal_point")

class AttentionJourneyStep(BaseModel):
    step: int
    label: str
    target: str
    bbox: List[int]
    description: str

class SignalScores(BaseModel):
    saliency: float = Field(default=0.0, description="Normalized score 0-100")
    face: float = Field(default=0.0, description="Normalized score 0-100")
    text: float = Field(default=0.0, description="Normalized score 0-100")
    contrast: float = Field(default=0.0, description="Normalized score 0-100")
    color: float = Field(default=0.0, description="Normalized score 0-100")
    composition: float = Field(default=0.0, description="Normalized score 0-100")

class PipelineStepStatus(BaseModel):
    step_name: str
    status: str  # "completed", "fallback", "skipped"
    details: Optional[str] = None

class AnalysisResponse(BaseModel):
    success: bool = True
    attention_score: int = Field(..., description="Overall attention/design prototype score (0-100)")
    score_label: str = Field(default="Prototype Design Score", description="Scientific disclaimer label")
    image_metadata: Dict[str, Any]
    original_image: str = Field(..., description="Base64 Data URI of original image")
    heatmap: Optional[str] = Field(default=None, description="Base64 Data URI of generated attention heatmap")
    journey: List[AttentionJourneyStep] = []
    regions: List[AttentionRegion] = []
    signals: SignalScores
    recommendations: List[str] = []
    why_analysis: List[str] = []
    pipeline_steps: List[PipelineStepStatus] = []
    warnings: List[str] = []
    scientific_disclaimer: str = "Predicted visual attention, not real eye tracking."
    youtube_info: Optional[Dict[str, Any]] = None

class YouTubeAnalyzeRequest(BaseModel):
    url: str = Field(..., description="YouTube video URL, youtu.be link, or video ID")

class ExplainRequest(BaseModel):
    analysis_data: Dict[str, Any]
    title: Optional[str] = None

class ExplainResponse(BaseModel):
    success: bool = True
    strongest_area: str
    second_strongest: str
    competing_elements: str
    visual_hierarchy: str
    likely_distractions: str
    recommendations: List[str]
    source: str = Field(default="rule_based", description="'ai_gemini', 'ai_openai', or 'rule_based'")
