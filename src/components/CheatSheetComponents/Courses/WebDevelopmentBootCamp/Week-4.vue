<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: What is JavaScript? -->
    <section id="wd-w4-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">💡</span>
          What is JavaScript?
        </h2>
        <p class="mt-2 text-sm sm:text-base transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          <strong>JavaScript (JS)</strong> is a programming language used to make websites interactive.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-yellow-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            ⚠️ Without JavaScript, websites can only display static content.
          </p>
        </div>

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              What JavaScript allows you to do:
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Show alerts</li>
              <li class="flex items-center gap-2">✅ Validate forms</li>
              <li class="flex items-center gap-2">✅ Create sliders</li>
              <li class="flex items-center gap-2">✅ Build calculators</li>
              <li class="flex items-center gap-2">✅ Create games</li>
              <li class="flex items-center gap-2">✅ Fetch data from servers</li>
              <li class="flex items-center gap-2">✅ Update webpages without refreshing</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HTML + CSS + JavaScript
            </h3>
            <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Think of a human body:
            </p>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <span class="font-semibold text-indigo-400">HTML</span>
                <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"> → Skeleton (Structure)</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <span class="font-semibold text-indigo-400">CSS</span>
                <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"> → Clothes & Appearance (Style)</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <span class="font-semibold text-indigo-400">JavaScript</span>
                <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"> → Brain & Muscles (Behavior)</span>
              </div>
            </div>
            <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Together, these three technologies create modern websites.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 2: Adding JavaScript -->
    <section id="wd-w4-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Ways to Add JavaScript
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          There are <strong>three ways</strong> to add JavaScript.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              1. Inline JavaScript
            </h3>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;button onclick="alert('Hello!')"&gt;
  Click Me
&lt;/button&gt;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Good for learning, but not recommended for large projects.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              2. Internal JavaScript
            </h3>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;script&gt;
  console.log("Hello World");
&lt;/script&gt;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Placed before the closing <code>&lt;/body&gt;</code> tag.
            </p>
          </div>

          <div class="rounded-lg p-4 border-2 border-indigo-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              3. External JavaScript ⭐
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">HTML</p>
                <code class="text-xs">&lt;script src="script.js"&gt;&lt;/script&gt;</code>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">script.js</p>
                <code class="text-xs">console.log("Welcome to JavaScript");</code>
              </div>
            </div>
            <ul class="mt-2 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>✅ Clean code</li>
              <li>✅ Easy to maintain</li>
              <li>✅ Reusable</li>
              <li>✅ Industry standard</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 3: Comments & Output -->
    <section id="wd-w4-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">💬</span>
          Comments & Output
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              JavaScript Comments
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Single-line</p>
                <code class="text-xs">// This is a comment</code>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Multi-line</p>
                <code class="text-xs">/*<br>  This is<br>  a multi-line comment<br>*/</code>
              </div>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Output in JavaScript
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Console Output</p>
                <code class="text-xs">console.log("Hello World");</code>
                <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  Displays output in the browser's Developer Console.
                </p>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Alert Box</p>
                <code class="text-xs">alert("Welcome!");</code>
                <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  Shows a popup message.
                </p>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Writing to the Webpage</p>
                <code class="text-xs">document.write("Hello JavaScript");</code>
                <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  Used only for learning; avoid using it in real projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: Variables -->
    <section id="wd-w4-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📦</span>
          Variables
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Variables store data.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <div class="rounded-lg p-4 border-2 border-indigo-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">let</h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let name = "Ankit";</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              The value can be changed later.
            </p>
          </div>

          <div class="rounded-lg p-4 border-2 border-purple-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-purple-400">const</h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>const pi = 3.14159;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              The value cannot be changed.
            </p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              var (Older)
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>var age = 20;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              <code>var</code> is older syntax. Prefer <code>let</code> and <code>const</code>.
            </p>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Naming Rules for Variables
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold text-green-400">✅ Valid</p>
              <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                <li><code>let firstName;</code></li>
                <li><code>let _score;</code></li>
                <li><code>let $price;</code></li>
                <li><code>let studentName;</code></li>
                <li><code>let totalMarks;</code></li>
                <li><code>let isLoggedIn;</code></li>
              </ul>
            </div>
            <div>
              <p class="text-xs font-semibold text-red-400">❌ Invalid</p>
              <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                <li><code>let 1name;</code> (starts with number)</li>
                <li><code>let if;</code> (JavaScript keyword)</li>
              </ul>
              <div class="mt-2 rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Use meaningful names:</p>
                <code class="text-xs">let studentName;</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 5: Data Types -->
    <section id="wd-w4-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔤</span>
          Data Types
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              String
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Stores text.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let city = "Delhi";</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Number
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Stores numbers.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let age = 20;</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Boolean
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Stores <code>true</code> or <code>false</code>.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let isStudent = true;</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Undefined & Null
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Undefined</p>
                <code class="text-xs">let course;</code>
                <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Declared but not assigned.</p>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Null</p>
                <code class="text-xs">let data = null;</code>
                <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Represents an empty value.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Checking the Data Type
          </h3>
          <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let age = 20;
