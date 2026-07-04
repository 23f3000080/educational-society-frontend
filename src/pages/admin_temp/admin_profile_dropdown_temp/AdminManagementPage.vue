<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-3 py-4 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-cyan-950 dark:text-gray-100 sm:px-4 md:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-4 md:space-y-6">
      <!-- Header Section -->
      <section class="rounded-2xl md:rounded-3xl border border-cyan-100/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-cyan-900/50 dark:bg-gray-900/80 sm:p-5 md:p-6 lg:p-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300 sm:text-xs">Admin Management</p>
            <h1 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">Audience &amp; Email Center</h1>
            <p class="mt-1.5 text-xs leading-5 text-gray-600 dark:text-gray-300 sm:text-sm md:mt-2 md:text-base">
              Review newsletter subscribers, choose student recipients, and send email updates to targeted audiences.
            </p>
          </div>
          <button
            type="button"
            @click="refreshAll"
            :disabled="loadingRecipients || loadingSubscribers"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400"
          >
            <svg class="h-4 w-4" :class="{ 'animate-spin': loadingRecipients || loadingSubscribers }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>

        <!-- Stats Grid -->
        <div class="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3">
          <div class="group rounded-xl border border-cyan-200/50 bg-cyan-50/50 p-3 transition-all hover:border-cyan-300 hover:bg-cyan-100/50 dark:border-cyan-900/50 dark:bg-cyan-950/30 dark:hover:border-cyan-800 sm:rounded-2xl sm:p-4">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300 sm:text-xs">Subscribers</p>
              <span class="rounded-full bg-cyan-100/50 p-1.5 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
                <svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
            <p class="mt-1.5 text-xl font-bold text-cyan-700 dark:text-cyan-300 sm:text-2xl">{{ summary.total_subscribers }}</p>
          </div>

          <div class="group rounded-xl border border-emerald-200/50 bg-emerald-50/50 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-100/50 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:hover:border-emerald-800 sm:rounded-2xl sm:p-4">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 sm:text-xs">Active Users</p>
              <span class="rounded-full bg-emerald-100/50 p-1.5 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </div>
            <p class="mt-1.5 text-xl font-bold text-emerald-700 dark:text-emerald-300 sm:text-2xl">{{ summary.total_users }}</p>
          </div>

          <div class="group rounded-xl border border-indigo-200/50 bg-indigo-50/50 p-3 transition-all hover:border-indigo-300 hover:bg-indigo-100/50 dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:hover:border-indigo-800 sm:rounded-2xl sm:p-4">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300 sm:text-xs">User Emails</p>
              <span class="rounded-full bg-indigo-100/50 p-1.5 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
            </div>
            <p class="mt-1.5 text-xl font-bold text-indigo-700 dark:text-indigo-300 sm:text-2xl">{{ summary.total_active_user_emails }}</p>
          </div>
        </div>
      </section>

      <!-- Main Content Grid -->
      <section class="grid gap-4 md:gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <!-- Subscribers Table -->
        <article class="rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-4 md:p-5 lg:p-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">Subscribers</h2>
              <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">Newsletter emails collected from the home page.</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                {{ subscriberPagination.total }} total
              </span>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <div class="relative min-w-0 flex-1">
              <input
                v-model="subscriberSearch"
                type="text"
                placeholder="Search subscribers..."
                class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 pl-9 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
                @keyup.enter="applySubscriberSearch"
              />
              <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button type="button" @click="applySubscriberSearch" class="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 dark:bg-cyan-500 dark:hover:bg-cyan-400">
              Search
            </button>
          </div>

          <Transition name="fade">
            <p v-if="subscriberError" class="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
              {{ subscriberError }}
            </p>
          </Transition>

          <!-- Mobile Subscriber Cards -->
          <div class="mt-4 grid gap-3 lg:hidden sm:mt-5 sm:gap-4">
            <article
              v-for="subscriber in subscribers"
              :key="`mobile-${subscriber.id}`"
              class="rounded-2xl border border-gray-200/50 bg-gray-50/50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-cyan-800"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white truncate">{{ subscriber.email }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ subscriber.name || 'Subscriber' }}</p>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ formatDate(subscriber.subscribed_at) }}</p>
                </div>
                <div class="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    @click="openEditSubscriber(subscriber)"
                    class="rounded-lg p-1.5 text-amber-600 transition hover:bg-amber-100 hover:text-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/30"
                    title="Edit subscriber"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click="deleteSubscriber(subscriber)"
                    class="rounded-lg p-1.5 text-rose-600 transition hover:bg-rose-100 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/30"
                    title="Delete subscriber"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            <div v-if="!loadingSubscribers && subscribers.length === 0" class="rounded-2xl border border-dashed border-gray-300/50 bg-gray-50/50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
              No subscribers found.
            </div>
            <div v-if="loadingSubscribers" class="rounded-2xl border border-dashed border-gray-300/50 bg-gray-50/50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:bg-gray-950/50 dark:text-gray-400">
              <div class="flex items-center justify-center gap-3">
                <div class="h-4 w-4 animate-spin rounded-full border-2 border-cyan-600 border-t-transparent"></div>
                Loading subscribers...
              </div>
            </div>
          </div>

          <!-- Desktop Subscriber Table -->
          <div class="mt-4 hidden overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-800/50 lg:block sm:mt-5">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead class="bg-gray-50/50 dark:bg-gray-950/50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Email</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Subscribed</th>
                    <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white/50 dark:divide-gray-800 dark:bg-gray-900/30">
                  <tr v-for="subscriber in subscribers" :key="subscriber.id" class="transition hover:bg-cyan-50/50 dark:hover:bg-cyan-950/30">
                    <td class="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{{ subscriber.email }}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ subscriber.name || 'Subscriber' }}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ formatDate(subscriber.subscribed_at) }}</td>
                    <td class="px-4 py-3 text-sm text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          @click="openEditSubscriber(subscriber)"
                          class="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 dark:bg-amber-500 dark:hover:bg-amber-400"
                        >
                          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          type="button"
                          @click="deleteSubscriber(subscriber)"
                          class="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/25 active:scale-95 dark:bg-rose-500 dark:hover:bg-rose-400"
                        >
                          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!loadingSubscribers && subscribers.length === 0">
                    <td colspan="4" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No subscribers found.</td>
                  </tr>
                  <tr v-if="loadingSubscribers">
                    <td colspan="4" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      <div class="flex items-center justify-center gap-3">
                        <div class="h-4 w-4 animate-spin rounded-full border-2 border-cyan-600 border-t-transparent"></div>
                        Loading subscribers...
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Subscriber Pagination -->
          <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Page {{ subscriberPagination.current_page }} of {{ Math.max(1, subscriberPagination.pages) }}
              <span class="hidden sm:inline">({{ subscriberPagination.total }} total)</span>
            </p>
            <div class="flex gap-2">
              <button
                type="button"
                @click="changeSubscriberPage(subscriberPagination.current_page - 1)"
                :disabled="!subscriberPagination.has_prev || loadingSubscribers"
                class="inline-flex items-center gap-1.5 rounded-xl bg-gray-100/80 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span class="hidden sm:inline">Prev</span>
              </button>
              <button
                type="button"
                @click="changeSubscriberPage(subscriberPagination.current_page + 1)"
                :disabled="!subscriberPagination.has_next || loadingSubscribers"
                class="inline-flex items-center gap-1.5 rounded-xl bg-gray-100/80 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <span class="hidden sm:inline">Next</span>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </article>

        <!-- Send Email Form -->
        <article class="rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:p-4 md:p-5 lg:p-6">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">Send Email</h2>
              <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">Use &#123;&#123;name&#125;&#125; in the message to personalize each email.</p>
            </div>
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              {{ estimatedRecipients }} recipients
            </span>
          </div>

          <form class="mt-4 space-y-4 sm:mt-5" @submit.prevent="sendEmail">
            <div class="grid gap-3 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Audience</label>
                <select
                  v-model="emailForm.audience"
                  class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
                >
                  <option value="subscribers">Subscribers</option>
                  <option value="specific_users">Specific Users</option>
                  <option value="all_users">All Users</option>
                  <option value="everyone">Subscribers &amp; Users</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Subject</label>
                <input
                  v-model="emailForm.subject"
                  type="text"
                  required
                  placeholder="Email subject"
                  class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
                />
              </div>
            </div>

            <!-- Specific Users Selection -->
            <Transition name="slide-down">
              <div v-if="emailForm.audience === 'specific_users'" class="rounded-2xl border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-950/50">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Select Users</p>
                  <div class="relative w-full sm:w-64">
                    <input
                      v-model="userSearch"
                      type="text"
                      placeholder="Search users..."
                      class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2 pl-9 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
                    />
                    <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <div class="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                  <label v-for="user in filteredUsers" :key="user.id" class="flex items-start gap-3 rounded-xl px-2 py-2 text-sm text-gray-700 transition hover:bg-white/50 dark:text-gray-200 dark:hover:bg-gray-900/50">
                    <input type="checkbox" :value="user.id" v-model="emailForm.user_ids" class="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700" />
                    <span class="min-w-0">
                      <span class="block truncate font-semibold text-gray-900 dark:text-white">{{ user.full_name || user.email }}</span>
                      <span class="block truncate text-xs text-gray-500 dark:text-gray-400">{{ user.email }} · {{ user.roles?.join(', ') || 'user' }}</span>
                    </span>
                  </label>
                  <div v-if="filteredUsers.length === 0" class="rounded-xl border border-dashed border-gray-300/50 px-4 py-5 text-center text-sm text-gray-500 dark:border-gray-700/50 dark:text-gray-400">
                    No matching users.
                  </div>
                </div>

                <div class="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">{{ emailForm.user_ids.length }}</span>
                  <span>users selected</span>
                  <button type="button" @click="emailForm.user_ids = []" class="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">Clear all</button>
                </div>
              </div>
            </Transition>

            <!-- Message Body -->
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Message</label>
              <textarea
                v-model="emailForm.body"
                required
                rows="7"
                placeholder="Hello {{name}},&#10;&#10;We have an exciting update for you..."
                class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
              ></textarea>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-wrap items-center gap-2">
              <button
                type="submit"
                :disabled="sendingEmail"
                class="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95 dark:bg-cyan-500 dark:hover:bg-cyan-400"
              >
                <svg v-if="sendingEmail" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"></path>
                </svg>
                <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ sendingEmail ? 'Sending...' : 'Send Email' }}
              </button>
              <button type="button" @click="resetEmailForm" class="inline-flex items-center gap-2 rounded-xl bg-gray-100/80 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear
              </button>
            </div>

            <!-- Status Messages -->
            <Transition name="fade">
              <p v-if="emailMessage" class="rounded-xl border px-4 py-3 text-sm font-semibold backdrop-blur-sm" :class="emailMessageType === 'success' ? 'border-emerald-200 bg-emerald-50/80 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-200 bg-rose-50/80 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'">
                {{ emailMessage }}
              </p>
            </Transition>
          </form>
        </article>
      </section>
    </div>

    <!-- Edit Subscriber Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="editSubscriberModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div class="w-full max-w-md rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/95 p-5 shadow-2xl backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/95 sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300 sm:text-xs">Subscriber Management</p>
                <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">Edit Subscriber</h2>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Update subscriber details.</p>
              </div>
              <button type="button" @click="closeEditSubscriber" class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form class="mt-5 space-y-4" @submit.prevent="updateSubscriber">
              <div>
                <label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Email</label>
                <input
                  v-model="editSubscriberForm.email"
                  type="email"
                  required
                  class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Name</label>
                <input
                  v-model="editSubscriberForm.name"
                  type="text"
                  class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">Message (optional)</label>
                <textarea
                  v-model="editSubscriberForm.message"
                  rows="3"
                  class="w-full rounded-xl border border-gray-300 bg-white/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-900"
                ></textarea>
              </div>

              <Transition name="fade">
                <p v-if="editSubscriberError" class="rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  {{ editSubscriberError }}
                </p>
              </Transition>
              <Transition name="fade">
                <p v-if="editSubscriberSuccess" class="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm font-semibold text-emerald-700 backdrop-blur-sm dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                  {{ editSubscriberSuccess }}
                </p>
              </Transition>

              <div class="flex flex-wrap items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  @click="closeEditSubscriber"
                  class="rounded-xl bg-gray-100/80 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="updatingSubscriber"
                  class="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95 dark:bg-amber-500 dark:hover:bg-amber-400"
                >
                  <svg v-if="updatingSubscriber" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"></path>
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ updatingSubscriber ? 'Updating...' : 'Update Subscriber' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import api from '../../../services/axios'

