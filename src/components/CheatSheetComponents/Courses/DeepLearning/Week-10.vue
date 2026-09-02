<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">🔮 Deep Learning – Week 10</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">Attention · Transformers · BERT · GPT · Modern AI Architecture</p>
    </header>

    <!-- ============ 1. Why Transformers? ============ -->
    <section class="section" id="dl-w10-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">1. Why Transformers?</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Problems with RNNs</h3>
            <div class="space-y-3">
              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 class="font-bold text-sm text-red-700">⚠️ Sequential Processing</h4>
                <p class="text-xs text-gray-600">Must process tokens <strong>one by one</strong> – cannot parallelize.</p>
              </div>
              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 class="font-bold text-sm text-red-700">⚠️ Long-Term Dependency</h4>
                <p class="text-xs text-gray-600">Hard to capture relationships between <strong>distant</strong> tokens.</p>
              </div>
              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 class="font-bold text-sm text-red-700">⚠️ Slow Training</h4>
                <p class="text-xs text-gray-600">No parallelization → <strong>slow</strong> on long sequences.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Transformer Advantages</h3>
            <div class="space-y-3">
              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-sm text-green-700">✅ Parallel Processing</h4>
                <p class="text-xs text-gray-600">Process <strong>all tokens simultaneously</strong> – huge speedup.</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-sm text-green-700">✅ Long-Range Dependencies</h4>
                <p class="text-xs text-gray-600">Each token can attend to <strong>every other token</strong> directly.</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-sm text-green-700">✅ Scalable</h4>
                <p class="text-xs text-gray-600">Works with <strong>very long</strong> sequences and huge models.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-table bg-gray-100 p-5 rounded-xl mt-4">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-indigo-900 text-white">
                <th class="p-3 text-left border border-gray-300">Feature</th>
                <th class="p-3 text-left border border-gray-300">RNN/LSTM</th>
                <th class="p-3 text-left border border-gray-300">Transformer</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Parallelization</td>
                <td class="p-3 text-red-600">✗ Sequential</td>
                <td class="p-3 text-green-700">✓ Fully parallel</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Long-range Dependencies</td>
                <td class="p-3 text-red-600">✗ Limited</td>
                <td class="p-3 text-green-700">✓ Direct attention</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Training Speed</td>
                <td class="p-3 text-red-600">✗ Slow</td>
                <td class="p-3 text-green-700">✓ Fast (GPU optimized)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Memory</td>
                <td class="p-3 text-green-700">✓ O(n)</td>
                <td class="p-3 text-yellow-600">⚠ O(n²)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Context Understanding</td>
                <td class="p-3 text-yellow-600">⚠ Moderate</td>
                <td class="p-3 text-green-700">✓ Excellent</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="gate-box bg-indigo-50 border-l-4 border-indigo-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Key Insight:</strong> Transformers <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">abandon recurrence</span> entirely and use <strong>attention</strong> to model relationships between all tokens, enabling <strong>parallelization</strong> and <strong>better long-range understanding</strong>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 2. Attention Mechanism ============ -->
    <section class="section" id="dl-w10-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">2. Attention Mechanism</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">How Attention Works</h3>
            <div class="attention-flow bg-gray-100 p-4 rounded-xl">
              <div class="flex flex-wrap items-center justify-center gap-2">
                <div class="text-center">
                  <div class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Query</div>
                  <span class="text-xs text-gray-500 block">What to look for</span>
                </div>
                <span class="text-2xl text-indigo-600">↓</span>
                <div class="text-center">
                  <div class="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">Compare with Keys</div>
                  <span class="text-xs text-gray-500 block">Similarity scores</span>
                </div>
                <span class="text-2xl text-indigo-600">↓</span>
                <div class="text-center">
                  <div class="bg-pink-600 text-white px-3 py-1 rounded-lg text-sm">Attention Scores</div>
                  <span class="text-xs text-gray-500 block">Softmax → weights</span>
                </div>
                <span class="text-2xl text-indigo-600">↓</span>
                <div class="text-center">
                  <div class="bg-green-600 text-white px-3 py-1 rounded-lg text-sm">Weighted Values</div>
                  <span class="text-xs text-gray-500 block">Weighted sum</span>
                </div>
              </div>
            </div>

            <div class="formula-box bg-gray-100 border-l-4 border-indigo-700 p-4 rounded-lg mt-3">
              <p class="font-bold text-gray-800 text-sm">Attention Formula:</p>
              <div class="bg-white p-2 rounded-lg font-mono text-xs">
                Attention(Q, K, V) = softmax(Q·K<sup>T</sup> / √d<sub>k</sub>) · V
              </div>
              <p class="text-xs text-gray-600 mt-1">Where Q=Query, K=Key, V=Value, d<sub>k</sub>=dimension</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Key Components</h3>
            <div class="space-y-3">
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm text-blue-700">🔍 Query (Q)</h4>
                <p class="text-xs text-gray-600">What we're <strong>looking for</strong> – represents the current token.</p>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-sm text-purple-700">🔑 Key (K)</h4>
                <p class="text-xs text-gray-600">What we're <strong>comparing against</strong> – represents each token.</p>
              </div>
              <div class="bg-pink-50 p-3 rounded-lg border-l-4 border-pink-600">
                <h4 class="font-bold text-sm text-pink-700">📊 Value (V)</h4>
                <p class="text-xs text-gray-600">What we <strong>extract</strong> – actual content of each token.</p>
              </div>
              <div class="bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-sm text-green-700">🎯 Attention Scores</h4>
                <p class="text-xs text-gray-600">How much to <strong>focus</strong> on each token (weights).</p>
              </div>
            </div>
          </div>
        </div>

        <div class="example-box bg-gray-100 border-l-4 border-indigo-600 p-5 rounded-lg mt-4">
          <p class="font-bold text-gray-800">🧠 Intuition:</p>
          <p class="text-sm text-gray-600">Imagine you're reading a sentence. <strong>Query</strong> = your current focus. <strong>Keys</strong> = all words in the sentence. <strong>Attention</strong> = how much focus each word deserves. <strong>Values</strong> = the actual meaning of each word. The output is a <strong>weighted combination</strong> of all words based on relevance.</p>
        </div>
      </div>
    </section>

    <!-- ============ 3. Self-Attention ============ -->
    <section class="section" id="dl-w10-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">3. Self-Attention &amp; Multi-Head Attention</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Self-Attention</h3>
            <p class="text-sm text-gray-600">Each token attends to <strong>every other token</strong> in the sequence.</p>
            <div class="bg-gray-100 p-4 rounded-xl mt-3">
              <div class="text-center text-xs text-gray-500">"The cat sat on the mat."</div>
              <div class="flex justify-center gap-1 mt-2">
                <span class="bg-blue-200 px-1 py-0.5 rounded text-xs">The</span>
                <span class="bg-blue-200 px-1 py-0.5 rounded text-xs">cat</span>
                <span class="bg-blue-200 px-1 py-0.5 rounded text-xs">sat</span>
                <span class="bg-blue-200 px-1 py-0.5 rounded text-xs">on</span>
                <span class="bg-blue-200 px-1 py-0.5 rounded text-xs">the</span>
                <span class="bg-blue-200 px-1 py-0.5 rounded text-xs">mat</span>
              </div>
              <div class="text-center text-xs text-gray-500 mt-2">↑ Each token can attend to all others ↑</div>
            </div>
            <div class="formula-box bg-gray-100 border-l-4 border-indigo-700 p-3 rounded-lg mt-2">
              <p class="font-mono text-xs">Self-Attention(Q, K, V) = softmax(Q·K<sup>T</sup> / √d<sub>k</sub>) · V</p>
              <p class="text-xs text-gray-500">Where Q, K, V all come from the <strong>same input</strong></p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Multi-Head Attention</h3>
            <p class="text-sm text-gray-600">Multiple attention heads in <strong>parallel</strong> to capture different relationships.</p>
            <div class="bg-gray-100 p-4 rounded-xl mt-3">
              <div class="flex flex-wrap justify-center gap-2">
                <div class="bg-blue-600 text-white px-2 py-1 rounded text-xs">Head 1</div>
                <div class="bg-purple-600 text-white px-2 py-1 rounded text-xs">Head 2</div>
                <div class="bg-pink-600 text-white px-2 py-1 rounded text-xs">Head 3</div>
                <div class="bg-green-600 text-white px-2 py-1 rounded text-xs">Head 4</div>
                <div class="bg-yellow-600 text-white px-2 py-1 rounded text-xs">Head 5</div>
                <div class="bg-red-600 text-white px-2 py-1 rounded text-xs">Head 6</div>
                <div class="bg-teal-600 text-white px-2 py-1 rounded text-xs">Head 7</div>
                <div class="bg-orange-600 text-white px-2 py-1 rounded text-xs">Head 8</div>
              </div>
              <div class="text-center text-xs text-gray-500 mt-2">↓ Concatenate &amp; Project</div>
              <div class="bg-indigo-600 text-white px-3 py-1 rounded text-center text-sm font-bold mx-auto w-fit">Output</div>
            </div>
            <div class="formula-box bg-gray-100 border-l-4 border-indigo-700 p-3 rounded-lg mt-2">
              <p class="font-mono text-xs">MultiHead(Q,K,V) = Concat(head₁, ..., head<sub>h</sub>) · W<sup>O</sup></p>
              <p class="text-xs text-gray-500">Each head: head<sub>i</sub> = Attention(Q·W<sub>i</sub><sup>Q</sup>, K·W<sub>i</sub><sup>K</sup>, V·W<sub>i</sub><sup>V</sup>)</p>
            </div>
          </div>
        </div>

        <div class="gate-box bg-indigo-50 border-l-4 border-indigo-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Why Multi-Head?</strong> Different heads learn to focus on <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">different aspects</span> – syntax, semantics, context, relationships. This makes the model <strong>more expressive</strong>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 4. Transformer Architecture ============ -->
    <section class="section" id="dl-w10-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">4. Transformer Architecture</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Encoder-Decoder Structure</h3>
            <div class="transformer-diagram bg-gray-100 p-4 rounded-xl">
              <div class="flex flex-wrap items-center justify-center gap-4">
                <div class="text-center">
                  <div class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Input</div>
                  <span class="text-xs text-gray-500 block">"Hello world"</span>
                </div>
                <span class="text-2xl text-indigo-600">→</span>
                <div class="text-center">
                  <div class="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-bold">Encoder</div>
                  <span class="text-xs text-gray-500 block">Self-Attention + FFN</span>
                  <span class="text-xs text-gray-500 block">× 6 (or 12) layers</span>
                </div>
                <span class="text-2xl text-indigo-600">→</span>
                <div class="text-center">
                  <div class="bg-pink-600 text-white px-3 py-1 rounded-lg text-sm font-bold">Decoder</div>
                  <span class="text-xs text-gray-500 block">Masked Self-Attention</span>
                  <span class="text-xs text-gray-500 block">+ Cross-Attention</span>
                </div>
                <span class="text-2xl text-indigo-600">→</span>
                <div class="text-center">
                  <div class="bg-green-600 text-white px-3 py-1 rounded-lg text-sm">Output</div>
                  <span class="text-xs text-gray-500 block">"Bonjour monde"</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Key Components</h3>
            <div class="space-y-2">
              <div class="bg-blue-50 p-2 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm text-blue-700">Positional Encoding</h4>
                <p class="text-xs text-gray-600">Adds <strong>position information</strong> since no recurrence.</p>
                <code class="text-xs bg-gray-800 text-white px-1 py-0.5 rounded">PE(pos, 2i) = sin(pos/10000<sup>2i/d</sup>)</code>
              </div>
              <div class="bg-purple-50 p-2 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-sm text-purple-700">Feed-Forward Network</h4>
                <p class="text-xs text-gray-600">FFN(x) = max(0, x·W₁ + b₁)·W₂ + b₂</p>
              </div>
              <div class="bg-pink-50 p-2 rounded-lg border-l-4 border-pink-600">
                <h4 class="font-bold text-sm text-pink-700">Layer Normalization</h4>
                <p class="text-xs text-gray-600">Normalizes across features for <strong>stable</strong> training.</p>
              </div>
              <div class="bg-green-50 p-2 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-sm text-green-700">Residual Connections</h4>
                <p class="text-xs text-gray-600">Output = Layer(x) + x (skip connection)</p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Transformer Block Details</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.nn.functional as F
