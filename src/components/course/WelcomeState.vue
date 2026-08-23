<template>
  <div class="rounded-3xl border border-cyan-100 bg-white p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-cyan-900/40 dark:bg-gray-900">
    <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-950/30">
      <svg class="h-10 w-10 text-cyan-600 dark:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <h2 class="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">Welcome to {{ title || 'Course' }}</h2>
    <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
      {{ description || 'Start your learning journey by exploring the course materials.' }}
    </p>
    <div class="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
      <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-gray-800">Lectures</span>
      <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-gray-800">Assignments</span>
      <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-gray-800">Notes</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>