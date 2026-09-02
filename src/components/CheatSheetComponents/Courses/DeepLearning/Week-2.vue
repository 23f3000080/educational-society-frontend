<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>🧠 Deep Learning – Week 2</h1>
      <p class="subtitle">Neural Networks From Scratch · Dense Layers · Backpropagation · Optimizers</p>
    </header>

    <!-- ============ 1. Dense / Fully Connected Layer ============ -->
    <section class="section" id="dl-w2-t1">
      <h2>1. Dense (Fully Connected) Layer</h2>
      <div class="content-card">
        <p>A <strong>dense layer</strong> connects every input neuron to every output neuron. Each connection has a weight, and each output neuron has a bias.</p>
        
        <div class="dense-diagram">
          <div class="dense-inputs">
            <span class="dense-node">x₁</span>
            <span class="dense-node">x₂</span>
            <span class="dense-node">x₃</span>
            <span class="dense-node">⋮</span>
            <span class="dense-node">xₙ</span>
          </div>
          <div class="dense-weights">
            <span class="weight-matrix">W (n × m)</span>
            <span class="dense-arrow">→</span>
            <span class="bias-vector">+ b</span>
          </div>
          <div class="dense-outputs">
            <span class="dense-node">a₁</span>
            <span class="dense-node">a₂</span>
            <span class="dense-node">⋮</span>
            <span class="dense-node">aₘ</span>
          </div>
        </div>

        <div class="formula-box gate-formula">
          <p><strong>Forward pass for a dense layer:</strong></p>
          <p class="math">z = Wx + b</p>
          <p class="math">a = f(z) &nbsp; (activation function applied element‑wise)</p>
          <p><span class="highlight-text">🔑 Key:</span> W is a matrix of shape (m × n), x is (n × 1), b is (m × 1).</p>
        </div>

        <div class="example-box">
          <p><strong>📐 Example:</strong> Input layer (3 neurons) → Dense layer (2 neurons)</p>
          <ul>
            <li>W = [[0.5, 0.2, 0.1], [0.3, 0.8, 0.4]] &nbsp; (2×3)</li>
            <li>x = [2, 4, 1]ᵀ, &nbsp; b = [0.5, -0.3]ᵀ</li>
            <li>z₁ = 0.5·2 + 0.2·4 + 0.1·1 + 0.5 = <strong>2.4</strong></li>
            <li>z₂ = 0.3·2 + 0.8·4 + 0.4·1 − 0.3 = <strong>3.9</strong></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 2. Forward Propagation ============ -->
    <section class="section" id="dl-w2-t2">
      <h2>2. Forward Propagation</h2>
      <div class="content-card">
        <p>Information flows from <strong>input → hidden layers → output</strong>. Each layer applies linear transformation + activation.</p>
        
        <div class="forward-flow">
          <div class="fwd-step">
            <span class="fwd-label">Input</span>
            <span class="fwd-desc">x ∈ ℝⁿ</span>
          </div>
          <span class="fwd-arrow">→</span>
          <div class="fwd-step">
            <span class="fwd-label">Layer 1</span>
            <span class="fwd-desc">z¹ = W¹x + b¹<br>a¹ = f₁(z¹)</span>
          </div>
          <span class="fwd-arrow">→</span>
          <div class="fwd-step">
            <span class="fwd-label">Layer 2</span>
            <span class="fwd-desc">z² = W²a¹ + b²<br>a² = f₂(z²)</span>
          </div>
          <span class="fwd-arrow">→</span>
          <div class="fwd-step highlight-fwd">
            <span class="fwd-label">Output</span>
            <span class="fwd-desc">ŷ = aᴸ</span>
          </div>
        </div>

        <div class="gate-box">
          <p><strong>🧮 GATE insight:</strong> Forward propagation is simply <span class="highlight-text">matrix multiplication</span> followed by element‑wise activation. The entire network is a composition of functions:</p>
          <p class="math" style="text-align:center;">ŷ = fᴸ( Wᴸ · fᴸ⁻¹( … f₁( W¹x + b¹ ) … ) + bᴸ )</p>
        </div>
      </div>
    </section>

    <!-- ============ 3. Loss Functions ============ -->
    <section class="section" id="dl-w2-t3">
      <h2>3. Loss Functions</h2>
      <div class="content-card">
        <p>The loss function measures <strong>how wrong</strong> the prediction is. We minimize it during training.</p>

        <table class="activation-table gate-table">
          <thead>
            <tr><th>Loss</th><th>Formula</th><th>Use case</th><th>Derivative w.r.t. ŷ</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>MSE</strong><br>(Mean Squared Error)</td>
              <td>L = (1/n) Σ (y − ŷ)²</td>
              <td>Regression</td>
              <td>∂L/∂ŷ = (2/n)(ŷ − y)</td>
            </tr>
            <tr>
              <td><strong>Binary Cross‑Entropy</strong><br>(Log Loss)</td>
              <td>L = − [ y log(ŷ) + (1−y) log(1−ŷ) ]</td>
              <td>Binary classification</td>
              <td>∂L/∂ŷ = (ŷ − y) / [ŷ(1−ŷ)]</td>
            </tr>
            <tr>
              <td><strong>Categorical Cross‑Entropy</strong></td>
              <td>L = − Σ yᵢ log(ŷᵢ)</td>
              <td>Multi‑class classification</td>
              <td>∂L/∂ŷ = − y/ŷ</td>
            </tr>
          </tbody>
        </table>

        <div class="example-box">
          <p><strong>📝 Example (Binary Cross‑Entropy):</strong></p>
          <ul>
            <li>True label: y = 1 (Pass)</li>
            <li>Prediction: ŷ = 0.85</li>
            <li>L = −[1·log(0.85) + 0·log(0.15)] = <strong>0.1625</strong></li>
            <li>If prediction was 0.99 → L = 0.010 → <strong>better</strong></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 4. Backpropagation ============ -->
    <section class="section" id="dl-w2-t4">
      <h2>4. Backpropagation</h2>
      <div class="content-card">
        <p>Backpropagation computes gradients of the loss w.r.t. <strong>every weight and bias</strong> using the <strong>chain rule</strong>.</p>

        <div class="backprop-flow">
          <div class="bp-step">
            <span class="bp-label">Loss L</span>
            <span class="bp-desc">compute loss</span>
          </div>
          <span class="bp-arrow">←</span>
          <div class="bp-step">
            <span class="bp-label">∂L/∂ŷ</span>
            <span class="bp-desc">derivative w.r.t. output</span>
          </div>
          <span class="bp-arrow">←</span>
          <div class="bp-step">
            <span class="bp-label">∂L/∂Wᴸ</span>
            <span class="bp-desc">gradient for layer L</span>
          </div>
          <span class="bp-arrow">←</span>
          <div class="bp-step">
            <span class="bp-label">∂L/∂Wᴸ⁻¹</span>
            <span class="bp-desc">propagate backward</span>
          </div>
          <span class="bp-arrow">←</span>
          <div class="bp-step highlight-bp">
            <span class="bp-label">∂L/∂W¹</span>
            <span class="bp-desc">… and so on</span>
          </div>
        </div>

        <div class="formula-box gate-formula">
          <p><strong>Chain rule for a single weight:</strong></p>
          <p class="math">∂L/∂wᵢⱼ = ∂L/∂a · ∂a/∂z · ∂z/∂wᵢⱼ</p>
          <p><strong>For a dense layer with sigmoid:</strong></p>
          <p class="math">∂L/∂W = (ŷ − y) · σ'(z) · xᵀ &nbsp; (simplified for output layer)</p>
          <p><span class="highlight-text">🟡 GATE focus:</span> Backpropagation is <strong>just the chain rule</strong> applied systematically through the computational graph.</p>
        </div>
      </div>
    </section>

    <!-- ============ 5. Gradient Descent & Optimizers ============ -->
    <section class="section" id="dl-w2-t5">
      <h2>5. Optimizers</h2>
      <div class="content-card">
        <p>Optimizers update weights to minimize the loss. <strong>Gradient Descent</strong> is the foundation.</p>

        <div class="formula-box gate-formula">
          <p><strong>Vanilla Gradient Descent:</strong></p>
          <p class="math">W = W − η · ∂L/∂W</p>
          <p><strong>Stochastic Gradient Descent (SGD):</strong> update using <strong>one sample</strong> at a time.</p>
          <p><strong>Mini‑batch GD:</strong> update using a <strong>batch</strong> of samples (most common).</p>
        </div>

        <table class="activation-table gate-table">
          <thead>
            <tr><th>Optimizer</th><th>Update rule</th><th>Key feature</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>GD / SGD</strong></td>
              <td>W ← W − η ∇L</td>
              <td>Basic, may oscillate</td>
            </tr>
            <tr>
              <td><strong>SGD with Momentum</strong></td>
              <td>v ← βv + (1−β)∇L<br>W ← W − η v</td>
              <td>Accelerates convergence, dampens oscillations</td>
            </tr>
            <tr>
              <td><strong>Adam</strong></td>
              <td>Adaptive moment estimation</td>
              <td>Combines momentum + adaptive learning rates</td>
            </tr>
          </tbody>
        </table>

        <div class="gate-box">
          <p><strong>⚙️ GATE perspective:</strong> Momentum helps escape local minima and speeds up training. The update direction is a <span class="highlight-text">moving average of past gradients</span>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 6. Neural Network from Scratch (NumPy) ============ -->
    <section class="section" id="dl-w2-t6">
      <h2>6. Build NN from Scratch (NumPy)</h2>
      <div class="content-card">
        <p><strong>2‑Layer Neural Network for MNIST</strong> (28×28 = 784 inputs, 10 outputs)</p>
        
        <h3>Layer Definition</h3>
        <pre><code>import numpy as np

