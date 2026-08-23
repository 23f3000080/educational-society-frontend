<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-amber-950 dark:text-gray-100 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
      <!-- Header -->
      <section class="rounded-2xl sm:rounded-3xl border border-amber-100 bg-white p-4 sm:p-6 shadow-sm dark:border-amber-900 dark:bg-gray-900/80 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div class="min-w-0">
            <router-link 
              :to="{
                path: '/admin/assignments/submissions',
                query: { assignment_id: assignmentId }
              }"
              class="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 mb-2">
              <i class="fas fa-arrow-left mr-2"></i> Back to Submissions
            </router-link>
            <h1 class="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Student Submission Review
            </h1>
            <p class="mt-1 sm:mt-2 text-sm leading-5 sm:leading-6 text-gray-600 dark:text-gray-300">
              Review individual student answers with correct/incorrect marking
            </p>
          </div>

          <div class="flex flex-wrap gap-2 flex-shrink-0">
            <button type="button" @click="fetchSubmissionData"
              class="rounded-xl bg-amber-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 whitespace-nowrap">
              <i class="fas fa-sync mr-1.5 sm:mr-2"></i>
              Refresh
            </button>
          </div>
        </div>

        <!-- Student & Assignment Summary -->
        <div v-if="submissionData" class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Student</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">{{ submissionData.student?.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ submissionData.student?.email }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">ID: {{ submissionData.student?.user_id }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Assignment</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">{{ submissionData.assignment?.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Submitted: {{ formatDate(submissionData.assignment?.submitted_at) }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Marks</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">
              {{ submissionData.summary?.obtained_marks || 0 }} / {{ submissionData.summary?.total_marks || 0 }}
            </p>
            <p class="text-xs" :class="getPercentageColor(submissionData.summary?.percentage)">
              Percentage: {{ submissionData.summary?.percentage || 0 }}%
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Questions</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">{{ submissionData.questions?.length || 0 }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Total Questions</p>
          </div>
        </div>
      </section>

      <!-- Questions & Answers Section -->
      <section class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 lg:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Student Answers Review</h2>
          <div class="flex items-center gap-2 text-sm">
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
              <span class="text-gray-600 dark:text-gray-300">Correct</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-3 h-3 rounded-full bg-rose-500"></span>
              <span class="text-gray-600 dark:text-gray-300">Incorrect</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-3 h-3 rounded-full bg-gray-400"></span>
              <span class="text-gray-600 dark:text-gray-300">Not Answered</span>
            </span>
          </div>
        </div>

        <div v-if="loading" class="py-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent"></div>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Loading submission details...</p>
        </div>

        <div v-else-if="errorMessage" class="py-8 text-center">
          <p class="text-rose-600 dark:text-rose-400">{{ errorMessage }}</p>
        </div>

        <div v-else-if="!submissionData" class="py-8 text-center">
          <p class="text-gray-500 dark:text-gray-400">No submission data available</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="(question, index) in submissionData.questions" :key="question.question_id"
            class="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <!-- Question Header -->
            <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-950/50 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <div class="flex items-center gap-3">
                <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-sm font-bold">
                  {{ index + 1 }}
                </span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ question.question_text }}</p>
                  <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span class="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800">
                      {{ question.question_type?.toUpperCase() || 'Unknown' }}
                    </span>
                    <span>Marks: {{ question.marks }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold">
                  {{ question.marks_obtained || 0 }} / {{ question.marks }}
                </span>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  question.is_correct ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                  question.student_answer && !question.is_correct ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' :
                  'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                ]">
                  <i :class="[
                    'fas mr-1',
                    question.is_correct ? 'fa-check-circle' :
                    question.student_answer && !question.is_correct ? 'fa-times-circle' :
                    'fa-minus-circle'
                  ]"></i>
                  {{ question.is_correct ? 'Correct' : 
                     question.student_answer && !question.is_correct ? 'Incorrect' : 
                     'Not Answered' }}
                </span>
              </div>
            </div>

            <!-- Question Content -->
            <div class="p-4 space-y-3">
              <!-- MCQ -->
              <div v-if="question.question_type === 'mcq'" class="space-y-2">
                <div v-for="option in question.options" :key="option.option_id"
                  class="flex items-start gap-3 p-2 rounded-lg transition-colors"
                  :class="{
                    'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800': option.is_correct && option.selected,
                    'bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800': option.selected && !option.is_correct,
                    'bg-gray-50 dark:bg-gray-800/50': option.is_correct && !option.selected,
                    'bg-white dark:bg-gray-900/50': !option.is_correct && !option.selected
                  }">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ option.option_text }}
                      </span>
                      <i v-if="option.is_correct" class="fas fa-check-circle text-emerald-500 text-sm"></i>
                      <i v-if="option.selected && !option.is_correct" class="fas fa-times-circle text-rose-500 text-sm"></i>
                    </div>
                    <div class="flex items-center gap-3 mt-1 text-xs">
                      <span v-if="option.selected" class="text-blue-600 dark:text-blue-400">
                        <i class="fas fa-user mr-1"></i> Student Selected
                      </span>
                      <span v-if="option.is_correct" class="text-emerald-600 dark:text-emerald-400">
                        <i class="fas fa-check mr-1"></i> Correct Answer
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="option.selected" class="text-xs font-medium" :class="option.is_correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                      {{ option.is_correct ? '+' : '-' }}{{ question.marks }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Multiple Select -->
              <div v-if="question.question_type === 'multiple_select'" class="space-y-2">
                <div v-for="option in question.options" :key="option.option_id"
                  class="flex items-start gap-3 p-2 rounded-lg transition-colors"
                  :class="{
                    'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800': option.is_correct && option.selected,
                    'bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800': option.selected && !option.is_correct,
                    'bg-gray-50 dark:bg-gray-800/50': option.is_correct && !option.selected,
                    'bg-white dark:bg-gray-900/50': !option.is_correct && !option.selected
                  }">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ option.option_text }}
                      </span>
                      <i v-if="option.is_correct" class="fas fa-check-circle text-emerald-500 text-sm"></i>
                      <i v-if="option.selected && !option.is_correct" class="fas fa-times-circle text-rose-500 text-sm"></i>
                    </div>
                    <div class="flex items-center gap-3 mt-1 text-xs">
                      <span v-if="option.selected" class="text-blue-600 dark:text-blue-400">
                        <i class="fas fa-user mr-1"></i> Student Selected
                      </span>
                      <span v-if="option.is_correct" class="text-emerald-600 dark:text-emerald-400">
                        <i class="fas fa-check mr-1"></i> Correct Answer
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="question.correct_answer?.length" class="mt-2 p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p class="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <i class="fas fa-check-circle mr-1"></i> Correct Answers: {{ question.correct_answer.join(', ') }}
                  </p>
                </div>
                <div v-if="question.student_answer?.length" class="mt-1 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p class="text-xs font-semibold text-blue-700 dark:text-blue-300">
                    <i class="fas fa-user mr-1"></i> Student Selected: {{ question.student_answer.join(', ') }}
                  </p>
                </div>
              </div>

              <!-- Fill Blank -->
              <div v-if="question.question_type === 'fill_blank'" class="space-y-2">
                <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Student Answer:</p>
                  <div class="mt-1 flex items-center gap-3">
                    <span class="text-sm font-semibold" :class="question.is_correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                      {{ question.student_answer || 'Not answered' }}
                    </span>
                    <span v-if="question.is_correct" class="text-emerald-500">✓</span>
                    <span v-else-if="question.student_answer && !question.is_correct" class="text-rose-500">✗</span>
                  </div>
                </div>
                <div v-if="question.correct_answer?.length" class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p class="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <i class="fas fa-check-circle mr-1"></i> Correct Answer: {{ question.correct_answer.join(', ') }}
                  </p>
                </div>
              </div>

              <!-- Marks Summary -->
              <div class="flex justify-end items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                <span class="text-sm text-gray-500 dark:text-gray-400">Marks Obtained:</span>
                <span class="text-sm font-bold" :class="question.is_correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ question.marks_obtained || 0 }} / {{ question.marks }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../services/axios'

