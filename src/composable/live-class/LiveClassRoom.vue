<template>
  <div class="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
    <div class="mx-auto flex min-h-screen max-w-480 flex-col gap-4 px-4 py-4 lg:px-6">
      <header class="flex flex-col gap-4 rounded-4xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            <span class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">Live Class</span>
            <span class="rounded-full border border-white/10 px-3 py-1 text-slate-300">{{ roomInfo?.room_id || roomIdLabel }}</span>
            <span class="rounded-full border border-white/10 px-3 py-1 text-slate-300">{{ roomParticipantCount }} participants</span>
          </div>
          <h1 class="mt-3 text-2xl font-bold text-white sm:text-3xl">{{ roomInfo?.title || 'Loading live room...' }}</h1>
          <p class="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
            {{ roomInfo?.description || 'Join the room to begin your live class. Camera and microphone access is requested automatically.' }}
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
            type="button"
            class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            @click="goBack"
          >
            Back
          </button>
        </div>
      </header>

      <div v-if="loading" class="flex flex-1 items-center justify-center rounded-4xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <div class="text-center">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-emerald-400"></div>
          <p class="mt-4 text-sm text-slate-300">Connecting to the room...</p>
        </div>
      </div>

      <div v-else-if="error" class="rounded-4xl border border-rose-400/20 bg-rose-500/10 p-6 text-rose-100 shadow-2xl shadow-black/20">
        <h2 class="text-lg font-semibold">Unable to join this live class</h2>
        <p class="mt-2 text-sm text-rose-100/90">{{ error }}</p>
        <div class="mt-4 flex gap-3">
          <button type="button" class="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700" @click="retryJoin">Retry</button>
          <button type="button" class="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10" @click="goBack">Go Back</button>
        </div>
      </div>

      <div v-else class="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section class="flex min-w-0 flex-col gap-4">
          <div ref="stageRef" class="grid min-h-[55vh] gap-4 rounded-4xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:min-h-[70vh]" :class="videoGridClass">
            <ParticipantVideo
              :participant="selfParticipant"
              :stream="previewStream"
              :is-local="true"
              :muted="true"
              class="min-h-70"
            />

            <ParticipantVideo
              v-for="remote in remoteStreams"
              :key="remote.socket_id"
              :participant="remote.participant || fallbackParticipant(remote.socket_id)"
              :stream="remote.stream"
              :muted="false"
              class="min-h-70"
            />

            <div v-if="!remoteStreams.length" class="col-span-full flex min-h-60 items-center justify-center rounded-4xl border border-dashed border-white/10 bg-white/5 text-center text-slate-300">
              <div>
                <p class="text-lg font-semibold text-white">Waiting for others to join</p>
                <p class="mt-2 text-sm text-slate-400">Your video is already live. Share the room ID so students can join.</p>
              </div>
            </div>
          </div>

          <ControlBar
            :mic-enabled="micEnabled"
            :camera-enabled="cameraEnabled"
            :screen-sharing="isScreenSharing"
            :hand-raised="handRaised"
            :show-chat="showChatSidebar"
            :show-participants="showPeopleSidebar"
            @toggle-mic="toggleMic"
            @toggle-camera="toggleCamera"
            @toggle-screen-share="toggleScreenShare"
            @toggle-hand="toggleHandRaise"
            @toggle-chat="toggleChat"
            @toggle-people="togglePeople"
            @toggle-fullscreen="toggleFullscreen"
            @leave-room="leaveRoom"
          />
        </section>

        <transition name="slide-fade">
          <div v-if="showChatSidebar || showPeopleSidebar" class="min-h-[55vh] xl:min-h-[70vh]">
            <ChatSidebar
              :messages="chatMessages"
              :people="sidebarParticipants"
              :current-user="currentUser"
              v-model:activeTab="sidebarTab"
              @send-message="sendChatMessage"
              @close="closeSidebar"
            />
          </div>
        </transition>
      </div>
    </div>

    <div v-if="toast.show" class="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
      <p class="font-semibold">{{ toast.title }}</p>
      <p class="mt-1 text-white/70">{{ toast.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios.js'
import { getAuth, normalizeRole } from '../../utils/auth.js'
import ParticipantVideo from './ParticipantVideo.vue'
import ChatSidebar from './ChatSidebar.vue'
import ControlBar from './ControlBar.vue'
import useWebRTC from './useWebRTC.js'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref('')
const toast = ref({ show: false, title: '', message: '' })
const roomInfo = ref(null)
const stageRef = ref(null)
const showChatSidebar = ref(true)
const showPeopleSidebar = ref(false)
const sidebarTab = ref('chat')
const clipboardSupport = typeof navigator !== 'undefined' && Boolean(navigator.clipboard)

const auth = getAuth()
const currentUser = computed(() => ({
  id: auth.user?.id || null,
  name: [auth.user?.first_name, auth.user?.last_name].filter(Boolean).join(' ') || auth.user?.full_name || auth.user?.name || 'You',
  role: normalizeRole(auth.user?.role || auth.user?.user_role || 'student') || 'student',
}))

const liveClassId = computed(() => Number(route.params.id))
const roomIdLabel = computed(() => `LC-${route.params.id}`)

const selfParticipant = computed(() => ({
  socket_id: 'local',
  user_id: currentUser.value.id,
  name: currentUser.value.name,
  role: currentUser.value.role,
  camera_on: cameraEnabled.value,
  mic_on: micEnabled.value,
  screen_sharing: isScreenSharing.value,
  hand_raised: handRaised.value,
  speaking: false,
}))

const webrtc = useWebRTC({
  liveClassId,
  token: auth.token,
  currentUser: currentUser.value,
})

const {
  previewStream,
  roomParticipantCount,
  participants,
  remoteStreams,
  chatMessages,
  isConnecting,
  isScreenSharing,
  micEnabled,
  cameraEnabled,
  handRaised,
  error: roomError,
  roomInfo: roomState,
  joinRoom,
  leaveRoom,
  toggleMic,
  toggleCamera,
  toggleScreenShare,
  toggleHandRaise,
  sendChatMessage,
  refreshRoom,
} = webrtc

const showToast = (title, message) => {
  toast.value = { show: true, title, message }
  window.clearTimeout(showToast._timer)
  showToast._timer = window.setTimeout(() => {
    toast.value.show = false
  }, 3500)
}

const sidebarParticipants = computed(() => {
  return [selfParticipant.value, ...participants.value]
})

const videoGridClass = computed(() => {
  const count = remoteStreams.value.length + 1
  if (count <= 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-1 lg:grid-cols-2'
  if (count <= 4) return 'grid-cols-1 md:grid-cols-2'
  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
})

const fallbackParticipant = (socketId) => ({
  socket_id: socketId,
  name: 'Participant',
  role: 'user',
  camera_on: true,
  mic_on: true,
})

const loadRoom = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await api.get(`/api/live-classes/${liveClassId.value}/access`)
    roomInfo.value = data.live_class
    await joinRoom()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || requestError.response?.data?.error || 'You cannot access this room.'
  } finally {
    loading.value = false
  }
}

const retryJoin = async () => {
  await loadRoom()
}

const closeSidebar = () => {
  showChatSidebar.value = false
  showPeopleSidebar.value = false
}

const toggleChat = () => {
  sidebarTab.value = 'chat'
  showChatSidebar.value = !showChatSidebar.value
  showPeopleSidebar.value = false
}

const togglePeople = () => {
  sidebarTab.value = 'people'
  showPeopleSidebar.value = !showPeopleSidebar.value
  showChatSidebar.value = false
}

const copyRoomId = async () => {
  const value = roomInfo.value?.room_id || roomIdLabel.value
  try {
    if (clipboardSupport) {
      await navigator.clipboard.writeText(value)
      showToast('Room ID copied', value)
    } else {
      showToast('Room ID', value)
    }
  } catch (_error) {
    showToast('Copy failed', value)
  }
}

const goBack = () => {
  router.back()
}

const toggleFullscreen = async () => {
  const element = stageRef.value
  if (!element) return

  if (!document.fullscreenElement) {
    await element.requestFullscreen?.()
    return
  }

  await document.exitFullscreen?.()
}

const syncRoom = () => {
  roomInfo.value = roomState.value || roomInfo.value
}

watch(roomState, syncRoom)

watch(roomError, (value) => {
  if (value) {
    error.value = value
    loading.value = false
  }
})

onMounted(async () => {
  if (!auth.token) {
    router.push('/login')
    return
  }
  await loadRoom()
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(16px);
}
</style>
