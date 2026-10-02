export interface AttentionRegion {
  id: number;
  rank: number;
  label: string;
  bbox: [number, number, number, number]; // [x, y, width, height]
  share_percent: number;
  reason: string;
  category: 'face' | 'text' | 'contrast' | 'object' | 'focal_point' | string;
}

export interface AttentionJourneyStep {
  step: number;
  label: string;
  target: string;
  bbox: [number, number, number, number];
  description: string;
}

export interface SignalScores {
  saliency: number;
  face: number;
  text: number;
  contrast: number;
  color: number;
  composition: number;
}

export interface PipelineStepStatus {
  step_name: string;
  status: 'completed' | 'fallback' | 'skipped';
  details?: string;
}

export interface ImageMetadata {
  filename: string;
  width: number;
  height: number;
  aspect_ratio: string;
  original_width: number;
  original_height: number;
  format: string;
}

export interface AnalysisResponse {
  success: boolean;
  attention_score: number;
  score_label: string;
  image_metadata: ImageMetadata;
  original_image: string; // Base64 Data URI
  heatmap?: string; // Base64 Data URI
  journey: AttentionJourneyStep[];
  regions: AttentionRegion[];
  signals: SignalScores;
  recommendations: string[];
  why_analysis: string[];
  pipeline_steps: PipelineStepStatus[];
  warnings: string[];
  scientific_disclaimer: string;
}

export interface ExplainResponse {
  success: boolean;
  strongest_area: string;
  second_strongest: string;
  competing_elements: string;
  visual_hierarchy: string;
  likely_distractions: string;
  recommendations: string[];
  source: 'ai_gemini' | 'ai_openai' | 'rule_based';
}
