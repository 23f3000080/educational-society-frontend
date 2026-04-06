<template>
    <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 px-4 py-6 text-gray-900 dark:from-slate-950 dark:via-gray-950 dark:to-emerald-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6">
            <header class="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-emerald-900 dark:bg-gray-900/80 sm:p-6">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">My Profile</h1>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                            Keep your profile details updated for smoother course communication.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <button
                            v-if="!isEditing"
                            type="button"
                            @click="startEdit"
                            class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                        >
                            Edit Profile
                        </button>
                        <template v-else>
                            <button
                                type="button"
                                @click="cancelEdit"
                                class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                @click="saveProfile"
                                :disabled="saving"
                                class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                            >
                                {{ saving ? 'Saving...' : 'Save Changes' }}
                            </button>
                        </template>
                    </div>
                </div>
            </header>

            <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
                    <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Student ID</p>
                    <p class="mt-2 text-lg font-bold text-gray-900 dark:text-white">{{ profile.user_id || 'N/A' }}</p>
                </div>
                <div class="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm dark:border-blue-900 dark:bg-blue-950/40">
                    <p class="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Email Status</p>
                    <p class="mt-2 text-lg font-bold text-blue-800 dark:text-blue-300">
                        {{ profile.is_email_verified ? 'Verified' : 'Not verified' }}
                    </p>
                </div>
                <div class="rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-sm dark:border-purple-900 dark:bg-purple-950/40">
                    <p class="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">Mobile Status</p>
                    <p class="mt-2 text-lg font-bold text-purple-800 dark:text-purple-300">
                        {{ profile.is_mobile_verified ? 'Verified' : 'Pending admin verification' }}
                    </p>
                </div>
                <div class="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm dark:border-amber-900 dark:bg-amber-950/40">
                    <p class="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Joined</p>
                    <p class="mt-2 text-lg font-bold text-amber-800 dark:text-amber-300">{{ formatDate(profile.joining_date) }}</p>
                </div>
            </section>

            <section v-if="successMessage" class="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                {{ successMessage }}
            </section>

            <section v-if="errorMessage" class="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                {{ errorMessage }}
            </section>

            <section v-if="loading" class="grid gap-4 lg:grid-cols-3">
                <div v-for="n in 3" :key="n" class="h-72 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/80"></div>
            </section>

            <section v-else class="grid gap-6 lg:grid-cols-3">
                <aside class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
                    <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 text-3xl font-bold text-white shadow-lg">
                        {{ initials }}
                    </div>
                    <h2 class="mt-4 text-center text-xl font-bold text-gray-900 dark:text-white">{{ fullName || 'Student' }}</h2>
                    <p class="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">{{ profile.email || 'N/A' }}</p>

                    <div class="mt-6 space-y-3">
                        <div class="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-950/60">
                            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Communication</p>
                            <p class="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">{{ profile.mode_of_communication || 'Not set' }}</p>
                        </div>
                        <div class="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-950/60">
                            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Location</p>
                            <p class="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">{{ locationLabel }}</p>
                        </div>
                    </div>
                </aside>

                <div class="space-y-6 lg:col-span-2">
                    <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                        <h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <FormField label="First Name" :editing="isEditing" v-model="draft.first_name" :display-value="profile.first_name" />
                            <FormField label="Last Name" :editing="isEditing" v-model="draft.last_name" :display-value="profile.last_name" />
                            <div class="space-y-1.5">
                                <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Gender</label>
                                <template v-if="isEditing">
                                    <select
                                        v-model="draft.gender"
                                        class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
                                    >
                                        <option value="">Select gender</option>
                                        <option v-for="option in genderOptions" :key="option" :value="option">
                                            {{ option }}
                                        </option>
                                    </select>
                                </template>
                                <p v-else class="rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 dark:bg-gray-950/60 dark:text-gray-200">
                                    {{ profile.gender || 'Not set' }}
                                </p>
                            </div>
                            <FormField label="Date of Birth" type="date" :editing="isEditing" v-model="draft.dob" :display-value="profile.dob" />
                        </div>
                    </div>

                    <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                        <h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">Contact & Address</h3>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <FormField label="Email" :editing="false" :display-value="profile.email" />
                            <FormField label="Primary Mobile" :editing="isEditing" v-model="draft.mobile_no" :display-value="profile.mobile_no" />
                            <FormField label="Alternate Mobile" :editing="isEditing" v-model="draft.alternate_mobile_no" :display-value="profile.alternate_mobile_no" />

                            <div class="space-y-1.5">
                                <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Country</label>
                                <template v-if="isEditing">
                                    <div ref="countryDropdownRef" class="relative">
                                        <button
                                            type="button"
                                            @click="toggleCountryDropdown"
                                            class="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-left text-sm text-gray-900 outline-none transition hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:hover:border-indigo-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
                                        >
                                            <span class="truncate">{{ draft.country || 'Select a country' }}</span>
                                            <span class="ml-3 text-gray-400">v</span>
                                        </button>

                                        <div
                                            v-if="countryDropdownOpen"
                                            class="absolute z-20 mt-2 w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900"
                                        >
                                            <input
                                                v-model="countrySearch"
                                                type="text"
                                                placeholder="Search country"
                                                class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
                                            />
                                            <div class="mt-3 max-h-56 overflow-auto pr-1">
                                                <button
                                                    v-for="country in filteredCountryOptions"
                                                    :key="country.isoCode"
                                                    type="button"
                                                    @click="selectCountry(country)"
                                                    class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    :class="draft.country === country.name ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-200'"
                                                >
                                                    <span class="truncate">{{ country.name }}</span>
                                                    <span v-if="draft.country === country.name" class="ml-3 text-xs font-semibold">Selected</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <p v-else class="rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 dark:bg-gray-950/60 dark:text-gray-200">
                                    {{ profile.country || 'Not set' }}
                                </p>
                            </div>

                            <div class="space-y-1.5">
                                <label class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">State</label>
                                <template v-if="isEditing">
                                    <select
                                        v-model="draft.state"
                                        class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900 dark:disabled:bg-gray-800"
                                        :disabled="!selectedCountryCode"
                                    >
                                        <option value="">{{ selectedCountryCode ? 'Select a state' : 'Select country first' }}</option>
                                        <option v-for="state in filteredStateOptions" :key="state.isoCode" :value="state.name">
                                            {{ state.name }}
                                        </option>
                                    </select>
                                </template>
                                <p v-else class="rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 dark:bg-gray-950/60 dark:text-gray-200">
                                    {{ profile.state || 'Not set' }}
                                </p>
                            </div>

                            <FormField label="City" :editing="isEditing" v-model="draft.city" :display-value="profile.city" />
                            <FormField label="Location" :editing="isEditing" v-model="draft.location" :display-value="profile.location" />
                            <FormField label="Pincode" :editing="isEditing" v-model="draft.pincode" :display-value="profile.pincode" />
                        </div>
                    </div>

                    <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                        <h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">Guardian Details</h3>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <FormField label="Parent/Guardian Name" :editing="isEditing" v-model="draft.parent_name" :display-value="profile.parent_name" />
                            <FormField label="Relation" :editing="isEditing" v-model="draft.parent_relation" :display-value="profile.parent_relation" />
                            <FormField label="Preferred Communication" :editing="isEditing" v-model="draft.mode_of_communication" :display-value="profile.mode_of_communication" />
                        </div>
                    </div>

                    <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
                        <h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
                        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Enter your current password first, then choose a new password.
                        </p>

                        <div class="grid gap-4 sm:grid-cols-2">
                            <FormField label="Current Password" type="password" :editing="true" v-model="passwordForm.current_password" />
                            <FormField label="New Password" type="password" :editing="true" v-model="passwordForm.new_password" />
                            <FormField label="Confirm New Password" type="password" :editing="true" v-model="passwordForm.confirm_password" />
                        </div>

                        <div class="mt-4 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                @click="changePassword"
                                :disabled="passwordSaving"
                                class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                            >
                                {{ passwordSaving ? 'Updating...' : 'Update Password' }}
                            </button>
                            <button
                                type="button"
                                @click="resetPasswordForm"
                                class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Clear
                            </button>
                        </div>

                        <p v-if="passwordSuccess" class="mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                            {{ passwordSuccess }}
                        </p>
                        <p v-if="passwordError" class="mt-3 text-sm font-semibold text-rose-700 dark:text-rose-300">
                            {{ passwordError }}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { Country, State } from 'country-state-city'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'
