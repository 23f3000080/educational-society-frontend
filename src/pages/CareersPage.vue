<template>
  <main class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
    <!-- HERO SECTION - premium gradients and refined mobile spacing -->
    <section class="relative overflow-hidden bg-[#071b3a] px-5 pb-16 pt-20 text-white sm:px-8 sm:pb-20 sm:pt-24 lg:px-12">
      <!-- decorative blobs - premium, softened -->
      <div class="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl sm:h-80 sm:w-80"></div>
      <div class="absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96"></div>
      <div class="absolute -left-20 bottom-10 h-60 w-60 rounded-full bg-cyan-300/5 blur-3xl"></div>

      <div class="relative mx-auto max-w-6xl">
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-300 sm:mb-4 sm:text-sm">
          Careers
        </p>
        <h1 class="max-w-3xl text-3xl font-black leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
          Build the future of learning with us.
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
          Explore open opportunities at Educational Society. Find a role that matches your skills and
          help learners grow.
        </p>
        <!-- subtle premium divider / micro detail -->
        <div class="mt-8 h-px w-24 bg-gradient-to-r from-amber-400/60 to-transparent sm:mt-10"></div>
      </div>
    </section>

    <!-- OPEN POSITIONS SECTION -->
    <section class="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <!-- header row: mobile-friendly, stacked on small screens -->
      <div class="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
            Open positions
          </p>
          <h2 class="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Find your next opportunity
          </h2>
        </div>
        <p class="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
          Interested in a role? Read the job description and submit your application through the
          corresponding Google Form.
        </p>
      </div>

      <!-- job grid -->
      <div class="grid gap-5 sm:gap-6 md:grid-cols-2">
        <article
          v-for="job in jobs"
          :key="job.title"
          class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-950/80 sm:p-6"
        >
          <div class="flex-1">
            <!-- title + badge: flex wrap for tiny screens -->
            <div class="flex flex-wrap items-start justify-between gap-3">
              <h3 class="text-lg font-bold leading-snug sm:text-xl">{{ job.title }}</h3>
              <span
                class="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-400/15 dark:text-amber-300 sm:text-xs"
              >
                {{ job.type }}
              </span>
            </div>

            <!-- location -->
            <p class="mt-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
              <i class="fa-regular fa-location-dot mr-1.5 text-xs opacity-70"></i>
              {{ job.location }}
            </p>

            <!-- last date -->
            <p
              v-if="job.lastDate"
              class="mt-3 inline-flex items-center gap-2 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 sm:text-sm"
            >
              <span aria-hidden="true">⏳</span>
              Last date to apply: {{ formatDate(job.lastDate) }}
            </p>

            <!-- description -->
            <p class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
              {{ job.description }}
            </p>
          </div>

          <!-- action buttons: full-width on mobile, inline on larger -->
          <div class="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:flex-wrap sm:items-center">
            <!-- JD button -->
            <a
              v-if="job.jdUrl"
              :href="job.jdUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-400 sm:w-auto"
            >
              <i class="fa-regular fa-file-lines text-xs opacity-70"></i>
              View job description
              <span aria-hidden="true" class="text-xs">↗</span>
            </a>
            <span
              v-else
              class="inline-flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm text-slate-400 dark:border-slate-700 sm:w-auto"
            >
              Job description coming soon
            </span>

            <!-- Apply button -->
            <a
              v-if="job.applicationUrl"
              :href="job.applicationUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400 sm:w-auto"
            >
              Apply now
              <span aria-hidden="true">→</span>
            </a>
            <span
              v-else
              class="inline-flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm text-slate-400 dark:bg-slate-800 sm:w-auto"
            >
              Applications opening soon
            </span>
          </div>
        </article>
      </div>

      <!-- optional: premium empty state / subtle callout (if no jobs) - keep it as a nice touch -->
      <div
        v-if="!jobs.length"
        class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center dark:border-slate-700 dark:bg-slate-900/60"
      >
        <p class="text-slate-500 dark:text-slate-400">No open positions at the moment. Check back soon.</p>
      </div>
    </section>
  </main>

  <Footer />
</template>

<script setup>
import Footer from '../components/base/Footer.vue'

const jobs = [
  {
    title: 'Content Creator & Video Editor Intern',
    location: 'Remote',
    type: 'Internship',
    lastDate: '2026-11-20',
    description: "We are looking for a creative, responsible, and enthusiastic Content Creator & Video Editor Intern who can help us build our digital presence and transform educational lessons into engaging visual content.",
    applicationUrl: 'https://forms.gle/F6oz12bDkjx3JKx88',
    jdUrl: 'https://drive.google.com/file/d/1F4V9rs6tir2UnWdamUm9OETD_zDleJgN/view?usp=sharing'
  },
]

const formatDate = (date) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(year, month - 1, day))
}
</script>

<style scoped>
/* optional: fine-tune for premium feel, but all main styles are in tailwind */
.group:hover .group-hover\:shadow-slate-200\/60 {
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.08);
}
.dark .group:hover {
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.7);
}
</style>