<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Left side - 3D Animated Panda Illustration -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 items-center justify-center p-8 relative overflow-hidden">
      
      <!-- Decorative Background Shapes -->
      <div class="absolute top-10 left-10 w-64 h-64 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-10 right-10 w-72 h-72 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl"></div>

      <!-- 3D Panda Illustration Container -->
      <div class="relative z-10 w-full max-w-lg">
        <div class="relative flex items-center justify-center">
          
          <!-- Floating Orbs -->
          <div class="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-float" style="animation-delay: 0s;"></div>
          <div class="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 animate-float" style="animation-delay: 1.5s;"></div>
          <div class="absolute top-1/2 -right-20 w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-15 animate-float" style="animation-delay: 3s;"></div>
          
          <!-- Main 3D Card -->
          <div class="relative w-full max-w-md p-10 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-slate-700/50 transform perspective-1000 rotate-y-5 hover:rotate-y-0 transition-all duration-700">
            
            <!-- Decorative Elements -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full"></div>
              <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full"></div>
            </div>

            <!-- 3D Panda Illustration Content -->
            <div class="relative text-center">
              
              <!-- Panda Container -->
              <div class="relative inline-block mb-8">
                <!-- Outer Glow -->
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                
                <!-- Panda Character Container -->
                <div class="relative w-44 h-44 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl animate-float overflow-hidden">
                  
                  <!-- Panda SVG -->
                  <svg class="w-40 h-40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Body -->
                    <ellipse cx="60" cy="85" rx="30" ry="25" fill="white" stroke="#E0E0E0" stroke-width="1.5"/>
                    
                    <!-- Head -->
                    <circle cx="60" cy="45" r="35" fill="white" stroke="#E0E0E0" stroke-width="2"/>
                    
                    <!-- Left Ear -->
                    <circle cx="30" cy="20" r="14" fill="#2C2C2C"/>
                    <circle cx="30" cy="20" r="8" fill="#1A1A1A"/>
                    
                    <!-- Right Ear -->
                    <circle cx="90" cy="20" r="14" fill="#2C2C2C"/>
                    <circle cx="90" cy="20" r="8" fill="#1A1A1A"/>
                    
                    <!-- Left Eye Patch -->
                    <ellipse cx="45" cy="40" rx="14" ry="16" fill="#2C2C2C"/>
                    
                    <!-- Right Eye Patch -->
                    <ellipse cx="75" cy="40" rx="14" ry="16" fill="#2C2C2C"/>
                    
                    <!-- Left Eye -->
                    <g :class="password ? 'eyes-closed' : 'eyes-open'">
                      <!-- Eye White -->
                      <ellipse v-if="!password" cx="45" cy="40" rx="9" ry="10" fill="white"/>
                      <!-- Pupil -->
                      <circle v-if="!password" cx="47" cy="41" r="5" fill="#1A1A1A"/>
                      <circle v-if="!password" cx="48" cy="39" r="2" fill="white"/>
                      
                      <!-- Closed Eye -->
                      <path v-if="password" d="M36 40 Q45 34 54 40" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </g>
                    
                    <!-- Right Eye -->
                    <g :class="password ? 'eyes-closed' : 'eyes-open'">
                      <!-- Eye White -->
                      <ellipse v-if="!password" cx="75" cy="40" rx="9" ry="10" fill="white"/>
                      <!-- Pupil -->
                      <circle v-if="!password" cx="77" cy="41" r="5" fill="#1A1A1A"/>
                      <circle v-if="!password" cx="78" cy="39" r="2" fill="white"/>
                      
                      <!-- Closed Eye -->
                      <path v-if="password" d="M66 40 Q75 34 84 40" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </g>
                    
                    <!-- Nose -->
                    <ellipse cx="60" cy="52" rx="5" ry="3" fill="#2C2C2C"/>
                    
                    <!-- Mouth -->
                    <path v-if="!password" d="M55 58 Q60 64 65 58" stroke="#2C2C2C" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <path v-if="password" d="M55 62 Q60 58 65 62" stroke="#2C2C2C" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    
                    <!-- Blush -->
                    <ellipse cx="38" cy="50" rx="6" ry="4" fill="#FFB6B6" opacity="0.5"/>
                    <ellipse cx="82" cy="50" rx="6" ry="4" fill="#FFB6B6" opacity="0.5"/>
                    
                    <!-- Left Arm (paw) -->
                    <ellipse cx="28" cy="65" rx="10" ry="8" fill="white" stroke="#E0E0E0" stroke-width="1.5" transform="rotate(-20 28 65)"/>
                    <ellipse cx="25" cy="63" rx="4" ry="3" fill="#E0E0E0" transform="rotate(-20 25 63)"/>
                    <ellipse cx="30" cy="61" rx="4" ry="3" fill="#E0E0E0" transform="rotate(-20 30 61)"/>
                    
                    <!-- Right Arm (paw) -->
                    <ellipse cx="92" cy="65" rx="10" ry="8" fill="white" stroke="#E0E0E0" stroke-width="1.5" transform="rotate(20 92 65)"/>
                    <ellipse cx="95" cy="63" rx="4" ry="3" fill="#E0E0E0" transform="rotate(20 95 63)"/>
                    <ellipse cx="90" cy="61" rx="4" ry="3" fill="#E0E0E0" transform="rotate(20 90 61)"/>
                    
                    <!-- Bamboo leaf decoration -->
                    <g opacity="0.3">
                      <path d="M20 10 Q25 5 30 8" stroke="#4CAF50" stroke-width="2" fill="none" stroke-linecap="round"/>
                      <path d="M22 12 Q27 7 32 10" stroke="#4CAF50" stroke-width="2" fill="none" stroke-linecap="round"/>
                      <path d="M18 14 Q23 9 28 12" stroke="#4CAF50" stroke-width="2" fill="none" stroke-linecap="round"/>
                    </g>
                    
                    <!-- Floating hearts when not typing -->
                    <g v-if="!password" opacity="0.5">
                      <text x="10" y="15" font-size="10">❤️</text>
                      <text x="95" y="10" font-size="8">❤️</text>
                      <text x="15" y="90" font-size="8">❤️</text>
                    </g>
                    
                    <!-- Floating lock icons when typing -->
                    <g v-if="password" opacity="0.4">
                      <text x="10" y="15" font-size="10">🔒</text>
                      <text x="95" y="10" font-size="8">🔒</text>
                      <text x="15" y="90" font-size="8">🔒</text>
                    </g>
                  </svg>
                  
                  <!-- Status Text -->
                  <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span class="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {{ password ? '🙈 Panda is shy... typing password' : '🐼 Panda is watching you' }}
                    </span>
                  </div>
                </div>
                
                <!-- Rotating Rings -->
                <div class="absolute -inset-4 border-2 border-purple-400/20 rounded-full animate-spin-slow"></div>
                <div class="absolute -inset-8 border border-pink-400/10 rounded-full animate-spin-slow" style="animation-direction: reverse; animation-duration: 12s;"></div>
                <div class="absolute -inset-12 border border-blue-400/5 rounded-full animate-spin-slow" style="animation-duration: 15s;"></div>
              </div>

              <!-- Welcome Text -->
              <h3 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Join Our Community!
              </h3>
              <p class="text-gray-500 dark:text-gray-400 mb-6">
                {{ password ? '🔒 Secure signup in progress...' : '🐼 Start your learning journey today' }}
              </p>

              <!-- Feature Tags -->
              <div class="flex flex-wrap justify-center gap-2">
                
                <span class="px-3 py-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-full text-xs font-medium text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                  🎓 Expert Mentors
                </span>
                <span class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  🏆 Certified Programs
                </span>
                <span class="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full text-xs font-medium text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                  💡 Interactive Learning
                </span>
              </div>
            </div>
          </div>

          <!-- Floating Badges -->
          <!-- <div class="absolute -top-3 -right-3 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 shadow-xl border border-gray-100 dark:border-gray-700 animate-float" style="animation-delay: 1s;">
            <div class="flex items-center gap-2">
              <span class="text-yellow-400 text-lg">⭐</span>
              <div>
                <p class="text-sm font-bold text-gray-800 dark:text-white">4.9/5</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Rating</p>
              </div>
            </div>
          </div> -->

          <div class="absolute -bottom-3 -left-3 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 shadow-xl border border-gray-100 dark:border-gray-700 animate-float" style="animation-delay: 2s;">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎯</span>
              <div>
                <p class="text-sm font-bold text-gray-800 dark:text-white">Goal</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Oriented</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side form -->
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-slate-200">
            Create Account ✨
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Join thousands of learners worldwide</p>
        </div>

        <!-- Social Signup -->
        <div class="flex gap-3 mb-6">
          <div id="google-signup-button" class="flex-1"></div>
        </div>

        <div class="flex items-center my-6">
          <div class="grow h-px bg-gray-200 dark:bg-gray-700"></div>
          <span class="px-4 text-xs font-medium text-gray-400 uppercase">or sign up with email</span>
          <div class="grow h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="registerUser">
          <!-- Full Name -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                v-model="fullName"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-200"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="you@example.com" 
                  v-model="email" 
                  :disabled="emailVerified"
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-200"
                />
              </div>
              <button 
                type="button" 
                @click="sendOtp" 
                :disabled="otpSent || !email"
                class="px-4 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {{ otpSent ? "Sent ✓" : "Verify" }}
              </button>
            </div>

            <!-- OTP input -->
            <div v-if="otpSent && !emailVerified" class="mt-3 flex gap-2">
              <input 
                type="text" 
                placeholder="Enter OTP" 
                v-model="otp"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-200"
              />
              <button 
                type="button" 
                @click="verifyOtp"
                class="px-4 py-3 rounded-xl text-white font-medium bg-green-500 hover:bg-green-600 transition-all duration-300"
              >
                Verify
              </button>
            </div>
            
            <div v-if="otpSent && !emailVerified" class="mt-2 text-sm">
              <button type="button" @click="sendOtp" :disabled="resendTimer > 0"
                class="text-purple-500 hover:text-purple-600 transition-colors disabled:opacity-50">
                Resend OTP
              </button>
              <span v-if="resendTimer > 0" class="text-gray-500 ml-2">
                ({{ resendTimer }}s)
              </span>
            </div>

            <p v-if="emailVerified" class="text-green-500 text-sm mt-1 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Email verified
            </p>
          </div>

          <!-- Password -->
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Enter your password"
                v-model="password"
                @focus="passwordFocused = true"
                @blur="passwordFocused = false"
                class="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-200"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <svg v-if="!showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                </svg>
              </button>
            </div>
            <!-- Password strength -->
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
            <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">Password must be at least 6 characters</p>
          </div>

          <!-- Confirm Password -->
          <div class="relative">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Confirm Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                placeholder="Confirm your password"
                v-model="confirmPassword"
                class="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-200"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <svg v-if="!showConfirmPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                </svg>
              </button>
            </div>
            <p v-if="confirmPassword && password !== confirmPassword" class="text-red-500 text-xs mt-1">
              Passwords do not match
            </p>
          </div>

          <!-- Sign Up Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">
              <svg class="w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create Account
            </span>
            <span v-else>
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?
          <router-link to="/login" class="text-purple-500 font-semibold hover:text-purple-600 transition-colors">
            Sign in
            <svg class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </p>
      </div>
    </div>

    <!-- Set Password Modal -->
    <transition name="fade">
      <div
        v-if="showSetPasswordModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      >
        <div class="w-full max-w-md rounded-3xl border border-gray-200 bg-white dark:bg-slate-900 p-6 shadow-2xl dark:border-gray-700">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Set Your Password 🔐</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create a password for your Google account so you can also sign in with email and password.
          </p>

          <div class="mt-5 space-y-4">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <div class="relative">
                <input
                  :type="showGooglePassword ? 'text' : 'password'"
                  v-model="googlePassword"
                  placeholder="Enter a password"
                  class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  @click="showGooglePassword = !showGooglePassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg v-if="!showGooglePassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <div class="relative">
                <input
                  :type="showGoogleConfirmPassword ? 'text' : 'password'"
                  v-model="googleConfirmPassword"
                  placeholder="Confirm your password"
                  class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  @click="showGoogleConfirmPassword = !showGoogleConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg v-if="!showGoogleConfirmPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                  </svg>
                </button>
              </div>
            </div>

            <p v-if="googlePasswordError" class="text-sm text-red-500">{{ googlePasswordError }}</p>

            <button
              type="button"
              @click="submitGooglePassword"
              :disabled="googlePasswordLoading"
              class="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ googlePasswordLoading ? 'Saving...' : 'Set Password' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../../services/axios.js";
