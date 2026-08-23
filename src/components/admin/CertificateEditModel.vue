<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div 
        class="fixed inset-0 z-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" 
        @click="$emit('close')"
      ></div>

      <div class="relative z-10 inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <!-- Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-white">Edit Certificate</h3>
              <p class="mt-1 text-sm text-blue-100">Update certificate details</p>
            </div>
            <button @click="$emit('close')" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Certificate Info (Read-only) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Certificate Number</p>
              <p class="text-sm font-mono font-medium text-gray-900 dark:text-white">{{ certificate.certificate_number }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Verification Token</p>
              <p class="text-sm font-mono text-gray-900 dark:text-white">{{ certificate.verification_token }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">User</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ certificate.user_name }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Course</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ certificate.course_title }}</p>
            </div>
          </div>

          <!-- Editable Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (Months)
              </label>
              <input
                v-model.number="form.duration_months"
                type="number"
                min="1"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Completion Date
              </label>
              <input
                v-model="form.completion_date"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade
              </label>
              <input
                v-model="form.grade"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., A, 95%, Distinction"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                v-model="form.status"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Title
            </label>
            <input
              v-model="form.project_title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Instructor Name
            </label>
            <input
              v-model="form.instructor_name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter instructor name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Certificate description or notes"
            ></textarea>
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
              :disabled="submitting"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span v-if="submitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
              <span v-else>Update Certificate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from '../../services/axios.js'

const props = defineProps({
  certificate: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'updated'])

// State
const submitting = ref(false)
const error = ref('')

const form = ref({
  duration_months: '',
  completion_date: '',
  grade: '',
  project_title: '',
  description: '',
  instructor_name: '',
  status: ''
})

// Initialize form with certificate data
watch(() => props.certificate, (newCert) => {
  if (newCert) {
    form.value = {
      duration_months: newCert.duration_months || '',
      completion_date: newCert.completion_date ? newCert.completion_date.split('T')[0] : '',
      grade: newCert.grade || '',
      project_title: newCert.project_title || '',
      description: newCert.description || '',
      instructor_name: newCert.instructor_name || '',
      status: newCert.status || 'pending'
    }
  }
}, { immediate: true })

// Methods
const handleSubmit = async () => {
  submitting.value = true
  error.value = ''
  
  try {
    const payload = {
      duration_months: form.value.duration_months,
      completion_date: form.value.completion_date,
      grade: form.value.grade,
      project_title: form.value.project_title,
      description: form.value.description,
      instructor_name: form.value.instructor_name,
      status: form.value.status
    }
    
    await axios.put(`/api/admin/update_certificate/${props.certificate.id}`, payload)
    emit('updated')
  } catch (err) {
    console.error('Error updating certificate:', err)
    error.value = err.response?.data?.error || 'Failed to update certificate. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>