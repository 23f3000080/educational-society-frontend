<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">🔄 Deep Learning – Week 8</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Sequence Models: RNN · LSTM · GRU · Time-Series Forecasting</p>
    </header>

    <!-- ============ 1. Why Sequence Models? ============ -->
    <section class="section" id="dl-w8-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">1. Why Sequence Models?</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Why CNN isn't enough for sequences?</h3>
            <ul class="text-sm space-y-2">
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span>CNN processes <strong>fixed-size</strong> inputs</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span>No <strong>memory</strong> of previous time steps</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span>Cannot handle <strong>variable-length</strong> sequences</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500">✗</span> <span>No <strong>temporal</strong> understanding</span></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Sequence Data Examples</h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">📈</span>
                <strong>Stock Prices</strong>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">🌤️</span>
                <strong>Weather</strong>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">💓</span>
                <strong>ECG</strong>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">🗣️</span>
                <strong>Speech</strong>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">📝</span>
                <strong>Text</strong>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg text-center text-sm">
                <span class="text-2xl block">📊</span>
                <strong>Sensor Data</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="sequence-diagram bg-gray-100 p-5 rounded-xl mt-4">
          <div class="text-center text-sm text-gray-600 mb-2">Sequence Data Flow</div>
          <div class="flex items-center justify-center gap-2 flex-wrap">
            <span class="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">t₁</span>
            <span class="text-teal-600">→</span>
            <span class="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">t₂</span>
            <span class="text-teal-600">→</span>
            <span class="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">t₃</span>
            <span class="text-teal-600">→</span>
            <span class="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">...</span>
            <span class="text-teal-600">→</span>
            <span class="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">tₙ</span>
          </div>
          <p class="text-center text-xs text-gray-500 mt-2"><strong>Order matters!</strong> Each time step depends on previous ones.</p>
        </div>

        <div class="gate-box bg-teal-50 border-l-4 border-teal-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Key Insight:</strong> Sequence models maintain <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">memory</span> of past inputs through <strong>hidden states</strong>, enabling them to capture <strong>temporal dependencies</strong>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 2. RNN ============ -->
    <section class="section" id="dl-w8-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">2. Recurrent Neural Networks (RNN)</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">How RNN Works</h3>
            <div class="rnn-diagram bg-gray-100 p-4 rounded-xl">
              <div class="flex flex-wrap items-center justify-center gap-3">
                <div class="text-center">
                  <div class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">xₜ</div>
                  <span class="text-xs text-gray-500">Input</span>
                </div>
                <span class="text-2xl text-teal-600">→</span>
                <div class="text-center">
                  <div class="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold">RNN</div>
                  <span class="text-xs text-gray-500">hₜ = f(W·xₜ + U·hₜ₋₁)</span>
                </div>
                <span class="text-2xl text-teal-600">→</span>
                <div class="text-center">
                  <div class="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">yₜ</div>
                  <span class="text-xs text-gray-500">Output</span>
                </div>
              </div>
              <div class="flex justify-center mt-2">
                <span class="text-xs text-gray-500">⤴ Hidden state hₜ₋₁ from previous step</span>
              </div>
            </div>

            <div class="formula-box bg-gray-100 border-l-4 border-teal-700 p-4 rounded-lg mt-3">
              <p class="font-bold text-gray-800 text-sm">RNN Formulas:</p>
              <div class="bg-white p-2 rounded-lg font-mono text-xs">
                hₜ = tanh(W<sub>xh</sub>·xₜ + W<sub>hh</sub>·hₜ₋₁ + b<sub>h</sub>)
              </div>
              <div class="bg-white p-2 rounded-lg font-mono text-xs mt-1">
                yₜ = W<sub>hy</sub>·hₜ + b<sub>y</sub>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">RNN Problems</h3>
            <div class="space-y-3">
              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 class="font-bold text-sm text-red-700">⚠️ Vanishing Gradient</h4>
                <p class="text-xs text-gray-600">Gradients become <strong>exponentially small</strong> over long sequences → can't learn long-term dependencies.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded mt-1 inline-block">∂L/∂hₜ = ∂L/∂hₜ · Π (∂hᵢ/∂hᵢ₋₁)</code>
              </div>
              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 class="font-bold text-sm text-red-700">⚠️ Exploding Gradient</h4>
                <p class="text-xs text-gray-600">Gradients become <strong>exponentially large</strong> → unstable training.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded mt-1 inline-block">Solution: Gradient Clipping</code>
              </div>
              <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 class="font-bold text-sm text-yellow-700">💡 Solution</h4>
                <p class="text-xs text-gray-600">Use <strong>LSTM</strong> or <strong>GRU</strong> with gating mechanisms.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="example-box bg-gray-100 border-l-4 border-teal-600 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">🧠 RNN Intuition:</p>
          <p class="text-sm text-gray-600">RNN has a <strong>"memory"</strong> (hidden state h) that gets updated at each time step. It reads the input and <strong>combines it with its memory</strong> to produce output.</p>
        </div>
      </div>
    </section>

    <!-- ============ 3. LSTM ============ -->
    <section class="section" id="dl-w8-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">3. LSTM – Long Short-Term Memory</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">LSTM Architecture</h3>
            <div class="lstm-diagram bg-gray-100 p-4 rounded-xl">
              <div class="text-center text-sm font-bold text-teal-700">Cell State (Cₜ) – Long-term memory</div>
              <div class="flex items-center justify-center gap-2 flex-wrap my-2">
                <span class="text-xs">Cₜ₋₁</span>
                <span class="text-teal-600">→</span>
                <div class="bg-green-600 text-white px-2 py-1 rounded text-xs">Forget</div>
                <span class="text-teal-600">→</span>
                <div class="bg-blue-600 text-white px-2 py-1 rounded text-xs">Input</div>
                <span class="text-teal-600">→</span>
                <div class="bg-purple-600 text-white px-2 py-1 rounded text-xs">Output</div>
                <span class="text-teal-600">→</span>
                <span class="text-xs">Cₜ</span>
              </div>
              <div class="text-center text-xs text-gray-500">Hidden State (hₜ) – Short-term memory</div>
            </div>

            <div class="formula-box bg-gray-100 border-l-4 border-teal-700 p-4 rounded-lg mt-3">
              <p class="font-bold text-gray-800 text-sm">LSTM Gates:</p>
              <div class="bg-white p-2 rounded-lg font-mono text-xs">
                fₜ = σ(W<sub>f</sub>·[hₜ₋₁, xₜ] + b<sub>f</sub>) &nbsp; ← Forget
              </div>
              <div class="bg-white p-2 rounded-lg font-mono text-xs mt-1">
                iₜ = σ(W<sub>i</sub>·[hₜ₋₁, xₜ] + b<sub>i</sub>) &nbsp; ← Input
              </div>
              <div class="bg-white p-2 rounded-lg font-mono text-xs mt-1">
                oₜ = σ(W<sub>o</sub>·[hₜ₋₁, xₜ] + b<sub>o</sub>) &nbsp; ← Output
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">LSTM Components</h3>
            <div class="space-y-3">
              <div class="bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-sm text-green-700">🧠 Cell State (C)</h4>
                <p class="text-xs text-gray-600"><strong>Long-term memory</strong> – information flows through the entire sequence with minimal changes.</p>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm text-blue-700">🚪 Forget Gate (f)</h4>
                <p class="text-xs text-gray-600">Decides <strong>what to forget</strong> from previous cell state.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">fₜ = σ(W_f·[hₜ₋₁, xₜ] + b_f)</code>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm text-blue-700">✏️ Input Gate (i)</h4>
                <p class="text-xs text-gray-600">Decides <strong>what to add</strong> to the cell state.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">iₜ = σ(W_i·[hₜ₋₁, xₜ] + b_i)</code>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-sm text-purple-700">📤 Output Gate (o)</h4>
                <p class="text-xs text-gray-600">Decides <strong>what to output</strong> based on cell state.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">oₜ = σ(W_o·[hₜ₋₁, xₜ] + b_o)</code>
              </div>
            </div>
          </div>
        </div>

        <div class="gate-box bg-teal-50 border-l-4 border-teal-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 LSTM Advantage:</strong> The <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">cell state (C)</span> allows information to flow <strong>unchanged</strong> through the network, solving the <strong>vanishing gradient</strong> problem. Gates control what to <strong>forget, store, and output</strong>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 4. GRU ============ -->
    <section class="section" id="dl-w8-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">4. GRU – Gated Recurrent Unit</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">GRU Architecture</h3>
            <div class="gru-diagram bg-gray-100 p-4 rounded-xl">
              <div class="flex items-center justify-center gap-2 flex-wrap">
                <div class="text-center">
                  <span class="text-xs">hₜ₋₁</span>
                </div>
                <span class="text-teal-600">→</span>
                <div class="bg-orange-600 text-white px-2 py-1 rounded text-xs">Reset</div>
                <span class="text-teal-600">→</span>
                <div class="bg-pink-600 text-white px-2 py-1 rounded text-xs">Update</div>
                <span class="text-teal-600">→</span>
                <div class="bg-teal-600 text-white px-3 py-1 rounded text-xs font-bold">hₜ</div>
              </div>
            </div>

            <div class="formula-box bg-gray-100 border-l-4 border-teal-700 p-4 rounded-lg mt-3">
              <p class="font-bold text-gray-800 text-sm">GRU Gates:</p>
              <div class="bg-white p-2 rounded-lg font-mono text-xs">
                rₜ = σ(W<sub>r</sub>·[hₜ₋₁, xₜ]) &nbsp; ← Reset
              </div>
              <div class="bg-white p-2 rounded-lg font-mono text-xs mt-1">
                zₜ = σ(W<sub>z</sub>·[hₜ₋₁, xₜ]) &nbsp; ← Update
              </div>
              <div class="bg-white p-2 rounded-lg font-mono text-xs mt-1">
                h̃ₜ = tanh(W·[rₜ ⊙ hₜ₋₁, xₜ])
              </div>
              <div class="bg-white p-2 rounded-lg font-mono text-xs mt-1">
                hₜ = (1 − zₜ) ⊙ hₜ₋₁ + zₜ ⊙ h̃ₜ
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">LSTM vs GRU</h3>
            <table class="w-full border-collapse text-sm">
              <thead>
                <tr class="bg-teal-900 text-white">
                  <th class="p-2 text-left border border-gray-300">Feature</th>
                  <th class="p-2 text-left border border-gray-300">LSTM</th>
                  <th class="p-2 text-left border border-gray-300">GRU</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border border-gray-300 even:bg-gray-50">
                  <td class="p-2 font-bold">Gates</td>
                  <td class="p-2">3 (Forget, Input, Output)</td>
                  <td class="p-2">2 (Reset, Update)</td>
                </tr>
                <tr class="border border-gray-300 even:bg-gray-50">
                  <td class="p-2 font-bold">Memory</td>
                  <td class="p-2">Cell State (C) + Hidden State (h)</td>
                  <td class="p-2">Hidden State (h) only</td>
                </tr>
                <tr class="border border-gray-300 even:bg-gray-50">
                  <td class="p-2 font-bold">Parameters</td>
                  <td class="p-2">More (~4x)</td>
                  <td class="p-2">Fewer (~3x)</td>
                </tr>
                <tr class="border border-gray-300 even:bg-gray-50">
                  <td class="p-2 font-bold">Speed</td>
                  <td class="p-2">Slower</td>
                  <td class="p-2 text-green-700 font-bold">Faster</td>
                </tr>
                <tr class="border border-gray-300 even:bg-gray-50">
                  <td class="p-2 font-bold">When to use</td>
                  <td class="p-2">Long sequences, complex tasks</td>
                  <td class="p-2">Shorter sequences, efficiency needed</td>
                </tr>
              </tbody>
            </table>
            <div class="gate-box bg-teal-50 border-l-4 border-teal-700 p-3 rounded-lg mt-3">
              <p class="text-xs text-gray-800"><strong>💡 Rule of Thumb:</strong> Use <strong>LSTM</strong> for complex/long sequences, <strong>GRU</strong> for simpler tasks or when <strong>speed/efficiency</strong> matters.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 5. Time-Series Forecasting ============ -->
    <section class="section" id="dl-w8-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">5. Time-Series Forecasting with LSTM</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">📈</span>
            <p class="font-bold text-gray-800">Stock Price</p>
            <p class="text-xs text-gray-600">Predict future prices</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">⚡</span>
            <p class="font-bold text-gray-800">Electricity</p>
            <p class="text-xs text-gray-600">Consumption forecasting</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🌡️</span>
            <p class="font-bold text-gray-800">Temperature</p>
            <p class="text-xs text-gray-600">Weather prediction</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Complete LSTM Forecasting Pipeline</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from torch.utils.data import DataLoader, TensorDataset