class DenseLayer:
    def __init__(self, input_size, output_size):
        # He initialization (recommended for ReLU)
        self.W = np.random.randn(input_size, output_size) * np.sqrt(2.0 / input_size)
        self.b = np.zeros((1, output_size))
    
    def forward(self, X):
        self.X = X
        self.z = np.dot(X, self.W) + self.b
        return self.z
    
    def backward(self, d_z, learning_rate):
        # d_z = ∂L/∂z from the next layer
        n = self.X.shape[0]
        d_W = np.dot(self.X.T, d_z) / n
        d_b = np.sum(d_z, axis=0, keepdims=True) / n
        d_X = np.dot(d_z, self.W.T)
        
        # Update weights
        self.W -= learning_rate * d_W
        self.b -= learning_rate * d_b
        return d_X</code></pre>

        <h3>Activation Functions</h3>
        <pre><code>class ReLU:
    def forward(self, X):
        self.X = X
        return np.maximum(0, X)
    
    def backward(self, d_out):
        return d_out * (self.X > 0)

class Softmax:
    def forward(self, X):
        exp_X = np.exp(X - np.max(X, axis=1, keepdims=True))
        return exp_X / np.sum(exp_X, axis=1, keepdims=True)
    
    def backward(self, d_out, y_true):
        # Combined with cross-entropy loss
        n = self.X.shape[0]
        return (self.forward(self.X) - y_true) / n</code></pre>

        <h3>Training Loop</h3>
        <pre><code># Initialize network
