<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50 px-4 py-10 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 relative overflow-hidden">
    <!-- Ambient background orbs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full blur-[120px] opacity-20 dark:opacity-10 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full blur-[120px] opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
    </div>

    <!-- ================= HERO HEADER ================= -->
    <div class="relative mx-auto mb-14 max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#0f4c5c] via-[#0b7285] to-[#155e75] px-6 py-12 text-white shadow-[0_30px_80px_-20px_rgba(11,114,133,0.5)] sm:px-10">
      <div class="course-hero-grid absolute inset-0"></div>

      <div class="absolute -top-24 right-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px]"></div>
      <div class="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-purple-400/20 blur-[100px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-teal-300/10 blur-[120px]"></div>

      <div class="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <span class="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-yellow-200 backdrop-blur-md overflow-hidden">
            <span class="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent"></span>
            <span class="relative flex h-1.5 w-1.5 rounded-full bg-yellow-300 animate-pulse"></span>
            <span class="relative">Popular Programs</span>
          </span>

          <h1 class="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-yellow-300 sm:text-5xl lg:text-6xl animate-[fade-up_0.8s_ease-out]">
            Courses designed to help
            <br class="hidden sm:block" />
            students
            <span class="relative inline-block">
              <span class="bg-gradient-to-r from-cyan-200 via-teal-200 to-emerald-200 bg-clip-text text-transparent">
                enroll faster
              </span>
              <svg class="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                <path d="M2 4C50 1 100 1 150 2.5C200 4 250 4 298 2" stroke="url(#heroGrad)" stroke-width="2.5" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="300" y2="0">
                    <stop offset="0%" stop-color="#67e8f9"/>
                    <stop offset="100%" stop-color="#6ee7b7"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-7 text-cyan-50/90 sm:text-lg animate-[fade-up_0.8s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            Transparent pricing. Real-world skills. A personalized learning path that turns curiosity into enrollment.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-4 text-sm animate-[fade-up_0.8s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 border-2 border-white/30 flex items-center justify-center text-[10px] font-bold">A</div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white/30 flex items-center justify-center text-[10px] font-bold">B</div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white/30 flex items-center justify-center text-[10px] font-bold">C</div>
              </div>
              <span class="text-cyan-50/90">Join thousands of learners</span>
            </div>
            <div class="h-4 w-px bg-white/20"></div>
            <div class="flex items-center gap-1.5 text-yellow-200">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.975z"/>
              </svg>
              <span class="font-bold">{{ averageRating.toFixed(1) }}</span>
              <span class="text-cyan-50/80">avg rating</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 text-center sm:gap-4 animate-[fade-up_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div class="group rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all duration-500 hover:bg-white/20 hover:-translate-y-1 hover:border-white/30">
            <div class="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg class="w-4 h-4 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <p class="text-2xl font-black">{{ numberOfCourses }}</p>
            <p class="mt-1 text-[11px] uppercase tracking-wider text-cyan-100/80">Programs</p>
          </div>

          <div class="group rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all duration-500 hover:bg-white/20 hover:-translate-y-1 hover:border-white/30">
            <div class="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg class="w-4 h-4 text-yellow-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.975z"/>
              </svg>
            </div>
            <p class="text-2xl font-black">{{ averageRating.toFixed(1) }}★</p>
            <p class="mt-1 text-[11px] uppercase tracking-wider text-cyan-100/80">Avg Rating</p>
          </div>

          <div class="group rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all duration-500 hover:bg-white/20 hover:-translate-y-1 hover:border-white/30">
            <div class="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg class="w-4 h-4 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <p class="text-2xl font-black">Fast</p>
            <p class="mt-1 text-[11px] uppercase tracking-wider text-cyan-100/80">Enrollment</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= SECTION HEADER ================= -->
    <div class="mx-auto max-w-7xl mb-8">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 mb-2">
            <span class="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-400">Featured</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Explore Our Courses
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Handpicked programs to accelerate your career
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span class="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            <span class="text-cyan-600 dark:text-cyan-400 font-black">{{ numberOfCourses }}</span>
            programs
          </span>
          <!-- Carousel navigation arrows – MOBILE ONLY -->
          <div class="flex sm:hidden items-center gap-2">
            <button
              @click="scrollCarousel(-1)"
              class="carousel-arrow w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md"
              aria-label="Previous course"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              @click="scrollCarousel(1)"
              class="carousel-arrow w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md"
              aria-label="Next course"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= MOBILE CAROUSEL (sm:hidden) ================= -->
    <div class="relative mx-auto max-w-7xl sm:hidden">
      <div
        ref="carouselRail"
        class="carousel-rail flex gap-4 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory"
      >
        <div
          v-for="(course, index) in courses"
          :key="'mobile-' + index"
          class="course-card group relative overflow-hidden rounded-[1.75rem] flex-shrink-0 w-[85vw] snap-center"
        >
          <!-- Card index badge -->
          <div class="absolute top-4 right-4 z-30">
            <span class="number-badge flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-sm font-black text-cyan-700 dark:text-cyan-400 shadow-lg ring-1 ring-black/5">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <div class="card-hover-overlay absolute inset-0 rounded-[1.75rem] pointer-events-none z-10"></div>

          <!-- Image Section -->
          <div class="relative h-52 overflow-hidden">
            <img
              :src="course.image"
              :alt="course.title"
              class="card-image h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

            <div class="absolute left-4 top-4 z-20 flex gap-2">
              <span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-900 backdrop-blur">
                {{ course.badge }}
              </span>
              <span class="rounded-full bg-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
                {{ course.level }}
              </span>
            </div>

            <div class="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3 text-white">
              <div>
                <p class="text-[10px] uppercase tracking-[0.22em] text-cyan-100/90">Starts at</p>
                <p class="card-price text-3xl font-black leading-none drop-shadow-lg">{{ formatPrice(course.offerPrice) }}</p>
              </div>
              <div class="rounded-2xl bg-white/15 px-3 py-2 backdrop-blur-md border border-white/20">
                <p class="text-[10px] text-cyan-100">Save</p>
                <p class="text-sm font-black text-yellow-200">{{ savingsLabel(course) }}</p>
              </div>
            </div>
          </div>

          <!-- Body -->
          <div class="relative p-5 bg-white dark:bg-gray-900 z-20">
            <div class="mb-3 flex items-start justify-between gap-3">
              <h3 class="card-title text-lg font-black leading-tight text-gray-900 dark:text-white line-clamp-2">
                {{ course.title }}
              </h3>
              <div class="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
                ★ {{ course.rating }}
              </div>
            </div>

            <p class="mb-4 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {{ course.description }}
            </p>

            <div class="mb-4 flex flex-wrap gap-1.5">
              <span
                v-for="chip in course.highlights.slice(0, 3)"
                :key="chip"
                class="highlight-chip rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {{ chip }}
              </span>
            </div>

            <div class="price-block mb-4 rounded-xl border border-gray-200 bg-slate-50 p-3 dark:border-gray-800 dark:bg-gray-950/40">
              <div class="flex items-end justify-between gap-3">
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    Regular
                  </p>
                  <p class="mt-0.5 text-sm font-bold text-gray-500 line-through">{{ formatPrice(course.price) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                    Offer
                  </p>
                  <p class="mt-0.5 text-2xl font-black text-cyan-700 dark:text-cyan-400">
                    {{ formatPrice(course.offerPrice) }}
                  </p>
                </div>
              </div>
              <div class="mt-2 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span>{{ course.duration }}</span>
                <span class="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                  <span class="w-1 h-1 rounded-full bg-rose-500 animate-pulse"></span>
                  {{ course.seatsLeft }} left
                </span>
              </div>
            </div>

            <div class="flex gap-2">
              <router-link
                :to="`/courses/${course.slug}`"
                class="view-details-btn flex-1 rounded-xl border border-cyan-200 bg-white px-3 py-2.5 text-center text-[11px] font-black uppercase tracking-[0.14em] text-cyan-700 shadow-sm dark:border-cyan-900 dark:bg-gray-950 dark:text-cyan-300"
              >
                Details
              </router-link>

              <router-link
                :to="getEnrollmentRoute(course.id)"
                class="enroll-btn flex-1 rounded-xl bg-gradient-to-r from-[#0f766e] via-[#0ea5a6] to-[#0284c7] px-3 py-2.5 text-center text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-lg"
              >
                Enroll →
              </router-link>
            </div>
          </div>
        </div>

        <!-- End spacer -->
        <div class="flex-shrink-0 w-1"></div>
      </div>

      <!-- Mobile dot indicators -->
      <div class="flex justify-center gap-1.5 mt-2">
        <button
          v-for="(course, index) in courses"
          :key="'dot-' + index"
          @click="scrollToCard(index)"
          class="rounded-full transition-all duration-300"
          :class="activeDot === index
            ? 'w-6 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500'
            : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700'"
          :aria-label="`Go to course ${index + 1}`"
        ></button>
      </div>
    </div>

    <!-- ================= DESKTOP GRID (sm:grid) ================= -->
    <div class="hidden sm:grid mx-auto max-w-7xl grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(course, index) in courses"
        :key="'desktop-' + index"
        class="course-card group relative overflow-hidden rounded-[1.75rem]"
      >
        <!-- Hover gradient overlay -->
        <div class="card-hover-overlay absolute inset-0 rounded-[1.75rem] pointer-events-none z-10"></div>

        <!-- Image Section -->
        <div class="relative h-56 overflow-hidden">
          <img
            :src="course.image"
            :alt="course.title"
            class="card-image h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

          <!-- Number badge -->
          <div class="absolute top-4 right-4 z-20">
            <span class="number-badge flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-sm font-black text-cyan-700 dark:text-cyan-400 shadow-lg ring-1 ring-black/5">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <!-- Badges -->
          <div class="absolute left-4 top-4 z-20 flex gap-2">
            <span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-900 backdrop-blur">
              {{ course.badge }}
            </span>
            <span class="rounded-full bg-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
              {{ course.level }}
            </span>
          </div>

          <!-- Price info -->
          <div class="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3 text-white">
            <div>
              <p class="text-[10px] uppercase tracking-[0.22em] text-cyan-100/90">Starts at</p>
              <p class="card-price text-3xl font-black leading-none drop-shadow-lg">{{ formatPrice(course.offerPrice) }}</p>
            </div>
            <div class="rounded-2xl bg-white/15 px-3 py-2 backdrop-blur-md border border-white/20">
              <p class="text-[10px] text-cyan-100">Save</p>
              <p class="text-sm font-black text-yellow-200">{{ savingsLabel(course) }}</p>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="relative p-6 bg-white dark:bg-gray-900 z-20">
          <div class="mb-4 flex items-start justify-between gap-3">
            <h3 class="card-title text-xl font-black leading-tight text-gray-900 dark:text-white line-clamp-2">
              {{ course.title }}
            </h3>
            <div class="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
              ★ {{ course.rating }}
            </div>
          </div>

          <p class="mb-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {{ course.description }}
          </p>

          <div class="mb-5 flex flex-wrap gap-2">
            <span
              v-for="chip in course.highlights"
              :key="chip"
              class="highlight-chip rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {{ chip }}
            </span>
          </div>

          <div class="price-block mb-5 rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
            <div class="flex items-end justify-between gap-3">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Regular Fee
                </p>
                <p class="mt-1 text-lg font-bold text-gray-500 line-through">{{ formatPrice(course.price) }}</p>
              </div>
              <div class="text-right">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  Offer Price
                </p>
                <p class="mt-1 text-3xl font-black text-cyan-700 dark:text-cyan-400">
                  {{ formatPrice(course.offerPrice) }}
                </p>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ course.duration }}
              </span>
              <span class="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                {{ course.seatsLeft }} seats left
              </span>
            </div>
          </div>

          <div class="mb-5 flex items-center justify-between">
            <div class="flex items-center gap-1 text-amber-400">
              <svg
                v-for="star in 5"
                :key="star"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                :class="star <= course.rating ? 'fill-current' : 'fill-gray-300 dark:fill-gray-700'"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.975z" />
              </svg>
            </div>
            <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {{ course.rating }} out of 5
            </p>
          </div>

          <router-link
            :to="`/courses/${course.slug}`"
            class="view-details-btn group/link mb-3 block w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-cyan-700 shadow-sm dark:border-cyan-900 dark:bg-gray-950 dark:text-cyan-300"
          >
            View Details
            <span class="ml-2 inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </router-link>

          <router-link
            :to="getEnrollmentRoute(course.id)"
            class="enroll-btn group/link block w-full rounded-2xl bg-gradient-to-r from-[#0f766e] via-[#0ea5a6] to-[#0284c7] px-4 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg"
          >
            Enroll Now
            <span class="ml-2 inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </router-link>

          <p class="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            Quick admission • Limited seats
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { courseCatalog } from '../../data/courseCatalog.js'
import { getEnrollmentRoute } from '../../utils/auth.js'

const formatPrice = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

const savingsLabel = (course) => {
  const saving = Math.max((course.price || 0) - (course.offerPrice || 0), 0)
  return formatPrice(saving)
}

const courses = courseCatalog
const numberOfCourses = courses.length
const averageRating = courses.reduce((acc, course) => acc + (course.rating || 0), 0) / courses.length

/* ============ MOBILE CAROUSEL LOGIC (only used on mobile) ============ */
const carouselRail = ref(null)
const activeDot = ref(0)

const scrollCarousel = (direction) => {
  if (!carouselRail.value) return
  const card = carouselRail.value.querySelector('.course-card')
  if (!card) return
  const cardWidth = card.offsetWidth + 16 // 16 = gap-4
  carouselRail.value.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth',
  })
}

const scrollToCard = (index) => {
  if (!carouselRail.value) return
  const cards = carouselRail.value.querySelectorAll('.course-card')
  const target = cards[index]
  if (!target) return
  const cardWidth = target.offsetWidth
  const containerWidth = carouselRail.value.offsetWidth
  const scrollLeft = target.offsetLeft - (containerWidth - cardWidth) / 2
  carouselRail.value.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  })
  activeDot.value = index
}