# ============================================================
# 1. DATA PREPARATION
# ============================================================

def create_sequences(data, seq_length):
    """Create sequences for time-series forecasting."""
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i + seq_length])
        y.append(data[i + seq_length])
    return np.array(X), np.array(y)

# Load and prepare data
def prepare_data(df, target_col, seq_length=50, train_split=0.8):
    """Prepare time-series data for LSTM."""
    # Extract target
    data = df[target_col].values.reshape(-1, 1)
    
    # Normalize data
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)
    
    # Create sequences
    X, y = create_sequences(scaled_data, seq_length)
    
    # Split into train/val/test
    split_idx = int(len(X) * train_split)
    val_split = int(len(X) * 0.9)
    
    X_train, y_train = X[:split_idx], y[:split_idx]
    X_val, y_val = X[split_idx:val_split], y[split_idx:val_split]
    X_test, y_test = X[val_split:], y[val_split:]
    
    # Convert to tensors
    X_train = torch.FloatTensor(X_train).unsqueeze(-1)
    y_train = torch.FloatTensor(y_train).unsqueeze(-1)
    X_val = torch.FloatTensor(X_val).unsqueeze(-1)
    y_val = torch.FloatTensor(y_val).unsqueeze(-1)
    X_test = torch.FloatTensor(X_test).unsqueeze(-1)
    y_test = torch.FloatTensor(y_test).unsqueeze(-1)
    
    return (X_train, y_train, X_val, y_val, X_test, y_test), scaler

