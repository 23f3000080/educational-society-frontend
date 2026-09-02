<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">🚀 Deep Learning – Week 4</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Training Deep Neural Networks · Regularization · Optimization · Evaluation</p>
    </header>

    <!-- ============ 1. Training Fundamentals ============ -->
    <section class="section" id="dl-w4-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">1. Training Fundamentals</h2>
      <div class="content-card">
        <div class="term-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="term-card bg-blue-50 p-5 rounded-xl border-l-4 border-red-500">
            <span class="term-icon text-3xl block">🔄</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Epoch</h3>
            <p class="text-gray-600 text-sm">One complete pass through the <strong>entire training dataset</strong>.</p>
            <code class="term-code bg-gray-800 text-black px-3 py-1 rounded text-sm inline-block mt-2">num_epochs = 10</code>
          </div>
          <div class="term-card bg-blue-50 p-5 rounded-xl border-l-4 border-red-500">
            <span class="term-icon text-3xl block">📦</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Batch</h3>
            <p class="text-gray-600 text-sm">A <strong>subset</strong> of the training data used for one weight update.</p>
            <code class="term-code bg-gray-800 text-white px-3 py-1 rounded text-sm inline-block mt-2">batch_size = 64</code>
          </div>
          <div class="term-card bg-blue-50 p-5 rounded-xl border-l-4 border-red-500">
            <span class="term-icon text-3xl block">⚡</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Iteration</h3>
            <p class="text-gray-600 text-sm">One <strong>weight update</strong> using one batch of data.</p>
            <code class="term-code bg-gray-800 text-white px-3 py-1 rounded text-sm inline-block mt-2">iterations = total / batch</code>
          </div>
          <div class="term-card bg-blue-50 p-5 rounded-xl border-l-4 border-red-500">
            <span class="term-icon text-3xl block">📉</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Learning Rate (η)</h3>
            <p class="text-gray-600 text-sm">Step size for weight updates. Controls <strong>how fast</strong> the model learns.</p>
            <code class="term-code bg-gray-800 text-white px-3 py-1 rounded text-sm inline-block mt-2">lr = 0.001</code>
          </div>
        </div>

        <div class="training-visual bg-gray-100 p-5 rounded-xl mt-4">
          <div class="tv-row flex items-center gap-4 py-2 flex-wrap">
            <span class="tv-label font-bold min-w-[80px] text-gray-800">1 Epoch</span>
            <div class="tv-bar flex gap-2 flex-wrap flex-1">
              <span class="tv-batch bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Batch 1</span>
              <span class="tv-batch bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Batch 2</span>
              <span class="tv-batch bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Batch 3</span>
              <span class="tv-batch bg-blue-600 text-white px-4 py-1 rounded-full text-sm">...</span>
              <span class="tv-batch bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Batch N</span>
            </div>
          </div>
          <div class="tv-row flex items-center gap-4 py-2 flex-wrap">
            <span class="tv-label font-bold min-w-[80px] text-gray-800">1 Iteration</span>
            <div class="tv-bar flex gap-2 flex-wrap flex-1">
              <span class="tv-iter bg-red-500 text-white px-4 py-1 rounded-full text-sm">Update weights once</span>
            </div>
          </div>
        </div>

        <div class="formula-box bg-gray-100 border-l-4 border-blue-800 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">Training Steps:</p>
          <div class="step-flow flex flex-wrap items-center justify-center gap-2 py-3">
            <span class="step-flow-item bg-gray-800 text-white px-5 py-2 rounded-full font-semibold text-sm">Forward Pass</span>
            <span class="step-flow-arrow text-red-500 text-2xl">→</span>
            <span class="step-flow-item bg-gray-800 text-white px-5 py-2 rounded-full font-semibold text-sm">Compute Loss</span>
            <span class="step-flow-arrow text-red-500 text-2xl">→</span>
            <span class="step-flow-item bg-gray-800 text-white px-5 py-2 rounded-full font-semibold text-sm">Backward Pass</span>
            <span class="step-flow-arrow text-red-500 text-2xl">→</span>
            <span class="step-flow-item bg-gray-800 text-white px-5 py-2 rounded-full font-semibold text-sm">Update Weights</span>
            <span class="step-flow-arrow text-red-500 text-2xl">→</span>
            <span class="step-flow-item bg-gray-800 text-white px-5 py-2 rounded-full font-semibold text-sm">Repeat</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 2. Underfitting vs Overfitting ============ -->
    <section class="section" id="dl-w4-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">2. Underfitting vs Overfitting</h2>
      <div class="content-card">
        <div class="fit-comparison grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="fit-card underfit bg-orange-50 border-2 border-orange-500 p-5 rounded-xl text-center">
            <h3 class="text-xl font-bold text-orange-700 mt-0">📉 Underfitting</h3>
            <div class="fit-visual h-24 my-3">
              <svg viewBox="0 0 200 140" class="fit-svg w-full h-full">
                <circle cx="40" cy="100" r="6" fill="#e74c3c"/>
                <circle cx="70" cy="90" r="6" fill="#e74c3c"/>
                <circle cx="100" cy="80" r="6" fill="#e74c3c"/>
                <circle cx="130" cy="70" r="6" fill="#e74c3c"/>
                <circle cx="160" cy="60" r="6" fill="#e74c3c"/>
                <line x1="20" y1="110" x2="180" y2="30" stroke="#3498db" stroke-width="3" stroke-dasharray="5,5"/>
                <text x="10" y="20" font-size="10" fill="#e74c3c">Too simple</text>
              </svg>
            </div>
            <ul class="text-left text-sm space-y-1">
              <li><strong>High Bias</strong> – model is too simple</li>
              <li><strong>Poor performance</strong> on both train & test</li>
              <li><strong>Solution:</strong> Increase model complexity</li>
            </ul>
          </div>
          <div class="fit-card overfit bg-red-50 border-2 border-red-600 p-5 rounded-xl text-center">
            <h3 class="text-xl font-bold text-red-700 mt-0">📈 Overfitting</h3>
            <div class="fit-visual h-24 my-3">
              <svg viewBox="0 0 200 140" class="fit-svg w-full h-full">
                <circle cx="40" cy="100" r="6" fill="#e74c3c"/>
                <circle cx="70" cy="90" r="6" fill="#e74c3c"/>
                <circle cx="100" cy="80" r="6" fill="#e74c3c"/>
                <circle cx="130" cy="70" r="6" fill="#e74c3c"/>
                <circle cx="160" cy="60" r="6" fill="#e74c3c"/>
                <path d="M30,110 Q50,85 70,92 Q90,75 110,82 Q130,65 150,72 Q170,55 185,50" stroke="#2ecc71" stroke-width="3" fill="none"/>
                <text x="10" y="20" font-size="10" fill="#2ecc71">Too complex</text>
              </svg>
            </div>
            <ul class="text-left text-sm space-y-1">
              <li><strong>High Variance</strong> – model memorizes noise</li>
              <li><strong>Great on train, poor on test</strong></li>
              <li><strong>Solution:</strong> Regularization, more data</li>
            </ul>
          </div>
          <div class="fit-card goodfit bg-green-50 border-2 border-green-600 p-5 rounded-xl text-center">
            <h3 class="text-xl font-bold text-green-700 mt-0">✅ Good Fit</h3>
            <div class="fit-visual h-24 my-3">
              <svg viewBox="0 0 200 140" class="fit-svg w-full h-full">
                <circle cx="40" cy="100" r="6" fill="#e74c3c"/>
                <circle cx="70" cy="90" r="6" fill="#e74c3c"/>
                <circle cx="100" cy="80" r="6" fill="#e74c3c"/>
                <circle cx="130" cy="70" r="6" fill="#e74c3c"/>
                <circle cx="160" cy="60" r="6" fill="#e74c3c"/>
                <path d="M30,105 Q60,95 80,88 Q110,78 140,68 Q165,58 185,50" stroke="#f39c12" stroke-width="3" fill="none"/>
                <text x="10" y="20" font-size="10" fill="#f39c12">Balanced</text>
              </svg>
            </div>
            <ul class="text-left text-sm space-y-1">
              <li><strong>Low Bias + Low Variance</strong></li>
              <li><strong>Generalizes well</strong> to unseen data</li>
              <li><strong>Goal:</strong> Achieve this balance</li>
            </ul>
          </div>
        </div>

        <div class="gate-box bg-blue-50 border-l-4 border-blue-800 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 Bias-Variance Tradeoff:</strong> Simple models have <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">high bias</span> (underfit). Complex models have <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">high variance</span> (overfit). The goal is the <strong>sweet spot</strong> in between.</p>
        </div>
      </div>
    </section>

    <!-- ============ 3. Regularization ============ -->
    <section class="section" id="dl-w4-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">3. Regularization – Fighting Overfitting</h2>
      <div class="content-card">
        <div class="reg-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="reg-card bg-blue-50 p-5 rounded-xl border-l-4 border-blue-800">
            <h3 class="text-lg font-bold text-gray-800 mt-0">L1 Regularization (Lasso)</h3>
            <p class="math bg-white px-3 py-1 rounded inline-block font-mono text-sm">L = L<sub>original</sub> + λ · Σ|w|</p>
            <ul class="text-sm mt-2 space-y-1">
              <li>Adds <strong>absolute value</strong> of weights to loss</li>
              <li>Encourages <strong>sparse weights</strong> (feature selection)</li>
              <li><code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">weight_decay = 0.0</code></li>
            </ul>
          </div>
          <div class="reg-card bg-blue-50 p-5 rounded-xl border-l-4 border-blue-800">
            <h3 class="text-lg font-bold text-gray-800 mt-0">L2 Regularization (Ridge / Weight Decay)</h3>
            <p class="math bg-white px-3 py-1 rounded inline-block font-mono text-sm">L = L<sub>original</sub> + λ · Σw²</p>
            <ul class="text-sm mt-2 space-y-1">
              <li>Adds <strong>squared</strong> weights to loss</li>
              <li>Encourages <strong>small weights</strong> (smoother model)</li>
              <li><code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">weight_decay = 0.01</code></li>
            </ul>
          </div>
        </div>

        <div class="reg-grid grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <div class="reg-card bg-blue-50 p-5 rounded-xl border-l-4 border-blue-800">
            <h3 class="text-lg font-bold text-gray-800 mt-0">Dropout</h3>
            <p class="text-sm"><strong>Randomly</strong> drops neurons during training (by probability <code class="bg-gray-200 px-1 rounded">p</code>).</p>
            <ul class="text-sm mt-2 space-y-1">
              <li>Forces network to learn <strong>redundant representations</strong></li>
              <li>Prevents co-adaptation of neurons</li>
              <li><code class="term-code bg-gray-800 text-white px-2 py-0.5 rounded text-xs">nn.Dropout(0.5)</code></li>
            </ul>
          </div>
          <div class="reg-card bg-blue-50 p-5 rounded-xl border-l-4 border-blue-800">
            <h3 class="text-lg font-bold text-gray-800 mt-0">Early Stopping</h3>
            <p class="text-sm">Stop training when <strong>validation loss stops improving</strong>.</p>
            <ul class="text-sm mt-2 space-y-1">
              <li>Monitor validation loss after each epoch</li>
              <li>Stop if no improvement for <code class="bg-gray-200 px-1 rounded">patience</code> epochs</li>
              <li>Restore <strong>best model</strong> weights</li>
            </ul>
          </div>
        </div>

        <div class="example-box bg-gray-100 border-l-4 border-red-500 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">🔧 PyTorch Implementation:</p>
          <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed mt-2 border border-gray-700"><code># L2 Regularization (weight decay)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=0.01)

