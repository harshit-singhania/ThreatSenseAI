import cv2
import os
import numpy as np
from collections import Counter

# Import real prediction functions
# We assume dependencies are installed now
try:
    # Adjust path if needed based on where this file is relative to New_Model
    import sys
    sys.path.append(os.path.join(os.path.dirname(__file__), 'New_Model'))
    from predictyolo import detect_person_count
    from predict import predict_image
except ImportError as e:
    print(f"Import Error in video_processor: {e}")
    # Fallback only if absolutely necessary, but we want to fail fast if models are missing now
    def predict_image(image_path):
        return "Model Import Error"
    def detect_person_count(image_path):
        return 0

def process_video(video_path, sample_rate=30):
    """
    Process video frames to detect threats and people.
    sample_rate: Process 1 frame every 'sample_rate' frames.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError("Could not open video file")

    frame_count = 0
    predictions = []
    max_people = 0
    
    import tempfile

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % sample_rate == 0:
            # Save frame to temp file for models that expect file path
            with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp:
                cv2.imwrite(tmp.name, frame)
                tmp_path = tmp.name

            try:
                # 1. Classification
                label = predict_image(tmp_path)
                predictions.append(label)

                # 2. Detection
                count = detect_person_count(tmp_path)
                if count > max_people:
                    max_people = count

            except Exception as e:
                print(f"Error processing frame {frame_count}: {e}")
            finally:
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)

        frame_count += 1

    cap.release()

    # Aggregate results
    if not predictions:
        return {"classification": "Unknown", "people_count": 0}

    most_common_label = Counter(predictions).most_common(1)[0][0]
    
    return {
        "classification": most_common_label,
        "people_count": max_people
    }
