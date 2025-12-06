import os
import cv2
from ultralytics import YOLO

# Use standard YOLOv8n model (will download automatically)
yolo_model_path = 'yolov8n.pt'
yolo_model = YOLO(yolo_model_path)

def resize_image(image, size=(650,400)):
    return cv2.resize(image, size)

def detect_people(frame):
    results = yolo_model(frame)
    person_boxes = results[0].boxes.xyxy.cpu().numpy()
    return person_boxes

def detect_person_count(image_path):
    frame = cv2.imread(image_path)
    if frame is None:
        return 0
    # frame = resize_image(frame, (650,400)) # Optional: resize for speed
    
    # Run inference
    results = yolo_model(frame, verbose=False)[0]
    person_count = 0

    # Class ID for 'person' in COCO dataset is 0
    for box in results.boxes:
        cls_id = int(box.cls[0])
        if cls_id == 0: # 0 is person
            person_count += 1
            
            # Draw bounding box (optional, for debugging/visualization if we saved the image)
            # x1, y1, x2, y2 = box.xyxy[0].tolist()
            # cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)

    return person_count

import sys

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python predictyolo.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    count = detect_person_count(image_path)
    print(f"People detected: {count}")
