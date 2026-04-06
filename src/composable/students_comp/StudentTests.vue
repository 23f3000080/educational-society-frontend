<template>
  <section class="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6">
      <header class="overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-sm dark:border-cyan-900 dark:bg-gray-900/80">
        <div class="flex flex-wrap items-start justify-between gap-4 px-6 py-6 sm:px-8">
          <div class="max-w-2xl">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Student Tests</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Timed Test Center</h1>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
              Attend scheduled tests securely. Some tests may require a passcode, fullscreen mode, or strict tab control depending on admin settings.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Available" :value="availableTests.length" tone="cyan" />
            <StatCard label="Upcoming" :value="upcomingTests.length" tone="amber" />
            <StatCard label="Expired" :value="expiredTests.length" tone="rose" />
            <StatCard label="Attempted" :value="attemptedTests.length" tone="emerald" />
          </div>
        </div>
      </header>

      <p v-if="errorMessage" class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
        {{ errorMessage }}
      </p>

      <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="grid flex-1 gap-3 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
            <input
              v-model.trim="searchQuery"
              type="text"
              placeholder="Search tests by title, course, or description"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
            />
            <button
              v-for="filter in filters"
              :key="filter.value"
              type="button"
              @click="activeFilter = filter.value"
              :class="[
                'rounded-xl px-4 py-2.5 text-sm font-semibold transition',
                activeFilter === filter.value
                  ? 'bg-cyan-600 text-white dark:bg-cyan-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>

          <button
            type="button"
            @click="fetchTests"
            class="rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Refresh
          </button>
        </div>
      </section>

      <section v-if="loading" class="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading tests...</p>
      </section>

      <section v-else-if="filteredTests.length === 0" class="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300">
          <svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">No tests available</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Once admin creates an active test for your enrolled course, it will appear here.</p>
      </section>

      <section v-else class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="test in filteredTests"
          :key="test.id"
          class="group rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">{{ test.course_title }}</p>
              <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">{{ test.title }}</h2>
            </div>
            <span :class="['rounded-full px-3 py-1 text-xs font-semibold', statusBadgeClass(test.schedule_state)]">
              {{ test.schedule_state }}
            </span>
          </div>

          <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {{ test.description || 'No description provided.' }}
          </p>

          <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
            <InfoChip label="Scope" :value="test.test_scope === 'full_length' ? 'Full Length' : 'Week Wise'" />
            <InfoChip label="Duration" :value="`${test.duration_minutes || 60} min`" />
            <InfoChip label="Marks" :value="String(test.total_marks || 0)" />
            <InfoChip label="Attempts" :value="`${test.attempts_used}/${test.max_attempts}`" />
          </div>

          <div class="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/50">
            <div class="flex flex-wrap gap-2 text-xs font-semibold">
              <span v-if="test.passcode_required" class="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Passcode</span>
              <span v-if="test.require_fullscreen" class="rounded-full bg-fuchsia-100 px-2.5 py-1 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300">Fullscreen</span>
              <span v-if="test.prevent_tab_switch" class="rounded-full bg-rose-100 px-2.5 py-1 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">Tab Lock</span>
              <span v-if="test.shuffle_questions" class="rounded-full bg-cyan-100 px-2.5 py-1 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">Shuffle Questions</span>
              <span v-if="test.shuffle_options" class="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Shuffle Options</span>
            </div>
            <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {{ test.test_scope === 'full_length' ? 'Full-length' : `Week ${test.week_number || '-'} - ${test.week_title || 'N/A'}` }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ formatDateRange(test.start_at, test.due_date) }}
            </p>
          </div>

          <div class="mt-4 flex items-center justify-between gap-3">
            <div class="text-xs text-gray-500 dark:text-gray-400">
              <p>Remaining: {{ test.remaining_attempts }} attempt(s)</p>
            </div>
            <div class="flex gap-2">
              <button
                v-if="canViewResult(test)"
                type="button"
                @click="viewResult(test.id)"
                class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
              >
                View Results
              </button>
              <button
                type="button"
                @click="startTest(test)"
                :disabled="!test.can_attempt"
                :class="[
                  'rounded-xl px-4 py-2 text-sm font-semibold transition',
                  test.can_attempt
                    ? 'bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400'
                    : 'cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                ]"
              >
                {{ test.can_attempt ? 'Start Test' : 'Locked' }}
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>

    <div v-if="accessModalOpen" class="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 py-6">
      <div class="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Secure Access</p>
        <h3 class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ pendingTest?.title }}</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Enter the passcode provided by your admin to open this test.</p>

        <label class="mt-5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Passcode</label>
        <input
          v-model.trim="accessPasscode"
          type="password"
          placeholder="Enter passcode"
          class="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
        />

        <p v-if="accessError" class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          {{ accessError }}
        </p>

        <div class="mt-6 flex flex-wrap justify-end gap-2">
          <button type="button" @click="closeAccessModal" class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button type="button" @click="confirmAccess" :disabled="accessing" class="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400">
            {{ accessing ? 'Checking...' : 'Begin Test' }}
          </button>
        </div>
      </div>
    </div>

    <StudentTestRunner
      v-if="activeAttempt"
      :test="activeAttempt.test"
      :questions="activeAttempt.questions"
      :security="activeAttempt.security"
      :passcode="activePasscode"
      @close="closeRunner"
      @submit="submitAttempt"
    />

    <div v-if="submissionResultOpen" class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 px-4 py-6">
      <div class="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Submission Complete</p>
        <h3 class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Test submitted successfully</h3>
        <div class="mt-5 grid grid-cols-2 gap-3">
          <InfoChip label="Score" :value="`${lastSubmission?.submission?.score ?? 0}`" />
          <InfoChip label="Max" :value="`${lastSubmission?.submission?.max_score ?? 0}`" />
          <InfoChip label="Attempt" :value="`${lastSubmission?.submission?.attempt_no ?? 1}`" />
          <InfoChip label="Status" :value="'Submitted'" />
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" @click="closeSubmissionResult" class="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400">
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'
import StudentTestRunner from './StudentTestRunner.vue'

