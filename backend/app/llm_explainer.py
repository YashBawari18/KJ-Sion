import os
import json
import logging
from typing import Dict, Any, Optional
import httpx

from app.config import settings
from app.schemas import ExplainResponse

logger = logging.getLogger("thumbnail_iq.llm_explainer")

class AIExplainer:
    def __init__(self):
        self.provider = settings.llm_provider.lower()
        self.gemini_key = settings.gemini_api_key or os.getenv("GEMINI_API_KEY", "")
        self.openai_key = settings.openai_api_key or os.getenv("OPENAI_API_KEY", "")

    async def explain(self, analysis_data: Dict[str, Any], title: Optional[str] = None) -> ExplainResponse:
        """
        Generates an AI-powered visual attention explanation.
        Gracefully falls back to deterministic rule-based analysis if keys are absent or API fails.
        """
        # 1. Try Gemini if configured
        if self.gemini_key and (self.provider == "gemini" or not self.openai_key):
            try:
                res = await self._call_gemini(analysis_data, title)
                if res:
                    return res
            except Exception as e:
                logger.warning(f"Gemini API explanation failed: {e}. Falling back to rule-based engine.")

        # 2. Try OpenAI if configured
        if self.openai_key and (self.provider == "openai" or not self.gemini_key):
            try:
                res = await self._call_openai(analysis_data, title)
                if res:
                    return res
            except Exception as e:
                logger.warning(f"OpenAI API explanation failed: {e}. Falling back to rule-based engine.")

        # 3. Deterministic Heuristic Fallback
        return self._rule_based_fallback(analysis_data, title)

    async def _call_gemini(self, analysis: Dict[str, Any], title: Optional[str]) -> Optional[ExplainResponse]:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
        prompt = self._build_prompt(analysis, title)

        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "response_mime_type": "application/json",
                "temperature": 0.2
            }
        }

        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
                parsed = json.loads(raw_text)
                return ExplainResponse(
                    success=True,
                    strongest_area=parsed.get("strongest_area", "Primary focal subject"),
                    second_strongest=parsed.get("second_strongest", "Secondary element"),
                    competing_elements=parsed.get("competing_elements", "No major competition"),
                    visual_hierarchy=parsed.get("visual_hierarchy", "Logical scanpath"),
                    likely_distractions=parsed.get("likely_distractions", "Lower right duration overlay"),
                    recommendations=parsed.get("recommendations", analysis.get("recommendations", [])),
                    source="ai_gemini"
                )
            else:
                logger.warning(f"Gemini API returned status {resp.status_code}: {resp.text}")
                return None

    async def _call_openai(self, analysis: Dict[str, Any], title: Optional[str]) -> Optional[ExplainResponse]:
        url = "https://api.openai.com/v1/chat/completions"
        prompt = self._build_prompt(analysis, title)

        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": "You are a professional YouTube thumbnail design and visual attention strategist. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ],
            "response_format": {"type": "json_object"},
            "temperature": 0.2
        }

        headers = {
            "Authorization": f"Bearer {self.openai_key}",
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=payload, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                raw_text = data["choices"][0]["message"]["content"]
                parsed = json.loads(raw_text)
                return ExplainResponse(
                    success=True,
                    strongest_area=parsed.get("strongest_area", ""),
                    second_strongest=parsed.get("second_strongest", ""),
                    competing_elements=parsed.get("competing_elements", ""),
                    visual_hierarchy=parsed.get("visual_hierarchy", ""),
                    likely_distractions=parsed.get("likely_distractions", ""),
                    recommendations=parsed.get("recommendations", analysis.get("recommendations", [])),
                    source="ai_openai"
                )
            else:
                logger.warning(f"OpenAI API returned status {resp.status_code}")
                return None

    def _build_prompt(self, analysis: Dict[str, Any], title: Optional[str]) -> str:
        regions = analysis.get("regions", [])
        signals = analysis.get("signals", {})
        score = analysis.get("attention_score", 70)

        prompt = f"""
You are Thumbnail IQ's AI visual strategist.
Analyze the following computer vision attention prediction data for a YouTube thumbnail and provide concise, actionable diagnosis.

Thumbnail Data:
- Attention Score: {score}/100 (Prototype design index)
- Signal Breakdown: {json.dumps(signals)}
- Predicted Attention Regions: {json.dumps(regions)}
- Video Title (optional): {title or 'Unspecified'}

Remember: This is PREDICTED visual attention, not physical eye-tracking data. Do not make scientifically validated eye-tracking claims or guaranteed CTR claims.

Return a JSON object with EXACTLY these keys:
{{
  "strongest_area": "1-2 sentences on where viewers look first and the visual psychology reason (contrast/face/scale)",
  "second_strongest": "1-2 sentences on the secondary scan destination",
  "competing_elements": "1-2 sentences describing if visual weight is split or cluttered",
  "visual_hierarchy": "1-2 sentences evaluating scan sequence from primary to secondary hook",
  "likely_distractions": "Specific callouts including YouTube's lower-right duration badge safe zone",
  "recommendations": ["3-4 clear, actionable improvement bullets"]
}}
"""
        return prompt

    def _rule_based_fallback(self, analysis: Dict[str, Any], title: Optional[str]) -> ExplainResponse:
        regions = analysis.get("regions", [])
        signals = analysis.get("signals", {})
        score = analysis.get("attention_score", 70)

        if len(regions) > 0:
            strongest = f"{regions[0].get('label', 'Primary Subject')}: Command {regions[0].get('share_percent', 55)}% of predicted first-look fixations due to {regions[0].get('reason', 'dominant contrast')}."
        else:
            strongest = "Central focal area: Viewers immediately gravitate toward the central third of the composition."

        if len(regions) > 1:
            second_strongest = f"{regions[1].get('label', 'Secondary Hook')}: Captures {regions[1].get('share_percent', 35)}% of following scan paths, anchoring the visual narrative."
        else:
            second_strongest = "Diffused secondary weight across perimeter canvas."

        if len(regions) >= 2 and regions[0].get("share_percent", 50) < 48:
            competing = "Moderate competition: The primary subject and secondary elements have similar visual weight, which may cause eye hesitation."
        else:
            competing = "Optimal hierarchy: Dominant visual anchor with minimal cognitive competition."

        visual_hierarchy = (
            "Well-structured scanpath: Eye transitions smoothly from the primary focal subject to supporting copy."
        )

        likely_distractions = (
            "Verify bottom-right quadrant: Keep faces and critical headlines away from the lower-right 20% area where YouTube places duration timestamps."
        )

        base_recs = analysis.get("recommendations", [
            "Maintain strong contrast on key subject.",
            "Verify typography legibility in mobile 168px feed simulator."
        ])

        return ExplainResponse(
            success=True,
            strongest_area=strongest,
            second_strongest=second_strongest,
            competing_elements=competing,
            visual_hierarchy=visual_hierarchy,
            likely_distractions=likely_distractions,
            recommendations=base_recs,
            source="rule_based"
        )

explainer = AIExplainer()
