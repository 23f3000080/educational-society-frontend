<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Certificates</h1>
        <p class="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
          View and download your course completion certificates
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <svg class="animate-spin mx-auto h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-3 text-gray-500 dark:text-gray-400">Loading your certificates...</p>
      </div>

      <!-- Certificates Grid -->
      <div v-else-if="certificates.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="certificate in certificates"
          :key="certificate.id"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
        >
          <!-- Certificate Preview Card -->
          <div class="p-4 sm:p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {{ certificate.course_title }}
                </h3>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                  {{ certificate.course_code }}
                </p>
              </div>
              <span :class="getStatusBadgeClass(certificate.status)" class="ml-2 whitespace-nowrap">
                {{ certificate.status || 'Verified' }}
              </span>
            </div>

            <div class="mt-4 space-y-2">
              <div class="flex flex-col sm:flex-row sm:justify-between text-sm gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400">Certificate #</span>
                <span class="font-mono text-gray-900 dark:text-white text-xs break-all">
                  {{ certificate.certificate_number }}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between text-sm gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400">Completed</span>
                <span class="text-gray-900 dark:text-white">{{ formatDate(certificate.completion_date) }}</span>
              </div>
              <div v-if="certificate.grade" class="flex flex-col sm:flex-row sm:justify-between text-sm gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400">Grade</span>
                <span class="text-gray-900 dark:text-white font-medium">{{ certificate.grade }}</span>
              </div>
            </div>

            <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                @click="viewCertificate(certificate.id)"
                class="flex-1 px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <svg class="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </button>
              <button
                @click="downloadCertificate(certificate.id)"
                class="flex-1 px-3 sm:px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <svg class="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Certificates -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 dark:text-gray-500">
          <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Certificates Yet</h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You haven't earned any certificates yet. Complete courses to earn certificates.
          </p>
        </div>
      </div>
    </div>

    <!-- Certificate View Modal -->
    <div v-if="showCertificateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          class="fixed inset-0 z-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" 
          @click="showCertificateModal = false"
        ></div>

        <div class="relative z-10 inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <!-- Close Button -->
          <div class="absolute top-4 right-4 z-20">
            <button @click="showCertificateModal = false" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="loadingCertificate" class="p-12 text-center">
            <svg class="animate-spin mx-auto h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-3 text-gray-500 dark:text-gray-400">Loading certificate...</p>
          </div>

          <!-- Certificate Display -->
          <div v-else-if="currentCertificate" class="p-4 sm:p-6 md:p-8">
            <!-- Modern Certificate Design -->
            <div class="relative bg-white dark:bg-gray-900 rounded-2xl border-4 border-double border-blue-200 dark:border-blue-800 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
              <!-- Decorative Border -->
              <div class="absolute inset-3 sm:inset-4 border-2 border-blue-100 dark:border-blue-800 rounded-xl pointer-events-none"></div>
              
              <!-- Certificate Content -->
              <div class="relative z-10">
                <!-- Institution Logo/Header -->
                <div class="text-center mb-6 sm:mb-8">
                  <!-- Logo with Circular Frame -->
                  <div class="flex justify-center items-center mb-4">
                    <div class="relative">
                      <!-- Outer ring decoration
                      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 animate-spin-slow opacity-75" style="width: 72px; height: 72px; left: -4px; top: -4px;"></div> -->
                      <!-- Logo container -->
                      <div class="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white dark:bg-gray-800 shadow-xl border-2 border-blue-100 dark:border-blue-800 flex items-center justify-center overflow-hidden">
                        <img 
                          src="/ES_ICON.png" 
                          alt="Educational Society Logo" 
                          class="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Institution Name -->
                  <div class="mb-2">
                    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                      Educational Society
                    </h2>
                    <div class="flex justify-center mt-1">
                      <div class="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>

                  <!-- Certificate Title -->
                  <div class="mt-4 sm:mt-6">
                    <h1 class="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                      Certificate of Completion
                    </h1>
                    <div class="flex justify-center items-center mt-2 space-x-3">
                      <div class="flex-1 max-w-12 sm:max-w-16 h-px bg-gradient-to-r from-transparent to-blue-400"></div>
                      <span class="text-blue-400 dark:text-blue-500 text-base sm:text-xl">✦</span>
                      <div class="flex-1 max-w-12 sm:max-w-16 h-px bg-gradient-to-l from-transparent to-blue-400"></div>
                    </div>
                  </div>
                </div>

                <!-- Body -->
                <div class="text-center space-y-3 sm:space-y-4">
                  <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">This is to certify that</p>
                  
                  <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white break-words">
                    {{ currentCertificate.user_name }}
                  </h2>
                  
                  <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">has successfully completed the course</p>
                  
                  <h3 class="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400 break-words">
                    {{ currentCertificate.course_title }}
                  </h3>

                  <!-- Course Details -->
                  <div class="grid grid-cols-2 gap-2 sm:gap-4 max-w-2xl mx-auto mt-3 sm:mt-4">
                    <div v-if="currentCertificate.grade" class="text-center">
                      <p class="text-xs text-gray-500 dark:text-gray-400">Grade</p>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ currentCertificate.grade }}</p>
                    </div>
                    <div v-if="currentCertificate.duration_months" class="text-center">
                      <p class="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ currentCertificate.duration_months }} months</p>
                    </div>
                    <div v-if="currentCertificate.instructor_name" class="text-center">
                      <p class="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ currentCertificate.instructor_name }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatDate(currentCertificate.completion_date) }}</p>
                    </div>
                  </div>

                  <!-- QR Code and Certificate Number -->
                  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div v-if="currentCertificate.qr_code" class="shrink-0">
                      <img 
                        :src="`data:image/png;base64,${currentCertificate.qr_code}`" 
                        alt="QR Code" 
                        class="w-20 h-20 sm:w-24 sm:h-24"
                      />
                    </div>
                    <div class="text-left w-full sm:w-auto">
                      <p class="text-xs text-gray-500 dark:text-gray-400">Certificate Number</p>
                      <p class="text-xs sm:text-sm font-mono font-semibold text-gray-900 dark:text-white break-all">{{ currentCertificate.certificate_number }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Verification Token</p>
                      <p class="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">{{ currentCertificate.verification_token }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Verify at:</p>
                      <a :href="currentCertificate.verification_url" target="_blank" class="text-xs text-blue-600 hover:underline break-all">
                        {{ currentCertificate.verification_url }}
                      </a>
                    </div>
                  </div>

                  <!-- Description -->
                  <div v-if="currentCertificate.description" class="mt-3 sm:mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                    "{{ currentCertificate.description }}"
                  </div>

                  <!-- Download Button -->
                  <div class="mt-4 sm:mt-6">
                    <button
                      @click="downloadCertificate(currentCertificate.id)"
                      class="px-4 sm:px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm sm:text-base"
                    >
                      <svg class="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../../services/axios.js'

const loading = ref(false)
const loadingCertificate = ref(false)
const certificates = ref([])
const showCertificateModal = ref(false)
const currentCertificate = ref(null)

const getStatusBadgeClass = (status) => {
  const classes = {
    verified: 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    pending: 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    expired: 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
  }
  return classes[status] || 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchCertificates = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/my-certificates')
    certificates.value = response.data || []
  } catch (error) {
    console.error('Error fetching certificates:', error)
  } finally {
    loading.value = false
  }
}

const viewCertificate = async (certificateId) => {
  showCertificateModal.value = true
  loadingCertificate.value = true
  
  try {
    const response = await axios.get(`/api/certificates/${certificateId}`)
    currentCertificate.value = response.data
  } catch (error) {
    console.error('Error fetching certificate details:', error)
  } finally {
    loadingCertificate.value = false
  }
}

const downloadCertificate = async (certificateId) => {
  try {
    const response = await axios.get(`/api/certificates/${certificateId}/download`, {
      responseType: 'blob'
    })
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `certificate_${certificateId}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading certificate:', error)
  }
}

onMounted(() => {
  fetchCertificates()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
</style>