const handleScroll = () => {
  if (!carouselRail.value) return
  const cards = carouselRail.value.querySelectorAll('.course-card')
  const containerCenter = carouselRail.value.scrollLeft + carouselRail.value.offsetWidth / 2
  let closestIndex = 0
  let closestDistance = Infinity
  cards.forEach((card, i) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(cardCenter - containerCenter)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = i
    }
  })
  activeDot.value = closestIndex
}

onMounted(() => {
  if (carouselRail.value) {
    carouselRail.value.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (carouselRail.value) {
    carouselRail.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.course-hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 78%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 78%);
  opacity: 0.45;
}

/* ============================================================
   CAROUSEL RAIL (mobile only)
   ============================================================ */
.carousel-rail {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-padding: 1rem;
  -webkit-overflow-scrolling: touch;
}
.carousel-rail::-webkit-scrollbar {
  display: none;
}

/* ============================================================
   CAROUSEL ARROW BUTTONS
   ============================================================ */
.carousel-arrow {
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  will-change: transform;
}
.carousel-arrow:hover {
  transform: scale(1.1);
  background: linear-gradient(to bottom right, #0891b2, #0d9488);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 12px 24px -8px rgba(6, 182, 212, 0.5);
}
.carousel-arrow:active {
  transform: scale(0.95);
}
.dark .carousel-arrow:hover {
  background: linear-gradient(to bottom right, #0891b2, #0d9488);
  border-color: transparent;
  color: #ffffff;
}

/* ============================================================
   PREMIUM GPU-ACCELERATED COURSE CARD
   ============================================================ */
.course-card {
  background-color: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 18px 50px -12px rgba(15, 23, 42, 0.08);
  transform: translate3d(0, 0, 0);
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.45s ease;
  will-change: transform, box-shadow;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

.dark .course-card {
  background-color: #111827;
  border-color: rgba(51, 65, 85, 0.5);
  box-shadow: 0 18px 50px -12px rgba(0, 0, 0, 0.5);
}

.course-card:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0 30px 70px -20px rgba(2, 132, 199, 0.3);
  border-color: rgba(6, 182, 212, 0.4);
}

.dark .course-card:hover {
  box-shadow: 0 30px 70px -20px rgba(6, 182, 212, 0.2);
  border-color: rgba(6, 182, 212, 0.5);
}

.card-hover-overlay {
  opacity: 0;
  background: linear-gradient(
    135deg,
    rgba(6, 182, 212, 0.06),
    rgba(20, 184, 166, 0.04),
    rgba(14, 165, 233, 0.06)
  );
  transition: opacity 0.5s ease;
  will-change: opacity;
}
.course-card:hover .card-hover-overlay {
  opacity: 1;
}

.card-image {
  transform: scale(1) translate3d(0, 0, 0);
  transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  backface-visibility: hidden;
}
.course-card:hover .card-image {
  transform: scale(1.1) translate3d(0, 0, 0);
}

.card-price {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  transform-origin: left center;
}
.course-card:hover .card-price {
  transform: scale(1.06);
}

.number-badge {
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.4s ease,
    color 0.4s ease;
  will-change: transform;
}
.course-card:hover .number-badge {
  transform: scale(1.12) rotate(-4deg);
  background: linear-gradient(to bottom right, #0891b2, #0d9488);
  color: #ffffff;
}

.card-title {
  transition: color 0.35s ease;
}
.course-card:hover .card-title {
  color: #0e7490;
}
.dark .course-card:hover .card-title {
  color: #22d3ee;
}

.highlight-chip {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.course-card:hover .highlight-chip {
  background-color: #ecfeff;
  color: #0e7490;
}
.dark .course-card:hover .highlight-chip {
  background-color: #164e63;
  color: #67e8f9;
}

.price-block {
  transition: border-color 0.4s ease, background-color 0.4s ease;
}
.course-card:hover .price-block {
  border-color: rgba(6, 182, 212, 0.3);
  background-color: rgba(236, 254, 255, 0.5);
}
.dark .course-card:hover .price-block {
  border-color: rgba(6, 182, 212, 0.4);
  background-color: rgba(8, 47, 73, 0.4);
}

.view-details-btn {
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
  will-change: transform;
}
.view-details-btn:hover {
  transform: translate3d(0, -2px, 0);
  border-color: #22d3ee;
  background-color: #ecfeff;
  box-shadow: 0 8px 20px -8px rgba(6, 182, 212, 0.3);
}
.dark .view-details-btn:hover {
  background-color: rgba(8, 47, 73, 0.5);
  border-color: #0891b2;
}

.enroll-btn {
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;
  will-change: transform;
}
.enroll-btn:hover {
  transform: translate3d(0, -2px, 0) scale(1.01);
  box-shadow: 0 16px 32px -12px rgba(2, 132, 199, 0.6);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .course-card,
  .card-image,
  .card-price,
  .number-badge,
  .view-details-btn,
  .enroll-btn,
  .carousel-arrow,
  .card-hover-overlay {
    transition: none !important;
  }
  .course-card:hover {
    transform: none !important;
  }
  .carousel-arrow:hover {
    transform: none !important;
  }
}
</style>

<style>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hero animations */
@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

/* Ambient blob animation */
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
</style>