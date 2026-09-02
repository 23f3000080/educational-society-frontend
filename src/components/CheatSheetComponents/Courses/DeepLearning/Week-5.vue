<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">👁️ Deep Learning – Week 5</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Computer Vision &amp; Convolutional Neural Networks (CNNs)</p>
    </header>

    <!-- ============ 1. Image Representation ============ -->
    <section class="section" id="dl-w5-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">1. Image Representation</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-600">
            <h3 class="text-lg font-bold text-gray-800 mt-0">Pixels</h3>
            <p class="text-sm text-gray-600">The smallest unit of an image. Each pixel stores a <strong>numeric value</strong> representing brightness.</p>
            <div class="mt-3 bg-gray-800 text-white p-3 rounded-lg text-center font-mono text-xs">
              [0, 0, 0, 255, 255, 0, ...]
            </div>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-600">
            <h3 class="text-lg font-bold text-gray-800 mt-0">RGB Channels</h3>
            <p class="text-sm text-gray-600">Color images have <strong>3 channels</strong>: Red, Green, Blue. Each channel is a 2D matrix.</p>
            <div class="mt-3 flex gap-2 justify-center">
              <div class="w-12 h-12 bg-red-500 rounded-lg"></div>
              <div class="w-12 h-12 bg-green-500 rounded-lg"></div>
              <div class="w-12 h-12 bg-blue-500 rounded-lg"></div>
            </div>
            <p class="text-xs text-center text-gray-500 mt-2">Shape: (Height, Width, 3)</p>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-600">
            <h3 class="text-lg font-bold text-gray-800 mt-0">Grayscale</h3>
            <p class="text-sm text-gray-600">Single channel images where each pixel is a <strong>single value</strong> (0-255).</p>
            <div class="mt-3 bg-gray-800 text-white p-3 rounded-lg text-center font-mono text-xs">
              Shape: (Height, Width, 1)
            </div>
          </div>
        </div>

        <div class="gate-box bg-purple-50 border-l-4 border-purple-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>📐 Image Dimensions:</strong> In PyTorch, images are stored as <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">(Batch, Channels, Height, Width)</span> – often abbreviated as <strong>NCHW</strong>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 2. Convolution ============ -->
    <section class="section" id="dl-w5-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">2. Convolution Operation</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">How Convolution Works</h3>
            <p class="text-sm text-gray-600">A <strong>filter/kernel</strong> slides over the image and computes <strong>element-wise multiplication</strong> followed by summation.</p>
            <div class="conv-visual bg-gray-100 p-4 rounded-xl mt-3">
              <div class="flex items-center justify-center gap-6 flex-wrap">
                <div class="text-center">
                  <div class="bg-white border-2 border-gray-400 p-2 rounded-lg inline-block">
                    <div class="grid grid-cols-3 gap-0.5">
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">1</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">2</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">3</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">4</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">5</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">6</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">7</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">8</span>
                      <span class="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs">9</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Image</p>
                </div>
                <span class="text-2xl text-purple-600">∗</span>
                <div class="text-center">
                  <div class="bg-white border-2 border-purple-500 p-2 rounded-lg inline-block">
                    <div class="grid grid-cols-3 gap-0.5">
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">1</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">0</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">-1</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">1</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">0</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">-1</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">1</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">0</span>
                      <span class="w-8 h-8 bg-purple-100 flex items-center justify-center text-xs font-bold">-1</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Kernel (3×3)</p>
                </div>
                <span class="text-2xl text-purple-600">=</span>
                <div class="text-center">
                  <div class="bg-green-100 border-2 border-green-500 p-4 rounded-lg inline-block">
                    <span class="text-xl font-bold text-green-700">1×1 + 2×0 + 3×(-1) + ... = <strong>5</strong></span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Feature Map Value</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Key Parameters</h3>
            <div class="space-y-3">
              <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-gray-800">Filters / Kernels</h4>
                <p class="text-sm text-gray-600">Small matrices (e.g., 3×3, 5×5) that <strong>learn features</strong> like edges, textures, and patterns.</p>
                <code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">nn.Conv2d(in_channels, out_channels, kernel_size=3)</code>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-gray-800">Stride</h4>
                <p class="text-sm text-gray-600">Number of pixels the filter <strong>shifts</strong> at each step.</p>
                <code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">stride=2</code>
                <p class="text-xs text-gray-500 mt-1">Larger stride → smaller output</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-gray-800">Padding</h4>
                <p class="text-sm text-gray-600">Adding zeros around the image <strong>border</strong> to control output size.</p>
                <code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">padding=1</code>
                <p class="text-xs text-gray-500 mt-1">Same padding: output size = input size / stride</p>
              </div>
            </div>
          </div>
        </div>

        <div class="formula-box bg-gray-100 border-l-4 border-purple-700 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">📏 Output Size Formula:</p>
          <div class="bg-white p-3 rounded-lg font-mono text-sm text-center">
            Output = (Input − Kernel + 2 × Padding) / Stride + 1
          </div>
          <p class="text-sm text-gray-600 mt-2">Example: Input 32×32, Kernel 3×3, Padding 0, Stride 1 → <strong>30×30</strong></p>
        </div>
      </div>
    </section>

    <!-- ============ 3. CNN Architecture ============ -->
    <section class="section" id="dl-w5-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">3. CNN Architecture</h2>
      <div class="content-card">
        <div class="architecture-flow bg-gray-100 p-6 rounded-xl">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div class="arch-step bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">Image</div>
            <span class="text-2xl text-purple-600">→</span>
            <div class="arch-step bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">Conv + ReLU</div>
            <span class="text-2xl text-purple-600">→</span>
            <div class="arch-step bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">Pooling</div>
            <span class="text-2xl text-purple-600">→</span>
            <div class="arch-step bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">Conv + ReLU</div>
            <span class="text-2xl text-purple-600">→</span>
            <div class="arch-step bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">Pooling</div>
            <span class="text-2xl text-purple-600">→</span>
            <div class="arch-step bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold">Flatten</div>
            <span class="text-2xl text-purple-600">→</span>
            <div class="arch-step bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">FC</div>
            <span class="text-2xl text-purple-600">→</span>
            <div class="arch-step bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold">Softmax</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-purple-600">
            <h4 class="font-bold text-gray-800">Convolution Layer</h4>
            <p class="text-xs text-gray-600">Extracts features using learned filters.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-1 font-mono">nn.Conv2d(3, 32, 3, padding=1)</code>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-green-600">
            <h4 class="font-bold text-gray-800">Pooling Layer</h4>
            <p class="text-xs text-gray-600">Reduces spatial dimensions.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-1 font-mono">nn.MaxPool2d(2, 2)</code>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-yellow-600">
            <h4 class="font-bold text-gray-800">Flatten</h4>
            <p class="text-xs text-gray-600">Converts 2D feature maps to 1D vector.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-1 font-mono">x = x.view(x.size(0), -1)</code>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-red-600">
            <h4 class="font-bold text-gray-800">Fully Connected</h4>
            <p class="text-xs text-gray-600">Dense layers for classification.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-1 font-mono">nn.Linear(512, 10)</code>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-orange-600">
            <h4 class="font-bold text-gray-800">Softmax</h4>
            <p class="text-xs text-gray-600">Converts logits to probabilities.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-1 font-mono">nn.Softmax(dim=1)</code>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h4 class="font-bold text-gray-800">ReLU</h4>
            <p class="text-xs text-gray-600">Non-linear activation.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-1 font-mono">nn.ReLU()</code>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 4. Pooling ============ -->
    <section class="section" id="dl-w5-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">4. Pooling Layers</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-green-600">
            <h3 class="text-lg font-bold text-gray-800 mt-0">Max Pooling</h3>
            <p class="text-sm text-gray-600">Takes the <strong>maximum</strong> value from each region.</p>
            <div class="mt-3 bg-white p-3 rounded-lg inline-block border-2 border-gray-300">
              <div class="grid grid-cols-4 gap-0.5">
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">1</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">3</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">2</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">4</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">5</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold bg-green-200">6</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">1</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">2</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">3</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">4</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">8</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">1</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">2</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">3</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">5</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">6</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mt-2">2×2 max pooling → <strong>6</strong> (highlighted region)</p>
            <code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">nn.MaxPool2d(2, 2)</code>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-gray-800 mt-0">Average Pooling</h3>
            <p class="text-sm text-gray-600">Takes the <strong>average</strong> value from each region.</p>
            <div class="mt-3 bg-white p-3 rounded-lg inline-block border-2 border-gray-300">
              <div class="grid grid-cols-4 gap-0.5">
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">1</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">3</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">2</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">4</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">5</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold bg-blue-200">6</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">1</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">2</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">3</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">4</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">8</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">1</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">2</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">3</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">5</span>
                <span class="w-10 h-10 bg-blue-100 flex items-center justify-center text-sm font-bold">6</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mt-2">2×2 average pooling → <strong>(1+3+5+6)/4 = 3.75</strong></p>
            <code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">nn.AvgPool2d(2, 2)</code>
          </div>
        </div>

        <div class="gate-box bg-green-50 border-l-4 border-green-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Why Pooling?</strong> Reduces <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">spatial dimensions</span>, increases <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">receptive field</span>, provides <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">translation invariance</span>, and reduces <strong>computational cost</strong>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 5. CIFAR-10 CNN Implementation ============ -->
    <section class="section" id="dl-w5-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">5. CIFAR-10 Image Classifier</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">📊</span>
            <p class="font-bold text-gray-800">CIFAR-10</p>
            <p class="text-xs text-gray-600">10 classes · 32×32 RGB images</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🎯</span>
            <p class="font-bold text-gray-800">Goal</p>
            <p class="text-xs text-gray-600">Classify images into 10 categories</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🏆</span>
            <p class="font-bold text-gray-800">Target</p>
            <p class="text-xs text-gray-600">&gt; 80% test accuracy</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Complete CNN Implementation</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt
