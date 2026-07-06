<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: What is a Database? -->
    <section id="wd-w7-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">💾</span>
          What is a Database?
        </h2>
        <p class="mt-2 text-sm sm:text-base transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          A <strong>database</strong> is a place where data is stored in an organized way.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-yellow-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            ⚠️ Instead of storing information inside Python variables, databases allow us to save data permanently.
          </p>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Examples of Database Data:
            </h3>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="item in ['Student records', 'User accounts', 'Products', 'Orders', 'Blog posts', 'Course enrollments']" :key="item"
                class="rounded-full px-2 py-0.5 text-xs"
                :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
              >
                {{ item }}
              </span>
            </div>
            <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Even after closing your application, the data remains safe.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Why Do We Need a Database?
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold text-red-400">❌ Without a database:</p>
                <p class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Student data disappears after restarting.</p>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold text-green-400">✅ With a database:</p>
                <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  <li>• Student data is permanently saved</li>
                  <li>• Thousands of students can be stored</li>
                  <li>• Data can be searched quickly</li>
                  <li>• Data can be updated or deleted easily</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Types of Databases
          </h3>
          <div class="mt-2 overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-200'">
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Database</th>
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="db in [
                  { name: 'SQLite', type: 'Relational' },
                  { name: 'MySQL', type: 'Relational' },
                  { name: 'PostgreSQL', type: 'Relational' },
                  { name: 'Oracle', type: 'Relational' },
                  { name: 'MongoDB', type: 'NoSQL' }
                ]" :key="db.name" class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-100'">
                  <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ db.name }}</td>
                  <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ db.type }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-xs text-indigo-400">
            ⭐ For beginners, <strong>SQLite</strong> is the best choice because it is simple and doesn't require installing a separate database server.
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 2: What is SQLite? -->
    <section id="wd-w7-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🗄️</span>
          What is SQLite?
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          <strong>SQLite</strong> is a lightweight, file-based database.
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="feature in ['Free', 'Open Source', 'Fast', 'Easy to use', 'No separate server required', 'Perfect for learning']" :key="feature"
            class="rounded-full px-3 py-1 text-xs"
            :class="isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'"
          >
            ✅ {{ feature }}
          </span>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            SQLite stores all data inside a single file, for example:
          </p>
          <code-slicer code='students.db' :is-dark="isDarkMode" />
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Database Terminology
          </h3>
          <div class="mt-2 overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-200'">
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Term</th>
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="term in [
                  { term: 'Database', meaning: 'Collection of related data' },
                  { term: 'Table', meaning: 'Stores similar data' },
                  { term: 'Row', meaning: 'One record' },
                  { term: 'Column', meaning: 'One property of a record' },
                  { term: 'Primary Key', meaning: 'Unique identifier' },
                  { term: 'Record', meaning: 'One complete row' }
                ]" :key="term.term" class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-100'">
                  <td class="p-2 font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">{{ term.term }}</td>
                  <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ term.meaning }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 3: Database Tables -->
    <section id="wd-w7-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📊</span>
          Database Tables & Primary Keys
        </h2>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Example: Students Table
          </h3>
          <div class="mt-2 overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-200'">
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">ID (Primary Key)</th>
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Name</th>
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Age</th>
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Course</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in [
                  { id: 1, name: 'Ankit', age: 20, course: 'Python' },
                  { id: 2, name: 'Priya', age: 19, course: 'Web Development' },
                  { id: 3, name: 'Rahul', age: 21, course: 'SQL' }
                ]" :key="student.id" class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-100'">
                  <td class="p-2 font-semibold text-indigo-400">{{ student.id }}</td>
                  <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ student.name }}</td>
                  <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ student.age }}</td>
                  <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ student.course }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="mt-2 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            <li>• Table → Students</li>
            <li>• Row → One student</li>
            <li>• Column → Name, Age, Course</li>
            <li>• Primary Key → ID</li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Primary Key
          </h3>
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            A <strong>Primary Key</strong> uniquely identifies every record. No two students can have the same ID.
          </p>
          <div class="mt-2 overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-200'">
                  <th class="p-2 text-left text-indigo-400">ID</th>
                  <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in [
                  { id: 1, name: 'Ankit' },
                  { id: 2, name: 'Rahul' },
                  { id: 3, name: 'Priya' }
                ]" :key="student.id" class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-100'">
                  <td class="p-2 font-semibold text-indigo-400">{{ student.id }}</td>
                  <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ student.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: Connecting Flask with SQLite -->
    <section id="wd-w7-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔗</span>
          Connecting Flask with SQLite
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Python provides a built-in library called <code>sqlite3</code>.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Import & Connect
            </h3>
            <code-slicer code='import sqlite3\n\nconnection = sqlite3.connect("students.db")' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              If the database file doesn't exist, SQLite automatically creates it.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Creating a Cursor
            </h3>
            <code-slicer code='cursor = connection.cursor()' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Think of the cursor as a messenger between Python and the database.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Save Changes
            </h3>
            <code-slicer code='connection.commit()' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Always commit after making changes.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Close Connection
            </h3>
            <code-slicer code='connection.close()' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Always close the connection when done.
            </p>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Creating a Table
          </h3>
          <code-slicer code='cursor.execute("""\nCREATE TABLE students(\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT,\n    age INTEGER,\n    course TEXT\n)\n""")\nconnection.commit()\nconnection.close()' :is-dark="isDarkMode" />
          <div class="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs">
            <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code>INTEGER</code><br>Whole numbers
            </div>
            <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code>TEXT</code><br>Text values
            </div>
            <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code>PRIMARY KEY</code><br>Unique identifier
            </div>
            <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code>AUTOINCREMENT</code><br>Auto increases ID
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 5: CRUD Operations -->
    <section id="wd-w7-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔄</span>
          CRUD Operations
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          CRUD stands for <strong>Create, Read, Update, Delete</strong>. These four operations are used in almost every application.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- CREATE -->
          <div class="rounded-lg p-4 border-2 border-green-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-green-400">CREATE (Insert Data)</h3>
            <code-slicer code='cursor.execute("""\nINSERT INTO students(name, age, course)\nVALUES (?, ?, ?)\n""", ("Ankit", 20, "Python"))\nconnection.commit()' :is-dark="isDarkMode" />
          </div>

          <!-- READ -->
          <div class="rounded-lg p-4 border-2 border-blue-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-blue-400">READ (Retrieve Data)</h3>
            <code-slicer code='cursor.execute("SELECT * FROM students")\nstudents = cursor.fetchall()\nfor student in students:\n    print(student)' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Output: <code>(1, 'Ankit', 20, 'Python')</code>
            </p>
            <div class="mt-2">
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Retrieve One Record</p>
              <code-slicer code='cursor.execute("SELECT * FROM students WHERE id = ?", (1,))\nstudent = cursor.fetchone()' :is-dark="isDarkMode" />
            </div>
          </div>

          <!-- UPDATE -->
          <div class="rounded-lg p-4 border-2 border-yellow-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-yellow-400">UPDATE (Modify Data)</h3>
            <code-slicer code='cursor.execute("""\nUPDATE students\nSET course = ?\nWHERE id = ?\n""", ("Flask", 1))\nconnection.commit()' :is-dark="isDarkMode" />
          </div>

          <!-- DELETE -->
          <div class="rounded-lg p-4 border-2 border-red-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-red-400">DELETE (Remove Data)</h3>
            <code-slicer code='cursor.execute("""\nDELETE FROM students\nWHERE id = ?\n""", (2,))\nconnection.commit()' :is-dark="isDarkMode" />
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 6: Flask with SQLite -->
    <section id="wd-w7-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔗</span>
          Connecting SQLite with Flask
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Flask Route with Database
            </h3>
            <code-slicer code='from flask import Flask\nimport sqlite3\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    connection = sqlite3.connect("students.db")\n    cursor = connection.cursor()\n    cursor.execute("SELECT * FROM students")\n    students = cursor.fetchall()\n    connection.close()\n    return str(students)' :is-dark="isDarkMode" />
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Display in HTML Template
            </h3>
            <div class="space-y-2">
              <div>
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Python</p>
                <code-slicer code='return render_template("index.html", students=students)' :is-dark="isDarkMode" />
              </div>
              <div>
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">HTML (Jinja)</p>
                <code-slicer code='<table>\n{% for student in students %}\n    <tr>\n        <td>{{ student[0] }}</td>\n        <td>{{ student[1] }}</td>\n        <td>{{ student[2] }}</td>\n        <td>{{ student[3] }}</td>\n    </tr>\n{% endfor %}\n</table>' :is-dark="isDarkMode" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Adding Data Through a Form
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">HTML Form</p>
              <code-slicer code='<form method="POST">\n    <input name="name">\n    <input name="age">\n    <input name="course">\n    <button>Submit</button>\n</form>' :is-dark="isDarkMode" />
            </div>
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Python</p>
              <code-slicer code='if request.method == "POST":\n    name = request.form["name"]\n    age = request.form["age"]\n    course = request.form["course"]\n    cursor.execute("""\n        INSERT INTO students(name, age, course)\n        VALUES (?, ?, ?)\n    """, (name, age, course))\n    connection.commit()' :is-dark="isDarkMode" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: Database Relationships -->
    <section id="wd-w7-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔗</span>
          Database Relationships
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Real applications usually have multiple tables.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Example Tables
            </h3>
            <div class="space-y-2">
              <div>
                <p class="text-xs font-semibold text-indigo-400">Students Table</p>
                <code-slicer code='ID | Name\n1  | Ankit\n2  | Priya' :is-dark="isDarkMode" />
              </div>
              <div>
                <p class="text-xs font-semibold text-indigo-400">Courses Table</p>
                <code-slicer code='ID | Course\n1  | Python\n2  | SQL' :is-dark="isDarkMode" />
              </div>
              <div>
                <p class="text-xs font-semibold text-indigo-400">Enrollments Table</p>
                <code-slicer code='Student ID | Course ID\n1          | 1\n1          | 2\n2          | 2' :is-dark="isDarkMode" />
              </div>
            </div>
            <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              This avoids storing duplicate data and keeps the database organized.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Relationship Types
            </h3>
            <div class="mt-2 space-y-3">
              <div class="rounded p-3" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <h4 class="text-xs font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">One-to-Many</h4>
                <p class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  One teacher teaches many students.
                </p>
                <code-slicer code='Teacher → Student 1, Student 2, Student 3' :is-dark="isDarkMode" />
              </div>
              <div class="rounded p-3" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <h4 class="text-xs font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Many-to-Many</h4>
                <p class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Students ↔ Courses (through Enrollments)
                </p>
                <code-slicer code='Students ↕ Enrollments ↕ Courses' :is-dark="isDarkMode" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Why Relationships Matter
          </h3>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="benefit in ['Reduce duplicate data', 'Improve organization', 'Increase performance', 'Easier to maintain']" :key="benefit"
              class="rounded-full px-3 py-1 text-xs"
              :class="isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'"
            >
              ✅ {{ benefit }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 8: SQLite Data Types -->
    <section id="wd-w7-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📊</span>
          Common SQLite Data Types
        </h2>

        <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div v-for="type in [
            { name: 'INTEGER', use: 'Whole numbers' },
            { name: 'REAL', use: 'Decimal numbers' },
            { name: 'TEXT', use: 'Text' },
            { name: 'BLOB', use: 'Files or binary data' },
            { name: 'NULL', use: 'Empty values' }
          ]" :key="type.name" class="rounded-lg p-3 text-center" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <p class="font-semibold text-indigo-400">{{ type.name }}</p>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ type.use }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: Parameterized Queries -->
