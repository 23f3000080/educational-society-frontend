<template>
	<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-emerald-950 dark:text-gray-100 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl space-y-6">
			<section class="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-emerald-900 dark:bg-gray-900/80 sm:p-8">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Admin Users</p>
						<h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Users Management</h1>
						<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
							View all users, inspect their profile details, and track verification and enrollment activity.
						</p>
					</div>

					<div class="flex items-center gap-2">
						<button
							type="button"
							@click="openCreateUserModal"
							class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
						>
							Add User
						</button>
						<button
							type="button"
							@click="fetchUsers"
							class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
						>
							Refresh
						</button>
					</div>
				</div>

				<div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
					<div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
						<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total Users</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ summary.total_users }}</p>
					</div>
					<div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
						<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Students</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ summary.total_students }}</p>
					</div>
					<div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
						<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Admins</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ summary.total_admins }}</p>
					</div>
					<div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
						<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Email Verified</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ summary.verified_emails }}</p>
					</div>
					<div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
						<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Mobile Verified</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ summary.verified_mobiles }}</p>
					</div>
				</div>
			</section>

			<div
				v-if="showCreateUserModal"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
				@click.self="closeCreateUserModal"
			>
				<div class="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
					<div class="flex items-start justify-between gap-4">
						<div>
							<h2 class="text-xl font-bold text-gray-900 dark:text-white">Create New User</h2>
							<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Add student or admin access from this panel.</p>
						</div>
						<button type="button" @click="closeCreateUserModal" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">X</button>
					</div>

					<form class="mt-5 space-y-4" @submit.prevent="submitCreateUser">
						<div class="grid gap-4 sm:grid-cols-2">
							<div class="sm:col-span-2">
								<label class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">Full Name</label>
								<input v-model="createUserForm.full_name" type="text" required class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
							</div>
							<div>
								<label class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">Email</label>
								<input v-model="createUserForm.email" type="email" required class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
							</div>
							<div>
								<label class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">Mobile (optional)</label>
								<input v-model="createUserForm.mobile_no" type="tel" class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
							</div>
							<div>
								<label class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">Role</label>
								<select v-model="createUserForm.role" class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900">
									<option value="user">Student</option>
									<option value="admin">Admin</option>
								</select>
							</div>
							<div>
								<label class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">Password</label>
								<input v-model="createUserForm.password" type="password" required minlength="6" class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
							</div>
							<div>
								<label class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">Confirm Password</label>
								<input v-model="createUserForm.confirm_password" type="password" required minlength="6" class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
							</div>
						</div>

						<p v-if="createUserError" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
							{{ createUserError }}
						</p>
						<p v-if="createUserSuccess" class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
							{{ createUserSuccess }}
						</p>

						<div class="flex flex-wrap items-center justify-end gap-2 pt-1">
							<button
								type="button"
								@click="closeCreateUserModal"
								class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
							>
								Cancel
							</button>
							<button
								type="submit"
								:disabled="creatingUser"
								class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
							>
								{{ creatingUser ? 'Creating...' : 'Create User' }}
							</button>
						</div>
					</form>
				</div>
			</div>

			<section class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
				<article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
					<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
						<input
							v-model="filters.search"
							type="text"
							placeholder="Search name, email, user ID"
							class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
						/>
						<select
							v-model="filters.role"
							class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
						>
							<option value="">All Roles</option>
							<option value="user">Students</option>
							<option value="admin">Admins</option>
						</select>
						<select
							v-model="filters.email_verified"
							class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
						>
							<option value="">Email: All</option>
							<option value="true">Email Verified</option>
							<option value="false">Email Not Verified</option>
						</select>
						<select
							v-model="filters.mobile_verified"
							class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
						>
							<option value="">Mobile: All</option>
							<option value="true">Mobile Verified</option>
							<option value="false">Mobile Not Verified</option>
						</select>
					</div>

					<div class="mt-3 flex flex-wrap items-center gap-2">
						<button
							type="button"
							@click="applyFilters"
							class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
						>
							Apply Filters
						</button>
						<button
							type="button"
							@click="clearFilters"
							class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							Clear
						</button>
					</div>

					<p v-if="errorMessage" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
						{{ errorMessage }}
					</p>

					<div class="mt-5 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
								<thead class="bg-gray-50 dark:bg-gray-950/50">
									<tr>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">User</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Contact</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Role</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Verification</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Enrollments</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Joined</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Insights</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
									<tr
										v-for="user in users"
										:key="user.id"
										class="cursor-pointer transition hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
										@click="selectUser(user)"
									>
										<td class="px-4 py-3 text-sm">
											<p class="font-semibold text-gray-900 dark:text-white">{{ user.full_name || 'N/A' }}</p>
											<p class="text-xs text-gray-500 dark:text-gray-400">{{ user.user_id || '-' }}</p>
										</td>
										<td class="px-4 py-3 text-sm">
											<p class="text-gray-700 dark:text-gray-200">{{ user.email }}</p>
											<p class="text-xs text-gray-500 dark:text-gray-400">{{ user.mobile_no || 'No mobile' }}</p>
										</td>
										<td class="px-4 py-3 text-sm">
											<span class="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
												{{ user.roles?.join(', ') || 'user' }}
											</span>
										</td>
										<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
											<p>{{ user.is_email_verified ? 'Email: Verified' : 'Email: Pending' }}</p>
											<p>{{ user.is_mobile_verified ? 'Mobile: Verified' : 'Mobile: Pending' }}</p>
										</td>
										<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
											{{ user.enrollments_count }}
										</td>
										<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
											{{ formatDate(user.joining_date) }}
										</td>
										<td class="px-4 py-3 text-sm">
											<button
												type="button"
												@click.stop="openInsights(user.id)"
												class="rounded-xl bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400"
											>
												View
											</button>
										</td>
									</tr>
									<tr v-if="!loading && users.length === 0">
										<td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
											No users found for the current filters.
										</td>
									</tr>
									<tr v-if="loading">
										<td colspan="7" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
											Loading users...
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
				</article>

				<aside class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
					<div v-if="selectedUser" class="space-y-4">
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">User Details</p>
							<h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">{{ selectedUser.full_name || 'User' }}</h2>
							<p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedUser.email }}</p>
						</div>

						<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
							<InfoField label="User ID" :value="selectedUser.user_id" />
							<InfoField label="Role" :value="selectedUser.roles?.join(', ')" />
							<InfoField label="Primary Mobile" :value="selectedUser.mobile_no" />
							<InfoField label="Alternate Mobile" :value="selectedUser.alternate_mobile_no" />
							<InfoField label="Gender" :value="selectedUser.gender" />
							<InfoField label="Date of Birth" :value="selectedUser.dob ? formatDate(selectedUser.dob) : 'N/A'" />
							<InfoField label="Location" :value="locationText(selectedUser)" />
							<InfoField label="Parent Name" :value="selectedUser.parent_name" />
							<InfoField label="Parent Relation" :value="selectedUser.parent_relation" />
							<InfoField label="Mode Of Communication" :value="selectedUser.mode_of_communication" />
							<InfoField label="Joined On" :value="formatDate(selectedUser.joining_date)" />
							<InfoField label="Active Enrollments" :value="String(selectedUser.active_enrollments_count ?? 0)" />
						</div>
					</div>

					<div v-else class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">
						Select a user row to view full details.
					</div>
				</aside>
			</section>
		</div>
	</div>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'

