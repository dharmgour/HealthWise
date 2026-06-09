from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
import datetime

auth_bp = Blueprint("auth_bp", __name__)

# ✅ SIGNUP route
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    if User.objects(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    user = User(name=name, email=email, password=hashed_password)
    user.save()

    return jsonify({
        "message": "User registered successfully ✅",
        "name": user.name,
        "email": user.email
    }), 201


# ✅ LOGIN route
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.objects(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    expires = datetime.timedelta(days=1)
    access_token = create_access_token(identity=email, expires_delta=expires)

    return jsonify({
        "message": "Login successful ✅",
        "token": access_token,
        "user_email": email,
        "user_name": user.name
    }), 200
