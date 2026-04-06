<!-- components/admin/QuestionModal.vue -->

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 z-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" @click="$emit('close')"></div>

      <!-- Modal panel -->
      <div class="relative z-10 inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <!-- Header -->
        <div class="px-6 py-4 bg-linear-to-r from-indigo-600 to-purple-600">
          <h3 class="text-lg font-medium text-white">
            {{ mode === 'create' ? 'Add New Question' : 'Edit Question' }}
          </h3>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Question Type Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Type <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                @click="form.question_type = 'mcq'"
                :class="[
                  'p-3 border rounded-lg text-sm font-medium transition-all duration-200',
                  form.question_type === 'mcq'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
                ]"
              >
                <div class="flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Multiple Choice</span>
                </div>
              </button>

              <button
                type="button"
                @click="form.question_type = 'fill_blank'"
                :class="[
                  'p-3 border rounded-lg text-sm font-medium transition-all duration-200',
                  form.question_type === 'fill_blank'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
                ]"
              >
                <div class="flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                  <span>Fill in Blank</span>
                </div>
              </button>

              <button
                type="button"
                @click="form.question_type = 'multiple_select'"
                :class="[
                  'p-3 border rounded-lg text-sm font-medium transition-all duration-200',
                  form.question_type === 'multiple_select'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
                ]"
              >
                <div class="flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Multiple Select</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Question Text -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Text <span class="text-red-500">*</span>
            </label>
            <div class="mb-2 flex flex-wrap gap-2">
              <button
                type="button"
                @click="applyFormatting('bold')"
                title="Bold selected text"
                class="inline-flex items-center rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                B
              </button>
              <button
                type="button"
                @click="applyFormatting('code')"
                title="Format selected text as code"
                class="inline-flex items-center rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-mono text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Code
              </button>
              <button
                type="button"
                @click="applyFormatting('highlight')"
                title="Highlight selected text"
                class="inline-flex items-center rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Highlight
              </button>
              <button
                type="button"
                @click="clearFormatting()"
                title="Undo applied formatting"
                class="inline-flex items-center rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Undo
              </button>
            </div>
            <div
              ref="questionEditor"
              contenteditable="true"
              dir="ltr"
              role="textbox"
              aria-multiline="true"
              data-placeholder="Enter your question here..."
              class="min-h-28 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left text-gray-900 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              style="direction: ltr; unicode-bidi: plaintext;"
              @input="handleEditorInput"
              @blur="handleEditorBlur"
              @paste="handleEditorPaste"
            ></div>
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Use the toolbar to format the selected text with bold, code, or highlight.
            </p>
          </div>

          <!-- Marks and Order -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Marks <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="form.marks"
                type="number"
                min="1"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Index
              </label>
              <input
                v-model.number="form.order_index"
                type="number"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Display order (0, 1, 2...)"
              />
            </div>
          </div>

          <!-- MCQ / Multiple Select Options -->
          <div v-if="form.question_type === 'mcq' || form.question_type === 'multiple_select'">
            <div class="flex items-center justify-between mb-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Answer Options <span class="text-red-500">*</span>
              </label>
              <button
                type="button"
                @click="addOption"
                class="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Option
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="(option, index) in form.options"
                :key="index"
                class="space-y-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
              >
                <input
                  v-model="option.option_text"
                  type="text"
                  required
                  dir="ltr"
                  class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-gray-900 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
                  style="direction: ltr; unicode-bidi: plaintext;"
                  :placeholder="`Option ${index + 1}`"
                />
                
                <!-- Correct answer indicator for MCQ -->
                <div v-if="form.question_type === 'mcq'" class="flex items-center justify-between gap-3">
                  <input
                    type="radio"
                    :name="'correct_option'"
                    :checked="option.is_correct"
                    @change="setCorrectOption(index)"
                    class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Correct</span>
                </div>

                <!-- Correct answer indicator for Multiple Select -->
                <div v-else-if="form.question_type === 'multiple_select'" class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="option.is_correct"
                    class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Correct</span>
                </div>

                <!-- Remove option button -->
                <button
                  type="button"
                  @click="removeOption(index)"
                  class="ml-auto p-1 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  :disabled="form.options.length <= 2"
                  title="Remove this option"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Hint about minimum options -->
            <p class="text-xs text-gray-500 mt-2">
              Minimum 2 options required. Select the correct answer using the radio button (MCQ) or checkboxes (Multiple Select).
            </p>
          </div>

          <!-- Fill in Blank -->
          <div v-else-if="form.question_type === 'fill_blank'">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Correct Answer <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.correct_answer"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the correct answer"
              />
              <p class="text-xs text-gray-500 mt-1">
                Students will need to type this exact answer (case insensitive)
              </p>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            <!-- Save & Add Another button for create mode -->
            <button
              v-if="mode === 'create' && showSaveAnother"
              type="button"
              @click="handleSaveAndAnother"
              :disabled="submitting || !isFormValid"
              class="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>Save & Add Another</span>
            </button>
            
            <button
              type="submit"
              :disabled="submitting || !isFormValid"
              class="px-6 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>{{ mode === 'create' ? 'Add Question' : 'Update Question' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    default: null
  },
  assignmentId: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    default: 'create'
  },
  showSaveAnother: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save', 'save-and-another'])

