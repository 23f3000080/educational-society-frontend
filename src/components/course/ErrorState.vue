<template>
  <div class="bg-white rounded-xl shadow-sm border p-12 text-center">
    <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 class="text-lg font-medium text-red-700 mb-2">Failed to load course content</h3>
    <p class="text-gray-600 mb-4">{{ error }}</p>
    <button @click="onRetry" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Try Again
    </button>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    required: true
  },
  onRetry: {
    type: Function,
    required: true
  }
})
</script>