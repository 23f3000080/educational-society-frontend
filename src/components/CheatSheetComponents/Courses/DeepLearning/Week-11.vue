<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">🚀 Deep Learning – Week 11</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Modern DL · Hugging Face · Fine-Tuning · Experiment Tracking · Deployment</p>
    </header>

    <!-- ============ 1. Hugging Face Ecosystem ============ -->
    <section class="section" id="dl-w11-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">1. Hugging Face Ecosystem</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-600">
            <span class="text-3xl block">🤗</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Model Hub</h3>
            <p class="text-sm text-gray-600">Thousands of <strong>pre-trained models</strong> for NLP, Vision, Audio, and more.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">huggingface.co/models</code>
          </div>
          <div class="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-600">
            <span class="text-3xl block">📝</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Tokenizers</h3>
            <p class="text-sm text-gray-600">Fast and efficient <strong>tokenization</strong> for all transformer models.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">from transformers import AutoTokenizer</code>
          </div>
          <div class="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-600">
            <span class="text-3xl block">🔧</span>
            <h3 class="text-lg font-bold text-gray-800 mt-1">Transformers Library</h3>
            <p class="text-sm text-gray-600">Unified API for <strong>loading, training, and using</strong> transformer models.</p>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">from transformers import AutoModel</code>
          </div>
        </div>

        <div class="gate-box bg-cyan-50 border-l-4 border-cyan-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Key Insight:</strong> Hugging Face provides a <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">unified interface</span> to thousands of pre-trained models. You can load, fine-tune, and deploy models with <strong>minimal code</strong>.</p>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Loading Models from Hugging Face</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>from transformers import AutoTokenizer, AutoModel, AutoModelForSequenceClassification, pipeline

# ============================================================
# 1. LOADING TOKENIZER & MODEL
# ============================================================

# Load tokenizer and model for a specific task
model_name = "distilbert-base-uncased-finetuned-sst-2-english"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# ============================================================
# 2. USING THE PIPELINE API
# ============================================================

# Simplest way to use a pre-trained model
classifier = pipeline("sentiment-analysis", model=model_name)

