<!-- components/admin/WeekModal.vue -->

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" @click="$emit('close')"></div>

      <div class="relative bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full">
        <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
          <h3 class="text-lg font-medium text-white">
            {{ mode === 'create' ? 'Add New Week' : 'Edit Week' }}
          </h3>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Week Number <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="form.week_number"
              type="number"
              min="1"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Week Title <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Introduction to Programming"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="Week description..."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="$emit('close')"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Cancel
            </button>
            <button type="submit"
              :disabled="submitting"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
              {{ mode === 'create' ? 'Add Week' : 'Update Week' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  week: {
    type: Object,
    default: null
  },
  courseId: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    default: 'create'
  }
})

const emit = defineEmits(['close', 'save'])

const submitting = ref(false)
const form = ref({
  week_number: '',
  title: '',
  description: ''
})

watch(() => props.week, (newWeek) => {
  if (newWeek) {
    form.value = { ...newWeek }
  }
}, { immediate: true })

const handleSubmit = async () => {
  submitting.value = true
  try {
    await emit('save', form.value)
  } finally {
    submitting.value = false
  }
}
</script>