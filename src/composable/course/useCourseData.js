import { ref } from "vue"
import api from "../../services/axios.js"

export function useCourseData() {
  // ---------------------------
  // 📦 STATE
  // ---------------------------
  const course = ref(null)
  const weeks = ref([])
  const progress = ref({
    completed: 0,
    total: 0,
    progress: 0
  })
  const completedItems = ref(new Set())

  const loading = ref(false)
  const error = ref(null)

  // ---------------------------
  // 🚀 LOAD COURSE DATA
  // ---------------------------
  const loadCourseContent = async (courseId) => {
    loading.value = true
    error.value = null

    try {
      const res = await api.get(`/api/course-full/${courseId}`)

      const data = res.data

      // ✅ Course Info
      course.value = data.course || null

      // ✅ Weeks + Content
      weeks.value = data.weeks || []

      // ✅ Progress
      progress.value = data.progress || {
        completed: 0,
        total: 0,
        progress: 0
      }

      // ✅ Completed Items (convert to Set for fast lookup)
      completedItems.value = new Set(data.completed_items || [])

    } catch (err) {
      console.error("Error loading course:", err)

      error.value =
        err.response?.data?.error ||
        err.message ||
        "Failed to load course data"
    } finally {
      loading.value = false
    }
  }

  // ---------------------------
  // 🔄 REFRESH PROGRESS ONLY
  // ---------------------------
  const refreshProgress = async (courseId) => {
    try {
      const res = await api.get(`/api/course-full/${courseId}`)

      progress.value = res.data.progress
      completedItems.value = new Set(res.data.completed_items)

    } catch (err) {
      console.error("Error refreshing progress:", err)
    }
  }

  // ---------------------------
  // 🔍 HELPERS
  // ---------------------------

  const isVideoCompleted = (weekNumber, videoId) => {
      return completedItems.value.has(`video_${videoId}`) || completedItems.value.has(`week${weekNumber}_video_${videoId}`)
  }

  const isAssignmentCompleted = (weekNumber, assignmentId) => {
      return completedItems.value.has(`assignment_${assignmentId}`) || completedItems.value.has(`week${weekNumber}_assignment_${assignmentId}`)
  }

  const isNoteCompleted = (weekNumber, noteId) => {
      return completedItems.value.has(`note_${noteId}`) || completedItems.value.has(`week${weekNumber}_note_${noteId}`)
  }

  // ---------------------------
  // 🎯 RETURN
  // ---------------------------
  return {
    // state
    course,
    weeks,
    progress,
    completedItems,
    loading,
    error,

    // methods
    loadCourseContent,
    refreshProgress,

    // helpers
    isVideoCompleted,
    isAssignmentCompleted,
    isNoteCompleted
  }
}