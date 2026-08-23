<template>
  <section class="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6">
      <header class="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-gray-900/80 sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">Student Results</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{{ testInfo.title || 'Test Result' }}</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Review your submission after the test due date is completed.
            </p>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              @click="goBack"
              class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              type="button"
              @click="fetchResults"
              class="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      <p v-if="errorMessage" class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
        {{ errorMessage }}
      </p>

      <section class="flex gap-4">
        <!-- Left Side - Attempts List (Togglable) -->
        <div 
          v-show="showLeftSidebar"
          :class="[
            'rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/80',
            showRightSidebar ? 'lg:w-[280px]' : 'lg:w-[320px]',
            'flex-shrink-0'
          ]"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Your Attempts</h2>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ results.length }} attempts</span>
          </div>

          <div class="mt-4 space-y-3 max-h-[600px] overflow-y-auto pr-2" :class="isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'">
            <button
              v-for="item in results"
              :key="item.submission_id"
              type="button"
              @click="selectSubmission(item)"
              :class="[
                'w-full rounded-2xl border px-4 py-3 text-left transition',
                selectedSubmission?.submission_id === item.submission_id
                  ? 'border-cyan-400 bg-cyan-50 dark:border-cyan-500 dark:bg-cyan-950/30'
                  : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800'
              ]"
            >
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Attempt #{{ item.attempt_no }}</p>
                <span :class="[
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  item.percentage >= 70 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                  item.percentage >= 40 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                  'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                ]">
                  {{ item.percentage }}%
                </span>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Score: {{ item.score }}/{{ item.max_score }}</p>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ formatDate(item.submitted_at) }}</p>
            </button>

            <p v-if="!loading && results.length === 0" class="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              No submissions found for this test.
            </p>
            <p v-if="loading" class="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              Loading submissions...
            </p>
          </div>
        </div>

        <!-- Left Toggle Button -->
        <button
          type="button"
          @click="toggleLeftSidebar"
          :class="[
            'hidden lg:flex items-center justify-center w-8 h-12 rounded-l-xl transition-all duration-300 self-center',
            'shadow-lg hover:shadow-xl flex-shrink-0',
            isDarkMode 
              ? 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90 border border-white/10' 
              : 'bg-white/90 text-gray-600 hover:bg-gray-50 border border-gray-200',
            showLeftSidebar ? 'rounded-r-none' : 'rounded-r-xl',
          ]"
          :title="showLeftSidebar ? 'Hide Attempts Panel' : 'Show Attempts Panel'"
        >
          <svg 
            class="w-4 h-4 transition-transform duration-300" 
            :class="{ 'rotate-180': !showLeftSidebar }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Middle - Question Analysis (Main Content) -->
        <div :class="[
          'rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/80',
          showLeftSidebar && showRightSidebar ? 'lg:w-[calc(100%-660px)]' :
          showLeftSidebar && !showRightSidebar ? 'lg:w-[calc(100%-340px)]' :
          !showLeftSidebar && showRightSidebar ? 'lg:w-[calc(100%-380px)]' :
          'lg:w-full',
          'flex-1'
        ]">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Question Wise Analysis</h2>
            <!-- Mobile toggle buttons -->
            <div class="flex gap-2 lg:hidden">
              <button
                type="button"
                @click="toggleLeftSidebar"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                type="button"
                @click="toggleRightSidebar"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <p v-if="selectedSubmission" class="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Attempt #{{ selectedSubmission.attempt_no }} · {{ selectedSubmission.score }}/{{ selectedSubmission.max_score }}
            <span class="ml-2 text-xs" :class="[
              selectedSubmission.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
              selectedSubmission.percentage >= 40 ? 'text-amber-600 dark:text-amber-400' :
              'text-rose-600 dark:text-rose-400'
            ]">
              ({{ selectedSubmission.percentage }}%)
            </span>
          </p>

          <div v-if="detailLoading" class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Loading question analysis...
          </div>

          <div v-else-if="!selectedSubmission" class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Select an attempt to view detailed answers.
          </div>

          <div v-else class="mt-4 space-y-4 max-h-[600px] overflow-y-auto pr-2" :class="isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'">
            <!-- Summary Stats -->
            <div class="grid grid-cols-3 gap-2">
              <div class="rounded-xl bg-emerald-50 p-2 text-center dark:bg-emerald-950/30">
                <p class="text-lg font-bold text-emerald-700 dark:text-emerald-400">{{ getCorrectCount }}</p>
                <p class="text-[10px] text-emerald-600 dark:text-emerald-400">Correct</p>
              </div>
              <div class="rounded-xl bg-rose-50 p-2 text-center dark:bg-rose-950/30">
                <p class="text-lg font-bold text-rose-700 dark:text-rose-400">{{ getIncorrectCount }}</p>
                <p class="text-[10px] text-rose-600 dark:text-rose-400">Incorrect</p>
              </div>
              <div class="rounded-xl bg-gray-50 p-2 text-center dark:bg-gray-800/50">
                <p class="text-lg font-bold text-gray-700 dark:text-gray-400">{{ questionDetails.length }}</p>
                <p class="text-[10px] text-gray-600 dark:text-gray-400">Total</p>
              </div>
            </div>

            <article
              v-for="question in questionDetails"
              :key="question.question_id"
              class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/50"
            >
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white question-content" 
                    v-html="convertToHTML(`Q${question.question_no}. ${question.question_text}`)">
                </h3>
                <span :class="[
                  'rounded-full px-2.5 py-0.5 text-xs font-semibold flex-shrink-0',
                  question.is_correct
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                ]">
                  {{ question.is_correct ? '✓' : '✗' }}
                </span>
              </div>

              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Marks: {{ question.earned_marks }}/{{ question.marks }}</p>

              <div v-if="question.options?.length" class="mt-3 space-y-1.5">
                <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Options</p>
                <div
                  v-for="option in question.options"
                  :key="option.id"
                  :class="[
                    'rounded-xl border px-3 py-2 text-sm transition',
                    option.is_correct && option.is_selected
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
                      : option.is_correct
                        ? 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200'
                        : option.is_selected
                          ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200'
                          : 'border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'
                  ]"
                >
                  <span class="option-content" v-html="convertToHTML(option.option_text)"></span>
                  <span class="ml-2 text-[10px] font-semibold">
                    <span v-if="option.is_correct" class="text-cyan-600 dark:text-cyan-400">(Correct)</span>
                    <span v-if="option.is_selected && !option.is_correct" class="text-amber-600 dark:text-amber-400">(Selected)</span>
                    <span v-if="option.is_correct && option.is_selected" class="text-emerald-600 dark:text-emerald-400">(✓ Correct)</span>
                  </span>
                </div>
              </div>

              <!-- Selected Answer & Correct Answer with HTML rendering -->
              <div class="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Selected Answer</p>
                  <p class="mt-1 text-sm text-gray-700 dark:text-gray-200 answer-content" 
                     v-html="convertToHTML(formatAnswer(question.selected_answer))">
                  </p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Correct Answer</p>
                  <p class="mt-1 text-sm text-gray-700 dark:text-gray-200 answer-content"
                     v-html="convertToHTML(formatAnswer(question.correct_answer))">
                  </p>
                </div>
              </div>
            </article>

            <p v-if="questionDetails.length === 0" class="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              No question details available.
            </p>
          </div>
        </div>

        <!-- Right Toggle Button -->
        <button
          type="button"
          @click="toggleRightSidebar"
          :disabled="!selectedSubmission"
          :class="[
            'hidden lg:flex items-center justify-center w-8 h-12 rounded-r-xl transition-all duration-300 self-center',
            'shadow-lg hover:shadow-xl flex-shrink-0',
            isDarkMode 
              ? 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90 border border-white/10' 
              : 'bg-white/90 text-gray-600 hover:bg-gray-50 border border-gray-200',
            showRightSidebar ? 'rounded-l-none' : 'rounded-l-xl',
            !selectedSubmission ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          ]"
          :title="showRightSidebar ? 'Hide Details Panel' : 'Show Details Panel'"
        >
          <svg 
            class="w-4 h-4 transition-transform duration-300" 
            :class="{ 'rotate-180': !showRightSidebar }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Right Side - Additional Details (Optional) -->
        <aside 
          v-show="showRightSidebar"
          :class="[
            'rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/80',
            'lg:w-[280px] lg:flex-shrink-0 overflow-hidden'
          ]"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Details</h2>
            <!-- Mobile close button -->
            <button
              type="button"
              @click="toggleRightSidebar"
              class="lg:hidden p-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/10"
              :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="selectedSubmission" class="mt-4 space-y-3">
            <div class="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
              <p class="text-xs text-gray-500 dark:text-gray-400">Test Information</p>
              <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{{ testInfo.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Duration: {{ testInfo.duration_minutes || 0 }} minutes</p>
            </div>

            <div class="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
              <p class="text-xs text-gray-500 dark:text-gray-400">Attempt Details</p>
              <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">Attempt #{{ selectedSubmission.attempt_no }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Submitted: {{ formatDate(selectedSubmission.submitted_at) }}</p>
            </div>

            <div class="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
              <p class="text-xs text-gray-500 dark:text-gray-400">Performance</p>
              <div class="mt-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">Score</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ selectedSubmission.score }}/{{ selectedSubmission.max_score }}</span>
                </div>
                <div class="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div 
                    class="h-2 rounded-full transition-all"
                    :class="[
                      selectedSubmission.percentage >= 70 ? 'bg-emerald-500' :
                      selectedSubmission.percentage >= 40 ? 'bg-amber-500' :
                      'bg-rose-500'
                    ]"
                    :style="{ width: `${selectedSubmission.percentage}%` }"
                  ></div>
                </div>
                <div class="mt-1 flex justify-between text-xs">
                  <span class="text-gray-500 dark:text-gray-400">0%</span>
                  <span class="font-bold" :class="[
                    selectedSubmission.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                    selectedSubmission.percentage >= 40 ? 'text-amber-600 dark:text-amber-400' :
                    'text-rose-600 dark:text-rose-400'
                  ]">{{ selectedSubmission.percentage }}%</span>
                  <span class="text-gray-500 dark:text-gray-400">100%</span>
                </div>
              </div>
            </div>

            <div class="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
              <p class="text-xs text-gray-500 dark:text-gray-400">Quick Stats</p>
              <div class="mt-2 grid grid-cols-2 gap-2">
                <div class="text-center">
                  <p class="text-lg font-bold text-emerald-600 dark:text-emerald-400">{{ getCorrectCount }}</p>
                  <p class="text-[10px] text-gray-500 dark:text-gray-400">Correct</p>
                </div>
                <div class="text-center">
                  <p class="text-lg font-bold text-rose-600 dark:text-rose-400">{{ getIncorrectCount }}</p>
                  <p class="text-[10px] text-gray-500 dark:text-gray-400">Incorrect</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Select an attempt to view details.
          </div>
        </aside>
      </section>
    </div>

    <!-- Mobile Overlay for Left Sidebar -->
    <div 
      v-if="showLeftSidebar && isMobile"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="toggleLeftSidebar"
    ></div>

    <!-- Mobile Overlay for Right Sidebar -->
    <div 
      v-if="showRightSidebar && isMobile"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="toggleRightSidebar"
    ></div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios'

