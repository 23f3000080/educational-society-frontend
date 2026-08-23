<template>
  <section class="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-3 py-4 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-4 md:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-4 md:space-y-6">
      <!-- Header Section -->
      <header class="overflow-hidden rounded-2xl md:rounded-3xl border border-cyan-100/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-cyan-900/50 dark:bg-gray-900/80">
        <div class="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 md:px-8 md:py-6">
          <div class="max-w-2xl">
            <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Student Tests</p>
            <h1 class="mt-1 text-2xl font-bold text-gray-900 dark:text-amber-500 font-mono sm:text-3xl md:text-4xl">Welcome To Test Zone</h1>
            <!-- <p class="mt-1.5 text-xs leading-5 text-gray-600 dark:text-gray-300 sm:text-sm md:mt-2 md:text-base">
              Attend scheduled tests securely. Some tests may require a passcode, fullscreen mode, or strict tab control depending on admin settings.
            </p> -->
          </div>

          <div class="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-4 sm:gap-3">
            <StatCard label="Available" :value="availableTests.length" tone="cyan" :icon="ClipboardDocumentListIcon" />
            <StatCard label="Upcoming" :value="upcomingTests.length" tone="amber" :icon="ClockIcon" />
            <StatCard label="Expired" :value="expiredTests.length" tone="rose" :icon="NoSymbolIcon" />
            <StatCard label="Attempted" :value="attemptedTests.length" tone="emerald" :icon="CheckCircleIcon" />
          </div>
        </div>
      </header>

      <!-- Error Message -->
      <Transition name="slide-fade">
        <p v-if="errorMessage" class="rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          {{ errorMessage }}
        </p>
      </Transition>

      <!-- Filter & Search Section -->
      <section class="rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-4 md:p-5">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <!-- Mobile Search & Actions -->
          <div class="flex items-center gap-2 lg:hidden">
            <div class="relative flex-1">
              <input
                v-model.trim="searchQuery"
                type="text"
                placeholder="Search tests..."
                class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 pl-9 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
              />
              <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="button"
              @click="mobileFiltersOpen = !mobileFiltersOpen"
              :aria-expanded="mobileFiltersOpen"
              class="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-cyan-100 bg-cyan-50/80 px-3 py-2.5 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/35 dark:text-cyan-200 dark:hover:bg-cyan-950/55"
            >
              <component :is="activeFilterIcon" class="h-4 w-4" />
              <span class="text-xs">{{ activeFilterLabel }}</span>
            </button>
            <button
              type="button"
              @click="fetchTests"
              class="inline-flex shrink-0 items-center justify-center rounded-xl bg-gray-100/80 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              title="Refresh tests"
            >
              <ArrowPathIcon class="h-4 w-4" />
            </button>
          </div>

          <!-- Desktop Search & Filters -->
          <div class="hidden flex-1 gap-2 lg:grid lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
            <div class="relative">
              <input
                v-model.trim="searchQuery"
                type="text"
                placeholder="Search tests by title, course, or description"
                class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 pl-9 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
              />
              <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              v-for="filter in filters"
              :key="filter.value"
              type="button"
              @click="activeFilter = filter.value"
              :class="[
                'flex items-center gap-1.5 rounded-xl px-2.5 py-2.5 text-xs font-semibold transition md:gap-2 md:px-3 md:text-sm',
                activeFilter === filter.value
                  ? 'bg-cyan-600 text-white shadow-md dark:bg-cyan-500'
                  : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              ]"
              :title="filter.label"
            >
              <component :is="filter.icon" class="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
              <span class="hidden xl:inline">{{ filter.label }}</span>
              <span class="ml-auto rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] font-bold text-current/80 dark:bg-white/10 md:px-2 md:text-[11px]">
                {{ filterCount(filter.value) }}
              </span>
            </button>
          </div>

          <button
            type="button"
            @click="fetchTests"
            class="hidden rounded-xl bg-gray-100/80 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 lg:inline-flex"
          >
            <span class="flex items-center gap-2">
              <ArrowPathIcon class="h-4 w-4" />
              Refresh
            </span>
          </button>
        </div>

        <!-- Mobile Filter Panel -->
        <Transition name="slide-down">
          <div v-if="mobileFiltersOpen" class="mt-3 grid grid-cols-2 gap-2 lg:hidden">
            <button
              v-for="filter in filters"
              :key="filter.value"
              type="button"
              @click="activeFilter = filter.value; mobileFiltersOpen = false"
              :class="[
                'flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold transition',
                activeFilter === filter.value
                  ? 'bg-cyan-600 text-white shadow-md dark:bg-cyan-500'
                  : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              <component :is="filter.icon" class="h-5 w-5 shrink-0" />
              <span class="min-w-0 flex-1 truncate text-left">{{ filter.label }}</span>
              <span class="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-bold text-current/80 dark:bg-white/10">
                {{ filterCount(filter.value) }}
              </span>
            </button>
          </div>
        </Transition>
      </section>

      <!-- Loading State -->
      <section v-if="loading" class="rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-10 text-center shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading tests...</p>
      </section>

      <!-- Empty State -->
      <section v-else-if="filteredTests.length === 0" class="rounded-2xl md:rounded-3xl border border-dashed border-gray-300/50 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80 sm:p-12">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50/50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300 sm:h-20 sm:w-20">
          <svg class="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">No tests available</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Once admin creates an active test for your enrolled course, it will appear here.</p>
      </section>

      <!-- Test Cards Grid -->
      <section v-else class="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="test in filteredTests"
          :key="test.id"
          class="group rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-5"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300 sm:text-xs">{{ test.course_title }}</p>
              <h2 class="mt-0.5 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">{{ test.title }}</h2>
            </div>
            <span :class="['shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs', statusBadgeClass(test.schedule_state)]">
              {{ test.schedule_state }}
            </span>
          </div>

          <p class="mt-2 line-clamp-2 text-xs leading-5 text-gray-600 dark:text-gray-300 sm:mt-3 sm:text-sm sm:leading-6">
            {{ test.description || 'No description provided.' }}
          </p>

          <div class="mt-3 grid grid-cols-2 gap-2 text-xs sm:mt-4 sm:gap-3 sm:text-sm">
            <InfoChip label="Scope" :value="test.test_scope === 'full_length' ? 'Full Length' : 'Week Wise'" />
            <InfoChip label="Duration" :value="`${test.duration_minutes || 60} min`" />
            <InfoChip label="Marks" :value="String(test.total_marks || 0)" />
            <InfoChip label="Attempts" :value="`${test.attempts_used}/${test.max_attempts}`" />
          </div>

          <div class="mt-3 rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 dark:border-gray-800/50 dark:bg-gray-950/50 sm:mt-4 sm:p-4">
            <div class="flex mb-3 flex-wrap gap-1.5 text-[10px] font-semibold sm:gap-2 sm:text-xs">
              <span v-if="test.passcode_required" class="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 sm:px-2.5 sm:py-1">Passcode</span>
              <span v-if="test.require_fullscreen" class="rounded-full bg-fuchsia-100 px-2 py-0.5 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 sm:px-2.5 sm:py-1">Fullscreen</span>
              <span v-if="test.prevent_tab_switch" class="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 sm:px-2.5 sm:py-1">Tab Lock</span>
              <span v-if="test.shuffle_questions" class="rounded-full bg-cyan-100 px-2 py-0.5 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 sm:px-2.5 sm:py-1">Shuffle</span>
              <span v-if="test.shuffle_options" class="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 sm:px-2.5 sm:py-1">Options</span>
            </div>
            <!-- <p class="mt-2 text-[10px] text-gray-500 dark:text-gray-400 sm:mt-2.5 sm:text-xs">
              {{ test.test_scope === 'full_length' ? 'Full-length test' : `Week ${test.week_number || '-'} - ${test.week_title || 'N/A'}` }}
            </p> -->
            <p class="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400 sm:mt-1 sm:text-xs">
              {{ formatDateRange(test.start_at, test.due_date) }}
            </p>
          </div>

          <div class="mt-3 flex flex-wrap items-center justify-between gap-2 sm:mt-4">
            <div class="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
              <p>Remaining: {{ test.remaining_attempts }} attempt(s)</p>
            </div>
            <div class="flex gap-1.5 sm:gap-2">
              <button
                v-if="canViewResult(test)"
                type="button"
                @click="viewResult(test.id)"
                class="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              >
                <ChartBarIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span class="hidden sm:inline">Results</span>
              </button>
              <button
                type="button"
                @click="startTest(test)"
                :disabled="!test.can_attempt"
                :class="[
                  'inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold transition sm:gap-2 sm:px-4 sm:py-2 sm:text-sm',
                  test.can_attempt
                    ? 'bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400'
                    : 'cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                ]"
              >
                <PlayIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{{ test.can_attempt ? 'Start' : 'Locked' }}</span>
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>

    <!-- Access Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="accessModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div class="w-full max-w-lg rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/95 p-5 shadow-2xl backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/95 sm:p-6">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300 sm:text-xs">Secure Access</p>
                <h3 class="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ pendingTest?.title }}</h3>
              </div>
              <button @click="closeAccessModal" class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Enter the passcode provided by your admin to open this test.</p>

            <label class="mt-4 block text-sm font-semibold text-gray-700 dark:text-gray-200 sm:mt-5">Passcode</label>
            <input
              v-model.trim="accessPasscode"
              type="password"
              placeholder="Enter passcode"
              class="mt-1.5 w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
              @keyup.enter="confirmAccess"
            />

            <Transition name="fade">
              <p v-if="accessError" class="mt-4 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                {{ accessError }}
              </p>
            </Transition>

            <div class="mt-5 flex flex-wrap justify-end gap-2 sm:mt-6">
              <button type="button" @click="closeAccessModal" class="inline-flex items-center gap-2 rounded-xl bg-gray-100/80 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button type="button" @click="confirmAccess" :disabled="accessing" class="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400">
                <LockOpenIcon class="h-4 w-4" />
                {{ accessing ? 'Checking...' : 'Begin Test' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Test Runner -->
    <StudentTestRunner
      v-if="activeAttempt"
      :test="activeAttempt.test"
      :questions="activeAttempt.questions"
      :security="activeAttempt.security"
      :passcode="activePasscode"
      @close="closeRunner"
      @submit="submitAttempt"
    />

    <!-- Submission Result Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="submissionResultOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div class="w-full max-w-lg rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/95 p-5 shadow-2xl backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/95 sm:p-6">
            <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 sm:text-xs">Submission Complete</p>
            <h3 class="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">Test submitted successfully</h3>
            <div class="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
              <InfoChip label="Score" :value="`${lastSubmission?.submission?.score ?? 0}`" />
              <InfoChip label="Max" :value="`${lastSubmission?.submission?.max_score ?? 0}`" />
              <InfoChip label="Attempt" :value="`${lastSubmission?.submission?.attempt_no ?? 1}`" />
              <InfoChip label="Status" :value="'Submitted'" />
            </div>
            <div class="mt-5 flex justify-end sm:mt-6">
              <button type="button" @click="closeSubmissionResult" class="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400">
                <CheckIcon class="h-4 w-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'
import StudentTestRunner from './StudentTestRunner.vue'
import {
  ArrowPathIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  LockOpenIcon,
  NoSymbolIcon,
  PlayIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()

const tests = ref([])
const loading = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')
const activeFilter = ref('all')
const mobileFiltersOpen = ref(false)

const accessModalOpen = ref(false)
const accessPasscode = ref('')
const accessError = ref('')
const accessing = ref(false)
const pendingTest = ref(null)

const activeAttempt = ref(null)
const activePasscode = ref('')
const submitting = ref(false)
const submissionError = ref('')
const lastSubmission = ref(null)
const submissionResultOpen = ref(false)

const filters = [
  { label: 'All', value: 'all', icon: ClipboardDocumentListIcon },
  { label: 'Open', value: 'active', icon: PlayIcon },
  { label: 'Upcoming', value: 'upcoming', icon: ClockIcon },
  { label: 'Expired', value: 'expired', icon: NoSymbolIcon },
  { label: 'Attempted', value: 'attempted', icon: CheckCircleIcon }
]

const filterCount = (filterValue) => {
  if (filterValue === 'all') return tests.value.length
  if (filterValue === 'attempted') return attemptedTests.value.length
  return filteredTests.value.filter((test) => test.schedule_state === filterValue).length
}

const fetchTests = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data } = await api.get('/api/student/tests')
    tests.value = Array.isArray(data) ? data : []
  } catch (error) {
    tests.value = []
    errorMessage.value = error.response?.data?.error || 'Could not load tests.'
  } finally {
    loading.value = false
  }
}

