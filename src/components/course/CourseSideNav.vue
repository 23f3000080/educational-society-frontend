<template>
  <div class="h-full flex flex-col">

    <!-- 📘 Course Header -->
    <div class="p-4 border-b">
      <h2 class="text-lg font-semibold text-gray-800">
        {{ course?.title || "Course" }}
      </h2>

      <p class="text-sm text-gray-500">
        {{ course?.subject }} • Class {{ course?.class_level }}
      </p>

      <!-- Progress -->
      <div class="mt-3">
        <div class="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{{ progressData?.progress || 0 }}%</span>
        </div>

        <div class="w-full bg-gray-200 h-2 rounded-full">
          <div
            class="bg-green-500 h-2 rounded-full transition-all"
            :style="{ width: `${progressData?.progress || 0}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 📚 Weeks List -->
    <div class="flex-1 overflow-y-auto p-3 space-y-4">

      <div
        v-for="week in weeks"
        :key="week.id"
        class="border rounded-xl overflow-hidden bg-white shadow-sm"
      >

        <!-- Week Header -->
        <div
          class="p-3 bg-gray-100 cursor-pointer flex justify-between items-center"
          @click="toggleWeek(week.id)"
        >
          <div>
            <h3 class="font-medium text-gray-800">
              Week {{ week.week_number }}
            </h3>
            <p class="text-xs text-gray-500">
              {{ week.title }}
            </p>
          </div>

          <svg
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': openWeeks.includes(week.id) }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Week Content -->
        <div v-if="openWeeks.includes(week.id)" class="p-3 space-y-3">

          <!-- 🎥 Videos -->
          <div v-if="week.videos?.length">
            <p class="text-xs text-gray-500 mb-1">Lectures</p>

            <div
              v-for="video in week.videos"
              :key="video.id"
              @click="selectContent('video', week, video)"
              class="p-2 rounded-lg cursor-pointer flex justify-between items-center text-sm hover:bg-blue-50"
              :class="isActive('video', video.id) ? 'bg-blue-100' : ''"
            >
              <span class="truncate">{{ video.title }}</span>

              <span v-if="isVideoCompleted(video)" class="text-green-600">
                ✔
              </span>
            </div>
          </div>

          <!-- 📝 Assignments -->
          <div v-if="week.assignments?.length">
            <p class="text-xs text-gray-500 mb-1">Assignments</p>

            <div
              v-for="assignment in week.assignments"
              :key="assignment.id"
              @click="selectContent('assignment', week, assignment)"
              class="p-2 rounded-lg cursor-pointer flex justify-between items-center text-sm hover:bg-green-50"
              :class="isActive('assignment', assignment.id) ? 'bg-green-100' : ''"
            >
              <span class="truncate">{{ assignment.title }}</span>

              <span v-if="isAssignmentCompleted(assignment)" class="text-green-600">
                ✔
              </span>
            </div>
          </div>

          <!-- 📄 Notes -->
          <div v-if="week.notes?.length">
            <p class="text-xs text-gray-500 mb-1">Notes</p>

            <div
              v-for="note in week.notes"
              :key="note.id"
              @click="selectContent('note', week, note)"
              class="p-2 rounded-lg cursor-pointer text-sm hover:bg-purple-50 flex justify-between items-center"
              :class="isActive('note', note.id) ? 'bg-purple-100' : ''"
            >
              <span class="truncate">{{ note.title }}</span>
              <span v-if="isNoteCompleted(note)" class="text-green-600">✔</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

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