import math

# ============================================================
# 1. POSITIONAL ENCODING
# ============================================================

class PositionalEncoding(nn.Module):
    """Sinusoidal positional encoding for transformer."""
    
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()
        
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * 
                            (-math.log(10000.0) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0)  # (1, max_len, d_model)
        
        self.register_buffer('pe', pe)
    
    def forward(self, x):
        # x: (batch, seq_len, d_model)
        return x + self.pe[:, :x.size(1), :]

# ============================================================
# 2. MULTI-HEAD ATTENTION
# ============================================================

class MultiHeadAttention(nn.Module):
    """Multi-Head Self-Attention."""
    
    def __init__(self, d_model, num_heads, dropout=0.1):
        super(MultiHeadAttention, self).__init__()
        
        assert d_model % num_heads == 0, "d_model must be divisible by num_heads"
        
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
        self.dropout = nn.Dropout(dropout)
    
    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        # Q, K, V: (batch, num_heads, seq_len, d_k)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        
        attention_weights = F.softmax(scores, dim=-1)
        attention_weights = self.dropout(attention_weights)
        
        output = torch.matmul(attention_weights, V)
        return output, attention_weights
    
    def forward(self, Q, K, V, mask=None):
        batch_size = Q.size(0)
        
        # Linear projections and reshape
        Q = self.W_q(Q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Apply attention
        attn_output, attn_weights = self.scaled_dot_product_attention(Q, K, V, mask)
        
        # Concatenate and project
        attn_output = attn_output.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )
        output = self.W_o(attn_output)
        
        return output, attn_weights

