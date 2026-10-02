<template>
  <nav
    ref="navRoot"
    class="sticky top-0 z-50 border-b transition-colors duration-300"
    :class="[
      isDarkMode
        ? 'border-slate-700 bg-slate-900'
        : 'border-slate-200 bg-white'
    ]"
  >
    <div class="mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
      <!-- Logo -->
      <div class="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer flex-shrink-0" @click="goHome">
        <div
          class="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm sm:text-lg font-bold text-white shadow-lg overflow-hidden"
        >
          <img src="/ES_New_logo_notext.jpeg" alt="Logo" class="h-full w-full object-cover" />
        </div>
        <div class="hidden sm:block">
          <h1
            class="text-base sm:text-lg font-bold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            Educational Society
          </h1>
          <p class="text-xs transition-colors duration-300" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            Quick Reference
          </p>
        </div>
        <span class="block sm:hidden text-sm font-semibold truncate" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          Educational Society
        </span>
      </div>

      <!-- ===== DESKTOP RAIL ===== -->
      <div class="hidden md:flex items-center max-w-[50%] relative">
        <div class="absolute left-0 w-6 h-full bg-gradient-to-r pointer-events-none z-10 transition-colors duration-300"
          :class="isDarkMode ? 'from-slate-900 to-transparent' : 'from-white to-transparent'"></div>
        
        <div
          ref="desktopRail"
          class="course-rail flex items-center gap-1.5 overflow-x-auto scroll-smooth py-1 px-2
                 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-700"
          style="scrollbar-width: thin;"
          @wheel.prevent="handleRailWheel"
        >
          <button
            v-for="(course, idx) in sortedCourses"
            :key="course.id"
            @click="selectCourse(course)"
            class="snap-start whitespace-nowrap rounded-lg px-4 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium transition-all duration-200 flex-shrink-0 flex items-center gap-2"
            :class="[
              selectedCourse?.id === course.id
                ? 'bg-teal-700 text-yellow-400 shadow-lg shadow-teal-500/25 scale-105'
                : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white hover:scale-105'
                  : 'text-slate-700 hover:bg-slate-100 hover:scale-105'
            ]"
          >
            <span
              class="flex items-center justify-center h-5 w-5 rounded-md text-[10px] font-bold flex-shrink-0"
              :class="[
                selectedCourse?.id === course.id
                  ? 'bg-yellow-400/20 text-yellow-300'
                  : isDarkMode
                    ? 'bg-slate-700/60 text-slate-400'
                    : 'bg-slate-200/70 text-slate-500'
              ]"
            >
              {{ idx + 1 }}
            </span>
            {{ course.title }}
          </button>
        </div>

        <div class="absolute right-0 w-6 h-full bg-gradient-to-l pointer-events-none z-10 transition-colors duration-300"
          :class="isDarkMode ? 'from-slate-900 to-transparent' : 'from-white to-transparent'"></div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="rounded-lg p-1.5 sm:p-2 transition-all duration-200"
          :class="[
            isDarkMode
              ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          ]"
          aria-label="Toggle theme"
        >
          <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- User Profile / Login -->
        <div v-if="isAuthenticated" class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center gap-1 sm:gap-2 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 transition-all duration-200"
            :class="[isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100']"
          >
            <div class="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs sm:text-sm font-semibold text-white">
              {{ userInitials }}
            </div>
            <span class="hidden sm:block text-sm font-medium transition-colors duration-300"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              {{ userName }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg"
              class="hidden sm:block h-4 w-4 transition-transform duration-200"
              :class="[isDarkMode ? 'text-slate-400' : 'text-slate-600', showUserMenu ? 'rotate-180' : '']"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="showUserMenu"
              class="absolute right-0 mt-2 w-56 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
              :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
              <div class="border-b px-4 py-3" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                <p class="text-sm font-medium" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ userName }}</p>
                <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">{{ userEmail }}</p>
                <p v-if="userRole" class="text-xs mt-1" :class="isDarkMode ? 'text-indigo-400' : 'text-indigo-600'">
                  Role: {{ userRole }}
                </p>
              </div>
              <div class="py-1">
                <button @click="goToDashboard" class="flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors duration-200"
                  :class="[isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-slate-100']">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Dashboard
                </button>
                <hr :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                <button @click="handleLogout"
                  class="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </transition>
        </div>

        <button v-else @click="goToLogin"
          class="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:scale-105 hover:shadow-xl">
          Login
        </button>

        <!-- ===== UNIQUE MOBILE COURSE HUB BUTTON ===== -->
        <button
          class="md:hidden relative group"
          @click.stop="toggleCourseHub"
          :aria-label="courseHubOpen ? 'Close course hub' : 'Open course hub'"
        >
          <div
            class="relative flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 transition-all duration-300"
            :class="[
              courseHubOpen
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/40'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-300 ring-1 ring-slate-700'
                  : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
            ]"
          >
            <!-- Compact current course number indicator -->
            <span
              class="flex items-center justify-center h-7 w-7 rounded-full text-[11px] font-extrabold flex-shrink-0 transition-transform group-hover:scale-110"
              :class="courseHubOpen
                ? 'bg-yellow-400 text-teal-900'
                : 'bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-500/30'"
            >
              {{ selectedCourseNumber }}
            </span>
            <span class="text-xs font-semibold max-w-[70px] truncate hidden xs:inline">
              {{ selectedCourse?.title || 'Courses' }}
            </span>
            <svg
              class="h-4 w-4 transition-transform duration-300 flex-shrink-0"
              :class="courseHubOpen ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <!-- pulse ring when courses available -->
          <span
            v-if="!courseHubOpen"
            class="absolute inset-0 rounded-full pointer-events-none animate-ping-slow bg-teal-500/20"
          ></span>
        </button>
      </div>
    </div>

    <!-- ===== UNIQUE MOBILE COURSE HUB – RADIAL ARC CAROUSEL ===== -->
    <transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-250 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="courseHubOpen"
        ref="mobileMenu"
        class="md:hidden relative overflow-hidden"
        :class="isDarkMode ? 'bg-slate-950' : 'bg-slate-50'"
        style="height: 78vh;"
      >
        <!-- Ambient gradient backdrop -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-teal-500/20 to-transparent blur-3xl"></div>
          <div class="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"></div>
          <!-- Subtle grid pattern -->
          <div
            class="absolute inset-0 opacity-[0.03]"
            :style="{
              backgroundImage: isDarkMode
                ? 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)'
                : 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }"
          ></div>
        </div>

        <!-- ===== HEADER: Search + Counter ===== -->
        <div class="relative px-4 pt-4 pb-2">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2"
                :class="isDarkMode ? 'text-teal-400' : 'text-teal-700'">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                Course Navigator
              </h3>
              <p class="text-[10px] mt-0.5" :class="isDarkMode ? 'text-slate-500' : 'text-slate-400'">
                {{ filteredMobileCourses.length }} of {{ sortedCourses.length }} courses
              </p>
            </div>
            <button
              @click="courseHubOpen = false"
              class="rounded-full p-1.5 transition-colors"
              :class="isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-200'"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Unique pill search -->
          <div class="relative">
            <input
              v-model="mobileCourseSearch"
              type="text"
              placeholder="Filter courses..."
              class="w-full rounded-full border-0 px-5 py-2.5 text-sm outline-none ring-1 transition-all"
              :class="isDarkMode
                ? 'bg-slate-900/80 text-white placeholder-slate-500 ring-slate-800 focus:ring-teal-500'
                : 'bg-white text-slate-900 placeholder-slate-400 ring-slate-200 focus:ring-teal-500'"
            />
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg class="h-4 w-4" :class="isDarkMode ? 'text-slate-500' : 'text-slate-400'"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- ===== RADIAL ARC CAROUSEL ===== -->
        <div class="relative flex-1 h-[calc(78vh-140px)]">
          <!-- Empty state -->
          <div v-if="filteredMobileCourses.length === 0"
            class="absolute inset-0 flex flex-col items-center justify-center">
            <div class="text-5xl mb-3">🔭</div>
            <p class="text-sm font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              No courses found
            </p>
            <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-500' : 'text-slate-400'">
              Try another keyword
            </p>
          </div>

          <!-- Arc Carousel -->
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <!-- Center glow spotlight -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div class="w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/25 to-purple-500/15 blur-3xl"></div>
            </div>

            <!-- Arc cards container -->
            <div class="relative w-full h-full" ref="arcContainer">
              <button
                v-for="(course, index) in filteredMobileCourses"
                :key="course.id"
                @click="onArcClick(index, course)"
                class="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
                :style="getArcStyle(index, filteredMobileCourses.length)"
              >
                <!-- Card body -->
                <div
                  class="relative flex flex-col items-center justify-center rounded-2xl px-3 py-3 transition-all duration-300"
                  :class="[
                    isArcActive(index, filteredMobileCourses.length)
                      ? 'bg-gradient-to-br from-teal-600 to-teal-700 text-yellow-400 ring-2 ring-yellow-400/50 shadow-2xl shadow-teal-500/40'
                      : isDarkMode
                        ? 'bg-slate-900/90 text-slate-300 ring-1 ring-slate-800 shadow-lg shadow-black/30'
                        : 'bg-white text-slate-700 ring-1 ring-slate-200 shadow-lg shadow-slate-200/50'
                  ]"
                  style="min-width: 90px;"
                >
                  <!-- Sequential number badge -->
                  <span
                    class="flex items-center justify-center w-10 h-10 rounded-xl text-sm font-extrabold mb-1.5 transition-transform"
                    :class="[
                      isArcActive(index, filteredMobileCourses.length)
                        ? 'bg-yellow-400 text-teal-900 shadow-md shadow-yellow-500/40 scale-110'
                        : isDarkMode
                          ? 'bg-teal-600/20 text-teal-400'
                          : 'bg-teal-100 text-teal-700'
                    ]"
                  >
                    {{ index + 1 }}
                  </span>
                  <!-- Title -->
                  <span class="text-[10px] font-semibold text-center leading-tight line-clamp-2 max-w-[82px]">
                    {{ course.title }}
                  </span>

                  <!-- Top-corner active dot -->
                  <span
                    v-if="isArcActive(index, filteredMobileCourses.length)"
                    class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400 ring-2 ring-white dark:ring-slate-900 shadow-md"
                  ></span>
                </div>
                <!-- Active ring pulse -->
                <span
                  v-if="isArcActive(index, filteredMobileCourses.length)"
                  class="absolute inset-0 rounded-2xl ring-2 ring-yellow-400/60 animate-pulse-ring pointer-events-none"
                ></span>
              </button>
            </div>

            <!-- Left / Right arc controls -->
            <button
              @click="rotateArc(-1)"
              :disabled="filteredMobileCourses.length <= 1"
              class="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              :class="isDarkMode
                ? 'bg-slate-800 text-teal-400 ring-1 ring-slate-700'
                : 'bg-white text-teal-700 ring-1 ring-slate-200'"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              @click="rotateArc(1)"
              :disabled="filteredMobileCourses.length <= 1"
              class="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              :class="isDarkMode
                ? 'bg-slate-800 text-teal-400 ring-1 ring-slate-700'
                : 'bg-white text-teal-700 ring-1 ring-slate-200'"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            <!-- Bottom hint: dot indicators -->
            <div
              v-if="filteredMobileCourses.length > 1 && filteredMobileCourses.length <= 12"
              class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
            >
              <span
                v-for="(_, i) in filteredMobileCourses"
                :key="i"
                class="rounded-full transition-all duration-300"
                :class="[
                  i === arcRotation
                    ? 'w-5 h-1.5 bg-teal-500'
                    : isDarkMode
                      ? 'w-1.5 h-1.5 bg-slate-700'
                      : 'w-1.5 h-1.5 bg-slate-300'
                ]"
              ></span>
            </div>
          </div>
        </div>

        <!-- ===== BOTTOM: Selected course details + Jump button ===== -->
        <div
          v-if="selectedCourse"
          class="absolute bottom-0 left-0 right-0 px-4 py-3 border-t backdrop-blur-lg"
          :class="isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex items-center justify-center h-11 w-11 rounded-xl text-base font-extrabold flex-shrink-0 shadow-md"
              :class="isDarkMode
                ? 'bg-gradient-to-br from-teal-600 to-teal-700 text-yellow-400 shadow-teal-500/30'
                : 'bg-gradient-to-br from-teal-600 to-teal-700 text-yellow-400 shadow-teal-500/30'"
            >
              {{ selectedCourseNumber }}
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                :class="isDarkMode ? 'text-teal-400' : 'text-teal-700'">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                Now Reading
              </p>
              <p class="text-sm font-bold truncate"
                :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ selectedCourse.title }}
              </p>
            </div>
            <button
              @click="courseHubOpen = false"
              class="rounded-xl px-4 py-2.5 text-xs font-bold bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/30 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1"
            >
              Go
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { getAuth, logout as authLogout, clearAuth } from '@/utils/auth';

