<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: Introduction -->
    <section id="wd-w3-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🎯</span>
          Week 3 Overview
        </h2>
        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            <strong>Goal of Week 3:</strong> Learn how to build modern, responsive, and professional-looking websites using 
            <strong>CSS Grid</strong>, <strong>Transitions</strong>, <strong>Animations</strong>, and <strong>Bootstrap</strong>.
          </p>
        </div>
        
        <div class="mt-4 grid gap-3 sm:grid-cols-3">
          <div v-for="(item, index) in ['CSS Grid Layout', 'CSS Transitions', 'CSS Animations', 'Introduction to Bootstrap', 'Bootstrap Grid System', 'Bootstrap Components', 'Bootstrap Utilities', 'Responsive Website Design', 'Best Practices']" :key="index"
            class="rounded-lg p-2 text-center text-sm"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-50 text-slate-600'"
          >
            <span class="text-indigo-400">✓</span> {{ item }}
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 2: CSS Grid -->
    <section id="wd-w3-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📐</span>
          CSS Grid Layout
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          CSS Grid is a layout system that helps you arrange items in <strong>rows and columns</strong>.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            🎯 Think of a chessboard or a spreadsheet. Everything is placed inside boxes arranged in rows and columns.
          </p>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="use in ['Dashboards', 'Galleries', 'Landing Pages', 'Portfolio Websites', 'Admin Panels']" :key="use"
              class="rounded-full px-3 py-1 text-xs"
              :class="isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'"
            >
              {{ use }}
            </span>
          </div>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Why Use CSS Grid?
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Clean code
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Easy alignment
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Fully responsive layouts
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Better control over rows and columns
              </li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Creating a Grid Container
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.container {
  display: grid;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Now every direct child becomes a <strong>grid item</strong>.
            </p>
          </div>
        </div>

        <!-- Grid Columns -->
        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Grid Columns
          </h3>
          <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}</code></pre>
          <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Creates 3 columns.</p>

          <div class="mt-3">
            <h4 class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Using Fractions (Recommended)</h4>
            <pre class="mt-1 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"><code>fr</code> means <strong>fraction</strong>. Creates three equal columns.</p>
            
            <div class="mt-2 grid grid-cols-3 gap-2 text-center">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'">
                1
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'">
                2
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'">
                3
              </div>
            </div>
          </div>
        </div>

        <!-- Grid Rows & Gap -->
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Grid Rows
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.container {
  display: grid;
  grid-template-rows: 100px 200px;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Creates two rows.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Gap Between Grid Items
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.container {
  display: grid;
  gap: 20px;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Instead of using margins, Grid provides <code>gap</code>.</p>
          </div>
        </div>

        <!-- Complete Example -->
        <div class="mt-4 rounded-lg p-4 border-2 border-indigo-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Complete Grid Example
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">HTML</p>
              <pre class="mt-1 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div class="container"&gt;
  &lt;div&gt;1&lt;/div&gt;
  &lt;div&gt;2&lt;/div&gt;
  &lt;div&gt;3&lt;/div&gt;
  &lt;div&gt;4&lt;/div&gt;
&lt;/div&gt;</code></pre>
            </div>
            <div>
              <p class="text-xs font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">CSS</p>
              <pre class="mt-1 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.container div {
  background: #2563eb;
  color: white;
  padding: 20px;
}</code></pre>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-3">
            <div v-for="n in 4" :key="n" class="rounded p-4 text-center text-white" style="background: #2563eb;">
              {{ n }}
            </div>
          </div>
        </div>

        <!-- Responsive Grid -->
        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Responsive Grid
          </h3>
          <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}</code></pre>
          <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            This automatically adjusts the number of columns based on screen size.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout" target="_blank" 
            class="inline-block mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
            📚 MDN Grid Documentation →
          </a>
        </div>
      </div>
    </section>

    <!-- Topic 3: CSS Transitions -->
    <section id="wd-w3-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🔄</span>
          CSS Transitions & Transform
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              CSS Transitions
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Transitions make changes happen <strong>smoothly</strong> instead of instantly.
            </p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>button {
  background: blue;
  transition: 0.3s;
}

