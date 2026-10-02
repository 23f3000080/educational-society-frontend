<template>
  <div class="compiler-app">
    <!-- Animated background -->
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>

    <!-- Header -->
    <header class="app-header">
      <div class="logo-area">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <line x1="12" y1="18" x2="12" y2="18.01" />
          </svg>
        </div>
        <div>
          <h1>MobileCraft</h1>
          <p>Code · Preview · Record · Share</p>
        </div>
      </div>
      <div class="header-badge">
        <span class="pulse-dot"></span>
        <span>Live Compiler</span>
      </div>
    </header>

    <main class="main-grid">
      <!-- LEFT: Editor -->
      <section class="editor-panel">
        <div class="vscode-titlebar">
          <div class="vscode-dots">
            <span class="red"></span>
            <span class="yellow"></span>
            <span class="green"></span>
          </div>
          <div class="vscode-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="vscode-tab"
              :class="{ active: activeTab === tab.id }"
              @click="switchTab(tab.id)"
            >
              <span class="tab-icon" v-html="tab.icon"></span>
              <span>{{ tab.filename }}</span>
            </button>
          </div>
          <div class="vscode-actions">
            <button class="vscode-action" @click="copyCode" title="Copy">
              <i class="fas fa-copy"></i>
            </button>
            <button class="vscode-action" @click="refreshPreview" title="Refresh">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        <div class="vscode-breadcrumb">
          <span>src</span>
          <i class="fas fa-chevron-right"></i>
          <span>{{ activeTabData.filename }}</span>
        </div>

        <!-- Editor with live autocomplete -->
        <div class="editor-container" ref="editorContainer">
          <div class="line-numbers">
            <span v-for="n in lineCount" :key="n">{{ n }}</span>
          </div>
          <div class="code-wrapper">
            <textarea
              ref="codeInput"
              v-model="codeStore[activeTab]"
              class="code-textarea"
              spellcheck="false"
              @input="onInput"
              @keydown="onKeydown"
              @click="updateCursor"
              @keyup="updateCursor"
            ></textarea>

            <!-- Autocomplete popup -->
            <div
              v-if="showSuggestions && filteredSuggestions.length > 0"
              class="suggestions-popup"
              :style="popupPosition"
            >
              <div class="sug-header">
                <i class="fas fa-code"></i>
                <span>{{ activeTab === 'html' ? 'HTML Tags' : activeTab === 'css' ? 'CSS Properties' : 'JS Snippets' }}</span>
                <span class="sug-hint">Tab to insert</span>
              </div>
              <div
                v-for="(item, idx) in filteredSuggestions"
                :key="idx"
                class="sug-item"
                :class="{ selected: idx === selectedIndex }"
                @click="applySuggestion(item)"
                @mouseenter="selectedIndex = idx"
              >
                <span class="sug-icon" :class="item.type">
                  <i :class="item.icon"></i>
                </span>
                <span class="sug-label">{{ item.label }}</span>
                <span class="sug-detail">{{ item.detail }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="vscode-statusbar">
          <div class="status-left">
            <span><i class="fas fa-code-branch"></i> main</span>
          </div>
          <div class="status-right">
            <span>Ln {{ cursorLine }}, Col {{ cursorCol }}</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span class="lang-tag">{{ activeTab.toUpperCase() }}</span>
          </div>
        </div>

        <div class="action-bar">
          <button class="action-btn primary" @click="refreshPreview">
            <i class="fas fa-play"></i> Run Code
          </button>
          <button class="action-btn" @click="resetCode">
            <i class="fas fa-undo-alt"></i> Reset
          </button>
        </div>

        <div class="hint-box">
          <i class="fas fa-lightbulb"></i>
          <span><strong>Tip:</strong> Type <code>div</code> then press <kbd>Tab</kbd> → auto-completes to <code>&lt;div&gt;&lt;/div&gt;</code>. Try <code>!</code> + Tab for HTML boilerplate.</span>
        </div>
      </section>

      <!-- RIGHT: Preview + Record -->
      <section class="preview-panel">
        <div class="preview-header">
          <span class="preview-label">Device Preview</span>
          <div class="device-selector">
            <button
              v-for="device in devices"
              :key="device.id"
              class="device-btn"
              :class="{ active: currentDevice === device.id }"
              @click="currentDevice = device.id"
            >
              {{ device.label }}
            </button>
          </div>
        </div>

        <div class="phone-wrapper">
          <div class="phone-frame" ref="phoneFrame">
            <div class="phone-notch"></div>
            <div class="phone-status-bar">
              <span>{{ currentTime }}</span>
              <div class="status-icons">
                <i class="fas fa-signal"></i>
                <i class="fas fa-wifi"></i>
                <i class="fas fa-battery-three-quarters"></i>
              </div>
            </div>
            <div class="phone-content" ref="previewContainer">
              <iframe
                ref="previewFrame"
                class="preview-iframe"
                sandbox="allow-scripts allow-modals allow-popups allow-same-origin"
              ></iframe>
            </div>
            <div class="phone-home-bar"></div>
          </div>
          <div class="phone-glow"></div>
        </div>

        <div class="record-panel">
          <div class="record-status" :class="{ recording: isRecording }">
            <span class="rec-dot" :class="{ active: isRecording }"></span>
            <span>{{ isRecording ? 'Recording...' : 'Ready to record' }}</span>
          </div>

          <div class="record-buttons">
            <button
              v-if="!isRecording"
              class="record-btn start"
              @click="startRecording"
              :disabled="isStarting"
            >
              <i class="fas fa-circle"></i>
              {{ isStarting ? 'Starting...' : 'Start Recording' }}
            </button>
            <button v-else class="record-btn stop" @click="stopRecording">
              <i class="fas fa-stop"></i> Stop Recording
            </button>
          </div>

          <div class="record-timer" v-if="isRecording || elapsedTime > 0">
            <span class="timer-value">{{ formattedTime }}</span>
          </div>

          <div class="recordings-list" v-if="recordings.length > 0">
            <div class="list-header">
              <i class="fas fa-film"></i>
              <span>Recordings ({{ recordings.length }})</span>
            </div>
            <div class="recording-item" v-for="rec in recordings" :key="rec.id">
              <div class="rec-info">
                <span class="rec-name">{{ rec.name }}</span>
                <span class="rec-meta">{{ rec.duration }}s · {{ rec.size }}</span>
              </div>
              <a :href="rec.url" :download="rec.name" class="rec-download">
                <i class="fas fa-download"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <transition name="toast">
      <div v-if="toast" class="toast" :class="toast.type">{{ toast.message }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, nextTick } from 'vue'

/* ========== TABS ========== */
const tabs = [
  { id: 'html', filename: 'index.html', icon: '<i class="fab fa-html5" style="color:#e34c26"></i>' },
  { id: 'css', filename: 'styles.css', icon: '<i class="fab fa-css3-alt" style="color:#264de4"></i>' },
  { id: 'js', filename: 'script.js', icon: '<i class="fab fa-js" style="color:#f7df1e"></i>' }
]
const activeTab = ref('html')
const activeTabData = computed(() => tabs.find(t => t.id === activeTab.value))

/* ========== CODE STORAGE ========== */
const codeStore = reactive({
  html: `<div class="app">
  <div class="avatar">✨</div>
  <h1>Hello, Mobile!</h1>
  <p>Tap the button below</p>
  <button id="cta">Get Started</button>
  <div class="stats">
    <div><strong>12K</strong><span>Likes</span></div>
    <div><strong>3.4K</strong><span>Shares</span></div>
    <div><strong>890</strong><span>Comments</span></div>
  </div>
</div>`,
  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, system-ui, sans-serif;
  background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.app {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 32px 24px;
  border-radius: 28px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  text-align: center;
  width: 100%;
  max-width: 320px;
}
.avatar {
  font-size: 48px;
  margin-bottom: 12px;
  animation: bounce 2s infinite;
}
h1 {
  color: #1e1b4b;
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 800;
}
p {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 20px;
}
button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 20px -8px #6366f1;
  transition: all 0.2s;
}
button:active {
  transform: scale(0.96);
}
.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}
.stats div {
  display: flex;
  flex-direction: column;
}
.stats strong {
  color: #1e1b4b;
  font-size: 16px;
}
.stats span {
  color: #94a3b8;
  font-size: 11px;
  margin-top: 2px;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}`,
  js: `const btn = document.getElementById('cta');
if (btn) {
  btn.addEventListener('click', () => {
    btn.textContent = '🎉 Welcome!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => {
      btn.textContent = 'Get Started';
      btn.style.background = '';
    }, 1500);
  });
}
console.log('MobileCraft preview loaded ✨');`
})

const originalStore = JSON.parse(JSON.stringify(codeStore))
const lineCount = computed(() => Math.max(codeStore[activeTab.value].split('\n').length, 10))

/* ========== CURSOR TRACKING ========== */
const codeInput = ref(null)
const cursorLine = ref(1)
const cursorCol = ref(1)

function updateCursor() {
  const ta = codeInput.value
  if (!ta) return
  const pos = ta.selectionStart
  const text = ta.value.substring(0, pos)
  cursorLine.value = text.split('\n').length
  cursorCol.value = pos - text.lastIndexOf('\n')
}

/* ========== AUTOCOMPLETE ENGINE (VS Code style) ========== */

// ---- HTML tag snippets ----
const htmlTags = [
  'div','span','p','a','h1','h2','h3','h4','h5','h6','ul','ol','li',
  'section','article','header','footer','nav','main','aside',
  'button','input','form','label','select','option','textarea',
  'img','video','audio','canvas','svg','iframe',
  'table','tr','td','th','thead','tbody',
  'style','script','link','meta','title','head','body','html'
]

const htmlSnippets = {
  '!': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>`,
  'a': '<a href="">$0</a>',
  'img': '<img src="" alt="$0">',
  'input': '<input type="text" placeholder="$0">',
  'button': '<button>$0</button>',
  'link': '<link rel="stylesheet" href="$0">',
  'meta': '<meta name="$0" content="">'
}

