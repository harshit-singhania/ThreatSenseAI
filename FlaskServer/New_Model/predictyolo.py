import os
import cv2
from ultralytics import YOLO

yolo_model_path = './runs/detect/train3/weights/last.pt'
yolo_model = YOLO(yolo_model_path)

def resize_image(image, size=(650,400)):
    return cv2.resize(image, size)

def detect_people(frame):
    results = yolo_model(frame)
    person_boxes = results.xyxy[0].cpu().numpy()
    return person_boxes

def detect_person_count(image_path):
    frame = cv2.imread(image_path)
    frame = resize_image(frame, (650,400))
    threshold = 0.5
    results = yolo_model(frame)[0]
    person_count = 0

    for result in results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result

        if score > threshold:
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
            cv2.putText(frame, yolo_model.names[int(class_id)].upper(), (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)
        person_count += 1
         
    return person_count

import sys

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]  # Receive the path from command-line arguments
    detect_person_count(image_path)