button:hover {
  background: red;
}</code></pre>
            
            <div class="mt-3">
              <h4 class="text-xs font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Transition Properties</h4>
              <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                <li><code>transition-property</code></li>
                <li><code>transition-duration</code></li>
                <li><code>transition-delay</code></li>
                <li><code>transition-timing-function</code></li>
              </ul>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              CSS Transform
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Transform changes the appearance of an element.
            </p>
            <div class="mt-2 space-y-2">
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">transform: scale(1.1);</code>
                <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">→ Makes larger</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">transform: rotate(20deg);</code>
                <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">→ Rotates</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">transform: translateX(20px);</code>
                <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">→ Moves</span>
              </div>
              <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
                <code class="text-xs">transform: skew(15deg);</code>
                <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">→ Tilts</span>
              </div>
            </div>
            <div class="mt-3 rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <pre class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"><code>.card {
  transition: 0.4s ease;
}

.card:hover {
  transform: scale(1.05);
}</code></pre>
            </div>
          </div>
        </div>

        <!-- Live Demo -->
        <div class="mt-4 rounded-lg p-6 text-center" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <div class="inline-block">
            <button 
              class="px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
              @mouseenter="buttonHover = true"
              @mouseleave="buttonHover = false"
            >
              Hover Me
            </button>
            <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Hover to see transition & transform effects
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: CSS Animations -->
    <section id="wd-w3-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🎬</span>
          CSS Animations
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Animations create continuous movement.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Step 1: Create Animation
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>@keyframes move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(200px);
  }
}</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Step 2: Use Animation
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.box {
  animation: move 2s infinite;
}</code></pre>
            <div class="mt-2">
              <h4 class="text-xs font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Animation Properties</h4>
              <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                <li><code>animation-name</code></li>
                <li><code>animation-duration</code></li>
                <li><code>animation-delay</code></li>
                <li><code>animation-iteration-count</code></li>
                <li><code>animation-direction</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Example: Loading Spinner
          </h3>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <pre class="rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.loading {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}</code></pre>
            </div>
            <div class="flex items-center justify-center p-4" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <div class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations" target="_blank" 
            class="inline-block mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
            📚 MDN Animations Documentation →
          </a>
        </div>
      </div>
    </section>

    <!-- Topic 5: Introduction to Bootstrap -->
    <section id="wd-w3-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🚀</span>
          Introduction to Bootstrap
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Bootstrap is a <strong>free CSS framework</strong> with ready-made components.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Components Included
            </h3>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="component in ['Buttons', 'Cards', 'Navbar', 'Forms', 'Alerts', 'Tables', 'Modals', 'Carousels']" :key="component"
                class="rounded px-2 py-0.5 text-xs"
                :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
              >
                {{ component }}
              </span>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Why Learn Bootstrap?
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Faster development
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Mobile-first design
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Responsive by default
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Professional UI
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✅</span> Widely used in industry
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Adding Bootstrap (CDN)
          </h3>
          <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;</code></pre>
          <div class="mt-2 rounded-lg p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
            <div class="flex flex-wrap gap-2">
              <div class="rounded px-3 py-1 text-xs font-semibold text-white" style="background: #0d6efd;">Container</div>
              <div class="rounded px-3 py-1 text-xs font-semibold text-white" style="background: #0d6efd;">Container-fluid</div>
            </div>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              <code>.container</code> provides proper spacing &nbsp;|&nbsp; <code>.container-fluid</code> uses full width
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 6: Bootstrap Grid -->
    <section id="wd-w3-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📊</span>
          Bootstrap Grid System
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Bootstrap uses a <strong>12-column grid</strong> system.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Basic Grid
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div class="row"&gt;
  &lt;div class="col"&gt;Column 1&lt;/div&gt;
  &lt;div class="col"&gt;Column 2&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Custom Columns
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div class="row"&gt;
  &lt;div class="col-4"&gt;Sidebar&lt;/div&gt;
  &lt;div class="col-8"&gt;Content&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Responsive Columns
          </h3>
          <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div class="col-md-6"&gt;</code></pre>
          <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li>📱 Mobile → Full width</li>
            <li>💻 Medium screen → Half width</li>
          </ul>
        </div>

        <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div v-for="col in [3, 3, 3, 3]" :key="col" class="rounded p-3 text-center text-xs text-white" style="background: #0d6efd;">
            col-{{ col }}
          </div>
        </div>
        <div class="mt-2 grid grid-cols-3 gap-2">
          <div v-for="col in [4, 4, 4]" :key="col" class="rounded p-3 text-center text-xs text-white" style="background: #6c757d;">
            col-{{ col }}
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: Bootstrap Components -->
    <section id="wd-w3-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🧩</span>
          Bootstrap Components
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Buttons -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Buttons
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;button class="btn btn-primary"&gt;Submit&lt;/button&gt;</code></pre>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="color in ['primary', 'success', 'danger', 'warning', 'info', 'dark', 'secondary']" :key="color"
                class="rounded px-2 py-0.5 text-xs text-white"
                :style="{ background: color === 'warning' ? '#ffc107' : color === 'light' ? '#f8f9fa' : '#' + color }"
              >
                btn-{{ color }}
              </span>
            </div>
          </div>

          <!-- Cards -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Cards
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div class="card"&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;Course&lt;/h5&gt;
    &lt;p&gt;Learn Web Development&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>

          <!-- Forms -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Forms
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;input class="form-control" 
       type="text" 
       placeholder="Enter Name"&gt;</code></pre>
          </div>

          <!-- Alerts -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Alerts & Badges
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div class="alert alert-success"&gt;
  Registration Successful!
