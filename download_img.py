import requests
import os

# Function to download image
def download_image(url, folder, count):
    # Create the folder if it doesn't exist
    if not os.path.exists(folder):
        os.makedirs(folder)
    
    # Extract filename from URL
    filename = f"{count}.jpg"
    
    # Download the image
    response = requests.get(url)
    if response.status_code == 200:
        with open(os.path.join(folder, filename), 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {filename}")
    else:
        print(f"Failed to download: {filename}")

# Read multimedia file and download images
downloaded_count = 0
with open('multimedia_Hygrophoropsis_Aurantiaca.txt', 'r', encoding='utf-8') as file:
    next(file)  # Skip header
    for line in file:
        if downloaded_count >= 700:
            break
        data = line.strip().split('\t')
        if data[1] == 'StillImage' and data[2] == 'image/jpeg':
            download_image(data[3], 'Hygrophoropsis_Aurantiaca', downloaded_count)  # Change 'images' to desired folder name
            downloaded_count += 1
