<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">🚀 Deep Learning – Week 6</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Advanced CNN Architectures &amp; Transfer Learning</p>
    </header>

    <!-- ============ 1. CNN Architectures Overview ============ -->
    <section class="section" id="dl-w6-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">1. CNN Architectures Overview</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-blue-700 mt-0">LeNet-5 (1998)</h3>
            <ul class="text-sm space-y-1 mt-2">
              <li><strong>Pioneer</strong> of CNNs</li>
              <li>2 Conv + 3 FC layers</li>
              <li>Used for <strong>handwritten digit</strong> recognition</li>
              <li>~60K parameters</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">nn.Conv2d(1, 6, 5) → Pool → Conv2d(6, 16, 5) → Pool → FC</code>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-blue-700 mt-0">AlexNet (2012)</h3>
            <ul class="text-sm space-y-1 mt-2">
              <li><strong>Breakthrough</strong> on ImageNet</li>
              <li>5 Conv + 3 FC layers</li>
              <li>Introduced <strong>ReLU</strong> and <strong>Dropout</strong></li>
              <li>~60M parameters</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">Conv(11×11) → Pool → Conv(5×5) → Pool → Conv(3×3) ×3 → FC</code>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-blue-700 mt-0">VGG (2014)</h3>
            <ul class="text-sm space-y-1 mt-2">
              <li><strong>Very deep</strong> (16-19 layers)</li>
              <li>Only <strong>3×3 convolutions</strong></li>
              <li>Simple, uniform architecture</li>
              <li>~138M parameters</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">[Conv(3×3)+ReLU] × 2 → Pool → [Conv(3×3)+ReLU] × 3 → Pool</code>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-600">
            <h3 class="text-lg font-bold text-purple-700 mt-0">Inception (2014)</h3>
            <ul class="text-sm space-y-1 mt-2">
              <li><strong>Parallel convolutions</strong> of different sizes</li>
              <li>1×1, 3×3, 5×5 filters in <strong>same layer</strong></li>
              <li>Computationally efficient</li>
              <li>~5-10M parameters</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">Concat(1×1, 3×3, 5×5, Pool) → Next Layer</code>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-green-600">
            <h3 class="text-lg font-bold text-green-700 mt-0">ResNet (2015)</h3>
            <ul class="text-sm space-y-1 mt-2">
              <li><strong>Residual connections</strong> (skip connections)</li>
              <li>Up to <strong>152 layers</strong></li>
              <li>Solved <strong>vanishing gradient</strong> problem</li>
              <li>~25M parameters (ResNet50)</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">x → Conv → ReLU → Conv → + x → ReLU</code>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-orange-600">
            <h3 class="text-lg font-bold text-orange-700 mt-0">MobileNet (2017)</h3>
            <ul class="text-sm space-y-1 mt-2">
              <li><strong>Lightweight</strong> for mobile devices</li>
              <li><strong>Depthwise separable</strong> convolutions</li>
              <li>Efficient: <strong>~4M parameters</strong></li>
              <li>Used in edge devices</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">Depthwise Conv(3×3) → Pointwise Conv(1×1)</code>
          </div>
        </div>

        <div class="architecture-timeline bg-gray-100 p-5 rounded-xl mt-4">
          <div class="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span class="bg-blue-600 text-white px-3 py-1 rounded-full">LeNet '98</span>
            <span class="text-gray-400">→</span>
            <span class="bg-blue-600 text-white px-3 py-1 rounded-full">AlexNet '12</span>
            <span class="text-gray-400">→</span>
            <span class="bg-blue-600 text-white px-3 py-1 rounded-full">VGG '14</span>
            <span class="text-gray-400">→</span>
            <span class="bg-purple-600 text-white px-3 py-1 rounded-full">Inception '14</span>
            <span class="text-gray-400">→</span>
            <span class="bg-green-600 text-white px-3 py-1 rounded-full">ResNet '15</span>
            <span class="text-gray-400">→</span>
            <span class="bg-orange-600 text-white px-3 py-1 rounded-full">MobileNet '17</span>
          </div>
          <p class="text-center text-xs text-gray-500 mt-2">Evolution of CNN architectures – increasing depth and efficiency</p>
        </div>
      </div>
    </section>

    <!-- ============ 2. Residual Connections ============ -->
    <section class="section" id="dl-w6-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">2. Residual Connections (ResNet)</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">The Problem</h3>
            <p class="text-sm text-gray-600">As networks get <strong>deeper</strong>, gradients <strong>vanish</strong> – making training difficult.</p>
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mt-3">
              <p class="text-sm text-red-700"><strong>Vanishing Gradient:</strong> Gradients become <span class="font-bold">exponentially small</span> in deep networks → weights don't update → <strong>performance saturates</strong>.</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">The Solution: Skip Connections</h3>
            <p class="text-sm text-gray-600">Add the <strong>input</strong> directly to the <strong>output</strong> of a block.</p>
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mt-3">
              <p class="text-sm text-green-800"><strong>Residual Connection:</strong> y = F(x) + x</p>
              <p class="text-xs text-gray-600 mt-1">Gradients can flow <strong>directly</strong> through the skip connection.</p>
            </div>
          </div>
        </div>

        <div class="residual-diagram bg-gray-100 p-6 rounded-xl mt-4">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <div class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Input x</div>
            <div class="flex flex-col items-center gap-1">
              <div class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">Conv + ReLU</div>
              <div class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">Conv</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-3xl text-green-600 font-bold">⊕</span>
              <span class="text-xs text-gray-500">(element-wise add)</span>
            </div>
            <div class="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Output = F(x) + x</div>
          </div>
          <div class="flex justify-center mt-2">
            <span class="text-xs text-gray-500">⤴ Skip Connection (shortcut)</span>
          </div>
        </div>

        <div class="formula-box bg-gray-100 border-l-4 border-green-700 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">📐 Residual Block Formula:</p>
          <div class="bg-white p-3 rounded-lg font-mono text-sm text-center">
            y = F(x, {W<sub>i</sub>}) + x
          </div>
          <p class="text-sm text-gray-600 mt-2">Where F is the residual mapping (e.g., two conv layers). The skip connection allows gradients to flow <strong>unimpeded</strong>.</p>
        </div>

        <div class="gate-box bg-green-50 border-l-4 border-green-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Why It Works:</strong> If a layer doesn't learn anything, it can simply <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">pass through</span> the input via the skip connection. This makes training <strong>very deep networks</strong> possible (100+ layers).</p>
        </div>
      </div>
    </section>

    <!-- ============ 3. Transfer Learning ============ -->
    <section class="section" id="dl-w6-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">3. Transfer Learning</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">What is Transfer Learning?</h3>
            <p class="text-sm text-gray-600">Using a model <strong>pre-trained</strong> on a large dataset (e.g., ImageNet) for a <strong>different</strong> task.</p>
            <div class="bg-blue-50 p-4 rounded-lg mt-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🏋️</span>
                <div>
                  <p class="font-bold text-sm">Pre-trained on ImageNet</p>
                  <p class="text-xs text-gray-600">1.2M images · 1000 classes</p>
                </div>
                <span class="text-2xl">→</span>
                <span class="text-2xl">🌿</span>
                <div>
                  <p class="font-bold text-sm">Fine-tuned for Plant Disease</p>
                  <p class="text-xs text-gray-600">~10K images · 4 classes</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Why Transfer Learning?</h3>
            <ul class="text-sm space-y-2">
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Less data</strong> needed</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Faster training</strong></span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Better performance</strong> than training from scratch</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Feature reuse</strong> – early layers learn generic features</span></li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Two Approaches</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600">
            <h4 class="font-bold text-blue-700 mt-0">🔒 Feature Extraction</h4>
            <ul class="text-sm space-y-1">
              <li><strong>Freeze</strong> all pre-trained layers</li>
              <li>Only train the <strong>new classifier</strong></li>
              <li>Use pre-trained model as a <strong>fixed feature extractor</strong></li>
            </ul>
            <pre class="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mt-2"><code>for param in model.parameters():
    param.requires_grad = False  # Freeze