result = classifier("I love this product!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.999}]

# ============================================================
# 3. CUSTOM INFERENCE
# ============================================================

def predict(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    predictions = outputs.logits.softmax(dim=1)
    return predictions

# ============================================================
# 4. EXPLORING THE MODEL HUB
# ============================================================

# List available models for a specific task
# Search: huggingface.co/models
# Filter by: task, framework, library, etc.

# Popular models:
# - bert-base-uncased
# - distilbert-base-uncased
# - roberta-base
# - gpt2
# - t5-small
# - google/vit-base-patch16-224</code></pre>
      </div>
    </section>

    <!-- ============ 2. Fine-Tuning Pretrained Models ============ -->
    <section class="section" id="dl-w11-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">2. Fine-Tuning Pretrained Models</h2>
      <div class="content-card">
        <div class="fine-tuning-flow bg-gray-100 p-6 rounded-xl">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div class="text-center">
              <div class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Pretrained Model</div>
              <span class="text-xs text-gray-500 block">BERT/GPT/ResNet</span>
            </div>
            <span class="text-2xl text-cyan-600">⬇</span>
            <div class="text-center">
              <div class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Custom Dataset</div>
              <span class="text-xs text-gray-500 block">Your data</span>
            </div>
            <span class="text-2xl text-cyan-600">⬇</span>
            <div class="text-center">
              <div class="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Fine-Tuning</div>
              <span class="text-xs text-gray-500 block">Adjust weights</span>
            </div>
            <span class="text-2xl text-cyan-600">⬇</span>
            <div class="text-center">
              <div class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Custom Model</div>
              <span class="text-xs text-gray-500 block">Task-specific</span>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Complete Fine-Tuning Pipeline</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments,
    DataCollatorWithPadding
)
from datasets import Dataset
import torch
import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# ============================================================
# 1. PREPARE DATASET
# ============================================================

def load_custom_dataset():
    """Load your custom dataset."""
    # Example: sentiment data
    texts = [
        "I love this product! It's amazing.",
        "This is terrible, I hate it.",
        "The quality is excellent.",
        "Worst purchase ever.",
        # ... more samples
    ]
    labels = [1, 0, 1, 0]  # 1 = positive, 0 = negative
    
    # Convert to Hugging Face Dataset format
    dataset = Dataset.from_dict({
        'text': texts,
        'label': labels
    })
    
    return dataset

# ============================================================
# 2. TOKENIZE DATASET
# ============================================================

def tokenize_function(examples, tokenizer, max_length=128):
    return tokenizer(
        examples['text'],
        truncation=True,
        padding='max_length',
        max_length=max_length
    )

# ============================================================
# 3. DEFINE METRICS
# ============================================================

def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    predictions = np.argmax(predictions, axis=1)
    precision, recall, f1, _ = precision_recall_fscore_support(
        labels, predictions, average='binary'
    )
    acc = accuracy_score(labels, predictions)
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

# ============================================================
# 4. FINE-TUNE WITH TRAINER
# ============================================================

def fine_tune_model(train_dataset, val_dataset, model_name="distilbert-base-uncased"):
    """Fine-tune a pre-trained model."""
    
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(
        model_name,
        num_labels=2
    )
    
    # Tokenize datasets
    tokenized_train = train_dataset.map(
        lambda x: tokenize_function(x, tokenizer),
        batched=True
    )
    tokenized_val = val_dataset.map(
        lambda x: tokenize_function(x, tokenizer),
        batched=True
    )
    
    # Data collator
    data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
    
    # Training arguments
    training_args = TrainingArguments(
        output_dir='./results',
        num_train_epochs=3,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=64,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
        logging_steps=10,
        evaluation_strategy='epoch',
        save_strategy='epoch',
        load_best_model_at_end=True,
        metric_for_best_model='accuracy',
        report_to='none'  # Disable wandb/tensorboard for now
    )
    
    # Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_train,
        eval_dataset=tokenized_val,
        tokenizer=tokenizer,
        data_collator=data_collator,
        compute_metrics=compute_metrics
    )
    
    # Train
    trainer.train()
    
    # Save model
    trainer.save_model('./fine_tuned_model')
    tokenizer.save_pretrained('./fine_tuned_model')
    
    return trainer, model, tokenizer

# ============================================================
# 5. MAIN EXECUTION
# ============================================================

if __name__ == "__main__":
    # Load dataset
    dataset = load_custom_dataset()
    
    # Split dataset
    dataset = dataset.train_test_split(test_size=0.2, seed=42)
    
    # Fine-tune
    trainer, model, tokenizer = fine_tune_model(
        dataset['train'],
        dataset['test']
    )
    
    print("✅ Model fine-tuned and saved to './fine_tuned_model'")</code></pre>
      </div>
    </section>

    <!-- ============ 3. Experiment Tracking ============ -->
    <section class="section" id="dl-w11-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">3. Experiment Tracking</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Why Track Experiments?</h3>
            <ul class="text-sm space-y-2">
              <li class="flex items-start gap-2"><span class="text-green-500">📊</span> <span>Track <strong>hyperparameters</strong> and <strong>metrics</strong></span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">📈</span> <span>Visualize <strong>training curves</strong></span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">🔍</span> <span><strong>Compare</strong> different runs</span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">💾</span> <span>Save <strong>model checkpoints</strong></span></li>
              <li class="flex items-start gap-2"><span class="text-green-500">🔁</span> <span><strong>Reproducibility</strong> – track everything</span></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Popular Tools</h3>
            <div class="space-y-3">
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm text-blue-700">TensorBoard</h4>
                <p class="text-xs text-gray-600">Built into PyTorch – visualizes <strong>scalars, histograms, graphs</strong>.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">tensorboard --logdir=./logs</code>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-sm text-purple-700">Weights &amp; Biases</h4>
                <p class="text-xs text-gray-600">Cloud-based – <strong>collaborative</strong> experiment tracking.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">wandb.init(project="my-project")</code>
              </div>
              <div class="bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-sm text-green-700">MLflow</h4>
                <p class="text-xs text-gray-600">Open-source – <strong>full lifecycle</strong> management.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">mlflow.set_tracking_uri()</code>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">TensorBoard Integration</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
