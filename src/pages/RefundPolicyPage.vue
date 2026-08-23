<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-500 via-gray-200 to-purple-600 text-slate-900 dark:bg-gradient-to-tr dark:from-blue-500 dark:via-slate-900 dark:to-purple-600 dark:text-white py-12 text-center shadow-lg">
      <h1 class="text-4xl font-bold">Refund Policy</h1>
      <p class="mt-2 text-lg">Clear, Transparent, and Student-Friendly</p>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <!-- Introduction -->
      <section class="text-center">
        <p class="text-lg leading-relaxed">
          At <span class="font-semibold">Educational Society</span>, we value our learners and aim to provide the best quality education. 
          However, if you are not fully satisfied with a course, we have a transparent refund policy to help you.
        </p>
      </section>

      <!-- Policy Points -->
      <section class="grid md:grid-cols-2 gap-8">
        <!-- 1 -->
        <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-105 transition-transform">
          <div class="flex items-center space-x-4 mb-4">
            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold">Eligibility</h2>
          </div>
          <p>
            Refunds are eligible within <span class="font-semibold">7 days of purchase</span>, 
            provided you have not completed more than 20% of the course.
          </p>
        </div>

        <!-- 2 -->
        <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-105 transition-transform">
          <div class="flex items-center space-x-4 mb-4">
            <div class="p-3 rounded-full bg-green-100 dark:bg-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold">Refund Process</h2>
          </div>
          <p>
            To request a refund, email us at 
            <a href="mailto:support.educationalsociety@gmail.com" class="text-blue-500 underline">support.educationalsociety@gmail.com</a>.  
            Refunds are processed within <span class="font-semibold">5–7 business days</span>.
          </p>
        </div>

        <!-- 3 -->
        <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-105 transition-transform">
          <div class="flex items-center space-x-4 mb-4">
            <div class="p-3 rounded-full bg-red-100 dark:bg-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-600 dark:text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold">Non-Refundable Cases</h2>
          </div>

          <p>Refunds are not applicable if:</p>

          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>You have completed more than 20% of the course.</li>
            <li>The refund request is made after 7 days.</li>
            <li>The course was purchased during a special discount or bundle offer.</li>
          </ul>
        </div>


        <!-- 4 -->
        <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-105 transition-transform">
          <div class="flex items-center space-x-4 mb-4">
            <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold">Support</h2>
          </div>
          <p>
            We are always here to help you.  
            Contact our support team anytime for clarifications or assistance.
          </p>
        </div>
      </section>

      <!-- Closing Note -->
      <section class="text-center mt-12">
        <p class="italic text-gray-600 dark:text-gray-400">
          By enrolling in our courses, you agree to abide by this refund policy.  
          Thank you for trusting <span class="font-semibold">Educational Society</span>.
        </p>
      </section>
    </main>
    <Footer/>
  </div>
  
</template>

<script setup>
import Footer from '../components/base/Footer.vue'
</script>

<style>
</style>
