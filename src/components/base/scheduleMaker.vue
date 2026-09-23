<!-- scheduleMaker.vue -->
<template>
  <div class="sch-page dark:bg-[#070b14] bg-slate-50">
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
          <div class="logo-icon">📅</div>
          <div>
            <h1 class="page-title dark:text-white text-slate-900">
              <span class="grad-amber">Schedule</span>
              <span class="grad-emerald">Maker</span>
            </h1>
            <p class="page-sub dark:text-slate-400 text-slate-500">
              Plan your week · Stay on track · Auto-saved
            </p>
          </div>
        </div>

        <div class="header-actions">
          <div class="stat-chip dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200">
            <span class="stat-num grad-amber">{{ totalClasses }}</span>
            <span class="stat-lbl dark:text-slate-400 text-slate-500">classes</span>
          </div>

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

    <!-- ================= TOOLBAR ================= -->
    <section class="toolbar dark:bg-slate-900/40 bg-white/60 dark:border-white/5 border-slate-200">
      <div class="toolbar-inner">
        <div class="toolbar-left">
          <button class="btn-primary" @click="openAddModal()">
            <span>➕</span> Add Class
          </button>

          <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="openTemplates">
            <span>📚</span> Templates
          </button>

          <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="printSchedule">
            <span>🖨️</span> Print
          </button>
        </div>

        <div class="toolbar-right">
          <div class="view-toggle dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200">
            <button
              class="view-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'; SFX.click()"
              title="Grid view"
            >
              🗓️
            </button>
            <button
              class="view-btn"
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'; SFX.click()"
              title="List view"
            >
              ☰
            </button>
          </div>

          <button
            class="btn-danger"
            @click="confirmClear"
            title="Clear all classes"
          >
            🗑️ Clear All
          </button>
        </div>
      </div>
    </section>

    <!-- ================= SCHEDULE ================= -->
    <main class="schedule-area">
      <!-- ===== GRID VIEW ===== -->
      <div v-if="viewMode === 'grid'" class="grid-view">
        <div class="grid-header-row">
          <div class="time-col-header dark:text-slate-400 text-slate-500">Time</div>
          <div
            v-for="day in days"
            :key="day.key"
            class="day-col-header"
            :class="{ 'today': day.key === todayKey }"
          >
            <span class="day-name">{{ day.short }}</span>
            <span class="day-date dark:text-slate-500 text-slate-400">{{ day.dateLabel }}</span>
          </div>
        </div>

        <div class="grid-body">
          <!-- Time slots column -->
          <div class="time-col">
            <div
              v-for="hour in hours"
              :key="hour"
              class="time-slot dark:text-slate-500 text-slate-500 dark:border-white/5 border-slate-200"
            >
              {{ formatHour(hour) }}
            </div>
          </div>

          <!-- Day columns -->
          <div
            v-for="day in days"
            :key="day.key"
            class="day-col dark:border-white/5 border-slate-200"
            :class="{ 'today-col': day.key === todayKey }"
          >
            <div
              v-for="hour in hours"
              :key="`${day.key}-${hour}`"
              class="grid-cell dark:border-white/5 border-slate-200"
              @click="openAddModal(day.key, hour)"
              @dblclick="openAddModal(day.key, hour)"
            >
              <div
                v-for="cls in classesAt(day.key, hour)"
                :key="cls.id"
                class="class-block"
                :style="classStyle(cls)"
                :class="`color-${cls.color}`"
                @click.stop="openEditModal(cls)"
                :title="`${cls.title} (${cls.startTime}–${cls.endTime})`"
              >
                <div class="class-title">{{ cls.title }}</div>
                <div class="class-time">{{ cls.startTime }}–{{ cls.endTime }}</div>
                <div v-if="cls.location" class="class-loc">📍 {{ cls.location }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state overlay -->
        <div
          v-if="classes.length === 0"
          class="grid-empty dark:bg-slate-900/40 bg-white/70"
        >
          <div class="empty-icon">📭</div>
          <p class="dark:text-slate-300 text-slate-700">No classes yet</p>
          <p class="dark:text-slate-500 text-slate-500">
            Click anywhere on the grid, or hit <strong>Add Class</strong> to get started
          </p>
        </div>
      </div>

      <!-- ===== LIST VIEW ===== -->
      <div v-else class="list-view">
        <div
          v-for="day in days"
          :key="day.key"
          class="day-list"
          :class="{ 'today-list': day.key === todayKey }"
        >
          <div class="day-list-header">
            <span class="day-list-title dark:text-white text-slate-900">{{ day.full }}</span>
            <span class="day-list-count dark:text-slate-400 text-slate-500">
              {{ dayClasses(day.key).length }} {{ dayClasses(day.key).length === 1 ? 'class' : 'classes' }}
            </span>
          </div>

          <div v-if="dayClasses(day.key).length" class="day-list-body">
            <div
              v-for="cls in dayClasses(day.key)"
              :key="cls.id"
              class="class-card"
              :class="`color-${cls.color}`"
              @click="openEditModal(cls)"
            >
              <div class="card-color-bar"></div>
              <div class="card-content">
                <div class="card-title dark:text-white text-slate-900">{{ cls.title }}</div>
                <div class="card-meta dark:text-slate-400 text-slate-500">
                  <span>🕐 {{ cls.startTime }} – {{ cls.endTime }}</span>
                  <span v-if="cls.location">📍 {{ cls.location }}</span>
                  <span v-if="cls.teacher">👤 {{ cls.teacher }}</span>
                </div>
              </div>
              <button class="card-delete" @click.stop="deleteClass(cls.id)" title="Delete">
                ✕
              </button>
            </div>
          </div>

          <div v-else class="day-list-empty dark:text-slate-600 text-slate-400">
            Free day 🎉
          </div>
        </div>
      </div>
    </main>

    <!-- ================= FOOTER ================= -->
    <footer class="page-footer dark:border-white/5 border-slate-200">
      <p class="credit dark:text-slate-500 text-slate-500">
        Made with 💛 by <strong>Educational Society</strong> · Auto-saved to your browser
      </p>
    </footer>

    <!-- ================= ADD/EDIT MODAL ================= -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal dark:bg-slate-900 bg-white dark:border-white/10 border-slate-200">
          <div class="modal-header dark:border-white/5 border-slate-200">
            <div class="modal-title dark:text-white text-slate-900">
              <span>{{ editingClass ? '✏️' : '➕' }}</span>
              {{ editingClass ? 'Edit Class' : 'Add Class' }}
            </div>
            <button class="close-btn dark:text-slate-400 text-slate-500" @click="closeModal">✕</button>
          </div>

          <div class="modal-body">
            <!-- Title -->
            <div class="form-group">
              <label class="form-label dark:text-slate-300 text-slate-700">Class Title *</label>
              <input
                v-model="form.title"
                class="form-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
                placeholder="e.g. Mathematics, Physics Lab…"
                maxlength="40"
                @keyup.enter="saveClass"
              />
            </div>

            <!-- Day -->
            <div class="form-group">
              <label class="form-label dark:text-slate-300 text-slate-700">Day</label>
              <div class="day-picker">
                <button
                  v-for="day in days"
                  :key="day.key"
                  class="day-pick-btn"
                  :class="{ active: form.day === day.key }"
                  @click="form.day = day.key"
                >
                  {{ day.short }}
                </button>
              </div>
            </div>

            <!-- Time -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label dark:text-slate-300 text-slate-700">Start Time</label>
                <input
                  v-model="form.startTime"
                  type="time"
                  class="form-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
                />
              </div>
              <div class="form-group">
                <label class="form-label dark:text-slate-300 text-slate-700">End Time</label>
                <input
                  v-model="form.endTime"
                  type="time"
                  class="form-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
                />
              </div>
            </div>

            <!-- Location & Teacher -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label dark:text-slate-300 text-slate-700">Location</label>
                <input
                  v-model="form.location"
                  class="form-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
                  placeholder="e.g. Room 204"
                  maxlength="30"
                />
              </div>
              <div class="form-group">
                <label class="form-label dark:text-slate-300 text-slate-700">Teacher</label>
                <input
                  v-model="form.teacher"
                  class="form-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200"
                  placeholder="e.g. Dr. Sharma"
                  maxlength="30"
                />
              </div>
            </div>

            <!-- Color -->
            <div class="form-group">
              <label class="form-label dark:text-slate-300 text-slate-700">Color</label>
              <div class="color-picker">
                <button
                  v-for="c in colorOptions"
                  :key="c.name"
                  class="color-swatch"
                  :class="[`swatch-${c.name}`, { active: form.color === c.name }]"
                  @click="form.color = c.name"
                  :title="c.name"
                ></button>
              </div>
            </div>
          </div>

          <div class="modal-footer dark:border-white/5 border-slate-200">
            <button
              v-if="editingClass"
              class="btn-delete dark:text-red-400 text-red-500 dark:border-red-400/30 border-red-300"
              @click="deleteEditing"
            >
              🗑️ Delete
            </button>
            <div class="modal-footer-right">
              <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="closeModal">
                Cancel
              </button>
              <button class="btn-primary" @click="saveClass">
                {{ editingClass ? '💾 Save' : '➕ Add' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ================= TEMPLATES MODAL ================= -->
    <transition name="modal-fade">
      <div v-if="showTemplates" class="modal-overlay" @click.self="showTemplates = false">
        <div class="modal dark:bg-slate-900 bg-white dark:border-white/10 border-slate-200">
          <div class="modal-header dark:border-white/5 border-slate-200">
            <div class="modal-title dark:text-white text-slate-900">
              <span>📚</span> Quick Templates
            </div>
            <button class="close-btn dark:text-slate-400 text-slate-500" @click="showTemplates = false">✕</button>
          </div>

          <div class="modal-body">
            <p class="templates-hint dark:text-slate-400 text-slate-500">
              Load a starter schedule. This will <strong>add</strong> classes to your existing timetable.
            </p>

            <div class="template-grid">
              <button
                v-for="tpl in templates"
                :key="tpl.name"
                class="template-card dark:bg-white/5 bg-slate-50 dark:border-white/10 border-slate-200"
                @click="applyTemplate(tpl)"
              >
                <div class="template-icon">{{ tpl.icon }}</div>
                <div class="template-name dark:text-slate-200 text-slate-800">{{ tpl.name }}</div>
                <div class="template-desc dark:text-slate-500 text-slate-500">{{ tpl.desc }}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

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
  click:   () => playTone(600, 0.05, 'sine', 0.08),
  add:     () => { playTone(660, 0.1, 'sine', 0.14); playTone(880, 0.15, 'sine', 0.14, 0.09) },
  delete:  () => { playTone(300, 0.12, 'sawtooth', 0.1); playTone(200, 0.15, 'sawtooth', 0.1, 0.08) },
  save:    () => { playTone(523, 0.08, 'triangle', 0.12); playTone(784, 0.12, 'triangle', 0.12, 0.07) },
  open:    () => playTone(750, 0.08, 'sine', 0.1),
  close:   () => playTone(400, 0.08, 'sine', 0.08),
  clear:   () => { playTone(400, 0.1, 'sawtooth', 0.1); playTone(250, 0.15, 'sawtooth', 0.1, 0.08) },
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) { initAudio(); SFX.click() }
  localStorage.setItem('sch_sound', soundEnabled.value ? '1' : '0')
}

/* =========================================================
   DAYS & HOURS
   ========================================================= */
const days = ref([
  { key: 'mon', short: 'Mon', full: 'Monday',    dateLabel: 'Mon' },
  { key: 'tue', short: 'Tue', full: 'Tuesday',   dateLabel: 'Tue' },
  { key: 'wed', short: 'Wed', full: 'Wednesday', dateLabel: 'Wed' },
  { key: 'thu', short: 'Thu', full: 'Thursday',  dateLabel: 'Thu' },
  { key: 'fri', short: 'Fri', full: 'Friday',    dateLabel: 'Fri' },
  { key: 'sat', short: 'Sat', full: 'Saturday',  dateLabel: 'Sat' },
  { key: 'sun', short: 'Sun', full: 'Sunday',    dateLabel: 'Sun' },
])

// Show hours from 6 AM to 10 PM
const hours = ref(Array.from({ length: 17 }, (_, i) => i + 6))

const todayKey = computed(() => {
  const map = ['sun','mon','tue','wed','thu','fri','sat']
  return map[new Date().getDay()]
})

function formatHour(h) {
  const period = h >= 12 ? 'PM' : 'AM'
  const display = h % 12 === 0 ? 12 : h % 12
  return `${display} ${period}`
}

/* =========================================================
   STATE
   ========================================================= */
const classes = ref([])
const viewMode = ref('grid')
const showModal = ref(false)
const showTemplates = ref(false)
const editingClass = ref(null)

const defaultForm = () => ({
  title: '',
  day: todayKey.value,
  startTime: '09:00',
  endTime: '10:00',
  location: '',
  teacher: '',
  color: 'amber',
})

const form = ref(defaultForm())

const colorOptions = [
  { name: 'amber',   hue: '#fbbf24' },
  { name: 'emerald', hue: '#10b981' },
  { name: 'blue',    hue: '#3b82f6' },
  { name: 'purple',  hue: '#a855f7' },
  { name: 'pink',    hue: '#ec4899' },
  { name: 'red',     hue: '#ef4444' },
  { name: 'cyan',    hue: '#06b6d4' },
  { name: 'orange',  hue: '#f97316' },
]

const totalClasses = computed(() => classes.value.length)

/* =========================================================
   PERSISTENCE
   ========================================================= */
const STORAGE_KEY = 'esch_schedule_v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) classes.value = parsed
    }
  } catch (e) {
    console.warn('Failed to load schedule:', e)
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes.value))
  } catch (e) {
    console.warn('Failed to save schedule:', e)
  }
}

