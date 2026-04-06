<template>
  <div :class="['fixed inset-0 z-50', isDarkMode ? 'bg-slate-950/90 text-white' : 'bg-slate-100/95 text-slate-900']">
    <div ref="runnerRoot" class="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <div :class="[
        'flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 backdrop-blur',
        isDarkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
      ]">
        <div>
          <p :class="['text-xs uppercase tracking-[0.24em]', isDarkMode ? 'text-emerald-300' : 'text-emerald-700']">Test In Progress</p>
          <h2 class="mt-1 text-xl font-semibold">{{ test.title }}</h2>
          <p :class="['text-sm', isDarkMode ? 'text-slate-300' : 'text-slate-600']">
            {{ test.course_title }}
            <span v-if="test.test_scope === 'full_length'"> · Full Length</span>
            <span v-else-if="test.week_title"> · Week {{ test.week_number }} - {{ test.week_title }}</span>
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div :class="[
            'rounded-xl px-4 py-2 text-right',
            isDarkMode ? 'border border-white/10 bg-black/20' : 'border border-slate-200 bg-slate-50'
          ]">
            <p :class="['text-[11px] uppercase tracking-[0.2em]', isDarkMode ? 'text-slate-300' : 'text-slate-500']">Time Left</p>
            <p class="text-lg font-bold">{{ formattedTimeLeft }}</p>
          </div>
          <button
            type="button"
            @click="toggleTheme"
            :class="[
              'rounded-xl px-4 py-2 text-sm font-semibold transition',
              isDarkMode
                ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            ]"
          >
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <button
            type="button"
            @click="$emit('close')"
            :class="[
              'rounded-xl px-4 py-2 text-sm font-semibold transition',
              isDarkMode
                ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            ]"
          >
            Close
          </button>
        </div>
      </div>

      <div class="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section :class="[
          'rounded-3xl p-4 shadow-2xl backdrop-blur sm:p-6',
          isDarkMode ? 'border border-white/10 bg-slate-900/80' : 'border border-slate-200 bg-white'
        ]">
          <div :class="['flex flex-wrap items-center gap-2 text-sm', isDarkMode ? 'text-slate-300' : 'text-slate-700']">
            <span :class="['rounded-full px-3 py-1', isDarkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700']">{{ questions.length }} Questions</span>
            <span :class="['rounded-full px-3 py-1', isDarkMode ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-700']">{{ test.duration_minutes || 60 }} Minutes</span>
            <span :class="['rounded-full px-3 py-1', isDarkMode ? 'bg-violet-500/15 text-violet-300' : 'bg-violet-100 text-violet-700']">Answered {{ answeredCount }}/{{ questions.length }}</span>
          </div>

          <p v-if="securityMessage" :class="[
            'mt-4 rounded-2xl border px-4 py-3 text-sm',
            isDarkMode ? 'border-rose-400/30 bg-rose-500/10 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-700'
          ]">
            {{ securityMessage }}
          </p>

          <div class="mt-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
            <div v-if="!selectedQuestion" :class="[
              'rounded-2xl border border-dashed p-8 text-center text-sm',
              isDarkMode ? 'border-white/20 bg-white/5 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
            ]">
              Select a question number from the right side to view it.
            </div>

            <article
              v-else
              :key="selectedQuestion.id"
              :class="[
                'rounded-2xl border p-4 shadow-sm',
                isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
              ]"
            >
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p :class="['text-xs uppercase tracking-[0.2em]', isDarkMode ? 'text-slate-400' : 'text-slate-500']">Question {{ selectedQuestionIndex + 1 }}</p>
                  <h3 :class="['mt-1 text-lg font-semibold', isDarkMode ? 'text-white' : 'text-slate-900']" v-html="selectedQuestion.question_text"></h3>
                </div>
                <span :class="[
                  'rounded-full px-3 py-1 text-xs font-semibold',
                  isDarkMode ? 'bg-white/10 text-slate-200' : 'bg-slate-200 text-slate-700'
                ]">{{ selectedQuestion.marks }} marks</span>
              </div>

              <div v-if="selectedQuestion.question_type === 'mcq'" class="mt-4 space-y-2">
                <label
                  v-for="option in selectedQuestion.options"
                  :key="option.id"
                  :class="[
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition',
                    isDarkMode
                      ? 'border-white/10 bg-slate-950/40 hover:border-cyan-400/40 hover:bg-slate-950/60'
                      : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50'
                  ]"
                >
                  <input
                    v-model="answers[selectedQuestion.id]"
                    type="radio"
                    :name="`question-${selectedQuestion.id}`"
                    :value="option.id"
                    class="h-4 w-4 accent-cyan-400"
                  />
                  <span :class="['text-sm', isDarkMode ? 'text-slate-200' : 'text-slate-800']">{{ option.option_text }}</span>
                </label>
              </div>

              <div v-else-if="selectedQuestion.question_type === 'multiple_select'" class="mt-4 space-y-2">
                <label
                  v-for="option in selectedQuestion.options"
                  :key="option.id"
                  :class="[
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition',
                    isDarkMode
                      ? 'border-white/10 bg-slate-950/40 hover:border-cyan-400/40 hover:bg-slate-950/60'
                      : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50'
                  ]"
                >
                  <input
                    :checked="isSelected(selectedQuestion.id, option.id)"
                    type="checkbox"
                    class="h-4 w-4 accent-cyan-400"
                    @change="toggleMulti(selectedQuestion.id, option.id)"
                  />
                  <span :class="['text-sm', isDarkMode ? 'text-slate-200' : 'text-slate-800']">{{ option.option_text }}</span>
                </label>
              </div>

              <div v-else class="mt-4">
                <input
                  v-model="answers[selectedQuestion.id]"
                  type="text"
                  placeholder="Type your answer"
                  :class="[
                    'w-full rounded-xl border px-3 py-2 text-sm outline-none transition',
                    isDarkMode
                      ? 'border-white/10 bg-slate-950/40 text-white placeholder:text-slate-400 focus:border-cyan-400'
                      : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-cyan-500'
                  ]"
                />
              </div>
            </article>
          </div>
        </section>

        <aside class="space-y-4">
          <div :class="[
            'rounded-3xl p-5 shadow-2xl backdrop-blur',
            isDarkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
          ]">
            <h3 class="text-lg font-semibold">Questions</h3>
            <div class="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6 xl:grid-cols-5">
              <button
                v-for="(question, index) in questions"
                :key="question.id"
                type="button"
                @click="selectQuestion(index)"
                :class="[
                  'rounded-lg border px-2 py-2 text-sm font-semibold transition',
                  selectedQuestionIndex === index
                    ? 'border-cyan-300 bg-cyan-500 text-white'
                    : isQuestionAnswered(question)
                      ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30'
                      : 'border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
                ]"
              >
                {{ index + 1 }}
              </button>
            </div>
            <p class="mt-4 text-xs text-slate-300">
              Click a number to open that question.
            </p>
            <p v-if="violation" :class="[
              'mt-4 rounded-xl border px-4 py-3 text-sm',
              isDarkMode ? 'border-rose-400/20 bg-rose-500/10 text-rose-100' : 'border-rose-200 bg-rose-50 text-rose-700'
            ]">
              {{ violation }}
            </p>
          </div>

          <div :class="[
            'rounded-3xl p-5 shadow-2xl backdrop-blur',
            isDarkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
          ]">
            <h3 class="text-lg font-semibold">Submission</h3>
            <p :class="['mt-2 text-sm', isDarkMode ? 'text-slate-300' : 'text-slate-600']">
              The test will auto-submit when the timer reaches zero.
            </p>
            <div class="mt-4 flex gap-2">
              <button
                type="button"
                @click="emitSubmit"
                :disabled="submitting || locked"
                class="flex-1 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ submitting ? 'Submitting...' : 'Submit Test' }}
              </button>
            </div>
            <p :class="['mt-3 text-xs', isDarkMode ? 'text-slate-400' : 'text-slate-500']">
              Keep this tab active and remain in fullscreen if required.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const THEME_STORAGE_KEY = 'student_tests_theme'

