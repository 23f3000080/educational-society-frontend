<template>
	<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-amber-950 dark:text-gray-100 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl space-y-6">
			<section class="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm dark:border-amber-900 dark:bg-gray-900/80 sm:p-8">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">Admin Tests</p>
						<h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Tests Management</h1>
						<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
							Create, edit, and monitor tests across courses and weeks.
						</p>
					</div>

					<div class="flex flex-wrap gap-2">
						<button
							type="button"
							@click="openCreateModal"
							class="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400"
						>
							New Test
						</button>
						<button
							type="button"
							@click="fetchTests"
							class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							Refresh
						</button>
					</div>
				</div>

				<div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<StatCard title="Total Tests" :value="summary.total_tests" />
					<StatCard title="Active" :value="summary.active_tests" />
					<StatCard title="Expired" :value="summary.expired_tests" />
					<StatCard title="Submissions" :value="summary.total_submissions" />
				</div>
			</section>

			<section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
				<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
					<input
						v-model="filters.search"
						type="text"
						placeholder="Search tests"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
					/>
					<select
						v-model="filters.course_id"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
					>
						<option value="">All Courses</option>
						<option v-for="course in courses" :key="course.id" :value="String(course.id)">
							{{ course.title }}
						</option>
					</select>
					<select
						v-model="filters.week_id"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
					>
						<option value="">All Weeks</option>
						<option v-for="week in allWeeksOptions" :key="`${week.course_id}-${week.id}`" :value="String(week.id)">
							{{ week.course_title }} - Week {{ week.week_number }}
						</option>
					</select>
					<select
						v-model="filters.status"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
					>
						<option value="">All Status</option>
						<option value="active">Active</option>
						<option value="expired">Expired</option>
					</select>
					<div class="flex gap-2">
						<button
							type="button"
							@click="applyFilters"
							class="w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400"
						>
							Apply
						</button>
						<button
							type="button"
							@click="clearFilters"
							class="w-full rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							Clear
						</button>
					</div>
				</div>

				<p v-if="errorMessage" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
					{{ errorMessage }}
				</p>

				<div class="mt-5 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
							<thead class="bg-gray-50 dark:bg-gray-950/50">
								<tr>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Test</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Course/Week</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Due Date</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Questions</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Submissions</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actions</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
								<tr v-for="test in tests" :key="test.id">
									<td class="px-4 py-3 text-sm">
										<p class="font-semibold text-gray-900 dark:text-white">{{ test.title }}</p>
										<p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{{ test.description || 'No description' }}</p>
									</td>
									<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
										<p>{{ test.course_title || 'N/A' }}</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											{{ test.test_scope === 'full_length'
												? 'Full Length Test'
												: `Week ${test.week_number || '-'} - ${test.week_title || 'N/A'}` }}
										</p>
									</td>
									<td class="px-4 py-3 text-sm">
										<p class="text-gray-700 dark:text-gray-200">{{ formatDateRange(test.start_at, test.due_date) }}</p>
										<span class="mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusBadgeClass(test.due_status)">
											{{ test.due_status }}
										</span>
										<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ test.duration_minutes || 60 }} min</p>
									</td>
									<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{{ test.question_count }}</td>
									<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{{ test.submission_count }}</td>
									<td class="px-4 py-3 text-sm">
										<div class="flex flex-wrap gap-2">
											<button
												type="button"
												@click="manageQuestions(test.id)"
												class="rounded-xl bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400"
											>
												Questions
											</button>
											<button
												type="button"
												@click="viewResults(test.id)"
												class="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
											>
												Results
											</button>
											<button
												type="button"
												@click="openEditModal(test)"
												class="rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400"
											>
												Edit
											</button>
											<button
												type="button"
												@click="deleteTest(test)"
												class="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
								<tr v-if="!loading && tests.length === 0">
									<td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										No tests found.
									</td>
								</tr>
								<tr v-if="loading">
									<td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										Loading tests...
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
					<p class="text-sm text-gray-500 dark:text-gray-400">
						Page {{ pagination.current_page }} of {{ Math.max(1, pagination.pages) }}
					</p>
					<div class="flex items-center gap-2">
						<button
							type="button"
							@click="changePage(pagination.current_page - 1)"
							:disabled="!pagination.has_prev"
							class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							Prev
						</button>
						<button
							type="button"
							@click="changePage(pagination.current_page + 1)"
							:disabled="!pagination.has_next"
							class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							Next
						</button>
					</div>
				</div>
			</section>

			<div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:py-8">
				<div class="w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900">
					<div class="flex items-center justify-between gap-3">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white">
							{{ isEditMode ? 'Edit Test' : 'Create Test' }}
						</h2>
						<button
							type="button"
							@click="closeModal"
							class="rounded-xl bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							Close
						</button>
					</div>

					<div class="mt-4 max-h-[72vh] overflow-auto pr-1">
						<div class="min-w-160 grid gap-4 sm:grid-cols-2">
						<div class="space-y-1.5">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Test Scope</label>
							<select
								v-model="form.test_scope"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							>
								<option value="week">Week Wise</option>
								<option value="full_length">Full Length</option>
							</select>
						</div>

						<div class="space-y-1.5">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Course</label>
							<select
								v-model="form.course_id"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
								@change="onCourseChange"
								:disabled="isEditMode"
							>
								<option value="">Select course</option>
								<option v-for="course in courses" :key="course.id" :value="String(course.id)">{{ course.title }}</option>
							</select>
						</div>

						<div v-if="form.test_scope === 'week'" class="space-y-1.5">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Week</label>
							<select
								v-model="form.week_id"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							>
								<option value="">Select week</option>
								<option v-for="week in formWeeks" :key="week.id" :value="String(week.id)">
									Week {{ week.week_number }} - {{ week.title }}
								</option>
							</select>
						</div>

						<div class="space-y-1.5 sm:col-span-2">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Title</label>
							<input
								v-model="form.title"
								type="text"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							/>
						</div>

						<div class="space-y-1.5 sm:col-span-2">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Description</label>
							<textarea
								v-model="form.description"
								rows="4"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							></textarea>
						</div>

						<div class="space-y-1.5">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Start At</label>
							<input
								v-model="form.start_at"
								type="datetime-local"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							/>
						</div>

						<div class="space-y-1.5">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">End At</label>
							<input
								v-model="form.due_date"
								type="datetime-local"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							/>
						</div>

						<div class="space-y-1.5">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Duration (minutes)</label>
							<input
								v-model.number="form.duration_minutes"
								type="number"
								min="1"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							/>
						</div>

						<div class="space-y-1.5">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Max Attempts</label>
							<input
								v-model.number="form.max_attempts"
								type="number"
								min="1"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							/>
						</div>

						<div class="space-y-1.5 sm:col-span-2">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Access Passcode (optional)</label>
							<input
								v-model="form.passcode"
								type="text"
								placeholder="Leave blank for no passcode"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							/>
						</div>

						<div class="space-y-1.5 sm:col-span-2">
							<label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total Marks</label>
							<input
								v-model.number="form.total_marks"
								type="number"
								min="0"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							/>
						</div>

						<div class="sm:col-span-2 grid gap-2 sm:grid-cols-2">
							<label class="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm">
								<input v-model="form.shuffle_questions" type="checkbox" class="h-4 w-4" />
								Shuffle Questions
							</label>
							<label class="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm">
								<input v-model="form.shuffle_options" type="checkbox" class="h-4 w-4" />
								Shuffle Options
							</label>
							<label class="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm">
								<input v-model="form.require_fullscreen" type="checkbox" class="h-4 w-4" />
								Require Fullscreen
							</label>
							<label class="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm">
								<input v-model="form.prevent_tab_switch" type="checkbox" class="h-4 w-4" />
								Block Tab Switching
							</label>
						</div>
						</div>
					</div>

					<p v-if="modalError" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
						{{ modalError }}
					</p>

					<div class="mt-5 flex flex-wrap justify-end gap-2">
						<button
							type="button"
							@click="closeModal"
							class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							Cancel
						</button>
						<button
							type="button"
							@click="submitForm"
							:disabled="saving"
							class="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:hover:bg-amber-400"
						>
							{{ saving ? 'Saving...' : isEditMode ? 'Update Test' : 'Create Test' }}
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

