<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: What is a Capstone Project? -->
    <section id="wd-w8-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🏆</span>
          What is a Capstone Project?
        </h2>
        <p class="mt-2 text-sm sm:text-base transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          A <strong>Capstone Project</strong> is the final project of a course that combines everything you've learned into one complete application.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            Think of it as your <strong>proof of learning</strong>. This project demonstrates your skills to:
          </p>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="audience in ['Employers', 'Internship recruiters', 'Clients', 'Colleges', 'Freelancers']" :key="audience"
              class="rounded-full px-3 py-1 text-xs"
              :class="isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'"
            >
              {{ audience }}
            </span>
          </div>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">Frontend</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>✅ HTML</li>
              <li>✅ CSS</li>
              <li>✅ Bootstrap</li>
              <li>✅ JavaScript</li>
              <li>✅ DOM Manipulation</li>
            </ul>
          </div>
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">Backend</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>✅ Flask</li>
              <li>✅ Jinja Templates</li>
              <li>✅ Routing</li>
              <li>✅ Form Handling</li>
            </ul>
          </div>
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">Database</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>✅ SQLite</li>
              <li>✅ CRUD Operations</li>
              <li>✅ Relationships</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 2: Full Stack Workflow -->
    <section id="wd-w8-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔄</span>
          Full Stack Workflow
        </h2>

        <div class="mt-4 rounded-lg p-4 font-mono text-xs sm:text-sm" :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-50 text-slate-700'">
          <div class="text-center">
            <div>User</div>
            <div class="py-1">│</div>
            <div class="py-1">▼</div>
            <div>Browser</div>
            <div class="py-1">│</div>
            <div class="py-1">▼</div>
            <div>HTML + CSS + JavaScript</div>
            <div class="py-1">│</div>
            <div class="py-1">▼</div>
            <div>Flask Server</div>
            <div class="py-1">│</div>
            <div class="py-1">▼</div>
            <div>SQLite Database</div>
            <div class="py-1">│</div>
            <div class="py-1">▼</div>
            <div>Flask</div>
            <div class="py-1">│</div>
            <div class="py-1">▼</div>
            <div>Browser</div>
          </div>
        </div>
        <p class="mt-2 text-xs text-center" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          Every request follows this cycle.
        </p>
      </div>
    </section>

    <!-- Topic 3: Project Ideas -->
    <section id="wd-w8-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">💡</span>
          Suggested Project Ideas
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div v-for="project in [
            { name: 'Student Management System', features: ['Add Students', 'Edit Students', 'Delete Students', 'Search Students', 'Dashboard'] },
            { name: 'Library Management System', features: ['Add Books', 'Issue Books', 'Return Books', 'Book List'] },
            { name: 'Expense Tracker', features: ['Add Expense', 'Categories', 'Monthly Summary', 'Delete Expenses'] },
            { name: 'Notes Application', features: ['Create Notes', 'Edit Notes', 'Delete Notes', 'Search Notes'] },
            { name: 'Personal Blog', features: ['Create Posts', 'Edit Posts', 'Delete Posts', 'Categories'] },
            { name: 'Course Management System', features: ['Student Registration', 'Courses', 'Enrollment', 'Dashboard'] }
          ]" :key="project.name" class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              {{ project.name }}
            </h3>
            <ul class="mt-2 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li v-for="feature in project.features" :key="feature">✅ {{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: Project Planning -->
    <section id="wd-w8-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📋</span>
          Project Planning
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Before writing code, answer these questions:
        </p>

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div v-for="question in [
            'What problem does the project solve?',
            'Who will use it?',
            'What pages are required?',
            'What information needs to be stored?',
            'Which database tables are needed?'
          ]" :key="question" class="rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <span class="text-indigo-400">❓</span> {{ question }}
            </p>
          </div>
        </div>
        <div class="mt-4 rounded-lg p-3" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm text-indigo-400">💡 Planning first saves a lot of time later.</p>
        </div>
      </div>
    </section>

    <!-- Topic 5: Folder Structure -->
    <section id="wd-w8-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📁</span>
          Recommended Folder Structure
        </h2>

        <div class="mt-4 rounded-lg p-4 font-mono text-xs sm:text-sm" :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-50 text-slate-700'">
          <div>project/</div>
          <div class="pl-4">├── app.py</div>
          <div class="pl-4">├── requirements.txt</div>
          <div class="pl-4">├── database.db</div>
          <div class="pl-4">├── static/</div>
          <div class="pl-8">├── css/</div>
          <div class="pl-8">├── js/</div>
          <div class="pl-8">└── images/</div>
          <div class="pl-4">├── templates/</div>
          <div class="pl-8">├── base.html</div>
          <div class="pl-8">├── index.html</div>
          <div class="pl-8">├── about.html</div>
          <div class="pl-8">├── contact.html</div>
          <div class="pl-8">└── dashboard.html</div>
          <div class="pl-4">└── README.md</div>
        </div>
        <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          Keeping files organized makes projects easier to maintain.
        </p>
      </div>
    </section>

    <!-- Topic 6: Development Steps -->
    <section id="wd-w8-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Project Development Steps
        </h2>

        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          <div v-for="(step, index) in [
            'Create Flask application',
            'Create templates',
            'Add Bootstrap',
            'Design pages',
            'Create SQLite database',
            'Add CRUD operations',
            'Connect frontend and backend',
            'Test everything',
            'Deploy online'
          ]" :key="index" class="rounded-lg p-3 flex items-center gap-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {{ index + 1 }}
            </span>
            <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ step }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: Testing & Debugging -->
    <section id="wd-w8-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🧪</span>
          Testing & Debugging
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Manual Testing Checklist
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Links work</li>
              <li class="flex items-center gap-2">✅ Images load</li>
              <li class="flex items-center gap-2">✅ Forms submit correctly</li>
              <li class="flex items-center gap-2">✅ Records save to database</li>
              <li class="flex items-center gap-2">✅ Records update correctly</li>
              <li class="flex items-center gap-2">✅ Delete works</li>
              <li class="flex items-center gap-2">✅ No broken pages</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Common Debugging Tools
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">🛠️ Browser Console</li>
              <li class="flex items-center gap-2">🛠️ Flask Debug Mode</li>
              <li class="flex items-center gap-2">🛠️ Terminal Output</li>
            </ul>
            <div class="mt-3 rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">app.run(debug=True)</code>
              <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                Shows detailed error messages during development.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Responsive Testing
          </h3>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="device in ['📱 Mobile phones', '📱 Tablets', '💻 Laptops', '🖥️ Desktop monitors']" :key="device"
              class="rounded-full px-3 py-1 text-xs"
              :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
            >
              {{ device }}
            </span>
          </div>
          <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            Most browsers provide <strong>Developer Tools</strong> with a mobile view to simulate different screen sizes.
          </p>
        </div>

        <!-- Common Errors -->
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4 border-2 border-red-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-red-50'">
            <h3 class="font-semibold text-red-400">❌ Common HTML Errors</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Missing closing tags</li>
              <li>• Wrong file paths</li>
              <li>• Broken image links</li>
            </ul>
          </div>

          <div class="rounded-lg p-4 border-2 border-red-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-red-50'">
            <h3 class="font-semibold text-red-400">❌ Common CSS Errors</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Missing semicolons</li>
              <li>• Incorrect selectors</li>
              <li>• Conflicting styles</li>
            </ul>
          </div>

          <div class="rounded-lg p-4 border-2 border-red-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-red-50'">
            <h3 class="font-semibold text-red-400">❌ Common JavaScript Errors</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Selecting elements before page loads</li>
              <li>• Misspelled variable names</li>
              <li>• Incorrect event listeners</li>
            </ul>
            <div class="mt-2 rounded p-1.5" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">console.log()</code>
              <span class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"> → Use to inspect values</span>
            </div>
          </div>

          <div class="rounded-lg p-4 border-2 border-red-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-red-50'">
            <h3 class="font-semibold text-red-400">❌ Common Flask Errors</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Route not found (404)</li>
              <li>• Template not found</li>
              <li>• Missing imports</li>
              <li>• Wrong folder structure</li>
              <li>• Incorrect HTTP methods</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            ✅ Debugging Tip
          </h3>
          <code-slicer code='console.log("Value:", variable)' :is-dark="isDarkMode" />
          <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            Use console.log() to check values at different points in your code.
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 8: Git & GitHub -->
    <section id="wd-w8-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🐙</span>
          Git & GitHub
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Version control helps you save and track your project.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Basic Git Commands
          </h3>
          <div class="mt-2 space-y-2">
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">git init</code>
              <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Initialize a repository</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">git status</code>
              <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Check project status</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">git add .</code>
              <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Add all files</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">git commit -m "Initial project"</code>
              <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Commit changes</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">git remote add origin &lt;repository-url&gt;</code>
              <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Connect to GitHub</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-xs">git push -u origin main</code>
              <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Push your project</span>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Why GitHub?
          </h3>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="benefit in ['Backup your code', 'Collaborate with others', 'Showcase projects to employers']" :key="benefit"
              class="rounded-full px-3 py-1 text-xs"
              :class="isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'"
            >
              ✅ {{ benefit }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: Deployment -->
    <section id="wd-w8-t9" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🚀</span>
          Deployment
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Deployment means making your website available on the Internet.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Popular Platforms
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ PythonAnywhere</li>
              <li class="flex items-center gap-2">✅ Render</li>
              <li class="flex items-center gap-2">✅ Railway</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Deployment Steps
            </h3>
            <ol class="mt-2 space-y-1 text-sm list-decimal list-inside" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>Push project to GitHub</li>
              <li>Connect to hosting platform</li>
              <li>Install dependencies</li>
              <li>Configure environment settings</li>
              <li>Deploy the application</li>
              <li>Get public website URL</li>
            </ol>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            🌐 Now anyone can access your project using a web browser!
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 10: Portfolio -->
    <section id="wd-w8-t10" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📁</span>
          Portfolio
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Create a portfolio to showcase your work.
        </p>

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div v-for="item in ['Your name', 'About section', 'Skills', 'Projects', 'GitHub profile', 'LinkedIn profile', 'Contact information']" :key="item"
            class="rounded-lg p-3 flex items-center gap-2"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-50 text-slate-600'"
          >
            <span class="text-indigo-400">✅</span>
            {{ item }}
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 Your capstone project should be the highlight of your portfolio.
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 11: Bootcamp Summary -->
    <section id="wd-w8-t11" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-indigo-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🎓</span>
          Bootcamp Summary
        </h2>

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div v-for="week in [
            { num: 1, title: 'Web Development Basics & HTML' },
            { num: 2, title: 'CSS & Responsive Design' },
            { num: 3, title: 'Advanced CSS & Bootstrap' },
            { num: 4, title: 'JavaScript Fundamentals' },
            { num: 5, title: 'DOM Manipulation & APIs' },
            { num: 6, title: 'Flask & Backend Development' },
            { num: 7, title: 'SQLite & CRUD Operations' },
            { num: 8, title: 'Full-Stack Project & Deployment' }
          ]" :key="week.num" class="rounded-lg p-3 flex items-center gap-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {{ week.num }}
            </span>
            <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ week.title }}</span>
          </div>
        </div>

        <div class="mt-6 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            🎉 Congratulations! You have learned how to:
          </p>
          <ul class="mt-3 space-y-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Build webpages with HTML.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Design beautiful interfaces using CSS and Bootstrap.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Add interactivity with JavaScript.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Manipulate the DOM and work with APIs.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Develop backend applications using Flask.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create dynamic pages using Jinja.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Store and manage data using SQLite.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Build a complete full-stack web application.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Test, debug, and deploy your project.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Organize code using industry-standard project structures.</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Final Advice:</strong> Becoming a web developer isn't about memorizing every tag or function—it's about understanding how different technologies work together. Keep building small projects, explore new ideas, read documentation, and practice consistently. Every project you complete will strengthen your skills and confidence. Happy coding! 🚀
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 12: What's Next? -->
    <section id="wd-w8-t12" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-purple-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🚀</span>
          What's Next?
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          After completing this bootcamp, you can continue learning:
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">Frontend</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• React.js</li>
              <li>• Vue.js</li>
              <li>• Next.js</li>
              <li>• TypeScript</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">Backend</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Django</li>
              <li>• FastAPI</li>
              <li>• Node.js + Express</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">DevOps</h3>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Docker</li>
              <li>• Nginx</li>
              <li>• CI/CD</li>
              <li>• AWS, Azure</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Databases
          </h3>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="db in ['MySQL', 'PostgreSQL', 'MongoDB']" :key="db"
              class="rounded-full px-3 py-1 text-xs"
              :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
            >
              {{ db }}
            </span>
          </div>
          <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            These technologies will help you build larger and more scalable applications.
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 13: Best Practices -->
    <section id="wd-w8-t13" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-indigo-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">✅</span>
          Best Practices & Common Mistakes
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Best Practices
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Plan before you code</li>
              <li class="flex items-center gap-2">✅ Keep project structure organized</li>
              <li class="flex items-center gap-2">✅ Reuse templates with Jinja inheritance</li>
              <li class="flex items-center gap-2">✅ Write clean and readable code</li>
              <li class="flex items-center gap-2">✅ Use Bootstrap for consistent UI</li>
              <li class="flex items-center gap-2">✅ Validate user input</li>
              <li class="flex items-center gap-2">✅ Handle errors gracefully</li>
              <li class="flex items-center gap-2">✅ Test before deploying</li>
              <li class="flex items-center gap-2">✅ Commit code regularly using Git</li>
              <li class="flex items-center gap-2">✅ Keep improving after deployment</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ❌ Common Mistakes
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">❌ Writing all code in a single file</li>
              <li class="flex items-center gap-2">❌ Not separating HTML, CSS, and JavaScript</li>
              <li class="flex items-center gap-2">❌ Forgetting to validate form inputs</li>
              <li class="flex items-center gap-2">❌ Hardcoding URLs instead of url_for()</li>
              <li class="flex items-center gap-2">❌ Ignoring mobile responsiveness</li>
              <li class="flex items-center gap-2">❌ Deploying without testing</li>
              <li class="flex items-center gap-2">❌ Not maintaining a GitHub repository</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 14: README & Portfolio -->
    <section id="wd-w8-t14" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📄</span>
          README File
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Every professional project should include a <code>README.md</code>.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            A good README should contain:
          </h3>
          <div class="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div v-for="item in ['Project name', 'Project description', 'Features', 'Technologies used', 'Installation steps', 'Screenshots (optional)', 'Author information']" :key="item"
              class="rounded p-2 text-center"
              :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
            >
              {{ item }}
            </div>
          </div>
          <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            This helps others understand and run your project.
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 15: Final Summary -->
    <section id="wd-w8-t15" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-yellow-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🎊</span>
          Congratulations! You've Completed the Bootcamp!
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4 text-center" :class="isDarkMode ? 'bg-slate-600' : 'bg-green-50'">
            <div class="text-6xl mb-3">🎉</div>
            <h3 class="font-semibold text-green-400">You Did It!</h3>
            <p class="text-sm mt-1" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              You've completed the Web Development Bootcamp!
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              What You've Achieved
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Built full-stack web applications</li>
              <li class="flex items-center gap-2">✅ Mastered HTML, CSS, JavaScript</li>
              <li class="flex items-center gap-2">✅ Learned Flask & SQLite</li>
              <li class="flex items-center gap-2">✅ Created responsive designs</li>
              <li class="flex items-center gap-2">✅ Deployed projects online</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Remember:</strong> This is just the beginning. Keep building, keep learning, and keep growing. The skills you've learned here are the foundation for a successful career in web development. Go build something amazing! 🚀
          </p>
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <a href="https://github.com" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 GitHub
          </a>
          <a href="https://www.pythonanywhere.com" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 PythonAnywhere
          </a>
          <a href="https://render.com" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 Render
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import CodeSlicer from '../../CodeSlicer.vue';