# ============================================================
# 2. LSTM MODEL
# ============================================================

class LSTMPredictor(nn.Module):
    """LSTM for time-series forecasting."""
    
    def __init__(self, input_size=1, hidden_size=64, num_layers=2, output_size=1, dropout=0.2):
        super(LSTMPredictor, self).__init__()
        
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0
        )
        
        self.dropout = nn.Dropout(dropout)
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        # x: (batch, seq_len, input_size)
        lstm_out, (h_n, c_n) = self.lstm(x)
        # Get last time step output
        last_output = lstm_out[:, -1, :]  # (batch, hidden_size)
        last_output = self.dropout(last_output)
        output = self.fc(last_output)
        return output

# ============================================================
# 3. TRAINING LOOP
# ============================================================

def train_lstm(model, train_loader, val_loader, num_epochs=50, lr=0.001, device='cpu'):
    model.to(device)
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=5
    )
    
    history = {'train_loss': [], 'val_loss': []}
    best_val_loss = float('inf')
    
    for epoch in range(num_epochs):
        # Training
        model.train()
        train_loss = 0
        
        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)
            
            optimizer.zero_grad()
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()
            
            # Gradient clipping for exploding gradients
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            
            optimizer.step()
            train_loss += loss.item()
        
        # Validation
        model.eval()
        val_loss = 0
        with torch.no_grad():
            for X_batch, y_batch in val_loader:
                X_batch, y_batch = X_batch.to(device), y_batch.to(device)
                outputs = model(X_batch)
                loss = criterion(outputs, y_batch)
                val_loss += loss.item()
        
        avg_train_loss = train_loss / len(train_loader)
        avg_val_loss = val_loss / len(val_loader)
        
        history['train_loss'].append(avg_train_loss)
        history['val_loss'].append(avg_val_loss)
        
        scheduler.step(avg_val_loss)
        
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            torch.save(model.state_dict(), 'best_lstm_model.pt')
        
        if (epoch + 1) % 10 == 0:
            print(f"Epoch {epoch+1}/{num_epochs} | "
                  f"Train Loss: {avg_train_loss:.6f} | "
                  f"Val Loss: {avg_val_loss:.6f}")
    
    # Load best model
    model.load_state_dict(torch.load('best_lstm_model.pt'))
    return model, history

