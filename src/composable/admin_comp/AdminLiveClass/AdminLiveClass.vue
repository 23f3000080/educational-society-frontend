<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Live Class Management
          </h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Create, manage, and monitor all live classes</p>
        </div>
        <button
          @click="openCreateModal"
          class="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:shadow-xl hover:-translate-y-0.5"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Live Class
        </button>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, instructor or course..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
          </div>
          <select
            v-model="statusFilter"
            class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Live">Live</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            v-model="courseFilter"
            class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Courses</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.title }}
            </option>
          </select>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Total Classes</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ filteredClasses.length }}</p>
            </div>
            <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
              <VideoIcon class="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Scheduled</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ getStatusCount('Scheduled') }}</p>
            </div>
            <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center">
              <ClockIcon class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Completed</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ getStatusCount('Completed') }}</p>
            </div>
            <div class="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
              <CheckCircleIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Live</p>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ getStatusCount('Live') }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
              <LiveIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Live Classes Table/Cards -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <!-- Desktop Table View -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Class Details</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Schedule</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Instructor</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th class="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
              <tr v-for="liveClass in paginatedClasses" :key="liveClass.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td class="px-6 py-4">
                  <div>
                    <p class="font-medium text-slate-800 dark:text-white">{{ liveClass.title }}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">{{ getCourseTitle(liveClass.course_id) }}</p>
                    <p v-if="liveClass.description" class="text-xs text-slate-400 mt-1 line-clamp-1">{{ liveClass.description }}</p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm">
                    <div class="flex items-center text-slate-600 dark:text-slate-300">
                      <CalendarIcon class="w-3.5 h-3.5 mr-1" />
                      {{ formatDate(liveClass.start_time) }}
                    </div>
                    <div class="text-slate-400 text-xs mt-1">
                      {{ formatTime(liveClass.start_time) }} - {{ formatTime(liveClass.end_time) }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-slate-600 dark:text-slate-300">{{ liveClass.instructor_name || 'Not assigned' }}</span>
                </td>
                <td class="px-6 py-4">
                  <span :class="statusBadgeClass(liveClass.status)" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium">
                    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(liveClass.status)"></span>
                    {{ liveClass.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <router-link
                      :to="`/admin/live-classes/${liveClass.id}/room`"
                      class="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-200"
                    >
                      Open Room
                    </router-link>
                    <button
                      @click="viewClass(liveClass)"
                      class="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                      title="View Details"
                    >
                      <EyeIcon class="w-5 h-5" />
                    </button>
                    <button
                      @click="openEditModal(liveClass)"
                      class="p-1.5 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                      title="Edit"
                    >
                      <PencilIcon class="w-5 h-5" />
                    </button>
                    <button
                      @click="confirmDelete(liveClass)"
                      class="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      title="Delete"
                    >
                      <TrashIcon class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card View -->
        <div class="lg:hidden divide-y divide-slate-200 dark:divide-slate-700">
          <div v-for="liveClass in paginatedClasses" :key="liveClass.id" class="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <h3 class="font-semibold text-slate-800 dark:text-white">{{ liveClass.title }}</h3>
                <p class="text-sm text-indigo-600 dark:text-indigo-400">{{ getCourseTitle(liveClass.course_id) }}</p>
              </div>
              <span :class="statusBadgeClass(liveClass.status)" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                {{ liveClass.status }}
              </span>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex items-center text-slate-500 dark:text-slate-400">
                <CalendarIcon class="w-4 h-4 mr-2" />
                {{ formatDate(liveClass.start_time) }}
              </div>
              <div class="flex items-center text-slate-500 dark:text-slate-400">
                <ClockIcon class="w-4 h-4 mr-2" />
                {{ formatTime(liveClass.start_time) }} - {{ formatTime(liveClass.end_time) }}
              </div>
              <div class="flex items-center text-slate-500 dark:text-slate-400">
                <UserIcon class="w-4 h-4 mr-2" />
                {{ liveClass.instructor_name || 'Not assigned' }}
              </div>
            </div>
            <div class="flex justify-end gap-3 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
              <router-link :to="`/admin/live-classes/${liveClass.id}/room`" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Open Room</router-link>
              <button @click="viewClass(liveClass)" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View</button>
              <button @click="openEditModal(liveClass)" class="text-amber-600 hover:text-amber-700 text-sm font-medium">Edit</button>
              <button @click="confirmDelete(liveClass)" class="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
          <div class="text-sm text-slate-500 dark:text-slate-400">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredClasses.length) }} of {{ filteredClasses.length }} classes
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage * itemsPerPage >= filteredClasses.length"
              class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
              <h2 class="text-xl font-bold text-slate-800 dark:text-white">{{ isEditMode ? 'Edit Live Class' : 'Create New Live Class' }}</h2>
              <button @click="closeModal" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <XMarkIcon class="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            <form @submit.prevent="saveClass" class="p-6 space-y-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course *</label>
                <select
                  v-model="formData.course_id"
                  required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  <option value="" class="text-slate-500 dark:text-slate-400">Select Course</option>
                  <option v-for="course in courses" :key="course.id" :value="course.id" class="text-slate-900 dark:text-slate-100">{{ course.title }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="e.g., Advanced JavaScript Workshop"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  v-model="formData.description"
                  rows="3"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Class description..."
                ></textarea>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date & Time *</label>
                  <input
                    v-model="formData.start_time"
                    type="datetime-local"
                    required
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date & Time *</label>
                  <input
                    v-model="formData.end_time"
                    type="datetime-local"
                    required
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  >
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Instructor Name</label>
                  <input
                    v-model="formData.instructor_name"
                    type="text"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Instructor name"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meeting Link</label>
                  <input
                    v-model="formData.meeting_link"
                    type="url"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="https://meet.google.com/..."
                  >
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    v-model="formData.status"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  >
                    <option value="Scheduled" class="text-slate-900 dark:text-slate-100">Scheduled</option>
                    <option value="Ongoing" class="text-slate-900 dark:text-slate-100">Ongoing</option>
                    <option value="Completed" class="text-slate-900 dark:text-slate-100">Completed</option>
                    <option value="Cancelled" class="text-slate-900 dark:text-slate-100">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message to Students</label>
                  <input
                    v-model="formData.message"
                    type="text"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Optional announcement message"
                  >
                </div>
              </div>
              <div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button 
                  type="button" 
                  @click="closeModal" 
                  class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                  <span v-else>{{ isEditMode ? 'Update Class' : 'Create Class' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- View Details Modal -->
    <Teleport to="body">
      <div v-if="isViewModalOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeViewModal">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeViewModal"></div>
          <div class="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full">
            <div class="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
              <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Class Details</h2>
              <button @click="closeViewModal" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-300">
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
            <div class="p-6 space-y-4" v-if="selectedClass">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100">{{ selectedClass.title }}</h3>
                  <p class="text-indigo-600 dark:text-indigo-400 mt-1">{{ getCourseTitle(selectedClass.course_id) }}</p>
                </div>
                <span :class="statusBadgeClass(selectedClass.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                  {{ selectedClass.status }}
                </span>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Room ID</p>
                <p class="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">LC-{{ selectedClass.id }}</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div class="flex items-start gap-3">
                  <CalendarIcon class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Schedule</p>
                    <p class="font-medium text-slate-800 dark:text-slate-100">{{ formatDate(selectedClass.start_time) }}</p>
                    <p class="text-sm text-slate-600 dark:text-slate-300">{{ formatTime(selectedClass.start_time) }} - {{ formatTime(selectedClass.end_time) }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <UserIcon class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Instructor</p>
                    <p class="font-medium text-slate-800 dark:text-slate-100">{{ selectedClass.instructor_name || 'Not assigned' }}</p>
                  </div>
                </div>
                <div v-if="selectedClass.meeting_link" class="flex items-start gap-3">
                  <LinkIcon class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Meeting Link</p>
                    <a :href="selectedClass.meeting_link" target="_blank" class="text-indigo-600 dark:text-indigo-300 hover:underline break-all">{{ selectedClass.meeting_link }}</a>
                  </div>
                </div>
                <div v-if="selectedClass.message" class="flex items-start gap-3">
                  <MessageIcon class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Message</p>
                    <p class="text-slate-800 dark:text-slate-100">{{ selectedClass.message }}</p>
                  </div>
                </div>
              </div>
              <div v-if="selectedClass.description" class="border-t border-slate-200 dark:border-slate-700 pt-4">
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Description</p>
                <p class="text-slate-700 dark:text-slate-200">{{ selectedClass.description }}</p>
              </div>
            </div>
            <div class="border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-end">
              <button @click="closeViewModal" class="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Toast/Modal -->
    <Teleport to="body">
      <div v-if="deleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="deleteConfirm = false"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon class="w-6 h-6 text-red-600" />
            </div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white">Delete Live Class</h3>
            <p class="text-slate-500 dark:text-slate-400 mt-2">Are you sure you want to delete "{{ deleteConfirm.title }}"? This action cannot be undone.</p>
            <div class="flex gap-3 mt-6">
              <button @click="deleteConfirm = null" class="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
              <button @click="deleteClass" class="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notification -->
    <Teleport to="body">
      <div v-if="toast.show" class="fixed bottom-6 right-6 z-50 animate-slide-up">
        <div :class="{
          'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200': toast.type === 'success',
          'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200': toast.type === 'error',
          'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200': toast.type === 'info'
        }" class="flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg">
          <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5" />
          <XCircleIcon v-if="toast.type === 'error'" class="w-5 h-5" />
          <InformationCircleIcon v-if="toast.type === 'info'" class="w-5 h-5" />
          <p>{{ toast.message }}</p>
          <button @click="toast.show = false" class="ml-4 opacity-70 hover:opacity-100">
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../../services/axios.js'

// Heroicons (explicit imports so icons render reliably)
import {
  PlusIcon,
  MagnifyingGlassIcon as SearchIcon,
  VideoCameraIcon as VideoIcon,
  ClockIcon,
  CheckCircleIcon,
  PlayIcon as LiveIcon,
  CalendarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  LinkIcon,
  ChatBubbleLeftIcon as MessageIcon,
  UserIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

// State
const liveClasses = ref([])
const courses = ref([])
const searchQuery = ref('')
const statusFilter = ref('all')
const courseFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const isModalOpen = ref(false)
const isEditMode = ref(false)
const isViewModalOpen = ref(false)
const selectedClass = ref(null)
const deleteConfirm = ref(null)
const isSubmitting = ref(false)
const toast = ref({ show: false, message: '', type: 'success' })

// Form data
const formData = ref({
  course_id: '',
  title: '',
  description: '',
  start_time: '',
  end_time: '',
  meeting_link: '',
  instructor_name: '',
  message: '',
  status: 'Scheduled'
})

// Helper functions
const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

const isoToLocalDatetime = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatTime = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const getCourseTitle = (courseId) => {
  const course = courses.value.find(c => c.id === courseId)
  return course ? course.title : 'Unknown Course'
}

const getStatusCount = (status) => {
  return filteredClasses.value.filter(c => c.status === status).length
}

const statusBadgeClass = (status) => {
  const classes = {
    Scheduled: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    Live: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    Completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    Cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
  }
  return classes[status] || 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
}

const statusDotClass = (status) => {
  const classes = {
    Scheduled: 'bg-yellow-500',
    Live: 'bg-blue-500',
    Completed: 'bg-green-500',
    Cancelled: 'bg-red-500'
  }
  return classes[status] || 'bg-slate-500'
}

// Computed
const filteredClasses = computed(() => {
  let filtered = [...liveClasses.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(query) ||
      (c.instructor_name && c.instructor_name.toLowerCase().includes(query)) ||
      getCourseTitle(c.course_id).toLowerCase().includes(query)
    )
  }
  
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(c => c.status === statusFilter.value)
  }
  
  if (courseFilter.value !== 'all') {
    filtered = filtered.filter(c => c.course_id === parseInt(courseFilter.value))
  }
  
  return filtered
})

const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredClasses.value.slice(start, end)
})

