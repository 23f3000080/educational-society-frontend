<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
      <!-- Loading State -->
      <div v-if="verifying" class="text-center">
        <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-indigo-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verifying Payment...</h2>
        <p class="text-gray-600 dark:text-gray-400">Please wait while we confirm your enrollment.</p>
        <p v-if="orderId" class="text-sm text-gray-500 mt-2">Order ID: {{ orderId }}</p>
      </div>

      <!-- Success State -->
      <div v-else-if="status === 'SUCCESS' && !verifying" class="text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful! 🎉</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-2">You have been successfully enrolled in the course.</p>
        <p v-if="courseId" class="text-sm text-gray-500 mb-6">Course ID: {{ courseId }}</p>
        <button 
          @click="goToCourses" 
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Go to My Courses
        </button>
      </div>

      <!-- Failed State -->
      <div v-else-if="status === 'FAILED'" class="text-center">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Failed</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Something went wrong with your payment. Please try again.</p>
        <button 
          @click="goBack" 
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Try Again
        </button>
      </div>

      <!-- Unknown State - Try to fetch status from backend -->
      <div v-else-if="status === 'UNKNOWN' && !verifying" class="text-center">
        <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Checking Payment Status</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">We're checking your payment status. Please wait...</p>
        <button 
          @click="checkPaymentStatus" 
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          :disabled="verifying"
        >
          <span v-if="!verifying">Check Status</span>
          <span v-else>Checking...</span>
        </button>
      </div>

      <!-- Cancelled State -->
      <div v-else-if="status === 'CANCELLED'" class="text-center">
        <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Cancelled</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">You cancelled the payment process.</p>
        <button 
          @click="goBack" 
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Back to Course
        </button>
      </div>

      <!-- Auto-retry for pending status -->
      <div v-else-if="status === 'PENDING'" class="text-center">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Processing</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Your payment is being processed. This may take a few moments.</p>
        <p class="text-sm text-gray-500 mb-6">We'll verify your payment automatically.</p>
        <button 
          @click="checkPaymentStatus" 
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          :disabled="verifying"
        >
          <span v-if="!verifying">Check Status Now</span>
          <span v-else>Checking...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const status = ref('')
const orderId = ref('')
const courseId = ref('')
const verifying = ref(false)
let verificationAttempted = ref(false)
let retryInterval = null
let retryCount = 0
const MAX_RETRIES = 5

const checkPaymentStatus = async () => {
  if (!orderId.value) {
    toast.error('Missing order information')
    status.value = 'FAILED'
    return
  }

  if (!courseId.value) {
    // Try to get course_id from order_id
    try {
      const parts = orderId.value.split('_')
      if (parts.length >= 3) {
        courseId.value = parts[2]
      }
    } catch (e) {
      console.error('Could not parse course_id from order_id')
    }
  }

  verifying.value = true
  retryCount++
  
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    
    if (!token) {
      toast.error('Please login to verify your enrollment')
      verifying.value = false
      status.value = 'FAILED'
      return
    }

    const response = await api.post('/api/verify-payment', {
      order_id: orderId.value,
      course_id: courseId.value
    })

    console.log('Verification Response:', response.data)
    
    if (response.data.success) {
      toast.success('Payment verified! You are now enrolled.')
      status.value = 'SUCCESS'
      verificationAttempted.value = true
      
      // Clear any retry intervals
      if (retryInterval) {
        clearInterval(retryInterval)
        retryInterval = null
      }
    } else if (['PENDING', 'ACTIVE'].includes(response.data.status)) {
      // Payment is still processing
      status.value = 'PENDING'
      toast.info('Payment is still processing. Please wait...')
      
      // Auto-retry if within limits
      if (retryCount < MAX_RETRIES) {
        if (!retryInterval) {
          retryInterval = setInterval(() => {
            if (status.value !== 'SUCCESS' && status.value !== 'FAILED') {
              checkPaymentStatus()
            } else {
              clearInterval(retryInterval)
              retryInterval = null
            }
          }, 3000) // Retry every 3 seconds
        }
      }
    } else {
      toast.error(response.data.error || 'Payment verification failed')
      status.value = 'FAILED'
      verificationAttempted.value = true
      
      if (retryInterval) {
        clearInterval(retryInterval)
        retryInterval = null
      }
    }
    
  } catch (err) {
    console.error('Verification error:', err)
    
    if (err.response?.data?.already_enrolled) {
      toast.success('You are already enrolled!')
      status.value = 'SUCCESS'
      verificationAttempted.value = true
      
      if (retryInterval) {
        clearInterval(retryInterval)
        retryInterval = null
      }
    } else if (err.response?.status === 404) {
      // Order not found - might still be processing
      if (retryCount < MAX_RETRIES) {
        status.value = 'PENDING'
        toast.info('Payment is still processing. Retrying...')
        
        if (!retryInterval) {
          retryInterval = setInterval(() => {
            if (status.value !== 'SUCCESS' && status.value !== 'FAILED') {
              checkPaymentStatus()
            } else {
              clearInterval(retryInterval)
              retryInterval = null
            }
          }, 3000)
        }
      } else {
        toast.error('Payment verification timed out. Please contact support.')
        status.value = 'FAILED'
        verificationAttempted.value = true
        
        if (retryInterval) {
          clearInterval(retryInterval)
          retryInterval = null
        }
      }
    } else {
      toast.error(err.response?.data?.error || 'Payment verification failed')
      status.value = 'FAILED'
      verificationAttempted.value = true
      
      if (retryInterval) {
        clearInterval(retryInterval)
        retryInterval = null
      }
    }
  } finally {
    verifying.value = false
  }
}

onMounted(async () => {
  // Get status from query params
  status.value = route.query.status || 'UNKNOWN'
  orderId.value = route.query.order_id || ''
  courseId.value = route.query.course_id || ''

  console.log('Payment Status Page:', {
    status: status.value,
    orderId: orderId.value,
    courseId: courseId.value,
    allQueryParams: route.query
  })

  // If no order_id, try to get from session storage
  if (!orderId.value) {
    const storedOrderId = sessionStorage.getItem('last_order_id')
    if (storedOrderId) {
      orderId.value = storedOrderId
      console.log('Using stored order_id:', orderId.value)
    }
  }

  // Store order_id for future reference
  if (orderId.value) {
    sessionStorage.setItem('last_order_id', orderId.value)
  }

  // If payment was successful or status is unknown, verify with backend
  if ((status.value === 'SUCCESS' || status.value === 'UNKNOWN' || status.value === 'PENDING') && orderId.value) {
    await checkPaymentStatus()
  } else if (status.value === 'SUCCESS' && !orderId.value) {
    // Success but no order_id - might have come from webhook
    toast.info('Payment was successful! Checking enrollment status...')
    await checkPaymentStatus()
  }
})

// Clean up on component unmount
onUnmounted(() => {
  if (retryInterval) {
    clearInterval(retryInterval)
    retryInterval = null
  }
})

const goToCourses = () => {
  router.push('/student/courses')
}

const goBack = () => {
  // Go back to course page with previous course ID
  if (courseId.value) {
    router.push(`/course/${courseId.value}`)
  } else {
    router.push('/student/courses')
  }
}
</script>
