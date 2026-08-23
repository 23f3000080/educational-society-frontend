<template>
    <div class="grade-calculator-wrapper" :class="{ 'dark-mode': isDarkMode }">
        <div class="container">
            <!-- Header -->
            <div class="calculator-header">
                <div class="header-content">
                    <div class="header-left">
                        <h2>📊 Grade Calculator</h2>
                    </div>
                    <button @click="showGuidelines = true" class="guidelines-btn">
                        <span class="btn-icon">📋</span>
                        Guidelines & Policy
                    </button>
                </div>
            </div>

            <!-- Course Selection -->
            <div class="selection-section">
                <label for="courseSelect" class="form-label">Select Bootcamp</label>
                <select 
                    id="courseSelect" 
                    v-model="selectedCourse" 
                    @change="resetAll"
                    class="form-select"
                >
                    <option value="">-- Please Select --</option>
                    <option value="python">🐍 Python Bootcamp</option>
                    <option value="sql">🗄️ SQL Bootcamp</option>
                    <option value="web">🌐 Web Development Bootcamp</option>
                </select>
            </div>

            <!-- Course Title -->
            <div v-if="selectedCourse" class="course-title-section">
                <h3 class="course-title">
                    Calculate Your <span class="course-highlight">{{ getCourseDisplayName(selectedCourse) }}</span> Grade
                </h3>
            </div>

            <!-- Three Column Grid -->
            <div v-if="selectedCourse" class="three-column-grid">
                <!-- Column 1: Assignment Calculator -->
                <div class="calculator-column assignment-column">
                    <div class="column-header">
                        <div class="header-left">
                            <span class="column-icon">📝</span>
                            <h3>Assignment Calculator</h3>
                        </div>
                        <span class="weight-badge column-badge">30%</span>
                    </div>
                    
                    <div class="column-subheader">
                        <span class="subheader-text">Total: {{ assignments.length }}</span>
                        <span class="subheader-text">Avg: <strong>{{ assignmentAverage.toFixed(1) }}%</strong></span>
                    </div>
                    
                    <div class="assignment-list">
                        <div 
                            v-for="(assignment, index) in assignments" 
                            :key="index"
                            class="assignment-item"
                        >
                            <div class="assignment-row">
                                <span class="assignment-number">#{{ index + 1 }}</span>
                                <div class="assignment-fields">
                                    <div class="field-group">
                                        <input
                                            type="number"
                                            min="0"
                                            v-model.number="assignment.obtained"
                                            @input="validateAssignmentInput(index)"
                                            placeholder="0"
                                            class="score-input-xs"
                                            title="Obtained Marks"
                                        />
                                        <span class="field-separator">/</span>
                                        <input
                                            type="number"
                                            min="1"
                                            v-model.number="assignment.total"
                                            @input="validateAssignmentTotal(index)"
                                            placeholder="100"
                                            class="score-input-xs total-input"
                                            title="Total Marks"
                                        />
                                    </div>
                                    <span class="assignment-percent">{{ getAssignmentScore(index) }}%</span>
                                </div>
                                <button 
                                    @click="removeAssignment(index)" 
                                    class="remove-btn-xs"
                                    v-if="assignments.length > 1"
                                    title="Remove assignment"
                                >
                                    ✕
                                </button>
                            </div>
                            <div class="progress-bar-xs">
                                <div 
                                    class="progress-fill-xs" 
                                    :style="{ width: getAssignmentProgress(index) + '%' }"
                                    :class="getProgressClass(getAssignmentProgress(index))"
                                ></div>
                            </div>
                        </div>
                    </div>
                    
                    <button @click="addAssignment" class="add-btn-sm">
                        <span class="plus-icon">+</span> Add Assignment
                    </button>
                </div>

                <!-- Column 2: Lab Assignment Calculator -->
                <div class="calculator-column lab-column">
                    <div class="column-header">
                        <div class="header-left">
                            <span class="column-icon">💻</span>
                            <h3>Lab Assignment Calculator</h3>
                        </div>
                        <span class="weight-badge column-badge">30%</span>
                    </div>
                    
                    <div class="column-subheader">
                        <span class="subheader-text">Total: {{ labs.length }}</span>
                        <span class="subheader-text">Avg: <strong>{{ labAverage.toFixed(1) }}%</strong></span>
                    </div>
                    
                    <div class="assignment-list">
                        <div 
                            v-for="(lab, index) in labs" 
                            :key="index"
                            class="assignment-item"
                        >
                            <div class="assignment-row">
                                <span class="assignment-number">#{{ index + 1 }}</span>
                                <div class="assignment-fields">
                                    <div class="field-group">
                                        <input
                                            type="number"
                                            min="0"
                                            v-model.number="lab.obtained"
                                            @input="validateLabInput(index)"
                                            placeholder="0"
                                            class="score-input-xs"
                                            title="Obtained Marks"
                                        />
                                        <span class="field-separator">/</span>
                                        <input
                                            type="number"
                                            min="1"
                                            v-model.number="lab.total"
                                            @input="validateLabTotal(index)"
                                            placeholder="100"
                                            class="score-input-xs total-input"
                                            title="Total Marks"
                                        />
                                    </div>
                                    <span class="assignment-percent">{{ getLabScore(index) }}%</span>
                                </div>
                                <button 
                                    @click="removeLab(index)" 
                                    class="remove-btn-xs"
                                    v-if="labs.length > 1"
                                    title="Remove lab"
                                >
                                    ✕
                                </button>
                            </div>
                            <div class="progress-bar-xs">
                                <div 
                                    class="progress-fill-xs" 
                                    :style="{ width: getLabProgress(index) + '%' }"
                                    :class="getProgressClass(getLabProgress(index))"
                                ></div>
                            </div>
                        </div>
                    </div>
                    
                    <button @click="addLab" class="add-btn-sm">
                        <span class="plus-icon">+</span> Add Lab Assignment
                    </button>
                </div>

                <!-- Column 3: Final Results -->
                <div class="calculator-column results-column">
                    <div class="column-header">
                        <div class="header-left">
                            <span class="column-icon">📊</span>
                            <h3>Final Results</h3>
                        </div>
                        <span class="weight-badge column-badge">100%</span>
                    </div>
                    
                    <div class="results-container">
                        <!-- Exam Input -->
                        <div class="exam-section">
                            <div class="exam-header">
                                <span class="exam-label">📝 Final Exam</span>
                                <span class="exam-weight">40%</span>
                            </div>
                            <div class="exam-input-group">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    v-model.number="examScore"
                                    @input="validateExamScore"
                                    placeholder="Enter score"
                                    class="exam-input-lg"
                                />
                                <span class="exam-max-label">/ 100</span>
                            </div>
                        </div>

                        <div class="results-divider"></div>

                        <!-- Weighted Scores -->
                        <div class="weighted-scores">
                            <div class="weighted-item">
                                <span class="weighted-label">📝 Assignments (30%)</span>
                                <span class="weighted-value">{{ (assignmentAverage * 0.30).toFixed(2) }}</span>
                            </div>
                            <div class="weighted-item">
                                <span class="weighted-label">💻 Labs (30%)</span>
                                <span class="weighted-value">{{ (labAverage * 0.30).toFixed(2) }}</span>
                            </div>
                            <div class="weighted-item">
                                <span class="weighted-label">📚 Exam (40%)</span>
                                <span class="weighted-value">{{ (examScore * 0.40).toFixed(2) }}</span>
                            </div>
                        </div>

                        <div class="results-divider"></div>

                        <!-- Final Results -->
                        <div class="final-results">
                            <div class="final-item total-score-item">
                                <span class="final-label">🎯 Total Score</span>
                                <span class="final-value total-score">{{ totalScore.toFixed(2) }}</span>
                            </div>
                            
                            <div class="final-item percentage-item">
                                <span class="final-label">📈 Percentage</span>
                                <span class="final-value percentage-value">{{ percentage.toFixed(2) }}%</span>
                            </div>
                            
                            <div class="final-item grade-item" :class="gradeClass">
                                <span class="final-label">🏆 Grade</span>
                                <span class="final-value grade-value">{{ grade }}</span>
                            </div>
                            
                            <div class="final-item status-item" :class="statusClass">
                                <span class="final-label">✅ Status</span>
                                <span class="final-value status-value">{{ status }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Placeholder -->
            <div v-if="!selectedCourse" class="placeholder">
                <div class="placeholder-icon">📚</div>
                <p>Please select a course to begin calculating your grade.</p>
            </div>
        </div>

        <!-- Guidelines Modal -->
        <div v-if="showGuidelines" class="modal-overlay" @click.self="showGuidelines = false">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>📋 Grading Guidelines & Policy</h2>
                    <button @click="showGuidelines = false" class="modal-close-btn">✕</button>
                </div>
                
                <div class="modal-body">
                    <!-- Grading Overview -->
                    <div class="guideline-section">
                        <h3>📊 Assessment Overview</h3>
                        <p>Continuous assessment + final exam. Encourages participation, practical implementation, and conceptual understanding.</p>
                    </div>

                    <!-- Grading Components -->
                    <div class="guideline-section">
                        <h3>📝 Grading Components</h3>
                        
                        <div class="component-card-guideline">
                            <div class="component-header-guideline">
                                <span class="component-icon-guideline">📝</span>
                                <div>
                                    <h4>Daily Class Assignments</h4>
                                    <span class="weight-tag">30%</span>
                                </div>
                            </div>
                            <ul>
                                <li>After each live class, assignment based on concepts covered</li>
                                <li>Reinforces learning & improves coding practice</li>
                                <li>Develops problem-solving skills</li>
                                <li>Submit before deadline</li>
                            </ul>
                            <div class="formula-box">
                                <strong>Assignment % = (Obtained ÷ Total) × 100</strong>
                            </div>
                        </div>

                        <div class="component-card-guideline">
                            <div class="component-header-guideline">
                                <span class="component-icon-guideline">💻</span>
                                <div>
                                    <h4>Weekly Lab Assignments</h4>
                                    <span class="weight-tag">30%</span>
                                </div>
                            </div>
                            <ul>
                                <li>End of each week, practical lab covering weekly topics</li>
                                <li>Evaluates practical implementation & coding standards</li>
                                <li>Assesses problem-solving & code quality</li>
                            </ul>
                            <div class="formula-box">
                                <strong>Lab % = (Obtained ÷ Total) × 100</strong>
                            </div>
                        </div>

                        <div class="component-card-guideline">
                            <div class="component-header-guideline">
                                <span class="component-icon-guideline">📚</span>
                                <div>
                                    <h4>Final Examination</h4>
                                    <span class="weight-tag">40%</span>
                                </div>
                            </div>
                            <ul>
                                <li>Comprehensive final exam at bootcamp end</li>
                                <li>MCQs, MSQs, Fill in the Blanks</li>
                                <li>Practical coding & output-based questions</li>
                                <li>Mini projects</li>
                            </ul>
                            <div class="formula-box">
                                <strong>Exam % = (Obtained ÷ 100) × 100</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Grade Scale -->
                    <div class="guideline-section">
                        <h3>🏆 Grade Scale</h3>
                        <div class="grade-scale-grid">
                            <div class="grade-scale-item grade-s">
                                <span class="grade-letter">S</span>
                                <span class="grade-range">&gt; 90%</span>
                                <span class="grade-desc">Outstanding</span>
                            </div>
                            <div class="grade-scale-item grade-a">
                                <span class="grade-letter">A</span>
                                <span class="grade-range">80-90%</span>
                                <span class="grade-desc">Excellent</span>
                            </div>
                            <div class="grade-scale-item grade-b">
                                <span class="grade-letter">B</span>
                                <span class="grade-range">70-80%</span>
                                <span class="grade-desc">Good</span>
                            </div>
                            <div class="grade-scale-item grade-c">
                                <span class="grade-letter">C</span>
                                <span class="grade-range">60-70%</span>
                                <span class="grade-desc">Satisfactory</span>
                            </div>
                            <div class="grade-scale-item grade-d">
                                <span class="grade-letter">D</span>
                                <span class="grade-range">45-60%</span>
                                <span class="grade-desc">Pass</span>
                            </div>
                            <div class="grade-scale-item grade-f">
                                <span class="grade-letter">F</span>
                                <span class="grade-range">&lt; 45%</span>
                                <span class="grade-desc">Fail</span>
                            </div>
                        </div>
                    </div>

                    <!-- Final Score Calculation -->
                    <div class="guideline-section">
                        <h3>🧮 Final Score</h3>
                        <div class="formula-box large">
                            <p><strong>Final = (A × 0.30) + (L × 0.30) + (F × 0.40)</strong></p>
                            <p class="formula-desc">A = Assignment %, L = Lab %, F = Exam %</p>
                        </div>
                    </div>

                    <!-- Passing Criteria -->
                    <div class="guideline-section">
                        <h3>✅ Passing Criteria</h3>
                        <div class="passing-info">
                            <p>Minimum <strong>45%</strong> required to pass.</p>
                            <div class="passing-badge">
                                <span>🎯 Pass: ≥ 45%</span>
                                <span>❌ Fail: &lt; 45%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Certification -->
                    <div class="guideline-section">
                        <h3>🎓 Certification</h3>
                        <p>Certificate awarded on successful completion (≥ 45%).</p>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="showGuidelines = false" class="modal-close-btn-footer">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, onBeforeUnmount } from 'vue'

