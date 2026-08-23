<template>
    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- Left side - Animated 3D Illustrations -->
        <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 items-center justify-center p-8 relative overflow-hidden">
            
            <!-- Decorative Background Shapes -->
            <div class="absolute top-10 left-10 w-64 h-64 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div class="absolute bottom-10 right-10 w-72 h-72 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl"></div>

            <!-- Floating Geometric Shapes -->
            <div class="relative z-10 w-full max-w-lg">
                <!-- Main Illustration Container -->
                <div class="relative flex items-center justify-center">
                    
                    <!-- Floating Circles -->
                    <div class="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-float" style="animation-delay: 0s;"></div>
                    <div class="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 animate-float" style="animation-delay: 1.5s;"></div>
                    
                    <!-- Main 3D Card with Monkey -->
                    <div class="relative w-full max-w-md p-8 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-slate-700/50 transform perspective-1000 rotate-y-5 hover:rotate-y-0 transition-all duration-700">
                        
                        <!-- Decorative Dots Pattern -->
                        <div class="absolute inset-0 opacity-5">
                            <div class="absolute top-4 left-4 w-2 h-2 bg-purple-500 rounded-full"></div>
                            <div class="absolute top-12 left-12 w-2 h-2 bg-pink-500 rounded-full"></div>
                            <div class="absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div class="absolute bottom-12 right-12 w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>

                        <!-- Illustration Content with Monkey -->
                        <div class="relative text-center">
                            <!-- Monkey Animation -->
                            <div class="relative inline-block mb-6">
                                <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
                                <div class="relative w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl animate-float overflow-hidden">
                                    
                                    <!-- Monkey Face SVG -->
                                    <svg class="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <!-- Face -->
                                        <circle cx="50" cy="50" r="40" fill="#D4A574" stroke="#8B6914" stroke-width="2"/>
                                        
                                        <!-- Ears -->
                                        <circle cx="15" cy="35" r="12" fill="#D4A574" stroke="#8B6914" stroke-width="2"/>
                                        <circle cx="15" cy="35" r="6" fill="#C4956A"/>
                                        <circle cx="85" cy="35" r="12" fill="#D4A574" stroke="#8B6914" stroke-width="2"/>
                                        <circle cx="85" cy="35" r="6" fill="#C4956A"/>
                                        
                                        <!-- Eyes -->
                                        <g :class="password ? 'eyes-closed' : 'eyes-open'">
                                            <!-- Left Eye -->
                                            <ellipse v-if="!password" cx="38" cy="42" rx="6" ry="7" fill="white" stroke="#8B6914" stroke-width="1.5"/>
                                            <circle v-if="!password" cx="40" cy="43" r="3.5" fill="#2C1810"/>
                                            <circle v-if="!password" cx="41" cy="41" r="1.5" fill="white"/>
                                            
                                            <!-- Right Eye -->
                                            <ellipse v-if="!password" cx="62" cy="42" rx="6" ry="7" fill="white" stroke="#8B6914" stroke-width="1.5"/>
                                            <circle v-if="!password" cx="64" cy="43" r="3.5" fill="#2C1810"/>
                                            <circle v-if="!password" cx="65" cy="41" r="1.5" fill="white"/>
                                            
                                            <!-- Closed Eyes -->
                                            <path v-if="password" d="M32 42 Q38 38 44 42" stroke="#8B6914" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                                            <path v-if="password" d="M56 42 Q62 38 68 42" stroke="#8B6914" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                                        </g>
                                        
                                        <!-- Eyebrows -->
                                        <path d="M32 36 Q38 33 44 36" stroke="#8B6914" stroke-width="2" fill="none" stroke-linecap="round" :class="password ? 'eyebrows-down' : 'eyebrows-up'"/>
                                        <path d="M56 36 Q62 33 68 36" stroke="#8B6914" stroke-width="2" fill="none" stroke-linecap="round" :class="password ? 'eyebrows-down' : 'eyebrows-up'"/>
                                        
                                        <!-- Nose -->
                                        <ellipse cx="50" cy="52" rx="6" ry="4" fill="#C4956A"/>
                                        <circle cx="48" cy="51" r="1.5" fill="#8B6914"/>
                                        <circle cx="52" cy="51" r="1.5" fill="#8B6914"/>
                                        
                                        <!-- Mouth -->
                                        <path v-if="!password" d="M40 60 Q50 68 60 60" stroke="#8B6914" stroke-width="2" fill="none" stroke-linecap="round"/>
                                        <path v-if="password" d="M40 64 Q50 58 60 64" stroke="#8B6914" stroke-width="2" fill="none" stroke-linecap="round"/>
                                        
                                        <!-- Hands covering eyes when password is being typed -->
                                        <g v-if="password" class="hands-covering">
                                            <!-- Left Hand -->
                                            <ellipse cx="34" cy="38" rx="12" ry="10" fill="#D4A574" stroke="#8B6914" stroke-width="1.5" transform="rotate(-15 34 38)"/>
                                            <ellipse cx="32" cy="35" rx="4" ry="3" fill="#C4956A" transform="rotate(-15 32 35)"/>
                                            <ellipse cx="37" cy="35" rx="4" ry="3" fill="#C4956A" transform="rotate(-15 37 35)"/>
                                            <ellipse cx="34" cy="32" rx="4" ry="3" fill="#C4956A" transform="rotate(-15 34 32)"/>
                                            
                                            <!-- Right Hand -->
                                            <ellipse cx="66" cy="38" rx="12" ry="10" fill="#D4A574" stroke="#8B6914" stroke-width="1.5" transform="rotate(15 66 38)"/>
                                            <ellipse cx="68" cy="35" rx="4" ry="3" fill="#C4956A" transform="rotate(15 68 35)"/>
                                            <ellipse cx="63" cy="35" rx="4" ry="3" fill="#C4956A" transform="rotate(15 63 35)"/>
                                            <ellipse cx="66" cy="32" rx="4" ry="3" fill="#C4956A" transform="rotate(15 66 32)"/>
                                        </g>
                                        
                                        <!-- Blush -->
                                        <ellipse cx="32" cy="52" rx="8" ry="5" fill="#F4A4A4" opacity="0.4"/>
                                        <ellipse cx="68" cy="52" rx="8" ry="5" fill="#F4A4A4" opacity="0.4"/>
                                    </svg>
                                    
                                    <!-- Status Text -->
                                    <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        <span class="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                            {{ password ? '🙈 Shh... typing password' : '👀 Watching you' }}
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Ring Animation -->
                                <div class="absolute -inset-4 border-2 border-amber-400/20 rounded-full animate-spin-slow"></div>
                                <div class="absolute -inset-8 border border-orange-400/10 rounded-full animate-spin-slow" style="animation-direction: reverse; animation-duration: 12s;"></div>
                                
                            </div>
                            <p class="text-xs text-gray-400 dark:text-gray-500 items-center gap-1.5 mt-2">
                                <span class="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse mr-2"></span>
                                <span>Dont't worry, Mai tumhara password nhi dekh rha hunn!</span>
                            </p>

                            <!-- Welcome Text -->
                            <h3 class="text-3xl font-bold text-gray-800 dark:text-white mb-2 mt-6">
                                Welcome Back!
                            </h3>
                            <p class="text-gray-500 dark:text-gray-400 mb-6">
                                {{ password ? '🔒 Secure typing in progress...' : '👋 Ready to learn?' }}
                            </p>

                            <!-- Feature Grid -->
                            <div class="grid grid-cols-3 gap-3">
                                <div class="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800/30">
                                    <div class="text-2xl mb-1">🔒</div>
                                    <p class="text-xs font-medium text-gray-700 dark:text-gray-300">Secure</p>
                                </div>
                                <div class="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800/30">
                                    <div class="text-2xl mb-1">⚡</div>
                                    <p class="text-xs font-medium text-gray-700 dark:text-gray-300">Fast</p>
                                </div>
                                <div class="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800/30">
                                    <div class="text-2xl mb-1">🎯</div>
                                    <p class="text-xs font-medium text-gray-700 dark:text-gray-300">Smart</p>
                                </div>
                            </div>

                            <!-- Stats -->
                            <!-- <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div class="flex justify-around">
                                    <div>
                                        <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">Smart</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">Learning</p>
                                    </div>
                                    <div>
                                        <p class="text-2xl font-bold text-pink-600 dark:text-pink-400">100%</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">Satisfaction</p>
                                    </div>
                                    <div>
                                        <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">Support</p>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>

                    <!-- Floating Badges -->
                    <!-- <div class="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 shadow-xl border border-gray-100 dark:border-gray-700 animate-float" style="animation-delay: 1s;">
                        <div class="flex items-center gap-2">
                            <span class="text-yellow-400 text-lg">⭐</span>
                            <div>
                                <p class="text-sm font-bold text-gray-800 dark:text-white">5/5</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                            </div>
                        </div>
                    </div> -->

                    <div class="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 shadow-xl border border-gray-100 dark:border-gray-700 animate-float" style="animation-delay: 2s;">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">🚀</span>
                            <div>
                                <p class="text-sm font-bold text-gray-800 dark:text-white">Active</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Learning</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right side login form -->
        <div class="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-6 min-h-screen lg:min-h-0 bg-gray-50/50 dark:bg-slate-950/50">
            <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50">
                <!-- message with transition -->
                <transition name="fade">
                    <div v-if="message" class="flex items-center justify-between mb-4 p-3 rounded-xl"
                        :class="messageClass">
                        <p class="flex-1 text-sm">{{ message }}</p>
                        <button @click="clearMessage" class="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            ✕
                        </button>
                    </div>
                </transition>

                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/25">
                        <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-slate-200">
                        Welcome Back 👋
                    </h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to continue your learning journey</p>
                </div>

                <form class="space-y-5" @submit.prevent="loginUser">
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Email Address
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input type="email" id="email" v-model="email" placeholder="Enter your email"
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-200" />
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Password
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                                @focus="passwordFocused = true"
                                @blur="passwordFocused = false"
                                placeholder="Enter your password"
                                class="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-200" />
                            <button type="button" @click="togglePassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                                <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                                </svg>
                                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                        <!-- Password strength indicator -->
                        <div v-if="password" class="mt-2">
                            <div class="flex items-center gap-2">
                                <div class="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div class="h-full transition-all duration-500" 
                                        :class="passwordStrength.class"
                                        :style="{ width: passwordStrength.percentage + '%' }"></div>
                                </div>
                                <span class="text-xs font-medium" :class="passwordStrength.color">
                                    {{ passwordStrength.label }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Remember me + Forgot -->
                    <div class="flex items-center justify-between">
                        <label for="remember-me" class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                            <input type="checkbox" id="remember-me" v-model="rememberMe"
                                class="h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                            <span>Remember me</span>
                        </label>
                        <router-link to="/forgot/password" class="text-sm text-purple-500 hover:text-purple-600 transition-colors font-medium">
                            Forgot Password?
                        </router-link>
                    </div>

                    <!-- Login Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                        <span v-if="!isLoading">
                            Sign In
                        </span>
                        <span v-else>
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging in...
                        </span>
                    </button>

                    <!-- Divider -->
                    <div class="flex items-center my-6">
                        <div class="grow h-px bg-gray-200 dark:bg-gray-700"></div>
                        <span class="px-4 text-xs font-medium text-gray-400 uppercase">or continue with</span>
                        <div class="grow h-px bg-gray-200 dark:bg-gray-700"></div>
                    </div>

                    <!-- Social Login -->
                    <div class="flex gap-3">
                        <div id="google-signin-button" class="flex-1"></div>
                    </div>

                    <!-- Register -->
                    <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Don't have an account?
                        <router-link to="/signup" class="text-purple-500 font-semibold hover:text-purple-600 transition-colors">
                            Sign up
                            <svg class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleGoogleSignIn } from "../../utils/googleAuth.js";
