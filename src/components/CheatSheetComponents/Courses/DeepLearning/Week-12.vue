<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">🚀 Deep Learning – Week 12</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Real-World Capstone Project · AI Health &amp; Activity Intelligence Platform</p>
    </header>

    <!-- ============ 1. Project Overview ============ -->
    <section class="section" id="dl-w12-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">1. Project Overview</h2>
      <div class="content-card">
        <div class="project-banner bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl text-center">
          <span class="text-5xl block mb-2">🏥</span>
          <h3 class="text-2xl font-bold text-rose-800">AI Health &amp; Activity Intelligence Platform</h3>
          <p class="text-gray-600">An end-to-end AI product combining Computer Vision, Signal Processing, and NLP</p>
        </div>

        <div class="architecture-flow bg-gray-100 p-6 rounded-xl mt-4">
          <div class="flex flex-wrap items-center justify-center gap-2">
            <div class="text-center">
              <div class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">👤 USER</div>
            </div>
            <span class="text-2xl text-rose-600">↓</span>
            <div class="text-center">
              <div class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold">🌐 Web/Mobile Interface</div>
            </div>
            <span class="text-2xl text-rose-600">↓</span>
            <div class="text-center">
              <div class="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold">🔗 REST API</div>
            </div>
            <span class="text-2xl text-rose-600">↓</span>
            <div class="flex flex-wrap items-center gap-2">
              <div class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold">🧠 ML Model</div>
              <span class="text-gray-400">+</span>
              <div class="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-bold">💾 Database</div>
            </div>
            <span class="text-2xl text-rose-600">↓</span>
            <div class="text-center">
              <div class="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold">📊 Results Dashboard</div>
            </div>
          </div>
        </div>

        <div class="gate-box bg-rose-50 border-l-4 border-rose-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 Project Goal:</strong> Build an <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">end-to-end AI product</span> that combines multiple deep learning concepts into a <strong>working prototype</strong> with a user interface.</p>
          <p class="text-sm text-gray-600 mt-2">⚠️ <strong>Important:</strong> Position this as an <span class="font-semibold">educational prototype</span>, not a medical diagnostic system.</p>
        </div>
      </div>
    </section>

    <!-- ============ 2. Capstone Project Options ============ -->
    <section class="section" id="dl-w12-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">2. Capstone Project Options</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <span class="text-2xl block">🩻</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Option 1 – Smart Medical Image Classifier</h3>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Input:</strong> Medical Image</li>
              <li><strong>Output:</strong> Class, Confidence, Explanation (Grad-CAM)</li>
              <li><strong>Tech:</strong> CNN, ResNet, Transfer Learning, Grad-CAM, FastAPI</li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <span class="text-2xl block">💓</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Option 2 – Intelligent ECG Classification</h3>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Input:</strong> ECG Signal</li>
              <li><strong>Output:</strong> Normal / Abnormal / Disease Category</li>
              <li><strong>Tech:</strong> 1D CNN, LSTM/GRU, Signal Preprocessing, PyTorch</li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <span class="text-2xl block">💬</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Option 3 – AI Customer Support Classifier</h3>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Input:</strong> "My payment has failed."</li>
              <li><strong>Output:</strong> Payment / Account / Technical / Refund / Delivery / Complaint</li>
              <li><strong>Tech:</strong> BERT, Transformers, Hugging Face, Fine-tuning, FastAPI</li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <span class="text-2xl block">🌿</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Option 4 – Plant Disease Detection</h3>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Input:</strong> Leaf Image</li>
              <li><strong>Output:</strong> Healthy / Early Blight / Late Blight / Leaf Spot + Confidence</li>
              <li><strong>Tech:</strong> CNN, ResNet/MobileNet, Data Augmentation, Grad-CAM</li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600 md:col-span-2">
            <span class="text-2xl block">🎯</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Option 5 – Real-Time Object Detection</h3>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Input:</strong> Image/Video Stream</li>
              <li><strong>Output:</strong> Detect: Person, Car, Bike, Mobile, Bottle, Laptop</li>
              <li><strong>Tech:</strong> CNN, YOLO, OpenCV, PyTorch, Web API</li>
            </ul>
          </div>
        </div>

        <div class="recommendation-box bg-gradient-to-r from-rose-100 to-pink-100 p-5 rounded-xl mt-4 border-2 border-rose-300">
          <h3 class="text-lg font-bold text-rose-800 mt-0">🔥 Recommended: AI-Based Smart Healthcare Assistant</h3>
          <p class="text-sm text-gray-700">Combines multiple deep learning concepts from the course:</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <div class="bg-white p-3 rounded-lg text-center">
              <span class="text-2xl block">🩻</span>
              <p class="font-bold text-sm">Image Analysis</p>
              <p class="text-xs text-gray-600">CNN + Transfer Learning</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <span class="text-2xl block">💓</span>
              <p class="font-bold text-sm">Signal Analysis</p>
              <p class="text-xs text-gray-600">1D CNN / LSTM</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <span class="text-2xl block">💬</span>
              <p class="font-bold text-sm">NLP</p>
              <p class="text-xs text-gray-600">Transformer / BERT</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 3. Smart Healthcare Assistant ============ -->
    <section class="section" id="dl-w12-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">3. Smart Healthcare Assistant – Implementation</h2>
      <div class="content-card">
        <h3 class="text-xl font-bold text-gray-800 mt-0">Module 1 – Image Analysis</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code># image_classifier.py
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import numpy as np