model.fc = nn.Linear(512, num_classes)  # New head</code></pre>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-600">
            <h4 class="font-bold text-purple-700 mt-0">🎯 Fine-Tuning</h4>
            <ul class="text-sm space-y-1">
              <li><strong>Unfreeze</strong> some or all layers</li>
              <li>Continue training with <strong>small learning rate</strong></li>
              <li>Adapts features to your specific dataset</li>
            </ul>
            <pre class="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mt-2"><code># Unfreeze last few layers
for param in model.layer4.parameters():
    param.requires_grad = True

optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=0.0001  # Small LR
)</code></pre>
          </div>
        </div>

        <div class="gate-box bg-indigo-50 border-l-4 border-indigo-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 Best Practice:</strong> Start with <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">feature extraction</span> (freezing all layers). If performance is insufficient, try <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">fine-tuning</span> the <strong>last few layers</strong> with a <strong>low learning rate</strong> (1/10 of initial).</p>
        </div>
      </div>
    </section>

    <!-- ============ 4. ResNet18 Custom Dataset ============ -->
    <section class="section" id="dl-w6-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">4. Plant Disease Classification with ResNet18</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-green-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🌿</span>
            <p class="font-bold text-gray-800">Plant Disease</p>
            <p class="text-xs text-gray-600">4 classes</p>
          </div>
          <div class="bg-green-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">✅</span>
            <p class="font-bold text-gray-800">Healthy</p>
          </div>
          <div class="bg-green-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🟡</span>
            <p class="font-bold text-gray-800">Disease A</p>
          </div>
          <div class="bg-green-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🔴</span>
            <p class="font-bold text-gray-800">Disease B/C</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Complete Transfer Learning Pipeline</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from torchvision import models