console.log(typeof age); // Output: number</code></pre>
        </div>
      </div>
    </section>

    <!-- Topic 6: Operators -->
    <section id="wd-w4-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">➕</span>
          Operators
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Operators perform operations on data.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Arithmetic Operators
            </h3>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="grid grid-cols-2 gap-1">
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>+</code> Addition</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>-</code> Subtraction</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>*</code> Multiplication</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>/</code> Division</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>%</code> Modulus</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>**</code> Exponent</div>
              </div>
              <pre class="mt-2 rounded p-2" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let a = 10, b = 5;
console.log(a + b); // 15</code></pre>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Comparison Operators
            </h3>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="grid grid-cols-2 gap-1">
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>==</code> Equal</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>===</code> Strict Equal</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>!=</code> Not Equal</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>&gt;</code> Greater Than</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>&lt;</code> Less Than</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>&gt;=</code> Greater or Equal</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>&lt;=</code> Less or Equal</div>
              </div>
              <pre class="mt-2 rounded p-2" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>console.log(10 > 5); // true</code></pre>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Logical Operators
            </h3>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="grid grid-cols-3 gap-1">
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>&amp;&amp;</code> AND</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>||</code> OR</div>
                <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>!</code> NOT</div>
              </div>
              <pre class="mt-2 rounded p-2" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let age = 20;
console.log(age > 18 &amp;&amp; age < 30); // true</code></pre>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Assignment & Template Literals
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Assignment</p>
                <code class="text-xs">let x = 5; x += 2; // x = 7</code>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Template Literals</p>
                <code class="text-xs">let name = "Ankit";<br>console.log(`Welcome ${name}`);</code>
                <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  Much easier than using <code>+</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: User Input & Output -->
    <section id="wd-w4-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">⌨️</span>
          User Input & Output
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Getting User Input
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let name = prompt("Enter your name");</code></pre>
            <div class="mt-3 rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Displaying Output</p>
              <code class="text-xs">alert("Welcome " + name);</code>
              <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">or</p>
              <code class="text-xs">console.log(name);</code>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Complete Example
            </h3>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let name = prompt("What is your name?");
let age = prompt("How old are you?");

console.log(`Hello ${name}!`);
console.log(`You are ${age} years old.`);</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 8: Conditional Statements -->
    <section id="wd-w4-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔀</span>
          Conditional Statements
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Conditions allow JavaScript to make decisions.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              if Statement
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let age = 20;

if (age >= 18) {
  console.log("You can vote.");
}</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              if...else
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let marks = 45;

if (marks >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              else if
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let marks = 82;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              switch Statement
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Invalid Day");
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: Loops -->
    <section id="wd-w4-t9" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔄</span>
          Loops
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Loops repeat code multiple times.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              for Loop
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1,2,3,4,5</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              while Loop
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let i = 1;

while (i <= 5) {
  console.log(i);
  i++;
}</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              do...while Loop
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let i = 1;

do {
  console.log(i);
  i++;
} while (i <= 5);</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              The loop runs at least once.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 10: Functions -->
    <section id="wd-w4-t10" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📚</span>
          Functions
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Functions group reusable code.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Function Declaration
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>function greet() {
  console.log("Hello!");
}

greet(); // Calls the function</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Function with Parameters
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>function greet(name) {
  console.log(`Hello ${name}`);
}

greet("Ankit");</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Return Statement
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result); // 8</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Arrow Functions (Modern)
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">With braces</p>
                <code class="text-xs">const add = (a, b) => {<br>  return a + b;<br>};</code>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Short version</p>
                <code class="text-xs">const add = (a, b) => a + b;</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 11: Arrays -->
    <section id="wd-w4-t11" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📋</span>
          Arrays
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Arrays store multiple values in one variable.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Creating & Accessing Arrays
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]); // Apple
console.log(fruits.length); // 3</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Array Methods
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>fruits.push("Orange"); // Add
fruits.pop(); // Remove last
fruits.length; // Get length</code></pre>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Loop Through an Array
          </h3>
          <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let fruits = ["Apple", "Banana", "Mango"];

for (let fruit of fruits) {
  console.log(fruit);
}</code></pre>
        </div>
      </div>
    </section>

    <!-- Topic 12: Objects -->
    <section id="wd-w4-t12" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📦</span>
          Objects
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Objects store related information using <strong>key-value pairs</strong>.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Creating & Accessing Objects
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>let student = {
  name: "Ankit",
  age: 20,
  course: "Web Development"
};

