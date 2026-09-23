<!-- gameZone.vue -->
<template>
  <div class="gamezone">
    <!-- Ambient background -->
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- ================= SOUND TOGGLE ================= -->
    <button
      class="sound-toggle"
      @click="toggleSound"
      :title="soundEnabled ? 'Mute sounds' : 'Unmute sounds'"
    >
      <span class="sound-icon">{{ soundEnabled ? '🔊' : '🔇' }}</span>
    </button>

    <!-- ================= HERO ================= -->
    <section class="hero">
      <div class="hero-content">
        <div class="badge">
          <span class="pulse-dot"></span> Free · No Sign-up · Play Now
        </div>
        <h1 class="hero-title">
          <span class="grad-amber">Game</span><span class="grad-emerald">Zone</span>
        </h1>
        <p class="hero-sub">
          Sharpen your mind with quick technical games — built for students by the
          <strong>Educational Society</strong>.
        </p>

        <div class="hero-stats">
          <div class="stat">
            <div class="stat-num">{{ games.length }}</div>
            <div class="stat-lbl">Games</div>
          </div>
          <div class="divider"></div>
          <div class="stat">
            <div class="stat-num">{{ totalPlays }}</div>
            <div class="stat-lbl">Plays</div>
          </div>
          <div class="divider"></div>
          <div class="stat">
            <div class="stat-num">100%</div>
            <div class="stat-lbl">Free</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= GAME GRID ================= -->
    <section class="games-section">
      <h2 class="section-title">Pick a Challenge</h2>

      <div class="games-grid">
        <div
          v-for="game in games"
          :key="game.id"
          class="game-card"
          :class="`card-${game.color}`"
          @click="openGame(game)"
        >
          <div class="card-glow"></div>
          <div class="card-icon">{{ game.icon }}</div>
          <h3 class="card-title">{{ game.title }}</h3>
          <p class="card-desc">{{ game.desc }}</p>
          <div class="card-footer">
            <span class="difficulty" :class="`diff-${game.difficulty}`">
              {{ game.difficulty }}
            </span>
            <span class="play-btn">Play →</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= GAME MODAL ================= -->
    <transition name="modal-fade">
      <div v-if="activeGame" class="modal-overlay" @click.self="closeGame">
        <div class="modal">
          <div class="modal-header">
            <div class="modal-title">
              <span class="modal-icon">{{ activeGame.icon }}</span>
              {{ activeGame.title }}
            </div>
            <button class="close-btn" @click="closeGame">✕</button>
          </div>

          <div class="modal-body">
            <!-- ========== GAME 1: MEMORY MATRIX ========== -->
            <div v-if="activeGame.id === 'memory'" class="game-area">
              <p class="game-hint">
                Memorize the pattern, then click the tiles you saw.
                Level: <strong>{{ memoryLevel }}</strong> · Score: <strong>{{ memoryScore }}</strong>
              </p>
              <div class="memory-grid" :style="{ gridTemplateColumns: `repeat(${memorySize}, 1fr)` }">
                <button
                  v-for="(cell, i) in memoryGrid"
                  :key="i"
                  class="memory-tile"
                  :class="{ active: cell, correct: memoryCorrect.includes(i), wrong: memoryWrong.includes(i) }"
                  @click="memoryClick(i)"
                  :disabled="memoryShowPattern"
                ></button>
              </div>
              <button class="btn-primary" @click="startMemory">▶ Play</button>
            </div>

            <!-- ========== GAME 2: MATH BLITZ ========== -->
            <div v-if="activeGame.id === 'math'" class="game-area">
              <p class="game-hint">
                Score: <strong>{{ mathScore }}</strong> · Time: <strong>{{ mathTime }}s</strong>
              </p>
              <div class="math-question">{{ mathQuestion }}</div>
              <div class="math-options">
                <button
                  v-for="(opt, i) in mathOptions"
                  :key="i"
                  class="math-opt"
                  :class="{
                    correct: mathFeedback === 'correct' && opt === mathAnswer,
                    wrong: mathFeedback === 'wrong' && opt === mathPicked
                  }"
                  @click="mathAnswer_(opt)"
                  :disabled="mathFeedback !== '' || !mathRunning"
                >
                  {{ opt }}
                </button>
              </div>
              <button class="btn-primary" @click="startMath" v-if="!mathRunning">
                ▶ {{ mathScore > 0 ? 'Play Again' : 'Start' }}
              </button>
            </div>

            <!-- ========== GAME 3: CODE SEQUENCE ========== -->
            <div v-if="activeGame.id === 'sequence'" class="game-area">
              <p class="game-hint">
                Watch the sequence — then repeat it. Level: <strong>{{ seqLevel }}</strong>
              </p>
              <div class="seq-grid">
                <button
                  v-for="(c, i) in seqColors"
                  :key="i"
                  class="seq-btn"
                  :class="{ lit: seqLit === i }"
                  :style="{ background: seqLit === i ? c.glow : c.base }"
                  @click="seqClick(i)"
                  :disabled="seqPlaying || !seqActive"
                ></button>
              </div>
              <button class="btn-primary" @click="startSeq" v-if="!seqPlaying && !seqActive">
                ▶ {{ seqLevel > 1 ? 'Play Again' : 'Start' }}
              </button>
            </div>

            <!-- ========== GAME 4: WORD SCRAMBLE ========== -->
            <div v-if="activeGame.id === 'scramble'" class="game-area">
              <p class="game-hint">
                Unscramble the tech word! Score: <strong>{{ scrambleScore }}</strong>
              </p>
              <div class="scramble-word">{{ scrambleShuffled }}</div>
              <input
                v-model="scrambleGuess"
                class="scramble-input"
                placeholder="Type your answer..."
                @keyup.enter="checkScramble"
                :disabled="scrambleRevealed"
              />
              <div class="scramble-actions">
                <button class="btn-primary" @click="checkScramble" :disabled="scrambleRevealed">
                  Submit
                </button>
                <button class="btn-ghost" @click="nextScramble" v-if="scrambleRevealed">
                  Next →
                </button>
              </div>
              <p v-if="scrambleRevealed" class="scramble-reveal">
                {{ scrambleCorrect ? '✅ Correct!' : '❌ The word was: ' + scrambleWord }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ================= FOOTER NOTE ================= -->
    <footer class="gz-footer">
      Made with 💛 by <strong>Educational Society</strong> · Sharpen your mind daily
    </footer>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue'

/* =========================================================
   🔊 SOUND ENGINE (Web Audio API — no files needed)
   ========================================================= */
const soundEnabled = ref(true)
let audioCtx = null

function initAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.warn('Web Audio not supported')
    }
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
}

