<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1 class="text-4xl md:text-5xl font-bold">📝 Deep Learning – Week 9</h1>
      <p class="subtitle text-lg md:text-xl mt-2 opacity-90">NLP with Deep Learning · Tokenization · Embeddings · Sentiment Analysis</p>
    </header>

    <!-- ============ 1. NLP Pipeline ============ -->
    <section class="section" id="dl-w9-t1">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amber-600 pb-2">1. NLP Pipeline</h2>
      <div class="content-card">
        <div class="pipeline-flow bg-gray-100 p-6 rounded-xl">
          <div class="flex flex-wrap items-center justify-center gap-2">
            <div class="text-center">
              <div class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Raw Text</div>
              <span class="text-xs text-gray-500 block">"Great product!"</span>
            </div>
            <span class="text-2xl text-amber-600">→</span>
            <div class="text-center">
              <div class="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Cleaning</div>
              <span class="text-xs text-gray-500 block">Lowercase, remove punctuation</span>
            </div>
            <span class="text-2xl text-amber-600">→</span>
            <div class="text-center">
              <div class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Tokenization</div>
              <span class="text-xs text-gray-500 block">["great", "product"]</span>
            </div>
            <span class="text-2xl text-amber-600">→</span>
            <div class="text-center">
              <div class="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Vocabulary</div>
              <span class="text-xs text-gray-500 block">{great: 1, product: 2}</span>
            </div>
            <span class="text-2xl text-amber-600">→</span>
            <div class="text-center">
              <div class="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Embedding</div>
              <span class="text-xs text-gray-500 block">[0.2, 0.5, ...]</span>
            </div>
            <span class="text-2xl text-amber-600">→</span>
            <div class="text-center">
              <div class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Neural Network</div>
              <span class="text-xs text-gray-500 block">LSTM / GRU</span>
            </div>
            <span class="text-2xl text-amber-600">→</span>
            <div class="text-center">
              <div class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Prediction</div>
              <span class="text-xs text-gray-500 block">Positive / Negative</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h4 class="font-bold text-gray-800 text-sm">Tokenization</h4>
            <p class="text-xs text-gray-600">Splitting text into <strong>tokens</strong> (words, subwords, characters).</p>
            <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">"I love NLP" → ["I", "love", "NLP"]</code>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h4 class="font-bold text-gray-800 text-sm">Vocabulary</h4>
            <p class="text-xs text-gray-600">Map each unique token to an <strong>integer index</strong>.</p>
            <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">{'I': 1, 'love': 2, 'NLP': 3}</code>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h4 class="font-bold text-gray-800 text-sm">Padding</h4>
            <p class="text-xs text-gray-600">Make all sequences the <strong>same length</strong>.</p>
            <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">[1, 2, 3] → [1, 2, 3, 0, 0]</code>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
            <h4 class="font-bold text-gray-800 text-sm">Embedding</h4>
            <p class="text-xs text-gray-600">Convert integer tokens to <strong>dense vectors</strong>.</p>
            <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">1 → [0.1, 0.3, -0.2, ...]</code>
          </div>
        </div>

        <div class="gate-box bg-amber-50 border-l-4 border-amber-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Key Insight:</strong> NLP pipeline converts <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">unstructured text</span> into <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">structured numerical data</span> that neural networks can process.</p>
        </div>
      </div>
    </section>

    <!-- ============ 2. Tokenization & Vocab ============ -->
    <section class="section" id="dl-w9-t2">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amber-600 pb-2">2. Tokenization &amp; Vocabulary Building</h2>
      <div class="content-card">
        <h3 class="text-xl font-bold text-gray-800 mt-0">PyTorch Implementation</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
from torchtext.data.utils import get_tokenizer
from collections import Counter
import numpy as np

# ============================================================
# 1. TOKENIZATION
# ============================================================

def tokenize_text(texts, tokenizer='basic_english'):
    """Tokenize a list of texts."""
    if tokenizer == 'basic_english':
        tokenizer = get_tokenizer('basic_english')
    elif tokenizer == 'spacy':
        from torchtext.data.utils import get_tokenizer
        tokenizer = get_tokenizer('spacy', language='en_core_web_sm')
    
    return [tokenizer(text.lower()) for text in texts]

# ============================================================
# 2. BUILD VOCABULARY
# ============================================================