// API Calls
const fetchLiveClasses = async () => {
  try {
    const response = await api.get('/api/admin/live-classes', { params: { per_page: 500 } })
    liveClasses.value = response.data.live_classes || []
  } catch (error) {
    console.error('Error fetching live classes:', error)
    showToast('Failed to fetch live classes', 'error')
  }
}

const fetchCourses = async () => {
  try {
    const response = await api.get('/api/admin/courses', { params: { page: 1, per_page: 500 } })
    courses.value = response.data.courses || []
  } catch (error) {
    console.error('Error fetching courses:', error)
  }
}

const createLiveClass = async () => {
  try {
    const payload = {
      course_id: parseInt(formData.value.course_id),
      title: formData.value.title,
      description: formData.value.description,
      start_time: new Date(formData.value.start_time).toISOString(),
      end_time: new Date(formData.value.end_time).toISOString(),
      meeting_link: formData.value.meeting_link,
      instructor_name: formData.value.instructor_name,
      message: formData.value.message,
      status: formData.value.status
    }
    
    const response = await api.post('/api/admin/live-classes', payload)
    if (response.data.live_class) {
      liveClasses.value.unshift(response.data.live_class)
      showToast('Live class created successfully')
      closeModal()
    }
  } catch (error) {
    console.error('Error creating live class:', error)
    showToast(error.response?.data?.message || 'Failed to create live class', 'error')
  }
}

