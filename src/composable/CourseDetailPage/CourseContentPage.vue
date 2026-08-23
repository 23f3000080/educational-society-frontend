<template>
  <div class="p-8">
    <!-- Back to Course Page Button -->
    <button @click="goBackToCourse"
        class="mb-6 inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Course
    </button>

    <div class="max-w-4xl mx-auto">
      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-sm border p-12 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-700 mb-2">Loading course content...</h3>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-sm border p-12 text-center">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-700 mb-2">Failed to load course content</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="fetchCourseWithWeeks" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Try Again
        </button>
      </div>

      <!-- Content Display Area -->
      <div v-else-if="selectedContent && selectedContent.type" class="bg-white rounded-xl shadow-sm border p-6">
        <!-- Lectures Content -->
        <div v-if="selectedContent.type === 'lectures'">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <span>Week {{ selectedContent.week }}</span>
              <span>•</span>
              <span>Lectures</span>
              <span v-if="selectedContent.weekObj?.title" class="text-gray-400">- {{ selectedContent.weekObj.title }}</span>
            </div>
            
            <!-- Mark Complete Button for Video -->
            <button 
              v-if="selectedContent.video && !isVideoCompleted(selectedContent.week, selectedContent.video.id)"
              @click="markVideoCompleted"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Mark as Completed
            </button>
            <div 
              v-else-if="selectedContent.video && isVideoCompleted(selectedContent.week, selectedContent.video.id)"
              class="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Completed
            </div>
          </div>
          
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            {{ selectedContent.video ? selectedContent.video.title : `Week ${selectedContent.week} Lectures` }}
          </h2>

          <!-- Video Player -->
          <div v-if="selectedContent.video" class="space-y-6">
            <div class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <!-- Check if URL is YouTube or Google Drive -->
              <iframe 
                v-if="isYoutubeOrDrive(selectedContent.video.url)"
                :src="getEmbedUrl(selectedContent.video.url)" 
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen 
                class="w-full h-full rounded-lg"
              ></iframe>

              <!-- Regular video file -->
              <video 
                v-else 
                :src="selectedContent.video.url" 
                controls 
                class="w-full h-full rounded-lg"
                @ended="markVideoCompleted"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800 mb-2">About this video</h3>
              <p class="text-gray-600">
                {{ selectedContent.video.title }} - Week {{ selectedContent.week }} lecture content.
                <span v-if="selectedContent.video.duration">Duration: {{ formatDuration(selectedContent.video.duration) }}</span>
              </p>
            </div>
          </div>

          <!-- Week Overview - Videos List -->
          <div v-else class="space-y-6">
            <div v-if="selectedContent.weekObj?.videos && selectedContent.weekObj.videos.length > 0" 
                 class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="video in selectedContent.weekObj.videos" 
                :key="video.id"
                class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer relative"
                :class="{ 'border-green-500 bg-green-50': isVideoCompleted(selectedContent.week, video.id) }"
                @click="selectVideo(video, selectedContent.weekObj)"
              >
                <div class="flex items-start space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-800">{{ video.title }}</h3>
                    <p class="text-sm text-blue-600 mt-1 hover:underline">Click to watch video</p>
                  </div>
                  <!-- Completed Badge -->
                  <div v-if="isVideoCompleted(selectedContent.week, video.id)" class="absolute top-2 right-2">
                    <span class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              No videos available for this week.
            </div>
          </div>
        </div>

        <!-- Assignments Content -->
        <div v-else-if="selectedContent.type === 'assignments'">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <span>Week {{ selectedContent.week }}</span>
              <span>•</span>
              <span>Assignments</span>
              <span v-if="selectedContent.weekObj?.title" class="text-gray-400">- {{ selectedContent.weekObj.title }}</span>
            </div>
            
            <!-- Assignment Status Badge -->
            <div v-if="isAssignmentPastDue" class="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Past Due
            </div>
            <div v-else-if="selectedContent.assignment && isAssignmentCompleted(selectedContent.week, selectedContent.assignment.id)" 
                 class="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Submitted
            </div>
          </div>

          <div v-if="selectedContent.assignment">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-semibold text-gray-800">
                {{ selectedContent.assignment.title }}
              </h2>
              
              <!-- Show "Answer Key Available" after due date or submission -->
              <div v-if="showAnswers" class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Answer Key Available
              </div>
            </div>
            
            <p class="text-gray-600 mb-4">{{ selectedContent.assignment.description }}</p>
            
            <div class="flex items-center space-x-4 mb-6 p-4 bg-orange-50 rounded-lg">
              <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-orange-700">
                Due: {{ selectedContent.assignment.due_date ? formatDate(selectedContent.assignment.due_date) : 'No due date' }}
                <span v-if="isAssignmentPastDue" class="ml-2 text-red-600 font-medium">(Past Due)</span>
              </span>
            </div>

            <!-- Loading Questions -->
            <div v-if="loadingQuestions" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              <p class="mt-2 text-gray-600">Loading questions...</p>
            </div>

            <!-- Questions Display -->
            <div v-else-if="questions.length > 0" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-800">Questions</h3>
              
              <div 
                v-for="(question, index) in questions" 
                :key="question.id"
                class="border rounded-lg p-6"
                :class="{ 'border-green-500 bg-green-50': showAnswers && question.isCorrect }"
              >
                <div class="flex items-start justify-between mb-4">
                  <p class="font-medium text-gray-800">
                    Question {{ index + 1 }} 
                    <span class="ml-2 text-sm text-gray-500">({{ question.marks }} marks)</span>
                  </p>
                  
                  <!-- Show correct/incorrect indicator after submission or due date -->
                  <div v-if="showAnswers" class="flex items-center">
                    <span v-if="question.isCorrect" class="text-green-600 text-sm font-medium flex items-center">
                      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Correct
                    </span>
                    <span v-else-if="question.userAnswer" class="text-red-600 text-sm font-medium flex items-center">
                      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Incorrect
                    </span>
                  </div>
                </div>

                <div class="text-gray-700 mb-4 question-rich-text" v-html="question.question_text"></div>

                <!-- MCQ Question -->
                <div v-if="question.question_type === 'mcq'" class="space-y-3">
                  <div 
                    v-for="option in question.options" 
                    :key="option.id"
                    class="flex items-center p-3 border rounded-lg"
                    :class="{
                      'border-green-500 bg-green-100': showAnswers && option.is_correct,
                      'border-red-500 bg-red-100': showAnswers && !option.is_correct && isOptionSelected(question, option.id),
                      'border-blue-500 bg-blue-100': !showAnswers && isOptionSelected(question, option.id)
                    }"
                  >
                    <input 
                      type="radio"
                      :name="`question-${question.id}`"
                      :value="option.id"
                      v-model="userAnswers[question.id]"
                      :disabled="isAssignmentCompleted(selectedContent.week, selectedContent.assignment.id) || isAssignmentPastDue"
                      @change="saveAnswer(question.id, { selected_option_id: option.id })"
                      class="mr-3"
                    >
                    <label class="flex-1 cursor-pointer option-rich-text" v-html="option.option_text"></label>
                    
                    <!-- Correct answer indicator after due date -->
                    <span v-if="showAnswers && option.is_correct" class="text-green-600">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                </div>

                <!-- Fill in Blank Question -->
                <div v-else-if="question.question_type === 'fill_blank'" class="space-y-3">
                  <input 
                    type="text"
                    v-model="userAnswers[question.id]"
                    :disabled="isAssignmentCompleted(selectedContent.week, selectedContent.assignment.id) || isAssignmentPastDue"
                    @change="saveAnswer(question.id, { text_answer: userAnswers[question.id] })"
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    :class="{
                      'border-green-500 bg-green-100': showAnswers && isAnswerCorrect(question),
                      'border-red-500 bg-red-100': showAnswers && !isAnswerCorrect(question) && userAnswers[question.id]
                    }"
                    placeholder="Type your answer here..."
                  >
                  
                  <!-- Show correct answer after due date -->
                  <div v-if="showAnswers && question.correct_answer" class="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p class="text-sm text-blue-700">
                      <span class="font-medium">Correct answer:</span> {{ question.correct_answer }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div v-if="!isAssignmentCompleted(selectedContent.week, selectedContent.assignment.id) && !isAssignmentPastDue" 
                   class="flex justify-end mt-8">
                <button 
                  @click="submitAssignment"
                  class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  :disabled="submitting"
                >
                  <span v-if="submitting" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                  <span v-else>Submit Assignment</span>
                </button>
              </div>

              <!-- Past Due Message -->
              <div v-else-if="isAssignmentPastDue" class="mt-8 p-4 bg-red-50 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="font-medium text-red-800">Assignment Past Due</p>
                    <p class="text-sm text-red-600">The due date for this assignment has passed. You can still review the questions and correct answers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              No questions available for this assignment.
            </div>
          </div>

          <!-- Week Assignments Overview -->
          <div v-else>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">
              Week {{ selectedContent.week }} Assignments
            </h2>
            <div v-if="selectedContent.weekObj?.assignments && selectedContent.weekObj.assignments.length > 0" 
                 class="space-y-4">
              <div 
                v-for="assignment in selectedContent.weekObj.assignments" 
                :key="assignment.id"
                class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer relative"
                :class="{ 
                  'border-green-500 bg-green-50': isAssignmentCompleted(selectedContent.week, assignment.id),
                  'border-red-500 bg-red-50': !isAssignmentCompleted(selectedContent.week, assignment.id) && isAssignmentPastDueByDate(assignment.due_date)
                }"
                @click="selectAssignment(assignment, selectedContent.weekObj)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800">{{ assignment.title }}</h3>
                      <p class="text-sm text-gray-600 mt-1">{{ assignment.description }}</p>
                    </div>
                  </div>
                  <span class="text-sm" :class="isAssignmentPastDueByDate(assignment.due_date) ? 'text-red-600 font-medium' : 'text-orange-500'">
                    Due: {{ assignment.due_date ? formatDate(assignment.due_date) : 'TBD' }}
                  </span>
                </div>
                <!-- Status Badge -->
                <div v-if="isAssignmentCompleted(selectedContent.week, assignment.id)" class="absolute top-2 right-2">
                  <span class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Submitted
                  </span>
                </div>
                <div v-else-if="isAssignmentPastDueByDate(assignment.due_date)" class="absolute top-2 right-2">
                  <span class="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Past Due
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              No assignments available for this week.
            </div>
          </div>
        </div>

        <!-- Notes Content -->
        <div v-else-if="selectedContent.type === 'notes'">
          <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Week {{ selectedContent.week }}</span>
            <span>•</span>
            <span>Notes</span>
            <span v-if="selectedContent.weekObj?.title" class="text-gray-400">- {{ selectedContent.weekObj.title }}</span>
          </div>

          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            {{ selectedContent.note ? selectedContent.note.title : `Week ${selectedContent.week} Notes` }}
          </h2>

          <div v-if="selectedContent.note" class="space-y-6">
            <div class="bg-gray-50 rounded-lg p-8 text-center">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="text-lg font-medium text-gray-800 mb-2">{{ selectedContent.note.title }}</h3>
              <p class="text-gray-600 mb-4">{{ selectedContent.note.description }}</p>
              <a 
                :href="selectedContent.note.file_url" 
                target="_blank"
                class="inline-flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Notes
              </a>
            </div>
          </div>
          <div v-else-if="selectedContent.weekObj?.notes && selectedContent.weekObj.notes.length > 0" class="space-y-4">
            <div 
              v-for="note in selectedContent.weekObj.notes" 
              :key="note.id"
              class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              @click="selectNote(note, selectedContent.weekObj)"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">{{ note.title }}</h3>
                  <p class="text-sm text-gray-600">{{ note.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            No notes available for this week.
          </div>
        </div>

        <!-- No Selection -->
        <div v-else class="text-center py-12">
          <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-700 mb-2">No Content Selected</h3>
          <p class="text-gray-500">Select a lecture, assignment, or notes from the sidebar to view content.</p>
        </div>
      </div>

      <!-- Welcome/Overview State -->
      <div v-else-if="courseWithWeeks && courseWithWeeks.title" class="bg-white rounded-xl shadow-sm border p-12 text-center">
        <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Welcome to {{ courseWithWeeks.title || 'Course' }}</h2>
        <p class="text-gray-600 max-w-md mx-auto mb-8">
          {{ courseWithWeeks.description || 'Start your learning journey by exploring the course materials.' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from "../../services/axios.js"

const router = useRouter()

const goBackToCourse = () => {
    router.push(`/student/courses`)
}

const props = defineProps({
  course: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      description: '',
    })
  },
  selectedContent: {
    type: Object,
    default: () => ({ type: null, week: null, weekObj: null, video: null, assignment: null, note: null })
  }
})

const emit = defineEmits(['content-updated', 'progress-updated'])

// State for course with weeks
const courseWithWeeks = ref(null)
const weeks = ref([])

// State for completed content
const completedVideos = ref(new Set())
const completedAssignments = ref(new Set())
const isLoadingProgress = ref(false)

// Assignment specific state
const questions = ref([])
const userAnswers = ref({})
const userMultiSelectAnswers = ref({})
const loadingQuestions = ref(false)
const submitting = ref(false)
const showAnswers = ref(false)
const loading = ref(true)

// Fetch course with weeks
const fetchCourseWithWeeks = async () => {
  if (!props.course?.id) return
  
  try {
    // Fetch weeks data
    loading.value = true
    const weeksResponse = await api.get(`/api/courses/${props.course.id}/weeks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    
    weeks.value = weeksResponse.data
    
    // Combine course data with weeks
    courseWithWeeks.value = {
      ...props.course,
      weeks: weeks.value
    }
    loading.value = false
    console.log("Course with weeks:", courseWithWeeks.value)
    
  } catch (error) {
    console.error("Error fetching course weeks:", error)
  }
}

let isFetched = false

onMounted(() => {
  if (!isFetched) {
    fetchCourseWithWeeks()
    isFetched = true
  }
})

// Watch for assignment selection to load questions
watch(() => props.selectedContent?.assignment, async (newAssignment) => {
  if (newAssignment && props.selectedContent.type === 'assignments') {
    await loadAssignmentQuestions()
    checkIfAnswersShouldBeShown()
  }
}, { immediate: true })

// Watch for due date changes
watch(() => props.selectedContent?.assignment?.due_date, () => {
  checkIfAnswersShouldBeShown()
})

// Check if answers should be shown (after due date or submitted)
const checkIfAnswersShouldBeShown = () => {
  if (!props.selectedContent?.assignment) return
  
  const isPastDue = isAssignmentPastDueByDate(props.selectedContent.assignment.due_date)
  const isSubmitted = isAssignmentCompleted(props.selectedContent.week, props.selectedContent.assignment.id)
  
  showAnswers.value = isPastDue || isSubmitted
}

// Check if assignment is past due by date
const isAssignmentPastDueByDate = (dueDate) => {
  if (!dueDate) return false
  const due = new Date(dueDate)
  const now = new Date()
  return now > due
}

// Computed property for past due status
const isAssignmentPastDue = computed(() => {
  if (!props.selectedContent?.assignment?.due_date) return false
  return isAssignmentPastDueByDate(props.selectedContent.assignment.due_date)
})

// Load assignment questions from API
const loadAssignmentQuestions = async () => {
  if (!props.selectedContent?.assignment) return
  
  loadingQuestions.value = true
  try {
    const response = await api.get(`/api/assignments/${props.selectedContent.assignment.id}/questions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    
    questions.value = response.data
    
    // Initialize answers
    questions.value.forEach(q => {
      if (!userAnswers.value[q.id]) {
        if (q.question_type === 'multiple_select') {
          userMultiSelectAnswers.value[q.id] = []
        } else {
          userAnswers.value[q.id] = ''
        }
      }
    })
    
  } catch (error) {
    console.error("Error loading questions:", error)
  } finally {
    loadingQuestions.value = false
  }
}

// Fetch completed items from API
const fetchCompletedItems = async () => {
  if (!props.course?.id) return
  
  try {
    const response = await api.get(`/api/course-progress/${props.course.id}/completed`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    const data = response.data

    console.log("Completed items from API:", data)

    // Create new Sets
    const newCompletedVideos = new Set()
    const newCompletedAssignments = new Set()

    data.forEach(item => {
      if (item.content_type === "video") {
        newCompletedVideos.add(item.content_key)
      }
      if (item.content_type === "assignment") {
        newCompletedAssignments.add(item.content_key)
      }
    })

    // Assign new Sets to trigger reactivity
    completedVideos.value = newCompletedVideos
    completedAssignments.value = newCompletedAssignments

    console.log("Completed videos:", [...completedVideos.value])
    console.log("Completed assignments:", [...completedAssignments.value])

  } catch (error) {
    console.error("Error fetching completed items:", error)
  }
}

// Load initial data
onMounted(async () => {
  if (props.course?.id) {
    await Promise.all([
      fetchCourseWithWeeks(),
      fetchCompletedItems()
    ])
  }
})

// Watch for course changes
watch(() => props.course?.id, async (newId) => {
  if (newId) {
    await Promise.all([
      fetchCourseWithWeeks(),
      fetchCompletedItems()
    ])
  }
})

// Methods
const selectVideo = (video, weekObj) => {
  emit('content-updated', {
    type: 'lectures',
    week: weekObj.week_number,
    weekObj: weekObj,
    video: video,
    videoKey: video.video_key || video.id,
    videoUrl: video.url,
    assignment: null,
    note: null
  })
}

const selectAssignment = (assignment, weekObj) => {
  emit('content-updated', {
    type: 'assignments',
    week: weekObj.week_number,
    weekObj: weekObj,
    video: null,
    assignment: assignment,
    assignmentKey: assignment.assignment_key || assignment.id,
    note: null
  })
}

const selectNote = (note, weekObj) => {
  emit('content-updated', {
    type: 'notes',
    week: weekObj.week_number,
    weekObj: weekObj,
    video: null,
    assignment: null,
    note: note,
    notesUrl: note.file_url
  })
}

const isVideoCompleted = (week, videoId) => {
  if (!week || !videoId) return false
  const contentKey = `week${week}_video_${videoId}`
  return completedVideos.value.has(contentKey)
}

const isAssignmentCompleted = (week, assignmentId) => {
  if (!week || !assignmentId) return false
  const contentKey = `week${week}_assignment_${assignmentId}`
  return completedAssignments.value.has(contentKey)
}

// Helper methods for answers
const isOptionSelected = (question, optionId) => {
  if (question.question_type === 'multiple_select') {
    return userMultiSelectAnswers.value[question.id]?.includes(optionId) || false
  } else {
    return userAnswers.value[question.id] === optionId
  }
}

const isAnswerCorrect = (question) => {
  if (!showAnswers.value) return false
  
  const userAnswer = userAnswers.value[question.id]
  return userAnswer && userAnswer.toLowerCase() === question.correct_answer?.toLowerCase()
}

const saveAnswer = async (questionId, answerData) => {
  if (!props.selectedContent?.assignment) return
  if (isAssignmentCompleted(props.selectedContent.week, props.selectedContent.assignment.id) || isAssignmentPastDue.value) return
  
  console.log('Saving answer:', { questionId, ...answerData })
}

const saveMultiSelectAnswer = async (questionId) => {
  if (!props.selectedContent?.assignment) return
  if (isAssignmentCompleted(props.selectedContent.week, props.selectedContent.assignment.id) || isAssignmentPastDue.value) return
  
  console.log('Saving multi-select answer:', { 
    questionId, 
    selected: userMultiSelectAnswers.value[questionId] 
  })
}

const markVideoCompleted = async () => {
  if (!props.selectedContent?.video || !props.course?.id) return

  const week = props.selectedContent.week
  const videoId = props.selectedContent.video.id
  const contentKey = `week${week}_video_${videoId}`

  if (completedVideos.value.has(contentKey)) {
    return
  }

  try {
    const response = await api.post("/api/progress/complete", {
      course_id: props.course.id,
      content_type: "video",
      content_key: contentKey
    })
    
    if (response.status === 200 || response.status === 201) {
      // Create a new Set to trigger reactivity
      const newCompletedVideos = new Set(completedVideos.value)
      newCompletedVideos.add(contentKey)
      completedVideos.value = newCompletedVideos
      
      // Save to session storage for persistence
      const savedProgress = JSON.parse(sessionStorage.getItem(`course_progress_${props.course.id}`) || '{}')
      savedProgress.videos = [...completedVideos.value]
      sessionStorage.setItem(`course_progress_${props.course.id}`, JSON.stringify(savedProgress))
      
      emit('progress-updated', {
        type: 'video',
        completed: true,
        contentKey
      })

      console.log("Video marked as completed:", contentKey)
    }

  } catch (error) {
    console.error("Error marking content complete:", error)
    alert('Failed to mark video as completed. Please try again.')
  }
}

const submitAssignment = async () => {
  if (!props.selectedContent?.assignment || !props.course?.id) return
  if (isAssignmentPastDue.value) return

  const week = props.selectedContent.week
  const assignmentId = props.selectedContent.assignment.id
  const contentKey = `week${week}_assignment_${assignmentId}`

  if (completedAssignments.value.has(contentKey)) {
    return
  }

  submitting.value = true
  
  try {
    // Prepare answers for submission
    const answers = []
    
    questions.value.forEach(q => {
      if (q.question_type === 'mcq') {
        answers.push({
          question_id: q.id,
          selected_option_id: userAnswers.value[q.id]
        })
      } else if (q.question_type === 'fill_blank') {
        answers.push({
          question_id: q.id,
          text_answer: userAnswers.value[q.id]
        })
      }
    })
    
    const response = await api.post("/api/submit-assignment", {
      assignment_id: props.selectedContent.assignment.id,
      answers: answers
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    
    if (response.status === 200) {
      // Create a new Set to trigger reactivity
      const newCompletedAssignments = new Set(completedAssignments.value)
      newCompletedAssignments.add(contentKey)
      completedAssignments.value = newCompletedAssignments
      
      // Save to session storage
      const savedProgress = JSON.parse(sessionStorage.getItem(`course_progress_${props.course.id}`) || '{}')
      savedProgress.assignments = [...completedAssignments.value]
      sessionStorage.setItem(`course_progress_${props.course.id}`, JSON.stringify(savedProgress))
      
      showAnswers.value = true
      
      emit('progress-updated', {
        type: 'assignment',
        completed: true,
        contentKey,
        score: response.data.score,
        total: response.data.total
      })
      
      alert(`Assignment submitted successfully! Score: ${response.data.score}/${response.data.total}`)
    }

  } catch (error) {
    console.error("Error submitting assignment:", error)
    alert(error.response?.data?.error || 'Failed to submit assignment. Please try again.')
  } finally {
    submitting.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

const formatDuration = (seconds) => {
  if (!seconds) return ''
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}

// Check if URL is YouTube or Drive
const isYoutubeOrDrive = (url) => {
  return /youtube\.com|youtu\.be|drive\.google\.com/.test(url)
}

// Convert YouTube / Drive URL to embeddable format
const getEmbedUrl = (url) => {
  if (!url) return ''

  // YouTube
  if (/youtube\.com|youtu\.be/.test(url)) {
    const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)
    const videoId = videoIdMatch ? videoIdMatch[1] : ''
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  // Google Drive
  if (/drive\.google\.com/.test(url)) {
    const fileIdMatch = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]+)/)
    const fileId = fileIdMatch ? fileIdMatch[1] : ''
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url
  }

  return url
}
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>