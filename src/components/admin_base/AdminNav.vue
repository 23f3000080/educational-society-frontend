<template>
  <!-- Desktop Navbar -->
  <nav class="bg-black dark:bg-gray-900 shadow-lg dark:shadow-gray-900/30 border-b border-yellow-300 dark:border-red-500/50 sticky top-0 z-50 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Desktop Navigation -->
        <div class="flex items-center">
          <!-- Logo with Image -->
          <router-link to="/admin/dashboard" class="flex items-center space-x-3">
            <!-- Logo Image -->
            <div class="flex items-center justify-center">
              <img 
                src="../../assets/images/ES Logo New.jpg"
                alt="Educational Society Logo"
                class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
              />
              <!-- Institute name -->
              <div class="hidden md:block">
                <span class="ml-2 text-amber-600 dark:text-amber-400 font-semibold text-lg">Educational</span>
                <span class="ml-1 text-emerald-600 dark:text-emerald-400 font-semibold text-lg">Society</span>
              </div>
              <!-- Admin Badge -->
              <span class="ml-3 hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                Admin
              </span>
            </div>
          </router-link>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex md:space-x-1 md:ml-10 lg:ml-40" data-desktop-nav>
            <component
              v-for="item in navItems"
              :key="item.name"
              :is="item.children ? 'button' : 'router-link'"
              :to="item.children ? undefined : item.path"
              type="button"
              @click="item.children ? toggleDesktopGroup(item.name) : null"
              :class="[
                'relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 group min-w-[90px] justify-center',
                isNavItemActive(item)
                  ? 'text-white bg-gradient-to-r from-indigo-600 via-indigo-400 to-purple-600 dark:from-indigo-500 dark:via-indigo-400 dark:to-purple-500 shadow-md'
                  : 'text-gray-400 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
            >
              <!-- Dashboard Icon -->
              <svg v-if="item.icon === 'dashboard'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>

              <svg v-else-if="item.icon === 'users'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>

              <svg v-else-if="item.icon === 'courses'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>

              <svg v-else-if="item.icon === 'assignments'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>

              <svg v-else-if="item.icon === 'tests'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <svg v-else-if="item.icon === 'settings'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <svg v-else-if="item.icon === 'reports'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>

              <svg v-else-if="item.icon === 'analytics'" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>

              <span class="whitespace-nowrap">{{ item.name }}</span>

              <svg v-if="item.children" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>

              <!-- Badge -->
              <span v-if="item.badge"
                class="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 via-yellow-500 to-pink-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-sm dark:shadow-gray-900">
                {{ item.badge }}
              </span>

              <!-- Hover underline effect -->
              <span v-if="!isNavItemActive(item)"
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:opacity-100 opacity-0"></span>

              <!-- Active underline -->
              <span v-if="isNavItemActive(item)"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300"></span>

              <div
                v-if="item.children && openDesktopGroup === item.name"
                class="absolute top-full mt-2 left-1/2 -translate-x-1/2 min-w-[190px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl p-2 z-50"
              >
                <router-link
                  v-for="sub in item.children"
                  :key="sub.name"
                  :to="sub.path"
                  @click="openDesktopGroup = null"
                  :class="[
                    'block rounded-lg px-3 py-2 text-sm text-left',
                    isActive(sub.path)
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  ]"
                >
                  {{ sub.name }}
                </router-link>
              </div>
            </component>
          </div>
        </div>

        <!-- Right Section: User Profile & Mobile Menu Button -->
        <div class="flex items-center space-x-2">
          <!-- Dark Mode Toggle -->
          <button @click="toggleDarkMode"
            class="p-2 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <svg v-if="darkMode" class="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
            </svg>
            <svg v-else class="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          <!-- Notification Bell Button -->
          <div class="relative">
            <button @click="toggleNotifications" ref="notificationButton"
              class="relative p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>

              <!-- Notification Badge -->
              <span v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-gradient-to-bl from-red-500 via-yellow-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm dark:shadow-gray-900">
                {{ unreadCount }}
              </span>
            </button>
          </div>

          <!-- Desktop Profile Dropdown -->
          <div class="hidden md:flex items-center">
            <div class="relative">
              <button @click="toggleProfileDropdown" 
                      ref="profileButton"
                      class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                <!-- Profile Avatar with Status Indicator -->
                <div class="relative">
                  <div class="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                    <span class="text-white font-medium text-sm">{{ userInitials }}</span>
                  </div>
                  <!-- Online Status Indicator -->
                  <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-100 shadow-sm"></div>
                </div>
                <div class="text-left hidden lg:block">
                  <p class="text-sm font-medium text-gray-200 dark:text-white">{{ userName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
                <!-- Chevron Down Icon -->
                <svg :class="[
                  'w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200',
                  showProfileDropdown ? 'rotate-90' : ''
                ]" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Profile Dropdown Menu -->
              <div v-show="showProfileDropdown" ref="profileDropdown"
                class="absolute right-0 mt-2 w-64 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ userName }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ userEmail }}</p>
                  <p class="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">Administrator</p>
                </div>
                <div class="py-2">
                  <router-link v-for="item in profileMenu" :key="item.name" :to="item.path"
                    @click="closeProfileDropdown"
                    class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 group rounded-lg mx-2">
                    <!-- Profile Icon -->
                    <svg v-if="item.name === 'Profile'" class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>

                    <svg v-else-if="item.name === 'Settings'" class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    <svg v-else-if="item.name === 'Help Center'" class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <svg v-else-if="item.name === 'System Logs'" class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>

                    <svg v-else-if="item.name === 'Audit Trail'" class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>

                    <span>{{ item.name }}</span>

                    <!-- Arrow Right Icon -->
                    <svg class="w-4 h-4 ml-auto text-gray-300 dark:text-gray-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </router-link>
                </div>
                <div class="border-t border-gray-100 dark:border-gray-800 pt-2">
                  <button @click="logout"
                    class="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group rounded-lg mx-2">
                    <!-- Logout Icon -->
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>

                    <!-- Arrow Right Icon -->
                    <svg class="w-4 h-4 ml-auto text-gray-300 dark:text-gray-600 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none">
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in" 
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4">
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
        <div class="px-4 py-3 space-y-1">
          <!-- Mobile Navigation Links -->
          <div v-for="item in navItems" :key="item.name">
          <component
            :is="item.children ? 'button' : 'router-link'"
            :to="item.children ? undefined : item.path"
            type="button"
            @click="item.children ? toggleMobileGroup(item.name) : closeMobileMenu()"
            :class="[
              'w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
              isNavItemActive(item)
                ? 'bg-gradient-to-r from-indigo-50 via-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-2'
            ]"
          >
            <div class="flex items-center space-x-3">
              <!-- Dashboard Icon -->
              <svg v-if="item.icon === 'dashboard'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>

              <svg v-else-if="item.icon === 'users'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>

              <svg v-else-if="item.icon === 'courses'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>

              <svg v-else-if="item.icon === 'assignments'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>

              <svg v-else-if="item.icon === 'tests'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <svg v-else-if="item.icon === 'settings'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <svg v-else-if="item.icon === 'reports'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>

              <svg v-else-if="item.icon === 'analytics'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>

              <span>{{ item.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span v-if="item.badge"
                class="bg-gradient-to-br from-red-500 via-yellow-500 to-pink-500 text-white text-xs font-semibold rounded-full h-6 w-6 flex items-center justify-center shadow-sm">
                {{ item.badge }}
              </span>
              <svg v-if="!item.children" class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg v-else class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </component>

          <div v-if="item.children && openMobileGroup === item.name" class="ml-8 mt-1 space-y-1">
            <router-link
              v-for="sub in item.children"
              :key="sub.name"
              :to="sub.path"
              @click="closeMobileMenu"
              :class="[
                'block rounded-lg px-3 py-2 text-sm',
                isActive(sub.path)
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              ]"
            >
              {{ sub.name }}
            </router-link>
          </div>
          </div>

          <!-- Mobile Profile Section -->
          <div class="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
            <div class="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="relative">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-sm">
                  <span class="text-white font-medium text-lg">{{ userInitials }}</span>
                </div>
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"></div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ userName }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ userEmail }}</p>
                <p class="text-xs text-purple-600 dark:text-purple-400 mt-1">Administrator</p>
              </div>
            </div>
            
            <!-- Dark mode toggle -->
            <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 mt-2">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
              <button @click="toggleDarkMode"
                class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <svg v-if="darkMode" class="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </button>
            </div>
            
            <div class="space-y-1 mt-2">
              <router-link v-for="item in profileMenu" :key="item.name" :to="item.path" @click="closeMobileMenu"
                class="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group">
                <div class="flex items-center space-x-3">
                  <!-- Profile Icon -->
                  <svg v-if="item.name === 'Profile'" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>

                  <svg v-else-if="item.name === 'Settings'" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <svg v-else-if="item.name === 'Help Center'" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <svg v-else-if="item.name === 'System Logs'" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>

                  <svg v-else-if="item.name === 'Audit Trail'" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>

                  <span>{{ item.name }}</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </router-link>

              <button @click="logout"
                class="flex items-center justify-between w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 group">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Notification Panel -->
    <Transition enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in" 
      enter-from-class="opacity-0 translate-y-4"
      leave-to-class="opacity-0 translate-y-4">
      <div v-if="showNotificationPanel" ref="notificationPanel"
        class="fixed top-16 right-4 w-[calc(100vw-2rem)] md:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 max-h-[70vh] overflow-hidden">

        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p class="font-semibold text-gray-800 dark:text-white">Notifications</p>
            <span v-if="unreadCount > 0"
              class="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
              {{ unreadCount }}
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <button @click="markAllAsRead"
              class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200 font-medium">
              Mark read
            </button>
            <button @click="clearNotifications"
              class="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 font-medium">
              Clear
            </button>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="max-h-[calc(70vh-80px)] overflow-y-auto">
          <!-- Empty State -->
          <div v-if="notifications.length === 0" class="px-4 py-10 text-center">
            <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 dark:border-gray-700">
              <svg class="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p class="text-gray-600 dark:text-gray-300 font-medium mb-1">No notifications</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">You're all caught up!</p>
          </div>

          <!-- Notifications -->
          <div v-for="notification in visibleNotifications" :key="notification.id"
            @click="handleNotificationClick(notification)" :class="[
              'px-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer group relative',
              notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
            ]">

            <!-- Unread Indicator -->
            <div v-if="!notification.is_read"
              class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r"></div>

            <div class="flex items-start space-x-3">
              <!-- Icon Container -->
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0',
                getNotificationIconColor(notification.type)
              ]">
                <svg v-if="notification.type === 'assignment'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>

                <svg v-else-if="notification.type === 'quiz'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>

                <svg v-else-if="notification.type === 'announcement'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>

                <svg v-else-if="notification.type === 'user'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>

                <svg v-else-if="notification.type === 'system'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>

                <svg v-else-if="notification.type === 'alert'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>

                <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                  <p class="text-sm font-semibold text-gray-800 dark:text-white truncate">{{ notification.title }}</p>
                  <span v-if="!notification.is_read"
                    class="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 animate-pulse"></span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ notification.message }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatIST(notification.created_at) }}
                  </span>
                  <svg class="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- See all notifications button -->
          <div v-if="notifications.length > 0" class="px-4 py-3 text-center">
            <router-link to="/admin/notifications"
              class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200 font-medium">
              See all notifications
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../services/axios.js";
import { logout as logoutUser } from "../../utils/auth.js";

