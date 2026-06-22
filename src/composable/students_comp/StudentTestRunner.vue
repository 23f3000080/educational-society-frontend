<template>
  <div :class="[
    'fixed inset-0 z-50 transition-colors duration-300 overflow-hidden',
    isDarkMode ? 'bg-slate-950/95' : 'bg-slate-100/95'
  ]">
    <div ref="runnerRoot" class="flex h-full w-full flex-col max-w-7xl mx-auto px-2 py-2 sm:px-4 sm:py-3 md:px-6 lg:px-8">
      
      <!-- Header - Fixed at top -->
      <div :class="[
        'flex flex-col gap-2 rounded-xl px-3 py-2 backdrop-blur transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-3',
        'flex-shrink-0',
        isDarkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white/90'
      ]">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span :class="[
                'inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider sm:text-[10px] sm:px-2.5',
                isDarkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
              ]">
                {{ test.test_scope === 'full_length' ? 'Full Test' : 'Weekly Test' }}
              </span>
              <span v-if="test.week_number" :class="[
                'inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider sm:text-[10px] sm:px-2.5',
                isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
              ]">
                Week {{ test.week_number }}
              </span>
              <span :class="[
                'inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold sm:text-[10px]',
                isDarkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
              ]">
                {{ answeredCount }}/{{ questions.length }}
              </span>
            </div>
            <h2 class="mt-0.5 truncate text-sm font-bold sm:text-base md:text-lg" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ test.title }}
            </h2>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <!-- Fullscreen Button -->
            <button
              type="button"
              @click="toggleFullscreen"
              :class="[
                'rounded-lg px-2 py-1 text-xs font-semibold transition sm:rounded-xl sm:px-3 sm:py-1.5',
                isDarkMode
                  ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              ]"
              :title="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
            >
              <span class="hidden sm:inline">{{ isFullscreen ? '⛶ Exit' : '⛶ Fullscreen' }}</span>
              <span class="sm:hidden">{{ isFullscreen ? '⛶' : '⛶' }}</span>
            </button>

            <!-- Timer -->
            <div :class="[
              'rounded-lg px-2 py-1 text-center sm:rounded-xl sm:px-3 sm:py-1.5',
              isDarkMode ? 'border border-white/10 bg-black/20' : 'border border-slate-200 bg-slate-50'
            ]">
              <p :class="[
                'text-[8px] uppercase tracking-[0.2em] sm:text-[10px]',
                isDarkMode ? 'text-slate-300' : 'text-slate-500'
              ]">Time</p>
              <p class="text-sm font-bold tabular-nums sm:text-base" :class="{
                'text-red-400 animate-pulse': timeLeft < 60,
                'text-yellow-400': timeLeft >= 60 && timeLeft < 300,
                'text-emerald-400': timeLeft >= 300
              }">
                {{ formattedTimeLeft }}
              </p>
            </div>

            <!-- Theme Toggle -->
            <button
              type="button"
              @click="toggleTheme"
              :class="[
                'rounded-lg px-2 py-1 text-xs font-semibold transition sm:rounded-xl sm:px-3 sm:py-1.5',
                isDarkMode
                  ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              ]"
            >
              <span class="hidden sm:inline">{{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}</span>
              <span class="sm:hidden">{{ isDarkMode ? '☀️' : '🌙' }}</span>
            </button>

            <!-- Close Button -->
            <button
              type="button"
              @click="handleClose"
              :class="[
                'rounded-lg px-2 py-1 text-xs font-semibold transition sm:rounded-xl sm:px-3 sm:py-1.5',
                isDarkMode
                  ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              ]"
            >
              <span class="hidden sm:inline">Close</span>
              <span class="sm:hidden">✕</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content - Scrollable -->
      <div class="mt-2 flex-1 overflow-y-auto overflow-x-hidden" :class="isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'">
        <div class="grid gap-2 pb-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-3">
          
          <!-- Question Area -->
          <section :class="[
            'rounded-xl p-3 shadow-2xl backdrop-blur sm:rounded-2xl sm:p-4',
            isDarkMode ? 'border border-white/10 bg-slate-900/80' : 'border border-slate-200 bg-white/90'
          ]">
            <!-- Stats -->
            <div class="flex flex-wrap items-center gap-1 text-xs sm:gap-2 sm:text-sm">
              <span :class="[
                'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:px-3 sm:py-1 sm:text-xs',
                isDarkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
              ]">{{ questions.length }} Questions</span>
              <span :class="[
                'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:px-3 sm:py-1 sm:text-xs',
                isDarkMode ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-700'
              ]">{{ test.duration_minutes || 60 }} Min</span>
              <span :class="[
                'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:px-3 sm:py-1 sm:text-xs',
                isDarkMode ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-700'
              ]">{{ Math.round((answeredCount / questions.length) * 100) || 0 }}%</span>
              <span v-if="answersCount > 0" :class="[
                'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:px-3 sm:py-1 sm:text-xs',
                isDarkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-700'
              ]">💾 {{ answersCount }} saved</span>
            </div>

            <!-- Security Message -->
            <p v-if="securityMessage" :class="[
              'mt-2 rounded-lg border px-3 py-1.5 text-xs sm:mt-3 sm:px-4 sm:py-2',
              isDarkMode ? 'border-rose-400/30 bg-rose-500/10 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-700'
            ]">
              ⚠️ {{ securityMessage }}
            </p>

            <!-- Auto-save Status -->
            <p v-if="lastSaved" :class="[
              'mt-1 text-[10px]',
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            ]">
              💾 Last saved: {{ lastSaved }}
            </p>

            <!-- Question Display -->
            <div class="mt-2">
              <div v-if="!selectedQuestion" :class="[
                'flex h-24 items-center justify-center rounded-xl border border-dashed p-3 text-center text-xs sm:h-32 sm:p-6',
                isDarkMode ? 'border-white/20 bg-white/5 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
              ]">
                <div>
                  <span class="text-xl sm:text-2xl">📝</span>
                  <p class="mt-1 text-xs">Select a question to view</p>
                </div>
              </div>

              <article
                v-else
                :key="selectedQuestion.id"
                class="animate-fadeIn rounded-xl border p-3 shadow-sm sm:rounded-2xl sm:p-4 select-none"
                :class="isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'"
                @copy.prevent
                @cut.prevent
                @contextmenu.prevent
              >
                <!-- Question Header -->
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span :class="[
                        'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:text-xs',
                        isDarkMode ? 'bg-white/10 text-slate-200' : 'bg-slate-200 text-slate-700'
                      ]">Q{{ selectedQuestionIndex + 1 }}</span>
                      <span :class="[
                        'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:text-xs',
                        isDarkMode ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-700'
                      ]">{{ selectedQuestion.marks }} marks</span>
                      <span :class="[
                        'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:text-xs',
                        isDarkMode ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-100 text-purple-700'
                      ]">{{ getQuestionTypeLabel(selectedQuestion.question_type) }}</span>
                      <span v-if="isQuestionAnswered(selectedQuestion)" :class="[
                        'rounded-full px-2 py-0.5 text-[9px] font-semibold sm:text-xs',
                        isDarkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                      ]">✅ Answered</span>
                    </div>
                    <h3 class="mt-1.5 text-sm font-semibold leading-relaxed sm:text-base" 
                        :class="isDarkMode ? 'text-white' : 'text-slate-900'"
                        v-html="selectedQuestion.question_text"></h3>
                  </div>
                  
                  <!-- Clear Answer Button for individual question -->
                  <button
                    v-if="isQuestionAnswered(selectedQuestion)"
                    type="button"
                    @click="clearQuestionAnswer(selectedQuestion.id)"
                    :class="[
                      'rounded-lg px-2 py-1 text-[10px] font-semibold transition sm:px-3 sm:py-1.5 sm:text-xs',
                      isDarkMode
                        ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                        : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    ]"
                    title="Clear this answer"
                  >
                    ✕ Clear
                  </button>
                </div>

                <!-- Options -->
                <div class="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
                  <!-- MCQ -->
                  <template v-if="selectedQuestion.question_type === 'mcq'">
                    <label
                      v-for="(option, idx) in selectedQuestion.options"
                      :key="option.id"
                      :class="[
                        'flex cursor-pointer items-start gap-2 rounded-lg border px-2.5 py-2 transition sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5',
                        isDarkMode
                          ? 'border-white/10 bg-slate-950/40 hover:border-cyan-400/40 hover:bg-slate-950/60'
                          : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50',
                        answers[selectedQuestion.id] === option.id && (isDarkMode ? 'border-cyan-400 bg-cyan-500/20' : 'border-cyan-400 bg-cyan-100')
                      ]"
                    >
                      <input
                        v-model="answers[selectedQuestion.id]"
                        type="radio"
                        :name="`question-${selectedQuestion.id}`"
                        :value="option.id"
                        class="mt-0.5 h-3.5 w-3.5 shrink-0 accent-cyan-500 sm:h-4 sm:w-4"
                        @change="saveAnswer(selectedQuestion.id)"
                      />
                      <span class="text-xs leading-relaxed sm:text-sm" :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'">
                        <span class="font-semibold text-cyan-500">{{ String.fromCharCode(65 + idx) }}.</span> {{ option.option_text }}
                      </span>
                    </label>
                  </template>

                  <!-- Multiple Select -->
                  <template v-else-if="selectedQuestion.question_type === 'multiple_select'">
                    <label
                      v-for="(option, idx) in selectedQuestion.options"
                      :key="option.id"
                      :class="[
                        'flex cursor-pointer items-start gap-2 rounded-lg border px-2.5 py-2 transition sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5',
                        isDarkMode
                          ? 'border-white/10 bg-slate-950/40 hover:border-cyan-400/40 hover:bg-slate-950/60'
                          : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50',
                        isSelected(selectedQuestion.id, option.id) && (isDarkMode ? 'border-cyan-400 bg-cyan-500/20' : 'border-cyan-400 bg-cyan-100')
                      ]"
                    >
                      <input
                        :checked="isSelected(selectedQuestion.id, option.id)"
                        type="checkbox"
                        class="mt-0.5 h-3.5 w-3.5 shrink-0 rounded accent-cyan-500 sm:h-4 sm:w-4"
                        @change="handleMultiSelect(selectedQuestion.id, option.id)"
                      />
                      <span class="text-xs leading-relaxed sm:text-sm" :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'">
                        <span class="font-semibold text-cyan-500">{{ String.fromCharCode(65 + idx) }}.</span> {{ option.option_text }}
                      </span>
                    </label>
                  </template>

                  <!-- Text Input -->
                  <template v-else>
                    <div class="space-y-1.5">
                      <textarea
                        v-model="answers[selectedQuestion.id]"
                        :placeholder="selectedQuestion.placeholder || 'Type your answer here...'"
                        rows="3"
                        :class="[
                          'w-full rounded-lg border px-3 py-2 text-sm outline-none transition sm:rounded-xl sm:px-4',
                          isDarkMode
                            ? 'border-white/10 bg-slate-950/40 text-white placeholder:text-slate-400 focus:border-cyan-400'
                            : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-cyan-500'
                        ]"
                        @input="debouncedSave(selectedQuestion.id)"
                      ></textarea>
                      <p :class="[
                        'text-[10px]',
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      ]">
                        {{ (answers[selectedQuestion.id] || '').length }} characters
                      </p>
                    </div>
                  </template>
                </div>

                <!-- Navigation Buttons -->
                <div class="mt-3 flex flex-wrap gap-1.5 border-t pt-3 sm:mt-4 sm:gap-2 sm:pt-4" :class="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                  <button
                    type="button"
                    @click="previousQuestion"
                    :disabled="selectedQuestionIndex === 0"
                    :class="[
                      'flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:flex-none sm:rounded-xl sm:px-5 sm:py-2 sm:text-sm',
                      isDarkMode
                        ? 'border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40'
                    ]"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    @click="nextQuestion"
                    :disabled="selectedQuestionIndex === questions.length - 1"
                    :class="[
                      'flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:flex-none sm:rounded-xl sm:px-5 sm:py-2 sm:text-sm',
                      isDarkMode
                        ? 'border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40'
                    ]"
                  >
                    Next →
                  </button>
                  <button
                    v-if="selectedQuestionIndex === questions.length - 1"
                    type="button"
                    @click="emitSubmit"
                    :disabled="submitting || locked"
                    class="flex-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:rounded-xl sm:px-5 sm:py-2 sm:text-sm"
                  >
                    {{ submitting ? '...' : '📤 Submit' }}
                  </button>
                </div>
              </article>
            </div>
          </section>

          <!-- Sidebar -->
          <aside class="flex flex-col gap-2">
            <!-- Question Navigator -->
            <div :class="[
              'rounded-xl p-3 shadow-2xl backdrop-blur sm:rounded-2xl sm:p-4',
              isDarkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white/90'
            ]">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Questions</h3>
                <span :class="[
                  'text-xs',
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                ]">
                  {{ answeredCount }}/{{ questions.length }}
                </span>
              </div>
              
              <!-- Progress Bar -->
              <div class="mt-1.5 h-1 w-full overflow-hidden rounded-full sm:h-1.5" :class="isDarkMode ? 'bg-white/10' : 'bg-slate-200'">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  :class="[
                    answeredCount === questions.length ? 'bg-emerald-500' : 'bg-cyan-500',
                    isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'
                  ]"
                  :style="{ width: `${(answeredCount / questions.length) * 100}%` }"
                ></div>
              </div>

              <!-- Question Grid -->
              <div class="mt-2 grid grid-cols-5 gap-1 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
                <button
                  v-for="(question, index) in questions"
                  :key="question.id"
                  type="button"
                  @click="selectQuestion(index)"
                  :class="[
                    'relative rounded-lg border px-1.5 py-1.5 text-[10px] font-semibold transition sm:px-2 sm:py-2 sm:text-xs',
                    selectedQuestionIndex === index
                      ? 'border-cyan-400 bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : isQuestionAnswered(question)
                        ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30'
                        : isDarkMode 
                          ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10' 
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  ]"
                >
                  {{ index + 1 }}
                  <span 
                    v-if="isQuestionAnswered(question)" 
                    class="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[6px] text-white sm:h-4 sm:w-4 sm:text-[8px]"
                  >
                    ✓
                  </span>
                </button>
              </div>

              <div class="mt-2 flex flex-wrap items-center justify-between gap-1 border-t pt-2 sm:mt-3 sm:gap-2 sm:pt-3" :class="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                <div class="flex items-center gap-2 text-[9px] sm:gap-3 sm:text-[10px]">
                  <span class="flex items-center gap-0.5">
                    <span class="inline-block h-1.5 w-1.5 rounded-full bg-cyan-500 sm:h-2 sm:w-2"></span>
                    Current
                  </span>
                  <span class="flex items-center gap-0.5">
                    <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 sm:h-2 sm:w-2"></span>
                    Done
                  </span>
                  <span class="flex items-center gap-0.5">
                    <span class="inline-block h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2" :class="isDarkMode ? 'bg-white/10' : 'bg-slate-200'"></span>
                    Pending
                  </span>
                </div>
                <span :class="[
                  'text-[9px]',
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                ]">
                  {{ answeredCount === questions.length ? '✅ Done' : `${questions.length - answeredCount} left` }}
                </span>
              </div>
            </div>

            <!-- Submission Section -->
            <div :class="[
              'rounded-xl p-3 shadow-2xl backdrop-blur sm:rounded-2xl sm:p-4',
              isDarkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white/90'
            ]">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Submit Test</h3>
                <!-- Clear All Answers Button -->
                <button
                  v-if="answersCount > 0"
                  type="button"
                  @click="requestClearAllAnswers"
                  :class="[
                    'rounded-lg px-2 py-1 text-[10px] font-semibold transition sm:px-3 sm:py-1 sm:text-xs',
                    isDarkMode
                      ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                      : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  ]"
                >
                  🗑️ Clear All
                </button>
              </div>
              
              <div class="mt-1.5 space-y-1 text-xs sm:mt-2 sm:space-y-1.5">
                <p :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  ✅ {{ answeredCount }} of {{ questions.length }} answered
                </p>
                <p :class="[
                  'text-[10px]',
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                ]">
                  ⏱️ Auto-submits when timer reaches zero
                </p>
                <p :class="[
                  'text-[10px]',
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                ]">
                  💾 Answers auto-saved locally & synced
                </p>
                <p v-if="clearAllMessage" :class="[
                  'rounded-lg px-2.5 py-1.5 text-[10px] font-bold',
                  isDarkMode ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                ]">
                  {{ clearAllMessage }}
                </p>
                <p v-if="timeLeft <= 0" :class="[
                  'text-[10px] font-bold',
                  'text-red-500 animate-pulse'
                ]">
                  ⏰ Time's up! Please submit your test.
                </p>
                <p v-if="locked" :class="[
                  'text-[10px] font-bold',
                  'text-rose-500 animate-pulse'
                ]">
                  🔒 Test is locked due to security violation
                </p>
              </div>

              <div class="mt-2 flex flex-col gap-1.5 sm:mt-3 sm:gap-2">
                <!-- Submit Button - Always visible -->
                <button
                  type="button"
                  @click="emitSubmit"
                  :disabled="submitting || (locked && timeLeft > 0)"
                  class="w-full rounded-lg px-3 py-2 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                  :class="[
                    locked && timeLeft > 0
                      ? 'bg-rose-500 cursor-not-allowed'
                      : timeLeft <= 0 
                        ? 'bg-red-500 hover:bg-red-400'
                        : answeredCount === 0 
                          ? 'bg-slate-500'
                          : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/30'
                  ]"
                >
                  {{ submitting ? '⏳ Submitting...' : 
                     locked && timeLeft > 0 ? '🔒 Locked - Cannot Submit' :
                     timeLeft <= 0 ? '⏰ Submit Now' : 
                     '📤 Submit Test' }}
                </button>
                
                <!-- Locked Exit Button - Always visible when locked -->
                <button
                  v-if="locked"
                  type="button"
                  @click="handleClose"
                  class="w-full rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-400 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  🔒 Locked - Exit
                </button>

                <!-- Force Submit when locked but time's up -->
                <button
                  v-if="locked && timeLeft <= 0"
                  type="button"
                  @click="emitSubmit"
                  :disabled="submitting"
                  class="w-full rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-400 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  {{ submitting ? '⏳ Submitting...' : '⚠️ Force Submit' }}
                </button>
              </div>

              <div v-if="violation" :class="[
                'mt-2 rounded-lg border px-2.5 py-1.5 text-[10px] sm:mt-3 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs',
                isDarkMode ? 'border-rose-400/20 bg-rose-500/10 text-rose-100' : 'border-rose-200 bg-rose-50 text-rose-700'
              ]">
                ⚠️ {{ violation }}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <transition name="confirm-dialog">
        <div
          v-if="showClearAllConfirm"
          class="absolute inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-3 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-all-title"
          aria-describedby="clear-all-description"
          @click.self="cancelClearAllAnswers"
        >
          <div :class="[
            'w-full max-w-sm rounded-2xl border p-4 shadow-2xl sm:max-w-md sm:p-5',
            isDarkMode
              ? 'border-white/10 bg-slate-900 text-white shadow-black/40'
              : 'border-slate-200 bg-white text-slate-900 shadow-slate-900/20'
          ]">
            <div class="flex items-start gap-3">
              <div :class="[
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg',
                isDarkMode ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-100 text-rose-700'
              ]">
                🗑️
              </div>
              <div class="min-w-0">
                <h3 id="clear-all-title" class="text-base font-bold sm:text-lg">
                  Clear all answers?
                </h3>
                <p
                  id="clear-all-description"
                  :class="[
                    'mt-1 text-sm leading-6',
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  ]"
                >
                  This will remove all saved answers for this test.
                </p>
              </div>
            </div>

            <div class="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                @click="cancelClearAllAnswers"
                :class="[
                  'min-h-11 rounded-xl px-4 py-2 text-sm font-semibold transition',
                  isDarkMode
                    ? 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                ]"
              >
                No, keep answers
              </button>
              <button
                ref="confirmClearAllButton"
                type="button"
                @click="confirmClearAllAnswers"
                class="min-h-11 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                Yes, clear all
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const THEME_STORAGE_KEY = 'student_tests_theme'
const ANSWERS_STORAGE_KEY = 'test_answers'