# ============================================================
# 4. PREDICTION & EVALUATION
# ============================================================

def predict_series(model, X_test, y_test, scaler, device='cpu'):
    """Make predictions and inverse transform."""
    model.eval()
    model.to(device)
    
    with torch.no_grad():
        X_test = X_test.to(device)
        predictions = model(X_test)
        predictions = predictions.cpu().numpy()
    
    # Inverse transform
    predictions = scaler.inverse_transform(predictions)
    actual = scaler.inverse_transform(y_test.cpu().numpy())
    
    return predictions, actual

def plot_predictions(actual, predictions, title="Time Series Forecast"):
    """Plot actual vs predicted values."""
    plt.figure(figsize=(12, 6))
    plt.plot(actual, label='Actual', color='blue', linewidth=2)
    plt.plot(predictions, label='Predicted', color='red', linestyle='--', linewidth=2)
    plt.xlabel('Time Steps')
    plt.ylabel('Value')
    plt.title(title)
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

# ============================================================
# 5. MAIN EXECUTION
# ============================================================

def main():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")
    
    # Load data (example: stock prices)
    # df = pd.read_csv('stock_data.csv')
    # df['Date'] = pd.to_datetime(df['Date'])
    
    # For demonstration, create synthetic data
    np.random.seed(42)
    time = np.arange(0, 1000, 0.1)
    data = np.sin(time) * 10 + np.random.randn(len(time)) * 2 + 50
    
    df = pd.DataFrame({'value': data})
    
    # Prepare data
    seq_length = 50
    (X_train, y_train, X_val, y_val, X_test, y_test), scaler = prepare_data(
        df, 'value', seq_length=seq_length
    )
    
    batch_size = 32
    train_dataset = TensorDataset(X_train, y_train)
    val_dataset = TensorDataset(X_val, y_val)
    test_dataset = TensorDataset(X_test, y_test)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    
    # Initialize model
    model = LSTMPredictor(
        input_size=1,
        hidden_size=64,
        num_layers=2,
        output_size=1,
        dropout=0.2
    )
    
    print("\n" + "="*50)
    print("TRAINING LSTM FOR TIME-SERIES FORECASTING")
    print("="*50)
    
    # Train
    model, history = train_lstm(
        model, train_loader, val_loader,
        num_epochs=50, lr=0.001, device=device
    )
    
    # Plot training loss
    plt.figure(figsize=(10, 5))
    plt.plot(history['train_loss'], label='Train Loss')
    plt.plot(history['val_loss'], label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training History')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()
    
    # Test predictions
    predictions, actual = predict_series(model, X_test, y_test, scaler, device)
    
    # Metrics
    from sklearn.metrics import mean_squared_error, mean_absolute_error
    mse = mean_squared_error(actual, predictions)
    mae = mean_absolute_error(actual, predictions)
    rmse = np.sqrt(mse)
    
    print("\n" + "="*50)
    print("TEST SET PERFORMANCE")
    print("="*50)
    print(f"MSE:  {mse:.4f}")
    print(f"RMSE: {rmse:.4f}")
    print(f"MAE:  {mae:.4f}")
    
    # Plot predictions
    plot_predictions(actual, predictions, title="LSTM Time-Series Forecast")
    
    # Save model
    torch.save(model.state_dict(), 'lstm_forecast_model.pt')
    print("\n✅ Model saved to 'lstm_forecast_model.pt'")

if __name__ == "__main__":
    main()</code></pre>
      </div>
    </section>

    <!-- ============ 6. ECG Heartbeat Classification ============ -->
    <section class="section" id="dl-w8-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">6. ECG Heartbeat Classification – Mini Project</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-red-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">💓</span>
            <p class="font-bold text-gray-800">ECG Signal</p>
            <p class="text-xs text-gray-600">Heart electrical activity</p>
          </div>
          <div class="bg-red-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🔵</span>
            <p class="font-bold text-gray-800">Normal</p>
          </div>
          <div class="bg-red-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🟡</span>
            <p class="font-bold text-gray-800">Arrhythmia</p>
          </div>
          <div class="bg-red-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🔴</span>
            <p class="font-bold text-gray-800">Abnormal</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">LSTM-based ECG Classifier</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from torch.utils.data import DataLoader, TensorDataset

# ============================================================
# 1. ECG DATA LOADING
# ============================================================

class ECGClassifier(nn.Module):
    """LSTM-based ECG heartbeat classifier."""
    
    def __init__(self, input_size=1, hidden_size=128, num_layers=2, num_classes=3, dropout=0.3):
        super(ECGClassifier, self).__init__()
        
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
            bidirectional=True
        )
        
        self.dropout = nn.Dropout(dropout)
        self.fc1 = nn.Linear(hidden_size * 2, 64)  # *2 for bidirectional
        self.fc2 = nn.Linear(64, num_classes)
    
    def forward(self, x):
        # x: (batch, seq_len, features)
        lstm_out, (h_n, c_n) = self.lstm(x)
        
        # Use last hidden state or average pooling
        # Option 1: Last hidden state
        # output = lstm_out[:, -1, :]
        
        # Option 2: Global average pooling across time
        output = torch.mean(lstm_out, dim=1)  # (batch, hidden_size*2)
        
        output = self.dropout(output)
        output = F.relu(self.fc1(output))
        output = self.dropout(output)
        output = self.fc2(output)
        
        return output

