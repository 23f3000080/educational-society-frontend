<template>
    <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-indigo-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6">
            <header class="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm dark:border-indigo-900 dark:bg-gray-900/80 sm:p-6">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">All Assignments</h1>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                            View and manage all assignments from your enrolled courses.
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div class="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-center dark:border-gray-800 dark:bg-gray-950/60">
                            <p class="text-xs text-gray-500 dark:text-gray-400">Total</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.total }}</p>
                        </div>
                        <div class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center dark:border-amber-900 dark:bg-amber-950/40">
                            <p class="text-xs text-amber-700 dark:text-amber-300">Pending</p>
                            <p class="text-lg font-semibold text-amber-800 dark:text-amber-300">{{ stats.pending }}</p>
                        </div>
                        <div class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center dark:border-emerald-900 dark:bg-emerald-950/40">
                            <p class="text-xs text-emerald-700 dark:text-emerald-300">Submitted</p>
                            <p class="text-lg font-semibold text-emerald-800 dark:text-emerald-300">{{ stats.submitted }}</p>
                        </div>
                        <div class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-center dark:border-rose-900 dark:bg-rose-950/40">
                            <p class="text-xs text-rose-700 dark:text-rose-300">Missed</p>
                            <p class="text-lg font-semibold text-rose-800 dark:text-rose-300">{{ stats.missed }}</p>
                        </div>
                    </div>
                </div>
            </header>

            <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-5">
                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search assignment or course..."
                        class="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900 md:max-w-md"
                    />

                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="status in filters"
                            :key="status"
                            type="button"
                            @click="activeFilter = status"
                            :class="[
                                'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                                activeFilter === status
                                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            ]"
                        >
                            {{ status }}
                        </button>
                    </div>
                </div>
            </section>

            <section v-if="loading" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="n in 6"
                    :key="n"
                    class="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/80"
                ></div>
            </section>

            <section
                v-else-if="error"
                class="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
            >
                <p class="font-semibold">{{ error }}</p>
                <button
                    type="button"
                    @click="loadAllAssignments"
                    class="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
                >
                    Retry
                </button>
            </section>

            <section
                v-else-if="filteredAssignments.length === 0"
                class="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900/80"
            >
                <p class="text-gray-600 dark:text-gray-300">No assignments match your current filter.</p>
            </section>

            <section v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <article
                    v-for="item in filteredAssignments"
                    :key="item.assignmentId"
                    class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
                >
                    <div class="mb-3 flex items-start justify-between gap-3">
                        <h2 class="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">{{ item.title }}</h2>
                        <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusClass(item.status)">
                            {{ item.status }}
                        </span>
                    </div>

                    <p class="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{{ item.description || 'No description provided.' }}</p>

                    <div class="mt-4 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <p><span class="font-semibold text-gray-700 dark:text-gray-200">Course:</span> {{ item.courseTitle }}</p>
                        <p><span class="font-semibold text-gray-700 dark:text-gray-200">Week:</span> {{ item.weekNumber }}</p>
                        <p><span class="font-semibold text-gray-700 dark:text-gray-200">Due:</span> {{ formatDateTime(item.dueDate) }}</p>
                        <p v-if="item.submittedAt"><span class="font-semibold text-gray-700 dark:text-gray-200">Submitted:</span> {{ formatDateTime(item.submittedAt) }}</p>
                    </div>

                    <button
                        type="button"
                        :disabled="item.status === 'Missed'"
                        @click="openCourse(item.courseId)"
                        class="mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
                        :class="item.status === 'Missed' ? 'cursor-not-allowed bg-gray-400 dark:bg-gray-700' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400'"
                    >
                        {{ item.status === 'Submitted' && !item.isPastDue ? 'Resubmit in Course' : 'Open Course' }}
                    </button>
                </article>
            </section>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'

const router = useRouter()

const assignments = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const activeFilter = ref('All')
const filters = ['All', 'Pending', 'Submitted', 'Missed']

const formatDateTime = (value) => {
    if (!value) return 'No due date'
    const dt = new Date(value)
    if (Number.isNaN(dt.getTime())) return value
    return dt.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata'
    })
}

const deriveStatus = (dueDate, submittedAt) => {
    const now = new Date()
    const due = dueDate ? new Date(dueDate) : null
    const isPastDue = due ? now > due : false

    if (submittedAt) {
        return { label: 'Submitted', isPastDue }
    }

    if (isPastDue) {
        return { label: 'Missed', isPastDue }
    }

    return { label: 'Pending', isPastDue }
}

const loadAllAssignments = async () => {
    loading.value = true
    error.value = ''

    try {
        const myCoursesRes = await api.get('/api/my-courses')
        const myCourses = Array.isArray(myCoursesRes.data) ? myCoursesRes.data : []

        const weekResponses = await Promise.all(
            myCourses.map((course) =>
                api.get(`/api/courses/${course.course_id}/weeks`).then((res) => ({
                    course,
                    weeks: Array.isArray(res.data) ? res.data : []
                }))
            )
        )

        const flattened = []

        weekResponses.forEach(({ course, weeks }) => {
            weeks.forEach((week) => {
                const weekAssignments = Array.isArray(week.assignments) ? week.assignments : []
                weekAssignments.forEach((assignment) => {
                    flattened.push({
                        assignmentId: assignment.id,
                        title: assignment.title,
                        description: assignment.description,
                        dueDate: assignment.due_date,
                        courseId: course.course_id,
                        courseTitle: course.title,
                        weekNumber: week.week_number,
                        submittedAt: null,
                        status: 'Pending',
                        isPastDue: false
                    })
                })
            })
        })

        const withSubmission = await Promise.all(
            flattened.map(async (item) => {
                try {
                    const detailsRes = await api.get(`/api/assignments/${item.assignmentId}/questions`)
                    const submittedAt = detailsRes.data?.latest_submission_at || null
                    const statusInfo = deriveStatus(item.dueDate, submittedAt)

                    return {
                        ...item,
                        submittedAt,
                        status: statusInfo.label,
                        isPastDue: statusInfo.isPastDue
                    }
                } catch (_err) {
                    const statusInfo = deriveStatus(item.dueDate, null)
                    return {
                        ...item,
                        status: statusInfo.label,
                        isPastDue: statusInfo.isPastDue
                    }
                }
            })
        )

        assignments.value = withSubmission.sort((a, b) => {
            const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER
            const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER
            return aDue - bDue
        })
    } catch (err) {
        error.value = err.response?.data?.error || 'Failed to load assignments.'
    } finally {
        loading.value = false
    }
}

const filteredAssignments = computed(() => {
    let list = assignments.value

    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase().trim()
        list = list.filter((item) =>
            item.title.toLowerCase().includes(q) ||
            item.courseTitle.toLowerCase().includes(q)
        )
    }

    if (activeFilter.value !== 'All') {
        list = list.filter((item) => item.status === activeFilter.value)
    }

    return list
})

const stats = computed(() => {
    return {
        total: assignments.value.length,
        pending: assignments.value.filter((item) => item.status === 'Pending').length,
        submitted: assignments.value.filter((item) => item.status === 'Submitted').length,
        missed: assignments.value.filter((item) => item.status === 'Missed').length
    }
})

const openCourse = (courseId) => {
    router.push(`/course/${courseId}`)
}

const statusClass = (status) => {
    if (status === 'Submitted') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
    if (status === 'Missed') return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
    return 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
}

onMounted(() => {
    loadAllAssignments()
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>