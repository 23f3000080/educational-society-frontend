<template>
    <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-3 py-4 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-indigo-950 dark:text-gray-100 sm:px-5 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-5">
            <!-- Header -->
            <header class="rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-sm backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-900/80 sm:p-5">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                            <i class="fas fa-tasks mr-2 text-indigo-500"></i>All Assignments
                        </h1>
                        <p class="mt-0.5 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                            View and manage from your enrolled courses.
                        </p>
                    </div>

                    <!-- Stats: mobile-first 2-col, then 4-col -->
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                        <div class="rounded-xl border border-gray-200 bg-gray-50/70 px-2 py-2 text-center dark:border-gray-800 dark:bg-gray-950/60">
                            <p class="text-[11px] text-gray-500 dark:text-gray-400 sm:text-xs">Total</p>
                            <p class="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">{{ stats.total }}</p>
                        </div>
                        <div class="rounded-xl border border-amber-200 bg-amber-50/70 px-2 py-2 text-center dark:border-amber-900 dark:bg-amber-950/40">
                            <p class="text-[11px] text-amber-700 dark:text-amber-300 sm:text-xs">Pending</p>
                            <p class="text-base font-semibold text-amber-800 dark:text-amber-300 sm:text-lg">{{ stats.pending }}</p>
                        </div>
                        <div class="rounded-xl border border-emerald-200 bg-emerald-50/70 px-2 py-2 text-center dark:border-emerald-900 dark:bg-emerald-950/40">
                            <p class="text-[11px] text-emerald-700 dark:text-emerald-300 sm:text-xs">Submitted</p>
                            <p class="text-base font-semibold text-emerald-800 dark:text-emerald-300 sm:text-lg">{{ stats.submitted }}</p>
                        </div>
                        <div class="rounded-xl border border-rose-200 bg-rose-50/70 px-2 py-2 text-center dark:border-rose-900 dark:bg-rose-950/40">
                            <p class="text-[11px] text-rose-700 dark:text-rose-300 sm:text-xs">Missed</p>
                            <p class="text-base font-semibold text-rose-800 dark:text-rose-300 sm:text-lg">{{ stats.missed }}</p>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Search + Filter -->
            <section class="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-5">
                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search assignment or course..."
                        class="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900 md:max-w-xs lg:max-w-md"
                    />

                    <!-- Filter buttons: better wrapping & touch targets -->
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <button
                            v-for="status in filters"
                            :key="status"
                            type="button"
                            @click="activeFilter = status; currentPage = 1"
                            :class="[
                                'rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95',
                                activeFilter === status
                                    ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-500'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            ]"
                        >
                            {{ status }}
                        </button>
                    </div>
                </div>
            </section>

            <!-- Loading -->
            <section v-if="loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="n in 6"
                    :key="n"
                    class="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/80"
                ></div>
            </section>

            <!-- Error -->
            <section
                v-else-if="error"
                class="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 text-center text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
            >
                <p class="font-semibold">{{ error }}</p>
                <button
                    type="button"
                    @click="loadAllAssignments"
                    class="mt-4 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 active:scale-95 dark:bg-rose-500 dark:hover:bg-rose-400"
                >
                    <i class="fas fa-redo mr-1.5"></i>Retry
                </button>
            </section>

            <!-- No results -->
            <section
                v-else-if="filteredAssignments.length === 0"
                class="rounded-2xl border border-gray-200 bg-white/90 p-8 text-center dark:border-gray-800 dark:bg-gray-900/80"
            >
                <p class="text-gray-600 dark:text-gray-300">No assignments match your current filter.</p>
            </section>

            <!-- Assignment Cards with Pagination -->
            <template v-else>
                <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <article
                        v-for="item in paginatedAssignments"
                        :key="item.id"
                        class="assignment-card overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 sm:p-5"
                    >
                        <div class="mb-3 flex items-start justify-between gap-2">
                            <h2 class="line-clamp-2 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">{{ item.title }}</h2>
                            <span class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs" :class="statusClass(item.status)">
                                {{ item.status }}
                            </span>
                        </div>

                        <p class="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{{ item.description || 'No description provided.' }}</p>

                        <div class="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400 sm:mt-4">
                            <p><span class="font-semibold text-gray-700 dark:text-gray-200">Course:</span> {{ item.course_title }}</p>
                            <p><span class="font-semibold text-gray-700 dark:text-gray-200">Week:</span> {{ item.week_number || 'N/A' }}</p>
                            <p><span class="font-semibold text-gray-700 dark:text-gray-200">Due:</span> {{ formatDateTime(item.due_date) }}</p>
                        </div>

                        <button
                            type="button"
                            :disabled="item.status === 'Missed'"
                            @click="openAssignment(item.course_id, item.id)"
                            class="mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95"
                            :class="item.status === 'Missed' ? 'cursor-not-allowed bg-gray-400 dark:bg-gray-700' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400'"
                        >
                            <i v-if="item.status === 'Submitted'" class="fas fa-redo mr-1.5"></i>
                            {{ item.status === 'Submitted' ? 'Resubmit' : 'Open Assignment' }}
                        </button>
                    </article>
                </section>

                <!-- Pagination Controls -->
                <section v-if="totalPages > 1" class="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-4">
                    <button
                        @click="currentPage = Math.max(1, currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                    >
                        <i class="fas fa-chevron-left"></i>
                    </button>

                    <div class="flex flex-wrap items-center gap-1">
                        <button
                            v-for="page in visiblePages"
                            :key="page"
                            @click="currentPage = page"
                            :class="[
                                'min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-medium transition',
                                currentPage === page
                                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                            ]"
                        >
                            {{ page }}
                        </button>
                    </div>

                    <button
                        @click="currentPage = Math.min(totalPages, currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                    >
                        <i class="fas fa-chevron-right"></i>
                    </button>

                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        Page {{ currentPage }} of {{ totalPages }}
                    </span>
                </section>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'

