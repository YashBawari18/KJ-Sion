# Thumbnail IQ

> **"Understand attention. Improve the thumbnail. Before you publish."**
> 
> *Problem Statement 2: AI-Powered YouTube Thumbnail Attention Heatmap (Domain: AI & ML)*

---

## 🔬 Scientific Positioning & Ethical Disclaimer

> [!IMPORTANT]
> **PREDICTED VISUAL ATTENTION — NOT REAL EYE TRACKING**
> 
> Thumbnail IQ utilizes algorithmic computer vision heuristics (spectral residual saliency, facial presence, typographic density, chromatic warmth, and central viewing bias) to **estimate** where human visual attention is likely to be directed in the first 500 milliseconds of viewing.
> 
> - **We do NOT claim:** Real eye-tracking data, physical ocular fixation measurements, scientifically measured viewer percentages, guaranteed Click-Through Rate (CTR) improvement, or guaranteed video conversions.
> - **Accurate terminology:** "Predicted visual attention", "AI attention analysis", "Likely attention regions", "Predicted attention journey", and "Prototype design score".
> - All prototype weights represent initial engineering heuristic coefficients designed for thumbnail diagnosis, not clinically validated biological parameters.

---

## 🌟 Overview & Workflow

YouTube creators have less than 500 milliseconds to capture viewer attention in dense mobile feeds and desktop home screens. Thumbnail IQ provides a pre-flight visual diagnostic suite:

```
[UPLOAD THUMBNAIL] ──▶ [AI ATTENTION FUSION] ──▶ [HEATMAP & JOURNEY] ──▶ [ACTIONABLE DIAGNOSTICS] ──▶ [VALIDATE IN FEED SIMULATOR]
```

1. **Where will viewers look first?** (Primary fixation region & heatmap overlay)
2. **What attracts attention?** (Luminance contrast, human facial features, high-weight typography)
3. **What elements compete for attention?** (Visual clutter & competing focal centers)
4. **Why are those areas important?** (Plain-language visual psychology explanations)
5. **How can the thumbnail be improved?** (Actionable suggestions: contrast tweaks, safe-zone positioning)

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Backend:** Python 3.11+, FastAPI, Uvicorn, Pillow, NumPy, OpenCV Headless
- **AI Explanation Engine:** Configurable LLM API (Google Gemini 1.5/2.0 Flash or OpenAI GPT-4o-mini) with zero-configuration deterministic heuristic fallback.
- **Attention Fusion Engine:** Multi-signal weighted prototype heuristic model:
  - **Visual Saliency (35%):** 2D Discrete Fourier Transform (Spectral Residual log-spectrum) + multi-scale edge gradient magnitude in LAB color space.
  - **Face / Person (20%):** Dual-path detector with OpenCV Haar Cascades for real human photos and skin-tone YCrCb chromatic clustering for illustrated/avatar faces.
  - **Typography & Text (15%):** Morphological horizontal stroke gradient filter (`cv2.MORPH_GRADIENT`) and Otsu adaptive thresholding.
  - **Luminance Contrast (10%):** Local root-mean-square (RMS) luminance variance for subject-background separation.
  - **Color Vibrancy (10%):** HSV color space analysis with warm-hue amplification (red, orange, yellow spectrum).
  - **Composition & Framing (10%):** 2D anisotropic Gaussian distribution for central viewing bias + Rule of Thirds power points.
- **Privacy & Security:** 100% Local processing. No database, no tracking, no user authentication required. No hardcoded API keys.

---

## 🚀 Quick Start (One Command)

### Prerequisites
- **macOS / Linux / Windows**
- **Python 3.10+** (Python 3.11 recommended)
- **Node.js 18+** & npm

### 1. One-Command Launch (Mac & Linux)
From the project root:
```bash
chmod +x start.sh setup.sh
./start.sh
```
This script automatically:
1. Detects your Python and Node environments
2. Creates the Python virtual environment and installs dependencies (if missing)
3. Generates 3 synthetic demo sample thumbnails (face-heavy, text-heavy, product-heavy)
4. Launches the FastAPI backend (`http://localhost:8000`) with model warmup
5. Launches the Next.js frontend (`http://localhost:3000`)
6. Automatically prints the URL to open in your browser

### 2. Windows Users
Run:
```cmd
start.bat
```

### 3. Alternative (npm)
```bash
npm run dev
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | `http://localhost:8000` | Backend API URL for frontend |
| `MAX_UPLOAD_SIZE_MB` | `10` | Maximum uploaded image size limit |
| `MAX_IMAGE_DIMENSION` | `1920` | Max width/height before quality-preserving resize |
| `LLM_PROVIDER` | `gemini` | LLM provider for explanations (`gemini`, `openai`, `fallback`) |
| `GEMINI_API_KEY` | *(optional)* | Google Gemini API key for deep-dive AI explanations |
| `OPENAI_API_KEY` | *(optional)* | OpenAI API key (optional alternative) |

