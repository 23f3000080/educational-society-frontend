<template>
	<div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-3 py-4 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-emerald-950 dark:text-gray-100 sm:px-4 md:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl space-y-4 md:space-y-6">
			<!-- Header Section -->
			<section class="rounded-2xl md:rounded-3xl border border-emerald-100/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-900/50 dark:bg-gray-900/80 sm:p-5 md:p-6 lg:p-8">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div class="min-w-0 flex-1">
						<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 sm:text-xs">Admin Users</p>
						<h1 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">Users Management</h1>
						<p class="mt-1.5 text-xs leading-5 text-gray-600 dark:text-gray-300 sm:text-sm md:mt-2 md:text-base">
							View all users, inspect their profile details, and track verification and enrollment activity.
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
							@click="fetchUsers"
							class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 dark:bg-emerald-500 dark:hover:bg-emerald-400"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							<span>Refresh</span>
						</button>
					</div>
				</div>

				<!-- Stats Grid - Mobile Optimized -->
				<div class="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
					<div class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-emerald-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Total Users</p>
							<span class="rounded-full bg-emerald-100/50 p-1.5 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ summary.total_users }}</p>
					</div>

					<div class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-blue-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Students</p>
							<span class="rounded-full bg-blue-100/50 p-1.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ summary.total_students }}</p>
					</div>

					<div class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-purple-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Admins</p>
							<span class="rounded-full bg-purple-100/50 p-1.5 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ summary.total_admins }}</p>
					</div>

					<div class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-green-300 hover:bg-green-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-green-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Email Verified</p>
							<span class="rounded-full bg-green-100/50 p-1.5 text-green-600 dark:bg-green-900/30 dark:text-green-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ summary.verified_emails }}</p>
					</div>

					<div class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-amber-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">Mobile Verified</p>
							<span class="rounded-full bg-amber-100/50 p-1.5 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ summary.verified_mobiles }}</p>
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

			<!-- Main Content Section -->
			<section class="grid gap-4 md:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
				<!-- Users List -->
				<article class="rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-5 md:p-6">
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

					<!-- Mobile User Cards -->
					<div class="mt-5 grid gap-3 lg:hidden sm:gap-4">
						<article
							v-for="user in users"
							:key="`mobile-${user.id}`"
							class="group rounded-2xl border border-gray-200/50 bg-gray-50/50 p-4 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-emerald-800"
							@click="selectUser(user)"
						>
							<div class="flex items-start justify-between gap-3">
								<div class="min-w-0 flex-1">
									<p class="truncate text-base font-semibold text-gray-900 dark:text-white">{{ user.full_name || 'N/A' }}</p>
									<p class="text-xs text-gray-500 dark:text-gray-400">{{ user.user_id || '-' }}</p>
								</div>
								<span class="shrink-0 rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300 sm:text-[11px]">
									{{ user.roles?.join(', ') || 'user' }}
								</span>
							</div>

							<div class="mt-3 grid gap-1.5 text-sm text-gray-700 dark:text-gray-200">
								<p class="truncate"><span class="font-semibold">Email:</span> {{ user.email }}</p>
								<p class="truncate"><span class="font-semibold">Mobile:</span> {{ user.mobile_no || 'No mobile' }}</p>
								<p><span class="font-semibold">Enrollments:</span> {{ user.enrollments_count }}</p>
								<div class="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
									<span :class="user.is_email_verified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
										{{ user.is_email_verified ? '✓ Email verified' : '○ Email pending' }}
									</span>
									<span :class="user.is_mobile_verified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
										{{ user.is_mobile_verified ? '✓ Mobile verified' : '○ Mobile pending' }}
									</span>
								</div>
							</div>

							<div class="mt-4 flex items-center justify-between gap-2">
								<p class="text-xs text-gray-500 dark:text-gray-400">Joined {{ formatDate(user.joining_date) }}</p>
								<button
									type="button"
									@click.stop="openInsights(user.id)"
									class="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 dark:bg-cyan-500 dark:hover:bg-cyan-400 sm:px-4"
								>
									View
									<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</button>
							</div>
						</article>

						<div v-if="!loading && users.length === 0" class="rounded-2xl border border-dashed border-gray-300/50 bg-gray-50/50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
							No users found for the current filters.
						</div>
						<div v-if="loading" class="rounded-2xl border border-dashed border-gray-300/50 bg-gray-50/50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
							<div class="flex items-center justify-center gap-3">
								<div class="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"></div>
								Loading users...
							</div>
						</div>
					</div>

					<!-- Desktop Table -->
					<div class="mt-5 hidden overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-800/50 lg:block">
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
								<thead class="bg-gray-50/50 dark:bg-gray-950/50">
									<tr>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">User</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Contact</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Role</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Verification</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Enrollments</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Joined</th>
										<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Action</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 bg-white/50 dark:divide-gray-800 dark:bg-gray-900/30">
									<tr
										v-for="user in users"
										:key="user.id"
										class="cursor-pointer transition hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30"
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
											<div class="space-y-0.5">
												<p class="text-xs">{{ user.is_email_verified ? '✓ Email Verified' : '○ Email Pending' }}</p>
												<p class="text-xs">{{ user.is_mobile_verified ? '✓ Mobile Verified' : '○ Mobile Pending' }}</p>
											</div>
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
												class="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 dark:bg-cyan-500 dark:hover:bg-cyan-400"
											>
												View
												<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
												</svg>
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
				</article>

				<!-- User Details Sidebar -->
				<aside class="hidden rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-5 md:p-6 lg:block">
					<div v-if="selectedUser" class="space-y-4">
						<div class="border-b border-gray-200 pb-4 dark:border-gray-800">
							<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 sm:text-xs">User Details</p>
							<h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{ selectedUser.full_name || 'User' }}</h2>
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

					<div v-else class="rounded-2xl border border-dashed border-gray-300/50 bg-gray-50/50 px-4 py-12 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
						<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
						<p class="mt-3">Select a user row to view full details.</p>
					</div>
				</aside>
			</section>

			<!-- Mobile Details Drawer -->
			<Teleport to="body">
				<Transition name="drawer-slide">
					<div v-if="mobileDetailOpen && selectedUser" class="fixed inset-0 z-50 lg:hidden">
						<div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeMobileDetails"></div>
						<aside class="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-gray-200/50 bg-white/95 shadow-2xl backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/95 sm:max-w-md">
							<div class="flex items-start justify-between gap-4 border-b border-gray-200/50 px-4 py-4 dark:border-gray-800/50 sm:px-5 sm:py-5">
								<div class="min-w-0">
									<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 sm:text-xs">User Details</p>
									<h2 class="mt-1 truncate text-lg font-bold text-gray-900 dark:text-white sm:text-xl">{{ selectedUser.full_name || 'User' }}</h2>
									<p class="truncate text-sm text-gray-500 dark:text-gray-400">{{ selectedUser.email }}</p>
								</div>
								<button type="button" @click="closeMobileDetails" class="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							<div class="flex-1 overflow-y-auto p-4 sm:p-5">
								<div class="grid gap-3 sm:grid-cols-2">
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
						</aside>
					</div>
				</Transition>
			</Teleport>
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
const mobileDetailOpen = ref(false)
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
		if (users.value.length > 0 && !selectedUser.value) {
			selectedUser.value = users.value[0]
		}
		mobileDetailOpen.value = false

		Object.assign(pagination, data?.pagination || {})
		Object.assign(summary, data?.summary || {})
	} catch (error) {
		users.value = []
		selectedUser.value = null
		mobileDetailOpen.value = false
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
	mobileDetailOpen.value = true
}

const closeMobileDetails = () => {
	mobileDetailOpen.value = false
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
		return () => h('div', { class: 'rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 dark:border-gray-800/50 dark:bg-gray-950/50 sm:rounded-2xl' }, [
			h('p', { class: 'text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs' }, props.label),
			h('p', { class: 'mt-1 text-sm font-medium text-gray-900 dark:text-white break-words' }, props.value || 'N/A')
		])
	}
})

onMounted(() => {
	fetchUsers()
})
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

.modal-enter-active,
.modal-leave-active {
	transition: all 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: scale(0.95) translateY(10px);
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
	transition: opacity 200ms ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
	opacity: 0;
}
.drawer-slide-enter-active aside,
.drawer-slide-leave-active aside {
	transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.drawer-slide-enter-from aside,
.drawer-slide-leave-to aside {
	transform: translateX(100%);
}
</style>