// Dark mode state
const isDarkMode = ref(false)

// Course selection
const selectedCourse = ref('')

// Modal state
const showGuidelines = ref(false)

// Assignment data - start with 3 default assignments
const assignments = ref([
    { obtained: 0, total: 100 },
    { obtained: 0, total: 100 },
    { obtained: 0, total: 100 }
])

// Lab data - start with 2 default labs
const labs = ref([
    { obtained: 0, total: 100 },
    { obtained: 0, total: 100 }
])

// Exam score
const examScore = ref(0)

// Grading configuration
const gradingComponents = {
    python: {
        assignments: { label: 'Daily Assignments', weight: 30, maxScore: 100 },
        lab: { label: 'Weekly Lab Assignments', weight: 30, maxScore: 100 },
        exam: { label: 'Final Examination', weight: 40, maxScore: 100 }
    },
    sql: {
        assignments: { label: 'Daily Assignments', weight: 30, maxScore: 100 },
        lab: { label: 'Weekly Lab Assignments', weight: 30, maxScore: 100 },
        exam: { label: 'Final Examination', weight: 40, maxScore: 100 }
    },
    web: {
        assignments: { label: 'Daily Assignments', weight: 30, maxScore: 100 },
        lab: { label: 'Weekly Lab Assignments', weight: 30, maxScore: 100 },
        exam: { label: 'Final Examination', weight: 40, maxScore: 100 }
    }
}