layer1 = DenseLayer(784, 128)
relu = ReLU()
layer2 = DenseLayer(128, 10)
softmax = Softmax()

def forward(X):
    z1 = layer1.forward(X)
    a1 = relu.forward(z1)
    z2 = layer2.forward(a1)
    return softmax.forward(z2)

def backward(y_true, learning_rate):
    # ∂L/∂z2 from cross-entropy + softmax
    d_z2 = softmax.backward(None, y_true)
    d_a1 = layer2.backward(d_z2, learning_rate)
    d_z1 = relu.backward(d_a1)
    layer1.backward(d_z1, learning_rate)

# Training loop (pseudocode)
for epoch in range(num_epochs):
    for X_batch, y_batch in data_loader:
        y_pred = forward(X_batch)
        loss = cross_entropy(y_pred, y_batch)
        backward(y_batch, learning_rate)</code></pre>

        <div class="example-box">
          <p><strong>📌 Assignment:</strong> Build a complete 2‑layer network for MNIST. Achieve &gt; 95% test accuracy. <br>
          <strong>Starter:</strong> Use the code above, add data loading (MNIST from sklearn.datasets), and implement the training loop with mini‑batch GD.</p>
        </div>
      </div>
    </section>

    <!-- ============ 7. Cheat Sheet ============ -->
    <section class="section" id="dl-w2-t7">
      <h2>7. Cheat Sheet – Key Formulas</h2>
      <div class="content-card">
        <table class="term-table gate-table">
          <thead><tr><th>Concept</th><th>Formula</th></tr></thead>
          <tbody>
            <tr><td><strong>Dense layer forward</strong></td><td>z = Wx + b</td></tr>
            <tr><td><strong>Activation</strong></td><td>a = f(z)</td></tr>
            <tr><td><strong>MSE Loss</strong></td><td>L = (1/n) Σ (y − ŷ)²</td></tr>
            <tr><td><strong>Binary Cross‑Entropy</strong></td><td>L = −[ y log(ŷ) + (1−y) log(1−ŷ) ]</td></tr>
            <tr><td><strong>Gradient Descent</strong></td><td>W = W − η · ∂L/∂W</td></tr>
            <tr><td><strong>Momentum update</strong></td><td>v = βv + (1−β)∇L, W = W − η v</td></tr>
            <tr><td><strong>Backprop (chain rule)</strong></td><td>∂L/∂Wᵢ = ∂L/∂a · ∂a/∂z · ∂z/∂Wᵢ</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ============ 8. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w2-t8">
      <h2>📘 Quick Revision – GATE Focus</h2>
      <div class="content-card">
        <ul class="revision-list gate-revision">
          <li><strong>Dense layer:</strong> z = Wx + b, every input connects to every output.</li>
          <li><strong>Forward propagation:</strong> sequentially compute z, a for each layer.</li>
          <li><strong>Loss functions:</strong> MSE (regression), Binary CE (binary classification), Categorical CE (multi‑class).</li>
          <li><strong>Backpropagation:</strong> chain rule to compute gradients; distribute error backward.</li>
          <li><strong>Gradient Descent:</strong> W ← W − η ∇L. SGD uses one sample; mini‑batch uses a subset.</li>
          <li><strong>Momentum:</strong> accelerates convergence using exponential moving average of gradients.</li>
          <li><strong>Vanishing gradient:</strong> common in deep networks with sigmoid/tanh → use ReLU.</li>
          <li><strong>Implementation:</strong> a 2‑layer network with 784 → 128 → 10 is sufficient for MNIST.</li>
        </ul>
        <div class="gate-box">
          <p><strong>🎯 GATE Tip:</strong> Be comfortable with <span class="highlight-text">matrix dimensions</span> – they are frequently tested. Also, understand the difference between batch, mini‑batch, and stochastic GD.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🧠 Deep Learning Bootcamp – Week 2 · Neural Networks From Scratch</p>
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
    { id: 'dl-w2-t1', title: 'Dense (Fully Connected) Layer' },
    { id: 'dl-w2-t2', title: 'Forward Propagation' },
    { id: 'dl-w2-t3', title: 'Loss Functions' },
    { id: 'dl-w2-t4', title: 'Backpropagation' },
    { id: 'dl-w2-t5', title: 'Optimizers (SGD, Momentum)' },
    { id: 'dl-w2-t6', title: 'NN from Scratch (NumPy)' },
    { id: 'dl-w2-t7', title: 'Cheat Sheet – Formulas' },
    { id: 'dl-w2-t8', title: 'Quick Revision (GATE)' },
  ];
  emit('topic-updated', topics);
});
</script>

