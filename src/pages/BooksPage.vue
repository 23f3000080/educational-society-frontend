<template>
  <div class="min-h-screen bg-linear-to-br from-[#fff7ed] via-[#eff6ff] to-[#e0f2fe] py-10 px-4 dark:from-[#081422] dark:via-[#0f1b2e] dark:to-[#15213a]">
    <div class="mx-auto max-w-7xl">
      <div class="rounded-3xl border border-indigo-200/60 bg-white/80 p-6 shadow-xl backdrop-blur-md sm:p-8 dark:border-indigo-300/20 dark:bg-slate-900/70">
        <div class="text-center">
          <h1 class="text-3xl font-black text-indigo-800 sm:text-4xl dark:text-indigo-200">Books Collection</h1>
          <p class="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-300">Download PDFs, discover recommendations, and filter by type.</p>
        </div>

        <!-- Search + Filters -->
        <div class="mt-6 grid gap-3 md:grid-cols-12">
          <div class="relative md:col-span-5">
            <i class="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search title or description..."
              class="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 pl-11 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div class="md:col-span-3">
            <select
              v-model="categoryFilter"
              class="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="all">All Categories</option>
              <option value="math">Mathematics</option>
              <option value="python">Python</option>
              <option value="web">Web Development</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <select
              v-model="availabilityFilter"
              class="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="all">All Access</option>
              <option value="pdf">PDF Available</option>
              <option value="buy">Buy Link</option>
              <option value="both">PDF + Buy</option>
            </select>
          </div>

          <button
            @click="resetFilters"
            class="md:col-span-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Reset
          </button>
        </div>

        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm font-medium text-slate-600 dark:text-slate-300">
            Showing {{ filteredBooks.length }} of {{ books.length }} books
          </p>
          <label class="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/70 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
            <input v-model="recommendedOnly" type="checkbox" class="accent-amber-500" />
            Recommended only
          </label>
        </div>
      </div>
    </div>

    <!-- Books Grid -->
    <div v-if="filteredBooks.length" class="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Example Book Card -->
      <div
        v-for="(book, index) in filteredBooks"
        :key="index"
        class="group relative flex flex-col rounded-2xl border border-indigo-100 bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <!-- Book Image with Recommended Badge -->
        <div class="relative">
          <img
            :src="book.image"
            :alt="book.title"
            class="mb-4 h-48 w-full rounded-lg object-cover"
          />
          <div
            v-if="book.recommended"
            class="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-full shadow-md"
          >
            ⭐ Recommended
          </div>
        </div>

        <!-- Book Info -->
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{{ book.title }}</h2>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">{{ book.description }}</p>
        <span class="mb-4 inline-flex w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
          {{ detectCategory(book) }}
        </span>

        <!-- Buttons -->
        <div class="mt-auto flex justify-between gap-3">
          <!-- Show PDF button only if available -->
          <a
            v-if="book.pdf"
            :href="book.pdf"
            target="_blank"
            class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg text-sm text-center font-medium transition"
          >
            📘 Download PDF
          </a>

          <!-- Buy Button -->
          <a
            v-if="book.buy"
            :href="book.buy"
            target="_blank"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm text-center font-medium transition"
          >
            🛒 Buy
          </a>
        </div>
      </div>
    </div>
    <div v-else class="mx-auto mt-8 max-w-2xl rounded-2xl border border-indigo-200 bg-white p-10 text-center shadow-md dark:border-slate-700 dark:bg-slate-900">
      <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">No books found</h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different keyword or clear filters.</p>
    </div>

    <!-- Footer quote -->
    <div class="text-center mt-10">
      <p class="text-gray-600 dark:text-slate-300">
        "A room without books is like a body without a soul." - Marcus Tullius Cicero
      </p>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { computed, ref } from "vue";
import Footer from '../components/base/Footer.vue';

const searchQuery = ref("");
const categoryFilter = ref("all");
const availabilityFilter = ref("all");
const recommendedOnly = ref(false);