import numpy as np

# ============================================================
# 1. DATA LOADING & PREPROCESSING
# ============================================================

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# Download CIFAR-10
train_dataset = torchvision.datasets.CIFAR10(
    root='./data', train=True, download=True, transform=transform
)
test_dataset = torchvision.datasets.CIFAR10(
    root='./data', train=False, download=True, transform=transform
)

# Split train into train/validation
train_size = int(0.8 * len(train_dataset))
val_size = len(train_dataset) - train_size
train_dataset, val_dataset = torch.utils.data.random_split(
    train_dataset, [train_size, val_size]
)

batch_size = 64
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

classes = ('plane', 'car', 'bird', 'cat', 'deer', 
           'dog', 'frog', 'horse', 'ship', 'truck')

# ============================================================
# 2. CNN MODEL DEFINITION
# ============================================================

class CIFAR10CNN(nn.Module):
    def __init__(self, num_classes=10, dropout_rate=0.5):
        super(CIFAR10CNN, self).__init__()
        
        # Convolutional layers
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        
        # Pooling
        self.pool = nn.MaxPool2d(2, 2)
        
        # Dropout
        self.dropout = nn.Dropout(dropout_rate)
        
        # Fully connected layers
        self.fc1 = nn.Linear(128 * 4 * 4, 256)
        self.fc2 = nn.Linear(256, num_classes)
    
    def forward(self, x):
        # Conv Block 1: 32x32x3 → 16x16x32
        x = self.pool(F.relu(self.bn1(self.conv1(x))))
        
        # Conv Block 2: 16x16x32 → 8x8x64
        x = self.pool(F.relu(self.bn2(self.conv2(x))))
        
        # Conv Block 3: 8x8x64 → 4x4x128
        x = self.pool(F.relu(self.bn3(self.conv3(x))))
        
        # Flatten: 4x4x128 = 2048
        x = x.view(x.size(0), -1)
        
        # Fully connected layers
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        
        return x