// ---- CSS properties ----
const cssProps = [
  'align-items','animation','background','background-color','background-image',
  'border','border-radius','border-color','border-width','bottom',
  'box-shadow','box-sizing','color','cursor','display','flex','flex-direction',
  'flex-wrap','font-family','font-size','font-weight','gap','grid','grid-template-columns',
  'height','justify-content','left','letter-spacing','line-height','margin',
  'margin-top','margin-bottom','margin-left','margin-right','max-width','max-height',
  'min-height','min-width','opacity','overflow','padding','padding-top','padding-bottom',
  'padding-left','padding-right','position','right','text-align','text-decoration',
  'text-transform','top','transform','transition','width','z-index'
]

const cssValues = {
  'display': 'flex',
  'position': 'relative',
  'flex-direction': 'column',
  'justify-content': 'center',
  'align-items': 'center',
  'text-align': 'center',
  'font-weight': 'bold',
  'box-sizing': 'border-box',
  'overflow': 'hidden'
}

// ---- JS snippets ----
const jsKeywords = [
  'const','let','var','function','return','if','else','for','while',
  'forEach','map','filter','reduce','addEventListener','querySelector',
  'getElementById','console.log','setTimeout','setInterval','document',
  'window','classList','innerHTML','textContent','style','appendChild'
]

