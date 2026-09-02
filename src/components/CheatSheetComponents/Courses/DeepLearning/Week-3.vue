<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>🔥 Deep Learning – Week 3</h1>
      <p class="subtitle">PyTorch Fundamentals · Tensors · Autograd · DataLoaders · MNIST</p>
    </header>

    <!-- ============ 1. Why PyTorch? ============ -->
    <section class="section" id="dl-w3-t1">
      <h2>1. Why PyTorch?</h2>
      <div class="content-card">
        <div class="feature-grid">
          <div class="feature-card">
            <span class="feature-icon">⚡</span>
            <h3>Dynamic Computation Graphs</h3>
            <p>Define and modify graphs on the fly – perfect for research and experimentation.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🐍</span>
            <h3>Pythonic & Intuitive</h3>
            <p>Feels like NumPy with GPU acceleration. Easy to learn and debug.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🎯</span>
            <h3>Autograd</h3>
            <p>Automatic differentiation – compute gradients effortlessly with <code>.backward()</code>.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🚀</span>
            <h3>GPU Support</h3>
            <p>Seamlessly move tensors to GPU with <code>.to('cuda')</code> for massive speedups.</p>
          </div>
        </div>

        <div class="gate-box">
          <p><strong>📦 Installation:</strong></p>
          <pre><code>pip install torch torchvision</code></pre>
          <p>For GPU support, visit <a href="https://pytorch.org" target="_blank" style="color:#1f6390;">pytorch.org</a> for CUDA-specific installation.</p>
        </div>
      </div>
    </section>

    <!-- ============ 2. Tensors ============ -->
    <section class="section" id="dl-w3-t2">
      <h2>2. Tensors – The Building Blocks</h2>
      <div class="content-card">
        <p>A <strong>tensor</strong> is a multi-dimensional array – similar to NumPy arrays but with GPU support and autograd capabilities.</p>

        <table class="activation-table gate-table">
          <thead>
            <tr><th>Tensor Type</th><th>Shape</th><th>Example Use</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Scalar</strong></td><td>0D</td><td>Loss value, learning rate</td></tr>
            <tr><td><strong>Vector</strong></td><td>1D</td><td>Feature vector, bias</td></tr>
            <tr><td><strong>Matrix</strong></td><td>2D</td><td>Weight matrix, batch of features</td></tr>
            <tr><td><strong>3D Tensor</strong></td><td>3D</td><td>Batch of images (N, C, H, W)</td></tr>
            <tr><td><strong>4D+ Tensor</strong></td><td>4D+</td><td>Video, batches of sequences</td></tr>
          </tbody>
        </table>

        <h3>Creating Tensors</h3>
        <pre><code>import torch

# From list/NumPy
t1 = torch.tensor([1, 2, 3])                    # [1, 2, 3]
t2 = torch.tensor([[1, 2], [3, 4]])             # 2×2 matrix

# Zeros & Ones
zeros = torch.zeros(2, 3)                       # 2×3 zeros
ones = torch.ones(3, 2)                         # 3×2 ones

# Random
rand = torch.randn(2, 2)                        # 2×2 random (normal)
rand_uniform = torch.rand(2, 2)                 # uniform [0, 1)

# Identity
eye = torch.eye(3)                              # 3×3 identity matrix

# Range
arange = torch.arange(0, 10, 2)                 # [0, 2, 4, 6, 8]</code></pre>

        <h3>Tensor Properties</h3>
        <pre><code>t = torch.randn(3, 4)
print(t.shape)      # torch.Size([3, 4])
print(t.size())     # torch.Size([3, 4])
print(t.dtype)      # torch.float32 (default)
print(t.device)     # cpu or cuda</code></pre>
      </div>
    </section>

    <!-- ============ 3. Tensor Operations ============ -->
    <section class="section" id="dl-w3-t3">
      <h2>3. Tensor Operations</h2>
      <div class="content-card">
        <p>PyTorch provides NumPy-like operations with GPU acceleration.</p>

        <h3>Element-wise Operations</h3>
        <pre><code>a = torch.tensor([1, 2, 3])
b = torch.tensor([4, 5, 6])

print(a + b)        # [5, 7, 9]
print(a - b)        # [-3, -3, -3]
print(a * b)        # [4, 10, 18]
print(a / b)        # [0.25, 0.4, 0.5]
print(a ** 2)       # [1, 4, 9]
print(torch.sqrt(a))# [1.0, 1.414, 1.732]</code></pre>

        <h3>Matrix Multiplication</h3>
        <pre><code>A = torch.randn(2, 3)
