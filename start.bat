@echo off
echo ==========================================================
echo           Starting Thumbnail IQ Full-Stack (Windows)     
echo ==========================================================

REM 1. Start Backend in separate window
echo Starting FastAPI Backend on port 8000...
start "Thumbnail IQ Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

REM 2. Start Frontend in separate window
echo Starting Next.js Frontend on port 3000...
start "Thumbnail IQ Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================================
echo   Services are starting!
echo   Open your browser at: http://localhost:3000
echo ==========================================================
