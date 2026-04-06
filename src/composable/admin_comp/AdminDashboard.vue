<template>
    <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6">
            <section class="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-gray-900/80 sm:p-8">
                <div class="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Admin Dashboard</p>
                        <h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Welcome, {{ adminName }}</h1>
                        <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
                            Monitor users, courses, assignments, and platform activity from one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        @click="fetchDashboard"
                        class="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400"
                    >
                        Refresh Dashboard
                    </button>
                </div>

                <p v-if="errorMessage" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                    {{ errorMessage }}
                </p>
            </section>

            <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard title="Total Users" :value="summary.totalUsers" :subtitle="`${summary.totalStudents} students, ${summary.totalAdmins} admins`" />
                <MetricCard title="Courses" :value="summary.totalCourses" :subtitle="`${summary.activeCourses} active courses`" />
                <MetricCard title="Assignments" :value="summary.totalAssignments" :subtitle="`${summary.activeAssignments} active, ${summary.expiredAssignments} expired`" />
                <MetricCard title="Submissions" :value="summary.totalSubmissions" subtitle="Across all assignments" />
            </section>

            <section class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Quick Actions</p>
                            <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Go To Management</h2>
                        </div>
                    </div>

                    <div class="mt-4 grid gap-3 sm:grid-cols-2">
                        <RouterLink
                            v-for="action in quickActions"
                            :key="action.to"
                            :to="action.to"
                            class="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-gray-800 dark:bg-gray-950/60 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/40"
                        >
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ action.title }}</p>
                            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ action.description }}</p>
                        </RouterLink>
                    </div>
                </article>

                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Verification Health</p>
                    <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Account Verification Snapshot</h2>

                    <div class="mt-4 space-y-4">
                        <div>
                            <div class="mb-1 flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400">
                                <span>Email Verified</span>
                                <span>{{ verification.email.percent }}%</span>
                            </div>
                            <div class="h-2.5 rounded-full bg-gray-200 dark:bg-gray-800">
                                <div class="h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" :style="{ width: `${verification.email.percent}%` }"></div>
                            </div>
                        </div>

                        <div>
                            <div class="mb-1 flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400">
                                <span>Mobile Verified</span>
                                <span>{{ verification.mobile.percent }}%</span>
                            </div>
                            <div class="h-2.5 rounded-full bg-gray-200 dark:bg-gray-800">
                                <div class="h-2.5 rounded-full bg-cyan-600 dark:bg-cyan-400" :style="{ width: `${verification.mobile.percent}%` }"></div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            <section class="grid gap-6 xl:grid-cols-2">
                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Recent Assignments</p>
                            <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Latest Due Dates</h2>
                        </div>
                        <RouterLink to="/admin/assignments" class="text-sm font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
                            View All
                        </RouterLink>
                    </div>

                    <div class="mt-4 space-y-3">
                        <div v-for="assignment in recentAssignments" :key="assignment.id" class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
                            <div class="flex flex-wrap items-center justify-between gap-2">
                                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ assignment.title }}</p>
                                <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="assignment.due_status === 'expired' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'">
                                    {{ assignment.due_status }}
                                </span>
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ assignment.course_title || 'N/A' }} - Week {{ assignment.week_number || '-' }}</p>
                            <p class="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300">Due: {{ formatDate(assignment.due_date) }}</p>
                        </div>

                        <p v-if="!loading && recentAssignments.length === 0" class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">
                            No assignments available yet.
                        </p>
                    </div>
                </article>

                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Recent Users</p>
                            <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Newest Registrations</h2>
                        </div>
                        <RouterLink to="/admin/users" class="text-sm font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
                            View All
                        </RouterLink>
                    </div>

                    <div class="mt-4 space-y-3">
                        <div v-for="user in recentUsers" :key="user.id" class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ user.full_name || 'Unnamed User' }}</p>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                            <p class="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300">Joined: {{ formatDate(user.joining_date) }}</p>
                        </div>

                        <p v-if="!loading && recentUsers.length === 0" class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">
                            No users found.
                        </p>
                    </div>
                </article>
            </section>
        </div>
    </div>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref } from 'vue'
