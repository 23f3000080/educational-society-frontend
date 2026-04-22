<template>
  <div class="min-h-full bg-slate-50/60 p-3 sm:p-4 lg:p-6 dark:bg-slate-950/30">
    <!-- 🔙 Back Button -->
    <button
      @click="goBackToCourse"
      class="mb-5 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-200 dark:hover:bg-gray-800"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Courses
    </button>

    <div class="mx-auto max-w-6xl">
      <!-- 🔄 Loading -->
      <LoadingState v-if="loading" />

      <!-- ❌ Error -->
      <ErrorState
        v-else-if="error"
        :error="error"
        :on-retry="retryLoad"
      />

      <!-- ✅ Main Content -->
      <template v-else>
        <div
          v-if="selectedContent?.type"
          class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-gray-800 dark:bg-gray-900"
        >
          <div class="border-b border-slate-100 bg-linear-to-r from-cyan-50 via-white to-sky-50 px-4 py-4 sm:px-6 dark:border-gray-800 dark:from-cyan-950/20 dark:via-gray-900 dark:to-slate-900">
            <p class="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Learning content
            </p>
            <h2 class="mt-1 text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
              {{ selectedContent.type === 'video' ? 'Lecture Player' : selectedContent.type === 'assignment' ? 'Assignment Workspace' : 'Notes Viewer' }}
            </h2>
          </div>

          <div class="p-4 sm:p-6 lg:p-8">
            <!-- 🎥 Lectures -->
            <LectureContent
              v-if="selectedContent.type === 'video'"
              :week="selectedContent.week"
              :week-obj="selectedContent.weekObj"
              :video="selectedContent.video"
              :is-completed="selectedContent.video && isVideoCompleted(selectedContent.video.id)"
              :is-marking-complete="isMarkingComplete"
              :is-video-completed="(video) => isVideoCompleted(video.id)"
              @mark-complete="handleMarkVideoComplete"
              @select-video="(video) => selectVideo(video, selectedContent.weekObj)"
            />

            <!-- 📝 Assignments -->
            <AssignmentContent
              v-else-if="selectedContent.type === 'assignment'"
              :week="selectedContent.week"
              :week-obj="selectedContent.weekObj"
              :assignment="selectedContent.assignment"
              :questions="questions"
              :user-answers="userAnswers"
              :loading-questions="loadingQuestions"
              :submitting="submitting"
              :show-answers="showAnswers"
              :submission-notice="submissionNotice"
              :last-submitted-at="lastSubmittedAt"
              :is-assignment-completed="(id) => isAssignmentCompleted(id)"
              :is-assignment-past-due="isAssignmentPastDue"
              :format-date="formatDate"
              @update-answer="saveAnswer"
              @submit="submitAssignment"
              @select-assignment="selectAssignment"
              @close-notice="submissionNotice = null"
            />

            <!-- 📄 Notes -->
            <NotesContent
              v-else-if="selectedContent.type === 'note'"
              :week="selectedContent.week"
              :week-obj="selectedContent.weekObj"
              :note="selectedContent.note"
              :is-completed="selectedContent.note && isNoteCompleted(selectedContent.note.id)"
              :is-marking-complete="isMarkingComplete"
              @mark-complete="handleMarkNoteComplete"
              @select-note="selectNote"
            />

            <div v-else class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-950/40">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                No Content Selected
              </h3>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Select a lecture, assignment, or note from the roadmap.
              </p>
            </div>
          </div>
        </div>

        <WelcomeState
          v-else-if="course"
          :title="course.title"
          :description="course.description"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import { useRouter } from "vue-router"

import LoadingState from "./LoadingState.vue"
import ErrorState from "./ErrorState.vue"
import WelcomeState from "./WelcomeState.vue"

import LectureContent from "./LectureContent.vue"
import AssignmentContent from "./AssignmentContent.vue"
import NotesContent from "./NotesContent.vue"

import { useCourseProgress } from "../../composable/course/userCourseProgress.js"
import api from "../../services/axios.js"

const router = useRouter()

/* -------------------------
   ✅ Props
-------------------------- */
const props = defineProps({
  courseId: Number,
  course: {
    type: Object,
    default: null
  },
  weeks: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  selectedContent: {
    type: Object,
    default: () => ({})
  },
  completedVideos: {
    type: [Array, Object],
    default: () => new Set()
  },
  completedAssignments: {
    type: [Array, Object],
    default: () => new Set()
  },
  completedNotes: {
    type: [Array, Object],
    default: () => new Set()
  }
})

const emit = defineEmits(["content-updated", "progress-updated"])

const {
  isMarkingComplete,
  markVideoCompleted,
  markNoteCompleted,
  markAssignmentCompleted
} = useCourseProgress(props.courseId)

/* -------------------------
   ✅ Local State
-------------------------- */
const questions = ref([])
const userAnswers = ref({})
const loadingQuestions = ref(false)
const submitting = ref(false)
const showAnswers = ref(false)
const canViewAnswers = ref(false)
const submissionNotice = ref(null)
const lastSubmittedAt = ref(null)

/* -------------------------
   ✅ Computed
-------------------------- */
const isAssignmentPastDue = computed(() => {
  const due = props.selectedContent?.assignment?.due_date
  return due ? new Date() > new Date(due) : false
})

/* -------------------------
   ✅ Retry
-------------------------- */
const retryLoad = async () => {
  emit("progress-updated")
}

/* -------------------------
   ✅ Video Complete
-------------------------- */
const handleMarkVideoComplete = async (video) => {
  const success = await markVideoCompleted(video.id)

  if (success) {
    emit("progress-updated")
  }
}