// Get course display name
function getCourseDisplayName(courseKey) {
    const names = {
        python: '🐍 Python',
        sql: '🗄️ SQL',
        web: '🌐 Web Development'
    }
    return names[courseKey] || courseKey
}

// Computed properties for assignment averages
const assignmentAverage = computed(() => {
    if (assignments.value.length === 0) return 0
    let totalPercentage = 0
    let validCount = 0
    for (const assignment of assignments.value) {
        if (assignment.total > 0) {
            const percentage = (assignment.obtained / assignment.total) * 100
            totalPercentage += percentage
            validCount++
        }
    }
    return validCount > 0 ? totalPercentage / validCount : 0
})

const labAverage = computed(() => {
    if (labs.value.length === 0) return 0
    let totalPercentage = 0
    let validCount = 0
    for (const lab of labs.value) {
        if (lab.total > 0) {
            const percentage = (lab.obtained / lab.total) * 100
            totalPercentage += percentage
            validCount++
        }
    }
    return validCount > 0 ? totalPercentage / validCount : 0
})

// Total score calculation
const totalScore = computed(() => {
    const assignmentWeighted = (assignmentAverage.value / 100) * 30
    const labWeighted = (labAverage.value / 100) * 30
    const examWeighted = (examScore.value / 100) * 40
    return assignmentWeighted + labWeighted + examWeighted
})

