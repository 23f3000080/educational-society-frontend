<template>
  <main class="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_45%,#ffffff_100%)] text-slate-900">
    <section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div class="mb-4 flex justify-start sm:mb-6">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
          @click="goBack"
        >
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.78 15.53a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 10l4.47 4.47a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
          </svg>
          Go back
        </button>
      </div>

      <div class="overflow-hidden rounded-4xl border border-white/70 bg-white/90 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div class="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div class="relative overflow-hidden p-6 sm:p-8 lg:p-10 xl:p-12">
            <div class="absolute -right-20 top-10 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl"></div>
            <div class="absolute -left-16 bottom-0 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl"></div>

            <div class="relative z-10 max-w-3xl space-y-6">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 ring-1 ring-blue-100">
                  Numpy
                </span>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {{ course.level }}
                </span>
                <span class="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {{ course.mode }}
                </span>
              </div>

              <div class="space-y-4">
                <p class="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Build real websites</p>
                <h1 class="max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
                  {{ course.title }}
                </h1>
                <p class="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  {{ course.description }}
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Duration</p>
                  <p class="mt-1 text-lg font-black text-slate-950">{{ course.duration }}</p>
                </div>
                <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Schedule</p>
                  <p class="mt-1 text-lg font-black text-slate-950">{{ course.schedule }}</p>
                </div>
                <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Seats left</p>
                  <p class="mt-1 text-lg font-black text-slate-950">{{ course.seatsLeft }}</p>
                </div>
                <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Starts</p>
                  <p class="mt-1 text-lg font-black text-slate-950">{{ course.startDate }}</p>
                </div>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row">
                <RouterLink
                  :to="enrollPath"
                  class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Enroll now
                </RouterLink>
                <a
                  href="#curriculum"
                  class="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  View curriculum
                </a>
              </div>
            </div>
          </div>

          <aside class="border-t border-slate-200 bg-slate-950 p-6 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div class="space-y-6">
              <div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div class="flex items-baseline justify-between gap-3">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200/80">Course fee</p>
                    <p class="mt-2 text-4xl font-black tracking-tight text-white">{{ formatCurrency(course.offerPrice) }}</p>
                  </div>
                  <span class="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/20">
                    {{ course.rating }}/5 rating
                  </span>
                </div>

                <p class="mt-4 text-sm leading-6 text-slate-300">
                    Enroll in this course to gain hands-on experience with NumPy, the essential library for numerical computing in Python. Learn to manipulate arrays, perform mathematical operations, and prepare for data science and machine learning applications.
                </p>

                <div class="mt-6 grid grid-cols-2 gap-3">
                  <div class="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Format</p>
                    <p class="mt-1 font-bold text-white">Online + Practice</p>
                  </div>
                  <div class="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Support</p>
                    <p class="mt-1 font-bold text-white">1-to-1 Session</p>
                  </div>
                </div>
              </div>

              <div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h2 class="text-lg font-black text-white">Quick facts</h2>
                <dl class="mt-4 space-y-4 text-sm">
                  <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt class="text-slate-300">Course code</dt>
                    <dd class="font-semibold text-white">{{ course.courseCode }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt class="text-slate-300">Level</dt>
                    <dd class="font-semibold text-white">{{ course.level }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt class="text-slate-300">Subject</dt>
                    <dd class="font-semibold text-white">{{ course.subject }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-slate-300">Ends</dt>
                    <dd class="font-semibold text-white">{{ course.endDate }}</dd>
                  </div>
                </dl>
              </div>

              <div class="rounded-[1.75rem] border border-white/10 bg-linear-to-br from-blue-500/20 to-cyan-400/10 p-6 backdrop-blur">
                <h3 class="text-base font-black text-white">Why this course works</h3>
                <ul class="mt-4 space-y-3 text-sm text-slate-100/90">
                  <li class="flex gap-3"><span class="mt-1 h-2 w-2 rounded-full bg-blue-300"></span>Learn the fundamentals of NumPy with hands-on exercises</li>
                  <li class="flex gap-3"><span class="mt-1 h-2 w-2 rounded-full bg-blue-300"></span>Get personalized feedback and guidance from instructors</li>
                  <li class="flex gap-3"><span class="mt-1 h-2 w-2 rounded-full bg-blue-300"></span>Build a strong foundation in numerical computing for data science and machine learning</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
      <div class="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div class="space-y-6">
          <div class="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-8">
            <h2 class="text-2xl font-black tracking-tight text-slate-950">What you will learn</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                By the end of this course, you will have a solid understanding of NumPy and its applications in data science. You will be able to efficiently manipulate arrays, perform mathematical operations, and prepare data for machine learning tasks.
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <div
                v-for="item in learningPoints"
                :key="item"
                class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <span class="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">✓</span>
                <p class="text-sm leading-6 text-slate-700">{{ item }}</p>
              </div>
            </div>
          </div>

          <div id="curriculum" class="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-8">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 class="text-2xl font-black tracking-tight text-slate-950">Course Curriculum</h2>
                <p class="mt-2 text-sm text-slate-600">Weekly topics</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  {{ weeks.length }} weeks
                </span>
                <!-- Download PDF Button with modern design -->
                <a
                  :href="pdfDriveLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-blue-600/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 active:scale-95"
                >
                  <svg class="h-4 w-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                  <svg class="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div class="mt-8 relative">
              <div class="absolute left-4 top-1 bottom-1 w-px bg-linear-to-b from-blue-300 via-cyan-300 to-emerald-300 sm:left-6"></div>
              <div class="space-y-4 sm:space-y-5">
                <article
                  v-for="(week, index) in weeks"
                  :key="week.title"
                  class="relative pl-12 sm:pl-16"
                >
                  <div class="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white ring-4 ring-blue-100 sm:h-12 sm:w-12">
                    <div class="h-3 w-3 rounded-full bg-blue-500 sm:h-4 sm:w-4"></div>
                  </div>

                  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <button
                      type="button"
                      class="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                      @click="toggleWeek(index)"
                      :aria-expanded="activeWeek === index"
                    >
                      <div>
                        <p class="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">Week {{ index + 1 }}</p>
                        <h3 class="mt-1 text-base font-bold text-slate-950 sm:text-lg">{{ week.title }}</h3>
                      </div>
                      <div class="flex items-center gap-3 text-sm text-slate-500">
                        <span class="hidden sm:inline">{{ getTopicsCount(week) }} topics</span>
                        <svg class="h-5 w-5 transition-transform duration-200" :class="activeWeek === index ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.193l3.71-3.962a.75.75 0 1 1 1.1 1.02l-4.24 4.5a.75.75 0 0 1-1.1 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </button>

                    <div v-show="activeWeek === index" class="border-t border-slate-200 bg-white px-4 py-4 sm:px-5">
                      <!-- Display learning objectives -->
                      <div v-if="week.learning_objectives" class="mb-4">
                        <p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Learning Objectives</p>
                        <ul class="mt-2 space-y-1">
                          <li v-for="objective in week.learning_objectives" :key="objective" class="flex items-start gap-2 text-sm text-slate-700">
                            <span class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                            {{ objective }}
                          </li>
                        </ul>
                      </div>
                      
                      <!-- Display topics as chips -->
                      <div>
                        <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Topics Covered</p>
                        <div class="mt-2 flex flex-wrap gap-2">
                          <span
                            v-for="topic in getTopicsArray(week)"
                            :key="topic"
                            class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {{ topic }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div class="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-8">
            <h2 class="text-2xl font-black tracking-tight text-slate-950">Who this course is for</h2>
            <div class="mt-5 space-y-3">
              <div v-for="item in audiencePoints" :key="item.title" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p class="text-sm font-bold text-slate-950">{{ item.title }}</p>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-4xl bg-slate-950 p-6 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <p class="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/80">Ready to start?</p>
            <h2 class="mt-3 text-2xl font-black tracking-tight text-white">Build modern websites from the ground up</h2>
            

            <div class="mt-6 flex flex-col gap-3">
              <RouterLink
                :to="enrollPath"
                class="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-slate-100"
              >
                Enroll now
              </RouterLink>
              <RouterLink
                to="/courses"
                class="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Explore more courses
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { updateMeta } from '../../utils/seo'
import { getCourseBySlug } from '../../data/courseCatalog'

const fallbackCourse = {
  id: 9,
  courseCode: 'NUMPY101',
  slug: 'numpy-course',
  title: 'NumPy Bootcamp',
  description:
    'Learn NumPy, the fundamental package for scientific computing with Python. Understand arrays, matrices, and perform numerical computations efficiently.',
  level: 'Data Science Basics',
  subject: 'Data Science',
  duration: '3 weeks',
  mode: 'Online',
  seatsLeft: 7,
  startDate: '01 October 2026',
  endDate: '22 October 2026',
  offerPrice: 199,
  rating: 5,
  schedule: 'Mon-Fri | 6:00 PM - 8:00 PM',
  image: 'Numpy_course.png',
}

// Google Drive PDF link
const PDF_DRIVE_LINK = 'https://drive.google.com/file/d/1xfl-EeQ9emtPvPrOl-it4RoKHXht6FOs/view?usp=sharing'

const router = useRouter()
const activeWeek = ref(0)

const course = computed(() => {
  const raw = getCourseBySlug('numpy-course') || fallbackCourse

  return {
    id: raw.id ?? fallbackCourse.id,
    courseCode: raw.course_code ?? raw.courseCode ?? fallbackCourse.courseCode,
    slug: raw.slug ?? fallbackCourse.slug,
    title: raw.title ?? fallbackCourse.title,
    description: raw.description ?? fallbackCourse.description,
    level: raw.level ?? fallbackCourse.level,
    subject: raw.subject ?? fallbackCourse.subject,
    duration: raw.duration ?? fallbackCourse.duration,
    mode: raw.mode ?? fallbackCourse.mode,
    seatsLeft: raw.seatsLeft ?? fallbackCourse.seatsLeft,
    startDate: raw.startDate ?? fallbackCourse.startDate,
    endDate: raw.endDate ?? fallbackCourse.endDate,
    offerPrice: raw.offerPrice ?? raw.price ?? fallbackCourse.offerPrice,
    rating: raw.rating ?? fallbackCourse.rating,
    schedule: raw.schedule ?? fallbackCourse.schedule,
    image: raw.image ?? fallbackCourse.image,
  }
})

// PDF link with tracking for analytics if needed
const pdfDriveLink = computed(() => {
  // You can add tracking parameters or use a direct download link
  // For direct download: https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
  return PDF_DRIVE_LINK
})

const weeks = [
  {
    title: 'NumPy Fundamentals',
    learning_objectives: [
      'Understand what NumPy is and why it is used in data science',
      'Create and inspect NumPy arrays',
      'Perform indexing, slicing, and basic array operations',
      'Understand NumPy data types and type conversion'
    ],
    topics: [
      'Day 1: Introduction to NumPy',
      'Day 2: Creating NumPy Arrays',
      'Day 3: Indexing & Slicing',
      'Day 4: Array Operations & Vectorization',
      'Day 5: Data Types & Type Conversion',
      'Checkpoint: NumPy Fundamentals Quiz + Coding Practice'
    ]
  },

  {
    title: 'Intermediate NumPy & Array Manipulation',
    learning_objectives: [
      'Manipulate the shape and structure of NumPy arrays',
      'Combine and split arrays efficiently',
      'Understand and apply broadcasting',
      'Perform mathematical and statistical operations on arrays'
    ],
    topics: [
      'Day 6: Reshaping Arrays',
      'Day 7: Combining & Splitting Arrays',
      'Day 8: Broadcasting',
      'Day 9: Universal Functions (ufuncs)',
      'Day 10: Statistics & Aggregation',
      'Mini Project: Student Marks Analyzer',
      'Checkpoint: Assignment + Coding Practice'
    ]
  },

  {
    title: 'NumPy for Data Science & Machine Learning',
    learning_objectives: [
      'Filter and analyze numerical datasets using NumPy',
      'Generate and work with random data',
      'Understand basic linear algebra with NumPy',
      'Use NumPy for data cleaning and preprocessing',
      'Apply NumPy concepts to a real-world data science project'
    ],
    topics: [
      'Day 11: Boolean Indexing & Data Filtering',
      'Day 12: Random Numbers & Synthetic Data',
      'Day 13: Linear Algebra with NumPy',
      'Day 14: Data Preprocessing & Normalization',
      'Day 15: Final Project - Student Performance Analytics System',
      'Final Assessment',
      'Certificate of Completion'
    ]
  }
];

const learningPoints = [
  'Understand NumPy fundamentals and work efficiently with multidimensional arrays.',
  'Create, inspect, index, slice, reshape, and manipulate NumPy arrays.',
  'Perform fast numerical computations using vectorization and broadcasting.',
  'Apply mathematical, statistical, and aggregation operations to numerical data.',
  'Generate random data and use NumPy for practical data analysis.',
  'Understand vectors, matrices, matrix operations, and basic linear algebra with NumPy.',
  'Clean and preprocess numerical data using filtering, missing-value handling, and normalization.',
  'Build a real-world Student Performance Analytics project using NumPy and prepare for Pandas and Machine Learning.'
]

const audiencePoints = [
  {
    title: 'Python beginners entering Data Science',
    description:
      'Learn NumPy from the fundamentals and build a strong foundation for numerical computing and data science.'
  },
  {
    title: 'Students and aspiring Data Scientists',
    description:
      'Develop practical NumPy skills through coding exercises, assignments, and a real-world analytics project.'
  },
  {
    title: 'Machine Learning beginners',
    description:
      'Understand arrays, vectorization, broadcasting, statistics, preprocessing, and linear algebra concepts used in Machine Learning.'
  },
  {
    title: 'Python developers and learners',
    description:
      'Upgrade your Python skills by learning efficient numerical operations and working with structured numerical datasets.'
  }
]

const enrollPath = computed(() => `/courses/${course.value.id}/enroll`)

const formatCurrency = (value) => {
  const number = Number(value || 0)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(number)
}

const toggleWeek = (index) => {
  activeWeek.value = activeWeek.value === index ? -1 : index
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.push('/courses')
}

const getTopicsArray = (week) => {
  if (Array.isArray(week.topics)) {
    return week.topics
  }
  if (week.topics && typeof week.topics === 'object') {
    return Object.values(week.topics)
  }
  return []
}

const getTopicsCount = (week) => {
  return getTopicsArray(week).length
}

onMounted(() => {
  updateMeta({
    title: course.value.title,
    description: course.value.description,
    canonical: `${window.location.origin}/courses/web-development-bootcamp`,
    image: course.value.image
  })
})
</script>