<!-- views/admin/AssignmentQuestions.vue -->

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <button @click="goBack" class="mb-6 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Course
      </button>

      <!-- Assignment Header -->
      <div v-if="assignment" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ assignment.title }}</h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">{{ assignment.description }}</p>
            <div class="flex flex-wrap items-center gap-3 mt-2">
              <p class="text-sm text-gray-500">Total Points: {{ assignment.total_points }}</p>
              <p class="text-sm text-gray-500">Total Questions: {{ questions.length }}</p>
              <p class="text-sm text-gray-500">MCQ: {{ mcqCount }}</p>
              <p class="text-sm text-gray-500">Multiple Select: {{ multipleSelectCount }}</p>
              <p class="text-sm text-gray-500">Fill Blank: {{ fillBlankCount }}</p>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <button @click="openBulkAddModal" title="Add many questions at once"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Bulk Add
            </button>
            <button @click="openAddQuestionModal" title="Add a single question"
              class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Question
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">MCQ Questions</p>
              <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ mcqCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">Multiple Select</p>
              <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ multipleSelectCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">Fill in Blank</p>
              <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ fillBlankCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Marks</p>
              <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ totalMarks }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Questions List -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>

      <div v-else-if="questions.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <svg class="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No questions yet</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Add your first question to this assignment</p>
        <div class="flex justify-center space-x-3">
          <button @click="openAddQuestionModal" title="Add the first question" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add First Question
          </button>
          <button @click="openBulkAddModal" title="Add multiple questions at once" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Bulk Add Questions
          </button>
        </div>
      </div>

        <div v-else class="space-y-4">
        <!-- Reorder Controls -->
        <div class="flex justify-end mb-2">
          <button @click="toggleReorderMode" class="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            {{ reorderMode ? 'Done Reordering' : 'Reorder Questions' }}
          </button>
        </div>

        <draggable
          v-if="reorderMode"
          v-model="questions"
          @end="handleReorder"
          item-key="id"
          handle=".drag-handle"
          class="space-y-4"
        >
          <template #item="{ element: question, index }">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-move">
              <div class="flex items-start">
                <div class="drag-handle mr-3 mt-1 cursor-move">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                  </svg>
                </div>
                <!-- Rest of the question display (same as below) -->
                <div class="flex-1">
                  <!-- Question content same as non-reorder mode -->
                  <QuestionDisplay :question="question" :index="index" />
                </div>
              </div>
            </div>
          </template>
        </draggable>

        <div v-else v-for="(question, index) in questions" :key="question.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          
          <QuestionDisplay 
            :question="question" 
            :index="index" 
            @edit="editQuestion(question)"
            @delete="confirmDeleteQuestion(question)"
          />
        </div>
      </div>
    </div>

    <!-- Question Modal (Single) -->
    <QuestionModal
      v-if="showQuestionModal"
      :question="selectedQuestion"
      :assignment-id="assignmentId"
      :mode="questionModalMode"
      :show-save-another="true"
      @close="closeQuestionModal"
      @save="handleQuestionSave"
      @save-and-another="handleSaveAndAnother"
    />

    <!-- Bulk Add Modal -->
    <BulkQuestionModal
      v-if="showBulkModal"
      :assignment-id="assignmentId"
      @close="closeBulkModal"
      @save="handleBulkSave"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :item="questionToDelete"
      item-type="question"
      @close="closeDeleteModal"
      @confirm="deleteQuestion"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios.js'
import QuestionModal from '../../components/admin/QuestionModal.vue'
import BulkQuestionModal from '../../components/admin/BulkQuestionModal.vue'
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal.vue'
import QuestionDisplay from '../../components/admin/QuestionDisplay.vue'
import draggable from 'vuedraggable'

const route = useRoute()
const router = useRouter()
const assignmentId = route.params.id

const loading = ref(false)
const assignment = ref(null)
const questions = ref([])
const reorderMode = ref(false)

// Modal states
const showQuestionModal = ref(false)
const showBulkModal = ref(false)
const questionModalMode = ref('create')
const selectedQuestion = ref(null)

// Delete modal
const showDeleteModal = ref(false)
const questionToDelete = ref(null)

// Computed stats
const mcqCount = computed(() => 
  questions.value.filter(q => q.question_type === 'mcq').length
)

const multipleSelectCount = computed(() => 
  questions.value.filter(q => q.question_type === 'multiple_select').length
)

const fillBlankCount = computed(() => 
  questions.value.filter(q => q.question_type === 'fill_blank').length
)

const totalMarks = computed(() => 
  questions.value.reduce((sum, q) => sum + (q.marks || 0), 0)
)

const fetchAssignmentDetails = async () => {
  loading.value = true
  try {
    // Fetch assignment details
    const assignmentResponse = await api.get(`/api/admin/assignments/${assignmentId}`)
    assignment.value = assignmentResponse.data
    
    // Fetch questions
    const questionsResponse = await api.get(`/api/admin/assignments/${assignmentId}/questions`)
    questions.value = questionsResponse.data
  } catch (error) {
    console.error('Error fetching details:', error)
  } finally {
    loading.value = false
  }
}

const openAddQuestionModal = () => {
  questionModalMode.value = 'create'
  selectedQuestion.value = null
  showQuestionModal.value = true
}

const openBulkAddModal = () => {
  showQuestionModal.value = false
  showBulkModal.value = true
}

const closeBulkModal = () => {
  showBulkModal.value = false
}

const editQuestion = (question) => {
  questionModalMode.value = 'edit'
  selectedQuestion.value = { ...question }
  showBulkModal.value = false
  showQuestionModal.value = true
}

const closeQuestionModal = () => {
  showQuestionModal.value = false
  selectedQuestion.value = null
}

const handleQuestionSave = async (questionData) => {
  try {
    if (questionModalMode.value === 'create') {
      await api.post(`/api/admin/assignments/${assignmentId}/questions`, questionData)
    } else {
      await api.put(`/api/admin/questions/${selectedQuestion.value.id}`, questionData)
    }
    await fetchAssignmentDetails()
    closeQuestionModal()
  } catch (error) {
    console.error('Error saving question:', error)
  }
}

const handleSaveAndAnother = async (questionData) => {
  try {
    await api.post(`/api/admin/assignments/${assignmentId}/questions`, questionData)
    await fetchAssignmentDetails()
  } catch (error) {
    console.error('Error saving question:', error)
  }
}

const handleBulkSave = async (questionsData) => {
  try {
    // Use the dedicated bulk endpoint instead of individual saves
    await api.post(`/api/admin/assignments/${assignmentId}/bulk-questions`, {
      questions: questionsData
    })
    await fetchAssignmentDetails()
    closeBulkModal()
  } catch (error) {
    console.error('Error saving bulk questions:', error)
  }
}

const confirmDeleteQuestion = (question) => {
  questionToDelete.value = question
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  questionToDelete.value = null
}

const deleteQuestion = async () => {
  try {
    await api.delete(`/api/admin/questions/${questionToDelete.value.id}`)
    await fetchAssignmentDetails()
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting question:', error)
  }
}

const toggleReorderMode = () => {
  reorderMode.value = !reorderMode.value
}

const handleReorder = async () => {
  try {
    // Update order indices
    const orderData = questions.value.map((q, index) => ({
      id: q.id,
      order_index: index
    }))
    
    await api.post(`/api/admin/assignments/${assignmentId}/reorder-questions`, {
      question_order: orderData
    })
  } catch (error) {
    console.error('Error reordering questions:', error)
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchAssignmentDetails()
})
</script>