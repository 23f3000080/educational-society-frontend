<template>
  <div class="p-6 space-y-6">

    <h2 class="text-xl font-semibold text-gray-800">
      {{ note?.title || "Select Notes" }}
    </h2>

    <p class="text-gray-600">{{ note?.description }}</p>

    <div v-if="weekObj?.notes?.length" class="space-y-2">
      <p class="text-sm text-gray-500">Notes in this week</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in weekObj.notes"
          :key="item.id"
          class="px-3 py-1.5 rounded-full text-sm border"
          :class="note?.id === item.id ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'"
          @click="$emit('select-note', item, weekObj)"
        >
          {{ item.title }}
        </button>
      </div>
    </div>

    <!-- File Viewer -->
    <div v-if="note?.file_url" class="h-[70vh] border rounded-lg overflow-hidden">
      <iframe
        :src="note.file_url"
        class="w-full h-full"
      ></iframe>
    </div>

    <div v-else class="text-gray-500 text-center py-10">
      No file available
    </div>

    <!-- Mark Complete -->
    <button
      v-if="note"
      @click="$emit('mark-complete', note)"
      :disabled="isCompleted || isMarkingComplete"
      class="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-60"
    >
      {{ isCompleted ? "Completed" : isMarkingComplete ? "Saving..." : "Mark Completed" }}
    </button>

  </div>
</template>

<script setup>
const props = defineProps({
  note: Object,
  week: Number,
  weekObj: Object,
  isCompleted: {
    type: Boolean,
    default: false
  },
  isMarkingComplete: {
    type: Boolean,
    default: false
  }
})

defineEmits(["mark-complete", "select-note"])
</script>