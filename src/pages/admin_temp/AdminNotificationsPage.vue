<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-purple-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-purple-950 dark:text-gray-100 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm dark:border-purple-900 dark:bg-gray-900/80 sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-purple-700 dark:text-purple-300">Admin Notifications</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Queries And Notification Center</h1>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
              Review support queries, resolve them with responses, and broadcast targeted notifications.
            </p>
          </div>
          <button
            type="button"
            @click="refreshAll"
            class="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400"
          >
            Refresh
          </button>
        </div>
      </section>

      <section class="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            @click="activeTab = 'queries'"
            class="rounded-xl px-4 py-2 text-sm font-semibold transition"
            :class="activeTab === 'queries' ? 'bg-purple-600 text-white dark:bg-purple-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'"
          >
            Query Inbox
          </button>
          <button
            type="button"
            @click="activeTab = 'notifications'"
            class="rounded-xl px-4 py-2 text-sm font-semibold transition"
            :class="activeTab === 'notifications' ? 'bg-purple-600 text-white dark:bg-purple-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'"
          >
            Create Notifications
          </button>
        </div>
      </section>

      <section v-if="activeTab === 'queries'" class="space-y-6">
        <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Queries" :value="querySummary.total_queries" />
          <StatCard title="Open" :value="querySummary.open_queries" />
          <StatCard title="In Progress" :value="querySummary.in_progress_queries" />
          <StatCard title="Resolved" :value="querySummary.resolved_queries" />
        </section>

        <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
          <div class="grid gap-3 md:grid-cols-3">
            <input
              v-model="queryFilters.search"
              type="text"
              placeholder="Search name, email, query"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            />
            <select
              v-model="queryFilters.status"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <input
              v-model="queryFilters.issue_type"
              type="text"
              placeholder="Filter by issue type"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            />
          </div>

          <div class="mt-3 flex gap-2">
            <button type="button" @click="applyQueryFilters" class="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400">Apply</button>
            <button type="button" @click="clearQueryFilters" class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Clear</button>
          </div>

          <p v-if="queryError" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            {{ queryError }}
          </p>

          <div class="mt-5 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead class="bg-gray-50 dark:bg-gray-950/50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Person</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Issue</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Raised</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                  <tr v-for="item in queries" :key="item.id" class="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950/30" @click="selectQuery(item)">
                    <td class="px-4 py-3 text-sm">
                      <p class="font-semibold text-gray-900 dark:text-white">{{ item.person_name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ item.email }}</p>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <p class="font-medium text-gray-700 dark:text-gray-200">{{ item.issue_type || 'General' }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{{ item.query_text }}</p>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="queryStatusBadge(item.status)">{{ item.status }}</span>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{{ formatDate(item.raised_at || item.created_at) }}</td>
                    <td class="px-4 py-3 text-sm">
                      <button type="button" @click.stop="openResolve(item)" class="rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400">
                        Resolve
                      </button>
                    </td>
                  </tr>
                  <tr v-if="!queryLoading && queries.length === 0">
                    <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No queries found.</td>
                  </tr>
                  <tr v-if="queryLoading">
                    <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">Loading queries...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between gap-3">
            <p class="text-sm text-gray-500 dark:text-gray-400">Page {{ queryPagination.current_page }} of {{ Math.max(1, queryPagination.pages) }}</p>
            <div class="flex gap-2">
              <button type="button" @click="changeQueryPage(queryPagination.current_page - 1)" :disabled="!queryPagination.has_prev" class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Prev</button>
              <button type="button" @click="changeQueryPage(queryPagination.current_page + 1)" :disabled="!queryPagination.has_next" class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Next</button>
            </div>
          </div>
        </section>

        <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Query Response Panel</h3>

          <div v-if="selectedQuery" class="mt-4 space-y-4">
            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ selectedQuery.person_name }} ({{ selectedQuery.email }})</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300"><span class="font-semibold">Issue:</span> {{ selectedQuery.issue_type || 'General' }}</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300"><span class="font-semibold">Query:</span> {{ selectedQuery.query_text }}</p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <select
                v-model="resolveForm.status"
                class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
              >
                <option value="resolved">Resolved</option>
                <option value="in_progress">In Progress</option>
                <option value="open">Open</option>
              </select>
              <button
                type="button"
                @click="submitResolution"
                :disabled="resolveSaving"
                class="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-purple-500 dark:hover:bg-purple-400"
              >
                {{ resolveSaving ? 'Saving...' : 'Update Query' }}
              </button>
            </div>

            <textarea
              v-model="resolveForm.response_text"
              rows="5"
              placeholder="Write your response to this query"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            ></textarea>

            <p v-if="resolveMessage" class="rounded-xl border px-4 py-3 text-sm font-semibold" :class="resolveType === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'">
              {{ resolveMessage }}
            </p>
          </div>

          <p v-else class="mt-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">
            Select a query from the table to review and resolve it.
          </p>
        </section>
      </section>

      <section v-else class="space-y-6">
        <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Create Notification</h3>

          <div class="mt-4 grid gap-3 md:grid-cols-2">
            <input
              v-model="notificationForm.title"
              type="text"
              placeholder="Notification title"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            />
            <select
              v-model="notificationForm.type"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
            </select>
            <select
              v-model="notificationForm.scope"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            >
              <option value="global">Global</option>
              <option value="single">Single User</option>
              <option value="multiple">Multiple Users</option>
            </select>
            <select
              v-if="notificationForm.scope === 'single'"
              v-model="notificationForm.user_id"
              class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            >
              <option value="">Select user</option>
              <option v-for="u in users" :key="u.id" :value="u.id">{{ u.full_name || u.email }} ({{ u.email }})</option>
            </select>
          </div>

          <div v-if="notificationForm.scope === 'multiple'" class="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Select users</p>
            <div class="mt-3 max-h-44 space-y-2 overflow-auto pr-1">
              <label v-for="u in users" :key="u.id" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                <input type="checkbox" :value="u.id" v-model="notificationForm.user_ids" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <span>{{ u.full_name || u.email }} ({{ u.email }})</span>
              </label>
            </div>
          </div>

          <textarea
            v-model="notificationForm.message"
            rows="5"
            placeholder="Notification message"
            class="mt-4 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-900"
          ></textarea>

          <div class="mt-4 flex gap-2">
            <button
              type="button"
              @click="createNotification"
              :disabled="notificationSaving"
              class="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-purple-500 dark:hover:bg-purple-400"
            >
              {{ notificationSaving ? 'Sending...' : 'Send Notification' }}
            </button>
            <button
              type="button"
              @click="resetNotificationForm"
              class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Clear
            </button>
          </div>

          <p v-if="notificationMessage" class="mt-4 rounded-xl border px-4 py-3 text-sm font-semibold" :class="notificationType === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'">
            {{ notificationMessage }}
          </p>
        </section>

        <section class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
          <div class="flex items-center justify-between gap-3">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Recent Notifications</h3>
            <button type="button" @click="fetchNotifications" class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Refresh</button>
          </div>

          <div class="mt-4 space-y-3">
            <div v-for="n in notifications" :key="n.id" class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ n.title }}</p>
                <span class="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">{{ n.is_global ? 'Global' : `${n.recipient_count} recipients` }}</span>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ n.message }}</p>
              <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">{{ formatDate(n.created_at) }} - {{ n.type || 'info' }}</p>
            </div>

            <p v-if="!notificationLoading && notifications.length === 0" class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">No notifications yet.</p>
            <p v-if="notificationLoading" class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/50 dark:text-gray-400">Loading notifications...</p>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, h, onMounted, reactive, ref } from 'vue'
