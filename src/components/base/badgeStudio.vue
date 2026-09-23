<!-- badgeStudio.vue -->
<template>
  <div class="bs-page dark:bg-[#070b14] bg-slate-50">
    <!-- Ambient blobs -->
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- ================= HEADER ================= -->
    <header class="page-header dark:bg-slate-900/70 bg-white/70 dark:border-white/5 border-slate-200">
      <div class="header-inner">
        <div class="header-left">
          <div class="logo-icon">🏅</div>
          <div>
            <h1 class="page-title dark:text-white text-slate-900">
              <span class="grad-amber">Badge</span>
              <span class="grad-emerald">Studio</span>
            </h1>
            <p class="page-sub dark:text-slate-400 text-slate-500">
              Design your badge · Download · Share with friends
            </p>
          </div>
        </div>

        <div class="header-actions">
          <button
            class="btn-icon dark:text-slate-200 text-slate-700 dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200"
            @click="toggleSound"
            :title="soundEnabled ? 'Mute' : 'Unmute'"
          >
            {{ soundEnabled ? '🔊' : '🔇' }}
          </button>
        </div>
      </div>
    </header>

    <!-- ================= MAIN ================= -->
    <main class="main-grid">
      <!-- ============ LEFT: CONTROLS ============ -->
      <section class="controls-panel dark:bg-slate-900/70 bg-white dark:border-white/10 border-slate-200">
        <div class="panel-head dark:border-white/5 border-slate-200">
          <span class="panel-icon">🎨</span>
          <span class="panel-title dark:text-white text-slate-900">Customize</span>
        </div>

        <div class="panel-body">
          <!-- TEMPLATE -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">Style</label>
            <div class="template-row">
              <button
                v-for="t in templates"
                :key="t.id"
                class="template-btn"
                :class="{ active: badge.template === t.id }"
                @click="setTemplate(t.id)"
                :title="t.name"
              >
                <span class="template-preview" :style="{ background: t.preview }"></span>
                <span class="template-name dark:text-slate-400 text-slate-600">{{ t.name }}</span>
              </button>
            </div>
          </div>

          <!-- AVATAR / EMOJI -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">
              Avatar Emoji
              <span class="ctrl-hint dark:text-slate-500 text-slate-400">(pick one)</span>
            </label>
            <div class="emoji-grid">
              <button
                v-for="e in emojis"
                :key="e"
                class="emoji-btn"
                :class="{ active: badge.emoji === e }"
                @click="badge.emoji = e; SFX.click()"
              >{{ e }}</button>
            </div>
          </div>

          <!-- NAME -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">
              Your Name
              <span class="ctrl-hint dark:text-slate-500 text-slate-400">({{ badge.name.length }}/18)</span>
            </label>
            <input
              v-model="badge.name"
              maxlength="18"
              class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          <!-- TITLE -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">
              Title
              <span class="ctrl-hint dark:text-slate-500 text-slate-400">({{ badge.title.length }}/24)</span>
            </label>
            <input
              v-model="badge.title"
              maxlength="24"
              class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
              placeholder="e.g. Math Wizard"
            />
          </div>

          <!-- QUICK TITLES -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">Quick Titles</label>
            <div class="quick-titles">
              <button
                v-for="t in quickTitles"
                :key="t"
                class="quick-chip dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 dark:border-white/10 border-slate-200"
                @click="badge.title = t; SFX.click()"
              >{{ t }}</button>
            </div>
          </div>

          <!-- SUBTITLE / SCHOOL -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">
              Subtitle
              <span class="ctrl-hint dark:text-slate-500 text-slate-400">(optional)</span>
            </label>
            <input
              v-model="badge.subtitle"
              maxlength="30"
              class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
              placeholder="e.g. Class 10 · Delhi Public School"
            />
          </div>

          <!-- COLOR THEME -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">Color Theme</label>
            <div class="theme-grid">
              <button
                v-for="th in themes"
                :key="th.id"
                class="theme-swatch"
                :class="{ active: badge.theme === th.id }"
                :style="{ background: `linear-gradient(135deg, ${th.from}, ${th.to})` }"
                @click="badge.theme = th.id; SFX.click()"
                :title="th.name"
              ></button>
            </div>
          </div>

          <!-- PATTERN -->
          <div class="control-group">
            <label class="ctrl-label dark:text-slate-300 text-slate-700">Pattern</label>
            <div class="pattern-row">
              <button
                v-for="p in patterns"
                :key="p.id"
                class="pattern-btn dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 dark:text-slate-300 text-slate-600"
                :class="{ active: badge.pattern === p.id }"
                @click="badge.pattern = p.id; SFX.click()"
              >
                <span>{{ p.icon }}</span> {{ p.name }}
              </button>
            </div>
          </div>

          <!-- SHOW BRAND -->
          <div class="control-group toggle-group">
            <div>
              <div class="ctrl-label dark:text-slate-300 text-slate-700">Show Branding</div>
              <div class="ctrl-hint dark:text-slate-500 text-slate-400">Educational Society watermark</div>
            </div>
            <button
              class="toggle"
              :class="{ on: badge.showBrand }"
              @click="badge.showBrand = !badge.showBrand; SFX.click()"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>
        </div>
      </section>

      <!-- ============ RIGHT: PREVIEW ============ -->
      <section class="preview-panel">
        <div class="preview-head">
          <div class="preview-tabs dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200">
            <button
              class="tab-btn"
              :class="{ active: previewSize === 'lg' }"
              @click="previewSize = 'lg'; SFX.click()"
            >Large</button>
            <button
              class="tab-btn"
              :class="{ active: previewSize === 'sm' }"
              @click="previewSize = 'sm'; SFX.click()"
            >Small</button>
          </div>
        </div>

        <!-- BADGE CANVAS (this is what gets exported) -->
        <div class="badge-stage">
          <div
            ref="badgeRef"
            class="badge"
            :class="[`size-${previewSize}`, `tmpl-${badge.template}`]"
            :style="badgeStyle"
          >
            <!-- Pattern layer -->
            <div class="badge-pattern" :class="`pattern-${badge.pattern}`"></div>

            <!-- Ribbon (some templates) -->
            <div v-if="badge.template === 'ribbon'" class="ribbon">
              <span>★</span>
            </div>

            <!-- Content -->
            <div class="badge-content">
              <!-- Emoji avatar -->
              <div class="badge-avatar">
                <div class="avatar-ring"></div>
                <div class="avatar-emoji">{{ badge.emoji }}</div>
              </div>

              <!-- Name -->
              <div class="badge-name">{{ badge.name || 'Your Name' }}</div>

              <!-- Title -->
              <div class="badge-title-wrap">
                <div class="badge-title">{{ badge.title || 'Your Title' }}</div>
              </div>

              <!-- Subtitle -->
              <div v-if="badge.subtitle" class="badge-subtitle">{{ badge.subtitle }}</div>
            </div>

            <!-- Branding -->
            <div v-if="badge.showBrand" class="badge-brand">
              <div class="brand-logo">
                <!-- image -->
                <img src="/ES_New_logo_notext.jpeg" alt="Educational Society Logo" width="20px" height="20px" class="rounded-full"/>
              </div>
              <div class="brand-text">
                <span class="brand-edu">Educational</span>
                <span class="brand-soc">Society</span>
              </div>
            </div>

            <!-- Shine overlay -->
            <div class="badge-shine"></div>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="actions-row">
          <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="randomize">
            🎲 Randomize
          </button>
          <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="resetBadge">
            🔄 Reset
          </button>
          <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="downloadBadge">
            ⬇️ Download PNG
          </button>
          <button class="btn-primary" @click="shareBadge">
            <span>📤</span> Share
          </button>
        </div>

        <!-- SHARE HINT -->
        <div class="share-hint dark:text-slate-400 text-slate-500">
          💡 Tip: Download the badge and share it on WhatsApp, Instagram or your class group!
        </div>
      </section>
    </main>

    <!-- ================= FOOTER ================= -->
    <footer class="page-footer dark:border-white/5 border-slate-200">
      <p class="credit dark:text-slate-500 text-slate-500">
        Made with 💛 by <strong>Educational Society</strong> · Your badge, your identity
      </p>
    </footer>

    <!-- ================= TOAST ================= -->
    <transition name="toast-fade">
      <div v-if="toast" class="toast">
        <span class="toast-icon">{{ toast.icon }}</span>
        <span class="toast-text">{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

/* =========================================================
   🔊 SOUND ENGINE
   ========================================================= */
const soundEnabled = ref(true)
let audioCtx = null

function initAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)() } catch (e) {}
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
  click:     () => playTone(600, 0.05, 'sine', 0.08),
  success:   () => { playTone(660, 0.1, 'sine', 0.14); playTone(880, 0.15, 'sine', 0.14, 0.09) },
  download:  () => { playTone(523, 0.1, 'triangle', 0.13); playTone(784, 0.14, 'triangle', 0.13, 0.09) },
  share:     () => { playTone(659, 0.1, 'sine', 0.13); playTone(880, 0.13, 'sine', 0.13, 0.08); playTone(1046, 0.16, 'sine', 0.13, 0.16) },
  random:    () => { playTone(400, 0.05, 'square', 0.08); playTone(600, 0.05, 'square', 0.08, 0.05); playTone(900, 0.08, 'square', 0.08, 0.1) },
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) { initAudio(); SFX.click() }
  localStorage.setItem('bs_sound', soundEnabled.value ? '1' : '0')
}

