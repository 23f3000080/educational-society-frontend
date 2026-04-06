<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto">
      <!-- Header / Welcome Section -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
              Welcome, {{ studentName }}
            </h1>
            <p class="text-gray-600 mt-2">
              {{ studentCourse }} • Batch: {{ studentBatch }}
            </p>
          </div>
          <div class="mt-4 md:mt-0 relative">
            <button 
              @click="showNotifications = !showNotifications"
              class="relative p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span v-if="notificationCount > 0" 
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ notificationCount }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.id" 
             class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div :class="`p-3 rounded-lg ${stat.iconBgColor} ${stat.iconColor}`">
              <component :is="stat.icon" class="w-6 h-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">{{ stat.title }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Continue Learning Section -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
            <div class="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg p-4">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ continueLearning.title }}</h3>
                <p class="text-gray-600 text-sm mt-1">{{ continueLearning.course }}</p>
                <div class="mt-3 flex items-center text-sm text-gray-500">
                  <span>Progress: {{ continueLearning.progress }}%</span>
                  <div class="ml-4 w-32 bg-gray-200 rounded-full h-2">
                    <div class="bg-indigo-600 h-2 rounded-full" 
                         :style="{ width: continueLearning.progress + '%' }"></div>
                  </div>
                </div>
              </div>
              <button @click="resumeLearning"
                      class="mt-4 md:mt-0 md:ml-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Resume
              </button>
            </div>
          </div>

          <!-- Recent Activity Section -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id"
                   class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div>
                  <h4 class="font-medium text-gray-900">{{ activity.title }}</h4>
                  <p class="text-sm text-gray-600 mt-1">{{ activity.type }} • {{ activity.course }}</p>
                </div>
                <div class="text-right">
                  <span class="text-lg font-bold" 
                        :class="activity.score >= 80 ? 'text-green-600' : 'text-yellow-600'">
                    {{ activity.score }}%
                  </span>
                  <p class="text-sm text-gray-500 mt-1">{{ formatDate(activity.date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Upcoming Tasks -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
            <span class="text-sm text-indigo-600 font-medium">{{ upcomingTasks.length }} pending</span>
          </div>
          <div class="space-y-4">
            <div v-for="task in upcomingTasks" :key="task.id"
                 class="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
                  <div class="flex items-center mt-2 space-x-4">
                    <span class="text-sm text-gray-600">
                      <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(task.dueDate) }}
                    </span>
                    <span class="text-sm" :class="getStatusClass(task.status)">
                      {{ task.status }}
                    </span>
                  </div>
                </div>
                <button v-if="task.status === 'pending'"
                        @click="startTask(task)"
                        class="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                  Start
                </button>
              </div>
              <p v-if="task.description" class="text-sm text-gray-500 mt-3">{{ task.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Icons
const BookIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  `
}

const ClockIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
}

const ChartIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  `
}

const AcademicIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  `
}

// Reactive data
const loading = ref(true)
const showNotifications = ref(false)
const studentName = ref('Alex Johnson')
const studentCourse = ref('Computer Science')
const studentBatch = ref('2024')
const notificationCount = ref(3)

const stats = ref([
  {
    id: 1,
    title: 'Courses Enrolled',
    value: 8,
    icon: BookIcon,
    iconBgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Tests Attempted',
    value: 24,
    icon: AcademicIcon,
    iconBgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    id: 3,
    title: 'Average Score',
    value: '87%',
    icon: ChartIcon,
    iconBgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    id: 4,
    title: 'Weekly Study Time',
    value: '18h',
    icon: ClockIcon,
    iconBgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
])

const continueLearning = ref({
  title: 'Advanced JavaScript Concepts',
  course: 'Web Development - Module 3',
  progress: 65,
  lastAccessed: '2 hours ago'
})

const recentActivity = ref([
  {
    id: 1,
    title: 'Data Structures Quiz',
    type: 'Quiz',
    course: 'Computer Science 101',
    score: 92,
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Web Development Assignment',
    type: 'Assignment',
    course: 'Full Stack Development',
    score: 85,
    date: '2024-01-14'
  },
  {
    id: 3,
    title: 'Database Theory Test',
    type: 'Test',
    course: 'Database Systems',
    score: 78,
    date: '2024-01-12'
  },
  {
    id: 4,
    title: 'Algorithms Midterm',
    type: 'Exam',
    course: 'Algorithm Design',
    score: 91,
    date: '2024-01-10'
  }
])

const upcomingTasks = ref([
  {
    id: 1,
    title: 'Final Project Submission',
    description: 'Complete and submit the e-commerce platform project',
    dueDate: '2024-01-20',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 2,
    title: 'React Quiz',
    description: 'Chapter 5-8: React Hooks and State Management',
    dueDate: '2024-01-18',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Database Assignment',
    dueDate: '2024-01-16',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Weekly JavaScript Challenge',
    dueDate: '2024-01-14',
    status: 'completed',
    priority: 'low'
  }
])

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

const getStatusClass = (status) => {
  return {
    'completed': 'text-green-600 bg-green-50 px-2 py-1 rounded',
    'pending': 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded'
  }[status] || ''
}

const resumeLearning = () => {
  alert(`Resuming: ${continueLearning.value.title}`)
  // In a real app, you would navigate to the lesson page
}

const startTask = (task) => {
  alert(`Starting task: ${task.title}`)
  // In a real app, you would navigate to the task
}

// Lifecycle
onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>