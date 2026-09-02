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
            {{ course?.title || 'Course' }}
          </h1>
          <p
            class="mt-4 text-sm sm:text-base transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
          >
            You are not enrolled in this course. Enroll now to access all the cheatsheets and learning materials.
          </p>
          
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
      <template v-else>
        <!-- Search Bar -->
        <div v-if="showSearch" class="mb-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="w-full rounded-xl border-2 bg-white px-10 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors duration-200"
              :class="isDarkMode ? 'border-slate-600 bg-slate-700 text-white placeholder-gray-400' : 'border-gray-300'"
              placeholder="Search in this course... (e.g., 'CNN', 'LSTM', 'backpropagation')"
              @keydown.enter="performSearch"
              @input="performSearch"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Search Results -->
          <div v-if="searchQuery && searchResults.length > 0" class="mt-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            Found <span class="font-semibold">{{ searchResults.length }}</span> result{{ searchResults.length > 1 ? 's' : '' }} for "<span class="font-semibold">{{ searchQuery }}</span>"
            <button @click="clearSearch" class="ml-2 text-indigo-500 hover:text-indigo-700 font-medium">Clear</button>
          </div>
          <div v-if="searchQuery && searchResults.length === 0" class="mt-2 text-sm text-amber-500">
            No results found for "<span class="font-semibold">{{ searchQuery }}</span>"
          </div>

          <!-- Search Results List -->
          <div v-if="searchResults.length > 0" class="mt-3 bg-white dark:bg-slate-700 rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 overflow-hidden max-h-64 overflow-y-auto">
            <div
              v-for="(result, index) in searchResults"
              :key="index"
              @click="scrollToResult(result)"
              class="px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer border-b border-gray-100 dark:border-slate-600 last:border-0 transition-colors"
            >
              <div class="flex items-start gap-2">
                <span class="text-indigo-500 mt-0.5">
                  <svg v-if="result.type === 'topic'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    {{ result.title }}
                  </p>
                  <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
                    {{ result.preview }}
                  </p>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full" :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-gray-100 text-gray-600'">
                  {{ result.type }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Toggle -->
        <div class="flex justify-end mb-3">
          <button
            @click="toggleSearch"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200"
            :class="[
              showSearch 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : isDarkMode 
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            {{ showSearch ? 'Hide Search' : 'Search Course' }}
            <span class="text-xs opacity-75">(Ctrl+K)</span>
          </button>
        </div>

        <!-- Content -->
        <Suspense>
          <component
            :is="CurrentComponent"
            :key="`${course?.slug || 'course'}-${week}-${componentKey}`"
            :is-dark-mode="isDarkMode"
            :week="week"
            :highlight-term="searchQuery"
            @topic-updated="updateTopics"
          />

          <template #fallback>
            <div class="flex h-96 items-center justify-center">
              <div class="text-center">
                <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                <p class="transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-500'">
                  Loading Week {{ week }}...
                </p>
              </div>
            </div>
          </template>
        </Suspense>
      </template>
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
  onMounted,
  onBeforeUnmount,
} from "vue";
import { getEnrollmentRoute } from '@/utils/auth';

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
const searchQuery = ref('');
const showSearch = ref(false);
const searchResults = ref([]);
const searchInput = ref(null);

// Handle enrollment
const handleEnroll = () => {
  if (!props.course) return;
  const route = getEnrollmentRoute(props.course.id);
  if (route) {
    window.location.href = route;
  } else {
    emit('enroll');
  }
};

// Update topics when component loads
const updateTopics = (topics) => {
  currentTopics.value = topics || [];
  emit('topics-updated', topics);
};

// Force reload component
const forceReload = async () => {
  componentKey.value += 1;
  await nextTick();
};

// ============================================================
// SEARCH FUNCTIONALITY
// ============================================================

const performSearch = () => {
  const query = searchQuery.value?.trim() || '';
  
  if (!query) {
    searchResults.value = [];
    clearHighlights();
    return;
  }

  const results = [];

  // Search through topics
  currentTopics.value.forEach(topic => {
    if (topic?.title?.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        type: 'topic',
        title: topic.title,
        id: topic.id,
        preview: topic.title
      });
    }
  });

  // Also search in the content via DOM
  const container = document.querySelector('.cheatsheet-container, .crucks-container, [class*="container"]');
  if (container) {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.tagName === 'SCRIPT') return NodeFilter.FILTER_REJECT;
          if (parent.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
          if (parent.closest('pre') || parent.closest('code')) return NodeFilter.FILTER_REJECT;
          if (parent.closest('nav') || parent.closest('header') || parent.closest('footer')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    const textMatches = [];
    while (node = walker.nextNode()) {
      const text = node.textContent || '';
      if (text.toLowerCase().includes(query.toLowerCase()) && text.trim().length > 0) {
        // Find section heading
        const section = node.parentElement?.closest?.('section') || node.parentElement?.closest?.('.section');
        const heading = section?.querySelector?.('h2, h3, h4');
        const sectionTitle = heading?.textContent?.trim() || 'Content';
        
        // Get preview context
        const fullText = node.parentElement?.textContent || '';
        const idx = fullText.toLowerCase().indexOf(query.toLowerCase());
        const start = Math.max(0, idx - 40);
        const end = Math.min(fullText.length, idx + query.length + 40);
        const preview = (start > 0 ? '...' : '') + fullText.substring(start, end) + (end < fullText.length ? '...' : '');

        textMatches.push({
          type: 'content',
          title: sectionTitle,
          preview: preview,
          element: node.parentElement
        });
      }
    }

    // Add text matches (limit to avoid duplicates)
    textMatches.slice(0, 10).forEach(m => results.push(m));
  }

  // Remove duplicates
  const seen = new Set();
  const uniqueResults = results.filter(r => {
    const key = r.title + r.preview;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  searchResults.value = uniqueResults.slice(0, 20);
  highlightMatches(query);
};

const clearHighlights = () => {
  document.querySelectorAll('.search-highlight').forEach(el => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    }
  });
};