// Auto-save whenever classes change
watch(classes, saveToStorage, { deep: true })

/* =========================================================
   GRID HELPERS
   ========================================================= */
function classesAt(dayKey, hour) {
  return classes.value.filter(c => {
    if (c.day !== dayKey) return false
    const startHour = parseInt(c.startTime.split(':')[0], 10)
    return startHour === hour
  })
}

function classStyle(cls) {
  const [sh, sm] = cls.startTime.split(':').map(Number)
  const [eh, em] = cls.endTime.split(':').map(Number)
  const startMin = sh * 60 + sm
  const endMin = eh * 60 + em
  const duration = Math.max(30, endMin - startMin) // minutes
  // Grid row height = 60px per hour (see CSS)
  const heightPx = (duration / 60) * 60 - 6
  const topPx = (sm / 60) * 60 + 3
  return {
    height: `${heightPx}px`,
    top: `${topPx}px`,
    position: 'absolute',
    left: '4px',
    right: '4px',
  }
}

function dayClasses(dayKey) {
  return classes.value
    .filter(c => c.day === dayKey)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
}

/* =========================================================
   MODAL OPERATIONS
   ========================================================= */
function openAddModal(dayKey, hour) {
  SFX.open()
  editingClass.value = null
  const nextHour = hour != null ? hour : 9
  form.value = {
    ...defaultForm(),
    day: dayKey || todayKey.value,
    startTime: `${String(nextHour).padStart(2, '0')}:00`,
    endTime: `${String(Math.min(nextHour + 1, 22)).padStart(2, '0')}:00`,
  }
  showModal.value = true
}