<style scoped>
/* ---------- base (same as week 1, but keep consistent) ---------- */
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
  background: linear-gradient(145deg, #0a1a2f, #1d3b5c);
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
  border-bottom: 5px solid #2b6a9e;
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

/* dense diagram */
.dense-diagram {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px 30px;
  background: #e9eff5;
  padding: 24px 18px;
  border-radius: 60px;
  margin: 15px 0;
}
.dense-inputs, .dense-outputs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
}
.dense-node {
  background: white;
  padding: 4px 18px;
  border-radius: 30px;
  text-align: center;
}
.dense-weights {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: #1f6390;
}
.weight-matrix {
  background: #0a1a2f;
  color: white;
  padding: 8px 18px;
  border-radius: 30px;
}
.bias-vector {
  background: #2b6a9e;
  color: white;
  padding: 4px 14px;
  border-radius: 30px;
}
.dense-arrow {
  font-size: 1.5rem;
}

/* forward flow */
.forward-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 12px;
  background: #e9eff5;
  padding: 20px 14px;
  border-radius: 60px;
  margin: 15px 0;
}
.fwd-step {
  background: white;
  padding: 10px 20px;
  border-radius: 30px;
  text-align: center;
  min-width: 100px;
}
.fwd-label {
  font-weight: 700;
  display: block;
}
.fwd-desc {
  font-size: 0.85rem;
  color: #2c4c6e;
}
.fwd-arrow {
  font-size: 1.8rem;
  color: #1f6390;
  font-weight: 300;
}
.highlight-fwd {
  background: #1f6390;
  color: white;
}
.highlight-fwd .fwd-desc {
  color: #d4e3f5;
}