# Dropout
class MyModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.dropout = nn.Dropout(0.5)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)  # Randomly zero out 50% of neurons
        return self.fc2(x)

# Early Stopping
best_val_loss = float('inf')
patience = 5
patience_counter = 0

for epoch in range(num_epochs):
    val_loss = validate(model, val_loader)
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        patience_counter = 0
        torch.save(model.state_dict(), 'best_model.pt')
    else:
        patience_counter += 1
        if patience_counter >= patience:
            print("Early stopping!")
            break</code></pre>
        </div>
      </div>
    </section>

    <!-- ============ 4. Optimizers ============ -->
    <section class="section" id="dl-w4-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">4. Optimizers – Beyond Gradient Descent</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="optimizer-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="p-3 text-left border border-gray-300">Optimizer</th>
                <th class="p-3 text-left border border-gray-300">Update Rule</th>
                <th class="p-3 text-left border border-gray-300">Pros</th>
                <th class="p-3 text-left border border-gray-300">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">SGD</td>
                <td class="p-3 font-mono text-xs">w ← w − η · ∇L</td>
                <td class="p-3">Simple, memory efficient</td>
                <td class="p-3">Slow, oscillates</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">SGD + Momentum</td>
                <td class="p-3 font-mono text-xs">v = βv + (1−β)∇L<br>w ← w − η · v</td>
                <td class="p-3">Accelerates, smooths oscillations</td>
                <td class="p-3">Still manual lr tuning</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">RMSProp</td>
                <td class="p-3">Adaptive learning rate per parameter</td>
                <td class="p-3">Good for non-stationary objectives</td>
                <td class="p-3">Can accumulate small gradients</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold text-blue-700">Adam</td>
                <td class="p-3">Combines Momentum + RMSProp</td>
                <td class="p-3"><strong>Most popular</strong>, robust, fast</td>
                <td class="p-3">More memory, can fail on some tasks</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Learning Rate Scheduling</h3>
        <div class="lr-schedulers grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="lr-card bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 class="font-bold text-gray-800 mt-0">Step Decay</h4>
            <pre class="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mt-2"><code>scheduler = torch.optim.lr_scheduler.StepLR(
    optimizer, step_size=10, gamma=0.1
)
# lr = lr * 0.1 every 10 epochs</code></pre>
          </div>
          <div class="lr-card bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 class="font-bold text-gray-800 mt-0">Exponential Decay</h4>
            <pre class="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mt-2"><code>scheduler = torch.optim.lr_scheduler.ExponentialLR(
    optimizer, gamma=0.95
)
# lr = lr * 0.95 every epoch</code></pre>
          </div>
          <div class="lr-card bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 class="font-bold text-gray-800 mt-0">Reduce on Plateau</h4>
            <pre class="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mt-2"><code>scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='min', factor=0.1, patience=5
)
# Reduce lr when validation loss plateaus</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 5. Model Evaluation Metrics ============ -->
    <section class="section" id="dl-w4-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">5. Model Evaluation Metrics</h2>
      <div class="content-card">
        <div class="confusion-matrix flex justify-center my-4">
          <div class="cm-grid grid grid-cols-3 gap-0.5 bg-gray-300 border-2 border-gray-300 rounded-lg overflow-hidden">
            <div class="cm-empty bg-gray-100 p-3"></div>
            <div class="cm-header bg-blue-900 text-white p-3 text-center font-bold text-sm">Predicted Positive</div>
            <div class="cm-header bg-blue-900 text-white p-3 text-center font-bold text-sm">Predicted Negative</div>
            <div class="cm-header bg-blue-900 text-white p-3 text-center font-bold text-sm">Actual Positive</div>
            <div class="cm-cell tp bg-green-200 p-4 text-center font-bold text-lg">TP<br><span class="cm-small font-normal text-xs">True Positive</span></div>
            <div class="cm-cell fn bg-orange-200 p-4 text-center font-bold text-lg">FN<br><span class="cm-small font-normal text-xs">False Negative</span></div>
            <div class="cm-header bg-blue-900 text-white p-3 text-center font-bold text-sm">Actual Negative</div>
            <div class="cm-cell fp bg-red-200 p-4 text-center font-bold text-lg">FP<br><span class="cm-small font-normal text-xs">False Positive</span></div>
            <div class="cm-cell tn bg-blue-200 p-4 text-center font-bold text-lg">TN<br><span class="cm-small font-normal text-xs">True Negative</span></div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="metrics-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="p-3 text-left border border-gray-300">Metric</th>
                <th class="p-3 text-left border border-gray-300">Formula</th>
                <th class="p-3 text-left border border-gray-300">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Accuracy</td>
                <td class="p-3 font-mono text-xs">(TP + TN) / (TP + TN + FP + FN)</td>
                <td class="p-3">Overall correctness – <strong>not</strong> good for imbalanced data</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Precision</td>
                <td class="p-3 font-mono text-xs">TP / (TP + FP)</td>
                <td class="p-3">Of predicted positives, how many were correct?</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Recall</td>
                <td class="p-3 font-mono text-xs">TP / (TP + FN)</td>
                <td class="p-3">Of actual positives, how many did we catch?</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">F1-Score</td>
                <td class="p-3 font-mono text-xs">2 · (Precision · Recall) / (Precision + Recall)</td>
                <td class="p-3">Harmonic mean of precision and recall</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="example-box bg-gray-100 border-l-4 border-red-500 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">📊 PyTorch Implementation:</p>
          <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed mt-2 border border-gray-700"><code>from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# After training