const tests = ref([])
const loading = ref(false)
const saving = ref(false)
const errorMessage = ref('')
const modalError = ref('')

const summary = reactive({
	total_tests: 0,
	active_tests: 0,
	expired_tests: 0,
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
const editingTestId = ref(null)

const form = reactive({
	course_id: '',
	week_id: '',
	test_scope: 'week',
	title: '',
	description: '',
	start_at: '',
	due_date: '',
	total_marks: 0,
	duration_minutes: 60,
	max_attempts: 1,
	passcode: '',
	shuffle_questions: true,
	shuffle_options: true,
	require_fullscreen: true,
	prevent_tab_switch: true
})

const fetchCoursesAndWeeks = async () => {
	try {
		const { data } = await api.get('/api/admin/courses', { params: { page: 1, per_page: 200 } })
		courses.value = data?.courses || []

		const weekBucket = []
		for (const course of courses.value) {
			try {
				const res = await api.get(`/api/admin/courses/${course.id}/weeks`)
				const weeks = res.data || []
				for (const week of weeks) {
					weekBucket.push({
						id: week.id,
						week_number: week.week_number,
						title: week.title,
						course_id: course.id,
						course_title: course.title
					})
				}
			} catch {
				// Ignore week load errors per course to keep page usable.
			}
		}
		allWeeksOptions.value = weekBucket
	} catch {
		// Keep silent; test list page still works even if filter metadata fails.
	}
}

const fetchTests = async () => {
	loading.value = true
	errorMessage.value = ''

	try {
		const { data } = await api.get('/api/admin/tests', {
			params: {
				page: pagination.current_page,
				per_page: pagination.per_page,
				search: filters.search || undefined,
				course_id: filters.course_id || undefined,
				week_id: filters.week_id || undefined,
				status: filters.status || undefined
			}
		})

		tests.value = data?.tests || []
		Object.assign(pagination, data?.pagination || {})
		Object.assign(summary, data?.summary || {})
	} catch (error) {
		tests.value = []
		errorMessage.value = error.response?.data?.error || 'Could not load tests.'
	} finally {
		loading.value = false
	}
}

const applyFilters = () => {
	pagination.current_page = 1
	fetchTests()
}

const clearFilters = () => {
	filters.search = ''
	filters.course_id = ''
	filters.week_id = ''
	filters.status = ''
	pagination.current_page = 1
	fetchTests()
}

const changePage = (page) => {
	if (page < 1 || page > pagination.pages || page === pagination.current_page) return
	pagination.current_page = page
	fetchTests()
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

const manageQuestions = (testId) => {
	router.push(`/admin/tests/${testId}`)
}

const viewResults = (testId) => {
	router.push(`/admin/tests/${testId}/results`)
}

const resetForm = () => {
	form.course_id = ''
	form.week_id = ''
	form.test_scope = 'week'
	form.title = ''
	form.description = ''
	form.start_at = ''
	form.due_date = ''
	form.total_marks = 0
	form.duration_minutes = 60
	form.max_attempts = 1
	form.passcode = ''
	form.shuffle_questions = true
	form.shuffle_options = true
	form.require_fullscreen = true
	form.prevent_tab_switch = true
	formWeeks.value = []
	modalError.value = ''
	editingTestId.value = null
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

const openEditModal = (test) => {
	isEditMode.value = true
	editingTestId.value = test.id
	modalError.value = ''
	form.course_id = test.course_id ? String(test.course_id) : ''
	formWeeks.value = allWeeksOptions.value.filter((week) => String(week.course_id) === String(form.course_id))
	form.week_id = test.week_id ? String(test.week_id) : ''
	form.test_scope = test.test_scope || (test.week_id ? 'week' : 'full_length')
	form.title = test.title || ''
	form.description = test.description || ''
	form.start_at = test.start_at ? test.start_at.slice(0, 16) : ''
	form.due_date = test.due_date ? test.due_date.slice(0, 16) : ''
	form.total_marks = test.total_marks ?? test.total_points ?? 0
	form.duration_minutes = test.duration_minutes || 60
	form.max_attempts = test.max_attempts || 1
	form.passcode = ''
	form.shuffle_questions = test.shuffle_questions !== false
	form.shuffle_options = test.shuffle_options !== false
	form.require_fullscreen = test.require_fullscreen !== false
	form.prevent_tab_switch = test.prevent_tab_switch !== false
	showModal.value = true
}

const closeModal = () => {
	showModal.value = false
	resetForm()
}

const submitForm = async () => {
	modalError.value = ''

	if (!form.title) {
		modalError.value = 'Title is required.'
		return
	}

	if (form.test_scope === 'week' && !form.week_id) {
		modalError.value = 'Week is required for week-wise tests.'
		return
	}

	if (form.duration_minutes < 1) {
		modalError.value = 'Duration must be at least 1 minute.'
		return
	}

	saving.value = true

	try {
		if (isEditMode.value && editingTestId.value) {
			await api.put(`/api/admin/tests/${editingTestId.value}`, {
				course_id: form.course_id ? Number(form.course_id) : null,
				week_id: form.test_scope === 'week' ? Number(form.week_id) : null,
				test_scope: form.test_scope,
				title: form.title,
				description: form.description,
				start_at: form.start_at || null,
				due_date: form.due_date || null,
				total_marks: form.total_marks,
				duration_minutes: form.duration_minutes,
				max_attempts: form.max_attempts,
				passcode: form.passcode || null,
				shuffle_questions: form.shuffle_questions,
				shuffle_options: form.shuffle_options,
				require_fullscreen: form.require_fullscreen,
				prevent_tab_switch: form.prevent_tab_switch
			})
		} else {
			await api.post('/api/admin/tests', {
				course_id: form.course_id ? Number(form.course_id) : null,
				week_id: form.test_scope === 'week' ? Number(form.week_id) : null,
				test_scope: form.test_scope,
				title: form.title,
				description: form.description,
				start_at: form.start_at || null,
				due_date: form.due_date || null,
				total_marks: form.total_marks,
				duration_minutes: form.duration_minutes,
				max_attempts: form.max_attempts,
				passcode: form.passcode || null,
				shuffle_questions: form.shuffle_questions,
				shuffle_options: form.shuffle_options,
				require_fullscreen: form.require_fullscreen,
				prevent_tab_switch: form.prevent_tab_switch
			})
		}

		closeModal()
		fetchTests()
	} catch (error) {
		modalError.value = error.response?.data?.error || 'Could not save test.'
	} finally {
		saving.value = false
	}
}

const deleteTest = async (test) => {
	const ok = window.confirm(`Delete test \"${test.title}\"?`)
	if (!ok) return

	try {
		await api.delete(`/api/admin/tests/${test.id}`)
		fetchTests()
	} catch (error) {
		errorMessage.value = error.response?.data?.error || 'Could not delete test.'
	}
}

const formatDateRange = (startAt, endAt) => {
	const start = formatDate(startAt)
	const end = formatDate(endAt)

	if (!startAt && !endAt) return 'Open schedule'
	if (!startAt) return `Ends: ${end}`
	if (!endAt) return `Starts: ${start}`
	return `${start} -> ${end}`
}

const StatCard = defineComponent({
	name: 'StatCard',
	props: {
		title: { type: String, required: true },
		value: { type: [String, Number], default: 0 }
	},
	setup(props) {
		return () => h('div', { class: 'rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60' }, [
			h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.title),
			h('p', { class: 'mt-2 text-2xl font-bold text-gray-900 dark:text-white' }, String(props.value))
		])
	}
})

onMounted(async () => {
	await fetchCoursesAndWeeks()
	await fetchTests()
})
</script>