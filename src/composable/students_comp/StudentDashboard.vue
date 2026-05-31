<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-gray-950 dark:to-indigo-950">
    <!-- Main Container with improved padding for mobile -->
    <div class="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div class="space-y-4 sm:space-y-6 md:space-y-8">
        <!-- Side Navigation with Toggle Button -->
        <div class="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-start">
          <!-- Toggle Button -->
          <button @click="isSideNavOpen = !isSideNavOpen"
            class="relative z-50 flex items-center justify-center rounded-r-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-2 sm:p-3 text-white shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{ 'rounded-l-none ml-0': isSideNavOpen }" aria-label="Toggle navigation">
            <svg class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300"
              :class="{ 'rotate-180': isSideNavOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Navigation Panel - Fixed with proper hiding -->
          <div class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="isSideNavOpen ? 'ml-3 w-48 sm:w-56 opacity-100 pointer-events-auto' : 'ml-0 w-0 opacity-0 pointer-events-none'">
            <div class="rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl dark:bg-gray-900/95">
              <nav class="p-2 sm:p-3">
                <div class="space-y-1">
                  <!-- Home Link -->
                  <router-link to="/"
                    class="flex items-center gap-2 sm:gap-3 rounded-xl px-3 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-gray-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
                    :class="{ 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300': $route.path === '/' }"
                    @click="isSideNavOpen = false">
                    <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                  </router-link>

                  <!-- Resources Link with Dropdown - FULLY WORKING -->
<div class="relative resources-container">
  <div
    class="resources-trigger flex items-center justify-between rounded-xl px-3 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-gray-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 cursor-pointer"
    @mouseenter="showResourcesDropdown = true" 
    @mouseleave="showResourcesDropdown = false"
  >
    <div class="flex items-center gap-2 sm:gap-3">
      <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6v12M16 6v12" />
      </svg>
      <span>Resources</span>
    </div>
    <svg class="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200"
      :class="{ 'rotate-180': showResourcesDropdown }" fill="none" stroke="currentColor"
      viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  <!-- Dropdown Menu - Teleport to body to avoid overflow issues -->
  <Teleport to="body">
    <div 
      v-show="showResourcesDropdown"
      class="fixed z-[9999]"
      :style="dropdownStyle"
      @mouseenter="showResourcesDropdown = true" 
      @mouseleave="showResourcesDropdown = false"
    >
      <div class="min-w-[140px] sm:min-w-[160px] rounded-xl bg-white shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800 py-1">
        <router-link to="/resource/notes"
          class="flex items-center gap-2 px-3 py-2 sm:py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors duration-200 whitespace-nowrap"
          @click="showResourcesDropdown = false; isSideNavOpen = false">
          <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Notes</span>
        </router-link>

        <router-link to="/resource/youtube"
          class="flex items-center gap-2 px-3 py-2 sm:py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors duration-200 whitespace-nowrap"
          @click="showResourcesDropdown = false; isSideNavOpen = false">
          <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Youtube</span>
        </router-link>

        <router-link to="/resource/books"
          class="flex items-center gap-2 px-3 py-2 sm:py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors duration-200 whitespace-nowrap"
          @click="showResourcesDropdown = false; isSideNavOpen = false">
          <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Books</span>
        </router-link>
      </div>
    </div>
  </Teleport>
