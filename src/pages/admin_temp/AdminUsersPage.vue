<template>
	<div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-3 py-4 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-emerald-950 dark:text-gray-100 sm:px-4 md:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl space-y-4 md:space-y-6">
			<!-- Header Section -->
			<section class="rounded-2xl md:rounded-3xl border border-emerald-100/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-900/50 dark:bg-gray-900/80 sm:p-5 md:p-6 lg:p-8">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div class="min-w-0 flex-1">
						<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 sm:text-xs">Admin Dashboard</p>
						<h1 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">Users Management</h1>
						<p class="mt-1.5 text-xs leading-5 text-gray-600 dark:text-gray-300 sm:text-sm md:mt-2 md:text-base">
							Manage users, track activity, and monitor verification status
						</p>
					</div>

					<div class="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
						<button
							type="button"
							@click="openCreateUserModal"
							class="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
							<span>Add User</span>
						</button>
						<button
							type="button"
							@click="fetchAllData"
							class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 dark:bg-emerald-500 dark:hover:bg-emerald-400"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							<span>Refresh</span>
						</button>
					</div>
				</div>

				<!-- Stats Grid -->
				<div class="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
					<div v-for="stat in statsCards" :key="stat.label" 
						class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-emerald-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">{{ stat.label }}</p>
							<span class="rounded-full p-1.5" :class="stat.iconBg">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.iconPath" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ stat.value }}</p>
					</div>
				</div>

				<!-- Live Stats -->
				<div class="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3 md:grid-cols-3">
					<div class="rounded-xl border border-emerald-200/50 bg-emerald-50/50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Online Now</p>
							<span class="relative flex h-3 w-3">
								<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
								<span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-emerald-700 dark:text-emerald-400 sm:text-2xl">{{ onlineUsersCount }}</p>
					</div>

					<div class="rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-blue-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Total Logins</p>
							<span class="rounded-full bg-blue-100/50 p-1.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ totalLogins }}</p>
					</div>

					<div class="rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-purple-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Avg Session</p>
							<span class="rounded-full bg-purple-100/50 p-1.5 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ averageSessionDuration }}</p>
					</div>
				</div>
			</section>

			<!-- Create User Modal -->
			<Teleport to="body">
				<Transition name="modal">
					<div
						v-if="showCreateUserModal"
						class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
						@click.self="closeCreateUserModal"
					>
						<div class="w-full max-w-xl rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/95 p-5 shadow-2xl backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/95 sm:p-6">
							<div class="flex items-start justify-between gap-4">
								<div>
									<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300 sm:text-xs">User Management</p>
									<h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">Create New User</h2>
									<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Add student or admin access from this panel.</p>
								</div>
								<button type="button" @click="closeCreateUserModal" class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							<form class="mt-5 space-y-4" @submit.prevent="submitCreateUser">
								<div class="grid gap-4 sm:grid-cols-2">
									<div class="sm:col-span-2">
										<label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Full Name</label>
										<input v-model="createUserForm.full_name" type="text" required class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
									</div>
									<div>
										<label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Email</label>
										<input v-model="createUserForm.email" type="email" required class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
									</div>
									<div>
										<label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Mobile (optional)</label>
										<input v-model="createUserForm.mobile_no" type="tel" class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
									</div>
									<div>
										<label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Role</label>
										<select v-model="createUserForm.role" class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900">
											<option value="user">Student</option>
											<option value="admin">Admin</option>
										</select>
									</div>
									<div>
										<label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Password</label>
										<input v-model="createUserForm.password" type="password" required minlength="6" class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
									</div>
									<div>
										<label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Confirm Password</label>
										<input v-model="createUserForm.confirm_password" type="password" required minlength="6" class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900" />
									</div>
								</div>

								<Transition name="fade">
									<p v-if="createUserError" class="rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
										{{ createUserError }}
									</p>
								</Transition>
								<Transition name="fade">
									<p v-if="createUserSuccess" class="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm font-semibold text-emerald-700 backdrop-blur-sm dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
										{{ createUserSuccess }}
									</p>
								</Transition>

								<div class="flex flex-wrap items-center justify-end gap-2 pt-1">
									<button
										type="button"
										@click="closeCreateUserModal"
										class="rounded-xl bg-gray-100/80 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
									>
										Cancel
									</button>
									<button
										type="submit"
										:disabled="creatingUser"
										class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
									>
										<svg v-if="creatingUser" class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span>{{ creatingUser ? 'Creating...' : 'Create User' }}</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</Transition>
			</Teleport>

			<!-- Users Table -->
			<section class="rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-5 md:p-6">
				<!-- Filters -->
				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<div class="relative">
						<input
							v-model="filters.search"
							type="text"
							placeholder="Search users..."
							class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 pl-9 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
						/>
						<svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
					<select
						v-model="filters.role"
						class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
					>
						<option value="">All Roles</option>
						<option value="user">Students</option>
						<option value="admin">Admins</option>
					</select>
					<select
						v-model="filters.email_verified"
						class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
					>
						<option value="">Email: All</option>
						<option value="true">Email Verified</option>
						<option value="false">Email Not Verified</option>
					</select>
					<select
						v-model="filters.mobile_verified"
						class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
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
						class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 dark:bg-emerald-500 dark:hover:bg-emerald-400"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
						</svg>
						Apply Filters
					</button>
					<button
						type="button"
						@click="clearFilters"
						class="inline-flex items-center gap-2 rounded-xl bg-gray-100/80 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
						Clear
					</button>
				</div>

				<Transition name="fade">
					<p v-if="errorMessage" class="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
						{{ errorMessage }}
					</p>
				</Transition>

				<!-- Users Table -->
				<div class="mt-5 overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-800/50">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
							<thead class="bg-gray-50/50 dark:bg-gray-950/50">
								<tr>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">User</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Contact</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Role</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Verification</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Enrollments</th>
									<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Action</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white/50 dark:divide-gray-800 dark:bg-gray-900/30">
								<tr
									v-for="user in users"
									:key="user.id"
									class="cursor-pointer transition hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30"
									@click="openUserDetails(user)"
								>
									<td class="px-4 py-3 text-sm">
										<div class="flex items-center gap-3">
											<span v-if="getUserOnlineStatus(user.id)" class="relative flex h-2.5 w-2.5 shrink-0">
												<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
												<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
											</span>
											<div>
												<p class="font-semibold text-gray-900 dark:text-white">{{ user.full_name || 'N/A' }}</p>
												<p class="text-xs text-gray-500 dark:text-gray-400">{{ user.user_id || '-' }}</p>
											</div>
										</div>
									</td>
									<td class="px-4 py-3 text-sm">
										<p class="text-gray-700 dark:text-gray-200">{{ user.email }}</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">{{ user.mobile_no || 'No mobile' }}</p>
									</td>
									<td class="px-4 py-3 text-sm">
										<span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="user.roles?.includes('admin') ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300' : 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300'">
											{{ user.roles?.join(', ') || 'user' }}
										</span>
									</td>
									<td class="px-4 py-3 text-sm">
										<div class="flex flex-col gap-1">
											<span class="text-xs" :class="user.is_email_verified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
												{{ user.is_email_verified ? '✓ Email' : '○ Email' }}
											</span>
											<span class="text-xs" :class="user.is_mobile_verified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
												{{ user.is_mobile_verified ? '✓ Mobile' : '○ Mobile' }}
											</span>
										</div>
									</td>
									<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
										{{ user.enrollments_count || 0 }}
									</td>
									<td class="px-4 py-3 text-sm">
										<button
											type="button"
											@click.stop="openUserDetails(user)"
											class="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 dark:bg-cyan-500 dark:hover:bg-cyan-400"
										>
											View Details
											<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
											</svg>
										</button>
									</td>
								</tr>
								<tr v-if="!loading && users.length === 0">
									<td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										No users found
									</td>
								</tr>
								<tr v-if="loading">
									<td colspan="6" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										<div class="flex items-center justify-center gap-3">
											<div class="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"></div>
											Loading users...
										</div>
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
						<span class="hidden sm:inline">({{ pagination.total }} total)</span>
					</p>
					<div class="flex items-center gap-2">
						<button
							type="button"
							@click="changePage(pagination.current_page - 1)"
							:disabled="!pagination.has_prev"
							class="inline-flex items-center gap-1.5 rounded-xl bg-gray-100/80 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
							<span class="hidden sm:inline">Prev</span>
						</button>
						<button
							type="button"
							@click="changePage(pagination.current_page + 1)"
							:disabled="!pagination.has_next"
							class="inline-flex items-center gap-1.5 rounded-xl bg-gray-100/80 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							<span class="hidden sm:inline">Next</span>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			</section>
		</div>

		<!-- User Details Slider -->
		<Teleport to="body">
			<Transition name="slide">
				<div v-if="showUserDetails && selectedUser" class="fixed inset-0 z-50 flex justify-end">
					<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeUserDetails"></div>
					
					<div class="relative h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl dark:bg-gray-900">
						<!-- Close Button -->
						<button 
							@click="closeUserDetails"
							class="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>

						<!-- User Header -->
						<div class="border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-6 dark:border-gray-800 dark:from-emerald-950/30 dark:to-cyan-950/30">
							<div class="flex items-start gap-4">
								<div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
									{{ getInitials(selectedUser.full_name) }}
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-3">
										<h2 class="truncate text-2xl font-bold text-gray-900 dark:text-white">{{ selectedUser.full_name || 'User' }}</h2>
										<span v-if="getUserOnlineStatus(selectedUser.id)" class="relative flex h-3 w-3 shrink-0">
											<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
											<span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
										</span>
									</div>
									<p class="text-sm text-gray-600 dark:text-gray-300">{{ selectedUser.email }}</p>
									<div class="mt-2 flex flex-wrap gap-2">
										<span class="rounded-full px-3 py-1 text-xs font-semibold" :class="selectedUser.roles?.includes('admin') ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300' : 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300'">
											{{ selectedUser.roles?.join(', ') || 'user' }}
										</span>
										<span class="rounded-full px-3 py-1 text-xs font-semibold" :class="selectedUser.active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'">
											{{ selectedUser.active ? 'Active' : 'Inactive' }}
										</span>
									</div>
								</div>
							</div>
						</div>

						<!-- Content -->
						<div class="p-6 space-y-6">
							<!-- Personal Information -->
							<div>
								<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Personal Information</h3>
								<div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<InfoField label="User ID" :value="selectedUser.user_id" />
									<InfoField label="Primary Mobile" :value="selectedUser.mobile_no" />
									<InfoField label="Alternate Mobile" :value="selectedUser.alternate_mobile_no" />
									<InfoField label="Gender" :value="selectedUser.gender" />
									<InfoField label="Date of Birth" :value="selectedUser.dob ? formatDate(selectedUser.dob) : 'N/A'" />
									<InfoField label="Joined On" :value="formatDate(selectedUser.joining_date)" />
								</div>
							</div>

							<!-- Location -->
							<div>
								<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Location</h3>
								<div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<InfoField label="Location" :value="locationText(selectedUser)" />
									<InfoField label="Mode of Communication" :value="selectedUser.mode_of_communication" />
								</div>
							</div>

							<!-- Parent Information -->
							<div>
								<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Parent Information</h3>
								<div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<InfoField label="Parent Name" :value="selectedUser.parent_name" />
									<InfoField label="Parent Relation" :value="selectedUser.parent_relation" />
								</div>
							</div>

							<!-- Verification Status -->
							<div>
								<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Verification Status</h3>
								<div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<div class="rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 dark:border-gray-800/50 dark:bg-gray-950/50">
										<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Email</p>
										<p class="mt-1 text-sm font-medium" :class="selectedUser.is_email_verified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
											{{ selectedUser.is_email_verified ? '✓ Verified' : '○ Pending' }}
										</p>
									</div>
									<div class="rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 dark:border-gray-800/50 dark:bg-gray-950/50">
										<p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Mobile</p>
										<p class="mt-1 text-sm font-medium" :class="selectedUser.is_mobile_verified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
											{{ selectedUser.is_mobile_verified ? '✓ Verified' : '○ Pending' }}
										</p>
									</div>
								</div>
							</div>

							<!-- Enrollments -->
							<div>
								<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Enrollments</h3>
								<div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<InfoField label="Total Enrollments" :value="String(selectedUser.enrollments_count || 0)" />
									<InfoField label="Active Enrollments" :value="String(selectedUser.active_enrollments_count || 0)" />
								</div>
							</div>

							<!-- Session Activity -->
							<div v-if="getUserActivity(selectedUser.id)">
								<h3 class="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Session Activity</h3>
								<div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<InfoField label="Session Duration" :value="getUserActivity(selectedUser.id).session_duration || 'N/A'" />
									<InfoField label="Login Count" :value="String(getUserActivity(selectedUser.id).login_count || 0)" />
									<InfoField label="Last Login" :value="getUserActivity(selectedUser.id).last_login ? formatDate(getUserActivity(selectedUser.id).last_login) : 'N/A'" />
									<InfoField label="Last Logout" :value="getUserActivity(selectedUser.id).last_logout ? formatDate(getUserActivity(selectedUser.id).last_logout) : 'N/A'" />
									<InfoField label="IP Address" :value="getUserActivity(selectedUser.id).ip_address || 'Unknown'" />
									<InfoField label="User Agent" :value="getUserActivity(selectedUser.id).user_agent || 'Unknown'" />
									<InfoField label="Last Seen" :value="getUserActivity(selectedUser.id).last_seen_at ? formatDate(getUserActivity(selectedUser.id).last_seen_at) : 'N/A'" />
									<InfoField label="Status" :value="getUserActivity(selectedUser.id).is_online ? 'Online' : 'Offline'" />
								</div>
							</div>
							<div v-else class="rounded-xl border border-dashed border-gray-300/50 bg-gray-50/50 p-4 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
								No activity data available for this user.
							</div>

							<!-- Action Buttons -->
							<div class="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
								<button
									@click="goToInsights"
									class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
								>
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
									User Insights
								</button>
								<button
									@click="closeUserDetails"
									class="inline-flex items-center gap-2 rounded-xl bg-gray-100/80 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
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
const showUserDetails = ref(false)
const showCreateUserModal = ref(false)
const creatingUser = ref(false)
const createUserError = ref('')
const createUserSuccess = ref('')

