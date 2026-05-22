<template>
  <div class="flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
    <button
      type="button"
      class="control-button"
      :class="micEnabled ? 'control-button--active' : 'control-button--danger'"
      @click="$emit('toggle-mic')"
    >
      <MicrophoneIcon class="h-5 w-5" />
      <span>Mic</span>
    </button>

    <button
      type="button"
      class="control-button"
      :class="cameraEnabled ? 'control-button--active' : 'control-button--danger'"
      @click="$emit('toggle-camera')"
    >
      <VideoCameraIcon class="h-5 w-5" />
      <span>Camera</span>
    </button>

    <button
      type="button"
      class="control-button"
      :class="screenSharing ? 'control-button--active' : 'control-button--neutral'"
      @click="$emit('toggle-screen-share')"
    >
      <PresentationChartBarIcon class="h-5 w-5" />
      <span>{{ screenSharing ? 'Stop Share' : 'Share Screen' }}</span>
    </button>

    <button
      type="button"
      class="control-button"
      :class="handRaised ? 'control-button--warn' : 'control-button--neutral'"
      @click="$emit('toggle-hand')"
    >
      <HandRaisedIcon class="h-5 w-5" />
      <span>{{ handRaised ? 'Lower Hand' : 'Raise Hand' }}</span>
    </button>

    <button
      type="button"
      class="control-button"
      :class="showChat ? 'control-button--active' : 'control-button--neutral'"
      @click="$emit('toggle-chat')"
    >
      <ChatBubbleLeftRightIcon class="h-5 w-5" />
      <span>Chat</span>
    </button>

    <button
      type="button"
      class="control-button"
      :class="showParticipants ? 'control-button--active' : 'control-button--neutral'"
      @click="$emit('toggle-people')"
    >
      <UsersIcon class="h-5 w-5" />
      <span>People</span>
    </button>

    <button
      type="button"
      class="control-button control-button--neutral"
      @click="$emit('toggle-fullscreen')"
    >
      <ArrowsPointingOutIcon class="h-5 w-5" />
      <span>Fullscreen</span>
    </button>

    <button
      type="button"
      class="control-button control-button--leave"
      @click="$emit('leave-room')"
    >
      <ArrowRightOnRectangleIcon class="h-5 w-5" />
      <span>Leave</span>
    </button>
  </div>
</template>

<script setup>
import {
  ArrowsPointingOutIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  MicrophoneIcon,
  PresentationChartBarIcon,
  UsersIcon,
  VideoCameraIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  micEnabled: { type: Boolean, default: true },
  cameraEnabled: { type: Boolean, default: true },
  screenSharing: { type: Boolean, default: false },
  handRaised: { type: Boolean, default: false },
  showChat: { type: Boolean, default: false },
  showParticipants: { type: Boolean, default: false },
})

defineEmits([
  'toggle-mic',
  'toggle-camera',
  'toggle-screen-share',
  'toggle-hand',
  'toggle-chat',
  'toggle-people',
  'toggle-fullscreen',
  'leave-room',
])
</script>

<style scoped>
.control-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid rgb(226 232 240);
  background: rgb(248 250 252);
  color: rgb(51 65 85);
}

.control-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
}

:global(.dark) .control-button {
  border-color: rgb(30 41 59);
  background: rgb(15 23 42);
  color: rgb(226 232 240);
}

:global(.dark) .control-button:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

.control-button--active {
  border-color: rgb(191 219 254);
  background: rgb(239 246 255);
  color: rgb(67 56 202);
}

:global(.dark) .control-button--active {
  border-color: rgb(67 56 202 / 0.6);
  background: rgb(30 27 75 / 0.55);
  color: rgb(199 210 254);
}

.control-button--neutral {
  border-color: rgb(226 232 240);
  background: rgb(248 250 252);
  color: rgb(51 65 85);
}

:global(.dark) .control-button--neutral {
  border-color: rgb(30 41 59);
  background: rgb(15 23 42);
  color: rgb(226 232 240);
}

.control-button--warn {
  border-color: rgb(254 215 170);
  background: rgb(255 247 237);
  color: rgb(180 83 9);
}

:global(.dark) .control-button--warn {
  border-color: rgb(146 64 14 / 0.6);
  background: rgb(69 26 3 / 0.45);
  color: rgb(253 230 138);
}

.control-button--danger {
  border-color: rgb(254 202 202);
  background: rgb(255 241 242);
  color: rgb(190 18 60);
}

:global(.dark) .control-button--danger {
  border-color: rgb(136 19 55 / 0.6);
  background: rgb(69 10 26 / 0.45);
  color: rgb(254 202 202);
}

.control-button--leave {
  border-color: rgb(251 113 133);
  background: rgb(225 29 72);
  color: rgb(255 255 255);
}

.control-button--leave:hover {
  background: rgb(190 18 60);
}
</style>
