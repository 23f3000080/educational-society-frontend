<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: Introduction -->
    <section id="wd-w1-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🌐</span>
          What is Web Development?
        </h2>
        <p class="mt-2 text-sm sm:text-base transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Web development is the process of creating websites and web applications that run inside a web browser.
        </p>
        
        <div class="mt-4">
          <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            Examples of Websites:
          </h4>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="site in ['Google', 'YouTube', 'Amazon', 'Netflix', 'LinkedIn', 'Wikipedia']" :key="site"
              class="rounded-full px-3 py-1 text-xs font-medium"
              :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-100 text-slate-700'"
            >
              {{ site }}
            </span>
          </div>
          <p class="mt-3 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            A web developer builds websites using technologies like <strong>HTML, CSS, and JavaScript</strong>.
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 2: Website vs Webpage -->
    <section id="wd-w1-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📄</span>
          Website vs Webpage
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              📑 What is a Webpage?
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              A webpage is a single page of a website.
            </p>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Home Page</li>
              <li>• Contact Page</li>
              <li>• About Us Page</li>
            </ul>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🌐 What is a Website?
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              A website is a collection of multiple webpages connected together.
            </p>
            <div class="mt-2 rounded-lg p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="text-xs font-medium" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Amazon Website
              </p>
              <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                <li>• Home Page</li>
                <li>• Product Page</li>
                <li>• Cart Page</li>
                <li>• Login Page</li>
                <li>• Checkout Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 3: Static vs Dynamic -->
    <section id="wd-w1-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🌍</span>
          Static vs Dynamic Website
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🔒 Static Website
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              A static website always shows the same content unless the developer changes the code.
            </p>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Portfolio Website</li>
              <li>• Resume Website</li>
              <li>• Company Landing Page</li>
            </ul>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🔄 Dynamic Website
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              A dynamic website changes its content based on the user or data stored in a database.
            </p>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Facebook</li>
              <li>• Instagram</li>
              <li>• Amazon</li>
              <li>• Netflix</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: How Internet Works -->
    <section id="wd-w1-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🌐</span>
          How Does the Internet Work?
        </h2>
        
        <div class="mt-4 space-y-4">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <p class="text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              When you type a website address in your browser:
            </p>
            <ol class="mt-2 space-y-1 text-sm list-decimal list-inside" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>The browser sends a request to the server.</li>
              <li>The server finds the requested webpage.</li>
              <li>The server sends HTML, CSS, JavaScript, images, and other files.</li>
              <li>The browser displays the webpage on your screen.</li>
            </ol>
          </div>
          
          <div class="rounded-lg p-4 text-center" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <div class="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">You</span>
              <span class="text-slate-400">→</span>
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Browser</span>
              <span class="text-slate-400">→</span>
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Internet</span>
              <span class="text-slate-400">→</span>
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Server</span>
              <span class="text-slate-400">→</span>
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">HTML + CSS + JS</span>
              <span class="text-slate-400">→</span>
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Website</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 5: Browser & Server -->
    <section id="wd-w1-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">💻</span>
          Browser & Server
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🖥️ What is a Browser?
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              A browser is software used to open websites.
            </p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="browser in ['Google Chrome', 'Microsoft Edge', 'Firefox', 'Safari', 'Brave']" :key="browser"
                class="rounded-full px-2 py-0.5 text-xs"
                :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
              >
                {{ browser }}
              </span>
            </div>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>✅ Reads HTML</li>
              <li>✅ Applies CSS</li>
              <li>✅ Runs JavaScript</li>
              <li>✅ Displays webpages</li>
            </ul>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🖥️ What is a Server?
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              A server is a computer that stores websites and sends them to users when requested.
            </p>
            <div class="mt-2 rounded-lg p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                🍽️ Think of it like a restaurant:
              </p>
              <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                <li>• Customer → You</li>
                <li>• Waiter → Browser</li>
                <li>• Kitchen → Server</li>
                <li>• Food → Website</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 6: Frontend vs Backend -->
    <section id="wd-w1-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">👨‍💻</span>
          Frontend vs Backend vs Full Stack
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🎨 Frontend
            </h3>
            <p class="mt-1 text-xs transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Everything the user can see and interact with.
            </p>
            <ul class="mt-2 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Buttons</li>
              <li>• Images</li>
              <li>• Navigation Bar</li>
              <li>• Forms</li>
            </ul>
            <div class="mt-2 rounded p-1.5 text-xs" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <span class="font-semibold">Technologies:</span>
              <span class="text-indigo-400">HTML</span>, 
              <span class="text-blue-400">CSS</span>, 
              <span class="text-yellow-400">JavaScript</span>
            </div>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ⚙️ Backend
            </h3>
            <p class="mt-1 text-xs transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              The part users cannot see.
            </p>
            <ul class="mt-2 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Login</li>
              <li>• Registration</li>
              <li>• Payments</li>
              <li>• Database</li>
            </ul>
            <div class="mt-2 rounded p-1.5 text-xs" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <span class="font-semibold">Languages:</span>
              <span class="text-green-400">Python</span>, 
              <span class="text-red-400">Java</span>, 
              <span class="text-purple-400">PHP</span>, 
              <span class="text-green-400">Node.js</span>
            </div>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🧑‍💼 Full Stack
            </h3>
            <p class="mt-1 text-xs transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Works on everything.
            </p>
            <ul class="mt-2 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Frontend</li>
              <li>• Backend</li>
              <li>• Database</li>
            </ul>
            <div class="mt-2 rounded p-1.5 text-xs" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <span class="font-semibold">Database:</span>
              <span class="text-orange-400">SQLite</span>, 
              <span class="text-blue-400">MySQL</span>, 
              <span class="text-green-400">PostgreSQL</span>, 
              <span class="text-green-400">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: HTML Basics -->
    <section id="wd-w1-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📘</span>
          What is HTML?
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HTML stands for:
            </h3>
            <p class="mt-1 text-sm font-bold text-indigo-400">
              HyperText Markup Language
            </p>
            <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              HTML is used to create the structure of a webpage.
            </p>
            <div class="mt-2 rounded-lg p-2 text-sm" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="font-medium" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                🏗️ Think of HTML as the <strong>skeleton of a building</strong>.
              </p>
            </div>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              What HTML tells the browser:
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li>• Where headings go</li>
              <li>• Where paragraphs go</li>
              <li>• Where images appear</li>
              <li>• Where buttons are placed</li>
            </ul>
            <div class="mt-2 rounded p-1.5 text-xs font-semibold" :class="isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-slate-200 text-yellow-600'">
              ⚠️ HTML is NOT a programming language. It is a markup language.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 8: HTML Structure -->
    <section id="wd-w1-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🏗️</span>
          Basic HTML Structure
        </h2>
        
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Every HTML page starts with this structure:
        </p>
        
        <div class="mt-4 rounded-lg overflow-hidden">
          <pre class="p-4 text-xs sm:text-sm overflow-x-auto" :class="isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My Website&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h4 class="font-semibold text-indigo-400">&lt;!DOCTYPE html&gt;</h4>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Tells the browser that the document uses HTML5. Always write it at the top.
            </p>
          </div>
          <div class="rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h4 class="font-semibold text-indigo-400">&lt;html&gt;</h4>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              The root element. Everything inside your webpage is placed inside this tag.
            </p>
          </div>
          <div class="rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h4 class="font-semibold text-indigo-400">&lt;head&gt;</h4>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Contains information about the webpage (title, meta tags, CSS links). Not visible on the webpage.
            </p>
          </div>
          <div class="rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h4 class="font-semibold text-indigo-400">&lt;body&gt;</h4>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Contains everything visible on the webpage (text, images, videos, buttons).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: Tags & Elements -->
    <section id="wd-w1-t9" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🏷️</span>
          HTML Tags & Elements
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HTML Tags
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              HTML uses tags to create webpage elements.
            </p>
            <div class="mt-2 rounded-lg p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-sm">&lt;h1&gt;Hello&lt;/h1&gt;</code>
            </div>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li><span class="text-indigo-400">&lt;h1&gt;</span> → Opening tag</li>
              <li><span class="text-indigo-400">&lt;/h1&gt;</span> → Closing tag</li>
            </ul>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HTML Elements
            </h3>
            <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              An element includes opening tag, content, and closing tag.
            </p>
            <div class="mt-2 rounded-lg p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <code class="text-sm">&lt;p&gt;I love HTML.&lt;/p&gt;</code>
            </div>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li><span class="text-indigo-400">&lt;p&gt;</span> → Opening tag</li>
              <li><span class="text-indigo-400">I love HTML.</span> → Content</li>
              <li><span class="text-indigo-400">&lt;/p&gt;</span> → Closing tag</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            HTML Attributes
          </h3>
          <p class="mt-1 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            Attributes provide extra information to HTML elements.
          </p>
          <div class="mt-2 rounded-lg p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
            <code class="text-sm">&lt;img src="photo.jpg" alt="Profile Photo"&gt;</code>
          </div>
          <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li><span class="text-indigo-400">src</span> → Image location</li>
            <li><span class="text-indigo-400">alt</span> → Alternative text</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Topic 10: Headings & Text -->
    <section id="wd-w1-t10" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Headings & Text
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Heading Tags
            </h3>
            <div class="mt-2 space-y-1">
              <div v-for="level in 6" :key="level" class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">&lt;h{{ level }}&gt;Heading {{ level }}&lt;/h{{ level }}&gt;</code>
                <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  → Size: {{ 7 - level }}
                </span>
              </div>
            </div>
            <p class="mt-2 text-xs text-yellow-400">
              ⚠️ Use only one &lt;h1&gt; per webpage.
            </p>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Text Formatting
            </h3>
            <div class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="rounded p-1.5" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <strong>&lt;strong&gt;</strong> → Bold text
              </div>
              <div class="rounded p-1.5" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <em>&lt;em&gt;</em> → Italic text
              </div>
              <div class="rounded p-1.5" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <u>&lt;u&gt;</u> → Underline
              </div>
              <div class="rounded p-1.5" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <mark>&lt;mark&gt;</mark> → Highlight
              </div>
              <div class="rounded p-1.5" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <small>&lt;small&gt;</small> → Small text
              </div>
              <div class="rounded p-1.5" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <del>&lt;del&gt;</del> → Deleted text
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 11: Lists -->
    <section id="wd-w1-t11" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📋</span>
          HTML Lists
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Unordered List
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Bullet points</p>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;ul&gt;
  &lt;li&gt;HTML&lt;/li&gt;
  &lt;li&gt;CSS&lt;/li&gt;
  &lt;li&gt;JS&lt;/li&gt;
