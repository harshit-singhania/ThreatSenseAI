# ThreatSenseAI

ThreatSenseAI is a disaster management system designed to assist in mitigating the impact of natural disasters such as earthquakes, wildfires, and floods. 
The system utilizes advanced machine learning algorithms to analyze images and assess the severity of the disaster, identify the type of disaster, and the number of individuals affected.

## Project Structure 

The project is divided into three main parts:
- BackEnd: Contains the backend code for handling user registration and database operations.
- FlaskServer: Contains the Flask server code for image classification and person detection.
- FrontEnd: Contains the frontend code for the user interface.

## Working 

- **User Registration:** Users can register by providing their name, email, and message. The backend handles the registration and stores the user information in a MongoDB database.
- **Image Classification:** Users can upload images to the system. The Flask server processes the images using machine learning models to classify the type of disaster and detect the number of people in the image.
- **Results Display:** The frontend displays the classification results and the number of people detected in the image.

## Installation 

### Prerequisites

- Node.js
- Python
- MongoDB

### Project Setup Instructions

#### Backend
1. Navigate to the `BackEnd` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `BackEnd` directory with the following content:
   ```env
   MONGODB_URI=<your_mongodb_uri>
   CORS_ORIGIN=<your_cors_origin>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

#### Flask Server
1. Navigate to the `FlaskServer` directory.
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```

#### Frontend
1. Navigate to the `FrontEnd` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open the frontend application in your browser.
2. Register a new user.
3. Upload an image for classification.
4. View the classification results and the number of people detected in the image.

