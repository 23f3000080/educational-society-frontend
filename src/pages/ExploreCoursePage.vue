<template>
  <section class="min-h-screen bg-linear-to-b from-slate-50 via-white to-cyan-50 px-4 py-10 sm:px-6 lg:px-8 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
    <div class="mx-auto max-w-7xl">
      <div v-if="course" class="space-y-8">
        <div class="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          <div class="grid lg:grid-cols-2">
            <div class="relative min-h-[320px] overflow-hidden">
              <img :src="course.image" :alt="course.title" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent"></div>

              <div class="absolute left-5 top-5 flex flex-wrap gap-2">
                <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900 backdrop-blur">
                  {{ course.badge }}
                </span>
                <span class="rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  {{ course.level }}
                </span>
              </div>

              <div class="absolute bottom-5 left-5 right-5 text-white">
                <p class="text-xs uppercase tracking-[0.2em] text-cyan-100">Fee starts at</p>
                <p class="text-4xl font-black leading-none">{{ formatPrice(course.offerPrice) }}</p>
                <p class="mt-2 max-w-xl text-sm text-cyan-50/90">{{ course.outcome }}</p>
              </div>
            </div>

            <div class="space-y-5 p-6 sm:p-8 lg:p-10">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Course Details</p>
                  <h1 class="mt-2 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">{{ course.title }}</h1>
                  <p class="mt-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{{ course.subtitle }}</p>
                </div>
                <div class="rounded-2xl bg-amber-50 px-4 py-3 text-right dark:bg-amber-950/30">
                  <p class="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-300">Rating</p>
                  <p class="text-2xl font-black text-amber-700 dark:text-amber-300">★ {{ course.rating }}</p>
                </div>
              </div>

              <p class="text-base leading-7 text-gray-600 dark:text-gray-300">{{ course.description }}</p>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div class="rounded-2xl bg-slate-50 p-4 dark:bg-gray-800">
                  <p class="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Regular Fee</p>
                  <p class="mt-1 text-lg font-bold text-gray-500 line-through">{{ formatPrice(course.price) }}</p>
                </div>
                <div class="rounded-2xl bg-cyan-50 p-4 dark:bg-cyan-950/30">
                  <p class="text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">Offer Price</p>
                  <p class="mt-1 text-2xl font-black text-cyan-700 dark:text-cyan-300">{{ formatPrice(course.offerPrice) }}</p>
                </div>
                <div class="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                  <p class="text-xs uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">You Save</p>
                  <p class="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-300">{{ savingsLabel(course) }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/50">
                  <p class="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Duration</p>
                  <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ course.duration }}</p>
                </div>
                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/50">
                  <p class="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Start Date</p>
                  <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ course.startDate }}</p>
                </div>
                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/50">
                  <p class="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">End Date</p>
                  <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ course.endDate }}</p>
                </div>
                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/50">
                  <p class="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Seats Left</p>
                  <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ course.seatsLeft }}</p>
                </div>
                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/50">
                  <p class="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Mode</p>
                  <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ course.mode }}</p>
                </div>
                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/50">
                  <p class="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Schedule</p>
                  <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ course.schedule }}</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-3 pt-2">
                <router-link
                  to="/signup"
                  class="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#0f766e] via-[#0ea5a6] to-[#0284c7] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
                >
                  Enroll Now
                </router-link>
                <router-link
                  to="/courses"
                  class="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Back to Courses
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <h2 class="text-xl font-black text-gray-900 dark:text-white">What students will get</h2>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                v-for="item in course.includes"
                :key="item"
                class="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <div class="rounded-[1.75rem] border border-cyan-100 bg-cyan-50 p-6 shadow-lg dark:border-cyan-900/50 dark:bg-cyan-950/20">
            <h2 class="text-xl font-black text-cyan-900 dark:text-cyan-100">Why this course sells fast</h2>
            <div class="mt-5 space-y-4 text-sm leading-6 text-cyan-950/90 dark:text-cyan-50/90">
              <p>{{ course.outcome }}</p>
              <p>{{ course.support }}</p>
              <p class="font-semibold">Limited seats left: {{ course.seatsLeft }}. Early enrollment gives the best batch access.</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="item in course.highlights"
            :key="item"
            class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ item }}</p>
          </div>
        </div>
      </div>

      <div v-else class="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-lg dark:border-amber-900 dark:bg-amber-950/20">
        <h2 class="text-2xl font-black text-amber-900 dark:text-amber-100">Course not found</h2>
        <p class="mt-2 text-sm text-amber-800 dark:text-amber-200">The requested course page is not available.</p>
        <router-link
          to="/courses"
          class="mt-5 inline-flex rounded-2xl bg-amber-600 px-5 py-3 text-sm font-bold text-white hover:bg-amber-700"
        >
          View All Courses
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseBySlug } from '../data/courseCatalog.js'

const route = useRoute()

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

const course = computed(() => {
  const slug = String(route.params.slug || '').toLowerCase()
  return getCourseBySlug(slug)
})
</script>
