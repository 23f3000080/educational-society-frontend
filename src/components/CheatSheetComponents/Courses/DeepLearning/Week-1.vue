<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>🧠 Deep Learning – Week 1</h1>
      <p class="subtitle">Complete mathematical &amp; conceptual foundation for AI, ML &amp; Neural Networks</p>
    </header>

    <!-- ============ 1. AI, ML, DL – hierarchical & definitions ============ -->
    <section class="section" id="dl-w1-t1">
      <h2>1. AI → ML → Deep Learning</h2>
      <div class="content-card">
        <div class="hierarchy-big">
          <div class="hierarchy-item">🧠 Artificial Intelligence <span class="subtext">(making machines intelligent)</span></div>
          <div class="hierarchy-arrow">⬇</div>
          <div class="hierarchy-item">📊 Machine Learning <span class="subtext">(learn patterns from data)</span></div>
          <div class="hierarchy-arrow">⬇</div>
          <div class="hierarchy-item highlight">⚡ Deep Learning <span class="subtext">(multi‑layer neural networks)</span></div>
        </div>

        <div class="gate-def-grid">
          <div class="def-card">
            <h3>AI</h3>
            <p><strong>Definition:</strong> Systems that perform tasks requiring human intelligence.</p>
            <p><strong>Examples:</strong> reasoning, perception, NLP, robotics.</p>
          </div>
          <div class="def-card">
            <h3>ML</h3>
            <p><strong>Definition:</strong> Algorithms that improve automatically through experience (data).</p>
            <p><strong>Types:</strong> Supervised, Unsupervised, Reinforcement.</p>
          </div>
          <div class="def-card highlight-card">
            <h3>DL</h3>
            <p><strong>Definition:</strong> ML using neural networks with many hidden layers.</p>
            <p><strong>Key idea:</strong> automatic feature extraction from raw data.</p>
          </div>
        </div>

        <div class="example-box gate-box">
          <p><strong>📘 GATE‑style analogy:</strong> AI is the universe, ML is a galaxy, DL is a solar system inside it. <br>
          <span class="highlight-text">DL excels when data is huge (images, text, audio).</span></p>
        </div>

        <h3>Why DL became popular</h3>
        <ul class="reason-list">
          <li>✅ <strong>Big Data</strong> – massive datasets available</li>
          <li>✅ <strong>Compute</strong> – GPUs/TPUs enable fast training</li>
          <li>✅ <strong>Algorithmic advances</strong> – better architectures (CNN, RNN, Transformers)</li>
          <li>✅ <strong>Automated feature engineering</strong> – no manual feature extraction</li>
        </ul>
      </div>
    </section>

    <!-- ============ 2. Artificial Neuron – mathematical formulation ============ -->
    <section class="section" id="dl-w1-t2">
      <h2>2. Artificial Neuron (Mathematical Model)</h2>
      <div class="content-card">
        <div class="neuron-big">
          <div class="neuron-inputs">
            <div class="input-line">x₁ → <span class="weight">w₁</span></div>
            <div class="input-line">x₂ → <span class="weight">w₂</span></div>
            <div class="input-line">x₃ → <span class="weight">w₃</span></div>
            <div class="input-line bias">bias → <span class="weight">b</span></div>
          </div>
          <div class="neuron-body">
            <span class="summation">Σ wᵢ xᵢ + b</span>
            <span class="arrow">→</span>
            <span class="activation">f( · )</span>
          </div>
          <div class="neuron-output">y = f(z)</div>
        </div>

        <div class="formula-box gate-formula">
          <p><strong>Weighted sum (pre‑activation):</strong></p>
          <p class="math">z = w₁x₁ + w₂x₂ + … + wₙxₙ + b = <strong>w<sup>T</sup>x + b</strong></p>
          <p><strong>Activation (post‑activation):</strong></p>
          <p class="math">a = f(z) &nbsp; &nbsp; where f is non‑linear (ReLU, sigmoid, tanh, etc.)</p>
          <p><span class="highlight-text">🟡 GATE focus:</span> understand dimensions, matrix notation, and the role of bias as a trainable parameter.</p>
        </div>

        <div class="example-box">
          <p><strong>🧪 Numerical example (student pass/fail):</strong></p>
          <ul>
            <li>x = [5, 80, 70] &nbsp; (study hours, attendance %, prev. marks)</li>
            <li>w = [0.5, 0.3, 0.6] , b = 1</li>
            <li>z = 0.5·5 + 0.3·80 + 0.6·70 + 1 = 2.5 + 24 + 42 + 1 = <strong>69.5</strong></li>
            <li>After sigmoid: σ(69.5) ≈ 1.0 → <strong>Pass</strong> (threshold 0.5)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 3. Activation Functions – detailed ============ -->
    <section class="section" id="dl-w1-t3">
      <h2>3. Activation Functions (Non‑linearity)</h2>
      <div class="content-card">
        <p>Without activation, the network is just a linear transformation – <strong>cannot learn complex patterns</strong>.</p>

        <table class="activation-table gate-table">
          <thead>
            <tr><th>Function</th><th>Formula</th><th>Range</th><th>Derivative</th><th>Use case</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sigmoid</strong></td>
              <td>σ(x) = 1 / (1 + e<sup>−x</sup>)</td>
              <td>(0, 1)</td>
              <td>σ(x)(1 − σ(x))</td>
              <td>Binary classification (output)</td>
            </tr>
            <tr>
              <td><strong>Tanh</strong></td>
              <td>tanh(x) = (e<sup>x</sup> − e<sup>−x</sup>) / (e<sup>x</sup> + e<sup>−x</sup>)</td>
              <td>(−1, 1)</td>
              <td>1 − tanh²(x)</td>
              <td>Hidden layers (zero‑centered)</td>
            </tr>
            <tr>
              <td><strong>ReLU</strong></td>
              <td>max(0, x)</td>
              <td>[0, ∞)</td>
              <td>1 if x &gt; 0 else 0</td>
              <td><strong>Most common</strong> in hidden layers</td>
            </tr>
            <tr>
              <td><strong>Leaky ReLU</strong></td>
              <td>max(αx, x), α small</td>
              <td>(−∞, ∞)</td>
              <td>α if x &lt; 0 else 1</td>
              <td>Avoids dying ReLU</td>
            </tr>
            <tr>
              <td><strong>Softmax</strong></td>
              <td>e<sup>xᵢ</sup> / Σⱼ e<sup>xⱼ</sup></td>
              <td>(0,1), sum=1</td>
              <td>—</td>
              <td>Multi‑class output (probability)</td>
            </tr>
          </tbody>
        </table>

        <div class="gate-box">
          <p><strong>🎯 GATE‑level insight:</strong> ReLU is preferred because it is <span class="highlight-text">computationally efficient</span> and helps mitigate the <strong>vanishing gradient</strong> problem (unlike sigmoid/tanh in deep networks).</p>
        </div>
      </div>
    </section>

    <!-- ============ 4. Learning: Forward, Loss, Backprop, Gradient Descent ============ -->
    <section class="section" id="dl-w1-t4">
      <h2>4. How a Neural Network Learns</h2>
      <div class="content-card">
        <div class="learning-pipeline">
          <div class="pipeline-step">
            <span class="step-num">1</span>
            <span class="step-label">Forward propagation</span>
            <span class="step-desc">input → weighted sum → activation → prediction</span>
          </div>
          <div class="pipeline-arrow">⬇</div>
          <div class="pipeline-step">
            <span class="step-num">2</span>
            <span class="step-label">Loss (cost) calculation</span>
            <span class="step-desc">measure error: e.g., MSE, Cross‑Entropy</span>
          </div>
          <div class="pipeline-arrow">⬇</div>
          <div class="pipeline-step">
            <span class="step-num">3</span>
            <span class="step-label">Backpropagation</span>
            <span class="step-desc">compute gradients ∂L/∂w using chain rule</span>
          </div>
          <div class="pipeline-arrow">⬇</div>
          <div class="pipeline-step">
            <span class="step-num">4</span>
            <span class="step-label">Gradient Descent</span>
            <span class="step-desc">update weights: w ← w − η · ∇L</span>
          </div>
          <div class="pipeline-arrow">⬇</div>
          <div class="pipeline-step highlight-step">
            <span class="step-num">⟳</span>
            <span class="step-label">Repeat until convergence</span>
            <span class="step-desc">(epochs / iterations)</span>
          </div>
        </div>

        <div class="formula-box gate-formula">
          <p><strong>Loss functions (GATE important):</strong></p>
          <ul>
            <li><strong>MSE (regression):</strong> L = (1/n) Σ (ŷ − y)²</li>
            <li><strong>Binary Cross‑Entropy (classification):</strong> L = − [ y log(ŷ) + (1−y) log(1−ŷ) ]</li>
            <li><strong>Categorical Cross‑Entropy (multi‑class):</strong> L = − Σ yᵢ log(ŷᵢ)</li>
          </ul>
          <p><strong>Gradient descent update (vector form):</strong></p>
          <p class="math">w<sub>new</sub> = w<sub>old</sub> − η · ∇<sub>w</sub> L</p>
          <p>where η = <strong>learning rate</strong> (hyperparameter).</p>
        </div>

        <div class="gate-box">
          <p><strong>⚙️ GATE perspective:</strong> Backpropagation is essentially the <span class="highlight-text">chain rule of calculus</span> applied to compute partial derivatives of the loss w.r.t. each weight. Gradient descent is a <strong>first‑order optimization</strong> algorithm.</p>
        </div>
      </div>
    </section>

    <!-- ============ 5. Build neuron – Python code ============ -->
    <section class="section" id="dl-w1-t5">
      <h2>5. Build Your First Neuron (Python)</h2>
      <div class="content-card">
        <p><strong>Problem:</strong> Predict Pass/Fail based on study hours, attendance, previous marks.</p>
        <pre><code>import numpy as np