import api from '../../../services/axios'
import { getAuth } from '../../../utils/auth'

const emptyProfile = () => ({
    id: null,
    user_id: '',
    email: '',
    first_name: '',
    last_name: '',
    mobile_no: '',
    alternate_mobile_no: '',
    country: '',
    state: '',
    city: '',
    location: '',
    pincode: '',
    gender: '',
    dob: '',
    parent_name: '',
    parent_relation: '',
    mode_of_communication: '',
    joining_date: '',
    is_email_verified: false,
    is_mobile_verified: false,
    profile_picture: ''
})

const profile = ref(emptyProfile())
const draft = ref(emptyProfile())

const loading = ref(false)
const saving = ref(false)
const isEditing = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const passwordForm = ref({
    current_password: '',
    new_password: '',
    confirm_password: ''
})
const passwordSaving = ref(false)
const passwordError = ref('')
const passwordSuccess = ref('')

const countryDropdownOpen = ref(false)
const countrySearch = ref('')
const countryDropdownRef = ref(null)

const countryOptions = computed(() => Country.getAllCountries())

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']

const selectedCountryCode = computed(() => {
    const countryName = (draft.value.country || '').trim().toLowerCase()
    if (!countryName) return ''

    const match = countryOptions.value.find((country) => country.name.toLowerCase() === countryName)
    return match?.isoCode || ''
})

