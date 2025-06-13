# Create requirements.txt
requirements_content = '''fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
aiohttp==3.9.1
beautifulsoup4==4.12.2
python-multipart==0.0.6
jinja2==3.1.2
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
'''

with open("requirements.txt", "w") as f:
    f.write(requirements_content)

print("✅ Created requirements.txt")