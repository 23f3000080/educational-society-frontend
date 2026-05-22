<template>
  <section class="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-slate-100 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6">
      <header class="rounded-4xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-black/20">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">Student Live Classes</p>
        <div class="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Join your live sessions</h1>
            <p class="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">Open any available class room to start your camera and microphone automatically. Only enrolled students can join.</p>
          </div>
          <button
            type="button"
            class="inline-flex items-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            @click="refreshLiveClasses"
          >
            Refresh
          </button>
        </div>
      </header>

      <div v-if="loading" class="rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-slate-800 dark:bg-slate-950">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-500 dark:border-slate-800"></div>
        <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading your live classes...</p>
      </div>

      <div v-else-if="error" class="rounded-4xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-lg dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
        <h2 class="text-lg font-semibold">Unable to load live classes</h2>
        <p class="mt-2 text-sm">{{ error }}</p>
      </div>

      <div v-else-if="!liveClasses.length" class="rounded-4xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-lg dark:border-slate-700 dark:bg-slate-950/70">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">No live classes yet</h2>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">You will see enrolled classes here once an instructor schedules a session.</p>
      </div>

      <div v-else class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="liveClass in liveClasses"
          :key="liveClass.id"
          class="group overflow-hidden rounded-4xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-black/20"
        >
          <div class="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 dark:border-slate-800">
            <div class="min-w-0">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400">{{ liveClass.course_title || 'Course' }}</p>
              <h3 class="mt-2 text-xl font-bold text-slate-900 dark:text-white">{{ liveClass.title }}</h3>
            </div>
            <span :class="statusClass(liveClass.status)" class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">{{ liveClass.status }}</span>
          </div>

          <div class="space-y-3 px-5 py-5 text-sm text-slate-600 dark:text-slate-300">
            <p>{{ liveClass.description || 'Your instructor has not shared a description yet.' }}</p>
            <div class="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">Room {{ liveClass.room_id }}</span>
              <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">{{ liveClass.participant_count || 0 }} participants</span>
              <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">{{ formatDate(liveClass.start_time) }}</span>
            </div>
          </div>

          <div class="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800">
            <div class="text-xs text-slate-500 dark:text-slate-400">
              {{ formatTime(liveClass.start_time) }} - {{ formatTime(liveClass.end_time) }}
            </div>
            <router-link
              :to="`/student/live-class/${liveClass.id}`"
              class="inline-flex items-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Join Room
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../../services/axios.js'

const liveClasses = ref([])
const loading = ref(false)
const error = ref('')

const statusClass = (status) => {
  const map = {
    Scheduled: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    Live: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
    Completed: 'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300',
    Cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
  }
  return map[status] || map.Scheduled
}

const formatDate = (value) => {
  if (!value) return 'TBD'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'TBD' : date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (value) => {
  if (!value) return 'TBD'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'TBD' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const loadLiveClasses = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await api.get('/api/student/live-classes', { params: { page: 1, per_page: 50 } })
    liveClasses.value = data.live_classes || []
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.error || 'Could not load your live classes.'
  } finally {
    loading.value = false
  }
}

const refreshLiveClasses = () => {
  loadLiveClasses()
}

onMounted(loadLiveClasses)
</script>