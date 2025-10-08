from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="web", static_url_path="")
CORS(app)  # optional, safe to keep

@app.route("/")
def root():
    return send_from_directory(app.static_folder, "index.html")

# if your SPA uses client-side routing, route everything back to index.html
@app.route("/<path:path>")
def catch_all(path):
    # serve static files if they exist, else index.html
    full = os.path.join(app.static_folder, path)
    if os.path.isfile(full):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5005))
    app.run(host="0.0.0.0", port=port, debug=True)