class ImageClassifier:
    """Medical image classifier using ResNet with Grad-CAM."""
    
    def __init__(self, model_path, num_classes=4):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        # Load pre-trained ResNet50
        self.model = models.resnet50(pretrained=True)
        num_features = self.model.fc.in_features
        self.model.fc = nn.Linear(num_features, num_classes)
        self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.to(self.device)
        self.model.eval()
        
        self.classes = ['Normal', 'Disease A', 'Disease B', 'Disease C']
        
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
    
    def predict(self, image_path):
        """Predict class and generate Grad-CAM explanation."""
        image = Image.open(image_path).convert('RGB')
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            outputs = self.model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            predicted_class = torch.argmax(probabilities, dim=1).item()
        
        confidence = probabilities[0][predicted_class].item() * 100
        grad_cam = self.generate_gradcam(input_tensor, predicted_class)
        
        return {
            'prediction': self.classes[predicted_class],
            'confidence': confidence,
            'grad_cam': grad_cam,
            'probabilities': probabilities.cpu().numpy().tolist()
        }
    
    def generate_gradcam(self, input_tensor, class_idx):
        """Generate Grad-CAM heatmap."""
        # Implementation with hooks (simplified)
        # Full implementation from Week 7
        pass</code></pre>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Module 2 – ECG Signal Analysis</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code># ecg_analyzer.py
import torch
import torch.nn as nn
import numpy as np
from scipy import signal

class ECGClassifier:
    """ECG signal classifier using LSTM."""
    
    def __init__(self, model_path, num_classes=3):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        self.model = ECG_LSTM(num_classes=num_classes)
        self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.to(self.device)
        self.model.eval()
        
        self.classes = ['Normal', 'Arrhythmia', 'Abnormal']
        self.seq_length = 200
    
    def predict(self, signal_data):
        """Predict ECG class from signal."""
        # Preprocess signal
        processed = self.preprocess_signal(signal_data)
        
        # Convert to tensor
        input_tensor = torch.FloatTensor(processed).unsqueeze(0).unsqueeze(-1).to(self.device)
        
        with torch.no_grad():
            outputs = self.model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            predicted_class = torch.argmax(probabilities, dim=1).item()
        
        return {
            'prediction': self.classes[predicted_class],
            'confidence': probabilities[0][predicted_class].item() * 100,
            'probabilities': probabilities.cpu().numpy().tolist()
        }
    
    def preprocess_signal(self, signal_data):
        """Preprocess ECG signal."""
        # Remove baseline wander
        b, a = signal.butter(0.5, 0.05, btype='high')
        filtered = signal.filtfilt(b, a, signal_data)
        
        # Normalize
        normalized = (filtered - np.mean(filtered)) / np.std(filtered)
        
        # Resample to fixed length
        if len(normalized) > self.seq_length:
            normalized = normalized[:self.seq_length]
        else:
            normalized = np.pad(normalized, (0, self.seq_length - len(normalized)))
        
        return normalized

class ECG_LSTM(nn.Module):
    """LSTM model for ECG classification."""
    
    def __init__(self, input_size=1, hidden_size=128, num_layers=2, num_classes=3):
        super(ECG_LSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)
    
    def forward(self, x):
        out, _ = self.lstm(x)
        out = out[:, -1, :]
        return self.fc(out)</code></pre>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Module 3 – NLP Intent Classification</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code># nlp_classifier.py
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

