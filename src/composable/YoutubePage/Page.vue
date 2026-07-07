<!-- <template>
  <div class="min-h-screen bg-linear-to-br from-[#fff8e8] via-[#e8f7ff] to-[#e9fff3] px-4 py-8 sm:px-6 lg:px-8 dark:from-[#07151d] dark:via-[#0a1f2b] dark:to-[#0f1a24]">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 rounded-3xl border border-[#005f73]/15 bg-white/70 p-6 shadow-xl backdrop-blur-md sm:p-8 dark:border-[#3ea6b8]/20 dark:bg-[#0f2430]/70">
        <h1 class="text-center text-3xl font-black text-[#0a3440] sm:text-4xl dark:text-[#dff7ff]">
          Study Notes & Video Lectures
        </h1>
        <p class="mx-auto mt-3 max-w-3xl text-center text-sm text-[#245461] sm:text-base dark:text-[#9ec6d3]">
          Find lectures faster with smart search and filters. Learn chapter-wise and download notes instantly.
        </p>

        <div class="mt-6 grid gap-3 md:grid-cols-12">
          <div class="relative md:col-span-6">
            <i class="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7398a3] dark:text-[#7da0ad]"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search lecture or chapter..."
              class="w-full rounded-xl border border-[#9fd7dc] bg-white px-4 py-3 pl-11 text-[#123843] outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 dark:border-[#2c6170] dark:bg-[#102733] dark:text-[#d8edf4] dark:placeholder:text-[#7fa0ae]"
            />
          </div>

          <div class="md:col-span-3">
            <select
              v-model="activeSubject"
              class="w-full rounded-xl border border-[#9fd7dc] bg-white px-4 py-3 text-[#123843] outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 dark:border-[#2c6170] dark:bg-[#102733] dark:text-[#d8edf4]"
            >
              <option value="all">All Subjects</option>
              <option v-for="subject in subjects" :key="subject" :value="subject">
                {{ subject }}
              </option>
            </select>
          </div>

          <div class="md:col-span-3">
            <select
              v-model="selectedChapter"
              class="w-full rounded-xl border border-[#9fd7dc] bg-white px-4 py-3 text-[#123843] outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 dark:border-[#2c6170] dark:bg-[#102733] dark:text-[#d8edf4]"
            >
              <option value="all">All Chapters</option>
              <option v-for="chapter in availableChapters" :key="chapter" :value="chapter">
                {{ chapter }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm font-medium text-[#245461] dark:text-[#9ec6d3]">
            {{ filteredLectures.length }} lecture{{ filteredLectures.length === 1 ? '' : 's' }} found
          </p>
          <button
            @click="resetFilters"
            class="rounded-lg bg-[#0a4b5e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#083745] dark:bg-[#1f6f7d] dark:hover:bg-[#1a5f6c]"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div v-if="groupedLectures.length" class="space-y-8">
        <div
          v-for="chapter in groupedLectures"
          :key="`${chapter.subject}-${chapter.title}`"
          :id="chapter.id"
          class="rounded-3xl border border-[#005f73]/15 bg-white/80 p-5 shadow-lg backdrop-blur-sm sm:p-6 dark:border-[#3ea6b8]/20 dark:bg-[#0f2430]/80"
        >
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-xs font-bold uppercase tracking-wide text-[#2f7a8a] dark:text-[#79c9d9]">{{ chapter.subject }}</p>
              <h2 class="mt-1 text-xl font-extrabold text-[#0a3440] sm:text-2xl dark:text-[#e0f6ff]">{{ chapter.title }}</h2>
            </div>
            <button
              @click="scrollToChapter(chapter.id)"
              class="rounded-lg border border-[#0a4b5e]/30 bg-white px-3 py-2 text-xs font-semibold text-[#0a4b5e] transition hover:bg-[#e9f8fb] dark:border-[#3ea6b8]/30 dark:bg-[#153241] dark:text-[#9dd4e1] dark:hover:bg-[#1a3a4b]"
            >
              Jump To Section
            </button>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="(lecture, idx) in chapter.lectures"
              :key="idx"
              class="flex h-full flex-col rounded-2xl border border-[#c8e8ec] bg-[#f7fdff] p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#2c5f6d] dark:bg-[#15303d]"
            >
              <h3 class="mb-3 line-clamp-2 text-base font-bold text-[#114654] dark:text-[#d7eff7]">
                {{ lecture.title }}
              </h3>

              <div class="relative mb-4 w-full overflow-hidden rounded-xl aspect-video bg-black/5 dark:bg-black/30">
                <iframe
                  class="h-full w-full"
                  :src="lecture.video"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>

              <a
                :href="lecture.notes"
                target="_blank"
                class="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0f766e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b5b55] dark:bg-[#239c91] dark:hover:bg-[#1f887f]"
              >
                <i class="fa-regular fa-file-lines"></i>
                Download Notes
              </a>
            </article>
          </div>
        </div>
      </div>

      <div
        v-else
        class="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#aadce3] bg-white p-10 text-center shadow-md dark:border-[#2b6070] dark:bg-[#112a37]"
      >
        <h3 class="text-xl font-extrabold text-[#0a3440] dark:text-[#dff7ff]">No results found</h3>
        <p class="mt-2 text-sm text-[#3f6b76] dark:text-[#92bdca]">Try another keyword or switch filters to view more lectures.</p>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 px-4 py-12 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Animated decorative blobs -->
    <div class="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-500/10"></div>
    <div class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-500/10"></div>

    <!-- Main content card -->
    <div class="relative z-10 flex max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl bg-white/60 p-10 text-center shadow-2xl backdrop-blur-md dark:bg-slate-800/60 dark:shadow-slate-900/50 sm:p-12">
      <!-- Icon / illustration -->
      <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 shadow-lg dark:from-amber-300 dark:to-amber-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 class="text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-6xl">
        <span class="bg-gradient-to-r from-amber-600 to-sky-600 bg-clip-text text-transparent dark:from-amber-300 dark:to-sky-300">
          Coming Soon!
        </span>
      </h1>

      <p class="text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
        We’re crafting something amazing. 
        <span class="block sm:inline">Stay tuned for the launch.</span>
      </p>

      <!-- Animated pulse / countdown placeholder -->
      <div class="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        <span class="relative flex h-3 w-3">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
        </span>
        Launching soon
      </div>

      <!-- Action buttons -->
      <div class="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <router-link
          to="/"
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-300/50 dark:from-amber-400 dark:to-amber-500 dark:hover:shadow-amber-400/30"
        >
          <span class="relative z-10 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back Home
          </span>
          <span class="absolute inset-0 z-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </router-link>

        <button 
          @click="notifyMe" 
          class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:bg-slate-700/50 dark:hover:text-sky-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Notify Me
        </button>
      </div>

      <!-- Social proof / decorative -->
      <div class="mt-4 flex items-center gap-6 text-xs text-slate-400 dark:text-slate-500">
        <span class="flex items-center gap-1">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          In progress
        </span>
        <span class="flex items-center gap-1">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-amber-400"></span>
          Almost there
        </span>
        <span class="flex items-center gap-1">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-sky-400"></span>
          Exciting
        </span>
      </div>
    </div>

    <!-- Subtle footer note -->
    <div class="relative z-10 mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
      <span class="inline-block bg-white/30 px-3 py-1 backdrop-blur-sm dark:bg-slate-800/30">
        ✦ We can't wait to share it with you ✦
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  methods: {
    notifyMe() {
      alert('🔔 We\'ll notify you when this feature launches!');
    }
  }
}
</script>

<style scoped>
/* Smooth fade-in animation for the card */
.relative.z-10 {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom subtle pulse for the status dot */
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Hover glow for buttons */
.group:hover .group-hover\:shadow-amber-300\/50 {
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .relative.z-10 {
    padding: 1.5rem;
  }
}
</style>

<script setup>
import { computed, ref, watch } from "vue";

const subjects = ["Mathematics", "Science", "Python", "Web Development"];
const activeSubject = ref("all");
const selectedChapter = ref("all");
const searchQuery = ref("");

const notes = {
  Mathematics: [
    {
      title: "Chapter 1: Matrix",
      lectures: [
        {
          title: "Lecture 1: Introduction, Types, and Equality of Matrices with Examples",
          video: "https://www.youtube.com/embed/2ZIt21oDbrg",
          notes: "https://drive.google.com/file/d/1mRl3jx3AUz-eA4tYnj2ELIqDDvp9yTV3/view?usp=sharing",
        },
        {
          title: "Lecture 2: Trace, Square Matrix, Addition, Subtraction",
          video: "https://www.youtube.com/embed/mKxSm_aS-p8",
          notes: "https://drive.google.com/file/d/1fCWkFCajEncnUoMHXNiva161fpDX0STr/view",
        },
        {
          title: "Lecture 3: Submatrix, Multiplication of Matrix & its properties",
          video: "https://www.youtube.com/embed/ys38EH53w4k",
          notes: "https://drive.google.com/file/d/17GC-Q1THH_Fw9lulrfhRfbpINXtVqQNa/view",
        },
        {
          title: "Lecture 4: Transpose, Properties , Symmetric & Skew-Symmetric Matrix",
          video: "https://www.youtube.com/embed/b_ADC7rv7nQ",
          notes: "https://drive.google.com/file/d/1AHQ-M0p_mIit7cYwf9iqNP_jIzO4VVBh/view",
        },
        {
          title: "Lecture 5: Properties of Symmetric & Skew-symmetric, Orthogonal, Minor and Cofactor",
          video: "https://www.youtube.com/embed/mvE5cGufXl0",
          notes: "https://drive.google.com/file/d/1rAYNrz1yzueYkhy9xi7Gv1r-2EceVGX4/view",
        },
        {
          title: "Lecture 6: Adjoint Of Matrix, Properties",
          video: "https://www.youtube.com/embed/jn9dVTmaxnM",
          notes: "https://drive.google.com/file/d/15ck_RhoOx7O9CTV1gqTjMQyYYzCFXmZb/view",
        },
        {
          title: "Lecture 7: Singular, Non-Singular, Inverse, Gauss-Jordan Method & more ...",
          video: "https://www.youtube.com/embed/0fvenlUnsY4",
          notes: "https://drive.google.com/file/d/1Zi63N_C2duKFsO-R6KELyzjsyzrdA6Vl/view",
        },
      ],
    },
    {
      title: "Chapter 2: Determinants",
      lectures: [
        {
          title: "Lecture 1: Intro, Applications, and Notation Explained",
          video: "https://www.youtube.com/embed/XkeS0u92Ryw",
          notes: "https://drive.google.com/file/d/1r3SoES6E5uMiP0nctN-MnFiLuMoMOQ37/view",
        },
        {
          title: "Lecture 2: Rows & Columns, 2x2 & 3x3 Determinants",
          video: "https://www.youtube.com/embed/x_fx4bxkB-s",
          notes: "https://drive.google.com/file/d/1SJwDDEUr7v88aOTtmIfxaWPCzE0B39nw/view",
        },
        {
          title: "Lecture 3: Minors, Cofactors, Area of Triangle & Line Equation",
          video: "https://www.youtube.com/embed/jXWGRgIgQoE",
          notes: "https://drive.google.com/file/d/1-K5UJW8EZfv1WQmVIc82Ihlsoqvpmo6A/view",
        },
      ],
    },
  ],
  Science: [
    {
      title: "Chapter 1: Physics - Motion",
      lectures: [
        {
          title: "Lecture 1: Speed & Velocity",
          video: "https://www.youtube.com/embed/9Os0o3wzS_I",
          notes: "https://example.com/motion-speed.pdf",
        },
      ],
    },
  ],
  Python: [
    {
      title: "Part-1 : Python For Beginners",
      lectures: [
        {
          title: "Lecture 1: Intro | About Colab | First Program of Python 🐍",
          video: "https://www.youtube.com/embed/iiQRE3mEAEw",
          notes: "https://docs.google.com/document/d/1VbewdsOdkXEUQkAW2zKZmmRh7a2ZPpb1cHD7qOjRhx4/edit?usp=sharing",
        },
        {
          title: "Lecture 2: Variable | Data Types 🐍",
          video: "https://www.youtube.com/embed/ywvRO-sav00",
          notes: "https://docs.google.com/document/d/1VbewdsOdkXEUQkAW2zKZmmRh7a2ZPpb1cHD7qOjRhx4/edit?tab=t.xuygymrl0po7",
        },
        {
          title: "Lecture 3:  Operators in Python 🐍",
          video: "https://www.youtube.com/embed/84WaFABvw_w",
          notes: "https://docs.google.com/document/d/1VbewdsOdkXEUQkAW2zKZmmRh7a2ZPpb1cHD7qOjRhx4/edit?tab=t.vab8ttaao06z#heading=h.z7mgfrfzi9yj",
        },
        {
          title: "Lecture 4: Input, Output, type(), Type Conversion in Python 🐍",
          video: "https://www.youtube.com/embed/w6n3VSzqJRA",
          notes: "https://docs.google.com/document/d/1VbewdsOdkXEUQkAW2zKZmmRh7a2ZPpb1cHD7qOjRhx4/edit?tab=t.yqjnd5ib4rzl",
        },
      ],
    },
  ],
  "Web Development": [
    {
      title: "Chapter 1: HTML & CSS",
      lectures: [
        {
          title: "Lecture 1: HTML Basics",
          video: "https://www.youtube.com/embed/mU6anWqZJcc",
          notes: "https://example.com/html-basics.pdf",
        },
        {
          title: "Lecture 2: CSS Styling",
          video: "https://www.youtube.com/embed/W6NZfCO5SIk",
          notes: "https://example.com/css-styling.pdf",
        },
      ],
    },
  ],
};

const flattenedLectures = computed(() => {
  const items = [];

  Object.entries(notes).forEach(([subject, chapters]) => {
    chapters.forEach((chapter) => {
      items.push({
        id: chapter.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        subject,
        title: chapter.title,
        lectures: chapter.lectures,
      });
    });
  });

  return items;
});

const availableChapters = computed(() => {
  const source = activeSubject.value === "all"
    ? flattenedLectures.value
    : flattenedLectures.value.filter((item) => item.subject === activeSubject.value);

  return source.map((item) => item.title);
});

const filteredLectures = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return flattenedLectures.value.flatMap((chapter) => {
    const subjectMatch = activeSubject.value === "all" || chapter.subject === activeSubject.value;
    const chapterMatch = selectedChapter.value === "all" || chapter.title === selectedChapter.value;

    if (!subjectMatch || !chapterMatch) {
      return [];
    }

    const matchingLectures = chapter.lectures.filter((lecture) => {
      if (!query) {
        return true;
      }

      return (
        lecture.title.toLowerCase().includes(query) ||
        chapter.title.toLowerCase().includes(query) ||
        chapter.subject.toLowerCase().includes(query)
      );
    });

    return matchingLectures.map((lecture) => ({
      id: chapter.id,
      subject: chapter.subject,
      chapterTitle: chapter.title,
      lecture,
    }));
  });
});

const groupedLectures = computed(() => {
  const chapterMap = new Map();

  filteredLectures.value.forEach((item) => {
    const key = `${item.subject}__${item.chapterTitle}`;

    if (!chapterMap.has(key)) {
      chapterMap.set(key, {
        id: item.id,
        subject: item.subject,
        title: item.chapterTitle,
        lectures: [],
      });
    }

    chapterMap.get(key).lectures.push(item.lecture);
  });

  return Array.from(chapterMap.values());
});

watch(activeSubject, () => {
  selectedChapter.value = "all";
});

function resetFilters() {
  searchQuery.value = "";
  activeSubject.value = "all";
  selectedChapter.value = "all";
}

function scrollToChapter(chapterId) {
  const el = document.getElementById(chapterId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
