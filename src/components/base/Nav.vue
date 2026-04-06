<template>
  <nav class="bg-[#251e3e] dark:bg-[#451e3e] shadow-sm fixed w-full z-40">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="shrink-0 flex items-center">
            <img class="h-12 w-12 rounded-full" src="../../assets/images/ES Logo New.jpg" alt="Educationaal Society" />
            <div class="hidden md:block">
              <span class="ml-2 text-amber-600 dark:text-amber-400 font-semibold text-lg">Educational</span>
              <span class="ml-1 text-emerald-600 dark:text-emerald-400 font-semibold text-lg">Society</span>
            </div>
          </router-link>
        </div>

        <!-- Desktop nav links -->
        <div class="hidden lg:flex items-center gap-8">
          <template v-for="link in navLinks" :key="link.name">
            <!-- Simple Link -->
            <router-link v-if="!link.children" :to="link.path"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200" :class="{
                'text-[#f37735] border-b-2 border-[#f37735]': $route.path === link.path,
                'text-[#29a8ab] hover:text-[#d2e7ff]': $route.path !== link.path
              }">
              {{ link.name }}
            </router-link>

            <!-- Dropdown -->
            <div v-else class="relative group">
              <button class="px-4 py-2 rounded-full text-sm font-medium text-[#29a8ab] hover:text-[#d2e7ff]">
                {{ link.name }}
                <svg
                  class="inline-block ml-1 h-4 w-4 transform transition-transform duration-400 group-hover:rotate-90"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <div
                class="absolute hidden group-hover:block mt-0 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 z-50">
                <router-link v-for="child in link.children" :key="child.name" :to="child.path" :class="[
                  'block px-4 py-2 text-sm rounded-md transition',
                  $route.path === child.path
                    ? 'bg-green-200 dark:bg-green-600 text-black dark:text-white font-medium'
                    : 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                ]">
                  {{ child.name }}
                </router-link>
              </div>
            </div>
          </template>
        </div>

        <!-- Right side desktop: dark mode + auth dropdown -->
        <div class="hidden lg:flex items-center space-x-4">
          <button @click="toggleDarkMode"
            class="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none">
            <svg v-if="darkMode" class="h-5 w-5 text-yellow-400 hover:text-amber-700" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
              <path class="text-yellow-200 animate-pulse" d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor" />
            </svg>

            <svg v-else class="h-5 w-5 text-white dark:text-gray-200 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <!-- Dashboard Button for Logged-in Users -->
          <div v-if="isLoggedIn" class="relative" @click.stop="toggleAuthDropdown">
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              Dashboard
              <svg class="ml-2 -mr-1 h-4 w-4 transform transition-transform duration-300" :class="{'rotate-90': authDropdownOpen}" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>

            <div v-show="authDropdownOpen"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#463a69] dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">

              <!-- User Info -->
              <div class="px-4 py-3 border-b border-gray-500 dark:border-gray-600">
                <p class="text-sm text-gray-300">Welcome,</p>
                <p class="text-base font-semibold text-white capitalize">{{ userName }}</p>
                <p class="text-xs text-gray-400 capitalize">{{ userRole }}</p>
              </div>

              <router-link :to="dashboardPath" :class="[
                'block px-4 py-2 text-sm rounded-md transition',
                'text-[#ffcdb2] dark:text-gray-200 hover:bg-[#003153] dark:hover:bg-gray-600'
              ]">
                <i class="fa-solid fa-chart-line mr-2"></i>Go to Dashboard
              </router-link>

              <router-link to="/student/profile" :class="[
                'block px-4 py-2 text-sm rounded-md transition',
                'text-[#ffcdb2] dark:text-gray-200 hover:bg-[#003153] dark:hover:bg-gray-600'
              ]">
                <i class="fa-solid fa-user mr-2"></i>Profile
              </router-link>

              <button @click="handleLogout" class="w-full text-left block px-4 py-2 text-sm rounded-md transition text-red-400 dark:text-red-300 hover:bg-red-900/20 dark:hover:bg-red-900/30">
                <i class="fa-solid fa-sign-out-alt mr-2"></i>Logout
              </button>
            </div>
          </div>

          <!-- Get Started Button for Non-logged-in Users -->
          <div v-else class="relative" @click.stop="toggleAuthDropdown">
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Get Started
              <svg class="ml-2 -mr-1 h-4 w-4 transform transition-transform duration-300" :class="{'rotate-90': authDropdownOpen}" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>

            <div v-show="authDropdownOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#463a69] dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">

              <router-link to="/signup" :class="[
                'block px-4 py-2 text-sm rounded-md transition',
                $route.path === '/signup'
                  ? 'bg-green-300 text-green-700 font-medium'
                  : 'text-[#ffcdb2] dark:text-gray-200 hover:bg-[#003153] dark:hover:bg-gray-600'
              ]">
                Sign Up
              </router-link>

              <router-link to="/login" :class="[
                'block px-4 py-2 text-sm rounded-md transition',
                $route.path === '/login'
                  ? 'bg-green-300 text-green-700 font-medium'
                  : 'text-[#ffcdb2] dark:text-gray-200 hover:bg-[#003153] dark:hover:bg-gray-600'
              ]">
                Login
              </router-link>
            </div>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden flex items-center">
          <button @click="toggleMobileMenu"
            class="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none">
            <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu dropdown -->
    <div class="lg:hidden bg-[#003153] dark:bg-gray-800" :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }">
      <!-- Nav Links -->
      <div class="pt-2 pb-3 space-y-1">
        <template v-for="link in navLinks" :key="link.name">
          <!-- Regular link -->
          <router-link v-if="!link.children" :to="link.path"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium" :class="{
              'bg-blue-50 border-blue-500 text-blue-700 dark:bg-gray-700 dark:text-white': $route.path === link.path,
              'border-transparent text-[#ffc43d] hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-[#ffc43d] dark:hover:bg-gray-600 dark:hover:text-white': $route.path !== link.path
            }">
            {{ link.name }}

          </router-link>

          <!-- Dropdown for Resources (Mobile View) -->
          <div v-else>
            <button @click="link.open = !link.open"
              class="w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium text-[#ffc43d] hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-[#ffc43d] dark:hover:bg-gray-600 dark:hover:text-white">
              {{ link.name }}
              <svg class="inline-block ml-1 h-4 w-4 transform transition-transform duration-300"
                :class="{ 'rotate-90': link.open }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>

            <div v-show="link.open" class="pl-6">
              <router-link v-for="child in link.children" :key="child.name" :to="child.path" :class="[
                'block py-1 px-2 text-sm rounded-md transition',
                $route.path === child.path
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'text-green-700 dark:text-[#00dc4c] hover:bg-green-50'
              ]">
                {{ child.name }}
              </router-link>
            </div>
          </div>
        </template>
      </div>

      <!-- Divider -->
      <hr class="border-gray-300 dark:border-gray-600 my-2" />

      <!-- Dark mode toggle -->
      <div class="px-4 pb-2 flex items-center justify-between">
        <span class="text-sm text-[#ff8100] dark:text-[#ff8100]">{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        <button @click="toggleDarkMode"
          class="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none">
          <svg v-if="darkMode" class="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
            <path class="text-yellow-200 animate-pulse" d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor" />
          </svg>
          <svg v-else class="h-5 w-5 text-white dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>
      </div>

      <!-- Auth Links (Mobile View) -->
      <div v-if="isLoggedIn" class="px-4 pb-0 space-y-1 border-t border-gray-700 dark:border-gray-600 pt-2">
        <div class="px-4 py-2 bg-gray-700 dark:bg-gray-800 rounded-md mb-2">
          <p class="text-xs text-gray-400">Welcome,</p>
          <p class="text-sm font-semibold text-white capitalize">{{ userName }}</p>
          <p class="text-xs text-gray-500 capitalize">{{ userRole }}</p>
        </div>

        <router-link :to="dashboardPath" :class="[
          'flex items-center w-full px-4 py-2 text-sm rounded-md transition',
          'text-[#b6a2b2] dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-600'
        ]">
          <i class="fa-solid fa-chart-line mr-2"></i>Dashboard
        </router-link>

        <router-link to="/student/profile" :class="[
          'flex items-center w-full px-4 py-2 text-sm rounded-md transition',
          'text-[#b6a2b2] dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-600'
        ]">
          <i class="fa-solid fa-user mr-2"></i>Profile
        </router-link>

        <button @click="handleLogout" class="flex items-center w-full px-4 py-2 text-sm rounded-md transition text-red-400 dark:text-red-300 hover:bg-red-900/20 dark:hover:bg-red-900/30">
          <i class="fa-solid fa-sign-out-alt mr-2"></i>Logout
        </button>
      </div>

      <div v-else class="px-4 pb-0 space-y-1 border-t border-gray-700 dark:border-gray-600 pt-2">
        <router-link to="/signup" :class="[
          'block w-full px-4 py-2 text-sm rounded-md transition',
          $route.path === '/signup'
            ? 'bg-green-200 text-green-700 font-medium'
            : 'text-[#b6a2b2] dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-600'
        ]">
          Sign Up
        </router-link>

        <router-link to="/login" :class="[
          'block w-full px-4 py-2 text-sm rounded-md transition',
          $route.path === '/login'
            ? 'bg-green-200 text-green-700 font-medium'
            : 'text-[#b6a2b2] dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-600'
        ]">
          Login
        </router-link>
      </div>

      <!-- Mobile Menu Close Button - Centered with Smooth Animation -->
      <div class="flex justify-center pt-0 pb-1">
        <button @click="toggleMobileMenu"
          class="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close menu">
          <svg class="h-4 w-4 text-gray-500 dark:text-gray-400 transform transition-transform duration-300"
            :class="{ 'rotate-180': mobileMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAuth, logout } from '../../utils/auth.js'

