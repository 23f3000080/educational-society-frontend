<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside 
      class="bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col"
      :class="sidebarOpen ? 'w-80' : 'w-20'"
    >
      <!-- Course Header -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 min-w-0">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex-shrink-0 flex items-center justify-center">
              <span class="text-white font-bold text-lg">{{ courseInitials }}</span>
            </div>
            <div v-if="sidebarOpen" class="truncate">
              <h2 class="font-semibold text-gray-800 truncate">{{ course?.title || 'Course Name' }}</h2>
              <p class="text-xs text-gray-500 truncate">{{ course?.description || 'Course description' }}</p>
            </div>
          </div>
          <button 
            @click="toggleSidebar"
            class="p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none flex-shrink-0"
            :class="{ 'ml-2': sidebarOpen }"
          >
            <svg 
              class="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="sidebarOpen ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'"
              />
            </svg>
          </button>
        </div>

        <!-- Progress Bar (only visible when sidebar is open) -->
        <div v-if="sidebarOpen" class="mt-4">
          <div class="flex justify-between text-xs text-gray-600 mb-1">
            <span>Course Progress</span>
            <span>{{ calculateProgress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 rounded-full h-2" :style="{ width: calculateProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Navigation Sections -->
      <nav class="flex-1 p-4 space-y-6 overflow-y-auto">
        <!-- Lectures Section -->
        <div class="space-y-2">
          <button 
            @click="toggleSection('lectures')"
            class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            :class="{ 'bg-blue-50': expandedSections.lectures }"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span :class="{ 'hidden': !sidebarOpen }" class="font-medium text-gray-700">Lectures</span>
            </div>
            <div v-if="sidebarOpen" class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">{{ weeks?.length || 0 }} weeks</span>
              <svg 
                class="w-4 h-4 text-gray-600 transition-transform duration-200"
                :class="{ 'rotate-90': expandedSections.lectures }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <!-- Weeks Submenu -->
          <div 
            v-show="expandedSections.lectures && sidebarOpen"
            class="ml-11 space-y-1 transition-all duration-200"
          >
            <template v-if="weeks?.length">
              <div v-for="week in weeks" :key="week.id" class="space-y-1">
                <div 
                  @click="selectContent('lectures', week, null)"
                  @keydown.enter="selectContent('lectures', week, null)"
                  @keydown.space.prevent="selectContent('lectures', week, null)"
                  role="button"
                  tabindex="0"
                  class="w-full flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
                  :class="{ 'bg-blue-100': selectedContent?.type === 'lectures' && selectedContent?.week?.id === week.id && !selectedContent?.video }"
                >
                  <span class="text-gray-600">{{ week.title || `Week ${week.week_number}` }}</span>
                  <button @click.stop="toggleWeek('lectures', week.week_number)" class="p-1">
                    <svg 
                      class="w-3 h-3 text-gray-500 transition-transform duration-200"
                      :class="{ 'rotate-90': expandedWeeks[`lectures-${week.week_number}`] }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                <!-- Week Videos -->
                <div v-show="expandedWeeks[`lectures-${week.week_number}`]" class="ml-4 space-y-1">
                  <div v-if="week.videos?.length">
                    <div 
                      v-for="video in week.videos" 
                      :key="video.id"
                      @click="selectContent('lectures', week, { type: 'video', video })"
                      class="p-2 text-sm rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      :class="{ 'bg-blue-50': selectedContent?.type === 'lectures' && selectedContent?.video?.id === video.id }"
                    >
                      <span class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-gray-700">{{ video.title }}</span>
                      </span>
                      <span v-if="isVideoCompleted(video)" class="text-xs text-green-600">✓ Completed</span>
                    </div>
                  </div>
                  <div v-else class="p-2 text-sm text-gray-400 italic">
                    No videos available
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="p-2 text-sm text-gray-400 italic">
              No weeks available
            </div>
          </div>
        </div>

        <!-- Assignments Section -->
        <div class="space-y-2">
          <button 
            @click="toggleSection('assignments')"
            class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            :class="{ 'bg-green-50': expandedSections.assignments }"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <span :class="{ 'hidden': !sidebarOpen }" class="font-medium text-gray-700">Assignments</span>
            </div>
            <div v-if="sidebarOpen" class="flex items-center space-x-2">
              <span class="text-xs text-orange-500">{{ getDueAssignmentsCount }} due</span>
              <svg 
                class="w-4 h-4 text-gray-600 transition-transform duration-200"
                :class="{ 'rotate-90': expandedSections.assignments }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <!-- Assignments Submenu -->
          <div 
            v-show="expandedSections.assignments && sidebarOpen"
            class="ml-11 space-y-2 transition-all duration-200"
          >
            <template v-if="weeks?.length">
              <div v-for="week in weeks" :key="week.id" class="space-y-1">
                <div v-if="week.assignments?.length">
                  <div 
                    @click="selectContent('assignments', week, null)"
                    @keydown.enter="selectContent('assignments', week, null)"
                    @keydown.space.prevent="selectContent('assignments', week, null)"
                    role="button"
                    tabindex="0"
                    class="w-full flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
                    :class="{ 'bg-green-100': selectedContent?.type === 'assignments' && selectedContent?.week?.id === week.id && !selectedContent?.assignment }"
                  >
                    <span class="text-gray-600">{{ week.title || `Week ${week.week_number}` }} Assignments</span>
                    <button @click.stop="toggleWeek('assignments', week.week_number)" class="p-1">
                      <svg 
                        class="w-3 h-3 text-gray-500 transition-transform duration-200"
                        :class="{ 'rotate-90': expandedWeeks[`assignments-${week.week_number}`] }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  <!-- Individual Assignments -->
                  <div v-show="expandedWeeks[`assignments-${week.week_number}`]" class="ml-4 space-y-2">
                    <div 
                      v-for="assignment in week.assignments" 
                      :key="assignment.id"
                      @click="selectContent('assignments', week, { type: 'assignment', assignment })"
                      class="p-2 text-sm rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      :class="{ 'bg-green-50': selectedContent?.type === 'assignments' && selectedContent?.assignment?.id === assignment.id }"
                    >
                      <div class="flex flex-col">
                        <span class="font-medium text-gray-700">{{ assignment.title }}</span>
                        <span class="text-xs text-gray-500">Due: {{ assignment.due_date ? formatDate(assignment.due_date) : 'No due date' }}</span>
                      </div>
                      <span v-if="isAssignmentCompleted(assignment)" class="text-xs text-green-600">✓ Submitted</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="p-2 text-sm text-gray-400 italic">
              No assignments available
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="space-y-2">
          <button 
            @click="toggleSection('notes')"
            class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            :class="{ 'bg-yellow-50': expandedSections.notes }"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span :class="{ 'hidden': !sidebarOpen }" class="font-medium text-gray-700">Notes</span>
            </div>
            <div v-if="sidebarOpen" class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">{{ getNotesCount }} notes</span>
              <svg 
                class="w-4 h-4 text-gray-600 transition-transform duration-200"
                :class="{ 'rotate-90': expandedSections.notes }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <!-- Notes Submenu -->
          <div 
            v-show="expandedSections.notes && sidebarOpen"
            class="ml-11 space-y-1 transition-all duration-200"
          >
            <template v-if="weeks?.length">
              <div v-for="week in weeks" :key="week.id" class="space-y-1">
                <div v-if="week.notes?.length">
                  <div 
                    v-for="note in week.notes" 
                    :key="note.id"
                    @click="selectContent('notes', week, { type: 'notes', note })"
                    class="p-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
                    :class="{ 'bg-yellow-100': selectedContent?.type === 'notes' && selectedContent?.note?.id === note.id }"
                  >
                    <span class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-gray-600">{{ note.title }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="p-2 text-sm text-gray-400 italic">
              No notes available
            </div>
          </div>
        </div>
      </nav>

      <!-- User Profile (bottom of sidebar) -->
      <div v-if="sidebarOpen" class="p-4 border-t mt-auto">
        <div class="flex items-center space-x-3">
          <img :src="userProfilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" alt="Profile" class="w-8 h-8 rounded-full">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-700 truncate">{{ userName }}</p>
            <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <CourseContentPage 
        :course="course" 
        :weeks="weeks"
        :selected-content="selectedContent"
        :completed-videos="completedVideos"
        :completed-assignments="completedAssignments"
        @content-updated="handleContentUpdate"
        @progress-updated="fetchCourseProgress"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CourseContentPage from "./CourseContentPage.vue"
import api from "../../services/axios.js"

const router = useRouter()
const courseId = Number(router.currentRoute.value.params.id)

// User data from session storage
const user = JSON.parse(sessionStorage.getItem('user')) || { first_name: '', last_name: '', email: '', profile_picture: '' }
const userName = computed(() => `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User')
const userEmail = computed(() => user.email || '')
const userProfilePicture = computed(() => user.profile_picture)

// State
const sidebarOpen = ref(true)
const course = ref(null)
const weeks = ref([])
const loading = ref(true)

const selectedContent = ref({
  type: null,
  week: null,
  video: null,
  assignment: null,
  note: null
})

const expandedSections = ref({
  lectures: true,
  assignments: false,
  notes: false
})

const expandedWeeks = ref({})

// Progress tracking
const completedVideos = ref(new Set())
const completedAssignments = ref(new Set())
const progressData = ref({ completed: 0, total: 0, progress: 0 })

// Computed properties
const courseInitials = computed(() => {
  if (!course.value?.title) return 'CS'
  return course.value.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()
})

const calculateProgress = computed(() => {
  return progressData.value.progress || 0
})

const getDueAssignmentsCount = computed(() => {
  let count = 0
  const today = new Date()
  
  weeks.value.forEach(week => {
    week.assignments?.forEach(assignment => {
      if (assignment.due_date && new Date(assignment.due_date) > today) {
        count++
      }
    })
  })
  return count
})

const getNotesCount = computed(() => {
  let count = 0
  weeks.value.forEach(week => {
    count += week.notes?.length || 0
  })
  return count
})

// API Calls
const fetchCourseDetails = async () => {
  try {
    const response = await api.get(`/api/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    })
    course.value = response.data
    
    // Fetch weeks after getting course
    await fetchWeeks()
  } catch (error) {
    console.error('Error fetching course:', error)
  }
}

