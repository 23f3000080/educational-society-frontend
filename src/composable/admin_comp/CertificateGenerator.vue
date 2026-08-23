<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Certificate Management
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generate and manage certificates for course completions
          </p>
        </div>
        <div class="mt-4 md:mt-0 flex space-x-3">
          <button
            @click="showGenerateModal = true"
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Generate Certificate
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Certificates</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
            </div>
            <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Verified</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.verified }}</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Pending</p>
              <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.pending }}</p>
            </div>
            <div class="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Expired</p>
              <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.expired }}</p>
            </div>
            <div class="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by user, course, or certificate number..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div class="flex gap-3">
            <select
              v-model="statusFilter"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
            <button
              @click="fetchCertificates"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <svg class="animate-spin mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-3 text-gray-500 dark:text-gray-400">Loading certificates...</p>
      </div>

      <!-- Certificates Table -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Certificate #
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Course
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Completion Date
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-if="filteredCertificates.length === 0">
                <td colspan="6" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No certificates found. Generate your first certificate!
                </td>
              </tr>
              <tr 
                v-for="certificate in filteredCertificates" 
                :key="certificate.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td class="px-4 py-3">
                  <span class="text-xs font-mono font-medium text-gray-900 dark:text-white">
                    {{ certificate.certificate_number }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ certificate.user_name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ certificate.user_email }}</p>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <p class="text-sm text-gray-900 dark:text-white">{{ certificate.course_title }}</p>
                </td>
                <td class="px-4 py-3">
                  <span :class="getStatusBadgeClass(certificate.status)">
                    {{ certificate.status || 'N/A' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <span class="text-sm text-gray-600 dark:text-gray-300">
                    {{ formatDate(certificate.completion_date) }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewCertificate(certificate)"
                      class="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      @click="openEditModal(certificate)"
                      class="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title="Edit Certificate"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="deleteCertificate(certificate)"
                      class="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Certificate"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <CertificateCreateModal
      v-if="showGenerateModal"
      @close="showGenerateModal = false"
      @generated="handleCertificateGenerated"
    />

    <CertificateEditModal
      v-if="showEditModal"
      :certificate="selectedCertificate"
      @close="showEditModal = false"
      @updated="handleCertificateUpdated"
    />

    <!-- View Certificate Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 z-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" @click="showViewModal = false"></div>
        
        <div class="relative z-10 inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-white">Certificate Details</h3>
              <button @click="showViewModal = false" class="text-white hover:text-gray-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="p-6" v-if="viewingCertificate">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Certificate Number</p>
                  <p class="text-sm font-mono font-medium text-gray-900 dark:text-white">{{ viewingCertificate.certificate_number }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Verification Token</p>
                  <p class="text-sm font-mono text-gray-900 dark:text-white">{{ viewingCertificate.verification_token }}</p>
                </div>
              </div>
              
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">User</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ viewingCertificate.user_name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ viewingCertificate.user_email }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Course</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ viewingCertificate.course_title }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p class="text-sm text-gray-900 dark:text-white">{{ viewingCertificate.duration_months }} months</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <span :class="getStatusBadgeClass(viewingCertificate.status)">{{ viewingCertificate.status }}</span>
                </div>
              </div>
              
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Completion Date</p>
                <p class="text-sm text-gray-900 dark:text-white">{{ formatDate(viewingCertificate.completion_date) }}</p>
              </div>
              
              <div v-if="viewingCertificate.grade">
                <p class="text-sm text-gray-500 dark:text-gray-400">Grade</p>
                <p class="text-sm text-gray-900 dark:text-white">{{ viewingCertificate.grade }}</p>
              </div>
              
              <div v-if="viewingCertificate.project_title">
                <p class="text-sm text-gray-500 dark:text-gray-400">Project Title</p>
                <p class="text-sm text-gray-900 dark:text-white">{{ viewingCertificate.project_title }}</p>
              </div>
              
              <div v-if="viewingCertificate.instructor_name">
                <p class="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
                <p class="text-sm text-gray-900 dark:text-white">{{ viewingCertificate.instructor_name }}</p>
              </div>
              
              <div v-if="viewingCertificate.description">
                <p class="text-sm text-gray-500 dark:text-gray-400">Description</p>
                <p class="text-sm text-gray-900 dark:text-white">{{ viewingCertificate.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '../../services/axios.js'
import CertificateCreateModal from '../../components/admin/CertificateCreateModal.vue'
import CertificateEditModal from '../../components/admin/CertificateEditModel.vue'

// State
const loading = ref(false)
const certificates = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const showGenerateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedCertificate = ref(null)
const viewingCertificate = ref(null)

// Stats
const stats = computed(() => {
  const total = certificates.value.length
  const verified = certificates.value.filter(c => c.status === 'verified').length
  const pending = certificates.value.filter(c => c.status === 'pending').length
  const expired = certificates.value.filter(c => c.status === 'expired').length
  
  return { total, verified, pending, expired }
})

// Filtered certificates
const filteredCertificates = computed(() => {
  let filtered = certificates.value
  
  if (statusFilter.value) {
    filtered = filtered.filter(c => c.status === statusFilter.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(c => 
      c.certificate_number?.toLowerCase().includes(query) ||
      c.user_name?.toLowerCase().includes(query) ||
      c.user_email?.toLowerCase().includes(query) ||
      c.course_title?.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

// Methods
const fetchCertificates = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/admin/certificates')
    certificates.value = response.data
  } catch (error) {
    console.error('Error fetching certificates:', error)
    alert('Failed to load certificates. Please try again.')
  } finally {
    loading.value = false
  }
}

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
    month: 'short',
    day: 'numeric'
  })
}

const handleCertificateGenerated = (data) => {
  showGenerateModal.value = false
  fetchCertificates()
  // Show success message
  alert(`Certificate generated successfully!\nNumber: ${data.certificate.certificate_number}`)
}

const handleCertificateUpdated = () => {
  showEditModal.value = false
  fetchCertificates()
  alert('Certificate updated successfully!')
}

const viewCertificate = (certificate) => {
  viewingCertificate.value = certificate
  showViewModal.value = true
}

const openEditModal = (certificate) => {
  selectedCertificate.value = certificate
  showEditModal.value = true
}

const deleteCertificate = async (certificate) => {
  if (!confirm(`Are you sure you want to delete certificate ${certificate.certificate_number}?`)) {
    return
  }
  
  try {
    await axios.delete(`/api/admin/delete_certificate/${certificate.id}`)
    fetchCertificates()
    alert('Certificate deleted successfully!')
  } catch (error) {
    console.error('Error deleting certificate:', error)
    alert('Failed to delete certificate. Please try again.')
  }
}

// Lifecycle
onMounted(() => {
  fetchCertificates()
})
</script>