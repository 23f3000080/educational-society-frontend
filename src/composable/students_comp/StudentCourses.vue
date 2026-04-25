<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 px-4 py-6 md:py-8">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 dark:bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 dark:bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse delay-1000"></div>
    </div>

    <!-- Header -->
    <header class="relative max-w-7xl mx-auto mb-10 md:mb-12">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-indigo-600 rounded-full shadow-md shadow-purple-500 dark:shadow-amber-50 text-white text-sm font-medium">
          <span>🎓</span>
          <span>Expand Your Knowledge</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Discover Your
          <span class="text-indigo-700
         bg-gradient-to-r from-indigo-700 via-purple-600 to-fuchsia-600
         bg-clip-text font-semibold">
            Next Course
          </span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore curated courses and accelerate your learning journey with interactive content
          <span class="inline-block ml-2 animate-bounce">🚀</span>
        </p>
        
        <!-- Stats Bar -->
        <div class="flex flex-wrap justify-center gap-6 mt-8">
          <div class="text-center">
            <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ courses.length }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Available Courses</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ myCourses.length }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Enrolled</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ inProgressCount }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Search and Filter Bar -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="relative flex-1 w-full">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search courses by title, subject, or description..."
            class="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
        
        <div class="hidden md:flex gap-2">
          <button v-for="filter in filters" :key="filter" @click="activeFilter = filter" :class="[
            'px-4 py-2 rounded-lg font-medium transition-all',
            activeFilter === filter
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]">
            {{ filter }}
          </button>
        </div>

      </div>
    </div>

    <main class="relative max-w-7xl mx-auto">
      <!-- MY COURSES Section -->
      <section class="mb-14" v-if="myCourses.length > 0">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Continue Learning
              <span class="ml-2 text-lg text-green-500">●</span>
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Pick up where you left off
            </p>
          </div>
          <div class="text-sm text-gray-500">
            {{ myCourses.length }} course{{ myCourses.length !== 1 ? 's' : '' }}
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            <!-- Course Card -->
            <div v-for="course in myCourses" :key="course.course_id"
              class="group relative flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-6 flex flex-col h-full">

                <!-- Top Section: Icon + Title -->
                <div class="relative flex items-start gap-1 mb-5">

                  <!-- Badge -->
                  <div class="absolute top-0 right-0 z-10">
                    <span
                      class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Enrolled
                    </span>
                  </div>

                  <!-- Icon -->
                  <div
                    class="w-12 mt-5 h-12 flex items-center justify-center rounded-xl text-white shrink-0">
                    <span class="text-xl">📚</span>
                  </div>

                  <!-- Title & Info -->
                  <div class="min-w-0 mt-6">
                    <h3 class="font-semibold text-gray-900 dark:text-white truncate">
                      {{ course.title }}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Class {{ course.class_level }} &middot; {{ course.duration_months }} months
                    </p>
                  </div>
                </div>

                <!-- Progress -->
                <div class="mb-6">
                  <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{{ course.progress_percent || 0 }}%</span>
                  </div>

                  <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-teal-500 rounded-full transition-all duration-500"
                      :style="{ width: (course.progress_percent || 0) + '%' }"></div>
                  </div>
                </div>

                <!-- Button -->
                <button @click="goToCourse(course.course_id)"
                  class="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Continue Learning
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ALL COURSES Section -->
      <section>
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Featured Courses
              <span class="ml-2 text-lg text-indigo-500">●</span>
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Explore our most popular courses
            </p>
          </div>
          <div class="text-sm text-gray-500">
            Showing {{ filteredCourses.length }} of {{ courses.length }} courses
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="loading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div v-for="n in 4" :key="n" class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 animate-pulse">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="text-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl"
        >
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 dark:bg-red-900/40 rounded-full">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Unable to Load Courses</h3>
          <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
          <button
            @click="fetchCourses"
            class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>

        <!-- Courses Grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="course in filteredCourses"
            :key="course.id"
            class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
          >
            <!-- Course Badge -->
            <div class="absolute top-4 left-4 z-10">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-yellow-400">
                {{ course.subject }}
              </span>
            </div>
            
            <!-- Course Image / Thumbnail -->
            <div class="h-40 bg-teal-800 relative overflow-hidden">
              
              <!-- Course Image -->
              <img
                v-if="course.picture_url"
                :src="course.picture_url"
                alt="Course Image"
                class="w-full h-full object-cover"
              />

              <!-- Placeholder if image not available -->
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center"
              >
                <span class="text-4xl text-white/80">📘</span>
              </div>

            </div>
            
            <!-- Course Content -->
            <div class="p-6">
              <div class="mb-4">
                <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {{ course.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {{ course.description }}
                </p>
              </div>
              
              <!-- Course Meta -->
              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ course.duration_months }} months</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Class {{ course.class_level }}</span>
                </div>
              </div>
              
              <!-- Price and Action -->
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{{ course.fee }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    One-time payment
                  </div>
                </div>
                
                <button
                  v-if="course.is_enrolled && course.payment_status === 'paid'"
                  @click="goToCourse(course.id)"
                  class="inline-flex items-center gap-2 px-5 py-3 bg-emerald-400 hover:bg-emerald-500 text-white dark:text-black font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Continue</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button
                  v-else
                  @click="enrollCourse(course.id)"
                  class="inline-flex items-center gap-2 px-5 py-3 bg-gray-700 hover:bg-indigo-600 text-yellow-400 font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <span>Enroll Now</span>
                  <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div
          v-if="!loading && !error && filteredCourses.length === 0"
          class="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
            <span class="text-3xl">🔍</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No courses found
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button
            @click="clearFilters"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl font-medium transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        </div>
      </section>
    </main>

    <!-- Floating Action Button -->
    <button
      v-if="myCourses.length > 0"
      @click="scrollToMyCourses"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
      aria-label="Back to my courses"
    >
      <span class="text-xl">📚</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../../services/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const courses = ref([]);
const myCourses = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const activeFilter = ref("All");
const filters = ["All", "Popular", "New", "Science", "Math", "Programming"];

// Computed properties
const filteredCourses = computed(() => {
  let filtered = courses.value;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.subject.toLowerCase().includes(query)
    );
  }
  
  // Apply category filter
  if (activeFilter.value !== "All") {
    filtered = filtered.filter(course =>
      course.subject.toLowerCase() === activeFilter.value.toLowerCase() ||
      (activeFilter.value === "Popular" && course.is_popular) ||
      (activeFilter.value === "New" && course.is_new)
    );
  }
  
  return filtered;
});

