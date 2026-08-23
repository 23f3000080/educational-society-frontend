<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] py-8 px-4 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]">
    <div class="mx-auto max-w-7xl">
      <!-- Header Section -->
      <div class="mb-8 text-center">
        <div class="inline-block rounded-full bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-white shadow-lg">
          <span class="flex items-center gap-2 text-sm font-bold">
            <i class="fab fa-youtube text-xl"></i>
            YouTube Learning Hub
          </span>
        </div>
        <h1 class="mt-4 text-3xl font-black text-slate-800 sm:text-4xl dark:text-slate-100">
          Educational Playlists
        </h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Curated video courses to enhance your learning journey
        </p>
      </div>

      <!-- Search & Filter Section -->
      <div class="mb-8 rounded-2xl border border-slate-200/60 bg-white/80 p-4 shadow-xl backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80">
        <div class="grid gap-3 md:grid-cols-12">
          <div class="relative md:col-span-5">
            <i class="fas fa-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search playlists or topics..."
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-slate-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-300/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div class="md:col-span-3">
            <select
              v-model="categoryFilter"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-300/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="all">All Categories</option>
              <option value="programming">Programming</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="languages">Languages</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <select
              v-model="sortBy"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-300/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="videos">Most Videos</option>
            </select>
          </div>

          <button
            @click="resetFilters"
            class="md:col-span-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-red-600 hover:to-red-700 shadow-md"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p class="text-sm font-medium text-slate-600 dark:text-slate-300">
          Showing <span class="font-bold text-red-600 dark:text-red-400">{{ filteredPlaylists.length }}</span> of {{ playlists.length }} playlists
        </p>
        <div class="flex gap-2">
          <button
            @click="viewMode = 'grid'" title="Grid View"
            class="rounded-lg p-2 transition"
            :class="viewMode === 'grid' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'"
          >
            <i class="fas fa-th text-lg"></i>
          </button>
          <button
            @click="viewMode = 'list'" title="List View"
            class="rounded-lg p-2 transition"
            :class="viewMode === 'list' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'"
          >
            <i class="fas fa-list text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Playlists Grid -->
      <div v-if="filteredPlaylists.length" class="grid gap-6" :class="viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'">
        <div
          v-for="(playlist, index) in filteredPlaylists"
          :key="index"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          :class="viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''"
        >
          <!-- Thumbnail -->
          <div class="relative" :class="viewMode === 'list' ? 'sm:w-80 flex-shrink-0' : ''">
            <img
              :src="playlist.thumbnail"
              :alt="playlist.title"
              class="w-full object-cover"
              :class="viewMode === 'list' ? 'h-48 sm:h-full' : 'h-48'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <!-- Play Button Overlay -->
            <a :href="playlist.url" target="_blank">
              <div class="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
              <div class="rounded-full bg-red-600/90 p-4 shadow-2xl backdrop-blur-sm transition-transform group-hover:scale-110">
                <i class="fas fa-play text-2xl text-white"></i>
              </div>
            </div>
            </a>

            <!-- Video Count Badge -->
            <div v-if="playlist.videoCount" class="absolute bottom-3 right-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
              <i class="fas fa-video mr-1"></i> {{ playlist.videoCount }} videos
            </div>

            <!-- Category Badge -->
            <div class="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              {{ playlist.category }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-5" :class="viewMode === 'list' ? 'sm:p-6' : ''">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2">
                {{ playlist.title }}
              </h3>
              
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {{ playlist.description }}
              </p>

              <!-- Channel & Stats -->
              <div class="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span class="flex items-center gap-1">
                  <i class="fas fa-user-circle text-red-500"></i>
                  {{ playlist.channel }}
                </span>
                <span v-if="playlist.views" class="flex items-center gap-1">
                  <i class="fas fa-eye"></i>
                  {{ formatNumber(playlist.views) }}
                </span>
                <span v-if="playlist.duration" class="flex items-center gap-1">
                  <i class="fas fa-clock"></i>
                  {{ playlist.duration }}
                </span>
              </div>

              <!-- Tags -->
              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in playlist.tags.slice(0, 3)"
                  :key="tag"
                  class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  #{{ tag }}
                </span>
                <span v-if="playlist.tags.length > 3" class="text-xs text-slate-400 dark:text-slate-500">
                  +{{ playlist.tags.length - 3 }} more
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-4 flex gap-2">
              <a
                :href="playlist.url"
                target="_blank"
                class="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:from-red-600 hover:to-red-700 shadow-md"
              >
                <i class="fab fa-youtube mr-1.5"></i> Watch Playlist
              </a>
              <button
                @click="toggleSave(index)"
                class="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <i class="far fa-bookmark" :class="playlist.saved ? 'fas text-red-500' : ''"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="rounded-2xl border border-slate-200 bg-white/80 p-12 text-center shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div class="text-6xl mb-4">🎥</div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">No playlists found</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Try adjusting your search or filters</p>
      </div>

      <!-- Quote -->
      <div class="mt-10 text-center">
        <div class="mx-auto max-w-2xl rounded-2xl border border-slate-200/50 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/50">
          <p class="text-sm italic text-slate-600 dark:text-slate-300">
            "Education is the most powerful weapon which you can use to change the world." — Nelson Mandela
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'YouTubePage',
  data() {
    return {
      searchQuery: '',
      categoryFilter: 'all',
      sortBy: 'newest',
      viewMode: 'grid',
      playlists: [
        {
          title: 'Web Development Bootcamp 2026',
          description: 'Learn HTML, CSS, JavaScript, flask, jinja & SQL to become a full-stack developer.',
          thumbnail: '/Webdev Img.png',
          channel: 'Education Society',
          views: null,
          duration: null,
          videoCount: null,
          category: 'Programming',
          tags: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Jinja', 'SQL'],
          url: 'https://youtube.com/playlist?list=PLLWQ1dPhMEeI&si=Yen_N3FLVikaq30g',
          saved: false,
        },
        // {
        //   title: 'Mathematics for Machine Learning',
        //   description: 'Linear algebra, calculus, and probability essential for understanding ML algorithms.',
        //   thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=400&fit=crop&crop=center',
        //   channel: '3Blue1Brown',
        //   views: 1800000,
        //   duration: '8 hours',
        //   videoCount: 42,
        //   category: 'Mathematics',
        //   tags: ['mathematics', 'machine learning', 'linear algebra'],
        //   url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
        //   saved: false,
        // },
        // {
        //   title: 'Web Development Bootcamp 2024',
        //   description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB to become a full-stack developer.',
        //   thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop&crop=center',
        //   channel: 'freeCodeCamp',
        //   views: 3200000,
        //   duration: '20 hours',
        //   videoCount: 120,
        //   category: 'Programming',
        //   tags: ['web', 'javascript', 'react', 'fullstack'],
        //   url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbmGw5fN5BQlwuug-8bDmabi',
        //   saved: false,
        // },
        // {
        //   title: 'Physics for Beginners',
        //   description: 'Understanding the fundamental laws of physics with visual explanations and animations.',
        //   thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&h=400&fit=crop&crop=center',
        //   channel: 'Khan Academy',
        //   views: 890000,
        //   duration: '6 hours',
        //   videoCount: 35,
        //   category: 'Science',
        //   tags: ['physics', 'science', 'mechanics', 'energy'],
        //   url: 'https://www.youtube.com/playlist?list=PLSQl0a2vh4HCrq1eYcbZ6rB_fW4H15pP2',
        //   saved: false,
        // },
        // {
        //   title: 'Learn Spanish Fast',
        //   description: 'Complete Spanish course from beginner to conversational fluency with native speakers.',
        //   thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&crop=center',
        //   channel: 'Butterfly Spanish',
        //   views: 1500000,
        //   duration: '10 hours',
        //   videoCount: 65,
        //   category: 'Languages',
        //   tags: ['spanish', 'language', 'learning', 'conversation'],
        //   url: 'https://www.youtube.com/playlist?list=PL1ekvD8xjIkZsjV6-w9hH7PmXQxTKfVkC',
        //   saved: false,
        // },
        // {
        //   title: 'Business & Entrepreneurship',
        //   description: 'Learn business strategy, marketing, finance, and leadership from top entrepreneurs.',
        //   thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop&crop=center',
        //   channel: 'TEDx Talks',
        //   views: 2100000,
        //   duration: '15 hours',
        //   videoCount: 95,
        //   category: 'Business',
        //   tags: ['business', 'entrepreneurship', 'leadership', 'marketing'],
        //   url: 'https://www.youtube.com/playlist?list=PLkKtmq3V-7B-7h8v3jg6p3zLHVvMYdMjy',
        //   saved: false,
        // },
        // {
        //   title: 'Data Science & Analytics',
        //   description: 'Master data science with Python, pandas, numpy, matplotlib, and machine learning.',
        //   thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
        //   channel: 'Data School',
        //   views: 1200000,
        //   duration: '14 hours',
        //   videoCount: 78,
        //   category: 'Programming',
        //   tags: ['data science', 'python', 'analytics', 'pandas'],
        //   url: 'https://www.youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y',
        //   saved: false,
        // },
        // {
        //   title: 'Organic Chemistry Mastery',
        //   description: 'Comprehensive organic chemistry course covering reactions, mechanisms, and synthesis.',
        //   thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop&crop=center',
        //   channel: 'The Organic Chemistry Tutor',
        //   views: 750000,
        //   duration: '18 hours',
        //   videoCount: 110,
        //   category: 'Science',
        //   tags: ['chemistry', 'organic', 'reactions', 'synthesis'],
        //   url: 'https://www.youtube.com/playlist?list=PL0o_zxa4K1BV9DFWH0kxGSbCk_G_hbX9l',
        //   saved: false,
        // },
      ],
    };
  },
  computed: {
    filteredPlaylists() {
      let result = this.playlists;

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (playlist) =>
            playlist.title.toLowerCase().includes(query) ||
            playlist.description.toLowerCase().includes(query) ||
            playlist.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      // Category filter
      if (this.categoryFilter !== 'all') {
        result = result.filter(
          (playlist) => playlist.category.toLowerCase() === this.categoryFilter.toLowerCase()
        );
      }

      // Sorting
      if (this.sortBy === 'popular') {
        result = [...result].sort((a, b) => b.views - a.views);
      } else if (this.sortBy === 'videos') {
        result = [...result].sort((a, b) => b.videoCount - a.videoCount);
      } else if (this.sortBy === 'newest') {
        // For demo, reverse the array
        result = [...result].reverse();
      }

      return result;
    },
  },
  methods: {
    resetFilters() {
      this.searchQuery = '';
      this.categoryFilter = 'all';
      this.sortBy = 'newest';
    },
    toggleSave(index) {
      const actualIndex = this.playlists.indexOf(this.filteredPlaylists[index]);
      if (actualIndex !== -1) {
        this.playlists[actualIndex].saved = !this.playlists[actualIndex].saved;
      }
    },
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    },
  },
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth hover transitions */
.group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #ef4444;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}
</style>