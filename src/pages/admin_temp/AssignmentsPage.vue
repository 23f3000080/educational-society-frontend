<template>
	<div
		class="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-amber-950 dark:text-gray-100 lg:px-8">
		<div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
			<!-- Header Section -->
			<section
				class="rounded-2xl sm:rounded-3xl border border-amber-100 bg-white p-4 sm:p-6 shadow-sm dark:border-amber-900 dark:bg-gray-900/80 lg:p-8">
				<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
					<div class="min-w-0">
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
							Admin Assignments</p>
						<h1
							class="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
							Assignments Management</h1>
						<p class="mt-1 sm:mt-2 text-sm leading-5 sm:leading-6 text-gray-600 dark:text-gray-300">
							Create, edit, and monitor assignments across courses and weeks.
						</p>
					</div>

					<div class="flex flex-wrap gap-2 flex-shrink-0">
						<button type="button" @click="openCreateModal"
							class="rounded-xl bg-amber-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 whitespace-nowrap">
							<i class="fas fa-plus mr-1.5 sm:mr-2"></i>
							<span class="hidden xs:inline">New Assignment</span>
							<span class="xs:hidden">New</span>
						</button>
						<button type="button" @click="fetchAssignments"
							class="rounded-xl bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
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
					<StatCard title="Submissions" :value="summary.total_submissions" />
				</div>
			</section>

			<!-- Table Section -->
			<section
				class="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 lg:p-6">
				<!-- Filters -->
				<div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
					<div class="col-span-1 xs:col-span-2 lg:col-span-1">
						<input v-model="filters.search" type="text" placeholder="Search assignments"
							class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
					</div>
					<select v-model="filters.course_id"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
						<option value="">All Courses</option>
						<option v-for="course in courses" :key="course.id" :value="String(course.id)">
							{{ course.title }}
						</option>
					</select>
					<select v-model="filters.week_id"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
						<option value="">All Weeks</option>
						<option v-for="week in allWeeksOptions" :key="`${week.course_id}-${week.id}`"
							:value="String(week.id)">
							{{ week.course_title }} - Week {{ week.week_number }}
						</option>
					</select>
					<select v-model="filters.status"
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
					{{ errorMessage }}
				</p>

				<!-- Table -->
				<div
					class="mt-4 sm:mt-5 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
							<thead class="bg-gray-50 dark:bg-gray-950/50">
								<tr>
									<th
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Assignment</th>
									<th
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden md:table-cell">
										Course/Week</th>
									<th
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden sm:table-cell">
										Due Date</th>
									<th
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 hidden lg:table-cell">
										Questions</th>
									<th
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Submissions</th>
									<th
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Actions</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
								<tr v-for="assignment in assignments" :key="assignment.id"
									class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
									<td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
										<p class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{{
											assignment.title }}</p>
										<p
											class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 hidden xs:block">
											{{ assignment.description || 'No description' }}</p>
										<!-- Mobile: Show course/week info -->
										<div class="block md:hidden mt-1 text-xs text-gray-500 dark:text-gray-400">
											<p>{{ assignment.course_title || 'N/A' }}</p>
											<p class="text-xs">Week {{ assignment.week_number || '-' }}</p>
										</div>
										<!-- Mobile: Show due date -->
										<div class="block sm:hidden mt-1">
											<span class="text-xs text-gray-600 dark:text-gray-300">{{
												formatDate(assignment.due_date) }}</span>
											<span
												class="ml-1.5 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold"
												:class="statusBadgeClass(assignment.due_status)">
												{{ assignment.due_status }}
											</span>
										</div>
									</td>
									<td
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hidden md:table-cell">
										<p>{{ assignment.course_title || 'N/A' }}</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">Week {{
											assignment.week_number || '-' }}</p>
									</td>
									<td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm hidden sm:table-cell">
										<p class="text-gray-700 dark:text-gray-200">{{ formatDate(assignment.due_date)
											}}</p>
										<span class="mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
											:class="statusBadgeClass(assignment.due_status)">
											{{ assignment.due_status }}
										</span>
									</td>
									<td
										class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-200 hidden lg:table-cell">
										{{ assignment.question_count || 0 }}</td>
									<td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-200">
										<span class="font-medium">{{ assignment.submission_count || 0 }}</span>
									</td>
									<td class="px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
										<div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
											<!-- View Submissions Button -->
											<!-- View Submissions Button - Updated -->