def build_vocab(tokenized_texts, min_freq=2, max_size=10000):
    """Build vocabulary from tokenized texts."""
    # Flatten all tokens
    all_tokens = [token for text in tokenized_texts for token in text]
    
    # Count frequencies
    counter = Counter(all_tokens)
    
    # Create vocab: special tokens first
    vocab = {
        '&lt;PAD&gt;': 0,   # Padding
        '&lt;UNK&gt;': 1,    # Unknown
        '&lt;BOS&gt;': 2,    # Beginning of sequence
        '&lt;EOS&gt;': 3     # End of sequence
    }
    
    # Add frequent tokens
    for token, freq in counter.most_common(max_size):
        if freq >= min_freq and token not in vocab:
            vocab[token] = len(vocab)
    
    # Create reverse mapping
    idx_to_token = {idx: token for token, idx in vocab.items()}
    
    return vocab, idx_to_token

# ============================================================
# 3. TEXT TO SEQUENCES
# ============================================================

def text_to_sequence(text, vocab, tokenizer, max_len=None):
    """Convert text to sequence of indices."""
    tokens = tokenizer(text.lower())
    
    # Convert to indices
    indices = [vocab.get(token, vocab['&lt;UNK&gt;']) for token in tokens]
    
    # Add BOS/EOS
    indices = [vocab['&lt;BOS&gt;']] + indices + [vocab['&lt;EOS&gt;']]
    
    # Pad or truncate
    if max_len:
        if len(indices) > max_len:
            indices = indices[:max_len]
        else:
            indices = indices + [vocab['&lt;PAD&gt;']] * (max_len - len(indices))
    
    return indices

def texts_to_sequences(texts, vocab, tokenizer, max_len=None):
    """Convert list of texts to sequences."""
    return [text_to_sequence(text, vocab, tokenizer, max_len) for text in texts]

# ============================================================
# 4. PADDING
# ============================================================

def pad_sequences(sequences, max_len=None, pad_value=0):
    """Pad sequences to max_len."""
    if max_len is None:
        max_len = max(len(seq) for seq in sequences)
    
    padded = []
    for seq in sequences:
        if len(seq) > max_len:
            padded.append(seq[:max_len])
        else:
            padded.append(seq + [pad_value] * (max_len - len(seq)))
    
    return np.array(padded)

# ============================================================
# 5. COMPLETE PREPROCESSING PIPELINE
# ============================================================

class TextPreprocessor:
    """Complete text preprocessing pipeline."""
    
    def __init__(self, max_vocab=10000, min_freq=2, max_len=100):
        self.max_vocab = max_vocab
        self.min_freq = min_freq
        self.max_len = max_len
        self.tokenizer = get_tokenizer('basic_english')
        self.vocab = None
        self.idx_to_token = None
    
    def fit(self, texts):
        """Build vocabulary from texts."""
        tokenized = [self.tokenizer(text.lower()) for text in texts]
        self.vocab, self.idx_to_token = build_vocab(
            tokenized, 
            min_freq=self.min_freq, 
            max_size=self.max_vocab
        )
        return self
    
    def transform(self, texts):
        """Convert texts to padded sequences."""
        sequences = texts_to_sequences(
            texts, 
            self.vocab, 
            self.tokenizer, 
            self.max_len
        )
        return pad_sequences(sequences, self.max_len, self.vocab['&lt;PAD&gt;'])
    
    def fit_transform(self, texts):
        """Fit vocabulary and transform texts."""
        return self.fit(texts).transform(texts)
    
    def decode(self, indices):
        """Convert indices back to tokens."""
        tokens = []
        for idx in indices:
            if idx == self.vocab['&lt;PAD&gt;']:
                break
            if idx in self.idx_to_token:
                tokens.append(self.idx_to_token[idx])
        return ' '.join(tokens)

# ============================================================
# 6. EXAMPLE USAGE
# ============================================================

def example_usage():
    texts = [
        "I love this product! It's amazing.",
        "This is terrible, I hate it.",
        "The quality is excellent, highly recommend.",
        "Worst purchase ever, very disappointed."
    ]
    labels = [1, 0, 1, 0]  # 1 = positive, 0 = negative
    
    # Preprocess
    preprocessor = TextPreprocessor(max_vocab=100, min_freq=1, max_len=20)
    X = preprocessor.fit_transform(texts)
    
    print("Vocab size:", len(preprocessor.vocab))
    print("Input shape:", X.shape)
    print("\nSample sequence:")
    print(preprocessor.decode(X[0]))
    print("Indices:", X[0])
    
    return X, labels, preprocessor

