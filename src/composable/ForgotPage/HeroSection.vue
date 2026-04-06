<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950 flex items-center justify-center p-4 md:p-8">
    <div class="w-full max-w-md">
      <!-- Logo/Header Section -->
      <div class="text-center mb-8 md:mb-10">
        <div class="flex justify-center mb-4">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br
            from-indigo-700 via-purple-700 to-pink-700
            dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500

            flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-800 via-teal-900 to-pink-500 dark:from-purple-600 dark:via-yellow-500 dark:to-pink-600 bg-clip-text text-transparent">
          Password Recovery
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
          Follow these steps to reset your password
        </p>
      </div>

      <!-- Main Card -->
      <div class="bg-slate-300 dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden">
        <!-- Decorative background elements -->
        <div class="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 via-yellow-500/10 to-pink-500/10 blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-pink-500/10 via-yellow-500/10 to-purple-500/10 blur-3xl"></div>
        
        <!-- Message display -->
        <transition name="slide-down">
          <div v-if="message" 
               class="flex items-center justify-between mb-6 p-4 rounded-xl backdrop-blur-sm"
               :class="messageClass">
            <div class="flex items-center">
              <svg v-if="messageType === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="flex-1 font-medium">{{ message }}</p>
            </div>
            <button @click="clearMessage" class="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              ✕
            </button>
          </div>
        </transition>

        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div v-for="(step, index) in 3" :key="step"
                   class="flex items-center">
                <!-- Step indicator -->
                <div class="relative">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                       :class="currentStep > index ? 
                              'bg-green-700 text-white shadow-lg shadow-purple-500/30' :
                              'bg-gray-100 dark:bg-slate-700 text-gray-400'">
                    <span v-if="currentStep > index" class="text-lg">✓</span>
                    <span v-else class="font-semibold">{{ index + 1 }}</span>
                  </div>
                  <!-- Connecting line -->
                  <div v-if="index < 2" 
                       class="absolute top-1/2 left-10 w-12 h-0.5 -translate-y-1/2"
                       :class="currentStep > index ? 'bg-gradient-to-r from-pink-500 via-lime-600 to-purple-600' : 'bg-gray-200 dark:bg-slate-700'"></div>
                </div>
                <!-- Step label -->
                <div class="ml-4 hidden sm:block">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ stepTitles[index] }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Step label for mobile -->
          <div class="sm:hidden text-center mt-2">
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ stepTitles[currentStep] }}</p>
          </div>
        </div>

        <!-- Step 1: Enter Email -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 0" class="space-y-6">
            <div class="text-center mb-2">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Enter your email address to receive a 6-digit verification code.
              </p>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Email Address
              </label>
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  placeholder="you@example.com"
                  required
                  class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-slate-700 dark:text-white transition-all duration-200"
                  :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.email }"
                  @keyup.enter="sendResetCode"
                />
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p v-if="errors.email" class="mt-2 text-sm text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ errors.email }}
              </p>
            </div>

            <button
              @click="sendResetCode"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-pink-500 text-white py-3.5 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Reset Code...
              </span>
              <span v-else class="font-semibold">Send Reset Code</span>
            </button>

            <div class="text-center pt-4 border-t border-gray-100 dark:border-slate-700">
              <router-link to="/login" class="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </router-link>
            </div>
          </div>

          <!-- Step 2: Verify Code -->
          <div v-else-if="currentStep === 1" class="space-y-6">
            <div class="text-center mb-2">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-600 dark:text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Enter the 6-digit code sent to 
                <span class="font-semibold text-purple-600 dark:text-purple-400">{{ formData.email }}</span>
              </p>
            </div>
            
            <div class="text-center">
              <div class="flex justify-center space-x-2 sm:space-x-3 mb-6">
                <input
                  v-for="n in 6"
                  :key="n"
                  v-model="verificationCode[n-1]"
                  @input="onCodeInput(n-1, $event)"
                  @keydown.delete="onCodeDelete(n-1, $event)"
                  @paste="onCodePaste"
                  type="text"
                  maxlength="1"
                  class="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-slate-700 dark:text-white transition-all duration-200"
                  :class="{ 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-900': verificationCode[n-1] }"
                  :ref="el => codeInputs[n-1] = el"
                />
              </div>
              
              <!-- Timer -->
              <div class="mb-6">
                <div class="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r
