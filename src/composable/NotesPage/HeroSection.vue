<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4">
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">📘 Study Notes</h1>
      <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">
        Download complete PDF notes or explore chapter-wise notes for each subject.
      </p>

      <!-- Search + Filter -->
      <div class="mt-8 grid gap-3 md:grid-cols-12 max-w-4xl mx-auto">
        <div class="md:col-span-7 relative">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search subject, keyword, or level..."
            class="w-full rounded-xl border border-blue-200 bg-white/90 pl-11 pr-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div class="md:col-span-3">
          <select
            v-model="selectedCategory"
            class="w-full rounded-xl border border-blue-200 bg-white/90 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All Categories</option>
            <option value="school">School</option>
            <option value="tech">Tech</option>
            <option value="language">Language</option>
          </select>
        </div>

        <button
          class="md:col-span-2 rounded-xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"
          @click="resetFilters"
        >
          Reset
        </button>
      </div>

      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Showing {{ filteredSubjects.length }} of {{ subjects.length }} subjects
      </p>
    </div>

    <!-- Cards Grid -->
    <div v-if="filteredSubjects.length" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Subject Card -->
      <div
        v-for="(subject, index) in filteredSubjects"
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center text-center"
      >
        <!-- Subject Logo -->
        <img
          :src="subject.logo"
          alt="logo"
          class="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-md mb-4"
        />

        <!-- Title -->
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {{ subject.name }}
        </h2>
        <span class="mb-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          {{ subject.category }}
        </span>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Access high-quality notes and chapter resources.
        </p>

        <!-- Buttons -->
        <div class="flex gap-3">
          <a
            :href="subject.pdfLink"
            target="_blank"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📄 PDF Notes
          </a>
          <a
            :href="subject.chapterwiseLink"
            target="_blank"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            📑 Chapterwise
          </a>
        </div>
      </div>
    </div>

    <div v-else class="max-w-2xl mx-auto rounded-2xl border border-blue-100 bg-white/80 p-10 text-center shadow-md">
      <h3 class="text-xl font-bold text-gray-800">No matching notes found</h3>
      <p class="mt-2 text-gray-600">Try another search term or choose a different category.</p>
      <button
        class="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-white font-semibold hover:bg-blue-700 transition"
        @click="resetFilters"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const searchQuery = ref("");
const selectedCategory = ref("all");

const subjects = [
  {
    name: "Mathematics",
    category: "school",
    logo: "https://img.icons8.com/color/96/000000/math.png",
    pdfLink: "#",
    chapterwiseLink: "#",
  },
  {
    name: "Science",
    category: "school",
    logo: "https://img.icons8.com/color/96/000000/microscope.png",
    pdfLink: "#",
    chapterwiseLink: "#",
  },
  {
    name: "English",
    category: "language",
    logo: "https://img.icons8.com/color/96/000000/book.png",
    pdfLink: "#",
    chapterwiseLink: "#",
  },
  {
    name: "Python",
    category: "tech",
    logo: "https://img.icons8.com/color/96/000000/python.png",
    pdfLink: "#",
    chapterwiseLink: "#",
  },
  {
    name: "Web Development",
    category: "tech",
    logo: "https://img.icons8.com/color/96/000000/source-code.png",
    pdfLink: "#",
    chapterwiseLink: "#",
  },
  {
    name: "Social Science",
    category: "school",
    logo: "https://img.icons8.com/color/96/000000/globe.png",
    pdfLink: "#",
    chapterwiseLink: "#",
  },
];

const filteredSubjects = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();

  return subjects.filter((subject) => {
    const matchesSearch = !search ||
      subject.name.toLowerCase().includes(search) ||
      subject.category.toLowerCase().includes(search);

    const matchesCategory = selectedCategory.value === "all" || subject.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
};
</script>

<style>
/* Optional: Smooth card hover animation */
</style>
