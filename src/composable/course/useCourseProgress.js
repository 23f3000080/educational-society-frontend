import { ref } from 'vue'
import api from '../../services/axios.js'

export function useCourseProgress(courseId) {

  const completedVideos = ref(new Set())
  const completedAssignments = ref(new Set())
  const completedNotes = ref(new Set())

  const progressData = ref({
    completed: 0,
    total: 0,
    progress: 0
  })

  const isMarkingComplete = ref(false)

  // ---------------------------
  // ✅ FETCH COMPLETED ITEMS
  // ---------------------------
  const fetchCompletedItems = async () => {
    if (!courseId) return

    try {
      const response = await api.get(
        `/api/course-progress/${courseId}/completed`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      )

      const videos = new Set()
      const assignments = new Set()
      const notes = new Set()

      if (Array.isArray(response.data)) {
        response.data.forEach(item => {
          if (item.content_type === 'video') {
            videos.add(item.content_key)
          } else if (item.content_type === 'assignment') {
            assignments.add(item.content_key)
          } else if (item.content_type === 'note') {
            notes.add(item.content_key)
          }
        })
      }

      completedVideos.value = videos
      completedAssignments.value = assignments
      completedNotes.value = notes

      return {
        videos,
        assignments,
        notes
      }

    } catch (error) {
      console.error('Error fetching completed items:', error)
      return null
    }
  }

  // ---------------------------
  // ✅ CALCULATE PROGRESS (FRONTEND)
  // ---------------------------
  const calculateProgress = (weeks) => {
    let total = 0

    if (Array.isArray(weeks)) {
      weeks.forEach(week => {
        total += week.videos?.length || 0
        total += week.notes?.length || 0
        total += week.assignments?.length || 0
      })
    }

    const completed =
      completedVideos.value.size +
      completedAssignments.value.size +
      completedNotes.value.size

    const progress =
      total > 0 ? Math.round((completed / total) * 100) : 0

    progressData.value = {
      total,
      completed,
      progress
    }

    return progressData.value
  }

  // ---------------------------
  // ✅ MARK VIDEO COMPLETE
  // ---------------------------
  const markVideoCompleted = async (videoId) => {
    const contentKey = `video_${videoId}`

    if (completedVideos.value.has(contentKey)) return false

    isMarkingComplete.value = true

    try {
      const response = await api.post(
        "/api/progress/complete",
        {
          course_id: courseId,
          content_type: "video",
          content_key: contentKey
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      )

      if (response.status === 200 || response.status === 201) {
        completedVideos.value = new Set([
          ...completedVideos.value,
          contentKey
        ])
        return true
      }

      return false

    } catch (error) {
      console.error("Error marking video complete:", error)
      throw error

    } finally {
      isMarkingComplete.value = false
    }
  }

  // ---------------------------
  // ✅ MARK NOTE COMPLETE
  // ---------------------------
  const markNoteCompleted = async (noteId) => {
    const contentKey = `note_${noteId}`

    if (completedNotes.value.has(contentKey)) return false

    isMarkingComplete.value = true

    try {
      const response = await api.post(
        "/api/progress/complete",
        {
          course_id: courseId,
          content_type: "note",
          content_key: contentKey
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      )

      if (response.status === 200 || response.status === 201) {
        completedNotes.value = new Set([
          ...completedNotes.value,
          contentKey
        ])
        return true
      }

      return false

    } catch (error) {
      console.error("Error marking note complete:", error)
      throw error

    } finally {
      isMarkingComplete.value = false
    }
  }

  // ---------------------------
  // ✅ MARK ASSIGNMENT COMPLETE
  // ---------------------------
  const markAssignmentCompleted = async (assignmentId) => {
    const contentKey = `assignment_${assignmentId}`

    if (completedAssignments.value.has(contentKey)) return false

    isMarkingComplete.value = true

    try {
      const response = await api.post(
        "/api/progress/complete",
        {
          course_id: courseId,
          content_type: "assignment",
          content_key: contentKey
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      )

      if (response.status === 200 || response.status === 201) {
        completedAssignments.value = new Set([
          ...completedAssignments.value,
          contentKey
        ])
        return true
      }

      return false

    } catch (error) {
      console.error("Error marking assignment complete:", error)
      throw error

    } finally {
      isMarkingComplete.value = false
    }
  }

  // ---------------------------
  // ✅ CHECK FUNCTIONS
  // ---------------------------
  const isVideoCompleted = (videoId) => {
    return completedVideos.value.has(`video_${videoId}`)
  }

  const isNoteCompleted = (noteId) => {
    return completedNotes.value.has(`note_${noteId}`)
  }

  const isAssignmentCompleted = (assignmentId) => {
    return completedAssignments.value.has(`assignment_${assignmentId}`)
  }

  // ---------------------------
  // ✅ INIT FUNCTION
  // ---------------------------
  const initProgress = async (weeks) => {
    await fetchCompletedItems()
    calculateProgress(weeks)
  }

  return {
    completedVideos,
    completedAssignments,
    completedNotes,
    progressData,
    isMarkingComplete,

    fetchCompletedItems,
    calculateProgress,
    initProgress,

    markVideoCompleted,
    markNoteCompleted,
    markAssignmentCompleted,

    isVideoCompleted,
    isNoteCompleted,
    isAssignmentCompleted
  }
}