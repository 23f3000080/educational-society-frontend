<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-amber-950 dark:text-gray-100 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
      <!-- Header Section -->
      <section class="rounded-2xl sm:rounded-3xl border border-amber-100 bg-white p-4 sm:p-6 shadow-sm dark:border-amber-900 dark:bg-gray-900/80 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
              Admin Dashboard</p>
            <h1 class="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Assignments Management
            </h1>
            <p class="mt-1 sm:mt-2 text-sm leading-5 sm:leading-6 text-gray-600 dark:text-gray-300">
              View all assignments across courses and weeks with submission statistics
            </p>
          </div>

          <div class="flex flex-wrap gap-2 flex-shrink-0">
            <button type="button" @click="fetchAssignments"
              class="rounded-xl bg-amber-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 whitespace-nowrap">
              <i class="fas fa-sync mr-1.5 sm:mr-2"></i>
              <span class="hidden xs:inline">Refresh</span>
              <span class="xs:hidden"><i class="fas fa-sync"></i></span>
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <StatCard title="Total Assignments" :value="summary.total_assignments" />
          <StatCard title="Active" :value="summary.active_assignments" />
          <StatCard title="Expired" :value="summary.expired_assignments" />
          <StatCard title="Total Submissions" :value="summary.total_submissions" />
        </div>
      </section>

      <!-- Table Section -->
      <section class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 lg:p-6">
        <!-- Search and Filters -->
        <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div class="col-span-1 xs:col-span-2 lg:col-span-1">
            <input v-model="searchQuery" type="text" placeholder="Search assignments..."
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
              @keyup.enter="applyFilters" />
          </div>
          <select v-model="filterCourse"
            class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
            <option value="">All Courses</option>
            <option v-for="course in uniqueCourses" :key="course.id" :value="String(course.id)">
              {{ course.title }}
            </option>
          </select>
          <select v-model="filterStatus"
            class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
          <div class="flex gap-2">
            <button type="button" @click="applyFilters"
              class="flex-1 rounded-xl bg-amber-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400">
              Apply
            </button>
            <button type="button" @click="clearFilters"
              class="flex-1 rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              Clear
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage"
          class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          <i class="fas fa-exclamation-circle mr-2"></i>
          {{ errorMessage }}
        </p>

        <!-- Table -->
        <div class="mt-4 sm:mt-5 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead class="bg-gray-50 dark:bg-gray-950/50">
                <tr>
                  <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Assignment
                  </th>
                  <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden md:table-cell">
                    Course / Week
                  </th>
                  <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    Due Date
                  </th>
                  <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                    Questions
                  </th>
                  <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Marks
                  </th>
                  <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Submissions
                  </th>
                  <th class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                <tr v-for="assignment in filteredAssignments" :key="assignment.assignment_id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                  
                  <!-- Assignment Info -->
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                    <p class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {{ assignment.title }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 hidden xs:block">
                      {{ assignment.description || 'No description' }}
                    </p>
                    <!-- Mobile: Course/Week info -->
                    <div class="block md:hidden mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <p>{{ assignment.course?.title || 'N/A' }}</p>
                      <p class="text-xs">Week: {{ assignment.week?.title || '-' }}</p>
                    </div>
                    <!-- Mobile: Due date -->
                    <div class="block sm:hidden mt-1">
                      <span class="text-xs text-gray-600 dark:text-gray-300">
                        {{ formatDate(assignment.due_date) }}
                      </span>
                      <span class="ml-1.5 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold"
                        :class="getStatusBadgeClass(getDueStatus(assignment.due_date))">
                        {{ getDueStatus(assignment.due_date) }}
                      </span>
                    </div>
                  </td>

                  <!-- Course/Week (Desktop) -->
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hidden md:table-cell">
                    <p class="font-medium">{{ assignment.course?.title || 'N/A' }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Week: {{ assignment.week?.title || '-' }}
                    </p>
                  </td>

                  <!-- Due Date (Desktop) -->
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm hidden sm:table-cell">
                    <p class="text-gray-700 dark:text-gray-200">{{ formatDate(assignment.due_date) }}</p>
                    <span class="mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      :class="getStatusBadgeClass(getDueStatus(assignment.due_date))">
                      {{ getDueStatus(assignment.due_date) }}
                    </span>
                  </td>

                  <!-- Questions Count -->
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-center hidden lg:table-cell">
                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-semibold">
                      {{ assignment.questions || 0 }}
                    </span>
                  </td>

                  <!-- Total Marks -->
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                    <span class="font-semibold text-gray-900 dark:text-white">
                      {{ assignment.total_marks || 0 }}
                    </span>
                  </td>

                  <!-- Submissions -->
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                    <span class="inline-flex items-center gap-1.5">
                      <i class="fas fa-users text-gray-400 dark:text-gray-500 text-xs"></i>
                      <span class="font-semibold text-gray-900 dark:text-white">
                        {{ assignment.students_submitted || 0 }}
                      </span>
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <!-- View Details -->
                      <router-link 
                        :to="{
                          path: '/admin/assignments/' + assignment.assignment_id
                        }" 
                        class="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-medium rounded-xl transition-colors duration-200"
                        title="View assignment details">
                        <i class="fas fa-eye text-xs sm:text-sm"></i>
                        <span class="ml-1 hidden xs:inline">View</span>
                      </router-link>

                      <!-- View Submissions -->
                      <router-link 
                        :to="{
                          path: '/admin/assignments/submissions',
                          query: { assignment_id: assignment.assignment_id }
                        }" 
                        class="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white text-xs font-medium rounded-xl transition-colors duration-200"
                        :title="`View ${assignment.students_submitted || 0} submissions`">
                        <i class="fas fa-users text-xs sm:text-sm"></i>
                        <span class="ml-1 hidden xs:inline">Submissions</span>
                        <span v-if="assignment.students_submitted" 
                          class="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                          {{ assignment.students_submitted }}
                        </span>
                      </router-link>
                    </div>
                  </td>
                </tr>

                <!-- Empty State -->
                <tr v-if="!loading && filteredAssignments.length === 0">
                  <td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <i class="fas fa-inbox text-2xl block mb-2 text-gray-300 dark:text-gray-600"></i>
                    <p>No assignments found.</p>
                    <p v-if="searchQuery || filterCourse || filterStatus" class="text-xs mt-1">
                      Try adjusting your filters
                    </p>
                  </td>
                </tr>

                <!-- Loading State -->
                <tr v-if="loading">
                  <td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div class="inline-block animate-spin rounded-full h-6 w-6 border-2 border-amber-500 border-t-transparent">
                    </div>
                    <p class="mt-2">Loading assignments...</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Showing {{ filteredAssignments.length }} of {{ totalAssignments }} assignments
          </p>
          <div class="flex items-center gap-2">
            <button type="button" @click="changePage(pagination.current_page - 1)"
              :disabled="!pagination.has_prev"
              class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <i class="fas fa-chevron-left mr-1"></i>
              <span class="hidden xs:inline">Prev</span>
            </button>
            <span class="text-sm text-gray-600 dark:text-gray-300 px-2">
              Page {{ pagination.current_page }} of {{ Math.max(1, pagination.total_pages) }}
            </span>
            <button type="button" @click="changePage(pagination.current_page + 1)"
              :disabled="!pagination.has_next"
              class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <span class="hidden xs:inline">Next</span>
              <i class="fas fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, h, ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'