# ============================================================
# 3. TRAINING LOOP
# ============================================================

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = CIFAR10CNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=0.001)
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='min', factor=0.5, patience=3
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
    
    avg_loss = total_loss / len(loader)
    accuracy = 100. * correct / total
    return avg_loss, accuracy

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
    
    avg_loss = total_loss / len(loader)
    accuracy = 100. * correct / total
    return avg_loss, accuracy

# ============================================================
# 4. TRAINING
# ============================================================

num_epochs = 20
best_val_acc = 0
history = {'train_loss': [], 'val_loss': [], 'train_acc': [], 'val_acc': []}

for epoch in range(num_epochs):
    train_loss, train_acc = train_one_epoch(model, train_loader, optimizer, criterion)
    val_loss, val_acc = validate(model, val_loader, criterion)
    scheduler.step(val_loss)
    
    history['train_loss'].append(train_loss)
    history['val_loss'].append(val_loss)
    history['train_acc'].append(train_acc)
    history['val_acc'].append(val_acc)
    
    print(f"Epoch {epoch+1}/{num_epochs} | "
          f"Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}% | "
          f"Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%")
    
    if val_acc > best_val_acc:
        best_val_acc = val_acc
        torch.save(model.state_dict(), 'best_cifar10_model.pt')

# ============================================================
# 5. TEST EVALUATION
# ============================================================

model.load_state_dict(torch.load('best_cifar10_model.pt'))
test_loss, test_acc = validate(model, test_loader, criterion)
print(f"\n🎯 Test Accuracy: {test_acc:.2f}%")

