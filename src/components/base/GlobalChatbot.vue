<template>
  <div class="fixed bottom-5 right-5 z-9999">
    <transition name="chat-fade">
      <div
        v-if="open"
        class="mb-3 w-[min(92vw,390px)] overflow-hidden rounded-2xl border border-cyan-200 bg-white shadow-2xl dark:border-cyan-900 dark:bg-gray-900"
      >
        <div class="flex items-center justify-between bg-linear-to-r from-cyan-600 to-blue-600 px-4 py-3 text-white">
          <div class="flex items-center gap-2">
            <!-- Animated Bot Icon in Header -->
            <div class="relative">
              <div class="absolute inset-0 animate-ping rounded-full bg-cyan-300 opacity-20"></div>
              <svg class="relative h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
                <path d="M8 15H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold">{{ assistantName }}</p>
              <p class="text-[11px] text-cyan-100">Powered by Educational Society</p>
            </div>
          </div>
          <button
            type="button"
            @click="open = false"
            class="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold transition hover:bg-white/20"
          >
            Close
          </button>
        </div>

        <div ref="messageContainer" class="max-h-[54vh] min-h-70 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3 dark:bg-gray-950/40">
          <article
            v-for="(item, index) in messages"
            :key="`${index}-${item.role}`"
            :class="[
              'max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-6',
              item.role === 'user'
                ? 'ml-auto bg-cyan-600 text-white'
                : 'mr-auto border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
            ]"
          >
            <p>{{ item.content }}</p>
            <div v-if="item.role === 'assistant' && item.sources?.length" class="mt-2 border-t border-gray-200/70 pt-2 text-[11px] text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Sources: {{ item.sources.map((s) => s.title).join(' | ') }}
            </div>
          </article>

          <p v-if="loading" class="mr-auto max-w-[90%] rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            Thinking...
          </p>
        </div>

        <div class="border-t border-gray-200 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-900">
          <div v-if="suggestions.length && messages.length <= 1" class="mb-2 flex flex-wrap gap-2">
            <button
              v-for="item in suggestions"
              :key="item"
              type="button"
              @click="sendMessage(item)"
              class="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
            >
              {{ item }}
            </button>
          </div>

          <form class="flex items-end gap-2" @submit.prevent="submitInput">
            <textarea
              v-model="inputMessage"
              rows="1"
              placeholder="Ask about admissions, courses and more..."
              class="max-h-28 min-h-10.5 w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
            ></textarea>
            <button
              type="submit"
              :disabled="loading"
              class="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Modern Animated Bot Button -->
    <button
      type="button"
      @click="toggleWidget"
      class="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-xl dark:from-cyan-500 dark:via-teal-600 dark:to-blue-700"
      aria-label="Open chatbot"
    >
      <!-- Ripple Effect -->
      <span class="absolute inset-0 rounded-full bg-cyan-400 opacity-30 animate-ripple"></span>
      <span class="absolute inset-0 rounded-full bg-cyan-400 opacity-20 animate-ripple-delay"></span>
      
      <!-- Pulse Ring -->
      <span class="absolute inset-0 rounded-full border-2 border-cyan-300 opacity-40 animate-pulse-ring"></span>
      
      <!-- Bot Icon with Animation -->
      <div class="relative transform transition-transform duration-500 group-hover:rotate-12">
        <svg 
          class="h-8 w-8 drop-shadow-lg animate-float" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Robot Head -->
          <rect x="5" y="5" width="14" height="14" rx="3" stroke="white" stroke-width="1.8" fill="white/20"/>
          
          <!-- Antenna -->
          <path d="M12 5L12 2" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="12" cy="1.5" r="1.5" fill="white"/>
          
          <!-- Eyes -->
          <circle cx="9" cy="10" r="1.5" fill="white" class="animate-blink"/>
          <circle cx="15" cy="10" r="1.5" fill="white" class="animate-blink-delay"/>
          
          <!-- Smile -->
          <path d="M8 15C9 16.5 11 17 12 17C13 17 15 16.5 16 15" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          
          <!-- Face Details -->
          <circle cx="12" cy="13" r="0.5" fill="white"/>
        </svg>
      </div>
      
      <!-- Notification Badge -->
      <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg animate-bounce">
        💬
      </span>
      
      <!-- Hover Glow -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl"></div>
    </button>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import api from '../../services/axios'