<section id="wd-w7-t9" class="scroll-mt-4">
  <div
    class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
    :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
  >
    <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
      <span class="text-2xl">🔒</span>
      Using Parameterized Queries
    </h2>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <div class="rounded-lg p-4 border-2 border-red-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-red-50'">
        <h3 class="font-semibold text-red-400">❌ Dangerous</h3>
        <pre class="rounded p-2 text-xs sm:text-sm overflow-x-auto font-mono transition-colors duration-300" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>cursor.execute(f"SELECT * FROM students WHERE name='{name}'")</code></pre>
        <p class="mt-1 text-xs text-red-400">⚠️ This can lead to <strong>SQL Injection</strong> attacks.</p>
      </div>

      <div class="rounded-lg p-4 border-2 border-green-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-green-50'">
        <h3 class="font-semibold text-green-400">✅ Safe (Recommended)</h3>
        <pre class="rounded p-2 text-xs sm:text-sm overflow-x-auto font-mono transition-colors duration-300" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>cursor.execute("SELECT * FROM students WHERE name=?", (name,))</code></pre>
        <p class="mt-1 text-xs text-green-400">✅ This is safer and is the recommended approach.</p>
      </div>
    </div>

    <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
      <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
        Multiple Parameters
      </h3>
      <pre class="rounded p-2 text-xs sm:text-sm overflow-x-auto font-mono transition-colors duration-300" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>cursor.execute("SELECT * FROM students WHERE age > ? AND course = ?", (18, "Python"))</code></pre>
    </div>
  </div>
