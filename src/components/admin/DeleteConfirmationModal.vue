<!-- components/admin/DeleteConfirmationModal.vue -->

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" @click="$emit('close')"></div>

      <div class="relative bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
        <div class="px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-t-2xl">
          <h3 class="text-lg font-medium text-white">Confirm Deletion</h3>
        </div>

        <div class="p-6">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <h4 class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
            Delete {{ itemType }}?
          </h4>
          <p class="text-gray-600 dark:text-gray-400 text-center mb-6">
            Are you sure you want to delete "{{ item?.title || item?.name }}"? This action cannot be undone.
          </p>

          <div class="flex justify-center space-x-3">
            <button @click="$emit('close')"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Cancel
            </button>
            <button @click="$emit('confirm')"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  itemType: {
    type: String,
    required: true
  }
})

defineEmits(['close', 'confirm'])
</script>