</div>

                  <!-- Courses Link -->
                  <router-link to="/courses"
                    class="flex items-center gap-2 sm:gap-3 rounded-xl px-3 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-gray-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
                    :class="{ 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300': $route.path === '/courses' }"
                    @click="isSideNavOpen = false">
                    <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Courses</span>
                  </router-link>

                  <!-- Support Link -->
                  <router-link to="/contact"
                    class="flex items-center gap-2 sm:gap-3 rounded-xl px-3 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-gray-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
                    :class="{ 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300': $route.path === '/contact' }"
                    @click="isSideNavOpen = false">
                    <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M18.364 5.636L16.95 7.05M21 12h-2M3 12H1m4-7.05L3.636 5.636M16.95 16.95L18.364 18.364M12 21v-2m-7.05-3.636L3.636 16.95M12 3V1m-4 8a4 4 0 108 0 4 4 0 00-8 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 17a5 5 0 00-5 5h10a5 5 0 00-5-5z" />
                    </svg>
                    <span>Support</span>
                  </router-link>
                </div>
              </nav>
            </div>
          </div>
        </div>
        
        <!-- Hero Section - Completely responsive -->
        <section class="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-2xl">
          <div class="relative z-10 p-5 sm:p-6 md:p-8">
            <!-- Mobile/Tablet/Desktop Layout -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-8">
              <!-- Left Content -->
              <div class="flex-1 space-y-3 sm:space-y-4">
                <div class="inline-flex items-center gap-2 rounded-full bg-white/15 px-2.5 py-1 sm:px-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                  Student Dashboard
                </div>
                
                <div>
                  <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight break-words">
                    Welcome back, {{ studentName }}
                  </h1>
                  <p class="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base text-white/85 max-w-2xl">
                    Track your courses, assignments, progress, and notifications from one place.
                  </p>
                </div>

                <div class="flex flex-wrap gap-2 sm:gap-3">
                  <!-- Live Class Button - Most Prominent -->
                    <button
                      type="button"
                      @click="router.push('/student/live-class')"
                    class="group relative overflow-hidden rounded-lg sm:rounded-xl bg-linear-to-r from-red-500 via-pink-500 to-rose-500 px-4 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <!-- Animated pulse effect -->
                    <span
                      class="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 animate-pulse-slow opacity-75"></span>

                    <!-- Ripple effect on hover -->
                    <span
                      class="absolute inset-0 rounded-lg sm:rounded-xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>

                    <!-- Live dot indicator -->
                    <span class="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                      <span
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
                      <span class="relative inline-flex h-full w-full rounded-full bg-green-400"></span>
                    </span>

                    <span class="relative flex items-center gap-1 sm:gap-2 pl-3 sm:pl-4">
                      <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>LIVE CLASS</span>
                      <span class="hidden sm:inline text-xs font-normal opacity-90">• Join Now</span>
                    </span>
                  </button>

                  <button type="button" @click="router.push('/student/courses')"
                    class="rounded-lg sm:rounded-xl bg-white px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-indigo-700 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-indigo-50">
                    View Courses
                  </button>

                  <button type="button" @click="router.push('/student/assignments')"
                    class="rounded-lg sm:rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                    Open Assignments
                  </button>

                </div>
              </div>

              <!-- Stats Cards - Responsive Grid -->
              <div class="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:w-auto lg:min-w-[280px]">
                <div
                  v-for="stat in stats"
                  :key="stat.label"
                  class="rounded-xl sm:rounded-2xl border border-white/10 bg-white/12 p-2 sm:p-3 md:p-4 backdrop-blur"
                >
                  <div class="flex items-start justify-between gap-1.5 sm:gap-3">
                    <div class="flex-1 min-w-0">
                      <p class="text-[10px] sm:text-xs uppercase tracking-wide text-white/70 truncate">{{ stat.label }}</p>
                      <p class="mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-2xl font-bold">{{ stat.value }}</p>
                    </div>
                    <div class="flex-shrink-0 rounded-lg sm:rounded-xl bg-white/15 p-1.5 sm:p-2 text-white">
                      <component :is="stat.icon" class="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Decorative Elements -->
          <div class="absolute -top-20 -right-20 h-40 w-40 sm:h-60 sm:w-60 rounded-full bg-white/5 blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 h-40 w-40 sm:h-60 sm:w-60 rounded-full bg-white/5 blur-3xl"></div>
        </section>

        <!-- Stats Cards Row - Responsive Grid -->
        <section class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          <div class="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 md:p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
            <p class="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{{ dashboardCounts.enrolledCourses }}</p>
            <p class="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-2">Active courses you can continue learning</p>
          </div>
          
          <div class="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 md:p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Assignments</p>
            <p class="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{{ dashboardCounts.totalAssignments }}</p>
            <p class="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Across all enrolled courses</p>
          </div>
          
          <div class="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 md:p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Pending</p>
            <p class="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">{{ dashboardCounts.pendingAssignments }}</p>
            <p class="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Assignments waiting for submission</p>
          </div>
          
          <div class="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 md:p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Submitted</p>
            <p class="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">{{ dashboardCounts.submittedAssignments }}</p>
            <p class="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Already completed</p>
          </div>
        </section>

        <!-- Loading State -->
        <div v-if="loading" class="grid gap-4 sm:gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
            <div class="h-5 sm:h-6 w-32 sm:w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            <div class="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div v-for="n in 4" :key="n" class="h-24 sm:h-28 animate-pulse rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-gray-800"></div>
            </div>
          </div>
          <div class="space-y-4 sm:space-y-6">
            <div class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
              <div class="h-5 sm:h-6 w-28 sm:w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div class="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                <div v-for="n in 3" :key="n" class="h-16 sm:h-20 animate-pulse rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content - Two Column Layout -->
        <div v-else class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <!-- Left Column -->
          <div class="flex-1 space-y-4 sm:space-y-6">
            <!-- Continue Learning Section -->
            <section class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
                  <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Pick up where you left off</p>
                </div>
                <button
                  type="button"
                  @click="router.push('/student/courses')"
                  class="self-start sm:self-auto rounded-lg sm:rounded-xl bg-gray-100 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  All Courses
                </button>
              </div>

              <div v-if="topCourse" class="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-4 sm:p-5 dark:from-indigo-950 dark:to-violet-950">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div class="min-w-0 flex-1">
                    <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">Top Course</p>
                    <h3 class="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white break-words">{{ topCourse.title }}</h3>
                    <p class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{{ topCourse.subject }} • {{ topCourse.class_level }}</p>
                  </div>
                  <div class="flex items-center gap-3 sm:gap-4">
                    <div class="text-right">
                      <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Progress</p>
                      <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ topCourse.progress_percent || 0 }}%</p>
                    </div>
                    <button
                      type="button"
                      @click="openCourse(topCourse.course_id)"
                      class="rounded-lg sm:rounded-xl bg-indigo-600 px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-indigo-700 whitespace-nowrap"
                    >
                      Open
                    </button>
                  </div>
                </div>

                <div class="mt-3 sm:mt-4 h-1.5 sm:h-2 w-full rounded-full bg-white/70 dark:bg-white/10">
                  <div class="h-1.5 sm:h-2 rounded-full bg-indigo-600 transition-all duration-500" :style="{ width: `${topCourse.progress_percent || 0}%` }"></div>
                </div>
              </div>

              <div v-else class="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 sm:p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
                <p class="text-sm sm:text-base">No enrolled course found yet.</p>
              </div>
            </section>

            <!-- My Courses Section -->
            <section class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
                  <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Your enrolled courses with live progress</p>
                </div>
                <span class="self-start sm:self-auto rounded-full bg-indigo-50 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 whitespace-nowrap">
                  {{ enrolledCourses.length }} active
                </span>
              </div>

              <div v-if="enrolledCourses.length" class="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <article
                  v-for="course in enrolledCourses"
                  :key="course.course_id"
                  class="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-950/60"
                >
                  <div class="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                    <div class="min-w-0 flex-1">
                      <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ course.subject }}</p>
                      <h3 class="mt-0.5 sm:mt-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white break-words">{{ course.title }}</h3>
                      <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Class {{ course.class_level }} • {{ course.duration_months }} months</p>
                    </div>
                    <div class="rounded-lg sm:rounded-xl bg-emerald-50 px-2 py-1 sm:px-3 sm:py-2 text-center dark:bg-emerald-950/60">
                      <p class="text-[9px] sm:text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Progress</p>
                      <p class="text-sm sm:text-base md:text-lg font-bold text-emerald-800 dark:text-emerald-300">{{ course.progress_percent || 0 }}%</p>
                    </div>
                  </div>

                  <div class="mt-3 sm:mt-4 h-1.5 sm:h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div class="h-1.5 sm:h-2 rounded-full bg-emerald-500 transition-all duration-500" :style="{ width: `${course.progress_percent || 0}%` }"></div>
                  </div>

                  <div class="mt-3 sm:mt-4 flex items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    <span class="truncate">{{ course.completed_items || 0 }} / {{ course.total_items || 0 }} completed</span>
                    <button @click="openCourse(course.course_id)" class="font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap">
                      Open course →
                    </button>
                  </div>
                </article>
              </div>

              <div v-else class="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 sm:p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
                <p class="text-sm sm:text-base">You are not enrolled in any paid course yet.</p>
              </div>
            </section>

            <!-- Upcoming Assignments Section -->
            <section class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Upcoming Assignments</h2>
                  <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Assignments waiting for you</p>
                </div>
                <button
                  type="button"
                  @click="router.push('/student/assignments')"
                  class="self-start sm:self-auto rounded-lg sm:rounded-xl bg-gray-100 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  View all
                </button>
              </div>

              <div v-if="upcomingAssignments.length" class="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <article
                  v-for="assignment in upcomingAssignments.slice(0, 6)"
                  :key="assignment.key"
                  class="rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950/60"
                >
                  <div class="flex flex-wrap items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">{{ assignment.status }}</p>
                      <h3 class="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white break-words">{{ assignment.title }}</h3>
                      <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ assignment.courseTitle }} • Week {{ assignment.weekNumber }}</p>
                    </div>
                    <span class="rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-xs font-semibold whitespace-nowrap" :class="assignment.statusClass">
                      {{ assignment.statusLabel }}
                    </span>
                  </div>

                  <p class="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
                    {{ assignment.description || 'No description provided.' }}
                  </p>

                  <div class="mt-2 sm:mt-3 flex items-center justify-between gap-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    <span class="truncate">Due: {{ formatDateTime(assignment.dueDate) }}</span>
                    <button @click="openCourse(assignment.courseId)" class="font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap">
                      Open →
                    </button>
                  </div>
                </article>
              </div>

              <div v-else class="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 sm:p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
                <p class="text-sm sm:text-base">No upcoming assignments found.</p>
              </div>
            </section>
          </div>

          <!-- Right Column - Sidebar -->
          <aside class="w-full lg:w-80 xl:w-96 space-y-4 sm:space-y-6">
            <!-- Recent Notifications -->
            <div class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Recent Notifications</h2>
                  <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Latest updates</p>
                </div>
                <button @click="router.push('/student/notifications')" class="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200">
                  View all
                </button>
              </div>

              <div v-if="notifications.length" class="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                <article
                  v-for="notification in notifications.slice(0, 5)"
                  :key="notification.id"
                  class="rounded-xl sm:rounded-2xl border p-2.5 sm:p-3 transition-all duration-200"
                  :class="notification.is_read ? 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/60' : 'border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/40'"
                >
                  <div class="flex items-start gap-2 sm:gap-3">
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-wrap items-start justify-between gap-1 sm:gap-2">
                        <h3 class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white break-words">{{ notification.title }}</h3>
                        <span
                          class="rounded-full px-1.5 py-0.5 text-[9px] sm:text-[11px] font-semibold whitespace-nowrap"
                          :class="notification.is_read ? 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300' : 'bg-indigo-600 text-white'"
                        >
                          {{ notification.is_read ? 'Read' : 'New' }}
                        </span>
                      </div>
                      <p class="mt-1 text-[11px] sm:text-xs text-gray-500 line-clamp-2 dark:text-gray-300">{{ notification.message }}</p>
                    </div>
                  </div>
                </article>
              </div>

              <div v-else class="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 sm:p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
                <p class="text-sm sm:text-base">No notifications yet.</p>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
              <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
              <div class="mt-3 sm:mt-5 grid gap-2 sm:gap-3">
                <button @click="router.push('/student/courses')" class="group rounded-xl sm:rounded-2xl bg-gray-50 p-2.5 sm:p-3 text-left transition hover:bg-gray-100 dark:bg-gray-950/60 dark:hover:bg-gray-800">
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">Browse Courses</p>
                  <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">Open your enrolled and available courses</p>
                </button>
                
                <button @click="router.push('/student/assignments')" class="group rounded-xl sm:rounded-2xl bg-gray-50 p-2.5 sm:p-3 text-left transition hover:bg-gray-100 dark:bg-gray-950/60 dark:hover:bg-gray-800">
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">All Assignments</p>
                  <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">Check pending and submitted work</p>
                </button>
                
                <button @click="router.push('/student/notifications')" class="group rounded-xl sm:rounded-2xl bg-gray-50 p-2.5 sm:p-3 text-left transition hover:bg-gray-100 dark:bg-gray-950/60 dark:hover:bg-gray-800">
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">Notifications</p>
                  <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">See updates from teachers and admin</p>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios.js'