const router = useRouter()

// State
const assignments = ref([])
const loading = ref(false)
const errorMessage = ref('')

// Filters
const searchQuery = ref('')
const filterCourse = ref('')
const filterStatus = ref('')

// Summary stats
const summary = reactive({
  total_assignments: 0,
  active_assignments: 0,
  expired_assignments: 0,
  total_submissions: 0
})

// Pagination
const pagination = reactive({
  current_page: 1,
  per_page: 10,
  has_next: false,
  has_prev: false,
  total_pages: 1
})

const silentRequestMeta = { meta: { skipGlobalLoader: true } }

// Computed: Unique courses for filter
const uniqueCourses = computed(() => {
  const courseMap = new Map()
  assignments.value.forEach(assignment => {
    if (assignment.course && assignment.course.id) {
      courseMap.set(assignment.course.id, assignment.course)
    }
  })
  return Array.from(courseMap.values())
})

// Computed: Total assignments count
const totalAssignments = computed(() => assignments.value.length)

// Computed: Filtered assignments
const filteredAssignments = computed(() => {
  let filtered = [...assignments.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(assignment => 
      assignment.title?.toLowerCase().includes(query) ||
      assignment.description?.toLowerCase().includes(query) ||
      assignment.course?.title?.toLowerCase().includes(query) ||
      assignment.week?.title?.toLowerCase().includes(query)
    )
  }

  // Course filter
  if (filterCourse.value) {
    filtered = filtered.filter(assignment => 
      String(assignment.course?.id) === filterCourse.value
    )
  }

  // Status filter
  if (filterStatus.value) {
    filtered = filtered.filter(assignment => 
      getDueStatus(assignment.due_date) === filterStatus.value
    )
  }

  return filtered
})

