<template>
  <div class="about-page bg-[#fff8ef] text-[#1b2b34] dark:bg-[#09111a] dark:text-[#dbeaf2]">
    <!-- ================= HERO SECTION ================= -->
    <section class="relative overflow-hidden border-b border-slate-300/50 dark:border-slate-700/60">
      <div class="absolute inset-0 about-hero-bg"></div>
      <div class="absolute inset-0 about-noise opacity-40"></div>

      <!-- Ambient orbs -->
      <div class="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/20 blur-[100px]"></div>
      <div class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-500/20 blur-[100px]"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <div class="rounded-3xl border border-slate-300/70 bg-white/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:p-10 dark:border-slate-700 dark:bg-[#0f1a27]/85">
              <span class="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber-300 bg-amber-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-800 dark:border-amber-300/25 dark:bg-amber-400/10 dark:text-amber-200">
                <span class="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                <span class="relative flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span class="relative">Our Identity</span>
              </span>

              <h1 class="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-[#1f2937] sm:text-5xl lg:text-6xl dark:text-slate-100 animate-[fade-up_0.8s_ease-out]">
                Not Just a Coaching Institute,
                <span class="relative inline-block">
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-[#fb923c] to-[#f59e0b]">
                    A Learning Movement
                  </span>
                  <svg class="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                    <path d="M2 4C50 1 100 1 150 2.5C200 4 250 4 298 2" stroke="url(#aboutGrad)" stroke-width="2.5" stroke-linecap="round"/>
                    <defs>
                      <linearGradient id="aboutGrad" x1="0" y1="0" x2="300" y2="0">
                        <stop offset="0%" stop-color="#ea580c"/>
                        <stop offset="100%" stop-color="#f59e0b"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p class="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300 animate-[fade-up_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                Educational Society is built around mentorship, discipline, and outcome-focused learning. We help students transform potential into performance with structured support at every step.
              </p>

              <!-- Trust signals -->
              <div class="mt-6 flex flex-wrap items-center gap-4 text-sm animate-[fade-up_0.8s_ease-out_0.35s] opacity-0 [animation-fill-mode:forwards]">
                <div class="flex items-center gap-2">
                  <div class="flex -space-x-2">
                    <div class="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">A</div>
                    <div class="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">P</div>
                    <div class="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">R</div>
                  </div>
                  <span class="text-slate-600 dark:text-slate-400 font-semibold">Trusted by 1000+ students</span>
                </div>
                <div class="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
                <div class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.975z"/>
                  </svg>
                  4.9 avg rating
                </div>
              </div>

              <div class="mt-8 flex flex-col gap-3 sm:flex-row animate-[fade-up_0.8s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
                <router-link to="/courses" class="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f2937] px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#111827] hover:-translate-y-0.5 hover:shadow-xl dark:bg-amber-500 dark:text-[#1b1308] dark:hover:bg-amber-400">
                  View Courses
                  <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </router-link>
                <router-link to="/contact" class="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-400/50 bg-white px-6 py-3.5 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:-translate-y-0.5 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Talk to Mentor
                </router-link>
              </div>

              <!-- Stats grid -->
              <div class="mt-8 grid gap-3 sm:grid-cols-3 animate-[fade-up_0.8s_ease-out_0.65s] opacity-0 [animation-fill-mode:forwards]">
                <div class="group rounded-2xl border border-slate-300 bg-slate-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-amber-500/50">
                  <p class="text-3xl font-black text-slate-900 dark:text-slate-100">2019</p>
                  <p class="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300 mt-1">Founded</p>
                </div>
                <div class="group rounded-2xl border border-slate-300 bg-slate-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-amber-500/50">
                  <p class="text-3xl font-black text-slate-900 dark:text-slate-100">5+</p>
                  <p class="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300 mt-1">Years of Experience</p>
                </div>
                <div class="group rounded-2xl border border-slate-300 bg-slate-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-amber-500/50">
                  <p class="text-3xl font-black text-slate-900 dark:text-slate-100">3 Pillars</p>
                  <p class="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300 mt-1">Concepts, Practice, Mentoring</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="lg:col-span-5">
            <div class="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-slate-300 bg-[#111827] p-3 shadow-2xl dark:border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=70"
                alt="Students learning together"
                class="h-full w-full rounded-2xl object-cover"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-3 rounded-2xl bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <!-- Floating badge 1 -->
              <div class="absolute left-6 top-6 rounded-2xl border border-white/25 bg-white/15 px-3 py-2 backdrop-blur-md shadow-lg animate-[float_4s_ease-in-out_infinite]">
                <div class="flex items-center gap-2">
                  <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500">
                    <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-wider text-white/80 font-bold">Live Classes</p>
                    <p class="text-xs font-bold text-white">Daily Sessions</p>
                  </div>
                </div>
              </div>

              <!-- Floating badge 2 -->
              <div class="absolute right-6 top-6 rounded-2xl border border-white/25 bg-white/15 px-3 py-2 backdrop-blur-md shadow-lg animate-[float_5s_ease-in-out_infinite_1s]">
                <p class="text-[10px] uppercase tracking-wider text-white/80 font-bold">Rating</p>
                <div class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 fill-current text-yellow-300" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.975z"/>
                  </svg>
                  <span class="text-xs font-black text-white">4.9</span>
                </div>
              </div>

              <!-- Bottom info card -->
              <div class="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-black/60 p-4 backdrop-blur-md">
                <p class="text-[10px] uppercase tracking-[0.2em] text-amber-200 font-bold">What makes us different</p>
                <p class="mt-1 text-sm font-semibold text-white leading-relaxed">
                  Small-batch guidance with measurable weekly progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= STORY + VALUES ================= -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-12">
        <!-- Story -->
        <article class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg lg:col-span-7 dark:border-slate-700 dark:bg-slate-900 group">
          <!-- Accent glow -->
          <div class="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400/10 to-teal-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"></div>

          <div class="relative">
            <div class="inline-flex items-center gap-2 mb-3">
              <span class="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <span class="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-400">Our Journey</span>
            </div>
            <h2 class="text-3xl font-black text-[#143541] sm:text-4xl dark:text-[#e4f7ff]">Our Story</h2>

            <p class="mt-5 text-slate-600 leading-relaxed dark:text-slate-300">
              Educational Society began with one belief: quality education should not depend on location or background. We built a learning ecosystem where students can access clear concepts, regular guidance, and confidence-building practice.
            </p>
            <p class="mt-4 text-slate-600 leading-relaxed dark:text-slate-300">
              Today, we continue to blend foundational teaching with modern tools to make every class more engaging, measurable, and impactful.
            </p>

            <!-- Story stats -->
            <!-- <div class="mt-6 grid grid-cols-3 gap-3">
              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/60">
                <p class="text-2xl font-black text-cyan-700 dark:text-cyan-400">1000+</p>
                <p class="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">Students</p>
              </div>
              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/60">
                <p class="text-2xl font-black text-cyan-700 dark:text-cyan-400">50+</p>
                <p class="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">Mentors</p>
              </div>
              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/60">
                <p class="text-2xl font-black text-cyan-700 dark:text-cyan-400">95%</p>
                <p class="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">Success Rate</p>
              </div>
            </div> -->
          </div>
        </article>

        <!-- Values -->
        <article class="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-100 to-orange-100 p-8 shadow-lg lg:col-span-5 dark:border-amber-400/30 dark:from-amber-600/20 dark:to-orange-500/10 group">
          <div class="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/20 blur-3xl"></div>

          <div class="relative">
            <div class="inline-flex items-center gap-2 mb-3">
              <span class="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span class="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">What We Stand For</span>
            </div>
            <h3 class="text-2xl font-black text-[#5e3e12] sm:text-3xl dark:text-amber-200">Our Core Values</h3>

            <ul class="mt-6 space-y-3">
              <li
                v-for="(value, idx) in values"
                :key="value.title"
                class="group/item flex gap-3 rounded-2xl bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-md dark:bg-black/20 dark:hover:bg-black/30"
              >
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-black shadow-sm">
                  {{ String(idx + 1).padStart(2, '0') }}
                </div>
                <div>
                  <p class="font-bold text-[#4c3415] dark:text-amber-100">{{ value.title }}</p>
                  <p class="text-sm text-[#6a4a24] leading-relaxed mt-0.5 dark:text-amber-100/80">{{ value.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- ================= VISUAL GALLERY ================= -->
    <section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div class="mb-8 text-center">
        <div class="inline-flex items-center gap-2 mb-3">
          <span class="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <span class="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-400">Inside Our Classrooms</span>
        </div>
        <h2 class="text-3xl font-black text-[#143541] sm:text-4xl dark:text-[#e4f7ff]">The Learning Experience</h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Every session is designed to be engaging, interactive, and outcome-driven.
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Gallery Card 1 -->
        <div class="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <div class="relative h-64 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&auto=format&fit=crop&q=70"
              alt="Focused study session"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p class="text-[10px] uppercase tracking-[0.2em] text-cyan-200 font-bold">Focused Learning</p>
            <h3 class="text-lg font-black mt-1">Small Batch Sessions</h3>
          </div>
        </div>

        <!-- Gallery Card 2 -->
        <div class="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <div class="relative h-64 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&auto=format&fit=crop&q=70"
              alt="Mentorship and guidance"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p class="text-[10px] uppercase tracking-[0.2em] text-amber-200 font-bold">Mentorship</p>
            <h3 class="text-lg font-black mt-1">One-on-One Guidance</h3>
          </div>
        </div>

        <!-- Gallery Card 3 -->
        <div class="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
          <div class="relative h-64 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=70"
              alt="Students collaborating"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p class="text-[10px] uppercase tracking-[0.2em] text-teal-200 font-bold">Community</p>
            <h3 class="text-lg font-black mt-1">Peer-to-Peer Growth</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="mx-4 mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d4e63] via-[#0f6b7b] to-[#ff8b5e] px-6 py-14 text-center text-white shadow-2xl relative sm:mx-6 lg:mx-8">
      <!-- Ambient decorations -->
      <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"></div>
      <!-- Grid overlay -->
      <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px); background-size: 40px 40px; mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);"></div>

      <div class="relative">
        <span class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-yellow-200 backdrop-blur-md">
          <span class="relative flex h-1.5 w-1.5 rounded-full bg-yellow-300 animate-pulse"></span>
          Ready to Begin?
        </span>

        <h2 class="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl tracking-tight">
          Let's Build Your Success Story
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg leading-relaxed">
          Start your journey with a learning experience built around guidance, consistency, and growth.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <router-link
            to="/signup"
            class="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-[#0d4e63] shadow-lg transition-all duration-300 hover:bg-slate-100 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get Started Today
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </router-link>

          <router-link
            to="/contact"
            class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const values = [
  {
    title: "Student First",
    desc: "Every decision starts with what helps students learn better.",
  },
  {
    title: "Clarity Over Complexity",
    desc: "We simplify difficult concepts without compromising depth.",
  },
  {
    title: "Consistency Wins",
    desc: "Regular practice and feedback drive long-term success.",
  },
];

const team = [
  {
    name: "Ankit Kumar",
    role: "Director",
    quote: "We are committed to making quality education practical, accessible, and future-ready.",
    socials: [
      { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com" },
      { label: "YouTube", icon: "fa-brands fa-youtube", url: "https://www.youtube.com" },
      { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com" },
    ],
  },
  {
    name: "Priya Jha",
    role: "Senior Teacher",
    quote: "Mentorship is not only about teaching concepts, but building confidence every day.",
    socials: [
      { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com" },
      { label: "YouTube", icon: "fa-brands fa-youtube", url: "https://www.youtube.com" },
      { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com" },
    ],
  },
  {
    name: "Prince Raj",
    role: "Mentor",
    quote: "A growth mindset and disciplined routine can transform every learner's journey.",
    socials: [
      { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com" },
      { label: "YouTube", icon: "fa-brands fa-youtube", url: "https://www.youtube.com" },
      { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com" },
    ],
  },
];
</script>

<style scoped>
.about-hero-bg {
  background: linear-gradient(135deg, #fff6e5 0%, #ffe7c2 38%, #f3f4f6 70%, #dbeafe 100%);
}

.about-noise {
  background-image: radial-gradient(rgba(17, 24, 39, 0.08) 1px, transparent 1px);
  background-size: 14px 14px;
}

/* Float animation for hero badges */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Fade up animation */
@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Shimmer animation */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

/* Pulse soft */
@keyframes pulse-soft {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}
</style>