<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div 
        class="fixed inset-0 z-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" 
        @click="$emit('close')"
      ></div>

      <div class="relative z-10 inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <!-- Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-white">Generate Certificate</h3>
              <p class="mt-1 text-sm text-green-100">Generate verified certificates for course completion</p>
            </div>
            <button @click="$emit('close')" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="loadingData" class="p-12 text-center">
          <svg class="animate-spin mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-3 text-gray-500 dark:text-gray-400">Loading data...</p>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Toggle: Single User or Multiple Users -->
          <div class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                v-model="generationMode"
                value="single"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">Single User</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                v-model="generationMode"
                value="multiple"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">Multiple Users</span>
            </label>
          </div>

          <!-- Single User Selection -->
          <div v-if="generationMode === 'single'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="userSearch"
                type="text"
                placeholder="Search user by name or email..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                @input="showUserDropdown = true"
                @focus="showUserDropdown = true"
                @blur="handleUserBlur"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              <div 
                v-if="showUserDropdown && filteredUsers.length > 0"
                class="absolute z-20 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <button
                  v-for="user in filteredUsers"
                  :key="user.id"
                  type="button"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  @mousedown.prevent="selectUser(user)"
                >
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span class="text-green-600 dark:text-green-300 font-medium">{{ getUserInitials(user) }}</span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            <div v-if="selectedUser" class="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span class="text-green-600 dark:text-green-300 font-medium">{{ getUserInitials(selectedUser) }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedUser.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ selectedUser.email }}</p>
                  </div>
                </div>
                <button type="button" @click="clearSelectedUser" class="text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Multiple Users Selection -->
          <div v-else>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Users <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="multiUserSearch"
                type="text"
                placeholder="Search and select users..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                @input="showMultiUserDropdown = true"
                @focus="showMultiUserDropdown = true"
                @blur="handleMultiUserBlur"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              <div 
                v-if="showMultiUserDropdown && filteredMultiUsers.length > 0"
                class="absolute z-20 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <button
                  v-for="user in filteredMultiUsers"
                  :key="user.id"
                  type="button"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between"
                  @mousedown.prevent="toggleUserSelection(user)"
                >
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span class="text-green-600 dark:text-green-300 font-medium">{{ getUserInitials(user) }}</span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                    </div>
                  </div>
                  <span v-if="isUserSelected(user)" class="text-green-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <!-- Selected Users Tags -->
            <div v-if="selectedUsers.length > 0" class="mt-2 flex flex-wrap gap-2">
              <div
                v-for="user in selectedUsers"
                :key="user.id"
                class="inline-flex items-center px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg text-sm"
              >
                <span class="text-green-700 dark:text-green-300">{{ user.name }}</span>
                <button
                  type="button"
                  @click="removeUserFromSelection(user.id)"
                  class="ml-2 text-green-500 hover:text-red-500"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p v-else class="mt-2 text-sm text-gray-500 dark:text-gray-400">No users selected. Search and select users above.</p>
          </div>

          <!-- Course Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course <span class="text-red-500">*</span>
            </label>
            
            <!-- Course Search -->
            <div class="relative">
              <input
                v-model="courseSearch"
                type="text"
                placeholder="Search course by name or code..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                @input="showCourseDropdown = true"
                @focus="showCourseDropdown = true"
                @blur="handleCourseBlur"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              
              <div 
                v-if="showCourseDropdown && filteredCourses.length > 0"
                class="absolute z-20 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <button
                  v-for="course in filteredCourses"
                  :key="course.id"
                  type="button"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  @mousedown.prevent="selectCourse(course)"
                >
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ course.title }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Course Code: {{ course.course_code }}</p>
                  </div>
                </button>
              </div>
            </div>
            
            <!-- Selected Course Display -->
            <div v-if="selectedCourse" class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedCourse.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Course Code: {{ selectedCourse.course_code }}</p>
                </div>
                <button type="button" @click="clearSelectedCourse" class="text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Certificate Course Code Input (2 characters) -->
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Certificate Course Code (2 characters) <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="certificateCourseCode"
                  type="text"
                  maxlength="2"
                  placeholder="e.g., PY, DS, WD"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase"
                  @input="validateCourseCode"
                />
                <div class="absolute right-3 top-2.5">
                  <span v-if="certificateCourseCode.length === 2" class="text-green-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span v-else-if="certificateCourseCode.length > 0" class="text-red-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter a 2-character code for the certificate (e.g., PY for Python, DS for Data Science)
              </p>
              <p v-if="certificateCourseCode && certificateCourseCode.length !== 2" class="mt-1 text-xs text-red-500">
                Course code must be exactly 2 characters
              </p>
            </div>

            <!-- Summary -->
            <div v-if="selectedCourse || certificateCourseCode" class="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certificate Generation Details:</p>
              <div class="space-y-1 text-sm">
                <div v-if="selectedCourse" class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">Course:</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ selectedCourse.title }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">Certificate Code:</span>
                  <span class="text-gray-900 dark:text-white font-mono font-bold">{{ certificateCourseCode || 'Not set' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Certificate Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade
              </label>
              <input
                v-model="form.grade"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., A, 95%, Distinction"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instructor Name
              </label>
              <input
                v-model="form.instructor_name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter instructor name"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Title
            </label>
            <input
              v-model="form.project_title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter project title (if applicable)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Additional certificate description or notes"
            ></textarea>
          </div>

          <!-- Generated Certificates Preview -->
          <div v-if="generatedCertificates.length > 0" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {{ generatedCertificates.length }} Certificate(s) Generated
            </h4>
            <div class="max-h-60 overflow-y-auto space-y-2">
              <div 
                v-for="(cert, index) in generatedCertificates" 
                :key="index"
                class="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600"
              >
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ cert.user_name }}</span>
                  <span class="text-xs font-mono font-medium text-gray-900 dark:text-white">{{ cert.certificate_number }}</span>
                </div>
              </div>
            </div>
            <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm text-green-700 dark:text-green-300">
                  {{ generatedCertificates.length }} certificate(s) generated successfully!
                </span>
              </div>
            </div>
          </div>

          <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-red-700 dark:text-red-300">{{ error }}</span>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              :disabled="submitting || !isFormValid"
              class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span v-if="submitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
              <span v-else>
                <span v-if="generationMode === 'single'">Generate Certificate</span>
                <span v-else>Generate Certificates ({{ selectedUsers.length }})</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from '../../services/axios.js'

