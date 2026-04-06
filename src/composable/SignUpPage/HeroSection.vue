<template>
  <div class="min-h-screen flex flex-col md:flex-row gap-3">
    <!-- Left side card + image (hidden on mobile) -->
    <div class="hidden md:block md:w-1/2 md:h-3/4 mt-6">
      <div class="flex items-center justify-center p-4">
        <div
          class="w-full max-w-sm rounded-2xl shadow-lg shadow-purple-800 dark:shadow-amber-900 p-6 text-center 
           bg-linear-to-tl from-blue-400 via-pink-400 to-pink-500 
           dark:from-blue-900 dark:via-purple-800 dark:to-black 
           text-indigo-900 dark:text-amber-500
           transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200 dark:hover:shadow-purple-700">
          <h1 class="text-2xl font-bold mb-2 italic">🔒 Your Data Is Secure 🔒</h1>
        </div>
      </div>

      <img
        src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?w=900&auto=format&fit=crop&q=60"
        alt="Signup Illustration"
        class="w-full h-full object-cover rounded-2xl mx-2"
      />
    </div>

    <!-- Right side form -->
    <div
      class="w-full md:w-1/2 flex items-center justify-center 
             bg-linear-to-tr from-pink-300 via-blue-200 to-purple-400 
             dark:bg-linear-to-tr dark:from-gray-900 dark:via-slate-900 dark:to-black 
             p-4 md:p-8 rounded my-4"
    >
      <div
        class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-md border border-gray-200 dark:border-gray-700"
      >
        <!-- message with transition -->
        <transition name="fade">
          <p v-if="message" :class="messageClass" class="text-center mb-4">{{ message }}</p>
        </transition>

        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          Create Account
        </h2>

        <!-- Social Signup -->
        <div class="flex gap-3 mb-6">
          <div id="google-signup-button" class="flex-1"></div>
        </div>

        <p class="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">
          or sign up with email
        </p>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="registerUser">
          <div>
            <label for="fullName" class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              v-model="fullName"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none 
                     bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition"
            />
          </div>

          <div>
            <label for="email" class="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Email
            </label>

            <!-- Email + Verify button -->
            <div class="flex gap-2">
              <input type="email" id="email" placeholder="you@example.com" v-model="email" :disabled="emailVerified"
                class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none 
             bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition" />

              <button type="button" @click="sendOtp" :disabled="otpSent || !email"
                class="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50">
                {{ otpSent ? "Sent" : "Verify" }}
              </button>
            </div>

            <!-- OTP input -->
            <div v-if="otpSent && !emailVerified" class="mt-3 flex gap-2">
              <input type="text" placeholder="Enter OTP" v-model="otp"
                class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none 
             bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition" />
              <button type="button" @click="verifyOtp"
                class="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition">
                Verify OTP
              </button>
            </div>
            <div v-if="otpSent && !emailVerified" class="mt-2 text-sm">
              <button type="button" @click="sendOtp" :disabled="resendTimer > 0"
                class="text-indigo-600 hover:underline disabled:opacity-50">
                Resend OTP
              </button>

              <span v-if="resendTimer > 0" class="text-gray-500 ml-2">
                (in {{ resendTimer }}s)
              </span>
            </div>


            <p v-if="emailVerified" class="text-green-600 text-sm mt-1">
              ✅ Email verified
            </p>
          </div>


          <!-- Password with toggle -->
          <div class="relative">
            <label for="password" class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              v-model="password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none 
                     bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition"
            />

            <!-- Toggle Button -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-9 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 12C3.75 7.5 7.5 4.5 12 4.5s8.25 3 9.75 7.5c-1.5 4.5-5.25 7.5-9.75 7.5S3.75 16.5 2.25 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>

              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.98 8.223C2.67 9.884 2 11.88 2 12s.67 2.116 1.98 3.777C5.29 17.44 8.31 20 12 20c3.69 0 6.71-2.56 8.02-4.223C21.33 14.116 22 12.12 22 12s-.67-2.116-1.98-3.777C18.71 6.56 15.69 4 12 4c-3.69 0-6.71 2.56-8.02 4.223z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>
            </button>
            <!-- atleast 6 char passwords -->
             <p class="text-gray-600 dark:text-gray-400 text-xs mt-1">Password must be at least 6 characters long</p>
          </div>

          <!-- Confirm Password with toggle -->
          <div class="relative">
            <label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Confirm Password</label>
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none 
                     bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-9 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 12C3.75 7.5 7.5 4.5 12 4.5s8.25 3 9.75 7.5c-1.5 4.5-5.25 7.5-9.75 7.5S3.75 16.5 2.25 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>

              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.98 8.223C2.67 9.884 2 11.88 2 12s.67 2.116 1.98 3.777C5.29 17.44 8.31 20 12 20c3.69 0 6.71-2.56 8.02-4.223C21.33 14.116 22 12.12 22 12s-.67-2.116-1.98-3.777C18.71 6.56 15.69 4 12 4c-3.69 0-6.71 2.56-8.02 4.223z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>
            </button>
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p class="text-gray-600 dark:text-gray-400 text-sm mt-6 text-center">
          Already have an account?
          <router-link to="/login" class="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/axios.js";