const handleMarkNoteComplete = async (note) => {
  const success = await markNoteCompleted(note.id)

  if (success) {
    emit("progress-updated")
  }
}

/* -------------------------
   ✅ Select Handlers
-------------------------- */
const selectVideo = (video, weekObj) => {
  emit("content-updated", {
    type: "video",
    week: weekObj.week_number,
    weekObj,
    video,
    assignment: null,
    note: null
  })
}

const selectAssignment = (assignment, weekObj) => {
  emit("content-updated", {
    type: "assignment",
    week: weekObj.week_number,
    weekObj,
    assignment,
    video: null,
    note: null
  })
}

const selectNote = (note, weekObj) => {
  emit("content-updated", {
    type: "note",
    week: weekObj.week_number,
    weekObj,
    note,
    video: null,
    assignment: null
  })
}

/* -------------------------
   ✅ Load Questions
-------------------------- */
const loadQuestions = async (assignmentId) => {
  loadingQuestions.value = true
  submissionNotice.value = null

  try {
    const res = await api.get(`/api/assignments/${assignmentId}/questions`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })

    questions.value = Array.isArray(res.data) ? res.data : (res.data?.questions || [])
    lastSubmittedAt.value = Array.isArray(res.data) ? null : (res.data?.latest_submission_at || null)
    canViewAnswers.value = questions.value.some(q => q.can_view_answer === true)

    // Hydrate answers from backend so students can see submitted answers
    // before due date and after due date.
    questions.value.forEach(q => {
      const studentAnswer = q.student_answer || {}

      if (q.question_type === 'multiple_select') {
        const selected = Array.isArray(studentAnswer.selected_option_ids)
          ? studentAnswer.selected_option_ids.map(String)
          : []
        userAnswers.value[q.id] = selected
      } else if (q.question_type === 'mcq') {
        userAnswers.value[q.id] = studentAnswer.selected_option_id ?? ''
      } else {
        userAnswers.value[q.id] = studentAnswer.text_answer ?? ''
      }
    })

  } catch (err) {
    console.error(err)
    canViewAnswers.value = false
  } finally {
    loadingQuestions.value = false
  }
}

/* -------------------------
   ✅ Save Answer
-------------------------- */
const saveAnswer = (questionId, answer) => {
  if ('selected_option_id' in answer) {
    userAnswers.value[questionId] = answer.selected_option_id
  } else if ('selected_option_ids' in answer) {
    userAnswers.value[questionId] = Array.isArray(answer.selected_option_ids)
      ? answer.selected_option_ids.map(String)
      : []
  } else {
    userAnswers.value[questionId] = answer.text_answer
  }
}

/* -------------------------
   ✅ Submit
-------------------------- */
const submitAssignment = async () => {
  if (!props.selectedContent?.assignment) return
  if (isAssignmentPastDue.value) return

  submitting.value = true

  try {
    const answers = questions.value.map(q => {
      if (q.question_type === 'mcq') {
        return {
          question_id: q.id,
          selected_option_id: userAnswers.value[q.id]
        }
      }

      if (q.question_type === 'multiple_select') {
        const selected = Array.isArray(userAnswers.value[q.id])
          ? userAnswers.value[q.id].map(String)
          : []

        return {
          question_id: q.id,
          selected_option_ids: selected
        }
      }

      return {
        question_id: q.id,
        text_answer: userAnswers.value[q.id]
      }
    })

    const res = await api.post(
      "/api/submit-assignment",
      {
        assignment_id: props.selectedContent.assignment.id,
        answers
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    )

    await markAssignmentCompleted(props.selectedContent.assignment.id)
    emit("progress-updated")

    submissionNotice.value = {
      type: "success",
      message: res.data.message || "Assignment submitted successfully",
      submittedAt: res.data.submitted_at
    }

    lastSubmittedAt.value = res.data.submitted_at || lastSubmittedAt.value

    showAnswers.value = isAssignmentPastDue.value && canViewAnswers.value

  } catch (err) {
    submissionNotice.value = {
      type: "error",
      message: err.response?.data?.error || "Submit failed"
    }
  } finally {
    submitting.value = false
  }
}

/* -------------------------
   ✅ Watch Assignment Change
-------------------------- */
watch(
  () => props.selectedContent?.assignment,
  async (val) => {
    if (val) {
      await loadQuestions(val.id)

      showAnswers.value = isAssignmentPastDue.value && canViewAnswers.value
    }
  },
  { immediate: true }
)

/* -------------------------
   ✅ Navigation
-------------------------- */
const goBackToCourse = () => {
  router.push("/student/courses")
}

const hasCompletedKey = (collection, key, fallbackId) => {
  if (collection instanceof Set) {
    return collection.has(key)
  }

  if (Array.isArray(collection)) {
    return collection.includes(key) || collection.includes(fallbackId)
  }

  return false
}

const isVideoCompleted = (videoId) => {
  return hasCompletedKey(props.completedVideos, `video_${videoId}`, videoId)
}

const isAssignmentCompleted = (assignmentId) => {
  return hasCompletedKey(props.completedAssignments, `assignment_${assignmentId}`, assignmentId)
}

const isNoteCompleted = (noteId) => {
  return hasCompletedKey(props.completedNotes, `note_${noteId}`, noteId)
}

/* -------------------------
   ✅ Utils
-------------------------- */
const formatDate = (date) => {
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return date

  return parsedDate.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}
</script>