/* =========================================================
   STATE
   ========================================================= */
const badgeRef = ref(null)
const previewSize = ref('lg')

const templates = [
  { id: 'classic', name: 'Classic',  preview: 'linear-gradient(135deg,#fbbf24,#10b981)' },
  { id: 'circle',  name: 'Circle',   preview: 'radial-gradient(circle,#fbbf24 30%,#10b981)' },
  { id: 'shield',  name: 'Shield',   preview: 'linear-gradient(135deg,#6366f1,#a855f7)' },
  { id: 'ribbon',  name: 'Ribbon',   preview: 'linear-gradient(135deg,#ec4899,#f59e0b)' },
]

const emojis = [
  '🦁','🐯','🦊','🐼','🐨','🦉','🐺','🦄','🐸','🐙',
  '🚀','⚡','🌟','💎','🔥','🎯','🧠','🎓','👑','🛡️',
  '⭐','🎨','🎮','💻','📚','🏆','🥇','✨','🌈','🍀',
]

const quickTitles = [
  'Math Wizard', 'Code Ninja', 'Science Star', 'Reading Hero',
  'Python Pro', 'Quiz Champion', 'Top Scorer', 'Fast Learner',
  'Creative Mind', 'Future Engineer', 'Curious Explorer', 'Team Player',
]

