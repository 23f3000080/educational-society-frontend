<!-- components/admin/BulkQuestionModal.vue -->

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 py-8">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>

      <!-- Modal Container - Wider -->
      <div class="relative z-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        
        <!-- Sticky Header -->
        <div class="sticky top-0 z-20 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
          <div class="px-8 py-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-white/20 rounded-xl">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">Bulk Add Questions</h3>
                <p class="text-xs text-indigo-100">{{ questions.length }} question{{ questions.length > 1 ? 's' : '' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <!-- Quick Stats -->
              <div class="hidden sm:flex items-center gap-4 text-white/90 text-sm">
                <span class="flex items-center gap-1" title="Valid Added Questions">
                  <span class="w-2 h-2 rounded-full bg-green-400"></span>
                  {{ validCount }}/{{ questions.length }}
                </span>
                <span class="flex items-center gap-1" title="Total Marks">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 7v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {{ totalMarks }}
                </span>
              </div>
              <button 
                @click="handleClose" 
                class="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
               title="Close">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Question Navigation Tabs with Pagination -->
          <div class="px-8 pb-2 flex items-center gap-2">
            <!-- Left Arrow -->
            <button
              v-if="currentPage > 0"
              @click="currentPage--"
              class="shrink-0 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
              title="Previous"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Tabs Container -->
            <div class="flex-1 overflow-hidden">
              <div class="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                <button
                  v-for="(q, idx) in paginatedQuestions"
                  :key="idx"
                  @click="currentQuestionIndex = getActualIndex(idx)"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 whitespace-nowrap"
                  :class="[
                    currentQuestionIndex === getActualIndex(idx) 
                      ? 'bg-white text-indigo-700 shadow-lg' 
                      : 'text-white/80 hover:text-white hover:bg-white/10',
                    !isQuestionValid(getActualIndex(idx)) && currentQuestionIndex !== getActualIndex(idx) 
                      ? 'border-l-2 border-yellow-400' 
                      : ''
                  ]"
                >
                  <span class="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold" :class="[
                    currentQuestionIndex === getActualIndex(idx) ? 'bg-indigo-100 text-indigo-700' : 'bg-white/20 text-white'
                  ]">
                    {{ getActualIndex(idx) + 1 }}
                  </span>
                  <!-- <span class="hidden md:inline">Q{{ getActualIndex(idx) + 1 }}</span> -->
                  <span v-if="!isQuestionValid(getActualIndex(idx))" class="text-yellow-400 text-[10px]">⚠️</span>
                  <span v-else class="text-green-400 text-[10px]">✓</span>
                </button>
              </div>
            </div>

            <!-- Right Arrow -->
            <button
              v-if="currentPage < totalPages - 1"
              @click="currentPage++"
              class="shrink-0 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
              title="Next"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Page Indicator -->
            <span class="shrink-0 text-xs text-white/60 px-2" title="Current Page">
              {{ currentPage + 1 }}/{{ totalPages }}
            </span>

            <!-- Add Question Button -->
            <button
              @click="addQuestion"
              class="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
             title="Add Question">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

        <!-- Main Content - Single Question View -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
          <div v-if="questions.length > 0" class="max-w-4xl mx-auto">
            <!-- Question Form - Single View -->
            <div class="bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              
              <!-- Question Header -->
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-3">
                  <span class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold">
                    {{ currentQuestionIndex + 1 }}
                  </span>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Question {{ currentQuestionIndex + 1 }}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">of {{ questions.length }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <!-- Navigation Buttons -->
                  <button
                    v-if="currentQuestionIndex > 0"
                    @click="currentQuestionIndex--"
                    class="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                   title="Previous">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    v-if="currentQuestionIndex < questions.length - 1"
                    @click="currentQuestionIndex++"
                    class="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                   title="Next">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    v-if="questions.length > 1"
                    @click="removeQuestion(currentQuestionIndex)"
                    class="p-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                   title="Delete Question">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Form Fields -->
              <div class="space-y-4">
                <!-- Type and Marks Row -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Question Type
                    </label>
                    <select
                      v-model="currentQuestion.question_type"
                      @change="handleTypeChange(currentQuestionIndex)"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="mcq">Multiple Choice</option>
                      <option value="multiple_select">Multiple Select</option>
                      <option value="fill_blank">Fill in Blank</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Marks
                    </label>
                    <input
                      v-model.number="currentQuestion.marks"
                      type="number"
                      min="1"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <!-- Question Text -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Question Text
                  </label>
                  <textarea
                    v-model="currentQuestion.question_text"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter question text..."
                  ></textarea>
                </div>

                <!-- MCQ / Multiple Select Options -->
                <div v-if="currentQuestion.question_type === 'mcq' || currentQuestion.question_type === 'multiple_select'">
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Options
                    </label>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ currentQuestion.options.length }} options</span>
                  </div>
                  <div class="space-y-2">
                    <div v-for="(option, optIndex) in currentQuestion.options" :key="optIndex"
                      class="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <input
                        title="Mark as Correct"
                        :type="currentQuestion.question_type === 'mcq' ? 'radio' : 'checkbox'"
                        :name="`question_${currentQuestionIndex}_correct`"
                        v-model="option.is_correct"
                        :value="true"
                        :checked="option.is_correct"
                        @change="handleOptionChange(currentQuestionIndex, optIndex)"
                        class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        :class="currentQuestion.question_type === 'mcq' ? 'rounded-full' : 'rounded'"
                      />
                      <input
                        v-model="option.option_text"
                        type="text"
                        dir="ltr"
                        class="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                        style="direction: ltr; unicode-bidi: plaintext;"
                        :placeholder="`Option ${optIndex + 1}`"
                      />
                      <button
                        v-if="currentQuestion.options.length > 2"
                        @click="removeOption(currentQuestionIndex, optIndex)"
                        class="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    @click="addOption(currentQuestionIndex)"
                    class="mt-2 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Option
                  </button>
                </div>

                <!-- Fill in Blank -->
                <div v-else-if="currentQuestion.question_type === 'fill_blank'">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Correct Answer
                  </label>
                  <input
                    v-model="currentQuestion.correct_answer"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter the correct answer"
                  />
                </div>
              </div>
            </div>

            <!-- Progress & Actions -->
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                      :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ currentQuestionIndex + 1 }}/{{ questions.length }}
                  </span>
                </div>
                <span v-if="!isQuestionValid(currentQuestionIndex)" class="text-xs text-yellow-600 dark:text-yellow-400">
                  ⚠️ Incomplete
                </span>
                <span v-else class="text-xs text-green-600 dark:text-green-400">
                  ✓ Complete
                </span>
              </div>
              
              <button
                @click="addQuestion"
                class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Another
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-8 py-4 flex flex-col sm:flex-row justify-end gap-3">
          <button
            @click="handleClose"
            class="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium transition-all"
          >
            Cancel
          </button>
          <button
            @click="handleSave"
            :disabled="!isValid"
            class="px-8 py-2 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Save All ({{ questions.length }})
          </button>
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