from torch.utils.data import DataLoader, Dataset
from PIL import Image
import os
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================================
# 1. DATA LOADING
# ============================================================

class PlantDiseaseDataset(Dataset):
    """Custom dataset for plant disease classification."""
    
    def __init__(self, root_dir, transform=None):
        self.root_dir = root_dir
        self.transform = transform
        self.classes = ['healthy', 'disease_a', 'disease_b', 'disease_c']
        self.class_to_idx = {cls: i for i, cls in enumerate(self.classes)}
        
        self.images = []
        self.labels = []
        
        for class_name in self.classes:
            class_dir = os.path.join(root_dir, class_name)
            for img_name in os.listdir(class_dir):
                if img_name.endswith(('.jpg', '.png', '.jpeg')):
                    self.images.append(os.path.join(class_dir, img_name))
                    self.labels.append(self.class_to_idx[class_name])
    
    def __len__(self):
        return len(self.images)
    
    def __getitem__(self, idx):
        img_path = self.images[idx]
        image = Image.open(img_path).convert('RGB')
        label = self.labels[idx]
        
        if self.transform:
            image = self.transform(image)
        
        return image, label

# Data transforms
train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(20),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

val_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Load datasets
train_dataset = PlantDiseaseDataset('data/train', transform=train_transform)
val_dataset = PlantDiseaseDataset('data/val', transform=val_transform)
test_dataset = PlantDiseaseDataset('data/test', transform=val_transform)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

# ============================================================
# 2. RESNET18 WITH TRANSFER LEARNING
# ============================================================

class TransferResNet(nn.Module):
    def __init__(self, num_classes=4, freeze_layers=True):
        super(TransferResNet, self).__init__()
        
        # Load pre-trained ResNet18
        self.model = models.resnet18(pretrained=True)
        
        # Freeze all layers (feature extraction)
        if freeze_layers:
            for param in self.model.parameters():
                param.requires_grad = False
        
        # Replace the final fully connected layer
        num_features = self.model.fc.in_features
        self.model.fc = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(num_features, 256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, num_classes)
        )
    
    def forward(self, x):
        return self.model(x)
    
    def unfreeze_layers(self, num_layers=2):
        """Unfreeze the last 'num_layers' layers for fine-tuning."""
        layers = list(self.model.children())
        
        # Unfreeze the final layers
        for layer in layers[-num_layers:]:
            for param in layer.parameters():
                param.requires_grad = True
        
        # Also unfreeze the new FC head (already trainable)
        for param in self.model.fc.parameters():
            param.requires_grad = True

# Initialize model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = TransferResNet(num_classes=4, freeze_layers=True).to(device)

# ============================================================
# 3. TRAINING
# ============================================================

criterion = nn.CrossEntropyLoss()

# Phase 1: Feature Extraction (only train new head)
optimizer = optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=0.001
)

def train_one_epoch(model, loader, optimizer, criterion):
    model.train()
    total_loss = 0
    correct = 0
    total = 0
    
    for batch_idx, (data, targets) in enumerate(loader):
        data, targets = data.to(device), targets.to(device)
        
        optimizer.zero_grad()
        outputs = model(data)
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
        _, predicted = outputs.max(1)
        total += targets.size(0)
        correct += predicted.eq(targets).sum().item()
    
    return total_loss / len(loader), 100. * correct / total

def validate(model, loader, criterion):
    model.eval()
    total_loss = 0
    correct = 0
    total = 0
    
    with torch.no_grad():
        for data, targets in loader:
            data, targets = data.to(device), targets.to(device)
            outputs = model(data)
            loss = criterion(outputs, targets)
            
            total_loss += loss.item()
            _, predicted = outputs.max(1)
            total += targets.size(0)
            correct += predicted.eq(targets).sum().item()
    
    return total_loss / len(loader), 100. * correct / total

print("="*50)
print("PHASE 1: FEATURE EXTRACTION")
print("="*50)

