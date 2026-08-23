<template>
  <footer class="bg-[#0f061f] text-gray-200">
    <div class="max-w-7xl mx-auto px-6 py-12 space-y-10">

      <!-- Top Sections (About, Quick Links, Learn, Legal) -->
      <div class="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-8">
        <!-- About -->
        <div class="col-span-2 sm:col-span-1">
          <img src="/ES_ICON.png" alt="Educational Society Logo"
            class="w-22 h-22 rounded-2xl mb-0" />
          <h2 class="text-xl font-bold text-amber-400 hover:text-[#14d94f] mb-3">
            Educational Society
          </h2>
          <p class="text-sm text-gray-400 leading-relaxed">
            Empowering students with quality education and skills for a brighter future.
          </p>
          
          <!-- Social Media Buttons -->
          <div class="flex space-x-3 mt-4">
            <a href="https://www.facebook.com/share/1FzMrozcbm/" 
               target="_blank"
               rel="noopener noreferrer"
               class="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#1877f2] flex items-center justify-center transition-all duration-300 hover:scale-110">
              <i class="fab fa-facebook-f text-white"></i>
            </a>
            <!-- <a href="https://twitter.com/educationalsoc" 
               target="_blank"
               rel="noopener noreferrer"
               class="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#1da1f2] flex items-center justify-center transition-all duration-300 hover:scale-110">
              <i class="fab fa-twitter text-white"></i>
            </a> -->
            <a href="https://www.instagram.com/growwith_educational_society" 
               target="_blank"
               rel="noopener noreferrer"
               class="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#e4405f] flex items-center justify-center transition-all duration-300 hover:scale-110">
              <i class="fab fa-instagram text-white"></i>
            </a>
            <a href="https://www.youtube.com/@educational_society_class" 
               target="_blank"
               rel="noopener noreferrer"
               class="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#ff0000] flex items-center justify-center transition-all duration-300 hover:scale-110">
              <i class="fab fa-youtube text-white"></i>
            </a>
            <!-- telegram -->
            <a href="https://t.me/educational_society" 
               target="_blank"
               rel="noopener noreferrer"
               class="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#0088cc] flex items-center justify-center transition-all duration-300 hover:scale-110">
              <i class="fab fa-telegram-plane text-white"></i>
            </a>
            <!-- <a href="https://linkedin.com/company/educationalsociety" 
               target="_blank"
               rel="noopener noreferrer"
               class="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#0a66c2] flex items-center justify-center transition-all duration-300 hover:scale-110">
              <i class="fab fa-linkedin-in text-white"></i>
            </a> -->
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h2 class="text-lg font-semibold text-amber-300 mb-4">Quick Links</h2>
          <ul class="space-y-2 text-sm">
            <li><router-link class="hover:text-yellow-500 transition" to="/">Home</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/about">About</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/courses">Courses</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/contact">Contact</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/website-map">Website Map</router-link></li>
            <li><router-link class="hover:text-yellow-500 transition" to="/grade-calculator">Grade Calculator</router-link></li>
          </ul>
        </div>

        <!-- Learn -->
        <div>
          <h2 class="text-lg font-semibold text-amber-300 mb-4">Learn</h2>
          <ul class="space-y-2 text-sm">
            <li><a href="/courses" class="hover:text-green-500 transition">Courses</a></li>
            <li><a href="/resource/notes" class="hover:text-green-500 transition">Notes</a></li>
            <li><a href="/resource/youtube" class="hover:text-green-500 transition">Videos</a></li>
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
            <li><a href="tel:+919142125921" class="hover:text-yellow-600 transition"><i class="fas fa-phone mr-2"></i>+91 9142125921</a></li>
            <li><a href="mailto:support.educationalsociety@gmail.com" class="hover:text-yellow-600 transition"><i class="fas fa-envelope mr-2"></i>support.educationalsociety@gmail.com</a></li>
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
        © {{ currentYear }} Educational Society. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
// dynamic copyright year (optional)
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* No additional styles needed - using Tailwind classes */
</style>