/**
 * Play a synthesized tone
 * @param {number} freq   - frequency in Hz
 * @param {number} dur    - duration in seconds
 * @param {string} type   - oscillator type: 'sine' | 'square' | 'triangle' | 'sawtooth'
 * @param {number} vol    - volume 0..1
 * @param {number} delay  - optional delay in seconds
 */
function playTone(freq, dur = 0.12, type = 'sine', vol = 0.15, delay = 0) {
  if (!soundEnabled.value) return
  initAudio()
  if (!audioCtx) return

  const startAt = audioCtx.currentTime + delay
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(freq, startAt)

  // Smooth envelope to prevent clicks
  gain.gain.setValueAtTime(0, startAt)
  gain.gain.linearRampToValueAtTime(vol, startAt + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, startAt + dur)

  osc.connect(gain)
  gain.connect(audioCtx.destination)

  osc.start(startAt)
  osc.stop(startAt + dur + 0.02)
}

/* --- Named sound presets --- */
const SFX = {
  // UI
  click:      () => playTone(600, 0.05, 'sine', 0.08),
  hover:      () => playTone(900, 0.04, 'sine', 0.04),
  openModal:  () => { playTone(500, 0.08, 'sine', 0.1); playTone(750, 0.1, 'sine', 0.1, 0.06) },
  closeModal: () => { playTone(500, 0.08, 'sine', 0.1); playTone(300, 0.1, 'sine', 0.1, 0.06) },

  // Game events
  correct:    () => { playTone(660, 0.1, 'sine', 0.15); playTone(880, 0.15, 'sine', 0.15, 0.09) },
  wrong:      () => { playTone(220, 0.18, 'sawtooth', 0.12); playTone(160, 0.22, 'sawtooth', 0.12, 0.05) },
  tileFlash:  () => playTone(1200, 0.06, 'sine', 0.08),
  levelUp:    () => {
    playTone(523, 0.1, 'triangle', 0.14)
    playTone(659, 0.1, 'triangle', 0.14, 0.09)
    playTone(784, 0.15, 'triangle', 0.14, 0.18)
    playTone(1046, 0.2, 'triangle', 0.14, 0.28)
  },
  gameOver:   () => {
    playTone(440, 0.15, 'sawtooth', 0.12)
    playTone(330, 0.2, 'sawtooth', 0.12, 0.13)
    playTone(220, 0.3, 'sawtooth', 0.12, 0.28)
  },
  win:        () => {
    playTone(523, 0.12, 'square', 0.1)
    playTone(659, 0.12, 'square', 0.1, 0.1)
    playTone(784, 0.12, 'square', 0.1, 0.2)
    playTone(1046, 0.25, 'square', 0.1, 0.3)
  },
  tick:       () => playTone(1200, 0.03, 'square', 0.05),
  seqNote:    (i) => {
    const notes = [261, 329, 392, 523] // C, E, G, C
    playTone(notes[i] || 400, 0.25, 'sine', 0.14)
  },
  type:       () => playTone(1400 + Math.random() * 400, 0.02, 'square', 0.02),
  scrambleOk: () => {
    playTone(880, 0.1, 'sine', 0.13)
    playTone(1175, 0.15, 'sine', 0.13, 0.09)
  },
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) {
    initAudio()
    SFX.click()
  }
}

