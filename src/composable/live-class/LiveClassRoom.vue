<template>
  <div class="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
    <div class="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-6 lg:px-6">
      <header class="rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              <span class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">Live Class</span>
              <span class="rounded-full border border-white/10 px-3 py-1 text-slate-300">{{ roomInfo?.room_id || roomIdLabel }}</span>
              <span class="rounded-full border border-white/10 px-3 py-1 text-slate-300">{{ roomParticipantCount }} participants</span>
            </div>
            <h1 class="mt-3 text-2xl font-bold text-white sm:text-3xl">{{ roomInfo?.title || 'Join your live class' }}</h1>
            <p class="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
              {{ roomInfo?.description || 'This session opens in Google Meet or Zoom using the instructor-provided meeting link.' }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              @click="copyRoomId"
            >
              Copy Room ID
            </button>
            <button
              v-if="meetingLink"
              type="button"
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              @click="copyMeetingLink"
            >
              Copy Meeting Link
            </button>
            <button
              type="button"
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              @click="goBack"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <div v-if="loading" class="flex flex-1 items-center justify-center rounded-4xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <div class="text-center">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-emerald-400"></div>
          <p class="mt-4 text-sm text-slate-300">Loading your live class...</p>
        </div>
      </div>

      <div v-else-if="error" class="rounded-4xl border border-rose-400/20 bg-rose-500/10 p-6 text-rose-100 shadow-2xl shadow-black/20">
        <h2 class="text-lg font-semibold">Unable to open this live class</h2>
        <p class="mt-2 text-sm text-rose-100/90">{{ error }}</p>
        <div class="mt-4 flex gap-3">
          <button type="button" class="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700" @click="retryJoin">Retry</button>
          <button type="button" class="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10" @click="goBack">Go Back</button>
        </div>
      </div>

      <div v-else class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section class="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Meeting link</p>
          <h2 class="mt-3 text-2xl font-bold text-white">{{ meetingLink ? 'Open the instructor meeting' : 'Meeting link not shared yet' }}</h2>
          <p class="mt-2 text-sm text-slate-300">
            {{ meetingLink ? 'The session opens in a new tab so you can continue using this page as a reference.' : 'Your instructor has not added a Google Meet or Zoom link yet.' }}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <a
              v-if="meetingLink"
              :href="meetingLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Join meeting
            </a>
            <button
              v-else
              type="button"
              class="inline-flex items-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              @click="copyRoomId"
            >
              Copy room ID
            </button>
          </div>

          <div class="mt-8 rounded-3xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-300">
            <p class="font-semibold text-white">How to join</p>
            <ol class="mt-3 list-decimal space-y-2 pl-5">
              <li>Click Join meeting.</li>
              <li>Allow camera or microphone only if the meeting provider asks for it.</li>
              <li>Return here any time to copy the room or meeting link again.</li>
            </ol>
          </div>
        </section>

        <aside class="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Class details</p>
          <dl class="mt-4 space-y-4 text-sm">
            <div>
              <dt class="text-slate-400">Status</dt>
              <dd class="mt-1 text-base font-semibold text-white">{{ roomInfo?.status || 'Scheduled' }}</dd>
            </div>
            <div>
              <dt class="text-slate-400">Instructor</dt>
              <dd class="mt-1 text-base font-semibold text-white">{{ roomInfo?.instructor_name || 'Not assigned' }}</dd>
            </div>
            <div>
              <dt class="text-slate-400">Schedule</dt>
              <dd class="mt-1 text-base font-semibold text-white">{{ formatDate(roomInfo?.start_time) }}</dd>
              <dd class="text-slate-300">{{ formatTime(roomInfo?.start_time) }} - {{ formatTime(roomInfo?.end_time) }}</dd>
            </div>
            <div>
              <dt class="text-slate-400">Room ID</dt>
              <dd class="mt-1 text-base font-semibold text-white">{{ roomInfo?.room_id || roomIdLabel }}</dd>
            </div>
            <div>
              <dt class="text-slate-400">Participants</dt>
              <dd class="mt-1 text-base font-semibold text-white">{{ roomParticipantCount }}</dd>
            </div>
            <div v-if="roomInfo?.message">
              <dt class="text-slate-400">Message</dt>
              <dd class="mt-1 text-slate-200">{{ roomInfo.message }}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div v-if="toast.show" class="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p class="font-semibold">{{ toast.title }}</p>
        <p class="mt-1 text-white/70">{{ toast.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios.js'
import { getAuth } from '../../utils/auth.js'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref('')
const toast = ref({ show: false, title: '', message: '' })
const roomInfo = ref(null)
const roomParticipantCount = ref(0)
const clipboardSupport = typeof navigator !== 'undefined' && Boolean(navigator.clipboard)

const auth = getAuth()
const liveClassId = computed(() => Number(route.params.id))
const roomIdLabel = computed(() => `LC-${route.params.id}`)

function normalizeMeetingLink(value) {
  const meetingLink = value?.trim()
  if (!meetingLink) return ''
  if (/^https?:\/\//i.test(meetingLink)) return meetingLink
  return `https://${meetingLink}`
}

const meetingLink = computed(() => normalizeMeetingLink(roomInfo.value?.meeting_link))

const showToast = (title, message) => {
  toast.value = { show: true, title, message }
  window.clearTimeout(showToast._timer)
  showToast._timer = window.setTimeout(() => {
    toast.value.show = false
  }, 3000)
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

const loadRoom = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await api.get(`/api/live-classes/${liveClassId.value}/access`)
    roomInfo.value = data.live_class || null
    roomParticipantCount.value = data.room?.participant_count ?? 0
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.error || 'You cannot access this class.'
  } finally {
    loading.value = false
  }
}

const retryJoin = async () => {
  await loadRoom()
}

const copyText = async (value, title) => {
  if (!value) return

  try {
    if (clipboardSupport) {
      await navigator.clipboard.writeText(value)
    }
    showToast(title, value)
  } catch (_error) {
    showToast(`${title} unavailable`, value)
  }
}

const copyRoomId = async () => {
  await copyText(roomInfo.value?.room_id || roomIdLabel.value, 'Room ID copied')
}

const copyMeetingLink = async () => {
  await copyText(meetingLink.value, 'Meeting link copied')
}

const goBack = () => {
  router.back()
}

onMounted(async () => {
  if (!auth.token) {
    router.push('/login')
    return
  }

  await loadRoom()
})
</script>
