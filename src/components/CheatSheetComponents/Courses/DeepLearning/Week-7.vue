<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">🎨 Deep Learning – Week 7</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Data Augmentation · Handling Imbalanced Data · Model Explainability</p>
    </header>

    <!-- ============ 1. Data Augmentation ============ -->
    <section class="section" id="dl-w7-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-pink-600 pb-2">1. Data Augmentation</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Why Augmentation?</h3>
            <div class="flow-diagram bg-gray-100 p-4 rounded-xl text-center">
              <div class="text-sm">Small Dataset</div>
              <div class="text-2xl text-pink-600">↓</div>
              <div class="bg-pink-600 text-white px-4 py-2 rounded-lg inline-block text-sm font-bold">Augmentation</div>
              <div class="text-2xl text-pink-600">↓</div>
              <div class="text-sm">More diverse training examples</div>
              <div class="text-2xl text-pink-600">↓</div>
              <div class="bg-green-600 text-white px-4 py-2 rounded-lg inline-block text-sm font-bold">Better Generalization</div>
            </div>
            <div class="gate-box bg-pink-50 border-l-4 border-pink-600 p-4 rounded-lg mt-3">
              <p class="text-sm text-gray-800"><strong>🎯 Goal:</strong> Create <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">variations</span> of training images to make the model <strong>more robust</strong> to real-world variations.</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Common Augmentations</h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">🔄</span>
                <strong>Rotation</strong>
                <span class="block text-xs text-gray-500">-30° to +30°</span>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">↔</span>
                <strong>Horizontal Flip</strong>
                <span class="block text-xs text-gray-500">Mirror image</span>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">✂️</span>
                <strong>Random Crop</strong>
                <span class="block text-xs text-gray-500">Different regions</span>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">📏</span>
                <strong>Resize</strong>
                <span class="block text-xs text-gray-500">224×224 → 256×256</span>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">🎨</span>
                <strong>Color Jitter</strong>
                <span class="block text-xs text-gray-500">Brightness, Contrast</span>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">🎯</span>
                <strong>Affine</strong>
                <span class="block text-xs text-gray-500">Shear, Scale, Translate</span>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">PyTorch Implementation</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torchvision.transforms as transforms
import torchvision.transforms.functional as F
from torchvision.transforms import RandomApply

# ============================================================
# 1. BASIC AUGMENTATIONS
# ============================================================