const props = defineProps({
  courses: Array,
  selectedCourse: Object,
  isDarkMode: Boolean,
  loading: Boolean,
});

const emit = defineEmits(['select-course', 'update:isDarkMode']);

// ===== SORTED COURSES BY ID (ASCENDING) =====
const sortedCourses = computed(() => {
  if (!props.courses || !Array.isArray(props.courses)) return [];
  return [...props.courses].sort((a, b) => {
    const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
    const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
    return idA - idB;
  });
});

// ===== SEQUENTIAL NUMBER FOR SELECTED COURSE =====
const selectedCourseNumber = computed(() => {
  if (!props.selectedCourse) return '—';
  const idx = sortedCourses.value.findIndex(c => c.id === props.selectedCourse.id);
  return idx >= 0 ? idx + 1 : '—';
});

// ===== MOBILE SEARCH FILTER =====
const mobileCourseSearch = ref('');
const filteredMobileCourses = computed(() => {
  const q = mobileCourseSearch.value.trim().toLowerCase();
  if (!q) return sortedCourses.value;
  return sortedCourses.value.filter(c =>
    c.title?.toLowerCase().includes(q) || String(c.id).includes(q)
  );
});

// ===== ARC CAROUSEL STATE =====
const courseHubOpen = ref(false);
const arcRotation = ref(0);

