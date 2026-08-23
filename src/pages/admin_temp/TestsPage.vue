<template>
	<div
		class="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 px-3 py-4 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-amber-950 dark:text-gray-100 sm:px-4 md:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl space-y-4 md:space-y-6">
			<!-- Header Section -->
			<section
				class="rounded-2xl md:rounded-3xl border border-amber-100/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-amber-900/50 dark:bg-gray-900/80 sm:p-5 md:p-6 lg:p-8">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div class="min-w-0 flex-1">
						<p
							class="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300 sm:text-xs">
							Admin Tests</p>
						<h1 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">Tests
							Management</h1>
						<p
							class="mt-1.5 text-xs leading-5 text-gray-600 dark:text-gray-300 sm:text-sm md:mt-2 md:text-base">
							Create, edit, and monitor tests across courses and weeks.
						</p>
					</div>

					<div class="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
						<button type="button" @click="openCreateModal"
							class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 dark:bg-amber-500 dark:hover:bg-amber-400">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 4v16m8-8H4" />
							</svg>
							<span>New Test</span>
						</button>
						<button type="button" @click="fetchTests"
							class="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100/80 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
							:disabled="loading">
							<svg class="h-4 w-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							<span>Refresh</span>
						</button>
					</div>
				</div>

				<!-- Stats Grid -->
				<div class="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 md:grid-cols-4">
					<div
						class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-amber-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p
								class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
								Total Tests</p>
							<span
								class="rounded-full bg-amber-100/50 p-1.5 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{
							summary.total_tests }}</p>
					</div>

					<div
						class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-emerald-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p
								class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
								Active</p>
							<span
								class="rounded-full bg-emerald-100/50 p-1.5 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{
							summary.active_tests }}</p>
					</div>

					<div
						class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-rose-300 hover:bg-rose-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-rose-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p
								class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
								Expired</p>
							<span
								class="rounded-full bg-rose-100/50 p-1.5 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{
							summary.expired_tests }}</p>
					</div>

					<div
						class="group rounded-xl border border-gray-200/50 bg-gray-50/50 p-3 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-blue-800 sm:rounded-2xl sm:p-4">
						<div class="flex items-center justify-between">
							<p
								class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
								Submissions</p>
							<span
								class="rounded-full bg-blue-100/50 p-1.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
								<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor"
									viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
						</div>
						<p class="mt-1.5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{{
							summary.total_submissions }}</p>
					</div>
				</div>
			</section>

			<!-- Filters and Table Section -->
			<section
				class="rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-4 md:p-5 lg:p-6">
				<!-- Filters -->
				<div class="grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-5">
					<div class="relative">
						<input v-model="filters.search" type="text" placeholder="Search tests..."
							class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 pl-9 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
							@keyup.enter="applyFilters" />
						<svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none"
							stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
					<select v-model="filters.course_id"
						class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
						<option value="">All Courses</option>
						<option v-for="course in courses" :key="course.id" :value="String(course.id)">
							{{ course.title }}
						</option>
					</select>
					<select v-model="filters.week_id"
						class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
						<option value="">All Weeks</option>
						<option v-for="week in allWeeksOptions" :key="`${week.course_id}-${week.id}`"
							:value="String(week.id)">
							{{ week.course_title }} - Week {{ week.week_number }}
						</option>
					</select>
					<select v-model="filters.status"
						class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
						<option value="">All Status</option>
						<option value="active">Active</option>
						<option value="expired">Expired</option>
					</select>
					<div class="flex gap-2">
						<button type="button" @click="applyFilters"
							class="flex-1 rounded-xl bg-amber-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 dark:bg-amber-500 dark:hover:bg-amber-400">
							Apply
						</button>
						<button type="button" @click="clearFilters"
							class="flex-1 rounded-xl bg-gray-100/80 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
							Clear
						</button>
					</div>
				</div>

				<Transition name="fade">
					<p v-if="errorMessage"
						class="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
						{{ errorMessage }}
					</p>
				</Transition>

				<!-- Mobile Cards -->
				<div class="mt-4 grid gap-3 lg:hidden sm:mt-5 sm:gap-4">
					<article v-for="test in tests" :key="`mobile-${test.id}`"
						class="group rounded-2xl border border-gray-200/50 bg-gray-50/50 p-4 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-amber-800">
						<div class="flex items-start justify-between gap-3">
							<div class="min-w-0 flex-1">
								<p class="truncate text-base font-semibold text-gray-900 dark:text-white">{{ test.title
									}}</p>
								<p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{{ test.description ||
									'No description' }}</p>
							</div>
							<span class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold"
								:class="statusBadgeClass(test.due_status)">
								{{ test.due_status }}
							</span>
						</div>

						<div class="mt-3 grid gap-1.5 text-sm text-gray-700 dark:text-gray-200">
							<p><span class="font-semibold">Course:</span> {{ test.course_title || 'N/A' }}</p>
							<p><span class="font-semibold">Week:</span> {{ test.test_scope === 'full_length' ? 'Full Length' : `Week ${test.week_number || ' - '}` }}</p>
							<p><span class="font-semibold">Duration:</span> {{ test.duration_minutes || 60 }} min</p>
							<p><span class="font-semibold">Questions:</span> {{ test.question_count }}</p>
							<p><span class="font-semibold">Submissions:</span> {{ test.submission_count }}</p>
							<p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDateRange(test.start_at,
								test.due_date) }}</p>
						</div>

						<div class="mt-4 flex flex-wrap gap-2">
							<button type="button" @click="manageQuestions(test.id)"
								class="inline-flex items-center gap-1 rounded-xl bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 dark:bg-cyan-500 dark:hover:bg-cyan-400">
								<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Questions
							</button>
							<button type="button" @click="viewResults(test.id)"
								class="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 dark:bg-emerald-500 dark:hover:bg-emerald-400">
								<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
								Results
							</button>
							<button type="button" @click="openEditModal(test)"
								class="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 dark:bg-amber-500 dark:hover:bg-amber-400">
								<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								Edit
							</button>
							<button type="button" @click="deleteTest(test)"
								class="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/25 active:scale-95 dark:bg-rose-500 dark:hover:bg-rose-400">
								<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
								Delete
							</button>
						</div>
					</article>

					<div v-if="!loading && tests.length === 0"
						class="rounded-2xl border border-dashed border-gray-300/50 bg-gray-50/50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
						No tests found.
					</div>
					<div v-if="loading"
						class="rounded-2xl border border-dashed border-gray-300/50 bg-gray-50/50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
						<div class="flex items-center justify-center gap-3">
							<div
								class="h-4 w-4 animate-spin rounded-full border-2 border-amber-600 border-t-transparent">
							</div>
							Loading tests...
						</div>
					</div>
				</div>

				<!-- Desktop Table -->
				<div
					class="mt-4 hidden overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-800/50 lg:block sm:mt-5">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
							<thead class="bg-gray-50/50 dark:bg-gray-950/50">
								<tr>
									<th
										class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Test</th>
									<th
										class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Course/Week</th>
									<th
										class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Due Date</th>
									<th
										class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Questions</th>
									<th
										class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Submissions</th>
									<th
										class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										Actions</th>
								</tr>
							</thead>
							<tbody
								class="divide-y divide-gray-200 bg-white/50 dark:divide-gray-800 dark:bg-gray-900/30">
								<tr v-for="test in tests" :key="test.id"
									class="transition hover:bg-amber-50/50 dark:hover:bg-amber-950/30">
									<td class="px-4 py-3 text-sm">
										<p class="font-semibold text-gray-900 dark:text-white">{{ test.title }}</p>
										<p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{{
											test.description || 'No description' }}</p>
									</td>
									<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
										<p>{{ test.course_title || 'N/A' }}</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											{{ test.test_scope === 'full_length' ? 'Full Length Test' : `Week ${test.week_number || '-'}` }}
										</p>
									</td>
									<td class="px-4 py-3 text-sm">
										<p class="text-gray-700 dark:text-gray-200">{{ formatDateRange(test.start_at,
											test.due_date) }}</p>
										<span class="mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
											:class="statusBadgeClass(test.due_status)">
											{{ test.due_status }}
										</span>
										<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{
											test.duration_minutes || 60 }} min</p>
									</td>
									<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{{
										test.question_count }}</td>
									<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{{
										test.submission_count }}</td>
									<td class="px-4 py-3 text-sm">
										<div class="flex flex-wrap gap-1.5">
											<button type="button" @click="manageQuestions(test.id)"
												class="inline-flex items-center gap-1 rounded-xl bg-cyan-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 dark:bg-cyan-500 dark:hover:bg-cyan-400">
												<svg class="h-3 w-3" fill="none" stroke="currentColor"
													viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round"
														stroke-width="2"
														d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
												<span>Questions</span>
											</button>
											<button type="button" @click="viewResults(test.id)"
												class="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 dark:bg-emerald-500 dark:hover:bg-emerald-400">
												<svg class="h-3 w-3" fill="none" stroke="currentColor"
													viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round"
														stroke-width="2"
														d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
												</svg>
												<span>Results</span>
											</button>
											<button type="button" @click="openEditModal(test)"
												class="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 dark:bg-amber-500 dark:hover:bg-amber-400">
												<svg class="h-3 w-3" fill="none" stroke="currentColor"
													viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round"
														stroke-width="2"
														d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
												</svg>
												<span>Edit</span>
											</button>
											<button type="button" @click="deleteTest(test)"
												class="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/25 active:scale-95 dark:bg-rose-500 dark:hover:bg-rose-400">
												<svg class="h-3 w-3" fill="none" stroke="currentColor"
													viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round"
														stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
												</svg>
												<span>Delete</span>
											</button>
										</div>
									</td>
								</tr>
								<tr v-if="!loading && tests.length === 0">
									<td colspan="6"
										class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										No tests found.
									</td>
								</tr>
								<tr v-if="loading">
									<td colspan="6"
										class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
										<div class="flex items-center justify-center gap-3">
											<div
												class="h-4 w-4 animate-spin rounded-full border-2 border-amber-600 border-t-transparent">
											</div>
											Loading tests...
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
						<button type="button" @click="changePage(pagination.current_page - 1)"
							:disabled="!pagination.has_prev || loading"
							class="inline-flex items-center gap-1.5 rounded-xl bg-gray-100/80 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M15 19l-7-7 7-7" />
							</svg>
							<span class="hidden sm:inline">Prev</span>
						</button>
						<button type="button" @click="changePage(pagination.current_page + 1)"
							:disabled="!pagination.has_next || loading"
							class="inline-flex items-center gap-1.5 rounded-xl bg-gray-100/80 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
							<span class="hidden sm:inline">Next</span>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			</section>

			<!-- Create/Edit Modal -->
			<Teleport to="body">
				<Transition name="modal">
					<div v-if="showModal"
						class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm sm:py-8">
						<div
							class="w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/95 p-4 shadow-2xl backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/95 sm:p-5 md:p-6">
							<div class="flex items-start justify-between gap-4">
								<div>
									<p
										class="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300 sm:text-xs">
										Test Management</p>
									<h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
										{{ isEditMode ? 'Edit Test' : 'Create Test' }}
									</h2>
								</div>
								<button type="button" @click="closeModal"
									class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							<div class="mt-4 max-h-[72vh] overflow-y-auto pr-1">
								<div class="grid gap-4 sm:grid-cols-2">
									<div class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Test
											Scope</label>
										<select v-model="form.test_scope"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
											<option value="week">Week Wise</option>
											<option value="full_length">Full Length</option>
										</select>
									</div>

									<div class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Course</label>
										<select v-model="form.course_id"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
											@change="onCourseChange" :disabled="isEditMode">
											<option value="">Select course</option>
											<option v-for="course in courses" :key="course.id"
												:value="String(course.id)">{{ course.title }}</option>
										</select>
									</div>

									<div v-if="form.test_scope === 'week'" class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Week</label>
										<select v-model="form.week_id"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900">
											<option value="">Select week</option>
											<option v-for="week in formWeeks" :key="week.id" :value="String(week.id)">
												Week {{ week.week_number }} - {{ week.title }}
											</option>
										</select>
									</div>

									<div class="sm:col-span-2 space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Title</label>
										<input v-model="form.title" type="text"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
									</div>

									<div class="sm:col-span-2 space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Description</label>
										<textarea v-model="form.description" rows="3"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"></textarea>
									</div>

									<div class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Start
											At</label>
										<input v-model="form.start_at" type="datetime-local"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
									</div>

									<div class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">End
											At</label>
										<input v-model="form.due_date" type="datetime-local"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
									</div>

									<div class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Duration
											(min)</label>
										<input v-model.number="form.duration_minutes" type="number" min="1"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
									</div>

									<div class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Max
											Attempts</label>
										<input v-model.number="form.max_attempts" type="number" min="1"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
									</div>

									<div class="sm:col-span-2 space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Access
											Passcode (optional)</label>
										<input v-model="form.passcode" type="text"
											placeholder="Leave blank for no passcode"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
									</div>

									<div class="space-y-1.5">
										<label
											class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total
											Marks</label>
										<input v-model.number="form.total_marks" type="number" min="0"
											class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900" />
									</div>

									<div class="sm:col-span-2 grid gap-2 sm:grid-cols-2">
										<label
											class="flex items-center gap-2 rounded-xl border border-gray-200/50 px-3 py-2.5 text-sm text-gray-700 cursor-pointer transition hover:bg-gray-50/50 dark:border-gray-800/50 dark:text-gray-100 dark:hover:bg-gray-800/50">
											<input v-model="form.shuffle_questions" type="checkbox"
												class="h-4 w-4 rounded accent-amber-600 dark:accent-amber-400" />
											Shuffle Questions
										</label>
										<label
											class="flex items-center gap-2 rounded-xl border border-gray-200/50 px-3 py-2.5 text-sm text-gray-700 cursor-pointer transition hover:bg-gray-50/50 dark:border-gray-800/50 dark:text-gray-100 dark:hover:bg-gray-800/50">
											<input v-model="form.shuffle_options" type="checkbox"
												class="h-4 w-4 rounded accent-amber-600 dark:accent-amber-400" />
											Shuffle Options
										</label>
										<label
											class="flex items-center gap-2 rounded-xl border border-gray-200/50 px-3 py-2.5 text-sm text-gray-700 cursor-pointer transition hover:bg-gray-50/50 dark:border-gray-800/50 dark:text-gray-100 dark:hover:bg-gray-800/50">
											<input v-model="form.require_fullscreen" type="checkbox"
												class="h-4 w-4 rounded accent-amber-600 dark:accent-amber-400" />
											Require Fullscreen
										</label>
										<label
											class="flex items-center gap-2 rounded-xl border border-gray-200/50 px-3 py-2.5 text-sm text-gray-700 cursor-pointer transition hover:bg-gray-50/50 dark:border-gray-800/50 dark:text-gray-100 dark:hover:bg-gray-800/50">
											<input v-model="form.prevent_tab_switch" type="checkbox"
												class="h-4 w-4 rounded accent-amber-600 dark:accent-amber-400" />
											Block Tab Switching
										</label>
									</div>
								</div>
							</div>

							<Transition name="fade">
								<p v-if="modalError"
									class="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
									{{ modalError }}
								</p>
							</Transition>

							<div class="mt-5 flex flex-wrap justify-end gap-2">
								<button type="button" @click="closeModal"
									class="rounded-xl bg-gray-100/80 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
									Cancel
								</button>
								<button type="button" @click="submitForm" :disabled="saving"
									class="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:hover:bg-amber-400">
									<svg v-if="saving" class="h-4 w-4 animate-spin" fill="none" stroke="currentColor"
										viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
											stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
										</path>
									</svg>
									<span>{{ saving ? 'Saving...' : isEditMode ? 'Update Test' : 'Create Test' }}</span>
								</button>
							</div>
						</div>
					</div>
				</Transition>
			</Teleport>
		</div>
	</div>