const themes = [
  { id: 'amber-emerald', name: 'Amber→Emerald', from: '#fbbf24', to: '#10b981' },
  { id: 'sunset',        name: 'Sunset',        from: '#f97316', to: '#ec4899' },
  { id: 'ocean',         name: 'Ocean',         from: '#06b6d4', to: '#3b82f6' },
  { id: 'royal',         name: 'Royal',         from: '#6366f1', to: '#a855f7' },
  { id: 'fire',          name: 'Fire',          from: '#ef4444', to: '#f59e0b' },
  { id: 'emerald',       name: 'Emerald',       from: '#10b981', to: '#06b6d4' },
  { id: 'purple-pink',   name: 'Purple Pink',   from: '#a855f7', to: '#ec4899' },
  { id: 'mono',          name: 'Mono',          from: '#334155', to: '#64748b' },
  { id: 'gold',          name: 'Gold',          from: '#fbbf24', to: '#b45309' },
]

const patterns = [
  { id: 'none',      name: 'None',      icon: '⬜' },
  { id: 'dots',      name: 'Dots',      icon: '⠿' },
  { id: 'stripes',   name: 'Stripes',   icon: '⋮⋮' },
  { id: 'stars',     name: 'Stars',     icon: '✦' },
  { id: 'grid',      name: 'Grid',      icon: '⊞' },
  { id: 'rays',      name: 'Rays',      icon: '☀' },
]

