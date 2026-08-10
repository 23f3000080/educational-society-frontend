<template>
  <div class="min-h-screen bg-linear-to-br from-[#fdf6e3] via-[#e6f7ff] to-[#d4edda] py-10 px-4 dark:from-[#0b1a2e] dark:via-[#122b44] dark:to-[#1a3a5c]">
    <div class="mx-auto max-w-7xl">
      <!-- Glassmorphism header with filters -->
      <div class="rounded-3xl border border-indigo-200/60 bg-white/80 p-6 shadow-2xl backdrop-blur-md sm:p-8 dark:border-indigo-300/20 dark:bg-slate-900/70">
        <div class="text-center">
          <h1 class="text-4xl font-black text-indigo-800 sm:text-5xl dark:text-indigo-200 tracking-tight flex items-center justify-center gap-3">
            <span>📚</span> Bookshelf
          </h1>
          <p class="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-300">Explore, download, and get inspired by our educational collection.</p>
        </div>

        <!-- Filters row -->
        <div class="mt-6 grid gap-3 md:grid-cols-12">
          <div class="relative md:col-span-5">
            <i class="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title or description..."
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
              <option value="computer_science">Computer Science</option>
              <option value="web">Web Development</option>
              <option value="ai">AI & ML</option>
              <option value="SQL">SQL</option>
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
            class="md:col-span-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 shadow-md"
          >
            Reset
          </button>
        </div>

        <!-- Stats & recommended toggle -->
        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm font-medium text-slate-600 dark:text-slate-300">
            Showing <span class="font-bold text-indigo-700 dark:text-indigo-300">{{ filteredBooks.length }}</span> of {{ books.length }} books
          </p>
          <label class="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/70 px-3 py-1.5 text-xs font-semibold text-amber-800 backdrop-blur-sm dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
            <input v-model="recommendedOnly" type="checkbox" class="accent-amber-500 h-4 w-4" />
            ⭐ Recommended only
          </label>
        </div>
      </div>
    </div>

    <!-- Books Grid -->
    <div v-if="filteredBooks.length" class="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(book, index) in filteredBooks"
        :key="index"
        class="group relative flex flex-col rounded-2xl border border-indigo-100 bg-white/90 p-5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-400 hover:dark:shadow-yellow-900 dark:border-slate-700 dark:bg-slate-900/90"
      >
        <!-- Book image with badge -->
        <div class="relative">
          <img
            :src="book.image"
            :alt="book.title"
            class="mb-4 h-52 w-full rounded-lg object-cover shadow-sm transition-transform group-hover:scale-[1.02]"
          />
          <div
            v-if="book.recommended"
            class="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
          >
            ⭐ Recommended
          </div>
          <div
            v-if="book.new"
            class="absolute top-3 right-3 bg-rose-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg"
          >
            NEW
          </div>
        </div>

        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">{{ book.title }}</h2>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{{ book.description }}</p>
        <!-- <p class="text-lg font-bold text-indigo-700 dark:text-indigo-300 mb-4">{{ book.author }}</p> -->
        <!-- Category Badge -->
        <span class="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 shadow-sm transition hover:bg-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-500/30">
          <span class="text-[10px]">📂</span>
          {{ detectCategory(book) }}
        </span>

        <!-- Author -->
        <span v-if="book.author" class="mb-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300">
          <span class="text-indigo-400 dark:text-indigo-500">✍️</span>
          {{ book.author }}
        </span>

        <!-- Action buttons -->
        <div class="mt-auto flex flex-wrap justify-between gap-2">
          <a
            v-if="book.pdf"
            :href="book.pdf"
            target="_blank"
            class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg text-sm text-center font-medium transition shadow-md"
          >
            📘 PDF
          </a>

          <a
            v-if="book.buy"
            :href="book.buy"
            target="_blank"
            class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm text-center font-medium transition shadow-md"
          >
            🛒 Buy
          </a>

          <!-- placeholder if no action -->
          <div v-if="!book.pdf && !book.buy" class="flex-1 text-center text-sm text-slate-400 italic">
            coming soon
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="mx-auto mt-8 max-w-2xl rounded-2xl border border-indigo-200 bg-white/80 p-10 text-center shadow-md backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
      <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">📭 No books found</h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different keyword or clear filters.</p>
    </div>

    <!-- Quote -->
    <div class="text-center mt-10 px-4">
      <p class="text-sm text-gray-600 dark:text-slate-300 italic border-t border-indigo-200/30 pt-6 max-w-2xl mx-auto">
        “A room without books is like a body without a soul.” — Marcus Tullius Cicero
      </p>
    </div>
    <!-- copyright line because books are copyrighted -->
    <div class="text-center mt-10 px-4">
      <p class="text-sm text-gray-600 dark:text-slate-300">
        All books are copyrighted material. Please respect the authors and publishers by using the provided links to access or purchase the books legally.
      </p>
    </div>
    <!-- Footer slot (if you have a global Footer component) -->
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Bookshelf',
  data() {
    return {
      searchQuery: '',
      categoryFilter: 'all',
      availabilityFilter: 'all',
      recommendedOnly: false,
      books: [
        {
          title: 'Learning: SQL',
          description: 'A comprehensive guide to SQL with applications in database management.',
          image: 'https://media.istockphoto.com/id/1800292591/photo/sql-structured-query-language-technology-concept-icon-virtual-screen.jpg?s=612x612&w=0&k=20&c=Natt2t_aFsr-KlPiMMQUPKIX6sbDb2hOTRhUFcSq6cA=',
          pdf: 'https://drive.google.com/file/d/1chvb_-mpjeD5d7jqUpLSlDZHb0_Rgr4l/view',
          buy: 'https://share.google/eyk6k3wzDFj1QwMAU',
          recommended: true,
          new: false,
          category: 'SQL',
          author: 'Alan Beaulieu',
        },
        {
          title: 'Python Crash Course',
          description: 'Fast-paced introduction to Python programming for beginners and intermediate.',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKm1aOTUi71wKVeXCrjrojOJQlVykqefjldVI7E-j8vXGzOglKUWFivQYE&s=10',
          pdf: 'https://drive.google.com/file/d/17pH5adn-MVYJ7-keDQDlqJk-v0kFNSX2/view',
          buy: 'https://dl.flipkart.com/s/!PrN4ZNNNN',
          recommended: true,
          new: true,
          category: 'python',
          author: 'Eric Matthes',
        },
        {
          title: 'HTML & CSS: Design and Build Websites',
          description: 'Learn the fundamentals of web development with HTML and CSS, including responsive design.',
          image: '/webdev_Book_Img.jpg',
          pdf: 'https://drive.google.com/file/d/1DzPlwYAVFqIsnh3-8tfUl2WdohDeTpgH/view',
          buy: 'https://dl.flipkart.com/s/TiRfNDuuuN',
          recommended: true,
          new: true,
          category: 'web',
          author: 'Jon Duckett',
        },
        {
          title: 'JavaScript & JQuery: Interactive Front-End Web Development',
          description: 'A practical guide to JavaScript and jQuery for creating dynamic web pages and user interfaces.',
          image: '/jsBook_Img.avif',
          pdf: 'https://drive.google.com/file/d/1riS5aIgHuN2zEVzrZZxClnqwETG1XfSq/view',
          buy: null,
          recommended: true,
          new: true,
          category: 'web',
          author: 'Jon Duckett',
        },
        {
          title: 'AI: A Modern Approach',
          description: 'The definitive AI textbook covering search, reasoning, and machine learning.',
          image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&crop=center',
          pdf: 'https://drive.google.com/file/d/1cXj4YwL2975AbBSJqzjZn1ZHtgblAkvO/view?usp=sharing',
          buy: 'https://dl.flipkart.com/s/!D6T19NNNN',
          recommended: true,
          new: true,
          category: 'ai',
          author: 'Stuart Russell, Peter Norvig',
        },
        {
          title: 'Introduction to Algorithms',
          description: 'Comprehensive textbook on algorithms, covering a wide range of topics in computer science.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
          pdf: 'https://drive.google.com/file/d/1FcIcvGbtY43k_saI9PxaP4yAbxEGfm6M/view?usp=sharing',
          buy: null,
          recommended: false,
          new: true,
          category: 'computer_science',
          author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
        },
        {
          title: 'Hands-on Machine Learning with Scikit-Learn, Keras, and TensorFlow',
          description: 'Practical guide to building machine learning models using Python libraries.',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW9J8YL5_rnOnsU2uk7EMHt7MWDJZ-0Q4U6GxH4C7WRjkGK4cqPS9ahxiJ&s=10',
          pdf: 'https://drive.google.com/file/d/1c_abGBkbsD2prcz46Ix_W8PxO20M-w1d/view',
          buy: null,
          recommended: false,
          new: false,
          category: 'ai',
          author: 'Aurélien Géron',
        },
        // linear algebra book
        {
          title: 'Linear Algebra',
          description: 'A clear and concise introduction to linear algebra, focusing on vector spaces and linear maps.',
          image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop&crop=center',
          pdf: 'https://drive.google.com/file/d/1zYRWns_WOJ3VXoOvTGDGeqcpknfwFZHb/view?usp=sharing',
          buy: null,
          recommended: false,
          new: false,
          category: 'math',
          author: 'Gilbert Strang',
        },
        // CALCULUS EARLY TRANSCENDENTALS
        {
          title: 'Calculus: Early Transcendentals',
          description: 'A comprehensive introduction to calculus, covering limits, derivatives, integrals, and series.',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5exoBM2B-V9QufCCOiftdzoa607gtS0VTkxpr2Y256g&s=10',
          pdf: 'https://drive.google.com/file/d/1EziOuDILBhg8da_FyCkhK2uM8arr7PaP/view?usp=sharing',
          buy: null,
          recommended: false,
          new: false,
          category: 'math',
          author: 'James Stewart',
        },
      ],
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) => {
        // search
        const matchSearch = this.searchQuery
          ? book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            book.description.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;

        // category
        const matchCategory =
          this.categoryFilter === 'all' || book.category === this.categoryFilter;

        // availability
        let matchAvailability = true;
        if (this.availabilityFilter === 'pdf') matchAvailability = !!book.pdf;
        else if (this.availabilityFilter === 'buy') matchAvailability = !!book.buy;
        else if (this.availabilityFilter === 'both') matchAvailability = !!(book.pdf && book.buy);

        // recommended
        const matchRecommended = this.recommendedOnly ? book.recommended === true : true;

        return matchSearch && matchCategory && matchAvailability && matchRecommended;
      });
    },
  },
  methods: {
    resetFilters() {
      this.searchQuery = '';
      this.categoryFilter = 'all';
      this.availabilityFilter = 'all';
      this.recommendedOnly = false;
    },
    detectCategory(book) {
      if (!book.category) return 'Other';
      const map = {
        math: 'Mathematics',
        python: 'Python',
        web: 'Web Dev',
        ai: 'AI & ML',
        sql: 'SQL',
        computer_science: 'Computer Science',
        other: 'Other',
      };
      return map[book.category] || book.category;
    },
  },
};
</script>

<style scoped>
/* line-clamp for multiline ellipsis */
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
</style>