</template>

<script setup>
import { defineComponent, h, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios'

const router = useRouter()

// Data
const tests = ref([])
const loading = ref(false)
const saving = ref(false)
const errorMessage = ref('')
const modalError = ref('')
const isInitialLoad = ref(true)

// Summary
const summary = reactive({
	total_tests: 0,
	active_tests: 0,
	expired_tests: 0,
	total_submissions: 0
})

// Pagination
const pagination = reactive({
	total: 0,
	pages: 1,
	current_page: 1,
	per_page: 10,
	has_next: false,
	has_prev: false
})

// Filters
const filters = reactive({
	search: '',
	course_id: '',
	week_id: '',
	status: ''
})

// Course/Week data
const courses = ref([])
const allWeeksOptions = ref([])
const formWeeks = ref([])

// Modal state
const showModal = ref(false)
const isEditMode = ref(false)
const editingTestId = ref(null)

// Form
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

const silentRequestMeta = { meta: { skipGlobalLoader: true } }

// Fetch courses and weeks (only once)
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
				// Ignore week load errors
				return []
			}
		})
		const weekResults = await Promise.all(weekRequests)
		for (const weeks of weekResults) {
			weekBucket.push(...weeks)
		}
		allWeeksOptions.value = weekBucket
	} catch (error) {
		console.error('Failed to load courses:', error)
	}
}