if __name__ == "__main__":
    X, labels, preprocessor = example_usage()</code></pre>
      </div>
    </section>

    <!-- ============ 3. Word Embeddings ============ -->
    <section class="section" id="dl-w9-t3">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amber-600 pb-2">3. Word Embeddings</h2>
      <div class="content-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">What are Word Embeddings?</h3>
            <p class="text-sm text-gray-600">Dense vector representations of words that capture <strong>semantic meaning</strong>.</p>
            <div class="bg-gray-100 p-4 rounded-xl mt-3">
              <div class="flex flex-wrap items-center gap-2">
                <span class="bg-blue-100 px-2 py-1 rounded text-xs font-mono">"king"</span>
                <span class="text-gray-400">→</span>
                <span class="bg-purple-100 px-2 py-1 rounded text-xs font-mono">[0.2, 0.5, -0.1, 0.8, ...]</span>
              </div>
              <div class="flex flex-wrap items-center gap-2 mt-1">
                <span class="bg-blue-100 px-2 py-1 rounded text-xs font-mono">"queen"</span>
                <span class="text-gray-400">→</span>
                <span class="bg-purple-100 px-2 py-1 rounded text-xs font-mono">[0.3, 0.4, 0.0, 0.7, ...]</span>
              </div>
              <p class="text-xs text-gray-500 mt-2">Similar words have <strong>similar vectors</strong> (cosine similarity).</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mt-0">Popular Embeddings</h3>
            <div class="space-y-2">
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm">Word2Vec</h4>
                <p class="text-xs text-gray-600">Predicts <strong>context</strong> words (CBOW) or <strong>target</strong> word (Skip-gram).</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">gensim.models.Word2Vec</code>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm">GloVe</h4>
                <p class="text-xs text-gray-600">Global Vectors – uses <strong>co-occurrence statistics</strong>.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">torchtext.vocab.GloVe</code>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-sm">FastText</h4>
                <p class="text-xs text-gray-600">Character-level <strong>subword</strong> embeddings.</p>
                <code class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">fasttext.load_model</code>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Embedding Layer in PyTorch</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch.nn as nn
import torch.nn.functional as F
from torchtext.vocab import GloVe

# ============================================================
# 1. TRAINABLE EMBEDDING LAYER
# ============================================================

class EmbeddingLayer(nn.Module):
    """Learnable embedding layer from scratch."""
    
    def __init__(self, vocab_size, embedding_dim, padding_idx=0):
        super(EmbeddingLayer, self).__init__()
        self.embedding = nn.Embedding(
            num_embeddings=vocab_size,
            embedding_dim=embedding_dim,
            padding_idx=padding_idx
        )
        self.embedding_dim = embedding_dim
    
    def forward(self, x):
        # x: (batch, seq_len) indices
        return self.embedding(x)  # (batch, seq_len, embedding_dim)

# ============================================================
# 2. PRE-TRAINED GLOVE EMBEDDINGS
# ============================================================

class GloVeEmbedding(nn.Module):
    """Use pre-trained GloVe embeddings."""
    
    def __init__(self, vocab, embedding_dim=100, padding_idx=0, freeze=True):
        super(GloVeEmbedding, self).__init__()
        
        # Load GloVe
        glove = GloVe(name='6B', dim=embedding_dim)
        
        # Create embedding matrix
        self.embedding_dim = embedding_dim
        self.vocab_size = len(vocab)
        
        embedding_matrix = torch.zeros(self.vocab_size, embedding_dim)
        
        for token, idx in vocab.items():
            if token in glove.stoi:
                embedding_matrix[idx] = glove.vectors[glove.stoi[token]]
            else:
                embedding_matrix[idx] = torch.randn(embedding_dim) * 0.01
        
        # Padding vector should be zeros
        embedding_matrix[padding_idx] = torch.zeros(embedding_dim)
        
        self.embedding = nn.Embedding.from_pretrained(
            embedding_matrix,
            freeze=freeze,  # True = don't update during training
            padding_idx=padding_idx
        )
    
    def forward(self, x):
        return self.embedding(x)

# ============================================================
# 3. COMBINED MODEL WITH EMBEDDINGS
# ============================================================