// Activity data store
const activityData = ref({})
const onlineUsersCount = ref(0)
const totalLogins = ref(0)
const averageSessionDuration = ref('N/A')

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

const statsCards = computed(() => [
	{ label: 'Total Users', value: summary.total_users, iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', iconBg: 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
	{ label: 'Students', value: summary.total_students, iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', iconBg: 'bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
	{ label: 'Admins', value: summary.total_admins, iconPath: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z', iconBg: 'bg-purple-100/50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
	{ label: 'Email Verified', value: summary.verified_emails, iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', iconBg: 'bg-green-100/50 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
	{ label: 'Mobile Verified', value: summary.verified_mobiles, iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', iconBg: 'bg-amber-100/50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' }
])

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
		Object.assign(pagination, data?.pagination || {})
		Object.assign(summary, data?.summary || {})
	} catch (error) {
		users.value = []
		errorMessage.value = error.response?.data?.error || 'Could not load users. Please try again.'
	} finally {
		loading.value = false
	}
}

const fetchActivityData = async () => {
	try {
		const { data } = await api.get('/api/students/activity')
		
		activityData.value = {}
		let totalLoginCount = 0
		let onlineCount = 0
		let totalSessionSeconds = 0
		let usersWithActivity = 0

		data.forEach(item => {
			activityData.value[item.user_id] = item
			if (item.is_online) onlineCount++
			totalLoginCount += item.login_count || 0
			
			if (item.session_duration) {
				const seconds = parseDurationToSeconds(item.session_duration)
				if (seconds > 0) {
					totalSessionSeconds += seconds
					usersWithActivity++
				}
			}
		})

		onlineUsersCount.value = onlineCount
		totalLogins.value = totalLoginCount

		if (usersWithActivity > 0) {
			const avgSeconds = Math.round(totalSessionSeconds / usersWithActivity)
			averageSessionDuration.value = formatDuration(avgSeconds)
		} else {
			averageSessionDuration.value = 'N/A'
		}
	} catch (error) {
		console.error('Failed to fetch activity data:', error)
	}
}

const parseDurationToSeconds = (durationStr) => {
	try {
		let totalSeconds = 0
		const hoursMatch = durationStr.match(/(\d+)h/)
		const minutesMatch = durationStr.match(/(\d+)m/)
		const secondsMatch = durationStr.match(/(\d+)s/)
		
		if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600
		if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60
		if (secondsMatch) totalSeconds += parseInt(secondsMatch[1])
		
		return totalSeconds
	} catch {
		return 0
	}
}

const formatDuration = (seconds) => {
	if (!seconds || seconds <= 0) return 'N/A'
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60

	if (hours > 0) return `${hours}h ${minutes}m ${secs}s`
	else if (minutes > 0) return `${minutes}m ${secs}s`
	else return `${secs}s`
}

const fetchAllData = async () => {
	await Promise.all([fetchUsers(), fetchActivityData()])
}

const getUserActivity = (userId) => {
	return activityData.value[userId] || null
}

const getUserOnlineStatus = (userId) => {
	const activity = getUserActivity(userId)
	return activity ? activity.is_online : false
}

const getInitials = (name) => {
	if (!name) return '?'
	return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
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

const openUserDetails = (user) => {
	selectedUser.value = user
	showUserDetails.value = true
	document.body.style.overflow = 'hidden'
}

const closeUserDetails = () => {
	showUserDetails.value = false
	document.body.style.overflow = ''
}

const goToInsights = () => {
	if (selectedUser.value) {
		closeUserDetails()
		router.push(`/admin/users/${selectedUser.value.id}/insights`)
	}
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

		await fetchAllData()
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
		return () => h('div', { class: 'rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 dark:border-gray-800/50 dark:bg-gray-950/50' }, [
			h('p', { class: 'text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.label),
			h('p', { class: 'mt-1 text-sm font-medium text-gray-900 dark:text-white break-words' }, props.value || 'N/A')
		])
	}
})

onMounted(() => {
	fetchAllData()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
	transition: all 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: scale(0.95) translateY(10px);
}

/* Slide transition for drawer */
.slide-enter-active,
.slide-leave-active {
	transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
	transform: translateX(100%);
	opacity: 0;
}
.slide-leave-to {
	transform: translateX(100%);
	opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
	transform: translateX(0);
	opacity: 1;
}
</style>