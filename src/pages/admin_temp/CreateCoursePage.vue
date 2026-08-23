<template>
  <div class="max-w-6xl mx-auto p-4 md:p-6">
    <!-- Header with Back Button -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Create New Course
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Fill in the course details below. Fields marked with <span class="text-red-500">*</span> are required.
          </p>
        </div>
      </div>
      <div class="hidden md:block">
        <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
          Admin Panel
        </span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Form -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <!-- Form Header -->
          <div class="px-6 py-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              Course Information
            </h2>
          </div>

          <!-- Form -->
          <form @submit.prevent="createCourse" class="p-6 space-y-6">
            <!-- Basic Information Section -->
            <div class="space-y-4">
              <h3 class="text-md font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Basic Information
              </h3>

              <!-- Course Code + Title -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">
                    Course Code <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.trim="form.course_code"
                    type="text"
                    placeholder="e.g., CS101"
                    class="input"
                    :class="{ 'border-red-500': errors.course_code }"
                    required
                  />
                  <p v-if="errors.course_code" class="text-red-500 text-sm mt-1">
                    {{ errors.course_code }}
                  </p>
                </div>
                <div>
                  <label class="form-label">
                    Course Title <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.trim="form.title"
                    type="text"
                    placeholder="e.g., Introduction to Programming"
                    class="input"
                    :class="{ 'border-red-500': errors.title }"
                    required
                  />
                  <p v-if="errors.title" class="text-red-500 text-sm mt-1">
                    {{ errors.title }}
                  </p>
                </div>
              </div>

              <!-- Class Level + Subject -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Class Level</label>
                  <select v-model="form.class_level" class="input">
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Subject Area</label>
                  <input
                    v-model.trim="form.subject"
                    type="text"
                    placeholder="e.g., Computer Science, Mathematics"
                    class="input"
                  />
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="form-label">Course Description</label>
              <textarea
                v-model.trim="form.description"
                rows="4"
                placeholder="Describe the course objectives, content, and learning outcomes..."
                class="input resize-none"
              ></textarea>
              <div class="flex justify-end mt-1">
                <span class="text-sm text-gray-500">
                  {{ form.description.length }}/1000 characters
                </span>
              </div>
            </div>

            <!-- Duration & Fees Section -->
            <div class="space-y-4">
              <h3 class="text-md font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Duration & Fees
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Duration (Months)</label>
                  <input
                    v-model.number="form.duration_months"
                    type="number"
                    min="0"
                    max="36"
                    placeholder="e.g., 6"
                    class="input"
                  />
                </div>
                <div>
                  <label class="form-label">
                    Course Fee <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      v-model.number="form.fee"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      class="input pl-8"
                      :class="{ 'border-red-500': errors.fee }"
                      required
                    />
                  </div>
                  <p v-if="errors.fee" class="text-red-500 text-sm mt-1">
                    {{ errors.fee }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Schedule Section -->
            <div class="space-y-4">
              <h3 class="text-md font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Start Date</label>
                  <input
                    v-model="form.start_date"
                    type="date"
                    class="input"
                    :min="minDate"
                  />
                </div>
                <div>
                  <label class="form-label">End Date</label>
                  <input
                    v-model="form.end_date"
                    type="date"
                    class="input"
                    :min="form.start_date || minDate"
                  />
                </div>
              </div>
            </div>

            <!-- Image Upload Section -->
            <div class="space-y-4">
              <h3 class="text-md font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Course Image
              </h3>

              <div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer"
                   @click="$refs.fileInput.click()">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileChange"
                  class="hidden"
                />

                <div v-if="!preview" class="space-y-3">
                  <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div>
                    <p class="text-gray-600 dark:text-gray-400 font-medium">
                      Drop your image here, or
                      <span class="text-indigo-600 dark:text-indigo-400">browse</span>
                    </p>
                    <p class="text-sm text-gray-500 mt-1">
                      Supports: JPG, PNG, GIF • Max: 5MB
                    </p>
                  </div>
                </div>

                <div v-else class="relative">
                  <img
                    :src="preview"
                    class="mx-auto h-48 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    @click.stop="removeImage"
                    class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <p v-if="imageError" class="text-red-500 text-sm">
                {{ imageError }}
              </p>
            </div>

            <!-- Status Section -->
            <div class="space-y-4">
              <h3 class="text-md font-medium text-gray-700 dark:text-gray-300">
                Course Status
              </h3>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">
                    Course Availability
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    Set whether this course is active and available for enrollment
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="form.is_active"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {{ form.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t dark:border-gray-700">
              <button
                type="button"
                @click="resetForm"
                :disabled="loading"
                class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
              <button
                type="submit"
                :disabled="loading || !isFormValid"
                class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ loading ? 'Creating...' : 'Create Course' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column - Preview & Instructions -->
      <div class="space-y-6">
        <!-- Course Preview -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Course Preview
          </h3>
          <div class="space-y-4">
            <div v-if="preview" class="aspect-video rounded-lg overflow-hidden">
              <img :src="preview" class="w-full h-full object-cover" />
            </div>
            <div v-else class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span class="text-gray-500">No image selected</span>
            </div>
            <div class="space-y-2">
              <h4 class="font-medium text-gray-800 dark:text-white">
                {{ form.title || 'Course Title' }}
              </h4>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded">
                  {{ form.course_code || 'CODE' }}
                </span>
                <span v-if="form.class_level" class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                  {{ form.class_level }}
                </span>
                <span v-if="form.subject" class="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                  {{ form.subject }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ form.description || 'No description provided' }}
              </p>
              <div class="flex items-center justify-between pt-2">
                <span class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ form.fee ? `$${form.fee}` : 'Free' }}
                </span>
                <span class="text-sm text-gray-500">
                  {{ form.duration_months ? `${form.duration_months} months` : 'Flexible' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips & Guidelines -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
          <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips for Success
          </h3>
          <ul class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>Use descriptive course titles and codes</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>Add high-quality images (1200×630px recommended)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>Set realistic durations and fees</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>Double-check dates before publishing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="fixed bottom-4 right-4 z-50">
      <div :class="['px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300', 
                    toastType === 'success' ? 'bg-green-500' : 'bg-red-500']">
        <div class="flex items-center gap-3">
          <svg v-if="toastType === 'success'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-white font-medium">{{ toastMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios.js'

const router = useRouter()

/* ================= STATE ================= */
const loading = ref(false)
const preview = ref(null)
const imageFile = ref(null)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const imageError = ref('')
const errors = reactive({
  course_code: '',
  title: '',
  fee: ''
})

const form = reactive({
  course_code: '',
  title: '',
  class_level: '',
  subject: '',
  description: '',
  duration_months: null,
  fee: null,
  start_date: '',
  end_date: '',
  is_active: true
})

/* ================= COMPUTED ================= */
const minDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const isFormValid = computed(() => {
  return form.course_code.trim() && form.title.trim() && form.fee !== null && form.fee >= 0
})

/* ================= WATCHERS ================= */
watch(() => form.course_code, (newVal) => {
  if (newVal.length > 20) {
    form.course_code = newVal.substring(0, 20)
  }
})

watch(() => form.description, (newVal) => {
  if (newVal.length > 1000) {
    form.description = newVal.substring(0, 1000)
  }
})

/* ================= IMAGE HANDLING ================= */
function handleFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    imageError.value = 'File size must be less than 5MB'
    return
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    imageError.value = 'Only JPG, PNG, GIF, and WebP images are allowed'
    return
  }

  imageFile.value = file
  imageError.value = ''
  
  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    preview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  imageFile.value = null
  preview.value = null
  imageError.value = ''
  if (document.querySelector('input[type="file"]')) {
    document.querySelector('input[type="file"]').value = ''
  }
}

/* ================= FORM VALIDATION ================= */
function validateForm() {
  let isValid = true
  errors.course_code = ''
  errors.title = ''
  errors.fee = ''

  if (!form.course_code.trim()) {
    errors.course_code = 'Course code is required'
    isValid = false
  }

  if (!form.title.trim()) {
    errors.title = 'Course title is required'
    isValid = false
  }

  if (form.fee === null || form.fee === '') {
    errors.fee = 'Course fee is required'
    isValid = false
  } else if (form.fee < 0) {
    errors.fee = 'Course fee cannot be negative'
    isValid = false
  }

  return isValid
}

/* ================= TOAST ================= */
function showNotification(message, type = 'success') {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

/* ================= API ================= */
async function createCourse() {
  if (!validateForm()) {
    showNotification('Please fix the errors in the form', 'error')
    return
  }

  loading.value = true

  try {
    const formData = new FormData()

    // Append form data
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formData.append(key, value)
      }
    })

    // Append image if exists
    if (imageFile.value) {
      formData.append('picture', imageFile.value)
    }

    const response = await api.post('/api/create_course', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (response.data.success) {
      showNotification('Course created successfully!', 'success')
      
      // Redirect to course list or edit page after 1.5 seconds
      setTimeout(() => {
        router.push('/admin/courses')
      }, 1500)
    }
  } catch (err) {
    console.error('Error creating course:', err)
    
    if (err.response?.status === 409) {
      errors.course_code = 'This course code already exists'
      showNotification('Course code already exists. Please use a different code.', 'error')
    } else if (err.response?.status === 400) {
      const errorMsg = err.response.data.error
      if (errorMsg.includes('picture')) {
        imageError.value = errorMsg
      }
      showNotification(errorMsg || 'Invalid form data', 'error')
    } else if (err.response?.status === 401 || err.response?.status === 403) {
      showNotification('You do not have permission to create courses', 'error')
    } else {
      showNotification('Failed to create course. Please try again.', 'error')
    }
  } finally {
    loading.value = false
  }
}

/* ================= RESET ================= */
function resetForm() {
  if (confirm('Are you sure you want to clear all fields?')) {
    Object.keys(form).forEach(key => {
      form[key] = key === 'is_active' ? true : ''
    })
    removeImage()
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })
    showNotification('Form cleared', 'success')
  }
}

/* ================= LIFECYCLE ================= */
onMounted(() => {
  // Set default dates
  const today = new Date()
  const nextMonth = new Date(today)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  
  form.start_date = today.toISOString().split('T')[0]
  form.end_date = nextMonth.toISOString().split('T')[0]
})
</script>

<style scoped lang="postcss">
.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.input {
  @apply w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
         transition-colors placeholder-gray-500 dark:placeholder-gray-400;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

/* Smooth transitions for form elements */
.input, button {
  @apply transition-all duration-200;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded;
}

textarea::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600 rounded;
}

textarea::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-500;
}
</style>