from-slate-100 via-blue-100 to-indigo-100
dark:from-gray-800 dark:via-blue-900 dark:to-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Code expires in:</span>
                  <span class="font-mono font-bold text-lg" :class="timerClass">
                    {{ formatTime(countdown) }}
                  </span>
                </div>
              </div>

              <p v-if="errors.code" class="mt-2 text-sm text-red-500">{{ errors.code }}</p>
            </div>

            <div class="flex space-x-3">
              <button
                @click="currentStep = 0"
                class="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium"
              >
                Back
              </button>
              <button
                    @click="verifyResetCode"
                    :disabled="loading || verificationCode.join('').length !== 6"
                    class="
                        flex-1
                        bg-indigo-600
                        hover:bg-indigo-700
                        dark:bg-indigo-500
                        dark:hover:bg-indigo-600
                        text-white
                        py-3.5
                        rounded-xl
                        shadow-md shadow-indigo-500/30
                        hover:shadow-lg hover:shadow-indigo-500/40
                        transition-all duration-300
                        transform hover:-translate-y-0.5
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:hover:transform-none
                        font-medium
                        focus:outline-none
                        focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
                        dark:focus:ring-offset-gray-900
                    "
                    >
                    <!-- Loading state -->
                    <span v-if="loading" class="flex items-center justify-center">
                        <svg
                        class="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                        </svg>
                        Verifying...
                    </span>

                    <!-- Normal state -->
                    <span v-else>Verify Code</span>
                </button>

            </div>

            <div class="text-center pt-4 border-t border-gray-100 dark:border-slate-700">
              <button
                @click="resendCode"
                :disabled="resendCooldown > 0"
                class="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code' }}
              </button>
            </div>
          </div>

          <!-- Step 3: Reset Password -->
          <div v-else class="space-y-6">
            <div class="text-center mb-2">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Create a strong, secure password for your account
              </p>
            </div>
            
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                New Password
              </label>
              <div class="relative">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  id="newPassword"
                  v-model="formData.new_password"
                  placeholder="Enter new password"
                  required
                  class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-slate-700 dark:text-white transition-all duration-200 pr-12"
                  :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.new_password }"
                />
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                >
                  <svg v-if="showNewPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3l18 18" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.new_password" class="mt-2 text-sm text-red-500">{{ errors.new_password }}</p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Confirm Password
              </label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="formData.confirm_password"
                  placeholder="Confirm new password"
                  required
                  class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-slate-700 dark:text-white transition-all duration-200 pr-12"
                  :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.confirm_password }"
                />
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                >
                  <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3l18 18" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirm_password" class="mt-2 text-sm text-red-500">{{ errors.confirm_password }}</p>
            </div>

            <div class="flex space-x-3">
              <button
                @click="currentStep = 1"
                class="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium"
              >
                Back
              </button>
              <button
                @click="resetPassword"
                :disabled="loading"
                class="flex-1 bg-indigo-600 dark:bg-indigo-800 text-white py-3.5 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none font-medium"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting Password...
                </span>
                <span v-else>Reset Password</span>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6 md:mt-8">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Need help? 
          
          <!-- router-link to contact page -->
          <router-link to="/contact" class="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors font-medium">
            Contact support
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { API_ENDPOINTS } from '../../services/api.js'

const router = useRouter()

// State
const currentStep = ref(0)
const loading = ref(false)
const message = ref('')
const messageType = ref('') // 'success' or 'error'
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const countdown = ref(600) // 10 minutes in seconds
const resendCooldown = ref(0)
const verificationCode = ref(['', '', '', '', '', ''])
const codeInputs = ref([])

// Form data
const formData = ref({
  email: '',
  new_password: '',
  confirm_password: ''
})

const errors = ref({})

// Step titles
const stepTitles = ref([
  'Enter Email',
  'Verify Code',
  'New Password'
])

// Computed properties
const messageClass = computed(() => {
  return {
    'bg-green-50/80 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800': messageType.value === 'success',
    'bg-red-50/80 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800': messageType.value === 'error'
  }
})

const timerClass = computed(() => {
  if (countdown.value > 120) return 'text-green-600 dark:text-green-400'
  if (countdown.value > 30) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
})

// Methods
const clearMessage = () => {
  message.value = ''
  messageType.value = ''
}