const jsSnippets = {
  'log': 'console.log($0)',
  'func': 'function name($0) {\n  \n}',
  'for': 'for (let i = 0; i < $0; i++) {\n  \n}',
  'if': 'if ($0) {\n  \n}',
  'ael': "addEventListener('click', () => {\n  $0\n})",
  'qs': "querySelector('$0')",
  'geb': "getElementById('$0')",
  'st': 'setTimeout(() => {\n  $0\n}, 1000)'
}

/* ========== SUGGESTION POPUP ========== */
const showSuggestions = ref(false)
const selectedIndex = ref(0)
const currentWord = ref('')
const popupPosition = ref({ top: '0px', left: '0px' })

// Build a unified suggestion list based on active tab + current word
const filteredSuggestions = computed(() => {
  const word = currentWord.value.toLowerCase()
  if (!word) return []

  let list = []

  if (activeTab.value === 'html') {
    // If inside a tag (after <), suggest tag names
    list = htmlTags
      .filter(t => t.startsWith(word))
      .slice(0, 8)
      .map(t => ({
        label: t,
        detail: 'tag',
        type: 'tag',
        icon: 'fas fa-tag',
        insert: `<${t}>$0</${t}>`,
        isTag: true
      }))

    // Add snippet shortcuts
    Object.keys(htmlSnippets).forEach(k => {
      if (k.startsWith(word) && k !== word) return // avoid dup
      if (k.startsWith(word)) {
        list.push({
          label: k,
          detail: 'snippet',
          type: 'snippet',
          icon: 'fas fa-magic',
          insert: htmlSnippets[k]
        })
      }
    })
  } else if (activeTab.value === 'css') {
    // Suggest properties
    list = cssProps
      .filter(p => p.startsWith(word))
      .slice(0, 8)
      .map(p => ({
        label: p,
        detail: 'property',
        type: 'property',
        icon: 'fas fa-palette',
        insert: cssValues[p] ? `${p}: ${cssValues[p]};` : `${p}: $0;`
      }))
  } else {
    // JS
    list = jsKeywords
      .filter(k => k.toLowerCase().startsWith(word))
      .slice(0, 8)
      .map(k => ({
        label: k,
        detail: 'keyword',
        type: 'keyword',
        icon: 'fas fa-code',
        insert: k
      }))

    Object.keys(jsSnippets).forEach(k => {
      if (k.startsWith(word)) {
        list.push({
          label: k,
          detail: 'snippet',
          type: 'snippet',
          icon: 'fas fa-magic',
          insert: jsSnippets[k]
        })
      }
    })
  }

  return list
})

/* ========== INPUT HANDLING ========== */
let inputDebounce = null

function onInput() {
  updateCursor()

  // Get current word being typed
  const ta = codeInput.value
  const pos = ta.selectionStart
  const before = ta.value.substring(0, pos)
  const match = before.match(/[a-zA-Z0-9_!-]*$/)
  const word = match ? match[0] : ''
  currentWord.value = word

  // Update preview (debounced)
  clearTimeout(inputDebounce)
  inputDebounce = setTimeout(() => refreshPreview(), 500)

  // Show suggestions if word length >= 1
  if (word.length >= 1) {
    showSuggestions.value = true
    selectedIndex.value = 0
    updatePopupPosition()
  } else {
    showSuggestions.value = false
  }
}

function updatePopupPosition() {
  // Position popup near the cursor
  const ta = codeInput.value
  if (!ta) return
  const pos = ta.selectionStart
  const before = ta.value.substring(0, pos)
  const lines = before.split('\n')
  const currentLineText = lines[lines.length - 1] || ''
  const lineNum = lines.length - 1

  const lineHeight = 22
  const charWidth = 8.4

  popupPosition.value = {
    top: `${(lineNum + 1) * lineHeight + 14}px`,
    left: `${Math.min(currentLineText.length * charWidth + 60, 420)}px`
  }
}