class SentimentModel(nn.Module):
    """Complete sentiment model with embedding layer."""
    
    def __init__(self, vocab_size, embedding_dim=100, hidden_size=128, 
                 num_layers=2, num_classes=2, dropout=0.3, use_pretrained=False):
        super(SentimentModel, self).__init__()
        
        # Embedding layer
        if use_pretrained:
            # Use GloVe
            glove = GloVe(name='6B', dim=embedding_dim)
            embedding_matrix = torch.zeros(vocab_size, embedding_dim)
            # ... (fill embedding matrix)
            self.embedding = nn.Embedding.from_pretrained(embedding_matrix, freeze=False)
        else:
            self.embedding = nn.Embedding(vocab_size, embedding_dim)
        
        # LSTM layers
        self.lstm = nn.LSTM(
            input_size=embedding_dim,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
            bidirectional=True
        )
        
        self.dropout = nn.Dropout(dropout)
        self.fc = nn.Linear(hidden_size * 2, num_classes)  # *2 for bidirectional
    
    def forward(self, x):
        # x: (batch, seq_len) token indices
        embedded = self.embedding(x)  # (batch, seq_len, embedding_dim)
        lstm_out, (h_n, c_n) = self.lstm(embedded)
        
        # Use last hidden state (concatenate forward/backward)
        last_hidden = torch.cat((h_n[-2], h_n[-1]), dim=1)
        last_hidden = self.dropout(last_hidden)
        output = self.fc(last_hidden)
        
        return output</code></pre>

        <div class="gate-box bg-amber-50 border-l-4 border-amber-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🔑 Key Insight:</strong> <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">Pre-trained embeddings</span> (GloVe, Word2Vec) capture <strong>semantic relationships</strong> and improve performance, especially with <strong>limited data</strong>.</p>
        </div>
      </div>
    </section>

    <!-- ============ 4. Sentiment Analysis ============ -->
    <section class="section" id="dl-w9-t4">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amber-600 pb-2">4. Sentiment Analysis – Complete Implementation</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">😊</span>
            <p class="font-bold text-gray-800">Positive</p>
            <p class="text-xs text-gray-600">"Excellent product!"</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">😞</span>
            <p class="font-bold text-gray-800">Negative</p>
            <p class="text-xs text-gray-600">"Terrible experience."</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🎯</span>
            <p class="font-bold text-gray-800">Goal</p>
            <p class="text-xs text-gray-600">Classify sentiment from text</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Complete Sentiment Classifier</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================================
# 1. DATA PREPARATION
# ============================================================

def load_sentiment_data():
    """Load sample sentiment data."""
    # Sample data (you would load from a real dataset)
    texts = [
        "I love this product! It's amazing and works perfectly.",
        "This is terrible, I hate it with a passion.",
        "The quality is excellent, highly recommend to everyone.",
        "Worst purchase ever, very disappointed with the quality.",
        "Absolutely fantastic, best thing I've ever bought!",
        "Horrible experience, would never buy again.",
        "Great value for money, very satisfied with my purchase.",
        "Complete waste of money, don't buy this product.",
        "Works as expected, good quality product.",
        "Extremely poor quality, broke after one use.",
        "Really happy with this purchase, highly recommended.",
        "Disappointing, not worth the price at all.",
        "Perfect for my needs, very satisfied.",
        "Terrible customer service and poor product quality.",
        "Excellent quality, fast shipping, great experience."
    ]
    labels = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
    return texts, labels

# ============================================================
# 2. PREPROCESSING
# ============================================================

from torchtext.data.utils import get_tokenizer

def prepare_data(texts, labels, max_len=50, max_vocab=10000):
    """Prepare data for sentiment classification."""
    tokenizer = get_tokenizer('basic_english')
    
    # Build vocabulary
    all_tokens = []
    for text in texts:
        tokens = tokenizer(text.lower())
        all_tokens.extend(tokens)
    
    from collections import Counter
    counter = Counter(all_tokens)
    
    vocab = {'&lt;PAD&gt;': 0, '&lt;UNK&gt;': 1}
    for token, freq in counter.most_common(max_vocab - 2):
        if freq >= 2:
            vocab[token] = len(vocab)
    
    # Convert texts to sequences
    sequences = []
    for text in texts:
        tokens = tokenizer(text.lower())
        indices = [vocab.get(token, vocab['&lt;UNK&gt;']) for token in tokens]
        
        # Pad/truncate
        if len(indices) > max_len:
            indices = indices[:max_len]
        else:
            indices = indices + [vocab['&lt;PAD&gt;']] * (max_len - len(indices))
        
        sequences.append(indices)
    
    X = np.array(sequences)
    y = np.array(labels)
    
    return X, y, vocab

# ============================================================
# 3. SENTIMENT MODEL
# ============================================================

class SentimentLSTM(nn.Module):
    """LSTM-based sentiment classifier."""
    
    def __init__(self, vocab_size, embedding_dim=100, hidden_size=128,
                 num_layers=2, num_classes=2, dropout=0.3):
        super(SentimentLSTM, self).__init__()
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=0)
        self.embedding.weight.data.uniform_(-0.1, 0.1)
        
        self.lstm = nn.LSTM(
            input_size=embedding_dim,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
            bidirectional=True
        )
        
        self.dropout = nn.Dropout(dropout)
        self.fc1 = nn.Linear(hidden_size * 2, 64)
        self.fc2 = nn.Linear(64, num_classes)
    
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, (h_n, c_n) = self.lstm(embedded)
        
        # Concatenate forward and backward hidden states
        last_hidden = torch.cat((h_n[-2], h_n[-1]), dim=1)
        last_hidden = self.dropout(last_hidden)
        
        x = F.relu(self.fc1(last_hidden))
        x = self.dropout(x)
        return self.fc2(x)

