#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================================="
echo "          Starting Thumbnail IQ Full-Stack                "
echo "=========================================================="

# Ensure environment setup exists
if [ ! -d "backend/venv" ] || [ ! -d "frontend/node_modules" ]; then
  echo "Missing dependencies detected. Running initial setup..."
  bash setup.sh
fi

# Cleanup on exit
cleanup() {
  echo ""
  echo "Shutting down Thumbnail IQ services..."
  if [ -n "$BACKEND_PID" ]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  if [ -n "$FRONTEND_PID" ]; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
  exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# 1. Start Backend
echo "Starting Python FastAPI Backend on http://localhost:8000..."
cd backend
./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd "$SCRIPT_DIR"

# Wait for backend health check
echo -n "Waiting for backend to be ready..."
for i in {1..30}; do
  if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo " Ready!"
    break
  fi
  echo -n "."
  sleep 1
done

# 2. Start Frontend
echo "Starting Next.js Frontend on http://localhost:3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd "$SCRIPT_DIR"

echo ""
echo "=========================================================="
echo "  Thumbnail IQ is running!                                "
echo "                                                          "
echo "  👉 Open your browser at: http://localhost:3000          "
echo "  👉 Backend API Docs:     http://localhost:8000/docs     "
echo "                                                          "
echo "  Press Ctrl+C to stop all services.                      "
echo "=========================================================="
echo ""

# Keep running
wait