/* ========== KEYBOARD HANDLING ========== */
function onKeydown(e) {
  // Tab key - apply suggestion or insert 2 spaces
  if (e.key === 'Tab') {
    e.preventDefault()

    if (showSuggestions.value && filteredSuggestions.value.length > 0) {
      applySuggestion(filteredSuggestions.value[selectedIndex.value])
      return
    }

    // If no suggestion, try snippet shortcut for current word
    const ta = codeInput.value
    const pos = ta.selectionStart
    const before = ta.value.substring(0, pos)
    const wordMatch = before.match(/[a-zA-Z0-9_!-]+$/)
    const word = wordMatch ? wordMatch[0] : ''

    if (activeTab.value === 'html' && htmlSnippets[word]) {
      replaceCurrentWord(htmlSnippets[word])
      return
    }
    if (activeTab.value === 'js' && jsSnippets[word]) {
      replaceCurrentWord(jsSnippets[word])
      return
    }
    if (word && activeTab.value === 'html' && htmlTags.includes(word)) {
      // Auto-close HTML tag
      replaceCurrentWord(`<${word}>$0</${word}>`)
      return
    }

    // Default: insert 2 spaces
    insertAtCursor('  ')
    return
  }

  // Navigation through suggestions
  if (showSuggestions.value && filteredSuggestions.value.length > 0) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedIndex.value = (selectedIndex.value + 1) % filteredSuggestions.value.length
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedIndex.value = (selectedIndex.value - 1 + filteredSuggestions.value.length) % filteredSuggestions.value.length
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      applySuggestion(filteredSuggestions.value[selectedIndex.value])
      return
    }
  }

  // Escape to close
  if (e.key === 'Escape') {
    showSuggestions.value = false
  }

  // Enter - auto-indent (VS Code style)
  if (e.key === 'Enter') {
    const ta = codeInput.value
    const pos = ta.selectionStart
    const before = ta.value.substring(0, pos)
    const currentLine = before.split('\n').pop() || ''
    const indentMatch = currentLine.match(/^(\s*)/)
    const indent = indentMatch ? indentMatch[1] : ''

    // Extra indent if line ends with { or > or :
    const lastChar = currentLine.trim().slice(-1)
    const extraIndent = (lastChar === '{' || lastChar === ':' || lastChar === '>') ? '  ' : ''

    if (indent || extraIndent) {
      e.preventDefault()
      const ta2 = codeInput.value
      const start = ta2.selectionStart
      const end = ta2.selectionEnd
      const insert = '\n' + indent + extraIndent
      ta2.value = ta2.value.substring(0, start) + insert + ta2.value.substring(end)
      ta2.selectionStart = ta2.selectionEnd = start + insert.length
      codeStore[activeTab.value] = ta2.value
      nextTick(() => updateCursor())
    }
  }

  // Auto-close brackets and quotes (VS Code style)
  const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' }
  if (pairs[e.key]) {
    const ta = codeInput.value
    const pos = ta.selectionStart
    const end = ta.selectionEnd

    // If there's a selection, wrap it
    if (pos !== end) {
      e.preventDefault()
      const selected = ta.value.substring(pos, end)
      const wrapped = e.key + selected + pairs[e.key]
      ta.value = ta.value.substring(0, pos) + wrapped + ta.value.substring(end)
      ta.selectionStart = pos + 1
      ta.selectionEnd = end + 1
      codeStore[activeTab.value] = ta.value
      return
    }

    // Otherwise auto-close
    e.preventDefault()
    const close = pairs[e.key]
    ta.value = ta.value.substring(0, pos) + e.key + close + ta.value.substring(pos)
    ta.selectionStart = ta.selectionEnd = pos + 1
    codeStore[activeTab.value] = ta.value
    return
  }

  // Skip over closing char if next char matches
  const closers = [')', ']', '}', '"', "'", '`']
  if (closers.includes(e.key)) {
    const ta = codeInput.value
    const pos = ta.selectionStart
    if (ta.value[pos] === e.key) {
      e.preventDefault()
      ta.selectionStart = ta.selectionEnd = pos + 1
    }
  }
}

/* ========== HELPER FUNCTIONS ========== */
function insertAtCursor(text) {
  const ta = codeInput.value
  const start = ta.selectionStart
  const end = ta.selectionEnd
  ta.value = ta.value.substring(0, start) + text + ta.value.substring(end)
  ta.selectionStart = ta.selectionEnd = start + text.length
  codeStore[activeTab.value] = ta.value
  nextTick(() => updateCursor())
}

function replaceCurrentWord(replacement) {
  const ta = codeInput.value
  const pos = ta.selectionStart
  const before = ta.value.substring(0, pos)
  const after = ta.value.substring(pos)

  // Find the word boundaries
  const match = before.match(/[a-zA-Z0-9_!-]+$/)
  if (!match) {
    insertAtCursor(replacement)
    return
  }

  const word = match[0]
  const wordStart = pos - word.length

  // Handle $0 placeholder (cursor position)
  let finalText = replacement
  let cursorOffset = replacement.length

  if (replacement.includes('$0')) {
    const idx = replacement.indexOf('$0')
    finalText = replacement.replace('$0', '')
    cursorOffset = idx
  }

  ta.value = before.substring(0, wordStart) + finalText + after
  const newPos = wordStart + cursorOffset
  ta.selectionStart = ta.selectionEnd = newPos
  codeStore[activeTab.value] = ta.value

  showSuggestions.value = false
  currentWord.value = ''
  nextTick(() => {
    updateCursor()
    refreshPreview()
  })
}