# ============================================================
# 4. TRAINING LOOP
# ============================================================

def train_sentiment_model():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")
    
    # Load data
    texts, labels = load_sentiment_data()
    X, y, vocab = prepare_data(texts, labels, max_len=20)
    
    # Split data
    X_train, X_temp, y_train, y_temp = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp
    )
    
    # Convert to tensors
    X_train = torch.LongTensor(X_train)
    y_train = torch.LongTensor(y_train)
    X_val = torch.LongTensor(X_val)
    y_val = torch.LongTensor(y_val)
    X_test = torch.LongTensor(X_test)
    y_test = torch.LongTensor(y_test)
    
    # Create dataloaders
    batch_size = 8
    train_dataset = TensorDataset(X_train, y_train)
    val_dataset = TensorDataset(X_val, y_val)
    test_dataset = TensorDataset(X_test, y_test)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    
    # Initialize model
    model = SentimentLSTM(
        vocab_size=len(vocab),
        embedding_dim=50,
        hidden_size=64,
        num_layers=2,
        num_classes=2,
        dropout=0.3
    ).to(device)
    
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=0.0001)
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=5
    )
    
    print("\n" + "="*50)
    print("TRAINING SENTIMENT CLASSIFIER")
    print("="*50)
    print(f"Vocab size: {len(vocab)}")
    print(f"Train samples: {len(X_train)}")
    print(f"Val samples: {len(X_val)}")
    print(f"Test samples: {len(X_test)}")
    
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
            torch.save(model.state_dict(), 'best_sentiment_model.pt')
    
    # ============================================================
    # 5. TEST EVALUATION
    # ============================================================
    
    model.load_state_dict(torch.load('best_sentiment_model.pt'))
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
    
    print("\n" + "="*50)
    print("TEST SET PERFORMANCE")
    print("="*50)
    print(f"Accuracy: {100. * np.mean(np.array(all_preds) == np.array(all_labels)):.2f}%")
    print("\nClassification Report:")
    print(classification_report(all_labels, all_preds, target_names=['Negative', 'Positive']))
    
    # Confusion matrix
    cm = confusion_matrix(all_labels, all_preds)
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=['Negative', 'Positive'],
                yticklabels=['Negative', 'Positive'])
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Sentiment Classification - Confusion Matrix')
    plt.show()
    
    # ============================================================
    # 6. PREDICTION FUNCTION
    # ============================================================
    
    def predict_sentiment(text, model, vocab, tokenizer, max_len=20):
        """Predict sentiment of a text."""
        model.eval()
        tokens = tokenizer(text.lower())
        indices = [vocab.get(token, vocab['&lt;UNK&gt;']) for token in tokens]
        
        if len(indices) > max_len:
            indices = indices[:max_len]
        else:
            indices = indices + [vocab['&lt;PAD&gt;']] * (max_len - len(indices))
        
        input_tensor = torch.LongTensor([indices]).to(device)
        
        with torch.no_grad():
            outputs = model(input_tensor)
            probs = F.softmax(outputs, dim=1)
            _, predicted = outputs.max(1)
        
        sentiment = "Positive 😊" if predicted.item() == 1 else "Negative 😞"
        confidence = probs[0][predicted.item()].item() * 100
        
        return sentiment, confidence
    
    tokenizer = get_tokenizer('basic_english')
    
    print("\n" + "="*50)
    print("SENTIMENT PREDICTIONS")
    print("="*50)
    
    test_texts = [
        "I absolutely love this product, it's fantastic!",
        "This is the worst product I have ever used.",
        "Great quality and amazing value for money.",
        "Very disappointed with the service."
    ]
    
    for text in test_texts:
        sentiment, confidence = predict_sentiment(text, model, vocab, tokenizer)
        print(f"Text: {text}")
        print(f"Sentiment: {sentiment} (Confidence: {confidence:.2f}%)\n")
    
    return model, vocab

if __name__ == "__main__":
    model, vocab = train_sentiment_model()</code></pre>
      </div>
    </section>

    <!-- ============ 5. News Category Classifier ============ -->
    <section class="section" id="dl-w9-t5">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amber-600 pb-2">5. News/Article Category Classifier – Assignment</h2>
      <div class="content-card">
        <div class="project-overview grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">📰</span>
            <p class="font-bold text-gray-800">News</p>
            <p class="text-xs text-gray-600">Categories: Politics, Sports, Tech, Business</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">💬</span>
            <p class="font-bold text-gray-800">Comments</p>
            <p class="text-xs text-gray-600">Toxic, Spam, Constructive</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🏷️</span>
            <p class="font-bold text-gray-800">Multi-class</p>
            <p class="text-xs text-gray-600">4+ categories</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-center">
            <span class="text-2xl block">🎯</span>
            <p class="font-bold text-gray-800">Goal</p>
            <p class="text-xs text-gray-600">Build multi-class text classifier</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Multi-Class News Classifier</h3>
        <pre class="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-700"><code>import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================================
