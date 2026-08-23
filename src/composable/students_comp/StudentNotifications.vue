<template>
    <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-indigo-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6">
            <header class="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm dark:border-indigo-900 dark:bg-gray-900/80 sm:p-6">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Notifications</h1>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                            See global updates and personal notifications in one place.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <button
                            type="button"
                            @click="refreshNotifications"
                            :disabled="loading"
                            class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            {{ loading ? 'Refreshing...' : 'Refresh' }}
                        </button>
                        <button
                            type="button"
                            @click="markVisibleAsRead"
                            :disabled="markingAll || unreadVisibleCount === 0"
                            class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                        >
                            {{ markingAll ? 'Marking...' : 'Mark visible as read' }}
                        </button>
                    </div>
                </div>
            </header>

            <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
                    <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total</p>
                    <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">All notifications</p>
                </div>
                <div class="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm dark:border-amber-900 dark:bg-amber-950/40">
                    <p class="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Unread</p>
                    <p class="mt-2 text-3xl font-bold text-amber-800 dark:text-amber-300">{{ stats.unread }}</p>
                    <p class="mt-1 text-xs text-amber-700/90 dark:text-amber-300/80">Need your attention</p>
                </div>
                <div class="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm dark:border-blue-900 dark:bg-blue-950/40">
                    <p class="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Global</p>
                    <p class="mt-2 text-3xl font-bold text-blue-800 dark:text-blue-300">{{ stats.global }}</p>
                    <p class="mt-1 text-xs text-blue-700/90 dark:text-blue-300/80">Shared with all users</p>
                </div>
                <div class="rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-sm dark:border-purple-900 dark:bg-purple-950/40">
                    <p class="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">Personal</p>
                    <p class="mt-2 text-3xl font-bold text-purple-800 dark:text-purple-300">{{ stats.personal }}</p>
                    <p class="mt-1 text-xs text-purple-700/90 dark:text-purple-300/80">Sent only to you</p>
                </div>
            </section>

            <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-5">
                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search title, message, or type"
                        class="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900 md:max-w-md"
                    />

                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="item in filters"
                            :key="item"
                            type="button"
                            @click="activeFilter = item"
                            :class="[
                                'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                                activeFilter === item
                                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            ]"
                        >
                            {{ item }}
                        </button>
                    </div>
                </div>
            </section>

            <section v-if="loading" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="n in 6"
                    :key="n"
                    class="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/80"
                ></div>
            </section>

            <section
                v-else-if="errorMessage"
                class="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
            >
                <p class="font-semibold">{{ errorMessage }}</p>
                <button
                    type="button"
                    @click="refreshNotifications"
                    class="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
                >
                    Retry
                </button>
            </section>

            <section
                v-else-if="filteredNotifications.length === 0"
                class="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900/80"
            >
                <p class="text-gray-600 dark:text-gray-300">No notifications match your current filter.</p>
            </section>

            <section v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <article
                    v-for="notification in filteredNotifications"
                    :key="notification.id"
                    :id="notificationDomId(notification)"
                    @click="openNotification(notification)"
                    class="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-indigo-800"
                >
                    <div class="mb-3 flex items-start justify-between gap-3">
                        <div>
                            <div class="mb-2 flex flex-wrap gap-2">
                                <span :class="sourceBadgeClass(notification)" class="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide">
                                    {{ notification.is_global ? 'Global' : 'Personal' }}
                                </span>
                                <span v-if="notification.type" class="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                    {{ notification.type }}
                                </span>
                                <span
                                    v-if="!notification.is_read"
                                    class="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                                >
                                    Unread
                                </span>
                            </div>
                            <h2 class="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">{{ notification.title }}</h2>
                        </div>
                    </div>

                    <p class="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{{ notification.message }}</p>

                    <div class="mt-4 flex items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <p>
                            Created: <span class="font-medium text-gray-700 dark:text-gray-200">{{ formatDateTime(notification.created_at) }}</span>
                        </p>
                        <span class="font-medium text-indigo-600 dark:text-indigo-300">Open</span>
                    </div>

                    <button
                        v-if="!notification.is_read"
                        type="button"
                        @click.stop="markOneAsRead(notification)"
                        class="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                        Mark as read
                    </button>
                    <p
                        v-else
                        class="mt-4 w-full rounded-xl bg-emerald-100 px-4 py-2.5 text-center text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                    >
                        Read
                    </p>
                </article>
            </section>

            <Teleport to="body">
                <Transition name="modal">
                    <div
                        v-if="selectedNotification"
                        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm sm:py-8"
                        @click.self="closeNotificationDetails"
                    >
                        <div class="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                            <div class="flex items-start justify-between gap-4">
                                <div class="min-w-0">
                                    <div class="mb-2 flex flex-wrap gap-2">
                                        <span :class="sourceBadgeClass(selectedNotification)" class="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide">
                                            {{ selectedNotification.is_global ? 'Global' : 'Personal' }}
                                        </span>
                                        <span v-if="selectedNotification.type" class="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                            {{ selectedNotification.type }}
                                        </span>
                                        <span
                                            v-if="!selectedNotification.is_read"
                                            class="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                                        >
                                            Unread
                                        </span>
                                    </div>
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                                        {{ selectedNotification.title }}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    @click="closeNotificationDetails"
                                    class="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Close
                                </button>
                            </div>

                            <div class="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
                                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Message</p>
                                <p class="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700 dark:text-gray-200">
                                    {{ selectedNotification.message }}
                                </p>
                            </div>

                            <div class="mt-4 grid gap-3 sm:grid-cols-2">
                                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/80">
                                    <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Created</p>
                                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                                        {{ formatDateTime(selectedNotification.created_at) }}
                                    </p>
                                </div>
                                <div class="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/80">
                                    <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</p>
                                    <p class="mt-1 text-sm font-medium" :class="selectedNotification.is_read ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'">
                                        {{ selectedNotification.is_read ? 'Read' : 'Unread' }}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-5 flex flex-wrap justify-end gap-2">
                                <button
                                    v-if="!selectedNotification.is_read"
                                    type="button"
                                    @click="markOneAsRead(selectedNotification)"
                                    class="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                                >
                                    Mark as read
                                </button>
                                <button
                                    type="button"
                                    @click="closeNotificationDetails"
                                    class="rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition>
            </Teleport>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios'
