<template>
  <main class="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_45%,#ffffff_100%)] text-slate-900">
    <section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div class="mb-4 flex justify-start sm:mb-6">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"
          @click="goBack"
        >
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.78 15.53a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 10l4.47 4.47a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
          </svg>
          Go back
        </button>
      </div>

      <div class="overflow-hidden rounded-4xl border border-white/70 bg-white/90 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div class="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div class="relative overflow-hidden p-6 sm:p-8 lg:p-10 xl:p-12">
            <div class="absolute -right-20 top-10 h-52 w-52 rounded-full bg-sky-400/10 blur-3xl"></div>
            <div class="absolute -left-16 bottom-0 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl"></div>

            <div class="relative z-10 max-w-3xl space-y-6">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 ring-1 ring-cyan-100">
                  Python course
                </span>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {{ course.level }}
                </span>
                <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {{ course.mode }}
                </span>
              </div>

              <div class="space-y-4">
                <p class="text-xs font-black uppercase tracking-[0.3em] text-sky-600">
                  Beginner friendly bootcamp
                </p>
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
                  class="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
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
                    <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-200/80">Course fee</p>
                    <p class="mt-2 text-4xl font-black tracking-tight text-white">
                      {{ formatCurrency(course.offerPrice) }}
                    </p>
                  </div>
                  <span class="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/20">
                    {{ course.rating }}/5 rating
                  </span>
                </div>

                <p class="mt-4 text-sm leading-6 text-slate-300">
                  The course fee is a one-time payment for the entire bootcamp.
                </p>

                <div class="mt-6 grid grid-cols-2 gap-3">
                  <div class="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Format</p>
                    <p class="mt-1 font-bold text-white">Live + Practice</p>
                  </div>
                  <div class="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Support</p>
                    <p class="mt-1 font-bold text-white">Project review</p>
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

              <!-- this will collapsable -->
              <div class="rounded-[1.75rem] border border-white/10 bg-linear-to-br from-sky-500/20 to-cyan-400/10 p-6 backdrop-blur">
                <button
                  @click="toggleWhySection"
                  class="flex w-full items-center justify-between gap-4 text-left"
                >
                  <h3 class="text-base font-black text-white">Why this course works</h3>
                  <svg
                    class="h-5 w-5 text-white transition-transform duration-300"
                    :class="isWhyExpanded ? 'rotate-180' : ''"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  class="overflow-hidden transition-all duration-300 ease-in-out"
                  :class="isWhyExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <ul class="mt-4 space-y-3 text-sm text-slate-100/90">
                    <li class="flex gap-3">
                      <span class="mt-1 h-2 w-2 rounded-full bg-cyan-300"></span>
                      Learn Python from zero with no prior programming experience required
                    </li>
                    <li class="flex gap-3">
                      <span class="mt-1 h-2 w-2 rounded-full bg-cyan-300"></span>
                      Build confidence through guided exercises and weekly assignments
                    </li>
                    <li class="flex gap-3">
                      <span class="mt-1 h-2 w-2 rounded-full bg-cyan-300"></span>
                      Master the core concepts used in automation, data science, AI, and web development
                    </li>
                    <li class="flex gap-3">
                      <span class="mt-1 h-2 w-2 rounded-full bg-cyan-300"></span>
                      Complete a capstone project and earn a strong foundation for advanced Python learning
                    </li>
                  </ul>
                </div>
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
              The curriculum is focused on practical outcomes. You will move from fundamentals to real Python applications.
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <div
                v-for="item in learningPoints"
                :key="item"
                class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <span class="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
                <p class="text-sm leading-6 text-slate-700">{{ item }}</p>
              </div>
            </div>
          </div>

          <div id="curriculum" class="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-8">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 class="text-2xl font-black tracking-tight text-slate-950">Curriculum</h2>
                <p class="mt-2 text-sm text-slate-600">A clean eight-module path that keeps the page easy to scan on smaller screens.</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="inline-flex w-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                  {{ modules.length }} modules
                </span>
                <!-- Download PDF Button with modern design -->
                <a
                  :href="pdfDriveLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-sky-600/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-sky-600/30 active:scale-95"
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

            <div class="mt-6 space-y-3">
              <article
                v-for="(module, index) in modules"
                :key="module.title"
                class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  @click="toggleModule(index)"
                  :aria-expanded="activeModule === index"
                >
                  <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.22em] text-sky-600">
                      Module {{ index + 1 }}
                    </p>
                    <h3 class="mt-1 text-base font-bold text-slate-950 sm:text-lg">
                      {{ module.title }}
                    </h3>
                  </div>
                  <div class="flex items-center gap-3 text-sm text-slate-500">
                    <span class="hidden sm:inline">{{ getTopicsCount(module) }} lessons</span>
                    <svg
                      class="h-5 w-5 transition-transform duration-200"
                      :class="activeModule === index ? 'rotate-180' : ''"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.193l3.71-3.962a.75.75 0 1 1 1.1 1.02l-4.24 4.5a.75.75 0 0 1-1.1 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </button>

                <div v-show="activeModule === index" class="border-t border-slate-200 bg-white px-4 py-4 sm:px-5">
                  <!-- Display learning objectives -->
                  <div v-if="module.learning_objectives" class="mb-4">
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">Learning Objectives</p>
                    <ul class="mt-2 space-y-1">
                      <li v-for="objective in module.learning_objectives" :key="objective" class="flex items-start gap-2 text-sm text-slate-700">
                        <span class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                        {{ objective }}
                      </li>
                    </ul>
                  </div>
                  
                  <!-- Display topics as chips -->
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Topics Covered</p>
                    <div class="mt-2 flex flex-wrap gap-2">
                      <span
                        v-for="topic in getTopicsArray(module)"
                        :key="topic"
                        class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                      >
                        {{ topic }}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div class="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-8">
            <h2 class="text-2xl font-black tracking-tight text-slate-950">Who this course is for</h2>
            <div class="mt-5 space-y-3">
              <div
                v-for="item in audiencePoints"
                :key="item.title"
                class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p class="text-sm font-bold text-slate-950">{{ item.title }}</p>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-4xl bg-slate-950 p-6 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <p class="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/80">Ready to start?</p>
            <h2 class="mt-3 text-2xl font-black tracking-tight text-white">Join the Python bootcamp today</h2>

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
  id: 6,
  courseCode: 'PYTHON101',
  slug: 'python-course',
  title: 'Python Programming Bootcamp',
  description:
    'Master Python from the ground up with a modern, hands-on learning path that covers core syntax, projects, and practical web development.',
  level: 'Programming Basics',
  subject: 'Programming',
  duration: '1 month',
  mode: 'Online',
  seatsLeft: 10,
  startDate: '5 July 2026',
  endDate: '5 September 2026',
  offerPrice: 99,
  rating: 5,
  schedule: 'Mon, Wed, Fri | 4:00 PM - 5:30 PM',
  image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1200&auto=format&fit=crop&q=80',
}