const router = useRouter()

const tests = ref([])
const loading = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')
const activeFilter = ref('all')

const accessModalOpen = ref(false)
const accessPasscode = ref('')
const accessError = ref('')
const accessing = ref(false)
const pendingTest = ref(null)

const activeAttempt = ref(null)
const activePasscode = ref('')
const submitting = ref(false)
const submissionError = ref('')
const lastSubmission = ref(null)
const submissionResultOpen = ref(false)

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'active' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Expired', value: 'expired' },
  { label: 'Attempted', value: 'attempted' }
]

const fetchTests = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data } = await api.get('/api/student/tests')
    tests.value = Array.isArray(data) ? data : []
  } catch (error) {
    tests.value = []
    errorMessage.value = error.response?.data?.error || 'Could not load tests.'
  } finally {
    loading.value = false
  }
}

const statusBadgeClass = (status) => {
  if (status === 'active') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
  if (status === 'upcoming') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
  if (status === 'expired') return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
  return 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
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

const formatDateRange = (startAt, endAt) => {
  if (!startAt && !endAt) return 'Open schedule'
  if (!startAt) return `Ends: ${formatDate(endAt)}`
  if (!endAt) return `Starts: ${formatDate(startAt)}`
  return `${formatDate(startAt)} → ${formatDate(endAt)}`
}

const availableTests = computed(() => tests.value.filter((test) => test.schedule_state === 'active'))
const upcomingTests = computed(() => tests.value.filter((test) => test.schedule_state === 'upcoming'))
const expiredTests = computed(() => tests.value.filter((test) => test.schedule_state === 'expired'))
const attemptedTests = computed(() => tests.value.filter((test) => Number(test.attempts_used || 0) > 0))

const filteredTests = computed(() => {
  const search = searchQuery.value.toLowerCase()

  return tests.value.filter((test) => {
    const matchesSearch = !search || [test.title, test.course_title, test.description, test.course_code].join(' ').toLowerCase().includes(search)
    const matchesFilter =
      activeFilter.value === 'all' ||
      (activeFilter.value === 'attempted' && Number(test.attempts_used || 0) > 0) ||
      test.schedule_state === activeFilter.value

    return matchesSearch && matchesFilter
  })
})

const startTest = (test) => {
  errorMessage.value = ''

  if (!test.can_attempt) {
    errorMessage.value = 'This test is currently locked or you have used all attempts.'
    return
  }

  pendingTest.value = test
  accessPasscode.value = ''
  accessError.value = ''

  if (test.passcode_required) {
    accessModalOpen.value = true
    return
  }

  confirmAccess()
}

const closeAccessModal = () => {
  accessModalOpen.value = false
  pendingTest.value = null
  accessPasscode.value = ''
  accessError.value = ''
}

const confirmAccess = async () => {
  if (!pendingTest.value) return

  accessing.value = true
  accessError.value = ''

  try {
    const { data } = await api.post(`/api/student/tests/${pendingTest.value.id}/access`, {
      passcode: accessPasscode.value
    })

    activeAttempt.value = {
      test: data.test,
      questions: data.questions,
      security: data.security
    }
    activePasscode.value = accessPasscode.value
    closeAccessModal()
  } catch (error) {
    accessError.value = error.response?.data?.error || 'Could not open this test.'
  } finally {
    accessing.value = false
  }
}

const closeRunner = () => {
  activeAttempt.value = null
  activePasscode.value = ''
}

const clearPersistedTestTimer = (testId) => {
  if (!testId) return
  const prefix = `student_test_started_at_${testId}_`
  const keysToRemove = []

  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i)
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => window.localStorage.removeItem(key))
}