</section>

    <!-- Topic 10: Mini Project -->
    <section id="wd-w7-t10" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-purple-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🚀</span>
          Mini Project: Student Management System
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Features
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Add students</li>
              <li class="flex items-center gap-2">✅ View all students</li>
              <li class="flex items-center gap-2">✅ Edit student information</li>
              <li class="flex items-center gap-2">✅ Delete student records</li>
              <li class="flex items-center gap-2">✅ Store everything in SQLite</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Skills Used
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Flask</li>
              <li class="flex items-center gap-2">✅ SQLite</li>
              <li class="flex items-center gap-2">✅ HTML Forms</li>
              <li class="flex items-center gap-2">✅ Jinja Templates</li>
              <li class="flex items-center gap-2">✅ CRUD Operations</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Example Code Structure
          </h3>
          <code-slicer code='app.py:\n  - Home route - Display all students\n  - Add route - Add new student\n  - Edit route - Update student\n  - Delete route - Remove student\n\ntemplates/\n  - index.html - Show all students\n  - add.html - Add student form\n  - edit.html - Edit student form\n\nstudents.db - SQLite database' :is-dark="isDarkMode" />
        </div>
      </div>
    </section>

    <!-- Topic 11: Best Practices & Summary -->
    <section id="wd-w7-t11" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-indigo-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">✅</span>
          Best Practices & Summary
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Best Practices
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Close database connection after work</li>
              <li class="flex items-center gap-2">✅ Use parameterized queries (<code>?</code>)</li>
              <li class="flex items-center gap-2">✅ Keep SQL queries clean and readable</li>
              <li class="flex items-center gap-2">✅ Store only related information per table</li>
              <li class="flex items-center gap-2">✅ Use meaningful table and column names</li>
              <li class="flex items-center gap-2">✅ Commit after INSERT, UPDATE, DELETE</li>
              <li class="flex items-center gap-2">✅ Validate user input before saving</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ❌ Common Mistakes
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">❌ Forgetting <code>connection.commit()</code></li>
              <li class="flex items-center gap-2">❌ Forgetting to close connection</li>
              <li class="flex items-center gap-2">❌ Using string formatting in SQL queries</li>
              <li class="flex items-center gap-2">❌ Creating duplicate tables repeatedly</li>
              <li class="flex items-center gap-2">❌ Confusing <code>fetchone()</code> and <code>fetchall()</code></li>
              <li class="flex items-center gap-2">❌ Not checking if record exists before display</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            By the end of Week 7, you should be able to:
          </p>
          <ul class="mt-3 space-y-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Explain the purpose of a database in web applications.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand basic database terminology such as tables, rows, columns, and primary keys.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create and connect to an SQLite database using Python.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create tables and define appropriate data types.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Perform CRUD operations (Create, Read, Update, Delete).</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Display database records dynamically in Flask templates using Jinja.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Insert data into the database through HTML forms.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand simple database relationships and why they are important.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Write secure SQL queries using parameterized statements.</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Remember:</strong> A database is the memory of your web application. Flask handles the application's logic, HTML displays the interface, and SQLite stores the information permanently. Together, they form the foundation of a full-stack web application.
          </p>
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <a href="https://docs.python.org/3/library/sqlite3.html" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 SQLite3 Python Docs
          </a>
          <a href="https://www.sqlite.org/docs.html" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 SQLite Documentation
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
    { id: 'wd-w7-t1', title: 'What is a Database?' },
    { id: 'wd-w7-t2', title: 'What is SQLite?' },
    { id: 'wd-w7-t3', title: 'Database Tables & Primary Keys' },
    { id: 'wd-w7-t4', title: 'Connecting Flask with SQLite' },
    { id: 'wd-w7-t5', title: 'CRUD Operations' },
    { id: 'wd-w7-t6', title: 'Connecting SQLite with Flask' },
    { id: 'wd-w7-t7', title: 'Database Relationships' },
    { id: 'wd-w7-t8', title: 'Common SQLite Data Types' },
    { id: 'wd-w7-t9', title: 'Parameterized Queries' },
    { id: 'wd-w7-t10', title: 'Mini Project: Student Management System' },
    { id: 'wd-w7-t11', title: 'Best Practices & Summary' },
  ];
  emit('topic-updated', topics);
});
</script>