# ============================================================
# 3. TRANSFORMER BLOCK
# ============================================================

class TransformerBlock(nn.Module):
    """A single transformer encoder block."""
    
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super(TransformerBlock, self).__init__()
        
        self.self_attention = MultiHeadAttention(d_model, num_heads, dropout)
        self.feed_forward = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
            nn.Dropout(dropout)
        )
        
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout1 = nn.Dropout(dropout)
        self.dropout2 = nn.Dropout(dropout)
    
    def forward(self, x, mask=None):
        # Self-Attention with residual
        attn_output, _ = self.self_attention(x, x, x, mask)
        x = self.norm1(x + self.dropout1(attn_output))
        
        # Feed-Forward with residual
        ff_output = self.feed_forward(x)
        x = self.norm2(x + self.dropout2(ff_output))
        
        return x

# ============================================================
# 4. COMPLETE TRANSFORMER
# ============================================================

class TransformerEncoder(nn.Module):
    """Complete transformer encoder."""
    
    def __init__(self, vocab_size, d_model=512, num_heads=8, 
                 num_layers=6, d_ff=2048, max_len=5000, dropout=0.1):
        super(TransformerEncoder, self).__init__()
        
        self.embedding = nn.Embedding(vocab_size, d_model, padding_idx=0)
        self.positional_encoding = PositionalEncoding(d_model, max_len)
        self.dropout = nn.Dropout(dropout)
        
        self.layers = nn.ModuleList([
            TransformerBlock(d_model, num_heads, d_ff, dropout)
            for _ in range(num_layers)
        ])
        
        self.d_model = d_model
    
    def forward(self, x, mask=None):
        # x: (batch, seq_len) token indices
        x = self.embedding(x) * math.sqrt(self.d_model)
        x = self.positional_encoding(x)
        x = self.dropout(x)
        
        for layer in self.layers:
            x = layer(x, mask)
        
        return x</code></pre>

        <div class="gate-box bg-indigo-50 border-l-4 border-indigo-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 Key Architecture Insights:</strong></p>
          <ul class="text-sm space-y-1">
            <li><span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Positional Encoding</span> adds order information</li>
            <li><span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Residual Connections</span> enable deep training</li>
            <li><span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Layer Normalization</span> stabilizes training</li>
            <li>Encoder processes <strong>all tokens simultaneously</strong> → parallelization!</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ 5. BERT, GPT & Transformers ============ -->
    <section class="section" id="dl-w10-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">5. BERT, GPT &amp; Modern Transformers</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-blue-700 mt-0">BERT</h3>
            <p class="text-xs text-gray-600"><strong>Bidirectional Encoder Representations from Transformers</strong></p>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Encoder-only</strong> architecture</li>
              <li><strong>Bidirectional</strong> – sees left + right context</li>
              <li>Masked Language Modeling (MLM)</li>
              <li>Used for: Classification, QA, NER</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">bert-base-uncased</code>
          </div>
          <div class="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-600">
            <h3 class="text-lg font-bold text-purple-700 mt-0">GPT</h3>
            <p class="text-xs text-gray-600"><strong>Generative Pre-trained Transformer</strong></p>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Decoder-only</strong> architecture</li>
              <li><strong>Autoregressive</strong> – left-to-right only</li>
              <li>Causal Language Modeling (CLM)</li>
              <li>Used for: Generation, Chat, Completion</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">gpt2</code>
          </div>
          <div class="bg-green-50 p-4 rounded-xl border-l-4 border-green-600">
            <h3 class="text-lg font-bold text-green-700 mt-0">ViT / T5</h3>
            <p class="text-xs text-gray-600"><strong>Vision Transformer / Text-to-Text</strong></p>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>ViT</strong>: Transformers for images</li>
              <li><strong>T5</strong>: Text-to-Text Transfer</li>
              <li>Unified framework</li>
              <li>Used for: Vision, Translation, Summarization</li>
            </ul>
            <code class="block bg-gray-800 text-white px-2 py-1 rounded text-xs mt-2 font-mono">google/vit-base-patch16-224</code>
          </div>
        </div>

        <div class="comparison-table bg-gray-100 p-5 rounded-xl mt-4">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-indigo-900 text-white">
                <th class="p-3 text-left border border-gray-300">Feature</th>
                <th class="p-3 text-left border border-gray-300">BERT</th>
                <th class="p-3 text-left border border-gray-300">GPT</th>
                <th class="p-3 text-left border border-gray-300">T5</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Architecture</td>
                <td class="p-3">Encoder</td>
                <td class="p-3">Decoder</td>
                <td class="p-3">Encoder-Decoder</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Direction</td>
                <td class="p-3">Bidirectional</td>
                <td class="p-3">Left-to-Right</td>
                <td class="p-3">Both</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Training Objective</td>
                <td class="p-3">MLM + NSP</td>
                <td class="p-3">Causal LM</td>
                <td class="p-3">Text-to-Text</td>
              </tr>
              <tr class="border border-gray-300 even:bg-white">
                <td class="p-3 font-bold">Best For</td>
                <td class="p-3">Understanding</td>
                <td class="p-3">Generation</td>
                <td class="p-3">Both</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="gate-box bg-indigo-50 border-l-4 border-indigo-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Key Insight:</strong> <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">BERT</span> excels at <strong>understanding</strong> (classification, QA), <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">GPT</span> excels at <strong>generation</strong> (text completion, chat), and <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">T5</span> provides a <strong>unified</strong> text-to-text framework.</p>
        </div>
      </div>
    </section>

    <!-- ============ 6. Transformer-based Classifier ============ -->
    <section class="section" id="dl-w10-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">6. Transformer-based Text Classifier</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🔮</span>
            <p class="font-bold text-gray-800">BERT</p>
            <p class="text-xs text-gray-600">Pre-trained Transformer</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">📝</span>
            <p class="font-bold text-gray-800">Fine-tuning</p>
            <p class="text-xs text-gray-600">Adapt to your task</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🎯</span>
            <p class="font-bold text-gray-800">Classification</p>
            <p class="text-xs text-gray-600">Sentiment / Categories</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">BERT-based Classifier</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel, BertForSequenceClassification