&lt;/ul&gt;</code></pre>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Ordered List
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Numbered items</p>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;ol&gt;
  &lt;li&gt;Learn HTML&lt;/li&gt;
  &lt;li&gt;Learn CSS&lt;/li&gt;
  &lt;li&gt;Learn JS&lt;/li&gt;
&lt;/ol&gt;</code></pre>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Description List
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Terms & definitions</p>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;Structure&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 12: Links & Images -->
    <section id="wd-w1-t12" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔗</span>
          Links & Images
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Hyperlinks
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">&lt;a href="https://google.com"&gt;Visit Google&lt;/a&gt;</code>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">&lt;a href="https://google.com" target="_blank"&gt;Google&lt;/a&gt;</code>
                <span class="ml-2 text-xs text-indigo-400">→ Opens in new tab</span>
              </div>
            </div>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Images
            </h3>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">&lt;img src="profile.jpg" alt="Profile"&gt;</code>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">&lt;img src="profile.jpg" alt="Profile" width="250"&gt;</code>
              </div>
              <div class="mt-2 space-y-1">
                <h4 class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Path Types:</h4>
                <div class="rounded p-1.5 text-xs" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                  <span class="text-indigo-400">Relative:</span> images/logo.png
                </div>
                <div class="rounded p-1.5 text-xs" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                  <span class="text-indigo-400">Absolute:</span> https://example.com/logo.png
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 13: Semantic HTML -->
    <section id="wd-w1-t13" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🧩</span>
          Semantic HTML
        </h2>
        
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Semantic tags describe the purpose of content instead of using only &lt;div&gt;.
        </p>
        
        <div class="mt-4 grid gap-3 sm:grid-cols-3">
          <div v-for="tag in ['header', 'nav', 'main', 'section', 'article', 'footer']" :key="tag"
            class="rounded-lg p-3 text-center"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <code class="text-sm text-indigo-400">&lt;{{ tag }}&gt;</code>
            <p class="mt-1 text-xs capitalize" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              {{ tag }}
            </p>
          </div>
        </div>
        
        <div class="mt-4 rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            ✅ Benefits of Semantic HTML:
          </h4>
          <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li>• Better SEO</li>
            <li>• Better accessibility</li>
            <li>• Easier to read and maintain</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Topic 14: Block vs Inline -->
    <section id="wd-w1-t14" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📦</span>
          Block vs Inline Elements
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              🧱 Block Elements
            </h3>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Start on a new line and take up the full width.
            </p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="tag in ['div', 'p', 'h1', 'section', 'ul', 'article', 'footer']" :key="tag"
                class="rounded px-2 py-0.5 text-xs"
                :class="isDarkMode ? 'bg-slate-700 text-indigo-400' : 'bg-slate-200 text-indigo-600'"
              >
                &lt;{{ tag }}&gt;
              </span>
            </div>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ⚡ Inline Elements
            </h3>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Stay on the same line and only take up as much space as needed.
            </p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="tag in ['span', 'a', 'strong', 'em', 'img', 'mark', 'u']" :key="tag"
                class="rounded px-2 py-0.5 text-xs"
                :class="isDarkMode ? 'bg-slate-700 text-indigo-400' : 'bg-slate-200 text-indigo-600'"
              >
                &lt;{{ tag }}&gt;
              </span>
            </div>
          </div>
        </div>
        
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h4 class="font-semibold text-indigo-400">&lt;div&gt; Tag</h4>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              A block-level container used to group related content.
            </p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div&gt;
  &lt;h2&gt;About Me&lt;/h2&gt;
  &lt;p&gt;I love Web Development.&lt;/p&gt;