const props = defineProps({
  test: {
    type: Object,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  security: {
    type: Object,
    required: true
  },
  passcode: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'submit'])

// Refs
const runnerRoot = ref(null)
const confirmClearAllButton = ref(null)
const answers = reactive({})
const durationSeconds = Math.max(1, Number(props.test.duration_minutes || 60)) * 60
const timerStorageKey = `student_test_started_at_${props.test.id}_${Number(props.test.attempts_used || 0)}`
const startedAtMs = ref(null)
const timeLeft = ref(durationSeconds)
const submitting = ref(false)
const violation = ref('')
const locked = ref(false)
const selectedQuestionIndex = ref(0)
const autoSubmitted = ref(false)
const isDarkMode = ref(false)
const isThemeSwitching = ref(false)
const isFullscreen = ref(false)
const lastSaved = ref('')
const showClearAllConfirm = ref(false)
const clearAllMessage = ref('')
const saveTimeout = ref(null)
const isSubmittingToBackend = ref(false)
let timerHandle = null
let fullscreenRequested = false
let autoSaveInterval = null

// Computed
const formattedTimeLeft = computed(() => {
  const total = Math.max(0, timeLeft.value)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const selectedQuestion = computed(() => {
  if (selectedQuestionIndex.value === null) return null
  return props.questions[selectedQuestionIndex.value] || null
})

const isQuestionAnswered = (question) => {
  const value = answers[question.id]
  if (question.question_type === 'multiple_select') {
    return Array.isArray(value) && value.length > 0
  }
  if (question.question_type === 'text') {
    return typeof value === 'string' && value.trim().length > 0
  }
  return value !== undefined && value !== null && String(value).trim() !== ''
}

const answeredCount = computed(() => {
  return props.questions.filter((q) => isQuestionAnswered(q)).length
})

const answersCount = computed(() => {
  return Object.keys(answers).filter(key => {
    const val = answers[key]
    if (Array.isArray(val)) return val.length > 0
    if (typeof val === 'string') return val.trim().length > 0
    return val !== undefined && val !== null && val !== ''
  }).length
})

const securityMessage = computed(() => {
  if (props.security.require_fullscreen && !document.fullscreenElement && !isFullscreen.value) {
    return 'Fullscreen mode is required. Please enable fullscreen.'
  }
  return ''
})

// Storage Methods
const getStorageKey = () => {
  return `${ANSWERS_STORAGE_KEY}_${props.test.id}`
}

const loadAnswers = () => {
  try {
    const key = getStorageKey()
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored)
      Object.keys(parsed).forEach(key => {
        answers[key] = parsed[key]
      })
      return true
    }
  } catch (error) {
    console.error('Failed to load answers:', error)
  }
  return false
}

const saveAnswers = () => {
  try {
    const key = getStorageKey()
    const data = {}
    Object.keys(answers).forEach(key => {
      const val = answers[key]
      if (Array.isArray(val) && val.length > 0) {
        data[key] = val
      } else if (typeof val === 'string' && val.trim().length > 0) {
        data[key] = val
      } else if (val !== undefined && val !== null && val !== '') {
        data[key] = val
      }
    })
    localStorage.setItem(key, JSON.stringify(data))
    lastSaved.value = new Date().toLocaleTimeString()
    return true
  } catch (error) {
    console.error('Failed to save answers:', error)
    return false
  }
}

const saveAnswer = (questionId) => {
  saveAnswers()
}

const debouncedSave = (questionId) => {
  if (saveTimeout.value) {
    clearTimeout(saveTimeout.value)
  }
  saveTimeout.value = setTimeout(() => {
    saveAnswers()
    saveTimeout.value = null
  }, 500)
}

// Clear individual question answer
const clearQuestionAnswer = (questionId) => {
    delete answers[questionId]
    saveAnswers()
}


// Clear All Answers
const requestClearAllAnswers = async () => {
  if (answersCount.value === 0) return
  clearAllMessage.value = ''
  showClearAllConfirm.value = true
  await nextTick()
  confirmClearAllButton.value?.focus()
}

const cancelClearAllAnswers = () => {
  showClearAllConfirm.value = false
}

const confirmClearAllAnswers = () => {
  Object.keys(answers).forEach(key => {
    delete answers[key]
  })
  saveAnswers()
  showClearAllConfirm.value = false
  clearAllMessage.value = 'All answers have been cleared.'

  window.setTimeout(() => {
    clearAllMessage.value = ''
  }, 2500)
}

// Methods
const getQuestionTypeLabel = (type) => {
  const labels = {
    'mcq': 'Single Choice',
    'multiple_select': 'Multiple Choice',
    'text': 'Written Answer'
  }
  return labels[type] || type
}

const selectQuestion = (index) => {
  if (index >= 0 && index < props.questions.length) {
    selectedQuestionIndex.value = index
  }
}

const previousQuestion = () => {
  if (selectedQuestionIndex.value > 0) {
    selectedQuestionIndex.value--
  }
}

const nextQuestion = () => {
  if (selectedQuestionIndex.value < props.questions.length - 1) {
    selectedQuestionIndex.value++
  }
}

const isSelected = (questionId, optionId) => {
  const selected = answers[questionId] || []
  return Array.isArray(selected) && selected.includes(optionId)
}

const toggleMulti = (questionId, optionId) => {
  const selected = Array.isArray(answers[questionId]) ? [...answers[questionId]] : []
  const index = selected.indexOf(optionId)

  if (index >= 0) {
    selected.splice(index, 1)
  } else {
    selected.push(optionId)
  }

  answers[questionId] = selected
}

const handleMultiSelect = (questionId, optionId) => {
  toggleMulti(questionId, optionId)
  saveAnswers()
}

// Fullscreen
const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      const element = runnerRoot.value || document.documentElement
      await element.requestFullscreen()
      isFullscreen.value = true
    } else {
      await document.exitFullscreen()
      isFullscreen.value = false
    }
  } catch (error) {
    console.error('Fullscreen error:', error)
    violation.value = 'Failed to toggle fullscreen. Please try again.'
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
  if (isThemeSwitching.value) return
  
  // Check if fullscreen is required but not active
  if (props.security.require_fullscreen && !document.fullscreenElement) {
    lockForSecurity('Fullscreen was exited. This attempt is now locked.')
  } else if (props.security.require_fullscreen && document.fullscreenElement) {
    // If fullscreen is restored, unlock if it was only a fullscreen issue
    if (locked.value && violation.value.includes('Fullscreen')) {
      locked.value = false
      violation.value = ''
    }
  }
}

