<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-6 md:py-8 overflow-x-hidden transition-colors duration-500">
    <!-- Animated Ambient Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full filter blur-[120px] opacity-20 dark:opacity-10 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full filter blur-[120px] opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-full filter blur-[140px] opacity-10 dark:opacity-5 animate-blob animation-delay-4000"></div>
    </div>

    <!-- ================= HEADER ================= -->
    <header class="relative max-w-7xl mx-auto mb-12 md:mb-16">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 text-white text-sm font-medium">
          <span class="animate-pulse">✨</span>
          <span>Expand Your Knowledge</span>
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-[1.1] tracking-tight">
          Discover Your
          <br class="hidden sm:block" />
          <span class="relative inline-block">
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Next Course
            </span>
            <svg class="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none">
              <path d="M2 6C50 2 100 2 150 4C200 6 250 6 298 3" stroke="url(#grad)" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stop-color="#6366f1"/>
                  <stop offset="50%" stop-color="#a855f7"/>
                  <stop offset="100%" stop-color="#d946ef"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
          Explore curated courses and accelerate your learning journey
        </p>

        <!-- Modern Stats Bar -->
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10">
          <div class="stat-card group px-5 py-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="stat-icon w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ courses.length }}</div>
                <div class="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Courses</div>
              </div>
            </div>
          </div>

          <div class="stat-card group px-5 py-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="stat-icon w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ myCourses.length }}</div>
                <div class="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Enrolled</div>
              </div>
            </div>
          </div>

          <div class="stat-card group px-5 py-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="stat-icon w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ inProgressCount }}</div>
                <div class="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">In Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ================= SEARCH & FILTER ================= -->
    <div class="max-w-7xl mx-auto mb-12">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 transition-colors duration-500">
        <div class="relative flex-1 w-full">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search courses by title, subject, or description..."
            class="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div class="hidden md:flex gap-2 flex-wrap">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300',
              activeFilter === filter
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </div>

    <main class="relative max-w-7xl mx-auto">
      <!-- ================= MY COURSES – CAROUSEL ================= -->
      <section class="mb-16" v-if="myCourses.length > 0" data-my-courses>
        <div class="flex items-end justify-between mb-8">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Continue Learning
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Pick up where you left off
            </p>
          </div>

          <div class="hidden sm:flex items-center gap-2" v-if="myCourses.length > 1">
            <button
              @click="scrollMyCourses(-1)"
              class="nav-arrow w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              @click="scrollMyCourses(1)"
              class="nav-arrow w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Horizontal carousel -->
        <div class="relative -mx-4 px-4">
          <div
            ref="myCoursesRail"
            class="flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            <div
              v-for="course in myCourses"
              :key="course.course_id"
              class="group flex-shrink-0 w-[320px] sm:w-[360px] snap-start"
            >
              <!-- Card -->
              <div class="course-card my-course-card relative h-full rounded-3xl overflow-hidden">
                <!-- Glow accent -->
                <div class="card-glow absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl"></div>

                <!-- Shimmer -->
                <div class="card-shimmer absolute inset-0 pointer-events-none"></div>

                <div class="relative p-6">
                  <div class="flex items-start justify-between mb-5">
                    <div class="flex items-center gap-3">
                      <div class="card-icon w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                        <span class="text-xl">📚</span>
                      </div>
                      <div class="min-w-0">
                        <h3 class="card-title font-bold text-gray-900 dark:text-white truncate max-w-[180px]">
                          {{ course.title }}
                        </h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Class {{ course.class_level }} · {{ course.duration_months }} months
                        </p>
                      </div>
                    </div>

                    <span class="flex-shrink-0 inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                      Live
                    </span>
                  </div>

                  <div class="mb-5">
                    <div class="flex justify-between items-center text-xs font-medium mb-2">
                      <span class="text-gray-500 dark:text-gray-400">Progress</span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ course.progress_percent || 0 }}%</span>
                    </div>
                    <div class="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700 shadow-sm"
                        :style="{ width: (course.progress_percent || 0) + '%' }"
                      ></div>
                    </div>
                  </div>

                  <button
                    @click="goToCourse(course.course_id)"
                    class="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                  >
                    Continue Learning
                    <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 w-1"></div>
          </div>

          <div class="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent pointer-events-none"></div>
          <div class="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none"></div>
        </div>
      </section>

      <!-- ================= ALL COURSES – CAROUSEL ================= -->
      <section>
        <div class="flex items-end justify-between mb-8">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Explore</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Featured Courses
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Discover our most popular courses
            </p>
          </div>

          <div class="hidden sm:flex items-center gap-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ filteredCourses.length }} of {{ courses.length }}
            </span>
            <div class="flex items-center gap-2" v-if="filteredCourses.length > 1">
              <button
                @click="scrollAllCourses(-1)"
                class="nav-arrow w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                @click="scrollAllCourses(1)"
                class="nav-arrow w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex gap-5 overflow-x-hidden -mx-4 px-4">
          <div v-for="n in 4" :key="n" class="flex-shrink-0 w-[300px] h-96 bg-white dark:bg-slate-800 rounded-3xl shadow-lg animate-pulse"></div>
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="text-center p-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl"
        >
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 dark:bg-red-900/40 rounded-full">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Unable to Load Courses</h3>
          <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
          <button
            @click="fetchCourses"
            class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>

        <!-- All Courses Carousel -->
        <div v-else-if="filteredCourses.length > 0" class="relative -mx-4 px-4">
          <div
            ref="allCoursesRail"
            class="flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            <div
              v-for="(course, index) in filteredCourses"
              :key="course.id"
              class="group flex-shrink-0 w-[300px] sm:w-[330px] snap-start"
            >
              <!-- Card -->
              <div class="course-card featured-card relative h-full rounded-3xl overflow-hidden flex flex-col">
                <!-- Hover glow overlay -->
                <div class="card-gradient-overlay absolute inset-0 pointer-events-none z-10"></div>

                <!-- Number badge -->
                <div class="absolute top-4 right-4 z-30">
                  <span class="number-badge flex items-center justify-center w-9 h-9 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-sm font-extrabold text-indigo-600 dark:text-indigo-400 shadow-lg ring-1 ring-black/5">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                </div>

                <!-- Subject badge -->
                <div class="absolute top-4 left-4 z-30">
                  <span class="subject-badge inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-600/90 backdrop-blur-md text-white shadow-lg">
                    {{ course.subject }}
                  </span>
                </div>

                <!-- Image -->
                <div class="relative h-44 overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900">
                  <img
                    v-if="course.picture_url"
                    :src="course.picture_url"
                    alt="Course Image"
                    class="card-image w-full h-full object-cover"
                  />
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <span class="card-image-placeholder text-5xl text-white/80">📘</span>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div class="absolute bottom-3 left-4 z-10">
                    <div class="card-price text-2xl font-extrabold text-white drop-shadow-lg">
                      ₹{{ course.fee }}
                    </div>
                  </div>
                </div>

                <!-- Body -->
                <div class="flex-1 flex flex-col p-5 relative z-20">
                  <h3 class="card-title font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {{ course.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                    {{ course.description }}
                  </p>

                  <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ course.duration_months }} mo</span>
                    </div>
                    <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Class {{ course.class_level }}</span>
                    </div>
                  </div>

                  <button
                    v-if="course.is_enrolled && course.payment_status === 'paid'"
                    @click="goToCourse(course.id)"
                    class="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                  >
                    Continue
                    <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button
                    v-else
                    @click="enrollCourse(course.id)"
                    class="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-yellow-400 bg-slate-800 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-indigo-500/40"
                  >
                    Enroll Now
                    <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 w-1"></div>
          </div>

          <div class="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent pointer-events-none"></div>
          <div class="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none"></div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!loading && !error && filteredCourses.length === 0"
          class="text-center p-12 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700"
        >
          <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full">
            <span class="text-3xl">🔍</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No courses found
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button
            @click="clearFilters"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium transition shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        </div>
      </section>
    </main>

    <!-- Floating Action Button -->
    <button
      v-if="myCourses.length > 0"
      @click="scrollToMyCourses"
      class="fab-button fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white rounded-full shadow-2xl shadow-indigo-500/40 group"
      aria-label="Back to my courses"
    >
      <span class="text-xl">📚</span>
      <span class="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping-slow"></span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../../services/axios";