B = torch.randn(3, 4)

# Matrix multiplication
C = torch.matmul(A, B)      # 2×4
C = A @ B                   # Same as matmul (shorthand)

# Dot product (1D)
v1 = torch.tensor([1, 2, 3])
v2 = torch.tensor([4, 5, 6])
dot = torch.dot(v1, v2)     # 1*4 + 2*5 + 3*6 = 32</code></pre>

        <h3>Reshaping</h3>
        <pre><code>t = torch.arange(12)                    # [0, 1, 2, ..., 11]
t_2d = t.reshape(3, 4)                  # 3×4 matrix
t_2d = t.view(3, 4)                     # Same as reshape

# Flatten
flat = t_2d.flatten()                   # Back to 1D

# Transpose
transposed = t_2d.T                     # 4×3

# Unsqueeze (add dimension)
t_unsqueezed = t.unsqueeze(0)           # Shape: (1, 12)</code></pre>

        <h3>Broadcasting</h3>
        <pre><code># Add scalar to all elements
t = torch.tensor([[1, 2], [3, 4]])
print(t + 10)                           # [[11, 12], [13, 14]]

# Add 1D to 2D (broadcast row)
row = torch.tensor([10, 20])
print(t + row)                          # [[11, 22], [13, 24]]</code></pre>
      </div>
    </section>

    <!-- ============ 4. CPU vs GPU ============ -->
    <section class="section" id="dl-w3-t4">
      <h2>4. CPU vs GPU</h2>
      <div class="content-card">
        <p>PyTorch makes it easy to move tensors between CPU and GPU.</p>

        <pre><code># Check if GPU is available
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Move tensor to device
t = torch.tensor([1, 2, 3])
t_gpu = t.to(device)                    # Move to GPU (if available)

# Move back to CPU
t_cpu = t_gpu.cpu()

# Create tensor directly on device
t = torch.randn(2, 3, device=device)

# Check device
print(t.device)                         # cuda:0 or cpu</code></pre>

        <div class="gate-box">
          <p><strong>⚡ Performance Tip:</strong> GPU is <span class="highlight-text">10-100x faster</span> for matrix operations. Always move your model and data to the same device.</p>
        </div>
      </div>
    </section>

    <!-- ============ 5. Autograd ============ -->
    <section class="section" id="dl-w3-t5">
      <h2>5. Autograd – Automatic Differentiation</h2>
      <div class="content-card">
        <p><strong>Autograd</strong> automatically computes gradients for tensors with <code>requires_grad=True</code>.</p>

        <pre><code># Create tensor with gradient tracking
x = torch.tensor([2.0], requires_grad=True)
w = torch.tensor([3.0], requires_grad=True)
b = torch.tensor([1.0], requires_grad=True)

# Forward pass
y = w * x + b                           # y = 3*2 + 1 = 7

# Backward pass
y.backward()                            # Compute gradients

print(x.grad)                           # ∂y/∂x = w = 3.0
print(w.grad)                           # ∂y/∂w = x = 2.0
print(b.grad)                           # ∂y/∂b = 1.0</code></pre>

        <h3>Gradient Descent with Autograd</h3>
        <pre><code># Initialize parameters
w = torch.randn(1, requires_grad=True)
b = torch.randn(1, requires_grad=True)
learning_rate = 0.01

for epoch in range(100):
    # Forward pass
    y_pred = w * x + b
    loss = (y_pred - y_true) ** 2
    
    # Backward pass
    loss.backward()
    
    # Update weights (no gradient tracking for update)
    with torch.no_grad():
        w -= learning_rate * w.grad
        b -= learning_rate * b.grad
        
        # Zero gradients for next iteration
        w.grad.zero_()
        b.grad.zero_()</code></pre>

        <div class="example-box">
          <p><strong>🧠 Important:</strong></p>
          <ul>
            <li><code>.backward()</code> accumulates gradients – always <strong>zero them</strong> after each step.</li>
            <li>Use <code>with torch.no_grad()</code> for weight updates and inference.</li>
            <li>Only tensors with <code>requires_grad=True</code> accumulate gradients.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 6. Dataset & DataLoader ============ -->
    <section class="section" id="dl-w3-t6">
      <h2>6. Dataset & DataLoader</h2>
      <div class="content-card">
        <p>PyTorch provides efficient data handling through <code>Dataset</code> and <code>DataLoader</code>.</p>

        <h3>Loading MNIST</h3>
        <pre><code>import torchvision
