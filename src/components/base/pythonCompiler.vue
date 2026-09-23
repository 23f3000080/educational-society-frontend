<!-- pythonCompiler.vue -->
<template>
  <div class="py-page dark:bg-[#070b14] bg-slate-50">
    <!-- Ambient background -->
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- ================= HEADER ================= -->
    <header class="page-header dark:bg-slate-900/70 bg-white/70 dark:border-white/5 border-slate-200">
      <div class="header-inner">
        <div class="header-left">
          <div class="logo-icon">🐍</div>
          <div>
            <h1 class="page-title dark:text-white text-slate-900">
              <span class="grad-amber">Python</span>
              <span class="grad-emerald">Playground</span>
            </h1>
            <p class="page-sub dark:text-slate-400 text-slate-500">
              Write · Run · Learn — right in your browser
            </p>
          </div>
        </div>

        <div class="header-actions">
          <div class="status-chip" :class="statusClass">
            <span class="status-dot"></span>
            {{ statusText }}
          </div>

          <button
            class="btn-icon dark:text-slate-200 text-slate-700 dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 dark:hover:bg-amber-400/15 hover:bg-amber-400/15"
            @click="toggleSound"
            :title="soundEnabled ? 'Mute' : 'Unmute'"
          >
            {{ soundEnabled ? '🔊' : '🔇' }}
          </button>
        </div>
      </div>
    </header>

    <!-- ================= MAIN LAYOUT ================= -->
    <main
      ref="playgroundRef"
      class="playground"
      :style="{
        gridTemplateColumns: isMobile ? '1fr' : `${leftWidth}px 8px 1fr`
      }"
    >
      <!-- ===== LEFT: EDITOR ===== -->
      <section
        class="panel editor-panel dark:bg-slate-900/70 bg-white dark:border-white/10 border-slate-200"
      >
        <div class="panel-head dark:bg-white/5 bg-slate-50 dark:border-white/5 border-slate-200">
          <div class="panel-title">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="file-name dark:text-slate-400 text-slate-500">main.py</span>
          </div>
          <div class="panel-tools">
            <select
              v-model="selectedExample"
              @change="loadExample"
              class="example-select dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200"
            >
              <option value="">📚 Load Example…</option>
              <option v-for="ex in examples" :key="ex.name" :value="ex.name">
                {{ ex.icon }} {{ ex.name }}
              </option>
            </select>
            <button
              class="tool-btn dark:text-slate-300 text-slate-600 dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:hover:bg-amber-400/15 hover:bg-amber-400/15"
              @click="clearCode"
              title="Clear"
            >
              🗑️
            </button>
          </div>
        </div>

        <textarea
          ref="editorRef"
          v-model="code"
          class="code-editor dark:text-slate-200 text-slate-800"
          spellcheck="false"
          @keydown.tab.prevent="insertTab"
          @input="onType"
          placeholder="# Write your Python code here...&#10;print('Hello, Educational Society!')"
        ></textarea>

        <div class="editor-footer dark:bg-white/5 bg-slate-50 dark:border-white/5 border-slate-200">
          <div class="editor-info dark:text-slate-500 text-slate-500">
            <span>{{ lineCount }} lines</span>
            <span>·</span>
            <span>{{ code.length }} chars</span>
          </div>
          <div class="editor-actions">
            <button
              class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200 dark:hover:bg-white/10 hover:bg-slate-100"
              @click="downloadCode"
              title="Download .py"
            >
              ⬇️ Save
            </button>
            <button
              class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200 dark:hover:bg-white/10 hover:bg-slate-100"
              @click="triggerUpload"
              title="Upload .py"
            >
              ⬆️ Upload
            </button>
            <input
              ref="fileInput"
              type="file"
              accept=".py,.txt"
              hidden
              @change="uploadCode"
            />
            <button
              class="btn-run"
              :disabled="isRunning || !isReady"
              @click="runCode"
            >
              <span v-if="isRunning" class="spinner"></span>
              <span v-else>▶</span>
              {{ isRunning ? 'Running…' : 'Run' }}
            </button>
          </div>
        </div>
      </section>

      <!-- ===== RESIZER (drag to resize) ===== -->
      <div
        v-if="!isMobile"
        class="resizer"
        :class="{ dragging: isDragging }"
        @mousedown="startResize"
        @touchstart.prevent="startResize"
        title="Drag to resize"
      >
        <div class="resizer-grip">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- ===== RIGHT: OUTPUT ===== -->
      <section
        class="panel output-panel dark:bg-slate-900/70 bg-white dark:border-white/10 border-slate-200"
      >
        <div class="panel-head dark:bg-white/5 bg-slate-50 dark:border-white/5 border-slate-200">
          <div class="panel-title">
            <span class="output-icon">💻</span>
            <span class="file-name dark:text-slate-400 text-slate-500">Output</span>
          </div>
          <div class="panel-tools">
            <!-- Layout quick-actions -->
            <button
              class="tool-btn dark:text-slate-300 text-slate-600 dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:hover:bg-emerald-400/15 hover:bg-emerald-400/15"
              @click="setLayout('equal')"
              title="Split evenly"
            >
              ⚖️
            </button>
            <button
              class="tool-btn dark:text-slate-300 text-slate-600 dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:hover:bg-emerald-400/15 hover:bg-emerald-400/15"
              @click="setLayout('editor')"
              title="Maximize editor"
            >
              ◀
            </button>
            <button
              class="tool-btn dark:text-slate-300 text-slate-600 dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:hover:bg-emerald-400/15 hover:bg-emerald-400/15"
              @click="setLayout('output')"
              title="Maximize output"
            >
              ▶
            </button>

            <div class="toolbar-divider dark:bg-white/10 bg-slate-200"></div>

            <button
              class="tool-btn dark:text-slate-300 text-slate-600 dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:hover:bg-amber-400/15 hover:bg-amber-400/15"
              @click="copyOutput"
              :title="copied ? 'Copied!' : 'Copy output'"
            >
              {{ copied ? '✅' : '📋' }}
            </button>
            <button
              class="tool-btn dark:text-slate-300 text-slate-600 dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:hover:bg-amber-400/15 hover:bg-amber-400/15"
              @click="clearOutput"
              title="Clear output"
            >
              🗑️
            </button>
          </div>
        </div>

        <div class="output-body">
          <!-- Loading state -->
          <div v-if="!isReady" class="output-loading">
            <div class="big-spinner"></div>
            <p class="loading-title dark:text-slate-200 text-slate-800">
              Loading Python 3.11 runtime…
            </p>
            <p class="loading-sub dark:text-slate-500 text-slate-500">
              First load downloads ~10MB — subsequent runs are instant ⚡
            </p>
            <div class="progress-bar dark:bg-white/10 bg-slate-200">
              <div class="progress-fill" :style="{ width: loadProgress + '%' }"></div>
            </div>
            <p class="loading-pct">{{ loadProgress }}%</p>
          </div>

          <!-- Empty state -->
          <div
            v-else-if="!output.length && !isRunning"
            class="output-empty dark:text-slate-500 text-slate-400"
          >
            <div class="empty-icon">🚀</div>
            <p>Click <strong>Run</strong> to execute your code</p>
            <p class="empty-hint dark:text-slate-600 text-slate-400">Output will appear here</p>
          </div>

          <!-- Output lines -->
          <div v-else class="output-lines">
            <div
              v-for="(line, i) in output"
              :key="i"
              class="output-line"
              :class="[
                `line-${line.type}`,
                line.type === 'stdout' ? 'dark:text-slate-200 text-slate-800' : '',
                line.type === 'system' ? 'dark:text-emerald-400 text-emerald-600' : ''
              ]"
            >{{ line.text }}</div>

            <!-- Input prompt -->
            <div
              v-if="waitingForInput"
              class="input-prompt"
            >
              <span class="input-arrow">›</span>
              <input
                ref="inputRef"
                v-model="inputValue"
                class="stdin-input dark:text-slate-200 text-slate-800"
                @keyup.enter="submitInput"
                placeholder="Type input and press Enter…"
                autofocus
              />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ================= FOOTER TIPS ================= -->
    <footer class="page-footer dark:border-white/5 border-slate-200">
      <div class="tips">
        <span class="tip dark:text-slate-400 text-slate-500">
          💡 <strong>Tip:</strong> Use <code>input()</code> for interactive programs
        </span>
        <span class="tip dark:text-slate-400 text-slate-500">
          🖱️ <strong>Drag</strong> the middle bar to resize panels
        </span>
        <span class="tip dark:text-slate-400 text-slate-500">
          🔒 Your code never leaves your browser
        </span>
      </div>
      <p class="credit dark:text-slate-500 text-slate-500">
        Made with 💛 by <strong>Educational Society</strong>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

