<template>
  <div class="rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-rose-900/50 dark:bg-gray-900">
    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/30">
      <svg class="h-8 w-8 text-rose-500 dark:text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 class="text-lg font-black text-rose-700 dark:text-rose-300">
      Failed to load course content
    </h3>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
      {{ error }}
    </p>
    <button @click="onRetry" class="mt-5 inline-flex items-center rounded-2xl bg-linear-to-r from-cyan-600 to-sky-600 px-4 py-2.5 text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl">
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