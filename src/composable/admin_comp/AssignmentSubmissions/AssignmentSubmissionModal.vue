<template>
  <div v-if="submission" class="fixed inset-0 z-50 overflow-y-auto" :class="{ hidden: !open }" @click.self="$emit('close')">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"></div>

      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
        <div class="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            <i :class="iconClass" class="mr-2"></i>
            {{ title }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="px-4 sm:px-6 py-4 max-h-[70vh] overflow-y-auto">
          <div :class="headerClass" class="rounded-xl p-4 sm:p-6 text-white mb-4">
            <h5 class="text-lg font-semibold">{{ submission.student_name }}</h5>
            <p class="text-sm opacity-90 mt-1">Email: {{ submission.student_email || 'N/A' }}</p>
            <p class="text-sm opacity-90">Student ID: {{ submission.student_id }}</p>
            <p class="text-sm opacity-90">Submitted: {{ formatDate(submission.submitted_at) }}</p>
            <p class="text-sm opacity-90" v-if="submission.graded_at">Graded: {{ formatDate(submission.graded_at) }}</p>
          </div>

          <div v-if="mode === 'edit'" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
            <div class="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
              <i class="fas fa-info-circle mt-0.5"></i>
              <span>Update each question score individually. Save to persist the updated marks and submission total.</span>
            </div>
          </div>

          <SubmissionQuestionTable
            :submission="submission"
            :questions="submission.questions"
            :updating="updating"
            :get-student-answer="getStudentAnswer"
            :get-correct-answer="getCorrectAnswer"
            @save-question="$emit('save-question', $event)"
            @score-change="$emit('score-change', $event)"
          />
        </div>

        <div class="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-2 justify-end">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Close
          </button>
          <button
            v-if="mode === 'edit'"
            @click="$emit('save-all')"
            :disabled="updating"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <i class="fas fa-save mr-2"></i>Save All Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SubmissionQuestionTable from './AssignmentSubmissionQuestionTable.vue'

defineProps({
  submission: {
    type: Object,
    default: null,
  },
  mode: {
    type: String,
    default: 'view',
  },
  open: {
    type: Boolean,
    default: false,
  },
  updating: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Submission Details',
  },
  iconClass: {
    type: String,
    default: 'fas fa-file-alt text-purple-600 dark:text-purple-400',
  },
  headerClass: {
    type: String,
    default: 'bg-linear-to-r from-purple-500 to-pink-600',
  },
  formatDate: {
    type: Function,
    required: true,
  },
  getStudentAnswer: {
    type: Function,
    required: true,
  },
  getCorrectAnswer: {
    type: Function,
    required: true,
  },
})

defineEmits(['close', 'save-all', 'save-question', 'score-change'])
</script>