const router = useRouter()

const users = ref([])
const loading = ref(false)
const errorMessage = ref('')
const selectedUser = ref(null)
const showCreateUserModal = ref(false)
const creatingUser = ref(false)
const createUserError = ref('')
const createUserSuccess = ref('')

const createUserForm = reactive({
	full_name: '',
	email: '',
	mobile_no: '',
	role: 'user',
	password: '',
	confirm_password: ''
})

const summary = reactive({
	total_users: 0,
	total_students: 0,
	total_admins: 0,
	verified_emails: 0,
	verified_mobiles: 0
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
	role: '',
	email_verified: '',
	mobile_verified: ''
})

const queryParams = computed(() => ({
	page: pagination.current_page,
	per_page: pagination.per_page,
	search: filters.search || undefined,
	role: filters.role || undefined,
	email_verified: filters.email_verified || undefined,
	mobile_verified: filters.mobile_verified || undefined
}))

const fetchUsers = async () => {
	loading.value = true
	errorMessage.value = ''

	try {
		const { data } = await api.get('/api/admin/users', { params: queryParams.value })

		users.value = data?.users || []
		selectedUser.value = users.value[0] || null

		Object.assign(pagination, data?.pagination || {})
		Object.assign(summary, data?.summary || {})
	} catch (error) {
		users.value = []
		selectedUser.value = null
		errorMessage.value = error.response?.data?.error || 'Could not load users. Please try again.'
	} finally {
		loading.value = false
	}
}