// Prevent Copy
const preventCopy = (event) => {
  event.preventDefault()
  return false
}

const handleClose = () => {
  if (showClearAllConfirm.value) {
    cancelClearAllAnswers()
    return
  }

  saveAnswers()
  emit('close')
}

// Build Payload
const buildPayload = () => {
  return props.questions.map((question) => {
    const value = answers[question.id]

    if (question.question_type === 'mcq') {
      return {
        question_id: question.id,
        selected_option_id: value ? Number(value) : null
      }
    }

    if (question.question_type === 'multiple_select') {
      return {
        question_id: question.id,
        selected_option_ids: Array.isArray(value) ? value.map((item) => Number(item)) : []
      }
    }

    return {
      question_id: question.id,
      text_answer: value || ''
    }
  })
}

const emitSubmit = async () => {
  if (submitting.value) return
  if (isSubmittingToBackend.value) return
  
  // If locked, only allow submit if time is up
  if (locked.value && timeLeft.value > 0) {
    violation.value = 'Test is locked due to security violation. Cannot submit.'
    return
  }
  
  submitting.value = true
  isSubmittingToBackend.value = true
  autoSubmitted.value = true
  
  // Save answers locally first
  saveAnswers()
  
  try {
    // Submit to backend
    const payload = {
      answers: buildPayload(),
      passcode: props.passcode,
      test_id: props.test.id,
      submitted_at: new Date().toISOString(),
      time_remaining: timeLeft.value
    }
    
    // Emit submit event to parent for backend submission
    emit('submit', payload)
    
  } catch (error) {
    console.error('Submit error:', error)
    violation.value = 'Failed to submit test. Please try again.'
    autoSubmitted.value = false
  } finally {
    submitting.value = false
    isSubmittingToBackend.value = false
  }
}

