<!-- components/admin/QuestionDisplay.vue -->

<template>
  <div>
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-start space-x-3">
        <span class="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
          {{ index + 1 }}
        </span>
        <div>
          <div class="text-gray-900 dark:text-white font-medium question-rich-text" v-html="question.question_text"></div>
          <div class="flex items-center space-x-3 mt-2">
            <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              {{ getQuestionTypeLabel(question.question_type) }}
            </span>
            <span class="text-sm text-gray-500">{{ question.marks }} marks</span>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button @click="$emit('edit')" title="Edit this question" class="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button @click="$emit('delete')" title="Delete this question" class="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- MCQ Options -->
    <div v-if="question.question_type === 'mcq'" class="ml-9 mt-2 space-y-2">
      <div v-for="option in question.options" :key="option.id"
        class="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <span :class="option.is_correct ? 'text-green-600' : 'text-gray-600'"
          class="text-sm option-rich-text" v-html="option.option_text"></span>
        <span v-if="option.is_correct" class="ml-2 text-xs text-green-600 font-medium">(Correct)</span>
      </div>
    </div>

    <!-- Multiple Select Options -->
    <div v-else-if="question.question_type === 'multiple_select'" class="ml-9 mt-2 space-y-2">
      <div v-for="option in question.options" :key="option.id"
        class="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <span :class="option.is_correct ? 'text-green-600' : 'text-gray-600'"
          class="text-sm option-rich-text" v-html="option.option_text"></span>
        <span v-if="option.is_correct" class="ml-2 text-xs text-green-600 font-medium">(Correct)</span>
      </div>
    </div>

    <!-- Fill in Blank -->
    <div v-else-if="question.question_type === 'fill_blank'" class="ml-9 mt-2">
      <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <span class="text-sm text-gray-600 dark:text-gray-300">
          Correct answer: <span class="font-medium text-green-600">{{ question.correct_answer }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const getQuestionTypeLabel = (type) => {
  switch(type) {
    case 'mcq': return 'Multiple Choice'
    case 'fill_blank': return 'Fill in Blank'
    case 'multiple_select': return 'Multiple Select'
    default: return type
  }
}
</script>