from transformers import Trainer, TrainingArguments
from torch.utils.data import DataLoader, Dataset
import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# ============================================================
# 1. SETUP & LOAD PRETRAINED MODEL
# ============================================================

# Load tokenizer and model
model_name = "bert-base-uncased"
tokenizer = BertTokenizer.from_pretrained(model_name)

# Option 1: Use pre-built classification model
model = BertForSequenceClassification.from_pretrained(
    model_name,
    num_labels=2,  # Binary classification
    output_attentions=False,
    output_hidden_states=False
)

# Option 2: Custom model with BERT backbone
class BertClassifier(nn.Module):
    """Custom BERT-based classifier."""
    
    def __init__(self, num_classes=2, dropout=0.3):
        super(BertClassifier, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.dropout = nn.Dropout(dropout)
        self.fc = nn.Linear(self.bert.config.hidden_size, num_classes)
    
    def forward(self, input_ids, attention_mask):
        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        pooled_output = outputs.pooler_output
        pooled_output = self.dropout(pooled_output)
        return self.fc(pooled_output)

# ============================================================
# 2. DATASET CLASS
# ============================================================

class TextClassificationDataset(Dataset):
    """Dataset for text classification with BERT."""
    
    def __init__(self, texts, labels, tokenizer, max_len=128):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len
    
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        
        encoding = self.tokenizer(
            text,
            truncation=True,
            padding='max_length',
            max_length=self.max_len,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

# ============================================================
# 3. DATA PREPARATION
# ============================================================

def prepare_data(texts, labels, tokenizer, max_len=128, train_split=0.8):
    """Prepare data for BERT training."""
    from sklearn.model_selection import train_test_split
    
    X_train, X_test, y_train, y_test = train_test_split(
        texts, labels, test_size=0.2, random_state=42, stratify=labels
    )
    
    train_dataset = TextClassificationDataset(X_train, y_train, tokenizer, max_len)
    test_dataset = TextClassificationDataset(X_test, y_test, tokenizer, max_len)
    
    return train_dataset, test_dataset

# ============================================================
# 4. TRAINING WITH TRAINER API
# ============================================================

def train_with_trainer(model, train_dataset, val_dataset, num_epochs=3):
    """Train using Hugging Face Trainer API."""
    
    # Define training arguments
    training_args = TrainingArguments(
        output_dir='./results',
        num_train_epochs=num_epochs,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=64,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
        logging_steps=10,
        evaluation_strategy='epoch',
        save_strategy='epoch',
        load_best_model_at_end=True,
        metric_for_best_model='accuracy'
    )
    
    # Define metrics
    def compute_metrics(pred):
        labels = pred.label_ids
        preds = pred.predictions.argmax(-1)
        precision, recall, f1, _ = precision_recall_fscore_support(
            labels, preds, average='binary'
        )
        acc = accuracy_score(labels, preds)
        return {
            'accuracy': acc,
            'f1': f1,
            'precision': precision,
            'recall': recall
        }
    
    # Create Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics
    )
    
    # Train
    trainer.train()
    
    return trainer

# ============================================================
# 5. CUSTOM TRAINING LOOP
# ============================================================

def train_custom(model, train_loader, val_loader, num_epochs=3, lr=2e-5):
    """Custom training loop for BERT fine-tuning."""
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr)
    criterion = nn.CrossEntropyLoss()
    
    best_val_acc = 0
    
    for epoch in range(num_epochs):
        # Training
        model.train()
        train_loss = 0
        train_correct = 0
        train_total = 0
        
        for batch in train_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            optimizer.zero_grad()
            outputs = model(input_ids, attention_mask)
            loss = criterion(outputs, labels)
            loss.backward()
            
            # Gradient clipping for stability
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            
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
            for batch in val_loader:
                input_ids = batch['input_ids'].to(device)
                attention_mask = batch['attention_mask'].to(device)
                labels = batch['labels'].to(device)
                
                outputs = model(input_ids, attention_mask)
                loss = criterion(outputs, labels)
                
                val_loss += loss.item()
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()
        
        train_acc = 100. * train_correct / train_total
        val_acc = 100. * val_correct / val_total
        
        print(f"Epoch {epoch+1}/{num_epochs} | "
              f"Train Acc: {train_acc:.2f}% | "
              f"Val Acc: {val_acc:.2f}%")
        
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), 'best_bert_model.pt')
    
    return model

