<template>
  <div
    class="fixed right-0 top-14 sm:top-16 h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] transition-all duration-300 z-40"
    :class="[
      isVisible ? 'translate-x-0' : 'translate-x-full',
      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    ]"
    style="width: 280px;"
  >
    <!-- Toggle Button (visible when collapsed) -->
    <button
      v-if="!isVisible"
      @click="$emit('toggle')"
      class="absolute -left-12 top-4 flex h-10 w-10 items-center justify-center rounded-l-xl shadow-lg transition-all duration-200 hover:scale-105"
      :class="[
        isDarkMode
          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
          : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
      ]"
      style="border: 1px solid;"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Topics Panel -->
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b p-4"
        :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'"
      >
        <h3
          class="text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
        >
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Topics
          </span>
        </h3>
        <div class="flex items-center gap-2">
          <span
            class="text-xs rounded-full px-2 py-0.5"
            :class="[
              isDarkMode
                ? 'bg-slate-700 text-slate-300'
                : 'bg-slate-100 text-slate-600'
            ]"
          >
            {{ topics.length }}
          </span>
          <button
            @click="$emit('toggle')"
            class="rounded-lg p-1 transition-colors duration-200 hover:bg-opacity-20"
            :class="[
              isDarkMode
                ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Topics List -->
      <div class="flex-1 overflow-y-auto p-3 space-y-1" ref="topicsContainer">
        <button
          v-for="(topic, index) in topics"
          :key="topic.id || index"
          @click="scrollToTopic(topic.id)"
          class="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:translate-x-1"
          :class="[
            isDarkMode
              ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          ]"
        >
          <span
            class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors duration-200"
            :class="[
              isDarkMode
                ? 'bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-white'
                : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
            ]"
          >
            {{ index + 1 }}
          </span>
          <span class="truncate text-left">{{ topic.title }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            :class="isDarkMode ? 'text-indigo-400' : 'text-indigo-600'"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        <!-- Empty State -->
        <div v-if="topics.length === 0" class="flex flex-col items-center justify-center h-40 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3" :class="isDarkMode ? 'text-slate-600' : 'text-slate-300'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            No topics available
          </p>
        </div>
      </div>

      <!-- Footer with topic count -->
      <div
        class="border-t p-3"
        :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'"
      >
        <div class="flex items-center justify-between text-xs">
          <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            {{ topics.length }} topics
          </span>
        </div>
      </div>
    </div>

    <!-- Floating Scroll to Top Button -->
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="absolute bottom-20 right-4 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
      :class="[
        isDarkMode
          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
      ]"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  topics: {
    type: Array,
    required: true,
    default: () => []
  },
  isDarkMode: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['toggle', 'scroll-to']);

const topicsContainer = ref(null);
const showScrollTop = ref(false);

const scrollToTopic = (topicId) => {
  emit('scroll-to', topicId);
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Check scroll position to show/hide scroll to top button
const handleScroll = () => {
  if (topicsContainer.value) {
    showScrollTop.value = topicsContainer.value.scrollTop > 100;
  }
};

// Close topics panel when clicking outside (optional)
const handleClickOutside = (event) => {
  const panel = event.target.closest('.fixed.right-0');
  if (!panel && props.isVisible) {
    // Optionally emit toggle or handle closing
  }
};

onMounted(() => {
  if (topicsContainer.value) {
    topicsContainer.value.addEventListener('scroll', handleScroll);
  }
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  if (topicsContainer.value) {
    topicsContainer.value.removeEventListener('scroll', handleScroll);
  }
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Custom scrollbar for topics */
.flex-1.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.flex-1.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.flex-1.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #818cf8;
  border-radius: 8px;
}

.flex-1.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6366f1;
}

/* Smooth transitions */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Floating scroll to top button animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.absolute.bottom-20 {
  animation: fadeInUp 0.3s ease-out;
}
</style>