const submitting = ref(false)
const questionEditor = ref(null)
const optionEditors = ref([])
const activeOptionIndex = ref(null)
const form = ref({
  question_text: '',
  question_type: 'mcq',
  marks: 10,
  order_index: 0,
  options: [
    { option_text: '', is_correct: true },
    { option_text: '', is_correct: false }
  ],
  correct_answer: ''
})

// Check if form is valid
const isFormValid = computed(() => {
  if (!stripHtmlToText(form.value.question_text) || !form.value.marks) return false
  
  if (form.value.question_type === 'mcq' || form.value.question_type === 'multiple_select') {
    // Check if all options have text
    const allOptionsFilled = form.value.options.every(opt => stripHtmlToText(opt.option_text) !== '')
    if (!allOptionsFilled) return false
    
    // Check if at least one option is marked correct
    const hasCorrectOption = form.value.options.some(opt => opt.is_correct)
    if (!hasCorrectOption) return false
    
    // For MCQ, ensure only one correct option
    if (form.value.question_type === 'mcq') {
      const correctCount = form.value.options.filter(opt => opt.is_correct).length
      if (correctCount !== 1) return false
    }
  } else if (form.value.question_type === 'fill_blank') {
    if (!form.value.correct_answer.trim()) return false
  }
  
  return true
})

// Initialize form when editing
watch(() => props.question, async (newQuestion) => {
  if (newQuestion) {
    if (newQuestion.question_type === 'mcq' || newQuestion.question_type === 'multiple_select') {
      form.value = {
        ...newQuestion,
        options: newQuestion.options || [
          { option_text: '', is_correct: true },
          { option_text: '', is_correct: false }
        ]
      }
    } else {
      form.value = { ...newQuestion }
    }
  } else {
    form.value = {
      question_text: '',
      question_type: 'mcq',
      marks: 10,
      order_index: 0,
      options: [
        { option_text: '', is_correct: true },
        { option_text: '', is_correct: false }
      ],
      correct_answer: ''
    }
  }

  await nextTick()
  syncEditorContent()
}, { immediate: true })