# ============================================================
# 6. CONFUSION MATRIX & VISUALIZATION
# ============================================================

from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

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
cm = confusion_matrix(y_true, y_pred)

print("\n" + "="*50)
print("CLASSIFICATION REPORT")
print("="*50)
print(classification_report(y_true, y_pred, target_names=classes))

# Plot confusion matrix
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=classes, yticklabels=classes)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix - CIFAR-10')
plt.show()</code></pre>
      </div>
    </section>

    <!-- ============ 6. MLP vs CNN Comparison ============ -->
    <section class="section" id="dl-w5-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">6. MLP vs CNN – Image Classification</h2>
      <div class="content-card">
        <div class="comparison-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-blue-700 mt-0">🧩 MLP (Multilayer Perceptron)</h3>
            <ul class="text-sm space-y-2 mt-3">
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span><strong>Flattens</strong> image → loses spatial structure</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span><strong>Too many parameters</strong> – 32×32×3 = 3072 inputs</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span><strong>No translation invariance</strong> – same object at different positions = different input</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span><strong>Poor performance</strong> on images (typically 40-50% on CIFAR-10)</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span>Simple to implement</span></li>
            </ul>
            <pre class="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mt-3"><code>class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(3072, 512)
        self.fc2 = nn.Linear(512, 256)
        self.fc3 = nn.Linear(256, 10)
    
    def forward(self, x):
        x = x.view(-1, 3072)  # Flatten!
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        return self.fc3(x)</code></pre>
          </div>
          <div class="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-600">
            <h3 class="text-lg font-bold text-purple-700 mt-0">👁️ CNN (Convolutional Neural Network)</h3>
            <ul class="text-sm space-y-2 mt-3">
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Preserves</strong> spatial structure</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Parameter sharing</strong> – same filter applied everywhere</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Translation invariant</strong> – detects features anywhere</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">✓</span> <span><strong>Great performance</strong> – 80%+ on CIFAR-10</span></li>
              <li class="flex items-start gap-2"><span class="text-yellow-500">⚠</span> <span>More complex architecture</span></li>
            </ul>
            <pre class="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mt-3"><code>class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc = nn.Linear(64*8*8, 10)
    
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64*8*8)
        return self.fc(x)</code></pre>
          </div>
        </div>

        <div class="comparison-table bg-gray-100 p-5 rounded-xl mt-4">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="p-3 text-left border border-gray-300">Aspect</th>
                <th class="p-3 text-left border border-gray-300">MLP</th>
                <th class="p-3 text-left border border-gray-300">CNN</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Parameters</td>
                <td class="p-3">~1.5M (for 3072 → 512 → 256 → 10)</td>
                <td class="p-3 text-green-700 font-bold">~30K (with parameter sharing)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Spatial Structure</td>
                <td class="p-3 text-red-600">✗ Lost</td>
                <td class="p-3 text-green-700">✓ Preserved</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Translation Invariance</td>
                <td class="p-3 text-red-600">✗ None</td>
                <td class="p-3 text-green-700">✓ Built-in</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">CIFAR-10 Accuracy</td>
                <td class="p-3 text-red-600">~45-50%</td>
                <td class="p-3 text-green-700 font-bold">~80-85%</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Training Speed</td>
                <td class="p-3">Faster per epoch</td>
                <td class="p-3">Slower per epoch (more ops)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Use Case</td>
                <td class="p-3">Tabular data, small inputs</td>
                <td class="p-3 text-green-700 font-bold">Images, video, spatial data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="gate-box bg-purple-50 border-l-4 border-purple-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 Key Takeaway:</strong> CNNs are <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">fundamentally better</span> for images because they exploit the <strong>spatial structure</strong> of data through <strong>convolution</strong> and <strong>parameter sharing</strong>, making them <strong>more efficient</strong> and <strong>more accurate</strong> than MLPs.</p>
        </div>
      </div>
    </section>

    <!-- ============ 7. Cheat Sheet ============ -->
    <section class="section" id="dl-w5-t7">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">7. Cheat Sheet – CNN Essentials</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-purple-900 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
                <th class="p-3 text-left border border-gray-300">PyTorch Code</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Conv2d</td>
                <td class="p-3">2D convolution layer</td>
                <td class="p-3 font-mono text-xs">nn.Conv2d(3, 32, 3, padding=1)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">MaxPool2d</td>
                <td class="p-3">Downsampling by taking max</td>
                <td class="p-3 font-mono text-xs">nn.MaxPool2d(2, 2)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">AvgPool2d</td>
                <td class="p-3">Downsampling by taking average</td>
                <td class="p-3 font-mono text-xs">nn.AvgPool2d(2, 2)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">BatchNorm2d</td>
                <td class="p-3">Normalizes each batch</td>
                <td class="p-3 font-mono text-xs">nn.BatchNorm2d(32)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Dropout</td>
                <td class="p-3">Regularization by dropping neurons</td>
                <td class="p-3 font-mono text-xs">nn.Dropout(0.5)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Flatten</td>
                <td class="p-3">Convert 2D to 1D</td>
                <td class="p-3 font-mono text-xs">x = x.view(-1, 128*4*4)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">ReLU</td>
                <td class="p-3">Non-linear activation</td>
                <td class="p-3 font-mono text-xs">F.relu(x)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 8. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w5-t8">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 pb-2">📘 Quick Revision – Computer Vision</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>Image representation:</strong> (H, W, C) for RGB, (H, W) for grayscale</li>
          <li class="pb-3 border-b border-gray-200"><strong>Convolution:</strong> Filter slides over image → element-wise multiply + sum → feature map</li>
          <li class="pb-3 border-b border-gray-200"><strong>Kernel:</strong> Learns features like edges, corners, textures</li>
          <li class="pb-3 border-b border-gray-200"><strong>Stride:</strong> Step size of filter movement</li>
          <li class="pb-3 border-b border-gray-200"><strong>Padding:</strong> Adds zeros to control output size</li>
          <li class="pb-3 border-b border-gray-200"><strong>Pooling:</strong> Reduces spatial dimensions (MaxPool / AvgPool)</li>
          <li class="pb-3 border-b border-gray-200"><strong>CNN Architecture:</strong> Conv → ReLU → Pool → Conv → ReLU → Pool → Flatten → FC → Softmax</li>
          <li class="pb-0"><strong>MLP vs CNN:</strong> CNN preserves spatial structure, uses parameter sharing, and achieves <strong>much higher accuracy</strong> on images</li>
        </ul>
        <div class="gate-box bg-purple-50 border-l-4 border-purple-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 GATE Focus:</strong> Understand <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">convolution mathematically</span>, output size calculation, and why CNNs are <strong>parameter-efficient</strong> compared to MLPs. Know the difference between <strong>valid</strong> and <strong>same</strong> padding.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">👁️ Deep Learning Bootcamp – Week 5 · Computer Vision &amp; Convolutional Neural Networks</p>
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
    { id: 'dl-w5-t1', title: 'Image Representation' },
    { id: 'dl-w5-t2', title: 'Convolution Operation' },
    { id: 'dl-w5-t3', title: 'CNN Architecture' },
    { id: 'dl-w5-t4', title: 'Pooling Layers' },
    { id: 'dl-w5-t5', title: 'CIFAR-10 CNN Implementation' },
    { id: 'dl-w5-t6', title: 'MLP vs CNN Comparison' },
    { id: 'dl-w5-t7', title: 'Cheat Sheet – CNN' },
    { id: 'dl-w5-t8', title: 'Quick Revision' },
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #2d1b69);
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

