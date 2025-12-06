import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from video_processor import process_video

# Import real prediction functions
try:
    from predict import predict_image
except ImportError as e:
    print(f"Import Error in app.py: {e}")
    def predict_image(image_path):
        return "Model Import Error"

app = Flask(__name__)

# Security: Restrict CORS to the frontend origin
CORS(app, origins=["http://localhost:5173"])

# Security: Limit max content length to 100MB to allow video uploads
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'mp4', 'avi', 'mov'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/classify', methods=['POST'])
def classify_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image = request.files['image']

        if image.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if not allowed_file(image.filename):
            return jsonify({'error': 'Invalid file type. Allowed: png, jpg, jpeg, webp'}), 400

        import tempfile
        
        suffix = "." + image.filename.rsplit('.', 1)[1].lower()
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            image.save(tmp.name)
            tmp_path = tmp.name

        try:
            label = predict_image(tmp_path)
            os.remove(tmp_path)
            return jsonify({'label': label})
        except Exception as e:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            print(f"Prediction error: {e}")
            return jsonify({'error': 'Model prediction failed'}), 500

    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/analyze_video', methods=['POST'])
def analyze_video():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No video file provided'}), 400

        video = request.files['video']

        if video.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if not allowed_file(video.filename):
            return jsonify({'error': 'Invalid file type. Allowed: mp4, avi, mov'}), 400

        import tempfile
        
        suffix = "." + video.filename.rsplit('.', 1)[1].lower()
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            video.save(tmp.name)
            tmp_path = tmp.name

        try:
            # Process video (sample every 30 frames ~ 1 sec for 30fps video)
            results = process_video(tmp_path, sample_rate=30)
            os.remove(tmp_path)
            return jsonify(results)
        except Exception as e:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            print(f"Video processing error: {e}")
            return jsonify({'error': 'Video processing failed'}), 500

    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(port=7001, debug=True)