// Get due status
const getDueStatus = (dueDate) => {
  if (!dueDate) return 'expired'
  const now = new Date()
  const due = new Date(dueDate)
  return due > now ? 'active' : 'expired'
}

// Get status badge class
const getStatusBadgeClass = (status) => {
  if (status === 'active') {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
  }
  return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
}

// Format date
const formatDate = (value) => {
  if (!value) return 'No due date'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

// Fetch assignments from API
const fetchAssignments = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get('/admin/assignments', {
      ...silentRequestMeta
    })

    if (response.data.success) {
      assignments.value = response.data.assignments || []
      
      // Calculate summary
      const total = assignments.value.length
      const active = assignments.value.filter(a => getDueStatus(a.due_date) === 'active').length
      const expired = assignments.value.filter(a => getDueStatus(a.due_date) === 'expired').length
      const submissions = assignments.value.reduce((sum, a) => sum + (a.students_submitted || 0), 0)

      summary.total_assignments = response.data.count || total
      summary.active_assignments = active
      summary.expired_assignments = expired
      summary.total_submissions = submissions

      // Update pagination
      const totalItems = response.data.count || total
      pagination.total_pages = Math.ceil(totalItems / pagination.per_page)
      pagination.has_next = pagination.current_page < pagination.total_pages
      pagination.has_prev = pagination.current_page > 1
    } else {
      errorMessage.value = response.data.message || 'Failed to load assignments'
    }
  } catch (error) {
    console.error('Error fetching assignments:', error)
    assignments.value = []
    errorMessage.value = error.response?.data?.message || 'Could not load assignments. Please try again.'
  } finally {
    loading.value = false
  }
}

// Apply filters
const applyFilters = () => {
  pagination.current_page = 1
  // Since we're doing client-side filtering, just reset to page 1
}

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  filterCourse.value = ''
  filterStatus.value = ''
  pagination.current_page = 1
}

// Change page (client-side pagination)
const changePage = (page) => {
  const totalPages = Math.ceil(filteredAssignments.value.length / pagination.per_page)
  if (page < 1 || page > totalPages || page === pagination.current_page) return
  pagination.current_page = page
  pagination.has_next = page < totalPages
  pagination.has_prev = page > 1
}

// Get paginated assignments
const getPaginatedAssignments = computed(() => {
  const start = (pagination.current_page - 1) * pagination.per_page
  const end = start + pagination.per_page
  return filteredAssignments.value.slice(start, end)
})

// Stat Card Component
const StatCard = defineComponent({
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], default: 0 }
  },
  setup(props) {
    return () => h('div', { 
      class: 'rounded-2xl border border-gray-200 bg-gray-50/80 p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950/60' 
    }, [
      h('p', { 
        class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' 
      }, props.title),
      h('p', { 
        class: 'mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white' 
      }, String(props.value))
    ])
  }
})

// Lifecycle
onMounted(() => {
  fetchAssignments()
})
</script>

<style scoped>
/* Custom responsive utilities */
@media (max-width: 480px) {
  .xs\:inline {
    display: inline !important;
  }
  .xs\:hidden {
    display: none !important;
  }
  .xs\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Line clamp for descriptions */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Table responsive improvements */
@media (max-width: 640px) {
  table {
    font-size: 13px;
  }
}

/* Hover effects */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>