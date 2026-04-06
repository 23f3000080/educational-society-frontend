<template>
	<section class="min-h-[calc(100vh-5rem)] bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
			<header class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
				<p class="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Admin Settings</p>
				<h1 class="text-2xl md:text-3xl font-bold mt-1">Workspace Preferences</h1>
				<p class="text-sm text-slate-600 dark:text-slate-300 mt-2">These settings are saved in your browser for faster admin workflow.</p>
			</header>

			<article class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
				<label class="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-gray-800">
					<div>
						<p class="font-semibold">Email Alerts</p>
						<p class="text-sm text-slate-500 dark:text-slate-400">Receive urgent alerts for unresolved student queries.</p>
					</div>
					<input v-model="settings.emailAlerts" type="checkbox" class="h-5 w-5" />
				</label>

				<label class="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-gray-800">
					<div>
						<p class="font-semibold">Show Query Priority Badge</p>
						<p class="text-sm text-slate-500 dark:text-slate-400">Highlight pending and overdue queries in list views.</p>
					</div>
					<input v-model="settings.priorityBadge" type="checkbox" class="h-5 w-5" />
				</label>

				<label class="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-gray-800">
					<div>
						<p class="font-semibold">Compact Tables</p>
						<p class="text-sm text-slate-500 dark:text-slate-400">Use condensed table rows for dense operational screens.</p>
					</div>
					<input v-model="settings.compactMode" type="checkbox" class="h-5 w-5" />
				</label>

				<div class="pt-2 flex flex-wrap gap-3">
					<button @click="saveSettings" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
						Save Settings
					</button>
					<button @click="resetSettings" class="px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors">
						Reset
					</button>
					<p v-if="saved" class="text-sm text-emerald-600 dark:text-emerald-400 self-center">Settings saved.</p>
				</div>
			</article>
		</div>
	</section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const defaultSettings = {
	emailAlerts: true,
	priorityBadge: true,
	compactMode: false
}

const savedSettings = JSON.parse(localStorage.getItem('adminSettings') || 'null')
const settings = reactive(savedSettings || defaultSettings)
const saved = ref(false)

const saveSettings = () => {
	localStorage.setItem('adminSettings', JSON.stringify(settings))
	saved.value = true
	setTimeout(() => {
		saved.value = false
	}, 1500)
}

const resetSettings = () => {
	Object.assign(settings, defaultSettings)
	localStorage.setItem('adminSettings', JSON.stringify(settings))
	saved.value = true
	setTimeout(() => {
		saved.value = false
	}, 1500)
}
</script>