const percentage = computed(() => {
    return totalScore.value
})

const grade = computed(() => {
    const p = percentage.value
    if (p > 90) return 'S'
    if (p > 80) return 'A'
    if (p > 70) return 'B'
    if (p > 60) return 'C'
    if (p > 45) return 'D'
    return 'F'
})

const status = computed(() => {
    const p = percentage.value
    if (p >= 45) return '✅ Pass'
    return '❌ Fail'
})

const gradeClass = computed(() => {
    const p = percentage.value
    if (p > 90) return 'grade-s'
    if (p > 80) return 'grade-a'
    if (p > 70) return 'grade-b'
    if (p > 60) return 'grade-c'
    if (p > 45) return 'grade-d'
    return 'grade-f'
})

const statusClass = computed(() => {
    return percentage.value >= 45 ? 'status-pass' : 'status-fail'
})

// Assignment methods
function addAssignment() {
    assignments.value.push({ obtained: 0, total: 100 })
}

function removeAssignment(index) {
    if (assignments.value.length > 1) {
        assignments.value.splice(index, 1)
    }
}

function validateAssignmentInput(index) {
    const assignment = assignments.value[index]
    if (assignment.obtained < 0) {
        assignment.obtained = 0
    }
    if (assignment.obtained > assignment.total) {
        assignment.obtained = assignment.total
    }
}

function validateAssignmentTotal(index) {
    const assignment = assignments.value[index]
    if (assignment.total < 1) {
        assignment.total = 1
    }
    if (assignment.obtained > assignment.total) {
        assignment.obtained = assignment.total
    }
}

function getAssignmentProgress(index) {
    const assignment = assignments.value[index]
    if (assignment.total === 0) return 0
    return (assignment.obtained / assignment.total) * 100
}

function getAssignmentScore(index) {
    const assignment = assignments.value[index]
    if (assignment.total === 0) return 0
    return ((assignment.obtained / assignment.total) * 100).toFixed(1)
}

// Lab methods
function addLab() {
    labs.value.push({ obtained: 0, total: 100 })
}

function removeLab(index) {
    if (labs.value.length > 1) {
        labs.value.splice(index, 1)
    }
}

function validateLabInput(index) {
    const lab = labs.value[index]
    if (lab.obtained < 0) {
        lab.obtained = 0
    }
    if (lab.obtained > lab.total) {
        lab.obtained = lab.total
    }
}

function validateLabTotal(index) {
    const lab = labs.value[index]
    if (lab.total < 1) {
        lab.total = 1
    }
    if (lab.obtained > lab.total) {
        lab.obtained = lab.total
    }
}

function getLabProgress(index) {
    const lab = labs.value[index]
    if (lab.total === 0) return 0
    return (lab.obtained / lab.total) * 100
}

function getLabScore(index) {
    const lab = labs.value[index]
    if (lab.total === 0) return 0
    return ((lab.obtained / lab.total) * 100).toFixed(1)
}

// Exam validation
function validateExamScore() {
    if (examScore.value < 0) {
        examScore.value = 0
    }
    if (examScore.value > 100) {
        examScore.value = 100
    }
}

// Reset all
function resetAll() {
    assignments.value = [
        { obtained: 0, total: 100 },
        { obtained: 0, total: 100 },
        { obtained: 0, total: 100 }
    ]
    labs.value = [
        { obtained: 0, total: 100 },
        { obtained: 0, total: 100 }
    ]
    examScore.value = 0
}

function getProgressClass(value) {
    if (value >= 80) return 'progress-high'
    if (value >= 60) return 'progress-medium'
    if (value >= 40) return 'progress-low'
    return 'progress-very-low'
}

// Dark mode functions
function loadDarkMode() {
    const storedDarkMode = localStorage.getItem('darkMode')
    if (storedDarkMode !== null) {
        isDarkMode.value = storedDarkMode === 'true'
        applyDarkMode(isDarkMode.value)
        return
    }
    const sessionDarkMode = sessionStorage.getItem('darkMode')
    if (sessionDarkMode !== null) {
        isDarkMode.value = sessionDarkMode === 'true'
        applyDarkMode(isDarkMode.value)
        return
    }
    isDarkMode.value = false
    applyDarkMode(false)
}

function applyDarkMode(isDark) {
    const wrapper = document.querySelector('.grade-calculator-wrapper')
    if (wrapper) {
        if (isDark) {
            wrapper.classList.add('dark-mode')
        } else {
            wrapper.classList.remove('dark-mode')
        }
    }
    if (isDark) {
        document.documentElement.classList.add('dark')
        document.body.classList.add('dark-mode')
    } else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('dark-mode')
    }
}

function updateDarkMode(newValue) {
    const isDark = newValue === true || newValue === 'true'
    isDarkMode.value = isDark
    applyDarkMode(isDark)
}

function handleStorageChange(event) {
    if (event.key === 'darkMode') {
        const isDark = event.newValue === 'true'
        isDarkMode.value = isDark
        applyDarkMode(isDark)
    }
}