const applyFilters = () => {
	pagination.current_page = 1
	fetchUsers()
}

const clearFilters = () => {
	filters.search = ''
	filters.role = ''
	filters.email_verified = ''
	filters.mobile_verified = ''
	pagination.current_page = 1
	fetchUsers()
}

const changePage = (page) => {
	if (page < 1 || page > pagination.pages || page === pagination.current_page) return
	pagination.current_page = page
	fetchUsers()
}

const selectUser = (user) => {
	selectedUser.value = user
}

const openInsights = (userId) => {
	router.push(`/admin/users/${userId}/insights`)
}

const resetCreateUserForm = () => {
	createUserForm.full_name = ''
	createUserForm.email = ''
	createUserForm.mobile_no = ''
	createUserForm.role = 'user'
	createUserForm.password = ''
	createUserForm.confirm_password = ''
	createUserError.value = ''
	createUserSuccess.value = ''
}

const openCreateUserModal = () => {
	resetCreateUserForm()
	showCreateUserModal.value = true
}

const closeCreateUserModal = () => {
	showCreateUserModal.value = false
	createUserError.value = ''
}

const submitCreateUser = async () => {
	if (createUserForm.password !== createUserForm.confirm_password) {
		createUserError.value = 'Password and confirm password do not match.'
		return
	}

	creatingUser.value = true
	createUserError.value = ''
	createUserSuccess.value = ''

	try {
		const payload = {
			full_name: createUserForm.full_name,
			email: createUserForm.email,
			mobile_no: createUserForm.mobile_no || undefined,
			role: createUserForm.role,
			password: createUserForm.password,
			confirm_password: createUserForm.confirm_password
		}

		const { data } = await api.post('/api/admin/users', payload)
		createUserSuccess.value = data?.message || 'User created successfully.'

		await fetchUsers()
		setTimeout(() => {
			showCreateUserModal.value = false
			resetCreateUserForm()
		}, 700)
	} catch (error) {
		createUserError.value = error.response?.data?.error || 'Could not create user. Please try again.'
	} finally {
		creatingUser.value = false
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

const locationText = (user) => {
	const parts = [user.location, user.city, user.state, user.country].filter(Boolean)
	return parts.length ? parts.join(', ') : 'N/A'
}

const InfoField = defineComponent({
	name: 'InfoField',
	props: {
		label: { type: String, required: true },
		value: { type: String, default: 'N/A' }
	},
	setup(props) {
		return () => h('div', { class: 'rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950/60' }, [
			h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.label),
			h('p', { class: 'mt-1 text-sm font-medium text-gray-900 dark:text-white break-words' }, props.value || 'N/A')
		])
	}
})

onMounted(() => {
	fetchUsers()
})
</script>