// Theme
const applyTheme = (darkModeEnabled) => {
  isDarkMode.value = darkModeEnabled
  document.documentElement.classList.toggle('dark', darkModeEnabled)
  window.localStorage.setItem(THEME_STORAGE_KEY, darkModeEnabled ? 'dark' : 'light')
}

const toggleTheme = async () => {
  const wasFullscreen = Boolean(document.fullscreenElement)
  isThemeSwitching.value = true
  applyTheme(!isDarkMode.value)

  await nextTick()

  if (wasFullscreen && !document.fullscreenElement && runnerRoot.value?.requestFullscreen) {
    try {
      await runnerRoot.value.requestFullscreen()
    } catch {
      // Ignore
    }
  }

  setTimeout(() => {
    isThemeSwitching.value = false
  }, 400)
}

// Timer
const ensureStartedAt = () => {
  const stored = Number(window.localStorage.getItem(timerStorageKey))
  if (Number.isFinite(stored) && stored > 0) {
    startedAtMs.value = stored
    return
  }

  const now = Date.now()
  startedAtMs.value = now
  window.localStorage.setItem(timerStorageKey, String(now))
}

const syncTimeLeftWithWallClock = () => {
  if (!startedAtMs.value) return
  const elapsedSeconds = Math.floor((Date.now() - startedAtMs.value) / 1000)
  timeLeft.value = Math.max(0, durationSeconds - elapsedSeconds)
}