const statusBadgeClass = (status) => {
  const classes = {
    active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    upcoming: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    expired: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
  }
  return classes[status] || 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
}

const formatDate = (value) => {
  if (!value) return 'N/A'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

const formatDateRange = (startAt, endAt) => {
  if (!startAt && !endAt) return 'Open schedule'
  if (!startAt) return `Ends: ${formatDate(endAt)}`
  if (!endAt) return `Starts: ${formatDate(startAt)}`
  return `${formatDate(startAt)} → ${formatDate(endAt)}`
}

const availableTests = computed(() => tests.value.filter((test) => test.schedule_state === 'active'))
const upcomingTests = computed(() => tests.value.filter((test) => test.schedule_state === 'upcoming'))
const expiredTests = computed(() => tests.value.filter((test) => test.schedule_state === 'expired'))
const attemptedTests = computed(() => tests.value.filter((test) => Number(test.attempts_used || 0) > 0))
const activeFilterLabel = computed(() => filters.find((filter) => filter.value === activeFilter.value)?.label || 'All')
const activeFilterIcon = computed(() => filters.find((filter) => filter.value === activeFilter.value)?.icon || ClipboardDocumentListIcon)

const filteredTests = computed(() => {
  const search = searchQuery.value.toLowerCase().trim()

  return tests.value.filter((test) => {
    const matchesSearch = !search || 
      [test.title, test.course_title, test.description, test.course_code]
        .join(' ')
        .toLowerCase()
        .includes(search)
    
    const matchesFilter = activeFilter.value === 'all' ||
      (activeFilter.value === 'attempted' && Number(test.attempts_used || 0) > 0) ||
      test.schedule_state === activeFilter.value

    return matchesSearch && matchesFilter
  })
})

const startTest = (test) => {
  errorMessage.value = ''

  if (!test.can_attempt) {
    errorMessage.value = 'This test is currently locked or you have used all attempts.'
    return
  }

  pendingTest.value = test
  accessPasscode.value = ''
  accessError.value = ''

  if (test.passcode_required) {
    accessModalOpen.value = true
    return
  }

  confirmAccess()
}

const closeAccessModal = () => {
  accessModalOpen.value = false
  pendingTest.value = null
  accessPasscode.value = ''
  accessError.value = ''
}

const confirmAccess = async () => {
  if (!pendingTest.value) return

  accessing.value = true
  accessError.value = ''

  try {
    const { data } = await api.post(`/api/student/tests/${pendingTest.value.id}/access`, {
      passcode: accessPasscode.value
    })

    activeAttempt.value = {
      test: data.test,
      questions: data.questions,
      security: data.security
    }
    activePasscode.value = accessPasscode.value
    closeAccessModal()
  } catch (error) {
    accessError.value = error.response?.data?.error || 'Could not open this test.'
  } finally {
    accessing.value = false
  }
}

const closeRunner = () => {
  activeAttempt.value = null
  activePasscode.value = ''
}

const clearPersistedTestTimer = (testId) => {
  if (!testId) return
  const prefix = `student_test_started_at_${testId}_`
  const keysToRemove = []

  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i)
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => window.localStorage.removeItem(key))
}