const submitAttempt = async (payload) => {
  if (!activeAttempt.value || submitting.value) return

  submitting.value = true
  submissionError.value = ''

  try {
    const { data } = await api.post(`/api/student/tests/${activeAttempt.value.test.id}/submit`, {
      answers: payload.answers,
      passcode: payload.passcode || activePasscode.value
    })

    lastSubmission.value = data
    clearPersistedTestTimer(activeAttempt.value.test.id)
    submissionResultOpen.value = true
    closeRunner()
    await fetchTests()
  } catch (error) {
    submissionError.value = error.response?.data?.error || 'Could not submit the test.'
    errorMessage.value = submissionError.value
  } finally {
    submitting.value = false
  }
}

const closeSubmissionResult = () => {
  submissionResultOpen.value = false
  lastSubmission.value = null
}

const canViewResult = (test) => test.schedule_state === 'expired' && Number(test.attempts_used || 0) > 0

const viewResult = (testId) => {
  router.push(`/student/tests/${testId}/results`)
}

onMounted(() => {
  fetchTests()
})

const StatCard = {
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: 0 },
    tone: { type: String, default: 'cyan' }
  },
  template: `
    <div class="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-950/50">
      <p class="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{{ label }}</p>
      <p :class="['mt-1 text-2xl font-bold', toneClass]">{{ value }}</p>
    </div>
  `,
  computed: {
    toneClass() {
      return {
        cyan: 'text-cyan-700 dark:text-cyan-300',
        amber: 'text-amber-700 dark:text-amber-300',
        rose: 'text-rose-700 dark:text-rose-300',
        emerald: 'text-emerald-700 dark:text-emerald-300'
      }[this.tone] || 'text-cyan-700 dark:text-cyan-300'
    }
  }
}

const InfoChip = {
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: 'N/A' }
  },
  template: `
    <div class="rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900/70">
      <p class="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">{{ label }}</p>
      <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{{ value }}</p>
    </div>
  `
}
</script>