const inProgressCount = computed(() => {
  return myCourses.value.filter(course => course.progress > 0 && course.progress < 100).length;
});

// Methods
const scrollToMyCourses = () => {
  const element = document.querySelector('[data-my-courses]');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  activeFilter.value = "All";
};

const fetchCourses = async () => {
  try {
    const res = await api.get("/api/student/courses");
    courses.value = res.data.map(course => ({
      ...course,
      is_popular: Math.random() > 0.5, // Mock data - replace with actual
      is_new: Math.random() > 0.7, // Mock data - replace with actual
      progress: Math.floor(Math.random() * 100) // Mock data - replace with actual
    }));
  } catch (err) {
    console.error("Failed to fetch courses", err);
    error.value = err.response?.data?.error || "Failed to fetch courses. Please try again.";
  }
};

const fetchMyCourses = async () => {
  try {
    const res = await api.get("/api/my-courses");
    myCourses.value = res.data.map(course => ({
      ...course,
      progress: Math.floor(Math.random() * 100) // Mock data - replace with actual
    }));
  } catch (err) {
    console.error("Failed to fetch my courses", err);
  }
};

const enrollCourse = (courseId) => {
  router.push(`/courses/${courseId}/enroll`);
};

const goToCourse = (courseId) => {
  router.push(`/course/${courseId}`);
};

onMounted(async () => {
  loading.value = true;
  await Promise.all([
    fetchCourses(),
    fetchMyCourses()
  ]);
  loading.value = false;
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>