<template>
  <router-view />
  <!-- <GlobalLoader /> -->
  <GlobalChatbot 
    v-if="showChatbot"
    @close="showChatbot = false" title="AI Assistant"/>
  
  <!-- Install Popup with advanced conditions -->
  <!-- <InstallPopup 
    v-if="shouldShowPopup"
    @close="handlePopupClose"
    @install="handleInstallSuccess"
  /> -->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router' // If using Vue Router
// import InstallPopup from './pages/AppInstall.vue'

import GlobalChatbot from './components/base/GlobalChatbot.vue'
import GlobalLoader from './components/base/GlobalLoader.vue'

import { getAuth, startHeartbeat } from './utils/auth.js'

const route = useRoute()
const showChatbot = ref(true)
const showInstallPopup = ref(false)


// Configuration
const POPUP_CONFIG = {
  delay: 3000, // Show after 3 seconds
  maxShows: 3, // Maximum times to show
  excludeRoutes: ['/login', '/register'], // Don't show on these routes
  includeRoutes: ['/', '/dashboard', '/courses'] // Only show on these routes (empty = all)
}

// Get popup data from localStorage
const getPopupData = () => {
  const data = localStorage.getItem('installPopupData')
  return data ? JSON.parse(data) : { seen: false, count: 0 }
}

// Update popup data
const updatePopupData = (data) => {
  localStorage.setItem('installPopupData', JSON.stringify(data))
}

// Check if popup should be shown
const shouldShowPopup = () => {
  const data = getPopupData()
  const currentRoute = route.path
  
  // Don't show if:
  // 1. Already seen (or shown too many times)
  if (data.seen || data.count >= POPUP_CONFIG.maxShows) {
    return false
  }
  
  // 2. On excluded routes
  if (POPUP_CONFIG.excludeRoutes.includes(currentRoute)) {
    return false
  }
  
  // 3. If includeRoutes is specified and current route not in it
  if (POPUP_CONFIG.includeRoutes.length > 0 && 
      !POPUP_CONFIG.includeRoutes.includes(currentRoute)) {
    return false
  }
  
  return true
}

// Mark popup as seen (permanently)
const markPopupAsSeen = () => {
  const data = getPopupData()
  updatePopupData({ ...data, seen: true })
}

// Increment popup show count
const incrementPopupCount = () => {
  const data = getPopupData()
  updatePopupData({ ...data, count: data.count + 1 })
}

// Handle popup close
const handlePopupClose = () => {
  incrementPopupCount()
  showInstallPopup.value = false
}

// Handle successful installation
const handleInstallSuccess = () => {
  // When installed, mark as seen permanently
  markPopupAsSeen()
  showInstallPopup.value = false
  console.log('App installed successfully!')
}

// Check and show popup
const checkAndShowPopup = () => {
  if (shouldShowPopup()) {
    setTimeout(() => {
      showInstallPopup.value = true
    }, POPUP_CONFIG.delay)
  }
}

// Watch for route changes (if you want to show on specific pages)
watch(() => route.path, () => {
  // Only check if popup is not already shown
  if (!showInstallPopup.value) {
    checkAndShowPopup()
  }
})

onMounted(() => {
  const { token } = getAuth()

  if (token) {
    startHeartbeat()
  }

  // Initial check
  checkAndShowPopup()
})
</script>

<style>
/* Global styles (if needed) */
</style>