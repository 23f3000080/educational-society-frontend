<!-- views/admin/Courses.vue -->

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Course Management</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Create, edit, and manage all courses</p>
        </div>
        <button @click="openCreateModal"
          class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-md">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Course
        </button>
      </div>

      <div v-if="successMessage" class="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ errorMessage }}
      </div>

      <!-- Search and Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex-1 relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search courses by title, code, or subject..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              @input="debouncedSearch"
            />
          </div>
          <div class="flex items-center space-x-2">
            <select
              v-model="statusFilter"
              @change="handleStatusChange"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button @click="resetFilters" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Courses Grid -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>

      <div v-else-if="courses.length === 0" class="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <svg class="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
        <p class="text-gray-600 dark:text-gray-400">Get started by creating your first course</p>
        <button @click="openCreateModal" class="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Course
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="course in courses" :key="course.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200">
          
          <!-- Course Image -->
          <div class="h-40 bg-linear-to-r from-indigo-500 to-purple-600 relative">
            <img v-if="course.picture" :src="course.picture" :alt="course.title" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="absolute top-2 right-2">
              <span :class="course.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                class="px-2 py-1 rounded-full text-xs font-medium">
                {{ course.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <!-- Course Details -->
          <div class="p-5">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ course.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ course.course_code }}</p>
              </div>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ course.description }}</p>

            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span class="flex items-center mr-4">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ course.weeks_count }} weeks
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ₹{{ course.fee }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button @click="viewCourse(course.id)" class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm flex items-center" title="Manage Course">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Manage
              </button>
              <div class="flex space-x-2">
                <button @click="editCourse(course)" class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit Course">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDelete(course)" class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete Course">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <nav class="flex items-center space-x-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800">
            Previous
          </button>
          <span class="px-4 py-2 text-gray-700 dark:text-gray-300">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800">
            Next
          </button>
        </nav>
      </div>
    </div>

    <!-- Create/Edit Course Modal -->
    <CourseModal
      v-if="showModal"
      :course="selectedCourse"
      :mode="modalMode"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :item="courseToDelete"
      item-type="course"
      @close="closeDeleteModal"
      @confirm="deleteCourse"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios.js'
import CourseModal from '../../components/admin/CourseModal.vue'
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal.vue'
import { debounce } from 'lodash'

const router = useRouter()
const loading = ref(false)
const courses = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const statusFilter = ref('all')
const showModal = ref(false)
const showDeleteModal = ref(false)
const modalMode = ref('create')
const selectedCourse = ref(null)
const courseToDelete = ref(null)
const errorMessage = ref('')
const successMessage = ref('')

const setSuccessMessage = (message) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
  }, 2500)
}

const setErrorMessage = (message) => {
  errorMessage.value = message
}

// Fetch courses
const fetchCourses = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const params = {
      page: currentPage.value,
      per_page: 12,
      search: searchQuery.value
    }
    
    if (statusFilter.value !== 'all') {
      params.is_active = statusFilter.value === 'active'
    }
    
    const response = await api.get('/api/admin/courses', { params })
    courses.value = response.data.courses
    totalPages.value = response.data.pages
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
      await fetchCourses()
      return
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    setErrorMessage(error.response?.data?.error || 'Failed to load courses. Please try again.')
  } finally {
    loading.value = false
  }
}

// Debounced search
const debouncedSearch = debounce(() => {
  currentPage.value = 1
  fetchCourses()
}, 500)

// Change page
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) {
    return
  }
  currentPage.value = page
  fetchCourses()
}

const handleStatusChange = () => {
  currentPage.value = 1
  fetchCourses()
}

// Reset filters
const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  currentPage.value = 1
  fetchCourses()
}

// Modal functions
const openCreateModal = () => {
  errorMessage.value = ''
  modalMode.value = 'create'
  selectedCourse.value = null
  showModal.value = true
}

const editCourse = (course) => {
  modalMode.value = 'edit'
  selectedCourse.value = { ...course }
  showModal.value = true
}

const viewCourse = (courseId) => {
  router.push(`/admin/courses/${courseId}`)
}

const closeModal = () => {
  showModal.value = false
  selectedCourse.value = null
}

const handleSave = async (courseData) => {
  errorMessage.value = ''
  try {
    if (modalMode.value === 'create') {
      await api.post('/api/admin/courses', courseData)
      setSuccessMessage('Course created successfully.')
    } else {
      await api.put(`/api/admin/courses/${selectedCourse.value.id}`, courseData)
      setSuccessMessage('Course updated successfully.')
    }
    await fetchCourses()
    closeModal()
  } catch (error) {
    console.error('Error saving course:', error)
    setErrorMessage(error.response?.data?.error || 'Failed to save course. Please check the form and try again.')
  }
}

// Delete functions
const confirmDelete = (course) => {
  courseToDelete.value = course
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  courseToDelete.value = null
}

const deleteCourse = async () => {
  errorMessage.value = ''
  try {
    await api.delete(`/api/admin/courses/${courseToDelete.value.id}`)
    await fetchCourses()
    closeDeleteModal()
    setSuccessMessage('Course deleted successfully.')
  } catch (error) {
    console.error('Error deleting course:', error)
    setErrorMessage(error.response?.data?.error || 'Failed to delete course.')
  }
}

onMounted(() => {
  fetchCourses()
})
</script>