model.eval()
all_preds = []
all_labels = []

with torch.no_grad():
    for data, target in test_loader:
        output = model(data)
        pred = output.argmax(dim=1)
        all_preds.extend(pred.cpu().numpy())
        all_labels.extend(target.cpu().numpy())

# Calculate metrics
accuracy = accuracy_score(all_labels, all_preds)
precision = precision_score(all_labels, all_preds, average='weighted')
recall = recall_score(all_labels, all_preds, average='weighted')
f1 = f1_score(all_labels, all_preds, average='weighted')
conf_matrix = confusion_matrix(all_labels, all_preds)

print(f"Accuracy: {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1-Score: {f1:.4f}")
print(f"Confusion Matrix:\n{conf_matrix}")</code></pre>
        </div>
      </div>
    </section>

    <!-- ============ 6. Customer Churn Prediction ============ -->
    <section class="section" id="dl-w4-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">6. Customer Churn Prediction – Mini Project</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="project-info bg-blue-50 p-4 rounded-xl">
            <span class="project-badge bg-red-500 text-white px-3 py-0.5 rounded-full text-xs font-bold inline-block">🎯 Goal</span>
            <p class="mt-1">Predict which customers are likely to <strong>churn</strong> (stop using the service).</p>
          </div>
          <div class="project-info bg-blue-50 p-4 rounded-xl">
            <span class="project-badge bg-red-500 text-white px-3 py-0.5 rounded-full text-xs font-bold inline-block">📊 Data</span>
            <p class="mt-1">Tabular dataset with features like: tenure, monthly charges, contract type, payment method, etc.</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Complete Training Pipeline</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# 1. Load & Preprocess Data