import { getAuth } from '../../utils/auth'

const route = useRoute()
const router = useRouter()

const notifications = ref([])
const loading = ref(false)
const markingAll = ref(false)
const errorMessage = ref('')
const selectedNotification = ref(null)

const searchQuery = ref('')
const activeFilter = ref('All')
const filters = ['All', 'Unread', 'Global', 'Personal']

const currentUserId = computed(() => {
    const { user } = getAuth()
    return user?.id ?? null
})

const filteredNotifications = computed(() => {
    let list = notifications.value

    if (activeFilter.value === 'Unread') {
        list = list.filter((item) => !item.is_read)
    } else if (activeFilter.value === 'Global') {
        list = list.filter((item) => item.is_global)
    } else if (activeFilter.value === 'Personal') {
        list = list.filter((item) => !item.is_global)
    }

    const query = searchQuery.value.trim().toLowerCase()
    if (query) {
        list = list.filter((item) =>
            String(item.title || '').toLowerCase().includes(query) ||
            String(item.message || '').toLowerCase().includes(query) ||
            String(item.type || '').toLowerCase().includes(query)
        )
    }

    return list
})

const unreadVisibleCount = computed(() =>
    filteredNotifications.value.filter((item) => !item.is_read).length
)

const stats = computed(() => ({
    total: notifications.value.length,
    unread: notifications.value.filter((item) => !item.is_read).length,
    global: notifications.value.filter((item) => item.is_global).length,
    personal: notifications.value.filter((item) => !item.is_global).length
}))

const formatDateTime = (value) => {
    if (!value) return 'N/A'
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return value

    return parsed.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata'
    })
}

const sourceBadgeClass = (notification) => {
    if (notification.is_global) {
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
    }
    return 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
}

const notificationDomId = (notification) => `notification-${notification.id}`

const scrollToNotification = async (notificationId) => {
    if (!notificationId) return

    await nextTick()
    const element = document.getElementById(notificationDomId({ id: notificationId }))
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.classList.add('ring-2', 'ring-indigo-400', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-gray-950')
        window.setTimeout(() => {
            element.classList.remove('ring-2', 'ring-indigo-400', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-gray-950')
        }, 1600)
    }
}

const openNotification = async (notification) => {
    await markOneAsRead(notification)
    selectedNotification.value = notification
    await router.push({ path: '/student/notifications', hash: `#${notificationDomId(notification)}` })
}

const closeNotificationDetails = () => {
    selectedNotification.value = null
}

const refreshNotifications = async () => {
    if (!currentUserId.value) {
        errorMessage.value = 'User not found. Please login again.'
        return
    }

    loading.value = true
    errorMessage.value = ''

    try {
        const { data } = await api.get(`/api/notifications/${currentUserId.value}`)
        notifications.value = Array.isArray(data) ? data : []
        const hashMatch = route.hash?.match(/^#notification-(\d+)$/)
        if (hashMatch) {
            const target = notifications.value.find((item) => String(item.id) === hashMatch[1])
            if (target) {
                selectedNotification.value = target
            }
            await scrollToNotification(hashMatch[1])
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.error || 'Failed to load notifications.'
    } finally {
        loading.value = false
    }
}

const markOneAsRead = async (notification) => {
    if (notification.is_read || !currentUserId.value) return

    try {
        await api.post('/api/notifications/mark_read', {
            user_id: currentUserId.value,
            notification_id: notification.id
        })
        notification.is_read = true
    } catch (error) {
        errorMessage.value = error.response?.data?.error || 'Failed to mark notification as read.'
    }
}

const markVisibleAsRead = async () => {
    if (!currentUserId.value || unreadVisibleCount.value === 0) return

    markingAll.value = true
    errorMessage.value = ''

    try {
        const toMark = filteredNotifications.value.filter((item) => !item.is_read)
        await Promise.all(
            toMark.map((item) =>
                api.post('/api/notifications/mark_read', {
                    user_id: currentUserId.value,
                    notification_id: item.id
                })
            )
        )
        toMark.forEach((item) => {
            item.is_read = true
        })
    } catch (error) {
        errorMessage.value = error.response?.data?.error || 'Failed to mark notifications as read.'
    } finally {
        markingAll.value = false
    }
}

onMounted(() => {
    refreshNotifications()
})

watch(
    () => route.hash,
    (hash) => {
        const match = hash?.match(/^#notification-(\d+)$/)
        if (match) {
            scrollToNotification(match[1])
        }
        if (!match) {
            selectedNotification.value = null
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.line-clamp-2 {
    line-clamp: 2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-1 {
    line-clamp: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    line-clamp: 3;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>