<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: What is Backend Development? -->
    <section id="wd-w6-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🌍</span>
          What is Backend Development?
        </h2>
        <p class="mt-2 text-sm sm:text-base transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Backend development is everything that happens <strong>behind the scenes</strong> of a website.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              The backend is responsible for:
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Login & Registration</li>
              <li class="flex items-center gap-2">✅ Database operations</li>
              <li class="flex items-center gap-2">✅ Payment processing</li>
              <li class="flex items-center gap-2">✅ Sending emails</li>
              <li class="flex items-center gap-2">✅ File uploads</li>
              <li class="flex items-center gap-2">✅ Business logic</li>
            </ul>
            <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Users <strong>cannot see</strong> the backend, but every dynamic website depends on it.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Frontend vs Backend
            </h3>
            <div class="mt-2 overflow-x-auto">
              <table class="w-full text-xs sm:text-sm">
                <thead>
                  <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-200'">
                    <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Frontend</th>
                    <th class="p-2 text-left" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Backend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-100'">
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">HTML</td>
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Python</td>
                  </tr>
                  <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-100'">
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">CSS</td>
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Flask</td>
                  </tr>
                  <tr class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-slate-100'">
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">JavaScript</td>
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">SQLite</td>
                  </tr>
                  <tr>
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Runs in Browser</td>
                    <td class="p-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Runs on Server</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Client-Server Architecture
          </h3>
          <div class="mt-2 font-mono text-xs sm:text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            <div class="p-2 rounded" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <div>Browser (Client)</div>
              <div class="pl-4">│</div>
              <div class="pl-4">│ Request</div>
              <div class="pl-4">▼</div>
              <div>Flask Server</div>
              <div class="pl-4">│</div>
              <div class="pl-4">│ Process Request</div>
              <div class="pl-4">▼</div>
              <div>HTML Response</div>
              <div class="pl-4">│</div>
              <div class="pl-4">▼</div>
              <div>Browser Displays Website</div>
            </div>
          </div>
          <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li>1. User visits <code>/about</code></li>
            <li>2. Browser sends request</li>
            <li>3. Flask receives request</li>
            <li>4. Flask creates a response</li>
            <li>5. Browser displays the webpage</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Topic 2: What is Flask? -->
    <section id="wd-w6-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔮</span>
          What is Flask?
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          <strong>Flask</strong> is a lightweight Python web framework. It helps developers build web applications quickly.
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="feature in ['Easy to learn', 'Beginner-friendly', 'Lightweight', 'Flexible', 'Widely used']" :key="feature"
            class="rounded-full px-3 py-1 text-xs"
            :class="isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'"
          >
            ✅ {{ feature }}
          </span>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Why Flask?
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Simple syntax</li>
              <li class="flex items-center gap-2">✅ Fast development</li>
              <li class="flex items-center gap-2">✅ Easy to understand</li>
              <li class="flex items-center gap-2">✅ Great for beginners</li>
              <li class="flex items-center gap-2">✅ Large community</li>
              <li class="flex items-center gap-2">✅ Easy database integration</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Installing Flask
            </h3>
            <code-slicer code='pip install flask' :is-dark="isDarkMode" />
            <div class="mt-2">
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Check installation</p>
              <code-slicer code='pip show flask' :is-dark="isDarkMode" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 3: First Flask App -->
    <section id="wd-w6-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🚀</span>
          Creating Your First Flask App
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Create a file called <code>app.py</code>
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <code-slicer code='from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return "Hello, Flask!"\n\nif __name__ == "__main__":\n    app.run(debug=True)' :is-dark="isDarkMode" />
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Run the application
            </h3>
            <code-slicer code='python app.py' :is-dark="isDarkMode" />
            <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Open your browser at: <code>http://127.0.0.1:5000</code>
            </p>
            <div class="mt-2 rounded p-2 border-2 border-green-400/30" :class="isDarkMode ? 'bg-slate-700' : 'bg-green-50'">
              <p class="text-sm font-semibold text-green-400">You should see: "Hello, Flask!"</p>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Understanding the Code
            </h3>
            <div class="mt-2 space-y-2 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code>app = Flask(__name__)</code>
                <span class="block text-xs opacity-75">Creates a Flask application</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code>@app.route("/")</code>
                <span class="block text-xs opacity-75">Defines a route for the homepage</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code>def home():</code>
                <span class="block text-xs opacity-75">Runs when someone visits the homepage</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code>app.run(debug=True)</code>
                <span class="block text-xs opacity-75">Starts the server with auto-reload</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: Project Structure -->
    <section id="wd-w6-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📁</span>
          Flask Project Structure
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          A simple Flask project usually looks like this:
        </p>

        <div class="mt-4 rounded-lg p-4 font-mono text-xs sm:text-sm" :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-50 text-slate-700'">
          <div>my_project/</div>
          <div class="pl-4">├── app.py</div>
          <div class="pl-4">├── static/</div>
          <div class="pl-8">├── css/</div>
          <div class="pl-12">└── style.css</div>
          <div class="pl-8">├── js/</div>
          <div class="pl-12">└── script.js</div>
          <div class="pl-8">└── images/</div>
          <div class="pl-4">├── templates/</div>
          <div class="pl-8">├── index.html</div>
          <div class="pl-8">├── about.html</div>
          <div class="pl-8">└── contact.html</div>
          <div class="pl-4">└── requirements.txt</div>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              📁 templates/
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Contains HTML files for rendering</p>
          </div>
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              📁 static/
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Contains CSS, JS, and images</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 5: Routing -->
    <section id="wd-w6-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔀</span>
          Routing & URL Parameters
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          A route connects a URL to a Python function.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Basic Routing
            </h3>
            <code-slicer code='@app.route("/")\ndef home():\n    return "Home Page"\n\n@app.route("/about")\ndef about():\n    return "About Page"\n\n@app.route("/contact")\ndef contact():\n    return "Contact Page"' :is-dark="isDarkMode" />
            <div class="mt-2 flex flex-wrap gap-1 text-xs">
              <span class="rounded px-2 py-0.5" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'">/</span>
              <span class="rounded px-2 py-0.5" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'">/about</span>
              <span class="rounded px-2 py-0.5" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'">/contact</span>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              URL Parameters
            </h3>
            <code-slicer code='@app.route("/user/<name>")\ndef user(name):\n    return f"Welcome {name}"' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Visiting <code>/user/Ankit</code> → "Welcome Ankit"
            </p>
            <div class="mt-2">
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Integer Parameters</p>
              <code-slicer code='@app.route("/student/<int:id>")\ndef student(id):\n    return f"Student ID: {id}"' :is-dark="isDarkMode" />
              <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Only accepts integers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 6: HTTP Methods -->
    <section id="wd-w6-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📡</span>
          HTTP Methods
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Every webpage request uses an HTTP method. The most common methods are GET and POST.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-green-400">GET Request</h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Used to request data.</p>
            <code-slicer code='@app.route("/")\ndef home():\n    return "Welcome"' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Opening the webpage sends a GET request.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-yellow-400">POST Request</h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Used when submitting forms.</p>
            <code-slicer code='@app.route("/submit", methods=["POST"])\ndef submit():\n    return "Form Submitted"' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Form submissions send POST requests.</p>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            HTTP Methods Overview
          </h3>
          <div class="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs">
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong class="text-green-400">GET</strong><br>Retrieve data
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong class="text-yellow-400">POST</strong><br>Send data
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong class="text-blue-400">PUT</strong><br>Update data
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong class="text-red-400">DELETE</strong><br>Delete data
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: Templates -->
    <section id="wd-w6-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📄</span>
          Templates with Jinja
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Instead of returning plain text, Flask can display HTML files using the <code>render_template()</code> function.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Python (app.py)
            </h3>
            <code-slicer code='from flask import render_template\n\n@app.route("/")\ndef home():\n    return render_template("index.html")' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Templates are stored inside the <code>templates</code> folder.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HTML (index.html)
            </h3>
            <code-slicer code='<!DOCTYPE html>\n<html>\n<head>\n    <title>Home</title>\n</head>\n<body>\n    <h1>Welcome to Flask</h1>\n</body>\n</html>' :is-dark="isDarkMode" />
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Display Variables
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Python</p>
              <code-slicer code='@app.route("/")\ndef home():\n    return render_template(\n        "index.html",\n        name="Ankit"\n    )' :is-dark="isDarkMode" />
            </div>
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">HTML</p>
              <code-slicer code='<h1>Hello {{ name }}</h1>' :is-dark="isDarkMode" />
              <p class="mt-1 text-xs text-green-400">Output: Hello Ankit</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 8: Jinja Expressions -->
    <section id="wd-w6-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🧩</span>
          Jinja Expressions
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              If Statement
            </h3>
            <code-slicer code='{% if age >= 18 %}\n    <p>Adult</p>\n{% else %}\n    <p>Minor</p>\n{% endif %}' :is-dark="isDarkMode" />
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              For Loop
            </h3>
            <code-slicer code='{% for student in students %}\n    <li>{{ student }}</li>\n{% endfor %}' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Python: <code>students = ["Ankit", "Rahul", "Priya"]</code>
            </p>
            <div class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Output:
              <ul class="list-disc list-inside pl-2">
                <li>Ankit</li>
                <li>Rahul</li>
                <li>Priya</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Passing Multiple Variables
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Python</p>
              <code-slicer code='return render_template(\n    "index.html",\n    name="Ankit",\n    course="Web Development",\n    age=20\n)' :is-dark="isDarkMode" />
            </div>
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">HTML</p>
              <code-slicer code='<h2>{{ name }}</h2>\n<p>{{ course }}</p>\n<p>{{ age }}</p>' :is-dark="isDarkMode" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: Static Files -->
    <section id="wd-w6-t9" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📁</span>
          Static Files
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          CSS, JavaScript, and Images are stored in the <strong>static</strong> folder.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Link CSS
            </h3>
            <code-slicer code='<link rel="stylesheet"\n      href="{{ url_for("static",\n      filename="css/style.css") }}">' :is-dark="isDarkMode" />
            <div class="mt-2">
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Folder Structure</p>
              <code-slicer code='static/\n  └── css/\n      └── style.css' :is-dark="isDarkMode" />
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Images & JavaScript
            </h3>
            <div class="space-y-2">
              <div>
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Image</p>
                <code-slicer code='<img src="{{ url_for("static",\n      filename="images/logo.png") }}">' :is-dark="isDarkMode" />
              </div>
              <div>
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">JavaScript</p>
                <code-slicer code='<script src="{{ url_for("static",\n      filename="js/script.js") }}"></script>' :is-dark="isDarkMode" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 10: Forms -->
    <section id="wd-w6-t10" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Forms & User Input
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HTML Form
            </h3>
            <code-slicer code='<form method="POST">\n    <input type="text"\n           name="username">\n    <button>Submit</button>\n</form>' :is-dark="isDarkMode" />
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Reading Form Data
            </h3>
            <code-slicer code='from flask import request\n\n@app.route("/",\n           methods=["GET", "POST"])\ndef home():\n    if request.method == "POST":\n        username = request.form["username"]\n        return f"Hello {username}"\n    return render_template("index.html")' :is-dark="isDarkMode" />
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Redirect & url_for()
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Redirect</p>
              <code-slicer code='from flask import redirect\n\nreturn redirect("/about")' :is-dark="isDarkMode" />
            </div>
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">url_for()</p>
              <code-slicer code='from flask import url_for\n\nreturn redirect(url_for("home"))' :is-dark="isDarkMode" />
              <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                Better because URLs update automatically if routes change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 11: Template Inheritance -->
    <section id="wd-w6-t11" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📐</span>
          Template Inheritance
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Instead of repeating HTML on every page, create a base template and extend it.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              base.html
            </h3>
            <code-slicer code='<!DOCTYPE html>\n<html>\n<head>\n    <title>{% block title %}My Site{% endblock %}</title>\n</head>\n<body>\n    <nav>Navigation</nav>\n    {% block content %}{% endblock %}\n    <footer>Footer</footer>\n</body>\n</html>' :is-dark="isDarkMode" />
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              index.html (extends base)
            </h3>
            <code-slicer code='{% extends "base.html" %}\n\n{% block title %}Home{% endblock %}\n\n{% block content %}\n    <h1>Welcome to Home Page</h1>\n{% endblock %}' :is-dark="isDarkMode" />
            <p class="mt-1 text-xs text-green-400">✅ Keeps projects clean and organized.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 12: Mini Project -->
    <section id="wd-w6-t12" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-purple-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🚀</span>
          Mini Project: Student Registration Form
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Features
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Home page</li>
              <li class="flex items-center gap-2">✅ Registration form</li>
              <li class="flex items-center gap-2">✅ Enter student name</li>
              <li class="flex items-center gap-2">✅ Submit form</li>
              <li class="flex items-center gap-2">✅ Display welcome message</li>
              <li class="flex items-center gap-2">✅ Custom CSS</li>
              <li class="flex items-center gap-2">✅ Multiple pages</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Skills Used
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Flask Routing</li>
              <li class="flex items-center gap-2">✅ HTML Templates</li>
              <li class="flex items-center gap-2">✅ Jinja Variables</li>
              <li class="flex items-center gap-2">✅ Forms</li>
              <li class="flex items-center gap-2">✅ Static Files</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Example Code Structure
          </h3>
          <code-slicer code='app.py:\n  - Home route ("/")\n  - Register route ("/register")\n  - Display student name\n\ntemplates/\n  - base.html\n  - index.html\n  - register.html\n  - success.html\n\nstatic/\n  - css/style.css' :is-dark="isDarkMode" />
        </div>
      </div>
    </section>

    <!-- Topic 13: Best Practices & Summary -->
    <section id="wd-w6-t13" class="scroll-mt-4">
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
              <li class="flex items-center gap-2">✅ Keep HTML inside <code>templates</code> folder</li>
              <li class="flex items-center gap-2">✅ Store CSS, JS, images in <code>static</code> folder</li>
              <li class="flex items-center gap-2">✅ Use <code>render_template()</code> instead of HTML strings</li>
              <li class="flex items-center gap-2">✅ Keep route functions short and focused</li>
              <li class="flex items-center gap-2">✅ Use meaningful route names</li>
              <li class="flex items-center gap-2">✅ Prefer <code>url_for()</code> over hardcoded URLs</li>
              <li class="flex items-center gap-2">✅ Separate frontend and backend logic</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ❌ Common Mistakes
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">❌ Forgetting to create <code>templates</code> folder</li>
              <li class="flex items-center gap-2">❌ Placing HTML outside templates directory</li>
              <li class="flex items-center gap-2">❌ Incorrect route paths</li>
              <li class="flex items-center gap-2">❌ Forgetting to import <code>render_template</code></li>
              <li class="flex items-center gap-2">❌ Not enabling <code>methods=["POST"]</code></li>
              <li class="flex items-center gap-2">❌ Linking CSS without <code>url_for()</code></li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            By the end of Week 6, you should be able to:
          </p>
          <ul class="mt-3 space-y-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Explain what backend development is and why it is needed.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create a Flask application from scratch.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Organize a Flask project using the recommended folder structure.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Define routes and handle URL parameters.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand GET and POST requests.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Render HTML templates using <code>render_template()</code>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Display dynamic data using Jinja.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Build loops and conditional statements inside templates.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Process user input through HTML forms.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Serve CSS, JavaScript, and images from the <code>static</code> folder.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Redirect users and generate URLs using <code>url_for()</code>.</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Remember:</strong> Flask acts as the bridge between your frontend and backend. It receives requests from the browser, processes them with Python, and returns dynamic HTML pages. Mastering Flask is the first step toward building complete, data-driven web applications.
          </p>
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <a href="https://flask.palletsprojects.com/" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 Flask Documentation
          </a>
          <a href="https://jinja.palletsprojects.com/" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 Jinja Documentation
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
    { id: 'wd-w6-t1', title: 'What is Backend Development?' },
    { id: 'wd-w6-t2', title: 'What is Flask?' },
    { id: 'wd-w6-t3', title: 'Creating Your First Flask App' },
    { id: 'wd-w6-t4', title: 'Flask Project Structure' },
    { id: 'wd-w6-t5', title: 'Routing & URL Parameters' },
    { id: 'wd-w6-t6', title: 'HTTP Methods' },
    { id: 'wd-w6-t7', title: 'Templates with Jinja' },
    { id: 'wd-w6-t8', title: 'Jinja Expressions' },
    { id: 'wd-w6-t9', title: 'Static Files' },
    { id: 'wd-w6-t10', title: 'Forms & User Input' },
    { id: 'wd-w6-t11', title: 'Template Inheritance' },
    { id: 'wd-w6-t12', title: 'Mini Project: Student Registration Form' },
    { id: 'wd-w6-t13', title: 'Best Practices & Summary' },
  ];
  emit('topic-updated', topics);
});
</script>