# ============================================================
# 6. MAIN EXECUTION
# ============================================================

def main():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")
    
    # Sample data (you would load from a real dataset)
    texts = [
        "I love this product! It's amazing and works perfectly.",
        "This is terrible, I hate it with a passion.",
        "The quality is excellent, highly recommend to everyone.",
        "Worst purchase ever, very disappointed with the quality.",
        "Absolutely fantastic, best thing I've ever bought!",
        "Horrible experience, would never buy again.",
        # ... more samples
    ]
    labels = [1, 0, 1, 0, 1, 0]  # 1 = positive, 0 = negative
    
    print("\n" + "="*50)
    print("BERT-BASED TEXT CLASSIFICATION")
    print("="*50)
    
    # Option A: Use Hugging Face Trainer
    print("\nOption A: Using HF Trainer API")
    train_dataset, val_dataset = prepare_data(texts, labels, tokenizer, max_len=128)
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
    trainer = train_with_trainer(model, train_dataset, val_dataset, num_epochs=3)
    
    # Option B: Custom training loop
    print("\nOption B: Custom Training Loop")
    from torch.utils.data import DataLoader
    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=16, shuffle=False)
    
    custom_model = BertClassifier(num_classes=2)
    trained_model = train_custom(custom_model, train_loader, val_loader, num_epochs=3)
    
    # ============================================================
    # 7. INFERENCE
    # ============================================================
    
    def predict_text(text, model, tokenizer, max_len=128, device='cpu'):
        """Predict class for a single text."""
        model.eval()
        model.to(device)
        
        encoding = tokenizer(
            text,
            truncation=True,
            padding='max_length',
            max_length=max_len,
            return_tensors='pt'
        )
        
        input_ids = encoding['input_ids'].to(device)
        attention_mask = encoding['attention_mask'].to(device)
        
        with torch.no_grad():
            outputs = model(input_ids, attention_mask)
            probs = F.softmax(outputs, dim=1)
            _, predicted = outputs.max(1)
        
        sentiment = "Positive" if predicted.item() == 1 else "Negative"
        confidence = probs[0][predicted.item()].item() * 100
        
        return sentiment, confidence
    
    print("\n" + "="*50)
    print("PREDICTIONS")
    print("="*50)
    
    test_texts = [
        "I absolutely love this product, it's fantastic!",
        "This is the worst product I have ever used.",
        "Great quality and amazing value for money."
    ]
    
    for text in test_texts:
        sentiment, confidence = predict_text(
            text, trained_model, tokenizer, device=device
        )
        print(f"Text: {text[:50]}...")
        print(f"Sentiment: {sentiment} ({confidence:.2f}%)\n")
    
    return trained_model