import api from '../../services/axios'
import { getAuth } from '../../utils/auth'

const loading = ref(false)
const errorMessage = ref('')

const summary = reactive({
    totalUsers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalCourses: 0,
    activeCourses: 0,
    totalAssignments: 0,
    activeAssignments: 0,
    expiredAssignments: 0,
    totalSubmissions: 0,
    verifiedEmails: 0,
    verifiedMobiles: 0
})

const recentUsers = ref([])
const recentAssignments = ref([])

const quickActions = [
    { title: 'Manage Users', description: 'Inspect user profiles and study insights.', to: '/admin/users' },
    { title: 'Manage Courses', description: 'Create and update course structures.', to: '/admin/courses' },
    { title: 'Manage Assignments', description: 'Track assignment activity and due dates.', to: '/admin/assignments' },
    { title: 'Create Notifications', description: 'Send global or user-specific alerts.', to: '/admin/dashboard' }
]

const adminName = computed(() => {
    const { user } = getAuth()
    const first = user?.first_name || 'Admin'
    const last = user?.last_name || ''
    return `${first} ${last}`.trim()
})

const verification = computed(() => {
    const total = summary.totalUsers || 1
    const emailPercent = Math.round((summary.verifiedEmails / total) * 100)
    const mobilePercent = Math.round((summary.verifiedMobiles / total) * 100)

    return {
        email: { percent: Math.min(100, Math.max(0, emailPercent)) },
        mobile: { percent: Math.min(100, Math.max(0, mobilePercent)) }
    }
})

const fetchDashboard = async () => {
    loading.value = true
    errorMessage.value = ''

    const [usersRes, coursesRes, assignmentsRes] = await Promise.allSettled([
        api.get('/api/admin/users', { params: { page: 1, per_page: 8 } }),
        api.get('/api/admin/courses', { params: { page: 1, per_page: 200 } }),
        api.get('/api/admin/assignments', { params: { page: 1, per_page: 8 } })
    ])

    if (usersRes.status === 'fulfilled') {
        const payload = usersRes.value.data || {}
        recentUsers.value = payload.users || []
        summary.totalUsers = payload.summary?.total_users || 0
        summary.totalStudents = payload.summary?.total_students || 0
        summary.totalAdmins = payload.summary?.total_admins || 0
        summary.verifiedEmails = payload.summary?.verified_emails || 0
        summary.verifiedMobiles = payload.summary?.verified_mobiles || 0
    }

    if (coursesRes.status === 'fulfilled') {
        const payload = coursesRes.value.data || {}
        const courses = payload.courses || []
        summary.totalCourses = payload.total || courses.length || 0
        summary.activeCourses = courses.filter((course) => course.is_active).length
    }

    if (assignmentsRes.status === 'fulfilled') {
        const payload = assignmentsRes.value.data || {}
        recentAssignments.value = payload.assignments || []
        summary.totalAssignments = payload.summary?.total_assignments || 0
        summary.activeAssignments = payload.summary?.active_assignments || 0
        summary.expiredAssignments = payload.summary?.expired_assignments || 0
        summary.totalSubmissions = payload.summary?.total_submissions || 0
    }

    if (usersRes.status !== 'fulfilled' && coursesRes.status !== 'fulfilled' && assignmentsRes.status !== 'fulfilled') {
        errorMessage.value = 'Could not load dashboard data. Please try again.'
    }

    loading.value = false
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

const MetricCard = defineComponent({
    name: 'MetricCard',
    props: {
        title: { type: String, required: true },
        value: { type: [Number, String], default: 0 },
        subtitle: { type: String, default: '' }
    },
    setup(props) {
        return () =>
            h('div', { class: 'rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80' }, [
                h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.title),
                h('p', { class: 'mt-2 text-2xl font-bold text-gray-900 dark:text-white' }, String(props.value)),
                h('p', { class: 'mt-1 text-sm text-gray-600 dark:text-gray-400' }, props.subtitle)
            ])
    }
})

onMounted(() => {
    fetchDashboard()
})
</script>