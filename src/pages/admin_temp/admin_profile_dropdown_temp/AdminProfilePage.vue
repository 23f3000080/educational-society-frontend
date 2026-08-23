<template>
	<section class="min-h-[calc(100vh-5rem)] bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
			<header class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
				<p class="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Admin Profile</p>
				<h1 class="text-2xl md:text-3xl font-bold mt-1">{{ profile.name }}</h1>
				<p class="text-sm text-slate-600 dark:text-slate-300 mt-2">{{ profile.email }}</p>
				<div class="mt-4 flex flex-wrap gap-2">
					<span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
						{{ profile.role }}
					</span>
					<span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
						Last Active: {{ lastActive }}
					</span>
				</div>
			</header>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<article
					v-for="card in metricCards"
					:key="card.label"
					class="rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 shadow-sm"
				>
					<p class="text-sm text-slate-500 dark:text-slate-400">{{ card.label }}</p>
					<p class="text-2xl font-bold mt-1">{{ card.value }}</p>
				</article>
			</div>

			<article class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
				<h2 class="text-lg font-semibold">Profile Details</h2>
				<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="text-slate-500 dark:text-slate-400">Full Name</p>
						<p class="font-medium mt-1">{{ profile.name }}</p>
					</div>
					<div>
						<p class="text-slate-500 dark:text-slate-400">Email</p>
						<p class="font-medium mt-1">{{ profile.email }}</p>
					</div>
					<div>
						<p class="text-slate-500 dark:text-slate-400">Role</p>
						<p class="font-medium mt-1">{{ profile.role }}</p>
					</div>
					<div>
						<p class="text-slate-500 dark:text-slate-400">Admin ID</p>
						<p class="font-medium mt-1">{{ profile.id }}</p>
					</div>
				</div>
			</article>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue'

const fallback = {
	id: 'N/A',
	name: 'Administrator',
	email: 'admin@educationalsociety.local',
	role: 'Admin'
}

const stored = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user')) || fallback

const profile = computed(() => ({
	id: stored.id || fallback.id,
	name: stored.full_name || stored.name || fallback.name,
	email: stored.email || fallback.email,
	role: stored.role || fallback.role
}))

const lastActive = computed(() => new Date().toLocaleString('en-IN', {
	dateStyle: 'medium',
	timeStyle: 'short'
}))

const metricCards = computed(() => [
	{ label: 'Assigned Role', value: profile.value.role },
	{ label: 'Access Scope', value: 'Full Admin' },
	{ label: 'Current Session', value: 'Active' }
])
</script>
