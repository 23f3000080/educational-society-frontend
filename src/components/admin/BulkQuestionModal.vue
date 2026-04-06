<!-- components/admin/BulkQuestionModal.vue -->

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 z-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" @click="$emit('close')"></div>

      <div class="relative z-10 bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 bg-linear-to-r from-green-600 to-teal-600 sticky top-0 z-10">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-white">Bulk Add Questions</h3>
            <button @click="$emit('close')" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Instructions -->
          <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">How to add multiple questions:</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>Fill in the form below for each question</li>
              <li>Click "Add Another Question" to add more</li>
              <li>All questions will be saved at once when you click "Save All Questions"</li>
            </ul>
          </div>

          <!-- Questions List -->
          <div class="space-y-6">
            <div v-for="(question, index) in questions" :key="index"
              class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Question {{ index + 1 }}</h4>
                <button 
                  v-if="questions.length > 1"
                  @click="removeQuestion(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <!-- Question Type -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Type
                </label>
                <select
                  v-model="question.question_type"
                  @change="handleTypeChange(index)"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="fill_blank">Fill in Blank</option>
                  <option value="multiple_select">Multiple Select</option>
                </select>
              </div>

              <!-- Question Text -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Text
                </label>
                <textarea
                  v-model="question.question_text"
                  rows="2"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter question text"
                ></textarea>
              </div>

              <!-- Marks -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marks
                </label>
                <input
                  v-model.number="question.marks"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- MCQ/Multiple Select Options -->
              <div v-if="question.question_type === 'mcq' || question.question_type === 'multiple_select'">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options
                </label>
                <div class="space-y-2">
                  <div v-for="(option, optIndex) in question.options" :key="optIndex"
                    class="space-y-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <input
                      v-model="option.option_text"
                      type="text"
                      dir="ltr"
                      class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-gray-900 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      style="direction: ltr; unicode-bidi: plaintext;"
                      :placeholder="`Option ${optIndex + 1}`"
                    />
                    <div class="flex items-center justify-between gap-2">
                      <label class="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          v-model="option.is_correct"
                          class="w-4 h-4 text-indigo-600 rounded"
                        />
                        <span class="text-sm text-gray-600 dark:text-gray-400">Correct</span>
                      </label>
                      <button
                        v-if="question.options.length > 2"
                        @click="removeOption(index, optIndex)"
                        class="text-red-600 hover:text-red-800"
                        title="Remove this option"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  @click="addOption(index)"
                  class="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  + Add Option
                </button>
              </div>

              <!-- Fill in Blank -->
              <div v-else-if="question.question_type === 'fill_blank'">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correct Answer
                </label>
                <input
                  v-model="question.correct_answer"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter correct answer"
                />
              </div>
            </div>
          </div>

          <!-- Add Question Button -->
          <div class="mt-6">
            <button
              @click="addQuestion"
              class="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
            >
              <svg class="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Another Question
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="handleSave"
              :disabled="!isValid"
              class="px-6 py-2 bg-linear-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-50"
            >
              Save All Questions ({{ questions.length }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  assignmentId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close', 'save'])

const createEmptyQuestion = () => ({
  question_text: '',
  question_type: 'mcq',
  marks: 10,
  options: [
    { option_text: '', is_correct: true },
    { option_text: '', is_correct: false }
  ],
  correct_answer: ''
})

const questions = ref([createEmptyQuestion()])

const stripHtmlToText = (html) => {
  return (html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim()
}

const isValid = computed(() => {
  return questions.value.every(q => {
    if (!q.question_text || !q.marks) return false
    
    if (q.question_type === 'mcq' || q.question_type === 'multiple_select') {
      const allOptionsFilled = q.options.every(opt => stripHtmlToText(opt.option_text) !== '')
      const hasCorrect = q.options.some(opt => opt.is_correct)
      return allOptionsFilled && hasCorrect
    } else if (q.question_type === 'fill_blank') {
      return q.correct_answer && q.correct_answer.trim() !== ''
    }
    return false
  })
})

const addQuestion = () => {
  questions.value.push(createEmptyQuestion())
}

const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

const addOption = (questionIndex) => {
  questions.value[questionIndex].options.push({
    option_text: '',
    is_correct: false
  })
}

const removeOption = (questionIndex, optionIndex) => {
  if (questions.value[questionIndex].options.length > 2) {
    questions.value[questionIndex].options.splice(optionIndex, 1)
  }
}

const handleTypeChange = (index) => {
  const question = questions.value[index]
  if (question.question_type === 'mcq' || question.question_type === 'multiple_select') {
    question.options = [
      { option_text: '', is_correct: true },
      { option_text: '', is_correct: false }
    ]
    question.correct_answer = ''
  } else {
    question.options = []
    question.correct_answer = ''
  }
}

const handleSave = () => {
  if (isValid.value) {
    emit('save', questions.value)
  }
}
</script>