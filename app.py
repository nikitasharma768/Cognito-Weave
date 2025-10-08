from flask import Flask, render_template

app = Flask(__name__, static_folder="web", static_url_path="")

@app.route("/")
def story():
    return render_template("story.html")

if __name__ == "__main__":
    print("Starting Flask on http://127.0.0.1:5000")
    app.run(debug=True)
