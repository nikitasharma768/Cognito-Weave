import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="web", static_url_path="")

@app.route("/healthz")
def healthz():
    return {"status": "ok"}

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_or_index(path):
    full_path = os.path.join(app.static_folder, path)
    if os.path.isfile(full_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5005))
    app.run(host="0.0.0.0", port=port, debug=True)
