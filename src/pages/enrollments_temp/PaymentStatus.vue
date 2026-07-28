<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
      <div v-if="status === 'SUCCESS'" class="text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful! 🎉</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">You have been successfully enrolled in the course.</p>
        <button 
          @click="goToCourses" 
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Go to My Courses
        </button>
      </div>

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

      <div v-else class="text-center">
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios'

const route = useRoute()
const router = useRouter()
const status = ref('')
const orderId = ref('')
const courseId = ref('')

onMounted(async () => {
  status.value = route.query.status || 'unknown'
  orderId.value = route.query.order_id || ''
  courseId.value = route.query.course_id || ''

  // If payment was successful, verify with backend
  if (status.value === 'SUCCESS' && orderId.value) {
    try {
      await api.post('/api/verify-payment', {
        order_id: orderId.value,
        course_id: courseId.value
      })
    } catch (err) {
      console.error('Verification failed:', err)
    }
  }
})

const goToCourses = () => {
  router.push('/student/courses')
}

const goBack = () => {
    router.push('/student/courses')
}
</script>