class NLPClassifier:
    """NLP intent classifier using DistilBERT."""
    
    def __init__(self, model_path, num_classes=7):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(
            model_path,
            num_labels=num_classes
        )
        self.model.to(self.device)
        self.model.eval()
        
        self.intents = [
            'Payment', 'Account', 'Technical', 
            'Refund', 'Delivery', 'Complaint', 'Other'
        ]
        self.max_length = 128
    
    def predict(self, text):
        """Predict intent from text."""
        inputs = self.tokenizer(
            text,
            truncation=True,
            padding='max_length',
            max_length=self.max_length,
            return_tensors='pt'
        )
        
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            probabilities = torch.softmax(outputs.logits, dim=1)
            predicted_class = torch.argmax(probabilities, dim=1).item()
        
        return {
            'intent': self.intents[predicted_class],
            'confidence': probabilities[0][predicted_class].item() * 100,
            'probabilities': probabilities.cpu().numpy().tolist()
        }</code></pre>
      </div>
    </section>

    <!-- ============ 4. FastAPI Integration ============ -->
    <section class="section" id="dl-w12-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">4. FastAPI Integration</h2>
      <div class="content-card">
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code># main.py - Complete FastAPI Application
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
import torch
from PIL import Image
import io
import numpy as np

# Import modules
from image_classifier import ImageClassifier
from ecg_analyzer import ECGClassifier
from nlp_classifier import NLPClassifier

# ============================================================
# 1. INITIALIZE MODELS
# ============================================================

app = FastAPI(
    title="AI Health Assistant",
    description="Multi-modal AI healthcare assistant",
    version="1.0.0"
)

# Initialize models (singleton pattern)
image_model = None
ecg_model = None
nlp_model = None

def get_image_model():
    global image_model
    if image_model is None:
        image_model = ImageClassifier('./models/image_model.pt')
    return image_model

def get_ecg_model():
    global ecg_model
    if ecg_model is None:
        ecg_model = ECGClassifier('./models/ecg_model.pt')
    return ecg_model

def get_nlp_model():
    global nlp_model
    if nlp_model is None:
        nlp_model = NLPClassifier('./models/nlp_model')
    return nlp_model

# ============================================================
# 2. REQUEST MODELS
# ============================================================

class TextRequest(BaseModel):
    text: str

class ECGRequest(BaseModel):
    signal: list

# ============================================================
# 3. ENDPOINTS
# ============================================================

@app.get("/")
async def root():
    return {
        "message": "AI Health Assistant API",
        "endpoints": {
            "/predict/image": "POST - Upload image for diagnosis",
            "/predict/ecg": "POST - Send ECG signal for analysis",
            "/predict/text": "POST - Send text for intent classification",
            "/health": "GET - Health check"
        }
    }