# 1. NEWS CATEGORY DATASET
# ============================================================

def load_news_data():
    """Load news category data."""
    # Sample data (you would load from a real dataset)
    texts = [
        # Politics
        "The government announced new policies for economic growth",
        "Election results show a clear majority for the ruling party",
        "International summit discusses climate change agreements",
        # Sports
        "The team won the championship with a last-minute goal",
        "Player breaks world record in the 100m sprint",
        "New coach appointed to lead the national team",
        # Technology
        "New AI model achieves state-of-the-art performance",
        "Tech company releases latest smartphone with advanced features",
        "Breakthrough in quantum computing announced by researchers",
        # Business
        "Stock market reaches all-time high on positive earnings",
        "Company announces merger with major competitor",
        "Startup raises $100 million in series B funding",
        # Politics
        "Debate on healthcare reform continues in parliament",
        "Foreign policy shift impacts international relations",
        # Sports
        "Athlete wins gold medal at international competition",
        "Team qualifies for the world cup after decisive victory",
        # Technology
        "New encryption standard approved for cybersecurity",
        "Autonomous vehicle technology advances with new sensors",
        # Business
        "Quarterly profits exceed expectations for tech giant",
        "New trade agreement boosts export opportunities"
    ]
    labels = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 0, 0, 1, 1, 2, 2, 3, 3]
    categories = ['Politics', 'Sports', 'Technology', 'Business']
    return texts, labels, categories

# ============================================================
# 2. ENHANCED MODEL FOR MULTI-CLASS
# ============================================================

class MultiClassNewsClassifier(nn.Module):
    """Multi-class news classifier with LSTM."""
    
    def __init__(self, vocab_size, embedding_dim=100, hidden_size=128,
                 num_layers=2, num_classes=4, dropout=0.3):
        super(MultiClassNewsClassifier, self).__init__()
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=0)
        self.embedding.weight.data.uniform_(-0.05, 0.05)
        
        self.lstm = nn.LSTM(
            input_size=embedding_dim,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
            bidirectional=True
        )
        
        self.dropout = nn.Dropout(dropout)
        self.fc1 = nn.Linear(hidden_size * 2, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, num_classes)
    
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, (h_n, c_n) = self.lstm(embedded)
        
        # Global average pooling across time
        pooled = torch.mean(lstm_out, dim=1)
        pooled = self.dropout(pooled)
        
        x = F.relu(self.fc1(pooled))
        x = self.dropout(x)
        x = F.relu(self.fc2(x))
        x = self.dropout(x)
        return self.fc3(x)

# ============================================================
# 3. TRAINING FUNCTION
# ============================================================

