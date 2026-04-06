<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-indigo-950 dark:text-gray-100 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="overflow-hidden rounded-3xl border border-white/70 bg-linear-to-r from-indigo-700 via-violet-700 to-fuchsia-700 p-6 text-white shadow-2xl sm:p-8">
        <div class="relative grid gap-6 lg:grid-cols-[1.6fr_0.9fr] lg:items-center">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
              Student Dashboard
            </div>
            <div>
              <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Welcome back, {{ studentName }}
              </h1>
              <p class="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                Track your courses, assignments, progress, and notifications from one place.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                @click="router.push('/student/courses')"
                class="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                View Courses
              </button>
              <button
                type="button"
                @click="router.push('/student/assignments')"
                class="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Open Assignments
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-2xl border border-white/10 bg-white/12 p-4 backdrop-blur"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs uppercase tracking-wide text-white/70">{{ stat.label }}</p>
                  <p class="mt-1 text-2xl font-bold">{{ stat.value }}</p>
                </div>
                <div class="rounded-xl bg-white/15 p-2 text-white">
                  <component :is="stat.icon" class="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <p class="text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
          <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ dashboardCounts.enrolledCourses }}</p>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Active courses you can continue learning</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <p class="text-sm text-gray-500 dark:text-gray-400">Assignments</p>
          <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ dashboardCounts.totalAssignments }}</p>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Across all enrolled courses</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <p class="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p class="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">{{ dashboardCounts.pendingAssignments }}</p>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Assignments waiting for your submission</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <p class="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
          <p class="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">{{ dashboardCounts.submittedAssignments }}</p>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Assignments already completed</p>
        </div>
      </section>

      <div v-if="loading" class="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <div class="h-6 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="mt-6 space-y-4">
            <div v-for="n in 4" :key="n" class="h-28 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"></div>
          </div>
        </div>
        <div class="space-y-6">
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
            <div class="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            <div class="mt-4 space-y-3">
              <div v-for="n in 3" :key="n" class="h-20 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <section class="space-y-6">
          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Pick up where you left off in your most active course.</p>
              </div>
              <button
                type="button"
                @click="router.push('/student/courses')"
                class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                All Courses
              </button>
            </div>

            <div v-if="topCourse" class="mt-5 rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 p-5 dark:from-indigo-950 dark:to-violet-950">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="min-w-0">
                  <p class="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">Top Course</p>
                  <h3 class="mt-1 truncate text-2xl font-bold text-gray-900 dark:text-white">{{ topCourse.title }}</h3>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ topCourse.subject }} • {{ topCourse.class_level }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <p class="text-xs text-gray-500 dark:text-gray-400">Progress</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ topCourse.progress_percent || 0 }}%</p>
                  </div>
                  <button
                    type="button"
                    @click="openCourse(topCourse.course_id)"
                    class="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Open
                  </button>
                </div>
              </div>

              <div class="mt-4 h-2 w-full rounded-full bg-white/70 dark:bg-white/10">
                <div class="h-2 rounded-full bg-indigo-600" :style="{ width: `${topCourse.progress_percent || 0}%` }"></div>
              </div>
            </div>

            <div v-else class="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
              No enrolled course found yet.
            </div>
          </div>

          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Your enrolled courses with live progress.</p>
              </div>
              <span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {{ enrolledCourses.length }} active
              </span>
            </div>

            <div v-if="enrolledCourses.length" class="mt-5 grid gap-4 md:grid-cols-2">
              <article
                v-for="course in enrolledCourses"
                :key="course.course_id"
                class="rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-950/60"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ course.subject }}</p>
                    <h3 class="mt-1 truncate text-lg font-semibold text-gray-900 dark:text-white">{{ course.title }}</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Class {{ course.class_level }} • {{ course.duration_months }} months</p>
                  </div>
                  <div class="rounded-xl bg-emerald-50 px-3 py-2 text-right dark:bg-emerald-950/60">
                    <p class="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Progress</p>
                    <p class="text-lg font-bold text-emerald-800 dark:text-emerald-300">{{ course.progress_percent || 0 }}%</p>
                  </div>
                </div>

                <div class="mt-4 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div class="h-2 rounded-full bg-emerald-500" :style="{ width: `${course.progress_percent || 0}%` }"></div>
                </div>

                <div class="mt-4 flex items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{{ course.completed_items || 0 }} / {{ course.total_items || 0 }} completed</span>
                  <button type="button" @click="openCourse(course.course_id)" class="font-semibold text-indigo-600 hover:text-indigo-700">
                    Open course
                  </button>
                </div>
              </article>
            </div>

            <div v-else class="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
              You are not enrolled in any paid course yet.
            </div>
          </div>

          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Upcoming Assignments</h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Assignments waiting for you across all courses.</p>
              </div>
              <button
                type="button"
                @click="router.push('/student/assignments')"
                class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                View all
              </button>
            </div>

            <div v-if="upcomingAssignments.length" class="mt-5 grid gap-4 md:grid-cols-2">
              <article
                v-for="assignment in upcomingAssignments.slice(0, 6)"
                :key="assignment.key"
                class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">{{ assignment.status }}</p>
                    <h3 class="mt-1 text-base font-semibold text-gray-900 dark:text-white">{{ assignment.title }}</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ assignment.courseTitle }} • Week {{ assignment.weekNumber }}</p>
                  </div>
                  <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="assignment.statusClass">
                    {{ assignment.statusLabel }}
                  </span>
                </div>

                <p class="mt-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
                  {{ assignment.description || 'No description provided.' }}
                </p>

                <div class="mt-4 flex items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>Due: {{ formatDateTime(assignment.dueDate) }}</span>
                  <button type="button" @click="openCourse(assignment.courseId)" class="font-semibold text-indigo-600 hover:text-indigo-700">
                    Open
                  </button>
                </div>
              </article>
            </div>

            <div v-else class="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
              No upcoming assignments found.
            </div>
          </div>
        </section>

        <aside class="space-y-6">
          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Recent Notifications</h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Latest updates from your courses.</p>
              </div>
              <button type="button" @click="router.push('/student/notifications')" class="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200">
                View all
              </button>
            </div>

            <div v-if="notifications.length" class="mt-5 space-y-3">
              <article
                v-for="notification in notifications.slice(0, 5)"
                :key="notification.id"
                class="rounded-2xl border px-4 py-3"
                :class="notification.is_read ? 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/60' : 'border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/40'"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ notification.title }}</p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-3 dark:text-gray-300">{{ notification.message }}</p>
                  </div>
                  <span
                    class="rounded-full px-2 py-1 text-[11px] font-semibold"
                    :class="notification.is_read ? 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300' : 'bg-indigo-600 text-white'"
                  >
                    {{ notification.is_read ? 'Read' : 'New' }}
                  </span>
                </div>
              </article>
            </div>

            <div v-else class="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-400">
              No notifications yet.
            </div>
          </div>

          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
            <div class="mt-5 grid gap-3">
              <button type="button" @click="router.push('/student/courses')" class="rounded-2xl bg-gray-50 px-4 py-3 text-left transition hover:bg-gray-100 dark:bg-gray-950/60 dark:hover:bg-gray-800">
                <p class="font-semibold text-gray-900 dark:text-white">Browse Courses</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Open your enrolled and available courses</p>
              </button>
              <button type="button" @click="router.push('/student/assignments')" class="rounded-2xl bg-gray-50 px-4 py-3 text-left transition hover:bg-gray-100 dark:bg-gray-950/60 dark:hover:bg-gray-800">
                <p class="font-semibold text-gray-900 dark:text-white">All Assignments</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Check pending and submitted work</p>
              </button>
              <button type="button" @click="router.push('/student/notifications')" class="rounded-2xl bg-gray-50 px-4 py-3 text-left transition hover:bg-gray-100 dark:bg-gray-950/60 dark:hover:bg-gray-800">
                <p class="font-semibold text-gray-900 dark:text-white">Notifications</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">See updates from teachers and admin</p>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios.js'