// State
const loadingRecipients = ref(false)
const loadingSubscribers = ref(false)
const sendingEmail = ref(false)
const updatingSubscriber = ref(false)
const isInitialLoad = ref(true)

const subscribers = ref([])
const allSubscribers = ref([])
const users = ref([])
const subscriberSearch = ref('')
const userSearch = ref('')
const subscriberError = ref('')
const emailMessage = ref('')
const emailMessageType = ref('success')

// Edit Subscriber State
const editSubscriberModalOpen = ref(false)
const editSubscriberId = ref(null)
const editSubscriberForm = reactive({
  email: '',
  name: '',
  message: ''
})
const editSubscriberError = ref('')
const editSubscriberSuccess = ref('')

// Summary
const summary = reactive({
  total_subscribers: 0,
  total_users: 0,
  total_active_user_emails: 0
})

// Subscriber Pagination
const subscriberPagination = reactive({
  total: 0,
  pages: 1,
  current_page: 1,
  per_page: 10,
  has_next: false,
  has_prev: false
})

// Email Form
const emailForm = reactive({
  audience: 'subscribers',
  subject: '',
  body: '',
  user_ids: []
})

// Computed
const filteredUsers = computed(() => {
  const term = userSearch.value.trim().toLowerCase()
  if (!term) return users.value

  return users.value.filter((user) => {
    const text = [
      user.full_name,
      user.email,
      user.user_id,
      user.roles?.join(' ')
    ].filter(Boolean).join(' ').toLowerCase()

    return text.includes(term)
  })
})

