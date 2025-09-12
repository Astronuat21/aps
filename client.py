import requests, os, time

# Replace with your Railway URL
SERVER_URL = "https://aps-production-ebf8.up.railway.app"
DOWNLOAD_DIR = "C:/3DPrints"  # Folder on your PC

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

while True:
    try:
        response = requests.get(f"{SERVER_URL}/files")
        files = response.json()

        for f in files:
            filename = f["name"]
            file_url = f"{SERVER_URL}/download/{filename}"
            save_path = os.path.join(DOWNLOAD_DIR, filename)

            if not os.path.exists(save_path):
                print(f"Downloading {filename}...")
                r = requests.get(file_url)
                with open(save_path, "wb") as out:
                    out.write(r.content)

                # Mark as printed so it won’t download again
                requests.post(f"{SERVER_URL}/mark_printed/{filename}")
                print(f"Saved to {save_path}")

    except Exception as e:
        print(f"Error: {e}")

    time.sleep(60)  # Check every 60 seconds