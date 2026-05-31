<template>
  <div class="min-h-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-6 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
    <div class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
      <aside class="relative hidden overflow-hidden rounded-4xl border border-white/70 bg-linear-to-br from-[#073b4c] via-[#0f766e] to-[#2563eb] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] lg:block">
        <div class="absolute -top-24 right-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div class="relative z-10 flex h-full flex-col justify-between">
          <div>
            <div class="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              Secure password recovery
            </div>

            <h1 class="max-w-md text-4xl font-black leading-tight tracking-tight xl:text-5xl">
              Reset your password with a clean, guided flow.
            </h1>
            <p class="mt-4 max-w-lg text-base leading-7 text-cyan-50/85">
              Verify your email, confirm your code, and create a new password with a modern interface that works smoothly on mobile and desktop.
            </p>
          </div>

          <div class="mt-10 grid grid-cols-3 gap-3 text-center">
            <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p class="text-2xl font-black">3</p>
              <p class="mt-1 text-xs text-cyan-50/80">Steps</p>
            </div>
            <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p class="text-2xl font-black">6</p>
              <p class="mt-1 text-xs text-cyan-50/80">Digit code</p>
            </div>
            <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p class="text-2xl font-black">10m</p>
              <p class="mt-1 text-xs text-cyan-50/80">Expiry</p>
            </div>
          </div>
        </div>
      </aside>

      <div class="w-full">
        <div class="mb-6 text-center lg:hidden">
          <div class="mb-4 flex justify-center">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#073b4c] via-[#0f766e] to-[#2563eb] shadow-lg shadow-cyan-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Password Recovery
          </h1>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Follow three quick steps to regain access.
          </p>
        </div>

        <div class="relative overflow-hidden rounded-4xl border border-white/70 bg-white/90 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85 sm:p-7 lg:p-8">
          <div class="absolute -top-24 right-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"></div>
          <div class="absolute -bottom-24 left-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl"></div>

          <div class="relative z-10">
            <div class="mb-7 hidden text-center lg:block">
              <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white xl:text-4xl">
                Password Recovery
              </h1>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Follow these steps to reset your password
              </p>
            </div>

            <transition name="slide-down">
              <div v-if="message" class="mb-6 flex items-center justify-between rounded-2xl p-4 shadow-sm backdrop-blur-sm" :class="messageClass">
                <div class="flex items-center">
                  <svg v-if="messageType === 'success'" xmlns="http://www.w3.org/2000/svg" class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="flex-1 font-medium">{{ message }}</p>
                </div>
                <button @click="clearMessage" class="ml-4 text-current/70 transition-colors hover:text-current">✕</button>
              </div>
            </transition>

            <div class="mb-8">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3 sm:gap-4">
                  <div v-for="(step, index) in 3" :key="step" class="flex items-center">
                    <div class="relative">
                      <div class="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300" :class="currentStep > index ? 'bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'">
                        <span v-if="currentStep > index" class="text-lg">✓</span>
                        <span v-else class="font-semibold">{{ index + 1 }}</span>
                      </div>
                      <div v-if="index < 2" class="absolute top-1/2 left-10 h-0.5 w-12 -translate-y-1/2" :class="currentStep > index ? 'bg-linear-to-r from-cyan-400 via-teal-400 to-emerald-500' : 'bg-slate-200 dark:bg-slate-700'"></div>
                    </div>
                    <div class="ml-4 hidden sm:block">
                      <p class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ stepTitles[index] }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-3 text-center sm:hidden">
                <p class="text-lg font-semibold text-slate-900 dark:text-slate-200">{{ stepTitles[currentStep] }}</p>
              </div>
            </div>

            <transition name="slide-fade" mode="out-in">
              <div v-if="currentStep === 0" class="space-y-6">
                <div class="text-center">
                  <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-cyan-50 to-teal-100 text-cyan-700 shadow-sm dark:from-cyan-950/30 dark:to-teal-900/30 dark:text-cyan-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p class="text-slate-600 dark:text-slate-400">
                    Enter your email address to receive a 6-digit verification code.
                  </p>
                </div>

                <div>
                  <label for="email" class="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div class="relative">
                    <input
                      type="email"
                      id="email"
                      v-model="formData.email"
                      placeholder="you@example.com"
                      required
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.email }"
                      @keyup.enter="sendResetCode"
                    />
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <p v-if="errors.email" class="mt-2 flex items-center text-sm text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ errors.email }}
                  </p>
                </div>

                <button
                  @click="sendResetCode"
                  :disabled="loading"
                  class="w-full rounded-2xl bg-linear-to-r from-[#073b4c] via-[#0f766e] to-[#0ea5a6] py-3.5 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span v-if="loading" class="flex items-center justify-center">
                    <svg class="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Reset Code...
                  </span>
                  <span v-else class="font-semibold">Send Reset Code</span>
                </button>

                <div class="border-t border-slate-100 pt-4 text-center dark:border-slate-800">
                  <router-link to="/login" class="inline-flex items-center text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Login
                  </router-link>
                </div>
              </div>

              <div v-else-if="currentStep === 1" class="space-y-6">
                <div class="text-center">
                  <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-cyan-50 to-teal-100 text-cyan-700 shadow-sm dark:from-cyan-950/30 dark:to-teal-900/30 dark:text-cyan-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <p class="text-slate-600 dark:text-slate-400">
                    Enter the 6-digit code sent to
                    <span class="font-semibold text-cyan-700 dark:text-cyan-400">{{ formData.email }}</span>
                  </p>
                </div>

                <div class="text-center">
                  <div class="mb-6 flex justify-center space-x-2 sm:space-x-3">
                    <input
                      v-for="n in 6"
                      :key="n"
                      v-model="verificationCode[n-1]"
                      @input="onCodeInput(n-1, $event)"
                      @keydown.delete="onCodeDelete(n-1, $event)"
                      @paste="onCodePaste"
                      type="text"
                      maxlength="1"
                      class="h-14 w-12 rounded-2xl border-2 border-slate-200 bg-white text-center text-2xl font-bold text-slate-900 shadow-sm transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:h-16 sm:w-14 sm:text-3xl"
                      :class="{ 'border-cyan-500 ring-2 ring-cyan-500/10': verificationCode[n-1] }"
                      :ref="el => codeInputs[n-1] = el"
                    />
                  </div>

                  <div class="mb-6">
                    <div class="inline-flex items-center justify-center space-x-2 rounded-full bg-linear-to-r from-slate-100 via-cyan-50 to-teal-100 px-4 py-2 dark:from-slate-800 dark:via-cyan-950 dark:to-teal-950">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-700 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-sm text-slate-600 dark:text-slate-400">Code expires in:</span>
                      <span class="font-mono text-lg font-bold" :class="timerClass">{{ formatTime(countdown) }}</span>
                    </div>
                  </div>

                  <p v-if="errors.code" class="mt-2 text-sm text-red-500">{{ errors.code }}</p>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row">
                  <button
                    @click="currentStep = 0"
                    class="flex-1 rounded-2xl border-2 border-slate-200 py-3.5 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    Back
                  </button>
                  <button
                    @click="verifyResetCode"
                    :disabled="loading || verificationCode.join('').length !== 6"
                    class="flex-1 rounded-2xl bg-linear-to-r from-[#073b4c] via-[#0f766e] to-[#0ea5a6] py-3.5 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                  >
                    <span v-if="loading" class="flex items-center justify-center">
                      <svg class="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                    <span v-else>Verify Code</span>
                  </button>
                </div>

                <div class="border-t border-slate-100 pt-4 text-center dark:border-slate-800">
                  <button
                    @click="resendCode"
                    :disabled="resendCooldown > 0"
                    class="inline-flex items-center text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-900 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-cyan-400 dark:hover:text-cyan-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {{ resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code' }}
                  </button>
                </div>
              </div>

              <div v-else class="space-y-6">
                <div class="text-center">
                  <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-cyan-50 to-teal-100 text-cyan-700 shadow-sm dark:from-cyan-950/30 dark:to-teal-900/30 dark:text-cyan-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <p class="text-slate-600 dark:text-slate-400">
                    Create a strong, secure password for your account.
                  </p>
                </div>

                <div>
                  <label for="newPassword" class="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    New Password
                  </label>
                  <div class="relative">
                    <input
                      :type="showNewPassword ? 'text' : 'password'"
                      id="newPassword"
                      v-model="formData.new_password"
                      placeholder="Enter new password"
                      required
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 pr-12 text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.new_password }"
                    />
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <button type="button" @click="showNewPassword = !showNewPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400">
                      <svg v-if="showNewPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3l18 18" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="errors.new_password" class="mt-2 text-sm text-red-500">{{ errors.new_password }}</p>
                </div>

                <div>
                  <label for="confirmPassword" class="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <div class="relative">
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      id="confirmPassword"
                      v-model="formData.confirm_password"
                      placeholder="Confirm new password"
                      required
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 pr-12 text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.confirm_password }"
                    />
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400">
                      <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.124-2.384A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.284 2.419M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3l18 18" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="errors.confirm_password" class="mt-2 text-sm text-red-500">{{ errors.confirm_password }}</p>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row">
                  <button
                    @click="currentStep = 1"
                    class="flex-1 rounded-2xl border-2 border-slate-200 py-3.5 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    Back
                  </button>
                  <button
                    @click="resetPassword"
                    :disabled="loading"
                    class="flex-1 rounded-2xl bg-linear-to-r from-[#073b4c] via-[#0f766e] to-[#0ea5a6] py-3.5 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <span v-if="loading" class="flex items-center justify-center">
                      <svg class="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        </div>

        <div class="mt-6 text-center md:mt-8">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Need help?
            <router-link to="/contact" class="font-medium text-cyan-700 transition-colors hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-300">
              Contact support
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/axios.js'

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
    const { data } = await api.post('/api/auth/forgot-password', {
      email: formData.value.email,
    })

    if (data?.message) {
      showMessage(data.message, 'success')
      currentStep.value = 1
      startCountdown()
      
      // Auto-focus first code input
      nextTick(() => {
        codeInputs.value[0]?.focus()
      })
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.error || 'Failed to send reset code. Please try again.'
    showMessage(errorMessage, 'error')
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
    const { data } = await api.post('/api/auth/verify-reset-code', {
      email: formData.value.email,
      code,
    })

    if (data?.message) {
      showMessage(data.message, 'success')
      currentStep.value = 2
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.error || 'Failed to verify code. Please try again.'
    showMessage(errorMessage, 'error')
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
    await api.post('/api/auth/reset-password', {
      email: formData.value.email,
      new_password: formData.value.new_password,
      confirm_password: formData.value.confirm_password,
    })

    showMessage('Password reset successfully! Redirecting to login...', 'success')
    
    // Redirect to login after successful reset
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    const errorMessage = error?.response?.data?.error || 'Failed to reset password. Please try again.'
    showMessage(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  if (resendCooldown.value > 0) return
  
  loading.value = true
  
  try {
    const { data } = await api.post('/api/auth/forgot-password', {
      email: formData.value.email,
    })

    if (data?.message) {
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
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.error || 'Failed to resend code. Please try again.'
    showMessage(errorMessage, 'error')
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