/* =========================================================
   🔊 SOUND ENGINE
   ========================================================= */
const soundEnabled = ref(true)
let audioCtx = null

function initAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {}
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume()
}

function playTone(freq, dur = 0.1, type = 'sine', vol = 0.12, delay = 0) {
  if (!soundEnabled.value) return
  initAudio()
  if (!audioCtx) return
  const start = audioCtx.currentTime + delay
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(vol, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur)
  osc.connect(gain); gain.connect(audioCtx.destination)
  osc.start(start); osc.stop(start + dur + 0.02)
}

const SFX = {
  click:    () => playTone(600, 0.05, 'sine', 0.08),
  type:     () => playTone(1400, 0.015, 'square', 0.02),
  run:      () => { playTone(500, 0.08, 'sine', 0.1); playTone(750, 0.1, 'sine', 0.1, 0.06) },
  success:  () => { playTone(660, 0.1, 'sine', 0.14); playTone(880, 0.15, 'sine', 0.14, 0.09) },
  error:    () => { playTone(220, 0.18, 'sawtooth', 0.12); playTone(160, 0.22, 'sawtooth', 0.12, 0.05) },
  ready:    () => { playTone(523, 0.1, 'triangle', 0.13); playTone(659, 0.1, 'triangle', 0.13, 0.09); playTone(784, 0.15, 'triangle', 0.13, 0.18) },
  resize:   () => playTone(900, 0.03, 'sine', 0.05),
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) { initAudio(); SFX.click() }
  localStorage.setItem('py_sound', soundEnabled.value ? '1' : '0')
}

