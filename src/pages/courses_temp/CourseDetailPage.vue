<template>
  <section class="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.16),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_45%,#ffffff_100%)] px-4 py-4 sm:px-6 lg:px-8 lg:py-8 dark:bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.18),transparent_30%),linear-gradient(180deg,#020617_0%,#082f49_42%,#020617_100%)]">
    <div class="mx-auto max-w-7xl space-y-6">
      <!-- 🔄 Loading -->
      <div
        v-if="loading"
        class="flex min-h-[70vh] items-center justify-center rounded-4xl border border-white/70 bg-white/90 p-8 shadow-2xl backdrop-blur dark:border-gray-800 dark:bg-gray-900/90"
      >
        <div class="text-center">
          <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 shadow-inner dark:bg-cyan-950/30">
            <svg
              class="h-10 w-10 animate-spin text-cyan-600 dark:text-cyan-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <h3 class="text-xl font-black text-slate-900 dark:text-white">
            Loading course workspace
          </h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Please wait while we fetch your content and progress.
          </p>
        </div>
      </div>

      <!-- ❌ Error State -->
      <div
        v-else-if="error"
        class="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center rounded-4xl border border-rose-200 bg-white p-8 text-center shadow-2xl dark:border-rose-900/60 dark:bg-gray-900"
      >
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.73-3l-7.5-13a2 2 0 00-3.46 0z" />
          </svg>
        </div>
        <h2 class="mt-5 text-2xl font-black text-slate-900 dark:text-white">
          Something went wrong
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {{ error }}
        </p>

        <button
          @click="checkEnrollment"
          class="mt-6 inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-600 to-sky-600 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
        >
          Retry
        </button>
      </div>

      <!-- ✅ Main Layout -->
      <div v-else-if="courseData" class="space-y-6 lg:space-y-8">
        <!-- Hero -->
        <div class="overflow-hidden rounded-4xl border border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-gray-800 dark:bg-gray-900">
          <div class="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div class="relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div class="absolute -right-16 top-0 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"></div>
              <div class="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl"></div>

              <div class="relative max-w-3xl">
                <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-400">
                  Student course workspace
                </p>
                <h1 class="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                  {{ courseData?.title || 'Course workspace' }}
                </h1>
                <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                  {{ courseData?.description || 'Watch lectures, complete assignments, read notes, and track progress in one place.' }}
                </p>

                <div class="mt-5 flex flex-wrap gap-2">
                  <span v-if="courseData?.subject" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-gray-800 dark:text-slate-200">
                    {{ courseData.subject }}
                  </span>
                  <span v-if="courseData?.class_level" class="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300">
                    Class {{ courseData.class_level }}
                  </span>
                  <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                    {{ progressPercentage }}% complete
                  </span>
                  <span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                    {{ weeks.length }} weeks
                  </span>
                </div>

                <div class="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#course-studio"
                    class="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-600 to-sky-600 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
                  >
                    Continue learning
                  </a>
                </div>
              </div>
            </div>

            <div class="bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 text-white sm:p-8 lg:p-10">
              <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div class="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/80">Completed</p>
                  <p class="mt-2 text-2xl font-black">{{ progressData?.completed || 0 }}</p>
                  <p class="mt-1 text-xs text-cyan-50/80">Items done</p>
                </div>
                <div class="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/80">Total</p>
                  <p class="mt-2 text-2xl font-black">{{ progressData?.total || 0 }}</p>
                  <p class="mt-1 text-xs text-cyan-50/80">Learning items</p>
                </div>
                <div class="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/80">Progress</p>
                  <p class="mt-2 text-2xl font-black">{{ progressPercentage }}%</p>
                  <p class="mt-1 text-xs text-cyan-50/80">Overall completion</p>
                </div>
                <div class="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/80">Status</p>
                  <p class="mt-2 text-xl font-black">Active</p>
                  <p class="mt-1 text-xs text-cyan-50/80">Keep going</p>
                </div>
              </div>

              <div class="mt-6 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100/80">
                    Course progress
                  </p>
                  <span class="rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-50 ring-1 ring-cyan-200/20">
                    {{ progressPercentage }}%
                  </span>
                </div>

                <div class="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    class="h-full rounded-full bg-linear-to-r from-cyan-300 to-emerald-300 transition-all"
                    :style="{ width: `${progressPercentage}%` }"
                  ></div>
                </div>

                <p class="mt-4 text-sm leading-6 text-cyan-50/85">
                  Pick a lesson from the roadmap and continue where you left off. Completion updates are saved as you move through lectures, assignments, and notes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="course-studio" class="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <!-- Desktop sidebar -->
          <aside class="hidden lg:block lg:sticky lg:top-6 lg:self-start">
            <CourseSideNav
              class="max-h-[calc(100vh-16rem)] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
              :course="courseData"
              :weeks="weeks"
              :completed-videos="completedVideos"
              :completed-assignments="completedAssignments"
              :completed-notes="completedNotes"
              :progress-data="progressData"
              @content-selected="handleContentSelected"
            />
          </aside>

          <!-- Content -->
          <main class="min-w-0">
            <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-gray-800 dark:bg-gray-900">
              <CourseContentPage
                :course-id="courseId"
                :course="courseData"
                :weeks="weeks"
                :loading="loading"
                :error="error"
                :selected-content="selectedContent"
                :completed-videos="completedVideos"
                :completed-assignments="completedAssignments"
                :completed-notes="completedNotes"
                @content-updated="handleContentUpdate"
                @progress-updated="handleProgressUpdate"
              />
            </div>
          </main>
        </div>

        <!-- Mobile left-side toggle -->
        <button
          type="button"
          class="fixed left-0 top-1/2 z-40 inline-flex -translate-y-1/2 items-center rounded-r-2xl bg-linear-to-b from-cyan-600 to-sky-600 px-2.5 py-4 text-white shadow-2xl transition lg:hidden"
          @click="toggleRoadmap"
          aria-label="Toggle course navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="{ 'rotate-180': isRoadmapOpen }"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Mobile roadmap drawer -->
        <transition name="fade">
          <div
            v-if="isRoadmapOpen"
            class="fixed inset-0 z-50 bg-black/45 lg:hidden"
            @click.self="closeRoadmap"
          >
            <div class="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-white p-3 shadow-2xl dark:bg-gray-900">
              <div class="mb-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-950/40">
                <div>
                  <p class="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">Course roadmap</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ weeks.length }} weeks</p>
                </div>
                <button
                  type="button"
                  class="rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-gray-800"
                  @click="closeRoadmap"
                >
                  Close
                </button>
              </div>

              <CourseSideNav
                class="max-h-[calc(100vh-7rem)] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                :course="courseData"
                :weeks="weeks"
                :completed-videos="completedVideos"
                :completed-assignments="completedAssignments"
                :completed-notes="completedNotes"
                :progress-data="progressData"
                @content-selected="handleMobileRoadmapSelection"
              />
            </div>
          </div>
        </transition>
      </div>

      <div
        v-else
        class="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center rounded-4xl border border-amber-200 bg-white p-8 text-center shadow-2xl dark:border-amber-900/50 dark:bg-gray-900"
      >
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.73-3l-7.5-13a2 2 0 00-3.46 0z" />
          </svg>
        </div>
        <h2 class="mt-5 text-2xl font-black text-slate-900 dark:text-white">
          Course not found
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          The requested course page is not available.
        </p>
        <router-link
          to="/student/courses"
          class="mt-6 inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-600 to-sky-600 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
        >
          Back to courses
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router"