# ============================================================
# 2. DATA PREPROCESSING FOR ECG
# ============================================================

def load_ecg_data(filepath, seq_length=200):
    """Load and prepare ECG data.
    
    Data format: Each row is a heartbeat signal with labels.
    """
    # For MIT-BIH Arrhythmia dataset format
    # df = pd.read_csv(filepath)
    # signals = df.iloc[:, :-1].values  # ECG signals
    # labels = df.iloc[:, -1].values    # Labels
    
    # Create synthetic ECG data for demonstration
    np.random.seed(42)
    n_samples = 1000
    seq_len = 200
    
    # Generate synthetic ECG-like signals
    signals = []
    labels = []
    
    for i in range(n_samples):
        t = np.linspace(0, 4 * np.pi, seq_len)
        # Normal beat
        if i % 3 == 0:
            signal = np.sin(t) + 0.5 * np.sin(2 * t) + np.random.randn(seq_len) * 0.1
            label = 0  # Normal
        elif i % 3 == 1:
            signal = np.sin(t) + 0.8 * np.sin(3 * t) + np.random.randn(seq_len) * 0.15
            label = 1  # Arrhythmia
        else:
            signal = np.sin(t) * 1.5 + np.random.randn(seq_len) * 0.2
            label = 2  # Abnormal
        signals.append(signal)
        labels.append(label)
    
    signals = np.array(signals).reshape(-1, seq_len, 1)
    labels = np.array(labels)
    
    return signals, labels