/* =========================================================
   PYODIDE STATE
   ========================================================= */
const pyodide = ref(null)
const isReady = ref(false)
const isRunning = ref(false)
const loadProgress = ref(0)
const code = ref('')
const output = ref([])
const editorRef = ref(null)
const fileInput = ref(null)
const inputRef = ref(null)
const copied = ref(false)
const waitingForInput = ref(false)
const inputValue = ref('')

const statusClass = computed(() => {
  if (!isReady.value) return 'status-loading'
  if (isRunning.value) return 'status-running'
  return 'status-ready'
})
const statusText = computed(() => {
  if (!isReady.value) return `Loading ${loadProgress.value}%`
  if (isRunning.value) return 'Running'
  return 'Ready'
})

/* =========================================================
   RESIZABLE PANELS
   ========================================================= */
const playgroundRef = ref(null)
const leftWidth = ref(0)      // px width of left panel
const isDragging = ref(false)
const isMobile = ref(false)
const MIN_PANEL = 280         // minimum panel width in px
const DIVIDER = 8             // resizer width in px

function detectMobile() {
  isMobile.value = window.innerWidth < 960
}

function setInitialSplit() {
  if (!playgroundRef.value) return
  const total = playgroundRef.value.clientWidth
  const usable = total - DIVIDER
  leftWidth.value = Math.round(usable * 0.5)
}