const tick = () => {
  syncTimeLeftWithWallClock()

  // Auto-submit when time runs out
  if (timeLeft.value <= 0 && !autoSubmitted.value && !submitting.value) {
    emitSubmit()
  }
}

// Security
const requestFullscreen = async () => {
  if (!props.security.require_fullscreen || fullscreenRequested || !runnerRoot.value?.requestFullscreen) {
    return
  }

  try {
    await runnerRoot.value.requestFullscreen()
    fullscreenRequested = true
    isFullscreen.value = true
  } catch {
    violation.value = 'Fullscreen access is required. Please allow fullscreen to continue.'
    locked.value = true
  }
}

const lockForSecurity = (message) => {
  if (locked.value) return
  violation.value = message
  locked.value = true
}

// Event Handlers
const handleVisibilityChange = () => {
  if (document.visibilityState !== 'visible' && props.security.prevent_tab_switch) {
    lockForSecurity('Tab switching detected. This attempt is now locked.')
  }
}

const handleBlur = () => {
  if (props.security.prevent_tab_switch) {
    lockForSecurity('Focus lost from the test window. This attempt is now locked.')
  }
}

const handleKeydown = (event) => {
  const key = event.key?.toLowerCase()

  if (showClearAllConfirm.value) {
    if (key === 'escape') {
      event.preventDefault()
      cancelClearAllAnswers()
    }
    if (key === 'enter') {
      event.preventDefault()
      confirmClearAllAnswers()
    }
    return
  }
  
  // Prevent copy shortcuts
  if ((event.ctrlKey || event.metaKey) && (key === 'c' || key === 'x' || key === 'v' || key === 'insert')) {
    event.preventDefault()
    return false
  }
  
  // Keyboard shortcuts for navigation
  if (key === 'arrowright' || key === 'arrowdown') {
    event.preventDefault()
    nextQuestion()
  }
  if (key === 'arrowleft' || key === 'arrowup') {
    event.preventDefault()
    previousQuestion()
  }
  
  // Fullscreen shortcut (F key)
  if (key === 'f' && !event.ctrlKey && !event.metaKey) {
    event.preventDefault()
    toggleFullscreen()
  }
}