from torch.utils.tensorboard import SummaryWriter
import wandb

# ============================================================
# 1. TENSORBOARD
# ============================================================

class ExperimentTracker:
    """Simple experiment tracking with TensorBoard."""
    
    def __init__(self, log_dir='./runs/experiment_1'):
        self.writer = SummaryWriter(log_dir=log_dir)
        self.step = 0
    
    def log_scalar(self, name, value, step=None):
        if step is None:
            step = self.step
        self.writer.add_scalar(name, value, step)
    
    def log_histogram(self, name, values, step=None):
        if step is None:
            step = self.step
        self.writer.add_histogram(name, values, step)
    
    def log_figure(self, name, figure, step=None):
        if step is None:
            step = self.step
        self.writer.add_figure(name, figure, step)
    
    def log_model_graph(self, model, input_tensor):
        self.writer.add_graph(model, input_tensor)
    
    def step_forward(self):
        self.step += 1
    
    def close(self):
        self.writer.close()

# ============================================================
# 2. WEIGHTS & BIASES
# ============================================================

def init_wandb():
    """Initialize Weights & Biases."""
    try:
        wandb.init(
            project="deep-learning-bootcamp",
            config={
                "learning_rate": 2e-5,
                "batch_size": 16,
                "num_epochs": 3,
                "model": "distilbert-base-uncased"
            }
        )
        return wandb
    except:
        print("⚠️ WandB not installed or not logged in.")
        return None

# ============================================================
# 3. TRAINING WITH TRACKING
# ============================================================

