import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Test if Cloudinary credentials are loading
print("CLOUDINARY_CLOUD_NAME:", os.getenv("CLOUDINARY_CLOUD_NAME"))
print("CLOUDINARY_API_KEY:", os.getenv("CLOUDINARY_API_KEY"))
print("CLOUDINARY_API_SECRET:", os.getenv("CLOUDINARY_API_SECRET"))