function openEditModal(cls) {
  SFX.open()
  editingClass.value = cls
  form.value = { ...cls }
  showModal.value = true
}

function closeModal() {
  SFX.close()
  showModal.value = false
  editingClass.value = null
  form.value = defaultForm()
}

function saveClass() {
  if (!form.value.title.trim()) {
    alert('Please enter a class title')
    return
  }
  if (form.value.startTime >= form.value.endTime) {
    alert('End time must be after start time')
    return
  }

  if (editingClass.value) {
    const idx = classes.value.findIndex(c => c.id === editingClass.value.id)
    if (idx !== -1) {
      classes.value[idx] = { ...classes.value[idx], ...form.value }
    }
    SFX.save()
  } else {
    classes.value.push({
      id: Date.now() + Math.random().toString(36).slice(2, 7),
      ...form.value,
    })
    SFX.add()
  }
  closeModal()
}

function deleteEditing() {
  if (!editingClass.value) return
  if (confirm(`Delete "${editingClass.value.title}"?`)) {
    deleteClass(editingClass.value.id)
    closeModal()
  }
}

function deleteClass(id) {
  SFX.delete()
  classes.value = classes.value.filter(c => c.id !== id)
}

function confirmClear() {
  if (!classes.value.length) return
  if (confirm(`Delete all ${classes.value.length} classes? This can't be undone.`)) {
    SFX.clear()
    classes.value = []
  }
}