// Replace this with your actual Google Drive PDF link for the Python course
const PDF_DRIVE_LINK = 'https://drive.google.com/file/d/1WT5_QX1_B7IJvIDbeHDYeiwkWWLIcCAz/view?usp=sharing'

const course = computed(() => {
  const raw = getCourseBySlug('python-course') || fallbackCourse

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
  return PDF_DRIVE_LINK
})

const activeModule = ref(0)
const router = useRouter()

// Add this ref
const isWhyExpanded = ref(false) // Set to false if you want it collapsed by default

// Add this function
const toggleWhySection = () => {
  isWhyExpanded.value = !isWhyExpanded.value
}

const modules = [
  {
    title: 'Getting Started with Python',
    summary: 'Set up your development environment and write your first Python programs.',
    learning_objectives: [
      'Understand programming fundamentals',
      'Set up a Python development environment',
      'Write and run basic Python programs'
    ],
    topics: [
      'Introduction to Programming',
      'Installing Python & VS Code',
      'Python Syntax',
      'Variables',
      'Data Types',
      'Input & Output',
      'Mini Assignment: Personal Profile Generator'
    ]
  },
  {
    title: 'Operators & Conditional Statements',
    summary: 'Learn to perform calculations and make decisions in your Python programs.',
    learning_objectives: [
      'Perform calculations with Python',
      'Make decisions using conditions',
      'Build simple interactive programs'
    ],
    topics: [
      'Arithmetic Operators',
      'Comparison Operators',
      'Logical Operators',
      'if, elif, else Statements',
      'Nested Conditions',
      'Mini Assignment: Simple Calculator'
    ]
  },
  {
    title: 'Loops & Iteration',
    summary: 'Automate repetitive tasks and work with loops efficiently.',
    learning_objectives: [
      'Automate repetitive tasks',
      'Work with loops efficiently',
      'Solve logic-based problems'
    ],
    topics: [
      'for Loops',
      'while Loops',
      'break & continue',
      'range() Function',
      'Nested Loops',
      'Mini Assignment: Number Guessing Game'
    ]
  },
  {
    title: 'Functions & Code Reusability',
    summary: 'Create reusable code blocks and improve program organization.',
    learning_objectives: [
      'Create reusable blocks of code',
      'Understand function parameters',
      'Improve program organization'
    ],
    topics: [
      'Defining Functions',
      'Parameters & Arguments',
      'Return Values',
      'Variable Scope',
      'Built-in Functions',
      'Mini Assignment: Student Marks Calculator'
    ]
  },
  {
    title: 'Strings & String Manipulation',
    summary: 'Work effectively with text data and format output professionally.',
    learning_objectives: [
      'Work effectively with text data',
      'Perform string operations',
      'Format output professionally'
    ],
    topics: [
      'String Basics',
      'String Indexing & Slicing',
      'String Methods',
      'String Formatting',
      'User Input Processing',
      'Mini Assignment: Password Strength Checker'
    ]
  },
  {
    title: 'Lists, Tuples & Dictionaries',
    summary: 'Manage structured data efficiently using Python collections.',
    learning_objectives: [
      'Store multiple values efficiently',
      'Manage structured data',
      'Perform common collection operations'
    ],
    topics: [
      'Lists',
      'Tuples',
      'Dictionaries',
      'Basic Set Operations',
      'Collection Methods',
      'Mini Assignment: Contact Book'
    ]
  },
  {
    title: 'File Handling & Error Management',
    summary: 'Store and retrieve data from files while handling runtime errors.',
    learning_objectives: [
      'Store data in files',
      'Read data from files',
      'Handle runtime errors gracefully'
    ],
    topics: [
      'Reading Text Files',
      'Writing Text Files',
      'Working with CSV Files',
      'Exception Handling',
      'try, except, finally',
      'Mini Assignment: Expense Record Manager'
    ]
  },
  {
    title: 'Python Project Development',
    summary: 'Combine all learned concepts to build a complete Python application.',
    learning_objectives: [
      'Combine all learned concepts',
      'Build a complete Python application',
      'Practice real-world problem solving'
    ],
    topics: [
      'Project Planning',
      'Code Organization',
      'Testing & Debugging',
      'Best Practices',
      'Final Project Development',
      'Project Presentation'
    ]
  }
]