&lt;/div&gt;

&lt;span class="badge bg-primary"&gt;New&lt;/span&gt;</code></pre>
          </div>

          <!-- Tables -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Tables
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;table class="table table-striped"&gt;</code></pre>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="cls in ['table-bordered', 'table-hover', 'table-dark', 'table-success']" :key="cls"
                class="rounded px-2 py-0.5 text-xs"
                :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
              >
                {{ cls }}
              </span>
            </div>
          </div>

          <!-- Navbar -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Navbar
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;nav class="navbar navbar-expand-lg bg-dark"&gt;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Responsive navigation built into Bootstrap.
            </p>
          </div>
        </div>

        <a href="https://getbootstrap.com/docs/5.3/components/" target="_blank" 
          class="inline-block mt-4 text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
          📚 Bootstrap Components Documentation →
        </a>
      </div>
    </section>

    <!-- Topic 8: Bootstrap Utilities -->
    <section id="wd-w3-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🛠️</span>
          Bootstrap Utilities
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Utilities are helper classes that reduce custom CSS.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Spacing
            </h3>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>mt-3</code> → Margin top</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>mb-4</code> → Margin bottom</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>p-3</code> → Padding all</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>px-4</code> → Padding x-axis</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>py-2</code> → Padding y-axis</div>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Text & Display
            </h3>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>text-center</code> → Center text</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>text-start</code> → Left text</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>d-flex</code> → Flex display</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>d-none</code> → Hidden</div>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Flex Utilities
            </h3>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>justify-content-center</code></div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>align-items-center</code></div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>gap-3</code> → Spacing</div>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Styles & Sizing
            </h3>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>rounded</code> → Border radius</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>rounded-circle</code> → Circle</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>shadow</code> → Box shadow</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>w-50</code> → Width 50%</div>
            </div>
          </div>
        </div>

        <!-- Responsive Breakpoints -->
        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Responsive Breakpoints
          </h3>
          <div class="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong>xs</strong><br>Less than 576px
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong>sm</strong><br>≥576px
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong>md</strong><br>≥768px
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong>lg</strong><br>≥992px
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong>xl</strong><br>≥1200px
            </div>
            <div class="rounded p-2 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <strong>xxl</strong><br>≥1400px
            </div>
          </div>
          <div class="mt-2 rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
            <code class="text-xs">col-sm-12 col-md-6 col-lg-4</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: Bootstrap vs Custom CSS -->
    <section id="wd-w3-t9" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">⚖️</span>
          Bootstrap vs Custom CSS
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4 border-2 border-indigo-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-indigo-400">Bootstrap</h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ Faster development</li>
              <li class="flex items-center gap-2">✅ Ready-made components</li>
              <li class="flex items-center gap-2">✅ Mobile-first design</li>
              <li class="flex items-center gap-2">✅ Easy for beginners</li>
            </ul>
          </div>

          <div class="rounded-lg p-4 border-2 border-purple-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold text-purple-400">Custom CSS</h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">✅ More flexibility</li>
              <li class="flex items-center gap-2">✅ Fully customizable</li>
              <li class="flex items-center gap-2">✅ Requires more coding</li>
              <li class="flex items-center gap-2">✅ Better for unique designs</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 In real-world projects, developers often use <strong>both</strong> Bootstrap and custom CSS together.
          </p>
        </div>
      </div>
    </section>

    <!-- Topic 10: Best Practices & Summary -->
    <section id="wd-w3-t10" class="scroll-mt-4">
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
              <li class="flex items-center gap-2">✅ Use CSS Grid for complex page layouts</li>
              <li class="flex items-center gap-2">✅ Use Flexbox for single-direction alignment</li>
              <li class="flex items-center gap-2">✅ Keep animations subtle and meaningful</li>
              <li class="flex items-center gap-2">✅ Use Bootstrap components instead of recreating</li>
              <li class="flex items-center gap-2">✅ Customize Bootstrap with your own CSS when needed</li>
              <li class="flex items-center gap-2">✅ Test layouts on different screen sizes</li>
            </ul>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ❌ Common Mistakes
            </h3>
            <ul class="mt-2 space-y-1 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">❌ Too many animations, distracting website</li>
              <li class="flex items-center gap-2">❌ Mixing Grid and Flexbox without understanding</li>
              <li class="flex items-center gap-2">❌ Forgetting Bootstrap container</li>
              <li class="flex items-center gap-2">❌ Overriding Bootstrap classes unnecessarily</li>
              <li class="flex items-center gap-2">❌ Not checking responsiveness on mobile</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            By the end of Week 3, you should be able to:
          </p>
          <ul class="mt-3 space-y-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Build layouts using <strong>CSS Grid</strong>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Add smooth effects with <strong>Transitions</strong>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create engaging UI with <strong>Animations</strong>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand and use the <strong>Bootstrap framework</strong>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Build responsive layouts with Bootstrap's <strong>12-column grid system</strong>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Use common Bootstrap components like buttons, cards, navbars, forms, tables, and alerts.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Apply Bootstrap utility classes for spacing, alignment, sizing, and responsiveness.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Combine Bootstrap with custom CSS to create professional, responsive websites.</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Remember:</strong> CSS gives you complete control over your design, while Bootstrap helps you build polished interfaces much faster. Learning both allows you to create modern websites efficiently without sacrificing flexibility.
          </p>
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 MDN CSS Docs
          </a>
          <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" target="_blank" 
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            📚 Bootstrap Docs
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  isDarkMode: Boolean,
  week: Number,
});

const emit = defineEmits(['topic-updated']);

// State for button hover demo
const buttonHover = ref(false);

onMounted(() => {
  const topics = [
    { id: 'wd-w3-t1', title: 'Week 3 Overview' },
    { id: 'wd-w3-t2', title: 'CSS Grid Layout' },
    { id: 'wd-w3-t3', title: 'CSS Transitions & Transform' },
    { id: 'wd-w3-t4', title: 'CSS Animations' },
    { id: 'wd-w3-t5', title: 'Introduction to Bootstrap' },
    { id: 'wd-w3-t6', title: 'Bootstrap Grid System' },
    { id: 'wd-w3-t7', title: 'Bootstrap Components' },
    { id: 'wd-w3-t8', title: 'Bootstrap Utilities' },
    { id: 'wd-w3-t9', title: 'Bootstrap vs Custom CSS' },
    { id: 'wd-w3-t10', title: 'Best Practices & Summary' },
  ];
  emit('topic-updated', topics);
});
</script>