const route = useRoute()

const assignmentId = computed(() => route.query.assignment_id)
const studentId = computed(() => route.query.student_id)
const submissionData = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const fetchSubmissionData = async () => {
  if (!assignmentId.value || !studentId.value) {
    errorMessage.value = 'Missing assignment or student ID'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get(
      `assignments/${assignmentId.value}/students/${studentId.value}`,
      {
        meta: { skipGlobalLoader: true }
      }
    )

    if (response.data.success) {
      submissionData.value = response.data
    } else {
      errorMessage.value = response.data.message || 'Failed to load submission data'
    }
  } catch (error) {
    console.error('Error fetching submission:', error)
    errorMessage.value = error.response?.data?.message || 'Could not load submission details'
  } finally {
    loading.value = false
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

const getPercentageColor = (percentage) => {
  if (percentage >= 80) return 'text-emerald-600 dark:text-emerald-400 font-semibold'
  if (percentage >= 60) return 'text-blue-600 dark:text-blue-400 font-semibold'
  if (percentage >= 40) return 'text-amber-600 dark:text-amber-400 font-semibold'
  return 'text-rose-600 dark:text-rose-400 font-semibold'
}

onMounted(() => {
  fetchSubmissionData()
})
</script>

<style scoped>
@media (max-width: 480px) {
  .xs\:inline {
    display: inline !important;
  }
  .xs\:hidden {
    display: none !important;
  }
}

* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>