function handleDarkModeEvent(event) {
    if (event.detail && event.detail.darkMode !== undefined) {
        const isDark = event.detail.darkMode === true || event.detail.darkMode === 'true'
        isDarkMode.value = isDark
        applyDarkMode(isDark)
    }
}

let darkModeCheckInterval = null

function startDarkModeCheck() {
    darkModeCheckInterval = setInterval(() => {
        const stored = localStorage.getItem('darkMode')
        if (stored !== null) {
            const isDark = stored === 'true'
            if (isDarkMode.value !== isDark) {
                isDarkMode.value = isDark
                applyDarkMode(isDark)
            }
        }
    }, 500)
}

watch(isDarkMode, (newValue) => {
    applyDarkMode(newValue)
}, { immediate: true })

onMounted(() => {
    loadDarkMode()
    applyDarkMode(isDarkMode.value)
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('darkModeChange', handleDarkModeEvent)
    startDarkModeCheck()
})

onBeforeUnmount(() => {
    window.removeEventListener('storage', handleStorageChange)
    window.removeEventListener('darkModeChange', handleDarkModeEvent)
    if (darkModeCheckInterval) {
        clearInterval(darkModeCheckInterval)
    }
})

defineExpose({
    setDarkMode: (value) => {
        updateDarkMode(value)
    },
    toggleDarkMode: () => {
        updateDarkMode(!isDarkMode.value)
    },
    getDarkMode: () => isDarkMode.value
})
</script>

<style scoped>
/* ====== BASE STYLES ====== */
.grade-calculator-wrapper {
    padding: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
    transition: all 0.3s ease;
    min-height: 100vh;
    background-color: #f8fafc;
}

/* ====== DARK MODE ====== */
.grade-calculator-wrapper.dark-mode {
    background-color: #0f172a;
}

.grade-calculator-wrapper.dark-mode .container {
    background: #1e293b;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    border: 1px solid #334155;
}