function setLayout(mode) {
  SFX.click()
  const total = playgroundRef.value?.clientWidth || 0
  const usable = total - DIVIDER
  if (mode === 'equal') leftWidth.value = Math.round(usable * 0.5)
  if (mode === 'editor') leftWidth.value = Math.round(usable * 0.75)
  if (mode === 'output') leftWidth.value = Math.round(usable * 0.25)
}

function startResize(e) {
  if (isMobile.value) return
  isDragging.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'

  const startX = e.touches ? e.touches[0].clientX : e.clientX
  const startWidth = leftWidth.value

  const onMove = (ev) => {
    const x = ev.touches ? ev.touches[0].clientX : ev.clientX
    const total = playgroundRef.value.clientWidth - DIVIDER
    let next = startWidth + (x - startX)
    next = Math.max(MIN_PANEL, Math.min(total - MIN_PANEL, next))
    leftWidth.value = Math.round(next)
  }

  const onUp = () => {
    isDragging.value = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onUp)
    SFX.resize()
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchmove', onMove, { passive: false })
  window.addEventListener('touchend', onUp)
}

/* =========================================================
   LOAD PYODIDE
   ========================================================= */
async function loadPyodide() {
  await new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js'
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })

  pyodide.value = await window.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
    stdout: (text) => output.value.push({ type: 'stdout', text }),
    stderr: (text) => output.value.push({ type: 'stderr', text }),
  })

  pyodide.value.setStdout({ batched: (text) => output.value.push({ type: 'stdout', text }) })
  pyodide.value.setStderr({ batched: (text) => output.value.push({ type: 'stderr', text }) })
  pyodide.value.globals.set('input', (prompt = '') => window.prompt(prompt) || '')

  isReady.value = true
  loadProgress.value = 100
  SFX.ready()
}

/* =========================================================
   RUN CODE
   ========================================================= */
async function runCode() {
  if (!isReady.value || isRunning.value) return
  SFX.run()
  isRunning.value = true
  output.value = []

  try {
    pyodide.value.globals.set('input', (prompt = '') => window.prompt(prompt) || '')
    pyodide.value.setStdout({ batched: (t) => output.value.push({ type: 'stdout', text: t }) })
    pyodide.value.setStderr({ batched: (t) => output.value.push({ type: 'stderr', text: t }) })

    await pyodide.value.runPythonAsync(code.value)

    if (!output.value.length) {
      output.value.push({ type: 'system', text: '✅ Program finished (no output)' })
    } else {
      output.value.push({ type: 'system', text: '✅ Program finished' })
    }
    SFX.success()
  } catch (err) {
    output.value.push({ type: 'stderr', text: String(err.message || err) })
    SFX.error()
  } finally {
    isRunning.value = false
    nextTick(scrollOutputToBottom)
  }
}

function scrollOutputToBottom() {
  const el = document.querySelector('.output-body')
  if (el) el.scrollTop = el.scrollHeight
}

/* =========================================================
   EDITOR HELPERS
   ========================================================= */
const lineCount = computed(() => code.value.split('\n').length)

function insertTab(e) {
  const el = e.target
  const start = el.selectionStart
  const end = el.selectionEnd
  code.value = code.value.substring(0, start) + '  ' + code.value.substring(end)
  nextTick(() => { el.selectionStart = el.selectionEnd = start + 2 })
}

let lastTypeSound = 0
function onType() {
  const now = Date.now()
  if (now - lastTypeSound > 60) {
    lastTypeSound = now
    SFX.type()
  }
}

function clearCode() {
  SFX.click()
  if (!code.value) return
  if (confirm('Clear all code?')) code.value = ''
}

function clearOutput() {
  SFX.click()
  output.value = []
}

function copyOutput() {
  SFX.click()
  const text = output.value.map(l => l.text).join('\n')
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  })
}