import { useRouter } from "vue-router";
import { getEnrollmentRoute } from "../../utils/auth.js";

const router = useRouter();

const courses = ref([]);
const myCourses = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const activeFilter = ref("All");
const filters = ["All", "Popular", "New", "Science", "Math", "Programming"];

const myCoursesRail = ref(null);
const allCoursesRail = ref(null);

const filteredCourses = computed(() => {
  let filtered = courses.value;
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.subject.toLowerCase().includes(query)
    );
  }
  if (activeFilter.value !== "All") {
    filtered = filtered.filter(course =>
      course.subject.toLowerCase() === activeFilter.value.toLowerCase() ||
      (activeFilter.value === "Popular" && course.is_popular) ||
      (activeFilter.value === "New" && course.is_new)
    );
  }
  return filtered;
});

const inProgressCount = computed(() => {
  return myCourses.value.filter(course => course.progress > 0 && course.progress < 100).length;
});

const scrollMyCourses = (direction) => {
  if (!myCoursesRail.value) return;
  myCoursesRail.value.scrollBy({ left: direction * 340, behavior: 'smooth' });
};

const scrollAllCourses = (direction) => {
  if (!allCoursesRail.value) return;
  allCoursesRail.value.scrollBy({ left: direction * 350, behavior: 'smooth' });
};

