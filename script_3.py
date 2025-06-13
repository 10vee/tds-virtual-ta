# Create Procfile for Heroku deployment
procfile_content = '''web: uvicorn main:app --host 0.0.0.0 --port $PORT
'''

with open("Procfile", "w") as f:
    f.write(procfile_content)

# Create runtime.txt for Python version specification
runtime_content = '''python-3.11.7
'''

with open("runtime.txt", "w") as f:
    f.write(runtime_content)

# Create .gitignore
gitignore_content = '''# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual environments
venv/
ENV/
env/
.venv/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Environment files
.env
.env.local
.env.production

# Logs
logs/
*.log

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
'''

with open(".gitignore", "w") as f:
    f.write(gitignore_content)

print("✅ Created deployment configuration files (Procfile, runtime.txt, .gitignore)")