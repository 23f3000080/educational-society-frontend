<template>
  <footer class="bg-[#0f061f] text-gray-200">
    <div class="max-w-7xl mx-auto px-6 py-12 space-y-10">

      <!-- Top Sections (About, Quick Links, Learn, Legal) -->
      <div class="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-8">
        <!-- About -->
        <div class="col-span-2 sm:col-span-1">
          <img src="../../assets/images/ES Logo New.jpg" alt="Educational Society Logo"
            class="w-20 h-20 rounded-2xl mb-4" />
          <h2 class="text-xl font-bold text-amber-400 hover:text-[#14d94f] mb-3">
            Educational Society
          </h2>
          <p class="text-sm text-gray-400 leading-relaxed">
            Empowering students with quality education and skills for a brighter future.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h2 class="text-lg font-semibold text-amber-300 mb-4">Quick Links</h2>
          <ul class="space-y-2 text-sm">
            <li><router-link class="hover:text-yellow-500 transition" to="/">Home</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/about">About</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/courses">Courses</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/contact">Contact</router-link></li>
          </ul>
        </div>

        <!-- Learn -->
        <div>
          <h2 class="text-lg font-semibold text-amber-300 mb-4">Learn</h2>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-green-500 transition">Courses</a></li>
            <li><a href="#" class="hover:text-green-500 transition">Notes</a></li>
            <li><a href="#" class="hover:text-green-500 transition">Videos</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h2 class="text-lg font-semibold text-amber-300 mb-4">Legal</h2>
          <ul class="space-y-2 text-sm">
            <li><router-link class="hover:text-green-500 transition" to="/terms">Terms & Conditions</router-link></li>
            <li><router-link class="hover:text-green-500 transition" to="/privacy">Privacy Policy</router-link></li>
            <li><router-link class="hover:text-green-500 transition" to="/refund">Refund Policy</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-span-2 lg:col-span-1">
          <h2 class="text-lg font-semibold text-amber-300 mb-4">Contact Us</h2>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>📍 Patna, Bihar, India</li>
            <li>📞 +91 9142125921</li>
            <li>✉️ clearupsol015@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>



    <!-- Bottom -->
    <div class="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm">
      <p class="text-gray-600 dark:text-gray-400">
        Made with <span class="text-red-500">❤️</span> by <span class="font-semibold">Educational Society</span>
      </p>
      <p class="text-gray-500 dark:text-gray-500 mt-1">
        © 2025 Educational Society. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped></style>
