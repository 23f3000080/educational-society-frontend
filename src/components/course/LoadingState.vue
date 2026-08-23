<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-gray-800 dark:bg-gray-900">
    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-950/30">
      <svg class="h-8 w-8 animate-spin text-cyan-600 dark:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </div>
    <h3 class="text-lg font-black text-slate-900 dark:text-white">
      {{ message || 'Loading course content...' }}
    </h3>
    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
      Please wait while we prepare your learning workspace.
    </p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading course content...'
  }
})
</script>