/* ================= ROUTER ================= */
const route = useRoute();
const router = useRouter();
const darkMode = ref(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('darkMode', darkMode.value)
}

onMounted(() => {
  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    darkMode.value = true
    document.documentElement.classList.add('dark')
  } else if (savedDarkMode === null) {
    // Check system preference if no saved preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      darkMode.value = true
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', true)
    }
  }
})

/* ================= USER ================= */
const user = ref(null);

onMounted(() => {
  const stored =
    JSON.parse(sessionStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("user"));

  if (!stored?.id) {
    logoutUser();
    return;
  }

  user.value = stored;
  fetchNotifications();
});

/* ================= NAV ================= */
const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
  { name: "Users", path: "/admin/users", icon: "users" },
  { name: "Courses", path: "/admin/courses", icon: "courses" },
  { name: "Notifications", path: "/admin/notifications", icon: "reports" },
  {
    name: "Assessments",
    path: "/admin/tests",
    icon: "assignments",
    children: [
      { name: "Tests", path: "/admin/tests" },
      { name: "Assignments", path: "/admin/assignments" }
    ]
  },
//   { name: "Tests", path: "/admin/tests", icon: "tests" },
//   { name: "Analytics", path: "/admin/analytics", icon: "analytics" },
//   { name: "Reports", path: "/admin/reports", icon: "reports" },
//   { name: "Settings", path: "/admin/settings", icon: "settings" }
];

