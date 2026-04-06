<!-- components/admin/VideoModal.vue -->

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" @click="$emit('close')"></div>

      <div class="relative bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full">
        <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
          <h3 class="text-lg font-medium text-white">
            {{ mode === 'create' ? 'Add New Video' : 'Edit Video' }}
          </h3>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video Title <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Introduction to Variables"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video URL <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.url"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="https://youtube.com/watch?v=..."
            />
            <p class="text-xs text-gray-500 mt-1">Supports YouTube, Google Drive, and direct video links</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration (seconds)
            </label>
            <input
              v-model.number="form.duration"
              type="number"
              min="0"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 3600 for 1 hour"
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

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="$emit('close')"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Cancel
            </button>
            <button type="submit"
              :disabled="submitting"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
              {{ mode === 'create' ? 'Add Video' : 'Update Video' }}
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
  video: {
    type: Object,
    default: null
  },
  weekId: {
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
  title: '',
  url: '',
  duration: null,
  order_index: 0
})

watch(() => props.video, (newVideo) => {
  if (newVideo) {
    form.value = { ...newVideo }
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