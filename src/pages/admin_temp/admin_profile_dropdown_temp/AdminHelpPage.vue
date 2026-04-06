<template>
	<section class="min-h-[calc(100vh-5rem)] bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
			<header class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
				<p class="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Admin Help Center</p>
				<h1 class="text-2xl md:text-3xl font-bold mt-1">Need Assistance?</h1>
				<p class="text-sm text-slate-600 dark:text-slate-300 mt-2">Find answers for daily admin operations and troubleshooting.</p>
			</header>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<router-link to="/admin/notifications" class="rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 shadow-sm hover:border-indigo-400 transition-colors">
					<p class="font-semibold">Handle Queries</p>
					<p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Open notifications center to resolve student issues quickly.</p>
				</router-link>
				<router-link to="/admin/users" class="rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 shadow-sm hover:border-indigo-400 transition-colors">
					<p class="font-semibold">Manage Users</p>
					<p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Review enrollments, activity, and user-level insights.</p>
				</router-link>
				<router-link to="/admin/assignments" class="rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 shadow-sm hover:border-indigo-400 transition-colors">
					<p class="font-semibold">Assignment Workflows</p>
					<p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Create, update, and monitor assignment content.</p>
				</router-link>
			</div>

			<article class="rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 shadow-sm">
				<h2 class="text-lg font-semibold">Frequently Asked Questions</h2>
				<ul class="mt-4 space-y-3 text-sm">
					<li v-for="faq in faqs" :key="faq.q" class="p-4 rounded-xl border border-slate-200 dark:border-gray-800">
						<p class="font-semibold">{{ faq.q }}</p>
						<p class="text-slate-600 dark:text-slate-300 mt-1">{{ faq.a }}</p>
					</li>
				</ul>
			</article>
		</div>
	</section>
</template>

<script setup>
const faqs = [
	{
		q: 'How do I resolve a support query?',
		a: 'Go to Notifications, open Query Inbox, choose the query, add a response, and mark it resolved.'
	},
	{
		q: 'Can I notify selected students only?',
		a: 'Yes. In the notifications composer, choose single or multiple recipients instead of global.'
	},
	{
		q: 'Where can I review important admin actions?',
		a: 'Use Audit Trail for admin changes and System Logs for platform-level technical activity.'
	}
]
</script>
