<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-gray-900/80 sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">User Insights</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {{ user.full_name || 'Student Insights' }}
            </h1>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Deep view of study track, course progress, and assignment completion for this user.
            </p>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              @click="toggleUserStatus"
              :disabled="statusUpdating || !user.id"
              :class="[
                'rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60',
                user.active
                  ? 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400'
                  : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400'
              ]"
            >
              {{ statusUpdating ? 'Updating...' : (user.active ? 'Make Inactive' : 'Activate User') }}
            </button>
            <button
              type="button"
              @click="goBack"
              class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              type="button"
              @click="fetchInsights"
              class="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      <p v-if="errorMessage" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
        {{ errorMessage }}
      </p>
      <p v-if="statusMessage" class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
        {{ statusMessage }}
      </p>

      <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Verification Controls</p>
        <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Email and Mobile Verification</h2>

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">Email Verification</p>
            <p class="mt-1 text-sm" :class="user.is_email_verified ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'">
              {{ user.is_email_verified ? 'Verified' : 'Pending verification' }}
            </p>
            <button
              type="button"
              @click="markVerified('email')"
              :disabled="!user.id || user.is_email_verified || verificationUpdating.email"
              class="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              {{ verificationUpdating.email ? 'Updating...' : (user.is_email_verified ? 'Email Verified' : 'Mark Email Verified') }}
            </button>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">Mobile Verification</p>
            <p class="mt-1 text-sm" :class="user.is_mobile_verified ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'">
              {{ user.is_mobile_verified ? 'Verified' : 'Pending verification' }}
            </p>
            <button
              type="button"
              @click="markVerified('mobile')"
              :disabled="!user.id || user.is_mobile_verified || verificationUpdating.mobile"
              class="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              {{ verificationUpdating.mobile ? 'Updating...' : (user.is_mobile_verified ? 'Mobile Verified' : 'Mark Mobile Verified') }}
            </button>
          </div>
        </div>
      </section>

      <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Overall Progress" :value="`${summary.overall_progress_percent}%`" />
        <StatCard title="Total Enrollments" :value="summary.total_enrollments" />
        <StatCard title="Assignments Done" :value="summary.submitted_assignments" />
        <StatCard title="Pending Assignments" :value="summary.pending_assignments" />
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Course Progress</p>
              <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Enrolled Courses</h2>
            </div>
          </div>

          <div class="mt-4 space-y-3">
            <div v-for="course in courses" :key="course.course_id" class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ course.course_title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ course.course_code }}</p>
                </div>
                <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="course.enrollment_status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'">
                  {{ course.enrollment_status }}
                </span>
              </div>

              <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-700 dark:text-gray-200">
                <p>Videos: {{ course.videos_count }}</p>
                <p>Notes: {{ course.notes_count }}</p>
                <p>Assignments: {{ course.assignments_count }}</p>
                <p>Done: {{ course.submitted_assignments_count }}</p>
              </div>

              <div class="mt-3">
                <div class="h-2.5 rounded-full bg-gray-200 dark:bg-gray-800">
                  <div class="h-2.5 rounded-full bg-cyan-600 dark:bg-cyan-400" :style="{ width: `${course.progress_percent}%` }"></div>
                </div>
                <p class="mt-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Progress: {{ course.progress_percent }}%</p>
              </div>
            </div>

            <p v-if="!loading && courses.length === 0" class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">
              No enrollments found for this user.
            </p>
          </div>
        </article>

        <aside class="space-y-6">
          <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Study Track</p>
            <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Completed Content Types</h2>

            <div class="mt-4 space-y-2 text-sm">
              <div v-for="(count, type) in studyTrack" :key="type" class="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-950/60">
                <span class="font-medium text-gray-700 dark:text-gray-200">{{ type }}</span>
                <span class="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">{{ count }}</span>
              </div>
              <p v-if="Object.keys(studyTrack).length === 0" class="text-gray-500 dark:text-gray-400">No completed track data yet.</p>
            </div>
          </article>

          <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Recent Activity</p>
            <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Assignment Submissions</h2>

            <div class="mt-4 space-y-3">
              <div v-for="item in recentSubmissions" :key="item.submission_id" class="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950/60">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.assignment_title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ item.course_title }}</p>
                <p class="mt-1 text-xs text-gray-600 dark:text-gray-300">{{ formatDate(item.submitted_at) }}</p>
              </div>
              <p v-if="!loading && recentSubmissions.length === 0" class="text-sm text-gray-500 dark:text-gray-400">No submissions yet.</p>
            </div>
          </article>
        </aside>
      </section>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, h, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const errorMessage = ref('')
const statusMessage = ref('')
const statusUpdating = ref(false)
const verificationUpdating = reactive({
  email: false,
  mobile: false
})

const user = reactive({
  id: null,
  full_name: '',
  email: '',
  active: true,
  is_email_verified: false,
  is_mobile_verified: false
})

const summary = reactive({
  overall_progress_percent: 0,
  total_enrollments: 0,
  submitted_assignments: 0,
  pending_assignments: 0
})

const studyTrack = ref({})
const courses = ref([])
const recentSubmissions = ref([])

const fetchInsights = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data } = await api.get(`/api/admin/users/${route.params.id}/insights`)

    Object.assign(user, data?.user || {})
    Object.assign(summary, data?.summary || {})
    studyTrack.value = data?.study_track || {}
    courses.value = data?.courses || []
    recentSubmissions.value = data?.recent_submissions || []
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Could not load user insights.'
  } finally {
    loading.value = false
  }
}

const toggleUserStatus = async () => {
  if (!user.id) return

  statusUpdating.value = true
  errorMessage.value = ''
  statusMessage.value = ''

  try {
    const targetActive = !user.active
    const { data } = await api.put(`/api/admin/users/${user.id}/status`, { active: targetActive })
    user.active = targetActive
    statusMessage.value = data?.message || (targetActive ? 'User activated successfully.' : 'User made inactive successfully.')
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Could not update user status.'
  } finally {
    statusUpdating.value = false
  }
}

const markVerified = async (type) => {
  if (!user.id) return

  const isEmail = type === 'email'
  const key = isEmail ? 'email' : 'mobile'

  verificationUpdating[key] = true
  errorMessage.value = ''
  statusMessage.value = ''

  try {
    const payload = isEmail
      ? { is_email_verified: true }
      : { is_mobile_verified: true }

    const { data } = await api.put(`/api/admin/users/${user.id}/verification`, payload)

    user.is_email_verified = data?.user?.is_email_verified ?? user.is_email_verified
    user.is_mobile_verified = data?.user?.is_mobile_verified ?? user.is_mobile_verified

    statusMessage.value = isEmail
      ? 'Email marked as verified successfully.'
      : 'Mobile marked as verified successfully.'
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Could not update verification status.'
  } finally {
    verificationUpdating[key] = false
  }
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

const goBack = () => {
  router.push('/admin/users')
}

const StatCard = defineComponent({
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], default: 0 }
  },
  setup(props) {
    return () => h('div', { class: 'rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80' }, [
      h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.title),
      h('p', { class: 'mt-2 text-2xl font-bold text-gray-900 dark:text-white' }, String(props.value))
    ])
  }
})

onMounted(() => {
  fetchInsights()
})
</script>