const profileMenu = [
  { name: "Profile", path: "/admin/profile", icon: "profile" },
  { name: "Settings", path: "/admin/settings", icon: "settings" },
  { name: "System Logs", path: "/admin/logs", icon: "logs" },
  { name: "Audit Trail", path: "/admin/audit", icon: "audit" },
  { name: "Help Center", path: "/admin/help", icon: "help" }
];

const isActive = (path) => route.path.startsWith(path);

const isNavItemActive = (item) => {
  if (item.children?.length) {
    return item.children.some((sub) => isActive(sub.path));
  }
  return isActive(item.path);
};

/* ================= UI STATE ================= */
const mobileMenuOpen = ref(false);
const openDesktopGroup = ref(null);
const openMobileGroup = ref(null);
const showProfileDropdown = ref(false);
const showNotificationPanel = ref(false);

const profileButton = ref(null);
const profileDropdown = ref(null);
const notificationButton = ref(null);
const notificationPanel = ref(null);

/* ================= NOTIFICATIONS ================= */
const notifications = ref([]);

const unreadCount = computed(() =>
  notifications.value.filter(n => !n.is_read).length
);

const visibleNotifications = computed(() =>
  notifications.value.slice(0, 5) // Show only 5 latest notifications
);

/* ================= API ================= */
async function fetchNotifications() {
  try {
    const { data } = await api.get(`/api/notifications/${user.value.id}`);
    notifications.value = data;
  } catch (err) {
    console.error("Notification fetch failed", err);
  }
}