const updateLiveClass = async () => {
  try {
    const payload = {
      course_id: parseInt(formData.value.course_id),
      title: formData.value.title,
      description: formData.value.description,
      start_time: new Date(formData.value.start_time).toISOString(),
      end_time: new Date(formData.value.end_time).toISOString(),
      meeting_link: formData.value.meeting_link,
      instructor_name: formData.value.instructor_name,
      message: formData.value.message,
      status: formData.value.status
    }
    
    const response = await api.put(`/api/admin/live-classes/${formData.value.id}`, payload)
    if (response.data.live_class) {
      const index = liveClasses.value.findIndex(c => c.id === formData.value.id)
      if (index !== -1) {
        liveClasses.value[index] = response.data.live_class
      }
      showToast('Live class updated successfully')
      closeModal()
    }
  } catch (error) {
    console.error('Error updating live class:', error)
    showToast(error.response?.data?.message || 'Failed to update live class', 'error')
  }
}

const deleteLiveClass = async (id) => {
  try {
    const response = await api.delete(`/api/admin/live-classes/${id}`)
    if (response.data.success !== false) {
      liveClasses.value = liveClasses.value.filter(c => c.id !== id)
      showToast('Live class deleted successfully')
    }
  } catch (error) {
    console.error('Error deleting live class:', error)
    showToast(error.response?.data?.message || 'Failed to delete live class', 'error')
  }
}