def train_multi_class_classifier():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")
    
    # Load data
    texts, labels, categories = load_news_data()
    
    # Preprocess
    from torchtext.data.utils import get_tokenizer
    from collections import Counter
    
    tokenizer = get_tokenizer('basic_english')
    all_tokens = []
    for text in texts:
        tokens = tokenizer(text.lower())
        all_tokens.extend(tokens)
    
    counter = Counter(all_tokens)
    vocab = {'&lt;PAD&gt;': 0, '&lt;UNK&gt;': 1}
    for token, freq in counter.most_common(5000):
        if freq >= 2:
            vocab[token] = len(vocab)
    
    # Convert to sequences
    max_len = 30
    sequences = []
    for text in texts:
        tokens = tokenizer(text.lower())
        indices = [vocab.get(token, vocab['&lt;UNK&gt;']) for token in tokens]
        if len(indices) > max_len:
            indices = indices[:max_len]
        else:
            indices = indices + [vocab['&lt;PAD&gt;']] * (max_len - len(indices))
        sequences.append(indices)
    
    X = np.array(sequences)
    y = np.array(labels)
    
    # Split data
    X_train, X_temp, y_train, y_temp = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp
    )
    
    # Convert to tensors
    X_train = torch.LongTensor(X_train)
    y_train = torch.LongTensor(y_train)
    X_val = torch.LongTensor(X_val)
    y_val = torch.LongTensor(y_val)
    X_test = torch.LongTensor(X_test)
    y_test = torch.LongTensor(y_test)
    
    # Dataloaders
    batch_size = 8
    train_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(TensorDataset(X_val, y_val), batch_size=batch_size, shuffle=False)
    test_loader = DataLoader(TensorDataset(X_test, y_test), batch_size=batch_size, shuffle=False)
    
    # Model
    model = MultiClassNewsClassifier(
        vocab_size=len(vocab),
        embedding_dim=50,
        hidden_size=64,
        num_layers=2,
        num_classes=len(categories),
        dropout=0.3
    ).to(device)
    
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=0.0001)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=5
    )
    
    print("\n" + "="*50)
    print("TRAINING NEWS CATEGORY CLASSIFIER")
    print("="*50)
    print(f"Categories: {categories}")
    print(f"Vocab size: {len(vocab)}")
    print(f"Train samples: {len(X_train)}")
    
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
            torch.save(model.state_dict(), 'best_news_classifier.pt')
    
    # ============================================================
    # 4. TEST EVALUATION
    # ============================================================
    
    model.load_state_dict(torch.load('best_news_classifier.pt'))
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
    
    print("\n" + "="*50)
    print("TEST SET PERFORMANCE")
    print("="*50)
    print(f"Accuracy: {100. * np.mean(np.array(all_preds) == np.array(all_labels)):.2f}%")
    print("\nClassification Report:")
    print(classification_report(all_labels, all_preds, target_names=categories))
    
    # Confusion matrix
    cm = confusion_matrix(all_labels, all_preds)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=categories, yticklabels=categories)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('News Category Classification - Confusion Matrix')
    plt.show()
    
    # ============================================================
    # 5. PREDICT FUNCTION
    # ============================================================
    
    def predict_category(text, model, vocab, tokenizer, categories, max_len=30):
        model.eval()
        tokens = tokenizer(text.lower())
        indices = [vocab.get(token, vocab['&lt;UNK&gt;']) for token in tokens]
        
        if len(indices) > max_len:
            indices = indices[:max_len]
        else:
            indices = indices + [vocab['&lt;PAD&gt;']] * (max_len - len(indices))
        
        input_tensor = torch.LongTensor([indices]).to(device)
        
        with torch.no_grad():
            outputs = model(input_tensor)
            probs = F.softmax(outputs, dim=1)
            _, predicted = outputs.max(1)
        
        category = categories[predicted.item()]
        confidence = probs[0][predicted.item()].item() * 100
        
        return category, confidence
    
    print("\n" + "="*50)
    print("CATEGORY PREDICTIONS")
    print("="*50)
    
    test_articles = [
        "The new policy aims to reduce carbon emissions by 50% by 2030",
        "The team scored three goals in the final match to win the championship",
        "AI technology is revolutionizing the healthcare industry",
        "The company's profits increased by 30% this quarter"
    ]
    
    for article in test_articles:
        category, confidence = predict_category(article, model, vocab, tokenizer, categories)
        print(f"Article: {article[:50]}...")
        print(f"Category: {category} (Confidence: {confidence:.2f}%)\n")
    
    return model, vocab