const estimatedRecipients = computed(() => {
  if (emailForm.audience === 'specific_users') return emailForm.user_ids.length
  if (emailForm.audience === 'all_users') return summary.total_active_user_emails
  if (emailForm.audience === 'everyone') {
    const emails = new Set()
    allSubscribers.value.forEach((subscriber) => subscriber.email && emails.add(subscriber.email.toLowerCase()))
    users.value.forEach((user) => user.email && emails.add(user.email.toLowerCase()))
    return emails.size
  }
  return summary.total_subscribers
})

// Debounced subscriber search
let searchTimeout = null
watch(() => subscriberSearch.value, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (!isInitialLoad.value) {
      subscriberPagination.current_page = 1
      fetchSubscribers()
    }
  }, 500)
})

// API Functions
const fetchSubscribers = async () => {
  if (loadingSubscribers.value) return
  
  loadingSubscribers.value = true
  subscriberError.value = ''

  try {
    const { data } = await api.get('/api/admin/subscribers', {
      params: {
        page: subscriberPagination.current_page,
        per_page: subscriberPagination.per_page,
        search: subscriberSearch.value || undefined
      }
    })

    subscribers.value = data?.subscribers || []
    Object.assign(subscriberPagination, data?.pagination || {})
    summary.total_subscribers = data?.summary?.total_subscribers ?? summary.total_subscribers
  } catch (error) {
    subscribers.value = []
    subscriberError.value = error.response?.data?.error || 'Could not fetch subscribers.'
  } finally {
    loadingSubscribers.value = false
    isInitialLoad.value = false
  }
}

