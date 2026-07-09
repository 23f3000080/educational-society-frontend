<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6 border-l-4"
    :class="{
      'border-green-500 dark:border-green-400': submission.percentage >= 60,
      'border-red-500 dark:border-red-400': submission.percentage < 60,
    }"
  >
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <div class="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm sm:text-base font-bold">
          {{ initials }}
        </div>
        <div class="min-w-0">
          <h5 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">{{ submission.student_name }}</h5>
          <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span><i class="fas fa-envelope mr-1"></i>{{ submission.student_email || 'N/A' }}</span>
            <span class="hidden sm:inline">|</span>
            <span><i class="fas fa-id-card mr-1"></i>ID: {{ submission.student_id }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium"
          :class="submission.percentage >= 60 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'"
        >
          {{ submission.percentage >= 60 ? '✅ Passed' : '❌ Failed' }}
        </span>
        <span class="inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full">
          {{ submission.obtained_marks }}/{{ submission.total_marks }} ({{ submission.percentage.toFixed(1) }}%)
        </span>
        <div class="flex gap-1">
          <button
            class="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
            @click="$emit('edit', submission)"
          >
            <i class="fas fa-edit mr-1"></i>
            <span class="hidden xs:inline">Edit</span>
          </button>
          <button
            class="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-200"
            @click="$emit('view', submission)"
          >
            <i class="fas fa-eye mr-1"></i>
            <span class="hidden xs:inline">View</span>
          </button>
        </div>
      </div>
    </div>

    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
      <div
        class="h-2 rounded-full transition-all duration-300"
        :class="submission.percentage >= 60 ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'"
        :style="{ width: submission.percentage + '%' }"
      ></div>
    </div>

    <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
      <div class="text-gray-600 dark:text-gray-400">
        <i class="fas fa-clock mr-1"></i>
        Submitted: {{ formatDate(submission.submitted_at) }}
      </div>
      <div class="text-gray-600 dark:text-gray-400">
        <i class="fas fa-check-circle text-green-500 dark:text-green-400 mr-1"></i>
        Correct: {{ correctCount }}/{{ submission.questions.length }}
      </div>
      <div class="text-gray-600 dark:text-gray-400">
        <i class="fas fa-percentage mr-1"></i>
        Score: {{ submission.percentage.toFixed(1) }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  submission: {
    type: Object,
    required: true,
  },
  formatDate: {
    type: Function,
    required: true,
  },
  getInitials: {
    type: Function,
    required: true,
  },
})

defineEmits(['edit', 'view'])

const initials = computed(() => props.getInitials(props.submission.student_name))
const correctCount = computed(() => (props.submission.questions || []).filter(question => question.is_correct).length)
</script>