@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    """Predict from uploaded medical image."""
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Save temporarily (or process directly)
        temp_path = f"/tmp/{file.filename}"
        image.save(temp_path)
        
        # Predict
        model = get_image_model()
        result = model.predict(temp_path)
        
        return JSONResponse(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/ecg")
async def predict_ecg(request: ECGRequest):
    """Predict from ECG signal."""
    try:
        # Convert signal to numpy array
        signal_data = np.array(request.signal)
        
        # Predict
        model = get_ecg_model()
        result = model.predict(signal_data)
        
        return JSONResponse(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/text")
async def predict_text(request: TextRequest):
    """Predict intent from text."""
    try:
        model = get_nlp_model()
        result = model.predict(request.text)
        return JSONResponse(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "models": "loaded"}

# ============================================================
# 4. RUN
# ============================================================

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)</code></pre>
      </div>
    </section>

    <!-- ============ 5. Dashboard Frontend ============ -->
    <section class="section" id="dl-w12-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">5. Dashboard Frontend</h2>
      <div class="content-card">
        <div class="dashboard-preview bg-gray-100 p-6 rounded-xl">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-2xl font-bold text-center text-rose-800">🏥 AI Health Dashboard</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="border rounded-lg p-4 text-center bg-blue-50">
                <span class="text-3xl block">🩻</span>
                <h4 class="font-bold">Image Analysis</h4>
                <div class="text-sm mt-2">
                  <span class="bg-green-100 px-2 py-1 rounded inline-block">✅ Processed</span>
                </div>
                <p class="text-sm mt-2"><strong>Prediction:</strong> Class A</p>
                <p class="text-sm"><strong>Confidence:</strong> 94%</p>
              </div>
              <div class="border rounded-lg p-4 text-center bg-purple-50">
                <span class="text-3xl block">💓</span>
                <h4 class="font-bold">ECG Analysis</h4>
                <div class="text-sm mt-2">
                  <span class="bg-green-100 px-2 py-1 rounded inline-block">✅ Processed</span>
                </div>
                <p class="text-sm mt-2"><strong>Prediction:</strong> Normal</p>
                <p class="text-sm"><strong>Confidence:</strong> 91%</p>
              </div>
              <div class="border rounded-lg p-4 text-center bg-pink-50">
                <span class="text-3xl block">💬</span>
                <h4 class="font-bold">NLP Analysis</h4>
                <div class="text-sm mt-2">
                  <span class="bg-green-100 px-2 py-1 rounded inline-block">✅ Processed</span>
                </div>
                <p class="text-sm mt-2"><strong>Intent:</strong> Payment</p>
                <p class="text-sm"><strong>Confidence:</strong> 87%</p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">HTML Dashboard</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;AI Health Dashboard&lt;/title&gt;
    &lt;style&gt;
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f0f4f8; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; padding: 30px; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; border-radius: 16px; margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 20px; }
        .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .card h3 { margin-bottom: 12px; color: #1a1a2e; }
        .upload-area { border: 2px dashed #ccc; padding: 30px; text-align: center; border-radius: 8px; cursor: pointer; }
        .upload-area:hover { border-color: #e94560; }
        .result { margin-top: 16px; padding: 16px; border-radius: 8px; }
        .result.positive { background: #d4edda; border: 1px solid #c3e6cb; }
        .result.negative { background: #f8d7da; border: 1px solid #f5c6cb; }
        .confidence { font-weight: bold; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .badge.success { background: #28a745; color: white; }
        .badge.warning { background: #ffc107; color: #212529; }
        .badge.danger { background: #dc3545; color: white; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="container"&gt;
    &lt;div class="header"&gt;
        &lt;h1&gt;🏥 AI Health Assistant&lt;/h1&gt;
        &lt;p&gt;Multi-modal healthcare intelligence platform&lt;/p&gt;
    &lt;/div&gt;

    &lt;div class="grid"&gt;
        &lt;div class="card"&gt;
            &lt;h3&gt;🩻 Image Analysis&lt;/h3&gt;
            &lt;div class="upload-area" id="imageUpload"&gt;
                &lt;p&gt;📤 Drop medical image here&lt;/p&gt;
                &lt;p style="font-size:12px;color:#888;"&gt;or click to upload&lt;/p&gt;
            &lt;/div&gt;
            &lt;input type="file" id="imageInput" accept="image/*" style="display:none"&gt;
            &lt;div id="imageResult"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="card"&gt;
            &lt;h3&gt;💓 ECG Analysis&lt;/h3&gt;
            &lt;p style="font-size:14px;color:#666;"&gt;Upload ECG signal data&lt;/p&gt;
            &lt;input type="file" id="ecgInput" accept=".csv,.txt" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;"&gt;
            &lt;div id="ecgResult"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="card"&gt;
            &lt;h3&gt;💬 NLP Analysis&lt;/h3&gt;
            &lt;textarea id="textInput" rows="3" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;font-size:14px;" placeholder="Enter your health question..."&gt;&lt;/textarea&gt;
            &lt;button onclick="analyzeText()" style="width:100%;padding:10px;margin-top:10px;background:#e94560;color:white;border:none;border-radius:4px;cursor:pointer;font-size:14px;"&gt;Analyze Intent&lt;/button&gt;
            &lt;div id="textResult"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
const API_URL = 'http://localhost:8000';

// Image Upload
document.getElementById('imageUpload').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    document.getElementById('imageResult').innerHTML = '⏳ Analyzing...';

    try {
        const response = await fetch(`${API_URL}/predict/image`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        displayImageResult(data);
    } catch (error) {
        document.getElementById('imageResult').innerHTML = `❌ Error: ${error.message}`;
    }
});

function displayImageResult(data) {
    const sentiment = data.prediction.toLowerCase();
    document.getElementById('imageResult').innerHTML = `
        &lt;div class="result ${sentiment.includes('normal') ? 'positive' : 'negative'}"&gt;
            &lt;p&gt;&lt;strong&gt;Prediction:&lt;/strong&gt; ${data.prediction}&lt;/p&gt;
            &lt;p&gt;&lt;strong&gt;Confidence:&lt;/strong&gt; &lt;span class="confidence"&gt;${data.confidence.toFixed(1)}%&lt;/span&gt;&lt;/p&gt;
            &lt;span class="badge ${data.confidence > 80 ? 'success' : data.confidence > 60 ? 'warning' : 'danger'}"&gt;
                ${data.confidence > 80 ? 'High Confidence' : data.confidence > 60 ? 'Medium' : 'Low'}
            &lt;/span&gt;
        &lt;/div&gt;
    `;
}

// Text Analysis
async function analyzeText() {
    const text = document.getElementById('textInput').value;
    if (!text) {
        alert('Please enter some text.');
        return;
    }

    document.getElementById('textResult').innerHTML = '⏳ Analyzing...';

    try {
        const response = await fetch(`${API_URL}/predict/text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        document.getElementById('textResult').innerHTML = `
            &lt;div class="result positive"&gt;
                &lt;p&gt;&lt;strong&gt;Intent:&lt;/strong&gt; ${data.intent}&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Confidence:&lt;/strong&gt; ${data.confidence.toFixed(1)}%&lt;/p&gt;
            &lt;/div&gt;
        `;
    } catch (error) {
        document.getElementById('textResult').innerHTML = `❌ Error: ${error.message}`;
    }
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
    </section>

    <!-- ============ 6. Project Deliverables ============ -->
    <section class="section" id="dl-w12-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">6. Project Deliverables</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h4 class="font-bold text-gray-800">📦 Code Repository</h4>
            <ul class="text-sm space-y-1 mt-2">
              <li>✅ Model training notebooks</li>
              <li>✅ Model inference code</li>
              <li>✅ API implementation</li>
              <li>✅ Frontend code</li>
              <li>✅ Docker configuration</li>
            </ul>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-purple-600">
            <h4 class="font-bold text-gray-800">📊 Model Artifacts</h4>
            <ul class="text-sm space-y-1 mt-2">
              <li>✅ Trained model files (.pt)</li>
              <li>✅ Training logs</li>
              <li>✅ Performance metrics</li>
              <li>✅ Confusion matrices</li>
              <li>✅ Grad-CAM examples</li>
            </ul>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-pink-600">
            <h4 class="font-bold text-gray-800">📝 Documentation</h4>
            <ul class="text-sm space-y-1 mt-2">
              <li>✅ API documentation</li>
              <li>✅ Setup instructions</li>
              <li>✅ Usage guide</li>
              <li>✅ Architecture diagram</li>
              <li>✅ Deployment guide</li>
            </ul>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-green-600">
            <h4 class="font-bold text-gray-800">🎥 Demo</h4>
            <ul class="text-sm space-y-1 mt-2">
              <li>✅ Running web application</li>
              <li>✅ Video demonstration</li>
              <li>✅ Presentation slides</li>
              <li>✅ Sample predictions</li>
            </ul>
          </div>
        </div>

        <div class="assignment-box bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mt-4">
          <h3 class="text-lg font-bold text-gray-800 mt-0">📝 Capstone Project Checklist</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Choose one project option</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Collect/Prepare dataset</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Train the model</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Evaluate model performance</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Build API (FastAPI)</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Create frontend dashboard</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Add explainability (Grad-CAM)</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Test &amp; document</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Deploy with Docker</div>
            <div class="flex items-start gap-2"><span class="text-rose-500">□</span> Create final presentation</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 7. Cheat Sheet ============ -->
    <section class="section" id="dl-w12-t7">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">7. Cheat Sheet – Capstone Project</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-rose-800 text-white">
                <th class="p-3 text-left border border-gray-300">Module</th>
                <th class="p-3 text-left border border-gray-300">Technology</th>
                <th class="p-3 text-left border border-gray-300">Key Concepts</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Image Analysis</td>
                <td class="p-3">CNN, ResNet, Transfer Learning</td>
                <td class="p-3">Grad-CAM, Data Augmentation, Fine-tuning</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">ECG Signal</td>
                <td class="p-3">1D CNN, LSTM, GRU</td>
                <td class="p-3">Signal Preprocessing, Sequence Models</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">NLP</td>
                <td class="p-3">BERT, Transformers</td>
                <td class="p-3">Tokenization, Fine-tuning, Classification</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">API</td>
                <td class="p-3">FastAPI, Flask</td>
                <td class="p-3">REST Endpoints, Request/Response Models</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Frontend</td>
                <td class="p-3">HTML, CSS, JavaScript</td>
                <td class="p-3">File Upload, API Calls, Dashboard UI</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Deployment</td>
                <td class="p-3">Docker, Uvicorn</td>
                <td class="p-3">Containerization, Model Serving</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 8. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w12-t8">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-rose-600 pb-2">📘 Quick Revision – Capstone Project</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>Project Goal:</strong> Build an <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">end-to-end AI product</span> from model to deployment</li>
          <li class="pb-3 border-b border-gray-200"><strong>Architecture:</strong> User → Web Interface → REST API → ML Model → Database → Dashboard</li>
          <li class="pb-3 border-b border-gray-200"><strong>5 Project Options:</strong> Medical Image, ECG, NLP, Plant Disease, Object Detection</li>
          <li class="pb-3 border-b border-gray-200"><strong>Recommended:</strong> Smart Healthcare Assistant – combines <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">3 modalities</span></li>
          <li class="pb-3 border-b border-gray-200"><strong>Key Technologies:</strong> PyTorch, Hugging Face, FastAPI, Docker, HTML/CSS/JS</li>
          <li class="pb-3 border-b border-gray-200"><strong>Explainability:</strong> Grad-CAM for image models</li>
          <li class="pb-0"><strong>Final Deliverables:</strong> Code, Models, API, Frontend, Documentation, Demo</li>
        </ul>
        <div class="gate-box bg-rose-50 border-l-4 border-rose-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 Final Message:</strong> This capstone project brings together <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">everything you've learned</span> – from Week 1 fundamentals to Week 11 deployment. You've gone from <strong>"what is a neuron?"</strong> to <strong>"deploying a multi-modal AI product"</strong>. That's incredible! 🚀</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">🚀 Deep Learning Bootcamp – Week 12 · Real-World Capstone Project</p>
      <p class="text-sm text-rose-600 font-semibold mt-2">🎓 Congratulations on completing the Deep Learning Bootcamp!</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  isDarkMode: Boolean,
  week: Number,
});

const emit = defineEmits(['topic-updated']);

onMounted(() => {
  const topics = [
    { id: 'dl-w12-t1', title: 'Project Overview' },
    { id: 'dl-w12-t2', title: 'Capstone Project Options' },
    { id: 'dl-w12-t3', title: 'Smart Healthcare Assistant' },
    { id: 'dl-w12-t4', title: 'FastAPI Integration' },
    { id: 'dl-w12-t5', title: 'Dashboard Frontend' },
    { id: 'dl-w12-t6', title: 'Project Deliverables' },
    { id: 'dl-w12-t7', title: 'Cheat Sheet' },
    { id: 'dl-w12-t8', title: 'Quick Revision' },
  ];
  emit('topic-updated', topics);
});
</script>

<style scoped>
/* ---------- base ---------- */
.cheatsheet-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
  background: #f6f9fc;
  color: #0b1e33;
}

.cheatsheet-header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(145deg, #1a1a2e, #16213e, #9f1239);
  color: white;
  border-radius: 18px;
  margin-bottom: 32px;
}

.section {
  margin-bottom: 32px;
}

.content-card {
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 20, 40, 0.06);
  margin-top: 16px;
}

.content-card code {
  background: #eef3f8;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #0b1e33;
}

/* Code block overrides */
pre code {
  background: transparent !important;
  color: #e2edf7 !important;
}

pre {
  background: #0b1e2f !important;
  color: #e2edf7 !important;
  border: 1px solid #9f1239 !important;
}

.term-code {
  background: #1a1a2e !important;
  color: #e2edf7 !important;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  display: inline-block;
}

.highlight-text {
  background: #fce96a;
  padding: 0 6px;
  border-radius: 4px;
  font-weight: 600;
}

/* Boxes */
.gate-box {
  background: #fdf2f8 !important;
  border-left: 4px solid #9f1239 !important;
}

.assignment-box {
  background: #fefce8 !important;
  border-left: 4px solid #eab308 !important;
}

.architecture-flow {
  background: #fdf2f8 !important;
}

.dashboard-preview {
  background: #fdf2f8 !important;
}

.project-banner {
  background: linear-gradient(135deg, #fdf2f8, #fce7f3) !important;
}

.recommendation-box {
  background: linear-gradient(135deg, #fdf2f8, #fce7f3) !important;
  border-color: #9f1239 !important;
}

/* Responsive */
@media (max-width: 720px) {
  .cheatsheet-header h1 {
    font-size: 2rem !important;
  }
  .content-card {
    padding: 18px;
  }
  .grid {
    grid-template-columns: 1fr !important;
  }
  .term-table {
    font-size: 0.75rem;
  }
  .term-table th,
  .term-table td {
    padding: 6px 8px;
  }
  .architecture-flow .flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>