const fetchWeeks = async () => {
  try {
    const response = await api.get(`/api/courses/${courseId}/weeks`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    })
    weeks.value = response.data
    
    // Fetch progress after getting weeks
    await fetchCourseProgress()
    await fetchCompletedItems()
  } catch (error) {
    console.error('Error fetching weeks:', error)
  } finally {
    loading.value = false
  }
}

const fetchCourseProgress = async () => {
  try {
    // Calculate total content
    let totalContent = 0
    weeks.value.forEach(week => {
      totalContent += week.videos?.length || 0
      totalContent += week.assignments?.length || 0
    })

    const response = await api.post(`/api/course-progress/${courseId}`, 
      { total_content: totalContent },
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
    )
    progressData.value = response.data
  } catch (error) {
    console.error('Error fetching progress:', error)
  }
}

const fetchCompletedItems = async () => {
  try {
    const response = await api.get(`/api/course-progress/${courseId}/completed`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    })
    
    completedVideos.value.clear()
    completedAssignments.value.clear()
    
    response.data.forEach(item => {
      if (item.content_type === 'video') {
        completedVideos.value.add(item.content_key)
      } else if (item.content_type === 'assignment') {
        completedAssignments.value.add(item.content_key)
      }
    })
  } catch (error) {
    console.error('Error fetching completed items:', error)
  }
}

