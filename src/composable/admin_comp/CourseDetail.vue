<!-- views/admin/CourseDetail.vue -->

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Back Button -->
      <button @click="goBack" class="mb-6 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Courses
      </button>

      <!-- Course Header -->
      <div v-if="course" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ course.title }}</h1>
              <span :class="course.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                class="px-2 py-1 rounded-full text-xs font-medium">
                {{ course.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-400">{{ course.course_code }} | {{ course.subject }} | {{ course.class_level }}</p>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <button @click="editCourse(course)" title="Edit course details" class="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
              Edit Course
            </button>
            <button @click="openAddWeekModal" title="Add a new week to this course" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <svg class="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Week
            </button>
          </div>
        </div>
      </div>

      <!-- Weeks List -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>

      <div v-else-if="weeks.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <svg class="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No weeks created yet</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Start by adding your first week to this course</p>
          <button @click="openAddWeekModal" title="Add the first week to this course" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add First Week
        </button>
      </div>

      <div v-else class="space-y-6">
        <div v-for="week in weeks" :key="week.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- Week Header -->
          <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Week {{ week.week_number }}: {{ week.title }}
              </h2>
              <p v-if="week.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ week.description }}</p>
            </div>
            <div class="flex items-center space-x-2 mt-2 md:mt-0">
              <button @click="editWeek(week)" title="Edit week details" class="p-2 text-blue-600  dark:text-blue-400 hover:text-blue-300 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button @click="confirmDeleteWeek(week)" title="Delete this week" class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Week Content Tabs -->
          <div class="p-6">
            <div class="border-b border-gray-200 dark:border-gray-700">
              <nav class="flex space-x-8">
                <button @click="activeTab = 'videos'" title="Show videos in this week" :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'videos'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                ]">
                  Videos ({{ week.videos.length }})
                </button>
                <button @click="activeTab = 'assignments'" title="Show assignments in this week" :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'assignments'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                ]">
                  Assignments ({{ week.assignments.length }})
                </button>
                <button @click="activeTab = 'notes'" title="Show notes in this week" :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'notes'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                ]">
                  Notes ({{ week.notes.length }})
                </button>
              </nav>
            </div>

            <!-- Videos Tab -->
            <div v-if="activeTab === 'videos'" class="mt-6">
              <div class="flex justify-end mb-4">
                <button @click="openAddVideoModal(week)" title="Add a new video to this week" class="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Video
                </button>
              </div>

              <div v-if="week.videos.length === 0" class="text-center py-8 text-gray-500">
                No videos added yet
              </div>

              <div v-else class="space-y-3">
                <div v-for="video in week.videos" :key="video.id"
                  class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <button
                      type="button"
                      @click="previewVideo(video)"
                      class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                      :title="`Play ${video.title}`"
                    >
                      <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div>
                      <button
                        type="button"
                        @click="previewVideo(video)"
                        class="font-medium text-left text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300"
                      >
                        {{ video.title }}
                      </button>
                      <p class="text-sm text-gray-500">{{ video.duration ? formatDuration(video.duration) : 'No duration' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="previewVideo(video)" class="p-1 text-green-600 hover:text-green-800" title="Preview and play video">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <button @click="editVideo(video)" class="p-1 text-blue-600 hover:text-blue-800" title="Edit video details">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmDeleteVideo(video)" class="p-1 text-red-600 hover:text-red-800" title="Delete video">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Assignments Tab -->
            <div v-if="activeTab === 'assignments'" class="mt-6">
              <div class="flex justify-end mb-4">
                <button @click="openAddAssignmentModal(week)" title="Add a new assignment to this week" class="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Assignment
                </button>
              </div>

              <div v-if="week.assignments.length === 0" class="text-center py-8 text-gray-500">
                No assignments added yet
              </div>

              <div v-else class="space-y-3">
                <div v-for="assignment in week.assignments" :key="assignment.id"
                  class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ assignment.title }}</p>
                      <p class="text-sm text-gray-500">Due: {{ assignment.due_date ? formatDate(assignment.due_date) : 'No due date' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <router-link :to="`/admin/assignments/${assignment.id}`" title="Open assignment questions" class="p-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </router-link>
                    <button @click="editAssignment(assignment)" title="Edit assignment" class="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmDeleteAssignment(assignment)" title="Delete assignment" class="p-1 text-red-600 hover:text-red-800">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes Tab -->
            <div v-if="activeTab === 'notes'" class="mt-6">
              <div class="flex justify-end mb-4">
                <button @click="openAddNoteModal(week)" title="Add a new note to this week" class="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Note
                </button>
              </div>

              <div v-if="week.notes.length === 0" class="text-center py-8 text-gray-500">
                No notes added yet
              </div>

              <div v-else class="space-y-3">
                <div v-for="note in week.notes" :key="note.id"
                  class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ note.title }}</p>
                      <p class="text-sm text-gray-500">{{ note.description || 'No description' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <a :href="note.file_url" target="_blank" title="Open note file" class="p-1 text-green-600 hover:text-green-800">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                    <button @click="editNote(note)" title="Edit note" class="p-1 text-blue-600 hover:text-blue-800">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmDeleteNote(note)" title="Delete note" class="p-1 text-red-600 hover:text-red-800">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CourseModal
      v-if="showCourseModal"
      :course="selectedCourse"
      :mode="courseModalMode"
      @close="closeCourseModal"
      @save="handleCourseSave"
    />

    <div v-if="showVideoPreview" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-black/70" @click="closeVideoPreview"></div>
      <div class="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div class="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedPreviewVideo?.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Playing uploaded video link</p>
            </div>
            <button @click="closeVideoPreview" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="bg-black">
            <iframe
              v-if="selectedPreviewVideo && isEmbeddableVideo(selectedPreviewVideo.url)"
              :src="getVideoEmbedUrl(selectedPreviewVideo.url)"
              class="h-[60vh] w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
            ></iframe>
            <video
              v-else-if="selectedPreviewVideo"
              :src="selectedPreviewVideo.url"
              class="h-[60vh] w-full"
              controls
              autoplay
            ></video>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <WeekModal
      v-if="showWeekModal"
      :week="selectedWeek"
      :course-id="courseId"
      :mode="weekModalMode"
      @close="closeWeekModal"
      @save="handleWeekSave"
    />

    <VideoModal
      v-if="showVideoModal"
      :video="selectedVideo"
      :week-id="selectedWeekId"
      :mode="videoModalMode"
      @close="closeVideoModal"
      @save="handleVideoSave"
    />

    <AssignmentModal
      v-if="showAssignmentModal"
      :assignment="selectedAssignment"
      :week-id="selectedWeekId"
      :mode="assignmentModalMode"
      @close="closeAssignmentModal"
      @save="handleAssignmentSave"
    />

    <NoteModal
      v-if="showNoteModal"
      :note="selectedNote"
      :week-id="selectedWeekId"
      :mode="noteModalMode"
      @close="closeNoteModal"
      @save="handleNoteSave"
    />

    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :item="itemToDelete"
      :item-type="deleteItemType"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/axios.js'
import WeekModal from '../../components/admin/WeekModal.vue'
import VideoModal from '../../components/admin/VideoModal.vue'
import AssignmentModal from '../../components/admin/AssignmentModal.vue'
import NoteModal from '../../components/admin/NoteModal.vue'
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal.vue'
import CourseModal from '../../components/admin/CourseModal.vue'

const route = useRoute()
const router = useRouter()
const courseId = route.params.id

const loading = ref(false)
const course = ref(null)
const weeks = ref([])
const activeTab = ref('videos')

// Modal states
const showWeekModal = ref(false)
const weekModalMode = ref('create')
const selectedWeek = ref(null)

const showVideoModal = ref(false)
const videoModalMode = ref('create')
const selectedVideo = ref(null)
const selectedWeekId = ref(null)

const showAssignmentModal = ref(false)
const assignmentModalMode = ref('create')
const selectedAssignment = ref(null)

const showNoteModal = ref(false)
const noteModalMode = ref('create')
const selectedNote = ref(null)

const showCourseModal = ref(false)
const courseModalMode = ref('edit')
const selectedCourse = ref(null)
const showVideoPreview = ref(false)
const selectedPreviewVideo = ref(null)

// Delete modal
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const deleteItemType = ref('')

// Fetch course and weeks
const fetchCourseDetails = async () => {
  loading.value = true
  try {
    const courseResponse = await api.get(`/api/admin/courses/${courseId}`)
    course.value = courseResponse.data
    
    const weeksResponse = await api.get(`/api/admin/courses/${courseId}/weeks`)
    weeks.value = weeksResponse.data
  } catch (error) {
    console.error('Error fetching course details:', error)
  } finally {
    loading.value = false
  }
}

// Week functions
const openAddWeekModal = () => {
  weekModalMode.value = 'create'
  selectedWeek.value = null
  showWeekModal.value = true
}

const editWeek = (week) => {
  weekModalMode.value = 'edit'
  selectedWeek.value = { ...week }
  showWeekModal.value = true
}

const closeWeekModal = () => {
  showWeekModal.value = false
  selectedWeek.value = null
}

const handleWeekSave = async (weekData) => {
  try {
    if (weekModalMode.value === 'create') {
      await api.post(`/api/admin/courses/${courseId}/weeks`, weekData)
    } else {
      await api.put(`/api/admin/weeks/${selectedWeek.value.id}`, weekData)
    }
    await fetchCourseDetails()
    closeWeekModal()
  } catch (error) {
    console.error('Error saving week:', error)
  }
}

// Video functions
const openAddVideoModal = (week) => {
  videoModalMode.value = 'create'
  selectedVideo.value = null
  selectedWeekId.value = week.id
  showVideoModal.value = true
}

const editVideo = (video) => {
  videoModalMode.value = 'edit'
  selectedVideo.value = { ...video }
  selectedWeekId.value = video.week_id
  showVideoModal.value = true
}

const closeVideoModal = () => {
  showVideoModal.value = false
  selectedVideo.value = null
  selectedWeekId.value = null
}

const handleVideoSave = async (videoData) => {
  try {
    if (videoModalMode.value === 'create') {
      await api.post(`/api/admin/weeks/${selectedWeekId.value}/videos`, videoData)
    } else {
      await api.put(`/api/admin/videos/${selectedVideo.value.id}`, videoData)
    }
    await fetchCourseDetails()
    closeVideoModal()
  } catch (error) {
    console.error('Error saving video:', error)
  }
}

// Assignment functions
const openAddAssignmentModal = (week) => {
  assignmentModalMode.value = 'create'
  selectedAssignment.value = null
  selectedWeekId.value = week.id
  showAssignmentModal.value = true
}

const editAssignment = (assignment) => {
  assignmentModalMode.value = 'edit'
  selectedAssignment.value = { ...assignment }
  selectedWeekId.value = assignment.week_id
  showAssignmentModal.value = true
}

const closeAssignmentModal = () => {
  showAssignmentModal.value = false
  selectedAssignment.value = null
  selectedWeekId.value = null
}

const handleAssignmentSave = async (assignmentData) => {
  try {
    if (assignmentModalMode.value === 'create') {
      await api.post(`/api/admin/weeks/${selectedWeekId.value}/assignments`, assignmentData)
    } else {
      await api.put(`/api/admin/assignments/${selectedAssignment.value.id}`, assignmentData)
    }
    await fetchCourseDetails()
    closeAssignmentModal()
  } catch (error) {
    console.error('Error saving assignment:', error)
  }
}

// Note functions
const openAddNoteModal = (week) => {
  noteModalMode.value = 'create'
  selectedNote.value = null
  selectedWeekId.value = week.id
  showNoteModal.value = true
}

const editNote = (note) => {
  noteModalMode.value = 'edit'
  selectedNote.value = { ...note }
  selectedWeekId.value = note.week_id
  showNoteModal.value = true
}

const closeNoteModal = () => {
  showNoteModal.value = false
  selectedNote.value = null
  selectedWeekId.value = null
}

const handleNoteSave = async (noteData) => {
  try {
    if (noteModalMode.value === 'create') {
      await api.post(`/api/admin/weeks/${selectedWeekId.value}/notes`, noteData)
    } else {
      await api.put(`/api/admin/notes/${selectedNote.value.id}`, noteData)
    }
    await fetchCourseDetails()
    closeNoteModal()
  } catch (error) {
    console.error('Error saving note:', error)
  }
}

// Delete functions
const confirmDeleteWeek = (week) => {
  itemToDelete.value = week
  deleteItemType.value = 'week'
  showDeleteModal.value = true
}

const confirmDeleteVideo = (video) => {
  itemToDelete.value = video
  deleteItemType.value = 'video'
  showDeleteModal.value = true
}

const confirmDeleteAssignment = (assignment) => {
  itemToDelete.value = assignment
  deleteItemType.value = 'assignment'
  showDeleteModal.value = true
}

const confirmDeleteNote = (note) => {
  itemToDelete.value = note
  deleteItemType.value = 'note'
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
  deleteItemType.value = ''
}

const confirmDelete = async () => {
  try {
    switch (deleteItemType.value) {
      case 'week':
        await api.delete(`/api/admin/weeks/${itemToDelete.value.id}`)
        break
      case 'video':
        await api.delete(`/api/admin/videos/${itemToDelete.value.id}`)
        break
      case 'assignment':
        await api.delete(`/api/admin/assignments/${itemToDelete.value.id}`)
        break
      case 'note':
        await api.delete(`/api/admin/notes/${itemToDelete.value.id}`)
        break
    }
    await fetchCourseDetails()
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

const goBack = () => {
  router.push('/admin/courses')
}

const editCourse = (course) => {
  courseModalMode.value = 'edit'
  selectedCourse.value = { ...course }
  showCourseModal.value = true
}

const closeCourseModal = () => {
  showCourseModal.value = false
  selectedCourse.value = null
}

const handleCourseSave = async (courseData) => {
  try {
    await api.put(`/api/admin/courses/${courseId}`, courseData)
    await fetchCourseDetails()
    closeCourseModal()
  } catch (error) {
    console.error('Error saving course:', error)
  }
}

const isEmbeddableVideo = (url) => {
  return /youtube\.com|youtu\.be|drive\.google\.com/.test(url || '')
}

const getVideoEmbedUrl = (url) => {
  if (!url) return ''

  if (/youtube\.com|youtu\.be/.test(url)) {
    const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)
    const videoId = videoIdMatch ? videoIdMatch[1] : ''
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  if (/drive\.google\.com/.test(url)) {
    const fileIdMatch = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]+)/)
    const fileId = fileIdMatch ? fileIdMatch[1] : ''
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url
  }

  return url
}

const previewVideo = (video) => {
  selectedPreviewVideo.value = video
  showVideoPreview.value = true
}

const closeVideoPreview = () => {
  showVideoPreview.value = false
  selectedPreviewVideo.value = null
}

// Helper functions
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchCourseDetails()
})
</script>