// Modal handlers
const openCreateModal = () => {
  isEditMode.value = false
  formData.value = {
    course_id: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    meeting_link: '',
    instructor_name: '',
    message: '',
    status: 'Scheduled'
  }
  isModalOpen.value = true
}

const openEditModal = (liveClass) => {
  isEditMode.value = true
  formData.value = {
    id: liveClass.id,
    course_id: liveClass.course_id,
    title: liveClass.title,
    description: liveClass.description || '',
    start_time: isoToLocalDatetime(liveClass.start_time),
    end_time: isoToLocalDatetime(liveClass.end_time),
    meeting_link: liveClass.meeting_link || '',
    instructor_name: liveClass.instructor_name || '',
    message: liveClass.message || '',
    status: liveClass.status
  }
  isModalOpen.value = true
}

const viewClass = (liveClass) => {
  selectedClass.value = liveClass
  isViewModalOpen.value = true
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedClass.value = null
}

const closeModal = () => {
  isModalOpen.value = false
  isEditMode.value = false
  formData.value = {
    course_id: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    meeting_link: '',
    instructor_name: '',
    message: '',
    status: 'Scheduled'
  }
}

const confirmDelete = (liveClass) => {
  deleteConfirm.value = liveClass
}

const deleteClass = async () => {
  if (deleteConfirm.value) {
    await deleteLiveClass(deleteConfirm.value.id)
    deleteConfirm.value = null
  }
}

const saveClass = async () => {
  isSubmitting.value = true
  try {
    if (isEditMode.value) {
      await updateLiveClass()
    } else {
      await createLiveClass()
    }
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchCourses()
  fetchLiveClasses()
})


</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 1;
}
</style>