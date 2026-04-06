<template>
  <div class="fixed bottom-5 right-5 z-9999">
    <transition name="chat-fade">
      <div
        v-if="open"
        class="mb-3 w-[min(92vw,390px)] overflow-hidden rounded-2xl border border-cyan-200 bg-white shadow-2xl dark:border-cyan-900 dark:bg-gray-900"
      >
        <div class="flex items-center justify-between bg-linear-to-r from-cyan-600 to-blue-600 px-4 py-3 text-white">
          <div>
            <p class="text-sm font-semibold">{{ assistantName }}</p>
            <p class="text-[11px] text-cyan-100">Powered by Educational Society</p>
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

    <button
      type="button"
      @click="toggleWidget"
      class="group relative flex h-15 w-15 items-center justify-center rounded-full border-2 border-white/80 bg-linear-to-br from-teal-500 via-cyan-600 to-blue-700 text-white shadow-[0_12px_32px_rgba(8,145,178,0.45)] transition hover:scale-105 hover:from-teal-400 hover:via-cyan-500 hover:to-blue-600 dark:border-cyan-100/20"
      aria-label="Open chatbot"
    >
      <span class="pointer-events-none absolute -inset-1 rounded-full border border-cyan-200/40 opacity-0 transition group-hover:opacity-100"></span>
      <svg class="h-8 w-8 drop-shadow-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L3 8.5L12 13L21 8.5L12 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 11.5V15.1C7 16.2 9.24 18 12 18C14.76 18 17 16.2 17 15.1V11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 10V14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="21" cy="15.8" r="1.2" fill="currentColor"/>
      </svg>
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
</style>