if __name__ == "__main__":
    model = main()</code></pre>

        <div class="assignment-box bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mt-4">
          <h3 class="text-lg font-bold text-gray-800 mt-0">📝 Assignment – Transformer Classifier</h3>
          <p class="font-semibold text-gray-700">Tasks:</p>
          <ol class="list-decimal list-inside text-sm space-y-1">
            <li>Load a <strong>pre-trained Transformer</strong> (BERT, DistilBERT, or RoBERTa)</li>
            <li>Build a <strong>text classifier</strong> for your chosen dataset</li>
            <li>Implement both <strong>Trainer API</strong> and <strong>custom training loop</strong></li>
            <li>Compare <strong>BERT base</strong> vs <strong>DistilBERT</strong> (smaller, faster)</li>
            <li>Experiment with <strong>learning rate</strong> and <strong>batch size</strong></li>
            <li>Report <strong>accuracy, precision, recall, F1-score</strong></li>
            <li>Visualize <strong>attention weights</strong> from the model</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ============ 7. Cheat Sheet ============ -->
    <section class="section" id="dl-w10-t7">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">7. Cheat Sheet – Attention &amp; Transformers</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-indigo-800 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
                <th class="p-3 text-left border border-gray-300">Formula / Code</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Attention</td>
                <td class="p-3">Weighted sum of values based on similarity</td>
                <td class="p-3 font-mono text-xs">Attn(Q,K,V) = softmax(QKᵀ/√d)·V</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Self-Attention</td>
                <td class="p-3">Attention where Q, K, V from same input</td>
                <td class="p-3 font-mono text-xs">Self-Attention(X, X, X)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Multi-Head</td>
                <td class="p-3">Parallel attention heads, concatenated</td>
                <td class="p-3 font-mono text-xs">Concat(head₁, ..., headₕ)Wᵒ</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Positional Encoding</td>
                <td class="p-3">Adds position information</td>
                <td class="p-3 font-mono text-xs">sin/cos positional embeddings</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">BERT</td>
                <td class="p-3">Bidirectional Encoder</td>
                <td class="p-3 font-mono text-xs">bert-base-uncased</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">GPT</td>
                <td class="p-3">Autoregressive Decoder</td>
                <td class="p-3 font-mono text-xs">gpt2</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">T5</td>
                <td class="p-3">Text-to-Text Transfer</td>
                <td class="p-3 font-mono text-xs">t5-small</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 8. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w10-t8">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-indigo-600 pb-2">📘 Quick Revision – Attention &amp; Transformers</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>Why Transformers?</strong> Parallelization, long-range dependencies, faster training than RNNs</li>
          <li class="pb-3 border-b border-gray-200"><strong>Attention:</strong> Query, Key, Value → softmax(QKᵀ/√d)·V</li>
          <li class="pb-3 border-b border-gray-200"><strong>Self-Attention:</strong> Each token attends to all tokens in the sequence</li>
          <li class="pb-3 border-b border-gray-200"><strong>Multi-Head:</strong> Multiple attention heads in parallel → richer representations</li>
          <li class="pb-3 border-b border-gray-200"><strong>Transformer:</strong> Encoder/Decoder with self-attention, FFN, residual connections</li>
          <li class="pb-3 border-b border-gray-200"><strong>BERT:</strong> Bidirectional (understanding) – MLM + NSP</li>
          <li class="pb-3 border-b border-gray-200"><strong>GPT:</strong> Autoregressive (generation) – causal LM</li>
          <li class="pb-0"><strong>Best Practice:</strong> Use <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">pre-trained models</span> and <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">fine-tune</span> on your data. Start with <strong>DistilBERT</strong> for speed, use <strong>BERT</strong> for accuracy, and <strong>GPT</strong> for generation.</li>
        </ul>
        <div class="gate-box bg-indigo-50 border-l-4 border-indigo-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 GATE Focus:</strong> Understand <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">attention mechanism</span> mathematically. Know the <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Transformer architecture</span> components and why <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">transformers replaced RNNs</span>. Be able to compare <strong>BERT</strong> and <strong>GPT</strong> architectures.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">🔮 Deep Learning Bootcamp – Week 10 · Attention &amp; Transformers</p>
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
    { id: 'dl-w10-t1', title: 'Why Transformers?' },
    { id: 'dl-w10-t2', title: 'Attention Mechanism' },
    { id: 'dl-w10-t3', title: 'Self-Attention & Multi-Head' },
    { id: 'dl-w10-t4', title: 'Transformer Architecture' },
    { id: 'dl-w10-t5', title: 'BERT, GPT & Modern Models' },
    { id: 'dl-w10-t6', title: 'BERT-based Classifier' },
    { id: 'dl-w10-t7', title: 'Cheat Sheet' },
    { id: 'dl-w10-t8', title: 'Quick Revision' },
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

/* Boxes */
.gate-box {
  background: #eef2ff !important;
  border-left: 4px solid #3730a3 !important;
}

.example-box {
  background: #f3f4f6 !important;
  border-left: 4px solid #3730a3 !important;
}

.assignment-box {
  background: #fefce8 !important;
  border-left: 4px solid #eab308 !important;
}

/* Diagrams */
.attention-flow,
.transformer-diagram {
  background: #eef2ff !important;
}

.comparison-table {
  background: #f3f4f6 !important;
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
  .attention-flow .flex,
  .transformer-diagram .flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>