const props = defineProps({
  test: {
    type: Object,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  security: {
    type: Object,
    required: true
  },
  passcode: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'submit'])

const runnerRoot = ref(null)
const answers = reactive({})
const durationSeconds = Math.max(1, Number(props.test.duration_minutes || 60)) * 60
const timerStorageKey = `student_test_started_at_${props.test.id}_${Number(props.test.attempts_used || 0)}`
const startedAtMs = ref(null)
const timeLeft = ref(durationSeconds)
const submitting = ref(false)
const violation = ref('')
const locked = ref(false)
const selectedQuestionIndex = ref(null)
const autoSubmitted = ref(false)
const isDarkMode = ref(false)
const isThemeSwitching = ref(false)
let timerHandle = null
let fullscreenRequested = false

const formattedTimeLeft = computed(() => {
  const total = Math.max(0, timeLeft.value)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const isSelected = (questionId, optionId) => {
  const selected = answers[questionId] || []
  return Array.isArray(selected) && selected.includes(optionId)
}

const selectedQuestion = computed(() => {
  if (selectedQuestionIndex.value === null) return null
  return props.questions[selectedQuestionIndex.value] || null
})

const isQuestionAnswered = (question) => {
  const value = answers[question.id]
  if (question.question_type === 'multiple_select') {
    return Array.isArray(value) && value.length > 0
  }
  if (question.question_type === 'text') {
    return typeof value === 'string' && value.trim().length > 0
  }
  return value !== undefined && value !== null && String(value).trim() !== ''
}

const answeredCount = computed(() => props.questions.filter((question) => isQuestionAnswered(question)).length)

const selectQuestion = (index) => {
  selectedQuestionIndex.value = index
}

const applyTheme = (darkModeEnabled) => {
  isDarkMode.value = darkModeEnabled
  document.documentElement.classList.toggle('dark', darkModeEnabled)
  window.localStorage.setItem(THEME_STORAGE_KEY, darkModeEnabled ? 'dark' : 'light')
}

const toggleTheme = async () => {
  const wasFullscreen = Boolean(document.fullscreenElement)
  isThemeSwitching.value = true
  applyTheme(!isDarkMode.value)

  await nextTick()

  if (wasFullscreen && !document.fullscreenElement && runnerRoot.value?.requestFullscreen) {
    try {
      await runnerRoot.value.requestFullscreen()
    } catch {
      // Ignore restoration failure; normal security checks will continue.
    }
  }

  window.setTimeout(() => {
    isThemeSwitching.value = false
  }, 400)
}

const ensureStartedAt = () => {
  const stored = Number(window.localStorage.getItem(timerStorageKey))
  if (Number.isFinite(stored) && stored > 0) {
    startedAtMs.value = stored
    return
  }

  const now = Date.now()
  startedAtMs.value = now
  window.localStorage.setItem(timerStorageKey, String(now))
}

const syncTimeLeftWithWallClock = () => {
  if (!startedAtMs.value) return
  const elapsedSeconds = Math.floor((Date.now() - startedAtMs.value) / 1000)
  timeLeft.value = Math.max(0, durationSeconds - elapsedSeconds)
}

const toggleMulti = (questionId, optionId) => {
  const selected = Array.isArray(answers[questionId]) ? [...answers[questionId]] : []
  const index = selected.indexOf(optionId)

  if (index >= 0) {
    selected.splice(index, 1)
  } else {
    selected.push(optionId)
  }

  answers[questionId] = selected
}

const requestFullscreen = async () => {
  if (!props.security.require_fullscreen || fullscreenRequested || !runnerRoot.value?.requestFullscreen) {
    return
  }

  try {
    await runnerRoot.value.requestFullscreen()
    fullscreenRequested = true
  } catch {
    violation.value = 'Fullscreen access is required. Please allow fullscreen to continue.'
    locked.value = true
  }
}

const lockForSecurity = (message) => {
  if (locked.value) return
  violation.value = message
  locked.value = true
}

const handleVisibilityChange = () => {
  if (document.visibilityState !== 'visible' && props.security.prevent_tab_switch) {
    lockForSecurity('Tab switching detected. This attempt is now locked.')
  }
}

const handleBlur = () => {
  if (props.security.prevent_tab_switch) {
    lockForSecurity('Focus lost from the test window. This attempt is now locked.')
  }
}

const handleFullscreenChange = () => {
  if (isThemeSwitching.value) return
  if (props.security.require_fullscreen && !document.fullscreenElement) {
    lockForSecurity('Fullscreen was exited. This attempt is now locked.')
  }
}

const buildPayload = () => {
  return props.questions.map((question) => {
    const value = answers[question.id]

    if (question.question_type === 'mcq') {
      return {
        question_id: question.id,
        selected_option_id: value ? Number(value) : null
      }
    }

    if (question.question_type === 'multiple_select') {
      return {
        question_id: question.id,
        selected_option_ids: Array.isArray(value) ? value.map((item) => Number(item)) : []
      }
    }

    return {
      question_id: question.id,
      text_answer: value || ''
    }
  })
}

const emitSubmit = async () => {
  if (submitting.value || locked.value) return
  submitting.value = true
  autoSubmitted.value = true
  emit('submit', {
    answers: buildPayload(),
    passcode: props.passcode
  })
  submitting.value = false
}

const tick = () => {
  syncTimeLeftWithWallClock()

  if (timeLeft.value <= 0) {
    if (autoSubmitted.value) return
    emitSubmit()
    return
  }
}

const handleCopyEvent = (event) => {
  event.preventDefault()
}

const handleKeydown = (event) => {
  const key = event.key?.toLowerCase()
  if ((event.ctrlKey || event.metaKey) && (key === 'c' || key === 'x' || key === 'insert')) {
    event.preventDefault()
  }
}

const handleContextMenu = (event) => {
  event.preventDefault()
}

onMounted(() => {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme === 'dark')
  } else {
    applyTheme(document.documentElement.classList.contains('dark'))
  }

  ensureStartedAt()
  syncTimeLeftWithWallClock()

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('blur', handleBlur)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('copy', handleCopyEvent)
  document.addEventListener('cut', handleCopyEvent)
  document.addEventListener('contextmenu', handleContextMenu)
  document.addEventListener('keydown', handleKeydown)

  timerHandle = window.setInterval(tick, 1000)
  requestFullscreen()
})

onBeforeUnmount(() => {
  if (timerHandle) {
    window.clearInterval(timerHandle)
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('blur', handleBlur)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('copy', handleCopyEvent)
  document.removeEventListener('cut', handleCopyEvent)
  document.removeEventListener('contextmenu', handleContextMenu)
  document.removeEventListener('keydown', handleKeydown)
})
</script>