const route = useRoute()
const router = useRouter()

const testId = Number(route.params.id)
const loading = ref(false)
const detailLoading = ref(false)
const errorMessage = ref('')
const showLeftSidebar = ref(true)
const showRightSidebar = ref(true)
const isDarkMode = ref(false)
const isMobile = ref(false)

const testInfo = reactive({
  title: '',
  course_title: '',
  duration_minutes: 0
})

const results = ref([])
const selectedSubmission = ref(null)
const questionDetails = ref([])

// ⭐ HTML Conversion Function
const convertToHTML = (text) => {
  if (!text) return ''
  
  let html = String(text)
  
  // Convert **bold** to <strong>bold</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Convert *italic* to <em>italic</em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Convert `code` to <code>code</code>
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')
  
  // Convert __underline__ to <u>underline</u>
  html = html.replace(/__(.*?)__/g, '<u>$1</u>')
  
  // Convert ==highlight== to <mark>highlight</mark>
  html = html.replace(/==(.*?)==/g, '<mark>$1</mark>')
  
  // Convert ~~strikethrough~~ to <del>strikethrough</del>
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>')
  
  // Convert [link](url) to <a href="url">link</a>
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  
  // Convert newlines to <br> tags
  html = html.replace(/\n/g, '<br>')
  
  return html
}