const stripHtmlToText = (html) => {
  return (html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim()
}

const setOptionEditorRef = (el, index) => {
  if (el) {
    optionEditors.value[index] = el
  }
}

const syncEditorContent = () => {
  if (!questionEditor.value) return
  const currentHtml = questionEditor.value.innerHTML
  if ((form.value.question_text || '') !== currentHtml) {
    questionEditor.value.innerHTML = form.value.question_text || ''
  }
}

const syncOptionEditorContent = () => {
  optionEditors.value.forEach((editor, index) => {
    const option = form.value.options[index]
    if (editor && option) {
      const nextHtml = option.option_text || ''
      if (editor.innerHTML !== nextHtml) {
        editor.innerHTML = nextHtml
      }
    }
  })
}

const updateQuestionTextFromEditor = () => {
  if (!questionEditor.value) return
  form.value.question_text = questionEditor.value.innerHTML
}

const updateOptionTextFromEditor = (index) => {
  const editor = optionEditors.value[index]
  if (!editor || !form.value.options[index]) return
  form.value.options[index].option_text = editor.innerHTML
}

const handleEditorInput = () => {
  updateQuestionTextFromEditor()
}

const handleEditorBlur = () => {
  updateQuestionTextFromEditor()
}

const handleEditorPaste = (event) => {
  event.preventDefault()
  const pastedText = (event.clipboardData || window.clipboardData).getData('text/plain')
  document.execCommand('insertText', false, pastedText)
  updateQuestionTextFromEditor()
}

const handleOptionEditorInput = (index) => {
  updateOptionTextFromEditor(index)
}

const handleOptionEditorBlur = (index) => {
  updateOptionTextFromEditor(index)
}

const handleOptionEditorPaste = (index, event) => {
  event.preventDefault()
  const pastedText = (event.clipboardData || window.clipboardData).getData('text/plain')
  document.execCommand('insertText', false, pastedText)
  updateOptionTextFromEditor(index)
}

const getEditorSelection = (editor) => {
  if (!editor) return null
  editor.focus()
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null
  return selection
}

const applyFormattingToEditor = (editor, type) => {
  const selection = getEditorSelection(editor)
  if (!selection) return

  const range = selection.getRangeAt(0)
  if (range.collapsed) {
    return
  }

  const wrapperMap = {
    bold: ['strong', ''],
    code: ['code', 'rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'],
    highlight: ['mark', 'rounded bg-yellow-200 px-1 text-gray-900']
  }

  const [tagName, className] = wrapperMap[type] || []
  if (!tagName) return

  const wrapper = document.createElement(tagName)
  if (className) wrapper.className = className
  const contents = range.extractContents()
  wrapper.appendChild(contents)
  range.insertNode(wrapper)
  selection.removeAllRanges()
  const newRange = document.createRange()
  newRange.selectNodeContents(wrapper)
  selection.addRange(newRange)
}

const clearFormattingFromEditor = (editor) => {
  const selection = getEditorSelection(editor)
  if (!selection) return
  document.execCommand('removeFormat')
  document.execCommand('unlink')
}

const wrapSelection = (tagName, className = '') => {
  if (!questionEditor.value) return

  questionEditor.value.focus()
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  const wrapper = document.createElement(tagName)
  if (className) wrapper.className = className

  if (range.collapsed) {
    wrapper.innerHTML = '&nbsp;'
    range.insertNode(wrapper)
    const newRange = document.createRange()
    newRange.setStart(wrapper, 0)
    newRange.collapse(true)
    selection.removeAllRanges()
    selection.addRange(newRange)
  } else {
    const contents = range.extractContents()
    wrapper.appendChild(contents)
    range.insertNode(wrapper)
    selection.removeAllRanges()
    const newRange = document.createRange()
    newRange.selectNodeContents(wrapper)
    selection.addRange(newRange)
  }

  updateQuestionTextFromEditor()
}

const applyFormatting = (type) => {
  switch (type) {
    case 'bold':
      wrapSelection('strong')
      break
    case 'code':
      wrapSelection('code', 'rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100')
      break
    case 'highlight':
      wrapSelection('mark', 'rounded bg-yellow-200 px-1 text-gray-900')
      break
  }
}

const clearFormatting = () => {
  clearFormattingFromEditor(questionEditor.value)
  updateQuestionTextFromEditor()
}

const applyOptionFormatting = (index, type) => {
  applyFormattingToEditor(optionEditors.value[index], type)
  updateOptionTextFromEditor(index)
}

const clearOptionFormatting = (index) => {
  clearFormattingFromEditor(optionEditors.value[index])
  updateOptionTextFromEditor(index)
}

// Add new option
const addOption = () => {
  form.value.options.push({
    option_text: '',
    is_correct: false
  })
  nextTick(syncOptionEditorContent)
}

// Remove option
const removeOption = (index) => {
  if (form.value.options.length > 2) {
    form.value.options.splice(index, 1)
    optionEditors.value.splice(index, 1)
    
    // If we removed the correct option in MCQ, set a new default
    if (form.value.question_type === 'mcq') {
      const hasCorrect = form.value.options.some(opt => opt.is_correct)
      if (!hasCorrect && form.value.options.length > 0) {
        form.value.options[0].is_correct = true
      }
    }
    nextTick(syncOptionEditorContent)
  }
}

// Set correct option for MCQ
const setCorrectOption = (index) => {
  form.value.options.forEach((opt, i) => {
    opt.is_correct = i === index
  })
}

// Handle form submission
const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  submitting.value = true
  try {
    // Prepare data based on question type
    const submitData = {
      question_text: form.value.question_text,
      question_type: form.value.question_type,
      marks: form.value.marks,
      order_index: form.value.order_index
    }
    
    if (form.value.question_type === 'mcq' || form.value.question_type === 'multiple_select') {
      submitData.options = form.value.options.map(opt => ({
        option_text: opt.option_text,
        is_correct: opt.is_correct
      }))
    } else if (form.value.question_type === 'fill_blank') {
      submitData.correct_answer = form.value.correct_answer
    }
    
    await emit('save', submitData)
  } finally {
    submitting.value = false
  }
}

const handleSaveAndAnother = async () => {
  if (!isFormValid.value) return
  
  submitting.value = true
  try {
    const submitData = {
      question_text: form.value.question_text,
      question_type: form.value.question_type,
      marks: form.value.marks,
      order_index: form.value.order_index
    }
    
    if (form.value.question_type === 'mcq' || form.value.question_type === 'multiple_select') {
      submitData.options = form.value.options.map(opt => ({
        option_text: opt.option_text,
        is_correct: opt.is_correct
      }))
    } else if (form.value.question_type === 'fill_blank') {
      submitData.correct_answer = form.value.correct_answer
    }
    
    await emit('save-and-another', submitData)
    
    // Reset form for next question
    form.value = {
      question_text: '',
      question_type: 'mcq',
      marks: 10,
      order_index: 0,
      options: [
        { option_text: '', is_correct: true },
        { option_text: '', is_correct: false }
      ],
      correct_answer: ''
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* Animation for modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: scale(0.95);
}
</style>