# Data: [study_hours, attendance%, prev_marks]
X = np.array([
    [2, 60, 45],
    [4, 70, 50],
    [6, 80, 65],
    [8, 90, 80],
    [1, 50, 35],
    [7, 85, 75]
])
y = np.array([0, 0, 1, 1, 0, 1])   # 0 = Fail, 1 = Pass

# Weights & bias (initialized randomly)
w = np.array([0.5, 0.2, 0.3])
b = 1.0

# Weighted sum
z = np.dot(X, w) + b

# Sigmoid activation
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

predictions = sigmoid(z)
print("Probabilities:", predictions)

# Threshold → class
pred_class = (predictions >= 0.5).astype(int)
print("Predicted class:", pred_class)

# ---- Compare with true labels ----
accuracy = np.mean(pred_class == y)
print(f"Accuracy: {accuracy*100:.1f}%")</code></pre>
        <div class="example-box">
          <p><strong>🔬 Experiment:</strong> Change weights, bias, or threshold (e.g., 0.7) and observe the effect on predictions and accuracy.</p>
        </div>
        <div class="gate-box">
          <p><strong>🧮 GATE note:</strong> This is a <strong>single‑layer perceptron</strong> with sigmoid activation – the foundation of logistic regression and neural networks.</p>
        </div>
      </div>
    </section>

    <!-- ============ 6. Complete Cheat Sheet ============ -->
    <section class="section" id="dl-w1-t6">
      <h2>6. Cheat Sheet – Key Terms &amp; Concepts</h2>
      <div class="content-card">
        <table class="term-table gate-table">
          <thead><tr><th>Term</th><th>Mathematical / Conceptual meaning</th></tr></thead>
          <tbody>
            <tr><td><strong>Input (x)</strong></td><td>Feature vector (e.g., pixel values, tabular data)</td></tr>
            <tr><td><strong>Weight (w)</strong></td><td>Parameter that scales input; learned during training</td></tr>
            <tr><td><strong>Bias (b)</strong></td><td>Offset / intercept term; allows shifting the activation</td></tr>
            <tr><td><strong>Weighted sum (z)</strong></td><td>z = w<sup>T</sup>x + b</td></tr>
            <tr><td><strong>Activation (a)</strong></td><td>a = f(z); introduces non‑linearity</td></tr>
            <tr><td><strong>Loss (L)</strong></td><td>Measures prediction error; e.g., MSE, Cross‑Entropy</td></tr>
            <tr><td><strong>Gradient (∇L)</strong></td><td>Vector of partial derivatives; points in direction of steepest increase</td></tr>
            <tr><td><strong>Learning rate (η)</strong></td><td>Step size for weight update; critical hyperparameter</td></tr>
            <tr><td><strong>Epoch</strong></td><td>One complete pass through the entire training dataset</td></tr>
            <tr><td><strong>Batch</strong></td><td>Subset of samples used for one weight update (stochastic GD)</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ============ 7. GATE‑style Quick Revision ============ -->
    <section class="section revision-section" id="dl-w1-t7">
      <h2>📘 Quick Revision – GATE Focus</h2>
      <div class="content-card">
        <ul class="revision-list gate-revision">
          <li><strong>AI ⊃ ML ⊃ DL</strong> – DL is a subset of ML that uses deep architectures.</li>
          <li><strong>Neuron:</strong> z = Σ wᵢxᵢ + b &nbsp;→&nbsp; a = f(z).</li>
          <li><strong>Common activations:</strong> Sigmoid (binary), Tanh (zero‑centered), ReLU (hidden), Softmax (multi‑class).</li>
          <li><strong>Why ReLU?</strong> avoids vanishing gradient, computationally cheap.</li>
          <li><strong>Learning loop:</strong> Forward → Loss → Backprop (chain rule) → Gradient Descent → Update.</li>
          <li><strong>Gradient Descent:</strong> w ← w − η ∇L(w).</li>
          <li><strong>Loss functions:</strong> MSE for regression, Cross‑Entropy for classification.</li>
          <li><strong>Vanishing gradient:</strong> gradients become very small in deep networks (sigmoid/tanh). ReLU helps.</li>
          <li><strong>Every advanced model</strong> (CNN, RNN, Transformer) is built on this foundation.</li>
        </ul>
        <div class="gate-box">
          <p><strong>🎯 GATE Tip:</strong> Be thorough with derivatives of activation functions and the chain rule – they are frequently tested in numerical problems.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🧠 Deep Learning Bootcamp – Week 1 · GATE‑oriented foundation</p>
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
    { id: 'dl-w1-t1', title: 'AI → ML → Deep Learning' },
    { id: 'dl-w1-t2', title: 'Artificial Neuron (Math)' },
    { id: 'dl-w1-t3', title: 'Activation Functions' },
    { id: 'dl-w1-t4', title: 'How a Neural Network Learns' },
    { id: 'dl-w1-t5', title: 'Build Your First Neuron' },
    { id: 'dl-w1-t6', title: 'Cheat Sheet – Key Terms' },
    { id: 'dl-w1-t7', title: 'Quick Revision (GATE)' },
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
  transition: box-shadow 0.2s;
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

