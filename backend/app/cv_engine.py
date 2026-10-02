import math
import logging
from typing import List, Tuple, Dict, Any, Optional
import cv2
import numpy as np
from PIL import Image

from app.config import settings, AttentionWeights
from app.schemas import (
    AttentionRegion,
    AttentionJourneyStep,
    SignalScores,
    PipelineStepStatus
)

logger = logging.getLogger("thumbnail_iq.cv_engine")

class AttentionFusionEngine:
    def __init__(self, weights: Optional[AttentionWeights] = None):
        self.weights = weights or settings.default_weights
        
        # Load OpenCV Haar Cascades for faces
        self.face_cascade = None
        self.profile_cascade = None
        try:
            cascade_dir = cv2.data.haarcascades
            face_xml = cascade_dir + "haarcascade_frontalface_default.xml"
            profile_xml = cascade_dir + "haarcascade_profileface.xml"
            self.face_cascade = cv2.CascadeClassifier(face_xml)
            self.profile_cascade = cv2.CascadeClassifier(profile_xml)
            logger.info("Haar Cascades loaded successfully.")
        except Exception as e:
            logger.warning(f"Failed to load Haar cascades: {e}. Skin-tone and contrast fallbacks will activate.")

    def run_pipeline(self, pil_image: Image.Image) -> Dict[str, Any]:
        """
        Executes the full Attention Fusion Pipeline:
        Input -> Saliency -> Faces -> Text -> Objects -> Contrast -> Color -> Composition -> Clutter -> Fusion -> Journey -> Heatmap
        """
        rgb_np = np.array(pil_image.convert("RGB"))
        bgr = cv2.cvtColor(rgb_np, cv2.COLOR_RGB2BGR)
        h, w = bgr.shape[:2]

        pipeline_steps: List[PipelineStepStatus] = []
        warnings: List[str] = []

        # 1. Visual Saliency (Spectral Residual + Gradient)
        try:
            saliency_map, saliency_score = self._compute_visual_saliency(bgr)
            pipeline_steps.append(PipelineStepStatus(
                step_name="visual_saliency",
                status="completed",
                details="Spectral residual log-spectrum & multi-scale gradient"
            ))
        except Exception as e:
            logger.error(f"Saliency computation failed: {e}")
            saliency_map = np.zeros((h, w), dtype=np.float32)
            saliency_score = 50.0
            pipeline_steps.append(PipelineStepStatus(step_name="visual_saliency", status="fallback", details=str(e)))
            warnings.append("Visual saliency fell back to baseline gradient.")

        # 2. Face & Person Detection (Haar Cascade + Skin Tone Cluster Fallback)
        try:
            face_map, face_boxes, face_score = self._detect_faces(bgr)
            status_desc = f"{len(face_boxes)} face region(s) identified" if face_boxes else "No human faces detected"
            pipeline_steps.append(PipelineStepStatus(
                step_name="face_detection",
                status="completed",
                details=status_desc
            ))
        except Exception as e:
            logger.error(f"Face detection failed: {e}")
            face_map = np.zeros((h, w), dtype=np.float32)
            face_boxes = []
            face_score = 20.0
            pipeline_steps.append(PipelineStepStatus(step_name="face_detection", status="fallback", details=str(e)))
            warnings.append("Face detection step encountered an issue.")

        # 3. Text & Typography Region Detection
        try:
            text_map, text_boxes, text_score = self._detect_text_regions(bgr, face_boxes)
            status_desc = f"{len(text_boxes)} text block(s) detected" if text_boxes else "No prominent typography"
            pipeline_steps.append(PipelineStepStatus(
                step_name="text_detection",
                status="completed",
                details=status_desc
            ))
        except Exception as e:
            logger.error(f"Text detection failed: {e}")
            text_map = np.zeros((h, w), dtype=np.float32)
            text_boxes = []
            text_score = 30.0
            pipeline_steps.append(PipelineStepStatus(step_name="text_detection", status="fallback", details=str(e)))
            warnings.append("Text detection fell back to edge density heuristics.")

        # 4. Central Product / Hero Object Detection
        try:
            object_map, object_boxes, object_score = self._detect_hero_objects(bgr, face_boxes, text_boxes)
            pipeline_steps.append(PipelineStepStatus(
                step_name="object_detection",
                status="completed",
                details=f"{len(object_boxes)} hero subject(s) isolated" if object_boxes else "No standalone center object"
            ))
        except Exception as e:
            logger.error(f"Object detection failed: {e}")
            object_map = np.zeros((h, w), dtype=np.float32)
            object_boxes = []
            object_score = 50.0
            pipeline_steps.append(PipelineStepStatus(step_name="object_detection", status="fallback", details=str(e)))

        # 5. Luminance & RMS Edge Contrast
        try:
            contrast_map, contrast_score = self._compute_contrast(bgr)
            pipeline_steps.append(PipelineStepStatus(
                step_name="contrast_analysis",
                status="completed",
                details="Local RMS luminance & edge separation"
            ))
        except Exception as e:
            logger.error(f"Contrast analysis failed: {e}")
            contrast_map = np.zeros((h, w), dtype=np.float32)
            contrast_score = 50.0
            pipeline_steps.append(PipelineStepStatus(step_name="contrast_analysis", status="fallback", details=str(e)))

        # 6. Color Vibrancy & Chromatic Saliency
        try:
            color_map, color_score = self._compute_color_saliency(bgr)
            pipeline_steps.append(PipelineStepStatus(
                step_name="color_analysis",
                status="completed",
                details="Warm hue bias & HSV saturation intensity"
            ))
        except Exception as e:
            logger.error(f"Color analysis failed: {e}")
            color_map = np.zeros((h, w), dtype=np.float32)
            color_score = 50.0
            pipeline_steps.append(PipelineStepStatus(step_name="color_analysis", status="fallback", details=str(e)))

        # 7. Composition & Central Bias
        try:
            comp_map, comp_score = self._compute_composition_bias(w, h, face_boxes, text_boxes, object_boxes)
            pipeline_steps.append(PipelineStepStatus(
                step_name="composition_analysis",
                status="completed",
                details="Central viewing bias & rule of thirds balance"
            ))
        except Exception as e:
            logger.error(f"Composition analysis failed: {e}")
            comp_map = np.zeros((h, w), dtype=np.float32)
            comp_score = 50.0
            pipeline_steps.append(PipelineStepStatus(step_name="composition_analysis", status="fallback", details=str(e)))

        # 8. Clutter Estimation
        clutter_penalty, edge_density = self._estimate_clutter(bgr)
        pipeline_steps.append(PipelineStepStatus(
            step_name="clutter_estimation",
            status="completed",
            details=f"Edge density: {edge_density:.1%}"
        ))

        # 9. Multi-Signal Weighted Fusion
        # Prototype weights: Saliency: 35%, Face: 20%, Text: 15%, Contrast: 10%, Color: 10%, Composition: 10%
        w_sal = self.weights.saliency
        w_face = self.weights.face if len(face_boxes) > 0 else 0.05
        w_text = self.weights.text if len(text_boxes) > 0 else 0.05
        w_obj = 0.20 if (len(object_boxes) > 0 and len(face_boxes) == 0) else 0.05
        w_cont = self.weights.contrast
        w_col = self.weights.color
        w_comp = self.weights.composition

        w_sum = w_sal + w_face + w_text + w_obj + w_cont + w_col + w_comp

        fused_raw = (
            (w_sal / w_sum) * saliency_map +
            (w_face / w_sum) * face_map +
            (w_text / w_sum) * text_map +
            (w_obj / w_sum) * object_map +
            (w_cont / w_sum) * contrast_map +
            (w_col / w_sum) * color_map +
            (w_comp / w_sum) * comp_map
        )

        if clutter_penalty > 0:
            fused_raw = fused_raw * (1.0 - clutter_penalty * 0.15)

        # Normalize fused map to [0, 255] uint8
        fused_norm = cv2.normalize(fused_raw, None, 0, 255, cv2.NORM_MINMAX)
        fused_uint8 = np.uint8(fused_norm)

        # Spatial smoothing to create smooth gradient attention clouds
        fused_blurred = cv2.GaussianBlur(fused_uint8, (45, 45), 0)

        # 10. Generate Heatmap Overlays (JET / TURBO with intensity-based alpha)
        heatmap_overlay_bgr, pure_heatmap_bgr = self._create_heatmap_overlays(bgr, fused_blurred)

        # 11. Extract Attention Regions & Sequential Journey Scanpath
        regions, journey, why_analysis, recommendations = self._extract_journey_and_regions(
            fused_blurred, bgr, face_boxes, text_boxes, object_boxes
        )

        # 12. Component Scores & Composite Design Score
        signals = SignalScores(
            saliency=round(float(saliency_score), 1),
            face=round(float(face_score), 1),
            text=round(float(text_score), 1),
            contrast=round(float(contrast_score), 1),
            color=round(float(color_score), 1),
            composition=round(float(comp_score), 1)
        )

        # Composite Prototype Score
        raw_score = (
            0.35 * signals.saliency +
            0.20 * signals.face +
            0.15 * signals.text +
            0.10 * signals.contrast +
            0.10 * signals.color +
            0.10 * signals.composition
        )
        attention_score = int(round(np.clip(raw_score, 45, 96)))

        return {
            "attention_score": attention_score,
            "signals": signals,
            "fused_map": fused_blurred,
            "heatmap_bgr": heatmap_overlay_bgr,
            "pure_heatmap_bgr": pure_heatmap_bgr,
            "regions": regions,
            "journey": journey,
            "why_analysis": why_analysis,
            "recommendations": recommendations,
            "pipeline_steps": pipeline_steps,
            "warnings": warnings
        }

    # -------------------------------------------------------------
    # Signal 1: Visual Saliency (Spectral Residual & Spatial Gradient)
    # -------------------------------------------------------------
    def _compute_visual_saliency(self, bgr: np.ndarray) -> Tuple[np.ndarray, float]:
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        h, w = gray.shape

        scale_w = 128
        scale_h = max(64, int(scale_w * (h / w)))
        small = cv2.resize(gray, (scale_w, scale_h), interpolation=cv2.INTER_AREA)

        dft = np.fft.fft2(small)
        dft_shift = np.fft.fftshift(dft)
        magnitude = np.abs(dft_shift)
        phase = np.angle(dft_shift)

        log_mag = np.log(magnitude + 1e-6)
        avg_log_mag = cv2.blur(log_mag, (3, 3))
        spectral_residual = log_mag - avg_log_mag

        res_exp = np.exp(spectral_residual)
        real_part = res_exp * np.cos(phase)
        imag_part = res_exp * np.sin(phase)
        complex_res = real_part + 1j * imag_part
        ishift = np.fft.ifftshift(complex_res)
        spatial = np.fft.ifft2(ishift)

        saliency_small = np.abs(spatial) ** 2
        saliency_small = cv2.GaussianBlur(saliency_small, (9, 9), 2.5)
        saliency_up = cv2.resize(saliency_small, (w, h), interpolation=cv2.INTER_CUBIC)

        lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB)
        l_channel = lab[:, :, 0]
        grad_x = cv2.Sobel(l_channel, cv2.CV_32F, 1, 0, ksize=3)
        grad_y = cv2.Sobel(l_channel, cv2.CV_32F, 0, 1, ksize=3)
        grad_mag = cv2.magnitude(grad_x, grad_y)
        grad_norm = cv2.normalize(grad_mag, None, 0.0, 1.0, cv2.NORM_MINMAX)

        saliency_norm = cv2.normalize(saliency_up, None, 0.0, 1.0, cv2.NORM_MINMAX)
        combined = 0.60 * saliency_norm + 0.40 * grad_norm

        score = float(np.mean(combined > 0.40) * 100 * 2.8 + np.max(combined) * 50)
        score = np.clip(score, 52, 95)

        return combined.astype(np.float32), float(score)

    # -------------------------------------------------------------
    # Signal 2: Human Face / Subject Detection
    # -------------------------------------------------------------
    def _detect_faces(self, bgr: np.ndarray) -> Tuple[np.ndarray, List[List[int]], float]:
        h, w = bgr.shape[:2]
        face_map = np.zeros((h, w), dtype=np.float32)
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

        boxes: List[List[int]] = []

        if self.face_cascade:
            faces = self.face_cascade.detectMultiScale(
                gray,
                scaleFactor=1.1,
                minNeighbors=4,
                minSize=(int(h * 0.12), int(h * 0.12))
            )
            for (x, y, fw, fh) in faces:
                boxes.append([int(x), int(y), int(fw), int(fh)])

        if len(boxes) == 0 and self.profile_cascade:
            profiles = self.profile_cascade.detectMultiScale(
                gray,
                scaleFactor=1.15,
                minNeighbors=4,
                minSize=(int(h * 0.12), int(h * 0.12))
            )
            for (x, y, fw, fh) in profiles:
                boxes.append([int(x), int(y), int(fw), int(fh)])

        # Skin tone cluster fallback for stylized/illustrated/avatar faces
        if len(boxes) == 0:
            ycrcb = cv2.cvtColor(bgr, cv2.COLOR_BGR2YCrCb)
            cr = ycrcb[:, :, 1]
            cb = ycrcb[:, :, 2]
            skin_mask = ((cr >= 130) & (cr <= 180) & (cb >= 70) & (cb <= 135)).astype(np.uint8) * 255

            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
            skin_clean = cv2.morphologyEx(skin_mask, cv2.MORPH_CLOSE, kernel)
            skin_clean = cv2.morphologyEx(skin_clean, cv2.MORPH_OPEN, kernel)

            contours, _ = cv2.findContours(skin_clean, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            min_face_area = (w * h) * 0.04
            max_face_area = (w * h) * 0.45

            for cnt in contours:
                x, y, fw, fh = cv2.boundingRect(cnt)
                area = fw * fh
                aspect = fw / float(fh)
                if min_face_area <= area <= max_face_area and 0.65 <= aspect <= 1.45:
                    boxes.append([int(x), int(y), int(fw), int(fh)])

        for [x, y, fw, fh] in boxes:
            cx = x + fw / 2.0
            cy = y + fh * 0.42
            sigma_x = fw * 0.42
            sigma_y = fh * 0.42

            x0 = max(0, int(cx - 3 * sigma_x))
            x1 = min(w, int(cx + 3 * sigma_x))
            y0 = max(0, int(cy - 3 * sigma_y))
            y1 = min(h, int(cy + 3 * sigma_y))

            xx, yy = np.meshgrid(np.arange(x0, x1), np.arange(y0, y1))
            gauss = np.exp(-(((xx - cx) ** 2) / (2 * sigma_x ** 2) + ((yy - cy) ** 2) / (2 * sigma_y ** 2)))
            face_map[y0:y1, x0:x1] = np.maximum(face_map[y0:y1, x0:x1], (gauss * 1.0).astype(np.float32))

        if len(boxes) > 0:
            largest = max(boxes, key=lambda b: b[2] * b[3])
            ratio = (largest[2] * largest[3]) / (w * h)
            if 0.08 <= ratio <= 0.40:
                score = 88.0 + (ratio * 20)
            else:
                score = 78.0
        else:
            score = 25.0

        return face_map, boxes, float(score)

    # -------------------------------------------------------------
    # Signal 3: Typography & Text Detection
    # -------------------------------------------------------------
    def _detect_text_regions(self, bgr: np.ndarray, face_boxes: List[List[int]]) -> Tuple[np.ndarray, List[List[int]], float]:
        h, w = bgr.shape[:2]
        text_map = np.zeros((h, w), dtype=np.float32)
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (11, 3))
        grad = cv2.morphologyEx(gray, cv2.MORPH_GRADIENT, kernel)
        _, thresh = cv2.threshold(grad, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

        close_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (25, 7))
        closed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, close_kernel)

        contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        text_boxes: List[List[int]] = []
        min_area = (w * h) * 0.015
        max_area = (w * h) * 0.40

        for cnt in contours:
            x, y, bw, bh = cv2.boundingRect(cnt)
            area = bw * bh
            aspect_ratio = bw / float(bh)

            overlaps_face = any(
                max(0, min(x + bw, fx + fw) - max(x, fx)) * max(0, min(y + bh, fy + fh) - max(y, fy)) > (area * 0.35)
                for [fx, fy, fw, fh] in face_boxes
            )
            if overlaps_face:
                continue

            if min_area < area < max_area and 1.2 <= aspect_ratio <= 8.5:
                roi = gray[y:y+bh, x:x+bw]
                if roi.size > 0 and np.std(roi) > 28:
                    text_boxes.append([int(x), int(y), int(bw), int(bh)])

                    cx = x + bw / 2.0
                    cy = y + bh / 2.0
                    sigma_x = bw * 0.45
                    sigma_y = bh * 0.45

                    x0 = max(0, int(cx - 2.5 * sigma_x))
                    x1 = min(w, int(cx + 2.5 * sigma_x))
                    y0 = max(0, int(cy - 2.5 * sigma_y))
                    y1 = min(h, int(cy + 2.5 * sigma_y))

                    xx, yy = np.meshgrid(np.arange(x0, x1), np.arange(y0, y1))
                    gauss = np.exp(-(((xx - cx) ** 2) / (2 * sigma_x ** 2) + ((yy - cy) ** 2) / (2 * sigma_y ** 2)))
                    text_map[y0:y1, x0:x1] = np.maximum(text_map[y0:y1, x0:x1], (gauss * 0.95).astype(np.float32))

        if len(text_boxes) > 0:
            total_area = sum(b[2] * b[3] for b in text_boxes) / (w * h)
            if 0.08 <= total_area <= 0.40:
                score = 86.0 + total_area * 15
            else:
                score = 72.0
        else:
            score = 30.0

        return text_map, text_boxes, float(score)

    # -------------------------------------------------------------
    # Signal 4: Central Hero Product / Object Detection
    # -------------------------------------------------------------
    def _detect_hero_objects(
        self,
        bgr: np.ndarray,
        face_boxes: List[List[int]],
        text_boxes: List[List[int]]
    ) -> Tuple[np.ndarray, List[List[int]], float]:
        h, w = bgr.shape[:2]
        obj_map = np.zeros((h, w), dtype=np.float32)
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

        # Center product search zone
        center_x0, center_x1 = int(w * 0.25), int(w * 0.75)
        center_y0, center_y1 = int(h * 0.20), int(h * 0.80)

        circles = cv2.HoughCircles(
            gray, cv2.HOUGH_GRADIENT, 1, 80,
            param1=50, param2=30,
            minRadius=int(h * 0.10), maxRadius=int(h * 0.35)
        )

        obj_boxes: List[List[int]] = []
        if circles is not None and len(face_boxes) == 0:
            # Pick dominant concentric circle in center
            for (cx, cy, r) in circles[0]:
                if center_x0 <= cx <= center_x1 and center_y0 <= cy <= center_y1:
                    bx = max(0, int(cx - r * 1.2))
                    by = max(0, int(cy - r * 1.2))
                    bw = min(w - bx, int(2.4 * r))
                    bh = min(h - by, int(2.4 * r))
                    obj_boxes.append([bx, by, bw, bh])

                    sigma = r * 0.7
                    x0 = max(0, int(cx - 2.5 * sigma))
                    x1 = min(w, int(cx + 2.5 * sigma))
                    y0 = max(0, int(cy - 2.5 * sigma))
                    y1 = min(h, int(cy + 2.5 * sigma))

                    xx, yy = np.meshgrid(np.arange(x0, x1), np.arange(y0, y1))
                    gauss = np.exp(-(((xx - cx) ** 2 + (yy - cy) ** 2) / (2 * sigma ** 2)))
                    obj_map[y0:y1, x0:x1] = np.maximum(obj_map[y0:y1, x0:x1], (gauss * 1.1).astype(np.float32))
                    break  # One primary hero object in center

        score = 88.0 if len(obj_boxes) > 0 else 40.0
        return obj_map, obj_boxes, float(score)

    # -------------------------------------------------------------
    # Signal 5: Luminance & RMS Edge Contrast
    # -------------------------------------------------------------
    def _compute_contrast(self, bgr: np.ndarray) -> Tuple[np.ndarray, float]:
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY).astype(np.float32)
        h, w = gray.shape

        kernel_size = 25
        local_mean = cv2.blur(gray, (kernel_size, kernel_size))
        local_sq_mean = cv2.blur(gray ** 2, (kernel_size, kernel_size))
        local_variance = np.maximum(0, local_sq_mean - local_mean ** 2)
        local_rms = np.sqrt(local_variance)

        contrast_norm = cv2.normalize(local_rms, None, 0.0, 1.0, cv2.NORM_MINMAX)
        global_std = float(np.std(gray))
        contrast_score = np.clip(global_std * 1.1 + 25, 45, 95)

        return contrast_norm.astype(np.float32), float(contrast_score)

    # -------------------------------------------------------------
    # Signal 6: Color Saturation & Chromatic Warmth
    # -------------------------------------------------------------
    def _compute_color_saliency(self, bgr: np.ndarray) -> Tuple[np.ndarray, float]:
        hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
        h_chan = hsv[:, :, 0]
        s_chan = hsv[:, :, 1].astype(np.float32) / 255.0
        v_chan = hsv[:, :, 2].astype(np.float32) / 255.0

        warm_mask = ((h_chan <= 35) | (h_chan >= 165)).astype(np.float32)
        warm_boost = 1.0 + 0.4 * warm_mask

        color_sal = s_chan * v_chan * warm_boost
        color_norm = cv2.normalize(color_sal, None, 0.0, 1.0, cv2.NORM_MINMAX)

        mean_sat = float(np.mean(s_chan))
        max_sat = float(np.percentile(s_chan, 95))
        color_score = np.clip(mean_sat * 70 + max_sat * 30, 45, 94)

        return color_norm.astype(np.float32), float(color_score)

    # -------------------------------------------------------------
    # Signal 7: Composition & Viewing Bias
    # -------------------------------------------------------------
    def _compute_composition_bias(
        self,
        w: int,
        h: int,
        face_boxes: List[List[int]],
        text_boxes: List[List[int]],
        object_boxes: List[List[int]]
    ) -> Tuple[np.ndarray, float]:
        cx = w * 0.48
        cy = h * 0.45
        sigma_x = w * 0.38
        sigma_y = h * 0.35

        xx, yy = np.meshgrid(np.arange(w), np.arange(h))
        central_bias = np.exp(-(((xx - cx) ** 2) / (2 * sigma_x ** 2) + ((yy - cy) ** 2) / (2 * sigma_y ** 2)))

        power_points = [
            (w / 3.0, h / 3.0),
            (2 * w / 3.0, h / 3.0),
            (w / 3.0, 2 * h / 3.0),
            (2 * w / 3.0, 2 * h / 3.0)
        ]
        thirds_map = np.zeros((h, w), dtype=np.float32)
        for (px, py) in power_points:
            p_dist = np.exp(-(((xx - px) ** 2 + (yy - py) ** 2) / (2 * (0.15 * min(w, h)) ** 2)))
            thirds_map = np.maximum(thirds_map, p_dist)

        comp_map = 0.7 * central_bias + 0.3 * thirds_map
        comp_norm = cv2.normalize(comp_map, None, 0.0, 1.0, cv2.NORM_MINMAX)

        has_face = len(face_boxes) > 0
        has_text = len(text_boxes) > 0
        has_obj = len(object_boxes) > 0

        if has_face and has_text:
            score = 90.0
        elif has_obj:
            score = 86.0
        elif has_text:
            score = 82.0
        else:
            score = 70.0

        return comp_norm.astype(np.float32), float(score)

    # -------------------------------------------------------------
    # Signal 8: Clutter Estimation
    # -------------------------------------------------------------
    def _estimate_clutter(self, bgr: np.ndarray) -> Tuple[float, float]:
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 100, 200)
        edge_density = float(np.count_nonzero(edges)) / float(edges.size)

        if edge_density > 0.18:
            clutter_penalty = min(1.0, (edge_density - 0.18) * 10)
        else:
            clutter_penalty = 0.0

        return clutter_penalty, edge_density

    # -------------------------------------------------------------
    # Heatmap Generation & Visual Overlays
    # -------------------------------------------------------------
    def _create_heatmap_overlays(self, bgr: np.ndarray, fused_blurred: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        heatmap_color = cv2.applyColorMap(fused_blurred, cv2.COLORMAP_JET)

        alpha = (fused_blurred.astype(np.float32) / 255.0) ** 1.3
        alpha = np.clip(alpha * 0.85 + 0.15, 0.0, 1.0)
        alpha_3d = np.repeat(alpha[:, :, np.newaxis], 3, axis=2)

        overlay = (alpha_3d * heatmap_color.astype(np.float32) + (1.0 - alpha_3d) * bgr.astype(np.float32))
        overlay_uint8 = np.clip(overlay, 0, 255).astype(np.uint8)

        return overlay_uint8, heatmap_color

    # -------------------------------------------------------------
    # Extract Regions, Journey Scanpath & Diagnostics
    # -------------------------------------------------------------
    def _extract_journey_and_regions(
        self,
        fused_map: np.ndarray,
        bgr: np.ndarray,
        face_boxes: List[List[int]],
        text_boxes: List[List[int]],
        object_boxes: List[List[int]]
    ) -> Tuple[List[AttentionRegion], List[AttentionJourneyStep], List[str], List[str]]:
        h, w = fused_map.shape[:2]

        def score_bbox(bx, by, bw, bh):
            roi = fused_map[by:by+bh, bx:bx+bw]
            if roi.size == 0:
                return 0.0
            return float(np.mean(roi) * 0.35 + np.max(roi) * 0.65)

        candidates = []

        # 1. Add detected face candidates
        for [fx, fy, fw, fh] in face_boxes:
            candidates.append({
                "bbox": [fx, fy, fw, fh],
                "score": score_bbox(fx, fy, fw, fh) * 1.15,  # human faces have strong fixation pull
                "category": "face",
                "label": "Primary Face / Emotion",
                "reason": "Innate biological gaze bias: Human facial features and emotional expressions trigger instant ocular fixation.",
                "journey_target": "Subject Face & Expression",
                "journey_desc": "Instantaneous visual anchor driven by innate human facial recognition."
            })

        # 2. Add detected hero object candidates
        for [ox, oy, ow, oh] in object_boxes:
            candidates.append({
                "bbox": [ox, oy, ow, oh],
                "score": score_bbox(ox, oy, ow, oh) * 1.10,
                "category": "object",
                "label": "Hero Product Showcase",
                "reason": "Central framing, specular highlights, and high-frequency contrast command immediate subject attention.",
                "journey_target": "Hero Product / Gadget",
                "journey_desc": "Immediate central fixation driven by silhouette edge separation and pedestal lighting."
            })

        # 3. Add detected text block candidates
        for [tx, ty, tw, th] in text_boxes:
            candidates.append({
                "bbox": [tx, ty, tw, th],
                "score": score_bbox(tx, ty, tw, th),
                "category": "text",
                "label": "Bold Headline Copy",
                "reason": "High luminance contrast and sharp typographic strokes capture scanning eye paths.",
                "journey_target": "Bold Headline Text",
                "journey_desc": "Linear reading path processing key value proposition copy."
            })

        # 4. If few candidates, add high-contrast local maxima
        if len(candidates) < 2:
            # Central quadrant
            cw, ch = int(w * 0.4), int(h * 0.4)
            cx, cy = int(w * 0.3), int(h * 0.3)
            candidates.append({
                "bbox": [cx, cy, cw, ch],
                "score": score_bbox(cx, cy, cw, ch),
                "category": "contrast",
                "label": "Central Focal Element",
                "reason": "Dominant luminance contrast and central framing command immediate visual attention.",
                "journey_target": "Central Focal Point",
                "journey_desc": "Central viewing bias in absence of isolated secondary elements."
            })

        # Non-maximum suppression / overlap deduplication
        def compute_iou(b1, b2):
            x1, y1, w1, h1 = b1
            x2, y2, w2, h2 = b2
            inter_w = max(0, min(x1 + w1, x2 + w2) - max(x1, x2))
            inter_h = max(0, min(y1 + h1, y2 + h2) - max(y1, y2))
            inter_area = inter_w * inter_h
            min_area = min(w1 * h1, w2 * h2)
            return inter_area / float(min_area) if min_area > 0 else 0.0

        candidates.sort(key=lambda c: c["score"], reverse=True)
        deduped = []
        for c in candidates:
            if not any(compute_iou(c["bbox"], d["bbox"]) > 0.45 for d in deduped):
                deduped.append(c)

        top_candidates = deduped[:3]

        regions: List[AttentionRegion] = []
        journey: List[AttentionJourneyStep] = []
        why_analysis: List[str] = []
        recommendations: List[str] = []

        total_score = sum(c["score"] for c in top_candidates) or 1.0

        for rank, c in enumerate(top_candidates, 1):
            share_pct = round((c["score"] / total_score) * 100, 1)
            
            # Format title according to rank
            label = c["label"]
            if rank == 1 and c["category"] == "text":
                label = "Primary Headline Hook"
            elif rank > 1 and c["category"] == "text":
                label = "Secondary Value Copy"
            elif rank > 1 and c["category"] == "face":
                label = "Secondary Human Expression"
            elif rank > 1 and c["category"] == "object":
                label = "Supporting Feature Badge"

            regions.append(AttentionRegion(
                id=rank,
                rank=rank,
                label=label,
                bbox=c["bbox"],
                share_percent=share_pct,
                reason=c["reason"],
                category=c["category"]
            ))

            journey.append(AttentionJourneyStep(
                step=rank,
                label=f"Scan Stage 0{rank}",
                target=c["journey_target"],
                bbox=c["bbox"],
                description=c["journey_desc"]
            ))

        # Build Why Analysis
        if any(r.category == "face" for r in regions):
            why_analysis.append("Detected facial landmarks create an immediate emotional entry point for viewer gaze.")
        if any(r.category == "text" for r in regions):
            why_analysis.append("High-contrast typography forms a legible secondary anchor for scanning feeds.")
        if any(r.category == "object" for r in regions):
            why_analysis.append("Specular highlights and rim lighting isolate the hero subject against the dark backdrop.")
        if any(r.category == "contrast" for r in regions):
            why_analysis.append("Strong luminance gradients and silhouette separation pull attention toward the primary subject.")
        why_analysis.append("Visual weight is distributed along the reading path, reducing cognitive fatigue.")

        # Build Recommendations
        bottom_right_x = w * 0.78
        bottom_right_y = h * 0.82
        timestamp_conflict = any(
            (r.bbox[0] + r.bbox[2] > bottom_right_x) and (r.bbox[1] + r.bbox[3] > bottom_right_y)
            for r in regions
        )

        if timestamp_conflict:
            recommendations.append(
                "CRITICAL: Keep important text and subject faces out of the bottom-right corner. "
                "YouTube duration badge overlays (e.g. '12:45') will obscure this area."
            )
        else:
            recommendations.append(
                "Safe Zone Verified: Key focal subjects are clear of the lower-right YouTube duration badge overlay."
            )

        if len(text_boxes) > 4:
            recommendations.append(
                "Reduce typography clutter: Multiple competing text blocks reduce mobile scannability. Aim for 3-4 bold words."
            )
        elif len(text_boxes) == 0:
            recommendations.append(
                "Consider adding a short, 2-3 word high-contrast headline to anchor viewer curiosity."
            )

        if len(regions) >= 2 and regions[0].share_percent < 45.0:
            recommendations.append(
                "Clarify visual hierarchy: Attention is split evenly between competing elements. "
                "Increase contrast or scale on your hero subject."
            )
        else:
            recommendations.append(
                "Strong visual hierarchy: Primary subject captures the majority of predicted first-look fixations."
            )

        recommendations.append(
            "Verify mobile legibility in the feed simulator below to ensure copy stays sharp at 168px."
        )

        return regions, journey, why_analysis, recommendations

# Singleton instance
engine = AttentionFusionEngine()
