<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-gray-900/80 sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Admin Test Results</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{{ testInfo.title || 'Test Results' }}</h1>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
              Review each student's attempt, answers, and question-wise correctness.
            </p>
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {{ testInfo.course_title || 'N/A' }}
              <span v-if="testInfo.test_scope === 'full_length'"> · Full Length</span>
              <span v-else-if="testInfo.week_title"> · Week {{ testInfo.week_number }} - {{ testInfo.week_title }}</span>
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

        <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Submissions</p>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ summary.total_submissions }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Average %</p>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ summary.average_percentage }}%</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Duration</p>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ testInfo.duration_minutes || 0 }} min</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Max Attempts</p>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ testInfo.max_attempts || 1 }}</p>
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
        <p v-if="errorMessage" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          {{ errorMessage }}
        </p>

        <div class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead class="bg-gray-50 dark:bg-gray-950/50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Student</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Attempt</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Score</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Submitted</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                  <tr v-for="result in results" :key="result.submission_id">
                    <td class="px-4 py-3 text-sm">
                      <p class="font-semibold text-gray-900 dark:text-white">{{ result.student_name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ result.student_email || '-' }}</p>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">#{{ result.attempt_no }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                      {{ result.score }}/{{ result.max_score }}
                      <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">({{ result.percentage }}%)</span>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{{ formatDate(result.submitted_at) }}</td>
                    <td class="px-4 py-3 text-sm">
                      <button
                        type="button"
                        @click="selectSubmission(result)"
                        class="rounded-xl bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr v-if="!loading && results.length === 0">
                    <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      No submissions found for this test.
                    </td>
                  </tr>
                  <tr v-if="loading">
                    <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">Loading results...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-950/40">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Submission Detail</h2>
            <p v-if="!activeSubmission" class="mt-3 text-sm text-gray-600 dark:text-gray-300">Select a submission to view question-wise results.</p>

            <div v-else class="mt-3 space-y-3">
              <div class="rounded-xl border border-gray-200 bg-white p-3 text-sm dark:border-gray-800 dark:bg-gray-900">
                <p class="font-semibold text-gray-900 dark:text-white">{{ activeSubmission.student_name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ activeSubmission.student_email || '-' }}</p>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Attempt #{{ activeSubmission.attempt_no }} · {{ activeSubmission.score }}/{{ activeSubmission.max_score }} ({{ activeSubmission.percentage }}%)</p>
              </div>

              <div v-if="detailLoading" class="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                Loading question details...
              </div>

              <div v-for="question in questionDetails" :key="question.question_id" class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <div class="flex items-start justify-between gap-3">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Q{{ question.question_no }}. {{ question.question_text }}</p>
                  <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="question.is_correct ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'">
                    {{ question.is_correct ? 'Correct' : 'Incorrect' }}
                  </span>
                </div>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Marks: {{ question.earned_marks }}/{{ question.marks }}</p>
                <p class="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Student Answer</p>
                <p class="text-sm text-gray-700 dark:text-gray-200">{{ formatAnswer(question.selected_answer) }}</p>
                <p class="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Correct Answer</p>
                <p class="text-sm text-gray-700 dark:text-gray-200">{{ formatAnswer(question.correct_answer) }}</p>
              </div>

              <p v-if="!detailLoading && questionDetails.length === 0" class="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                No question details available for this submission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
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
  test_scope: '',
  week_number: null,
  week_title: '',
  duration_minutes: 0,
  max_attempts: 1
})

const summary = reactive({
  total_submissions: 0,
  average_percentage: 0
})

const results = ref([])
const activeSubmission = ref(null)
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

const formatAnswer = (answer) => {
  if (answer === null || answer === undefined) return 'Not answered'
  if (Array.isArray(answer)) {
    if (answer.length === 0) return 'Not answered'
    return answer.join(', ')
  }
  if (String(answer).trim() === '') return 'Not answered'
  return String(answer)
}

const fetchResults = async () => {
  if (!testId) {
    errorMessage.value = 'Invalid test id.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const { data } = await api.get(`/api/admin/tests/${testId}/results`)
    Object.assign(testInfo, data?.test || {})
    Object.assign(summary, data?.summary || {})
    results.value = data?.results || []

    if (results.value.length > 0) {
      await selectSubmission(results.value[0])
    } else {
      activeSubmission.value = null
      questionDetails.value = []
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Could not load test results.'
    results.value = []
    activeSubmission.value = null
    questionDetails.value = []
  } finally {
    loading.value = false
  }
}

const selectSubmission = async (submission) => {
  activeSubmission.value = submission
  detailLoading.value = true

  try {
    const { data } = await api.get(`/api/admin/tests/${testId}/results/${submission.submission_id}`)
    questionDetails.value = data?.questions || []
  } catch (error) {
    questionDetails.value = []
    errorMessage.value = error.response?.data?.error || 'Could not load submission details.'
  } finally {
    detailLoading.value = false
  }
}

const goBack = () => {
  router.push('/admin/tests')
}

onMounted(() => {
  fetchResults()
})
</script>
