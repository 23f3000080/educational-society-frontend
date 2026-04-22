<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6 lg:space-y-8">
      <section class="overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-sm dark:border-cyan-900 dark:bg-gray-900/80">
        <div class="grid gap-0 lg:grid-cols-[1.25fr_0.95fr]">
          <div class="relative p-6 sm:p-8 lg:p-10">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)]"></div>
            <div class="relative space-y-6">
              <div class="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300">
                Student Help Center
              </div>

              <div class="max-w-2xl space-y-4">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                  Raise a query and track its status from the same page.
                </h1>
                <p class="text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
                  Submit account, course, assignment, or payment questions, then check previously raised queries using your email address.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/60">
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
                  <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ stat.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-cyan-100 bg-linear-to-br from-cyan-50 via-white to-blue-50 p-6 dark:border-cyan-900 dark:from-cyan-950/40 dark:via-gray-950 dark:to-blue-950/40 lg:border-l lg:border-t-0 lg:p-8">
            <div class="space-y-4 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Need quick help?</p>
                <h2 class="mt-2 text-xl font-bold text-gray-900 dark:text-white">Contact options</h2>
              </div>

              <div class="space-y-3">
                <a href="mailto:clearupsol015@gmail.com" class="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/40">
                  <span>Email support</span>
                  <span class="text-xs text-gray-400">24-48 hrs</span>
                </a>
                <a href="tel:+919142125921" class="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/40">
                  <span>Call helpline</span>
                  <span class="text-xs text-gray-400">9 AM - 6 PM</span>
                </a>
              </div>

              <div class="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-900/70 dark:text-gray-300">
                We respond faster when you include your student ID, email, and a clear description of the issue.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="space-y-6">
          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Raise a query</p>
                <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Submit your support request</h2>
              </div>
              <span class="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300">
                Secure form
              </span>
            </div>

            <form class="mt-5 space-y-4" @submit.prevent="submitQuery">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Your Name</label>
                  <input
                    v-model="queryForm.name"
                    type="text"
                    placeholder="Enter your full name"
                    class="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-cyan-500 dark:focus:ring-cyan-900"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Email Address</label>
                  <input
                    v-model="queryForm.email"
                    type="email"
                    placeholder="name@example.com"
                    class="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-cyan-500 dark:focus:ring-cyan-900"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Issue Type</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="topic in topics"
                    :key="topic.value"
                    type="button"
                    @click="selectedTopic = topic.value"
                    class="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
                    :class="selectedTopic === topic.value ? 'border-cyan-500 bg-cyan-600 text-white' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-cyan-300 hover:bg-cyan-50 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/40'"
                  >
                    {{ topic.label }}
                  </button>
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Message</label>
                <textarea
                  v-model="queryForm.message"
                  rows="6"
                  placeholder="Explain your issue in detail. Include course name, assignment title, or payment reference if needed."
                  class="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-cyan-500 dark:focus:ring-cyan-900"
                ></textarea>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400"
                >
                  {{ submitting ? 'Sending...' : 'Submit Query' }}
                </button>
                <button
                  type="button"
                  @click="resetForm"
                  class="rounded-2xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Clear
                </button>
              </div>

              <p v-if="submitMessage" class="rounded-2xl border px-4 py-3 text-sm font-semibold" :class="submitMessageType === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'">
                {{ submitMessage }}
              </p>
            </form>
          </div>

          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Query status</p>
                <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Check raised queries by email</h2>
              </div>
              <button
                type="button"
                @click="queryStatusEmail = queryForm.email"
                class="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
              >
                Use my email
              </button>
            </div>

            <div class="mt-5 space-y-4">
              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Email Address</label>
                <div class="flex flex-col gap-3 sm:flex-row">
                  <input
                    v-model="queryStatusEmail"
                    type="email"
                    placeholder="Enter the email used for the query"
                    class="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-cyan-500 dark:focus:ring-cyan-900"
                  />
                  <button
                    type="button"
                    @click="checkQueryStatus"
                    :disabled="loadingStatus"
                    class="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  >
                    {{ loadingStatus ? 'Checking...' : 'Check Status' }}
                  </button>
                </div>
              </div>

              <p v-if="statusMessage" class="rounded-2xl border px-4 py-3 text-sm font-semibold" :class="statusMessageType === 'error' ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300' : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'">
                {{ statusMessage }}
              </p>

              <div v-if="queryResults.length" class="space-y-3">
                <div v-if="hasMultipleQueries" class="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-950/60">
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Query {{ currentQueryIndex + 1 }} of {{ totalQueries }}
                  </p>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      @click="goToPreviousQuery"
                      class="rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-cyan-700 dark:hover:bg-cyan-950/40"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      @click="goToNextQuery"
                      class="rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-cyan-700 dark:hover:bg-cyan-950/40"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <article v-if="currentQuery" :key="currentQuery.id" class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ currentQuery.name }}</p>
                      <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ currentQuery.email }}</p>
                    </div>
                    <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="statusBadgeClass(currentQuery.status)">
                      {{ currentQuery.status || 'open' }}
                    </span>
                  </div>

                  <div class="mt-3 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Issue Type</p>
                      <p class="mt-1">{{ currentQuery.issue_type || 'General' }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Query</p>
                      <p class="mt-1">{{ currentQuery.query }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Response</p>
                      <p class="mt-1">{{ currentQuery.response || 'No response yet' }}</p>
                    </div>
                    <div class="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Raised on</p>
                        <p class="mt-1">{{ formatTimestamp(currentQuery.raised_at || currentQuery.created_at) }}</p>
                      </div>
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Responded on</p>
                        <p class="mt-1">{{ currentQuery.response_at || currentQuery.response_date ? formatTimestamp(currentQuery.response_at || currentQuery.response_date) : 'Pending' }}</p>
                      </div>
                    </div>
                  </div>
                </article>

                <div v-if="hasMultipleQueries" class="flex flex-wrap items-center gap-2">
                  <button
                    v-for="(item, index) in queryResults"
                    :key="item.id"
                    type="button"
                    @click="goToQuery(index)"
                    class="h-2.5 w-2.5 rounded-full transition"
                    :class="index === currentQueryIndex ? 'bg-cyan-600 dark:bg-cyan-400' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'"
                    :aria-label="`Go to query ${index + 1}`"
                  ></button>
                </div>
              </div>

              <p v-else class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">
                Search by email to see all queries you have raised.
              </p>
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Support areas</p>
            <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">What we can help with</h2>

            <div class="mt-5 space-y-3">
              <div v-for="item in supportCards" :key="item.title" class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.title }}</p>
                <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-3xl border border-cyan-200 bg-cyan-600 p-5 text-white shadow-sm dark:border-cyan-500 dark:bg-cyan-500 sm:p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">Before you ask</p>
            <h2 class="mt-1 text-xl font-bold">Helpful tips</h2>

            <ul class="mt-4 space-y-3 text-sm leading-6 text-cyan-50/95">
              <li>Use the same email address that you entered in the query form.</li>
              <li>Include screenshots or payment references where relevant.</li>
              <li>Search FAQs first if you need a quick answer.
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Popular questions</p>
            <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Frequently asked questions</h2>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ filteredFaqs.length }} results</p>
        </div>

        <div class="mt-5 space-y-3">
          <article
            v-for="faq in filteredFaqs"
            :key="faq.question"
            class="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80 transition hover:border-cyan-300 dark:border-gray-800 dark:bg-gray-950/60"
          >
            <button
              type="button"
              @click="toggleFaq(faq.question)"
              class="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
            >
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ faq.question }}</p>
                <p class="mt-1 text-xs font-medium uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{{ faq.category }}</p>
              </div>
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-lg font-semibold text-cyan-700 shadow-sm dark:bg-gray-900 dark:text-cyan-300">
                {{ openFaq === faq.question ? '−' : '+' }}
              </span>
            </button>
            <div v-if="openFaq === faq.question" class="border-t border-gray-200 bg-white px-4 py-4 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-300 sm:px-5">
              {{ faq.answer }}
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '../../../services/axios'
import { getAuth } from '../../../utils/auth'

