<template>
	<section class="min-h-[calc(100vh-5rem)] bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
			<header class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
				<p class="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">System Logs</p>
				<h1 class="text-2xl md:text-3xl font-bold mt-1">Platform Activity Logs</h1>
				<p class="text-sm text-slate-600 dark:text-slate-300 mt-2">Track important backend and admin actions from one place.</p>
			</header>

			<div class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 shadow-sm">
				<input
					v-model.trim="search"
					type="text"
					placeholder="Search logs by action, module, or level"
					class="w-full rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
				/>

				<div class="overflow-x-auto mt-4">
					<table class="w-full text-sm">
						<thead>
							<tr class="text-left border-b border-slate-200 dark:border-gray-800">
								<th class="py-2 pr-3">Time</th>
								<th class="py-2 pr-3">Level</th>
								<th class="py-2 pr-3">Module</th>
								<th class="py-2">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="log in filteredLogs" :key="log.id" class="border-b border-slate-100 dark:border-gray-800/60">
								<td class="py-3 pr-3 whitespace-nowrap">{{ log.time }}</td>
								<td class="py-3 pr-3">
									<span class="px-2 py-0.5 rounded-full text-xs font-semibold" :class="levelClass(log.level)">{{ log.level }}</span>
								</td>
								<td class="py-3 pr-3">{{ log.module }}</td>
								<td class="py-3">{{ log.action }}</td>
							</tr>
							<tr v-if="!filteredLogs.length">
								<td colspan="4" class="py-6 text-center text-slate-500 dark:text-slate-400">No logs match your search.</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, ref } from 'vue'

const search = ref('')

const logs = ref([
	{ id: 1, time: '04 Apr 2026, 09:10 AM', level: 'INFO', module: 'Auth', action: 'Admin login successful' },
	{ id: 2, time: '04 Apr 2026, 09:28 AM', level: 'INFO', module: 'Notifications', action: 'Broadcast sent to 42 students' },
	{ id: 3, time: '04 Apr 2026, 10:02 AM', level: 'WARN', module: 'Queries', action: '8 unresolved queries older than 24h' },
	{ id: 4, time: '04 Apr 2026, 10:14 AM', level: 'ERROR', module: 'Uploads', action: 'File upload rejected: invalid format' },
	{ id: 5, time: '04 Apr 2026, 10:32 AM', level: 'INFO', module: 'Courses', action: 'New course updated by admin' }
])

const filteredLogs = computed(() => {
	if (!search.value) return logs.value
	const q = search.value.toLowerCase()
	return logs.value.filter((log) =>
		[log.level, log.module, log.action, log.time].join(' ').toLowerCase().includes(q)
	)
})

const levelClass = (level) => {
	if (level === 'ERROR') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
	if (level === 'WARN') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
	return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
}
</script>
