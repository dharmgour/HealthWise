from flask import Blueprint, request, jsonify
import cloudinary
import cloudinary.uploader
from models import Upload  # MongoDB Upload Model

upload_bp = Blueprint("upload_bp", __name__)

# Allowed file types
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# ---------------------------------------------------------
# 1️⃣ UPLOAD FILE ROUTE
# ---------------------------------------------------------
@upload_bp.route("/", methods=["POST"])
def upload_file():
    # Validate user email
    user_email = request.form.get("user_email")
    if not user_email:
        return jsonify({"error": "User email is required"}), 400

    # Validate file present
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Validate file type
    if not allowed_file(file.filename):
        return jsonify({"error": "Only PDF, JPG, JPEG, or PNG files are allowed"}), 400

    try:
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            file,
            folder="healthwise_uploads",
            resource_type="auto"
        )

        # Save to MongoDB
        record = Upload(
            user_email=user_email,
            file_url=result.get("secure_url"),
            public_id=result.get("public_id"),
            format=result.get("format"),
            bytes=result.get("bytes"),
        )
        record.save()

        # Send success response
        return jsonify({
            "message": "File uploaded successfully ✅",
            "user_email": record.user_email,
            "file_url": record.file_url,
            "public_id": record.public_id,
            "format": record.format,
            "bytes": record.bytes,
            "id": str(record.id)
        }), 200

    except Exception as e:
        print("❌ Upload Error:", str(e))
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------
# 2️⃣ GET ALL UPLOADS OF A USER
# ---------------------------------------------------------
@upload_bp.route("/user/<email>", methods=["GET"])
def get_user_uploads(email):
    try:
        uploads = Upload.objects(user_email=email).order_by("-created_at")
        data = [u.to_json() for u in uploads]
        return jsonify(data), 200
    except Exception as e:
        print("❌ Fetch Error:", str(e))
        return jsonify({"error": "Failed to fetch uploads"}), 500


# ---------------------------------------------------------
# 3️⃣ FILE TOO LARGE ERROR HANDLER
# ---------------------------------------------------------
@upload_bp.errorhandler(413)
def too_large(e):
    return jsonify({"error": "File too large. Max allowed is 100 MB."}), 413
