<template>
  <router-view />
  <!-- <GlobalLoader /> -->
  <GlobalChatbot />
</template>

<script setup>
import { onMounted } from 'vue'

// import GlobalChatbot from './components/base/GlobalChatbot.vue'
import GlobalLoader from './components/base/GlobalLoader.vue'

import { getAuth, startHeartbeat } from './utils/auth.js'

onMounted(() => {
    const { token } = getAuth()

    if (token) {
        startHeartbeat()
    }
})
</script>

<style>
/* Global styles (if needed) */
</style>