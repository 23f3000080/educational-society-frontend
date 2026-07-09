<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-tasks text-blue-600 dark:text-blue-400"></i>
            Assignment Submissions
          </h2>
          <nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
            <router-link to="/admin/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</router-link>
            <span>/</span>
            <router-link to="/admin/assignments" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Assignments</router-link>
            <span>/</span>
            <span class="text-gray-900 dark:text-white font-medium truncate">{{ assignmentTitle || 'Loading...' }}</span>
          </nav>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            @click="exportSubmissions"
            :disabled="submissions.length === 0 || loading"
            class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-file-export mr-2"></i>
            <span class="hidden sm:inline">Export CSV</span>
            <span class="sm:hidden">Export</span>
          </button>
          <button
            @click="refreshData"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
          >
            <i class="fas fa-sync mr-2" :class="{ 'animate-spin': loading }"></i>
            <span class="hidden sm:inline">Refresh</span>
            <span class="sm:hidden"><i class="fas fa-sync"></i></span>
          </button>
          <button
            @click="goBack"
            class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            <span class="hidden sm:inline">Back</span>
            <span class="sm:hidden"><i class="fas fa-arrow-left"></i></span>
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
        <div class="flex items-start gap-3">
          <i class="fas fa-exclamation-circle text-red-500 dark:text-red-400 mt-0.5"></i>
          <div class="flex-1">
            <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error Loading Submissions</p>
            <p class="text-sm text-red-700 dark:text-red-400 mt-1">{{ errorMessage }}</p>
            <button @click="refreshData" class="mt-2 inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
              <i class="fas fa-sync mr-2"></i> Retry
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="!hasAssignmentId && !loading" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
        <div class="flex items-start gap-3">
          <i class="fas fa-exclamation-triangle text-yellow-500 dark:text-yellow-400 mt-0.5"></i>
          <div class="flex-1">
            <p class="text-sm font-semibold text-yellow-800 dark:text-yellow-300">Assignment ID Required</p>
            <p class="text-sm text-yellow-700 dark:text-yellow-400 mt-1">Please go back and select a valid assignment to view submissions.</p>
            <button @click="goBack" class="mt-2 inline-flex items-center px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
              <i class="fas fa-arrow-left mr-2"></i> Back to Assignments
            </button>
          </div>
        </div>
      </div>

      <AssignmentSubmissionStats
        v-if="submissions.length > 0 && !errorMessage && hasAssignmentId"
        :total="statistics.total"
        :passed="statistics.passed"
        :failed="statistics.failed"
        :average-score="statistics.averageScore"
      />

      <AssignmentSubmissionFilters
        v-if="submissions.length > 0 && !errorMessage && hasAssignmentId"
        :search-query="searchQuery"
        :filter-status="filterStatus"
        :sort-by="sortBy"
        :count="filteredSubmissions.length"
        @search="handleSearch"
        @status-change="handleStatusChange"
        @sort-change="handleSortChange"
      />

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading submissions...</p>
      </div>

      <div v-else-if="!errorMessage && hasAssignmentId && submissions.length === 0" class="text-center py-12">
        <i class="fas fa-inbox text-5xl text-gray-300 dark:text-gray-600 mb-4"></i>
        <p class="text-gray-600 dark:text-gray-400">No submissions found for this assignment.</p>
        <button @click="goBack" class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
          <i class="fas fa-arrow-left mr-2"></i> Back to Assignments
        </button>
      </div>

      <div v-else-if="!errorMessage && hasAssignmentId" class="space-y-4">
        <AssignmentSubmissionCard
          v-for="submission in filteredSubmissions"
          :key="submission.submission_id"
          :submission="submission"
          :format-date="formatDate"
          :get-initials="getInitials"
          @edit="openEditModal"
          @view="viewSubmissionDetails"
        />
      </div>

      <AssignmentSubmissionModal
        :submission="selectedSubmission"
        :mode="activeModalMode"
        :open="showModal"
        :updating="updating"
        :title="activeModalMode === 'edit' ? 'Edit Student Answers' : 'Submission Details'"
        :icon-class="activeModalMode === 'edit' ? 'fas fa-edit text-blue-600 dark:text-blue-400' : 'fas fa-file-alt text-purple-600 dark:text-purple-400'"
        :header-class="activeModalMode === 'edit' ? 'bg-linear-to-r from-blue-500 to-purple-600' : 'bg-linear-to-r from-purple-500 to-pink-600'"
        :format-date="formatDate"
        :get-student-answer="getStudentAnswer"
        :get-correct-answer="getCorrectAnswer"
        @close="closeModal"
        @save-question="updateScore"
        @save-all="saveAllChanges"
        @score-change="handleScoreChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../../services/axios.js'
