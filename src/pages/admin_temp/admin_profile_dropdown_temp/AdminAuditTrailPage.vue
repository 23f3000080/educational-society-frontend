<template>
	<section class="min-h-[calc(100vh-5rem)] bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
			<header class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
				<p class="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Audit Trail</p>
				<h1 class="text-2xl md:text-3xl font-bold mt-1">Administrative Change History</h1>
				<p class="text-sm text-slate-600 dark:text-slate-300 mt-2">Every critical configuration and content change appears here for accountability.</p>
			</header>

			<div class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 shadow-sm space-y-4">
				<div class="flex flex-wrap gap-2">
					<button
						v-for="type in filters"
						:key="type"
						@click="activeFilter = type"
						class="px-3 py-1.5 rounded-full text-sm border transition-colors"
						:class="activeFilter === type
							? 'bg-indigo-600 text-white border-indigo-600'
							: 'border-slate-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800'"
					>
						{{ type }}
					</button>
				</div>

				<ul class="space-y-3">
					<li
						v-for="item in filteredTrail"
						:key="item.id"
						class="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-800/30"
					>
						<div class="flex items-start justify-between gap-3">
							<div>
								<p class="font-semibold">{{ item.action }}</p>
								<p class="text-sm text-slate-600 dark:text-slate-300 mt-1">By {{ item.by }} in {{ item.module }}</p>
							</div>
							<span class="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ item.time }}</span>
						</div>
						<p class="text-sm mt-2 text-slate-700 dark:text-slate-300">{{ item.details }}</p>
					</li>
					<li v-if="!filteredTrail.length" class="text-sm text-slate-500 dark:text-slate-400 py-4">No records for selected filter.</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, ref } from 'vue'

const filters = ['All', 'Courses', 'Assignments', 'Users', 'Settings']
const activeFilter = ref('All')

const auditTrail = ref([
	{
		id: 1,
		module: 'Courses',
		action: 'Course pricing updated',
		by: 'Admin',
		time: '04 Apr 2026, 08:45 AM',
		details: 'Fee for Web Development Mastery changed from 2999 to 2499.'
	},
	{
		id: 2,
		module: 'Assignments',
		action: 'Bulk question import',
		by: 'Admin',
		time: '04 Apr 2026, 09:12 AM',
		details: '34 questions uploaded to Assignment 12.'
	},
	{
		id: 3,
		module: 'Users',
		action: 'Role escalation approved',
		by: 'Owner',
		time: '04 Apr 2026, 09:37 AM',
		details: 'User #88 promoted to moderator privileges.'
	},
	{
		id: 4,
		module: 'Settings',
		action: 'Notification policy changed',
		by: 'Admin',
		time: '04 Apr 2026, 10:01 AM',
		details: 'Auto-reminder window adjusted to 18 hours.'
	}
])

const filteredTrail = computed(() => {
	if (activeFilter.value === 'All') return auditTrail.value
	return auditTrail.value.filter((item) => item.module === activeFilter.value)
})
</script>
