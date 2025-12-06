import sys
from transformers import pipeline

# Initialize the classifier pipeline with a standard model
# We use a standard ViT model. It won't be specialized for "Wildfire" vs "Flood" specifically
# unless we fine-tune it, but it can detect "fire", "volcano", etc.
try:
    classifier = pipeline("image-classification", model="google/vit-base-patch16-224")
except Exception as e:
    print(f"Failed to load model: {e}")
import sys
from transformers import pipeline

# Initialize the classifier pipeline with a standard model
# We use a standard ViT model. It won't be specialized for "Wildfire" vs "Flood" specifically
# unless we fine-tune it, but it can detect "fire", "volcano", etc.
try:
    classifier = pipeline("image-classification", model="google/vit-base-patch16-224")
except Exception as e:
    print(f"Failed to load model: {e}")
    classifier = None

def predict_image(image_path):
    if classifier is None:
        return "Model Error"
        
    try:
        predictions = classifier(image_path)
        # predictions is a list of dicts: [{'label': '...', 'score': ...}, ...]
        top_prediction = predictions[0]
        label = top_prediction['label']
        score = top_prediction['score']
        
        print(f"Predicted: {label} ({score:.2f})")
        
        # Simple mapping to our expected categories if possible, or just return the label
        # This is a basic heuristic mapping
        label_lower = label.lower()
        if "fire" in label_lower or "flame" in label_lower or "volcano" in label_lower:
            return "Wildfire"
        elif "flood" in label_lower or "water" in label_lower or "canoe" in label_lower or "boat" in label_lower:
            return "Flood"
        elif "quake" in label_lower or "rubble" in label_lower or "tent" in label_lower or "ruin" in label_lower:
            return "Earthquake"
        
        return label # Return the raw label if no mapping found
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return "Error"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        print(predict_image(image_path))