import CourseSideNav from "../../components/course/CourseSideNav.vue"
import CourseContentPage from "../../components/course/CourseContentPage.vue"

import { useCourseData } from "../../composable/course/userCourseData.js"
import { useCourseProgress } from "../../composable/course/userCourseProgress.js"

import api from "../../services/axios.js"

/* ---------------------------
   Router
---------------------------- */
const router = useRouter()
const route = useRoute()
const courseId = Number(route.params.id)

const progressPercentage = computed(() => progressData.value?.progress || 0)

/* ---------------------------
   State
---------------------------- */
const loading = ref(true)
const error = ref(null)

const selectedContent = ref({
  type: null,
  week: null,
  weekObj: null,
  video: null,
  assignment: null,
  note: null
})

const isRoadmapOpen = ref(false)

/* ---------------------------
   Composables
---------------------------- */
const { course: courseData, weeks, loadCourseContent } = useCourseData()

const {
  completedVideos,
  completedAssignments,
  completedNotes,
  progressData,
  initProgress
} = useCourseProgress(courseId)

/* ---------------------------
   Enrollment + Load Data
---------------------------- */
const checkEnrollment = async () => {
  loading.value = true
  error.value = null

  const token = sessionStorage.getItem("token")

  if (!token) {
    loading.value = false
    router.replace("/login")
    return
  }

  try {
    const res = await api.get(`/api/enrollment-status/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = res.data

    if (!data.enrolled) {
      alert("You are not enrolled in this course")
      return router.replace("/student/courses")
    }

    if (
      data.payment_status !== "paid" ||
      data.enrollment_status !== "active"
    ) {
      alert("Your enrollment is not active")
      return router.replace("/student/courses")
    }

    // ✅ Load course + weeks
    await loadCourseContent(courseId)

    // ✅ Init progress (only once here)
    await initProgress(weeks.value)

  } catch (err) {
    console.error(err)

    error.value =
      err.response?.data?.message ||
      err.message ||
      "Error loading course"

  } finally {
    loading.value = false
  }
}

/* ---------------------------
   Watch (only when needed)
---------------------------- */
watch(
  () => weeks.value,
  async (newWeeks, oldWeeks) => {
    if (!oldWeeks.length && newWeeks.length) {
      await initProgress(newWeeks)
    }
  }
)

/* ---------------------------
   Handlers
---------------------------- */
const handleContentSelected = (content) => {
  selectedContent.value = content
}

const handleMobileRoadmapSelection = (content) => {
  selectedContent.value = content
  closeRoadmap()
}

const handleContentUpdate = (data) => {
  selectedContent.value = {
    ...selectedContent.value,
    ...data
  }
}

const handleProgressUpdate = async () => {
  await initProgress(weeks.value)
}

const toggleRoadmap = () => {
  isRoadmapOpen.value = !isRoadmapOpen.value
}

const openRoadmap = () => {
  isRoadmapOpen.value = true
}

const closeRoadmap = () => {
  isRoadmapOpen.value = false
}

/* ---------------------------
   Lifecycle
---------------------------- */
onMounted(() => {
  if (!courseId) {
    router.replace("/student/courses")
    return
  }

  checkEnrollment()
})
</script>