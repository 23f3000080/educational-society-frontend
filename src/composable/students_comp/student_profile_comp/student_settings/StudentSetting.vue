<template>
    <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-emerald-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6 lg:space-y-8">
            <section class="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-emerald-900 dark:bg-gray-900/80 sm:p-8">
                <div class="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Student Settings</p>
                        <h1 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Control Your Learning Experience</h1>
                        <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
                            Manage notifications, privacy options, study preferences, and account behavior from one place.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <button
                            type="button"
                            @click="resetSettings"
                            class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            @click="saveSettings"
                            class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>

                <p v-if="statusMessage" class="mt-4 rounded-xl border px-4 py-3 text-sm font-semibold" :class="statusType === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'">
                    {{ statusMessage }}
                </p>
            </section>

            <section class="grid gap-6 xl:grid-cols-2">
                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Notifications</p>
                        <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Alert Preferences</h2>
                    </div>

                    <div class="mt-5 space-y-4">
                        <SettingToggle
                            label="Course updates"
                            description="Get notified when new videos, notes, or lessons are added."
                            v-model="settings.notifications.courseUpdates"
                        />
                        <SettingToggle
                            label="Assignment reminders"
                            description="Receive reminders before assignment due dates."
                            v-model="settings.notifications.assignmentReminders"
                        />
                        <SettingToggle
                            label="Payment and billing alerts"
                            description="Get payment status and billing updates instantly."
                            v-model="settings.notifications.paymentAlerts"
                        />
                        <SettingToggle
                            label="Product announcements"
                            description="Hear about new features and platform improvements."
                            v-model="settings.notifications.productAnnouncements"
                        />
                    </div>
                </article>

                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Learning</p>
                        <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Study Preferences</h2>
                    </div>

                    <div class="mt-5 space-y-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Default Video Quality</label>
                            <select
                                v-model="settings.learning.videoQuality"
                                class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
                            >
                                <option value="auto">Auto</option>
                                <option value="1080p">1080p</option>
                                <option value="720p">720p</option>
                                <option value="480p">480p</option>
                            </select>
                        </div>

                        <div class="space-y-1.5">
                            <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Reminder Frequency</label>
                            <select
                                v-model="settings.learning.reminderFrequency"
                                class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="only_due_dates">Only Due Dates</option>
                                <option value="off">Off</option>
                            </select>
                        </div>

                        <SettingToggle
                            label="Auto-play next lecture"
                            description="Automatically play the next video in your course sequence."
                            v-model="settings.learning.autoPlayNext"
                        />
                        <SettingToggle
                            label="Compact dashboard view"
                            description="Show more information cards in less space."
                            v-model="settings.learning.compactView"
                        />
                    </div>
                </article>

                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Privacy</p>
                        <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Account Visibility</h2>
                    </div>

                    <div class="mt-5 space-y-4">
                        <SettingToggle
                            label="Show profile to instructors"
                            description="Allow instructors to view your profile details during support."
                            v-model="settings.privacy.showProfileToInstructors"
                        />
                        <SettingToggle
                            label="Share progress insights"
                            description="Share your learning progress for better recommendations."
                            v-model="settings.privacy.shareProgressInsights"
                        />
                        <SettingToggle
                            label="Personalized course suggestions"
                            description="Use your activity to improve course recommendations."
                            v-model="settings.privacy.personalizedSuggestions"
                        />
                    </div>
                </article>

                <article class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Session</p>
                        <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Security And Access</h2>
                    </div>

                    <div class="mt-5 space-y-4">
                        <SettingToggle
                            label="Remember my login"
                            description="Keep your session active on this device for faster access."
                            v-model="settings.session.rememberLogin"
                        />

                        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                            If you use a shared computer, keep Remember Login disabled for better account safety.
                        </div>

                        <button
                            type="button"
                            @click="handleLogout"
                            class="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                        >
                            Logout From This Device
                        </button>
                    </div>
                </article>
            </section>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, h, reactive, ref } from 'vue'
import { logout } from '../../../../utils/auth'

const STORAGE_KEY = 'student_settings_preferences'

const defaultSettings = () => ({
    notifications: {
        courseUpdates: true,
        assignmentReminders: true,
        paymentAlerts: true,
        productAnnouncements: false
    },
    learning: {
        videoQuality: 'auto',
        reminderFrequency: 'daily',
        autoPlayNext: true,
        compactView: false
    },
    privacy: {
        showProfileToInstructors: true,
        shareProgressInsights: true,
        personalizedSuggestions: true
    },
    session: {
        rememberLogin: true
    }
})

const statusMessage = ref('')
const statusType = ref('success')

const settings = reactive(loadSettings())

function loadSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return defaultSettings()

        const parsed = JSON.parse(raw)
        return {
            notifications: {
                ...defaultSettings().notifications,
                ...(parsed.notifications || {})
            },
            learning: {
                ...defaultSettings().learning,
                ...(parsed.learning || {})
            },
            privacy: {
                ...defaultSettings().privacy,
                ...(parsed.privacy || {})
            },
            session: {
                ...defaultSettings().session,
                ...(parsed.session || {})
            }
        }
    } catch {
        return defaultSettings()
    }
}

function saveSettings() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
        statusType.value = 'success'
        statusMessage.value = 'Settings saved successfully.'
    } catch {
        statusType.value = 'error'
        statusMessage.value = 'Could not save settings. Please try again.'
    }
}

function resetSettings() {
    const fresh = defaultSettings()
    settings.notifications = { ...fresh.notifications }
    settings.learning = { ...fresh.learning }
    settings.privacy = { ...fresh.privacy }
    settings.session = { ...fresh.session }
    statusType.value = 'success'
    statusMessage.value = 'Settings reset to default values.'
}

function handleLogout() {
    logout()
}

const SettingToggle = defineComponent({
    name: 'SettingToggle',
    props: {
        label: { type: String, required: true },
        description: { type: String, default: '' },
        modelValue: { type: Boolean, default: false }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        return () =>
            h('div', { class: 'flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60' }, [
                h('div', { class: 'space-y-1' }, [
                    h('p', { class: 'text-sm font-semibold text-gray-900 dark:text-white' }, props.label),
                    h('p', { class: 'text-sm text-gray-600 dark:text-gray-400' }, props.description)
                ]),
                h('button', {
                    type: 'button',
                    class: `relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${props.modelValue ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`,
                    onClick: () => emit('update:modelValue', !props.modelValue)
                }, [
                    h('span', {
                        class: `inline-block h-5 w-5 rounded-full bg-white shadow transition ${props.modelValue ? 'translate-x-6' : 'translate-x-1'}`
                    })
                ])
            ])
    }
})
</script>