const showMessage = (text, type = 'error') => {
  message.value = text
  messageType.value = type
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const onCodeInput = (index, event) => {
  const value = event.target.value
  
  // Only allow digits
  if (!/^\d*$/.test(value)) {
    verificationCode.value[index] = ''
    return
  }
  
  verificationCode.value[index] = value
  
  // Auto-focus next input
  if (value && index < 5) {
    nextTick(() => {
      codeInputs.value[index + 1]?.focus()
    })
  }
}

const onCodeDelete = (index, event) => {
  if (!verificationCode.value[index] && index > 0 && event.key === 'Backspace') {
    nextTick(() => {
      codeInputs.value[index - 1]?.focus()
      codeInputs.value[index - 1]?.select()
    })
  }
}

const onCodePaste = (event) => {
  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text') || ''
  const digits = pasteData.replace(/\D/g, '').slice(0, 6).split('')
  
  digits.forEach((digit, index) => {
    if (index < 6) {
      verificationCode.value[index] = digit
    }
  })
  
  // Focus the last filled input or the last one
  const lastFilledIndex = digits.length - 1
  nextTick(() => {
    if (lastFilledIndex < 5) {
      codeInputs.value[lastFilledIndex + 1]?.focus()
    } else {
      codeInputs.value[5]?.focus()
    }
  })
}

// API calls
const sendResetCode = async () => {
  errors.value = {}
  
  if (!formData.value.email) {
    errors.value.email = 'Email is required'
    return
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    return
  }
  
  loading.value = true
  
  try {
    const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.value.email })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      showMessage(data.message, 'success')
      currentStep.value = 1
      startCountdown()
      
      // Auto-focus first code input
      nextTick(() => {
        codeInputs.value[0]?.focus()
      })
    } else {
      showMessage(data.error, 'error')
    }
  } catch (error) {
    showMessage('Failed to send reset code. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

const verifyResetCode = async () => {
  errors.value = {}
  
  const code = verificationCode.value.join('')
  if (code.length !== 6) {
    errors.value.code = 'Please enter the complete 6-digit code'
    return
  }
  
  loading.value = true
  
  try {
    const response = await fetch(API_ENDPOINTS.VERIFY_RESET_CODE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.value.email,
        code: code
      })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      showMessage(data.message, 'success')
      currentStep.value = 2
    } else {
      showMessage(data.error, 'error')
    }
  } catch (error) {
    showMessage('Failed to verify code. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

const resetPassword = async () => {
  errors.value = {}
  
  // Validation
  if (!formData.value.new_password) {
    errors.value.new_password = 'New password is required'
  } else if (formData.value.new_password.length < 6) {
    errors.value.new_password = 'Password must be at least 6 characters'
  }
  
  if (!formData.value.confirm_password) {
    errors.value.confirm_password = 'Please confirm your password'
  } else if (formData.value.new_password !== formData.value.confirm_password) {
    errors.value.confirm_password = 'Passwords do not match'
  }
  
  if (Object.keys(errors.value).length > 0) return
  
  loading.value = true
  
  try {
    const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.value.email,
        new_password: formData.value.new_password,
        confirm_password: formData.value.confirm_password
      })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      showMessage('Password reset successfully! Redirecting to login...', 'success')
      
      // Redirect to login after successful reset
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      showMessage(data.error, 'error')
    }
  } catch (error) {
    showMessage('Failed to reset password. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  if (resendCooldown.value > 0) return
  
  loading.value = true
  
  try {
    const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.value.email })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      showMessage('Reset code resent to your email', 'success')
      resendCooldown.value = 60 // 60 seconds cooldown
      countdown.value = 600 // Reset to 10 minutes
      
      // Start cooldown timer
      const cooldownInterval = setInterval(() => {
        resendCooldown.value--
        if (resendCooldown.value <= 0) {
          clearInterval(cooldownInterval)
        }
      }, 1000)
    } else {
      showMessage(data.error, 'error')
    }
  } catch (error) {
    showMessage('Failed to resend code. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

// Timer functions
let countdownInterval = null

const startCountdown = () => {
  countdown.value = 600
  
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(countdownInterval)
      if (currentStep.value === 1) {
        showMessage('Reset code has expired. Please request a new one.', 'error')
      }
    }
  }, 1000)
}

// Lifecycle
onMounted(() => {
  // Check for email in query params
  const urlParams = new URLSearchParams(window.location.search)
  const email = urlParams.get('email')
  if (email) {
    formData.value.email = email
  }
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
/* Animations */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #9333ea, #ec4899);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #7e22ce, #db2777);
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>