def load_data(filepath):
    df = pd.read_csv(filepath)
    # Handle missing values
    df = df.dropna()
    # Encode categorical features (one-hot)
    df = pd.get_dummies(df, drop_first=True)
    # Separate features and target
    X = df.drop('Churn', axis=1).values
    y = df['Churn'].values
    return X, y

# 2. Create Dataset
def create_dataloaders(X, y, batch_size=32, test_size=0.2, val_size=0.1):
    # Split: train, validation, test
    X_temp, X_test, y_temp, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42, stratify=y
    )
    X_train, X_val, y_train, y_val = train_test_split(
        X_temp, y_temp, test_size=val_size/(1-test_size), 
        random_state=42, stratify=y_temp
    )
    
    # Standardize features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_val = scaler.transform(X_val)
    X_test = scaler.transform(X_test)
    
    # Convert to tensors
    train_dataset = TensorDataset(
        torch.FloatTensor(X_train), torch.FloatTensor(y_train)
    )
    val_dataset = TensorDataset(
        torch.FloatTensor(X_val), torch.FloatTensor(y_val)
    )
    test_dataset = TensorDataset(
        torch.FloatTensor(X_test), torch.FloatTensor(y_test)
    )
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    
    return train_loader, val_loader, test_loader, scaler

# 3. Define Neural Network
class ChurnNN(nn.Module):
    def __init__(self, input_size, hidden_sizes=[128, 64], dropout_rate=0.3):
        super(ChurnNN, self).__init__()
        layers = []
        prev_size = input_size
        
        for hidden_size in hidden_sizes:
            layers.append(nn.Linear(prev_size, hidden_size))
            layers.append(nn.BatchNorm1d(hidden_size))
            layers.append(nn.ReLU())
            layers.append(nn.Dropout(dropout_rate))
            prev_size = hidden_size
        
        layers.append(nn.Linear(prev_size, 1))
        layers.append(nn.Sigmoid())
        
        self.network = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.network(x)