import torchvision.transforms as transforms

# Transform: Convert to tensor & normalize
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# Download MNIST
train_dataset = torchvision.datasets.MNIST(
    root='./data', train=True, download=True, transform=transform
)
test_dataset = torchvision.datasets.MNIST(
    root='./data', train=False, download=True, transform=transform
)</code></pre>

        <h3>Creating DataLoader</h3>
        <pre><code>from torch.utils.data import DataLoader

# Split train into train/validation
train_size = int(0.8 * len(train_dataset))
val_size = len(train_dataset) - train_size
train_dataset, val_dataset = torch.utils.data.random_split(
    train_dataset, [train_size, val_size]
)

# DataLoaders
batch_size = 64
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

# Iterate over batches
for images, labels in train_loader:
    # images: (batch_size, 1, 28, 28)
    # labels: (batch_size,)
    print(images.shape)      # torch.Size([64, 1, 28, 28])
    break</code></pre>

        <h3>Train/Validation/Test Split</h3>
        <div class="split-diagram">
          <div class="split-box train">Training<br><span class="split-pct">80%</span></div>
          <div class="split-box val">Validation<br><span class="split-pct">10%</span></div>
          <div class="split-box test">Test<br><span class="split-pct">10%</span></div>
        </div>
        <div class="example-box">
          <p><strong>🎯 Key Parameters:</strong></p>
          <ul>
            <li><strong>Batch size:</strong> Number of samples per update (e.g., 32, 64, 128)</li>
            <li><strong>Shuffle:</strong> Randomize order each epoch (important for training)</li>
            <li><strong>Drop last:</strong> Drop incomplete batches (optional)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 7. MNIST Neural Network ============ -->
    <section class="section" id="dl-w3-t7">
      <h2>7. MNIST Neural Network (PyTorch)</h2>
      <div class="content-card">
        <h3>Model Definition</h3>
        <pre><code>import torch.nn as nn
import torch.nn.functional as F

class MNISTNet(nn.Module):
    def __init__(self, hidden_size=128, num_layers=2):
        super(MNISTNet, self).__init__()
        
        if num_layers == 1:
            self.fc1 = nn.Linear(28*28, 10)
        elif num_layers == 2:
            self.fc1 = nn.Linear(28*28, hidden_size)
            self.fc2 = nn.Linear(hidden_size, 10)
        else:
            self.fc1 = nn.Linear(28*28, hidden_size)
            self.fc2 = nn.Linear(hidden_size, hidden_size)
            self.fc3 = nn.Linear(hidden_size, 10)
        
        self.num_layers = num_layers
        self.dropout = nn.Dropout(0.2)
    
    def forward(self, x):
        x = x.view(-1, 28*28)               # Flatten
        
        if self.num_layers == 1:
            x = self.fc1(x)
        else:
            x = F.relu(self.fc1(x))
            x = self.dropout(x)
            if self.num_layers == 3:
                x = F.relu(self.fc2(x))
                x = self.dropout(x)
                x = self.fc3(x)
            else:
                x = self.fc2(x)
        
        return F.log_softmax(x, dim=1)</code></pre>

        <h3>Training Loop</h3>
        <pre><code>def train(model, device, train_loader, optimizer, epoch):
    model.train()
    train_loss = 0
    correct = 0
    
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)
        
        optimizer.zero_grad()
        output = model(data)
        loss = F.nll_loss(output, target)
        loss.backward()
        optimizer.step()
        
        train_loss += loss.item()
        pred = output.argmax(dim=1, keepdim=True)
        correct += pred.eq(target.view_as(pred)).sum().item()
    
    avg_loss = train_loss / len(train_loader)
    acc = 100. * correct / len(train_loader.dataset)
    return avg_loss, acc

def evaluate(model, device, data_loader):
    model.eval()
    loss = 0
    correct = 0
    
    with torch.no_grad():
        for data, target in data_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            loss += F.nll_loss(output, target, reduction='sum').item()
            pred = output.argmax(dim=1, keepdim=True)
            correct += pred.eq(target.view_as(pred)).sum().item()
    
    avg_loss = loss / len(data_loader.dataset)
    acc = 100. * correct / len(data_loader.dataset)
    return avg_loss, acc</code></pre>

        <h3>Full Training Script</h3>
        <pre><code># Hyperparameters (experiment with these!)
