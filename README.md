# Thumbnail IQ

> **"Understand attention. Improve the thumbnail. Before you publish."**
> 
> *Problem Statement 2: AI-Powered YouTube Thumbnail Attention Heatmap (Domain: AI & ML)*

---

## 🔬 Scientific Positioning & Disclaimer

> [!IMPORTANT]
> **PREDICTED VISUAL ATTENTION — NOT REAL EYE TRACKING**
> 
> Thumbnail IQ utilizes algorithmic computer vision heuristics (spectral saliency, facial presence, text density, chromatic contrast, and central bias) to **estimate** where human visual attention is likely to be directed in the first 500ms of viewing.
> 
> - **We do NOT claim:** Real eye-tracking data, physical ocular fixation measurements, scientifically measured viewer percentages, guaranteed Click-Through Rate (CTR) improvement, or guaranteed video conversions.
> - **Accurate terminology:** "Predicted visual attention", "AI attention analysis", "Likely attention regions", "Predicted attention journey", and "Prototype design score".

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

## 🛠️ Architecture & Tech Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Backend:** Python 3.11+, FastAPI, Uvicorn, Pillow, NumPy, OpenCV
- **Attention Fusion Engine:** Multi-signal weighted heuristic model:
  - Visual Saliency (35%)
  - Face / Person Saliency (20%)
  - Typography / Text Legibility (15%)
  - Luminance Contrast (10%)
  - Color Vibrancy (10%)
  - Composition Balance (10%)
- **Data & Privacy:** 100% Local processing. No database, no tracking, no user authentication required.

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
3. Generates 3 synthetic demo sample thumbnails
4. Launches the FastAPI backend (`http://localhost:8000`)
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
| `GEMINI_API_KEY` | *(optional)* | Google Gemini API key for AI explanations |
| `OPENAI_API_KEY` | *(optional)* | OpenAI API key (optional alternative) |

*Note: If no API key is set, the application automatically uses the built-in deterministic rule-based explanation engine.*

---

## 📡 API Endpoints

### 1. Health Check
`GET /health`
Returns service status, version, and disclaimer.

### 2. Analyze Thumbnail
`POST /analyze`
- Accepts `multipart/form-data` with an image file (`file`).
- Validates file type (`PNG`, `JPG`, `JPEG`, `WebP`) and file size (`<=10MB`).
- Resizes oversized images while preserving aspect ratio.
- Returns structured JSON response with attention score, signal breakdown, attention journey scanpath, and image base64 data.

### 3. Explain Analysis
`POST /explain`
- Accepts analysis results JSON.
- Returns plain-language diagnosis of focal regions, competing elements, and recommendations.

---

## 🎯 Staged Development Progress

- [x] **Stage A (Phases 1-4):** Project structure, Next.js frontend UI, upload dropzone, 3 synthetic demo thumbnails, FastAPI backend with `/health` and `/analyze`, one-command start script.
- [ ] **Stage B (Phases 5-8):** Real OpenCV computer vision saliency fusion, facial detection, text region extraction, dynamic attention heatmap generation, and attention journey scan paths.
- [ ] **Stage C (Phases 9-12):** AI explanation integration (Gemini/OpenAI + rule-based fallback), demo safety warmups, edge case testing, presentation script.