import { getAuth } from '../../utils/auth.js'

const router = useRouter()
const { user } = getAuth()

const loading = ref(false)
const enrolledCourses = ref([])
const allCourses = ref([])
const notifications = ref([])
const assignments = ref([])

const studentName = computed(() => {
  const firstName = user?.first_name || user?.firstName || 'Student'
  const lastName = user?.last_name || user?.lastName || ''
  return `${firstName} ${lastName}`.trim()
})

const formatDateTime = (value) => {
  if (!value) return 'No due date'
  const dt = new Date(value)
  if (Number.isNaN(dt.getTime())) return value
  return dt.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

const bookIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  `
}

const checkIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
  `
}

const bellIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  `
}

const chartIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  `
}

const clockIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
}

const stats = computed(() => {
  const totalCourses = enrolledCourses.value.length
  const totalAssignments = assignments.value.length
  const pendingAssignments = assignments.value.filter((item) => item.status === 'Pending').length
  const completedAssignments = assignments.value.filter((item) => item.status === 'Submitted').length

  return [
    { label: 'Enrolled Courses', value: totalCourses, icon: bookIcon },
    { label: 'Assignments', value: totalAssignments, icon: chartIcon },
    { label: 'Pending', value: pendingAssignments, icon: clockIcon },
    { label: 'Submitted', value: completedAssignments, icon: checkIcon }
  ]
})