train_transform = transforms.Compose([
    # Geometric transformations
    transforms.RandomRotation(degrees=30),           # Rotate -30 to +30 degrees
    transforms.RandomHorizontalFlip(p=0.5),          # Flip with 50% probability
    transforms.RandomVerticalFlip(p=0.2),            # Vertical flip (20%)
    transforms.RandomResizedCrop(size=224, scale=(0.8, 1.0)),  # Crop & resize
    
    # Color transformations
    transforms.ColorJitter(
        brightness=0.2,      # ±20% brightness
        contrast=0.2,        # ±20% contrast
        saturation=0.2,      # ±20% saturation
        hue=0.1              # ±10% hue
    ),
    transforms.RandomAffine(
        degrees=15,          # Rotation range
        translate=(0.1, 0.1), # Horizontal/vertical shift
        scale=(0.9, 1.1),     # Scale range
        shear=10              # Shear angle
    ),
    
    # Normalize (always at the end)
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# ============================================================
# 2. ADVANCED AUGMENTATIONS (Albumentations)
# ============================================================

import albumentations as A
from albumentations.pytorch import ToTensorV2

albumentations_transform = A.Compose([
    A.HorizontalFlip(p=0.5),
    A.VerticalFlip(p=0.2),
    A.RandomRotate90(p=0.3),
    A.ShiftScaleRotate(shift_limit=0.1, scale_limit=0.15, rotate_limit=30, p=0.5),
    A.RandomBrightnessContrast(brightness_limit=0.2, contrast_limit=0.2, p=0.5),
    A.HueSaturationValue(hue_shift_limit=20, sat_shift_limit=30, val_shift_limit=20, p=0.3),
    A.GaussNoise(var_limit=(10.0, 50.0), p=0.2),
    A.CoarseDropout(max_holes=8, max_height=32, max_width=32, p=0.2),  # Cutout
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2()
])

# ============================================================
# 3. CUSTOM AUGMENTATION FUNCTIONS
# ============================================================

class AugmentWithMixup:
    """MixUp augmentation: blend two images with random ratio."""
    
    def __init__(self, alpha=0.2):
        self.alpha = alpha
    
    def __call__(self, x, y):
        if self.alpha > 0:
            lam = np.random.beta(self.alpha, self.alpha)
            batch_size = x.size()[0]
            index = torch.randperm(batch_size)
            
            mixed_x = lam * x + (1 - lam) * x[index, :]
            mixed_y = lam * y + (1 - lam) * y[index, :]
            
            return mixed_x, mixed_y
        return x, y

# ============================================================
# 4. CUTOUT / RANDOM ERASING
# ============================================================

class RandomErasing:
    """Randomly erase a rectangular region in the image."""
    
    def __init__(self, p=0.5, scale=(0.02, 0.33), ratio=(0.3, 3.3)):
        self.p = p
        self.scale = scale
        self.ratio = ratio
    
    def __call__(self, img):
        if random.random() < self.p:
            h, w = img.shape[1], img.shape[2]
            area = h * w
            
            # Random area to erase
            target_area = random.uniform(*self.scale) * area
            aspect_ratio = random.uniform(*self.ratio)
            
            # Compute rectangle dimensions
            ew = int(round(np.sqrt(target_area * aspect_ratio)))
            eh = int(round(np.sqrt(target_area / aspect_ratio)))
            
            # Random location
            x = random.randint(0, w - ew)
            y = random.randint(0, h - eh)
            
            # Erase region
            img[:, y:y+eh, x:x+ew] = 0
        
        return img</code></pre>

        <div class="example-box bg-gray-100 border-l-4 border-pink-600 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">💡 Key Insight:</p>
          <ul class="text-sm space-y-1">
            <li><strong>Augmentation increases dataset size</strong> without collecting new data</li>
            <li><strong>Regularizes</strong> the model – prevents overfitting</li>
            <li>Works best with <strong>realistic</strong> variations (don't over-augment)</li>
            <li>Always apply <strong>normalization</strong> <em>after</em> augmentation</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 2. Handling Imbalanced Data ============ -->
    <section class="section" id="dl-w7-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-pink-600 pb-2">2. Handling Imbalanced Data</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">The Problem</h3>
            <div class="bg-red-50 p-4 rounded-lg">
              <div class="flex items-center gap-2 text-sm">
                <span>Class A (Healthy):</span>
                <div class="flex-1 bg-gray-200 h-4 rounded">
                  <div class="bg-green-500 h-4 rounded w-3/4"></div>
                </div>
                <span>75%</span>
              </div>
              <div class="flex items-center gap-2 text-sm mt-1">
                <span>Class B (Defect):</span>
                <div class="flex-1 bg-gray-200 h-4 rounded">
                  <div class="bg-red-500 h-4 rounded w-1/4"></div>
                </div>
                <span>25%</span>
              </div>
              <p class="text-xs text-red-600 mt-2">Model learns to predict <strong>majority class</strong> → poor performance on minority class</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Solutions</h3>
            <div class="space-y-2">
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm">1. Class Weights</h4>
                <p class="text-xs text-gray-600">Assign <strong>higher weight</strong> to minority class in loss function.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">weight = [1.0, 3.0]</code>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm">2. Oversampling</h4>
                <p class="text-xs text-gray-600">Duplicate samples from <strong>minority class</strong>.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">Random oversampling</code>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm">3. Undersampling</h4>
                <p class="text-xs text-gray-600">Remove samples from <strong>majority class</strong>.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">Random undersampling</code>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm">4. Focal Loss</h4>
                <p class="text-xs text-gray-600">Focuses training on <strong>hard examples</strong>.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">FL = -(1-pt)^γ * log(pt)</code>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Implementation</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.nn.functional as F
from sklearn.utils.class_weight import compute_class_weight
import numpy as np

# ============================================================
# 1. CLASS WEIGHTS IN LOSS FUNCTION
# ============================================================

def get_class_weights(labels):
    """Compute inverse frequency weights for classes."""
    classes = np.unique(labels)
    weights = compute_class_weight(
        class_weight='balanced',
        classes=classes,
        y=labels
    )
    return torch.FloatTensor(weights)

# Example usage
train_labels = [0, 0, 0, 0, 0, 1, 1]  # 5 healthy, 2 defects
class_weights = get_class_weights(train_labels)
criterion = nn.CrossEntropyLoss(weight=class_weights.to(device))

# ============================================================
# 2. FOCAL LOSS
# ============================================================

class FocalLoss(nn.Module):
    """Focal Loss for imbalanced classification.
    
    FL = -α(1 - pt)^γ * log(pt)
    
    where:
        pt = probability of correct class
        α = balancing factor (class weight)
        γ = focusing parameter (γ >= 0)
    """
    
    def __init__(self, alpha=0.25, gamma=2.0, reduction='mean'):
        super(FocalLoss, self).__init__()
        self.alpha = alpha
        self.gamma = gamma
        self.reduction = reduction
    
    def forward(self, inputs, targets):
        ce_loss = F.cross_entropy(inputs, targets, reduction='none')
        pt = torch.exp(-ce_loss)  # Probability of correct class
        
        focal_loss = self.alpha * (1 - pt) ** self.gamma * ce_loss
        
        if self.reduction == 'mean':
            return focal_loss.mean()
        elif self.reduction == 'sum':
            return focal_loss.sum()
        else:
            return focal_loss

# Use Focal Loss for imbalanced data
criterion = FocalLoss(alpha=0.25, gamma=2.0)

# ============================================================
# 3. OVERSAMPLING WITH DataLoader
# ============================================================

from torch.utils.data import WeightedRandomSampler

def get_weighted_sampler(dataset):
    """Create a weighted sampler for oversampling minority classes."""
    labels = [dataset[i][1] for i in range(len(dataset))]
    class_counts = np.bincount(labels)
    weights = 1.0 / class_counts
    sample_weights = [weights[label] for label in labels]
    sampler = WeightedRandomSampler(sample_weights, len(sample_weights))
    return sampler

# Use with DataLoader
sampler = get_weighted_sampler(train_dataset)
train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    sampler=sampler,  # Overrides shuffle
    num_workers=4
)

# ============================================================
# 4. THRESHOLD TUNING FOR IMBALANCED DATA
# ============================================================

from sklearn.metrics import precision_recall_curve

def find_best_threshold(model, val_loader, device):
    """Find optimal threshold maximizing F1-score."""
    model.eval()
    all_probs = []
    all_labels = []
    
    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(device)
            outputs = model(images)
            probs = torch.softmax(outputs, dim=1)[:, 1].cpu().numpy()
            all_probs.extend(probs)
            all_labels.extend(labels.numpy())
    
    precisions, recalls, thresholds = precision_recall_curve(all_labels, all_probs)
    f1_scores = 2 * (precisions * recalls) / (precisions + recalls + 1e-8)
    best_idx = np.argmax(f1_scores[:-1])
    best_threshold = thresholds[best_idx]
    
    return best_threshold</code></pre>
      </div>
    </section>

    <!-- ============ 3. Model Explainability ============ -->
    <section class="section" id="dl-w7-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-pink-600 pb-2">3. Model Explainability</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Why Explainability?</h3>
            <ul class="text-sm space-y-2">
              <li class="flex items-start gap-2"><span class="text-green-500">🔍</span> <span><strong>Trust</strong> – Understand why model makes decisions</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">🔍</span> <span><strong>Debug</strong> – Identify model weaknesses</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">🔍</span> <span><strong>Compliance</strong> – Requirements in medical/industrial domains</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">🔍</span> <span><strong>Bias detection</strong> – Ensure fair predictions</span></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Explainability Techniques</h3>
            <div class="space-y-2">
              <div class="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-sm">Grad-CAM</h4>
                <p class="text-xs text-gray-600">Heatmap showing <strong>which regions</strong> contributed to the prediction.</p>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-sm">Saliency Maps</h4>
                <p class="text-xs text-gray-600">Gradient-based visualization of <strong>important pixels</strong>.</p>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-sm">Feature Visualization</h4>
                <p class="text-xs text-gray-600">Visualize what <strong>convolutional filters</strong> have learned.</p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Grad-CAM Implementation</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn.functional as F
import numpy as np
import cv2
import matplotlib.pyplot as plt

class GradCAM:
    """Grad-CAM: Gradient-weighted Class Activation Mapping."""
    
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        
        # Register hooks
        self._register_hooks()
    
    def _register_hooks(self):
        """Register forward and backward hooks for the target layer."""
        
        def forward_hook(module, input, output):
            self.activations = output.detach()
        
        def backward_hook(module, grad_input, grad_output):
            self.gradients = grad_output[0].detach()
        
        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_backward_hook(backward_hook)
    
    def generate(self, input_tensor, class_idx=None):
        """Generate Grad-CAM heatmap."""
        self.model.eval()
        
        # Forward pass
        output = self.model(input_tensor)
        
        # Get predicted class if not specified
        if class_idx is None:
            class_idx = output.argmax(dim=1).item()
        
        # Backward pass
        self.model.zero_grad()
        one_hot = torch.zeros_like(output)
        one_hot[0, class_idx] = 1
        output.backward(gradient=one_hot)
        
        # Get gradients and activations
        gradients = self.gradients[0]  # (C, H, W)
        activations = self.activations[0]  # (C, H, W)
        
        # Global average pooling of gradients
        weights = torch.mean(gradients, dim=(1, 2))  # (C,)
        
        # Weighted combination of activations
        cam = torch.zeros(activations.shape[1:], dtype=torch.float32)
        for i, w in enumerate(weights):
            cam += w * activations[i, :, :]
        
        # ReLU
        cam = F.relu(cam)
        cam = cam.cpu().numpy()
        
        # Normalize
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        
        return cam
    
    def overlay_on_image(self, image, cam, alpha=0.5):
        """Overlay CAM on the original image."""
        # Resize CAM to image size
        h, w = image.shape[:2]
        cam_resized = cv2.resize(cam, (w, h))
        
        # Convert to heatmap
        heatmap = cv2.applyColorMap(
            np.uint8(255 * cam_resized), 
            cv2.COLORMAP_JET
        )
        
        # Overlay
        image = cv2.cvtColor(np.uint8(255 * image), cv2.COLOR_RGB2BGR)
        superimposed = cv2.addWeighted(image, 1 - alpha, heatmap, alpha, 0)
        
        return cv2.cvtColor(superimposed, cv2.COLOR_BGR2RGB)

# ============================================================
# 2. SALIENCY MAPS
# ============================================================

class SaliencyMap:
    """Generate saliency maps using gradient of output w.r.t input."""
    
    def __init__(self, model):
        self.model = model
    
    def generate(self, input_tensor, class_idx=None):
        self.model.eval()
        
        # Forward pass
        input_tensor.requires_grad_()
        output = self.model(input_tensor)
        
        if class_idx is None:
            class_idx = output.argmax(dim=1).item()
        
        # Backward pass
        self.model.zero_grad()
        one_hot = torch.zeros_like(output)
        one_hot[0, class_idx] = 1
        output.backward(gradient=one_hot)
        
        # Get gradients
        saliency = input_tensor.grad[0].cpu().numpy()
        
        # Aggregate channels (take absolute max across channels)
        saliency = np.max(np.abs(saliency), axis=0)
        
        # Normalize
        saliency = (saliency - saliency.min()) / (saliency.max() - saliency.min())
        
        return saliency

# ============================================================
# 3. FEATURE VISUALIZATION
# ============================================================

def visualize_filters(model, layer_idx, num_filters=16):
    """Visualize learned filters of a convolutional layer."""
    conv_weights = list(model.children())[layer_idx].weight.data.cpu().numpy()
    
    # Normalize for visualization
    conv_weights = (conv_weights - conv_weights.min()) / (conv_weights.max() - conv_weights.min())
    
    fig, axes = plt.subplots(4, 4, figsize=(10, 10))
    for i, ax in enumerate(axes.flat):
        if i < num_filters and i < conv_weights.shape[0]:
            # For multi-channel filters, average across channels
            filter_img = conv_weights[i].mean(axis=0)
            ax.imshow(filter_img, cmap='gray')
            ax.set_title(f'Filter {i+1}')
        ax.axis('off')
    
    plt.suptitle(f'Layer {layer_idx+1} Convolutional Filters')
    plt.tight_layout()
    plt.show()

# ============================================================
# 4. GRAD-CAM USAGE EXAMPLE
# ============================================================

def explain_prediction(model, image, transform, device, target_layer):
    """Full pipeline: predict + generate Grad-CAM explanation."""
    # Prepare image
    image_tensor = transform(image).unsqueeze(0).to(device)
    
    # Generate Grad-CAM
    grad_cam = GradCAM(model, target_layer)
    cam = grad_cam.generate(image_tensor)
    
    # Overlay on image
    overlay = grad_cam.overlay_on_image(
        np.array(image) / 255.0,
        cam,
        alpha=0.4
    )
    
    # Get prediction
    model.eval()
    with torch.no_grad():
        outputs = model(image_tensor)
        probs = F.softmax(outputs, dim=1).cpu().numpy()
        pred_class = np.argmax(probs)
        confidence = np.max(probs)
    
    return overlay, pred_class, confidence</code></pre>

        <div class="example-box bg-gray-100 border-l-4 border-pink-600 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">🔍 Interpretability in Practice:</p>
          <ul class="text-sm space-y-1">
            <li><strong>Grad-CAM</strong> shows <span class="highlight-text bg-yellow-300 px-1 rounded">where</span> the model is looking</li>
            <li><strong>Saliency maps</strong> show <span class="highlight-text bg-yellow-300 px-1 rounded">which pixels</span> are most important</li>
            <li><strong>Feature visualization</strong> reveals <span class="highlight-text bg-yellow-300 px-1 rounded">what</span> the model has learned</li>
            <li>Use these tools to <strong>debug</strong> misclassifications and <strong>build trust</strong></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 4. Defect Detection System ============ -->
    <section class="section" id="dl-w7-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-pink-600 pb-2">4. Industrial Defect Detection System</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🏭</span>
            <p class="font-bold text-gray-800">Industrial Inspection</p>
            <p class="text-xs text-gray-600">Detect defects in manufactured components</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">✅</span>
            <p class="font-bold text-gray-800">Classes</p>
            <p class="text-xs text-gray-600">Normal · Scratch · Crack · Corrosion</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🔍</span>
            <p class="font-bold text-gray-800">Explainability</p>
            <p class="text-xs text-gray-600">Grad-CAM for defect localization</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Complete Pipeline with Augmentation & Explainability</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms
from torch.utils.data import DataLoader, Dataset
import torch.nn.functional as F
from PIL import Image
import numpy as np
import os
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================================
# 1. CUSTOM DATASET WITH AUGMENTATION
# ============================================================

class DefectDataset(Dataset):
    """Dataset for industrial defect detection."""
    
    def __init__(self, root_dir, transform=None, is_train=False):
        self.root_dir = root_dir
        self.transform = transform
        self.is_train = is_train
        self.classes = ['normal', 'scratch', 'crack', 'corrosion']
        self.class_to_idx = {cls: i for i, cls in enumerate(self.classes)}
        
        self.images = []
        self.labels = []
        
        for class_name in self.classes:
            class_dir = os.path.join(root_dir, class_name)
            if os.path.exists(class_dir):
                for img_name in os.listdir(class_dir):
                    if img_name.endswith(('.jpg', '.png', '.jpeg')):
                        self.images.append(os.path.join(class_dir, img_name))
                        self.labels.append(self.class_to_idx[class_name])
        
        # Compute class weights for imbalanced handling
        class_counts = np.bincount(self.labels)
        self.class_weights = 1.0 / class_counts
        self.sample_weights = [self.class_weights[label] for label in self.labels]
    
    def __len__(self):
        return len(self.images)
    
    def __getitem__(self, idx):
        img_path = self.images[idx]
        image = Image.open(img_path).convert('RGB')
        label = self.labels[idx]
        
        if self.transform:
            image = self.transform(image)
        
        return image, label

# ============================================================
# 2. AUGMENTATIONS FOR INDUSTRIAL IMAGES
# ============================================================

# Aggressive augmentation for defect detection
train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomRotation(degrees=30),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomVerticalFlip(p=0.3),
    transforms.RandomResizedCrop(size=224, scale=(0.7, 1.0)),
    transforms.ColorJitter(
        brightness=0.3,
        contrast=0.3,
        saturation=0.2,
        hue=0.1
    ),
    transforms.RandomAffine(
        degrees=15,
        translate=(0.1, 0.1),
        scale=(0.85, 1.15),
        shear=10
    ),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# ============================================================
# 3. MODEL WITH FOCAL LOSS
# ============================================================

class DefectDetector(nn.Module):
    """ResNet-based defect detector with dropout for regularization."""
    
    def __init__(self, num_classes=4, dropout_rate=0.5):
        super(DefectDetector, self).__init__()
        self.backbone = models.resnet18(pretrained=True)
        
        # Freeze early layers
        for param in self.backbone.parameters():
            param.requires_grad = False
        
        # Unfreeze later layers
        for param in self.backbone.layer4.parameters():
            param.requires_grad = True
        for param in self.backbone.fc.parameters():
            param.requires_grad = True
        
        # Replace FC layer
        num_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Sequential(
            nn.Dropout(dropout_rate),
            nn.Linear(num_features, 512),
            nn.ReLU(),
            nn.BatchNorm1d(512),
            nn.Dropout(dropout_rate * 0.7),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Linear(256, num_classes)
        )
    
    def forward(self, x):
        return self.backbone(x)
    
    def get_activations(self, x):
        """Get intermediate activations for Grad-CAM."""
        # Access layer4 for Grad-CAM
        return self.backbone.layer4(x)

# ============================================================
# 4. TRAINING WITH IMBALANCED DATA HANDLING
# ============================================================

class FocalLoss(nn.Module):
    """Focal Loss for imbalanced defect detection."""
    
    def __init__(self, alpha=0.25, gamma=2.0):
        super(FocalLoss, self).__init__()
        self.alpha = alpha
        self.gamma = gamma
    
    def forward(self, inputs, targets):
        ce_loss = F.cross_entropy(inputs, targets, reduction='none')
        pt = torch.exp(-ce_loss)
        focal_loss = self.alpha * (1 - pt) ** self.gamma * ce_loss
        return focal_loss.mean()

def train_defect_detector():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # Load datasets
    train_dataset = DefectDataset('data/train', transform=train_transform)
    val_dataset = DefectDataset('data/val', transform=val_transform)
    test_dataset = DefectDataset('data/test', transform=val_transform)
    
    # Weighted sampler for oversampling
    from torch.utils.data import WeightedRandomSampler
    sampler = WeightedRandomSampler(
        train_dataset.sample_weights,
        len(train_dataset.sample_weights)
    )
    
    train_loader = DataLoader(
        train_dataset,
        batch_size=32,
        sampler=sampler,
        num_workers=4
    )
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
    
    # Model
    model = DefectDetector(num_classes=4).to(device)
    
    # Loss with class weights
    class_weights = torch.FloatTensor([
        1.0 / np.mean(train_dataset.labels == 0),
        1.0 / np.mean(train_dataset.labels == 1),
        1.0 / np.mean(train_dataset.labels == 2),
        1.0 / np.mean(train_dataset.labels == 3)
    ]).to(device)
    
    # Use Focal Loss for hard examples
    criterion = FocalLoss(alpha=0.25, gamma=2.0)
    # Alternative: weighted CE
    # criterion = nn.CrossEntropyLoss(weight=class_weights)
    
    optimizer = optim.Adam([
        {'params': model.backbone.layer4.parameters(), 'lr': 0.0001},
        {'params': model.backbone.fc.parameters(), 'lr': 0.001}
    ])
    
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=5
    )
    
    # Training loop
    best_val_acc = 0
    
    for epoch in range(20):
        model.train()
        train_loss = 0
        train_correct = 0
        train_total = 0
        
        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            _, predicted = outputs.max(1)
            train_total += labels.size(0)
            train_correct += predicted.eq(labels).sum().item()
        
        # Validation
        model.eval()
        val_loss = 0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = F.cross_entropy(outputs, labels)
                
                val_loss += loss.item()
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()
        
        train_acc = 100. * train_correct / train_total
        val_acc = 100. * val_correct / val_total
        
        print(f"Epoch {epoch+1}/20 | "
              f"Train Acc: {train_acc:.2f}% | "
              f"Val Acc: {val_acc:.2f}%")
        
        scheduler.step(val_loss)
        
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), 'best_defect_model.pt')
    
    # ============================================================
    # 5. TEST EVALUATION WITH EXPLAINABILITY
    # ============================================================
    
    model.load_state_dict(torch.load('best_defect_model.pt'))
    model.eval()
    
    # Get predictions
    all_preds = []
    all_labels = []
    all_probs = []
    
    with torch.no_grad():
        for images, labels in test_loader:
            images = images.to(device)
            outputs = model(images)
            probs = F.softmax(outputs, dim=1)
            _, predicted = outputs.max(1)
            
            all_preds.extend(predicted.cpu().numpy())
            all_labels.extend(labels.numpy())
            all_probs.extend(probs.cpu().numpy())
    
    classes = ['Normal', 'Scratch', 'Crack', 'Corrosion']
    print("\n" + "="*50)
    print("CLASSIFICATION REPORT")
    print("="*50)
    print(classification_report(all_labels, all_preds, target_names=classes))
    
    # Confusion matrix
    cm = confusion_matrix(all_labels, all_preds)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=classes, yticklabels=classes)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Defect Detection - Confusion Matrix')
    plt.show()
    
    # ============================================================
    # 6. GRAD-CAM EXPLANABILITY
    # ============================================================
    
    # Grad-CAM for defect localization
    def explain_defect(model, image_path, target_layer):
        image = Image.open(image_path).convert('RGB')
        image_tensor = val_transform(image).unsqueeze(0).to(device)
        
        grad_cam = GradCAM(model, target_layer)
        cam = grad_cam.generate(image_tensor)
        
        overlay = grad_cam.overlay_on_image(
            np.array(image) / 255.0,
            cam,
            alpha=0.4
        )
        
        # Get prediction
        with torch.no_grad():
            outputs = model(image_tensor)
            probs = F.softmax(outputs, dim=1).cpu().numpy()
            pred_class = np.argmax(probs)
            confidence = np.max(probs)
        
        # Display
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))
        axes[0].imshow(image)
        axes[0].set_title('Original Image')
        axes[0].axis('off')
        
        axes[1].imshow(cam, cmap='jet')
        axes[1].set_title('Grad-CAM Heatmap')
        axes[1].axis('off')
        
        axes[2].imshow(overlay)
        axes[2].set_title(f'Prediction: {classes[pred_class]} ({confidence:.2f}%)')
        axes[2].axis('off')
        
        plt.tight_layout()
        plt.show()
        
        return classes[pred_class], confidence
    
    print("\n" + "="*50)
    print("🔍 EXPLAINABILITY: Grad-CAM on Test Samples")
    print("="*50)
    
    # Test on a few samples
    sample_images = ['test_sample1.jpg', 'test_sample2.jpg']
    for img_path in sample_images:
        if os.path.exists(img_path):
            pred, conf = explain_defect(
                model, 
                img_path, 
                model.backbone.layer4
            )
            print(f"{img_path}: {pred} ({conf:.2f}%)")
    
    return model