console.log(student.name); // Ankit
console.log(student["course"]); // Web Development</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Updating & Adding Properties
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>// Update a property
student.age = 21;

// Add a new property
student.city = "Kolkata";

console.log(student);</code></pre>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Difference Between Arrays and Objects
          </h3>
          <div class="mt-2 grid grid-cols-2 gap-3 text-xs">
            <div class="rounded p-3" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="font-semibold text-indigo-400">Array</p>
              <ul class="mt-1 space-y-0.5" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                <li>• Stores a list of values</li>
                <li>• Access by index</li>
                <li>• Example: <code>["HTML", "CSS"]</code></li>
              </ul>
            </div>
            <div class="rounded p-3" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="font-semibold text-purple-400">Object</p>
              <ul class="mt-1 space-y-0.5" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                <li>• Stores related information</li>
                <li>• Access by key</li>
                <li>• Example: <code>{name:"Ankit"}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 13: Best Practices & Summary -->
    <section id="wd-w4-t13" class="scroll-mt-4">
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
              <li class="flex items-center gap-2">✅ Use <code>const</code> by default</li>
              <li class="flex items-center gap-2">✅ Use <code>let</code> only when value changes</li>
              <li class="flex items-center gap-2">✅ Give variables meaningful names</li>
              <li class="flex items-center gap-2">✅ Keep functions short and focused</li>
              <li class="flex items-center gap-2">✅ Use template literals instead of concatenation</li>
              <li class="flex items-center gap-2">✅ Indent your code properly</li>
              <li class="flex items-center gap-2">✅ Add comments only when they improve understanding</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ❌ Common Mistakes
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">❌ Forgetting semicolons</li>
              <li class="flex items-center gap-2">❌ Using <code>=</code> instead of <code>===</code></li>
              <li class="flex items-center gap-2">❌ Forgetting curly braces <code>{}</code></li>
              <li class="flex items-center gap-2">❌ Using <code>var</code> everywhere</li>
              <li class="flex items-center gap-2">❌ Accessing array index that doesn't exist</li>
            </ul>
            <div class="mt-2 rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="text-xs text-red-400">❌ Wrong:</p>
              <code class="text-xs">if(age = 18)</code>
              <p class="mt-1 text-xs text-green-400">✅ Correct:</p>
              <code class="text-xs">if(age === 18)</code>
            </div>
          </div>
        </div>

        <!-- Mini Example -->
        <div class="mt-4 rounded-lg p-4 border-2 border-purple-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            💡 Mini Example
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">HTML</p>
              <pre class="mt-1 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;button onclick="showMessage()"&gt;
  Click Me
&lt;/button&gt;</code></pre>
            </div>
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">JavaScript</p>
              <pre class="mt-1 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>function showMessage() {
  alert("Welcome to JavaScript!");
}</code></pre>
            </div>
          </div>
          <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            When the button is clicked, an alert message appears.
          </p>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            By the end of Week 4, you should be able to:
          </p>
          <ul class="mt-3 space-y-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand the role of JavaScript in web development.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Add JavaScript to a webpage using external files.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create and use variables.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Work with different data types.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Perform calculations using operators.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Take user input and display output.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Write programs using conditions and loops.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create reusable functions.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Store and manage data using arrays and objects.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Write clean, readable JavaScript code.</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Remember:</strong> JavaScript is the language that brings websites to life. Start with the basics, practice regularly, and don't be afraid to experiment. Every interactive feature you see on a website starts with these fundamental concepts.
          </p>
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 MDN JavaScript Docs
          </a>
          <a href="https://javascript.info/" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 JavaScript.info
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  isDarkMode: Boolean,
  week: Number,
});

const emit = defineEmits(['topic-updated']);

onMounted(() => {
  const topics = [
    { id: 'wd-w4-t1', title: 'What is JavaScript?' },
    { id: 'wd-w4-t2', title: 'Ways to Add JavaScript' },
    { id: 'wd-w4-t3', title: 'Comments & Output' },
    { id: 'wd-w4-t4', title: 'Variables' },
    { id: 'wd-w4-t5', title: 'Data Types' },
    { id: 'wd-w4-t6', title: 'Operators' },
    { id: 'wd-w4-t7', title: 'User Input & Output' },
    { id: 'wd-w4-t8', title: 'Conditional Statements' },
    { id: 'wd-w4-t9', title: 'Loops' },
    { id: 'wd-w4-t10', title: 'Functions' },
    { id: 'wd-w4-t11', title: 'Arrays' },
    { id: 'wd-w4-t12', title: 'Objects' },
    { id: 'wd-w4-t13', title: 'Best Practices & Summary' },
  ];
  emit('topic-updated', topics);
});
</script>