import { getAuth } from '../../utils/auth.js'

const router = useRouter()
const { user } = getAuth()

const loading = ref(false)
const enrolledCourses = ref([])
const allCourses = ref([])
const notifications = ref([])
const assignments = ref([])

const isSideNavOpen = ref(false)
// Add these refs
const showResourcesDropdown = ref(false)
const dropdownStyle = ref({
  top: '0px',
  left: '0px'
})

// Add this function to update dropdown position
const updateDropdownPosition = () => {
  const trigger = document.querySelector('.resources-trigger')
  if (trigger && showResourcesDropdown.value) {
    const rect = trigger.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.top}px`,
      left: `${rect.right + 8}px`
    }
  }
}

import { watch, nextTick } from 'vue'

// Add this watch
watch(showResourcesDropdown, (newVal) => {
  if (newVal) {
    nextTick(() => {
      updateDropdownPosition()
    })
  }
})

// Also update on window resize and scroll
const handleResize = () => {
  if (showResourcesDropdown.value) {
    updateDropdownPosition()
  }
}

// Add event listeners in onMounted
onMounted(() => {
  loadDashboard()
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleResize)
})

// Clean up in onUnmounted
import { onUnmounted } from 'vue'

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleResize)
})

const studentName = computed(() => {
  const firstName = user?.first_name || user?.firstName || 'Student'
  const lastName = user?.last_name || user?.lastName || ''
  return `${firstName} ${lastName}`.trim()
})

const formatDateTime = (value) => {
  if (!value) return 'No due date'
  const dt = new Date(value)
  if (Number.isNaN(dt.getTime())) return value
  return dt.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

// SVG Icon Components
const bookIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`
}

const checkIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`
}

const bellIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`
}

const chartIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
}

const clockIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
}

const stats = computed(() => {
  const totalCourses = enrolledCourses.value.length
  const totalAssignments = assignments.value.length
  const pendingAssignments = assignments.value.filter((item) => item.status === 'Pending').length
  const completedAssignments = assignments.value.filter((item) => item.status === 'Submitted').length

  return [
    { label: 'Courses', value: totalCourses, icon: bookIcon },
    { label: 'Assignments', value: totalAssignments, icon: chartIcon },
    { label: 'Pending', value: pendingAssignments, icon: clockIcon },
    { label: 'Submitted', value: completedAssignments, icon: checkIcon }
  ]
})

const dashboardCounts = computed(() => ({
  enrolledCourses: enrolledCourses.value.length,
  totalAssignments: assignments.value.length,
  pendingAssignments: assignments.value.filter((item) => item.status === 'Pending').length,
  submittedAssignments: assignments.value.filter((item) => item.status === 'Submitted').length
}))

const topCourse = computed(() => {
  if (!enrolledCourses.value.length) return null
  return [...enrolledCourses.value].sort((a, b) => (b.progress_percent || 0) - (a.progress_percent || 0))[0]
})

const upcomingAssignments = computed(() => {
  return [...assignments.value].filter((item) => item.status !== 'Submitted').sort((a, b) => {
    const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER
    const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER
    return aTime - bTime
  })
})