const fetchRecipients = async () => {
  if (loadingRecipients.value) return
  
  loadingRecipients.value = true

  try {
    const { data } = await api.get('/api/admin/management/recipients')
    users.value = data?.users || []
    allSubscribers.value = data?.subscribers || []
    Object.assign(summary, data?.summary || {})
  } catch (error) {
    users.value = []
    allSubscribers.value = []
    console.error('Failed to fetch recipients:', error)
  } finally {
    loadingRecipients.value = false
  }
}

const refreshAll = async () => {
  await Promise.all([fetchSubscribers(), fetchRecipients()])
}

const applySubscriberSearch = () => {
  subscriberPagination.current_page = 1
  fetchSubscribers()
}

const changeSubscriberPage = (page) => {
  if (page < 1 || page > subscriberPagination.pages || page === subscriberPagination.current_page) return
  subscriberPagination.current_page = page
  fetchSubscribers()
}

// Edit Subscriber Functions
const openEditSubscriber = (subscriber) => {
  editSubscriberId.value = subscriber.id
  editSubscriberForm.email = subscriber.email
  editSubscriberForm.name = subscriber.name || ''
  editSubscriberForm.message = subscriber.message || ''
  editSubscriberError.value = ''
  editSubscriberSuccess.value = ''
  editSubscriberModalOpen.value = true
}