# 4. Training Loop
def train_model(model, train_loader, val_loader, num_epochs=50, lr=0.001, 
                weight_decay=0.01, patience=7):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr, weight_decay=weight_decay)
    criterion = nn.BCELoss()
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=3
    )
    
    best_val_loss = float('inf')
    patience_counter = 0
    history = {'train_loss': [], 'val_loss': [], 'train_acc': [], 'val_acc': []}
    
    for epoch in range(num_epochs):
        # Training
        model.train()
        train_loss = 0
        train_correct = 0
        train_total = 0
        
        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)
            y_batch = y_batch.view(-1, 1)
            
            optimizer.zero_grad()
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            preds = (outputs >= 0.5).float()
            train_correct += (preds == y_batch).sum().item()
            train_total += y_batch.size(0)
        
        # Validation
        model.eval()
        val_loss = 0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for X_batch, y_batch in val_loader:
                X_batch, y_batch = X_batch.to(device), y_batch.to(device)
                y_batch = y_batch.view(-1, 1)
                outputs = model(X_batch)
                loss = criterion(outputs, y_batch)
                
                val_loss += loss.item()
                preds = (outputs >= 0.5).float()
                val_correct += (preds == y_batch).sum().item()
                val_total += y_batch.size(0)
        
        # Record metrics
        train_acc = train_correct / train_total
        val_acc = val_correct / val_total
        avg_train_loss = train_loss / len(train_loader)
        avg_val_loss = val_loss / len(val_loader)
        
        history['train_loss'].append(avg_train_loss)
        history['val_loss'].append(avg_val_loss)
        history['train_acc'].append(train_acc)
        history['val_acc'].append(val_acc)
        
        scheduler.step(avg_val_loss)
        
        print(f"Epoch {epoch+1}/{num_epochs} | "
              f"Train Loss: {avg_train_loss:.4f}, Train Acc: {train_acc:.4f} | "
              f"Val Loss: {avg_val_loss:.4f}, Val Acc: {val_acc:.4f}")
        
        # Early Stopping
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            patience_counter = 0
            torch.save(model.state_dict(), 'best_model.pt')
        else:
            patience_counter += 1
            if patience_counter >= patience:
                print(f"Early stopping at epoch {epoch+1}")
                break
    
    # Load best model
    model.load_state_dict(torch.load('best_model.pt'))
    return model, history