def train_with_tracking(model, train_loader, val_loader, config):
    """Training loop with experiment tracking."""
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    
    # Initialize trackers
    tracker = ExperimentTracker(log_dir='./runs/experiment_1')
    wandb = init_wandb()
    
    # Training setup
    optimizer = torch.optim.Adam(model.parameters(), lr=config['lr'])
    criterion = torch.nn.CrossEntropyLoss()
    
    best_val_acc = 0
    
    for epoch in range(config['num_epochs']):
        # Training
        model.train()
        train_loss = 0
        train_correct = 0
        train_total = 0
        
        for batch_idx, (X_batch, y_batch) in enumerate(train_loader):
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)
            
            optimizer.zero_grad()
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            _, predicted = outputs.max(1)
            train_total += y_batch.size(0)
            train_correct += predicted.eq(y_batch).sum().item()
            
            # Log every 10 batches
            if batch_idx % 10 == 0:
                tracker.log_scalar('train/loss', loss.item())
                tracker.log_scalar('train/lr', optimizer.param_groups[0]['lr'])
                
                if wandb:
                    wandb.log({
                        'train/loss': loss.item(),
                        'train/lr': optimizer.param_groups[0]['lr']
                    })
        
        train_acc = 100. * train_correct / train_total
        
        # Validation
        model.eval()
        val_loss = 0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for X_batch, y_batch in val_loader:
                X_batch, y_batch = X_batch.to(device), y_batch.to(device)
                outputs = model(X_batch)
                loss = criterion(outputs, y_batch)
                
                val_loss += loss.item()
                _, predicted = outputs.max(1)
                val_total += y_batch.size(0)
                val_correct += predicted.eq(y_batch).sum().item()
        
        val_acc = 100. * val_correct / val_total
        
        # Log epoch metrics
        tracker.log_scalar('epoch/train_loss', train_loss / len(train_loader), epoch)
        tracker.log_scalar('epoch/train_acc', train_acc, epoch)
        tracker.log_scalar('epoch/val_loss', val_loss / len(val_loader), epoch)
        tracker.log_scalar('epoch/val_acc', val_acc, epoch)
        
        if wandb:
            wandb.log({
                'epoch/train_loss': train_loss / len(train_loader),
                'epoch/train_acc': train_acc,
                'epoch/val_loss': val_loss / len(val_loader),
                'epoch/val_acc': val_acc
            })
        
        print(f"Epoch {epoch+1} | Train Acc: {train_acc:.2f}% | Val Acc: {val_acc:.2f}%")
        
        # Save checkpoint
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'val_acc': val_acc,
            }, f'checkpoint_epoch_{epoch}.pt')
            
            if wandb:
                wandb.save(f'checkpoint_epoch_{epoch}.pt')
    
    tracker.close()
    if wandb:
        wandb.finish()
    
    return model</code></pre>
      </div>
    </section>

    <!-- ============ 4. Model Optimization ============ -->
    <section class="section" id="dl-w11-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">4. Model Optimization</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-blue-700 mt-0">Quantization</h3>
            <p class="text-sm text-gray-600">Reduce model size by converting weights from <strong>FP32 to INT8</strong>.</p>
            <ul class="text-xs space-y-1 mt-2">
              <li>✅ <strong>4x smaller</strong> model size</li>
              <li>✅ <strong>2-3x faster</strong> inference</li>
              <li>⚠️ Slight accuracy loss</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">model = torch.quantization.quantize_dynamic(model)</code>
          </div>
          <div class="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-600">
            <h3 class="text-lg font-bold text-purple-700 mt-0">Pruning</h3>
            <p class="text-sm text-gray-600">Remove <strong>unimportant weights</strong> to reduce model size.</p>
            <ul class="text-xs space-y-1 mt-2">
              <li>✅ <strong>Sparse</strong> model</li>
              <li>✅ Reduced memory usage</li>
              <li>⚠️ May require fine-tuning</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">torch.nn.utils.prune.l1_unstructured(module, name="weight", amount=0.2)</code>
          </div>
          <div class="bg-green-50 p-4 rounded-xl border-l-4 border-green-600">
            <h3 class="text-lg font-bold text-green-700 mt-0">Knowledge Distillation</h3>
            <p class="text-sm text-gray-600">Train a <strong>smaller student model</strong> from a larger teacher.</p>
            <ul class="text-xs space-y-1 mt-2">
              <li>✅ <strong>Smaller</strong> and <strong>faster</strong></li>
              <li>✅ Retains most accuracy</li>
              <li>✅ Great for deployment</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">student = DistillBERT()</code>
          </div>
          <div class="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-600">
            <h3 class="text-lg font-bold text-orange-700 mt-0">Batch Inference</h3>
            <p class="text-sm text-gray-600">Process <strong>multiple inputs</strong> at once for efficiency.</p>
            <ul class="text-xs space-y-1 mt-2">
              <li>✅ <strong>GPU utilization</strong></li>
              <li>✅ Lower latency per sample</li>
              <li>✅ Essential for production</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">outputs = model(batch_inputs)</code>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Model Optimization Implementation</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.quantization as quant
from torch.nn.utils import prune

# ============================================================
# 1. QUANTIZATION
# ============================================================

def quantize_model(model, backend='fbgemm'):
    """Quantize model for faster inference."""
    model.eval()
    
    # Set quantization backend
    if backend == 'fbgemm':
        torch.backends.quantized.engine = 'fbgemm'
    else:
        torch.backends.quantized.engine = 'qnnpack'
    
    # Dynamic quantization (simplest)
    quantized_model = quant.quantize_dynamic(
        model,
        {nn.Linear, nn.LSTM, nn.GRU},  # Quantize these layers
        dtype=torch.qint8
    )
    
    print(f"Original model size: {sum(p.numel() for p in model.parameters()) * 4 / 1024:.2f} KB")
    print(f"Quantized model size: {sum(p.numel() for p in quantized_model.parameters()) * 1 / 1024:.2f} KB")
    
    return quantized_model