/* ============ META ============ */
const games = ref([
  { id: 'memory',   icon: '🧠', title: 'Memory Matrix',   desc: 'Remember the pattern before it fades.', difficulty: 'easy',   color: 'amber'   },
  { id: 'math',     icon: '⚡', title: 'Math Blitz',      desc: 'Solve quick arithmetic against the clock.', difficulty: 'medium', color: 'emerald' },
  { id: 'sequence', icon: '🎨', title: 'Code Sequence',   desc: 'Repeat the color sequence — mind meets logic.', difficulty: 'medium', color: 'blue'    },
  { id: 'scramble', icon: '🔤', title: 'Word Scramble',   desc: 'Unscramble technical words fast.', difficulty: 'hard',   color: 'purple'  },
])

const totalPlays = ref(0)
const activeGame = ref(null)

function openGame(g) {
  SFX.openModal()
  activeGame.value = g
  totalPlays.value++
  if (g.id === 'memory')   startMemory()
  if (g.id === 'math')     resetMath()
  if (g.id === 'sequence') resetSeq()
  if (g.id === 'scramble') nextScramble()
}
function closeGame() {
  SFX.closeModal()
  activeGame.value = null
  stopAll()
  clearTimers()
}

/* ============ TIMERS ============ */
let timers = []
function addTimer(t) { timers.push(t) }
function clearTimers() { timers.forEach(clearInterval); timers.forEach(clearTimeout); timers = [] }

function stopAll() {
  memoryShowPattern.value = false
  mathRunning.value = false
  seqPlaying.value = false
}

/* =========================================================
   GAME 1 · MEMORY MATRIX
   ========================================================= */
const memorySize = ref(3)
const memoryGrid = ref(Array(9).fill(false))
const memoryLevel = ref(1)
const memoryScore = ref(0)
const memoryShowPattern = ref(false)
const memoryCorrect = ref([])
const memoryWrong = ref([])
let memoryAnswer = []

function startMemory() {
  memorySize.value = 3
  memoryGrid.value = Array(9).fill(false)
  memoryLevel.value = 1
  memoryScore.value = 0
  memoryCorrect.value = []
  memoryWrong.value = []
  runMemoryRound()
}

