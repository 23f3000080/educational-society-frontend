<template>
	<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
			<!-- Header Section -->
			<div class="mb-8">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
							My Learning
						</h1>
						<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
							Continue your journey with these courses
						</p>
					</div>
					<div class="flex items-center gap-3">
						<div class="relative">
							<input 
								type="text" 
								v-model="searchQuery"
								placeholder="Search courses..." 
								class="w-full sm:w-64 px-4 py-2 pl-10 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
							/>
							<svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
						</div>
						<button 
							@click="refreshCourses"
							class="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
							:disabled="loading"
						>
							<svg class="w-5 h-5" :class="{'animate-spin': loading}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<!-- Stats Summary -->
			<div v-if="!loading && filteredPurchases.length > 0" class="mb-6 flex flex-wrap gap-4">
				<div class="bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-700">
					<span class="text-xs text-gray-500 dark:text-gray-400">Total Courses</span>
					<p class="text-lg font-semibold text-gray-900 dark:text-white">{{ filteredPurchases.length }}</p>
				</div>
				<div class="bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-700">
					<span class="text-xs text-gray-500 dark:text-gray-400">Active Courses</span>
					<p class="text-lg font-semibold text-green-600 dark:text-green-400">{{ activeCoursesCount }}</p>
				</div>
			</div>

			<!-- Loading State -->
			<div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div v-for="n in 6" :key="n" class="group">
					<div class="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
						<div class="h-48 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600"></div>
						<div class="p-5 space-y-3">
							<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
							<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
							<div class="flex justify-between items-center pt-2">
								<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-20"></div>
								<div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-24"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Empty State -->
			<div v-else-if="filteredPurchases.length === 0" class="text-center py-16">
				<div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
					<svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">No courses found</h3>
				<p class="text-gray-500 dark:text-gray-400">You haven't purchased any courses yet, or no results match your search.</p>
				<button @click="searchQuery = ''" v-if="searchQuery" class="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
					Clear search
				</button>
			</div>

			<!-- Course Grid -->
			<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div 
					v-for="course in filteredPurchases" 
					:key="course.id || course.course_id"
					class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800"
				>
					<!-- Course Thumbnail -->
					<div class="relative h-48 overflow-hidden">
						<img 
							:src="course.picture_url || course.picture || '/src/assets/images/placeholder.jpg'" 
							:alt="course.title"
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						
						<!-- Badges -->
						<div class="absolute top-3 left-3 flex gap-2">
							<span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-600 text-white shadow-lg">
								{{ course.class_level || 'Course' }}
							</span>
							<span v-if="course.is_active" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-green-500 text-white shadow-lg">
								Active
							</span>
							<span v-else class="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-500 text-white shadow-lg">
								Inactive
							</span>
						</div>
						
						<!-- Quick Actions Overlay -->
						<div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
							<button 
								@click="openDetails(course)"
								class="p-2 rounded-full bg-white dark:bg-gray-800 text-indigo-600 shadow-lg hover:bg-indigo-600 hover:text-white transition-all"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
								</svg>
							</button>
						</div>
					</div>

					<!-- Course Info -->
					<div class="p-5">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
							{{ course.title }}
						</h3>
						<p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
							{{ course.subject }}
						</p>
						
						<div class="flex items-center justify-between mb-3">
							<div>
								<span class="text-2xl font-bold text-gray-900 dark:text-white">₹{{ formatPrice(course.fee ?? course.price ?? 0) }}</span>
								<span class="text-xs text-gray-500 dark:text-gray-400 ml-1">one-time</span>
								<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Enrolled: {{ formatDate(course.enrollment_date) }}</p>
							</div>
							<div class="text-right">
								<p class="text-xs text-gray-500 dark:text-gray-400">Duration</p>
								<p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ course.duration_months ?? '-' }} months</p>
							</div>
						</div>

						<div class="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
							<button 
								@click="openDetails(course)"
								class="flex-1 px-4 py-2 text-sm font-medium rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
							>
								View Details
							</button>
							<button 
								@click="continueLearning(course)"
								class="flex-1 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modern Drawer -->
		<Transition name="drawer">
			<div v-if="showDetails" class="fixed inset-0 z-50">
				<!-- Backdrop -->
				<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeDetails"></div>
				
				<!-- Drawer Panel -->
				<div class="absolute right-0 top-0 h-full w-full sm:w-96 lg:w-120 bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto">
					<div class="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between z-10">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Course Details</h3>
						<button 
							@click="closeDetails"
							class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						>
							<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</button>
					</div>

					<div class="p-4" v-if="selected">
						<!-- Thumbnail -->
						<div class="rounded-xl overflow-hidden mb-4">
							<img 
								:src="selected.picture_url || selected.picture || '/src/assets/images/placeholder.jpg'" 
								class="w-full h-48 object-cover"
							/>
						</div>

						<!-- Title & Subject -->
						<div class="mb-4">
							<h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ selected.title }}</h2>
							<p class="text-sm text-indigo-600 dark:text-indigo-400">{{ selected.subject }}</p>
						</div>

						<!-- Info Grid -->
						<div class="grid grid-cols-2 gap-3 mb-4">
							<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
								<p class="text-xs text-gray-500 dark:text-gray-400">Course Code</p>
								<p class="text-sm font-medium text-gray-900 dark:text-white">{{ selected.course_code || '-' }}</p>
							</div>
							<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
								<p class="text-xs text-gray-500 dark:text-gray-400">Duration</p>
								<p class="text-sm font-medium text-gray-900 dark:text-white">{{ selected.duration_months }} months</p>
							</div>
							<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
								<p class="text-xs text-gray-500 dark:text-gray-400">Fee</p>
								<p class="text-sm font-medium text-gray-900 dark:text-white">₹{{ formatPrice(selected.fee ?? selected.price ?? 0) }}</p>
							</div>
							<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
								<p class="text-xs text-gray-500 dark:text-gray-400">Status</p>
								<span :class="selected.is_active ? 'text-green-600' : 'text-gray-500'" class="text-sm font-medium">
									{{ selected.is_active ? 'Active' : 'Inactive' }}
								</span>
							</div>
						</div>

						<!-- Date Range -->
						<div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Course Period</p>
							<div class="flex items-center justify-between text-sm">
								<span class="text-gray-700 dark:text-gray-300">{{ formatDate(selected.start_date) }}</span>
								<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
								</svg>
								<span class="text-gray-700 dark:text-gray-300">{{ formatDate(selected.end_date) }}</span>
							</div>
						</div>

						<div class="mb-4 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900">
							<p class="text-xs text-indigo-600 dark:text-indigo-300 mb-1">Enrollment Date</p>
							<p class="text-sm font-medium text-indigo-700 dark:text-indigo-200">{{ formatDate(selected.enrollment_date) }}</p>
						</div>

						<!-- Description -->
						<div class="mb-6">
							<h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h4>
							<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ selected.description || 'No description available.' }}</p>
						</div>

						<!-- Action Button -->
						<button 
							@click="continueLearning(selected)"
							class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
						>
							Start Learning
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../services/axios';

