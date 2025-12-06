# ThreatSenseAI

ThreatSenseAI is a disaster management system designed to assist in mitigating the impact of natural disasters such as earthquakes, wildfires, and floods. 
The system utilizes advanced machine learning algorithms to analyze **video footage** and assess the severity of the disaster, identify the type of disaster, and the number of individuals affected.

## Features

- **User Registration:** Secure user registration with MongoDB storage.
- **Video Analysis:** Upload video footage (MP4, AVI, MOV) for automated analysis.
- **Real-Time AI Inference:**
    - **Disaster Classification:** Uses a Vision Transformer (ViT) to detect disasters like Wildfires, Floods, and Earthquakes.
    - **Person Detection:** Uses **YOLOv8** to detect and count individuals in the danger zone.
- **Interactive Dashboard:** View analysis results, including disaster type and people count.

## Project Structure 

The project is divided into three main parts:
- **BackEnd:** Node.js Express server for user management and database operations.
- **FlaskServer:** Python Flask server hosting the AI models (YOLOv8 + ViT).
- **FrontEnd:** React-based user interface for interaction and visualization.

## Quick Start (Docker)

The easiest way to run the application is using Docker.

### Prerequisites
- Docker Desktop installed and running.

### Steps
1. Clone the repository.
2. Run the following command in the project root:
   ```bash
   docker compose up --build
   ```
3. Access the application at `http://localhost:5173`.

## Manual Installation 

If you prefer to run services individually:

### 1. Backend (Node.js)
```bash
cd BackEnd
npm install
# Create .env with MONGODB_URI and PORT=8000
npm run dev
```

### 2. Flask Server (Python AI)
```bash
cd FlaskServer
pip install -r requirements.txt
python app.py
```
*Note: The server runs on port 7001.*

### 3. Frontend (React)
```bash
cd FrontEnd
npm install
npm run dev
```
*Access at http://localhost:5173*

## AI Models
- **Person Detection**: `yolov8n.pt` (Ultralytics) - Automatically downloads on first run.
- **Classification**: `google/vit-base-patch16-224` (Hugging Face Transformers).

## Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **AI/ML**: Python, Flask, PyTorch, Transformers, OpenCV, YOLOv8
- **DevOps**: Docker, Docker Compose, Nginx
