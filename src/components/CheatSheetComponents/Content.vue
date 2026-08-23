<template>
  <main
    class="flex-1 overflow-y-auto transition-colors duration-300 min-h-[calc(100vh-64px)]"
    :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'"
  >
    <div class="mx-auto max-w-5xl p-3 sm:p-6 lg:p-8">
      <!-- Loading State -->
      <div v-if="checkingEnrollment || isLoading" class="flex h-96 items-center justify-center">
        <div class="text-center">
          <div
            class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"
          ></div>
          <p
            class="transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-500'"
          >
            {{ checkingEnrollment ? 'Checking enrollment...' : 'Loading content...' }}
          </p>
        </div>
      </div>

      <!-- Not Enrolled -->
      <div
        v-else-if="!enrolled"
        class="rounded-3xl p-6 sm:p-10 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <div class="text-center max-w-2xl mx-auto">
          <div class="text-6xl mb-4">🔒</div>
          <h1
            class="text-2xl sm:text-3xl font-bold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            {{ course.title }}
          </h1>
          <p
            class="mt-4 text-sm sm:text-base transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
          >
            You are not enrolled in this course. Enroll now to access all the cheatsheets and learning materials.
          </p>
          
          <!-- Enrollment Options -->
          <div class="mt-6 space-y-3">
            <button
              @click="handleEnroll"
              class="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 sm:px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Enroll Now
            </button>
            
            
          </div>
        </div>
      </div>

      <!-- Course Content -->
      <Suspense v-else>
        <component
          :is="CurrentComponent"
          :key="`${course?.slug || 'course'}-${week}`"
          :is-dark-mode="isDarkMode"
          :week="week"
          @topic-updated="updateTopics"
        />

        <template #fallback>
          <div class="flex h-96 items-center justify-center">
            <div class="text-center">
              <div
                class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"
              ></div>
              <p
                class="transition-colors duration-300"
                :class="isDarkMode ? 'text-slate-300' : 'text-slate-500'"
              >
                Loading Week {{ week }}...
              </p>
            </div>
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import {
  computed,
  defineAsyncComponent,
  ref,
  watch,
  nextTick,
} from "vue";
import { getAuth, getEnrollmentRoute } from '@/utils/auth';

const props = defineProps({
  course: Object,
  week: Number,
  enrolled: Boolean,
  isDarkMode: Boolean,
  checkingEnrollment: Boolean,
  isLoading: Boolean,
});

const emit = defineEmits(['topics-updated', 'enroll']);

// Store topics from the loaded component
const currentTopics = ref([]);
const componentKey = ref(0);

// Handle enrollment - redirect to enrollment page
const handleEnroll = () => {
  if (!props.course) return;
  
  // Get the enrollment route with authentication check
  const route = getEnrollmentRoute(props.course.id);
  
  // Navigate to the route
  if (route) {
    window.location.href = route;
  } else {
    // Fallback: emit event to parent
    emit('enroll');
  }
};

// Update topics when component loads
const updateTopics = (topics) => {
  currentTopics.value = topics;
  emit('topics-updated', topics);
};

// Force reload component
const forceReload = async () => {
  componentKey.value += 1;
  await nextTick();
};

/*
|--------------------------------------------------------------------------
| Load Current Week Component
|--------------------------------------------------------------------------
*/

const CurrentComponent = computed(() => {
  if (!props.course) return null;

  const slug = props.course.slug;
  const weekNumber = props.week;

  // Clear topics when week changes
  currentTopics.value = [];

  return defineAsyncComponent({
    loader: () =>
      import(`./Courses/${slug}/Week-${weekNumber}.vue`)
        .then((module) => {
          // Successfully loaded
          return module;
        })
        .catch((error) => {
          console.warn(`Week ${weekNumber} component not found for ${slug}:`, error);
          // Return a fallback component if the week doesn't exist
          return {
            default: {
              name: 'FallbackComponent',
              template: `
                <div class="rounded-xl p-6 sm:p-10 text-center transition-colors duration-300" 
                     :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
                  <div class="text-6xl mb-4">🚧</div>
                  <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300"
                      :class="isDarkMode ? 'text-white' : 'text-slate-800'">
                    Coming Soon
                  </h2>
                  <p class="mt-3 text-sm sm:text-base transition-colors duration-300"
                     :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                    Week {{ week }} content is being prepared. Check back later!
                  </p>
                </div>
              `,
              props: ['isDarkMode', 'week']
            }
          };
        }),

    loadingComponent: {
      template: `
        <div class="flex justify-center items-center h-80">
          <div class="text-center">
            <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            <p class="text-slate-500">Loading content...</p>
          </div>
        </div>
      `,
    },

    delay: 100,
  });
});

// Watch for week changes to reload component
watch(
  () => props.week,
  (newWeek, oldWeek) => {
    if (newWeek !== oldWeek) {
      // Clear topics
      currentTopics.value = [];
      // Force component reload
      forceReload();
    }
  }
);

// Watch for course changes
watch(
  () => props.course?.slug,
  () => {
    currentTopics.value = [];
    forceReload();
  }
);
</script>