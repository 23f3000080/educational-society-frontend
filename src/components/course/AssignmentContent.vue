<template>
  <div class="mx-auto w-full max-w-5xl space-y-5 p-3 sm:p-5 md:p-6">

    <!-- Header -->
    <div class="rounded-2xl border border-emerald-100 bg-linear-to-r from-emerald-50 via-white to-teal-50 p-4 shadow-sm sm:p-5">
      <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <h2 class="text-xl font-semibold text-gray-800 sm:text-2xl">
            {{ assignment?.title || "Select Assignment" }}
          </h2>
          <p v-if="showAnswers" class="text-sm font-semibold text-emerald-800 sm:text-base">
            Score: {{ formatMarks(getTotalObtainedMarks()) }} / {{ formatMarks(getTotalPossibleMarks()) }}
          </p>
          <p class="text-sm text-gray-600 sm:text-base">{{ assignment?.description }}</p>
          <p v-if="assignment?.due_date" class="text-xs text-gray-500 sm:text-sm">
            Due: {{ formatDate ? formatDate(assignment.due_date) : assignment.due_date }}
          </p>
        </div>

        <div v-if="lastSubmittedAt" class="rounded-xl border border-emerald-200 bg-white/80 px-3 py-2 text-xs text-gray-600 shadow-sm md:text-right">
          <p class="font-semibold uppercase tracking-wide text-emerald-700">Last submitted on</p>
          <p class="mt-0.5 text-sm font-medium text-gray-800">{{ formatSubmittedAt(lastSubmittedAt) }}</p>
        </div>
      </div>
    </div>

    <div v-if="weekObj?.assignments?.length" class="space-y-2 rounded-xl border border-gray-100 bg-white p-3 sm:p-4">
      <p class="text-sm font-medium text-gray-500">Assignments in this week</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in weekObj.assignments"
          :key="item.id"
          class="rounded-full border px-3 py-1.5 text-xs font-medium transition sm:text-sm"
          :class="assignment?.id === item.id ? 'bg-green-100 border-green-300 text-green-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'"
          @click="$emit('select-assignment', item, weekObj)"
        >
          {{ item.title }}
          <span v-if="isAssignmentCompleted && isAssignmentCompleted(item.id)" class="ml-1 text-green-600">✔</span>
        </button>
      </div>
    </div>

    <!-- Questions -->
    <div v-if="loadingQuestions" class="rounded-xl border border-gray-200 bg-white py-10 text-center text-gray-500">
      Loading assignment questions...
    </div>

    <div v-else-if="questions.length" class="space-y-6">
      <div v-if="!showAnswers" class="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
        You can review and edit your answers until the due date and time.
      </div>

      <div v-if="showAnswers" class="p-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm">
        Due date is over. You can now see your answers, correct answers, and marks for each question.
      </div>
      
      <div
        v-for="(q, i) in questions"
        :key="q.id"
        class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div class="font-medium question-rich-text text-gray-900">
            Q{{ i + 1 }}. <span v-html="q.question_text"></span>
          </div>
          <span class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
            {{ getQuestionTypeLabel(q.question_type) }}
          </span>
        </div>

        <!-- MCQ -->
        <div v-if="q.question_type === 'mcq'" class="space-y-2.5">
          <label
            v-for="opt in q.options"
            :key="opt.id"
            class="flex items-start gap-3 rounded-lg border border-gray-200 p-2.5 transition hover:border-emerald-300"
            :class="getOptionStateClass(q, opt)"
          >
            <input
              type="radio"
              :name="`q-${q.id}`"
              :value="opt.id"
              :checked="isMcqSelected(q.id, opt.id)"
              :disabled="showAnswers"
              @change="$emit('update-answer', q.id, { selected_option_id: opt.id })"
            />
            <span class="option-rich-text pt-0.5" v-html="opt.option_text"></span>
          </label>
        </div>

        <!-- Multiple Select -->
        <div v-else-if="q.question_type === 'multiple_select'" class="space-y-2.5">
          <label
            v-for="opt in q.options"
            :key="opt.id"
            class="flex items-start gap-3 rounded-lg border border-gray-200 p-2.5 transition hover:border-emerald-300"
            :class="getOptionStateClass(q, opt)"
          >
            <input
              type="checkbox"
              :checked="isMultipleSelected(q.id, opt.id)"
              :disabled="showAnswers"
              @change="handleMultiSelectChange(q.id, opt.id, $event.target.checked)"
            />
            <span class="option-rich-text pt-0.5" v-html="opt.option_text"></span>
          </label>
        </div>

        <!-- Fill Blank -->
        <input
          v-else-if="q.question_type === 'fill_blank'"
          type="text"
          :value="getFillBlankAnswer(q.id)"
          :disabled="showAnswers"
          @input="$emit('update-answer', q.id, { text_answer: $event.target.value })"
          class="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:text-base"
        />

        <div v-else class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Unsupported question type: {{ q.question_type }}
        </div>

        <div v-if="showAnswers" class="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          <div class="grid gap-2 sm:grid-cols-3">
            <div>
              <p class="font-semibold text-gray-700">Your answer</p>
              <div class="mt-1">
                <template v-if="q.question_type === 'fill_blank'">
                  <span class="text-gray-700">{{ getFillBlankAnswer(q.id) || 'Not answered' }}</span>
                </template>
                <template v-else>
                  <div v-if="getSelectedOptionObjects(q).length" class="space-y-1">
                    <div
                      v-for="opt in getSelectedOptionObjects(q)"
                      :key="`selected-${q.id}-${opt.id}`"
                      class="option-rich-text text-gray-700"
                      v-html="opt.option_text"
                    ></div>
                  </div>
                  <span v-else class="text-gray-500">Not answered</span>
                </template>
              </div>
            </div>

            <div>
              <p class="font-semibold text-gray-700">Correct answer</p>
              <div class="mt-1">
                <template v-if="q.question_type === 'fill_blank'">
                  <span v-if="q.correct_answers?.length" class="text-green-700">
                    {{ q.correct_answers.join(' / ') }}
                  </span>
                  <span v-else class="text-gray-500">Not available</span>
                </template>
                <template v-else>
                  <span class="text-green-700">{{ getCorrectOptionsText(q) }}</span>
                </template>
              </div>
            </div>

            <div>
              <p class="font-semibold text-gray-700">Points</p>
              <p class="mt-1" :class="(q.earned_marks || 0) > 0 ? 'text-green-700' : 'text-rose-600'">
                {{ formatMarks(q.earned_marks || 0) }} / {{ formatMarks(q.marks || 0) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="sticky bottom-3 z-10 pt-1 sm:static">
        <button
          @click="$emit('submit')"
          :disabled="submitting || showAnswers || isAssignmentPastDue"
          class="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-base"
        >
          {{ submitting ? "Submitting..." : "Submit Assignment" }}
        </button>
      </div>

      <p v-if="isAssignmentPastDue" class="text-sm text-red-600">
        This assignment is past due and cannot be submitted.
      </p>

      <div
        v-if="submissionNotice"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
        @click.self="closeSubmissionNotice"
      >
        <div class="w-full max-w-md rounded-2xl border bg-white p-5 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p
                class="text-base font-semibold"
                :class="submissionNotice.type === 'success' ? 'text-emerald-700' : 'text-rose-700'"
              >
                {{ submissionNotice.message }}
              </p>
              <p v-if="submissionNotice.submittedAt" class="mt-2 text-sm text-gray-600">
                Submitted at: {{ formatSubmittedAt(submissionNotice.submittedAt) }}
              </p>
            </div>
            <button
              type="button"
              class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              @click="closeSubmissionNotice"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="text-center text-gray-500">
      {{ assignment ? "No questions found" : "Select an assignment from sidebar" }}
    </div>

  </div>
</template>

<script setup>
const emit = defineEmits(['update-answer', 'submit', 'select-assignment', 'close-notice'])

const props = defineProps({
  week: Number,
  weekObj: Object,
  assignment: Object,
  questions: {
    type: Array,
    default: () => []
  },
  userAnswers: {
    type: Object,
    default: () => ({})
  },
  loadingQuestions: {
    type: Boolean,
    default: false
  },
  submitting: {
    type: Boolean,
    default: false
  },
  showAnswers: {
    type: Boolean,
    default: false
  },
  submissionNotice: {
    type: Object,
    default: null
  },
  lastSubmittedAt: {
    type: String,
    default: null
  },
  isAssignmentCompleted: Function,
  isAssignmentPastDue: {
    type: Boolean,
    default: false
  },
  formatDate: Function
})

const getCorrectOptionsText = (question) => {
  const options = Array.isArray(question?.options) ? question.options : []
  const correct = options
    .filter(option => option.is_correct)
    .map(option => option.option_text)

  return correct.length ? correct.join(' / ') : 'Not available'
}

const formatMarks = (value) => {
  const num = Number(value || 0)
  return Number.isInteger(num) ? String(num) : num.toFixed(2)
}

const formatSubmittedAt = (value) => {
  if (!value) return ''

  const rawValue = String(value).trim()
  const date = new Date(rawValue)

  if (Number.isNaN(date.getTime())) return rawValue

  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

const closeSubmissionNotice = () => {
  emit('close-notice')
}

const getTotalObtainedMarks = () => {
  return props.questions.reduce((sum, question) => {
    return sum + Number(question?.earned_marks || 0)
  }, 0)
}

const getTotalPossibleMarks = () => {
  return props.questions.reduce((sum, question) => {
    return sum + Number(question?.marks || 0)
  }, 0)
}

const getQuestionTypeLabel = (type) => {
  if (type === 'mcq') return 'MCQ'
  if (type === 'multiple_select') return 'Multiple Select'
  if (type === 'fill_blank') return 'Fill in the Blank'
  return 'Question'
}

const getSelectedMultiAnswer = (questionId) => {
  const answer = props.userAnswers?.[questionId]
  if (Array.isArray(answer)) return answer.map(String)
  if (typeof answer === 'string' && answer.length) {
    return answer.split(',').map(v => v.trim()).filter(Boolean)
  }
  return []
}

const isMultipleSelected = (questionId, optionId) => {
  return getSelectedMultiAnswer(questionId).includes(String(optionId))
}

const isMcqSelected = (questionId, optionId) => {
  const answer = props.userAnswers?.[questionId]
  return String(answer) === String(optionId)
}

const isOptionChosen = (question, optionId) => {
  if (question.question_type === 'multiple_select') {
    return isMultipleSelected(question.id, optionId)
  }
  if (question.question_type === 'mcq') {
    return isMcqSelected(question.id, optionId)
  }
  return false
}

const getOptionStateClass = (question, option) => {
  const chosen = isOptionChosen(question, option.id)

  if (!props.showAnswers) {
    return chosen ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : ''
  }

  if (option.is_correct && chosen) {
    return 'border-green-400 bg-green-50 text-green-800 font-medium'
  }

  if (option.is_correct) {
    return 'border-green-300 bg-green-50 text-green-700'
  }

  if (chosen) {
    return 'border-rose-300 bg-rose-50 text-rose-700'
  }

  return ''
}

const getSelectedOptionObjects = (question) => {
  const options = Array.isArray(question?.options) ? question.options : []

  if (question.question_type === 'multiple_select') {
    const selectedIds = new Set(getSelectedMultiAnswer(question.id))
    return options.filter(opt => selectedIds.has(String(opt.id)))
  }

  if (question.question_type === 'mcq') {
    return options.filter(opt => isMcqSelected(question.id, opt.id))
  }

  return []
}

const handleMultiSelectChange = (questionId, optionId, checked) => {
  const current = getSelectedMultiAnswer(questionId)
  const optionValue = String(optionId)

  const next = checked
    ? Array.from(new Set([...current, optionValue]))
    : current.filter(id => id !== optionValue)

  // Backend expects selected_option_ids for multiple-select answers.
  emit('update-answer', questionId, { selected_option_ids: next })
}

const getFillBlankAnswer = (questionId) => {
  const answer = props.userAnswers?.[questionId]
  return typeof answer === 'string' ? answer : ''
}
</script>