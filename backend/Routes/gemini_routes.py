from flask import Blueprint, request, jsonify
import google.generativeai as genai
import requests
import base64
import traceback

gemini_bp = Blueprint("gemini_bp", __name__)

# ----------------------------------
# 1. General Chat Route (FIXED CORS)
# ----------------------------------
@gemini_bp.route("/chat", methods=["POST", "OPTIONS"])
def chat_with_gemini():
    if request.method == "OPTIONS":   # <-- FIX
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json()
        message = data.get("message")

        if not message:
            return jsonify({"error": "Message is required"}), 400

        model = genai.GenerativeModel("models/gemini-2.5-flash-lite")
        response = model.generate_content(message)

        return jsonify({"reply": response.text})

    except Exception:
        print("\n🔥 ERROR (CHAT):")
        traceback.print_exc()
        return jsonify({"error": "Internal error in chat"}), 500


# -----------------------------------------
# 2. Medical Report Analyzer (FIXED CORS)
# -----------------------------------------
@gemini_bp.route("/analyze-report", methods=["POST", "OPTIONS"])
def analyze_report():
    if request.method == "OPTIONS":   # <-- FIX
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json()
        image_url = data.get("image_url")

        if not image_url:
            return jsonify({"error": "image_url is required"}), 400

        print("\n📥 Downloading image from:", image_url)
        # Download image

        response = requests.get(image_url)
        img_data = response.content
        mime_type = response.headers.get("Content-Type", "image/jpeg")
        img_base64 = base64.b64encode(img_data).decode("utf-8")  

        # ✔ Cloudinary se image download karti hai
        # ✔ Usko Base64 me convert karti hai
        # ✔ Fir Gemini model ko send karti hai:

        model = genai.GenerativeModel("models/gemini-2.5-flash-lite")

        prompt = """
Analyze the medical report and give a structured summary.

### 1. Patient Details
- Name:
- Age:
- Gender:
- Report Date:

### 2. Lab Values
- Test name, value, normal range

### 3. Abnormal Values
- Only abnormal results

### 4. Diagnosis Summary
1–2 line simple diagnosis.

### 5. Important Findings
• point  
• point  

### 6. Health Advice
• advice  
• advice
"""

        gemini_response = model.generate_content(
            contents=[
                {
                    "role": "user",
                    "parts": [
                        {"text": prompt},
                        {
                            "inline_data": {
                                "mime_type": mime_type,
                                "data": img_base64
                            }
                        }
                    ]
                }
            ]
        )

        return jsonify({"summary": gemini_response.text})

    except Exception:
        print("\n🔥 ERROR (REPORT ANALYZE):")
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500


# ------------------------------------------------
# 3. Chatbot Based on Summary (FIXED CORS)
# ------------------------------------------------
@gemini_bp.route("/chat-summary", methods=["POST", "OPTIONS"])
def chat_with_summary():
    if request.method == "OPTIONS":   # <-- FIX
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json()
        user_message = data.get("message")
        summary_text = data.get("summary")

        if not user_message or not summary_text:
            return jsonify({"error": "message and summary are required"}), 400

        model = genai.GenerativeModel("models/gemini-2.5-flash-lite")

        prompt = f"""
You are a medical assistant.
Use ONLY the summary below to answer.

SUMMARY:
{summary_text}

RULES:
- Keep answers short
- Do NOT add new medical findings
- Answer ONLY from summary

User Question: {user_message}
"""

        response = model.generate_content(prompt)
        return jsonify({"reply": response.text})

    except Exception:
        print("\n🔥 ERROR (CHAT SUMMARY):")
        traceback.print_exc()
        return jsonify({"error": "Chat summary failed"}), 500


# -----------------------------------------
# 4. Diet Plan Generator (FIXED CORS)
# -----------------------------------------
# -------------------------
# 4. DIET PLAN API (FULL FIXED)
# -------------------------
@gemini_bp.route("/diet-plan", methods=["POST"])
def diet_plan():
    try:
        data = request.get_json()
        summary_text = data.get("summary")

        if not summary_text:
            return jsonify({"error": "summary is required"}), 400

        model = genai.GenerativeModel("models/gemini-2.5-flash")

        prompt = f"""
You are a professional clinical dietician AI.

Generate a personalized diet plan ONLY based on this medical report summary:

-------------------------
{summary_text}
-------------------------

Your output MUST follow this structure:

### Morning
- 4–5 bullet points

### Afternoon
- 4–5 bullet points

### Evening
- 4–5 bullet points

### Foods to Avoid
- 5–6 bullet points

### Important Notes
- 3 bullet points

RULES:
- Do NOT invent diseases.
- Do NOT add anything not present in the summary.
- Keep everything simple and in Indian diet context.
"""

        try:
            response = model.generate_content(prompt)
        except Exception as e:
            # HANDLE GEMINI QUOTA ERROR
            return jsonify({
                "error": "Gemini quota exceeded or API failed",
                "details": str(e)
            }), 429

        # SUCCESS RESPONSE
        return jsonify({
            "diet_plan": response.text
        }), 200

    except Exception as e:
        print("\n🔥 ERROR (DIET PLAN):")
        print(str(e))
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500