num_epochs = 10
best_val_acc = 0

for epoch in range(num_epochs):
    train_loss, train_acc = train_one_epoch(model, train_loader, optimizer, criterion)
    val_loss, val_acc = validate(model, val_loader, criterion)
    
    print(f"Epoch {epoch+1}/{num_epochs} | "
          f"Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}% | "
          f"Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%")
    
    if val_acc > best_val_acc:
        best_val_acc = val_acc
        torch.save(model.state_dict(), 'best_feature_extraction.pt')

# ============================================================
# 4. FINE-TUNING (Optional - Unfreeze layers)
# ============================================================

print("\n" + "="*50)
print("PHASE 2: FINE-TUNING")
print("="*50)

# Unfreeze last 3 layers
model.unfreeze_layers(num_layers=3)

# Use smaller learning rate for fine-tuning
optimizer = optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=0.0001  # 1/10 of original
)

# Learning rate scheduler
scheduler = optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='min', factor=0.5, patience=3
)

num_epochs_ft = 5
best_val_acc_ft = 0

for epoch in range(num_epochs_ft):
    train_loss, train_acc = train_one_epoch(model, train_loader, optimizer, criterion)
    val_loss, val_acc = validate(model, val_loader, criterion)
    scheduler.step(val_loss)
    
    print(f"Epoch {epoch+1}/{num_epochs_ft} | "
          f"Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}% | "
          f"Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%")
    
    if val_acc > best_val_acc_ft:
        best_val_acc_ft = val_acc
        torch.save(model.state_dict(), 'best_finetuned.pt')

# Load best model
model.load_state_dict(torch.load('best_finetuned.pt'))

# ============================================================
# 5. TEST EVALUATION
# ============================================================

test_loss, test_acc = validate(model, test_loader, criterion)
print(f"\n🎯 Final Test Accuracy: {test_acc:.2f}%")

# Detailed classification report
def get_predictions(model, loader):
    model.eval()
    all_preds = []
    all_labels = []
    
    with torch.no_grad():
        for data, targets in loader:
            data = data.to(device)
            outputs = model(data)
            _, predicted = outputs.max(1)
            all_preds.extend(predicted.cpu().numpy())
            all_labels.extend(targets.numpy())
    
    return all_preds, all_labels

y_pred, y_true = get_predictions(model, test_loader)
classes = ['Healthy', 'Disease A', 'Disease B', 'Disease C']

print("\n" + "="*50)
print("CLASSIFICATION REPORT")
print("="*50)
print(classification_report(y_true, y_pred, target_names=classes))

# Confusion matrix
cm = confusion_matrix(y_true, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Greens',
            xticklabels=classes, yticklabels=classes)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Plant Disease Classification - Confusion Matrix')
plt.show()

# ============================================================
# 6. PREDICTION FUNCTION
# ============================================================

