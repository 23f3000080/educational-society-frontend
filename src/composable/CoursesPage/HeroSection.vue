<template>
  <div class="min-h-screen bg-linear-to-b from-slate-50 via-white to-cyan-50 px-4 py-10 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
    <!-- Hero Header -->
    <div class="relative mx-auto mb-12 max-w-6xl overflow-hidden rounded-4xl bg-linear-to-r from-[#0f4c5c] via-[#0b7285] to-[#155e75] px-6 py-10 text-white shadow-2xl sm:px-10">
      <div class="absolute -top-24 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div class="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur">
            Popular Programs
          </span>
          <h1 class="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Courses designed to help students enroll faster
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-cyan-50/90 sm:text-lg">
            Clear pricing, practical outcomes, and course-specific learning paths built to convert interest into admissions.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 text-center sm:gap-4">
          <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p class="text-2xl font-black">6</p>
            <p class="mt-1 text-xs text-cyan-100">Programs</p>
          </div>
          <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p class="text-2xl font-black">4.8★</p>
            <p class="mt-1 text-xs text-cyan-100">Avg Rating</p>
          </div>
          <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p class="text-2xl font-black">Fast</p>
            <p class="mt-1 text-xs text-cyan-100">Enrollment</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Courses Grid -->
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="(course, index) in courses"
        :key="index"
        class="group relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,23,42,0.16)] dark:border-gray-800 dark:bg-gray-900"
      >
        <div class="relative h-56 overflow-hidden">
          <img
            :src="course.image"
            :alt="course.title"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

          <div class="absolute left-4 top-4 flex gap-2">
            <span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-900 backdrop-blur">
              {{ course.badge }}
            </span>
            <span class="rounded-full bg-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
              {{ course.level }}
            </span>
          </div>

          <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-cyan-100">Starts at</p>
              <p class="text-3xl font-black leading-none">{{ formatPrice(course.offerPrice) }}</p>
            </div>
            <div class="rounded-2xl bg-white/10 px-3 py-2 backdrop-blur-md">
              <p class="text-[11px] text-cyan-100">Save</p>
              <p class="text-sm font-bold">{{ savingsLabel(course) }}</p>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="mb-4 flex items-center justify-between gap-3">
            <h2 class="text-xl font-black leading-tight text-gray-900 dark:text-white line-clamp-2">
              {{ course.title }}
            </h2>
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
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {{ chip }}
            </span>
          </div>

          <div class="mb-5 rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
            <div class="flex items-end justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                  Regular Fee
                </p>
                <p class="mt-1 text-lg font-bold text-gray-500 line-through">{{ formatPrice(course.price) }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
                  Offer Price
                </p>
                <p class="mt-1 text-3xl font-black text-cyan-700 dark:text-cyan-400">
                  {{ formatPrice(course.offerPrice) }}
                </p>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{{ course.duration }}</span>
              <span>{{ course.seatsLeft }} seats left</span>
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
              Trusted by students
            </p>
          </div>

          <router-link
            :to="`/courses/${course.slug}`"
            class="group/link mb-3 block w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-cyan-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 dark:border-cyan-900 dark:bg-gray-950 dark:text-cyan-300 dark:hover:bg-cyan-950/50"
          >
            View Details
            <span class="ml-2 inline-block transition group-hover/link:translate-x-1">→</span>
          </router-link>

          <router-link
            to="/signup"
            class="group/link block w-full rounded-2xl bg-linear-to-r from-[#0f766e] via-[#0ea5a6] to-[#0284c7] px-4 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
          >
            Enroll Now
            <span class="ml-2 inline-block transition group-hover/link:translate-x-1">→</span>
          </router-link>

          <p class="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            Quick admission • Demo support • Limited seats
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { courseCatalog } from '../../data/courseCatalog.js'

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
</script>

<style>
/* Optional: text clamp */
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
</style>