batch_sizes = [32, 64, 128]
learning_rates = [0.001, 0.01, 0.1]
hidden_sizes = [64, 128, 256]
num_layers = [1, 2, 3]

# Example configuration
model = MNISTNet(hidden_size=128, num_layers=2).to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    train_loss, train_acc = train(model, device, train_loader, optimizer, epoch)
    val_loss, val_acc = evaluate(model, device, val_loader)
    print(f'Epoch {epoch}: Train Acc={train_acc:.2f}%, Val Acc={val_acc:.2f}%')

test_loss, test_acc = evaluate(model, device, test_loader)
print(f'Test Accuracy: {test_acc:.2f}%')</code></pre>
      </div>
    </section>

    <!-- ============ 8. Cheat Sheet ============ -->
    <section class="section" id="dl-w3-t8">
      <h2>8. Cheat Sheet – PyTorch Essentials</h2>
      <div class="content-card">
        <table class="term-table gate-table">
          <thead><tr><th>Operation</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td><strong>Create tensor</strong></td><td><code>torch.tensor([1, 2, 3])</code></td></tr>
            <tr><td><strong>Zeros/Ones</strong></td><td><code>torch.zeros(2, 3), torch.ones(2, 3)</code></td></tr>
            <tr><td><strong>Random</strong></td><td><code>torch.randn(2, 3), torch.rand(2, 3)</code></td></tr>
            <tr><td><strong>Reshape</strong></td><td><code>t.reshape(3, 4) or t.view(3, 4)</code></td></tr>
            <tr><td><strong>Matrix multiplication</strong></td><td><code>torch.matmul(A, B) or A @ B</code></td></tr>
            <tr><td><strong>Gradient tracking</strong></td><td><code>t.requires_grad = True</code></td></tr>
            <tr><td><strong>Backward pass</strong></td><td><code>loss.backward()</code></td></tr>
            <tr><td><strong>Zero gradients</strong></td><td><code>optimizer.zero_grad()</code></td></tr>
            <tr><td><strong>No gradient (inference)</strong></td><td><code>with torch.no_grad():</code></td></tr>
            <tr><td><strong>Move to device</strong></td><td><code>t.to(device)</code></td></tr>
            <tr><td><strong>Define layer</strong></td><td><code>nn.Linear(in_features, out_features)</code></td></tr>
            <tr><td><strong>DataLoader</strong></td><td><code>DataLoader(dataset, batch_size=64, shuffle=True)</code></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ============ 9. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w3-t9">
      <h2>📘 Quick Revision – PyTorch</h2>
      <div class="content-card">
        <ul class="revision-list gate-revision">
          <li><strong>Tensor:</strong> Multi-dimensional array with GPU support and autograd.</li>
          <li><strong>Autograd:</strong> Automatic differentiation – <code>.backward()</code> computes gradients.</li>
          <li><strong>Device:</strong> Use <code>.to(device)</code> to move tensors/models to CPU/GPU.</li>
          <li><strong>Dataset:</strong> Custom class with <code>__len__</code> and <code>__getitem__</code>.</li>
          <li><strong>DataLoader:</strong> Iterable over batches – handles batching, shuffling, multiprocessing.</li>
          <li><strong>nn.Module:</strong> Base class for all neural network modules.</li>
          <li><strong>Loss functions:</strong> <code>nn.MSELoss</code>, <code>nn.CrossEntropyLoss</code>, <code>F.nll_loss</code>.</li>
          <li><strong>Optimizers:</strong> <code>torch.optim.SGD</code>, <code>torch.optim.Adam</code>.</li>
          <li><strong>Training steps:</strong> forward → loss → backward → optimizer.step → zero_grad.</li>
        </ul>
        <div class="gate-box">
          <p><strong>🎯 Experiment with:</strong> Batch size, learning rate, number of neurons, number of layers – observe their effect on accuracy and training speed.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🔥 Deep Learning Bootcamp – Week 3 · PyTorch Fundamentals</p>
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
    { id: 'dl-w3-t1', title: 'Why PyTorch?' },
    { id: 'dl-w3-t2', title: 'Tensors' },
    { id: 'dl-w3-t3', title: 'Tensor Operations' },
    { id: 'dl-w3-t4', title: 'CPU vs GPU' },
    { id: 'dl-w3-t5', title: 'Autograd' },
    { id: 'dl-w3-t6', title: 'Dataset & DataLoader' },
    { id: 'dl-w3-t7', title: 'MNIST Neural Network' },
    { id: 'dl-w3-t8', title: 'Cheat Sheet – PyTorch' },
    { id: 'dl-w3-t9', title: 'Quick Revision' },
  ];
  emit('topic-updated', topics);
});
</script>