import { useRouter } from "vue-router";

const router = useRouter();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordFocused = ref(false);

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

const showSetPasswordModal = ref(false);
const showGooglePassword = ref(false);
const showGoogleConfirmPassword = ref(false);
const googlePassword = ref("");
const googleConfirmPassword = ref("");
const googlePasswordLoading = ref(false);
const googlePasswordError = ref("");
const pendingGoogleToken = ref("");
const pendingGoogleAuth = ref(null);

const message = ref("");
const messageClass = ref("");

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

const clearMessage = () => {
  message.value = "";
  messageClass.value = "";
};

const startResendTimer = () => {
  resendTimer.value = 60;
  timerInterval = setInterval(() => {
    resendTimer.value--;
    if (resendTimer.value <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
};

const sendOtp = async () => {
  try {
    const res = await api.post("/api/auth/send-email-otp", { email: email.value });
    otpSent.value = true;
    startResendTimer();
    showMessage(res.data.message, "success");
  } catch (error) {
    showMessage(error.response?.data?.error || "Failed to send OTP", "error");
  }
};

const verifyOtp = async () => {
  try {
    const res = await api.post("/api/auth/verify-email-otp", {
      email: email.value,
      otp: otp.value,
    });
    emailVerified.value = true;
    showMessage(res.data.message || "Email verified successfully", "success");
  } catch (error) {
    showMessage(error.response?.data?.error || "Invalid OTP", "error");
  }
};

const registerUser = async () => {
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    showMessage("Please fill in all fields", "error");
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    showMessage("Passwords do not match", "error");
    return;
  }
  
  if (password.value.length < 6) {
    showMessage("Password must be at least 6 characters long", "error");
    return;
  }
  
  if (!emailVerified.value) {
    showMessage("Please verify your email first", "error");
    return;
  }

  const data = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  isLoading.value = true;

  try {
    const response = await api.post("/api/auth/register", data);
    showMessage(response.data.message || "Registration successful! Redirecting to login...", "success");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    console.error("Error during registration:", error);
    showMessage(error.response?.data?.error || "Registration failed. Please try again.", "error");
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleSignUp = async (response) => {
  isLoading.value = true;
  googlePasswordError.value = "";
  try {
    if (!response?.credential) {
      throw new Error("No credential received from Google");
    }

    const result = await api.post("/api/auth/google-signup", {
      token: response.credential,
    });

    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));

    pendingGoogleToken.value = response.credential;
    pendingGoogleAuth.value = result.data;

    googlePassword.value = "";
    googleConfirmPassword.value = "";
    showSetPasswordModal.value = true;
    showMessage("Google signup successful. Set your password to continue.", "success");
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Google sign up failed";
    if (errorMessage.includes("already exists")) {
      showMessage("Account with this email already exists. Please login instead.", "error");
    } else {
      showMessage(errorMessage, "error");
    }
  } finally {
    isLoading.value = false;
  }
};

const submitGooglePassword = async () => {
  googlePasswordError.value = "";

  if (!googlePassword.value || !googleConfirmPassword.value) {
    googlePasswordError.value = "Please fill in both password fields.";
    return;
  }

  if (googlePassword.value.length < 6) {
    googlePasswordError.value = "Password must be at least 6 characters long.";
    return;
  }

  if (googlePassword.value !== googleConfirmPassword.value) {
    googlePasswordError.value = "Passwords do not match.";
    return;
  }

  if (!pendingGoogleToken.value) {
    googlePasswordError.value = "Google session expired. Please sign up again.";
    return;
  }

  googlePasswordLoading.value = true;

  try {
    await api.post("/api/auth/google-set-password", {
      token: pendingGoogleToken.value,
      new_password: googlePassword.value,
      confirm_password: googleConfirmPassword.value,
    });

    showSetPasswordModal.value = false;
    showMessage("Password set successfully.", "success");

    const role = pendingGoogleAuth.value?.user?.role;
    setTimeout(() => {
      if (role === "student") {
        window.location.href = "/student/dashboard";
      } else if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    }, 1000);
  } catch (error) {
    googlePasswordError.value = error.response?.data?.error || "Failed to set password. Please try again.";
  } finally {
    googlePasswordLoading.value = false;
  }
};

onMounted(() => {
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

/* ====== PANDA EYE ANIMATIONS ====== */
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