function applySuggestion(suggestion) {
  const insert = suggestion.insert || suggestion.label

  if (insert.includes('$0')) {
    // Multi-line snippet with cursor placeholder
    replaceCurrentWord(insert)
  } else {
    // Simple text replacement
    const ta = codeInput.value
    const pos = ta.selectionStart
    const before = ta.value.substring(0, pos)
    const after = ta.value.substring(pos)

    // Remove the typed word and insert the suggestion
    const match = before.match(/[a-zA-Z0-9_-]+$/)
    const word = match ? match[0] : ''
    const wordStart = pos - word.length

    ta.value = before.substring(0, wordStart) + insert + after
    ta.selectionStart = ta.selectionEnd = wordStart + insert.length
    codeStore[activeTab.value] = ta.value
  }

  showSuggestions.value = false
  currentWord.value = ''
  nextTick(() => {
    updateCursor()
    refreshPreview()
  })
}

function switchTab(id) {
  activeTab.value = id
  showSuggestions.value = false
  nextTick(() => {
    codeInput.value?.focus()
    updateCursor()
  })
}

/* ========== PREVIEW ========== */
const previewFrame = ref(null)
const previewContainer = ref(null)
const phoneFrame = ref(null)

const devices = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'android', label: 'Android' },
  { id: 'tablet', label: 'Tablet' }
]
const currentDevice = ref('iphone')