// ⭐ Computed for statistics
const getCorrectCount = computed(() => {
  return questionDetails.value.filter(q => q.is_correct).length
})

const getIncorrectCount = computed(() => {
  return questionDetails.value.filter(q => !q.is_correct).length
})

// ⭐ Detect dark mode
const detectDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
}

// ⭐ Check mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  // On mobile, hide both sidebars by default
  if (isMobile.value) {
    // Only auto-hide if not in the middle of user interaction
  }
}

// ⭐ Toggle Functions
const toggleLeftSidebar = () => {
  showLeftSidebar.value = !showLeftSidebar.value
  // Save preference
  try {
    localStorage.setItem('results_left_sidebar', JSON.stringify(showLeftSidebar.value))
  } catch (e) {
    // Ignore
  }
}

const toggleRightSidebar = () => {
  if (!selectedSubmission.value) return
  showRightSidebar.value = !showRightSidebar.value
  // Save preference
  try {
    localStorage.setItem('results_right_sidebar', JSON.stringify(showRightSidebar.value))
  } catch (e) {
    // Ignore
  }
}

// ⭐ Load sidebar preferences
const loadSidebarPreferences = () => {
  try {
    const left = localStorage.getItem('results_left_sidebar')
    if (left !== null) {
      showLeftSidebar.value = JSON.parse(left)
    }
    const right = localStorage.getItem('results_right_sidebar')
    if (right !== null) {
      showRightSidebar.value = JSON.parse(right)
    }
  } catch (e) {
    // Ignore
  }
}

