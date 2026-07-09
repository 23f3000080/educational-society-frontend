<template>
  <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 transition-colors duration-200">
      <div class="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{{ total }}</div>
      <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Submissions</div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 transition-colors duration-200">
      <div class="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{{ passed }}</div>
      <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Passed (≥60%)</div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 transition-colors duration-200">
      <div class="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">{{ failed }}</div>
      <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Failed (&lt;60%)</div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 transition-colors duration-200">
      <div class="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{{ averageScore }}%</div>
      <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Average Score</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
  passed: {
    type: Number,
    required: true,
  },
  failed: {
    type: Number,
    required: true,
  },
  averageScore: {
    type: Number,
    required: true,
  },
})
</script>