// Rotate the arc
const rotateArc = (direction) => {
  const total = filteredMobileCourses.value.length;
  if (total <= 1) return;
  arcRotation.value = (arcRotation.value + direction + total) % total;
};

// Reset when search changes
watch(mobileCourseSearch, () => {
  arcRotation.value = 0;
});

// Reset when hub closes
watch(courseHubOpen, (open) => {
  if (!open) {
    mobileCourseSearch.value = '';
    arcRotation.value = 0;
  }
});

// Sync arc rotation to selected course when opening
watch(courseHubOpen, (open) => {
  if (open && props.selectedCourse) {
    const idx = sortedCourses.value.findIndex(c => c.id === props.selectedCourse.id);
    if (idx >= 0) {
      arcRotation.value = idx;
    }
  }
});

// Compute relative index in the rotated arc
const getRelativeIndex = (absoluteIndex, total) => {
  if (total === 0) return 0;
  const centerOffset = Math.floor(total / 2);
  const rel = (absoluteIndex - arcRotation.value + total) % total;
  return rel - centerOffset;
};

// Is this card the center/active one?
const isArcActive = (absoluteIndex, total) => {
  return getRelativeIndex(absoluteIndex, total) === 0;
};

// ===== ARC STYLE GENERATOR =====
const getArcStyle = (absoluteIndex, total) => {
  const rel = getRelativeIndex(absoluteIndex, total);
  const absRel = Math.abs(rel);

  const xStep = 78;
  const x = rel * xStep;

  // Arc curvature
  const radius = 420;
  const y = radius - Math.sqrt(Math.max(0, radius * radius - x * x)) + 20;

  // Rotation
  const rotation = rel * 6;

  // Scale
  const scale = Math.max(0.72, 1 - absRel * 0.08);

  // Opacity
  const opacity = absRel > 4 ? 0.15 : Math.max(0.35, 1 - absRel * 0.12);

  // Z-index
  const zIndex = 100 - absRel;

  // Visibility
  const visibility = absRel > 6 ? 'hidden' : 'visible';

  return {
    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(${scale})`,
    zIndex,
    opacity,
    visibility,
    transformOrigin: 'center center',
  };
};

// Arc card click: if not center, rotate to it; if center, select it
const onArcClick = (index, course) => {
  const rel = getRelativeIndex(index, filteredMobileCourses.value.length);
  if (rel === 0) {
    // Center card - select and close
    mobileSelectCourse(course);
  } else {
    // Rotate so this card becomes center
    arcRotation.value = index;
  }
};

// ===== AUTH =====
const isAuthenticated = ref(false);
const userName = ref('Guest User');
const userEmail = ref('guest@example.com');
const userRole = ref(null);
const userInitials = computed(() => {
  if (userName.value === 'Guest User') return 'GU';
  return userName.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
});

// UI state
const showUserMenu = ref(false);
const desktopRail = ref(null);
const navRoot = ref(null);
const mobileMenu = ref(null);

// Load auth
const loadAuthData = () => {
  const { token, user } = getAuth();
  if (token && user) {
    isAuthenticated.value = true;
    userName.value = user.first_name || 'User';
    userEmail.value = user.email || 'user@example.com';
    userRole.value = user.role || user.roles?.[0] || null;
  } else {
    isAuthenticated.value = false;
    userName.value = 'Guest User';
    userEmail.value = 'guest@example.com';
    userRole.value = null;
  }
};

const handleStorageChange = (event) => {
  if (event.key === 'token' || event.key === 'user' || event.key === null) {
    loadAuthData();
  }
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

// Toggle course hub
const toggleCourseHub = () => {
  courseHubOpen.value = !courseHubOpen.value;
  showUserMenu.value = false;
};

// ===== CLOSE ON OUTSIDE CLICK =====
const handleClickOutside = (event) => {
  const userMenu = event.target.closest('.relative');
  if (!userMenu) showUserMenu.value = false;

  if (courseHubOpen.value && navRoot.value && !navRoot.value.contains(event.target)) {
    courseHubOpen.value = false;
  }
};

// ===== Desktop rail wheel =====
const handleRailWheel = (e) => {
  if (!desktopRail.value) return;
  if (e.deltaY !== 0 && !e.shiftKey) {
    e.preventDefault();
    desktopRail.value.scrollLeft += e.deltaY;
  }
};

// Navigation
const goHome = () => { window.location.href = '/cheatsheet'; };
const goToLogin = () => { window.location.href = '/login'; };
const goToDashboard = () => { window.location.href = '/student/dashboard'; showUserMenu.value = false; };

// Course selection
const selectCourse = (course) => emit('select-course', course);
const mobileSelectCourse = (course) => {
  emit('select-course', course);
  courseHubOpen.value = false;
};

// Theme
const toggleTheme = () => emit('update:isDarkMode', !props.isDarkMode);

// Logout
const handleLogout = () => {
  const darkMode = props.isDarkMode ? 'dark' : 'light';
  localStorage.setItem('darkMode', darkMode);
  authLogout();
  isAuthenticated.value = false;
  userName.value = 'Guest User';
  userEmail.value = 'guest@example.com';
  userRole.value = null;
  showUserMenu.value = false;
  courseHubOpen.value = false;
};

// Auto-scroll desktop rail
watch(
  () => props.selectedCourse,
  (newCourse) => {
    if (!newCourse || !desktopRail.value) return;
    nextTick(() => {
      const selectedBtn = desktopRail.value.querySelector('.bg-teal-700');
      if (selectedBtn) {
        selectedBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  },
  { immediate: false }
);

onMounted(() => {
  loadAuthData();
  document.addEventListener('click', handleClickOutside, true);
  window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
  window.removeEventListener('storage', handleStorageChange);
});
</script>

<style scoped>
/* ===== Desktop rail scrollbar ===== */
.course-rail::-webkit-scrollbar { height: 4px; }
.course-rail::-webkit-scrollbar-track { background: transparent; }
.course-rail::-webkit-scrollbar-thumb {
  background: #a5b4fc;
  border-radius: 20px;
}
.dark .course-rail::-webkit-scrollbar-thumb { background: #4f46e5; }
.course-rail {
  scrollbar-width: thin;
  scrollbar-color: #a5b4fc transparent;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
.dark .course-rail { scrollbar-color: #4f46e5 transparent; }

@media (max-width: 768px) {
  .course-rail { scrollbar-width: none; }
  .course-rail::-webkit-scrollbar { display: none; }
}

/* ===== Animations ===== */
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.5; }
  70% { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1.3); opacity: 0; }
}
.animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }

@keyframes pulse-ring {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.06); }
}
.animate-pulse-ring { animation: pulse-ring 1.8s ease-in-out infinite; }

/* Line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Extra small breakpoint */
@media (max-width: 380px) {
  .xs\:inline { display: none !important; }
}
</style>