import api from "../../services/axios.js";
import { startHeartbeat } from "../../utils/auth.js";

const route = useRoute();
const router = useRouter();

const showPassword = ref(false);
const passwordFocused = ref(false);
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const message = ref("");
const messageClass = ref("");
const isLoading = ref(false);

function togglePassword() {
    showPassword.value = !showPassword.value;
}

// Password strength calculation
const passwordStrength = computed(() => {
    const pwd = password.value;
    if (!pwd) return { label: '', percentage: 0, color: '', class: '' };
    
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.match(/[a-z]/)) score++;
    if (pwd.match(/[A-Z]/)) score++;
    if (pwd.match(/[0-9]/)) score++;
    if (pwd.match(/[^a-zA-Z0-9]/)) score++;
    
    const strengthMap = {
        0: { label: 'Weak', percentage: 20, color: 'text-red-500', class: 'bg-red-500' },
        1: { label: 'Weak', percentage: 20, color: 'text-red-500', class: 'bg-red-500' },
        2: { label: 'Fair', percentage: 40, color: 'text-yellow-500', class: 'bg-yellow-500' },
        3: { label: 'Good', percentage: 60, color: 'text-blue-500', class: 'bg-blue-500' },
        4: { label: 'Strong', percentage: 80, color: 'text-green-500', class: 'bg-green-500' },
        5: { label: 'Very Strong', percentage: 100, color: 'text-emerald-500', class: 'bg-emerald-500' }
    };
    
    return strengthMap[score] || strengthMap[0];
});