const dashboardCounts = computed(() => ({
  enrolledCourses: enrolledCourses.value.length,
  totalAssignments: assignments.value.length,
  pendingAssignments: assignments.value.filter((item) => item.status === 'Pending').length,
  submittedAssignments: assignments.value.filter((item) => item.status === 'Submitted').length
}))

const topCourse = computed(() => {
  if (!enrolledCourses.value.length) return null
  return [...enrolledCourses.value].sort((a, b) => (b.progress_percent || 0) - (a.progress_percent || 0))[0]
})

const upcomingAssignments = computed(() => {
  return [...assignments.value].filter((item) => item.status !== 'Submitted').sort((a, b) => {
    const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER
    const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER
    return aTime - bTime
  })
})

const openCourse = (courseId) => {
  router.push(`/course/${courseId}`)
}

const mapAssignmentStatus = (dueDate, submittedAt) => {
  const now = new Date()
  const due = dueDate ? new Date(dueDate) : null
  const isPastDue = due ? now > due : false

  if (submittedAt) {
    return {
      status: 'Submitted',
      statusLabel: 'Submitted',
      statusClass: 'bg-emerald-100 text-emerald-700',
      isPastDue
    }
  }

  if (isPastDue) {
    return {
      status: 'Missed',
      statusLabel: 'Missed',
      statusClass: 'bg-rose-100 text-rose-700',
      isPastDue
    }
  }

  return {
    status: 'Pending',
    statusLabel: 'Pending',
    statusClass: 'bg-amber-100 text-amber-700',
    isPastDue
  }
}

const loadDashboard = async () => {
  loading.value = true

  try {
    const [coursesRes, notificationsRes] = await Promise.all([
      api.get('/api/my-courses'),
      user?.id ? api.get(`/api/notifications/${user.id}`) : Promise.resolve({ data: [] })
    ])

    enrolledCourses.value = Array.isArray(coursesRes.data) ? coursesRes.data : []
    notifications.value = Array.isArray(notificationsRes.data) ? notificationsRes.data : []

    const courseAssignmentResponses = await Promise.all(
      enrolledCourses.value.map(async (course) => {
        try {
          const weeksRes = await api.get(`/api/courses/${course.course_id}/weeks`)
          const weeks = Array.isArray(weeksRes.data) ? weeksRes.data : []

          const courseAssignments = []
          weeks.forEach((week) => {
            ;(Array.isArray(week.assignments) ? week.assignments : []).forEach((assignment) => {
              courseAssignments.push({
                key: `${course.course_id}-${assignment.id}`,
                assignmentId: assignment.id,
                title: assignment.title,
                description: assignment.description,
                dueDate: assignment.due_date,
                courseId: course.course_id,
                courseTitle: course.title,
                weekNumber: week.week_number
              })
            })
          })

          return courseAssignments
        } catch (_err) {
          return []
        }
      })
    )

    const flattenedAssignments = courseAssignmentResponses.flat()
    const enrichedAssignments = []

    for (const assignment of flattenedAssignments) {
      try {
        const questionRes = await api.get(`/api/assignments/${assignment.assignmentId}/questions`)
        const submittedAt = questionRes.data?.latest_submission_at || null
        const statusInfo = mapAssignmentStatus(assignment.dueDate, submittedAt)

        enrichedAssignments.push({
          ...assignment,
          submittedAt,
          ...statusInfo
        })
      } catch (_err) {
        const statusInfo = mapAssignmentStatus(assignment.dueDate, null)
        enrichedAssignments.push({
          ...assignment,
          submittedAt: null,
          ...statusInfo
        })
      }
    }

    assignments.value = enrichedAssignments.sort((a, b) => {
      const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER
      const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER
      return aTime - bTime
    })
  } catch (err) {
    console.error('Failed to load dashboard', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})
</script>

<style scoped>
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
