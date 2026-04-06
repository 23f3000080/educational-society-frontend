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

      <section class="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Your Attempts</h2>

          <div class="mt-4 space-y-3">
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
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Attempt #{{ item.attempt_no }}</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Score: {{ item.score }}/{{ item.max_score }} ({{ item.percentage }}%)</p>
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

        <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Question Wise Analysis</h2>

          <p v-if="selectedSubmission" class="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Attempt #{{ selectedSubmission.attempt_no }} · {{ selectedSubmission.score }}/{{ selectedSubmission.max_score }}
          </p>

          <div v-if="detailLoading" class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Loading question analysis...
          </div>

          <div v-else-if="!selectedSubmission" class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Select an attempt to view detailed answers.
          </div>

          <div v-else class="mt-4 space-y-4">
            <article
              v-for="question in questionDetails"
              :key="question.question_id"
              class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/50"
            >
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                  Q{{ question.question_no }}. {{ question.question_text }}
                </h3>
                <span :class="[
                  'rounded-full px-2.5 py-1 text-xs font-semibold',
                  question.is_correct
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                ]">
                  {{ question.is_correct ? 'Correct' : 'Incorrect' }}
                </span>
              </div>

              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Marks: {{ question.earned_marks }}/{{ question.marks }}</p>

              <div v-if="question.options?.length" class="mt-3 space-y-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Options</p>
                <div
                  v-for="option in question.options"
                  :key="option.id"
                  :class="[
                    'rounded-xl border px-3 py-2 text-sm',
                    option.is_correct && option.is_selected
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
                      : option.is_correct
                        ? 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200'
                        : option.is_selected
                          ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200'
                          : 'border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'
                  ]"
                >
                  <span>{{ option.option_text }}</span>
                  <span class="ml-2 text-xs font-semibold">
                    <span v-if="option.is_correct">(Correct)</span>
                    <span v-if="option.is_selected">(Selected)</span>
                  </span>
                </div>
              </div>

              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Selected Answer</p>
                  <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{{ formatAnswer(question.selected_answer) }}</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Correct Answer</p>
                  <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{{ formatAnswer(question.correct_answer) }}</p>
                </div>
              </div>
            </article>

            <p v-if="questionDetails.length === 0" class="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              No question details available.
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios'

const route = useRoute()
const router = useRouter()

const testId = Number(route.params.id)
const loading = ref(false)
const detailLoading = ref(false)
const errorMessage = ref('')

const testInfo = reactive({
  title: '',
  course_title: '',
  duration_minutes: 0
})

const results = ref([])
const selectedSubmission = ref(null)
const questionDetails = ref([])

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

onMounted(() => {
  fetchResults()
})
</script>