const openCourse = (courseId) => {
  router.push(`/course/${courseId}`)
}

const mapAssignmentStatus = (dueDate, submittedAt) => {
  const now = new Date()
  const due = dueDate ? new Date(dueDate) : null
  const isPastDue = due ? now > due : false

  if (submittedAt) {
    return {
      status: 'Submitted',
      statusLabel: 'Submitted',
      statusClass: 'bg-emerald-100 text-emerald-700',
      isPastDue
    }
  }

  if (isPastDue) {
    return {
      status: 'Missed',
      statusLabel: 'Missed',
      statusClass: 'bg-rose-100 text-rose-700',
      isPastDue
    }
  }

  return {
    status: 'Pending',
    statusLabel: 'Pending',
    statusClass: 'bg-amber-100 text-amber-700',
    isPastDue
  }
}

const loadDashboard = async () => {
  loading.value = true

  try {
    const [coursesRes, notificationsRes] = await Promise.all([
      api.get('/api/my-courses'),
      user?.id ? api.get(`/api/notifications/${user.id}`) : Promise.resolve({ data: [] })
    ])

    enrolledCourses.value = Array.isArray(coursesRes.data) ? coursesRes.data : []
    notifications.value = Array.isArray(notificationsRes.data) ? notificationsRes.data : []

    const courseAssignmentResponses = await Promise.all(
      enrolledCourses.value.map(async (course) => {
        try {
          const weeksRes = await api.get(`/api/courses/${course.course_id}/weeks`)
          const weeks = Array.isArray(weeksRes.data) ? weeksRes.data : []

          const courseAssignments = []
          weeks.forEach((week) => {
            ;(Array.isArray(week.assignments) ? week.assignments : []).forEach((assignment) => {
              courseAssignments.push({
                key: `${course.course_id}-${assignment.id}`,
                assignmentId: assignment.id,
                title: assignment.title,
                description: assignment.description,
                dueDate: assignment.due_date,
                courseId: course.course_id,
                courseTitle: course.title,
                weekNumber: week.week_number
              })
            })
          })

          return courseAssignments
        } catch (_err) {
          return []
        }
      })
    )

    const flattenedAssignments = courseAssignmentResponses.flat()
    const enrichedAssignments = []

    for (const assignment of flattenedAssignments) {
      try {
        const questionRes = await api.get(`/api/assignments/${assignment.assignmentId}/questions`)
        const submittedAt = questionRes.data?.latest_submission_at || null
        const statusInfo = mapAssignmentStatus(assignment.dueDate, submittedAt)

        enrichedAssignments.push({
          ...assignment,
          submittedAt,
          ...statusInfo
        })
      } catch (_err) {
        const statusInfo = mapAssignmentStatus(assignment.dueDate, null)
        enrichedAssignments.push({
          ...assignment,
          submittedAt: null,
          ...statusInfo
        })
      }
    }

    assignments.value = enrichedAssignments.sort((a, b) => {
      const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER
      const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER
      return aTime - bTime
    })
  } catch (err) {
    console.error('Failed to load dashboard', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Responsive line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth animations */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Touch-friendly improvements for mobile */
@media (max-width: 640px) {
  button, 
  [role="button"],
  .cursor-pointer {
    min-height: 40px;
  }
  
  /* Better tap targets */
  .rounded-xl,
  .rounded-2xl {
    cursor: pointer;
  }
}

/* Prevent text overflow on very small screens */
@media (max-width: 480px) {
  .break-words {
    word-break: break-word;
    overflow-wrap: break-word;
  }
}

/* Improve scroll behavior */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c7d2fe;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #818cf8;
}

@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #1f2937;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #4f46e5;
  }
}

.fixed {
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.resources-trigger {
  position: relative;
  z-index: 1;
}
</style>