<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section (3D style) -->
    <section class="relative overflow-hidden hero-3d-bg">
      <div class="absolute inset-0 opacity-35" :style="textureStyle"></div>
      <div class="hero-grid absolute inset-0"></div>

      <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl hero-float-slow"></div>
      <div class="absolute top-20 right-0 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl hero-float-fast"></div>
      <div class="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/35 blur-3xl hero-float-slow"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18">
        <div class="grid items-center gap-8 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <div class="inline-flex items-center gap-2 rounded-full border border-[#07363f]/15 bg-white/75 px-4 py-1.5 text-sm font-semibold text-[#0f4f5e] shadow-md backdrop-blur-md">
              <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              New session admissions open - 2026
            </div>

            <h1 class="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-[#052b35]">
              Build Your Future
              <span class="text-transparent bg-clip-text bg-linear-to-r from-[#0f766e] via-[#0ea5a6] to-[#fb923c]">with the Right Education</span>
            </h1>

            <p class="mt-5 max-w-2xl text-base sm:text-lg text-[#18414b] leading-relaxed">
              “School boards ho ya coding ka future — yahan milti hai complete learning jo marks bhi badhaye aur skills bhi.”
            </p>

            <div class="mt-7 flex flex-col sm:flex-row gap-3">
              <router-link
                to="/courses"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#073b4c] px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Start Exploring
                <i class="fa-solid fa-arrow-right"></i>
              </router-link>
              <router-link
                to="/signup"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0f766e]/35 bg-white/75 px-6 py-3 font-semibold text-[#0c4a58] transition-all duration-300 hover:bg-white"
              >
                Join Now
                <i class="fa-solid fa-play"></i>
              </router-link>
            </div>

            <!-- <div class="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="rounded-2xl bg-white/80 border border-[#0f766e]/15 p-3 text-center shadow-md backdrop-blur-sm">
                <p class="text-xl font-black text-[#073b4c]">1000+</p>
                <p class="text-xs text-[#1f5a67]">Students</p>
              </div>
              <div class="rounded-2xl bg-white/80 border border-[#0f766e]/15 p-3 text-center shadow-md backdrop-blur-sm">
                <p class="text-xl font-black text-[#073b4c]">98%</p>
                <p class="text-xs text-[#1f5a67]">Satisfaction</p>
              </div>
              <div class="rounded-2xl bg-white/80 border border-[#0f766e]/15 p-3 text-center shadow-md backdrop-blur-sm">
                <p class="text-xl font-black text-[#073b4c]">60+</p>
                <p class="text-xs text-[#1f5a67]">Live Batches</p>
              </div>
              <div class="rounded-2xl bg-white/80 border border-[#0f766e]/15 p-3 text-center shadow-md backdrop-blur-sm">
                <p class="text-xl font-black text-[#073b4c]">24/7</p>
                <p class="text-xs text-[#1f5a67]">Mentor Help</p>
              </div>
            </div> -->
          </div>

          <div class="lg:col-span-5 hero-stage px-2 sm:px-4">
            <div class="hero-card-3d rounded-4xl border border-white/70 bg-white/70 p-4 sm:p-5 shadow-[0_25px_60px_rgba(6,78,96,0.25)] backdrop-blur-md">
              <div class="relative overflow-hidden rounded-3xl">
                <img
                  :src="corsImg5"
                  alt="Students learning with mentor"
                  class="h-90 w-full object-cover sm:h-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-linear-to-t from-[#001b24]/65 via-[#001b24]/20 to-transparent"></div>

                <div class="absolute top-4 left-4 rounded-xl border border-white/40 bg-black/50 px-3 py-2 backdrop-blur-md">
                  <p class="text-[11px] uppercase tracking-wide text-white/85">Learn With Us</p>
                  <p class="text-sm font-bold text-white">Academics + Coding + Projects</p>
                </div>

                <div class="absolute bottom-4 right-4 hero-card-tilt rounded-2xl border border-white/40 bg-green-500/20 p-3 backdrop-blur-md">
                  <p class="text-xs text-stone-200">This Month</p>
                  <p class="text-base font-bold text-white">Board, Web Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
<section class="py-20 px-4 bg-gray-50 dark:bg-gray-900">
  <div class="max-w-7xl mx-auto">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="inline-block px-4 py-1.5 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 rounded-full text-sm font-medium mb-4">
        Why Choose Us
      </span>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Features That Set Us Apart
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        We combine traditional teaching values with modern educational methods to deliver
        the best learning experience for our students.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="(feature, index) in whyChooseUs" :key="index"
        class="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
        <div :class="`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`">
          <i :class="feature.icon" class="text-white text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ feature.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</section>

    <!-- How to Join Section - Enhanced -->
    <section class="py-20 px-4 bg-linear-to-br from-blue-50 via-teal-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            How to <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">Join</span>
          </h2>
          <div class="w-24 h-1 bg-linear-to-r from-blue-600 to-teal-500 mx-auto rounded-full"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">Start your learning journey in 4 simple steps</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
          <!-- Step Cards -->
          <div v-for="(step, index) in steps" :key="index" 
            class="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                {{ index + 1 }}
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ step.title }}</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center mt-12" data-aos="fade-up">
          <router-link to="/signup" 
            class="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            Start Your Journey Now
            <i class="fa-solid fa-arrow-right-long"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Notice Section with Mobile Carousel -->
    <section class="py-16 px-4 bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-sm font-semibold mb-4">
            <i class="fa-solid fa-bell"></i>Latest Notices
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Important <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-rose-500">Announcements</span>
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Stay updated with new courses, batch schedules, and important notices.
          </p>
        </div>

        <!-- Desktop Grid View (Hidden on Mobile) -->
        <div class="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
          <article
            v-for="(notice, index) in notices"
            :key="index"
            class="rounded-2xl border border-orange-100 bg-white/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div class="flex items-start justify-between gap-3 mb-4">
              <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                :class="notice.type === 'Course'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : notice.type === 'Batch'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'"
              >
                {{ notice.type }}
              </span>
              <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ notice.date }}</span>
            </div>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ notice.title }}</h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-4">{{ notice.description }}</p>

            <router-link
              :to="notice.link"
              class="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition-colors hover:text-rose-700 dark:text-rose-400"
            >
              {{ notice.cta }}
              <i class="fa-solid fa-arrow-right"></i>
            </router-link>
          </article>
        </div>

        <!-- Mobile Carousel View (Visible on Mobile Only) -->
        <div class="md:hidden">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :pagination="{ clickable: true }"
            :navigation="true"
            class="notices-swiper"
          >
            <SwiperSlide v-for="(notice, index) in notices" :key="index">
              <article class="rounded-2xl border border-orange-100 bg-white/90 p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 h-full">
                <div class="flex items-start justify-between gap-3 mb-4">
                  <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    :class="notice.type === 'Course'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : notice.type === 'Batch'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'"
                  >
                    {{ notice.type }}
                  </span>
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ notice.date }}</span>
                </div>

                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">{{ notice.title }}</h3>
                <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-6">{{ notice.description }}</p>

                <router-link
                  :to="notice.link"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition-colors hover:text-rose-700 dark:text-rose-400"
                >
                  {{ notice.cta }}
                  <i class="fa-solid fa-arrow-right"></i>
                </router-link>
              </article>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>

    <!-- Our Courses Section - Enhanced with Mobile Carousel -->
    <section class="py-20 px-4 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-semibold mb-4">
            Featured Programs
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Our <span class="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-pink-500">Courses</span>
          </h2>
          <div class="w-24 h-1 bg-linear-to-r from-red-600 to-pink-500 mx-auto rounded-full"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">High-value programs with clear outcomes, pricing, and a direct path to enrollment</p>
        </div>

        <!-- Desktop Grid View (Hidden on Mobile) -->
        <div class="hidden lg:grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(course, index) in featuredCourses"
            :key="course.slug"
            class="group overflow-hidden rounded-3xl border border-gray-200/80 bg-linear-to-br from-gray-50 to-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-800"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="relative h-56 overflow-hidden">
              <img :src="course.image" :alt="course.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute left-4 top-4 flex flex-wrap gap-2">
                <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
                  {{ course.badge }}
                </span>
                <span class="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {{ course.level }}
                </span>
              </div>
              <div class="absolute bottom-4 left-4 right-4">
                <p class="text-sm font-medium uppercase tracking-[0.2em] text-white/80">{{ course.audience }}</p>
                <h3 class="mt-1 text-2xl font-bold text-white">{{ course.title }}</h3>
              </div>
            </div>

            <div class="p-6">
              <p class="text-sm font-semibold text-red-600 dark:text-red-300">{{ course.subtitle }}</p>
              <p class="mt-3 line-clamp-3 text-gray-600 dark:text-gray-300">{{ course.description }}</p>

              <div class="mt-5 flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3 dark:bg-gray-700/60">
                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Fee</p>
                  <div class="flex items-end gap-2">
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(course.offerPrice) }}</span>
                    <span class="pb-1 text-sm text-gray-500 line-through">{{ formatCurrency(course.price) }}</span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Duration</p>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ course.duration }}</p>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="highlight in course.highlights.slice(0, 3)"
                  :key="highlight"
                  class="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-200"
                >
                  {{ highlight }}
                </span>
              </div>

              <div class="mt-6 flex items-center justify-between gap-3">
                <div class="flex items-center gap-1 text-yellow-500">
                  <i v-for="star in course.rating" :key="star" class="fa-solid fa-star"></i>
                </div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ course.seatsLeft }} seats left</p>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <router-link
                  :to="`/courses/${course.slug}`"
                  class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  View Details
                  <i class="fa-solid fa-arrow-right"></i>
                </router-link>
                <router-link
                  to="/signup"
                  class="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-red-400 hover:text-red-600 dark:border-gray-600 dark:text-gray-200"
                >
                  Enroll Now
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <!-- Mobile Carousel View (Visible on Mobile Only) -->
        <div class="lg:hidden">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :pagination="{ clickable: true }"
            :navigation="true"
            class="courses-swiper pb-14"
          >
            <SwiperSlide v-for="course in featuredCourses" :key="course.slug">
              <article class="group h-full overflow-hidden rounded-3xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-lg transition-all duration-500 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
                <div class="relative h-56 overflow-hidden">
                  <img :src="course.image" :alt="course.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div class="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
                      {{ course.badge }}
                    </span>
                    <span class="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {{ course.level }}
                    </span>
                  </div>
                  <div class="absolute bottom-4 left-4 right-4">
                    <p class="text-sm font-medium uppercase tracking-[0.2em] text-white/80">{{ course.audience }}</p>
                    <h3 class="mt-1 text-2xl font-bold text-white">{{ course.title }}</h3>
                  </div>
                </div>

                <div class="p-6">
                  <p class="text-sm font-semibold text-red-600 dark:text-red-300">{{ course.subtitle }}</p>
                  <p class="mt-3 text-gray-600 dark:text-gray-300">{{ course.description }}</p>

                  <div class="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-gray-100 px-4 py-3 dark:bg-gray-700/60">
                    <div>
                      <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Fee</p>
                      <p class="text-xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(course.offerPrice) }}</p>
                      <p class="text-xs text-gray-500 line-through">{{ formatCurrency(course.price) }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Duration</p>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ course.duration }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ course.seatsLeft }} seats left</p>
                    </div>
                  </div>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="highlight in course.highlights.slice(0, 2)"
                      :key="highlight"
                      class="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-200"
                    >
                      {{ highlight }}
                    </span>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <router-link
                      :to="`/courses/${course.slug}`"
                      class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg"
                    >
                      View Details
                      <i class="fa-solid fa-arrow-right"></i>
                    </router-link>
                    <router-link
                      to="/signup"
                      class="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      Enroll Now
                    </router-link>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          </Swiper>
        </div>

        <div class="mt-10 text-center" data-aos="fade-up">
          <router-link
            to="/courses"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-[#073b4c] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            View All Courses
            <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Director Section - Enhanced -->
<section class="py-20 px-4 bg-linear-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto mb-12">
      <span class="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
        Leadership
      </span>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Message from the <span class="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Director</span>
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A word of inspiration and guidance from our visionary leader
      </p>
    </div>

    <!-- Director Card -->
    <div class="relative group">
      <!-- Animated Background Effects -->
      <div class="absolute -inset-1 bg-linear-to-r from-purple-600 via-pink-600 to-red-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
      
      <!-- Stats Badges - Floating Elements -->
      <div class="absolute -top-4 -right-4 z-20 flex gap-2">
        <div class="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
          <span class="text-sm font-bold text-purple-600">5+ Years</span>
        </div>
        <!-- <div class="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
          <span class="text-sm font-bold text-pink-600">5000+ Students</span>
        </div> -->
      </div>

      <!-- Main Content -->
      <div class="relative bg-linear-to-r from-purple-600 via-pink-600 to-red-500 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
        <!-- Texture Overlay -->
        <div class="absolute inset-0 opacity-20" :style="textureStyle"></div>

        <!-- Animated Shapes -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s"></div>

        <div class="relative flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12 z-10">
          <!-- Director Image with Social Links -->
          <div class="shrink-0">
            <div class="relative">
              <!-- Animated Ring -->
              <div class="absolute -inset-2 rounded-full bg-linear-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-75 blur-md animate-pulse"></div>
              
              <!-- Image Container -->
              <!-- <div class="relative">
                <img src="../../assets/images/director_img.jpg" alt="Director Ankit Kumar" 
                  class="relative w-40 h-40 lg:w-56 lg:h-56 rounded-full border-4 border-white shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-500" />
                
                
                <div class="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5 border-2 border-white shadow-lg">
                  <i class="fa-solid fa-check-circle text-white text-sm"></i>
                </div>
              </div> -->

              <!-- Social Icons -->
              <div class="flex justify-center gap-2 mt-4">
                <a href="#" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                  <i class="fa-brands fa-linkedin-in text-white text-sm"></i>
                </a>
                <a href="#" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                  <i class="fa-brands fa-twitter text-white text-sm"></i>
                </a>
                <a href="#" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                  <i class="fa-brands fa-instagram text-white text-sm"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Director Info -->
          <div class="flex-1 text-center lg:text-left">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <i class="fa-solid fa-star text-yellow-300 text-sm"></i>
              <span class="text-white text-sm font-medium">Visionary Leader</span>
            </div>

            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-2">
              Ankit Kumar
            </h3>
            <p class="text-yellow-300 font-semibold mb-4 flex items-center gap-2 justify-center lg:justify-start">
              <i class="fa-solid fa-graduation-cap"></i>
              Director & Founder
            </p>

            <!-- Message -->
            <div class="mb-6">
              <p class="text-white/90 leading-relaxed text-base lg:text-lg">
                "I am passionate about creating an educational ecosystem where every student can thrive. 
                At <span class="font-bold text-yellow-200">Educational Society</span>, we believe in nurturing 
                not just academic excellence but also character, creativity, and critical thinking. 
                Our dedicated team of educators works tirelessly to ensure that every child receives 
                personalized attention and guidance. Together, let's build a brighter future!"
              </p>
            </div>

            <!-- Quote and Signature -->
            <div class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div class="flex items-center gap-2 text-white/80">
                <i class="fa-solid fa-quote-left text-2xl text-yellow-300"></i>
                <span class="text-sm">Education is the most powerful weapon</span>
              </div>
              <div class="h-6 w-px bg-white/30 hidden sm:block"></div>
              <div class="flex items-center gap-1">
                <span class="text-yellow-300 font-serif text-xl">Ankit Kumar</span>
                <i class="fa-solid fa-pen-fancy text-white/60 text-sm"></i>
              </div>
            </div>

            <!-- Achievement Icons -->
            <div class="mt-6 flex gap-4 justify-center lg:justify-start">
              <!-- <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <i class="fa-solid fa-trophy text-yellow-300 text-sm"></i>
                <span class="text-white text-xs"></span>
              </div> -->
              <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <i class="fa-solid fa-award text-yellow-300 text-sm"></i>
                <span class="text-white text-xs">IIT Madras</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative Bottom Element -->
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-300 to-transparent"></div>
      </div>
    </div>
  </div>
</section>

    <!-- Testimonials Section - Carousel -->
    <section
      class="py-20 px-4 bg-linear-to-br from-indigo-100 via-purple-200 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span
            class="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Parents & Students Say
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Hear from our successful students and their families about their learning journey with us
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div
            class="relative bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8 md:p-12"
            @mouseenter="pauseTestimonialTimer" @mouseleave="resumeTestimonialTimer">
            <i
              class="fa-solid fa-quote-left absolute top-6 left-6 text-4xl text-indigo-200 dark:text-indigo-800 opacity-50"></i>

            <div class="relative">
              <div class="flex flex-col items-center text-center">
                <img :src="parentstestimonials[currentTestimonial].image" :alt="parentstestimonials[currentTestimonial].name"
                  class="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-6" />

                <div class="flex gap-1 mb-6 text-yellow-400">
                  <i class="fa-solid fa-star" v-for="star in parentstestimonials[currentTestimonial].rating" :key="star"></i>
                </div>

                <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl leading-relaxed">
                  "{{ parentstestimonials[currentTestimonial].content }}"
                </p>

                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white text-lg">
                    {{ parentstestimonials[currentTestimonial].name }}
                  </h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">
                    {{ parentstestimonials[currentTestimonial].role }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex justify-center gap-4 mt-8">
              <button @click="prevTestimonial"
                class="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all hover:scale-110">
                <i class="fa-solid fa-chevron-left text-gray-600 dark:text-gray-300"></i>
              </button>
              <div class="flex items-center gap-2">
                <button v-for="(_, index) in parentstestimonials" :key="index" @click="goToTestimonial(index)" :class="[
                  'rounded-full transition-all duration-300',
                  index === currentTestimonial
                    ? 'bg-indigo-600 w-8 h-2.5'
                    : 'bg-gray-300 dark:bg-gray-600 w-2.5 h-2.5 hover:bg-gray-400'
                ]" />
              </div>
              <button @click="nextTestimonial"
                class="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all hover:scale-110">
                <i class="fa-solid fa-chevron-right text-gray-600 dark:text-gray-300"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section (New) -->
    <section class="py-16 px-4 bg-linear-to-r from-fuchsia-600 to-pink-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated with Us</h2>
        <p class="text-white/90 mb-8">Subscribe to our newsletter for the latest updates and offers</p>
        <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input type="email" v-model="newsletterEmail" placeholder="Enter your email" 
            class="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white outline-none" required />
          <button type="submit" 
            :disabled="newsletterLoading"
            class="px-8 py-3 bg-white text-fuchsia-600 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:opacity-70">
            {{ newsletterLoading ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </form>
        <div
          v-if="newsletterStatus.message"
          class="mx-auto mt-5 max-w-lg rounded-2xl border px-4 py-3 text-left text-sm shadow-lg"
          :class="newsletterStatus.type === 'success' ? 'border-emerald-200 bg-emerald-700 text-emerald-200' : 'border-rose-200 bg-rose-700 text-rose-200'"
        >
          {{ newsletterStatus.message }}
          <!-- remove message -->
          <button @click="newsletterStatus.message = ''" class="float-right text-gray-400 hover:text-gray-200">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import api from "../../services/axios.js";
import corsImg5 from "../../assets/images/cors_img-5.webp";
import { courseCatalog } from "../../data/courseCatalog.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = [Pagination, Navigation];

// Notice data - Edit these to publish announcements on home page
const notices = ref([
  {
    type: "Course",
    title: "New Full Stack Web Development",
    description: "Enroll in our new Full Stack Web Development course. Learn React, Node.js, and database design from industry experts.",
    date: "22 Apr 2026",
    cta: "View Courses",
    link: "/courses"
  },
  {
    type: "Batch",
    title: "Evening Batch Starts 1 May",
    description: "Fresh evening batch for Class 9-12 begins May 1st. Perfect for working professionals and students.",
    date: "22 Apr 2026",
    cta: "Enroll Now",
    link: "/signup"
  },
  {
    type: "General",
    title: "Fee Payment Deadline Extended",
    description: "Extended fee payment deadline to 30 April. Log in to your dashboard to complete your payment.",
    date: "22 Apr 2026",
    cta: "Go to Dashboard",
    link: "/login"
  }
]);

// Steps data
const steps = ref([
  { title: "Sign Up", description: "Create your account using the Sign Up form." },
  { title: "Login", description: "Log in to your account with your registered credentials." },
  { title: "Select & Enroll", description: "Choose a course from the Courses page and complete enrollment." },
  { title: "Pay Fee & Access", description: "Pay the course fee, then get access to that course content." }
]);

const featuredCourses = computed(() => courseCatalog.slice(0, 6));

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

// Testimonials data
const testimonials = ref([
  {
    name: "Priya Sharma",
    role: "Web Development Student",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    borderColor: "border-indigo-400",
    message: "The teachers are very supportive and the platform is easy to use. I learned Python and built my first web app here!"
  },
  {
    name: "Rahul Verma",
    role: "Python Student",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    rating: 4,
    borderColor: "border-pink-400",
    message: "This society helped me build a strong foundation in Python. The step-by-step guidance made learning fun and effective!"
  },
  {
    name: "Sneha Gupta",
    role: "Data Science Student",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 5,
    borderColor: "border-green-400",
    message: "The courses are well structured. I was able to practice real-world projects that boosted my confidence in Data Science."
  }
]);


// Newsletter subscription
const newsletterEmail = ref("");
const newsletterStatus = ref({ type: "", message: "" });
const newsletterLoading = ref(false);

const subscribeNewsletter = async () => {
  const email = newsletterEmail.value.trim();

  if (!email) {
    newsletterStatus.value = {
      type: "error",
      message: "Email is required"
    };
    return;
  }

  newsletterLoading.value = true;

  try {
    const response = await api.post("/api/subscribers", { email });
    newsletterStatus.value = {
      type: "success",
      message: response.data?.message || "Subscribed successfully!"
    };
    newsletterEmail.value = "";
  } catch (error) {
    newsletterStatus.value = {
      type: "error",
      message: error.response?.data?.error || "Subscription failed"
    };
  } finally {
    newsletterLoading.value = false;
  }
};

const textureStyle = computed(() => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat'
  };
});

// Why Choose Us data
const whyChooseUs = ref([
  {
    icon: "fa-solid fa-chalkboard-user",
    title: "Experienced Teachers",
    description: "Learn from highly qualified educators with years of teaching experience and proven results.",
    color: "from-fuchsia-500 to-fuchsia-600",
  },
  {
    icon: "fa-solid fa-laptop-code",
    title: "Smart Classes",
    description: "Modern digital classrooms with interactive learning tools and multimedia resources.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: "fa-solid fa-indian-rupee-sign",
    title: "Affordable Fees",
    description: "Quality education at competitive prices with flexible payment options available.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: "fa-solid fa-book-open",
    title: "Comprehensive Curriculum",
    description: "Well-structured syllabus covering all aspects of academic excellence and skill development.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: "fa-solid fa-video",
    title: "Live Interactive Classes",
    description: "Real-time online classes with doubt clearing sessions and recorded lectures for revision.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Performance Tracking",
    description: "Regular assessments, progress reports, and personalized feedback for continuous improvement.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: "fa-solid fa-users",
    title: "Small Batch Size",
    description: "Personalized attention with limited students per batch for better interaction and learning.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: "fa-solid fa-certificate",
    title: "Certification",
    description: "Get recognized certificates upon course completion to boost your academic profile.",
    color: "from-indigo-500 to-indigo-600",
  },
]);

// Testimonials data for carousel
const parentstestimonials = ref([
  {
    name: "Priya Sharma",
    role: "Parent of Class X Student",
    content: "Educational Society has transformed my child's academic journey. The teachers are dedicated and the results speak for themselves.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=4F46E5&color=fff",
  },
  {
    name: "Rahul Kumar",
    role: "Class XII Student",
    content: "The PCM coaching here is exceptional. I cleared JEE Mains with a great score thanks to the expert faculty.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Rahul+Kumar&background=06B6D4&color=fff",
  },
  {
    name: "Anjali Gupta",
    role: "Parent of Class V Student",
    content: "A nurturing environment for young learners. My daughter loves going to school every day.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Anjali+Gupta&background=F59E0B&color=fff",
  },
  {
    name: "Amit Singh",
    role: "Class X Alumnus",
    content: "Scored 95% in board exams! The study material and doubt sessions were incredibly helpful.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Amit+Singh&background=10B981&color=fff",
  },
  {
    name: "Neha Patel",
    role: "Class VIII Student",
    content: "The interactive classes and experienced teachers make learning fun and easy. I've improved my grades significantly!",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Neha+Patel&background=8B5CF6&color=fff",
  },
]);

// Testimonial carousel logic
const currentTestimonial = ref(0);
let testimonialInterval = null;

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % parentstestimonials.value.length;
};

const prevTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value - 1 + parentstestimonials.value.length) % parentstestimonials.value.length;
};

const goToTestimonial = (index) => {
  currentTestimonial.value = index;
  resetTestimonialTimer();
};

const startTestimonialTimer = () => {
  stopTestimonialTimer();
  testimonialInterval = setInterval(nextTestimonial, 5000);
};

const stopTestimonialTimer = () => {
  if (testimonialInterval) clearInterval(testimonialInterval);
};

const resetTestimonialTimer = () => {
  stopTestimonialTimer();
  startTestimonialTimer();
};

// Optional: Pause on hover
const pauseTestimonialTimer = () => {
  stopTestimonialTimer();
};

const resumeTestimonialTimer = () => {
  startTestimonialTimer();
};

onMounted(() => {
  startTestimonialTimer();
});

onBeforeUnmount(() => {
  stopTestimonialTimer();
});
</script>

<style scoped>
.hero-3d-bg {
  background: radial-gradient(circle at 15% 20%, #fff4d6 0%, #ffe4cf 28%, #caefe8 62%, #9fe0df 100%);
}

.hero-grid {
  background-image:
    linear-gradient(rgba(7, 59, 76, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(7, 59, 76, 0.08) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 90%);
}

.hero-stage {
  perspective: 1200px;
}

.hero-card-3d {
  transform: rotateY(-9deg) rotateX(3deg);
  transition: transform 0.45s ease, box-shadow 0.45s ease;
}

.hero-card-3d:hover {
  transform: rotateY(-3deg) rotateX(1deg) translateY(-6px);
  box-shadow: 0 35px 70px rgba(6, 78, 96, 0.3);
}

.hero-card-tilt {
  transform: rotate(-4deg);
}

.hero-float-slow {
  animation: heroFloatSlow 10s ease-in-out infinite;
}

.hero-float-fast {
  animation: heroFloatFast 7s ease-in-out infinite;
}

@keyframes heroFloatSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes heroFloatFast {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(14px); }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-4xl {
    font-size: 2rem;
  }

  .hero-card-3d {
    transform: none;
  }
}

.texture-bg {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
}

.texture-bg {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Swiper Carousel Styles for Mobile */
.courses-swiper {
  padding-bottom: 0;
}

:deep(.swiper-pagination) {
  position: absolute;
  bottom: 0 !important;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(239, 68, 68, 0.3);
  border: 2px solid rgb(239, 68, 68);
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: rgb(239, 68, 68);
  transform: scale(1.2);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 30px;
  height: 30px;
  background-color: rgba(239, 68, 68, 0.85);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 13px;
  color: white;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background-color: rgb(220, 38, 38);
  transform: translateY(-50%) scale(1.12);
  box-shadow: 0 3px 10px rgba(239, 68, 68, 0.35);
}

:deep(.swiper-button-prev) {
  left: 8px;
  right: auto;
}

:deep(.swiper-button-next) {
  right: 8px;
  left: auto;
}

:deep(.swiper-wrapper) {
  align-items: stretch;
}

:deep(.swiper-slide) {
  display: flex !important;
  align-items: stretch;
}

/* Notice Carousel Styles for Mobile */
.notices-swiper {
  padding-bottom: 50px;
}

.notices-swiper :deep(.swiper-pagination) {
  position: absolute;
  bottom: 0 !important;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.notices-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(249, 115, 22, 0.3);
  border: 2px solid rgb(249, 115, 22);
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0;
}

.notices-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: rgb(249, 115, 22);
  transform: scale(1.2);
}

.notices-swiper :deep(.swiper-button-next),
.notices-swiper :deep(.swiper-button-prev) {
  width: 32px;
  height: 32px;
  background-color: rgba(249, 115, 22, 0.85);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.notices-swiper :deep(.swiper-button-next:after),
.notices-swiper :deep(.swiper-button-prev:after) {
  font-size: 12px;
  color: white;
}

.notices-swiper :deep(.swiper-button-next:hover),
.notices-swiper :deep(.swiper-button-prev:hover) {
  background-color: rgb(231, 76, 12);
  transform: translateY(-50%) scale(1.15);
  box-shadow: 0 3px 10px rgba(249, 115, 22, 0.35);
}

.notices-swiper :deep(.swiper-button-prev) {
  left: 8px;
  right: auto;
}

.notices-swiper :deep(.swiper-button-next) {
  right: 8px;
  left: auto;
}
</style>