const currentQuestionIndex = ref(0)
const currentPage = ref(0)
const ITEMS_PER_PAGE = 10

const createEmptyQuestion = () => ({
  question_text: '',
  question_type: 'mcq',
  marks: 1,
  options: [
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false }
  ],
  correct_answer: ''
})

const questions = ref([createEmptyQuestion()])

const currentQuestion = computed({
  get: () => questions.value[currentQuestionIndex.value],
  set: (val) => {
    questions.value[currentQuestionIndex.value] = val
  }
})

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(questions.value.length / ITEMS_PER_PAGE)
})

const paginatedQuestions = computed(() => {
  const start = currentPage.value * ITEMS_PER_PAGE
  const end = Math.min(start + ITEMS_PER_PAGE, questions.value.length)
  return questions.value.slice(start, end)
})

const getActualIndex = (pageIndex) => {
  return currentPage.value * ITEMS_PER_PAGE + pageIndex
}

// Update page when currentQuestionIndex changes
const updatePageForIndex = (index) => {
  const page = Math.floor(index / ITEMS_PER_PAGE)
  if (page !== currentPage.value) {
    currentPage.value = page
  }
}

// Watch for question index changes to update page
const updateCurrentIndex = (newIndex) => {
  currentQuestionIndex.value = newIndex
  updatePageForIndex(newIndex)
}

const stripHtmlToText = (html) => {
  return (html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim()
}

const isQuestionValid = (index) => {
  const q = questions.value[index]
  if (!q || !q.question_text || !q.marks) return false
  
  if (q.question_type === 'mcq' || q.question_type === 'multiple_select') {
    const allOptionsFilled = q.options.every(opt => stripHtmlToText(opt.option_text) !== '')
    const hasCorrect = q.options.some(opt => opt.is_correct)
    return allOptionsFilled && hasCorrect && q.options.length >= 2
  } else if (q.question_type === 'fill_blank') {
    return q.correct_answer && q.correct_answer.trim() !== ''
  }
  return false
}

const isValid = computed(() => {
  return questions.value.every((_, index) => isQuestionValid(index))
})

const validCount = computed(() => {
  return questions.value.filter((_, index) => isQuestionValid(index)).length
})

const totalMarks = computed(() => {
  return questions.value.reduce((sum, q) => sum + (q.marks || 0), 0)
})

const addQuestion = () => {
  questions.value.push(createEmptyQuestion())
  const newIndex = questions.value.length - 1
  updateCurrentIndex(newIndex)
}

const removeQuestion = (index) => {
  if (questions.value.length <= 1) return
  questions.value.splice(index, 1)
  if (currentQuestionIndex.value >= questions.value.length) {
    updateCurrentIndex(questions.value.length - 1)
  } else {
    updateCurrentIndex(currentQuestionIndex.value)
  }
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
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false }
    ]
    question.correct_answer = ''
  } else {
    question.options = []
    question.correct_answer = ''
  }
}

const handleOptionChange = (questionIndex, optionIndex) => {
  const question = questions.value[questionIndex]
  
  if (question.question_type === 'mcq') {
    question.options.forEach((opt, idx) => {
      if (idx !== optionIndex) {
        opt.is_correct = false
      }
    })
  }
}

const handleClose = () => {
  emit('close')
}

const handleSave = () => {
  if (isValid.value) {
    emit('save', questions.value)
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease-out;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>