// Lifecycle
onMounted(() => {
  // Load saved answers
  loadAnswers()
  
  // Theme
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme === 'dark')
  } else {
    applyTheme(document.documentElement.classList.contains('dark'))
  }

  // Timer
  ensureStartedAt()
  syncTimeLeftWithWallClock()

  // Events
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('blur', handleBlur)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('copy', preventCopy)
  document.addEventListener('cut', preventCopy)
  document.addEventListener('contextmenu', preventCopy)
  document.addEventListener('keydown', handleKeydown)

  timerHandle = window.setInterval(tick, 1000)
  requestFullscreen()
  
  // Auto-save every 10 seconds
  autoSaveInterval = setInterval(saveAnswers, 10000)
  
  // Save on beforeunload
  window.addEventListener('beforeunload', saveAnswers)
})

onBeforeUnmount(() => {
  if (timerHandle) {
    window.clearInterval(timerHandle)
  }
  if (saveTimeout.value) {
    clearTimeout(saveTimeout.value)
  }
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
  }
  saveAnswers()
  window.removeEventListener('beforeunload', saveAnswers)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('blur', handleBlur)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('copy', preventCopy)
  document.removeEventListener('cut', preventCopy)
  document.removeEventListener('contextmenu', preventCopy)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Fade Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

/* Pulse Animation for Timer */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}

/* Prevent selection */
.select-none {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Custom Scrollbar */
.scrollbar-light::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.scrollbar-light::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-light::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.scrollbar-light::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.scrollbar-dark::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.scrollbar-dark::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-dark::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 10px;
}

.scrollbar-dark::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Mobile Optimizations */
@media (max-width: 640px) {
  button, 
  a,
  [role="button"] {
    touch-action: manipulation;
    min-height: 36px;
  }
  
  .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
  }
}

/* Safe Area Support */
@supports (padding: max(0px)) {
  .fixed {
    padding-bottom: max(env(safe-area-inset-bottom));
  }
}
</style>