const scrollToMyCourses = () => {
  const element = document.querySelector('[data-my-courses]');
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const clearFilters = () => {
  searchQuery.value = "";
  activeFilter.value = "All";
};

const fetchCourses = async () => {
  try {
    const res = await api.get("/api/student/courses");
    courses.value = res.data.map(course => ({
      ...course,
      is_popular: Math.random() > 0.5,
      is_new: Math.random() > 0.7,
      progress: Math.floor(Math.random() * 100)
    }));
  } catch (err) {
    console.error("Failed to fetch courses", err);
    error.value = err.response?.data?.error || "Failed to fetch courses. Please try again.";
  }
};

const fetchMyCourses = async () => {
  try {
    const res = await api.get("/api/my-courses");
    myCourses.value = res.data.map(course => ({
      ...course,
      progress: Math.floor(Math.random() * 100)
    }));
  } catch (err) {
    console.error("Failed to fetch my courses", err);
  }
};

const enrollCourse = (courseId) => router.push(getEnrollmentRoute(courseId));
const goToCourse = (courseId) => router.push(`/course/${courseId}`);

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchCourses(), fetchMyCourses()]);
  loading.value = false;
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hide scrollbar for carousels */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* ============================================================
   SMOOTH GPU-ACCELERATED HOVER SYSTEM
   All card animations use transform + opacity only.
   will-change + translate3d ensure 60fps on desktop.
   ============================================================ */

/* ===== Course Card Base ===== */
.course-card {
  background-color: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.08);
  /* GPU acceleration & smooth transition */
  transform: translate3d(0, 0, 0);
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.4s ease;
  will-change: transform, box-shadow;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform-style: preserve-3d;
}

.dark .course-card {
  background-color: #1e293b;
  border-color: rgba(51, 65, 85, 0.6);
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.4);
}

/* Hover: subtle lift with colored shadow */
.course-card:hover {
  transform: translate3d(0, -6px, 0);
}

/* ===== My Course Card (emerald theme) ===== */
.my-course-card {
  background: linear-gradient(to bottom right, #ffffff, #ffffff, rgba(236, 253, 245, 0.5));
}
.dark .my-course-card {
  background: linear-gradient(to bottom right, #1e293b, #1e293b, rgba(2, 44, 34, 0.3));
}

.my-course-card:hover {
  box-shadow: 0 20px 40px -12px rgba(16, 185, 129, 0.25);
  border-color: rgba(16, 185, 129, 0.4);
}
.dark .my-course-card:hover {
  box-shadow: 0 20px 40px -12px rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.5);
}

/* Icon animation on hover */
.card-icon {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.my-course-card:hover .card-icon {
  transform: scale(1.08) rotate(6deg);
}

/* Card title color shift */
.card-title {
  transition: color 0.35s ease;
}
.my-course-card:hover .card-title {
  color: #059669;
}
.dark .my-course-card:hover .card-title {
  color: #34d399;
}

/* Glow accent */
.card-glow {
  opacity: 0.2;
  transition: opacity 0.6s ease;
  will-change: opacity;
}
.my-course-card:hover .card-glow {
  opacity: 0.5;
}

/* Shimmer sweep effect */
.card-shimmer {
  opacity: 0;
  transition: opacity 0.4s ease;
}
.card-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.35),
    transparent
  );
  transform: translateX(-120%) skewX(-15deg);
  will-change: transform;
}
.dark .card-shimmer::before {
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.06),
    transparent
  );
}
.my-course-card:hover .card-shimmer {
  opacity: 1;
}
.my-course-card:hover .card-shimmer::before {
  transform: translateX(220%) skewX(-15deg);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ===== Featured Card (indigo theme) ===== */
.featured-card {
  background-color: #ffffff;
}
.dark .featured-card {
  background-color: #1e293b;
}

.featured-card:hover {
  box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.25);
  border-color: rgba(99, 102, 241, 0.4);
}
.dark .featured-card:hover {
  box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.5);
}

