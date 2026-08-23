<template>
  <Transition name="global-loader">
    <div
      v-if="isGlobalLoading"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-xl dark:bg-slate-950/90 px-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="text-center max-w-sm">
        <!-- Clean Loading Spinner -->
        <div class="relative mx-auto h-20 w-20">
          <div class="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
          <div class="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
          <div class="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-b-cyan-500 border-l-cyan-500 animate-spin-reverse opacity-60"></div>
        </div>
        
        <h3 class="mt-6 text-xl font-semibold text-slate-800 dark:text-white">Loading</h3>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ loadingMessage }}</p>
        
        <!-- Simple Progress Bar -->
        <div class="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div class="h-full w-1/3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-loader-slide"></div>
        </div>
        
        <p class="mt-3 text-xs font-mono text-slate-400">{{ progressPercentage }}%</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { isGlobalLoading } from '../../utils/globalLoading.js'

const loadingMessage = ref('Loading your content...')
const progressPercentage = ref(0)
let progressInterval = null

onMounted(() => {
  let progress = 0
  progressInterval = setInterval(() => {
    progress += 1 + Math.random() * 3
    progressPercentage.value = Math.min(Math.round(progress), 99)
    if (progress > 70) {
      loadingMessage.value = 'Almost ready...'
    }
  }, 150)
})

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval)
})
</script>

<style scoped>
.global-loader-enter-active,
.global-loader-leave-active {
  transition: opacity 300ms ease;
}
.global-loader-enter-from,
.global-loader-leave-to {
  opacity: 0;
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.animate-spin-reverse {
  animation: spin-reverse 2s linear infinite;
}

@keyframes loader-slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}

.animate-loader-slide {
  animation: loader-slide 1.5s ease-in-out infinite;
}
</style>