const emit = defineEmits(['close', 'generated'])

// State
const loadingData = ref(false)
const submitting = ref(false)
const error = ref('')
const generationMode = ref('single') // 'single' or 'multiple'

// Single user selection
const userSearch = ref('')
const showUserDropdown = ref(false)
const selectedUser = ref(null)

// Multiple users selection
const multiUserSearch = ref('')
const showMultiUserDropdown = ref(false)
const selectedUsers = ref([])

// Course selection
const courseSearch = ref('')
const showCourseDropdown = ref(false)
const selectedCourse = ref(null)
const certificateCourseCode = ref('')

const generatedCertificates = ref([])

const users = ref([])
const courses = ref([])

const form = ref({
  grade: '',
  project_title: '',
  description: '',
  instructor_name: ''
})

// Computed
const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value
  const search = userSearch.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search)
  )
})

const filteredMultiUsers = computed(() => {
  if (!multiUserSearch.value) return users.value
  const search = multiUserSearch.value.toLowerCase()
  return users.value.filter(user => 
    (user.name.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search)) &&
    !selectedUsers.value.some(u => u.id === user.id)
  )
})

const filteredCourses = computed(() => {
  if (!courseSearch.value) return courses.value
  const search = courseSearch.value.toLowerCase()
  return courses.value.filter(course => 
    course.title.toLowerCase().includes(search) ||
    course.course_code.toLowerCase().includes(search)
  )
})

const isFormValid = computed(() => {
  // Need course selected AND 2-character course code
  const hasCourse = selectedCourse.value
  const hasValidCode = certificateCourseCode.value.length === 2
  
  if (generationMode.value === 'single') {
    return selectedUser.value && hasCourse && hasValidCode
  } else {
    return selectedUsers.value.length > 0 && hasCourse && hasValidCode
  }
})

// Methods
const fetchCertificateData = async () => {
  loadingData.value = true
  try {
    const response = await axios.get('/api/admin/certificate_data')
    users.value = response.data.users || []
    courses.value = response.data.courses || []
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = 'Failed to load data. Please try again.'
  } finally {
    loadingData.value = false
  }
}