/* Featured card title */
.featured-card:hover .card-title {
  color: #4f46e5;
}
.dark .featured-card:hover .card-title {
  color: #818cf8;
}

/* Gradient overlay on hover */
.card-gradient-overlay {
  opacity: 0;
  background: linear-gradient(
    to bottom right,
    rgba(99, 102, 241, 0.05),
    rgba(168, 85, 247, 0.05),
    rgba(217, 70, 239, 0.05)
  );
  transition: opacity 0.5s ease;
  will-change: opacity;
}
.featured-card:hover .card-gradient-overlay {
  opacity: 1;
}

/* Image scale on hover */
.card-image {
  transform: scale(1) translate3d(0, 0, 0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  backface-visibility: hidden;
}
.featured-card:hover .card-image {
  transform: scale(1.08) translate3d(0, 0, 0);
}

.card-image-placeholder {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  display: inline-block;
}
.featured-card:hover .card-image-placeholder {
  transform: scale(1.15) rotate(6deg);
}

/* Price scale on hover */
.card-price {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  transform-origin: left center;
}
.featured-card:hover .card-price {
  transform: scale(1.08);
}

/* Number badge hover */
.number-badge {
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.4s ease,
    color 0.4s ease;
  will-change: transform;
}
.featured-card:hover .number-badge {
  transform: scale(1.1);
  background: linear-gradient(to bottom right, #4f46e5, #9333ea);
  color: #ffffff;
}

/* Subject badge hover */
.subject-badge {
  transition: background 0.4s ease;
}
.featured-card:hover .subject-badge {
  background: linear-gradient(to right, #9333ea, #d946ef);
}

/* ===== Stat Cards ===== */
.stat-card {
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s ease,
    border-color 0.4s ease;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
.stat-card:hover {
  transform: translate3d(0, -4px, 0);
  box-shadow: 0 16px 32px -12px rgba(15, 23, 42, 0.15);
}
.stat-icon {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(6deg);
}

/* ===== Nav Arrow Buttons ===== */
.nav-arrow {
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  will-change: transform;
}
.nav-arrow:hover {
  transform: scale(1.1);
  background-color: #4f46e5;
  border-color: #4f46e5;
  color: #ffffff;
  box-shadow: 0 8px 20px -6px rgba(79, 70, 229, 0.5);
}
.dark .nav-arrow:hover {
  background-color: #4f46e5;
  border-color: #4f46e5;
  color: #ffffff;
}

/* ===== FAB ===== */
.fab-button {
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s ease;
  will-change: transform;
}
.fab-button:hover {
  transform: scale(1.1);
  box-shadow: 0 24px 48px -12px rgba(99, 102, 241, 0.6);
}

/* ===== Blob animation ===== */
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-blob {
  animation: blob 20s infinite ease-in-out;
  will-change: transform;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* ===== Ping slow ===== */
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.5; }
  70% { transform: scale(1.4); opacity: 0; }
  100% { transform: scale(1.4); opacity: 0; }
}
.animate-ping-slow {
  animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  will-change: transform, opacity;
}

/* ===== Page scrollbar ===== */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.dark ::-webkit-scrollbar-thumb { background: #475569; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* ===== Reduced motion ===== */
@media (prefers-reduced-motion: reduce) {
  .course-card,
  .stat-card,
  .nav-arrow,
  .fab-button,
  .card-icon,
  .card-image,
  .card-image-placeholder,
  .card-price,
  .number-badge,
  .card-glow,
  .card-gradient-overlay,
  .card-shimmer,
  .card-shimmer::before {
    transition: none !important;
    animation: none !important;
  }
  .course-card:hover,
  .stat-card:hover,
  .nav-arrow:hover,
  .fab-button:hover {
    transform: none !important;
  }
}
</style>