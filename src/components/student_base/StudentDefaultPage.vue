<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white">
    <StudentNav />
    <div class="pt-5">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import StudentNav from './StudentNav.vue';
</script>
