<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white">
    <AdminNav />
    <div class="pt-5">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AdminNav from './AdminNav.vue';
</script>
