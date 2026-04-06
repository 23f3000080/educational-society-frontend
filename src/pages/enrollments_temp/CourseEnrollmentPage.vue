<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">

    <!-- HEADER -->
    <header class="max-w-6xl mx-auto mb-10 text-center">
      <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-indigo-600 rounded-full text-white text-sm">
        🎓 Course Enrollment
      </div>

      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        Enroll in Your
        <span class="text-indigo-600">Next Course</span>
      </h1>

      <p class="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
        Review the course details and start learning today.
      </p>
    </header>

    <!-- CONTENT -->
    <div class="max-w-6xl mx-auto">
      <!-- Loading -->
      <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg animate-pulse">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
        <div class="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error"
        class="text-center p-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
        <div class="text-4xl mb-3">⚠️</div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Failed to Load Course
        </h3>
        <p class="text-red-500">{{ error }}</p>
      </div>

      <!-- COURSE DETAILS WITH ENROLLMENT FORM -->
      <div v-else-if="course" class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column: Course Details -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- IMAGE hide in mobile view -->


          <div class="relative h-64 lg:h-96 hidden lg:block">
            <img
              v-if="course.picture_url"
              :src="course.picture_url"
              alt="Course Picture"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                {{ course.subject }}
              </span>
            </div>
          </div>

          <!-- DETAILS -->
          <div class="p-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {{ course.title }}
            </h2>

            <p class="text-gray-600 dark:text-gray-400 mb-6">
              {{ course.description }}
            </p>

            <!-- Course Info Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                <p class="text-gray-500 dark:text-gray-400">Class Level</p>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ course.class_level }}
                </p>
              </div>

              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                <p class="text-gray-500 dark:text-gray-400">Duration</p>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ course.duration_months }} months
                </p>
              </div>

              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                <p class="text-gray-500 dark:text-gray-400">Start Date</p>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ formatDate(course.start_date) }}
                </p>
              </div>

              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                <p class="text-gray-500 dark:text-gray-400">End Date</p>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ formatDate(course.end_date) }}
                </p>
              </div>
            </div>

            <!-- Course Curriculum Preview -->
            <div class="mt-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What You'll Learn
              </h3>
              <ul class="space-y-3">
                <li v-for="(item, index) in curriculum" :key="index" class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-600 dark:text-gray-400">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right Column: Enrollment Form -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Enrollment Details
            </h3>

            <!-- PRICE -->
            <div class="bg-indigo-600 rounded-xl p-6 text-white mb-6">
              <p class="text-sm opacity-80">Course Fee</p>
              <p class="text-3xl font-bold">₹{{ course.fee }}</p>
              <p class="text-xs mt-2 opacity-75">One-time payment • Lifetime access</p>
            </div>

            <!-- Enrollment Error -->
            <div
              v-if="enrollmentError"
              class="mb-4 p-4 rounded-lg border border-red-300 bg-red-50 text-red-600 dark:bg-red-900/20 dark:border-red-800"
            >
              ⚠️ {{ enrollmentError }}
            </div>

            <!-- Enrollment Form -->
            <form @submit.prevent="handleEnrollment" class="space-y-4">
              <!-- Student Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  v-model="enrollmentForm.fullName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  v-model="enrollmentForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  v-model="enrollmentForm.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="+91 **********"
                />
              </div>

              <!-- Terms & Conditions -->
              <div class="flex items-start">
                <input
                  v-model="enrollmentForm.agreeTerms"
                  type="checkbox"
                  required
                  class="w-4 h-4 mt-1 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  I agree to the
                  <router-link to="/terms" class="text-indigo-600 hover:underline">Terms & Conditions</router-link>
                  and
                  <router-link to="/privacy" class="text-indigo-600 hover:underline">Privacy Policy</router-link>
                </label>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="enrollmentLoading"
                class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <span v-if="!enrollmentLoading">
                  Pay ₹{{ course.fee }} & Enroll
                </span>
                <div v-else class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              </button>
            </form>

            <!-- Security Badge -->
            <div class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure payment • 100% refund policy</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Enrollment Successful!
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              You have successfully enrolled in {{ course?.title }}. Check your email for confirmation.
            </p>
            <div class="flex gap-3">
              <router-link
                to="/student/courses"
                class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
              >
                Go to Courses Page
              </router-link>
              <button
                @click="showSuccessModal = false"
                class="flex-1 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import api from "../../services/axios"