const queryForm = ref({
  name: '',
  email: '',
  issue_type: 'General',
  message: ''
})

const topics = [
  { label: 'General', value: 'other' },
  { label: 'Profile', value: 'technical' },
  { label: 'Login', value: 'technical' },
  { label: 'Assignments', value: 'course' },
  { label: 'Courses', value: 'course' },
  { label: 'Payments', value: 'fees' }
]

const selectedTopic = ref('other')

const submitting = ref(false)
const submitMessage = ref('')
const submitMessageType = ref('success')

const queryStatusEmail = ref('')
const queryResults = ref([])
const currentQueryIndex = ref(0)
const statusMessage = ref('')
const statusMessageType = ref('error')
const loadingStatus = ref(false)

const openFaq = ref('How do I update my profile?')
const faqSearch = ref('')

const stats = [
  { label: 'Average reply', value: '24 hrs', description: 'Most support requests are answered within one business day.' },
  { label: 'Support hours', value: '9-6', description: 'Live help is available on weekdays during office hours.' },
  { label: 'Help topics', value: '6+', description: 'Submit and track questions for login, courses, payments, and more.' }
]

const faqs = [
  {
    question: 'How do I update my profile?',
    category: 'Profile',
    answer: 'Open My Profile from the student menu, click Edit Profile, update your details, and save the changes.'
  },
  {
    question: 'I cannot log in. What should I do?',
    category: 'Login',
    answer: 'Check whether your email and password are correct, then try resetting your password if needed.'
  },
  {
    question: 'Why is my assignment not submitting?',
    category: 'Assignments',
    answer: 'Make sure all required answers are selected and the due date has not passed for that assignment.'
  },
  {
    question: 'How can I see my enrolled courses?',
    category: 'Courses',
    answer: 'Go to the Courses page from the student navigation to open your enrolled course cards.'
  },
  {
    question: 'Where can I check payment related support?',
    category: 'Payments',
    answer: 'Raise a query with your transaction details or receipt and our team will review it.'
  },
  {
    question: 'How do I change my password?',
    category: 'Profile',
    answer: 'Open the profile page, scroll to Change Password, and enter your current password before setting a new one.'
  }
]