# 5. Evaluate on Test Set
def evaluate_model(model, test_loader):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)
    model.eval()
    
    all_preds = []
    all_labels = []
    
    with torch.no_grad():
        for X_batch, y_batch in test_loader:
            X_batch = X_batch.to(device)
            outputs = model(X_batch)
            preds = (outputs >= 0.5).float().cpu().numpy().flatten()
            all_preds.extend(preds)
            all_labels.extend(y_batch.numpy())
    
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
    
    print("\n" + "="*50)
    print("TEST SET PERFORMANCE")
    print("="*50)
    print(f"Accuracy:  {accuracy_score(all_labels, all_preds):.4f}")
    print(f"Precision: {precision_score(all_labels, all_preds):.4f}")
    print(f"Recall:    {recall_score(all_labels, all_preds):.4f}")
    print(f"F1-Score:  {f1_score(all_labels, all_preds):.4f}")
    print("\nConfusion Matrix:")
    print(confusion_matrix(all_labels, all_preds))
    
    return all_preds, all_labels

# 6. Main Execution
def main():
    # Load data
    X, y = load_data('customer_data.csv')
    
    # Create dataloaders
    train_loader, val_loader, test_loader, scaler = create_dataloaders(
        X, y, batch_size=32
    )
    
    # Initialize model
    input_size = X.shape[1]
    model = ChurnNN(input_size, hidden_sizes=[128, 64, 32], dropout_rate=0.3)
    
    # Train
    model, history = train_model(
        model, train_loader, val_loader,
        num_epochs=50, lr=0.001, weight_decay=0.01, patience=7
    )
    
    # Evaluate
    evaluate_model(model, test_loader)
    
    return model, history