const darkMode = ref(false)
const authDropdownOpen = ref(false)
const mobileMenuOpen = ref(false)
const route = useRoute()
const isLoggedIn = ref(false)
const userRole = ref(null)
const userName = ref('')

const navLinks = ref([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  {
    name: 'Resources',
    open: false, // used in mobile
    children: [
      { name: 'Notes', path: '/resource/notes' },
      { name: 'YouTube', path: '/resource/youtube' },
      { name: 'Books', path: '/resource/books' }
    ]
  },
  { name: 'Courses', path: '/courses' },
  { name: 'Support', path: '/contact' }
])

// Determine dashboard path based on user role
const dashboardPath = computed(() => {
  if (userRole.value === 'admin') {
    return '/admin/dashboard'
  } else if (userRole.value === 'owner') {
    return '/owner/dashboard'
  } else {
    return '/student/dashboard'
  }
})

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
  localStorage.setItem('darkMode', darkMode.value)
}

const toggleAuthDropdown = () => {
  authDropdownOpen.value = !authDropdownOpen.value
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    authDropdownOpen.value = false
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    authDropdownOpen.value = false
  }
}

const handleLogout = () => {
  logout()
}

const checkAuthStatus = () => {
  const { token, user } = getAuth()
  if (token && user) {
    isLoggedIn.value = true
    userRole.value = user.role || user.user_role || 'student'
    userName.value = user.username || user.name || 'User'
  } else {
    isLoggedIn.value = false
    userRole.value = null
    userName.value = ''
  }
}

onMounted(() => {
  // Check localStorage for saved preference
  const savedDarkMode = localStorage.getItem('darkMode')
  
  if (savedDarkMode === 'true') {
    darkMode.value = true
    document.documentElement.classList.add('dark')
  } else if (savedDarkMode === 'false') {
    darkMode.value = false
    document.documentElement.classList.remove('dark')
  } else {
    // Optional: Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    darkMode.value = prefersDark
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }

  document.addEventListener('click', handleClickOutside)
  
  // Check auth status
  checkAuthStatus()
})
</script>