const badge = ref({
  template: 'classic',
  emoji: '🦁',
  name: '',
  title: '',
  subtitle: '',
  theme: 'amber-emerald',
  pattern: 'dots',
  showBrand: true,
})

const currentTheme = computed(() =>
  themes.find(t => t.id === badge.value.theme) || themes[0]
)

const badgeStyle = computed(() => {
  const th = currentTheme.value
  return {
    background: `linear-gradient(135deg, ${th.from} 0%, ${th.to} 100%)`,
  }
})

/* =========================================================
   TOAST
   ========================================================= */
const toast = ref(null)
let toastTimer = null
function showToast(message, icon = '✨') {
  toast.value = { message, icon }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = null), 2500)
}

/* =========================================================
   PERSISTENCE
   ========================================================= */
const STORAGE_KEY = 'esch_badge_v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      badge.value = { ...badge.value, ...parsed }
    }
  } catch (e) {}
}

watch(badge, (v) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)) } catch (e) {}
}, { deep: true })

/* =========================================================
   ACTIONS
   ========================================================= */
function setTemplate(id) {
  badge.value.template = id
  SFX.click()
}

function randomize() {
  SFX.random()
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]
  badge.value.emoji = rand(emojis)
  badge.value.theme = rand(themes).id
  badge.value.pattern = rand(patterns).id
  badge.value.template = rand(templates).id
  if (!badge.value.title) badge.value.title = rand(quickTitles)
  showToast('Randomized! 🎲', '🎲')
}

function resetBadge() {
  SFX.click()
  badge.value = {
    template: 'classic',
    emoji: '🦁',
    name: '',
    title: '',
    subtitle: '',
    theme: 'amber-emerald',
    pattern: 'dots',
    showBrand: true,
  }
  showToast('Reset to default', '🔄')
}

/* =========================================================
   EXPORT TO IMAGE (using SVG foreignObject → canvas)
   ========================================================= */
async function downloadBadge() {
  SFX.download()
  try {
    // Use modern approach: render the badge visually, take its computed styles
    const node = badgeRef.value
    if (!node) return

    // Build a static SVG that mirrors the DOM — then draw to canvas.
    // Easiest reliable method: use html2canvas if available, else SVG fallback.
    if (typeof window.html2canvas === 'undefined') {
      await loadHtml2Canvas()
    }
    if (typeof window.html2canvas === 'function') {
      await nextTick()
      const canvas = await window.html2canvas(node, {
        backgroundColor: null,
        scale: 3,           // 3x for crisp download
        useCORS: true,
        logging: false,
      })
      const url = canvas.toDataURL('image/png')
      triggerDownload(url, badge.value.name || 'my-badge')
      showToast('Badge downloaded! 🎉', '⬇️')
      SFX.success()
      return
    }

    // Fallback: use SVG foreignObject (works everywhere)
    await svgFallbackDownload(node)
  } catch (err) {
    console.error(err)
    showToast('Download failed. Try again.', '⚠️')
  }
}

function triggerDownload(dataUrl, baseName) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = `${baseName.replace(/\s+/g, '-').toLowerCase()}-badge.png`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function loadHtml2Canvas() {
  return new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'
    s.onload = resolve
    s.onerror = resolve
    document.head.appendChild(s)
  })
}