const formatDate = (value) => {
  if (!value) return 'N/A'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

const formatAnswer = (value) => {
  if (value === null || value === undefined) return 'Not answered'
  if (Array.isArray(value)) {
    if (value.length === 0) return 'Not answered'
    return value.join(', ')
  }
  const text = String(value).trim()
  return text || 'Not answered'
}

const fetchResults = async () => {
  if (!testId) {
    errorMessage.value = 'Invalid test id.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const { data } = await api.get(`/api/student/tests/${testId}/results`)
    Object.assign(testInfo, data?.test || {})
    results.value = data?.results || []

    if (results.value.length > 0) {
      await selectSubmission(results.value[0])
    } else {
      selectedSubmission.value = null
      questionDetails.value = []
    }
  } catch (error) {
    results.value = []
    selectedSubmission.value = null
    questionDetails.value = []
    errorMessage.value = error.response?.data?.error || 'Could not load results.'
  } finally {
    loading.value = false
  }
}

const selectSubmission = async (submission) => {
  selectedSubmission.value = submission
  detailLoading.value = true
  
  // Show right sidebar when a submission is selected
  if (!showRightSidebar.value) {
    showRightSidebar.value = true
  }

  try {
    const { data } = await api.get(`/api/student/tests/${testId}/results/${submission.submission_id}`)
    questionDetails.value = data?.questions || []
  } catch (error) {
    questionDetails.value = []
    errorMessage.value = error.response?.data?.error || 'Could not load submission details.'
  } finally {
    detailLoading.value = false
  }
}

const goBack = () => {
  router.push('/student/tests')
}

// Watch for dark mode changes
watch(isDarkMode, (newVal) => {
  document.documentElement.classList.toggle('dark', newVal)
})

onMounted(() => {
  detectDarkMode()
  loadSidebarPreferences()
  checkMobile()
  fetchResults()
  
  // Listen for dark mode changes
  const observer = new MutationObserver(() => {
    detectDarkMode()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  // Window resize for mobile detection
  window.addEventListener('resize', checkMobile)
  
  // Cleanup
  return () => {
    observer.disconnect()
    window.removeEventListener('resize', checkMobile)
  }
})
</script>

<style scoped>
/* Custom Scrollbar */
.scrollbar-light::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-light::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-light::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.scrollbar-light::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.scrollbar-dark::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-dark::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-dark::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 10px;
}

.scrollbar-dark::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* ⭐ HTML Content Styles - Question, Options, and Answers */
.question-content :deep(strong),
.option-content :deep(strong),
.answer-content :deep(strong) {
  font-weight: 700;
  color: inherit;
}

.question-content :deep(em),
.option-content :deep(em),
.answer-content :deep(em) {
  font-style: italic;
}

.question-content :deep(code),
.option-content :deep(code),
.answer-content :deep(code) {
  background-color: rgba(100, 100, 100, 0.15);
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.question-content :deep(mark),
.option-content :deep(mark),
.answer-content :deep(mark) {
  background-color: #fbbf24;
  color: #1e293b;
  padding: 0.1rem 0.2rem;
  border-radius: 0.125rem;
}

.question-content :deep(u),
.option-content :deep(u),
.answer-content :deep(u) {
  text-decoration: underline;
}

.question-content :deep(del),
.option-content :deep(del),
.answer-content :deep(del) {
  text-decoration: line-through;
  opacity: 0.7;
}

.question-content :deep(a),
.option-content :deep(a),
.answer-content :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
}

.question-content :deep(a):hover,
.option-content :deep(a):hover,
.answer-content :deep(a):hover {
  color: #2563eb;
}

/* Table support for answers */
.answer-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.25rem 0;
}

.answer-content :deep(th),
.answer-content :deep(td) {
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.answer-content :deep(ul),
.answer-content :deep(ol) {
  padding-left: 1rem;
  margin: 0.125rem 0;
}

.answer-content :deep(li) {
  margin: 0.0625rem 0;
}

/* Dark mode adjustments for HTML content */
:deep(.dark) .question-content mark,
:deep(.dark) .option-content mark,
:deep(.dark) .answer-content mark {
  background-color: #fbbf24;
  color: #0f172a;
}

:deep(.dark) .question-content code,
:deep(.dark) .option-content code,
:deep(.dark) .answer-content code {
  background-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

:deep(.dark) .question-content a,
:deep(.dark) .option-content a,
:deep(.dark) .answer-content a {
  color: #60a5fa;
}

:deep(.dark) .question-content a:hover,
:deep(.dark) .option-content a:hover,
:deep(.dark) .answer-content a:hover {
  color: #93bbfc;
}

:deep(.dark) .answer-content table th,
:deep(.dark) .answer-content table td {
  border-color: rgba(255, 255, 255, 0.2);
}

/* Sidebar transitions */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Mobile Responsive */
@media (max-width: 1023px) {
  /* Left sidebar on mobile */
  .lg\:w-\[280px\]:first-of-type {
    position: fixed !important;
    top: 0;
    left: 0;
    height: 100vh;
    width: 85% !important;
    max-width: 320px !important;
    z-index: 50;
    padding-top: 3rem;
    overflow-y: auto;
    border-radius: 0 !important;
    border-top-right-radius: 1.5rem !important;
    border-bottom-right-radius: 1.5rem !important;
  }
  
  /* Right sidebar on mobile */
  .lg\:w-\[280px\]:last-of-type {
    position: fixed !important;
    top: 0;
    right: 0;
    height: 100vh;
    width: 85% !important;
    max-width: 320px !important;
    z-index: 50;
    padding-top: 3rem;
    overflow-y: auto;
    border-radius: 0 !important;
    border-top-left-radius: 1.5rem !important;
    border-bottom-left-radius: 1.5rem !important;
  }
}

@media (max-width: 640px) {
  .lg\:w-\[280px\] {
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 0 !important;
  }
}
</style>