const getUserInitials = (user) => {
  if (!user) return ''
  return user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const validateCourseCode = () => {
  // Only allow uppercase letters and digits
  certificateCourseCode.value = certificateCourseCode.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  // Limit to 2 characters
  if (certificateCourseCode.value.length > 2) {
    certificateCourseCode.value = certificateCourseCode.value.slice(0, 2)
  }
}

const handleUserBlur = () => {
  setTimeout(() => { showUserDropdown.value = false }, 200)
}

const handleCourseBlur = () => {
  setTimeout(() => { showCourseDropdown.value = false }, 200)
}

const handleMultiUserBlur = () => {
  setTimeout(() => { showMultiUserDropdown.value = false }, 200)
}

const selectUser = (user) => {
  selectedUser.value = user
  userSearch.value = user.name
  showUserDropdown.value = false
}

const selectCourse = (course) => {
  selectedCourse.value = course
  courseSearch.value = course.title
  showCourseDropdown.value = false
  // Auto-fill certificate course code from course's code if not set
  if (!certificateCourseCode.value && course.course_code) {
    certificateCourseCode.value = course.course_code.slice(0, 2).toUpperCase()
  }
}

const clearSelectedUser = () => {
  selectedUser.value = null
  userSearch.value = ''
}

const clearSelectedCourse = () => {
  selectedCourse.value = null
  courseSearch.value = ''
}

const toggleUserSelection = (user) => {
  const index = selectedUsers.value.findIndex(u => u.id === user.id)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(user)
  }
  multiUserSearch.value = ''
  showMultiUserDropdown.value = false
}

const isUserSelected = (user) => {
  return selectedUsers.value.some(u => u.id === user.id)
}

const removeUserFromSelection = (userId) => {
  const index = selectedUsers.value.findIndex(u => u.id === userId)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  }
}

const generateSingleCertificate = async (userId, courseId, courseCode) => {
  const payload = {
    user_id: userId,
    course_id: courseId,
    course_code: courseCode, // This is the 2-character code
    grade: form.value.grade,
    project_title: form.value.project_title,
    description: form.value.description,
    instructor_name: form.value.instructor_name
  }
  
  console.log('Sending payload:', payload)
  const response = await axios.post('/api/admin/generate_certificate', payload)
  return response.data
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  submitting.value = true
  error.value = ''
  generatedCertificates.value = []
  
  try {
    const courseId = selectedCourse.value?.id
    const courseCode = certificateCourseCode.value.toUpperCase()
    
    if (!courseId) {
      throw new Error('Please select a course')
    }
    
    if (courseCode.length !== 2) {
      throw new Error('Certificate course code must be exactly 2 characters')
    }
    
    let certificates = []
    
    if (generationMode.value === 'single') {
      // Generate for single user
      const result = await generateSingleCertificate(
        selectedUser.value.id,
        courseId,
        courseCode
      )
      
      if (result.success) {
        certificates.push({
          user_name: selectedUser.value.name,
          certificate_number: result.certificate_number,
          verification_token: result.verification_token
        })
      }
    } else {
      // Generate for multiple users
      for (const user of selectedUsers.value) {
        try {
          const result = await generateSingleCertificate(
            user.id,
            courseId,
            courseCode
          )
          
          if (result.success) {
            certificates.push({
              user_name: user.name,
              certificate_number: result.certificate_number,
              verification_token: result.verification_token
            })
          }
        } catch (err) {
          console.error(`Failed to generate certificate for ${user.name}:`, err)
          // Continue with other users
        }
      }
    }
    
    if (certificates.length > 0) {
      generatedCertificates.value = certificates
      
      emit('generated', {
        mode: generationMode.value,
        count: certificates.length,
        certificates: certificates,
        course: selectedCourse.value,
        course_code: courseCode,
        formData: form.value
      })
    } else {
      error.value = 'No certificates were generated. Please try again.'
    }
  } catch (err) {
    console.error('Error generating certificates:', err)
    error.value = err.response?.data?.error || err.message || 'Failed to generate certificates. Please try again.'
  } finally {
    submitting.value = false
  }
}

// Watch for mode change to reset selections
watch(generationMode, () => {
  selectedUser.value = null
  userSearch.value = ''
  selectedUsers.value = []
  multiUserSearch.value = ''
  generatedCertificates.value = []
  error.value = ''
})

// Watch for course selection to auto-fill code if empty
watch(selectedCourse, (newCourse) => {
  if (newCourse && !certificateCourseCode.value) {
    certificateCourseCode.value = newCourse.course_code.slice(0, 2).toUpperCase()
  }
})

onMounted(() => {
  fetchCertificateData()
})
</script>