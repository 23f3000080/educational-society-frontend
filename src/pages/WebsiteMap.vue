<template>
	<div class="min-h-screen bg-[#06111d] text-white">
		<section class="relative isolate overflow-hidden">
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_28%),linear-gradient(135deg,#06111d_0%,#09182a_48%,#040b13_100%)]"></div>
			<div class="absolute inset-0 opacity-25 texture-grid"></div>
			<div class="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/18 blur-3xl"></div>
			<div class="absolute right-0 top-24 h-80 w-80 rounded-full bg-emerald-400/12 blur-3xl"></div>
			<div class="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl"></div>

			<div class="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
				<div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
					<div class="max-w-3xl" v-motion :initial="heroInitial" :visibleOnce="heroVisible(40)">
						<span class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100 backdrop-blur">
							<i class="fa-solid fa-shield-halved"></i>
							Secure sitemap dashboard
						</span>
						<h1 class="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
							Navigate the full platform with a <span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-teal-300 to-emerald-300">premium tree map</span>
						</h1>
						<p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
							Browse the entire student LMS in one secure place. Use search to jump across dashboard, learning, assessments, resources, account, and support pages.
						</p>

						<div class="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
							<div class="glass-pill">{{ visibleCount }} visible pages</div>
							<div class="glass-pill">{{ totalPages }} total routes</div>
							<div class="glass-pill">Protected access</div>
						</div>
					</div>

					<div class="glass-panel p-4 sm:p-5" v-motion :initial="heroInitial" :visibleOnce="heroVisible(120)">
						<label class="sr-only" for="sitemap-search">Search site map</label>
						<div class="relative">
							<i class="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
							<input
								id="sitemap-search"
								v-model="searchQuery"
								type="search"
								placeholder="Search pages, routes, or descriptions"
								class="w-full rounded-2xl border border-white/10 bg-slate-950/55 py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
							/>
						</div>

						<div class="mt-4 grid gap-3 sm:grid-cols-3">
							<div class="mini-metric">
								<p>Dashboard</p>
								<strong>{{ sections.dashboard.length }}</strong>
							</div>
							<div class="mini-metric">
								<p>Learning</p>
								<strong>{{ sections.learning.length }}</strong>
							</div>
							<div class="mini-metric">
								<p>Support</p>
								<strong>{{ sections.support.length }}</strong>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-8 flex flex-wrap gap-3" v-motion :initial="heroInitial" :visibleOnce="heroVisible(180)">
					<button
						v-for="section in sectionOrder"
						:key="section.key"
						type="button"
						@click="activeSection = section.key"
						class="section-chip"
						:class="activeSection === section.key ? 'section-chip-active' : 'section-chip-inactive'"
					>
						{{ section.label }}
					</button>
				</div>

				<div class="relative mt-10">
					<div class="sitemap-trunk hidden xl:block"></div>

					<div class="space-y-8 xl:space-y-10">
						<article
							v-for="(section, sectionIndex) in filteredSections"
							:key="section.key"
							v-motion
							:initial="sectionInitial(sectionIndex)"
							:visibleOnce="sectionVisible(sectionIndex)"
							class="glass-panel relative overflow-hidden p-5 sm:p-6"
						>
							<div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
								<div>
									<p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">{{ section.tag }}</p>
									<h2 class="mt-2 text-2xl font-black text-white sm:text-3xl">{{ section.title }}</h2>
									<p class="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{{ section.description }}</p>
								</div>
								<span class="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur">
									{{ section.items.length }} pages
								</span>
							</div>

							<div class="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
								<div class="sitemap-branch hidden xl:block"></div>

								<router-link
									v-for="(item, itemIndex) in filteredItems(section)"
									:key="item.path"
									:to="item.path"
									v-motion
									:initial="cardInitial(sectionIndex, itemIndex)"
									:visibleOnce="cardVisible(sectionIndex, itemIndex)"
									class="sitemap-card group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-slate-950/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-900/75 hover:shadow-[0_20px_70px_rgba(8,145,178,0.18)]"
								>
									<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_32%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
									<div class="relative flex items-start gap-4">
										<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110" :class="item.tint">
											<i :class="item.icon"></i>
										</div>
										<div class="min-w-0 flex-1">
											<div class="flex flex-wrap items-center gap-2">
												<h3 class="truncate text-base font-bold text-white sm:text-lg">{{ item.label }}</h3>
												<span v-if="item.badge" class="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{{ item.badge }}</span>
											</div>
											<p class="mt-1 text-sm leading-6 text-slate-300">{{ item.description }}</p>
											<div class="mt-4 flex items-center justify-between gap-3 text-xs font-medium text-slate-400">
												<span>{{ item.path }}</span>
												<i class="fa-solid fa-arrow-right-long text-cyan-200 transition-transform duration-300 group-hover:translate-x-1"></i>
											</div>
										</div>
									</div>
								</router-link>
							</div>
						</article>
					</div>
				</div>

				<div v-if="!filteredSections.length" class="mt-10 glass-panel p-8 text-center" v-motion :initial="heroInitial" :visibleOnce="heroVisible(220)">
					<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-200">
						<i class="fa-solid fa-magnifying-glass text-2xl"></i>
					</div>
					<h3 class="mt-4 text-xl font-bold text-white">No matches found</h3>
					<p class="mt-2 text-sm leading-6 text-slate-300">Try a different keyword or switch back to a section chip above.</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';

const heroInitial = {
	opacity: 0,
	y: 22,
};

const heroVisible = (delay = 0) => ({
	opacity: 1,
	y: 0,
	transition: {
		delay: Math.min(delay, 800) / 1000,
		duration: 0.72,
		ease: [0.22, 1, 0.36, 1],
	},
});

const sectionInitial = (index) => ({
	opacity: 0,
	x: index % 2 === 0 ? -26 : 26,
	y: 18,
	scale: 0.985,
});

const sectionVisible = (index) => ({
	opacity: 1,
	x: 0,
	y: 0,
	scale: 1,
	transition: {
		delay: Math.min(120 + index * 120, 900) / 1000,
		duration: 0.78,
		ease: [0.22, 1, 0.36, 1],
	},
});

const cardInitial = (sectionIndex, itemIndex) => ({
	opacity: 0,
	y: 22,
	x: itemIndex % 2 === 0 ? -18 : 18,
	scale: 0.97,
});

const cardVisible = (sectionIndex, itemIndex) => ({
	opacity: 1,
	x: 0,
	y: 0,
	scale: 1,
	transition: {
		delay: Math.min(200 + sectionIndex * 110 + itemIndex * 65, 1000) / 1000,
		duration: 0.72,
		ease: [0.22, 1, 0.36, 1],
	},
});

const searchQuery = ref('');
const activeSection = ref('all');

const sections = {
	dashboard: [
		{ label: 'Home', path: '/', description: 'Main landing page with hero, highlights, and announcements.', icon: 'fa-solid fa-house', tint: 'bg-linear-to-br from-cyan-500 to-blue-600' },
		{ label: 'About', path: '/about', description: 'Overview of the organization, mission, and values.', icon: 'fa-solid fa-circle-info', tint: 'bg-linear-to-br from-emerald-500 to-teal-600' },
		{ label: 'Contact', path: '/contact', description: 'Reach the team through support and enquiry channels.', icon: 'fa-solid fa-envelope', tint: 'bg-linear-to-br from-indigo-500 to-violet-600' },
	],
	learning: [
		{ label: 'Courses', path: '/courses', description: 'Browse course catalog with pricing and enrollment options.', icon: 'fa-solid fa-book-open', tint: 'bg-linear-to-br from-orange-500 to-rose-500' },
		{ label: 'Course Detail', path: '/courses/sample-course', description: 'Deep dive into a single course page and its content.', icon: 'fa-solid fa-layer-group', tint: 'bg-linear-to-br from-sky-500 to-blue-600' },
		{ label: 'Student Home', path: '/student/dashboard', description: 'Learner dashboard entry point for a logged-in student.', icon: 'fa-solid fa-grid-2', tint: 'bg-linear-to-br from-emerald-500 to-cyan-600', badge: 'Auth' },
		{ label: 'My Courses', path: '/student/courses', description: 'Course list, progress, and enrolled learning items.', icon: 'fa-solid fa-layer-group', tint: 'bg-linear-to-br from-sky-500 to-blue-600', badge: 'Auth' },
	],
	assessments: [
		{ label: 'Tests', path: '/student/tests', description: 'View and take tests assigned to the student account.', icon: 'fa-solid fa-clipboard-check', tint: 'bg-linear-to-br from-fuchsia-500 to-pink-600', badge: 'Auth' },
		{ label: 'Assignments', path: '/student/assignments', description: 'Submit class assignments and track due work.', icon: 'fa-solid fa-pen-to-square', tint: 'bg-linear-to-br from-amber-500 to-orange-600', badge: 'Auth' },
	],
	resources: [
		{ label: 'Notes', path: '/resource/notes', description: 'Private study notes for signed-in learners.', icon: 'fa-solid fa-note-sticky', tint: 'bg-linear-to-br from-teal-500 to-emerald-600', badge: 'Auth' },
		{ label: 'Books', path: '/resource/books', description: 'Curated books and reading resources.', icon: 'fa-solid fa-book', tint: 'bg-linear-to-br from-blue-500 to-sky-600', badge: 'Auth' },
		{ label: 'YouTube', path: '/resource/youtube', description: 'Video resources and guided tutorials.', icon: 'fa-brands fa-youtube', tint: 'bg-linear-to-br from-red-500 to-rose-600', badge: 'Auth' },
	],
	account: [
		{ label: 'Sign Up', path: '/signup', description: 'Create a new account and begin onboarding.', icon: 'fa-solid fa-user-plus', tint: 'bg-linear-to-br from-cyan-500 to-teal-600' },
		{ label: 'Login', path: '/login', description: 'Secure sign-in with redirect support.', icon: 'fa-solid fa-right-to-bracket', tint: 'bg-linear-to-br from-slate-700 to-slate-900' },
		{ label: 'Forgot Password', path: '/forgot/password', description: 'Reset credentials when access is lost.', icon: 'fa-solid fa-lock', tint: 'bg-linear-to-br from-rose-500 to-red-600' },
		{ label: 'Privacy Policy', path: '/privacy', description: 'Read how account and usage data is handled.', icon: 'fa-solid fa-shield-heart', tint: 'bg-linear-to-br from-amber-500 to-orange-600' },
	],
	support: [
		{ label: 'Terms & Conditions', path: '/terms', description: 'View usage terms and platform policies.', icon: 'fa-solid fa-file-contract', tint: 'bg-linear-to-br from-slate-600 to-slate-800' },
		{ label: 'Refund Policy', path: '/refund', description: 'Understand refund eligibility and timelines.', icon: 'fa-solid fa-receipt', tint: 'bg-linear-to-br from-emerald-600 to-green-700' },
		{ label: 'Website Map', path: '/website-map', description: 'Return to the secure sitemap dashboard.', icon: 'fa-solid fa-sitemap', tint: 'bg-linear-to-br from-cyan-600 to-blue-700', badge: 'Current' },
	],
};

const sectionMeta = {
	dashboard: { key: 'dashboard', label: 'Dashboard', title: 'Dashboard', tag: 'Landing zone', description: 'High-level entry pages and orientation surfaces.' },
	learning: { key: 'learning', label: 'Learning', title: 'Learning', tag: 'Study flow', description: 'Student-facing learning pages and course navigation.' },
	assessments: { key: 'assessments', label: 'Assessments', title: 'Assessments', tag: 'Evaluation flow', description: 'Tests, assignments, and progress feedback pages.' },
	resources: { key: 'resources', label: 'Resources', title: 'Resources', tag: 'Content library', description: 'Supporting materials for focused study sessions.' },
	account: { key: 'account', label: 'Account', title: 'Account', tag: 'Identity flow', description: 'Authentication and policy pages for user access.' },
	support: { key: 'support', label: 'Support', title: 'Support', tag: 'Help center', description: 'Helpful policy and site-maintenance pages.' },
};

const sectionOrder = Object.values(sectionMeta);

const totalPages = Object.values(sections).reduce((count, items) => count + items.length, 0);

const sectionEntries = computed(() => sectionOrder.map((section) => ({ ...section, items: sections[section.key] })));

const filteredSections = computed(() => {
	const query = searchQuery.value.trim().toLowerCase();
	return sectionEntries.value
		.filter((section) => activeSection.value === 'all' || activeSection.value === section.key)
		.map((section) => ({
			...section,
			items: section.items.filter((item) => {
				if (!query) {
					return true;
				}

				return [item.label, item.path, item.description, item.badge, section.title]
					.filter(Boolean)
					.some((value) => value.toLowerCase().includes(query));
			}),
		}))
		.filter((section) => section.items.length > 0);
});

const visibleCount = computed(() => filteredSections.value.reduce((count, section) => count + section.items.length, 0));

const filteredItems = (section) => section.items;
</script>

<style scoped>
.texture-grid {
	background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
	background-size: 44px 44px;
}

.glass-panel {
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 1.75rem;
	background: rgba(255, 255, 255, 0.07);
	backdrop-filter: blur(22px);
	box-shadow: 0 22px 70px rgba(7, 18, 32, 0.22);
}

.glass-pill {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: 9999px;
	border: 1px solid rgba(255, 255, 255, 0.12);
	background: rgba(255, 255, 255, 0.08);
	padding: 0.55rem 0.9rem;
	backdrop-filter: blur(16px);
}

.mini-metric {
	border-radius: 1.1rem;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: rgba(2, 6, 23, 0.45);
	padding: 0.9rem;
}

.mini-metric p {
	font-size: 0.72rem;
	text-transform: uppercase;
	letter-spacing: 0.22em;
	color: rgba(148, 163, 184, 0.9);
}

.mini-metric strong {
	display: block;
	margin-top: 0.45rem;
	font-size: 1.4rem;
	font-weight: 900;
	color: white;
}

.section-chip {
	border-radius: 9999px;
	border: 1px solid rgba(255, 255, 255, 0.12);
	padding: 0.8rem 1rem;
	font-size: 0.85rem;
	font-weight: 700;
	transition: all 220ms ease;
}

.section-chip-inactive {
	background: rgba(255, 255, 255, 0.05);
	color: rgba(226, 232, 240, 0.95);
}

.section-chip-inactive:hover {
	transform: translateY(-1px);
	border-color: rgba(103, 232, 249, 0.28);
	background: rgba(8, 15, 28, 0.66);
}

.section-chip-active {
	background: linear-gradient(135deg, rgba(8, 145, 178, 0.95), rgba(20, 184, 166, 0.95));
	color: white;
	box-shadow: 0 14px 40px rgba(8, 145, 178, 0.28);
}

.sitemap-trunk {
	position: absolute;
	left: 50%;
	top: 1rem;
	bottom: 1rem;
	width: 2px;
	transform: translateX(-50%);
	border-radius: 9999px;
	background: linear-gradient(to bottom, rgba(34, 211, 238, 0.18), rgba(52, 211, 153, 0.72), rgba(34, 211, 238, 0.18));
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.sitemap-group::before {
	content: '';
	position: absolute;
	inset: 0;
	background: radial-gradient(circle at top left, rgba(34, 211, 238, 0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.08), transparent 30%);
	pointer-events: none;
}

.sitemap-branch {
	position: absolute;
	left: 50%;
	top: 1rem;
	bottom: 1rem;
	width: 2px;
	transform: translateX(-50%);
	background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(34, 211, 238, 0.24), rgba(255, 255, 255, 0.08));
}

.sitemap-card {
	transform-origin: center;
}

@media (max-width: 767px) {
	.section-chip {
		padding-inline: 0.9rem;
	}
}
</style>