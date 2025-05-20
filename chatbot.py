from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import RobertaForSequenceClassification, RobertaTokenizer
import torch
import torchvision.transforms as transforms
from PIL import Image
import io
import random


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set up device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ================== RoBERTa Model Setup ==================
model_folder = "./RoBERTa"  # Replace with your local path

try:
    roBerta_tokenizer = RobertaTokenizer.from_pretrained(model_folder)
    roBerta_model = RobertaForSequenceClassification.from_pretrained(model_folder).to(device)
    roBerta_model.eval()
except Exception as e:
    print(f"Error loading RoBERTa model: {e}")
    exit()

# ================== ResNet50 Model Setup ==================
resnet_model_path = "./resnet50_new.pth"  # Replace with your local path

try:
    resnet_model = torch.hub.load('pytorch/vision', 'resnet50', pretrained=False)
    resnet_model.fc = torch.nn.Linear(resnet_model.fc.in_features, 15)
    resnet_model.load_state_dict(torch.load(resnet_model_path, map_location=device))
    resnet_model.to(device)
    resnet_model.eval()
except Exception as e:
    print(f"Error loading ResNet model: {e}")
    exit()

# RoBERTa Labels
ROBERTA_DID_TO_DISEASE = {
   0: "Vitiligo",
    1: "Folliculitis",
    2: "Eczema",
    3: "Ringworm (tinea corporis)",
    4: "Athlete's foot (tinea pedis)",
    5: "Rosacea",
    6: "Psoriasis",
    7: "Shingles",
    8: "Impetigo",
    9: "Scabies",
    10: "Contact dermatitis",
    11: "Acne",
    12: "Lupus",
    13: "Seborrheic dermatitis",
    14: "Milia"
}

# ResNet Labels
RESNET_DID_TO_DISEASE = {
    i: d for i, d in enumerate([
        'Acne', 'Athlete-foot', 'Contact Dermatitis', 'Eczema', 'Folliculitis',
        'Impetigo', 'Lupus', 'Milia', 'Psoriasis', 'Rosacea',
        'Scabies Lyme Disease and other Infestations and Bites', 'Seborrh_Keratoses',
        'Shingles', 'Tinea Ringworm Candidiasis', 'Vitiligo'
    ])
}

# ================== Image Preprocessing ==================
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    return transform(image).unsqueeze(0).to(device)

import random

# Hardcoded responses for chat (text) predictions
CHAT_RESPONSES = [
    "It appears that you might be suffering from {}. Please consult a healthcare professional.",
    "Your symptoms closely match {}. Consider seeking medical advice.",
    "Based on the information, {} seems likely. Take care and stay safe!",
    "There's a chance you have {}. Monitoring symptoms is recommended.",
    "The symptoms suggest {}. Please consult a dermatologist.",
    "It looks like {} could be the condition affecting you."
]

# Hardcoded responses for image predictions
IMAGE_RESPONSES = [
    "This image most likely shows signs of {}. Professional diagnosis is advised.",
    "Based on the image, {} appears to be the condition.",
    "The skin condition looks like {} from the image provided.",
    "Image analysis suggests the possibility of {}.",
    "The visual signs correspond to {}. Please seek medical confirmation.",
    "This appears to be {} as per the image characteristics."
]

# ================== Chat Endpoint ==================
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '').strip()
    if not message:
        return jsonify({"error": "Message must be a non-empty string"}), 400

    inputs = roBerta_tokenizer(message, return_tensors="pt").to(device)
    outputs = roBerta_model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)
    confidence, predicted_class = torch.max(probs, dim=1)
    confidence = confidence.item() * 100
    predicted_class = predicted_class.item()

    threshold = 50  # Set your desired threshold here

    if confidence < threshold:
        return jsonify({
            "response": "Sorry, I'm not confident enough to make a diagnosis based on your symptoms.",
            "confidence": round(confidence, 2)
        })

    disease = ROBERTA_DID_TO_DISEASE.get(predicted_class, 'Unknown Disease')
    response_template = random.choice(CHAT_RESPONSES)
    response = response_template.format(disease)

    return jsonify({
        "response": response,
        "confidence": round(confidence, 2)
    })

# ================== Image Prediction Endpoint ==================
@app.route('/predict_image', methods=['POST'])
def predict_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    image_bytes = request.files['file'].read()
    try:
        image_tensor = preprocess_image(image_bytes)
    except Exception:
        return jsonify({"error": "Invalid image format"}), 400

    with torch.no_grad():
        outputs = resnet_model(image_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, predicted_class = torch.max(probs, dim=1)
        confidence = confidence.item() * 100
        predicted_class = predicted_class.item()

        threshold = 70  # Set your desired threshold here

        if confidence < threshold:
            return jsonify({
                "prediction": "I'm not confident enough to classify this image as a known disease.",
                "confidence": round(confidence, 2)
            })

        disease_label = RESNET_DID_TO_DISEASE.get(predicted_class, "Unknown Disease")
        response_template = random.choice(IMAGE_RESPONSES)
        prediction_text = response_template.format(disease_label)

        return jsonify({
            "prediction": prediction_text,
            "confidence": round(confidence, 2)
        })


# # ================== API Endpoints ==================
# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.json
#     message = data.get('message', '').strip()
#     if not message:
#         return jsonify({"error": "Message must be a non-empty string"}), 400

#     inputs = roBerta_tokenizer(message, return_tensors="pt").to(device)
#     outputs = roBerta_model(**inputs)

#     probs = torch.softmax(outputs.logits, dim=1)
#     confidence, predicted_class = torch.max(probs, dim=1)
#     confidence = confidence.item() * 100
#     predicted_class = predicted_class.item()

#     threshold = 50  # Set your desired threshold here

#     if confidence < threshold:
#         return jsonify({
#             "response": "Sorry, I'm not confident enough to make a diagnosis based on your symptoms.",
#             "confidence": round(confidence, 2)
#         })

#     response = f"Based on the symptoms you mentioned, it seems you might have {ROBERTA_DID_TO_DISEASE.get(predicted_class, 'Unknown Disease')}."
#     return jsonify({
#         "response": response,
#         "confidence": round(confidence, 2)
#     })

# @app.route('/predict_image', methods=['POST'])
# def predict_image():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     image_bytes = request.files['file'].read()
#     try:
#         image_tensor = preprocess_image(image_bytes)
#     except Exception:
#         return jsonify({"error": "Invalid image format"}), 400

#     with torch.no_grad():
#         outputs = resnet_model(image_tensor)
#         probs = torch.softmax(outputs, dim=1)
#         confidence, predicted_class = torch.max(probs, dim=1)
#         confidence = confidence.item() * 100
#         predicted_class = predicted_class.item()

#         threshold = 70  # Set your desired threshold here

#         if confidence < threshold:
#             return jsonify({
#                 "prediction": "I'm not confident enough to classify this image as a known disease.",
#                 "confidence": round(confidence, 2)
#             })

#         disease_label = RESNET_DID_TO_DISEASE.get(predicted_class, "Unknown Disease")

#         return jsonify({
#             "prediction": disease_label,
#             "confidence": round(confidence, 2)
#         })


if __name__ == "__main__":
    print("Starting Flask server on http://0.0.0.0:5001")
    app.run(debug=True, host="0.0.0.0", port=5001)