import { useRouter } from "vue-router";
import { handleGoogleSignIn } from "../../utils/googleAuth.js";

const router = useRouter();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const otp = ref("");
const otpSent = ref(false);
const emailVerified = ref(false);
const resendTimer = ref(0);
let timerInterval = null;

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

const message = ref("");
const messageClass = ref("");

// helper to show messages with timeout
const showMessage = (text, type = "error") => {
  message.value = text;
  messageClass.value = type === "error" ? "text-red-500" : "text-green-500";

  setTimeout(() => {
    message.value = "";
    messageClass.value = "";
  }, 5000);
};

// start resend timer
const startResendTimer = () => {
  resendTimer.value = 60;

  timerInterval = setInterval(() => {
    resendTimer.value--;

    if (resendTimer.value <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
};

// send otp
const sendOtp = async () => {
  try {
    const res = await api.post("/api/auth/send-email-otp", { email: email.value });

    otpSent.value = true;
    startResendTimer();
    showMessage(res.data.message, "success");
  } catch (error) {
    showMessage(
      error.response?.data?.error || "Failed to send OTP",
      "error"
    );
  }
};


// verify otp
const verifyOtp = async () => {
  try {
    const res = await api.post("/api/auth/verify-email-otp", {
      email: email.value,
      otp: otp.value,
    });

    emailVerified.value = true;
    showMessage(res.data.message || "Email verified successfully", "success");
  } catch (error) {
    showMessage(
      error.response?.data?.error || "Invalid OTP",
      "error"
    );
  }
};

// validate form is not empty
const validateForm = () => {
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    showMessage("** Please fill in all fields **", "error");
    return false;
  }
  return true;
};

// validate passwords
const validatePasswords = () => {
  if (password.value !== confirmPassword.value) {
    showMessage("** Passwords do not match **", "error");
    return false;
  }
  return true;
};

// validate password length
const validatePasswordLength = () => {
  if (password.value.length < 6) {
    showMessage("** Password must be at least 6 characters long **", "error");
    return false;
  }
  return true;
};

const registerUser = async () => {
  if (!validateForm()) return;
  if (!validatePasswords()) return;
  if (!validatePasswordLength()) return;

  const data = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  if (!emailVerified.value) {
    showMessage("** Please verify your email first **", "error");
    return;
  }


  try {
    const response = await api.post("/api/auth/register", data);
    console.log("Registration successful:", response.data);

    showMessage(response.data.message || "Registration successful! Redirecting to login...", "success");

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    console.error("Error during registration:", error);

    // Check if response exists
    if (error.response && error.response.data) {
      // If Flask sent a JSON error (like {"error": "Invalid email"})
      showMessage(error.response.data.error || "Registration failed. Please try again.", "error");
    } else {
      // Generic fallback
      showMessage("Registration failed. Please try again.", "error");
    }
  }
};

const handleGoogleSignUp = async (response) => {
  isLoading.value = true;
  try {
    const result = await handleGoogleSignIn(response, true);
    showMessage("Sign up successful!", "success");
    
    setTimeout(() => {
      if (result.role === "student") {
        window.location.href = "/student/dashboard";
      } else if (result.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    }, 1000);
  } catch (error) {
    if (error.message.includes("already exists")) {
      showMessage("Account with this email already exists. Please login instead.", "error");
    } else {
      showMessage(error.message || "Google sign up failed", "error");
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  // Load Google Sign-In script
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  
  script.onload = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
        callback: handleGoogleSignUp
      });
      
      // Render the Google Sign-In button
      const googleButtonContainer = document.getElementById("google-signup-button");
      if (googleButtonContainer) {
        window.google.accounts.id.renderButton(googleButtonContainer, {
          theme: "outline",
          size: "large",
          width: "100%",
          locale: "en"
        });
      }
    }
  };
  
  document.head.appendChild(script);
});
</script>