function runMemoryRound() {
  memoryCorrect.value = []
  memoryWrong.value = []
  memoryShowPattern.value = true
  const total = 9
  const count = Math.min(2 + memoryLevel.value, 6)
  memoryAnswer = []
  while (memoryAnswer.length < count) {
    const i = Math.floor(Math.random() * total)
    if (!memoryAnswer.includes(i)) memoryAnswer.push(i)
  }
  memoryGrid.value = Array(total).fill(false)
  memoryAnswer.forEach(i => { memoryGrid.value[i] = true })

  // 🔔 Subtle flash sound on reveal
  SFX.tileFlash()

  const t = setTimeout(() => {
    memoryShowPattern.value = false
    memoryGrid.value = Array(total).fill(false)
  }, 900 + memoryLevel.value * 200)
  addTimer(t)
}

function memoryClick(i) {
  if (memoryShowPattern.value) return
  if (memoryCorrect.value.includes(i) || memoryWrong.value.includes(i)) return

  if (memoryAnswer.includes(i)) {
    SFX.correct()
    memoryCorrect.value.push(i)
    memoryScore.value += 10
    if (memoryCorrect.value.length === memoryAnswer.length) {
      memoryLevel.value++
      SFX.levelUp()
      const t = setTimeout(runMemoryRound, 700)
      addTimer(t)
    }
  } else {
    SFX.wrong()
    memoryWrong.value.push(i)
    memoryScore.value = Math.max(0, memoryScore.value - 3)
  }
}

/* =========================================================
   GAME 2 · MATH BLITZ
   ========================================================= */
const mathQuestion = ref('')
const mathOptions = ref([])
const mathAnswer = ref(0)
const mathPicked = ref(null)
const mathScore = ref(0)
const mathTime = ref(30)
const mathRunning = ref(false)
const mathFeedback = ref('')
let mathTimer = null
let mathLastTick = 0

function resetMath() {
  mathScore.value = 0
  mathTime.value = 30
  mathQuestion.value = 'Press Start!'
  mathOptions.value = []
  mathFeedback.value = ''
  mathRunning.value = false
}

function startMath() {
  SFX.click()
  resetMath()
  mathRunning.value = true
  nextMathQuestion()
  mathTimer = setInterval(() => {
    mathTime.value--
    // 🔔 Countdown tick when time is running low
    if (mathTime.value <= 5 && mathTime.value > 0 && mathTime.value !== mathLastTick) {
      mathLastTick = mathTime.value
      SFX.tick()
    }
    if (mathTime.value <= 0) {
      mathRunning.value = false
      clearInterval(mathTimer)
      SFX.gameOver()
      mathQuestion.value = `⏰ Time's up! Final score: ${mathScore.value}`
      mathOptions.value = []
    }
  }, 1000)
  addTimer(mathTimer)
}

function nextMathQuestion() {
  mathFeedback.value = ''
  mathPicked.value = null
  const ops = ['+', '-', '×']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a, b, ans
  if (op === '+') { a = rand(5, 40); b = rand(5, 40); ans = a + b }
  else if (op === '-') { a = rand(20, 60); b = rand(5, a); ans = a - b }
  else { a = rand(2, 12); b = rand(2, 12); ans = a * b }

  mathQuestion.value = `${a} ${op} ${b} = ?`
  mathAnswer.value = ans
  const opts = new Set([ans])
  while (opts.size < 4) {
    opts.add(ans + Math.floor(Math.random() * 20) - 10)
  }
  mathOptions.value = [...opts].sort(() => Math.random() - 0.5)
}

function mathAnswer_(val) {
  if (!mathRunning.value || mathFeedback.value) return
  mathPicked.value = val
  if (val === mathAnswer.value) {
    SFX.correct()
    mathFeedback.value = 'correct'
    mathScore.value += 5
    mathTime.value = Math.min(30, mathTime.value + 2)
    const t = setTimeout(nextMathQuestion, 500)
    addTimer(t)
  } else {
    SFX.wrong()
    mathFeedback.value = 'wrong'
    mathTime.value = Math.max(0, mathTime.value - 3)
    const t = setTimeout(() => {
      mathFeedback.value = ''
      mathPicked.value = null
    }, 700)
    addTimer(t)
  }
}

/* =========================================================
   GAME 3 · CODE SEQUENCE
   ========================================================= */