const filteredCountryOptions = computed(() => {
    const query = countrySearch.value.trim().toLowerCase()
    if (!query) return countryOptions.value

    return countryOptions.value.filter((country) => {
        const name = country.name.toLowerCase()
        const code = country.isoCode.toLowerCase()
        return name.includes(query) || code.includes(query)
    })
})

const filteredStateOptions = computed(() => {
    if (!selectedCountryCode.value) return []
    return State.getStatesOfCountry(selectedCountryCode.value)
})

const fullName = computed(() => `${profile.value.first_name || ''} ${profile.value.last_name || ''}`.trim())

const initials = computed(() => {
    const name = fullName.value || 'Student'
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((chunk) => chunk[0])
        .join('')
        .toUpperCase()
})

const locationLabel = computed(() => {
    const parts = [profile.value.location, profile.value.city, profile.value.state, profile.value.country]
        .filter((value) => value && String(value).trim())
    return parts.length ? parts.join(', ') : 'Not set'
})

const closeCountryDropdown = () => {
    countryDropdownOpen.value = false
    countrySearch.value = ''
}

const toggleCountryDropdown = () => {
    countryDropdownOpen.value = !countryDropdownOpen.value
    if (countryDropdownOpen.value) {
        countrySearch.value = ''
    }
}

const selectCountry = (country) => {
    draft.value.country = country.name
    draft.value.state = ''
    closeCountryDropdown()
}

const handleDocumentClick = (event) => {
    if (!countryDropdownOpen.value) return

    const root = countryDropdownRef.value
    if (root && !root.contains(event.target)) {
        closeCountryDropdown()
    }
}

const normalizeDraft = () => {
    draft.value = {
        ...profile.value,
        dob: profile.value.dob || ''
    }
}

const hydrateFromAuthFallback = () => {
    const { user } = getAuth()
    if (!user) return

    profile.value = {
        ...emptyProfile(),
        id: user.id ?? null,
        user_id: user.user_id || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || ''
    }
    normalizeDraft()
}