function downloadCode() {
  SFX.click()
  const blob = new Blob([code.value], { type: 'text/x-python' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'main.py'
  a.click()
  URL.revokeObjectURL(url)
}

function triggerUpload() {
  SFX.click()
  fileInput.value?.click()
}

function uploadCode(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { code.value = ev.target.result }
  reader.readAsText(file)
  e.target.value = ''
}

/* =========================================================
   EXAMPLES
   ========================================================= */
const examples = [
  {
    name: 'Hello World',
    icon: '👋',
    code: `print("Hello, Educational Society!")

name = "Student"
print(f"Welcome, {name}! 🎓")

for i in range(1, 6):
    print(f"Line {i}")`,
  },
  {
    name: 'Fibonacci',
    icon: '🌀',
    code: `def fibonacci(n):
    """Return first n Fibonacci numbers."""
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

print("First 15 Fibonacci numbers:")
print(fibonacci(15))

nums = fibonacci(10)
print(f"\\nSum: {sum(nums)}")
print(f"Average: {sum(nums)/len(nums):.2f}")`,
  },
  {
    name: 'Prime Checker',
    icon: '🔢',
    code: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

print("Primes between 1 and 50:")
primes = [n for n in range(1, 51) if is_prime(n)]
print(primes)
print(f"\\nFound {len(primes)} primes")`,
  },
  {
    name: 'Pattern Printing',
    icon: '🔺',
    code: `n = 5
print("Number Pyramid:")
for i in range(1, n + 1):
    print(" " * (n - i) + "* " * i)

print("\\nMultiplication Table (1-5):")
for i in range(1, 6):
    row = [f"{i}×{j}={i*j:2d}" for j in range(1, 6)]
    print(" | ".join(row))`,
  },
  {
    name: 'Factorial & Recursion',
    icon: '🧮',
    code: `import math

def factorial_recursive(n):
    return 1 if n <= 1 else n * factorial_recursive(n - 1)

print("Factorials (recursive vs math):")
for n in range(1, 11):
    r = factorial_recursive(n)
    m = math.factorial(n)
    match = "✓" if r == m else "✗"
    print(f"{n}! = {r:,} {match}")

def fib(n, memo={}):
    if n in memo: return memo[n]
    if n < 2: return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]

print(f"\\nfib(30) = {fib(30):,}")`,
  },
  {
    name: 'Student Grade Calculator',
    icon: '📊',
    code: `students = [
    {"name": "Aarav",  "marks": [85, 92, 78, 90]},
    {"name": "Diya",   "marks": [95, 88, 92, 96]},
    {"name": "Kabir",  "marks": [72, 68, 80, 75]},
    {"name": "Meera",  "marks": [88, 84, 90, 87]},
]

print(f"{'Name':<10} {'Avg':>6} {'Grade':>6}")
print("-" * 26)

for s in students:
    avg = sum(s["marks"]) / len(s["marks"])
    if avg >= 90:   grade = "A+"
    elif avg >= 80: grade = "A"
    elif avg >= 70: grade = "B"
    else:           grade = "C"
    print(f"{s['name']:<10} {avg:>6.1f} {grade:>6}")

topper = max(students, key=lambda s: sum(s["marks"])/len(s["marks"]))
print(f"\\n🏆 Topper: {topper['name']}")`,
  },
  {
    name: 'Interactive Input',
    icon: '⌨️',
    code: `name = input("What's your name? ")

print(f"\\nHello, {name}! 👋")
print(f"Your name has {len(name)} characters.")
print(f"In uppercase: {name.upper()}")
print(f"Reversed: {name[::-1]}")`,
  },
]

const selectedExample = ref('')

function loadExample() {
  const ex = examples.find(e => e.name === selectedExample.value)
  if (!ex) return
  SFX.click()
  code.value = ex.code
  selectedExample.value = ''
}

/* =========================================================
   INPUT
   ========================================================= */
function submitInput() {
  waitingForInput.value = false
  inputValue.value = ''
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
let resizeListener = null

onMounted(async () => {
  const saved = localStorage.getItem('py_sound')
  if (saved !== null) soundEnabled.value = saved === '1'

  code.value = `# 🐍 Welcome to the Python Playground!
# Write your code and click Run →

print("Hello, Educational Society!")

for i in range(1, 4):
    print("🐍" * i)

print("\\nHappy coding! 🎓")`

  // Setup responsive split
  detectMobile()
  nextTick(setInitialSplit)
  resizeListener = () => {
    detectMobile()
    if (!isMobile.value) {
      // Keep split ratio reasonably similar after resize
      const total = playgroundRef.value?.clientWidth || 0
      const usable = total - DIVIDER
      if (leftWidth.value > usable - MIN_PANEL) {
        leftWidth.value = Math.round(usable * 0.5)
      }
    }
  }
  window.addEventListener('resize', resizeListener)

  const fakeProgress = setInterval(() => {
    if (loadProgress.value < 90) loadProgress.value += Math.random() * 8
  }, 300)

  try {
    await loadPyodide()
  } catch (e) {
    output.value = [{ type: 'stderr', text: '❌ Failed to load Python runtime. Check your internet connection.' }]
  } finally {
    clearInterval(fakeProgress)
  }
})

onUnmounted(() => {
  if (resizeListener) window.removeEventListener('resize', resizeListener)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
})
</script>

<style scoped>
/* =========================================================
   BASE
   ========================================================= */
.py-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* =========================================================
   BLOBS (kept subtle in both modes)
   ========================================================= */
.bg-blobs { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.22; }
.blob-1 { width: 500px; height: 500px; background: #f59e0b; top: -160px; left: -140px; animation: float1 16s ease-in-out infinite; }
.blob-2 { width: 460px; height: 460px; background: #10b981; bottom: -140px; right: -120px; animation: float2 18s ease-in-out infinite; }
.blob-3 { width: 380px; height: 380px; background: #6366f1; top: 40%; left: 50%; animation: float1 20s ease-in-out infinite reverse; }
@keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.1); } }
@keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,30px) scale(1.15); } }

/* =========================================================
   HEADER
   ========================================================= */
.page-header {
  position: relative; z-index: 2;
  padding: 1.2rem 1.5rem;
  border-bottom-width: 1px;
  backdrop-filter: blur(12px);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.header-inner {
  max-width: 1600px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  gap: 1rem;
}
.header-left { display: flex; align-items: center; gap: 14px; }
.logo-icon {
  font-size: 2rem; line-height: 1;
  filter: drop-shadow(0 0 16px rgba(251,191,36,0.5));
  animation: snakeBob 3s ease-in-out infinite;
}
@keyframes snakeBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

.page-title {
  font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em;
  margin: 0; line-height: 1.2;
}
.grad-amber   { background: linear-gradient(120deg,#fbbf24,#f59e0b,#fcd34d); -webkit-background-clip: text; background-clip: text; color: transparent; }
.grad-emerald { background: linear-gradient(120deg,#10b981,#34d399,#059669); -webkit-background-clip: text; background-clip: text; color: transparent; }
.page-sub { font-size: 0.78rem; margin-top: 2px; }

.header-actions { display: flex; align-items: center; gap: 10px; }

.status-chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 999px;
  font-size: 0.78rem; font-weight: 600;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(120,120,120,0.2);
  transition: all 0.3s;
}
.status-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 10px currentColor;
}
.status-loading { color: #fbbf24; }
.status-loading .status-dot { animation: blink 1.2s infinite; }
.status-running { color: #60a5fa; }
.status-running .status-dot { animation: blink 0.6s infinite; }
.status-ready   { color: #34d399; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

.btn-icon {
  width: 40px; height: 40px; border-radius: 10px;
  border-width: 1px;
  cursor: pointer; font-size: 1.1rem;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.btn-icon:hover { transform: scale(1.06); border-color: rgba(251,191,36,0.4); }

/* =========================================================
   PLAYGROUND GRID  (dynamic columns via inline style)
   ========================================================= */
.playground {
  position: relative; z-index: 1;
  flex: 1;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  display: grid;
  gap: 0;
  min-height: 0;
  transition: grid-template-columns 0.15s ease;
}
.playground:not(.dragging) { transition: grid-template-columns 0.2s ease; }

/* =========================================================
   PANELS
   ========================================================= */
.panel {
  display: flex; flex-direction: column;
  border-width: 1px;
  border-radius: 18px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-height: 500px;
  max-height: calc(100vh - 200px);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.editor-panel { grid-column: 1; }
.output-panel { grid-column: 3; }

.panel-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.7rem 1rem;
  border-bottom-width: 1px;
  gap: 8px;
  flex-wrap: wrap;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.panel-title { display: flex; align-items: center; gap: 8px; }
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-red    { background: #ef4444; }
.dot-yellow { background: #fbbf24; }
.dot-green  { background: #10b981; }
.file-name {
  margin-left: 8px; font-size: 0.82rem;
  font-family: 'Monaco', 'Menlo', monospace;
}
.output-icon { font-size: 1rem; }

.panel-tools { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }

.toolbar-divider {
  width: 1px;
  height: 22px;
  margin: 0 3px;
}

.example-select {
  padding: 6px 10px; border-radius: 8px;
  border-width: 1px;
  font-size: 0.78rem;
  cursor: pointer; outline: none;
  max-width: 180px;
  transition: border-color 0.2s;
}
.example-select:hover { border-color: rgba(251,191,36,0.5); }
.example-select option { background: #0f172a; color: #e2e8f0; }

.tool-btn {
  width: 32px; height: 32px; border-radius: 8px;
  border-width: 1px;
  cursor: pointer; font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}

/* =========================================================
   RESIZER
   ========================================================= */
.resizer {
  grid-column: 2;
  position: relative;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  touch-action: none;
  transition: background-color 0.2s ease;
}
.resizer::before {
  content: '';
  position: absolute;
  top: 15%;
  bottom: 15%;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: rgba(120, 120, 120, 0.18);
  border-radius: 2px;
  transition: background-color 0.2s ease, top 0.2s ease, bottom 0.2s ease;
}
.resizer:hover::before,
.resizer.dragging::before {
  background: linear-gradient(180deg, #fbbf24, #10b981);
  top: 5%;
  bottom: 5%;
  width: 3px;
  box-shadow: 0 0 12px rgba(251,191,36,0.6);
}
.resizer-grip {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 8px 5px;
  border-radius: 999px;
  opacity: 0.45;
  transition: opacity 0.2s, background-color 0.2s;
}
.resizer:hover .resizer-grip,
.resizer.dragging .resizer-grip {
  opacity: 1;
  background: rgba(251,191,36,0.15);
}
.resizer-grip span {
  width: 14px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  color: #94a3b8;
}
.resizer:hover .resizer-grip span { color: #fbbf24; }

/* =========================================================
   EDITOR
   ========================================================= */
.code-editor {
  flex: 1;
  width: 100%;
  padding: 1rem 1.2rem;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  resize: none;
  tab-size: 2;
  caret-color: #fbbf24;
  transition: color 0.3s ease;
}
.code-editor::selection { background: rgba(251,191,36,0.25); }
.code-editor::placeholder { color: #64748b; }

.editor-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.7rem 1rem;
  border-top-width: 1px;
  gap: 12px;
  flex-wrap: wrap;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.editor-info {
  display: flex; gap: 8px; align-items: center;
  font-size: 0.75rem;
  font-family: 'Monaco', monospace;
}
.editor-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

.btn-secondary {
  padding: 0.5rem 0.9rem; border-radius: 10px;
  border-width: 1px;
  font-weight: 600; font-size: 0.82rem;
  cursor: pointer; transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 6px;
}

.btn-run {
  padding: 0.5rem 1.4rem; border-radius: 10px;
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  color: #0b1220; font-weight: 700; font-size: 0.88rem;
  border: none; cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px;
  transition: all 0.25s;
  box-shadow: 0 8px 20px -6px rgba(251,191,36,0.5);
}
.btn-run:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 26px -6px rgba(251,191,36,0.7); }
.btn-run:disabled { opacity: 0.5; cursor: not-allowed; }

.spinner {
  width: 13px; height: 13px;
  border: 2px solid rgba(0,0,0,0.25);
  border-top-color: #0b1220;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* =========================================================
   OUTPUT
   ========================================================= */
.output-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.2rem;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
}
.output-body::-webkit-scrollbar { width: 8px; }
.output-body::-webkit-scrollbar-track { background: transparent; }
.output-body::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.3); border-radius: 4px; }
.output-body::-webkit-scrollbar-thumb:hover { background: rgba(120,120,120,0.5); }

.output-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%; gap: 8px; text-align: center;
}
.empty-icon { font-size: 3rem; filter: drop-shadow(0 0 20px rgba(251,191,36,0.4)); margin-bottom: 8px; animation: bob 2.5s ease-in-out infinite; }
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.output-empty strong { color: #fbbf24; }
.empty-hint { font-size: 0.78rem; }

.output-loading {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%; gap: 12px; text-align: center;
}
.big-spinner {
  width: 48px; height: 48px;
  border: 3px solid rgba(251,191,36,0.15);
  border-top-color: #fbbf24;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin-bottom: 8px;
}
.loading-title { font-weight: 600; font-size: 0.95rem; }
.loading-sub { font-size: 0.8rem; max-width: 300px; line-height: 1.5; }
.progress-bar {
  width: 240px; height: 6px; border-radius: 999px;
  overflow: hidden; margin-top: 6px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg,#fbbf24,#10b981);
  transition: width 0.4s ease;
}
.loading-pct { color: #fbbf24; font-weight: 700; font-size: 0.85rem; }

.output-lines { display: flex; flex-direction: column; }
.output-line {
  padding: 2px 0;
  white-space: pre-wrap;
  word-break: break-word;
}
.line-stderr { color: #f87171; }
.line-system { font-style: italic; opacity: 0.85; margin-top: 8px; }

/* =========================================================
   INPUT PROMPT
   ========================================================= */
.input-prompt {
  display: flex; align-items: center; gap: 8px;
  margin-top: 8px; padding: 6px 10px;
  border-radius: 8px;
  background: rgba(251,191,36,0.08);
  border: 1px solid rgba(251,191,36,0.3);
}
.input-arrow { color: #fbbf24; font-weight: 700; }
.stdin-input {
  flex: 1; background: transparent; border: none; outline: none;
  font-family: inherit; font-size: 0.85rem;
}

/* =========================================================
   FOOTER
   ========================================================= */
.page-footer {
  position: relative; z-index: 1;
  padding: 1.2rem 1.5rem 1.5rem;
  border-top-width: 1px;
  text-align: center;
  transition: border-color 0.3s ease;
}
.tips {
  display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;
  margin-bottom: 0.6rem;
}
.tip { font-size: 0.78rem; }
.tip strong { color: #fbbf24; }
.tip code {
  background: rgba(120,120,120,0.15);
  padding: 1px 6px; border-radius: 4px;
  color: #06b6d4; font-size: 0.75rem;
}
.credit { font-size: 0.78rem; }
.credit strong { color: #fbbf24; }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 960px) {
  .playground {
    grid-template-columns: 1fr !important;
    padding: 1rem;
    gap: 1rem;
  }
  .editor-panel { grid-column: 1; }
  .output-panel { grid-column: 1; }
  .resizer { display: none; }
  .panel { max-height: none; min-height: 400px; }
  .code-editor { min-height: 320px; }
  .output-body { min-height: 300px; }
}

@media (max-width: 640px) {
  .header-inner { flex-wrap: wrap; }
  .page-title { font-size: 1.15rem; }
  .page-sub { display: none; }
  .status-chip { font-size: 0.7rem; padding: 5px 10px; }
  .example-select { max-width: 120px; font-size: 0.72rem; }
  .editor-footer { flex-direction: column; align-items: stretch; }
  .editor-actions { justify-content: stretch; }
  .btn-run { flex: 1; justify-content: center; }
  .tips { flex-direction: column; gap: 4px; }
}
</style>