const router = useRouter()

const assignments = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const activeFilter = ref('All')
const filters = ['All', 'Pending', 'Submitted', 'Missed']
const currentPage = ref(1)

// Responsive items per page
const getItemsPerPage = () => {
    if (window.innerWidth >= 1536) return 12 // 2xl screens (4 columns x 3 rows)
    if (window.innerWidth >= 1280) return 9  // xl screens (3 columns x 3 rows)
    if (window.innerWidth >= 640) return 8   // sm screens (2 columns x 4 rows)
    return 10                                // mobile (1 column x 10 rows)
}

const itemsPerPage = ref(getItemsPerPage())

// Update on resize
const updateItemsPerPage = () => {
    itemsPerPage.value = getItemsPerPage()
    // Reset to page 1 if current page exceeds new total pages
    if (currentPage.value > totalPages.value) {
        currentPage.value = 1
    }
}

// Watch window resize
if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateItemsPerPage)
}

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

const deriveStatus = (dueDate, submitted) => {
    const now = new Date()
    const due = dueDate ? new Date(dueDate) : null
    const isPastDue = due ? now > due : false

    if (submitted) {
        return 'Submitted'
    }

    if (isPastDue) {
        return 'Missed'
    }

    return 'Pending'
}

const loadAllAssignments = async () => {
    loading.value = true
    error.value = ''

    try {
        // Simply fetch assignments from /api/assignments
        const response = await api.get('/api/assignments')
        const data = Array.isArray(response.data) ? response.data : []

        // Process assignments and add status
        assignments.value = data.map(assignment => {
            const status = deriveStatus(assignment.due_date, assignment.submitted)
            return {
                ...assignment,
                status
            }
        }).sort((a, b) => {
            // Sort by due date (latest first)
            if (a.due_date && b.due_date) {
                return new Date(b.due_date) - new Date(a.due_date)
            }
            return 0
        })

    } catch (err) {
        console.error('Failed to load assignments:', err)
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
            item.course_title?.toLowerCase().includes(q)
        )
    }

    if (activeFilter.value !== 'All') {
        list = list.filter((item) => item.status === activeFilter.value)
    }

    return list
})

// Pagination
const totalPages = computed(() => {
    return Math.ceil(filteredAssignments.value.length / itemsPerPage.value) || 1
})

const paginatedAssignments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredAssignments.value.slice(start, end)
})

// Reset to page 1 when filter/search changes
watch([searchQuery, activeFilter], () => {
    currentPage.value = 1
})

// Visible page numbers with ellipsis logic
const visiblePages = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const delta = 1
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
            range.push(i)
        }
    }

    range.forEach((i) => {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1)
            } else if (i - l !== 1) {
                rangeWithDots.push('...')
            }
        }
        rangeWithDots.push(i)
        l = i
    })

    return rangeWithDots
})

const stats = computed(() => {
    return {
        total: assignments.value.length,
        pending: assignments.value.filter((item) => item.status === 'Pending').length,
        submitted: assignments.value.filter((item) => item.status === 'Submitted').length,
        missed: assignments.value.filter((item) => item.status === 'Missed').length
    }
})

const openAssignment = (courseId, assignmentId) => {
    console.log('Opening assignment:', { courseId, assignmentId })
    
    // Navigate to course page with assignment ID to auto-open
    router.push({
        path: `/course/${courseId}`,
        query: { 
            assignmentId: assignmentId
        }
    }).then(() => {
        console.log('Navigation successful')
    }).catch((err) => {
        console.error('Navigation error:', err)
    })
}

const statusClass = (status) => {
    if (status === 'Submitted') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
    if (status === 'Missed') return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
    return 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
}

onMounted(() => {
    loadAllAssignments()
    updateItemsPerPage()
})

onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateItemsPerPage)
    }
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

/* subtle card hover & active feedback */
.assignment-card {
    transition: transform 0.15s ease, box-shadow 0.2s ease;
    overflow: hidden;
    word-wrap: break-word;
    max-width: 100%;
}

@media (min-width: 640px) {
    .assignment-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
    }
}

button:active:not(:disabled) {
    transform: scale(0.96);
}

/* Ensure content doesn't overflow */
.assignment-card * {
    max-width: 100%;
    word-wrap: break-word;
}
</style>