.grade-calculator-wrapper.dark-mode .calculator-header h2 {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .form-label {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .form-select {
    background: #0f172a;
    color: #f1f5f9;
    border-color: #334155;
}

.grade-calculator-wrapper.dark-mode .form-select:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

.grade-calculator-wrapper.dark-mode .form-select option {
    background: #1e293b;
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .course-title {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .course-highlight {
    color: #a78bfa;
}

.grade-calculator-wrapper.dark-mode .calculator-column {
    background: #1e293b;
    border-color: #334155;
}

.grade-calculator-wrapper.dark-mode .column-header h3 {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .column-subheader {
    background: #0f172a;
}

.grade-calculator-wrapper.dark-mode .subheader-text {
    color: #94a3b8;
}

.grade-calculator-wrapper.dark-mode .subheader-text strong {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .assignment-item {
    background: #0f172a;
    border-color: #334155;
}

.grade-calculator-wrapper.dark-mode .assignment-number {
    color: #94a3b8;
}

.grade-calculator-wrapper.dark-mode .score-input-xs {
    background: #1e293b;
    color: #f1f5f9;
    border-color: #334155;
}

.grade-calculator-wrapper.dark-mode .score-input-xs:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

.grade-calculator-wrapper.dark-mode .assignment-percent {
    color: #94a3b8;
}

.grade-calculator-wrapper.dark-mode .remove-btn-xs {
    color: #64748b;
}

.grade-calculator-wrapper.dark-mode .remove-btn-xs:hover {
    color: #f87171;
}

.grade-calculator-wrapper.dark-mode .add-btn-sm {
    background: #0f172a;
    color: #94a3b8;
    border-color: #334155;
}

.grade-calculator-wrapper.dark-mode .add-btn-sm:hover {
    background: #334155;
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .exam-section {
    background: #0f172a;
}

.grade-calculator-wrapper.dark-mode .exam-label {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .exam-weight {
    color: #94a3b8;
}

.grade-calculator-wrapper.dark-mode .exam-input-lg {
    background: #1e293b;
    color: #f1f5f9;
    border-color: #334155;
}

.grade-calculator-wrapper.dark-mode .exam-input-lg:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

.grade-calculator-wrapper.dark-mode .exam-max-label {
    color: #94a3b8;
}

.grade-calculator-wrapper.dark-mode .weighted-item {
    background: #0f172a;
}

.grade-calculator-wrapper.dark-mode .weighted-label {
    color: #94a3b8;
}

.grade-calculator-wrapper.dark-mode .weighted-value {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .final-label {
    color: #94a3b8;
}

.grade-calculator-wrapper.dark-mode .final-value {
    color: #f1f5f9;
}

.grade-calculator-wrapper.dark-mode .results-divider {
    border-top-color: #334155;
}

.grade-calculator-wrapper.dark-mode .placeholder p {
    color: #f1f5f9;
}

/* ====== HEADER ====== */
.calculator-header {
    margin-bottom: 2rem;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.header-left h2 {
    color: #1e293b;
    font-weight: 700;
    font-size: 2rem;
    transition: color 0.3s ease;
    letter-spacing: -0.5px;
    margin: 0;
}

/* ====== GUIDELINES BUTTON ====== */
.guidelines-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(139, 92, 246, 0.3);
    white-space: nowrap;
}

.guidelines-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
}

.guidelines-btn:active {
    transform: translateY(0);
}

.btn-icon {
    font-size: 1.1rem;
}

.dark-mode .guidelines-btn {
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
}

/* ====== COURSE TITLE ====== */
.course-title-section {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, #f5f3ff, #ede9fe);
    border: 1px solid #e0e7ff;
}

.dark-mode .course-title-section {
    background: linear-gradient(135deg, #1e1b4b, #2d1b69);
    border-color: #334155;
}

.course-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.dark-mode .course-title {
    color: #f1f5f9;
}

.course-highlight {
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding: 0 0.25rem;
}

/* ====== MODAL ====== */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
    padding: 1rem;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-container {
    background: #ffffff;
    border-radius: 1.5rem;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.dark-mode .modal-container {
    background: #1e293b;
    border: 1px solid #334155;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
}

.dark-mode .modal-header {
    border-bottom-color: #334155;
}

.modal-header h2 {
    color: #1e293b;
    font-weight: 700;
    font-size: 1.4rem;
    margin: 0;
}

.dark-mode .modal-header h2 {
    color: #f1f5f9;
}

.modal-close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #64748b;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.modal-close-btn:hover {
    background: #f1f5f9;
    color: #1e293b;
}

.dark-mode .modal-close-btn:hover {
    background: #334155;
    color: #f1f5f9;
}

.modal-body {
    padding: 2rem;
    overflow-y: auto;
    flex: 1;
}

.modal-body::-webkit-scrollbar {
    width: 6px;
}

.modal-body::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 9999px;
}

.modal-body::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 9999px;
}

.dark-mode .modal-body::-webkit-scrollbar-track {
    background: #0f172a;
}

.dark-mode .modal-body::-webkit-scrollbar-thumb {
    background: #334155;
}

.guideline-section {
    margin-bottom: 1.5rem;
}

.guideline-section:last-child {
    margin-bottom: 0;
}

.guideline-section h3 {
    color: #1e293b;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.dark-mode .guideline-section h3 {
    color: #f1f5f9;
}

.guideline-section p {
    color: #475569;
    line-height: 1.6;
    margin: 0;
    font-size: 0.9rem;
}

.dark-mode .guideline-section p {
    color: #94a3b8;
}

/* Component Cards in Guidelines */
.component-card-guideline {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
}

.dark-mode .component-card-guideline {
    background: #0f172a;
    border-color: #334155;
}

.component-card-guideline:last-child {
    margin-bottom: 0;
}

.component-header-guideline {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.25rem;
}

.component-icon-guideline {
    font-size: 1.3rem;
}

.component-header-guideline h4 {
    color: #1e293b;
    font-weight: 600;
    font-size: 0.9rem;
    margin: 0;
}

.dark-mode .component-header-guideline h4 {
    color: #f1f5f9;
}

.weight-tag {
    display: inline-block;
    background: #8b5cf6;
    color: white;
    padding: 0.05rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.65rem;
    font-weight: 600;
}

.component-card-guideline ul {
    margin: 0.25rem 0;
    padding-left: 1.25rem;
}

.component-card-guideline ul li {
    color: #475569;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 0.1rem;
}

.dark-mode .component-card-guideline ul li {
    color: #94a3b8;
}

.formula-box {
    background: #f1f5f9;
    padding: 0.4rem 0.75rem;
    border-radius: 0.4rem;
    margin-top: 0.25rem;
    text-align: center;
    border-left: 3px solid #8b5cf6;
}

.formula-box strong {
    color: #1e293b;
    font-size: 0.85rem;
}

.dark-mode .formula-box {
    background: #1e293b;
}

.dark-mode .formula-box strong {
    color: #f1f5f9;
}

.formula-box.large {
    padding: 0.75rem 1rem;
}

.formula-box.large p {
    margin: 0;
    font-size: 0.95rem;
}

.formula-desc {
    font-size: 0.8rem !important;
    color: #64748b !important;
    margin-top: 0.15rem !important;
}

.dark-mode .formula-desc {
    color: #94a3b8 !important;
}

/* Grade Scale */
.grade-scale-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 0.5rem;
    margin-top: 0.25rem;
}

.grade-scale-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background: #f8fafc;
    border-radius: 0.5rem;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;
}

.dark-mode .grade-scale-item {
    background: #0f172a;
    border-color: #334155;
}

.grade-scale-item:hover {
    transform: scale(1.05);
}

.grade-letter {
    font-size: 1.5rem;
    font-weight: 800;
}

.grade-range {
    font-size: 0.6rem;
    font-weight: 600;
    color: #64748b;
    margin: 0.1rem 0;
}

.dark-mode .grade-range {
    color: #94a3b8;
}

.grade-desc {
    font-size: 0.55rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.dark-mode .grade-desc {
    color: #94a3b8;
}

.grade-scale-item.grade-s .grade-letter { color: #4ade80; }
.grade-scale-item.grade-a .grade-letter { color: #22c55e; }
.grade-scale-item.grade-b .grade-letter { color: #60a5fa; }
.grade-scale-item.grade-c .grade-letter { color: #fbbf24; }
.grade-scale-item.grade-d .grade-letter { color: #fb923c; }
.grade-scale-item.grade-f .grade-letter { color: #f87171; }

.grade-scale-item.grade-s { border-color: #4ade80; }
.grade-scale-item.grade-a { border-color: #22c55e; }
.grade-scale-item.grade-b { border-color: #60a5fa; }
.grade-scale-item.grade-c { border-color: #fbbf24; }
.grade-scale-item.grade-d { border-color: #fb923c; }
.grade-scale-item.grade-f { border-color: #f87171; }

/* Passing Info */
.passing-info {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
}

.dark-mode .passing-info {
    background: #052e16;
    border-color: #166534;
}

.passing-info p {
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
}

.passing-info p strong {
    color: #16a34a;
}

.dark-mode .passing-info p strong {
    color: #4ade80;
}

.passing-badge {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.passing-badge span {
    padding: 0.15rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 600;
}

.passing-badge span:first-child {
    background: #dcfce7;
    color: #16a34a;
}

.passing-badge span:last-child {
    background: #fee2e2;
    color: #dc2626;
}

.dark-mode .passing-badge span:first-child {
    background: #052e16;
    color: #4ade80;
}

.dark-mode .passing-badge span:last-child {
    background: #450a0a;
    color: #f87171;
}

/* Modal Footer */
.modal-footer {
    padding: 0.75rem 2rem;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
}

.dark-mode .modal-footer {
    border-top-color: #334155;
}

.modal-close-btn-footer {
    padding: 0.4rem 1.5rem;
    background: #8b5cf6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-close-btn-footer:hover {
    background: #7c3aed;
    transform: translateY(-1px);
}

/* ====== CONTAINER ====== */
.container {
    background: #ffffff;
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
}

/* ====== SELECTION SECTION ====== */
.selection-section {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    transition: color 0.3s ease;
}

.form-select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 1rem;
    background: #ffffff;
    color: #1e293b;
    transition: all 0.3s ease;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5rem;
    padding-right: 3rem;
}

.form-select:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

/* ====== THREE COLUMN GRID ====== */
.three-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    margin-top: 0.5rem;
}

.calculator-column {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    padding: 1.25rem;
    transition: all 0.3s ease;
}

.calculator-column:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.assignment-column {
    border-top: 4px solid #8b5cf6;
}

.lab-column {
    border-top: 4px solid #06b6d4;
}

.results-column {
    border-top: 4px solid #f59e0b;
    background: linear-gradient(135deg, #faf5ff, #fdf2f8);
}

.dark-mode .assignment-column {
    border-top-color: #7c3aed;
}

.dark-mode .lab-column {
    border-top-color: #0891b2;
}

.dark-mode .results-column {
    border-top-color: #d97706;
    background: linear-gradient(135deg, #1e1b4b, #2d1b3d);
}

/* ====== COLUMN HEADER ====== */
.column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.column-icon {
    font-size: 1.1rem;
}

.column-header h3 {
    color: #1e293b;
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0;
}

.column-badge {
    font-size: 0.65rem;
    padding: 0.1rem 0.4rem;
    background: #f1f5f9;
    color: #64748b;
    border-radius: 9999px;
    font-weight: 700;
}

/* ====== COLUMN SUBHEADER ====== */
.column-subheader {
    display: flex;
    justify-content: space-between;
    background: #f8fafc;
    padding: 0.3rem 0.6rem;
    border-radius: 0.4rem;
    margin-bottom: 0.5rem;
    font-size: 0.7rem;
}

.subheader-text {
    color: #64748b;
}

.subheader-text strong {
    color: #1e293b;
}

/* ====== ASSIGNMENT LIST ====== */
.assignment-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-height: 320px;
    overflow-y: auto;
    padding-right: 0.2rem;
}

.assignment-list::-webkit-scrollbar {
    width: 3px;
}

.assignment-list::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 9999px;
}

.assignment-list::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 9999px;
}

.assignment-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.4rem;
    padding: 0.3rem 0.5rem;
}

.assignment-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.assignment-number {
    font-size: 0.6rem;
    font-weight: 600;
    color: #64748b;
    min-width: 18px;
}

.assignment-fields {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.field-group {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    flex: 1;
}

.score-input-xs {
    width: 38px;
    padding: 0.15rem 0.2rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.3rem;
    font-size: 0.7rem;
    background: #ffffff;
    color: #1e293b;
    transition: all 0.3s ease;
    text-align: center;
}

.score-input-xs:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
}

.total-input {
    width: 42px;
}

.field-separator {
    font-size: 0.65rem;
    color: #94a3b8;
}

.assignment-percent {
    font-size: 0.65rem;
    font-weight: 600;
    color: #64748b;
    min-width: 32px;
    text-align: right;
}

.remove-btn-xs {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 0.6rem;
    padding: 0 0.1rem;
    transition: all 0.3s ease;
    opacity: 0.5;
}

.remove-btn-xs:hover {
    opacity: 1;
    color: #ef4444;
    transform: scale(1.2);
}

/* ====== PROGRESS BAR XS ====== */
.progress-bar-xs {
    width: 100%;
    height: 2px;
    background: #e2e8f0;
    border-radius: 9999px;
    overflow: hidden;
    margin-top: 0.15rem;
}

.progress-fill-xs {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-high { background: linear-gradient(90deg, #22c55e, #4ade80); }
.progress-medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
.progress-low { background: linear-gradient(90deg, #f97316, #fb923c); }
.progress-very-low { background: linear-gradient(90deg, #ef4444, #f87171); }

/* ====== ADD BUTTON SM ====== */
.add-btn-sm {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.35rem;
    border: 1.5px dashed #e2e8f0;
    border-radius: 0.4rem;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.7rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
}

.add-btn-sm:hover {
    border-color: #8b5cf6;
    background: #f5f3ff;
    color: #7c3aed;
}

.plus-icon {
    font-size: 0.9rem;
    font-weight: 700;
}

/* ====== RESULTS COLUMN ====== */
.results-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Exam Section */
.exam-section {
    background: #f8fafc;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
}

.exam-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
}

.exam-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #1e293b;
}

.exam-weight {
    font-size: 0.65rem;
    color: #64748b;
    font-weight: 500;
}

.exam-input-group {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.exam-input-lg {
    flex: 1;
    padding: 0.4rem 0.6rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.4rem;
    font-size: 0.85rem;
    background: #ffffff;
    color: #1e293b;
    transition: all 0.3s ease;
}

.exam-input-lg:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

.exam-max-label {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 500;
}

/* Weighted Scores */
.weighted-scores {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.weighted-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.5rem;
    background: #f8fafc;
    border-radius: 0.3rem;
}

.weighted-label {
    font-size: 0.7rem;
    color: #64748b;
}

.weighted-value {
    font-size: 0.75rem;
    font-weight: 600;
    color: #1e293b;
}

.results-divider {
    border-top: 1.5px dashed #e2e8f0;
}

/* Final Results */
.final-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
}

.final-item {
    padding: 0.4rem;
    border-radius: 0.4rem;
    text-align: center;
    background: #f8fafc;
}

.final-label {
    display: block;
    font-size: 0.6rem;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.final-value {
    display: block;
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    margin-top: 0.05rem;
}

.total-score-item {
    grid-column: span 2;
    background: linear-gradient(135deg, #ede9fe, #f3e8ff);
}

.total-score {
    color: #7c3aed;
    font-size: 1.2rem;
}

.percentage-item {
    grid-column: span 2;
    background: linear-gradient(135deg, #dbeafe, #eff6ff);
}

.percentage-value {
    color: #3b82f6;
    font-size: 1.2rem;
}

.grade-item {
    grid-column: span 2;
}

.grade-value {
    font-size: 1.6rem;
}

.grade-s .grade-value { color: #4ade80; }
.grade-a .grade-value { color: #22c55e; }
.grade-b .grade-value { color: #60a5fa; }
.grade-c .grade-value { color: #fbbf24; }
.grade-d .grade-value { color: #fb923c; }
.grade-f .grade-value { color: #f87171; }

.status-item {
    grid-column: span 2;
}

.status-value {
    font-size: 0.9rem;
}

.status-pass .status-value { color: #22c55e; }
.status-fail .status-value { color: #f87171; }

.dark-mode .total-score-item {
    background: linear-gradient(135deg, #2d1b69, #1e1b4b);
}

.dark-mode .percentage-item {
    background: linear-gradient(135deg, #1a2a4a, #1a1a4a);
}

.dark-mode .weighted-item {
    background: #0f172a;
}

.dark-mode .exam-section {
    background: #0f172a;
}

.dark-mode .final-item {
    background: #0f172a;
}

/* ====== PLACEHOLDER ====== */
.placeholder {
    text-align: center;
    padding: 3rem 1rem;
}

.placeholder-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
}

.placeholder p {
    color: #1e293b;
    font-size: 1.1rem;
    margin: 0.5rem 0;
    transition: color 0.3s ease;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1024px) {
    .three-column-grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .results-column {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .grade-calculator-wrapper {
        padding: 0.75rem;
    }
    
    .container {
        padding: 1rem;
        border-radius: 1rem;
    }
    
    .three-column-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .results-column {
        grid-column: span 1;
    }
    
    .calculator-header h2 {
        font-size: 1.5rem;
    }
    
    .course-title {
        font-size: 1.2rem;
    }
    
    .final-results {
        grid-template-columns: 1fr 1fr;
    }
    
    .total-score-item,
    .percentage-item,
    .grade-item,
    .status-item {
        grid-column: span 2;
    }
    
    .header-content {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .guidelines-btn {
        width: 100%;
        justify-content: center;
    }
    
    .modal-container {
        max-height: 95vh;
        margin: 0.5rem;
    }
    
    .modal-header {
        padding: 0.75rem 1rem;
    }
    
    .modal-body {
        padding: 1rem;
    }
    
    .modal-footer {
        padding: 0.5rem 1rem;
    }
    
    .grade-scale-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 480px) {
    .grade-calculator-wrapper {
        padding: 0.5rem;
    }
    
    .container {
        padding: 0.5rem;
    }
    
    .calculator-header h2 {
        font-size: 1.2rem;
    }
    
    .course-title {
        font-size: 1rem;
    }
    
    .calculator-column {
        padding: 0.6rem;
    }
    
    .assignment-row {
        flex-wrap: wrap;
    }
    
    .assignment-fields {
        flex: 1 1 100%;
    }
    
    .final-results {
        grid-template-columns: 1fr;
    }
    
    .total-score-item,
    .percentage-item,
    .grade-item,
    .status-item {
        grid-column: span 1;
    }
    
    .grade-scale-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .modal-header h2 {
        font-size: 1rem;
    }
}
</style>