<template>
  <div class="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-lg shadow-slate-950/20">
    <div class="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black"></div>

    <video
      ref="videoRef"
      class="relative z-10 h-full w-full object-cover"
      autoplay
      playsinline
      :muted="isLocal"
    ></video>

    <div v-if="showFallback" class="absolute inset-0 z-20 flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-950 to-black">
      <div class="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10 text-3xl font-bold text-white backdrop-blur-sm">
        {{ initials }}
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-3 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 text-white">
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span class="truncate text-sm font-semibold">{{ participant.name || 'Participant' }}</span>
          <span v-if="isLocal" class="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">You</span>
        </div>
        <p class="truncate text-xs text-white/70">{{ roleLabel }}</p>
      </div>

      <div class="flex items-center gap-2">
        <span v-if="participant.speaking" class="rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Speaking</span>
        <span v-if="participant.hand_raised" class="rounded-full bg-amber-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Hand up</span>
        <span v-if="participant.screen_sharing" class="rounded-full bg-blue-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Screen</span>
        <span v-if="!participant.camera_on" class="rounded-full bg-rose-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Camera off</span>
        <span v-if="!participant.mic_on" class="rounded-full bg-slate-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Muted</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  participant: {
    type: Object,
    required: true,
  },
  stream: {
    type: MediaStream,
    default: null,
  },
  isLocal: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
})

const videoRef = ref(null)

const initials = computed(() => {
  const value = String(props.participant?.name || 'P').trim()
  const parts = value.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'P'
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join('')
})

const roleLabel = computed(() => {
  const role = String(props.participant?.role || '').toLowerCase()
  if (role === 'admin') return 'Instructor'
  if (role === 'user') return 'Student'
  return role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Participant'
})

const showFallback = computed(() => {
  const stream = props.stream
  const hasVideo = Boolean(stream?.getVideoTracks?.().length)
  return !hasVideo
})

const attachStream = () => {
  if (!videoRef.value) return
  if (props.stream) {
    videoRef.value.srcObject = props.stream
    videoRef.value.muted = props.isLocal || props.muted
    videoRef.value.play().catch(() => {})
  } else {
    videoRef.value.srcObject = null
  }
}

watch(() => props.stream, attachStream, { immediate: true })

onMounted(attachStream)

onBeforeUnmount(() => {
  if (videoRef.value) {
    videoRef.value.srcObject = null
  }
})
</script>
