<template>
  <div class="flex h-full flex-col overflow-hidden bg-white/95 dark:bg-gray-900/95">
    <div class="border-b border-cyan-100 bg-linear-to-r from-cyan-50 via-white to-sky-50 p-4 dark:border-cyan-900/40 dark:from-cyan-950/40 dark:via-gray-900 dark:to-slate-900">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-xs font-black uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
            Roadmap
          </p>
          <h2 class="mt-1 truncate text-lg font-black text-slate-900 dark:text-white">
            {{ course?.title || 'Course' }}
          </h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ course?.subject || 'Course content' }}<span v-if="course?.class_level"> • Class {{ course.class_level }}</span>
          </p>
        </div>

        <div class="shrink-0 rounded-2xl bg-white px-3 py-2 text-right shadow-sm ring-1 ring-cyan-100 dark:bg-gray-950 dark:ring-cyan-900/40">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Progress</p>
          <p class="text-lg font-black text-cyan-700 dark:text-cyan-300">{{ progressPercentage }}%</p>
        </div>
      </div>

      <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-gray-800">
        <div
          class="h-full rounded-full bg-linear-to-r from-cyan-500 to-emerald-400 transition-all"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-3 space-y-3">
      <div v-if="!weeks?.length" class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-gray-700 dark:bg-gray-950/40 dark:text-slate-400">
        No weeks available yet.
      </div>

      <div
        v-for="week in weeks"
        :key="week.id"
        class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-950/60"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between gap-3 p-4 text-left"
          @click="toggleWeek(week.id)"
        >
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300">
                Week {{ week.week_number }}
              </span>
              <span v-if="week.videos?.length || week.assignments?.length || week.notes?.length" class="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                {{ (week.videos?.length || 0) + (week.assignments?.length || 0) + (week.notes?.length || 0) }} items
              </span>
            </div>
            <h3 class="mt-2 truncate text-sm font-bold text-slate-900 dark:text-white">
              {{ week.title }}
            </h3>
          </div>

          <svg
            class="h-5 w-5 shrink-0 text-slate-400 transition-transform dark:text-slate-500"
            :class="{ 'rotate-180': openWeeks.includes(week.id) }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div v-if="openWeeks.includes(week.id)" class="space-y-3 border-t border-slate-100 p-4 dark:border-gray-800">
          <div v-if="week.videos?.length" class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Lectures</p>
            <button
              v-for="video in week.videos"
              :key="video.id"
              type="button"
              @click="selectContent('video', week, video)"
              class="flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition"
              :class="isActive('video', video.id) ? 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-200' : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50 dark:border-gray-800 dark:bg-gray-950/40 dark:text-slate-300 dark:hover:bg-gray-900'"
            >
              <span class="truncate">{{ video.title }}</span>
              <span v-if="isVideoCompleted(video)" class="text-emerald-600 dark:text-emerald-400">✔</span>
            </button>
          </div>

          <div v-if="week.assignments?.length" class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Assignments</p>
            <button
              v-for="assignment in week.assignments"
              :key="assignment.id"
              type="button"
              @click="selectContent('assignment', week, assignment)"
              class="flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition"
              :class="isActive('assignment', assignment.id) ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200' : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 dark:border-gray-800 dark:bg-gray-950/40 dark:text-slate-300 dark:hover:bg-gray-900'"
            >
              <span class="truncate">{{ assignment.title }}</span>
              <span v-if="isAssignmentCompleted(assignment)" class="text-emerald-600 dark:text-emerald-400">✔</span>
            </button>
          </div>

          <div v-if="week.notes?.length" class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Notes</p>
            <button
              v-for="note in week.notes"
              :key="note.id"
              type="button"
              @click="selectContent('note', week, note)"
              class="flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition"
              :class="isActive('note', note.id) ? 'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-200' : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-violet-200 hover:bg-violet-50 dark:border-gray-800 dark:bg-gray-950/40 dark:text-slate-300 dark:hover:bg-gray-900'"
            >
              <span class="truncate">{{ note.title }}</span>
              <span v-if="isNoteCompleted(note)" class="text-emerald-600 dark:text-emerald-400">✔</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"

/* ---------------------------
   Props
---------------------------- */
const props = defineProps({
  course: Object,
  weeks: Array,
  completedVideos: [Array, Object],
  completedAssignments: [Array, Object],
  completedNotes: [Array, Object],
  progressData: Object
})

/* ---------------------------
   Emits
---------------------------- */
const emit = defineEmits(["content-selected"])

/* ---------------------------
   State
---------------------------- */
const openWeeks = ref([])
const activeItem = ref({
  type: null,
  id: null
})

const progressPercentage = computed(() => props.progressData?.progress || 0)

/* ---------------------------
   Methods
---------------------------- */
const toggleWeek = (weekId) => {
  if (openWeeks.value.includes(weekId)) {
    openWeeks.value = openWeeks.value.filter(id => id !== weekId)
  } else {
    openWeeks.value.push(weekId)
  }
}

watch(
  () => props.weeks,
  (weeks) => {
    if (weeks?.length && !openWeeks.value.length) {
      openWeeks.value = [weeks[0].id]
    }
  },
  { immediate: true }
)

const selectContent = (type, week, item) => {
  activeItem.value = {
    type,
    id: item.id
  }

  emit("content-selected", {
    type,
    week: week.week_number,
    weekObj: week,
    video: type === "video" ? item : null,
    assignment: type === "assignment" ? item : null,
    note: type === "note" ? item : null
  })
}

const isActive = (type, id) => {
  return activeItem.value.type === type && activeItem.value.id === id
}

/* ---------------------------
   Completion Helpers
---------------------------- */
const isVideoCompleted = (video) => {
  const key = `video_${video.id}`

  if (props.completedVideos instanceof Set) {
    return props.completedVideos.has(key)
  }

  if (Array.isArray(props.completedVideos)) {
    return props.completedVideos.includes(key) || props.completedVideos.includes(video.id)
  }

  return false
}

const isAssignmentCompleted = (assignment) => {
  const key = `assignment_${assignment.id}`

  if (props.completedAssignments instanceof Set) {
    return props.completedAssignments.has(key)
  }

  if (Array.isArray(props.completedAssignments)) {
    return props.completedAssignments.includes(key) || props.completedAssignments.includes(assignment.id)
  }

  return false
}

const isNoteCompleted = (note) => {
  const key = `note_${note.id}`

  if (props.completedNotes instanceof Set) {
    return props.completedNotes.has(key)
  }

  if (Array.isArray(props.completedNotes)) {
    return props.completedNotes.includes(key) || props.completedNotes.includes(note.id)
  }

  return false
}
</script>