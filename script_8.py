# Create a ZIP file with all project files
import zipfile
import os

# List all the files we've created
files_to_zip = [
    "main.py",
    "requirements.txt", 
    "LICENSE",
    "README.md",
    "Procfile",
    "runtime.txt",
    ".gitignore",
    "test_main.py",
    "scraper.py",
    "quick_start.sh"
]

# Create ZIP file
zip_filename = "tds-virtual-ta-complete.zip"

with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in files_to_zip:
        if os.path.exists(file):
            zipf.write(file)
            print(f"✅ Added {file} to ZIP")
        else:
            print(f"❌ File {file} not found")

print(f"\n🎉 Created complete deployment package: {zip_filename}")
print(f"📁 ZIP file size: {os.path.getsize(zip_filename)} bytes")

# Display file structure
print("\n📋 Project Structure:")
print("tds-virtual-ta/")
for file in files_to_zip:
    if os.path.exists(file):
        print(f"├── {file}")

print("\n🚀 Next Steps:")
print("1. Download the ZIP file")
print("2. Extract to a new folder")
print("3. Create GitHub repository: 'tds-virtual-ta'")
print("4. Upload all files to GitHub")
print("5. Deploy to Render/Heroku using the provided configs")
print("6. Test the API with the sample questions")
print("7. Submit GitHub URL and deployed API URL to the evaluation system")