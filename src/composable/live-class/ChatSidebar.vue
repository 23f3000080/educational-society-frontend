<template>
  <aside class="flex h-full flex-col rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Live Room</p>
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">{{ activeTab === 'chat' ? 'Chat' : 'People' }}</h3>
      </div>
      <button
        type="button"
        class="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
        @click="$emit('close')"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>

    <div class="flex gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
      <button
        class="sidebar-tab"
        :class="activeTab === 'chat' ? 'sidebar-tab--active' : ''"
        @click="$emit('update:activeTab', 'chat')"
      >
        <ChatBubbleLeftRightIcon class="h-4 w-4" />
        <span>Chat</span>
      </button>
      <button
        class="sidebar-tab"
        :class="activeTab === 'people' ? 'sidebar-tab--active' : ''"
        @click="$emit('update:activeTab', 'people')"
      >
        <UsersIcon class="h-4 w-4" />
        <span>People</span>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto px-4 py-4">
      <div v-if="activeTab === 'chat'" class="space-y-4">
        <article
          v-for="message in messages"
          :key="message.id"
          class="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                {{ message.name }}
                <span v-if="message.user_id === currentUser?.id" class="ml-2 rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-indigo-600 dark:text-indigo-300">You</span>
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatTimestamp(message.timestamp) }}</p>
            </div>
            <span class="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {{ roleLabel(message.role) }}
            </span>
          </div>
          <p class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200">{{ message.message }}</p>
        </article>
      </div>

      <div v-else class="space-y-3">
        <article
          v-for="participant in people"
          :key="participant.socket_id || participant.user_id"
          class="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                {{ participant.name }}
                <span v-if="participant.user_id === currentUser?.id" class="ml-2 rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-indigo-600 dark:text-indigo-300">You</span>
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ roleLabel(participant.role) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="participant.speaking" class="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Speaking</span>
              <span v-if="participant.hand_raised" class="rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Raised</span>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
            <span :class="indicatorClass(participant.mic_on)" class="rounded-full px-2 py-1">Mic</span>
            <span :class="indicatorClass(participant.camera_on)" class="rounded-full px-2 py-1">Camera</span>
            <span :class="indicatorClass(participant.screen_sharing)" class="rounded-full px-2 py-1">Screen</span>
          </div>
        </article>
      </div>
    </div>

    <div v-if="activeTab === 'chat'" class="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
      <form class="space-y-3" @submit.prevent="submitMessage">
        <textarea
          v-model="draft"
          rows="3"
          class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-950/40"
          placeholder="Send a message to everyone"
        ></textarea>
        <button type="submit" class="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Send Message
        </button>
      </form>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ChatBubbleLeftRightIcon, UsersIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  messages: { type: Array, default: () => [] },
  people: { type: Array, default: () => [] },
  currentUser: { type: Object, default: null },
  activeTab: { type: String, default: 'chat' },
})

const emit = defineEmits(['send-message', 'update:activeTab', 'close'])
const draft = ref('')

const submitMessage = () => {
  const value = draft.value.trim()
  if (!value) return
  emit('send-message', value)
  draft.value = ''
}

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Just now'
  const value = new Date(timestamp)
  if (Number.isNaN(value.getTime())) return 'Just now'
  return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const roleLabel = (role) => {
  const value = String(role || '').toLowerCase()
  if (value === 'admin') return 'Instructor'
  if (value === 'user') return 'Student'
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Guest'
}

const indicatorClass = (value) => {
  return value
    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
    : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
}
</script>

<style scoped>
.sidebar-tab {
  display: inline-flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 1rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  background: rgb(241 245 249);
  color: rgb(71 85 105);
}

.sidebar-tab:hover {
  background: rgb(226 232 240);
}

:global(.dark) .sidebar-tab {
  background: rgb(15 23 42);
  color: rgb(203 213 225);
}

:global(.dark) .sidebar-tab:hover {
  background: rgb(30 41 59);
}

.sidebar-tab--active {
  background: rgb(79 70 229);
  color: rgb(255 255 255);
}

.sidebar-tab--active:hover {
  background: rgb(67 56 202);
}

:global(.dark) .sidebar-tab--active {
  background: rgb(79 70 229);
  color: rgb(255 255 255);
}

:global(.dark) .sidebar-tab--active:hover {
  background: rgb(99 102 241);
}
</style>