# ============================================================
# 3. TRAINING LOOP
# ============================================================

def train_ecg_classifier():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")
    
    # Load data
    X, y = load_ecg_data('ecg_data.csv')
    
    # Split data
    X_train, X_temp, y_train, y_temp = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp
    )
    
    # Standardize
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train.reshape(-1, X_train.shape[-1])).reshape(X_train.shape)
    X_val = scaler.transform(X_val.reshape(-1, X_val.shape[-1])).reshape(X_val.shape)
    X_test = scaler.transform(X_test.reshape(-1, X_test.shape[-1])).reshape(X_test.shape)
    
    # Convert to tensors
    X_train = torch.FloatTensor(X_train)
    y_train = torch.LongTensor(y_train)
    X_val = torch.FloatTensor(X_val)
    y_val = torch.LongTensor(y_val)
    X_test = torch.FloatTensor(X_test)
    y_test = torch.LongTensor(y_test)
    
    # Create dataloaders
    batch_size = 32
    train_dataset = TensorDataset(X_train, y_train)
    val_dataset = TensorDataset(X_val, y_val)
    test_dataset = TensorDataset(X_test, y_test)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    
    # Initialize model
    model = ECGClassifier(
        input_size=1,
        hidden_size=128,
        num_layers=2,
        num_classes=3,
        dropout=0.3
    ).to(device)
    
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=0.0001)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=5
    )
    
    print("\n" + "="*50)
    print("TRAINING ECG CLASSIFIER")
    print("="*50)
    
    best_val_acc = 0
    num_epochs = 30
    
    for epoch in range(num_epochs):
        # Training
        model.train()
        train_loss = 0
        train_correct = 0
        train_total = 0
        
        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)
            
            optimizer.zero_grad()
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            optimizer.step()
            
            train_loss += loss.item()
            _, predicted = outputs.max(1)
            train_total += y_batch.size(0)
            train_correct += predicted.eq(y_batch).sum().item()
        
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
        
        train_acc = 100. * train_correct / train_total
        val_acc = 100. * val_correct / val_total
        
        print(f"Epoch {epoch+1}/{num_epochs} | "
              f"Train Acc: {train_acc:.2f}% | "
              f"Val Acc: {val_acc:.2f}%")
        
        scheduler.step(val_loss)
        
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), 'best_ecg_model.pt')
    
    # ============================================================
    # 4. TEST EVALUATION
    # ============================================================
    
    model.load_state_dict(torch.load('best_ecg_model.pt'))
    model.eval()
    
    all_preds = []
    all_labels = []
    
    with torch.no_grad():
        for X_batch, y_batch in test_loader:
            X_batch = X_batch.to(device)
            outputs = model(X_batch)
            _, predicted = outputs.max(1)
            all_preds.extend(predicted.cpu().numpy())
            all_labels.extend(y_batch.numpy())
    
    from sklearn.metrics import classification_report, confusion_matrix
    import matplotlib.pyplot as plt
    import seaborn as sns
    
    classes = ['Normal', 'Arrhythmia', 'Abnormal']
    
    print("\n" + "="*50)
    print("ECG CLASSIFICATION RESULTS")
    print("="*50)
    print(classification_report(all_labels, all_preds, target_names=classes))
    
    # Confusion matrix
    cm = confusion_matrix(all_labels, all_preds)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Reds',
                xticklabels=classes, yticklabels=classes)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('ECG Classification - Confusion Matrix')
    plt.show()
    
    print(f"\n✅ Best Validation Accuracy: {best_val_acc:.2f}%")
    print("✅ Model saved to 'best_ecg_model.pt'")
    
    return model

