# Minimal Flask server to serve the SPA and optional API endpoints
import os, requests
from dotenv import load_dotenv
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from storage import create_or_get_patient, add_entry, add_suggestion, get_session, get_patient

# Load env values for port and optional proxy
load_dotenv()

PORT = int(os.getenv("PORT", 5005))
GEMINI_PROXY_URL = os.getenv("GEMINI_PROXY_URL", "").strip()
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

# Static files live in ../web
app = Flask(__name__, static_folder="../web", static_url_path="")
CORS(app, resources={r"/api/*": {"origins": CORS_ORIGINS}})

# Default instruction for optional proxy call
SYSTEM = (
    "You are a supportive cognitive companion for memory exercises. "
    "Keep replies short, friendly, and in the user's selected language."
)

# Serve the SPA
@app.route("/")
def root():
    return send_from_directory(app.static_folder, "index.html")

# Caregiver route uses same SPA
@app.route("/caregiver")
def caregiver():
    return send_from_directory(app.static_folder, "index.html")

# Optional API for compatibility with earlier version

@app.route("/api/new_or_recall", methods=["POST"])
def new_or_recall():
    # Creates or fetches patient by name and language, returns a code
    data = request.get_json(force=True)
    name = (data.get("name") or "").strip()
    lang = (data.get("lang") or "en").strip()
    if not name:
        return jsonify({"error": "Please type a name"}), 400
    code, is_new = create_or_get_patient(name, lang)
    return jsonify({"code": code, "is_new": is_new})

@app.route("/api/augment_prompt", methods=["POST"])
def augment_prompt():
    # Sends user text to LLM proxy to get a short next prompt
    data = request.get_json(force=True)
    code = (data.get("code") or "").strip()
    lang = (data.get("lang") or "en").strip()
    stage = (data.get("stage") or "warm1").strip()
    user_text = (data.get("text") or "").strip()

    if not code or not get_patient(code):
        return jsonify({"error": "Invalid or missing patient code."}), 400

    # Store raw entry for the session
    add_entry(code, {"lang": lang, "stage": stage, "text": user_text})

    # Build a compact prompt for the proxy
    prompt = f"""
Language: {lang}
Stage: {stage}
User said: "{user_text}"

Respond with ONE short line:
- brief encouragement AND the next question in this stage sequence.
- if the user repeated the question, say: "I heard the question; please tell me your answer."
"""
    try:
        # If no proxy configured, return empty reply gracefully
        if not GEMINI_PROXY_URL:
            return jsonify({"reply": ""})
        r = requests.post(
            GEMINI_PROXY_URL,
            json={
                "prompt": prompt,
                "system": SYSTEM,
                "model": "gemini-1.5-flash",
                "temperature": 0.6,
                "top_p": 0.9,
            },
            timeout=20,
        )
        if r.status_code != 200:
            return jsonify({"error": "Gemini proxy failed", "detail": r.text}), 502
        out = r.json()
        return jsonify({"reply": (out.get("text") or "").strip()})
    except Exception as e:
        return jsonify({"error": "Upstream call error", "detail": str(e)}), 502

@app.route("/api/suggest", methods=["POST"])
def caregiver_suggest():
    # Caregiver adds a suggestion to the current patient session
    data = request.get_json(force=True)
    code = (data.get("code") or "").strip()
    text = (data.get("text") or "").strip()

    if not code or not get_patient(code):
        return jsonify({"error": "Invalid code"}), 400

    sess = get_session(code)
    if not sess or len(sess["entries"]) == 0:
        return jsonify({"error": "No entries yet; complete one memory test first."}), 400

    add_suggestion(code, text)
    return jsonify({"ok": True})

@app.route("/api/session", methods=["GET"])
def session_view():
    # Returns patient, entries, and suggestions for caregiver UI
    code = (request.args.get("code") or "").strip()
    if not code or not get_patient(code):
        return jsonify({"error": "Invalid code"}), 400

    patient = get_patient(code)
    sess = get_session(code) or {}
    return jsonify({
        "patient": patient,
        "entries": sess.get("entries", []),
        "suggestions": sess.get("suggestions", []),
    })

if __name__ == "__main__":
  # Debug server for local development
  app.run(host="0.0.0.0", port=PORT, debug=True)
