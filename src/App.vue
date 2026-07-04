<template>
  <router-view />
  <GlobalLoader />
  <GlobalChatbot />
</template>

<script setup>
import GlobalChatbot from './components/base/GlobalChatbot.vue'
import GlobalLoader from './components/base/GlobalLoader.vue'
</script>

<style>
/* Global styles (if needed) */
</style>