const loadProfile = async () => {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
        const { data } = await api.get('/api/student/profile')
        profile.value = {
            ...emptyProfile(),
            ...(data || {})
        }
        normalizeDraft()
    } catch (error) {
        hydrateFromAuthFallback()
        errorMessage.value = error.response?.data?.error || 'Could not load full profile. Showing basic account details.'
    } finally {
        loading.value = false
    }
}

const startEdit = () => {
    successMessage.value = ''
    errorMessage.value = ''
    normalizeDraft()
    isEditing.value = true
}

const resetPasswordForm = () => {
    passwordForm.value = {
        current_password: '',
        new_password: '',
        confirm_password: ''
    }
    passwordError.value = ''
    passwordSuccess.value = ''
}

const cancelEdit = () => {
    normalizeDraft()
    isEditing.value = false
    errorMessage.value = ''
    successMessage.value = ''
}

const saveProfile = async () => {
    saving.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
        const payload = {
            first_name: draft.value.first_name,
            last_name: draft.value.last_name,
            mobile_no: draft.value.mobile_no,
            alternate_mobile_no: draft.value.alternate_mobile_no,
            country: draft.value.country,
            state: draft.value.state,
            city: draft.value.city,
            location: draft.value.location,
            pincode: draft.value.pincode,
            gender: draft.value.gender,
            dob: draft.value.dob || null,
            parent_name: draft.value.parent_name,
            parent_relation: draft.value.parent_relation,
            mode_of_communication: draft.value.mode_of_communication
        }

        const { data } = await api.put('/api/student/profile', payload)
        profile.value = {
            ...emptyProfile(),
            ...(data?.profile || profile.value)
        }

        normalizeDraft()
        isEditing.value = false
        successMessage.value = data?.message || 'Profile updated successfully.'

        const { user } = getAuth()
        if (user) {
            const updatedUser = {
                ...user,
                first_name: profile.value.first_name,
                last_name: profile.value.last_name
            }

            if (sessionStorage.getItem('user')) {
                sessionStorage.setItem('user', JSON.stringify(updatedUser))
            }
            if (localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(updatedUser))
            }
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.error || 'Could not update profile. Please try again.'
    } finally {
        saving.value = false
    }
}

const changePassword = async () => {
    passwordSaving.value = true
    passwordError.value = ''
    passwordSuccess.value = ''

    try {
        const { data } = await api.post('/api/student/change-password', {
            current_password: passwordForm.value.current_password,
            new_password: passwordForm.value.new_password,
            confirm_password: passwordForm.value.confirm_password
        })

        resetPasswordForm()
        passwordSuccess.value = data?.message || 'Password updated successfully.'
    } catch (error) {
        passwordError.value = error.response?.data?.error || 'Could not update password. Please try again.'
    } finally {
        passwordSaving.value = false
    }
}

const formatDate = (value) => {
    if (!value) return 'N/A'
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return value
    return parsed.toLocaleDateString('en-IN', {
        dateStyle: 'medium',
        timeZone: 'Asia/Kolkata'
    })
}

const FormField = defineComponent({
    name: 'FormField',
    props: {
        label: { type: String, required: true },
        modelValue: { type: String, default: '' },
        displayValue: { type: [String, Number], default: '' },
        editing: { type: Boolean, default: false },
        type: { type: String, default: 'text' }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        return () =>
            h('div', { class: 'space-y-1.5' }, [
                h('label', { class: 'text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400' }, props.label),
                props.editing
                    ? h('input', {
                          type: props.type,
                          value: props.modelValue ?? '',
                          onInput: (event) => emit('update:modelValue', event.target.value),
                          class: 'w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950/60 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900'
                      })
                    : h('p', { class: 'rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 dark:bg-gray-950/60 dark:text-gray-200' }, props.displayValue && String(props.displayValue).trim() ? String(props.displayValue) : 'Not set')
            ])
    }
})

onMounted(() => {
    loadProfile()
    document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick)
})
</script>
