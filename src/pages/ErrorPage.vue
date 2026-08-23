<template>
  <section class="min-h-screen bg-linear-to-br from-rose-50 via-orange-50 to-amber-100 px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-gray-900">
    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      <div class="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/80 text-4xl shadow-lg ring-1 ring-rose-200 dark:bg-slate-800 dark:ring-slate-700">
        ⚠
      </div>

      <p class="mt-6 rounded-full bg-rose-100 px-4 py-1 text-xs font-bold uppercase tracking-wide text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
        Something went wrong
      </p>

      <h1 class="mt-4 text-4xl font-black text-slate-900 sm:text-5xl dark:text-white">
        Oops! Page Not Available
      </h1>

      <p class="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
        The page you requested is unavailable, moved, or there was an unexpected error.
        Try going back or return to the homepage.
      </p>

      <div class="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <button
          @click="goBack"
          class="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Go Back
        </button>

        <router-link
          to="/"
          class="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
        >
          Back to Home
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  router.push("/");
};
</script>