if __name__ == "__main__":
    model, history = main()</code></pre>

        <div class="assignment-box bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mt-4">
          <h3 class="text-lg font-bold text-gray-800 mt-0">📝 Mini Project – Experiments</h3>
          <p class="font-semibold text-gray-700">Modify the following and observe the impact:</p>
          <ul class="list-disc list-inside text-sm space-y-1 mt-2">
            <li><strong>Batch size:</strong> Try [16, 32, 64, 128] – affects training speed & stability</li>
            <li><strong>Learning rate:</strong> Try [0.1, 0.01, 0.001, 0.0001] – too high diverges, too low is slow</li>
            <li><strong>Hidden layers:</strong> Try [64], [128, 64], [256, 128, 64] – model capacity</li>
            <li><strong>Dropout rate:</strong> Try [0.0, 0.2, 0.5, 0.7] – higher reduces overfitting but may underfit</li>
            <li><strong>Weight decay:</strong> Try [0.0, 0.001, 0.01, 0.1] – L2 regularization strength</li>
            <li><strong>Optimizer:</strong> Try Adam, SGD+Momentum, RMSProp</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 7. Cheat Sheet ============ -->
    <section class="section" id="dl-w4-t7">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">7. Cheat Sheet – Key Concepts</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Epoch</td><td class="p-3">1 full pass through all training data</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Batch</td><td class="p-3">Subset of data for 1 weight update</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Underfitting</td><td class="p-3">Model too simple → high bias</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Overfitting</td><td class="p-3">Model too complex → high variance</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">L1 Regularization</td><td class="p-3">Σ|w| → sparse weights</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">L2 Regularization</td><td class="p-3">Σw² → small weights</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Dropout</td><td class="p-3">Randomly drop neurons during training</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Early Stopping</td><td class="p-3">Stop when validation loss plateaus</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Accuracy</td><td class="p-3">(TP+TN) / Total</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Precision</td><td class="p-3">TP / (TP+FP) – quality of positive predictions</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">Recall</td><td class="p-3">TP / (TP+FN) – coverage of positive samples</td></tr>
              <tr class="border border-gray-300 even:bg-gray-50"><td class="p-3 font-bold">F1-Score</td><td class="p-3">Harmonic mean of precision & recall</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 8. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w4-t8">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-2">📘 Quick Revision – Training Deep Networks</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>Training loop:</strong> Forward → Loss → Backward → Update → Repeat</li>
          <li class="pb-3 border-b border-gray-200"><strong>Underfitting:</strong> High bias, poor train & test performance. <strong>Solution:</strong> Increase complexity</li>
          <li class="pb-3 border-b border-gray-200"><strong>Overfitting:</strong> High variance, great train, poor test. <strong>Solutions:</strong> Regularization, more data</li>
          <li class="pb-3 border-b border-gray-200"><strong>Regularization:</strong> L1 (sparse), L2 (small weights), Dropout (drop neurons), Early Stopping</li>
          <li class="pb-3 border-b border-gray-200"><strong>Optimizers:</strong> SGD (simple), Adam (adaptive, most popular), RMSProp, Momentum</li>
          <li class="pb-3 border-b border-gray-200"><strong>Learning rate:</strong> Critical hyperparameter – use schedulers to adapt</li>
          <li class="pb-3 border-b border-gray-200"><strong>Evaluation:</strong> Accuracy (overall), Precision (quality), Recall (coverage), F1 (balance)</li>
          <li class="pb-0"><strong>Confusion matrix:</strong> TP, TN, FP, FN – foundation for all classification metrics</li>
        </ul>
        <div class="gate-box bg-blue-50 border-l-4 border-blue-800 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 GATE Focus:</strong> Understanding the <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">bias-variance tradeoff</span> and how regularization techniques help balance it is essential. Know the formulas for precision, recall, and F1-score.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">🚀 Deep Learning Bootcamp – Week 4 · Training Deep Neural Networks</p>
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
    { id: 'dl-w4-t1', title: 'Training Fundamentals' },
    { id: 'dl-w4-t2', title: 'Underfitting vs Overfitting' },
    { id: 'dl-w4-t3', title: 'Regularization' },
    { id: 'dl-w4-t4', title: 'Optimizers' },
    { id: 'dl-w4-t5', title: 'Model Evaluation Metrics' },
    { id: 'dl-w4-t6', title: 'Customer Churn Prediction' },
    { id: 'dl-w4-t7', title: 'Cheat Sheet' },
    { id: 'dl-w4-t8', title: 'Quick Revision' },
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #0f3460);
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