const submitAttempt = async (payload) => {
  if (!activeAttempt.value || submitting.value) return

  submitting.value = true
  submissionError.value = ''

  try {
    const { data } = await api.post(`/api/student/tests/${activeAttempt.value.test.id}/submit`, {
      answers: payload.answers,
      passcode: payload.passcode || activePasscode.value
    })

    lastSubmission.value = data
    clearPersistedTestTimer(activeAttempt.value.test.id)
    submissionResultOpen.value = true
    closeRunner()
    await fetchTests()
  } catch (error) {
    submissionError.value = error.response?.data?.error || 'Could not submit the test.'
    errorMessage.value = submissionError.value
  } finally {
    submitting.value = false
  }
}

const closeSubmissionResult = () => {
  submissionResultOpen.value = false
  lastSubmission.value = null
}

const canViewResult = (test) => test.schedule_state === 'expired' && Number(test.attempts_used || 0) > 0

const viewResult = (testId) => {
  router.push(`/student/tests/${testId}/results`)
}

onMounted(() => {
  fetchTests()
})

// StatCard Component
const StatCard = {
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: 0 },
    tone: { type: String, default: 'cyan' },
    icon: { type: [Object, Function], default: null }
  },
  template: `
    <div class="rounded-xl border border-gray-200/50 bg-gray-50/50 px-3 py-2.5 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-950/50 sm:rounded-2xl sm:px-4 sm:py-3">
      <div class="flex items-center justify-between gap-2">
        <div :class="['flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-sm sm:h-10 sm:w-10', toneChipClass]">
          <component v-if="icon" :is="icon" class="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <p class="sr-only">{{ label }}</p>
      </div>
      <p :class="['mt-2 text-xl font-bold leading-none sm:mt-3 sm:text-2xl', toneClass]">{{ value }}</p>
    </div>
  `,
  computed: {
    toneChipClass() {
      return {
        cyan: 'bg-cyan-600 dark:bg-cyan-500',
        amber: 'bg-amber-600 dark:bg-amber-500',
        rose: 'bg-rose-600 dark:bg-rose-500',
        emerald: 'bg-emerald-600 dark:bg-emerald-500'
      }[this.tone] || 'bg-cyan-600 dark:bg-cyan-500'
    },
    toneClass() {
      return {
        cyan: 'text-cyan-700 dark:text-cyan-300',
        amber: 'text-amber-700 dark:text-amber-300',
        rose: 'text-rose-700 dark:text-rose-300',
        emerald: 'text-emerald-700 dark:text-emerald-300'
      }[this.tone] || 'text-cyan-700 dark:text-cyan-300'
    }
  }
}

// InfoChip Component
const InfoChip = {
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: 'N/A' }
  },
  template: `
    <div class="rounded-xl border border-gray-200/50 bg-white/50 px-2.5 py-2 dark:border-gray-800/50 dark:bg-gray-900/70 sm:px-3 sm:py-2">
      <p class="text-[9px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 sm:text-[11px]">{{ label }}</p>
      <p class="mt-0.5 text-xs font-semibold text-gray-900 dark:text-white sm:mt-1 sm:text-sm">{{ value }}</p>
    </div>
  `
}
</script>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 250ms ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 250ms ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 250ms ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>