const seqColors = [
  { base: '#f59e0b', glow: '#fbbf24' },
  { base: '#10b981', glow: '#34d399' },
  { base: '#3b82f6', glow: '#60a5fa' },
  { base: '#a855f7', glow: '#c084fc' },
]
const seqLit = ref(-1)
const seqLevel = ref(1)
const seqPlaying = ref(false)
const seqActive = ref(false)
let seqPattern = []
let seqPlayerIdx = 0

function resetSeq() {
  seqLit.value = -1
  seqLevel.value = 1
  seqPlaying.value = false
  seqActive.value = false
  seqPattern = []
}

function startSeq() {
  SFX.click()
  resetSeq()
  seqPattern = []
  nextSeqRound()
}

function nextSeqRound() {
  seqPlaying.value = true
  seqActive.value = false
  seqPlayerIdx = 0
  seqPattern.push(Math.floor(Math.random() * 4))

  let i = 0
  const playNext = () => {
    if (i >= seqPattern.length) {
      seqPlaying.value = false
      seqActive.value = true
      return
    }
    seqLit.value = seqPattern[i]
    // 🎵 Each color has its own note
    SFX.seqNote(seqPattern[i])
    const t1 = setTimeout(() => { seqLit.value = -1 }, 380)
    i++
    const t2 = setTimeout(playNext, 620)
    addTimer(t1); addTimer(t2)
  }
  const start = setTimeout(playNext, 400)
  addTimer(start)
}

function seqClick(i) {
  if (!seqActive.value) return
  seqLit.value = i
  // 🎵 Player click note
  SFX.seqNote(i)
  const t = setTimeout(() => { seqLit.value = -1 }, 200)
  addTimer(t)

  if (seqPattern[seqPlayerIdx] === i) {
    seqPlayerIdx++
    if (seqPlayerIdx === seqPattern.length) {
      seqActive.value = false
      seqLevel.value++
      SFX.levelUp()
      const t2 = setTimeout(nextSeqRound, 800)
      addTimer(t2)
    }
  } else {
    // Wrong — reset
    SFX.gameOver()
    seqActive.value = false
    seqLevel.value = 1
    seqPattern = []
    const t2 = setTimeout(startSeq, 900)
    addTimer(t2)
  }
}

/* =========================================================
   GAME 4 · WORD SCRAMBLE
   ========================================================= */
const techWords = [
  'ALGORITHM', 'COMPILER', 'VARIABLE', 'FUNCTION', 'INTERNET',
  'DATABASE', 'NETWORK', 'PROTOCOL', 'BINARY', 'DEBUG',
  'KEYBOARD', 'SOFTWARE', 'HARDWARE', 'ENCRYPT', 'FIREWALL',
  'JAVASCRIPT', 'PYTHON', 'RUNTIME', 'TERMINAL', 'MATRIX',
]
const scrambleWord = ref('')
const scrambleShuffled = ref('')
const scrambleGuess = ref('')
const scrambleScore = ref(0)
const scrambleRevealed = ref(false)
const scrambleCorrect = ref(false)

function nextScramble() {
  SFX.click()
  scrambleRevealed.value = false
  scrambleCorrect.value = false
  scrambleGuess.value = ''
  const word = techWords[Math.floor(Math.random() * techWords.length)]
  scrambleWord.value = word
  scrambleShuffled.value = shuffle(word)
}

function shuffle(str) {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const result = arr.join('')
  return result === str ? shuffle(str) : result
}

function checkScramble() {
  if (scrambleRevealed.value) return
  scrambleRevealed.value = true
  scrambleCorrect.value =
    scrambleGuess.value.trim().toUpperCase() === scrambleWord.value
  if (scrambleCorrect.value) {
    SFX.scrambleOk()
    scrambleScore.value += 10
  } else {
    SFX.wrong()
  }
}

/* ============ UTIL ============ */
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

/* 🔊 Initialize audio on first user interaction (browser policy) */
function firstInteraction() {
  initAudio()
  window.removeEventListener('click', firstInteraction)
  window.removeEventListener('keydown', firstInteraction)
  window.removeEventListener('touchstart', firstInteraction)
}

onMounted(() => {
  // Load sound preference
  const saved = localStorage.getItem('gz_sound')
  if (saved !== null) soundEnabled.value = saved === '1'

  window.addEventListener('click', firstInteraction, { once: true })
  window.addEventListener('keydown', firstInteraction, { once: true })
  window.addEventListener('touchstart', firstInteraction, { once: true })
})