/* Code block overrides for visibility */
pre code {
  background: transparent !important;
  color: #e2edf7 !important;
}

pre {
  background: #0b1e2f !important;
  color: #e2edf7 !important;
}

/* Ensure text in code blocks is visible */
pre code .hljs-comment,
pre code .hljs-quote {
  color: #7f9bb3 !important;
}

pre code .hljs-keyword,
pre code .hljs-selector-tag,
pre code .hljs-built_in {
  color: #ff7b72 !important;
}

pre code .hljs-string,
pre code .hljs-attribute,
pre code .hljs-symbol,
pre code .hljs-bullet,
pre code .hljs-addition {
  color: #a5d6ff !important;
}

pre code .hljs-number,
pre code .hljs-literal {
  color: #79c0ff !important;
}

pre code .hljs-function,
pre code .hljs-title {
  color: #d2a8ff !important;
}

code {
    background: #cfd0d0 !important;
    color: #030303 !important;
}

/* Responsive */
@media (max-width: 720px) {
  .cheatsheet-header h1 {
    font-size: 2rem !important;
  }
  .content-card {
    padding: 18px;
  }
  .term-grid {
    grid-template-columns: 1fr !important;
  }
  .fit-comparison {
    grid-template-columns: 1fr !important;
  }
  .reg-grid {
    grid-template-columns: 1fr !important;
  }
  .lr-schedulers {
    grid-template-columns: 1fr !important;
  }
  .project-overview {
    grid-template-columns: 1fr !important;
  }
  .cm-grid {
    grid-template-columns: 70px 70px 70px !important;
  }
  .step-flow {
    flex-direction: column;
  }
  .step-flow-arrow {
    transform: rotate(90deg);
  }
  .tv-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .optimizer-table,
  .metrics-table,
  .term-table {
    font-size: 0.75rem;
  }
  .optimizer-table th,
  .optimizer-table td,
  .metrics-table th,
  .metrics-table td,
  .term-table th,
  .term-table td {
    padding: 6px 8px;
  }
}
</style>