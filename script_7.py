# Create quick start script
quick_start_content = '''#!/bin/bash
# Quick start script for TDS Virtual TA

echo "🚀 TDS Virtual TA Quick Start"
echo "============================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📋 Installing dependencies..."
pip install -r requirements.txt

# Run tests
echo "🧪 Running tests..."
python -m pytest test_main.py -v

# Start the application
echo "🌟 Starting TDS Virtual TA..."
echo "API will be available at: http://localhost:8000/api/"
echo "API documentation at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uvicorn main:app --reload --host 0.0.0.0 --port 8000
'''

with open("quick_start.sh", "w") as f:
    f.write(quick_start_content)

# Make it executable
os.chmod("quick_start.sh", os.stat("quick_start.sh").st_mode | stat.S_IEXEC)

# Update requirements to include testing dependencies
requirements_updated = '''fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
aiohttp==3.9.1
beautifulsoup4==4.12.2
python-multipart==0.0.6
jinja2==3.1.2
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
pytest==7.4.3
httpx==0.25.2
pandas==2.1.4
'''

with open("requirements.txt", "w") as f:
    f.write(requirements_updated)

print("✅ Created quick_start.sh and updated requirements.txt")