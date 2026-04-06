<template>
  <div class="p-6 space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800">
        {{ video?.title || "Select a lecture" }}
      </h2>

      <button
        v-if="video && !isCompleted"
        @click="markComplete"
        :disabled="isMarkingComplete"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm disabled:opacity-60"
      >
        {{ isMarkingComplete ? "Saving..." : "Mark Completed" }}
      </button>

      <span
        v-else-if="video && isCompleted"
        class="text-green-600 text-sm font-medium"
      >
        ✔ Completed
      </span>
    </div>

    <!-- Video Player -->
    <div v-if="video" class="aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        v-if="isEmbed(video.url)"
        :src="embedUrl(video.url)"
        class="w-full h-full"
        allowfullscreen
      ></iframe>

      <video
        v-else
        :src="video.url"
        controls
        class="w-full h-full"
        @ended="markComplete"
      />
    </div>

    <div v-if="weekObj?.videos?.length" class="space-y-2">
      <p class="text-sm text-gray-500">Other lectures in this week</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in weekObj.videos"
          :key="item.id"
          class="px-3 py-1.5 rounded-full text-sm border"
          :class="video?.id === item.id ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'"
          @click="emit('select-video', item)"
        >
          {{ item.title }}
          <span v-if="isVideoCompleted && isVideoCompleted(item)" class="ml-1 text-green-600">✔</span>
        </button>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="text-gray-500 text-center py-10">
      Select a lecture from sidebar
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  video: Object,
  week: Number,
  weekObj: Object,
  isCompleted: Boolean,
  isMarkingComplete: Boolean,
  isVideoCompleted: Function
})

const emit = defineEmits(["mark-complete", "select-video"])

/* ---------------- */
const markComplete = async () => {
  if (!props.video || props.isMarkingComplete) return
  emit("mark-complete", props.video)
}

/* ---------------- */
const isEmbed = (url) => {
  return /youtube|youtu\.be|drive\.google/.test(url)
}

const embedUrl = (url) => {
  if (/youtu/.test(url)) {
    const id = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1]
    return `https://www.youtube.com/embed/${id}`
  }

  if (/drive/.test(url)) {
    const id = url.match(/(?:d\/|id=)([a-zA-Z0-9_-]+)/)?.[1]
    return `https://drive.google.com/file/d/${id}/preview`
  }

  return url
}
</script>