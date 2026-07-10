<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-amber-950 dark:text-gray-100 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
      <!-- Header -->
      <section class="rounded-2xl sm:rounded-3xl border border-amber-100 bg-white p-4 sm:p-6 shadow-sm dark:border-amber-900 dark:bg-gray-900/80 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div class="min-w-0">
            <router-link 
              :to="{
                path: '/admin/assignments/' + assignmentId
              }"
              class="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 mb-2">
              <i class="fas fa-arrow-left mr-2"></i> Back to Assignment
            </router-link>
            <h1 class="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Student Submissions
            </h1>
            <p class="mt-1 sm:mt-2 text-sm leading-5 sm:leading-6 text-gray-600 dark:text-gray-300">
              {{ assignmentInfo?.title || 'Loading...' }} - {{ students.length }} submissions
            </p>
          </div>

          <div class="flex flex-wrap gap-2 flex-shrink-0">
            <button type="button" @click="fetchSubmissions"
              class="rounded-xl bg-amber-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 whitespace-nowrap">
              <i class="fas fa-sync mr-1.5 sm:mr-2"></i>
              Refresh
            </button>
          </div>
        </div>

        <!-- Assignment Summary -->
        <div v-if="assignmentInfo" class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total Questions</p>
            <p class="mt-1 font-bold text-gray-900 dark:text-white">{{ assignmentInfo.total_questions || 0 }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total Marks</p>
            <p class="mt-1 font-bold text-gray-900 dark:text-white">{{ assignmentInfo.total_marks || 0 }}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Submissions</p>
            <p class="mt-1 font-bold text-gray-900 dark:text-white">{{ assignmentInfo.total_submissions || 0 }}</p>
          </div>
        </div>
      </section>

      <!-- Submissions Table -->
      <section class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 lg:p-6">
        <div v-if="loading" class="py-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent"></div>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Loading submissions...</p>
        </div>

        <div v-else-if="errorMessage" class="py-8 text-center">
          <p class="text-rose-600 dark:text-rose-400">{{ errorMessage }}</p>
        </div>

        <div v-else-if="students.length === 0" class="py-8 text-center">
          <i class="fas fa-inbox text-2xl block mb-2 text-gray-300 dark:text-gray-600"></i>
          <p class="text-gray-500 dark:text-gray-400">No submissions for this assignment yet</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-950/50">
              <tr>
                <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Student
                </th>
                <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden md:table-cell">
                  Email
                </th>
                <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Marks
                </th>
                <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                  Questions Answered
                </th>
                <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                  Submitted
                </th>
                <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
              <tr v-for="student in students" :key="student.submission_id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-300 font-semibold text-sm">
                      {{ student.student?.first_name?.[0] || 'S' }}
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">{{ student.student?.full_name || student.student?.first_name || 'Unknown' }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 block md:hidden">{{ student.student?.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hidden md:table-cell">
                  {{ student.student?.email }}
                </td>
                <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                  <div class="flex flex-col">
                    <span class="font-semibold text-gray-900 dark:text-white">
                      {{ student.obtained_marks || 0 }} / {{ student.total_marks || 0 }}
                    </span>
                    <span class="text-xs" :class="getPercentageColor(student.percentage)">
                      {{ student.percentage || 0 }}%
                    </span>
                  </div>
                </td>
                <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hidden lg:table-cell">
                  {{ student.answered_questions || 0 }} / {{ student.total_questions || 0 }}
                </td>
                <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hidden sm:table-cell">
                  {{ formatDate(student.submitted_at) }}
                </td>
                <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                  <router-link 
                    :to="{
                      path: '/admin/assignments/student-submission',
                      query: { 
                        assignment_id: assignmentId, 
                        student_id: student.student?.id 
                      }
                    }" 
                    class="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-medium rounded-xl transition-colors duration-200">
                    <i class="fas fa-eye text-xs sm:text-sm"></i>
                    <span class="ml-1 hidden xs:inline">View Details</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
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
const students = ref([])
const assignmentInfo = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const fetchSubmissions = async () => {
  if (!assignmentId.value) {
    errorMessage.value = 'Assignment ID is required'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get(`/assignments/${assignmentId.value}/submissions`, {
      meta: { skipGlobalLoader: true }
    })

    if (response.data.success) {
      students.value = response.data.students || []
      assignmentInfo.value = response.data.assignment
    } else {
      errorMessage.value = response.data.message || 'Failed to load submissions'
    }
  } catch (error) {
    console.error('Error fetching submissions:', error)
    errorMessage.value = error.response?.data?.message || 'Could not load submissions'
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
  fetchSubmissions()
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