const props = defineProps({
  isDarkMode: Boolean,
  week: Number,
});

const emit = defineEmits(['topic-updated']);

onMounted(() => {
  const topics = [
    { id: 'wd-w8-t1', title: 'What is a Capstone Project?' },
    { id: 'wd-w8-t2', title: 'Full Stack Workflow' },
    { id: 'wd-w8-t3', title: 'Suggested Project Ideas' },
    { id: 'wd-w8-t4', title: 'Project Planning' },
    { id: 'wd-w8-t5', title: 'Recommended Folder Structure' },
    { id: 'wd-w8-t6', title: 'Project Development Steps' },
    { id: 'wd-w8-t7', title: 'Testing & Debugging' },
    { id: 'wd-w8-t8', title: 'Git & GitHub' },
    { id: 'wd-w8-t9', title: 'Deployment' },
    { id: 'wd-w8-t10', title: 'Portfolio' },
    { id: 'wd-w8-t11', title: 'Bootcamp Summary' },
    { id: 'wd-w8-t12', title: 'What\'s Next?' },
    { id: 'wd-w8-t13', title: 'Best Practices & Common Mistakes' },
    { id: 'wd-w8-t14', title: 'README File' },
    { id: 'wd-w8-t15', title: 'Congratulations!' },
  ];
  emit('topic-updated', topics);
});
</script>