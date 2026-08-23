<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-linear-to-r from-slate-50 via-white to-cyan-50 p-4 sm:p-5 lg:flex-row lg:items-start lg:justify-between dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-cyan-950/20">
      <div class="min-w-0">
        <p class="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
          Lecture player
        </p>
        <h2 class="mt-2 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
          {{ video?.title || 'Select a lecture' }}
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Watch the lecture, mark it complete, and continue to the next topic in the roadmap.
        </p>
      </div>

      <button
        v-if="video && !isCompleted"
        @click="markComplete"
        :disabled="isMarkingComplete"
        class="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ isMarkingComplete ? 'Saving...' : 'Mark completed' }}
      </button>

      <span
        v-else-if="video && isCompleted"
        class="inline-flex items-center justify-center rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm font-black uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
      >
        ✔ Completed
      </span>
    </div>

    <div v-if="video" class="overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-[0_18px_60px_rgba(15,23,42,0.12)] dark:border-gray-800">
      <iframe
        v-if="isEmbed(video.url)"
        :src="embedUrl(video.url)"
        class="aspect-video w-full"
        allowfullscreen
      ></iframe>

      <video
        v-else
        :src="video.url"
        controls
        class="aspect-video w-full"
        @ended="markComplete"
      />
    </div>

    <div v-if="weekObj?.videos?.length" class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Other lectures in this week</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="item in weekObj.videos"
          :key="item.id"
          class="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition"
          :class="video?.id === item.id ? 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-200' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50 dark:border-gray-800 dark:bg-gray-950/40 dark:text-slate-300 dark:hover:bg-gray-900'"
          @click="emit('select-video', item)"
        >
          <span class="truncate">{{ item.title }}</span>
          <span v-if="isVideoCompleted && isVideoCompleted(item)" class="text-emerald-600 dark:text-emerald-400">✔</span>
        </button>
      </div>
    </div>

    <div v-else class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-500 dark:border-gray-700 dark:bg-gray-950/40 dark:text-slate-400">
      Select a lecture from the roadmap.
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