# ============================================================
# 2. PRUNING
# ============================================================

def prune_model(model, amount=0.2):
    """Prune model weights."""
    pruned_model = model
    
    for name, module in pruned_model.named_modules():
        if isinstance(module, nn.Linear):
            # Apply L1 unstructured pruning
            prune.l1_unstructured(module, name="weight", amount=amount)
            
            # Remove pruning masks (make permanent)
            prune.remove(module, 'weight')
    
    return pruned_model

# ============================================================
# 3. COMPRESS WITH ONNX
# ============================================================

def export_to_onnx(model, input_shape, onnx_path='model.onnx'):
    """Export PyTorch model to ONNX format."""
    model.eval()
    dummy_input = torch.randn(*input_shape)
    
    torch.onnx.export(
        model,
        dummy_input,
        onnx_path,
        export_params=True,
        opset_version=11,
        do_constant_folding=True,
        input_names=['input'],
        output_names=['output'],
        dynamic_axes={
            'input': {0: 'batch_size'},
            'output': {0: 'batch_size'}
        }
    )
    
    print(f"✅ Model exported to {onnx_path}")
    
    # Optimize ONNX model with onnxruntime
    try:
        import onnxruntime as ort
        import onnx
        
        # Load and optimize
        onnx_model = onnx.load(onnx_path)
        onnx.checker.check_model(onnx_model)
        
        # Create optimized inference session
        session = ort.InferenceSession(onnx_path)
        print("✅ ONNX model optimized with onnxruntime")
        return session
    except ImportError:
        print("⚠️ Install onnx and onnxruntime for optimization")
        return None

# ============================================================
# 4. BATCH INFERENCE
# ============================================================

def batch_predict(model, data_loader, device='cpu'):
    """Run batch inference efficiently."""
    model.eval()
    model.to(device)
    
    all_predictions = []
    all_probabilities = []
    
    with torch.no_grad():
        for batch in data_loader:
            if isinstance(batch, (list, tuple)):
                inputs = batch[0].to(device)
            else:
                inputs = batch.to(device)
            
            # Run inference
            outputs = model(inputs)
            
            # Get predictions
            probabilities = torch.softmax(outputs, dim=1)
            predictions = outputs.argmax(dim=1)
            
            all_predictions.extend(predictions.cpu().numpy())
            all_probabilities.extend(probabilities.cpu().numpy())
    
    return all_predictions, all_probabilities</code></pre>
      </div>
    </section>

    <!-- ============ 5. Model Deployment ============ -->
    <section class="section" id="dl-w11-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">5. Model Deployment</h2>
      <div class="content-card">
        <div class="deployment-flow bg-gray-100 p-6 rounded-xl">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div class="text-center">
              <div class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">PyTorch Model</div>
              <span class="text-xs text-gray-500 block">Trained model</span>
            </div>
            <span class="text-2xl text-cyan-600">→</span>
            <div class="text-center">
              <div class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Flask/FastAPI</div>
              <span class="text-xs text-gray-500 block">REST API</span>
            </div>
            <span class="text-2xl text-cyan-600">→</span>
            <div class="text-center">
              <div class="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold">API Endpoint</div>
              <span class="text-xs text-gray-500 block">/predict</span>
            </div>
            <span class="text-2xl text-cyan-600">→</span>
            <div class="text-center">
              <div class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Frontend</div>
              <span class="text-xs text-gray-500 block">Web/Mobile</span>
            </div>
            <span class="text-2xl text-cyan-600">→</span>
            <div class="text-center">
              <div class="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold">User</div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">FastAPI Deployment</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code># ============================================================
# app.py - FastAPI Deployment
# ============================================================

from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import uvicorn
import time
from typing import List, Optional
import logging

# ============================================================
# 1. SETUP LOGGING
# ============================================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================
# 2. REQUEST MODELS
# ============================================================

class PredictionRequest(BaseModel):
    text: str
    max_length: Optional[int] = 128

