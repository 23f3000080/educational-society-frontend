<template>
  <div class="crucks-container">
    <header class="crucks-header">
      <h1 class="text-4xl md:text-5xl font-bold">🧠 Deep Learning – Complete Crucks</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Everything you need to revise – from AI fundamentals to deployment</p>
      <div class="badge-grid mt-3">
        <span class="badge bg-blue-600">12 Weeks</span>
        <span class="badge bg-purple-600">10+ Topics</span>
        <span class="badge bg-green-600">PyTorch</span>
        <span class="badge bg-rose-600">NLP</span>
        <span class="badge bg-amber-600">CV</span>
        <span class="badge bg-teal-600">Transformers</span>
      </div>
    </header>

    <!-- ==================== QUICK NAVIGATION ==================== -->
    <nav class="quick-nav bg-gray-100 p-3 rounded-xl mb-6 sticky top-0 z-10 shadow-md">
      <div class="flex flex-wrap justify-center gap-2">
        <a href="#week1" class="nav-pill bg-blue-600 text-white">W1</a>
        <a href="#week2" class="nav-pill bg-indigo-600 text-white">W2</a>
        <a href="#week3" class="nav-pill bg-purple-600 text-white">W3</a>
        <a href="#week4" class="nav-pill bg-pink-600 text-white">W4</a>
        <a href="#week5" class="nav-pill bg-amber-600 text-white">W5</a>
        <a href="#week6" class="nav-pill bg-orange-600 text-white">W6</a>
        <a href="#week7" class="nav-pill bg-rose-600 text-white">W7</a>
        <a href="#week8" class="nav-pill bg-teal-600 text-white">W8</a>
        <a href="#week9" class="nav-pill bg-cyan-600 text-white">W9</a>
        <a href="#week10" class="nav-pill bg-indigo-800 text-white">W10</a>
        <a href="#week11" class="nav-pill bg-emerald-600 text-white">W11</a>
        <a href="#week12" class="nav-pill bg-rose-800 text-white">W12</a>
        <a href="#formulas" class="nav-pill bg-gray-800 text-white">📐</a>
      </div>
    </nav>

    <!-- ==================== WEEK 1 ==================== -->
    <section class="week-section" id="week1">
      <div class="week-header bg-blue-600">
        <span class="week-number">W1</span>
        <h2 class="week-title">AI → ML → DL · Neuron Basics</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-blue-700">AI → ML → DL</h3>
            <p class="text-xs">AI ⊃ ML ⊃ DL<br><span class="font-mono text-blue-600">AI → ML → Deep Learning</span></p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-blue-700">Neuron Formula</h3>
            <p class="text-xs font-mono">z = Σ wᵢxᵢ + b</p>
            <p class="text-xs font-mono">a = f(z)</p>
            <p class="text-xs text-gray-500">w = weight, b = bias, f = activation</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-blue-700">Activations</h3>
            <p class="text-xs font-mono">Sigmoid: 1/(1+e⁻ˣ) → [0,1]</p>
            <p class="text-xs font-mono">ReLU: max(0,x) → [0,∞)</p>
            <p class="text-xs font-mono">Tanh: (eˣ−e⁻ˣ)/(eˣ+e⁻ˣ) → [-1,1]</p>
            <p class="text-xs font-mono">Softmax: eˣᵢ/Σeˣʲ → probabilities</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 2 ==================== -->
    <section class="week-section" id="week2">
      <div class="week-header bg-indigo-600">
        <span class="week-number">W2</span>
        <h2 class="week-title">NN From Scratch · Backprop</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-indigo-700">Dense Layer</h3>
            <p class="text-xs font-mono">z = Wx + b</p>
            <p class="text-xs font-mono">a = f(z)</p>
            <p class="text-xs text-gray-500">W: (m×n), x: (n×1), b: (m×1)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-indigo-700">Loss Functions</h3>
            <p class="text-xs font-mono">MSE: (1/n)Σ(y−ŷ)²</p>
            <p class="text-xs font-mono">BCE: −[y log(ŷ)+(1−y)log(1−ŷ)]</p>
            <p class="text-xs font-mono">CCE: −Σ yᵢ log(ŷᵢ)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-indigo-700">Backprop</h3>
            <p class="text-xs">Chain Rule: ∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w</p>
            <p class="text-xs font-mono">W ← W − η·∂L/∂W</p>
            <p class="text-xs text-gray-500">η = learning rate</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 3 ==================== -->
    <section class="week-section" id="week3">
      <div class="week-header bg-purple-600">
        <span class="week-number">W3</span>
        <h2 class="week-title">PyTorch · Tensors · DataLoader</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-purple-700">Tensor Ops</h3>
            <p class="text-xs font-mono">torch.tensor([1,2,3])</p>
            <p class="text-xs font-mono">t.reshape(3,4) or t.view(3,4)</p>
            <p class="text-xs font-mono">A @ B = torch.matmul(A,B)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-purple-700">Autograd</h3>
            <p class="text-xs font-mono">x.requires_grad = True</p>
            <p class="text-xs font-mono">loss.backward() → x.grad</p>
            <p class="text-xs font-mono">with torch.no_grad(): # inference</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-purple-700">DataLoader</h3>
            <p class="text-xs font-mono">DataLoader(ds, batch=32, shuffle=True)</p>
            <p class="text-xs font-mono">Image shape: (N, C, H, W)</p>
            <p class="text-xs text-gray-500">N=batch, C=channels, H=height, W=width</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 4 ==================== -->
    <section class="week-section" id="week4">
      <div class="week-header bg-pink-600">
        <span class="week-number">W4</span>
        <h2 class="week-title">Training · Regularization · Optimizers</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-pink-700">Training Loop</h3>
            <p class="text-xs">Forward → Loss → Backward → Update → Repeat</p>
            <p class="text-xs font-mono">epoch = 1 pass through data</p>
            <p class="text-xs font-mono">batch = subset for 1 update</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-pink-700">Regularization</h3>
            <p class="text-xs font-mono">L1: L = L₀ + λ·Σ|w| (sparse)</p>
            <p class="text-xs font-mono">L2: L = L₀ + λ·Σw² (small weights)</p>
            <p class="text-xs font-mono">Dropout: nn.Dropout(p)</p>
            <p class="text-xs font-mono">Early Stopping: patience</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-pink-700">Optimizers</h3>
            <p class="text-xs font-mono">SGD: w ← w − η·∇L</p>
            <p class="text-xs font-mono">Adam: adaptive + momentum</p>
            <p class="text-xs font-mono">RMSProp: adaptive LR</p>
            <p class="text-xs text-gray-500">Adam = most popular</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 5 ==================== -->
    <section class="week-section" id="week5">
      <div class="week-header bg-amber-600">
        <span class="week-number">W5</span>
        <h2 class="week-title">CNN · Convolution · Pooling</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-amber-700">Convolution</h3>
            <p class="text-xs">Filter/kernel slides, multiply + sum</p>
            <p class="text-xs font-mono">Output = (I − K + 2P)/S + 1</p>
            <p class="text-xs text-gray-500">I=input, K=kernel, P=padding, S=stride</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-amber-700">CNN Architecture</h3>
            <p class="text-xs">Image → Conv → ReLU → Pool → Conv → Pool → Flatten → FC → Softmax</p>
            <p class="text-xs font-mono">nn.Conv2d(3,32,3,padding=1)</p>
            <p class="text-xs font-mono">nn.MaxPool2d(2,2)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-amber-700">MLP vs CNN</h3>
            <p class="text-xs">MLP: flattens, loses structure</p>
            <p class="text-xs">CNN: preserves structure, parameter sharing</p>
            <p class="text-xs text-green-600">CNN = much better for images!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 6 ==================== -->
    <section class="week-section" id="week6">
      <div class="week-header bg-orange-600">
        <span class="week-number">W6</span>
        <h2 class="week-title">Advanced CNN · Transfer Learning</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-orange-700">CNN Evolution</h3>
            <p class="text-xs">LeNet → AlexNet → VGG → Inception → ResNet → MobileNet</p>
            <p class="text-xs">ResNet: y = F(x) + x (skip connection)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-orange-700">Residual Connection</h3>
            <p class="text-xs font-mono">y = F(x) + x</p>
            <p class="text-xs">Solves vanishing gradient</p>
            <p class="text-xs">Enables 100+ layer networks</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-orange-700">Transfer Learning</h3>
            <p class="text-xs font-mono">models.resnet18(pretrained=True)</p>
            <p class="text-xs">Feature Extraction: freeze all</p>
            <p class="text-xs">Fine-Tuning: unfreeze, small LR</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 7 ==================== -->
    <section class="week-section" id="week7">
      <div class="week-header bg-rose-600">
        <span class="week-number">W7</span>
        <h2 class="week-title">Augmentation · Imbalance · Explainability</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-rose-700">Data Augmentation</h3>
            <p class="text-xs">Rotation, Flip, Crop, Color Jitter</p>
            <p class="text-xs font-mono">transforms.RandomRotation(30)</p>
            <p class="text-xs font-mono">transforms.RandomHorizontalFlip()</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-rose-700">Imbalanced Data</h3>
            <p class="text-xs font-mono">Class Weights: weight=[1.0,3.0]</p>
            <p class="text-xs font-mono">Focal Loss: FL = −(1−pt)^γ·log(pt)</p>
            <p class="text-xs">Oversampling: duplicate minority</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-rose-700">Explainability</h3>
            <p class="text-xs font-mono">Grad-CAM: heatmap of important regions</p>
            <p class="text-xs font-mono">Saliency: ∂output/∂input</p>
            <p class="text-xs">Feature Visualization: what filters learn</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 8 ==================== -->
    <section class="week-section" id="week8">
      <div class="week-header bg-teal-600">
        <span class="week-number">W8</span>
        <h2 class="week-title">RNN · LSTM · GRU · Sequences</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-teal-700">RNN</h3>
            <p class="text-xs font-mono">hₜ = tanh(W·xₜ + U·hₜ₋₁)</p>
            <p class="text-xs text-red-600">⚠️ Vanishing/Exploding gradients</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-teal-700">LSTM</h3>
            <p class="text-xs">Cell State (C) = long-term memory</p>
            <p class="text-xs font-mono">3 Gates: Forget, Input, Output</p>
            <p class="text-xs font-mono">nn.LSTM(input_size, hidden_size)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-teal-700">GRU</h3>
            <p class="text-xs font-mono">2 Gates: Reset, Update</p>
            <p class="text-xs">Faster, fewer params than LSTM</p>
            <p class="text-xs font-mono">nn.GRU(input_size, hidden_size)</p>
            <p class="text-xs text-gray-500">Use LSTM for long sequences</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 9 ==================== -->
    <section class="week-section" id="week9">
      <div class="week-header bg-cyan-600">
        <span class="week-number">W9</span>
        <h2 class="week-title">NLP · Tokenization · Embeddings</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-cyan-700">NLP Pipeline</h3>
            <p class="text-xs">Text → Tokenization → Vocab → Embedding → NN → Prediction</p>
            <p class="text-xs font-mono">tokenizer = get_tokenizer('basic_english')</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-cyan-700">Embeddings</h3>
            <p class="text-xs font-mono">nn.Embedding(vocab_size, dim)</p>
            <p class="text-xs">Word2Vec, GloVe, FastText</p>
            <p class="text-xs">Pre-trained → better performance</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-cyan-700">LSTM for Text</h3>
            <p class="text-xs font-mono">bidirectional=True</p>
            <p class="text-xs">Process forward + backward</p>
            <p class="text-xs">Better context understanding</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 10 ==================== -->
    <section class="week-section" id="week10">
      <div class="week-header bg-indigo-800">
        <span class="week-number">W10</span>
        <h2 class="week-title">Attention · Transformers · BERT · GPT</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-indigo-700">Attention</h3>
            <p class="text-xs font-mono">Attn(Q,K,V) = softmax(QKᵀ/√d)·V</p>
            <p class="text-xs">Q=Query, K=Key, V=Value</p>
            <p class="text-xs">Self-Attention: Q,K,V from same input</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-indigo-700">Transformer</h3>
            <p class="text-xs">Encoder: Self-Attention → FFN</p>
            <p class="text-xs">Decoder: Masked Self-Attention → Cross-Attention</p>
            <p class="text-xs">Positional Encoding, Residuals, LayerNorm</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-indigo-700">BERT vs GPT</h3>
            <p class="text-xs font-mono">BERT: Encoder, Bidirectional</p>
            <p class="text-xs">→ Understanding (MLM, NSP)</p>
            <p class="text-xs font-mono">GPT: Decoder, Autoregressive</p>
            <p class="text-xs">→ Generation (Causal LM)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 11 ==================== -->
    <section class="week-section" id="week11">
      <div class="week-header bg-emerald-600">
        <span class="week-number">W11</span>
        <h2 class="week-title">Hugging Face · Deployment · Optimization</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-emerald-700">Hugging Face</h3>
            <p class="text-xs font-mono">AutoTokenizer.from_pretrained()</p>
            <p class="text-xs font-mono">AutoModelForSequenceClassification</p>
            <p class="text-xs">Model Hub: 1000s of pre-trained models</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-emerald-700">Optimization</h3>
            <p class="text-xs font-mono">Quantization: FP32 → INT8 (4x smaller)</p>
            <p class="text-xs font-mono">Pruning: remove unimportant weights</p>
            <p class="text-xs font-mono">Batch inference: process multiple at once</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-emerald-700">Deployment</h3>
            <p class="text-xs">Model → FastAPI → REST → Frontend</p>
            <p class="text-xs font-mono">@app.post("/predict")</p>
            <p class="text-xs font-mono">Docker: docker build -t my-api .</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WEEK 12 ==================== -->
    <section class="week-section" id="week12">
      <div class="week-header bg-rose-800">
        <span class="week-number">W12</span>
        <h2 class="week-title">Capstone · End-to-End AI Product</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-rose-700">Project Options</h3>
            <p class="text-xs">1. Medical Image Classifier</p>
            <p class="text-xs">2. ECG Classification</p>
            <p class="text-xs">3. NLP Customer Support</p>
            <p class="text-xs">4. Plant Disease Detection</p>
            <p class="text-xs">5. Real-Time Object Detection</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-rose-700">Architecture</h3>
            <p class="text-xs">User → Web UI → API → ML Model → Database → Dashboard</p>
            <p class="text-xs font-mono">FastAPI + PyTorch + Docker</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-rose-700">Deliverables</h3>
            <p class="text-xs">✅ Trained Model</p>
            <p class="text-xs">✅ REST API</p>
            <p class="text-xs">✅ Web Dashboard</p>
            <p class="text-xs">✅ Docker Container</p>
            <p class="text-xs">✅ Documentation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== FORMULAS ==================== -->
    <section class="week-section" id="formulas">
      <div class="week-header bg-gray-800">
        <span class="week-number">📐</span>
        <h2 class="week-title">Key Formulas &amp; Architecture</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">Neuron</h3>
            <p class="text-xs font-mono">z = Σwx + b</p>
            <p class="text-xs font-mono">a = f(z)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">Conv Output</h3>
            <p class="text-xs font-mono">(I − K + 2P)/S + 1</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">Gradient Descent</h3>
            <p class="text-xs font-mono">w ← w − η·∂L/∂w</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">Attention</h3>
            <p class="text-xs font-mono">softmax(QKᵀ/√d)·V</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">LSTM</h3>
            <p class="text-xs font-mono">fₜ = σ(W·[hₜ₋₁,xₜ]+b)</p>
            <p class="text-xs font-mono">iₜ = σ(W·[hₜ₋₁,xₜ]+b)</p>
            <p class="text-xs font-mono">oₜ = σ(W·[hₜ₋₁,xₜ]+b)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">ResNet</h3>
            <p class="text-xs font-mono">y = F(x) + x</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">Focal Loss</h3>
            <p class="text-xs font-mono">FL = −(1−pt)^γ·log(pt)</p>
          </div>
          <div class="crux-card">
            <h3 class="text-sm font-bold text-gray-700">CNN Pipeline</h3>
            <p class="text-xs">Conv → ReLU → Pool</p>
            <p class="text-xs">→ Conv → ReLU → Pool</p>
            <p class="text-xs">→ Flatten → FC → Softmax</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== QUICK GLOSSARY ==================== -->
    <section class="glossary-section">
      <div class="week-header bg-gradient-to-r from-gray-700 to-gray-900">
        <span class="week-number">📖</span>
        <h2 class="week-title">Quick Glossary</h2>
      </div>
      <div class="week-content">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div class="gloss-item"><span class="font-bold">Epoch</span> = 1 pass through data</div>
          <div class="gloss-item"><span class="font-bold">Batch</span> = subset for 1 update</div>
          <div class="gloss-item"><span class="font-bold">LR</span> = learning rate</div>
          <div class="gloss-item"><span class="font-bold">Grad</span> = gradient</div>
          <div class="gloss-item"><span class="font-bold">FC</span> = Fully Connected</div>
          <div class="gloss-item"><span class="font-bold">Conv</span> = Convolution</div>
          <div class="gloss-item"><span class="font-bold">Pool</span> = Pooling</div>
          <div class="gloss-item"><span class="font-bold">RNN</span> = Recurrent NN</div>
          <div class="gloss-item"><span class="font-bold">LSTM</span> = Long Short-Term Memory</div>
          <div class="gloss-item"><span class="font-bold">GRU</span> = Gated Recurrent Unit</div>
          <div class="gloss-item"><span class="font-bold">CNN</span> = Convolutional NN</div>
          <div class="gloss-item"><span class="font-bold">NLP</span> = Natural Language Processing</div>
          <div class="gloss-item"><span class="font-bold">BERT</span> = Bidirectional Encoder</div>
          <div class="gloss-item"><span class="font-bold">GPT</span> = Generative Pre-trained</div>
          <div class="gloss-item"><span class="font-bold">Grad-CAM</span> = Visualization</div>
          <div class="gloss-item"><span class="font-bold">API</span> = Application Interface</div>
        </div>
      </div>
    </section>

    <footer class="crucks-footer">
      <p>🧠 Deep Learning Bootcamp – Complete Crucks</p>
      <p class="text-xs text-gray-400">One page to rule them all. Print it, pin it, revise it!</p>
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
    { id: 'week1', title: 'AI → ML → DL · Neuron Basics' },
    { id: 'week2', title: 'NN From Scratch · Backprop' },
    { id: 'week3', title: 'PyTorch · Tensors · DataLoader' },
    { id: 'week4', title: 'Training · Regularization · Optimizers' },
    { id: 'week5', title: 'CNN · Convolution · Pooling' },
    { id: 'week6', title: 'Advanced CNN · Transfer Learning' },
    { id: 'week7', title: 'Augmentation · Imbalance · Explainability' },
    { id: 'week8', title: 'RNN · LSTM · GRU · Sequences' },
    { id: 'week9', title: 'NLP · Tokenization · Embeddings' },
    { id: 'week10', title: 'Attention · Transformers · BERT · GPT' },
    { id: 'week11', title: 'Hugging Face · Deployment · Optimization' },
    { id: 'week12', title: 'Capstone · End-to-End AI Product' },
    { id: 'formulas', title: 'Key Formulas' },
  ];
  emit('topic-updated', topics);
});
</script>