def predict_image(model, image_path, transform):
    """Predict class of a single image."""
    model.eval()
    image = Image.open(image_path).convert('RGB')
    image = transform(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(image)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        _, predicted = outputs.max(1)
    
    class_names = ['Healthy', 'Disease A', 'Disease B', 'Disease C']
    pred_class = class_names[predicted.item()]
    confidence = probabilities[0][predicted.item()].item() * 100
    
    return pred_class, confidence

# Example usage
# pred_class, confidence = predict_image(model, 'test_image.jpg', val_transform)
# print(f"Prediction: {pred_class} ({confidence:.2f}%)")</code></pre>

        <div class="assignment-box bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mt-4">
          <h3 class="text-lg font-bold text-gray-800 mt-0">📝 Assignment – Plant Disease Classification</h3>
          <p class="font-semibold text-gray-700">Dataset Structure:</p>
          <div class="bg-gray-800 text-gray-100 p-3 rounded-lg font-mono text-xs mt-2">
            data/<br>
            ├── train/<br>
            │   ├── healthy/<br>
            │   ├── disease_a/<br>
            │   ├── disease_b/<br>
            │   └── disease_c/<br>
            ├── val/<br>
            │   └── (same structure)<br>
            └── test/<br>
                └── (same structure)
          </div>
          <p class="font-semibold text-gray-700 mt-3">Tasks:</p>
          <ol class="list-decimal list-inside text-sm space-y-1">
            <li>Build the dataset with <strong>4 classes</strong> (Healthy + 3 diseases)</li>
            <li>Implement <strong>ResNet18</strong> with transfer learning</li>
            <li>Compare <strong>feature extraction</strong> vs <strong>fine-tuning</strong></li>
            <li>Report <strong>accuracy</strong>, <strong>precision</strong>, <strong>recall</strong>, <strong>F1-score</strong></li>
            <li>Visualize <strong>confusion matrix</strong></li>
            <li>Create a <strong>prediction function</strong> for new images</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ============ 5. Cheat Sheet ============ -->
    <section class="section" id="dl-w6-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">5. Cheat Sheet – Advanced CNN & Transfer Learning</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-indigo-900 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
                <th class="p-3 text-left border border-gray-300">PyTorch Code</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">ResNet</td>
                <td class="p-3">Residual connections enable deep networks</td>
                <td class="p-3 font-mono text-xs">models.resnet18(pretrained=True)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Freeze Layers</td>
                <td class="p-3">Stop gradients from updating weights</td>
                <td class="p-3 font-mono text-xs">param.requires_grad = False</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Unfreeze</td>
                <td class="p-3">Allow gradients for fine-tuning</td>
                <td class="p-3 font-mono text-xs">param.requires_grad = True</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Feature Extraction</td>
                <td class="p-3">Use pre-trained model as fixed feature extractor</td>
                <td class="p-3 font-mono text-xs">Freeze all layers, train new head</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Fine-Tuning</td>
                <td class="p-3">Adapt pre-trained weights to new dataset</td>
                <td class="p-3 font-mono text-xs">Small LR, unfreeze some layers</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Residual Connection</td>
                <td class="p-3">y = F(x) + x</td>
                <td class="p-3 font-mono text-xs">output = F(input) + input</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Inception</td>
                <td class="p-3">Parallel convolutions of different sizes</td>
                <td class="p-3 font-mono text-xs">Concat different conv branches</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 6. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w6-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">📘 Quick Revision – Advanced CNN & Transfer Learning</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>CNN Evolution:</strong> LeNet → AlexNet → VGG → Inception → ResNet → MobileNet</li>
          <li class="pb-3 border-b border-gray-200"><strong>Residual Connections:</strong> y = F(x) + x – solves <strong>vanishing gradient</strong> problem</li>
          <li class="pb-3 border-b border-gray-200"><strong>Transfer Learning:</strong> Use pre-trained models (ImageNet) for your task</li>
          <li class="pb-3 border-b border-gray-200"><strong>Feature Extraction:</strong> Freeze all layers, only train new classifier head</li>
          <li class="pb-3 border-b border-gray-200"><strong>Fine-Tuning:</strong> Unfreeze some layers, use <strong>small learning rate</strong> (1/10)</li>
          <li class="pb-3 border-b border-gray-200"><strong>ResNet18:</strong> 18 layers, ~11M parameters, good balance of accuracy/speed</li>
          <li class="pb-3 border-b border-gray-200"><strong>Plant Disease:</strong> 4 classes – Healthy, Disease A, B, C</li>
          <li class="pb-0"><strong>Best Practice:</strong> Start with feature extraction, then fine-tune if needed</li>
        </ul>
        <div class="gate-box bg-indigo-50 border-l-4 border-indigo-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 GATE Focus:</strong> Understand <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Residual Connections</span> and why they enable <strong>very deep networks</strong>. Know the difference between <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">feature extraction</span> and <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">fine-tuning</span>. Be able to explain why <strong>transfer learning</strong> is effective.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">🚀 Deep Learning Bootcamp – Week 6 · Advanced CNN &amp; Transfer Learning</p>
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
    { id: 'dl-w6-t1', title: 'CNN Architectures Overview' },
    { id: 'dl-w6-t2', title: 'Residual Connections' },
    { id: 'dl-w6-t3', title: 'Transfer Learning' },
    { id: 'dl-w6-t4', title: 'Plant Disease Classification' },
    { id: 'dl-w6-t5', title: 'Cheat Sheet' },
    { id: 'dl-w6-t6', title: 'Quick Revision' },
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #3730a3);
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
  border: 1px solid #3730a3 !important;
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

/* Architecture timeline */
.architecture-timeline {
  background: #f3f0ff !important;
}

/* Residual diagram */
.residual-diagram {
  background: #f3f0ff !important;
}

/* Boxes */
.gate-box {
  background: #eef2ff !important;
  border-left: 4px solid #3730a3 !important;
}

/* Assignment box */
.assignment-box {
  background: #fefce8 !important;
  border-left: 4px solid #eab308 !important;
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
  .architecture-timeline .flex {
    flex-wrap: wrap;
    justify-content: center;
  }
  .term-table {
    font-size: 0.75rem;
  }
  .term-table th,
  .term-table td {
    padding: 6px 8px;
  }
  .residual-diagram .flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>