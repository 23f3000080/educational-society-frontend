<template>
  <!-- Desktop Sidebar -->
  <aside
    class="hidden md:flex flex-col border-r transition-all duration-300"
    :class="[
      isDarkMode
        ? 'border-slate-700 bg-slate-900'
        : 'border-slate-200 bg-white',
      isOpen ? 'w-64 lg:w-72' : 'w-16'
    ]"
    style="height: calc(100vh - 64px); position: sticky; top: 64px;"
  >
    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="absolute -right-3 top-4 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-all duration-200 hover:scale-110"
      :class="[
        isDarkMode
          ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3 transition-transform duration-200"
        :class="{ 'rotate-180': !isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Course Info -->
    <div
      class="border-b p-4 transition-colors duration-300"
      :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'"
    >
      <div class="flex items-center gap-2" :class="{ 'justify-center': !isOpen }">
        <span class="text-2xl" :class="{ 'text-3xl': !isOpen }">{{ course.icon || '📚' }}</span>
        <h2
          v-if="isOpen"
          class="truncate font-bold transition-colors duration-300"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          :title="course.title"
        >
          {{ course.title }}
        </h2>
      </div>
      <p
        v-if="isOpen"
        class="mt-1 text-xs lg:text-sm transition-colors duration-300"
        :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
      >
        {{ course.weeks?.length || 0 }} weeks
      </p>
    </div>

    <!-- Weeks List -->
    <div class="flex-1 overflow-y-auto p-3 lg:p-4">
      <div v-if="isOpen" class="mb-3 lg:mb-4">
        <h3
          class="text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-400' : 'text-slate-400'"
        >
          Weeks
        </h3>
      </div>

      <div class="space-y-1.5 lg:space-y-2">
        <button
          v-for="week in course.weeks"
          :key="week.number"
          @click="selectWeek(week.number)"
          class="group relative flex w-full items-center rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 text-left transition-all duration-200"
          :class="[
            selectedWeek === week.number
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
              : isDarkMode
                ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          ]"
          :title="isOpen ? '' : `Week ${week.number}`"
        >
          <!-- Week Icon (when collapsed) -->
          <div v-if="!isOpen" class="flex w-full justify-center">
            <span class="text-sm font-semibold">{{ week.number }}</span>
          </div>

          <!-- Week Content (when expanded) -->
          <template v-else>
            <div class="flex flex-1 items-center justify-between min-w-0">
              <div class="flex flex-col min-w-0">
                <span class="text-sm lg:text-base font-medium">
                  Week {{ week.number }}
                </span>
                <span
                  class="text-xs truncate mt-0.5"
                  :class="[
                    selectedWeek === week.number
                      ? 'text-white/80'
                      : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-500'
                  ]"
                >
                  {{ week.title }}
                </span>
              </div>
              <svg
                v-if="selectedWeek === week.number"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 lg:h-5 lg:w-5 text-white flex-shrink-0 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12l5 5L20 7" />
              </svg>
            </div>
          </template>
        </button>
      </div>
    </div>
  </aside>

  <!-- Mobile Bottom Sheet for Weeks -->
  <div
    class="md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300"
    :class="[
      showMobileWeeks ? 'translate-y-0' : 'translate-y-full'
    ]"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 transition-opacity duration-300"
      :class="showMobileWeeks ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      @click="showMobileWeeks = false"
    ></div>

    <div
      class="relative rounded-t-2xl shadow-2xl"
      :class="isDarkMode ? 'bg-slate-800' : 'bg-white'"
    >
      <!-- Handle -->
      <div class="flex justify-center pt-3">
        <div
          class="h-1 w-12 rounded-full"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-300'"
        ></div>
      </div>

      <!-- Header -->
      <div
        class="flex items-center justify-between p-4 border-b"
        :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'"
      >
        <div class="flex items-center gap-2">
          <span class="text-2xl">{{ course.icon || '📚' }}</span>
          <h3
            class="font-semibold"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            {{ course.title }}
          </h3>
        </div>
        <button
          @click="showMobileWeeks = false"
          class="rounded-lg p-1.5 transition-colors duration-200"
          :class="[
            isDarkMode
              ? 'text-slate-400 hover:bg-slate-700'
              : 'text-slate-500 hover:bg-slate-100'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Weeks List -->
      <div class="max-h-[55vh] overflow-y-auto p-4 space-y-2">
        <button
          v-for="week in course.weeks"
          :key="week.number"
          @click="selectWeekMobile(week.number)"
          class="flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200"
          :class="[
            selectedWeek === week.number
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
              : isDarkMode
                ? 'text-slate-300 hover:bg-slate-700'
                : 'text-slate-700 hover:bg-slate-100'
          ]"
        >
          <div class="flex flex-col items-start">
            <span class="font-medium">Week {{ week.number }}</span>
            <span class="text-xs opacity-75">{{ week.title }}</span>
          </div>
          <svg
            v-if="selectedWeek === week.number"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12l5 5L20 7" />
          </svg>
        </button>
      </div>

      <!-- Safe area for notched phones -->
      <div class="h-safe-area"></div>
    </div>
  </div>

  <!-- Mobile Week Selector Button - Bottom Center -->
  <button
    v-if="course"
    @click="showMobileWeeks = true"
    class="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full px-5 py-3 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
    :class="isDarkMode ? 'bg-slate-700 text-white border border-slate-600' : 'bg-white text-slate-700 border border-slate-200'"
    style="box-shadow: 0 4px 20px rgba(0,0,0,0.15);"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span class="text-sm font-medium">Week {{ selectedWeek }}</span>
    <!-- <span class="text-xs opacity-60">• {{ getCurrentWeekTitle() }}</span> -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true,
    default: () => ({
      weeks: [],
      icon: '📚',
      title: 'Course'
    })
  },
  selectedWeek: {
    type: Number,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-week', 'scroll-to-topic']);

// Sidebar state
const isOpen = ref(true);
const showMobileWeeks = ref(false);

// Get current week title
const getCurrentWeekTitle = () => {
  if (!props.course?.weeks) return '';
  const week = props.course.weeks.find(w => w.number === props.selectedWeek);
  return week ? week.title : '';
};

// Toggle sidebar
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

// Select week
const selectWeek = (weekNumber) => {
  emit('select-week', weekNumber);
};

const selectWeekMobile = (weekNumber) => {
  emit('select-week', weekNumber);
  showMobileWeeks.value = false;
};

// Close mobile weeks when course changes
watch(() => props.course, () => {
  showMobileWeeks.value = false;
}, { deep: true });
</script>

<style scoped>
.h-safe-area {
  height: env(safe-area-inset-bottom);
}

/* Custom scrollbar for sidebar */
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

/* Transition for smooth hover effects */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile button hover effect */
.md\:hidden.fixed {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Dark mode mobile button */
.dark .md\:hidden.fixed {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Ensure button doesn't overlap with content on mobile */
@media (max-width: 767px) {
  .md\:hidden.fixed {
    padding-left: 1rem;
    padding-right: 1rem;
    max-width: 90vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>