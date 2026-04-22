<template>
  <div class="space-y-6">
    <div class="rounded-3xl border border-slate-200 bg-linear-to-r from-violet-50 via-white to-slate-50 p-4 sm:p-5 shadow-sm dark:border-gray-800 dark:from-violet-950/20 dark:via-gray-900 dark:to-slate-900">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
        Notes viewer
      </p>
      <h2 class="mt-2 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
        {{ note?.title || 'Select notes' }}
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Review notes, switch between items in the current week, and mark your reading complete.
      </p>
    </div>

    <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">{{ note?.description }}</p>

    <div v-if="weekObj?.notes?.length" class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Notes in this week</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="item in weekObj.notes"
          :key="item.id"
          class="inline-flex items-center rounded-full border px-3 py-2 text-sm font-semibold transition"
          :class="note?.id === item.id ? 'border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-200' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-200 hover:bg-violet-50 dark:border-gray-800 dark:bg-gray-950/40 dark:text-slate-300 dark:hover:bg-gray-900'"
          @click="$emit('select-note', item, weekObj)"
        >
          {{ item.title }}
        </button>
      </div>
    </div>

    <div v-if="note?.file_url" class="overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-[0_18px_60px_rgba(15,23,42,0.12)] dark:border-gray-800">
      <iframe
        :src="note.file_url"
        class="h-[65vh] w-full sm:h-[70vh]"
      ></iframe>
    </div>

    <div v-else class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-500 dark:border-gray-700 dark:bg-gray-950/40 dark:text-slate-400">
      No file available
    </div>

    <button
      v-if="note"
      @click="$emit('mark-complete', note)"
      :disabled="isCompleted || isMarkingComplete"
      class="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
    >
      {{ isCompleted ? 'Completed' : isMarkingComplete ? 'Saving...' : 'Mark completed' }}
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