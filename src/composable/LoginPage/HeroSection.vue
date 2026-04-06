<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <!-- Left side image -->
        <div
            class="hidden md:flex md:w-1/2 bg-linear-to-tr from-blue-500 via-blue-200 to-pink-500 dark:bg-linear-to-tr dark:from-blue-500 dark:via-slate-950 dark:to-pink-500 items-center justify-center rounded-3xl">
            <img src="https://plus.unsplash.com/premium_photo-1720192861639-1524439fc166?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9naW58ZW58MHx8MHx8fDA%3D"
                alt="Login Illustration"
                class="w-4/5 rounded-2xl shadow-lg shadow-blue-400 border border-dashed border-yellow-400" />
        </div>

        <!-- Right side login form -->
        <div class="flex w-full md:w-1/2 items-center justify-center p-6">
            <div
                class="w-full max-w-md bg-gray-100 dark:bg-slate-950 rounded-2xl shadow-xl p-8 border border-dashed dark:border-gray-700">
                <!-- message with transition -->
                <transition name="fade">
                    <div v-if="message" class="flex items-center justify-between mb-4 p-3"
                        :class="messageClass">
                        <!-- message text -->
                        <p class="flex-1">{{ message }}</p>

                        <!-- close button -->
                        <button @click="clearMessage" class="ml-4 text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>
                </transition>

                <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-slate-200 mb-6">
                    Welcome Back 👋
                </h2>
                <form class="space-y-5" @submit.prevent="loginUser">
                    <!-- Email -->
                    <div>
                        <label for="email"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input type="email" id="email" v-model="email" placeholder="Enter your email"
                            class="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 bg-gray-50 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>

                    <!-- Password -->
                    <div class="relative">
                        <label for="password"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                            placeholder="Enter your password"
                            class="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 bg-gray-50 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                        <!-- Toggle Eye / Eye Slash -->
                        <button type="button" @click="togglePassword"
                            class="absolute right-3 top-9 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                            </svg>

                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>

                    <!-- Remember me + Forgot -->
                    <div class="flex items-center justify-between">
                        <label for="remember-me"
                            class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <input type="checkbox" id="remember-me" v-model="rememberMe"
                                class="form-checkbox h-4 w-4 text-purple-500" />
                            <span>Remember me</span>
                        </label>
                        <router-link to="/forgot/password" class="text-sm text-purple-500 hover:underline">Forgot
                            Password?</router-link>
                    </div>

                    <!-- Login Button -->
                    <button type="submit"
                        class="w-full bg-linear-to-r from-purple-800 via-purple-900 to-pink-500 text-white py-2 rounded-lg shadow-md hover:opacity-75 transition">
                        Login
                    </button>

                    <!-- Divider -->
                    <div class="flex items-center my-4">
                        <div class="grow h-px bg-gray-300 dark:bg-gray-700"></div>
                        <span class="px-3 text-sm text-gray-400">or</span>
                        <div class="grow h-px bg-gray-300 dark:bg-gray-700"></div>
                    </div>

                    <!-- Social Login -->
                    <div class="flex gap-3">
                        <!-- Google Sign-In Button -->
                        <div id="google-signin-button" class="flex-1"></div>
                    </div>


                    <!-- Register -->
                    <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Don’t have an account?
                        <router-link to="/signup" class="text-purple-500 font-semibold hover:underline">Sign
                            up</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleGoogleSignIn } from "../../utils/googleAuth.js";
import api from "../../services/axios.js";

const route = useRoute();
const router = useRouter();

const showPassword = ref(false);

function togglePassword() {
    showPassword.value = !showPassword.value;
}

const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const message = ref("");
const messageClass = ref("");
const isLoading = ref(false);

// helper to show messages with timeout
const showMessage = (text, type = "error") => {
  message.value = text;
  messageClass.value = type === "error" ? "text-red-500" : "text-green-500";
};

const clearMessage = () => {
    message.value = "";
    messageClass.value = "";
};

const loginUser = async () => {
    if (!email.value || !password.value) {
        showMessage("Email and password are required");
        return;
    }

    isLoading.value = true;
    
    const data = {
        email: email.value,
        password: password.value,
        rememberMe: rememberMe.value
    };
    
    try {
        const response = await api.post("/api/auth/login", data);

        const storage = rememberMe.value ? localStorage : sessionStorage;

        // Save auth data
        storage.setItem("token", response.data.token);
        storage.setItem("user", JSON.stringify(response.data.user));

        showMessage(response.data.message, "success");

        if (response.data.success) {
            const role = response.data.user.role;

            // ✅ Role-based redirect
            setTimeout(() => {
                if (role === "admin") {
                    window.location.href = "/admin/dashboard";
                } else if (role === "student") {
                    window.location.href = "/student/dashboard";
                } else {
                    window.location.href = "/";
                }
            }, 1000);
        }

    } catch (error) {
        console.error(error);
        showMessage(error.response?.data?.error || "Login failed");
    } finally {
        isLoading.value = false;
    }
};

const handleGoogleLogin = async (response) => {
    isLoading.value = true;
    try {
        const result = await handleGoogleSignIn(response, false);
        showMessage("Login successful!", "success");
        
        setTimeout(() => {
            if (result.role === "admin") {
                window.location.href = "/admin/dashboard";
            } else if (result.role === "student") {
                window.location.href = "/student/dashboard";
            } else {
                window.location.href = "/";
            }
        }, 1000);
    } catch (error) {
        showMessage(error.message || "Google login failed");
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    if (route.query.msg) {
        showMessage(route.query.msg, "error");
    }
    
    // Load Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
                callback: handleGoogleLogin
            });
            
            // Render the Google Sign-In button
            const googleButtonContainer = document.getElementById("google-signin-button");
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
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