const closeEditSubscriber = () => {
  editSubscriberModalOpen.value = false
  editSubscriberId.value = null
  editSubscriberForm.email = ''
  editSubscriberForm.name = ''
  editSubscriberForm.message = ''
  editSubscriberError.value = ''
  editSubscriberSuccess.value = ''
}

const updateSubscriber = async () => {
  if (!editSubscriberForm.email.trim()) {
    editSubscriberError.value = 'Email is required.'
    return
  }

  updatingSubscriber.value = true
  editSubscriberError.value = ''
  editSubscriberSuccess.value = ''

  try {
    const payload = {
      email: editSubscriberForm.email.trim(),
      name: editSubscriberForm.name.trim() || null,
      message: editSubscriberForm.message.trim() || null
    }

    await api.put(`/api/admin/subscribers/${editSubscriberId.value}`, payload)
    
    editSubscriberSuccess.value = 'Subscriber updated successfully!'
    
    // Refresh the list
    await fetchSubscribers()
    
    // Close modal after delay
    setTimeout(() => {
      closeEditSubscriber()
    }, 1500)
  } catch (error) {
    editSubscriberError.value = error.response?.data?.error || 'Could not update subscriber.'
  } finally {
    updatingSubscriber.value = false
  }
}

// Delete Subscriber
const deleteSubscriber = async (subscriber) => {
  const confirmed = window.confirm(`Delete subscriber "${subscriber.email}"? This action cannot be undone.`)
  if (!confirmed) return

  try {
    await api.delete(`/api/admin/subscribers/${subscriber.id}`)
    
    // Refresh the list
    await fetchSubscribers()
    
    // Show success message
    subscriberError.value = ''
    // You could add a toast notification here
  } catch (error) {
    subscriberError.value = error.response?.data?.error || 'Could not delete subscriber.'
  }
}

// Send Email
const sendEmail = async () => {
  emailMessage.value = ''

  if (!emailForm.subject.trim() || !emailForm.body.trim()) {
    emailMessageType.value = 'error'
    emailMessage.value = 'Subject and message are required.'
    return
  }

  if (emailForm.audience === 'specific_users' && emailForm.user_ids.length === 0) {
    emailMessageType.value = 'error'
    emailMessage.value = 'Select at least one user.'
    return
  }

  sendingEmail.value = true

  try {
    const payload = {
      audience: emailForm.audience,
      subject: emailForm.subject,
      body: emailForm.body
    }

    if (emailForm.audience === 'specific_users') {
      payload.user_ids = emailForm.user_ids
    }

    const { data } = await api.post('/api/admin/management/send-email', payload)

    emailMessageType.value = 'success'
    emailMessage.value = `${data?.message || 'Email dispatch started.'} Recipients: ${data?.recipient_count || estimatedRecipients.value}.`
    
    // Reset form after success
    setTimeout(() => {
      resetEmailForm()
    }, 3000)
  } catch (error) {
    emailMessageType.value = 'error'
    emailMessage.value = error.response?.data?.error || 'Could not send email.'
  } finally {
    sendingEmail.value = false
  }
}

const resetEmailForm = () => {
  emailForm.audience = 'subscribers'
  emailForm.subject = ''
  emailForm.body = ''
  emailForm.user_ids = []
  userSearch.value = ''
  emailMessage.value = ''
}

// Utility Functions
const formatDate = (value) => {
  if (!value) return 'N/A'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return parsed.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  })
}

// Lifecycle
onMounted(async () => {
  await refreshAll()
})
</script>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 250ms ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

/* Custom scrollbar for user selection */
.max-h-64::-webkit-scrollbar {
  width: 4px;
}
.max-h-64::-webkit-scrollbar-track {
  background: transparent;
}
.max-h-64::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 9999px;
}
.max-h-64::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
.dark .max-h-64::-webkit-scrollbar-thumb {
  background: #475569;
}
.dark .max-h-64::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>