/* Architecture flow */
.architecture-flow {
  background: #f3f0ff !important;
}

.arch-step {
  transition: transform 0.2s;
}

.arch-step:hover {
  transform: scale(1.05);
}

/* Code block overrides */
pre code {
  background: transparent !important;
  color: #e2edf7 !important;
}

pre {
  background: #0b1e2f !important;
  color: #e2edf7 !important;
  border: 1px solid #2d1b69 !important;
}

/* Ensure code in cards is visible */
.content-card code {
  background: #eef3f8;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #0b1e33;
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

/* Responsive */
@media (max-width: 720px) {
  .cheatsheet-header h1 {
    font-size: 2rem !important;
  }
  .content-card {
    padding: 18px;
  }
  .comparison-grid {
    grid-template-columns: 1fr !important;
  }
  .project-overview {
    grid-template-columns: 1fr !important;
  }
  .architecture-flow {
    padding: 12px !important;
  }
  .arch-step {
    font-size: 0.75rem !important;
    padding: 4px 12px !important;
  }
  .term-table,
  .comparison-table table {
    font-size: 0.75rem;
  }
  .term-table th,
  .term-table td,
  .comparison-table th,
  .comparison-table td {
    padding: 6px 8px;
  }
  .conv-visual .grid {
    gap: 1px !important;
  }
  .conv-visual .w-8 {
    width: 24px !important;
    height: 24px !important;
    font-size: 0.65rem !important;
  }
}
</style>