const STORAGE_KEY = 'global_chatbot_messages_v1'

const open = ref(false)
const loading = ref(false)
const inputMessage = ref('')
const messages = ref([])
const suggestions = ref([])
const assistantName = ref('EduAssist')
const messageContainer = ref(null)

const persistMessages = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value.slice(-30)))
}

const restoreMessages = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      messages.value = parsed
    }
  } catch {
    // Ignore storage parse errors.
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

const loadBootstrap = async () => {
  try {
    const { data } = await api.get('/api/chatbot/bootstrap')
    assistantName.value = data?.assistant_name || 'EduAssist'
    suggestions.value = Array.isArray(data?.suggestions) ? data.suggestions : []

    if (!messages.value.length) {
      messages.value.push({
        role: 'assistant',
        content: 'Hi, I can help with admissions, enrolled courses, tests, fees, and support queries. How can I help you today?'
      })
    }
  } catch {
    if (!messages.value.length) {
      messages.value.push({
        role: 'assistant',
        content: 'Hi, I am available to help with course and support queries. Please ask your question.'
      })
    }
  }
}

const sendMessage = async (text) => {
  const messageText = (text || '').trim()
  if (!messageText || loading.value) return

  messages.value.push({ role: 'user', content: messageText })
  inputMessage.value = ''
  loading.value = true
  await scrollToBottom()

  try {
    const history = messages.value
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .map((item) => ({ role: item.role, content: item.content }))

    const { data } = await api.post('/api/chatbot/message', {
      message: messageText,
      history
    })

    messages.value.push({
      role: 'assistant',
      content: data?.answer || 'I could not generate a response right now.',
      sources: Array.isArray(data?.sources) ? data.sources : []
    })
  } catch {
    messages.value.push({
      role: 'assistant',
      content: 'I am unable to answer right now. Please try again in a moment or use Help query form.'
    })
  } finally {
    loading.value = false
    persistMessages()
    await scrollToBottom()
  }
}

const submitInput = () => {
  sendMessage(inputMessage.value)
}

const toggleWidget = async () => {
  open.value = !open.value
  if (open.value) {
    await loadBootstrap()
    await scrollToBottom()
  }
}

watch(messages, () => {
  persistMessages()
}, { deep: true })

onMounted(() => {
  restoreMessages()
})
</script>

<style scoped>
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: all 0.18s ease;
}

.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* Modern Bot Button Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

@keyframes blink {
  0%, 90%, 100% {
    opacity: 1;
    transform: scaleY(1);
  }
  95% {
    opacity: 0.3;
    transform: scaleY(0.1);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-ripple {
  animation: ripple 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.animate-ripple-delay {
  animation: ripple 2s cubic-bezier(0.4, 0, 0.2, 1) infinite 1s;
}

.animate-pulse-ring {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}

.animate-blink {
  animation: blink 3s ease-in-out infinite;
}

.animate-blink-delay {
  animation: blink 3s ease-in-out infinite 0.5s;
}

/* Hover Effects */
.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

.group:hover .group-hover\:shadow-xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-500 {
  transition-duration: 500ms;
}

/* Custom styling for the button */
button:focus-visible {
  outline: 2px solid #06b6d4;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fixed.bottom-5.right-5 {
    bottom: 1rem;
    right: 1rem;
  }
  
  .group.h-16.w-16 {
    height: 3.5rem;
    width: 3.5rem;
  }
  
  svg.h-8.w-8 {
    height: 1.75rem;
    width: 1.75rem;
  }
}
</style>