onUnmounted(() => {
  clearTimers()
  window.removeEventListener('click', firstInteraction)
  window.removeEventListener('keydown', firstInteraction)
  window.removeEventListener('touchstart', firstInteraction)
})

// Persist sound preference
import { watch } from 'vue'
watch(soundEnabled, v => localStorage.setItem('gz_sound', v ? '1' : '0'))
</script>

<style scoped>
/* =========================================================
   BASE
   ========================================================= */
.gamezone {
  position: relative;
  min-height: 100vh;
  background: #070b14;
  color: #e6edf7;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
  padding-bottom: 3rem;
}

/* =========================================================
   SOUND TOGGLE
   ========================================================= */
.sound-toggle {
  position: fixed; top: 1rem; right: 1rem; z-index: 200;
  width: 46px; height: 46px; border-radius: 50%;
  background: rgba(15,23,42,0.85);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.sound-toggle:hover {
  transform: scale(1.08);
  border-color: rgba(251,191,36,0.5);
  box-shadow: 0 0 20px rgba(251,191,36,0.3);
}
.sound-icon { font-size: 1.2rem; line-height: 1; }

/* =========================================================
   AMBIENT BLOBS
   ========================================================= */
.bg-blobs { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.blob {
  position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.35;
}
.blob-1 { width: 480px; height: 480px; background: #f59e0b; top: -150px; left: -120px; animation: float1 14s ease-in-out infinite; }
.blob-2 { width: 420px; height: 420px; background: #10b981; bottom: -120px; right: -100px; animation: float2 16s ease-in-out infinite; }
.blob-3 { width: 360px; height: 360px; background: #6366f1; top: 45%; left: 55%; animation: float1 18s ease-in-out infinite reverse; }

@keyframes float1 {
  0%,100% { transform: translate(0,0) scale(1); }
  50%     { transform: translate(40px,-30px) scale(1.1); }
}
@keyframes float2 {
  0%,100% { transform: translate(0,0) scale(1); }
  50%     { transform: translate(-40px,30px) scale(1.15); }
}

/* =========================================================
   HERO
   ========================================================= */
.hero {
  position: relative; z-index: 1;
  padding: 5rem 1.5rem 3rem;
  text-align: center;
}
.hero-content { max-width: 780px; margin: 0 auto; }

.badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 0.82rem; color: #cbd5e1; margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
}
.pulse-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #10b981;
  box-shadow: 0 0 0 0 rgba(16,185,129,0.7);
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
  70% { box-shadow: 0 0 0 12px rgba(16,185,129,0); }
  100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
}

.hero-title {
  font-size: clamp(2.6rem, 8vw, 4.5rem);
  font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
  margin-bottom: 1rem;
}
.grad-amber   { background: linear-gradient(120deg,#fbbf24,#f59e0b,#fcd34d); -webkit-background-clip: text; background-clip: text; color: transparent; }
.grad-emerald { background: linear-gradient(120deg,#10b981,#34d399,#059669); -webkit-background-clip: text; background-clip: text; color: transparent; }

.hero-sub {
  font-size: 1.05rem; color: #94a3b8; max-width: 560px; margin: 0 auto 2rem;
  line-height: 1.6;
}
.hero-sub strong { color: #fbbf24; font-weight: 600; }

.hero-stats {
  display: inline-flex; align-items: center; gap: 1.5rem;
  padding: 1rem 1.8rem; border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
}
.stat { text-align: center; }
.stat-num {
  font-size: 1.5rem; font-weight: 700;
  background: linear-gradient(120deg,#fbbf24,#10b981);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.stat-lbl { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-top: 2px; }
.divider { width: 1px; height: 34px; background: rgba(255,255,255,0.08); }

/* =========================================================
   GAMES GRID
   ========================================================= */
.games-section {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem;
}
.section-title {
  font-size: 1.6rem; font-weight: 700; margin-bottom: 1.5rem;
  color: #e2e8f0;
  display: flex; align-items: center; gap: 10px;
}
.section-title::before {
  content: ''; width: 4px; height: 26px; border-radius: 4px;
  background: linear-gradient(180deg,#fbbf24,#10b981);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.game-card {
  position: relative;
  padding: 1.6rem 1.4rem 1.2rem;
  border-radius: 20px;
  background: rgba(15,23,42,0.7);
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.2,0.9,0.4,1.1);
  backdrop-filter: blur(10px);
}
.game-card:hover {
  transform: translateY(-6px);
  border-color: rgba(251,191,36,0.5);
  box-shadow: 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 30px rgba(251,191,36,0.15);
}
.card-glow {
  position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(circle at top right, rgba(251,191,36,0.2), transparent 65%);
  transition: opacity 0.4s;
  pointer-events: none;
}
.game-card:hover .card-glow { opacity: 1; }

.card-emerald .card-glow  { background: radial-gradient(circle at top right, rgba(16,185,129,0.25), transparent 65%); }
.card-blue .card-glow     { background: radial-gradient(circle at top right, rgba(59,130,246,0.25), transparent 65%); }
.card-purple .card-glow   { background: radial-gradient(circle at top right, rgba(168,85,247,0.25), transparent 65%); }
.card-emerald:hover { border-color: rgba(16,185,129,0.5); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 30px rgba(16,185,129,0.18); }
.card-blue:hover    { border-color: rgba(59,130,246,0.5); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.18); }
.card-purple:hover  { border-color: rgba(168,85,247,0.5); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 30px rgba(168,85,247,0.18); }

.card-icon {
  font-size: 2.4rem; margin-bottom: 0.7rem;
  filter: drop-shadow(0 0 12px rgba(251,191,36,0.4));
}
.card-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem; color: #f1f5f9; }
.card-desc { font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1rem; }

.card-footer { display: flex; justify-content: space-between; align-items: center; }
.difficulty {
  font-size: 0.7rem; padding: 3px 10px; border-radius: 999px;
  text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;
}
.diff-easy   { background: rgba(16,185,129,0.15); color: #34d399; }
.diff-medium { background: rgba(251,191,36,0.15); color: #fbbf24; }
.diff-hard   { background: rgba(239,68,68,0.15); color: #f87171; }

.play-btn {
  font-size: 0.85rem; font-weight: 600; color: #fbbf24;
  transition: transform 0.25s;
}
.game-card:hover .play-btn { transform: translateX(4px); }

/* =========================================================
   MODAL
   ========================================================= */
.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(2,6,23,0.85);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}
.modal {
  width: 100%; max-width: 520px;
  background: linear-gradient(160deg, #0f172a, #0b1220);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8), 0 0 60px rgba(251,191,36,0.1);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem 1.4rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
}
.modal-title { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.05rem; }
.modal-icon { font-size: 1.4rem; }
.close-btn {
  background: rgba(255,255,255,0.06); border: none;
  color: #cbd5e1; width: 32px; height: 32px; border-radius: 50%;
  cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
}
.close-btn:hover { background: rgba(239,68,68,0.2); color: #f87171; }

.modal-body { padding: 1.5rem 1.4rem 1.8rem; }

.game-area { display: flex; flex-direction: column; align-items: center; gap: 1rem; }

.game-hint {
  font-size: 0.9rem; color: #94a3b8; text-align: center; line-height: 1.5;
}
.game-hint strong { color: #fbbf24; }

/* ========== MEMORY ========== */
.memory-grid {
  display: grid; gap: 8px; width: 100%; max-width: 320px;
}
.memory-tile {
  aspect-ratio: 1; border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer; transition: all 0.25s;
}
.memory-tile.active {
  background: linear-gradient(135deg,#fbbf24,#f59e0b);
  box-shadow: 0 0 20px rgba(251,191,36,0.6);
}
.memory-tile.correct {
  background: linear-gradient(135deg,#10b981,#059669);
  box-shadow: 0 0 16px rgba(16,185,129,0.6);
}
.memory-tile.wrong {
  background: linear-gradient(135deg,#ef4444,#dc2626);
}

/* ========== MATH ========== */
.math-question {
  font-size: 2rem; font-weight: 800; text-align: center;
  color: #fbbf24; padding: 1.5rem 0;
  text-shadow: 0 0 20px rgba(251,191,36,0.4);
}
.math-options {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%;
}
.math-opt {
  padding: 0.9rem; border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #e2e8f0; font-size: 1.1rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.math-opt:hover:not(:disabled) { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
.math-opt.correct { background: rgba(16,185,129,0.25); border-color: #10b981; color: #34d399; }
.math-opt.wrong   { background: rgba(239,68,68,0.25); border-color: #ef4444; color: #f87171; }

/* ========== SEQUENCE ========== */
.seq-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  width: 100%; max-width: 320px; margin: 0.5rem 0;
}
.seq-btn {
  aspect-ratio: 1; border-radius: 18px; border: none;
  cursor: pointer; transition: all 0.2s;
  box-shadow: inset 0 -6px 0 rgba(0,0,0,0.25);
}
.seq-btn:hover:not(:disabled) { transform: scale(1.03); }
.seq-btn.lit { transform: scale(1.06); }

/* ========== SCRAMBLE ========== */
.scramble-word {
  font-size: 1.8rem; font-weight: 800; letter-spacing: 0.2em;
  color: #a855f7; text-align: center; padding: 1.5rem 0;
  text-shadow: 0 0 20px rgba(168,85,247,0.4);
}
.scramble-input {
  width: 100%; padding: 0.9rem 1rem; border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #e2e8f0; font-size: 1rem; text-align: center;
  outline: none; transition: all 0.25s;
}
.scramble-input:focus { border-color: #a855f7; box-shadow: 0 0 0 3px rgba(168,85,247,0.2); }
.scramble-actions { display: flex; gap: 10px; }
.scramble-reveal { font-size: 1rem; font-weight: 600; }

/* ========== BUTTONS ========== */
.btn-primary {
  padding: 0.75rem 2rem; border-radius: 12px;
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  color: #0b1220; font-weight: 700; font-size: 0.95rem;
  border: none; cursor: pointer; transition: all 0.25s;
  box-shadow: 0 8px 20px -6px rgba(251,191,36,0.5);
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 26px -6px rgba(251,191,36,0.7); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-ghost {
  padding: 0.75rem 1.5rem; border-radius: 12px;
  background: transparent; color: #fbbf24;
  border: 1px solid rgba(251,191,36,0.4);
  font-weight: 600; cursor: pointer; transition: all 0.25s;
}
.btn-ghost:hover { background: rgba(251,191,36,0.1); }

/* ========== MODAL TRANSITION ========== */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-active .modal, .modal-fade-leave-active .modal { transition: transform 0.3s cubic-bezier(0.2,0.9,0.4,1.1), opacity 0.3s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal, .modal-fade-leave-to .modal { transform: scale(0.9) translateY(20px); opacity: 0; }

/* =========================================================
   FOOTER
   ========================================================= */
.gz-footer {
  position: relative; z-index: 1;
  text-align: center; padding: 2rem 1.5rem 0;
  color: #64748b; font-size: 0.85rem;
}
.gz-footer strong { color: #fbbf24; }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 640px) {
  .hero { padding: 3.5rem 1.2rem 2rem; }
  .hero-stats { gap: 1rem; padding: 0.9rem 1.2rem; }
  .stat-num { font-size: 1.2rem; }
  .games-grid { grid-template-columns: 1fr 1fr; gap: 0.9rem; }
  .game-card { padding: 1.1rem 0.9rem 0.9rem; border-radius: 16px; }
  .card-icon { font-size: 1.9rem; }
  .card-title { font-size: 1rem; }
  .card-desc { font-size: 0.75rem; }
  .modal-body { padding: 1.2rem 1rem 1.5rem; }
  .math-question { font-size: 1.5rem; padding: 1rem 0; }
  .scramble-word { font-size: 1.3rem; letter-spacing: 0.15em; }
  .seq-grid, .memory-grid { max-width: 260px; }
  .sound-toggle { top: 0.7rem; right: 0.7rem; width: 40px; height: 40px; }
}
@media (max-width: 380px) {
  .games-grid { grid-template-columns: 1fr; }
  .math-options { grid-template-columns: 1fr; }
}
</style>