/* =========================================================
   TEMPLATES
   ========================================================= */
const templates = [
  {
    name: 'School Week',
    icon: '🏫',
    desc: '5-day school schedule (Mon–Fri)',
    classes: [
      { day: 'mon', title: 'Mathematics', startTime: '09:00', endTime: '10:00', location: 'Room 101', color: 'amber' },
      { day: 'mon', title: 'English',     startTime: '10:15', endTime: '11:15', location: 'Room 102', color: 'blue' },
      { day: 'mon', title: 'Science',     startTime: '11:30', endTime: '12:30', location: 'Lab 1',    color: 'emerald' },
      { day: 'tue', title: 'Mathematics', startTime: '09:00', endTime: '10:00', location: 'Room 101', color: 'amber' },
      { day: 'tue', title: 'History',     startTime: '10:15', endTime: '11:15', location: 'Room 103', color: 'purple' },
      { day: 'tue', title: 'Computer',    startTime: '11:30', endTime: '12:30', location: 'Lab 2',    color: 'cyan' },
      { day: 'wed', title: 'Physics',     startTime: '09:00', endTime: '10:00', location: 'Room 104', color: 'pink' },
      { day: 'wed', title: 'Chemistry',   startTime: '10:15', endTime: '11:15', location: 'Lab 3',    color: 'orange' },
      { day: 'thu', title: 'Biology',     startTime: '09:00', endTime: '10:00', location: 'Lab 4',    color: 'emerald' },
      { day: 'thu', title: 'Mathematics', startTime: '10:15', endTime: '11:15', location: 'Room 101', color: 'amber' },
      { day: 'fri', title: 'Sports',      startTime: '09:00', endTime: '10:00', location: 'Ground',   color: 'red' },
      { day: 'fri', title: 'Arts',        startTime: '10:15', endTime: '11:15', location: 'Studio',   color: 'purple' },
    ],
  },
  {
    name: 'College Semester',
    icon: '🎓',
    desc: 'Lectures + labs (Mon–Fri)',
    classes: [
      { day: 'mon', title: 'Data Structures', startTime: '08:00', endTime: '09:30', location: 'LH-1', teacher: 'Dr. Rao',    color: 'blue' },
      { day: 'mon', title: 'DBMS Lab',        startTime: '10:00', endTime: '12:00', location: 'CS Lab', teacher: 'Prof. Nair', color: 'emerald' },
      { day: 'tue', title: 'Operating Systems', startTime: '08:00', endTime: '09:30', location: 'LH-2', teacher: 'Dr. Iyer', color: 'amber' },
      { day: 'tue', title: 'Maths III',       startTime: '10:00', endTime: '11:30', location: 'LH-3', teacher: 'Prof. Das', color: 'purple' },
      { day: 'wed', title: 'Networks',        startTime: '08:00', endTime: '09:30', location: 'LH-1', teacher: 'Dr. Bose', color: 'pink' },
      { day: 'wed', title: 'Networks Lab',    startTime: '10:00', endTime: '12:00', location: 'CS Lab', teacher: 'Dr. Bose', color: 'cyan' },
      { day: 'thu', title: 'Algorithms',      startTime: '08:00', endTime: '09:30', location: 'LH-2', teacher: 'Dr. Menon', color: 'orange' },
      { day: 'thu', title: 'DBMS',            startTime: '10:00', endTime: '11:30', location: 'LH-3', teacher: 'Prof. Nair', color: 'red' },
      { day: 'fri', title: 'Project Work',    startTime: '08:00', endTime: '12:00', location: 'Lab',  teacher: 'Guide',    color: 'emerald' },
    ],
  },
  {
    name: 'Self Study',
    icon: '📖',
    desc: 'Balanced study plan',
    classes: [
      { day: 'mon', title: 'Morning Revision', startTime: '06:00', endTime: '07:30', color: 'amber' },
      { day: 'mon', title: 'Python Practice',  startTime: '18:00', endTime: '20:00', color: 'cyan' },
      { day: 'tue', title: 'Maths Practice',   startTime: '18:00', endTime: '20:00', color: 'blue' },
      { day: 'wed', title: 'Reading',          startTime: '20:00', endTime: '21:00', color: 'purple' },
      { day: 'thu', title: 'Coding Project',   startTime: '18:00', endTime: '21:00', color: 'emerald' },
      { day: 'fri', title: 'Revision',         startTime: '19:00', endTime: '21:00', color: 'pink' },
      { day: 'sat', title: 'Deep Work',        startTime: '09:00', endTime: '12:00', color: 'red' },
      { day: 'sun', title: 'Weekly Review',    startTime: '10:00', endTime: '11:30', color: 'orange' },
    ],
  },
]

