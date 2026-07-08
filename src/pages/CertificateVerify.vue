<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 sm:space-y-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl">
      <!-- Header -->
      <div>
        <div class="flex justify-center">
          <div 
            class="h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-500 shadow-lg"
            :class="getIconContainerClass()"
          >
            <!-- Verified Icon - Green checkmark for valid certificates -->
            <svg v-if="result?.valid && result?.status === 'verified'" 
                 class="w-8 h-8" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24"
                 >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <!-- Pending Icon - Yellow clock with pulse animation for pending certificates -->
            <svg v-else-if="result?.valid && result?.status === 'pending'" 
                 class="w-8 h-8 animate-pulse" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <!-- Expired Icon - Red warning/exclamation for expired certificates -->
            <svg v-else-if="result?.valid && result?.status === 'expired'" 
                 class="w-8 h-8" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <!-- Invalid Icon - Red cross for invalid/not found certificates -->
            <svg v-else-if="result && !result.valid" 
                 class="w-8 h-8" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
            
            <!-- Default Icon - Blue search/question mark for initial state -->
            <svg v-else 
                 class="w-8 h-8" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <h2 class="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Certificate Verification
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter the verification token to validate a certificate
        </p>
      </div>

      <!-- Search/Input Section -->
      <div class="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="token"
            v-model="token"
            type="text"
            placeholder="Enter verification token"
            class="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-100 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            @keyup.enter="verifyCertificate"
          />
        </div>

        <button
          @click="verifyCertificate"
          :disabled="!token || loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying...
          </span>
          <span v-else class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verify Certificate
          </span>
        </button>

        <!-- Auto-verification status -->
        <div v-if="autoVerified" class="text-center animate-pulse">
          <p class="text-sm text-blue-600 dark:text-blue-400">
            <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Auto-verifying...
          </p>
        </div>

        <!-- Result -->
        <div v-if="result" class="mt-4 transition-all duration-500">
          <!-- Valid Certificate with Status -->
          <div v-if="result.valid" 
               class="p-4 sm:p-5 rounded-lg border-2 transition-all duration-300"
               :class="getStatusCardClass(result.status)"
          >
            <!-- Status Header -->
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" :class="getStatusIconColor(result.status)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="result.status === 'verified'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path v-else-if="result.status === 'pending'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path v-else-if="result.status === 'expired'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium" :class="getStatusTextClass(result.status)">
                {{ getStatusDisplay(result.status) }}
              </span>
              <span class="ml-auto px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                    :class="getStatusBadgeClass(result.status)">
                {{ result.status || 'verified' }}
              </span>
            </div>

            <!-- Certificate Details -->
            <div class="mt-4 space-y-2.5 text-sm">
              <!-- Certificate Number -->
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Certificate Number</span>
                <span class="font-mono text-gray-900 dark:text-white text-xs sm:text-sm break-all">{{ result.certificate_number }}</span>
              </div>
              
              <!-- Recipient -->
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Recipient</span>
                <span class="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">{{ result.user_name }}</span>
              </div>
              
              <!-- Course -->
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Course</span>
                <span class="text-gray-900 dark:text-white font-medium text-sm sm:text-base">{{ result.course_title }}</span>
              </div>

              <!-- Divider -->
              <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              
              <!-- Duration -->
              <div v-if="result.duration_months" class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Duration</span>
                <span class="text-gray-900 dark:text-white text-sm">{{ result.duration_months }} months</span>
              </div>
              
              <!-- Start Date -->
              <div v-if="result.start_date" class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Start Date</span>
                <span class="text-gray-900 dark:text-white text-sm">{{ formatDate(result.start_date) }}</span>
              </div>
              
              <!-- End Date -->
              <div v-if="result.end_date" class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">End Date</span>
                <span class="text-gray-900 dark:text-white text-sm">{{ formatDate(result.end_date) }}</span>
              </div>
              
              <!-- Completion Date -->
              <div v-if="result.completion_date" class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Completion Date</span>
                <span class="text-gray-900 dark:text-white text-sm">{{ formatDate(result.completion_date) }}</span>
              </div>
              
              <!-- Grade (if available) -->
              <div v-if="result.grade" class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Grade</span>
                <span class="text-gray-900 dark:text-white font-semibold text-sm">{{ result.grade }}</span>
              </div>
              
              <!-- Instructor (if available) -->
              <div v-if="result.instructor_name" class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Instructor</span>
                <span class="text-gray-900 dark:text-white text-sm">{{ result.instructor_name }}</span>
              </div>
            </div>
          </div>

          <!-- Invalid Certificate -->
          <div v-else class="p-4 sm:p-5 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-200 dark:border-red-800 transition-all duration-300">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span class="text-sm font-medium text-red-700 dark:text-red-300">Certificate Invalid</span>
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ result.message }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Share/Print Options -->
        <div v-if="result?.valid" class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
          <button
            @click="printCertificate"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button
            @click="shareCertificate"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../services/axios.js'

