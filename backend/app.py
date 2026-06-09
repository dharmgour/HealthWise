from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import JWT_SECRET
from Routes.upload_routes import upload_bp
from Routes.auth_routes import auth_bp
from Routes.gemini_routes import gemini_bp

app = Flask(__name__)

# GLOBAL CORS FIX
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, allow_headers=["Content-Type"])
app.config['CORS_HEADERS'] = 'Content-Type'

@app.after_request
def apply_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

app.config["JWT_SECRET_KEY"] = JWT_SECRET
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024  # 100 MB

jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(upload_bp, url_prefix="/upload")
app.register_blueprint(gemini_bp, url_prefix="/gemini")

@app.route("/")
def home():
    return jsonify({"message": "HealthWise AI Backend Running with JWT ✅"})

@app.route("/favicon.ico")
def favicon():
    return '', 204

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
