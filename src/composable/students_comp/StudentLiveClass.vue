<template>
  <section class="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_28%),linear-gradient(135deg,rgba(2,6,23,1),rgba(15,23,42,1))]"></div>
    <div class="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]"></div>

    <div class="relative mx-auto max-w-7xl space-y-6">
      <header class="overflow-hidden rounded-[2rem] border border-white/10 bg-white/7 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div class="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              Live classes
            </div>
            <h1 class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your meetings, ready to join.
            </h1>
            <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Open the instructor-provided Google Meet or Zoom link directly from your dashboard. If no link is shared, the internal room page stays available as a fallback.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
              @click="refreshLiveClasses"
            >
              Refresh classes
            </button>
            <a
              href="#classes"
              class="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              View sessions
            </a>
          </div>
        </div>

        <div class="grid gap-px border-t border-white/10 bg-white/5 sm:grid-cols-3">
          <div class="bg-slate-950/40 p-4 sm:p-5">
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Total sessions</p>
            <p class="mt-2 text-2xl font-semibold text-white">{{ liveClasses.length }}</p>
            <p class="mt-1 text-sm text-slate-400">Classes visible right now</p>
          </div>
          <div class="bg-slate-950/40 p-4 sm:p-5">
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Ready to join</p>
            <p class="mt-2 text-2xl font-semibold text-white">{{ joinableCount }}</p>
            <p class="mt-1 text-sm text-slate-400">Sessions with a meeting link</p>
          </div>
          <div class="bg-slate-950/40 p-4 sm:p-5">
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Live now</p>
            <p class="mt-2 text-2xl font-semibold text-white">{{ liveCount }}</p>
            <p class="mt-1 text-sm text-slate-400">Classes currently marked live</p>
          </div>
        </div>
      </header>

      <div v-if="loading" class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article v-for="placeholder in 6" :key="placeholder" class="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div class="h-3 w-28 animate-pulse rounded-full bg-white/10"></div>
          <div class="mt-4 h-6 w-3/4 animate-pulse rounded-full bg-white/10"></div>
          <div class="mt-3 h-4 w-full animate-pulse rounded-full bg-white/10"></div>
          <div class="mt-2 h-4 w-5/6 animate-pulse rounded-full bg-white/10"></div>
          <div class="mt-6 flex gap-2">
            <div class="h-8 w-20 animate-pulse rounded-full bg-white/10"></div>
            <div class="h-8 w-24 animate-pulse rounded-full bg-white/10"></div>
          </div>
        </article>
      </div>

      <div v-else-if="error" class="rounded-[1.75rem] border border-rose-400/20 bg-rose-500/10 p-6 text-rose-100 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h2 class="text-lg font-semibold">Unable to load live classes</h2>
        <p class="mt-2 text-sm text-rose-100/90">{{ error }}</p>
      </div>

      <div v-else-if="!liveClasses.length" class="rounded-[1.75rem] border border-dashed border-white/15 bg-white/6 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
          <svg viewBox="0 0 24 24" class="h-8 w-8 text-slate-300" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </div>
        <h2 class="mt-5 text-2xl font-semibold text-white">No live classes yet</h2>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          You’ll see enrolled sessions here once an instructor schedules a class and shares a meeting link.
        </p>
      </div>

      <div v-else id="classes" class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="liveClass in liveClasses"
          :key="liveClass.id"
          class="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/7 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
        >
          <div class="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
            <div class="min-w-0">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">{{ liveClass.course_title || 'Course' }}</p>
              <h3 class="mt-2 line-clamp-2 text-xl font-semibold text-white">{{ liveClass.title }}</h3>
            </div>
            <span :class="statusClass(liveClass.status)" class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {{ liveClass.status }}
            </span>
          </div>

          <div class="flex-1 space-y-5 px-5 py-5 sm:px-6">
            <p class="text-sm leading-6 text-slate-300">
              {{ liveClass.description || 'Your instructor has not shared a description yet.' }}
            </p>

            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Room</p>
                <p class="mt-1 text-sm font-medium text-white">{{ liveClass.room_id }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Instructor</p>
                <p class="mt-1 text-sm font-medium text-white">{{ liveClass.instructor_name || 'Not assigned' }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Schedule</p>
                <p class="mt-1 text-sm font-medium text-white">{{ formatDate(liveClass.start_time) }}</p>
                <p class="text-xs text-slate-400">{{ formatTime(liveClass.start_time) }} - {{ formatTime(liveClass.end_time) }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Meeting</p>
                <p class="mt-1 text-sm font-medium text-white">{{ getMeetingProvider(liveClass) }}</p>
              </div>
            </div>

            <div v-if="liveClass.message" class="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
              <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">Message</p>
              <p class="mt-1">{{ liveClass.message }}</p>
            </div>
          </div>

          <div class="border-t border-white/10 px-5 py-4 sm:px-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="text-xs text-slate-400">
                {{ formatTime(liveClass.start_time) }} - {{ formatTime(liveClass.end_time) }}
              </div>

              <a
                v-if="getMeetingLink(liveClass)"
                :href="getMeetingLink(liveClass)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Join {{ getMeetingProvider(liveClass) }}
              </a>
              <router-link
                v-else
                :to="`/student/live-class/${liveClass.id}`"
                class="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Open class page
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
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

const getMeetingLink = (liveClass) => {
  const meetingLink = liveClass?.meeting_link?.trim()
  if (!meetingLink) return ''
  if (/^https?:\/\//i.test(meetingLink)) return meetingLink
  return `https://${meetingLink}`
}

const getMeetingProvider = (liveClass) => {
  const meetingLink = getMeetingLink(liveClass)
  if (!meetingLink) return 'Room'
  if (/meet\.google\.com/i.test(meetingLink)) return 'Google Meet'
  if (/zoom\.us/i.test(meetingLink)) return 'Zoom'
  return 'Meeting link'
}

const joinableCount = computed(() => liveClasses.value.filter((liveClass) => Boolean(getMeetingLink(liveClass))).length)

const liveCount = computed(() => liveClasses.value.filter((liveClass) => liveClass.status === 'Live').length)

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