> **Graceful Fallback:** If no API key is configured or an API network request times out, the system automatically uses the built-in deterministic rule-based explanation engine. The application **never crashes** due to missing API keys.

---

## 📡 API Endpoints

### 1. Health Check
`GET /health`
```json
{
  "status": "healthy",
  "service": "Thumbnail IQ API",
  "version": "1.0.0",
  "cv_engine": "OpenCV Multi-Signal Attention Fusion",
  "disclaimer": "Predicted visual attention, not real eye tracking."
}
```

### 2. Analyze Thumbnail
`POST /analyze`
- **Input:** `multipart/form-data` with an image file (`file`).
- **Validation:** Type check (`PNG`, `JPG`, `JPEG`, `WebP`), max size check (`10MB`), aspect ratio normalization.
- **Output:**
```json
{
  "success": true,
  "attention_score": 76,
  "score_label": "Prototype Design Score",
  "image_metadata": { "width": 1280, "height": 720, "format": "JPEG" },
  "original_image": "data:image/jpeg;base64,...",
  "heatmap": "data:image/jpeg;base64,...",
  "journey": [
    { "step": 1, "target": "Subject Face & Expression", "description": "..." },
    { "step": 2, "target": "Bold Headline Text", "description": "..." }
  ],
  "regions": [
    { "rank": 1, "label": "Primary Face / Emotion", "share_percent": 59.6, "bbox": [101, 101, 400, 460] }
  ],
  "signals": { "saliency": 52.0, "face": 92.0, "text": 87.4, "contrast": 94.9, "color": 77.4, "composition": 90.0 },
  "recommendations": ["..."],
  "why_analysis": ["..."]
}
```

### 3. Deep-Dive AI Explanation
`POST /explain`
- **Input:** Analysis results JSON + optional video title.
- **Output:** Structured diagnosis covering strongest fixation area, secondary destination, visual hierarchy, competing distractions, and actionable suggestions.

---

## 🎯 Demo Mode & Diverse Test Thumbnails

Thumbnail IQ comes pre-bundled with 3 non-copyrighted synthetic thumbnails generated via Pillow:
1. **Face-Heavy Subject:** Shocked facial expression with contrasting background. Evaluates facial landmark fixation and emotion saliency.
2. **Text-Heavy Headline:** Massive bold typography and checklist cards. Evaluates stroke density and linear reading paths.
3. **Product / Gear Showcase:** Center-stage camera and lens with pedestal rim lighting. Evaluates central subject bias, specular highlights, and badge positioning.

*Each sample produces visibly distinct heatmaps and scanpaths (mean pixel difference > 50-68px).*

---

## 🛡️ Error Handling Hierarchy

1. **Unsupported Format:** Clear feedback requesting PNG, JPG, or WebP.
2. **Oversized Upload:** File size validation with immediate notice if > 10MB.
3. **Corrupted Image:** Integrity verification (`PIL.Image.verify`) with helpful user message.
4. **Backend Unavailable:** Frontend shows an actionable alert with the exact terminal command to run (`./start.sh`).
5. **No AI API Key:** Transparent fallback to the deterministic heuristic engine with a clear "Rule-Based Engine" UI tag.

---

## 🌐 Production Deployment Guide

### Option 1: Vercel (Frontend) + Render / Railway (Backend) — *Recommended & Free*

#### Step 1: Deploy Backend (Render.com)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** ➔ **Web Service**.
2. Connect your GitHub repository `https://github.com/YashBawari18/KJ-Sion`.
3. Configure the service:
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install --upgrade pip && pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Click **Create Web Service**. Once deployed, copy your backend URL (e.g. `https://thumbnail-iq-backend.onrender.com`).

#### Step 2: Deploy Frontend (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/new) and import your GitHub repository.
2. Under **Root Directory**, click edit and select `frontend`.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_BACKEND_URL` = `https://your-backend-service.onrender.com` (your Render backend URL from Step 1)
4. Click **Deploy**. Your app is live!

---

### Option 2: Docker / Docker Compose (Any Cloud VPS / Hostinger / DigitalOcean)

Run the entire full-stack application (Next.js frontend + FastAPI backend) in isolated containers with a single command:

```bash
# Clone the repository
git clone https://github.com/YashBawari18/KJ-Sion.git
cd KJ-Sion

# Build and run with Docker Compose
docker compose up -d --build
```

- **Frontend:** `http://localhost:3000`
- **Backend API Docs:** `http://localhost:8000/docs`
- **Health Check:** `http://localhost:8000/health`

---

## 🔮 Future Improvements
- Multi-thumbnail A/B testing matrix side-by-side comparison.
- OCR text extraction (EasyOCR/Tesseract) for sentiment and clickbait copy scoring.
- Fine-tuned deep saliency model (e.g. Salicon / DeepGaze ONNX runtime) when GPU acceleration is available.
- YouTube channel branding consistency check.