// Fetch tests with debounce
const fetchTests = async () => {
	if (loading.value) return

	loading.value = true
	errorMessage.value = ''

	try {
		const { data } = await api.get('/api/admin/tests', {
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

		tests.value = data?.tests || []
		Object.assign(pagination, data?.pagination || {})
		Object.assign(summary, data?.summary || {})
	} catch (error) {
		tests.value = []
		errorMessage.value = error.response?.data?.error || 'Could not load tests.'
	} finally {
		loading.value = false
		isInitialLoad.value = false
	}
}

// Debounced search
let searchTimeout = null
watch(() => filters.search, () => {
	clearTimeout(searchTimeout)
	searchTimeout = setTimeout(() => {
		if (!isInitialLoad.value) {
			pagination.current_page = 1
			fetchTests()
		}
	}, 500)
})

// Apply filters
const applyFilters = () => {
	pagination.current_page = 1
	fetchTests()
}

// Clear filters
const clearFilters = () => {
	filters.search = ''
	filters.course_id = ''
	filters.week_id = ''
	filters.status = ''
	pagination.current_page = 1
	fetchTests()
}

// Change page
const changePage = (page) => {
	if (page < 1 || page > pagination.pages || page === pagination.current_page || loading.value) return
	pagination.current_page = page
	fetchTests()
}

// Status badge class
const statusBadgeClass = (status) => {
	const classes = {
		active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
		expired: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
	}
	return classes[status] || 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
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

// Format date range
const formatDateRange = (startAt, endAt) => {
	const start = formatDate(startAt)
	const end = formatDate(endAt)

	if (!startAt && !endAt) return 'Open schedule'
	if (!startAt) return `Ends: ${end}`
	if (!endAt) return `Starts: ${start}`
	return `${start} → ${end}`
}

// Navigation
const manageQuestions = (testId) => {
	router.push(`/admin/tests/${testId}`)
}

const viewResults = (testId) => {
	router.push(`/admin/tests/${testId}/results`)
}

// Modal functions
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
	formWeeks.value = allWeeksOptions.value.filter(
		(week) => String(week.course_id) === String(form.course_id)
	)
}

const openEditModal = (test) => {
	isEditMode.value = true
	editingTestId.value = test.id
	modalError.value = ''

	form.course_id = test.course_id ? String(test.course_id) : ''
	formWeeks.value = allWeeksOptions.value.filter(
		(week) => String(week.course_id) === String(form.course_id)
	)
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

// Submit form
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
		const payload = {
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
		}

		if (isEditMode.value && editingTestId.value) {
			await api.put(`/api/admin/tests/${editingTestId.value}`, payload, silentRequestMeta)
		} else {
			await api.post('/api/admin/tests', payload, silentRequestMeta)
		}

		closeModal()
		await fetchTests()
	} catch (error) {
		modalError.value = error.response?.data?.error || 'Could not save test.'
	} finally {
		saving.value = false
	}
}

// Delete test
const deleteTest = async (test) => {
	const ok = window.confirm(`Delete test "${test.title}"? This action cannot be undone.`)
	if (!ok) return

	try {
		await api.delete(`/api/admin/tests/${test.id}`, silentRequestMeta)
		await fetchTests()
	} catch (error) {
		errorMessage.value = error.response?.data?.error || 'Could not delete test.'
	}
}

// Stat Card Component
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

// Lifecycle
onMounted(async () => {
	await Promise.all([fetchCoursesAndWeeks(), fetchTests()])
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

/* Custom scrollbar */
::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: #94a3b8;
	border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
	background: #64748b;
}

.dark ::-webkit-scrollbar-thumb {
	background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
	background: #64748b;
}
</style>