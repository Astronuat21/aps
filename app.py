from flask import Flask, request, jsonify, render_template, send_from_directory
import os, json, time

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
DB_FILE = "files.json"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load database or create new
if os.path.exists(DB_FILE):
    with open(DB_FILE, "r") as f:
        file_db = json.load(f)
else:
    file_db = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "No file part", 400

    file = request.files["file"]
    if file.filename == "":
        return "No selected file", 400

    if not file.filename.lower().endswith(".stl"):
        return "Invalid file type (only .stl allowed)", 400

    filename = f"{int(time.time())}_{file.filename}"
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(save_path)

    file_db.append({"name": filename, "time": time.time(), "printed": False})
    with open(DB_FILE, "w") as f:
        json.dump(file_db, f)

    return "File uploaded successfully!"

@app.route("/files")
def list_files():
    return jsonify([f for f in file_db if not f["printed"]])

@app.route("/download/<filename>")
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route("/mark_printed/<filename>", methods=["POST"])
def mark_printed(filename):
    for f in file_db:
        if f["name"] == filename:
            f["printed"] = True
            break
    with open(DB_FILE, "w") as f:
        json.dump(file_db, f)
    return "Marked as printed"

if __name__ == "__main__":
    app.run(debug=True)