if __name__ == "__main__":
    model, vocab = train_multi_class_classifier()</code></pre>

        <div class="assignment-box bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mt-4">
          <h3 class="text-lg font-bold text-gray-800 mt-0">📝 Assignment – News/Comment Category Classifier</h3>
          <p class="font-semibold text-gray-700">Tasks:</p>
          <ol class="list-decimal list-inside text-sm space-y-1">
            <li>Build a <strong>multi-class text classifier</strong> with 4+ categories</li>
            <li>Implement <strong>data preprocessing</strong> (tokenization, vocabulary, padding)</li>
            <li>Use <strong>LSTM/GRU</strong> with <strong>embedding layer</strong></li>
            <li>Compare <strong>pre-trained embeddings</strong> vs. <strong>trainable embeddings</strong></li>
            <li>Experiment with <strong>bidirectional LSTM</strong> vs. <strong>unidirectional</strong></li>
            <li>Report <strong>accuracy, precision, recall, F1-score</strong></li>
            <li>Visualize <strong>confusion matrix</strong></li>
            <li>Create a <strong>prediction function</strong> for new text</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ============ 6. Cheat Sheet ============ -->
    <section class="section" id="dl-w9-t6">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amber-600 pb-2">6. Cheat Sheet – NLP with Deep Learning</h2>
      <div class="content-card">
        <div class="overflow-x-auto">
          <table class="term-table w-full border-collapse text-sm">
            <thead>
              <tr class="bg-amber-800 text-white">
                <th class="p-3 text-left border border-gray-300">Concept</th>
                <th class="p-3 text-left border border-gray-300">Definition</th>
                <th class="p-3 text-left border border-gray-300">Code Example</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Tokenization</td>
                <td class="p-3">Split text into tokens</td>
                <td class="p-3 font-mono text-xs">get_tokenizer('basic_english')</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Vocabulary</td>
                <td class="p-3">Map token → index</td>
                <td class="p-3 font-mono text-xs">vocab = {token: idx}</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Padding</td>
                <td class="p-3">Make sequences same length</td>
                <td class="p-3 font-mono text-xs">pad_sequences(sequences)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Embedding</td>
                <td class="p-3">Dense word vectors</td>
                <td class="p-3 font-mono text-xs">nn.Embedding(vocab_size, dim)</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Word2Vec</td>
                <td class="p-3">Predict context/target</td>
                <td class="p-3 font-mono text-xs">gensim.models.Word2Vec</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">GloVe</td>
                <td class="p-3">Global co-occurrence</td>
                <td class="p-3 font-mono text-xs">torchtext.vocab.GloVe</td>
              </tr>
              <tr class="border border-gray-300 even:bg-gray-50">
                <td class="p-3 font-bold">Bidirectional LSTM</td>
                <td class="p-3">Process forward + backward</td>
                <td class="p-3 font-mono text-xs">bidirectional=True</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 7. Quick Revision ============ -->
    <section class="section revision-section" id="dl-w9-t7">
      <h2 class="text-3xl font-bold text-gray-800 border-b-4 border-amber-600 pb-2">📘 Quick Revision – NLP with Deep Learning</h2>
      <div class="content-card">
        <ul class="revision-list space-y-3">
          <li class="pb-3 border-b border-gray-200"><strong>NLP Pipeline:</strong> Text → Tokenization → Vocabulary → Embedding → Neural Network → Prediction</li>
          <li class="pb-3 border-b border-gray-200"><strong>Tokenization:</strong> Split text into tokens (words, subwords, characters)</li>
          <li class="pb-3 border-b border-gray-200"><strong>Vocabulary:</strong> Map each token to a unique integer index</li>
          <li class="pb-3 border-b border-gray-200"><strong>Padding:</strong> Make all sequences the same length for batch processing</li>
          <li class="pb-3 border-b border-gray-200"><strong>Embeddings:</strong> Dense vectors capturing semantic meaning (Word2Vec, GloVe, FastText)</li>
          <li class="pb-3 border-b border-gray-200"><strong>LSTM for Text:</strong> Process sequence order, bidirectional captures context from both directions</li>
          <li class="pb-3 border-b border-gray-200"><strong>Sentiment Analysis:</strong> Binary classification (Positive/Negative)</li>
          <li class="pb-0"><strong>Best Practice:</strong> Use <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">pre-trained embeddings</span> for small datasets, <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">bidirectional LSTM</span> for better context understanding, and <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">dropout</span> for regularization.</li>
        </ul>
        <div class="gate-box bg-amber-50 border-l-4 border-amber-700 p-5 rounded-lg mt-4">
          <p class="text-gray-800"><strong>🎯 GATE Focus:</strong> Understand <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">word embeddings</span> and why they're better than one-hot encoding. Know the <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">NLP pipeline</span> steps and how <span class="highlight-text bg-yellow-300 px-1 rounded font-semibold">RNN/LSTM</span> process sequences. Be able to explain the difference between <strong>Word2Vec</strong> and <strong>GloVe</strong>.</p>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer text-center py-8 text-gray-500 border-t-2 border-gray-200 mt-8">
      <p class="text-lg">📝 Deep Learning Bootcamp – Week 9 · NLP with Deep Learning</p>
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
    { id: 'dl-w9-t1', title: 'NLP Pipeline' },
    { id: 'dl-w9-t2', title: 'Tokenization & Vocabulary' },
    { id: 'dl-w9-t3', title: 'Word Embeddings' },
    { id: 'dl-w9-t4', title: 'Sentiment Analysis' },
    { id: 'dl-w9-t5', title: 'News Category Classifier' },
    { id: 'dl-w9-t6', title: 'Cheat Sheet' },
    { id: 'dl-w9-t7', title: 'Quick Revision' },
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
  background: linear-gradient(145deg, #1a1a2e, #16213e, #92400e);
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
  border: 1px solid #92400e !important;
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

/* Pipeline flow */
.pipeline-flow {
  background: #fffbeb !important;
}

/* Boxes */
.gate-box {
  background: #fffbeb !important;
  border-left: 4px solid #92400e !important;
}

.assignment-box {
  background: #fefce8 !important;
  border-left: 4px solid #eab308 !important;
}

.example-box {
  background: #f3f4f6 !important;
  border-left: 4px solid #92400e !important;
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
  .pipeline-flow .flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>