/* hierarchy */
.hierarchy-big {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 18px;
  background: #e9eff5;
  padding: 22px 16px;
  border-radius: 80px;
  margin: 10px 0 22px 0;
}
.hierarchy-item {
  background: #d4dfe9;
  padding: 10px 28px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  color: #0a1a2f;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hierarchy-item.highlight {
  background: #1f6390;
  color: white;
}
.hierarchy-item .subtext {
  font-weight: 400;
  font-size: 0.75rem;
  opacity: 0.8;
}
.hierarchy-arrow {
  font-size: 2rem;
  color: #2b6a9e;
  font-weight: 300;
}

/* def grid */
.gate-def-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
  margin: 20px 0;
}
.def-card {
  background: #f2f6fb;
  padding: 18px 20px;
  border-radius: 14px;
  border-left: 6px solid #7f9bb3;
}
.def-card h3 {
  margin: 0 0 6px 0;
  color: #0a1a2f;
}
.def-card.highlight-card {
  border-left-color: #1f6390;
  background: #e3edf7;
}

/* neuron */
.neuron-big {
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
.neuron-inputs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 500;
}
.input-line {
  background: white;
  padding: 4px 18px;
  border-radius: 30px;
}
.weight {
  background: #1f6390;
  color: white;
  padding: 0 10px;
  border-radius: 20px;
  font-weight: 600;
}
.bias {
  border: 2px dashed #1f6390;
  background: #f0f6fd;
}
.neuron-body {
  background: #0a1a2f;
  color: white;
  padding: 16px 32px;
  border-radius: 60px;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 16px;
}
.activation {
  background: #2b6a9e;
  padding: 4px 18px;
  border-radius: 40px;
}
.neuron-output {
  background: #1f6390;
  color: white;
  padding: 12px 32px;
  border-radius: 60px;
  font-weight: 700;
  font-size: 1.2rem;
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
  background: #dce6ef;
  font-weight: 700;
  color: #0a1a2f;
}
.activation-table tr:nth-child(even),
.term-table tr:nth-child(even) {
  background: #f8fafc;
}
.gate-table th {
  background: #1a3a5f;
  color: white;
}

/* learning pipeline */
.learning-pipeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 0;
}
.pipeline-step {
  background: #e9eff5;
  padding: 12px 30px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
}
.step-num {
  background: #0a1a2f;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.step-label {
  font-weight: 700;
  color: #0a1a2f;
}
.step-desc {
  color: #2c4c6e;
  font-size: 0.9rem;
}
.highlight-step {
  background: #d1e3f5;
  border: 2px solid #1f6390;
}
.pipeline-arrow {
  font-size: 1.8rem;
  color: #1f6390;
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

.reason-list {
  list-style: none;
  padding: 0;
}
.reason-list li {
  padding: 6px 0;
  border-bottom: 1px solid #e2eaf2;
}

/* code */
pre {
  background: #0b1e2f;
  color: #e2edf7;
  padding: 20px;
  border-radius: 14px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.95rem;
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
  .hierarchy-big { flex-direction: column; border-radius: 40px; }
  .neuron-big { flex-direction: column; border-radius: 40px; }
  .gate-def-grid { grid-template-columns: 1fr; }
  .pipeline-step { flex-direction: column; text-align: center; gap: 8px; }
  .activation-table, .term-table { font-size: 0.85rem; }
  .content-card { padding: 18px; }
}
</style>