import { useToast } from "vue-toastification"

const route = useRoute()
const router = useRouter()
const toast = useToast()

const course = ref(null)
const loading = ref(true)
const error = ref(null)
const enrollmentLoading = ref(false)
const showSuccessModal = ref(false)

const enrollmentError = ref(null)

// Enrollment Form
const enrollmentForm = reactive({
  fullName: "",
  email: "",
  phone: "",
  agreeTerms: false
})

const curriculum = ref([
  "Understanding the fundamentals",
  "Hands-on projects and exercises",
  "Real-world applications",
  "Expert guidance and support",
  "Certificate upon completion"
])

const buildFullName = (firstName, lastName) =>
  [firstName, lastName].filter(Boolean).join(" ").trim()

const prefillEnrollmentForm = async () => {
  // Prefer fresh profile data from backend.
  try {
    const { data } = await api.get("/api/student/profile")
    const fullName = buildFullName(data.first_name, data.last_name)

    enrollmentForm.fullName = fullName || enrollmentForm.fullName
    enrollmentForm.email = data.email || enrollmentForm.email
    enrollmentForm.phone = data.mobile_no || data.alternate_mobile_no || enrollmentForm.phone
    return
  } catch (_err) {
    // Fallback to cached auth user if profile API is unavailable.
  }

  const rawUser = localStorage.getItem("user") || sessionStorage.getItem("user") || "{}"
  const userData = JSON.parse(rawUser)
  const fullName = buildFullName(userData.first_name, userData.last_name)

  enrollmentForm.fullName = fullName || enrollmentForm.fullName
  enrollmentForm.email = userData.email || enrollmentForm.email
  enrollmentForm.phone = userData.mobile_no || userData.phone || enrollmentForm.phone
}

const formatDate = (date) => {
  if (!date) return "-"
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)

    document.body.appendChild(script)
  })
}

const handleEnrollment = async () => {
  enrollmentError.value = null
  try {

    if (!enrollmentForm.fullName || !enrollmentForm.email || !enrollmentForm.phone) {
      toast.error("Please fill all required fields")
      return
    }

    if (!enrollmentForm.agreeTerms) {
      toast.error("Please agree to terms")
      return
    }

    enrollmentLoading.value = true

    const loaded = await loadRazorpay()

    if (!loaded) {
      toast.error("Razorpay SDK failed to load")
      return
    }

    const orderRes = await api.post("/api/create-payment", {
      course_id: course.value.id
    })

    const { order_id, amount, key } = orderRes.data

    // if any error from orderres
    if (orderRes.data.error) {
      toast.error(orderRes.data.error)
      return
    }

    const options = {

      key: key,
      amount: amount,
      currency: "INR",
      name: "Educational Society",
      description: course.value.title,
      order_id: order_id,

      notes: {
        course_id: course.value.id,
        student_name: enrollmentForm.fullName,
        student_email: enrollmentForm.email
      },

      prefill: {
        name: enrollmentForm.fullName,
        email: enrollmentForm.email,
        contact: enrollmentForm.phone
      },

      theme: {
        color: "#4f46e5"
      },

      handler: async function (response) {

        try {

          await api.post("/api/verify-payment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            course_id: course.value.id
          })

          toast.success("Payment successful! You are enrolled.")

          showSuccessModal.value = true

        } catch (err) {

          toast.error("Payment verification failed")
          enrollmentError.value = "Payment verification failed"
        }

      },

      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled")
          enrollmentError.value = "Payment cancelled"
        }
      }

    }

    const rzp = new window.Razorpay(options)

    rzp.open()

  } catch (err) {

    console.error(err)
    enrollmentError.value = err.response?.data?.error || "Payment failed"
    toast.error(enrollmentError.value)

  } finally {

    enrollmentLoading.value = false

  }
}

// Fetch course
onMounted(async () => {

  try {

    const courseId = route.params.id

    const response = await api.get(`/api/course/${courseId}`)

    course.value = response.data.course
    await prefillEnrollmentForm()

  } catch (err) {

    error.value =
      err.response?.data?.error || "Failed to load course details"

  } finally {

    loading.value = false

  }

})
</script>