if __name__ == "__main__":
    model = train_defect_detector()</code></pre>

        <div class="assignment-box bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mt-4">
          <h3 class="text-lg font-bold text-gray-800 mt-0">📝 Assignment – Defect Detection System</h3>
          <p class="font-semibold text-gray-700">Tasks:</p>
          <ol class="list-decimal list-inside text-sm space-y-1">
            <li>Build a <strong>defect detection dataset</strong> with 4 classes (Normal, Scratch, Crack, Corrosion)</li>
            <li>Implement <strong>data augmentation</strong> pipeline for industrial images</li>
            <li>Handle <strong>imbalanced data</strong> using class weights or oversampling</li>
            <li>Train a <strong>ResNet-based</strong> classifier</li>
            <li>Use <strong>Focal Loss</strong> for hard example mining</li>
            <li>Implement <strong>Grad-CAM</strong> to visualize defect localization</li>
            <li>Generate <strong>saliency maps</strong> for model interpretation</li>
            <li>Compare <strong>feature extraction</strong> vs <strong>fine-tuning</strong> performance</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ============ 5. Cheat Sheet ============ -->
    <section class="section" id="dl-w7-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-pink-600 pb-2">5. Cheat Sheet – Advanced CV & Explainability</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-pink-800 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
                <th class="p-3 text-left border border-gray-300">Code Example</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Rotation</td>
                <td class="p-3">Rotate image by random angle</td>
                <td class="p-3 font-mono text-xs">transforms.RandomRotation(30)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Color Jitter</td>
                <td class="p-3">Random brightness/contrast/saturation</td>
                <td class="p-3 font-mono text-xs">transforms.ColorJitter(0.2, 0.2)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Class Weights</td>
                <td class="p-3">Weight loss by class frequency</td>
                <td class="p-3 font-mono text-xs">nn.CrossEntropyLoss(weight=w)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Focal Loss</td>
                <td class="p-3">Focus on hard examples</td>
                <td class="p-3 font-mono text-xs">FL = -(1-pt)^γ * log(pt)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Grad-CAM</td>
                <td class="p-3">Heatmap of important regions</td>
                <td class="p-3 font-mono text-xs">Weighted activation maps</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Saliency Map</td>
                <td class="p-3">Pixel importance gradient</td>
                <td class="p-3 font-mono text-xs">∂output/∂input</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Oversampling</td>
                <td class="p-3">Duplicate minority samples</td>
                <td class="p-3 font-mono text-xs">WeightedRandomSampler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 6. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w7-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-pink-600 pb-2">📘 Quick Revision – Advanced CV & Explainability</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>Data Augmentation:</strong> Rotation, Flip, Crop, Color Jitter – creates <strong>variety</strong> for better generalization</li>
          <li class="pb-3 border-b border-gray-200"><strong>Imbalanced Data:</strong> Class weights, Oversampling, Undersampling, Focal Loss</li>
          <li class="pb-3 border-b border-gray-200"><strong>Focal Loss:</strong> FL = -(1-pt)^γ * log(pt) – focuses on <strong>hard examples</strong></li>
          <li class="pb-3 border-b border-gray-200"><strong>Grad-CAM:</strong> Visualizes <strong>where</strong> the model looks – heatmap of important regions</li>
          <li class="pb-3 border-b border-gray-200"><strong>Saliency Maps:</strong> Shows <strong>which pixels</strong> are most important for prediction</li>
          <li class="pb-3 border-b border-gray-200"><strong>Feature Visualization:</strong> Reveals <strong>what</strong> convolutional filters have learned</li>
          <li class="pb-3 border-b border-gray-200"><strong>Defect Detection:</strong> Industrial application – normal, scratch, crack, corrosion</li>
          <li class="pb-0"><strong>Best Practice:</strong> Use <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">augmentation + focal loss + Grad-CAM</span> for robust, interpretable defect detection</li>
        </ul>
        <div class="gate-box bg-pink-50 border-l-4 border-pink-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 GATE Focus:</strong> Understand <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">why augmentation</span> improves generalization, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Focal Loss</span> for imbalanced data, and <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Grad-CAM</span> for model interpretation. Be able to explain the <strong>class imbalance problem</strong> and its solutions.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">🎨 Deep Learning Bootcamp – Week 7 · Data Augmentation &amp; Advanced Computer Vision</p>
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
    { id: 'dl-w7-t1', title: 'Data Augmentation' },
    { id: 'dl-w7-t2', title: 'Handling Imbalanced Data' },
    { id: 'dl-w7-t3', title: 'Model Explainability' },
    { id: 'dl-w7-t4', title: 'Industrial Defect Detection' },
    { id: 'dl-w7-t5', title: 'Cheat Sheet' },
    { id: 'dl-w7-t6', title: 'Quick Revision' },
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #831843);
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
  border: 1px solid #831843 !important;
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

/* Flow diagram */
.flow-diagram {
  background: #fdf2f8 !important;
}

/* Boxes */
.gate-box {
  background: #fdf2f8 !important;
  border-left: 4px solid #db2777 !important;
}

/* Assignment box */
.assignment-box {
  background: #fefce8 !important;
  border-left: 4px solid #eab308 !important;
}

.example-box {
  background: #f3f4f6 !important;
  border-left: 4px solid #db2777 !important;
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
  .flow-diagram {
    padding: 12px;
  }
}
</style>