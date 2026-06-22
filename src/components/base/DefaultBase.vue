<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
    <Nav />
    <div class="pt-20">
      <router-view />
    </div>
    <GoogleLoginDialog />
  </div>
</template>

<script setup>
import Nav from "../base/Nav.vue"
import GoogleLoginDialog from "../base/GoogleLoginDialog.vue"
</script>