async function svgFallbackDownload(node) {
  const rect = node.getBoundingClientRect()
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  const html = node.outerHTML

  // Inline the computed styles for the top-level wrapper
  const styles = gatherStyles(node)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="${styles}">${node.innerHTML}</div>
      </foreignObject>
    </svg>`

  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = w * 3
    canvas.height = h * 3
    const ctx = canvas.getContext('2d')
    ctx.scale(3, 3)
    ctx.drawImage(img, 0, 0)
    URL.revokeObjectURL(url)
    triggerDownload(canvas.toDataURL('image/png'), badge.value.name || 'my-badge')
    showToast('Badge downloaded! 🎉', '⬇️')
  }
  img.onerror = () => {
    URL.revokeObjectURL(url)
    showToast('Download failed.', '⚠️')
  }
  img.src = url
}

function gatherStyles(node) {
  const cs = window.getComputedStyle(node)
  const keys = [
    'width','height','background','backgroundImage','borderRadius',
    'padding','color','fontFamily','fontWeight','fontSize','boxShadow',
  ]
  return keys.map(k => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${cs[k]}`).join(';')
}

/* =========================================================
   SHARE
   ========================================================= */
async function shareBadge() {
  SFX.share()

  const name = badge.value.name || 'My Badge'
  const title = badge.value.title || 'a new title'
  const shareText = `🏅 I just created my ${name} badge — "${title}" on Educational Society!`

  // Build a data URL for image sharing
  let file = null
  try {
    const node = badgeRef.value
    if (node) {
      if (typeof window.html2canvas === 'undefined') {
        await loadHtml2Canvas()
      }
      if (typeof window.html2canvas === 'function') {
        await nextTick()
        const canvas = await window.html2canvas(node, {
          backgroundColor: null,
          scale: 3,
          useCORS: true,
          logging: false,
        })
        const blob = await new Promise(res => canvas.toBlob(res, 'image/png'))
        file = new File([blob], 'my-badge.png', { type: 'image/png' })
      }
    }
  } catch (e) {
    console.warn('Could not generate image for sharing', e)
  }

  // Try native share (mobile)
  if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: 'My Educational Society Badge',
        text: shareText,
        files: [file],
      })
      showToast('Shared! 🎉', '📤')
      return
    } catch (e) {
      // user cancelled or not supported → fall through
    }
  }

  // Fallback: Web Share API without files
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Educational Society Badge',
        text: shareText,
        url: window.location.origin + '/badge',
      })
      showToast('Shared! 🎉', '📤')
      return
    } catch (e) {}
  }

  // Final fallback: copy text + prompt download
  try {
    await navigator.clipboard.writeText(shareText + ' ' + window.location.origin)
    showToast('Text copied! Paste it anywhere 📋', '📋')
    if (file) {
      // Also trigger download so they can attach it
      const url = URL.createObjectURL(file)
      triggerDownload(url, badge.value.name || 'my-badge')
      URL.revokeObjectURL(url)
    }
  } catch (e) {
    showToast('Sharing not supported on this device', '⚠️')
  }
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
onMounted(() => {
  const savedSound = localStorage.getItem('bs_sound')
  if (savedSound !== null) soundEnabled.value = savedSound === '1'
  loadFromStorage()
})
</script>

<style scoped>
/* =========================================================
   BASE
   ========================================================= */
.bs-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
}

/* =========================================================
   BLOBS
   ========================================================= */
.bg-blobs { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.22; }
.blob-1 { width: 500px; height: 500px; background: #f59e0b; top: -160px; left: -140px; animation: float1 16s ease-in-out infinite; }
.blob-2 { width: 460px; height: 460px; background: #10b981; bottom: -140px; right: -120px; animation: float2 18s ease-in-out infinite; }
.blob-3 { width: 380px; height: 380px; background: #a855f7; top: 40%; left: 50%; animation: float1 20s ease-in-out infinite reverse; }
@keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.1); } }
@keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,30px) scale(1.15); } }

/* =========================================================
   HEADER
   ========================================================= */
.page-header {
  position: relative; z-index: 3;
  padding: 1.2rem 1.5rem;
  border-bottom-width: 1px;
  backdrop-filter: blur(12px);
}
.header-inner {
  max-width: 1400px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  gap: 1rem;
}
.header-left { display: flex; align-items: center; gap: 14px; }
.logo-icon {
  font-size: 2rem; line-height: 1;
  filter: drop-shadow(0 0 16px rgba(251,191,36,0.5));
  animation: bob 3s ease-in-out infinite;
}
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