import api from '../../services/axios'

const activeTab = ref('queries')

const queryLoading = ref(false)
const queryError = ref('')
const queries = ref([])
const selectedQuery = ref(null)

const querySummary = reactive({
  total_queries: 0,
  open_queries: 0,
  in_progress_queries: 0,
  resolved_queries: 0
})

const queryPagination = reactive({
  total: 0,
  pages: 1,
  current_page: 1,
  per_page: 10,
  has_next: false,
  has_prev: false
})

const queryFilters = reactive({
  search: '',
  status: '',
  issue_type: ''
})

const resolveForm = reactive({
  status: 'resolved',
  response_text: ''
})
const resolveSaving = ref(false)
const resolveMessage = ref('')
const resolveType = ref('success')

const notificationLoading = ref(false)
const notificationSaving = ref(false)
const notifications = ref([])
const users = ref([])

const notificationForm = reactive({
  title: '',
  message: '',
  type: 'info',
  scope: 'global',
  user_id: '',
  user_ids: []
})

const notificationMessage = ref('')
const notificationType = ref('success')

const fetchQueries = async () => {
  queryLoading.value = true
  queryError.value = ''

  try {
    const { data } = await api.get('/api/admin/queries', {
      params: {
        page: queryPagination.current_page,
        per_page: queryPagination.per_page,
        search: queryFilters.search || undefined,
        status: queryFilters.status || undefined,
        issue_type: queryFilters.issue_type || undefined
      }
    })

    queries.value = data?.queries || []
    Object.assign(querySummary, data?.summary || {})
    Object.assign(queryPagination, data?.pagination || {})

    if (!selectedQuery.value && queries.value.length) {
      selectQuery(queries.value[0])
    }
  } catch (error) {
    queries.value = []
    queryError.value = error.response?.data?.error || 'Could not fetch queries.'
  } finally {
    queryLoading.value = false
  }
}