function buildSrcDoc() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${codeStore.css}</style>
</head>
<body>
${codeStore.html}
<script>${codeStore.js}<\/script>
</body>
</html>`
}

function refreshPreview() {
  if (previewFrame.value) {
    previewFrame.value.srcdoc = buildSrcDoc()
  }
}

function resetCode() {
  Object.assign(codeStore, JSON.parse(JSON.stringify(originalStore)))
  refreshPreview()
  showToast('Code reset to example', 'info')
}

/* ========== COPY ========== */
function copyCode() {
  navigator.clipboard.writeText(codeStore[activeTab.value])
  showToast('Copied to clipboard', 'success')
}

/* ========== TOAST ========== */
const toast = ref(null)
let toastTimer = null
function showToast(message, type = 'info') {
  toast.value = { message, type }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = null), 2200)
}

/* ========== CLOCK ========== */
const currentTime = ref('')
function updateClock() {
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/* ========== RECORDING ========== */
const isRecording = ref(false)
const isStarting = ref(false)
const elapsedTime = ref(0)
const recordings = ref([])
let mediaRecorder = null
let recordedChunks = []
let timerInterval = null
let canvasStream = null
let audioContext = null
let animationFrameId = null

const formattedTime = computed(() => {
  const m = Math.floor(elapsedTime.value / 60).toString().padStart(2, '0')
  const s = (elapsedTime.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

function generateRecordingName() {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const time = now.toTimeString().slice(0, 8).replace(/:/g, '')
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `mobilecraft-${date}-${time}-${rand}.webm`
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

async function startRecording() {
  isStarting.value = true
  recordedChunks = []

  try {
    await new Promise(r => setTimeout(r, 300))
    const container = previewContainer.value
    if (!container) throw new Error('Preview not ready')

    const rect = container.getBoundingClientRect()
    const canvas = document.createElement('canvas')
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    const ctx = canvas.getContext('2d')

    const drawFrame = () => {
      const w = canvas.width
      const h = canvas.height

      const gradient = ctx.createLinearGradient(0, 0, w, h)
      gradient.addColorStop(0, '#667eea')
      gradient.addColorStop(1, '#764ba2')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      const cardW = w * 0.75
      const cardH = h * 0.55
      const cardX = (w - cardW) / 2
      const cardY = (h - cardH) / 2

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 40
      ctx.shadowOffsetY = 20
      ctx.beginPath()
      ctx.roundRect(cardX, cardY, cardW, cardH, 40)
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0

      ctx.font = '80px system-ui'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✨', w / 2, cardY + cardH * 0.2)

      ctx.fillStyle = '#1e1b4b'
      ctx.font = 'bold 48px system-ui'
      ctx.fillText('Hello, Mobile!', w / 2, cardY + cardH * 0.42)

      ctx.fillStyle = '#64748b'
      ctx.font = '24px system-ui'
      ctx.fillText('Tap the button below', w / 2, cardY + cardH * 0.55)

      const btnW = cardW * 0.8
      const btnH = 60
      const btnX = (w - btnW) / 2
      const btnY = cardY + cardH * 0.65
      const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH)
      btnGradient.addColorStop(0, '#6366f1')
      btnGradient.addColorStop(1, '#8b5cf6')
      ctx.fillStyle = btnGradient
      ctx.beginPath()
      ctx.roundRect(btnX, btnY, btnW, btnH, 20)
      ctx.fill()

      ctx.fillStyle = 'white'
      ctx.font = 'bold 24px system-ui'
      ctx.fillText('Get Started', w / 2, btnY + btnH / 2)

      const statsY = cardY + cardH * 0.85
      ctx.fillStyle = '#1e1b4b'
      ctx.font = 'bold 28px system-ui'
      ctx.fillText('12K', w * 0.3, statsY)
      ctx.fillText('3.4K', w * 0.5, statsY)
      ctx.fillText('890', w * 0.7, statsY)

      ctx.fillStyle = '#94a3b8'
      ctx.font = '16px system-ui'
      ctx.fillText('Likes', w * 0.3, statsY + 30)
      ctx.fillText('Shares', w * 0.5, statsY + 30)
      ctx.fillText('Comments', w * 0.7, statsY + 30)

      if (isRecording.value) {
        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.arc(w - 60, 60, 12, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#ef4444'
        ctx.font = 'bold 20px system-ui'
        ctx.textAlign = 'right'
        ctx.fillText('REC ' + formattedTime.value, w - 90, 66)
        ctx.textAlign = 'center'
      }

      animationFrameId = requestAnimationFrame(drawFrame)
    }
    drawFrame()

    canvasStream = canvas.captureStream(30)

    try {
      audioContext = new AudioContext()
      const dest = audioContext.createMediaStreamDestination()
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      gain.gain.value = 0
      osc.connect(gain)
      gain.connect(dest)
      osc.start()
      dest.stream.getAudioTracks().forEach(t => canvasStream.addTrack(t))
    } catch (e) {}

    const mimeTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
    let selectedMime = ''
    for (const m of mimeTypes) {
      if (MediaRecorder.isTypeSupported(m)) { selectedMime = m; break }
    }

    mediaRecorder = new MediaRecorder(canvasStream, {
      mimeType: selectedMime,
      videoBitsPerSecond: 2500000
    })

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: selectedMime || 'video/webm' })
      const url = URL.createObjectURL(blob)
      const name = generateRecordingName()
      recordings.value.unshift({
        id: Date.now(),
        name,
        url,
        duration: elapsedTime.value,
        size: formatFileSize(blob.size)
      })
      showToast(`Saved: ${name}`, 'success')
      if (audioContext) { audioContext.close().catch(() => {}); audioContext = null }
      canvasStream = null
    }

    mediaRecorder.start(100)
    isRecording.value = true
    elapsedTime.value = 0
    timerInterval = setInterval(() => elapsedTime.value++, 1000)
    showToast('Recording started', 'success')
  } catch (err) {
    console.error(err)
    showToast('Recording failed: ' + err.message, 'error')
  } finally {
    isStarting.value = false
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop()
  if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null }
  isRecording.value = false
  clearInterval(timerInterval)
  showToast('Recording stopped', 'info')
}

/* ========== LIFECYCLE ========== */
onMounted(() => {
  updateClock()
  setInterval(updateClock, 30000)
  refreshPreview()
  nextTick(() => codeInput.value?.focus())
})

onUnmounted(() => {
  clearInterval(timerInterval)
  clearTimeout(inputDebounce)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop()
  recordings.value.forEach(r => URL.revokeObjectURL(r.url))
})
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.compiler-app {
  min-height: 100vh;
  background: #0a0a1a;
  color: #e2e8f0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  padding: 24px;
  position: relative;
  overflow-x: hidden;
}

.bg-orb {
  position: fixed; border-radius: 50%; filter: blur(100px);
  opacity: 0.3; pointer-events: none; z-index: 0;
}
.bg-orb-1 { width: 500px; height: 500px; background: #6366f1; top: -200px; left: -150px; }
.bg-orb-2 { width: 400px; height: 400px; background: #ec4899; bottom: -150px; right: -100px; }
.bg-orb-3 { width: 350px; height: 350px; background: #06b6d4; top: 40%; left: 40%; }

.app-header {
  position: relative; z-index: 2;
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px; padding: 16px 24px;
  background: rgba(15, 15, 35, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
}
.logo-area { display: flex; align-items: center; gap: 14px; }
.logo-icon {
  width: 46px; height: 46px; border-radius: 14px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  color: white; box-shadow: 0 8px 20px -6px #6366f1;
}
.logo-icon svg { width: 24px; height: 24px; }
.logo-area h1 {
  font-size: 20px; font-weight: 800;
  background: linear-gradient(135deg, #a5b4fc, #f0abfc);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.logo-area p { font-size: 11px; color: #64748b; margin-top: 2px; }
.header-badge {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 40px;
  font-size: 12px; font-weight: 600; color: #34d399;
}
.pulse-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #10b981;
  animation: pulse-ring 2s infinite;
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.main-grid {
  position: relative; z-index: 2;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.editor-panel { display: flex; flex-direction: column; gap: 0; }

.vscode-titlebar {
  display: flex; align-items: center;
  background: #323233;
  border-radius: 12px 12px 0 0;
  padding: 0 12px; height: 40px;
  border: 1px solid #2d2d3d; border-bottom: none;
}
.vscode-dots { display: flex; gap: 7px; margin-right: 16px; }
.vscode-dots span { width: 12px; height: 12px; border-radius: 50%; }
.vscode-dots .red { background: #ff5f56; }
.vscode-dots .yellow { background: #ffbd2e; }
.vscode-dots .green { background: #27c93f; }
.vscode-tabs { display: flex; flex: 1; }
.vscode-tab {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px; font-size: 12px;
  color: #969696; background: transparent;
  border: none; cursor: pointer;
  font-family: inherit;
  border-top: 1px solid transparent;
  transition: all 0.15s;
}
.vscode-tab:hover { color: #cccccc; background: #2a2d2e; }
.vscode-tab.active {
  color: #ffffff; background: #1e1e1e;
  border-top: 1px solid #007acc;
}
.tab-icon { display: inline-flex; font-size: 14px; }
.vscode-actions { display: flex; gap: 4px; }
.vscode-action {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px; background: transparent; border: none;
  color: #969696; cursor: pointer; transition: all 0.15s;
  font-size: 12px;
}
.vscode-action:hover { background: #2a2d2e; color: #ffffff; }

.vscode-breadcrumb {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 16px;
  background: #1e1e1e;
  border-left: 1px solid #2d2d3d;
  border-right: 1px solid #2d2d3d;
  font-size: 11px; color: #858585;
  font-family: 'Consolas', monospace;
}
.vscode-breadcrumb i { font-size: 8px; }

.editor-container {
  display: flex;
  background: #1e1e1e;
  min-height: 380px;
  max-height: 480px;
  overflow-y: auto;
  position: relative;
  border-left: 1px solid #2d2d3d;
  border-right: 1px solid #2d2d3d;
}

.line-numbers {
  display: flex; flex-direction: column;
  padding: 12px 0;
  background: #1e1e1e;
  color: #858585;
  font-family: 'Consolas', 'Fira Code', monospace;
  font-size: 13px; line-height: 22px;
  text-align: right;
  min-width: 50px;
  padding-right: 16px;
  border-right: 1px solid #252526;
  user-select: none;
}
.line-numbers span { display: block; padding-right: 4px; }

.code-wrapper {
  flex: 1;
  position: relative;
}

.code-textarea {
  width: 100%;
  min-height: 380px;
  background: transparent;
  border: none;
  outline: none;
  color: #d4d4d4;
  font-family: 'Consolas', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 22px;
  padding: 12px 16px;
  resize: none;
  tab-size: 2;
  caret-color: #aeafad;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
}
.code-textarea::selection { background: #264f78; }
.code-textarea::-webkit-scrollbar { width: 10px; height: 10px; }
.code-textarea::-webkit-scrollbar-track { background: #1e1e1e; }
.code-textarea::-webkit-scrollbar-thumb { background: #424242; border-radius: 5px; }
.code-textarea::-webkit-scrollbar-thumb:hover { background: #4f4f4f; }

/* ========== SUGGESTIONS POPUP ========== */
.suggestions-popup {
  position: absolute;
  background: #252526;
  border: 1px solid #454545;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  min-width: 300px;
  z-index: 100;
  overflow: hidden;
  font-family: 'Consolas', monospace;
}
.sug-header {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px;
  background: #2d2d2d;
  border-bottom: 1px solid #454545;
  font-size: 10px; color: #858585;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.sug-header i { color: #007acc; }
.sug-hint {
  margin-left: auto;
  background: #007acc;
  color: white;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 9px;
}
.sug-item {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 12px;
  font-size: 13px;
  color: #cccccc;
  cursor: pointer;
  transition: background 0.1s;
}
.sug-item:hover, .sug-item.selected {
  background: #094771;
  color: #ffffff;
}
.sug-icon {
  width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}
.sug-icon.tag { background: #569cd6; color: white; }
.sug-icon.property { background: #4ec9b0; color: #1e1e1e; }
.sug-icon.keyword { background: #c586c0; color: white; }
.sug-icon.snippet { background: #dcdcaa; color: #1e1e1e; }
.sug-icon.value { background: #ce9178; color: #1e1e1e; }
.sug-label { flex: 1; }
.sug-detail { font-size: 11px; color: #858585; }
.sug-item.selected .sug-detail { color: #b0b0b0; }

.vscode-statusbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 16px;
  background: #007acc;
  border-radius: 0 0 12px 12px;
  font-size: 11px; color: white;
  font-family: 'Consolas', monospace;
}
.status-left, .status-right { display: flex; gap: 16px; align-items: center; }
.status-left i, .status-right i { margin-right: 4px; }
.lang-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 8px;
  border-radius: 3px;
  font-weight: 600;
}

.action-bar { display: flex; gap: 10px; margin-top: 16px; }
.action-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 20px;
  background: rgba(15, 15, 35, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  color: #cbd5e1;
  font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  font-family: inherit;
}
.action-btn:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  color: white;
  transform: translateY(-1px);
}
.action-btn.primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: transparent;
  color: white;
  box-shadow: 0 8px 20px -8px #6366f1;
}

.hint-box {
  margin-top: 12px;
  padding: 12px 16px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  font-size: 12px;
  color: #a5b4fc;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.6;
}
.hint-box i { color: #fbbf24; margin-top: 2px; }
.hint-box code {
  background: rgba(0, 0, 0, 0.3);
  padding: 1px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  color: #fbbf24;
}
.hint-box kbd {
  background: rgba(0, 0, 0, 0.4);
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Consolas', monospace;
  font-size: 11px;
  color: #fff;
}

.preview-panel { display: flex; flex-direction: column; gap: 16px; }
.preview-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 4px;
}
.preview-label {
  font-size: 12px; font-weight: 700;
  color: #64748b; letter-spacing: 1.5px;
  text-transform: uppercase;
}
.device-selector {
  display: flex; gap: 4px; padding: 4px;
  background: rgba(15, 15, 35, 0.7);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 12px;
}
.device-btn {
  padding: 6px 14px;
  background: transparent; border: none;
  border-radius: 8px;
  color: #64748b;
  font-size: 11px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  font-family: inherit;
}
.device-btn.active {
  background: rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
}

.phone-wrapper { display: flex; justify-content: center; position: relative; }
.phone-frame {
  width: 280px; height: 570px;
  background: #1a1a2e;
  border-radius: 40px;
  padding: 10px;
  position: relative;
  box-shadow:
    0 0 0 2px rgba(99, 102, 241, 0.3),
    0 30px 60px -15px rgba(0, 0, 0, 0.6),
    inset 0 0 20px rgba(99, 102, 241, 0.1);
}
.phone-notch {
  position: absolute; top: 10px; left: 50%;
  transform: translateX(-50%);
  width: 90px; height: 22px;
  background: #1a1a2e;
  border-radius: 0 0 16px 16px;
  z-index: 10;
}
.phone-status-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 20px 4px;
  font-size: 11px; font-weight: 600;
  color: #64748b;
  background: white;
  border-radius: 32px 32px 0 0;
}
.status-icons { display: flex; gap: 4px; font-size: 9px; }
.phone-content {
  width: 100%; height: calc(100% - 60px);
  background: white; overflow: hidden;
  position: relative;
}
.preview-iframe {
  width: 100%; height: 100%;
  border: none; background: white; display: block;
}
.phone-home-bar {
  height: 20px; background: white;
  border-radius: 0 0 32px 32px;
  display: flex; align-items: center; justify-content: center;
}
.phone-home-bar::after {
  content: ''; width: 100px; height: 4px;
  background: #cbd5e1; border-radius: 4px;
}
.phone-glow {
  position: absolute; inset: -20px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.25), transparent 70%);
  z-index: -1; pointer-events: none; filter: blur(30px);
}

.record-panel {
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  padding: 18px;
  display: flex; flex-direction: column; gap: 14px;
}
.record-status {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 600; color: #94a3b8;
}
.record-status.recording { color: #f87171; }
.rec-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #334155; transition: all 0.3s;
}
.rec-dot.active {
  background: #ef4444;
  animation: pulse-ring-red 1.5s infinite;
}
@keyframes pulse-ring-red {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}
.record-buttons { display: flex; gap: 10px; }
.record-btn {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  gap: 8px; padding: 13px 18px;
  border: none; border-radius: 14px;
  font-size: 14px; font-weight: 700;
  cursor: pointer; transition: all 0.2s;
  font-family: inherit; color: white;
}
.record-btn.start {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 10px 25px -8px #6366f1;
}
.record-btn.start:hover:not(:disabled) { transform: translateY(-2px); }
.record-btn.start:disabled { opacity: 0.6; cursor: wait; }
.record-btn.stop {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 10px 25px -8px #ef4444;
}
.record-btn.stop:hover { transform: translateY(-2px); }

.record-timer {
  text-align: center; padding: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.timer-value {
  font-family: 'Fira Code', monospace;
  font-size: 22px; font-weight: 700;
  color: #f87171; letter-spacing: 2px;
}

.recordings-list {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
}
.list-header {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.recording-item {
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; padding: 8px 10px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 8px;
  margin-bottom: 6px;
}
.recording-item:hover { background: rgba(99, 102, 241, 0.2); }
.rec-info { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
.rec-name {
  font-size: 11px; font-weight: 600;
  color: #cbd5e1;
  font-family: 'Consolas', monospace;
  white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis;
}
.rec-meta { font-size: 10px; color: #64748b; }
.rec-download {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 8px; color: white;
  text-decoration: none; font-size: 12px;
  transition: all 0.2s; flex-shrink: 0;
}
.rec-download:hover { transform: scale(1.1); }

.toast {
  position: fixed; bottom: 30px; left: 50%;
  transform: translateX(-50%);
  padding: 14px 24px; border-radius: 14px;
  font-size: 13px; font-weight: 600;
  color: white; z-index: 999;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
}
.toast.success { background: linear-gradient(135deg, #10b981, #059669); }
.toast.error { background: linear-gradient(135deg, #ef4444, #dc2626); }
.toast.info { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 1024px) {
  .main-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .compiler-app { padding: 14px; }
  .app-header { flex-direction: column; gap: 12px; align-items: flex-start; }
  .action-bar { flex-wrap: wrap; }
}
</style>