const highlightMatches = (query) => {
  clearHighlights();
  if (!query?.trim()) return;

  const container = document.querySelector('.cheatsheet-container, .crucks-container, [class*="container"]');
  if (!container) return;

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.tagName === 'SCRIPT') return NodeFilter.FILTER_REJECT;
        if (parent.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (parent.closest('pre') || parent.closest('code')) return NodeFilter.FILTER_REJECT;
        if (parent.closest('.search-highlight')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const nodes = [];
  let node;
  while (node = walker.nextNode()) {
    const text = node.textContent || '';
    if (text.toLowerCase().includes(query.toLowerCase()) && text.trim().length > 0) {
      nodes.push(node);
    }
  }

  nodes.forEach(node => {
    const text = node.textContent || '';
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    const fragment = document.createDocumentFragment();
    
    parts.forEach(part => {
      if (part && part.toLowerCase() === query.toLowerCase()) {
        const mark = document.createElement('mark');
        mark.className = 'search-highlight bg-yellow-300 dark:bg-yellow-500 text-gray-900 px-0.5 rounded';
        mark.textContent = part;
        fragment.appendChild(mark);
      } else if (part) {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    
    node.parentNode?.replaceChild(fragment, node);
  });
};

const clearSearch = () => {
  searchQuery.value = '';
  searchResults.value = [];
  clearHighlights();
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  } else {
    clearSearch();
  }
};

const scrollToResult = (result) => {
  if (result.type === 'topic' && result.id) {
    const element = document.getElementById(result.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.classList.add('ring-4', 'ring-indigo-400', 'ring-offset-2', 'rounded-lg');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-indigo-400', 'ring-offset-2', 'rounded-lg');
      }, 3000);
      clearSearch();
      showSearch.value = false;
    }
  } else if (result.element) {
    const element = result.element.closest('section') || result.element.parentElement;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-indigo-400', 'ring-offset-2', 'rounded-lg');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-indigo-400', 'ring-offset-2', 'rounded-lg');
      }, 3000);
      clearSearch();
      showSearch.value = false;
    }
  }
};

// Keyboard shortcuts
const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    toggleSearch();
  }
  if (e.key === 'Escape' && showSearch.value) {
    clearSearch();
    showSearch.value = false;
  }
};

// ============================================================
// COMPONENT LOADING
// ============================================================

const CurrentComponent = computed(() => {
  if (!props.course) return null;

  const slug = props.course.slug;
  const weekNumber = props.week;

  currentTopics.value = [];

  return defineAsyncComponent({
    loader: () =>
      import(`./Courses/${slug}/Week-${weekNumber}.vue`)
        .then((module) => {
          // Ensure module has default export
          return module.default || module;
        })
        .catch((error) => {
          console.warn(`Week ${weekNumber} component not found for ${slug}:`, error);
          return {
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
            props: ['isDarkMode', 'week', 'highlightTerm']
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
    delay: 200,
  });
});

// Watch for week changes
watch(
  () => props.week,
  () => {
    currentTopics.value = [];
    clearSearch();
    forceReload();
  }
);

// Watch for course changes
watch(
  () => props.course?.slug,
  () => {
    currentTopics.value = [];
    clearSearch();
    forceReload();
  }
);

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
/* Ensure content is visible */
.cheatsheet-container,
.crucks-container,
[class*="container"] {
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
}

/* Search highlight styling */
.search-highlight {
  background-color: #fbbf24 !important;
  color: #1a1a2e !important;
  padding: 0 2px;
  border-radius: 2px;
}

.dark .search-highlight {
  background-color: #eab308 !important;
  color: #0f172a !important;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Search results scroll */
.max-h-64 {
  max-height: 16rem;
}

/* Smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Ensure dark mode text visibility */
.dark .text-slate-300 {
  color: #cbd5e1;
}

.dark .text-slate-400 {
  color: #94a3b8;
}

.dark .text-slate-600 {
  color: #475569;
}

.dark .text-white {
  color: #ffffff;
}

.dark .bg-slate-700 {
  background-color: #334155;
}

.dark .bg-slate-800 {
  background-color: #1e293b;
}
</style>