const fetchUsers = async () => {
  try {
    const { data } = await api.get('/api/admin/users', { params: { page: 1, per_page: 300 } })
    users.value = data?.users || []
  } catch {
    users.value = []
  }
}

const fetchNotifications = async () => {
  notificationLoading.value = true

  try {
    const { data } = await api.get('/api/admin/notifications', { params: { page: 1, per_page: 30 } })
    notifications.value = data?.notifications || []
  } catch {
    notifications.value = []
  } finally {
    notificationLoading.value = false
  }
}

const refreshAll = async () => {
  await Promise.all([fetchQueries(), fetchNotifications(), fetchUsers()])
}

const selectQuery = (query) => {
  selectedQuery.value = query
  resolveForm.status = query.status || 'resolved'
  resolveForm.response_text = query.response_text || ''
  resolveMessage.value = ''
}

const openResolve = (query) => {
  selectQuery(query)
}

const submitResolution = async () => {
  if (!selectedQuery.value) return
  if (!resolveForm.response_text.trim()) {
    resolveType.value = 'error'
    resolveMessage.value = 'Response text is required.'
    return
  }

  resolveSaving.value = true
  resolveMessage.value = ''

  try {
    await api.put(`/api/admin/queries/${selectedQuery.value.id}/resolve`, {
      status: resolveForm.status,
      response_text: resolveForm.response_text
    })

    resolveType.value = 'success'
    resolveMessage.value = 'Query updated successfully.'
    await fetchQueries()
  } catch (error) {
    resolveType.value = 'error'
    resolveMessage.value = error.response?.data?.error || 'Could not update query.'
  } finally {
    resolveSaving.value = false
  }
}

const applyQueryFilters = () => {
  queryPagination.current_page = 1
  fetchQueries()
}

const clearQueryFilters = () => {
  queryFilters.search = ''
  queryFilters.status = ''
  queryFilters.issue_type = ''
  queryPagination.current_page = 1
  fetchQueries()
}

const changeQueryPage = (page) => {
  if (page < 1 || page > queryPagination.pages || page === queryPagination.current_page) return
  queryPagination.current_page = page
  fetchQueries()
}

const createNotification = async () => {
  notificationMessage.value = ''

  if (!notificationForm.title.trim() || !notificationForm.message.trim()) {
    notificationType.value = 'error'
    notificationMessage.value = 'Title and message are required.'
    return
  }

  if (notificationForm.scope === 'single' && !notificationForm.user_id) {
    notificationType.value = 'error'
    notificationMessage.value = 'Please select a user.'
    return
  }

  if (notificationForm.scope === 'multiple' && !notificationForm.user_ids.length) {
    notificationType.value = 'error'
    notificationMessage.value = 'Please select at least one user.'
    return
  }

  notificationSaving.value = true

  try {
    await api.post('/api/admin/notifications', {
      title: notificationForm.title,
      message: notificationForm.message,
      type: notificationForm.type,
      scope: notificationForm.scope,
      user_id: notificationForm.scope === 'single' ? notificationForm.user_id : undefined,
      user_ids: notificationForm.scope === 'multiple' ? notificationForm.user_ids : undefined
    })

    notificationType.value = 'success'
    notificationMessage.value = 'Notification sent successfully.'
    resetNotificationForm()
    await fetchNotifications()
  } catch (error) {
    notificationType.value = 'error'
    notificationMessage.value = error.response?.data?.error || 'Could not create notification.'
  } finally {
    notificationSaving.value = false
  }
}

const resetNotificationForm = () => {
  notificationForm.title = ''
  notificationForm.message = ''
  notificationForm.type = 'info'
  notificationForm.scope = 'global'
  notificationForm.user_id = ''
  notificationForm.user_ids = []
}

const queryStatusBadge = (status) => {
  const normalized = (status || '').toLowerCase()
  if (normalized === 'resolved') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
  if (normalized === 'in_progress') return 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
  return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
}

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

const StatCard = defineComponent({
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], default: 0 }
  },
  setup(props) {
    return () => h('div', { class: 'rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80' }, [
      h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.title),
      h('p', { class: 'mt-2 text-2xl font-bold text-gray-900 dark:text-white' }, String(props.value))
    ])
  }
})

onMounted(async () => {
  await refreshAll()
})
</script>