function openTemplates() {
  SFX.open()
  showTemplates.value = true
}

function applyTemplate(tpl) {
  const newClasses = tpl.classes.map(c => ({
    id: Date.now() + Math.random().toString(36).slice(2, 7),
    teacher: '',
    ...c,
  }))
  classes.value.push(...newClasses)
  SFX.add()
  showTemplates.value = false
  alert(`✅ Added ${newClasses.length} classes from "${tpl.name}"`)
}

/* =========================================================
   PRINT
   ========================================================= */
function printSchedule() {
  SFX.click()
  window.print()
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
onMounted(() => {
  const savedSound = localStorage.getItem('sch_sound')
  if (savedSound !== null) soundEnabled.value = savedSound === '1'

  loadFromStorage()
})
</script>

<style scoped>
/* =========================================================
   BASE
   ========================================================= */
.sch-page {
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
.blob-3 { width: 380px; height: 380px; background: #6366f1; top: 40%; left: 50%; animation: float1 20s ease-in-out infinite reverse; }
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
  max-width: 1600px; margin: 0 auto;
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

.header-actions { display: flex; align-items: center; gap: 10px; }

.stat-chip {
  display: inline-flex; align-items: baseline; gap: 6px;
  padding: 6px 14px; border-radius: 999px;
  border-width: 1px;
  font-size: 0.85rem;
}
.stat-num { font-size: 1.1rem; font-weight: 800; }
.stat-lbl { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }

.btn-icon {
  width: 40px; height: 40px; border-radius: 10px;
  border-width: 1px;
  cursor: pointer; font-size: 1.1rem;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.btn-icon:hover { transform: scale(1.06); border-color: rgba(251,191,36,0.4); }

/* =========================================================
   TOOLBAR
   ========================================================= */
.toolbar {
  position: relative; z-index: 2;
  border-bottom-width: 1px;
  backdrop-filter: blur(10px);
  padding: 0.9rem 1.5rem;
}
.toolbar-inner {
  max-width: 1600px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  gap: 1rem; flex-wrap: wrap;
}
.toolbar-left, .toolbar-right { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }

.btn-primary {
  padding: 0.6rem 1.3rem; border-radius: 10px;
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  color: #0b1220; font-weight: 700; font-size: 0.88rem;
  border: none; cursor: pointer;
  display: inline-flex; align-items: center; gap: 6px;
  transition: all 0.25s;
  box-shadow: 0 8px 20px -6px rgba(251,191,36,0.5);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 26px -6px rgba(251,191,36,0.7); }

.btn-secondary {
  padding: 0.55rem 1.1rem; border-radius: 10px;
  border-width: 1px;
  font-weight: 600; font-size: 0.84rem;
  cursor: pointer; transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 6px;
}
.btn-secondary:hover { border-color: rgba(251,191,36,0.4); }

.btn-danger {
  padding: 0.55rem 1.1rem; border-radius: 10px;
  background: rgba(239,68,68,0.1);
  color: #f87171;
  border: 1px solid rgba(239,68,68,0.25);
  font-weight: 600; font-size: 0.84rem;
  cursor: pointer; transition: all 0.2s;
}
.btn-danger:hover { background: rgba(239,68,68,0.2); }

.view-toggle {
  display: inline-flex;
  border-radius: 10px;
  border-width: 1px;
  padding: 3px;
  gap: 2px;
}
.view-btn {
  padding: 5px 12px; border-radius: 7px;
  background: transparent; border: none;
  cursor: pointer; font-size: 0.9rem;
  transition: all 0.2s;
  color: inherit; opacity: 0.6;
}
.view-btn.active {
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  opacity: 1;
  color: #0b1220;
  font-weight: 700;
}

/* =========================================================
   SCHEDULE AREA
   ========================================================= */
.schedule-area {
  position: relative; z-index: 1;
  flex: 1;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

/* ===== GRID VIEW ===== */
.grid-view {
  position: relative;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
}
.grid-header-row {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  gap: 0;
  position: sticky; top: 0; z-index: 2;
  backdrop-filter: blur(12px);
  background: rgba(15,23,42,0.85);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px 12px 0 0;
}
:global(html:not(.dark)) .grid-header-row {
  background: rgba(255,255,255,0.85);
  border-bottom-color: rgba(0,0,0,0.08);
}
.time-col-header {
  padding: 12px 8px;
  font-size: 0.72rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: center;
  border-right: 1px solid rgba(120,120,120,0.12);
}
.day-col-header {
  padding: 10px 6px;
  text-align: center;
  border-right: 1px solid rgba(120,120,120,0.08);
  display: flex; flex-direction: column; gap: 2px;
  transition: background-color 0.2s;
}
.day-col-header:last-child { border-right: none; }
.day-col-header.today {
  background: linear-gradient(180deg, rgba(251,191,36,0.18), rgba(16,185,129,0.08));
}
.day-name { font-weight: 700; font-size: 0.92rem; color: #fbbf24; }
.day-col-header.today .day-name { color: #fbbf24; }
.day-date { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.05em; }

.grid-body {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  gap: 0;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
  border: 1px solid rgba(120,120,120,0.12);
  border-top: none;
}

.time-col { background: rgba(120,120,120,0.03); }
.time-slot {
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  font-family: 'Monaco', monospace;
  border-bottom: 1px solid rgba(120,120,120,0.12);
  border-right: 1px solid rgba(120,120,120,0.12);
}
.time-slot:last-child { border-bottom: none; }

.day-col {
  position: relative;
  border-right: 1px solid rgba(120,120,120,0.08);
}
.day-col:last-child { border-right: none; }
.day-col.today-col { background: rgba(251,191,36,0.03); }

.grid-cell {
  position: relative;
  height: 60px;
  border-bottom: 1px solid rgba(120,120,120,0.08);
  cursor: pointer;
  transition: background-color 0.15s;
}
.grid-cell:hover {
  background: rgba(251,191,36,0.08);
}
.grid-cell:last-child { border-bottom: none; }

/* ===== CLASS BLOCK ===== */
.class-block {
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 0.7rem;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  border: 1px solid transparent;
  transition: transform 0.15s, box-shadow 0.15s;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #fff;
}
.class-block:hover {
  transform: scale(1.02);
  z-index: 5;
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}
.class-title {
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.15;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.class-time {
  font-size: 0.65rem;
  opacity: 0.9;
  font-family: 'Monaco', monospace;
}
.class-loc {
  font-size: 0.62rem;
  opacity: 0.85;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Color variants */
.color-amber   { background: linear-gradient(135deg,#f59e0b,#d97706); }
.color-emerald { background: linear-gradient(135deg,#10b981,#059669); }
.color-blue    { background: linear-gradient(135deg,#3b82f6,#2563eb); }
.color-purple  { background: linear-gradient(135deg,#a855f7,#7c3aed); }
.color-pink    { background: linear-gradient(135deg,#ec4899,#db2777); }
.color-red     { background: linear-gradient(135deg,#ef4444,#dc2626); }
.color-cyan    { background: linear-gradient(135deg,#06b6d4,#0891b2); }
.color-orange  { background: linear-gradient(135deg,#f97316,#ea580c); }

/* ===== EMPTY STATE ===== */
.grid-empty {
  position: absolute;
  inset: 60px 0 0 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px; text-align: center;
  border-radius: 12px;
  z-index: 1;
  pointer-events: none;
}
.empty-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 0 20px rgba(251,191,36,0.4));
  animation: bob 2.5s ease-in-out infinite;
}
.grid-empty strong { color: #fbbf24; }

/* ===== LIST VIEW ===== */
.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.day-list {
  border-radius: 14px;
  border: 1px solid rgba(120,120,120,0.12);
  overflow: hidden;
  background: rgba(120,120,120,0.03);
  transition: all 0.2s;
}
.day-list.today-list {
  border-color: rgba(251,191,36,0.5);
  box-shadow: 0 0 20px rgba(251,191,36,0.1);
}
.day-list-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.8rem 1rem;
  background: rgba(120,120,120,0.06);
  border-bottom: 1px solid rgba(120,120,120,0.1);
}
.day-list-title { font-weight: 700; font-size: 1rem; }
.day-list-count { font-size: 0.78rem; }
.day-list-body {
  display: flex; flex-direction: column;
  gap: 8px;
  padding: 0.9rem;
}
.day-list-empty {
  padding: 1.2rem;
  text-align: center;
  font-size: 0.85rem;
  font-style: italic;
}

.class-card {
  position: relative;
  display: flex; align-items: center;
  gap: 12px;
  border-radius: 12px;
  padding: 0.8rem 1rem 0.8rem 1.4rem;
  background: rgba(120,120,120,0.05);
  border: 1px solid rgba(120,120,120,0.1);
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
}
.class-card:hover {
  transform: translateX(4px);
  background: rgba(120,120,120,0.1);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}
.card-color-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 5px;
  border-radius: 12px 0 0 12px;
}
.color-amber .card-color-bar   { background: #f59e0b; }
.color-emerald .card-color-bar { background: #10b981; }
.color-blue .card-color-bar    { background: #3b82f6; }
.color-purple .card-color-bar  { background: #a855f7; }
.color-pink .card-color-bar    { background: #ec4899; }
.color-red .card-color-bar     { background: #ef4444; }
.color-cyan .card-color-bar    { background: #06b6d4; }
.color-orange .card-color-bar  { background: #f97316; }

.card-content { flex: 1; min-width: 0; }
.card-title { font-weight: 700; font-size: 0.95rem; }
.card-meta {
  display: flex; gap: 12px; flex-wrap: wrap;
  font-size: 0.76rem; margin-top: 3px;
}
.card-delete {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(239,68,68,0.1); color: #f87171;
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}
.class-card:hover .card-delete { opacity: 1; }
.card-delete:hover { background: rgba(239,68,68,0.25); }

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
   MODAL
   ========================================================= */
.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(2,6,23,0.75);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}
.modal {
  width: 100%; max-width: 520px;
  border-radius: 20px;
  border-width: 1px;
  overflow: hidden;
  box-shadow: 0 40px 80px -20px rgba(0,0,0,0.7);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.2rem;
  border-bottom-width: 1px;
}
.modal-title { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 1.05rem; }
.close-btn {
  background: rgba(120,120,120,0.15); border: none;
  width: 30px; height: 30px; border-radius: 50%;
  cursor: pointer; font-size: 0.9rem;
  transition: all 0.2s;
}
.close-btn:hover { background: rgba(239,68,68,0.2); color: #f87171; }

.modal-body {
  padding: 1.2rem;
  display: flex; flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.form-label { font-size: 0.78rem; font-weight: 600; }
.form-input {
  padding: 0.65rem 0.9rem; border-radius: 10px;
  border-width: 1px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
}
.form-input:focus {
  border-color: #fbbf24;
  box-shadow: 0 0 0 3px rgba(251,191,36,0.2);
}

.day-picker { display: flex; gap: 5px; flex-wrap: wrap; }
.day-pick-btn {
  flex: 1; min-width: 44px;
  padding: 0.55rem 0.4rem;
  border-radius: 8px;
  border: 1px solid rgba(120,120,120,0.2);
  background: transparent;
  color: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.day-pick-btn:hover { border-color: rgba(251,191,36,0.4); }
.day-pick-btn.active {
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  border-color: transparent;
  color: #0b1220;
}

.color-picker { display: flex; gap: 10px; flex-wrap: wrap; }
.color-swatch {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.color-swatch:hover { transform: scale(1.15); }
.color-swatch.active {
  border-color: #fff;
  box-shadow: 0 0 0 2px rgba(251,191,36,0.6), 0 0 16px rgba(251,191,36,0.5);
  transform: scale(1.1);
}
.swatch-amber   { background: linear-gradient(135deg,#fbbf24,#d97706); }
.swatch-emerald { background: linear-gradient(135deg,#34d399,#059669); }
.swatch-blue    { background: linear-gradient(135deg,#60a5fa,#2563eb); }
.swatch-purple  { background: linear-gradient(135deg,#c084fc,#7c3aed); }
.swatch-pink    { background: linear-gradient(135deg,#f472b6,#db2777); }
.swatch-red     { background: linear-gradient(135deg,#f87171,#dc2626); }
.swatch-cyan    { background: linear-gradient(135deg,#22d3ee,#0891b2); }
.swatch-orange  { background: linear-gradient(135deg,#fb923c,#ea580c); }

.modal-footer {
  display: flex; justify-content: space-between; align-items: center;
  gap: 10px;
  padding: 1rem 1.2rem;
  border-top-width: 1px;
  flex-wrap: wrap;
}
.modal-footer-right { display: flex; gap: 10px; margin-left: auto; }

.btn-delete {
  padding: 0.55rem 1rem; border-radius: 10px;
  background: transparent;
  border-width: 1px;
  font-weight: 600; font-size: 0.84rem;
  cursor: pointer; transition: all 0.2s;
}
.btn-delete:hover { background: rgba(239,68,68,0.1); }

/* =========================================================
   TEMPLATES
   ========================================================= */
.templates-hint {
  font-size: 0.85rem;
  line-height: 1.5;
}
.templates-hint strong { color: #fbbf24; }

.template-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.template-card {
  padding: 1rem;
  border-radius: 12px;
  border-width: 1px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.template-card:hover {
  border-color: rgba(251,191,36,0.5);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -8px rgba(251,191,36,0.3);
}
.template-icon { font-size: 1.6rem; margin-bottom: 4px; }
.template-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 2px; }
.template-desc { font-size: 0.78rem; }

/* =========================================================
   MODAL TRANSITION
   ========================================================= */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-active .modal, .modal-fade-leave-active .modal { transition: transform 0.3s cubic-bezier(0.2,0.9,0.4,1.1), opacity 0.25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal, .modal-fade-leave-to .modal { transform: scale(0.92) translateY(20px); opacity: 0; }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 900px) {
  .grid-header-row, .grid-body {
    grid-template-columns: 60px repeat(7, minmax(90px, 1fr));
  }
  .grid-view { overflow-x: auto; }
  .grid-body { min-width: 700px; }
  .grid-header-row { min-width: 700px; }
  .time-slot { font-size: 0.65rem; }
}

@media (max-width: 640px) {
  .toolbar-inner { flex-direction: column; align-items: stretch; }
  .toolbar-left, .toolbar-right { justify-content: center; }
  .page-title { font-size: 1.15rem; }
  .page-sub { display: none; }
  .form-row { grid-template-columns: 1fr; }
  .modal-footer { flex-direction: column; }
  .modal-footer-right { width: 100%; }
  .modal-footer-right .btn-secondary,
  .modal-footer-right .btn-primary { flex: 1; justify-content: center; }
  .schedule-area { padding: 1rem; }
}

/* =========================================================
   PRINT STYLES
   ========================================================= */
@media print {
  .page-header, .toolbar, .page-footer, .bg-blobs { display: none !important; }
  .schedule-area { padding: 0; }
  .class-block { box-shadow: none !important; }
  body { background: white !important; }
}
</style>