const route = useRoute()
const token = ref('')
const loading = ref(false)
const result = ref(null)
const autoVerified = ref(false)

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getPrintIcon = () => {
  const status = result.value?.status;
  if (result.value?.valid && status === 'verified') {
    return `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (result.value?.valid && status === 'pending') {
    return `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (result.value?.valid && status === 'expired') {
    return `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else {
    return `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`;
  }
};

// Status helper functions
const getStatusDisplay = (status) => {
  const displays = {
    verified: 'Certificate is VALID',
    pending: 'Certificate is PENDING',
    expired: 'Certificate has EXPIRED'
  }
  return displays[status] || 'Certificate is VALID'
}

const getStatusCardClass = (status) => {
  const classes = {
    verified: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    pending: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    expired: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  }
  return classes[status] || classes.verified
}

const getStatusIconColor = (status) => {
  const colors = {
    verified: 'text-green-600 dark:text-green-400',
    pending: 'text-yellow-600 dark:text-yellow-400',
    expired: 'text-red-600 dark:text-red-400'
  }
  return colors[status] || colors.verified
}

const getStatusTextClass = (status) => {
  const classes = {
    verified: 'text-green-700 dark:text-green-300',
    pending: 'text-yellow-700 dark:text-yellow-300',
    expired: 'text-red-700 dark:text-red-300'
  }
  return classes[status] || classes.verified
}

const getStatusBadgeClass = (status) => {
  const classes = {
    verified: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    expired: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
  }
  return classes[status] || classes.verified
}

const getIconContainerClass = () => {
  // Verified status - Green gradient background (FIXED: changed bg-linear-to-br to bg-gradient-to-br)
  if (result?.valid && result?.status === 'verified') {
    return 'bg-green-500 dark:bg-green-600 shadow-green-500/30'
  } 
  // Pending status - Yellow/Orange gradient background
  else if (result?.valid && result?.status === 'pending') {
    return 'bg-gradient-to-br from-yellow-500 to-orange-600 shadow-yellow-500/30'
  } 
  // Expired status - Red gradient background
  else if (result?.valid && result?.status === 'expired') {
    return 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30'
  } 
  // Invalid status - Red gradient background
  else if (result && !result.valid) {
    return 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30'
  } 
  // Default state - Blue gradient background
  else {
    return 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/30'
  }
}

const verifyCertificate = async () => {
  if (!token.value) return
  
  loading.value = true
  result.value = null
  autoVerified.value = false
  
  try {
    const response = await axios.get(`/verify-certificate/${token.value}`)
    result.value = { valid: true, ...response.data }
  } catch (error) {
    if (error.response?.status === 404) {
      result.value = { valid: false, message: 'Certificate not found. Please check the token and try again.' }
    } else {
      result.value = { valid: false, message: 'An error occurred while verifying the certificate.' }
    }
  } finally {
    loading.value = false
  }
}
// --------------------------------------------------
// certificate sharing and printing functions
const printCertificate = () => {
  // Get the certificate details container
  const printContent = document.querySelector('.max-w-md');
  
  if (!printContent) return;
  
  // Clone the content to avoid affecting the original
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (!printWindow) {
    // Fallback: Use window.print() if popup is blocked
    window.print();
    return;
  }
  
  // Get the current theme (dark/light)
  const isDark = document.documentElement.classList.contains('dark');
  
  // Build the print HTML
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Certificate Verification</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: white;
            padding: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          
          .print-container {
            max-width: 500px;
            width: 100%;
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          
          .icon-container {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            ${getPrintIconStyle()}
          }
          
          .icon-container svg {
            width: 36px;
            height: 36px;
            color: white;
            stroke: white;
          }
          
          .title {
            font-size: 28px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 8px;
          }
          
          .subtitle {
            font-size: 14px;
            color: #6B7280;
          }
          
          .status-card {
            margin-top: 20px;
            padding: 20px;
            border-radius: 12px;
            border: 2px solid;
            ${getPrintStatusStyle()}
          }
          
          .status-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
          }
          
          .status-header svg {
            width: 20px;
            height: 20px;
            ${getPrintStatusIconColor()}
          }
          
          .status-text {
            font-size: 14px;
            font-weight: 500;
            ${getPrintStatusTextColor()}
          }
          
          .status-badge {
            margin-left: auto;
            padding: 2px 10px;
            border-radius: 9999px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            ${getPrintStatusBadgeStyle()}
          }
          
          .details {
            margin-top: 12px;
            space-y: 10px;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            font-size: 13px;
            border-bottom: 1px solid #F3F4F6;
          }
          
          .detail-row:last-child {
            border-bottom: none;
          }
          
          .detail-label {
            color: #6B7280;
          }
          
          .detail-value {
            color: #111827;
            font-weight: 500;
            text-align: right;
            max-width: 60%;
            word-break: break-all;
          }
          
          .detail-value.mono {
            font-family: 'Courier New', monospace;
            font-size: 11px;
          }
          
          .detail-value.semibold {
            font-weight: 600;
          }
          
          .divider {
            border-top: 1px solid #E5E7EB;
            margin: 12px 0;
          }
          
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 10px;
            color: #9CA3AF;
            border-top: 1px solid #E5E7EB;
            padding-top: 16px;
          }
          
          .certificate-number {
            font-family: 'Courier New', monospace;
            font-size: 11px;
            word-break: break-all;
          }
          
          @media print {
            body {
              padding: 20px;
            }
            .print-container {
              box-shadow: none;
              padding: 20px;
            }
            .detail-row {
              break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <!-- Header -->
          <div class="header">
            <div class="icon-container">
            
            </div>
            <h1 class="title">Certificate Verification</h1>
            <p class="subtitle">Verified Certificate Details</p>
          </div>
          
          <!-- Status Card -->
          <div class="status-card">
            <div class="status-header">
              ${getPrintStatusIcon()}
              <span class="status-text">${getStatusDisplay(result.value?.status)}</span>
              <span class="status-badge">${result.value?.status || 'verified'}</span>
            </div>
            
            <div class="details">
              <!-- Certificate Number -->
              <div class="detail-row">
                <span class="detail-label">Certificate Number</span>
                <span class="detail-value mono">${result.value?.certificate_number || 'N/A'}</span>
              </div>
              
              <!-- Recipient -->
              <div class="detail-row">
                <span class="detail-label">Recipient</span>
                <span class="detail-value semibold">${result.value?.user_name || 'N/A'}</span>
              </div>
              
              <!-- Course -->
              <div class="detail-row">
                <span class="detail-label">Course</span>
                <span class="detail-value semibold">${result.value?.course_title || 'N/A'}</span>
              </div>
              
              <div class="divider"></div>
              
              <!-- Duration -->
              ${result.value?.duration_months ? `
              <div class="detail-row">
                <span class="detail-label">Duration</span>
                <span class="detail-value">${result.value.duration_months} months</span>
              </div>
              ` : ''}
              
              <!-- Start Date -->
              ${result.value?.start_date ? `
              <div class="detail-row">
                <span class="detail-label">Start Date</span>
                <span class="detail-value">${formatDate(result.value.start_date)}</span>
              </div>
              ` : ''}
              
              <!-- End Date -->
              ${result.value?.end_date ? `
              <div class="detail-row">
                <span class="detail-label">End Date</span>
                <span class="detail-value">${formatDate(result.value.end_date)}</span>
              </div>
              ` : ''}
              
              <!-- Completion Date -->
              ${result.value?.completion_date ? `
              <div class="detail-row">
                <span class="detail-label">Completion Date</span>
                <span class="detail-value">${formatDate(result.value.completion_date)}</span>
              </div>
              ` : ''}
              
              <!-- Grade -->
              ${result.value?.grade ? `
              <div class="detail-row">
                <span class="detail-label">Grade</span>
                <span class="detail-value semibold">${result.value.grade}</span>
              </div>
              ` : ''}
              
              <!-- Instructor -->
              ${result.value?.instructor_name ? `
              <div class="detail-row">
                <span class="detail-label">Instructor</span>
                <span class="detail-value">${result.value.instructor_name}</span>
              </div>
              ` : ''}
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p>Verified on ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p style="margin-top: 4px;">Educational Society - Certificate Verification System</p>
          </div>
        </div>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  
  // Wait for content to load then print
  printWindow.onload = function() {
    printWindow.print();
    printWindow.onafterprint = function() {
      printWindow.close();
    };
  };
}

// Helper functions for print styles
const getPrintIconStyle = () => {
  const status = result.value?.status;
  if (result.value?.valid && status === 'verified') {
    return 'background: linear-gradient(to bottom right, #22c55e, #059669); box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);';
  } else if (result.value?.valid && status === 'pending') {
    return 'background: linear-gradient(to bottom right, #eab308, #ea580c); box-shadow: 0 8px 24px rgba(234, 179, 8, 0.3);';
  } else if (result.value?.valid && status === 'expired') {
    return 'background: linear-gradient(to bottom right, #ef4444, #e11d48); box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);';
  } else {
    return 'background: linear-gradient(to bottom right, #2563eb, #4f46e5); box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);';
  }
};



const getPrintStatusStyle = () => {
  const status = result.value?.status;
  if (result.value?.valid && status === 'verified') {
    return 'background: #f0fdf4; border-color: #86efac;';
  } else if (result.value?.valid && status === 'pending') {
    return 'background: #fefce8; border-color: #fde047;';
  } else if (result.value?.valid && status === 'expired') {
    return 'background: #fef2f2; border-color: #fca5a5;';
  } else {
    return 'background: #fef2f2; border-color: #fca5a5;';
  }
};

const getPrintStatusIconColor = () => {
  const status = result.value?.status;
  if (result.value?.valid && status === 'verified') {
    return 'color: #16a34a; stroke: #16a34a;';
  } else if (result.value?.valid && status === 'pending') {
    return 'color: #ca8a04; stroke: #ca8a04;';
  } else if (result.value?.valid && status === 'expired') {
    return 'color: #dc2626; stroke: #dc2626;';
  } else {
    return 'color: #dc2626; stroke: #dc2626;';
  }
};

const getPrintStatusTextColor = () => {
  const status = result.value?.status;
  if (result.value?.valid && status === 'verified') {
    return 'color: #15803d;';
  } else if (result.value?.valid && status === 'pending') {
    return 'color: #a16207;';
  } else if (result.value?.valid && status === 'expired') {
    return 'color: #b91c1c;';
  } else {
    return 'color: #b91c1c;';
  }
};

const getPrintStatusBadgeStyle = () => {
  const status = result.value?.status;
  if (result.value?.valid && status === 'verified') {
    return 'background: #dcfce7; color: #15803d;';
  } else if (result.value?.valid && status === 'pending') {
    return 'background: #fef9c3; color: #a16207;';
  } else if (result.value?.valid && status === 'expired') {
    return 'background: #fecaca; color: #b91c1c;';
  } else {
    return 'background: #fecaca; color: #b91c1c;';
  }
};

const getPrintStatusIcon = () => {
  const status = result.value?.status;
  if (result.value?.valid && status === 'verified') {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (result.value?.valid && status === 'pending') {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (result.value?.valid && status === 'expired') {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }
};

// --------------------------------------------------

const shareCertificate = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Certificate Verification',
        text: `Verify certificate: ${result.value.certificate_number}`,
        url: window.location.href
      })
    } catch (error) {
      console.log('Share cancelled or failed')
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
}

// Auto-verify if token is present in URL
onMounted(() => {
  const pathSegments = route.path.split('/')
  const tokenFromUrl = pathSegments[pathSegments.length - 1]
  const tokenFromQuery = route.query.token
  
  const extractedToken = tokenFromUrl || tokenFromQuery
  
  if (extractedToken && extractedToken !== 'verify-certificate') {
    token.value = extractedToken
    autoVerified.value = true
    
    setTimeout(() => {
      verifyCertificate()
    }, 500)
  }
})

// Watch for route changes
watch(() => route.path, (newPath) => {
  const pathSegments = newPath.split('/')
  const tokenFromUrl = pathSegments[pathSegments.length - 1]
  
  if (tokenFromUrl && tokenFromUrl !== 'verify-certificate' && tokenFromUrl !== token.value) {
    token.value = tokenFromUrl
    autoVerified.value = true
    setTimeout(() => {
      verifyCertificate()
    }, 500)
  }
})
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  .max-w-md, .max-w-md * {
    visibility: visible;
  }
  .max-w-md {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 20px;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
  button, .flex.space-y-2, .flex.space-x-2 {
    display: none !important;
  }
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>