const learningPoints = [
  'Learn Python programming from scratch with a beginner-friendly approach.',
  'Understand variables, data types, operators, conditions, and loops.',
  'Write reusable code using functions and modular programming concepts.',
  'Work with strings, lists, tuples, dictionaries, and other built-in data structures.',
  'Read from and write to files while handling errors effectively.',
  'Develop problem-solving skills through hands-on coding exercises and assignments.',
  'Build confidence by creating practical Python applications and a final capstone project.',
  'Establish a strong foundation for future learning in web development, data science, automation, or AI.',
]

const audiencePoints = [
  {
    title: 'Absolute beginners to programming',
    description:
      'Perfect for learners with no prior coding experience who want to start their programming journey with Python.',
  },
  {
    title: 'Students learning programming fundamentals',
    description:
      'Build a strong foundation in coding, logic, and problem-solving through practical exercises and assignments.',
  },
  {
    title: 'Future developers and tech enthusiasts',
    description:
      'An excellent starting point for anyone planning to explore web development, data science, automation, AI, or software development.',
  },
]

const enrollPath = computed(() => `/courses/${course.value.id}/enroll`)

const formatCurrency = (value) => {
  const number = Number(value || 0)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(number)
}

const toggleModule = (index) => {
  activeModule.value = activeModule.value === index ? -1 : index
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.push('/courses')
}

const getTopicsArray = (module) => {
  if (Array.isArray(module.topics)) {
    return module.topics
  }
  if (module.topics && typeof module.topics === 'object') {
    return Object.values(module.topics)
  }
  return []
}

const getTopicsCount = (module) => {
  return getTopicsArray(module).length
}

onMounted(() => {
  updateMeta({
    title: course.value.title,
    description: course.value.description,
    canonical: `${window.location.origin}/courses/python-course`,
    image: course.value.image,
  })
})
</script>