/* backprop flow */
.backprop-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 10px;
  background: #e9eff5;
  padding: 20px 14px;
  border-radius: 60px;
  margin: 15px 0;
}
.bp-step {
  background: white;
  padding: 8px 18px;
  border-radius: 30px;
  text-align: center;
}
.bp-label {
  font-weight: 700;
  display: block;
  font-family: 'Courier New', monospace;
}
.bp-desc {
  font-size: 0.8rem;
  color: #2c4c6e;
}
.bp-arrow {
  font-size: 1.8rem;
  color: #1f6390;
  font-weight: 300;
}
.highlight-bp {
  background: #1f6390;
  color: white;
}
.highlight-bp .bp-desc {
  color: #d4e3f5;
}

/* formulas */
.formula-box {
  background: #eef3f8;
  padding: 18px 24px;
  border-radius: 14px;
  margin: 18px 0;
}
.gate-formula {
  border-left: 6px solid #1f6390;
}
.math {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  background: #ffffffc0;
  padding: 6px 14px;
  border-radius: 8px;
  display: inline-block;
}
.highlight-text {
  background: #fce96a;
  padding: 0 6px;
  border-radius: 4px;
  font-weight: 600;
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

/* boxes */
.example-box {
  background: #eef3f8;
  border-left: 6px solid #2b6a9e;
  padding: 16px 22px;
  border-radius: 12px;
  margin: 18px 0;
}
.gate-box {
  background: #e3edf7;
  border-left: 6px solid #1f6390;
  padding: 16px 22px;
  border-radius: 12px;
  margin: 18px 0;
}

/* code */
pre {
  background: #0b1e2f;
  color: #e2edf7;
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
  .dense-diagram { flex-direction: column; border-radius: 40px; }
  .forward-flow { flex-direction: column; border-radius: 40px; }
  .backprop-flow { flex-direction: column; border-radius: 40px; }
  .activation-table, .term-table { font-size: 0.8rem; }
  .content-card { padding: 18px; }
}
</style>