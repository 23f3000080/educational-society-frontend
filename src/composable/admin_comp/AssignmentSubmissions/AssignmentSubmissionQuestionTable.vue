<template>
  <div class="overflow-x-auto -mx-4 sm:mx-0">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700/50">
        <tr>
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Question</th>
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Student Answer</th>
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Correct Answer</th>
          <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Marks</th>
          <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        <tr
          v-for="(question, index) in questions"
          :key="question.question_id"
          :class="question.is_correct ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'"
        >
          <td class="px-3 py-2 text-sm text-gray-900 dark:text-white">{{ index + 1 }}</td>
          <td class="px-3 py-2">
            <div class="text-sm text-gray-900 dark:text-white">{{ question.question_text }}</div>
            <span class="inline-block mt-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
              {{ question.question_type }}
            </span>
          </td>
          <td class="px-3 py-2 hidden sm:table-cell">
            <div class="text-sm" :class="question.is_correct ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'">
              {{ getStudentAnswer(question) || 'Not Answered' }}
            </div>
          </td>
          <td class="px-3 py-2 hidden md:table-cell">
            <div class="text-sm text-green-600 dark:text-green-400 font-medium">
              {{ getCorrectAnswer(question) || 'N/A' }}
            </div>
          </td>
          <td class="px-3 py-2 text-center text-sm font-medium text-gray-900 dark:text-white">
            {{ question.marks }}
          </td>
          <td class="px-3 py-2">
            <div class="flex items-center gap-1">
              <input
                v-model.number="scores[question.question_id]"
                type="number"
                min="0"
                :max="question.marks"
                step="0.5"
                class="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                @input="$emit('score-change', { questionId: question.question_id, marksObtained: scores[question.question_id] })"
              />
              <button
                class="inline-flex items-center px-2 py-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm rounded-lg transition-colors duration-200 disabled:opacity-50"
                :disabled="updating"
                @click="$emit('save-question', question.question_id, scores[question.question_id])"
              >
                <i class="fas fa-check"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot class="bg-gray-50 dark:bg-gray-700/50">
        <tr>
          <td colspan="4" class="px-3 py-3 text-right font-semibold text-gray-900 dark:text-white">Total:</td>
          <td class="px-3 py-3 text-center font-semibold text-gray-900 dark:text-white">{{ submission.total_marks }}</td>
          <td class="px-3 py-3">
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ submission.obtained_marks }}/{{ submission.total_marks }} ({{ submission.percentage.toFixed(1) }}%)
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  submission: {
    type: Object,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  updating: {
    type: Boolean,
    default: false,
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

defineEmits(['save-question', 'score-change'])

const scores = reactive({})

const syncScores = () => {
  props.questions.forEach(question => {
    scores[question.question_id] = question.marks_obtained ?? 0
  })
}

syncScores()

watch(
  () => props.questions,
  () => syncScores(),
  { deep: true }
)
</script>