<style scoped>
/* ---------- base (consistent with previous weeks) ---------- */
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #0f3460);
  color: white;
  border-radius: 18px;
  margin-bottom: 32px;
}
.cheatsheet-header h1 {
  font-size: 2.8em;
  margin: 0;
  letter-spacing: -0.5px;
}
.subtitle {
  font-size: 1.2em;
  opacity: 0.8;
  margin-top: 8px;
}

.section {
  margin-bottom: 32px;
}
.section h2 {
  color: #0a1a2f;
  border-bottom: 5px solid #e94560;
  padding-bottom: 8px;
  font-size: 2em;
  font-weight: 600;
}

.content-card {
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 20, 40, 0.06);
  margin-top: 16px;
}
.content-card h3 {
  color: #1a3a5f;
  margin-top: 28px;
  margin-bottom: 12px;
  font-size: 1.35em;
}
.content-card h3:first-of-type {
  margin-top: 0;
}
.content-card p {
  line-height: 1.7;
  margin: 10px 0;
}
.content-card code {
  background: #eef3f8;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

/* feature grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 15px 0;
}
.feature-card {
  background: #f0f6fd;
  padding: 20px;
  border-radius: 14px;
  border-left: 5px solid #e94560;
}
.feature-card .feature-icon {
  font-size: 2em;
  display: block;
  margin-bottom: 6px;
}
.feature-card h3 {
  margin: 0 0 8px 0;
  color: #0a1a2f;
}
.feature-card p {
  font-size: 0.95rem;
  margin: 0;
}

/* tables */
.activation-table, .term-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 0.95rem;
}
.activation-table th, .activation-table td,
.term-table th, .term-table td {
  padding: 12px 14px;
  border: 1px solid #d4dfe9;
  text-align: left;
}
.activation-table th, .term-table th {
  background: #1a3a5f;
  color: white;
  font-weight: 700;
}
.activation-table tr:nth-child(even),
.term-table tr:nth-child(even) {
  background: #f8fafc;
}

/* split diagram */
.split-diagram {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin: 15px 0;
  border-radius: 12px;
  overflow: hidden;
}
.split-box {
  padding: 18px 20px;
  text-align: center;
  font-weight: 700;
  flex: 1;
  color: white;
}
.split-box.train {
  background: #2e7d32;
}
.split-box.val {
  background: #ed6c02;
}
.split-box.test {
  background: #d32f2f;
}
.split-pct {
  display: block;
  font-size: 1.2em;
  font-weight: 300;
}

/* boxes */
.example-box {
  background: #eef3f8;
  border-left: 6px solid #e94560;
  padding: 16px 22px;
  border-radius: 12px;
  margin: 18px 0;
}
.gate-box {
  background: #e3edf7;
  border-left: 6px solid #0f3460;
  padding: 16px 22px;
  border-radius: 12px;
  margin: 18px 0;
}

/* code */
pre {
  background: #092338;
  color: #081018;
  padding: 20px;
  border-radius: 14px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 14px 0;
}
pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.highlight-text {
  background: #fce96a;
  padding: 0 6px;
  border-radius: 4px;
  font-weight: 600;
}

/* revision */
.revision-list {
  list-style: none;
  padding: 0;
}
.revision-list li {
  padding: 12px 0;
  border-bottom: 1px solid #e2eaf2;
  font-size: 1.05rem;
  line-height: 1.5;
}
.revision-list li:last-child {
  border-bottom: none;
}
.gate-revision li {
  font-size: 1.05rem;
  padding: 10px 0;
}

.cheatsheet-footer {
  text-align: center;
  padding: 30px 20px;
  color: #4d6a86;
  border-top: 3px solid #d4dfe9;
  margin-top: 40px;
  font-size: 1.05rem;
}

/* responsive */
@media (max-width: 720px) {
  .cheatsheet-header h1 { font-size: 2rem; }
  .feature-grid { grid-template-columns: 1fr; }
  .split-diagram { flex-direction: column; border-radius: 8px; }
  .activation-table, .term-table { font-size: 0.8rem; }
  .content-card { padding: 18px; }
}
</style>