const supportCards = [
  { title: 'Account help', description: 'Profile updates, password resets, and contact details.' },
  { title: 'Learning help', description: 'Course access, lecture playback, notes, and assignment issues.' },
  { title: 'Billing help', description: 'Payment status, receipts, and enrollment confirmation.' }
]

const filteredFaqs = computed(() => {
  const search = faqSearch.value.trim().toLowerCase()
  if (!search) return faqs

  return faqs.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(search) ||
      faq.answer.toLowerCase().includes(search) ||
      faq.category.toLowerCase().includes(search)
    )
  })
})

const totalQueries = computed(() => queryResults.value.length)

const hasMultipleQueries = computed(() => totalQueries.value > 1)

const currentQuery = computed(() => {
  if (!queryResults.value.length) return null
  return queryResults.value[currentQueryIndex.value] || queryResults.value[0]
})

const formatTimestamp = (value) => {
  if (!value) return 'N/A'

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return parsed.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

const resetForm = () => {
  const { user } = getAuth()
  queryForm.value = {
    name: user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : '',
    email: user?.email || '',
    issue_type: 'other',
    message: ''
  }
  selectedTopic.value = 'other'
  submitMessage.value = ''
}

const submitQuery = async () => {
  submitMessage.value = ''

  if (!queryForm.value.name || !queryForm.value.email || !queryForm.value.message) {
    submitMessageType.value = 'error'
    submitMessage.value = 'Please fill in your name, email, and message before submitting.'
    return
  }

  submitting.value = true

  try {
    const response = await api.post('/api/contactus', {
      ...queryForm.value,
      issue_type: selectedTopic.value
    })
    submitMessageType.value = 'success'
    submitMessage.value = response.data.message || 'Your query has been submitted successfully.'
    queryForm.value.message = ''
  } catch (error) {
    submitMessageType.value = 'error'
    submitMessage.value = error.response?.data?.error || 'Could not submit your query. Please try again.'
  } finally {
    submitting.value = false
  }
}

const checkQueryStatus = async () => {
  statusMessage.value = ''
  queryResults.value = []
  currentQueryIndex.value = 0

  if (!queryStatusEmail.value) {
    statusMessageType.value = 'error'
    statusMessage.value = 'Please enter the email address used for your query.'
    return
  }

  loadingStatus.value = true

  try {
    const response = await api.post('/api/query-status', {
      email: queryStatusEmail.value
    })

    if (response.data.queries?.length) {
      queryResults.value = response.data.queries
      currentQueryIndex.value = 0
      statusMessageType.value = 'success'
      statusMessage.value = `Found ${response.data.queries.length} quer${response.data.queries.length === 1 ? 'y' : 'ies'} for this email.`
    } else {
      statusMessageType.value = 'error'
      statusMessage.value = 'No queries found for this email address.'
    }
  } catch (error) {
    statusMessageType.value = 'error'
    statusMessage.value = error.response?.data?.error || 'Could not fetch query status. Please try again.'
  } finally {
    loadingStatus.value = false
  }
}

const goToPreviousQuery = () => {
  if (!queryResults.value.length) return
  const lastIndex = queryResults.value.length - 1
  currentQueryIndex.value = currentQueryIndex.value === 0 ? lastIndex : currentQueryIndex.value - 1
}

const goToNextQuery = () => {
  if (!queryResults.value.length) return
  const lastIndex = queryResults.value.length - 1
  currentQueryIndex.value = currentQueryIndex.value === lastIndex ? 0 : currentQueryIndex.value + 1
}

const goToQuery = (index) => {
  if (index < 0 || index >= queryResults.value.length) return
  currentQueryIndex.value = index
}

const statusBadgeClass = (status) => {
  const normalized = (status || 'open').toLowerCase()

  if (normalized.includes('resolved') || normalized.includes('closed')) {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
  }

  if (normalized.includes('progress') || normalized.includes('review')) {
    return 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
  }

  return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300'
}

const toggleFaq = (question) => {
  openFaq.value = openFaq.value === question ? '' : question
}

onMounted(() => {
  const { user } = getAuth()
  queryForm.value.name = user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : ''
  queryForm.value.email = user?.email || ''
  queryForm.value.issue_type = 'other'
  queryStatusEmail.value = user?.email || ''
})
</script>