import AssignmentSubmissionStats from './AssignmentSubmissionStats.vue'
import AssignmentSubmissionFilters from './AssignmentSubmissionFilters.vue'
import AssignmentSubmissionCard from './AssignmentSubmissionCard.vue'
import AssignmentSubmissionModal from './AssignmentSubmissionModal.vue'

const route = useRoute()
const router = useRouter()

const assignmentId = ref(null)
const hasAssignmentId = ref(false)
const assignmentTitle = ref('')
const submissions = ref([])
const filteredSubmissions = ref([])
const loading = ref(false)
const updating = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')
const filterStatus = ref('all')
const sortBy = ref('name')
const selectedSubmission = ref(null)
const showModal = ref(false)
const activeModalMode = ref('view')
const pendingScoreChanges = ref({})

const statistics = computed(() => {
  const total = submissions.value.length
  if (total === 0) {
    return { total: 0, passed: 0, failed: 0, averageScore: 0 }
  }

  const passed = submissions.value.filter(submission => submission.percentage >= 60).length
  const failed = total - passed
  const averageScore = Math.round((submissions.value.reduce((sum, submission) => sum + submission.percentage, 0) / total) * 10) / 10

  return { total, passed, failed, averageScore }
})

const loadSubmissions = async () => {
  const id = route.query.assignment_id || route.params.id

  if (!id) {
    hasAssignmentId.value = false
    errorMessage.value = ''
    submissions.value = []
    filteredSubmissions.value = []
    return
  }

  hasAssignmentId.value = true
  assignmentId.value = id
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await api.get(`/api/admin/assignments/${assignmentId.value}/submissions`)
    if (response.data && response.data.success) {
      submissions.value = response.data.submissions || []
      assignmentTitle.value = response.data.assignment_title || 'Assignment'
      filterSubmissions()
    } else {
      errorMessage.value = response.data?.error || 'Failed to load submissions. Please try again.'
      submissions.value = []
    }
  } catch (error) {
    if (error.response?.status === 404) {
      errorMessage.value = 'Assignment not found. It may have been deleted.'
    } else if (error.response?.status === 403) {
      errorMessage.value = 'You do not have permission to view these submissions.'
    } else if (error.request) {
      errorMessage.value = 'Cannot connect to the server. Please check your internet connection.'
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.'
    }
    submissions.value = []
  } finally {
    loading.value = false
  }
}

const filterSubmissions = () => {
  let filtered = [...submissions.value]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(submission =>
      submission.student_name?.toLowerCase().includes(query) ||
      submission.student_email?.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value === 'passed') {
    filtered = filtered.filter(submission => submission.percentage >= 60)
  } else if (filterStatus.value === 'failed') {
    filtered = filtered.filter(submission => submission.percentage < 60)
  }

  filteredSubmissions.value = filtered
  sortSubmissions()
}

const sortSubmissions = () => {
  const sorted = [...filteredSubmissions.value]

  switch (sortBy.value) {
    case 'name':
      sorted.sort((a, b) => (a.student_name || '').localeCompare(b.student_name || ''))
      break
    case 'score_high':
      sorted.sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
      break
    case 'score_low':
      sorted.sort((a, b) => (a.percentage || 0) - (b.percentage || 0))
      break
    case 'date_new':
      sorted.sort((a, b) => new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0))
      break
    case 'date_old':
      sorted.sort((a, b) => new Date(a.submitted_at || 0) - new Date(b.submitted_at || 0))
      break
  }

  filteredSubmissions.value = sorted
}

const handleSearch = value => {
  searchQuery.value = value
  filterSubmissions()
}

const handleStatusChange = value => {
  filterStatus.value = value
  filterSubmissions()
}

const handleSortChange = value => {
  sortBy.value = value
  sortSubmissions()
}

const refreshData = () => loadSubmissions()
const goBack = () => router.push('/admin/assignments')

