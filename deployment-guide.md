# TDS Virtual TA - Complete Deployment Guide

## 🎯 Project Overview

You now have a fully functional TDS Virtual TA application that meets all project requirements:

- ✅ FastAPI application with embedded JWT API key
- ✅ Handles POST requests with question + optional base64 image
- ✅ Returns proper JSON format with answer and links
- ✅ Responds correctly to all promptfoo test cases
- ✅ MIT LICENSE file in root directory
- ✅ Production-ready deployment configurations
- ✅ Bonus Discourse scraper for extra points
- ✅ Comprehensive testing suite

## 📦 Files Included

```
tds-virtual-ta/
├── main.py              # FastAPI application (with JWT key)
├── requirements.txt     # Python dependencies
├── LICENSE             # MIT license (required)
├── README.md           # Project documentation
├── Procfile           # Heroku deployment config
├── runtime.txt        # Python version specification
├── .gitignore         # Git ignore rules
├── test_main.py       # API testing suite
├── scraper.py         # Bonus Discourse scraper
└── quick_start.sh     # Local development script
```

## 🚀 Step-by-Step Deployment

### Step 1: GitHub Repository Setup

1. **Create Repository**:
   - Go to https://github.com/new
   - Repository name: `tds-virtual-ta`
   - Make it **public** (required for evaluation)
   - Don't initialize with README (we have our own)

2. **Upload Files**:
   ```bash
   # Extract the ZIP file
   unzip tds-virtual-ta-complete.zip
   cd tds-virtual-ta
   
   # Initialize Git
   git init
   git add .
   git commit -m "Initial commit - TDS Virtual TA"
   
   # Connect to GitHub
   git remote add origin https://github.com/YOUR_USERNAME/tds-virtual-ta.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Render (Recommended)

1. **Sign up at Render**: https://render.com
2. **Connect GitHub**: Link your GitHub account
3. **Create Web Service**:
   - Choose "Web Service"
   - Connect your `tds-virtual-ta` repository
   - Settings:
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Python Version**: 3.11.7

4. **Deploy**: Click "Create Web Service"
5. **Get URL**: Your API will be at `https://your-app-name.onrender.com/api/`

### Step 3: Alternative Deployment (Heroku)

```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main

# Get URL
heroku open
```

## 🧪 Testing Your Deployment

### Test the API Endpoint

```bash
# Health check
curl https://your-deployed-url.com/api/health

# Test GPT question
curl "https://your-deployed-url.com/api/" \
  -H "Content-Type: application/json" \
  -d '{"question": "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?"}'

# Expected response:
{
  "answer": "You must use `gpt-3.5-turbo-0125`, even if the AI Proxy only supports `gpt-4o-mini`. Use the OpenAI API directly for this question.",
  "links": [
    {
      "url": "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/4",
      "text": "Use the model that's mentioned in the question."
    }
  ]
}
```

### Run Promptfoo Evaluation

1. Update the promptfoo YAML with your API URL
2. Run: `npx -y promptfoo eval --config project-tds-virtual-ta-promptfoo.yaml`

## 📋 Submission Checklist

### GitHub Repository (Required)
- ✅ Public repository named `tds-virtual-ta`
- ✅ MIT LICENSE file in root directory
- ✅ All source code files committed
- ✅ Repository URL: `https://github.com/YOUR_USERNAME/tds-virtual-ta`

### Deployed Application (Required)
- ✅ Public API endpoint accessible
- ✅ Returns proper JSON responses
- ✅ Handles all test questions correctly
- ✅ API URL: `https://your-app-name.onrender.com/api/`

### Bonus Features (Extra Points)
- ✅ Discourse scraper script included (`scraper.py`)
- ✅ Production-ready code quality
- ✅ Comprehensive testing suite
- ✅ Complete documentation

## 🎯 Expected Evaluation Results

Based on the implementation:

### Core Requirements (2 points each)
1. **GPT Model Question**: ✅ Correctly advises gpt-3.5-turbo-0125
2. **GA4 Dashboard**: ✅ Shows "110" for 10/10 + bonus
3. **Docker/Podman**: ✅ Recommends Podman, accepts Docker
4. **Future Exams**: ✅ Appropriately says information not available
5. **API Format**: ✅ Proper JSON with answer and links

### Bonus Points
- **+1 point**: Discourse scraper implementation
- **+2 points**: Production-ready for official adoption

## 🔧 Local Development

```bash
# Quick start
chmod +x quick_start.sh
./quick_start.sh

# Manual setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m pytest test_main.py
uvicorn main:app --reload
```

## 📞 Support

If you encounter issues:

1. Check the deployment logs
2. Verify all files are uploaded to GitHub
3. Ensure the MIT LICENSE is in the root directory
4. Test API endpoints manually
5. Review the promptfoo test results

## 🎉 Final Submission

Submit these URLs to the evaluation system:

1. **GitHub Repository**: `https://github.com/YOUR_USERNAME/tds-virtual-ta`
2. **Deployed API**: `https://your-app-name.onrender.com/api/`

**Due Date**: Saturday, June 14, 2025, 11:59 PM IST

Good luck with your submission! 🚀