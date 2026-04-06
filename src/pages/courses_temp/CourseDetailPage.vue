<template>
  <!-- 🔄 Loading -->
  <div
    v-if="loading"
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50"
  >
    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow">
      <svg
        class="w-10 h-10 text-gray-400 animate-spin"
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

    <h3 class="text-lg font-semibold text-gray-700">
      Loading course...
    </h3>
    <p class="text-sm text-gray-500 mt-1">
      Please wait while we fetch your content
    </p>
  </div>

  <!-- ❌ Error State -->
  <div
    v-else-if="error"
    class="min-h-screen flex flex-col items-center justify-center text-center p-6"
  >
    <h2 class="text-xl font-semibold text-red-600 mb-2">
      Something went wrong
    </h2>
    <p class="text-gray-600 mb-4">{{ error }}</p>

    <button
      @click="checkEnrollment"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Retry
    </button>
  </div>

  <!-- ✅ Main Layout -->
  <div v-else class="flex h-screen overflow-hidden bg-gray-50">
    
    <!-- Sidebar -->
    <CourseSideNav
      class="hidden md:block w-72 border-r bg-white"
      :course="courseData"
      :weeks="weeks"
      :completed-videos="completedVideos"
      :completed-assignments="completedAssignments"
      :completed-notes="completedNotes"
      :progress-data="progressData"
      @content-selected="handleContentSelected"
    />

    <!-- Mobile fallback -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-2 text-center text-sm text-gray-600">
      Use desktop for better experience 📚
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
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
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
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

const handleContentUpdate = (data) => {
  selectedContent.value = {
    ...selectedContent.value,
    ...data
  }
}

const handleProgressUpdate = async () => {
  await initProgress(weeks.value)
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