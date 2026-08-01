<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section (3D style) -->
    <section class="relative min-h-screen flex items-center cred-hero-bg overflow-hidden">
      <!-- Premium Background Pattern -->
      <div class="absolute inset-0 cred-grid-pattern"></div>
      
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-indigo-500/5 blur-3xl"></div>

      <!-- CRED-style Animated Pillars (Background) -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="pillars-wrapper">
          <div 
            v-for="i in 20" 
            :key="`pillar-${i}`"
            class="cred-pillar"
            :style="{
              left: `${(i - 1) * 5}%`,
              height: `${30 + Math.random() * 70}%`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0.03 + Math.random() * 0.07,
              width: `${1 + Math.random() * 3}px`
            }"
          ></div>
        </div>
      </div>

      <!-- Floating Particles -->
      <div class="absolute inset-0 pointer-events-none">
        <div 
          v-for="i in 30" 
          :key="`particle-${i}`"
          class="cred-particle"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDuration: `${15 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: 0.1 + Math.random() * 0.2
          }"
        ></div>
      </div>

      <!-- Main Content -->
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full">
        <div class="grid items-center gap-12 lg:grid-cols-12">
          <!-- Left Content -->
          <div class="lg:col-span-7">
            <!-- Premium Badge -->
            <transition name="fade-slide" appear>
              <div class="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl premium-badge">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span class="text-xs font-medium tracking-wider text-white/80 uppercase">New session admissions open - 2026</span>
                <span class="ml-1 text-xs text-white/40">✨</span>
              </div>
            </transition>

            <!-- Main Heading -->
            <h1 class="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1]">
              <span class="text-white">Build Your</span>
              <br />
              <span class="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
                Future
              </span>
              <br />
              <span class="text-white">with the Right</span>
              <br />
              <span class="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
                Education
              </span>
            </h1>

            <!-- Description -->
            <p class="mt-6 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed font-light">
              Your journey to coding excellence starts here. Unlock your potential with code. 
              Transform ideas into digital solutions where curiosity meets coding magic.
            </p>

            <!-- CTA Buttons -->
            <div class="mt-10 flex flex-col sm:flex-row gap-4">
              <transition name="fade-slide-delayed" appear>
                <router-link
                  to="/courses"
                  class="group relative inline-flex items-center justify-center gap-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-0.5 overflow-hidden"
                >
                  <span class="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span class="relative z-10 flex items-center gap-2">
                    Start Exploring
                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </router-link>
              </transition>
              
              <router-link
                to="/signup"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm hover:-translate-y-0.5"
              >
                Join Now
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </router-link>
            </div>

            <!-- Stats -->
            <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div 
                v-for="(stat, index) in stats" 
                :key="index"
                class="group relative rounded-2xl border border-white/5 bg-white/5 p-4 text-center backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div class="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p class="relative text-2xl font-bold text-white">
                  {{ stat.value }}<span class="text-purple-400">+</span>
                </p>
                <p class="relative text-xs text-white/50 uppercase tracking-wider">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Right Content - Code Editor -->
          <div class="lg:col-span-5">
            <div class="relative">
              <!-- Glow Effect -->
              <div class="absolute -inset-4 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
              
              <!-- Main Code Editor Card -->
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-linear-to-br from-white/5 to-transparent backdrop-blur-xl p-6">
                
                <!-- Code Editor -->
                <div class="code-editor">
                  <!-- Editor Header -->
                  <div class="flex items-center gap-2 mb-4">
                    <div class="flex gap-1.5">
                      <span class="w-3 h-3 rounded-full bg-red-400"></span>
                      <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
                      <span class="w-3 h-3 rounded-full bg-green-400"></span>
                    </div>
                    <span class="text-xs text-gray-400 ml-2">main.py</span>
                    
                    <!-- Live Indicator -->
                    <div class="ml-auto flex items-center gap-2">
                      <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span class="text-xs font-medium text-white/60">Live</span>
                    </div>
                  </div>

                  <!-- Code Lines -->
                  <div class="space-y-1.5 font-mono text-sm">
                    <div class="code-line" style="animation-delay: 0s">
                      <span class="text-purple-400">from</span> <span class="text-blue-400">education</span> <span class="text-purple-400">import</span> <span class="text-yellow-400">Skills</span>
                    </div>
                    <div class="code-line" style="animation-delay: 0.5s">
                      <span class="text-purple-400">class</span> <span class="text-yellow-400">Student</span><span class="text-white/80">:</span>
                    </div>
                    <div class="code-line pl-4" style="animation-delay: 1s">
                      <span class="text-purple-400">def</span> <span class="text-yellow-400">__init__</span><span class="text-white/80">(self, name):</span>
                    </div>
                    <div class="code-line pl-8" style="animation-delay: 1.5s">
                      <span class="text-blue-400">self</span><span class="text-white/80">.</span><span class="text-blue-400">name</span> <span class="text-white/80">= name</span>
                    </div>
                    <div class="code-line pl-4" style="animation-delay: 2s">
                      <span class="text-purple-400">def</span> <span class="text-yellow-400">learn</span><span class="text-white/80">(self):</span>
                    </div>
                    <div class="code-line pl-8" style="animation-delay: 2.5s">
                      <span class="text-green-400">return</span> <span class="text-orange-400">"Success!"</span>
                    </div>
                    <div class="code-line" style="animation-delay: 3s">
                      <span class="text-white/80">student = Student(</span><span class="text-green-400">"Alex"</span><span class="text-white/80">)</span>
                    </div>
                    <div class="code-line" style="animation-delay: 3.5s">
                      <span class="text-blue-400">print</span><span class="text-white/80">(student.</span><span class="text-yellow-400">learn</span><span class="text-white/80">())</span>
                    </div>
                    <div class="code-line" style="animation-delay: 4s">
                      <span class="text-green-400/60"># Output: Success!</span>
                    </div>
                  </div>

                  <!-- Cursor Blink -->
                  <div class="cursor-blink"></div>
                </div>

                <!-- Floating Badges -->
                <!-- <div class="absolute -top-3 -right-3 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-2 shadow-xl border border-white/10">
                  <div class="flex items-center gap-2">
                    <span class="text-yellow-400 text-lg">⭐</span>
                    <div>
                      <p class="text-sm font-bold text-white">4.9/5</p>
                      <p class="text-xs text-white/50">Rating</p>
                    </div>
                  </div>
                </div> -->

                <!-- <div class="absolute -bottom-3 -left-3 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-2 shadow-xl border border-white/10">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">🚀</span>
                    <div>
                      <p class="text-sm font-bold text-white">1000+</p>
                      <p class="text-xs text-white/50">Students</p>
                    </div>
                  </div>
                </div> -->

                <!-- Bottom Tech Stack -->
                <div class="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  <span class="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-xs font-medium text-white/70 border border-white/10">
                    🐍 Python
                  </span>
                  <span class="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-xs font-medium text-white/70 border border-white/10">
                    ⚛️ Web Dev
                  </span>
                  <span class="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-xs font-medium text-white/70 border border-white/10">
                    🤖 AI
                  </span>
                  <span class="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-xs font-medium text-white/70 border border-white/10">
                    ☁️ Cloud
                  </span>
                  <span class="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-xs font-medium text-white/70 border border-white/10">
                    🗄️ SQL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce-slow">
        <span class="text-xs uppercase tracking-widest">Scroll</span>
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Why Choose Us Section -->
<section
  v-motion
  :initial="motionInitial"
  :visibleOnce="motionVisible(40)"
  class="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-all duration-700 ease-out"
>
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
        v-motion
        :initial="motionInitial"
        :visibleOnce="motionVisible(80 + index * 80)"
        class="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-olive-800 transition-all duration-700 ease-out hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
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
    <section
      v-motion
      :initial="motionInitial"
      :visibleOnce="motionVisible(40)"
      class="py-20 px-4 bg-linear-to-br from-blue-50 via-teal-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-700 ease-out"
    >
      <div class="max-w-4xl mx-auto">
        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(80)"
          class="text-center mb-12 transition-all duration-700 ease-out"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            How to <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">Join</span>
          </h2>
          <div class="w-24 h-1 bg-linear-to-r from-blue-600 to-teal-500 mx-auto rounded-full"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">Start your learning journey in 4 simple steps</p>
        </div>

        <div class="join-tree relative grid gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
          <div class="join-tree-trunk hidden md:block"></div>

          <!-- Step Cards -->
          <div
            v-for="(step, index) in steps"
            :key="index"
            :class="index % 2 === 0 ? 'md:justify-self-end' : 'md:justify-self-start'"
          >
            <article
              v-motion
              :initial="joinTreeInitial(index)"
              :visibleOnce="joinTreeVisible(index)"
              :class="[
                'join-tree-card group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl  hover:shadow-cyan-700 transition-all duration-700 ease-out hover:-translate-y-2',
                index % 2 === 0 ? 'join-tree-card-left' : 'join-tree-card-right',
              ]"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {{ index + 1 }}
                </div>
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ step.title }}</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ step.description }}</p>
            </article>
          </div>
        </div>

        <!-- CTA Button -->
        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(220)"
          class="text-center mt-12 transition-all duration-700 ease-out"
        >
          <router-link to="/signup" 
            class="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:shadow-violet-800">
            Start Your Journey Now
            <i class="fa-solid fa-arrow-right-long"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Notice Section -->
    <section
      v-motion
      :initial="motionInitial"
      :visibleOnce="motionVisible(40)"
      class="py-16 px-4 bg-linear-to-br from-slate-50 via-amber-50/60 to-rose-50 dark:from-gray-950 dark:via-slate-900 dark:to-slate-900 transition-all duration-700 ease-out"
    >
      <div class="mx-auto max-w-7xl">
        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(80)"
          class="mx-auto mb-10 max-w-3xl text-center transition-all duration-700 ease-out"
        >
          <span class="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            <i class="fa-solid fa-bell"></i>
            Latest Notices
          </span>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Notice Board built for
            <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-500 to-rose-500">frequent updates</span>
          </h2>
        </div>

        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(120)"
          class="mx-auto max-w-4xl rounded-4xl border border-slate-200/80 bg-white/85 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:p-5"
        >
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">All notices</p>
              <h3 class="mt-1 text-lg font-bold text-slate-900 dark:text-white">Recent updates</h3>
            </div>
            <div class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {{ notices.length }} total
            </div>
          </div>

          <div class="notice-ticker group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-900/60">
            <div class="notice-ticker-track group-hover:[animation-play-state:paused]">
              <article
                v-for="(notice, index) in noticesLooped"
                :key="`${notice.title}-${index}`"
                class="group/notice rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/90"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                    :class="noticeTone(notice.type).bg"
                  >
                    <i :class="noticeTone(notice.type).icon"></i>
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        class="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                        :class="noticeTone(notice.type).pill"
                      >
                        {{ notice.type }}
                      </span>
                      <span class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ notice.date }}</span>
                    </div>

                    <h4 class="truncate text-sm font-bold text-slate-900 transition-colors group-hover/notice:text-cyan-800 dark:text-white dark:group-hover/notice:text-cyan-300 sm:text-base">
                      {{ notice.title }}
                    </h4>
                    <p class="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {{ notice.description }}
                    </p>

                    <router-link
                      :to="notice.link"
                      class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      {{ notice.cta }}
                      <i class="fa-solid fa-arrow-right text-xs"></i>
                    </router-link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Courses Section - Enhanced with Mobile Carousel -->
    <section
      v-motion
      :initial="motionInitial"
      :visibleOnce="motionVisible(40)"
      class="py-20 px-4 bg-white dark:bg-gray-900 transition-all duration-700 ease-out"
    >
      <div class="max-w-7xl mx-auto">
        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(80)"
          class="text-center mb-12 transition-all duration-700 ease-out"
        >
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
            v-motion
            :initial="motionInitial"
            :visibleOnce="motionVisible(120 + index * 90)"
            class="group overflow-hidden rounded-3xl border border-gray-200/80 bg-linear-to-br from-gray-50 to-white shadow-lg transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-950 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800"
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
                  <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Price</p>
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
                  :to="getEnrollmentRoute(course.id)"
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
                      :to="getEnrollmentRoute(course.id)"
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

        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(240)"
          class="mt-10 text-center transition-all duration-700 ease-out"
        >
          <router-link
            to="/courses"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-[#073b4c] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#073b4c]/50"
          >
            View All Courses
            <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Director Section - Enhanced -->
    <section
      v-motion
      :initial="motionInitial"
      :visibleOnce="motionVisible(40)"
      class="py-20 px-4 bg-linear-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-700 ease-out"
    >
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
        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(120)"
          class="relative group transition-all duration-700 ease-out"
        >
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
                    <!-- <a href="#" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                      <i class="fa-brands fa-linkedin-in text-white text-sm"></i>
                    </a> -->
                    <!-- <a href="#" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                      <i class="fa-brands fa-twitter text-white text-sm"></i>
                    </a> -->
                    <a href="https://www.instagram.com/growwith_educational_society" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                      <i class="fa-brands fa-instagram text-white text-sm"></i>
                    </a>
                    <!-- facebook -->
                    <a href="https://www.facebook.com/share/1FzMrozcbm" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                      <i class="fa-brands fa-facebook-f text-white text-sm"></i>
                    </a>
                    <!-- youtube -->
                    <a href="https://www.youtube.com/@growwith_educational_society" class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110">
                      <i class="fa-brands fa-youtube text-white text-sm"></i>
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
    <!-- <section
      v-motion
      :initial="motionInitial"
      :visibleOnce="motionVisible(40)"
      class="py-20 px-4 bg-linear-to-br from-indigo-100 via-purple-200 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-700 ease-out">
      <div class="max-w-7xl mx-auto">
        <div
          v-motion
          :initial="motionInitial"
          :visibleOnce="motionVisible(80)"
          class="text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out"
        >
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
            v-motion
            :initial="motionInitial"
            :visibleOnce="motionVisible(140)"
            class="relative bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8 md:p-12 transition-all duration-700 ease-out"
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
    </section> -->

    <!-- Testimonials Section - Carousel -->
    <section v-motion :initial="motionInitial" :visibleOnce="motionVisible(40)"
      class="py-20 px-4 bg-linear-to-br from-indigo-100 via-purple-200 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-700 ease-out">
      <div class="max-w-7xl mx-auto">
        <div v-motion :initial="motionInitial" :visibleOnce="motionVisible(80)"
          class="text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out">
          <span
            class="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
            Join Our Community
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600">Begin Your
              Journey?</span>
          </h2>
          <!-- <p class="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            🌟 Join thousands of successful students who have transformed their careers with our expert-led courses
          </p> -->
        </div>

        <div class="max-w-4xl mx-auto">
          <div v-motion :initial="motionInitial" :visibleOnce="motionVisible(140)"
            class="relative bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8 md:p-12 transition-all duration-700 ease-out text-center">
            <!-- Decorative Elements -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <div
                class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl">
              </div>
              <div
                class="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-3xl">
              </div>
            </div>

            <div class="relative z-10">
              <!-- Icon -->
              <div
                class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-pink-500 shadow-lg mb-6">
                <i class="fa-solid fa-rocket text-3xl text-white"></i>
              </div>

              <!-- Main Message -->
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Start Learning Today! 🚀
              </h3>

              <p class="text-lg text-gray-700 dark:text-gray-300 mb-2 max-w-2xl mx-auto leading-relaxed">
                "The best time to start was yesterday. The next best time is now."
              </p>

              <!-- <p class="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join 1000+ learners and take the first step toward mastering new skills that will shape your future.
              </p> -->

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <router-link to="/courses"
                  class="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-pink-600 px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#8b5cf6]/50">
                  <i class="fa-solid fa-graduation-cap"></i>
                  Explore Courses
                  <i class="fa-solid fa-arrow-right"></i>
                </router-link>
                <router-link to="/signup"
                  class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-indigo-300 dark:border-indigo-700 px-8 py-3.5 font-bold text-indigo-700 dark:text-indigo-300 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30">
                  <i class="fa-solid fa-user-plus"></i>
                  Join Now
                </router-link>
              </div>

              <!-- Stats -->
              <!-- <div class="mt-8 flex justify-center gap-8 flex-wrap">
                <div class="text-center">
                  <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400">1000+</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-black text-pink-600 dark:text-pink-400">98%</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-black text-purple-600 dark:text-purple-400">60+</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Live Batches</p>
                </div>
              </div> -->

              <!-- Trust Badges -->
              <!-- <div class="mt-8 flex flex-wrap justify-center gap-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                  <i class="fa-solid fa-check-circle text-emerald-500"></i>
                  24/7 Support
                </span>
                <span
                  class="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                  <i class="fa-solid fa-check-circle text-emerald-500"></i>
                  Live Classes
                </span>
                <span
                  class="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                  <i class="fa-solid fa-check-circle text-emerald-500"></i>
                  Projects & Practice
                </span>
                <span
                  class="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                  <i class="fa-solid fa-check-circle text-emerald-500"></i>
                  Certificate
                </span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section (New) -->
    <section
      v-motion
      :initial="motionInitial"
      :visibleOnce="motionVisible(40)"
      class="py-16 px-4 bg-linear-to-r from-fuchsia-600 to-pink-600 transition-all duration-700 ease-out"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated with Us</h2>
        <p class="text-white/90 mb-8">Subscribe to our newsletter for the latest updates and offers</p>
        <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input type="email" v-model="newsletterEmail" placeholder="Enter your email here" 
            class="flex-1 px-6 py-3 rounded-full border border-pink-500 focus:ring-2 focus:ring-white outline-none" required />
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
import { getEnrollmentRoute } from "../../utils/auth.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = [Pagination, Navigation];
const motionInitial = {
  opacity: 0,
  y: 28,
};

const motionVisible = (delay = 0) => ({
  opacity: 1,
  y: 0,
  transition: {
    delay: Math.min(delay, 700) / 1000,
    duration: 0.68,
    ease: [0.22, 1, 0.36, 1],
  },
});

const joinTreeInitial = (index) => ({
  opacity: 0,
  x: index % 2 === 0 ? -32 : 32,
  y: 26,
  scale: 0.96,
});

const joinTreeVisible = (index) => ({
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  transition: {
    delay: Math.min(120 + index * 110, 720) / 1000,
    duration: 0.78,
    ease: [0.22, 1, 0.36, 1],
  },
});

// Notice data - Edit these to publish announcements on home page
const notices = ref([
  {
    type: "Course",
    title: "New Full Stack Web Development Bootcamp",
    description: "Enroll in our new Full Stack Web Development course. Learn HTML, CSS, JavaScript, Flask, and database design.",
    date: "4 July 2026",
    cta: "Enroll Now",
    link: "/Signup"
  },
  {
    type: "Course",
    title: "Python Programming for Beginners",
    description: "Learn the fundamentals of Python programming. Perfect for students new to coding. Enroll now!",
    date: "20 July 2026",
    cta: "Enroll Now",
    link: "/signup"
  },
  {
    type: "Course",
    title: "SQL and Database Management",
    description: "Learn the fundamentals of SQL and database management. Perfect for students new to backend development. Enroll now!",
    date: "23 July 2026",
    cta: "Enroll Now",
    link: "/signup"
  },
  // {
  //   type: "General",
  //   title: "Fee Payment Deadline Extended",
  //   description: "Extended fee payment deadline to 30 April. Log in to your dashboard to complete your payment.",
  //   date: "22 Apr 2026",
  //   cta: "Go to Dashboard",
  //   link: "/login"
  // },
]);

const noticesLooped = computed(() => [...notices.value, ...notices.value]);

const noticeToneMap = {
  Course: {
    bg: "bg-linear-to-br from-cyan-500 to-blue-600",
    pill: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-200",
    icon: "fa-solid fa-graduation-cap",
  },
  Batch: {
    bg: "bg-linear-to-br from-emerald-500 to-teal-600",
    pill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200",
    icon: "fa-solid fa-calendar-check",
  },
  General: {
    bg: "bg-linear-to-br from-amber-500 to-orange-600",
    pill: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200",
    icon: "fa-solid fa-circle-info",
  },
};

const noticeTone = (type) => {
  return noticeToneMap[type] || {
    bg: "bg-linear-to-br from-slate-500 to-slate-700",
    pill: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    icon: "fa-solid fa-bell",
  };
};

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
    description: "Get certificates and prizes from the institution upon course completion.",
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

.join-tree-trunk {
  position: absolute;
  left: 50%;
  top: 1rem;
  bottom: 1rem;
  width: 2px;
  transform: translateX(-50%);
  border-radius: 9999px;
  background: linear-gradient(to bottom, rgba(37, 99, 235, 0.08), rgba(20, 184, 166, 0.55), rgba(59, 130, 246, 0.08));
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.join-tree-card {
  width: 100%;
}

.join-tree-card::before {
  content: "";
  position: absolute;
  top: 2.25rem;
  width: 3rem;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(to right, rgba(37, 99, 235, 0.18), rgba(20, 184, 166, 0.7));
}

.join-tree-card::after {
  content: "";
  position: absolute;
  top: 2rem;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #2563eb, #14b8a6);
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.9), 0 0 20px rgba(20, 184, 166, 0.22);
}

.join-tree-card-left::before,
.join-tree-card-left::after {
  right: -3rem;
}

.join-tree-card-right::before,
.join-tree-card-right::after {
  left: -3rem;
}

@media (max-width: 767px) {
  .join-tree-card::before,
  .join-tree-card::after {
    display: none;
  }
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

/* Notice ticker */
.notice-ticker {
  height: 24rem;
}

.notice-ticker-track {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: noticeTickerScroll 24s linear infinite;
  will-change: transform;
}

.notice-ticker:hover .notice-ticker-track {
  animation-play-state: paused;
}

.notice-ticker-track > * {
  flex-shrink: 0;
}

@keyframes noticeTickerScroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-50%);
  }
}

@media (max-width: 640px) {
  .notice-ticker {
    height: 20rem;
  }

  .notice-ticker-track {
    animation-duration: 28s;
  }
}

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

/* Hero entrance transitions */
.fade-slide-enter-active {
  transition: opacity 480ms cubic-bezier(0.2,0.9,0.2,1), transform 480ms cubic-bezier(0.2,0.9,0.2,1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.995);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Slightly delayed variant for CTA */
.fade-slide-delayed-enter-active {
  transition: opacity 560ms cubic-bezier(0.2,0.9,0.2,1), transform 560ms cubic-bezier(0.2,0.9,0.2,1);
  transition-delay: 140ms;
}
.fade-slide-delayed-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.995);
}
.fade-slide-delayed-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* CTA floating animation */
.hero-cta-float {
  animation: heroFloatBtn 4.5s ease-in-out infinite;
  will-change: transform;
}
.hero-cta-float:hover,
.hero-cta-float:focus {
  animation-play-state: paused;
}

@keyframes heroFloatBtn {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}

@media (max-width: 640px) {
  .hero-cta-float {
    animation: none;
  }
}

/* ====== CRED-STYLE HERO BACKGROUND ====== */
.cred-hero-bg {
  background: #0a0a0f;
  background-image: 
    radial-gradient(ellipse at 50% 0%, rgba(120, 80, 255, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 50%, rgba(255, 80, 200, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 20% 80%, rgba(80, 180, 255, 0.05) 0%, transparent 50%);
}

/* Premium Grid Pattern */
.cred-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

/* ====== CRED-STYLE PILLARS ====== */
.pillars-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.cred-pillar {
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, 
    rgba(120, 80, 255, 0.3) 0%,
    rgba(255, 80, 200, 0.15) 50%,
    transparent 100%
  );
  border-radius: 1px 1px 0 0;
  transform-origin: bottom;
  animation: pillarRise 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes pillarRise {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* ====== FLOATING PARTICLES ====== */
.cred-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 80, 255, 0.3), transparent);
  animation: floatUp linear infinite;
  pointer-events: none;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px) scale(0);
    opacity: 0;
  }
}

/* ====== CODE EDITOR ====== */
.code-editor {
  background: rgba(30, 30, 46, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1.25rem;
  position: relative;
  min-height: 320px;
  font-family: 'Courier New', monospace;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.code-line {
  opacity: 0;
  animation: codeAppear 0.5s ease-out forwards;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes codeAppear {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Cursor Blink */
.cursor-blink {
  position: absolute;
  bottom: 30px;
  left: 12px;
  width: 8px;
  height: 16px;
  background: #a78bfa;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* ====== ANIMATIONS ====== */
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.7; }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* ====== GRADIENT ANIMATION ====== */
.animate-gradient {
  background-size: 300% 300%;
  animation: gradientShift 6s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* ====== PREMIUM BADGE ====== */
.premium-badge {
  animation: badgeGlow 2s ease-in-out infinite;
}

@keyframes badgeGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(120, 80, 255, 0);
  }
  50% {
    box-shadow: 0 0 30px rgba(120, 80, 255, 0.1);
  }
}

/* ====== TRANSITIONS ====== */
.fade-slide-enter-active {
  transition: opacity 600ms cubic-bezier(0.2, 0.9, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.9, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-delayed-enter-active {
  transition: opacity 700ms cubic-bezier(0.2, 0.9, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.9, 0.2, 1);
  transition-delay: 200ms;
}
.fade-slide-delayed-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.fade-slide-delayed-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1024px) {
  .cred-pillar {
    width: 1px !important;
  }
  .pillars-wrapper {
    display: none;
  }
}

@media (max-width: 768px) {
  .cred-hero-bg {
    min-height: auto;
    padding: 80px 0;
  }
  
  .code-editor {
    min-height: 200px;
    padding: 1rem;
  }
  
  .code-line {
    font-size: 10px;
  }
  
  .cursor-blink {
    height: 12px;
    bottom: 20px;
  }
}

@media (max-width: 640px) {
  .cred-hero-bg {
    padding: 60px 0;
  }
  
  .cred-grid-pattern {
    background-size: 30px 30px;
  }
  
  .code-editor {
    min-height: 160px;
    padding: 0.75rem;
  }
  
  .code-line {
    font-size: 8px;
  }
  
  .cursor-blink {
    height: 10px;
    bottom: 14px;
  }
}
</style>