const purchases = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selected = ref({});
const showDetails = ref(false);
const router = useRouter();

// Computed: Filtered courses based on search
const filteredPurchases = computed(() => {
	if (!searchQuery.value) return purchases.value;
	const query = searchQuery.value.toLowerCase();
	return purchases.value.filter(course => 
		course.title?.toLowerCase().includes(query) ||
		course.subject?.toLowerCase().includes(query) ||
		course.course_code?.toLowerCase().includes(query)
	);
});

// Computed: Count of active courses
const activeCoursesCount = computed(() => {
	return purchases.value.filter(course => course.is_active).length;
});

// Helper functions
const formatPrice = (price) => {
	return new Intl.NumberFormat('en-IN').format(price);
};

const formatDate = (d) => {
	if (!d) return 'TBD';
	try { 
		return new Date(d).toLocaleDateString('en-IN', { 
			day: 'numeric', 
			month: 'short', 
			year: 'numeric' 
		}); 
	} catch { 
		return d; 
	}
};

const openDetails = (course) => { 
	selected.value = course; 
	showDetails.value = true; 
};

const closeDetails = () => { 
	showDetails.value = false; 
	setTimeout(() => selected.value = {}, 300); 
};

const continueLearning = (course) => {
	const courseId = course?.id || course?.course_id;
	if (!courseId) {
		console.warn('Unable to navigate: missing course id');
		return;
	}

	showDetails.value = false;
	router.push(`/course/${courseId}`);
};

const refreshCourses = async () => {
	loading.value = true;
	await fetchCourses();
	loading.value = false;
};

// Fetch courses from API
const fetchCourses = async () => {
	try {
		const { data } = await api.get('/api/my-courses/details');
		purchases.value = Array.isArray(data) ? data : [];
	} catch (err) {
		console.error('Failed to fetch purchases', err);
		purchases.value = [];
	}
};

onMounted(async () => {
	await fetchCourses();
	loading.value = false;
});
</script>

<style scoped>
/* Drawer animations */
.drawer-enter-active,
.drawer-leave-active {
	transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
	opacity: 0;
}

.drawer-enter-active .absolute.right-0,
.drawer-leave-active .absolute.right-0 {
	transition: transform 0.3s ease;
}

.drawer-enter-from .absolute.right-0,
.drawer-leave-to .absolute.right-0 {
	transform: translateX(100%);
}

/* Line clamp utility */
.line-clamp-1 {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

/* Custom scrollbar for drawer */
.overflow-y-auto::-webkit-scrollbar {
	width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
	background: #f1f1f1;
	border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
	background: #c7d2fe;
	border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
	background: #818cf8;
}

@media (prefers-color-scheme: dark) {
	.overflow-y-auto::-webkit-scrollbar-track {
		background: #1f2937;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: #4f46e5;
	}
}
</style>