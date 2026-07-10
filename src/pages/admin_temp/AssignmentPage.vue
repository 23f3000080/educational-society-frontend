<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-amber-950 dark:text-gray-100 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
      <!-- Header -->
      <section class="rounded-2xl sm:rounded-3xl border border-amber-100 bg-white p-4 sm:p-6 shadow-sm dark:border-amber-900 dark:bg-gray-900/80 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div class="min-w-0">
            <router-link to="/admin/assignments" 
              class="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 mb-2">
              <i class="fas fa-arrow-left mr-2"></i> Back to Assignments
            </router-link>
            <h1 class="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Assignment Details
            </h1>
            <p class="mt-1 sm:mt-2 text-sm leading-5 sm:leading-6 text-gray-600 dark:text-gray-300">
              Review assignment questions, correct answers, and student submissions
            </p>
          </div>

          <div class="flex flex-wrap gap-2 flex-shrink-0">
            <router-link 
              :to="{
                path: '/admin/assignments/submissions',
                query: { assignment_id: assignmentId }
              }"
              class="inline-flex items-center rounded-xl bg-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 whitespace-nowrap">
              <i class="fas fa-users mr-1.5 sm:mr-2"></i>
              View Submissions
              <span v-if="assignmentData?.students_submitted" class="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {{ assignmentData.students_submitted }}
              </span>
            </router-link>
            <button type="button" @click="fetchAssignmentData"
              class="rounded-xl bg-amber-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 whitespace-nowrap">
              <i class="fas fa-sync mr-1.5 sm:mr-2"></i>
              Refresh
            </button>
          </div>
        </div>

        <!-- Assignment Summary -->
        <div v-if="assignmentData" class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Course</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">{{ assignmentData.course?.title || 'N/A' }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Week</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">{{ assignmentData.week?.title || 'N/A' }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Due Date</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">{{ formatDate(assignmentData.due_date) }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Submissions</p>
            <p class="mt-1 font-semibold text-gray-900 dark:text-white">{{ assignmentData.students_submitted || 0 }}</p>
          </div>
        </div>
      </section>

      <!-- Questions Section -->
      <section class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 lg:p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">
            Questions ({{ assignmentData?.total_questions || 0 }})
          </h2>
          <span class="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Marks: {{ assignmentData?.total_marks || 0 }}
          </span>
        </div>

        <div v-if="loading" class="py-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent"></div>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Loading assignment details...</p>
        </div>

        <div v-else-if="errorMessage" class="py-8 text-center">
          <p class="text-rose-600 dark:text-rose-400">{{ errorMessage }}</p>
        </div>

        <div v-else-if="!assignmentData" class="py-8 text-center">
          <p class="text-gray-500 dark:text-gray-400">No assignment data available</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="(question, index) in assignmentData.questions" :key="question.question_id"
            class="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <!-- Question Header -->
            <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-950/50 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <div class="flex items-center gap-3">
                <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-sm font-bold">
                  {{ index + 1 }}
                </span>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ question.question_text }}</p>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {{ question.question_type?.toUpperCase() || 'Unknown' }}
                  </span>
                  <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">Marks: {{ question.marks }}</span>
                </div>
              </div>
            </div>

            <!-- Question Content -->
            <div class="p-4">
              <!-- MCQ -->
              <div v-if="question.question_type === 'mcq'" class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Options & Correct Answer</p>
                <div v-for="option in question.options" :key="option.option_id"
                  class="flex items-center gap-3 p-2 rounded-lg"
                  :class="{
                    'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800': isCorrectOption(option, question.correct_answers),
                    'bg-white dark:bg-gray-900/50': !isCorrectOption(option, question.correct_answers)
                  }">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ option.option_text }}</span>
                  <i v-if="isCorrectOption(option, question.correct_answers)" 
                     class="fas fa-check-circle text-emerald-500 ml-auto"></i>
                </div>
                <div class="mt-2 p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p class="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <i class="fas fa-check-circle mr-1"></i> Correct Answer: 
                    {{ question.correct_answers?.map(a => a.option_text).join(', ') || 'N/A' }}
                  </p>
                </div>
              </div>

              <!-- Multiple Select -->
              <div v-if="question.question_type === 'multiple_select'" class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Options & Correct Answers</p>
                <div v-for="option in question.options" :key="option.option_id"
                  class="flex items-center gap-3 p-2 rounded-lg"
                  :class="{
                    'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800': isCorrectOption(option, question.correct_answers),
                    'bg-white dark:bg-gray-900/50': !isCorrectOption(option, question.correct_answers)
                  }">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ option.option_text }}</span>
                  <i v-if="isCorrectOption(option, question.correct_answers)" 
                     class="fas fa-check-circle text-emerald-500 ml-auto"></i>
                </div>
                <div class="mt-2 p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p class="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <i class="fas fa-check-circle mr-1"></i> Correct Answers: 
                    {{ question.correct_answers?.map(a => a.option_text).join(', ') || 'N/A' }}
                  </p>
                </div>
              </div>

              <!-- Fill Blank -->
              <div v-if="question.question_type === 'fill_blank'" class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Correct Answer</p>
                <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p class="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    <i class="fas fa-check-circle mr-1"></i> {{ question.correct_answers?.join(', ') || 'N/A' }}
                  </p>
                </div>
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
import { useRouter, useRoute } from 'vue-router'
import api from '../../services/axios'

const route = useRoute()
const router = useRouter()

const assignmentId = computed(() => route.params.id || route.query.id)
const assignmentData = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const fetchAssignmentData = async () => {
  if (!assignmentId.value) {
    errorMessage.value = 'Assignment ID is required'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get(`/assignments/${assignmentId.value}`, {
      meta: { skipGlobalLoader: true }
    })

    if (response.data.success) {
      assignmentData.value = response.data.assignment
    } else {
      errorMessage.value = response.data.message || 'Failed to load assignment data'
    }
  } catch (error) {
    console.error('Error fetching assignment:', error)
    errorMessage.value = error.response?.data?.message || 'Could not load assignment details'
  } finally {
    loading.value = false
  }
}

const formatDate = (value) => {
  if (!value) return 'No due date'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

const isCorrectOption = (option, correctAnswers) => {
  if (!correctAnswers || !correctAnswers.length) return false
  return correctAnswers.some(ca => ca.option_id === option.option_id)
}

onMounted(() => {
  fetchAssignmentData()
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