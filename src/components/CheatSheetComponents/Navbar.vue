<template>
  <nav
    class="sticky top-0 z-50 border-b transition-colors duration-300"
    :class="[
      isDarkMode
        ? 'border-slate-700 bg-slate-900'
        : 'border-slate-200 bg-white'
    ]"
  >
    <div class="mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
      <!-- Logo -->
      <div class="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer" @click="goHome">
        <div
          class="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm sm:text-lg font-bold text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
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

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1 lg:gap-2 overflow-x-auto max-w-[50%]">
        <button
          v-for="course in courses"
          :key="course.id"
          @click="selectCourse(course)"
          class="whitespace-nowrap rounded-lg px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium transition-all duration-200"
          :class="[
            selectedCourse?.id === course.id
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : isDarkMode
                ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'text-slate-700 hover:bg-slate-100'
          ]"
        >
          {{ course.title }}
        </button>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-1 sm:gap-2">
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

        <!-- User Profile / Login Button -->
        <div v-if="isAuthenticated" class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center gap-1 sm:gap-2 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 transition-all duration-200"
            :class="[
              isDarkMode
                ? 'hover:bg-slate-800'
                : 'hover:bg-slate-100'
            ]"
          >
            <div class="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs sm:text-sm font-semibold text-white">
              {{ userInitials }}
            </div>
            <span
              class="hidden sm:block text-sm font-medium transition-colors duration-300"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
            >
              {{ userName }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="hidden sm:block h-4 w-4 transition-transform duration-200"
              :class="[
                isDarkMode ? 'text-slate-400' : 'text-slate-600',
                showUserMenu ? 'rotate-180' : ''
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- User Dropdown -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-56 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
              :class="isDarkMode ? 'bg-slate-800' : 'bg-white'"
            >
              <div class="border-b px-4 py-3" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                <p class="text-sm font-medium" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ userName }}
                </p>
                <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  {{ userEmail }}
                </p>
                <p v-if="userRole" class="text-xs mt-1" :class="isDarkMode ? 'text-indigo-400' : 'text-indigo-600'">
                  Role: {{ userRole }}
                </p>
              </div>
              <div class="py-1">
                <button @click="goToProfile" class="flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors duration-200" :class="[
                  isDarkMode
                    ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                ]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                
                <hr :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                <button
                  @click="handleLogout"
                  class="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Login Button (when not authenticated) -->
        <button
          v-else
          @click="goToLogin"
          class="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:scale-105 hover:shadow-xl"
        >
          Login
        </button>

        <!-- Mobile Menu Button -->
        <button
          class="rounded-lg p-1.5 sm:p-2 transition-colors duration-200 md:hidden"
          :class="[
            isDarkMode
              ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
              : 'text-slate-600 hover:bg-slate-100'
          ]"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="border-t md:hidden max-h-[60vh] overflow-y-auto"
        :class="isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'"
      >
        <div class="p-3 space-y-1">
          <button
            v-for="course in courses"
            :key="course.id"
            @click="mobileSelectCourse(course)"
            class="block w-full rounded-lg px-4 py-3 text-left text-sm transition-colors duration-200"
            :class="[
              selectedCourse?.id === course.id
                ? 'bg-indigo-600 text-white'
                : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100'
            ]"
          >
            {{ course.title }}
          </button>
          
          <!-- Mobile Login/User Info
          <div class="border-t pt-2 mt-2" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
            <div v-if="isAuthenticated" class="px-4 py-2">
              <p class="text-sm font-medium" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
                {{ userName }}
              </p>
              <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                {{ userEmail }}
              </p>
              <button
                @click="handleLogout"
                class="mt-2 w-full rounded-lg px-4 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Logout
              </button>
            </div>
            <button
              v-else
              @click="goToLogin"
              class="w-full rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            >
              Login
            </button>
          </div> -->
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { getAuth, logout as authLogout, clearAuth } from '@/utils/auth';

const props = defineProps({
  courses: Array,
  selectedCourse: Object,
  isDarkMode: Boolean,
  loading: Boolean,
});

const emit = defineEmits(['select-course', 'update:isDarkMode']);

// Authentication state
const isAuthenticated = ref(false);
const userName = ref('Guest User');
const userEmail = ref('guest@example.com');
const userRole = ref(null);
const userInitials = computed(() => {
  if (userName.value === 'Guest User') {
    return 'GU';
  }
  return userName.value
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

// UI state
const showUserMenu = ref(false);
const mobileMenuOpen = ref(false);

// Load auth data
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

// Watch for storage changes (if user logs in/out in another tab)
const handleStorageChange = (event) => {
  if (event.key === 'token' || event.key === 'user' || event.key === null) {
    loadAuthData();
  }
};

// Toggle user menu
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  const userMenu = event.target.closest('.relative');
  if (!userMenu) {
    showUserMenu.value = false;
  }
};

// Navigation functions
const goHome = () => {
  window.location.href = '/cheatsheet';
};

const goToLogin = () => {
  window.location.href = '/login';
};

const goToProfile = () => {
  window.location.href = '/student/profile';
  showUserMenu.value = false;
};

const goToSettings = () => {
  window.location.href = '/settings';
  showUserMenu.value = false;
};

// Course selection
const selectCourse = (course) => {
  emit('select-course', course);
};

const mobileSelectCourse = (course) => {
  emit('select-course', course);
  mobileMenuOpen.value = false;
};

// Theme toggle
const toggleTheme = () => {
  emit('update:isDarkMode', !props.isDarkMode);
};

// Logout using auth utility
const handleLogout = () => {
  // Save dark mode before logout
  const darkMode = props.isDarkMode ? 'dark' : 'light';
  localStorage.setItem('darkMode', darkMode);
  
  // Use the auth logout function
  authLogout();
  
  // Update local state
  isAuthenticated.value = false;
  userName.value = 'Guest User';
  userEmail.value = 'guest@example.com';
  userRole.value = null;
  showUserMenu.value = false;
  mobileMenuOpen.value = false;
};

onMounted(() => {
  loadAuthData();
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('storage', handleStorageChange);
});
</script>