const books = [
  {
    title: "Mathematics for Class 10",
    description: "Comprehensive guide covering NCERT syllabus with solved examples.",
    pdf: "https://drive.google.com/file/d/1mRl3jx3AUz-eA4tYnj2ELIqDDvp9yTV3/view?usp=drive_link",
    buy: "https://amzn.in/d/6RkYR5b",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
    recommended: true,
  },
  {
    title: "Python for Beginners",
    description: "Learn Python programming from scratch with projects.",
    pdf: "https://docs.google.com/document/d/1VbewdsOdkXEUQkAW2zKZmmRh7a2ZPpb1cHD7qOjRhx4/edit?tab=t.0",
    buy: "https://amzn.in/d/75gdf35",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHl0aG9ufGVufDB8fDB8fHww",
    recommended: true,
  },
  {
    title: "Web Development Essentials",
    description: "HTML, CSS, JavaScript & modern frameworks explained simply.",
    buy: "https://amzn.in/d/6SR2zxE",
    image: "https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
    recommended: false,
  },
  {
    title: "Mathematics for Class 10",
    description: "Comprehensive guide covering NCERT syllabus with solved examples.",
    pdf: "https://drive.google.com/file/d/1mRl3jx3AUz-eA4tYnj2ELIqDDvp9yTV3/view?usp=drive_link",
    buy: "https://amzn.in/d/6RkYR5b",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
    recommended: true,
  },
  {
    title: "Python for Beginners",
    description: "Learn Python programming from scratch with projects.",
    pdf: "https://docs.google.com/document/d/1VbewdsOdkXEUQkAW2zKZmmRh7a2ZPpb1cHD7qOjRhx4/edit?tab=t.0",
    buy: "https://amzn.in/d/75gdf35",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHl0aG9ufGVufDB8fDB8fHww",
    recommended: true,
  },
  {
    title: "Web Development Essentials",
    description: "HTML, CSS, JavaScript & modern frameworks explained simply.",
    buy: "https://amzn.in/d/6SR2zxE",
    image: "https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
    recommended: false,
  },
  {
    title: "Mathematics for Class 10",
    description: "Comprehensive guide covering NCERT syllabus with solved examples.",
    pdf: "https://drive.google.com/file/d/1mRl3jx3AUz-eA4tYnj2ELIqDDvp9yTV3/view?usp=drive_link",
    buy: "https://amzn.in/d/6RkYR5b",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
    recommended: true,
  },
  {
    title: "Python for Beginners",
    description: "Learn Python programming from scratch with projects.",
    pdf: "https://docs.google.com/document/d/1VbewdsOdkXEUQkAW2zKZmmRh7a2ZPpb1cHD7qOjRhx4/edit?tab=t.0",
    buy: "https://amzn.in/d/75gdf35",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHl0aG9ufGVufDB8fDB8fHww",
    recommended: true,
  },
];

const detectCategory = (book) => {
  const title = book.title.toLowerCase();
  if (title.includes("math")) return "math";
  if (title.includes("python")) return "python";
  if (title.includes("web")) return "web";
  return "other";
};

const filteredBooks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();

  return books.filter((book) => {
    const category = detectCategory(book);
    const matchesSearch = !q ||
      book.title.toLowerCase().includes(q) ||
      book.description.toLowerCase().includes(q);

    const matchesCategory = categoryFilter.value === "all" || category === categoryFilter.value;

    const matchesAvailability =
      availabilityFilter.value === "all" ||
      (availabilityFilter.value === "pdf" && !!book.pdf) ||
      (availabilityFilter.value === "buy" && !!book.buy) ||
      (availabilityFilter.value === "both" && !!book.pdf && !!book.buy);

    const matchesRecommended = !recommendedOnly.value || !!book.recommended;

    return matchesSearch && matchesCategory && matchesAvailability && matchesRecommended;
  });
});

const resetFilters = () => {
  searchQuery.value = "";
  categoryFilter.value = "all";
  availabilityFilter.value = "all";
  recommendedOnly.value = false;
};
</script>

<style scoped>
/* Optional extra styling */
</style>