class PredictionResponse(BaseModel):
    text: str
    prediction: str
    confidence: float
    probabilities: List[float]
    inference_time: float

class BatchPredictionRequest(BaseModel):
    texts: List[str]
    max_length: Optional[int] = 128

class BatchPredictionResponse(BaseModel):
    predictions: List[PredictionResponse]

# ============================================================
# 3. MODEL LOADER
# ============================================================

class ModelLoader:
    """Singleton model loader for inference."""
    
    def __init__(self, model_path: str):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        logger.info(f"Loading model on {self.device}...")
        
        # Load model and tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
        self.model.to(self.device)
        self.model.eval()
        
        self.classes = ['Negative', 'Positive']
        logger.info("✅ Model loaded successfully")
    
    def predict(self, text: str, max_length: int = 128):
        """Run inference on a single text."""
        start_time = time.time()
        
        # Tokenize
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding='max_length',
            max_length=max_length
        )
        
        # Move to device
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        # Inference
        with torch.no_grad():
            outputs = self.model(**inputs)
            probabilities = torch.softmax(outputs.logits, dim=1).cpu().numpy()[0]
            prediction = int(outputs.logits.argmax(dim=1).cpu().numpy()[0])
        
        inference_time = time.time() - start_time
        
        return {
            'prediction': self.classes[prediction],
            'confidence': float(probabilities[prediction]),
            'probabilities': probabilities.tolist(),
            'inference_time': inference_time
        }
    
    def predict_batch(self, texts: List[str], max_length: int = 128):
        """Run inference on multiple texts."""
        return [self.predict(text, max_length) for text in texts]

# Initialize model (singleton)
model_loader = None

def get_model():
    global model_loader
    if model_loader is None:
        model_loader = ModelLoader('./fine_tuned_model')
    return model_loader

# ============================================================
# 4. FASTAPI APP
# ============================================================