const showMessage = (text, type = "error") => {
    message.value = text;
    messageClass.value = type === "error" 
        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800" 
        : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800";
};

const getPostLoginRoute = (fallbackRoute) => {
    const redirectTarget = route.query.redirect;
    if (typeof redirectTarget === "string" && redirectTarget.startsWith("/")) {
        return redirectTarget;
    }
    return fallbackRoute;
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

        storage.setItem("token", response.data.token);
        storage.setItem("user", JSON.stringify(response.data.user));

        showMessage(response.data.message, "success");

        if (response.data.success) {
            const role = response.data.user.role;
            const nextRoute = getPostLoginRoute(
                role === "admin" ? "/admin/dashboard" :
                role === "student" ? "/student/dashboard" : "/"
            );

            setTimeout(() => {
                startHeartbeat();
                router.replace(nextRoute);
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
        const nextRoute = getPostLoginRoute(
            result.role === "admin" ? "/admin/dashboard" :
            result.role === "student" ? "/student/dashboard" : "/"
        );
        
        setTimeout(() => {
            startHeartbeat();
            router.replace(nextRoute);
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
/* ====== ANIMATIONS ====== */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes pulse-slow {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(1.05);
    }
}

@keyframes spin-slow {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.animate-float {
    animation: float 4s ease-in-out infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 5s ease-in-out infinite;
}

.animate-spin-slow {
    animation: spin-slow 10s linear infinite;
}

/* ====== MONKEY ANIMATIONS ====== */
.eyes-open {
    animation: eyeBlink 3s ease-in-out infinite;
}

@keyframes eyeBlink {
    0%, 45%, 55%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.eyes-closed {
    animation: none;
}

.eyebrows-up {
    animation: eyebrowRaise 2s ease-in-out infinite;
}

.eyebrows-down {
    animation: none;
}

@keyframes eyebrowRaise {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-2px);
    }
}

.hands-covering {
    animation: coverEyes 0.5s ease-out forwards;
}

@keyframes coverEyes {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* ====== 3D PERSPECTIVE ====== */
.perspective-1000 {
    perspective: 1000px;
}

.rotate-y-5 {
    transform: rotateY(5deg);
}

/* ====== TRANSITIONS ====== */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s ease, transform 0.3s ease;
}
.fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1024px) {
    .min-h-screen {
        min-height: 100vh;
    }
}

@media (max-width: 640px) {
    .rounded-3xl {
        border-radius: 1.5rem;
    }
    
    .p-6 {
        padding: 1.25rem;
    }
}
</style>