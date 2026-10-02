#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "      Thumbnail IQ - Initial Project Setup Script         "
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 1. Detect Python
PYTHON_BIN=""
if command -v python3.11 &>/dev/null; then
  PYTHON_BIN="python3.11"
elif command -v python3 &>/dev/null; then
  PYTHON_BIN="python3"
else
  echo "Error: Python 3 not found. Please install Python 3.10+."
  exit 1
fi

echo "Using Python: $($PYTHON_BIN --version) at $(which $PYTHON_BIN)"

# 2. Setup Backend Virtual Environment
if [ ! -d "backend/venv" ]; then
  echo "Creating Python virtual environment in backend/venv..."
  $PYTHON_BIN -m venv backend/venv
fi

echo "Upgrading pip and installing backend dependencies..."
./backend/venv/bin/pip install --upgrade pip
./backend/venv/bin/pip install -r backend/requirements.txt

# 3. Setup Frontend
echo "Checking frontend dependencies..."
if command -v npm &>/dev/null; then
  cd frontend
  if [ ! -d "node_modules" ]; then
    echo "Installing frontend npm packages..."
    npm install
  else
    echo "Frontend node_modules already exists."
  fi
  cd "$SCRIPT_DIR"
else
  echo "Error: Node.js / npm not found. Please install Node.js v18+."
  exit 1
fi

# 4. Generate Demo Sample Thumbnails
echo "Generating synthetic demo thumbnails..."
./backend/venv/bin/python backend/scripts/generate_samples.py || true

# 5. Environment configuration
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

echo ""
echo "=========================================================="
echo " Setup complete! Start both services anytime with:       "
echo "   ./start.sh                                             "
echo "=========================================================="