&lt;/div&gt;</code></pre>
          </div>
          
          <div class="rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h4 class="font-semibold text-indigo-400">&lt;span&gt; Tag</h4>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              An inline container used to style or group small pieces of text.
            </p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;p&gt;
  Learning &lt;span&gt;HTML&lt;/span&gt; is fun!
&lt;/p&gt;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 15: Summary -->
    <section id="wd-w1-t15" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-indigo-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Week 1 Summary
        </h2>
        
        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            After completing Week 1, you should be able to:
          </p>
          <ul class="mt-3 space-y-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Explain how websites and the internet work.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand the roles of the browser, server, and client.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create a basic HTML5 webpage.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Use headings, paragraphs, images, and links.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Organize information with lists.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Format text using semantic HTML tags.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand block-level and inline elements.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Use &lt;div&gt; and &lt;span&gt; to organize content.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Build a simple personal profile webpage with proper HTML structure.</span>
            </li>
          </ul>
        </div>
        
        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Remember:</strong> HTML is the foundation of every website. Focus on understanding the structure and purpose of each element rather than memorizing every tag. As you practice, writing HTML will become second nature.
          </p>
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
    { id: 'wd-w1-t1', title: 'What is Web Development?' },
    { id: 'wd-w1-t2', title: 'Website vs Webpage' },
    { id: 'wd-w1-t3', title: 'Static vs Dynamic Websites' },
    { id: 'wd-w1-t4', title: 'How the Internet Works' },
    { id: 'wd-w1-t5', title: 'Browser & Server' },
    { id: 'wd-w1-t6', title: 'Frontend vs Backend vs Full Stack' },
    { id: 'wd-w1-t7', title: 'What is HTML?' },
    { id: 'wd-w1-t8', title: 'Basic HTML Structure' },
    { id: 'wd-w1-t9', title: 'HTML Tags & Elements' },
    { id: 'wd-w1-t10', title: 'Headings & Text' },
    { id: 'wd-w1-t11', title: 'HTML Lists' },
    { id: 'wd-w1-t12', title: 'Links & Images' },
    { id: 'wd-w1-t13', title: 'Semantic HTML' },
    { id: 'wd-w1-t14', title: 'Block vs Inline Elements' },
    { id: 'wd-w1-t15', title: 'Week 1 Summary' },
  ];
  emit('topic-updated', topics);
});
</script>