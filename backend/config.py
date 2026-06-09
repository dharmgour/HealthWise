import os
from dotenv import load_dotenv
import cloudinary
import google.generativeai as genai

load_dotenv()  # Load .env file

# Cloudinary Config
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

# Gemini API Config (IMPORTANT: only once)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# JWT Secret
JWT_SECRET = os.getenv("JWT_SECRET", "healthwise_secret")

# Debug: Print available models (optional)
print("⚡ Available Gemini Models:")
try:
    for m in genai.list_models():
        print(" →", m.name)
except Exception as e:
    print("Gemini Error:", e)