// Helper methods
const isVideoCompleted = (video) => {
  const contentKey = `week${video.week?.week_number}_video_${video.id}`
  return completedVideos.value.has(contentKey)
}

const isAssignmentCompleted = (assignment) => {
  const contentKey = `week${assignment.week?.week_number}_assignment_${assignment.id}`
  return completedAssignments.value.has(contentKey)
}

// UI Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleSection = (section) => {
  if (expandedSections.value[section] !== undefined) {
    expandedSections.value[section] = !expandedSections.value[section]
  }
}

const toggleWeek = (section, weekNumber) => {
  if (!weekNumber) return
  const key = `${section}-${weekNumber}`
  expandedWeeks.value[key] = !expandedWeeks.value[key]
}

const selectContent = (type, week, details = null) => {
  if (!type || !week) return
  
  // Extract week number from week object
  const weekNumber = typeof week === 'object' ? week.week_number : week
  
  if (details?.type === 'video') {
    selectedContent.value = {
      type,
      week: weekNumber,
      weekObj: week, // Store the full week object for reference
      video: details.video,
      videoKey: details.video.video_key,
      videoUrl: details.video.url,
      assignment: null,
      note: null
    }
  } else if (details?.type === 'assignment') {
    selectedContent.value = {
      type,
      week: weekNumber,
      weekObj: week,
      video: null,
      assignment: details.assignment,
      assignmentKey: details.assignment.assignment_key || details.assignment.id,
      note: null
    }
  } else if (details?.type === 'notes') {
    selectedContent.value = {
      type,
      week: weekNumber,
      weekObj: week,
      video: null,
      assignment: null,
      note: details.note,
      notesUrl: details.note.file_url
    }
  } else {
    // Just the week overview (no specific video/assignment selected)
    selectedContent.value = {
      type,
      week: weekNumber,
      weekObj: week,
      video: null,
      assignment: null,
      note: null
    }
  }
  
  console.log('Selected content updated:', selectedContent.value)
}

const handleContentUpdate = (data) => {
  selectedContent.value = {
    ...selectedContent.value,
    ...data
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Lifecycle
onMounted(() => {
  fetchCourseDetails()
})
</script>

<style scoped>
/* Smooth transitions for expandable sections */
.space-y-1 {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for the navigation */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>