if __name__ == "__main__":
    model = train_ecg_classifier()</code></pre>

        <div class="assignment-box bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mt-4">
          <h3 class="text-lg font-bold text-gray-800 mt-0">📝 Mini Project – ECG Heartbeat Classification</h3>
          <p class="font-semibold text-gray-700">Tasks:</p>
          <ol class="list-decimal list-inside text-sm space-y-1">
            <li>Load the <strong>MIT-BIH Arrhythmia</strong> dataset</li>
            <li>Preprocess ECG signals (<strong>normalize, segment</strong> into heartbeats)</li>
            <li>Build an <strong>LSTM</strong> classifier for 3 classes: Normal, Arrhythmia, Abnormal</li>
            <li>Train and <strong>evaluate</strong> the model</li>
            <li>Compare <strong>LSTM vs GRU</strong> performance on ECG data</li>
            <li>Visualize <strong>confusion matrix</strong> and <strong>classification report</strong></li>
            <li>Implement <strong>dropout</strong> and <strong>gradient clipping</strong> for regularization</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ============ 7. Cheat Sheet ============ -->
    <section class="section" id="dl-w8-t7">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">7. Cheat Sheet – Sequence Models</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-teal-800 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
                <th class="p-3 text-left border border-gray-300">Formula / Code</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">RNN</td>
                <td class="p-3">Recurrent network with hidden state</td>
                <td class="p-3 font-mono text-xs">hₜ = tanh(W·xₜ + U·hₜ₋₁)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">LSTM</td>
                <td class="p-3">Long Short-Term Memory with cell state</td>
                <td class="p-3 font-mono text-xs">nn.LSTM(input_size, hidden_size)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">GRU</td>
                <td class="p-3">Gated Recurrent Unit (simpler)</td>
                <td class="p-3 font-mono text-xs">nn.GRU(input_size, hidden_size)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Vanishing Gradient</td>
                <td class="p-3">Gradients become exponentially small</td>
                <td class="p-3 font-mono text-xs">LSTM/GRU solve this</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Exploding Gradient</td>
                <td class="p-3">Gradients become exponentially large</td>
                <td class="p-3 font-mono text-xs">clip_grad_norm_(model, 1.0)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Bidirectional</td>
                <td class="p-3">Process sequence both directions</td>
                <td class="p-3 font-mono text-xs">bidirectional=True</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Sequence Length</td>
                <td class="p-3">Number of time steps</td>
                <td class="p-3 font-mono text-xs">seq_len = 50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 8. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w8-t8">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-teal-600 pb-2">📘 Quick Revision – Sequence Models</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>RNN:</strong> Processes sequences with hidden state hₜ = f(W·xₜ + U·hₜ₋₁)</li>
          <li class="pb-3 border-b border-gray-200"><strong>LSTM:</strong> Solves vanishing gradient with <strong>cell state (C)</strong> and 3 gates: Forget, Input, Output</li>
          <li class="pb-3 border-b border-gray-200"><strong>GRU:</strong> Simplified LSTM with 2 gates: Reset, Update – <strong>faster</strong> and <strong>fewer parameters</strong></li>
          <li class="pb-3 border-b border-gray-200"><strong>Vanishing Gradient:</strong> Gradients vanish in long sequences → LSTM/GRU solve with <strong>gated memory</strong></li>
          <li class="pb-3 border-b border-gray-200"><strong>Exploding Gradient:</strong> Gradients explode → use <strong>gradient clipping</strong></li>
          <li class="pb-3 border-b border-gray-200"><strong>Time-Series:</strong> Stock, weather, electricity → use LSTM for forecasting</li>
          <li class="pb-3 border-b border-gray-200"><strong>ECG Classification:</strong> Heartbeat classification using LSTM with <strong>bidirectional</strong> processing</li>
          <li class="pb-0"><strong>Best Practice:</strong> Use <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">bidirectional LSTM</span> for classification, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">LSTM</span> for forecasting, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">GRU</span> when speed matters</li>
        </ul>
        <div class="gate-box bg-teal-50 border-l-4 border-teal-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 GATE Focus:</strong> Understand <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">RNN architecture</span>, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">vanishing/exploding gradients</span>, and how <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">LSTM/GRU gates</span> solve these problems. Know the difference between <strong>LSTM and GRU</strong> and when to use each.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">🔄 Deep Learning Bootcamp – Week 8 · Sequence Models: RNN, LSTM &amp; GRU</p>
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
    { id: 'dl-w8-t1', title: 'Why Sequence Models?' },
    { id: 'dl-w8-t2', title: 'RNN Architecture' },
    { id: 'dl-w8-t3', title: 'LSTM – Long Short-Term Memory' },
    { id: 'dl-w8-t4', title: 'GRU – Gated Recurrent Unit' },
    { id: 'dl-w8-t5', title: 'Time-Series Forecasting' },
    { id: 'dl-w8-t6', title: 'ECG Heartbeat Classification' },
    { id: 'dl-w8-t7', title: 'Cheat Sheet' },
    { id: 'dl-w8-t8', title: 'Quick Revision' },
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #0d6b6b);
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
  border: 1px solid #0d6b6b !important;
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
  border-left: 4px solid #0d6b6b !important;
}

.example-box {
  background: #f3f4f6 !important;
  border-left: 4px solid #0d6b6b !important;
}

.assignment-box {
  background: #fefce8 !important;
  border-left: 4px solid #eab308 !important;
}

/* RNN/LSTM/GRU diagrams */
.rnn-diagram,
.lstm-diagram,
.gru-diagram {
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
  .sequence-diagram .flex,
  .rnn-diagram .flex,
  .lstm-diagram .flex,
  .gru-diagram .flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>