.page-title {
  font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em;
  margin: 0; line-height: 1.2;
}
.grad-amber   { background: linear-gradient(120deg,#fbbf24,#f59e0b,#fcd34d); -webkit-background-clip: text; background-clip: text; color: transparent; }
.grad-emerald { background: linear-gradient(120deg,#10b981,#34d399,#059669); -webkit-background-clip: text; background-clip: text; color: transparent; }
.page-sub { font-size: 0.78rem; margin-top: 2px; }

.btn-icon {
  width: 40px; height: 40px; border-radius: 10px;
  border-width: 1px;
  cursor: pointer; font-size: 1.1rem;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.btn-icon:hover { transform: scale(1.06); border-color: rgba(251,191,36,0.4); }

/* =========================================================
   MAIN GRID
   ========================================================= */
.main-grid {
  position: relative; z-index: 1;
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* =========================================================
   CONTROLS PANEL
   ========================================================= */
.controls-panel {
  border-radius: 20px;
  border-width: 1px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 1.5rem;
  max-height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
}
.panel-head {
  display: flex; align-items: center; gap: 10px;
  padding: 1rem 1.2rem;
  border-bottom-width: 1px;
}
.panel-icon { font-size: 1.2rem; }
.panel-title { font-weight: 700; font-size: 1rem; }

.panel-body {
  padding: 1.2rem;
  overflow-y: auto;
  display: flex; flex-direction: column;
  gap: 1.1rem;
}
.panel-body::-webkit-scrollbar { width: 6px; }
.panel-body::-webkit-scrollbar-track { background: transparent; }
.panel-body::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.25); border-radius: 3px; }

.control-group { display: flex; flex-direction: column; gap: 8px; }
.ctrl-label {
  font-size: 0.82rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: space-between;
}
.ctrl-hint { font-weight: 500; font-size: 0.72rem; }

.ctrl-input {
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  border-width: 1px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
}
.ctrl-input:focus {
  border-color: #fbbf24;
  box-shadow: 0 0 0 3px rgba(251,191,36,0.2);
}

/* Template row */
.template-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}
.template-btn {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 8px 4px;
  border-radius: 10px;
  background: transparent;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}
.template-btn.active { border-color: #fbbf24; background: rgba(251,191,36,0.1); }
.template-btn:hover { transform: translateY(-2px); }
.template-preview {
  width: 32px; height: 32px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.template-name { font-size: 0.68rem; font-weight: 600; }

/* Emoji grid */
.emoji-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
}
.emoji-btn {
  aspect-ratio: 1;
  border-radius: 8px;
  background: rgba(120,120,120,0.06);
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.emoji-btn:hover { background: rgba(251,191,36,0.15); transform: scale(1.1); }
.emoji-btn.active {
  border-color: #fbbf24;
  background: rgba(251,191,36,0.2);
  transform: scale(1.1);
}

/* Quick titles */
.quick-titles {
  display: flex; gap: 6px; flex-wrap: wrap;
}
.quick-chip {
  padding: 5px 11px;
  border-radius: 999px;
  border-width: 1px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.quick-chip:hover { transform: translateY(-1px); border-color: rgba(251,191,36,0.5); }

/* Theme grid */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 6px;
}
.theme-swatch {
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.theme-swatch:hover { transform: scale(1.15); }
.theme-swatch.active {
  border-color: #fff;
  box-shadow: 0 0 0 2px rgba(251,191,36,0.8), 0 4px 14px rgba(251,191,36,0.4);
  transform: scale(1.15);
}

/* Pattern row */
.pattern-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.pattern-btn {
  padding: 8px 6px;
  border-radius: 10px;
  border-width: 1px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 4px;
  transition: all 0.2s;
}
.pattern-btn.active {
  border-color: #fbbf24;
  background: rgba(251,191,36,0.15);
  color: #fbbf24;
}
.pattern-btn:hover { transform: translateY(-1px); }

/* Toggle */
.toggle-group {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(120,120,120,0.06);
}
.toggle {
  width: 46px; height: 26px;
  border-radius: 999px;
  background: rgba(120,120,120,0.3);
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.25s;
}
.toggle.on { background: linear-gradient(120deg,#fbbf24,#f59e0b); }
.toggle-knob {
  position: absolute;
  top: 3px; left: 3px;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.25s cubic-bezier(0.3,1.4,0.5,1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.toggle.on .toggle-knob { transform: translateX(20px); }

/* =========================================================
   PREVIEW PANEL
   ========================================================= */
.preview-panel {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.preview-head { display: flex; justify-content: center; }

.preview-tabs {
  display: inline-flex;
  padding: 4px;
  border-radius: 10px;
  border-width: 1px;
  gap: 3px;
}
.tab-btn {
  padding: 6px 16px;
  border-radius: 7px;
  background: transparent;
  border: none;
  color: inherit;
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s;
  font-family: inherit;
}
.tab-btn.active {
  opacity: 1;
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  color: #0b1220;
}

.badge-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  min-height: 420px;
}

/* =========================================================
   THE BADGE (exported as image)
   ========================================================= */
.badge {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.6rem 1.6rem;
  border-radius: 26px;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.15);
  transition: width 0.3s ease, height 0.3s ease;
  text-align: center;
  font-family: 'Inter', system-ui, sans-serif;
}

.badge.size-lg { width: 340px; height: 340px; }
.badge.size-sm { width: 240px; height: 240px; padding: 1.4rem 1rem 1rem; }

/* Template variants */
.badge.tmpl-classic { border-radius: 26px; }
.badge.tmpl-circle  { border-radius: 50%; }
.badge.tmpl-shield  {
  border-radius: 26px 26px 50% 50% / 26px 26px 70% 70%;
}
.badge.tmpl-ribbon  {
  border-radius: 26px;
  padding-top: 2.2rem;
}

/* Ribbon for ribbon template */
.ribbon {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 90px; height: 26px;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(4px);
  clip-path: polygon(0 0, 100% 0, 90% 100%, 50% 82%, 10% 100%);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 0.9rem;
  padding-bottom: 6px;
}

/* Patterns */
.badge-pattern {
  position: absolute; inset: 0;
  pointer-events: none;
  opacity: 0.35;
  z-index: 0;
}
.pattern-none { background: none; }
.pattern-dots {
  background-image: radial-gradient(rgba(255,255,255,0.5) 1.5px, transparent 1.5px);
  background-size: 14px 14px;
}
.pattern-stripes {
  background-image: repeating-linear-gradient(45deg,
    rgba(255,255,255,0.15) 0 2px,
    transparent 2px 12px);
}
.pattern-stars {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.7) 1.5px, transparent 1.5px),
    radial-gradient(circle at 70% 60%, rgba(255,255,255,0.7) 1.5px, transparent 1.5px),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.5) 1.5px, transparent 1.5px),
    radial-gradient(circle at 85% 20%, rgba(255,255,255,0.5) 1.5px, transparent 1.5px),
    radial-gradient(circle at 55% 45%, rgba(255,255,255,0.6) 1.5px, transparent 1.5px);
  background-size: 40px 40px;
}
.pattern-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px);
  background-size: 18px 18px;
}
.pattern-rays {
  background: conic-gradient(from 0deg,
    rgba(255,255,255,0.15) 0deg 15deg,
    transparent 15deg 30deg);
}

/* Content */
.badge-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.badge-avatar {
  position: relative;
  width: 72px; height: 72px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
}
.badge.size-sm .badge-avatar { width: 54px; height: 54px; }

.avatar-ring {
  position: absolute; inset: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(4px);
  animation: ringPulse 3s ease-in-out infinite;
}
@keyframes ringPulse {
  0%,100% { transform: scale(1); opacity: 0.9; }
  50%     { transform: scale(1.08); opacity: 1; }
}

.avatar-emoji {
  position: relative;
  font-size: 2.4rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}
.badge.size-sm .avatar-emoji { font-size: 1.8rem; }

.badge-name {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.25);
  margin-top: 4px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.badge.size-sm .badge-name { font-size: 0.9rem; }

.badge-title-wrap {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
}
.badge-title {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}
.badge.size-sm .badge-title { font-size: 0.65rem; }

.badge-subtitle {
  font-size: 0.72rem;
  opacity: 0.85;
  margin-top: 4px;
  font-weight: 500;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.badge.size-sm .badge-subtitle { font-size: 0.62rem; }

/* Branding */
.badge-brand {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.28);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.15);
  z-index: 3;
}
.badge.size-sm .badge-brand {
  bottom: 6px;
  padding: 3px 8px;
  gap: 4px;
}

.brand-logo {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: linear-gradient(120deg,#fbbf24,#10b981);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.55rem;
  font-weight: 900;
  color: #0b1220;
}
.badge.size-sm .brand-logo { width: 14px; height: 14px; font-size: 0.45rem; }

.brand-text {
  display: flex;
  gap: 3px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.badge.size-sm .brand-text { font-size: 0.5rem; }
.brand-edu { color: #fbbf24; }
.brand-soc { color: #34d399; }

/* Shine */
.badge-shine {
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(
    115deg,
    transparent 40%,
    rgba(255,255,255,0.25) 48%,
    rgba(255,255,255,0.45) 50%,
    rgba(255,255,255,0.25) 52%,
    transparent 60%
  );
  animation: shine 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
@keyframes shine {
  0%, 100% { transform: translateX(-40%) rotate(0deg); opacity: 0; }
  50%      { transform: translateX(40%) rotate(0deg); opacity: 1; }
}

/* =========================================================
   ACTIONS
   ========================================================= */
.actions-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-secondary {
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  border-width: 1px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  font-family: inherit;
}
.btn-secondary:hover {
  transform: translateY(-2px);
  border-color: rgba(251,191,36,0.4);
}

.btn-primary {
  padding: 0.7rem 1.6rem;
  border-radius: 10px;
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  color: #0b1220;
  font-weight: 700;
  font-size: 0.88rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.25s;
  box-shadow: 0 8px 20px -6px rgba(251,191,36,0.5);
  font-family: inherit;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px -6px rgba(251,191,36,0.75);
}

.share-hint {
  text-align: center;
  font-size: 0.82rem;
  line-height: 1.5;
  padding: 0 1rem;
}

/* =========================================================
   FOOTER
   ========================================================= */
.page-footer {
  position: relative; z-index: 1;
  padding: 1.2rem 1.5rem 1.5rem;
  border-top-width: 1px;
  text-align: center;
}
.credit { font-size: 0.78rem; }
.credit strong { color: #fbbf24; }

/* =========================================================
   TOAST
   ========================================================= */
.toast {
  position: fixed;
  bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  display: flex; align-items: center; gap: 10px;
  padding: 0.85rem 1.4rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 1px solid rgba(251,191,36,0.4);
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.88rem;
  z-index: 200;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6), 0 0 30px rgba(251,191,36,0.2);
}
.toast-icon { font-size: 1.2rem; }

.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s cubic-bezier(0.2,0.9,0.4,1.1); }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translate(-50%, 20px); }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 960px) {
  .main-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  .controls-panel {
    position: static;
    max-height: none;
  }
  .badge-stage { min-height: 340px; padding: 1.5rem 0; }
  .badge.size-lg { width: 300px; height: 300px; }
}

@media (max-width: 640px) {
  .page-title { font-size: 1.15rem; }
  .page-sub { display: none; }
  .emoji-grid { grid-template-columns: repeat(8, 1fr); }
  .theme-grid { grid-template-columns: repeat(6, 1fr); }
  .badge.size-lg { width: 280px; height: 280px; }
  .actions-row { flex-direction: column; }
  .actions-row button { width: 100%; justify-content: center; }
}
</style>