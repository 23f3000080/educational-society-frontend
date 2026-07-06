<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-100'"
  >
    <!-- Navbar -->
    <Navbar
      :courses="courses"
      :selected-course="selectedCourse"
      :is-dark-mode="isDarkMode"
      :loading="loading"
      @select-course="changeCourse"
      @update:is-dark-mode="toggleDarkMode"
    />

    <!-- Main Layout -->
    <div class="flex relative">
      <!-- Left Sidebar -->
      <Sidebar
        v-if="selectedCourse"
        :course="selectedCourse"
        :selected-week="selectedWeek"
        :is-dark-mode="isDarkMode"
        @select-week="selectedWeek = $event"
        @scroll-to-topic="scrollToTopic"
      />

      <!-- Content Area -->
      <Content
        v-if="selectedCourse"
        class="flex-1 min-h-[calc(100vh-64px)]"
        :course="selectedCourse"
        :week="selectedWeek"
        :enrolled="isEnrolled"
        :is-dark-mode="isDarkMode"
        :checking-enrollment="checkingEnrollment"
        :is-loading="loadingContent"
        @topics-updated="handleTopicsUpdated"
        @enroll="handleEnroll"
      />

      <!-- Right Topics Bar -->
      <Topics
        v-if="selectedCourse && isEnrolled && currentTopics.length > 0"
        :topics="currentTopics"
        :is-dark-mode="isDarkMode"
        :is-visible="topicsVisible"
        @toggle="toggleTopics"
        @scroll-to="scrollToTopic"
      />

      <!-- No course selected -->
      <!-- <div
        v-else
        class="flex flex-1 items-center justify-center p-4 sm:p-10 min-h-[calc(100vh-64px)]"
      >
        <div class="text-center max-w-md">
          <div
            class="mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl text-white shadow-xl"
          >
            🚀
          </div>
          <h2
            class="text-2xl sm:text-3xl font-bold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-gray-700'"
          >
            Welcome 👋
          </h2>
          <p
            class="mt-3 text-sm sm:text-base transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'"
          >
            Select a course from the navbar to get started with your cheatsheets.
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import courseData from './courses.js';
import api from '../../services/axios.js';

import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Content from './Content.vue';
import Topics from './Topics.vue';

// State
const courses = ref([]);
const selectedCourse = ref(null);
const selectedWeek = ref(1);
const isEnrolled = ref(false);
const checkingEnrollment = ref(false);
const loadingContent = ref(false);
const loading = ref(false);

// Dark mode
const isDarkMode = ref(false);

// Topics
const currentTopics = ref([]);
const topicsVisible = ref(false);


// Get auth token
const getAuthToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

// Load courses
const loadCourses = async () => {
  loading.value = true;
  try {
    const token = getAuthToken();
    if (token) {
      const response = await api.get('/api/courses');
      // Merge API data with local data if needed
      courses.value = response.data.map((apiCourse, index) => ({
        ...apiCourse,
        ...courseData[index],
        id: apiCourse.id || courseData[index]?.id || index + 1,
        weeks: apiCourse.weeks || courseData[index]?.weeks || []
      }));
    } else {
      courses.value = courseData;
    }

    if (courses.value.length > 0) {
      // Select first course and set initial week
      const firstCourse = courses.value[0];
      selectedCourse.value = firstCourse;
      selectedWeek.value = firstCourse.weeks?.[0]?.number || 1;
      await checkEnrollment(firstCourse.id);
    }
  } catch (error) {
    console.error('Error loading courses:', error);
    courses.value = courseData;
    if (courses.value.length > 0) {
      const firstCourse = courses.value[0];
      selectedCourse.value = firstCourse;
      selectedWeek.value = firstCourse.weeks?.[0]?.number || 1;
    }
  } finally {
    loading.value = false;
  }
};

// Check enrollment
const checkEnrollment = async (courseId) => {
  checkingEnrollment.value = true;
  try {
    const token = getAuthToken();
    if (!token) {
      isEnrolled.value = false;
      return;
    }

    const response = await api.get(
      `/api/check-enrollment/${courseId}`
    );
    
    isEnrolled.value = response.data.enrolled;
  } catch (error) {
    console.error('Error checking enrollment:', error);
    isEnrolled.value = false;
  } finally {
    checkingEnrollment.value = false;
  }
};

// Change course
const changeCourse = async (course) => {
  selectedCourse.value = course;
  selectedWeek.value = course.weeks?.[0]?.number || 1;
  currentTopics.value = [];
  topicsVisible.value = false;
  
  await checkEnrollment(course.id);
};

// Handle enroll
const handleEnroll = () => {
  // You can redirect to enrollment page or open a modal
  // Example: window.location.href = `/courses/${selectedCourse.value.id}/enroll`;
  console.log('Enroll clicked for course:', selectedCourse.value.id);
};

// Handle topics updated from content
const handleTopicsUpdated = (topics) => {
  currentTopics.value = topics;
  if (topics.length > 0) {
    topicsVisible.value = true;
  }
};

// Toggle topics visibility
const toggleTopics = () => {
  topicsVisible.value = !topicsVisible.value;
};

// Scroll to topic
const scrollToTopic = (topicId) => {
  const element = document.getElementById(topicId);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Toggle dark mode
const toggleDarkMode = (darkMode) => {
  isDarkMode.value = darkMode;
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
};

// Load theme
const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
};

// Watch dark mode changes
watch(isDarkMode, (darkMode) => {
  document.documentElement.classList.toggle('dark', darkMode);
}, { immediate: true });

// Watch selected week to reset topics
watch(selectedWeek, () => {
  currentTopics.value = [];
  topicsVisible.value = false;
});

onMounted(() => {
  loadTheme();
  loadCourses();
});
</script>