<router-link 
  :to="{
    path: '/admin/assignments/submissions',
    query: { assignment_id: assignment.id }
  }" 
  class="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-medium rounded-xl transition-colors duration-200"
  :title="`View ${assignment.submission_count || 0} submissions`"
>
  <i class="fas fa-users text-xs sm:text-sm"></i>
  <span class="ml-1 hidden xs:inline">Submissions</span>
  <span v-if="assignment.submission_count" 
        class="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
    {{ assignment.submission_count }}
  </span>
</router-link>

											<!-- Questions Button -->
											<button type="button" @click="manageQuestions(assignment.id)"
												class="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white text-xs font-medium rounded-xl transition-colors duration-200">
												<i class="fas fa-question-circle text-xs sm:text-sm"></i>
												<span class="ml-1 hidden xs:inline">Questions</span>
											</button>

											<!-- Edit Button -->
											<button type="button" @click="openEditModal(assignment)"
												class="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white text-xs font-medium rounded-xl transition-colors duration-200">
												<i class="fas fa-edit text-xs sm:text-sm"></i>
												<span class="ml-1 hidden xs:inline">Edit</span>
											</button>

											<!-- Delete Button -->
											<button type="button" @click="deleteAssignment(assignment)"
												class="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400 text-white text-xs font-medium rounded-xl transition-colors duration-200">
												<i class="fas fa-trash text-xs sm:text-sm"></i>
												<span class="ml-1 hidden xs:inline">Delete</span>
											</button>
										</div>
									</td>
								</tr>
								<tr v-if="!loading && assignments.length === 0">
									<td colspan="6"
										class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										<i
											class="fas fa-inbox text-2xl block mb-2 text-gray-300 dark:text-gray-600"></i>
										No assignments found.
									</td>
								</tr>
								<tr v-if="loading">
									<td colspan="6"
										class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										<div
											class="inline-block animate-spin rounded-full h-6 w-6 border-2 border-amber-500 border-t-transparent">
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
						Page {{ pagination.current_page }} of {{ Math.max(1, pagination.pages) }}
					</p>
					<div class="flex items-center gap-2">
						<button type="button" @click="changePage(pagination.current_page - 1)"
							:disabled="!pagination.has_prev"
							class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
							<i class="fas fa-chevron-left mr-1"></i>
							<span class="hidden xs:inline">Prev</span>
						</button>
						<button type="button" @click="changePage(pagination.current_page + 1)"
							:disabled="!pagination.has_next"
							class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
							<span class="hidden xs:inline">Next</span>
							<i class="fas fa-chevron-right ml-1"></i>
						</button>
					</div>
				</div>
			</section>

			<!-- Modal -->
			<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4">
				<div
					class="w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
					<div
						class="flex items-center justify-between gap-3 sticky top-0 bg-white dark:bg-gray-900 pb-3 border-b border-gray-200 dark:border-gray-800">
						<h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
							{{ isEditMode ? 'Edit Assignment' : 'Create Assignment' }}
						</h2>
						<button type="button" @click="closeModal"
							class="rounded-xl bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
							<i class="fas fa-times"></i>
						</button>
					</div>

					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div class="space-y-1.5">
							<label
								class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Course</label>
							<select v-model="form.course_id"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
								@change="onCourseChange" :disabled="isEditMode">
								<option value="">Select course</option>
								<option v-for="course in courses" :key="course.id" :value="String(course.id)">{{
									course.title }}</option>
							</select>
						</div>

						<div class="space-y-1.5">
							<label
								class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Week</label>
							<select v-model="form.week_id"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
								<option value="">Select week</option>
								<option v-for="week in formWeeks" :key="week.id" :value="String(week.id)">
									Week {{ week.week_number }} - {{ week.title }}
								</option>
							</select>
						</div>

						<div class="space-y-1.5 sm:col-span-2">
							<label
								class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Title</label>
							<input v-model="form.title" type="text"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
						</div>

						<div class="space-y-1.5 sm:col-span-2">
							<label
								class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Description</label>
							<textarea v-model="form.description" rows="3"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"></textarea>
						</div>

						<div class="space-y-1.5">
							<label
								class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Due
								Date</label>
							<input v-model="form.due_date" type="datetime-local"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
						</div>

						<div class="space-y-1.5">
							<label
								class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total
								Points</label>
							<input v-model.number="form.total_points" type="number" min="0"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
						</div>
					</div>

					<p v-if="modalError"
						class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
						{{ modalError }}
					</p>

					<div class="mt-5 flex flex-wrap justify-end gap-2">
						<button type="button" @click="closeModal"
							class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
							Cancel
						</button>
						<button type="button" @click="submitForm" :disabled="saving"
							class="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:hover:bg-amber-400">
							{{ saving ? 'Saving...' : isEditMode ? 'Update Assignment' : 'Create Assignment' }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineComponent, h, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'

const router = useRouter()

const assignments = ref([])
const loading = ref(false)
const saving = ref(false)
const errorMessage = ref('')
const modalError = ref('')

const summary = reactive({
	total_assignments: 0,
	active_assignments: 0,
	expired_assignments: 0,
	total_submissions: 0
})

const pagination = reactive({
	total: 0,
	pages: 1,
	current_page: 1,
	per_page: 10,
	has_next: false,
	has_prev: false
})

const filters = reactive({
	search: '',
	course_id: '',
	week_id: '',
	status: ''
})

const courses = ref([])
const allWeeksOptions = ref([])
const formWeeks = ref([])

const showModal = ref(false)
const isEditMode = ref(false)
const editingAssignmentId = ref(null)

const form = reactive({
	course_id: '',
	week_id: '',
	title: '',
	description: '',
	due_date: '',
	total_points: 0
})

const silentRequestMeta = { meta: { skipGlobalLoader: true } }

const fetchCoursesAndWeeks = async () => {
	try {
		const { data } = await api.get('/api/admin/courses', {
			params: { page: 1, per_page: 200 },
			...silentRequestMeta
		})
		courses.value = data?.courses || []

		const weekBucket = []
		const weekRequests = courses.value.map(async (course) => {
			try {
				const res = await api.get(`/api/admin/courses/${course.id}/weeks`, silentRequestMeta)
				const weeks = res.data || []
				return weeks.map((week) => ({
					id: week.id,
					week_number: week.week_number,
					title: week.title,
					course_id: course.id,
					course_title: course.title
				}))
			} catch {
				return []
			}
		})
		const weekResults = await Promise.all(weekRequests)
		for (const weeks of weekResults) {
			weekBucket.push(...weeks)
		}
		allWeeksOptions.value = weekBucket
	} catch {
		// Keep silent; assignment list page still works even if filter metadata fails.
	}
}

const fetchAssignments = async () => {
	loading.value = true
	errorMessage.value = ''

	try {
		const { data } = await api.get('/api/admin/assignments', {
			...silentRequestMeta,
			params: {
				page: pagination.current_page,
				per_page: pagination.per_page,
				search: filters.search || undefined,
				course_id: filters.course_id || undefined,
				week_id: filters.week_id || undefined,
				status: filters.status || undefined
			}
		})

		assignments.value = data?.assignments || []
		Object.assign(pagination, data?.pagination || {})
		Object.assign(summary, data?.summary || {})
	} catch (error) {
		assignments.value = []
		errorMessage.value = error.response?.data?.error || 'Could not load assignments.'
	} finally {
		loading.value = false
	}
}

const applyFilters = () => {
	pagination.current_page = 1
	fetchAssignments()
}

const clearFilters = () => {
	filters.search = ''
	filters.course_id = ''
	filters.week_id = ''
	filters.status = ''
	pagination.current_page = 1
	fetchAssignments()
}

const changePage = (page) => {
	if (page < 1 || page > pagination.pages || page === pagination.current_page) return
	pagination.current_page = page
	fetchAssignments()
}

const statusBadgeClass = (status) => {
	if (status === 'active') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
	if (status === 'expired') return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
	return 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
}

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

const manageQuestions = (assignmentId) => {
	router.push(`/admin/assignments/${assignmentId}`)
}

const resetForm = () => {
	form.course_id = ''
	form.week_id = ''
	form.title = ''
	form.description = ''
	form.due_date = ''
	form.total_points = 0
	formWeeks.value = []
	modalError.value = ''
	editingAssignmentId.value = null
}

const openCreateModal = () => {
	isEditMode.value = false
	resetForm()
	showModal.value = true
}

const onCourseChange = () => {
	form.week_id = ''
	if (!form.course_id) {
		formWeeks.value = []
		return
	}

	formWeeks.value = allWeeksOptions.value.filter((week) => String(week.course_id) === String(form.course_id))
}

const openEditModal = (assignment) => {
	isEditMode.value = true
	editingAssignmentId.value = assignment.id
	modalError.value = ''
	form.course_id = assignment.course_id ? String(assignment.course_id) : ''
	formWeeks.value = allWeeksOptions.value.filter((week) => String(week.course_id) === String(form.course_id))
	form.week_id = assignment.week_id ? String(assignment.week_id) : ''
	form.title = assignment.title || ''
	form.description = assignment.description || ''
	form.due_date = assignment.due_date ? assignment.due_date.slice(0, 16) : ''
	form.total_points = assignment.total_points || 0
	showModal.value = true
}

const closeModal = () => {
	showModal.value = false
	resetForm()
}

const submitForm = async () => {
	modalError.value = ''

	if (!form.title || !form.week_id) {
		modalError.value = 'Title and week are required.'
		return
	}

	saving.value = true

	try {
		if (isEditMode.value && editingAssignmentId.value) {
			await api.put(`/api/admin/assignments/${editingAssignmentId.value}`, {
				title: form.title,
				description: form.description,
				due_date: form.due_date || null,
				total_points: form.total_points
			}, silentRequestMeta)
		} else {
			await api.post(`/api/admin/weeks/${form.week_id}/assignments`, {
				title: form.title,
				description: form.description,
				due_date: form.due_date || null,
				total_points: form.total_points
			}, silentRequestMeta)
		}

		closeModal()
		await fetchAssignments()
	} catch (error) {
		modalError.value = error.response?.data?.error || 'Could not save assignment.'
	} finally {
		saving.value = false
	}
}

const deleteAssignment = async (assignment) => {
	const ok = window.confirm(`Delete assignment "${assignment.title}"?`)
	if (!ok) return

	try {
		await api.delete(`/api/admin/assignments/${assignment.id}`, silentRequestMeta)
		await fetchAssignments()
	} catch (error) {
		errorMessage.value = error.response?.data?.error || 'Could not delete assignment.'
	}
}

const StatCard = defineComponent({
	name: 'StatCard',
	props: {
		title: { type: String, required: true },
		value: { type: [String, Number], default: 0 }
	},
	setup(props) {
		return () => h('div', { class: 'rounded-2xl border border-gray-200 bg-gray-50/80 p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950/60' }, [
			h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.title),
			h('p', { class: 'mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white' }, String(props.value))
		])
	}
})

onMounted(async () => {
	await Promise.all([fetchCoursesAndWeeks(), fetchAssignments()])
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

/* Scrollable modal */
.max-h-\[90vh\] {
	max-height: 90vh;
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