app = FastAPI(
    title="Sentiment Analysis API",
    description="API for sentiment classification using fine-tuned BERT",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_event():
    """Load model on startup."""
    logger.info("Starting up...")
    get_model()
    logger.info("✅ Model loaded on startup")

@app.get("/")
async def root():
    return {
        "message": "Sentiment Analysis API",
        "endpoints": {
            "/predict": "POST - Single text prediction",
            "/predict_batch": "POST - Batch text prediction",
            "/health": "GET - Health check"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "device": str(get_model().device)}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Predict sentiment of a single text."""
    try:
        model = get_model()
        result = model.predict(request.text, request.max_length)
        
        return PredictionResponse(
            text=request.text,
            prediction=result['prediction'],
            confidence=result['confidence'],
            probabilities=result['probabilities'],
            inference_time=result['inference_time']
        )
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict_batch", response_model=BatchPredictionResponse)
async def predict_batch(request: BatchPredictionRequest):
    """Predict sentiment of multiple texts."""
    try:
        model = get_model()
        results = model.predict_batch(request.texts, request.max_length)
        
        predictions = []
        for text, result in zip(request.texts, results):
            predictions.append(PredictionResponse(
                text=text,
                prediction=result['prediction'],
                confidence=result['confidence'],
                probabilities=result['probabilities'],
                inference_time=result['inference_time']
            ))
        
        return BatchPredictionResponse(predictions=predictions)
    except Exception as e:
        logger.error(f"Batch prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================
# 5. RUN THE API
# ============================================================

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )</code></pre>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Docker Deployment</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code># ============================================================
# Dockerfile
# ============================================================

FROM python:3.9-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model and code
COPY app.py .
COPY ./fine_tuned_model ./fine_tuned_model

# Expose port
EXPOSE 8000

# Run the app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

# ============================================================
# requirements.txt
# ============================================================

fastapi==0.104.1
uvicorn==0.24.0
torch==2.0.0
transformers==4.35.0
pydantic==2.4.0

# ============================================================
# Build and Run
# ============================================================

# Build the image
docker build -t sentiment-api .

# Run the container
docker run -p 8000:8000 sentiment-api

# ============================================================
# docker-compose.yml (optional)
# ============================================================

version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - CUDA_VISIBLE_DEVICES=0
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]</code></pre>
      </div>
    </section>

    <!-- ============ 6. Frontend Integration ============ -->
    <section class="section" id="dl-w11-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">6. Frontend Integration</h2>
      <div class="content-card">
        <h3 class="text-xl font-bold text-gray-800 mt-0">HTML + JavaScript Client</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>&lt;!-- index.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Sentiment Analysis&lt;/title&gt;
    &lt;style&gt;
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        textarea { width: 100%; height: 100px; padding: 10px; font-size: 16px; }
        button { padding: 10px 30px; font-size: 16px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        .result { margin-top: 20px; padding: 20px; border-radius: 8px; }
        .positive { background: #d4edda; border: 1px solid #c3e6cb; }
        .negative { background: #f8d7da; border: 1px solid #f5c6cb; }
        .confidence { font-weight: bold; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;🔮 Sentiment Analysis&lt;/h1&gt;
    &lt;p&gt;Enter text to analyze sentiment:&lt;/p&gt;
    &lt;textarea id="textInput" placeholder="Enter your text here..."&gt;I love this product! It's amazing.&lt;/textarea&gt;
    &lt;button onclick="analyzeSentiment()"&gt;Analyze Sentiment&lt;/button&gt;
    &lt;div id="result"&gt;&lt;/div&gt;

    &lt;script&gt;
        const API_URL = 'http://localhost:8000/predict';

        async function analyzeSentiment() {
            const text = document.getElementById('textInput').value;
            if (!text) {
                alert('Please enter some text.');
                return;
            }

            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '⏳ Analyzing...';

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: text })
                });

                if (!response.ok) throw new Error('API error');

                const data = await response.json();
                displayResult(data);
            } catch (error) {
                resultDiv.innerHTML = `❌ Error: ${error.message}`;
            }
        }

        function displayResult(data) {
            const resultDiv = document.getElementById('result');
            const sentiment = data.prediction.toLowerCase();
            const confidence = (data.confidence * 100).toFixed(1);

            resultDiv.innerHTML = `
                &lt;div class="result ${sentiment}"&gt;
                    &lt;h3&gt;${sentiment === 'positive' ? '😊' : '😞'} ${data.prediction}&lt;/h3&gt;
                    &lt;p&gt;Confidence: &lt;span class="confidence"&gt;${confidence}%&lt;/span&gt;&lt;/p&gt;
                    &lt;p&gt;Inference time: ${(data.inference_time * 1000).toFixed(2)}ms&lt;/p&gt;
                    &lt;p&gt;Probabilities:&lt;/p&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Negative: ${(data.probabilities[0] * 100).toFixed(1)}%&lt;/li&gt;
                        &lt;li&gt;Positive: ${(data.probabilities[1] * 100).toFixed(1)}%&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
            `;
        }

        // Auto-analyze on Enter key (Ctrl+Enter)
        document.getElementById('textInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                analyzeSentiment();
            }
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

        <div class="gate-box bg-cyan-50 border-l-4 border-cyan-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Deployment Checklist:</strong></p>
          <ul class="text-sm space-y-1">
            <li>✅ <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Model</span> – trained and saved</li>
            <li>✅ <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">API</span> – FastAPI/Flask with endpoints</li>
            <li>✅ <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Container</span> – Dockerized for portability</li>
            <li>✅ <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Frontend</span> – HTML/JS client</li>
            <li>✅ <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Monitoring</span> – Logging and health checks</li>
            <li>✅ <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Testing</span> – Test with sample inputs</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 7. Cheat Sheet ============ -->
    <section class="section" id="dl-w11-t7">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">7. Cheat Sheet – Deployment &amp; Modern DL</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-cyan-800 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
                <th class="p-3 text-left border border-gray-300">Code Example</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Hugging Face</td>
                <td class="p-3">Pre-trained model hub</td>
                <td class="p-3 font-mono text-xs">from transformers import AutoModel</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Fine-Tuning</td>
                <td class="p-3">Adapt pre-trained model to your data</td>
                <td class="p-3 font-mono text-xs">Trainer(model, args, train_dataset)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">TensorBoard</td>
                <td class="p-3">Visualize training metrics</td>
                <td class="p-3 font-mono text-xs">SummaryWriter()</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Quantization</td>
                <td class="p-3">Reduce model size with INT8</td>
                <td class="p-3 font-mono text-xs">torch.quantization.quantize_dynamic</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Pruning</td>
                <td class="p-3">Remove unimportant weights</td>
                <td class="p-3 font-mono text-xs">prune.l1_unstructured()</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">FastAPI</td>
                <td class="p-3">Modern Python web framework</td>
                <td class="p-3 font-mono text-xs">@app.post("/predict")</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Docker</td>
                <td class="p-3">Containerize applications</td>
                <td class="p-3 font-mono text-xs">docker build -t my-api .</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 8. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w11-t8">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-cyan-600 pb-2">📘 Quick Revision – Modern DL &amp; Deployment</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>Hugging Face:</strong> Model Hub, Tokenizers, Transformers library – <strong>unified API</strong> for pre-trained models</li>
          <li class="pb-3 border-b border-gray-200"><strong>Fine-Tuning:</strong> Adapt pre-trained models to <strong>custom datasets</strong> with small learning rates</li>
          <li class="pb-3 border-b border-gray-200"><strong>Experiment Tracking:</strong> TensorBoard (local), Weights &amp; Biases (cloud), MLflow – <strong>track everything</strong></li>
          <li class="pb-3 border-b border-gray-200"><strong>Model Optimization:</strong> Quantization (4x smaller), Pruning (sparse), Knowledge Distillation (smaller student)</li>
          <li class="pb-3 border-b border-gray-200"><strong>Deployment:</strong> PyTorch → FastAPI/Flask → REST API → Frontend → User</li>
          <li class="pb-3 border-b border-gray-200"><strong>Docker:</strong> Containerize for <strong>consistent</strong> deployment across environments</li>
          <li class="pb-0"><strong>Best Practice:</strong> Use <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Hugging Face</span> for pre-trained models, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">FastAPI</span> for APIs, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Docker</span> for deployment, and <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">TensorBoard/WandB</span> for tracking.</li>
        </ul>
        <div class="gate-box bg-cyan-50 border-l-4 border-cyan-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 Final GATE Focus:</strong> Understand the <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">complete ML lifecycle</span> – from data to deployment. Know <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">how to fine-tune</span> pre-trained models, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">optimize</span> for production, and <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">deploy</span> as an API. This is the <strong>real-world</strong> skill that matters!</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">🚀 Deep Learning Bootcamp – Week 11 · Modern DL &amp; Model Deployment</p>
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
    { id: 'dl-w11-t1', title: 'Hugging Face Ecosystem' },
    { id: 'dl-w11-t2', title: 'Fine-Tuning Pretrained Models' },
    { id: 'dl-w11-t3', title: 'Experiment Tracking' },
    { id: 'dl-w11-t4', title: 'Model Optimization' },
    { id: 'dl-w11-t5', title: 'Model Deployment' },
    { id: 'dl-w11-t6', title: 'Frontend Integration' },
    { id: 'dl-w11-t7', title: 'Cheat Sheet' },
    { id: 'dl-w11-t8', title: 'Quick Revision' },
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #0e7490);
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
  border: 1px solid #0e7490 !important;
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
  background: #ecfdf5 !important;
  border-left: 4px solid #0e7490 !important;
}

/* Deployment flow */
.deployment-flow,
.fine-tuning-flow {
  background: #ecfdf5 !important;
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
  .deployment-flow .flex,
  .fine-tuning-flow .flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>