<style scoped>
.crucks-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px;
  font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
  background: #f8fafc;
  color: #0b1e33;
}

.crucks-header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(145deg, #1a1a2e, #16213e, #0f3460);
  color: white;
  border-radius: 18px;
  margin-bottom: 20px;
}

.badge-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.badge {
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.quick-nav {
  background: #f1f5f9 !important;
  border-radius: 12px;
  padding: 10px !important;
  margin-bottom: 16px !important;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.nav-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s;
}

.nav-pill:hover {
  transform: scale(1.05);
}

.week-section {
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.week-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: white;
}

.week-number {
  background: rgba(255,255,255,0.2);
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.8rem;
}

.week-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.week-content {
  padding: 12px;
  background: white;
}

.crux-card {
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: 8px;
  border-left: 3px solid;
  border-left-color: #e2e8f0;
}

.crux-card h3 {
  margin: 0 0 4px 0;
}

.crux-card p {
  margin: 2px 0;
  line-height: 1.4;
}

/* Color overrides for cards */
.week-section:nth-child(2) .crux-card { border-left-color: #3b82f6; }
.week-section:nth-child(3) .crux-card { border-left-color: #6366f1; }
.week-section:nth-child(4) .crux-card { border-left-color: #8b5cf6; }
.week-section:nth-child(5) .crux-card { border-left-color: #ec4899; }
.week-section:nth-child(6) .crux-card { border-left-color: #f59e0b; }
.week-section:nth-child(7) .crux-card { border-left-color: #f97316; }
.week-section:nth-child(8) .crux-card { border-left-color: #f43f5e; }
.week-section:nth-child(9) .crux-card { border-left-color: #14b8a6; }
.week-section:nth-child(10) .crux-card { border-left-color: #06b6d4; }
.week-section:nth-child(11) .crux-card { border-left-color: #4f46e5; }
.week-section:nth-child(12) .crux-card { border-left-color: #10b981; }
.week-section:nth-child(13) .crux-card { border-left-color: #be123c; }
.week-section:nth-child(14) .crux-card { border-left-color: #4b5563; }

.glossary-section {
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.gloss-item {
  background: #f8fafc;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.crucks-footer {
  text-align: center;
  padding: 20px;
  color: #64748b;
  border-top: 2px solid #e2e8f0;
  margin-top: 12px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .crucks-header h1 {
    font-size: 2rem !important;
  }
  .week-title {
    font-size: 0.85rem;
  }
  .grid {
    grid-template-columns: 1fr !important;
  }
  .gloss-item {
    font-size: 0.7rem;
  }
  .quick-nav {
    overflow-x: auto;
    white-space: nowrap;
  }
  .quick-nav .flex {
    flex-wrap: nowrap;
  }
}
</style>