const exportSubmissions = async () => {
  if (submissions.value.length === 0) return

  try {
    const response = await api.get(`/api/admin/assignments/${assignmentId.value}/submissions/export`)
    if (response.data.success) {
      const blob = new Blob([response.data.csv_data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = response.data.filename || `assignment_${assignmentId.value}_submissions.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
  } catch (error) {
    console.error('Error exporting:', error)
    alert('Failed to export submissions. Please try again.')
  }
}

const openEditModal = submission => {
  selectedSubmission.value = submission
  activeModalMode.value = 'edit'
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const viewSubmissionDetails = submission => {
  selectedSubmission.value = submission
  activeModalMode.value = 'view'
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  selectedSubmission.value = null
  activeModalMode.value = 'view'
  document.body.style.overflow = ''
}

const handleScoreChange = ({ questionId, marksObtained }) => {
  pendingScoreChanges.value = {
    ...pendingScoreChanges.value,
    [questionId]: marksObtained,
  }
}

const updateScore = async payload => {
  if (!selectedSubmission.value) return

  const questionId = payload?.questionId ?? payload
  const marks = payload?.marksObtained ?? pendingScoreChanges.value[questionId] ?? selectedSubmission.value.questions.find(question => question.question_id === questionId)?.marks_obtained
  const question = selectedSubmission.value.questions.find(item => item.question_id === questionId)

  if (!question) return
  if (marks === undefined || marks === null || Number.isNaN(Number(marks))) {
    alert('Please enter a valid score')
    return
  }
  if (marks > question.marks) {
    alert(`Score cannot exceed ${question.marks} marks`)
    return
  }
  if (marks < 0) {
    alert('Score cannot be negative')
    return
  }

  updating.value = true
  try {
    const response = await api.put(`/api/admin/assignments/${assignmentId.value}/submissions/${selectedSubmission.value.submission_id}/question/${questionId}`, {
      marks_obtained: marks,
      is_correct: Number(marks) === Number(question.marks),
    })

    if (response.data.success) {
      const submission = submissions.value.find(item => item.submission_id === selectedSubmission.value.submission_id)
      if (submission) {
        const targetQuestion = submission.questions.find(item => item.question_id === questionId)
        if (targetQuestion) {
          targetQuestion.marks_obtained = Number(marks)
          targetQuestion.is_correct = Number(marks) === Number(targetQuestion.marks)
        }
        submission.obtained_marks = response.data.submission_score ?? submission.obtained_marks
        submission.total_marks = response.data.total_marks ?? submission.total_marks
        submission.percentage = response.data.percentage ?? submission.percentage
        submission.is_graded = response.data.is_graded ?? submission.is_graded
        submission.graded_at = response.data.graded_at ?? submission.graded_at
        selectedSubmission.value = submission
      }

      filterSubmissions()
      delete pendingScoreChanges.value[questionId]
    } else {
      alert(`Failed to update score: ${response.data.error || 'Unknown error'}`)
    }
  } catch (error) {
    console.error('Error updating score:', error)
    alert('Failed to update score. Please try again.')
  } finally {
    updating.value = false
  }
}

const saveAllChanges = async () => {
  if (!selectedSubmission.value) return

  updating.value = true
  try {
    const response = await api.put(`/api/admin/assignments/${assignmentId.value}/submissions/bulk-update`, {
      submission_id: selectedSubmission.value.submission_id,
      question_scores: selectedSubmission.value.questions.map(question => ({
        question_id: question.question_id,
        marks_obtained: pendingScoreChanges.value[question.question_id] ?? question.marks_obtained,
      })),
    })

    if (response.data.success) {
      await loadSubmissions()
      closeModal()
      pendingScoreChanges.value = {}
    } else {
      alert(`Failed to save changes: ${response.data.error || 'Unknown error'}`)
    }
  } catch (error) {
    console.error('Error saving changes:', error)
    alert('Failed to save changes. Please try again.')
  } finally {
    updating.value = false
  }
}

const getInitials = name => {
  if (!name) return '?'
  return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)
}

const getStudentAnswer = question => {
  if (!question || !question.student_answer) return null
  return question.student_answer.join(', ')
}

const getCorrectAnswer = question => {
  if (!question || !question.correct_answer) return null
  return question.correct_answer.join(', ')
}

const formatDate = dateString => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return 'Invalid Date'
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return 'Invalid Date'
  }
}

watch(
  () => route.query.assignment_id,
  newVal => {
    if (newVal) {
      loadSubmissions()
    } else {
      hasAssignmentId.value = false
      submissions.value = []
      filteredSubmissions.value = []
    }
  }
)

onMounted(() => {
  loadSubmissions()
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

:deep(.dark) ::-webkit-scrollbar-thumb {
  background: #475569;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

:deep(.dark) ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>