<template>
  <div>
    <StudentDashboard />
    
    <!-- Dashboard Popups -->
    <WelcomePopup />
  </div>
</template>

<script setup>
import StudentDashboard from '../../composable/students_comp/StudentDashboard.vue';
import WelcomePopup from '../../components/cardPopUp/WelcomePopup.vue';
</script>

<style scoped>
/* Page-specific styles */
</style>