async function markNotificationRead(notification) {
  if (notification.is_read) return;

  try {
    await api.post("/api/notifications/mark_read", {
      user_id: user.value.id,
      notification_id: notification.id
    });

    notification.is_read = true;
  } catch (err) {
    console.error("Mark read failed", err);
  }
}

/* ================= ACTIONS ================= */
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (!mobileMenuOpen.value) {
    openMobileGroup.value = null;
  }
  showProfileDropdown.value = false;
  showNotificationPanel.value = false;
}

function toggleDesktopGroup(name) {
  openDesktopGroup.value = openDesktopGroup.value === name ? null : name;
}

function toggleMobileGroup(name) {
  openMobileGroup.value = openMobileGroup.value === name ? null : name;
}

function toggleProfileDropdown() {
  showProfileDropdown.value = !showProfileDropdown.value;
  showNotificationPanel.value = false;
  mobileMenuOpen.value = false;
}

function toggleNotifications() {
  showNotificationPanel.value = !showNotificationPanel.value;
  showProfileDropdown.value = false;
  mobileMenuOpen.value = false;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
  openMobileGroup.value = null;
}

function closeProfileDropdown() {
  showProfileDropdown.value = false;
}

function handleNotificationClick(notification) {
  markNotificationRead(notification);
  showNotificationPanel.value = false;
  // Navigate to notification related page if needed
  // router.push(notification.link);
}

function markAllAsRead() {
  notifications.value.forEach(n => {
    n.is_read = true;
  });
}

function clearNotifications() {
  notifications.value = [];
}

function logout() {
  logoutUser();
}

/* ================= HELPERS ================= */
const userName = computed(() => {
  if (!user.value) return "Admin";

  const fullName = `${user.value.first_name ?? ""} ${user.value.last_name ?? ""}`.trim();

  return fullName
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});

const userEmail = computed(() => user.value?.email ?? "");

const userInitials = computed(() => {
  if (!userName.value) return "A";

  return userName.value
    .split(" ")
    .filter(Boolean)
    .map(w => w[0])
    .join("")
    .toUpperCase();
});

function formatIST(dateStr) {
  return new Date(dateStr).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function getNotificationIconColor(type) {
  switch (type) {
    case "assignment": return "bg-indigo-500";
    case "quiz": return "bg-purple-500";
    case "announcement": return "bg-pink-500";
    case "user": return "bg-green-500";
    case "system": return "bg-blue-500";
    case "alert": return "bg-red-500";
    default: return "bg-gray-500";
  }
}

/* ================= CLICK OUTSIDE ================= */
function handleClickOutside(e) {
  if (
    profileDropdown.value &&
    !profileDropdown.value.contains(e.target) &&
    !profileButton.value.contains(e.target)
  ) {
    showProfileDropdown.value = false;
  }

  if (
    notificationPanel.value &&
    !notificationPanel.value.contains(e.target) &&
    !notificationButton.value.contains(e.target)
  ) {
    showNotificationPanel.value = false;
  }

  if (!e.target.closest('[data-desktop-nav]')) {
    openDesktopGroup.value = null;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Custom scrollbar for notifications */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation for dropdown */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

/* Smooth transitions */
* {
  scroll-behavior: smooth;
}

/* Ensure dark mode transitions are smooth */
.dark {
  color-scheme: dark;
}
</style>