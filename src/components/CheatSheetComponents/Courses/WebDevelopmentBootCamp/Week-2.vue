<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: What is CSS? -->
    <section id="wd-w2-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🎨</span>
          What is CSS?
        </h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p class="text-sm sm:text-base transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <strong>CSS</strong> stands for <strong>Cascading Style Sheets</strong>.
            </p>
            <p class="mt-2 text-sm sm:text-base transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              CSS is used to style HTML webpages. It controls how a webpage looks, including colors, fonts, spacing, layouts, and animations.
            </p>
            <div class="mt-3 rounded-lg p-3" :class="isDarkMode ? 'bg-slate-600' : 'bg-yellow-50'">
              <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                ⚠️ Without CSS, every webpage would look plain with only black text on a white background.
              </p>
            </div>
          </div>
          <div class="rounded-lg p-4 flex items-center justify-center" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <div class="text-center">
              <div class="text-6xl mb-2">🏠</div>
              <p class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">HTML → Structure</p>
              <p class="text-sm font-semibold text-indigo-400">CSS → Style & Beauty</p>
            </div>
          </div>
        </div>
        
        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            🏗️ Think of building a house:
          </h3>
          <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
              <span class="font-semibold text-indigo-400">HTML →</span>
              <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">The walls and rooms</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
              <span class="font-semibold text-indigo-400">CSS →</span>
              <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">The paint, furniture, lighting, and decoration</span>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            ✅ Advantages of CSS:
          </h3>
          <div class="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            <div v-for="advantage in ['Makes webpages attractive', 'Separates design from content', 'Reduces repetitive code', 'Makes websites responsive', 'Easy to maintain', 'Improves user experience']" :key="advantage"
              class="rounded p-2 flex items-center gap-1"
              :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-white text-slate-600'"
            >
              <span class="text-indigo-400">✅</span>
              {{ advantage }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 2: Ways to Add CSS -->
    <section id="wd-w2-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Ways to Add CSS
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          There are <strong>three ways</strong> to use CSS.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <!-- Inline CSS -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              1. Inline CSS
            </h3>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Applied directly inside an HTML element.
            </p>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;h1 style="color: blue;"&gt;Welcome&lt;/h1&gt;</code></pre>
            <div class="mt-2">
              <span class="text-xs font-semibold text-green-400">✅ Pros:</span>
              <span class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Quick for testing</span>
            </div>
            <div class="mt-1">
              <span class="text-xs font-semibold text-red-400">❌ Cons:</span>
              <span class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Difficult to maintain, not recommended</span>
            </div>
          </div>

          <!-- Internal CSS -->
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              2. Internal CSS
            </h3>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Written inside the &lt;style&gt; tag.
            </p>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;head&gt;
  &lt;style&gt;
    h1 { color: blue; }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
            <div class="mt-2">
              <span class="text-xs font-semibold text-yellow-400">📌 Best for:</span>
              <span class="text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Small webpages</span>
            </div>
          </div>

          <!-- External CSS -->
          <div class="rounded-lg p-4 border-2 border-indigo-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              3. External CSS ⭐
            </h3>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              Create a separate CSS file. <strong class="text-indigo-400">(Recommended)</strong>
            </p>
            <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;link rel="stylesheet" href="style.css"&gt;</code></pre>
            <div class="mt-2">
              <span class="text-xs font-semibold text-green-400">✅ Advantages:</span>
              <ul class="mt-1 space-y-0.5 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                <li>• Easy to manage</li>
                <li>• Reusable</li>
                <li>• Professional approach</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 3: CSS Syntax -->
    <section id="wd-w2-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📐</span>
          CSS Syntax
        </h2>
        
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
              <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
                Basic Syntax
              </h3>
              <pre class="mt-2 rounded p-3 text-sm overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>selector {
  property: value;
}</code></pre>
              <div class="mt-3 space-y-2">
                <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
                  <span class="text-indigo-400 font-semibold">Selector</span>
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"> → h1</span>
                </div>
                <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
                  <span class="text-indigo-400 font-semibold">Property</span>
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"> → color</span>
                </div>
                <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
                  <span class="text-indigo-400 font-semibold">Value</span>
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"> → red</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Example
            </h3>
            <pre class="mt-2 rounded p-3 text-sm overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>h1 {
  color: red;
  font-size: 24px;
}</code></pre>
            <div class="mt-3 rounded p-2" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
              <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                <span class="text-indigo-400">/* This is a CSS comment */</span>
              </p>
              <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                Comments help explain your code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: CSS Selectors -->
    <section id="wd-w2-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🎯</span>
          CSS Selectors
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Selectors tell CSS which HTML element to style.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Element Selector
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>p {
  color: blue;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Styles every paragraph.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Class Selector
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.intro {
  color: green;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Use a class when multiple elements share the same style.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              ID Selector
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>#title {
  color: red;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">IDs should be unique on a page.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Universal Selector
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>* {
  margin: 0;
  padding: 0;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Selects every element.</p>
          </div>

          <div class="rounded-lg p-4 sm:col-span-2" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Group Selector
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>h1, p, button {
  font-family: Arial;
}</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Applies the same style to multiple elements.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 5: CSS Colors -->
    <section id="wd-w2-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🎨</span>
          CSS Colors
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          You can specify colors in several ways.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Color Names
            </h3>
            <div class="mt-2 rounded p-2 bg-red-500 text-white text-center text-sm">
              color: red;
            </div>
            <div class="mt-2 rounded p-2 bg-blue-500 text-white text-center text-sm">
              color: blue;
            </div>
            <div class="mt-2 rounded p-2 bg-green-500 text-white text-center text-sm">
              color: green;
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HEX Colors
            </h3>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: #2563eb; color: white;">
              #2563eb
            </div>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: #dc2626; color: white;">
              #dc2626
            </div>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: #16a34a; color: white;">
              #16a34a
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              RGB Colors
            </h3>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: rgb(37, 99, 235); color: white;">
              rgb(37, 99, 235)
            </div>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: rgb(220, 38, 38); color: white;">
              rgb(220, 38, 38)
            </div>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: rgb(22, 163, 74); color: white;">
              rgb(22, 163, 74)
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              RGBA Colors
            </h3>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: rgba(37, 99, 235, 0.5);">
              rgba(37, 99, 235, 0.5)
            </div>
            <div class="mt-2 rounded p-2 text-center text-sm" style="background-color: rgba(220, 38, 38, 0.5);">
              rgba(220, 38, 38, 0.5)
            </div>
            <p class="mt-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
              The last value controls transparency.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 6: Background -->
    <section id="wd-w2-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🖼️</span>
          Background Properties
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Background Color
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>background-color: lightblue;</code></pre>
            <div class="mt-2 rounded p-4 text-center" style="background-color: lightblue;">
              <span class="text-sm" :class="isDarkMode ? 'text-slate-800' : 'text-slate-800'">Light Blue Background</span>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Background Image
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>background-image: url("bg.jpg");</code></pre>
            <div class="mt-2 rounded p-4 text-center" style="background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <span class="text-sm">Gradient Background</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: Text Properties -->
    <section id="wd-w2-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Text Properties
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Text Color
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>color: #333;</code></pre>
            
            <h3 class="mt-4 font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Font Size
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>font-size: 20px;</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Font Family
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>font-family: Arial, sans-serif;</code></pre>

            <h3 class="mt-4 font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Font Weight
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>font-weight: bold;</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Text Alignment
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>text-align: center;</code></pre>
            <div class="mt-2 space-y-1 text-sm">
              <div class="rounded p-1 text-left" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">Left</div>
              <div class="rounded p-1 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">Center</div>
              <div class="rounded p-1 text-right" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">Right</div>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Text Decoration
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>text-decoration: none;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Commonly used to remove underline from links.</p>

            <h3 class="mt-4 font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Text Transform
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>text-transform: uppercase;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 8: CSS Units -->
    <section id="wd-w2-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📏</span>
          Units in CSS
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Pixels
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>font-size: 18px;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Fixed size, not responsive.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Percentage
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>width: 50%;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Relative to parent element.</p>
          </div>

          <div class="rounded-lg p-4 border-2 border-indigo-500/30" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              rem ⭐
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>font-size: 1.5rem;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Recommended for responsive typography.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              em
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>padding: 2em;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Relative to the parent element.</p>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Viewport Units
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>height: 100vh;
width: 100vw;</code></pre>
            <p class="mt-1 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Useful for full-screen sections.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: CSS Box Model -->
<section id="wd-w2-t9" class="scroll-mt-4">
  <div
    class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
    :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
  >
    <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
      <span class="text-2xl">📦</span>
      The CSS Box Model
    </h2>
    <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
      Every HTML element is a rectangular box. The box model consists of:
    </p>

    <!-- Box Model Visualization -->
    <div class="mt-6 flex justify-center">
      <div class="relative w-full max-w-md mx-auto">
        <!-- Margin -->
        <div class="p-8 border-2 border-dashed rounded-lg" :class="isDarkMode ? 'border-orange-400/50' : 'border-orange-400'">
          <div class="absolute -top-2 left-4 text-xs font-semibold text-orange-400 bg-white dark:bg-slate-700 px-2 rounded">
            Margin
          </div>
          
          <!-- Border -->
          <div class="p-6 border-2 rounded-lg relative" :class="isDarkMode ? 'border-yellow-400/50' : 'border-yellow-500'">
            <div class="absolute -top-2 left-4 text-xs font-semibold text-yellow-500 bg-white dark:bg-slate-700 px-2 rounded">
              Border
            </div>
            
            <!-- Padding -->
            <div class="p-6 border-2 rounded-lg relative" :class="isDarkMode ? 'border-green-400/50' : 'border-green-500'">
              <div class="absolute -top-2 left-4 text-xs font-semibold text-green-500 bg-white dark:bg-slate-700 px-2 rounded">
                Padding
              </div>
              
              <!-- Content -->
              <div class="p-6 rounded-lg text-center" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
                <p class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
                  Content
                </p>
                <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  width: 300px<br>
                  height: 200px
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Labels with arrows -->
        <div class="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div class="text-center text-orange-400 font-semibold">Margin (Outside)</div>
          <div class="text-center text-yellow-500 font-semibold">Border (Edge)</div>
          <div class="text-center text-green-500 font-semibold">Padding (Inside)</div>
          <div class="text-center text-indigo-400 font-semibold">Content (Center)</div>
        </div>
      </div>
    </div>

    <!-- Box Model Details -->
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-lg p-4 border-l-4 border-orange-400" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-orange-400">⬛</span> Margin
        </h3>
        <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          Space outside the border. Creates distance between elements.
        </p>
        <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>margin: 20px;
margin-top: 10px;
margin: 10px 20px;</code></pre>
      </div>

      <div class="rounded-lg p-4 border-l-4 border-yellow-500" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-yellow-500">⬛</span> Border
        </h3>
        <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          The edge of the element. Can be styled with color, width, and style.
        </p>
        <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>border: 2px solid black;
border-radius: 10px;
border-color: #2563eb;</code></pre>
      </div>

      <div class="rounded-lg p-4 border-l-4 border-green-500" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-green-500">⬛</span> Padding
        </h3>
        <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          Space inside the border. Creates space between content and border.
        </p>
        <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>padding: 20px;
padding: 10px 20px;
padding-top: 15px;</code></pre>
      </div>

      <div class="rounded-lg p-4 border-l-4 border-indigo-400" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-indigo-400">⬛</span> Content
        </h3>
        <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          The actual content of the element (text, images, etc.).
        </p>
        <pre class="mt-2 rounded p-2 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>width: 300px;
height: 200px;
content: "Hello World";</code></pre>
      </div>
    </div>

    <!-- Box Model Diagram with Labels -->
    <div class="mt-6 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
      <h3 class="font-semibold text-center transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
        📐 Box Model Formula
      </h3>
      <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div class="rounded p-3 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
          <p class="text-orange-400 font-semibold">Total Width</p>
          <p class="mt-1" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <span class="text-indigo-400">width</span> + 
            <span class="text-green-500">padding</span> × 2 + 
            <span class="text-yellow-500">border</span> × 2
          </p>
        </div>
        <div class="rounded p-3 text-center" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
          <p class="text-orange-400 font-semibold">Total Height</p>
          <p class="mt-1" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <span class="text-indigo-400">height</span> + 
            <span class="text-green-500">padding</span> × 2 + 
            <span class="text-yellow-500">border</span> × 2
          </p>
        </div>
      </div>
    </div>

    <!-- Box Model Properties -->
    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          Width & Height
        </h3>
        <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>width: 300px;
height: 200px;</code></pre>
      </div>

      <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          Padding
        </h3>
        <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Space inside the border.</p>
        <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>padding: 20px;</code></pre>
      </div>

      <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          Margin
        </h3>
        <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Space outside the border.</p>
        <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>margin: 20px;</code></pre>
      </div>

      <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
        <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          Border & Radius
        </h3>
        <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>border: 2px solid black;
border-radius: 10px;</code></pre>
      </div>
    </div>

    <!-- Box Model in Action - Live Example -->
    <div class="mt-6 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
      <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
        🎯 Box Model in Action
      </h3>
      <div class="mt-3 flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <div class="p-4 bg-orange-100 dark:bg-orange-900/20 rounded">
            <p class="text-xs text-orange-600 dark:text-orange-400 font-semibold">Margin: 20px</p>
            <div class="mt-2 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded border-2 border-yellow-500">
              <p class="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">Border: 2px</p>
              <div class="mt-2 p-4 bg-green-100 dark:bg-green-900/20 rounded">
                <p class="text-xs text-green-600 dark:text-green-400 font-semibold">Padding: 16px</p>
                <div class="mt-2 p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded text-center">
                  <p class="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Content</p>
                  <p class="text-xs text-indigo-500 dark:text-indigo-400">This is the content area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 min-w-[200px]">
          <div class="rounded p-4" :class="isDarkMode ? 'bg-slate-700' : 'bg-white'">
            <h4 class="font-semibold text-sm" :class="isDarkMode ? 'text-white' : 'text-slate-800'">Box Model Breakdown:</h4>
            <ul class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <li class="flex items-center gap-2">
                <span class="w-3 h-3 bg-orange-400 rounded"></span>
                Margin: 20px (outside)
              </li>
              <li class="flex items-center gap-2">
                <span class="w-3 h-3 bg-yellow-500 rounded"></span>
                Border: 2px (edge)
              </li>
              <li class="flex items-center gap-2">
                <span class="w-3 h-3 bg-green-500 rounded"></span>
                Padding: 16px (inside)
              </li>
              <li class="flex items-center gap-2">
                <span class="w-3 h-3 bg-indigo-400 rounded"></span>
                Content: Text/Images (center)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- Topic 10: Display Property -->
    <section id="wd-w2-t10" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📐</span>
          Display Property
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Block
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Takes full width.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>display: block;</code></pre>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <span class="font-semibold">Examples:</span> div, p, h1
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Inline
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Takes only required width.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>display: inline;</code></pre>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <span class="font-semibold">Examples:</span> span, a
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              Inline-Block
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Acts like inline but allows width and height.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>display: inline-block;</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              None
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Hides an element.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>display: none;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 11: Flexbox -->
    <section id="wd-w2-t11" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">🧩</span>
          Flexbox (Introduction)
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Flexbox is used to arrange elements in rows or columns.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <pre class="rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>display: flex;</code></pre>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              justify-content
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Controls horizontal alignment.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>justify-content: center;</code></pre>
            <div class="mt-2 space-y-1 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">space-between</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">space-around</div>
              <div class="rounded p-1" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">space-evenly</div>
            </div>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              align-items
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Controls vertical alignment.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>align-items: center;</code></pre>
          </div>

          <div class="rounded-lg p-4 sm:col-span-2" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              gap
            </h3>
            <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">Adds spacing between items.</p>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>gap: 20px;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 12: Responsive Design -->
    <section id="wd-w2-t12" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📱</span>
          Responsive Design
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          A responsive website works well on:
        </p>

        <div class="mt-4 flex flex-wrap gap-2 justify-center">
          <span v-for="device in ['💻 Desktop', '🖥️ Laptop', '📱 Tablet', '📱 Mobile']" :key="device"
            class="rounded-full px-4 py-2 text-sm font-medium"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-100 text-slate-700'"
          >
            {{ device }}
          </span>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            Viewport Meta Tag
          </h3>
          <pre
            class="mt-2 w-full overflow-x-auto rounded-lg p-3 text-sm"
            :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"
          >
            <code class="whitespace-pre">
          &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
            </code>
          </pre>
          <p class="mt-1 text-xs text-indigo-400">Required for responsive websites.</p>
        </div>
      </div>
    </section>

    <!-- Topic 13: Media Queries -->
    <section id="wd-w2-t13" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📊</span>
          Media Queries
        </h2>
        <p class="mt-2 text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
          Used to apply different styles for different screen sizes.
        </p>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <pre class="rounded p-3 text-sm overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>@media (max-width: 768px) {
  h1 {
    font-size: 28px;
  }
}</code></pre>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              📱 Mobile First
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>/* Mobile styles */
body { font-size: 16px; }

/* Tablet */
@media (min-width: 768px) {
  body { font-size: 18px; }
}</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              💻 Desktop First
            </h3>
            <pre class="mt-2 rounded p-2 text-xs" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>/* Desktop styles */
body { font-size: 20px; }

/* Tablet */
@media (max-width: 1024px) {
  body { font-size: 18px; }
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 14: Best Practices -->
    <section id="wd-w2-t14" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">✅</span>
          Best Practices
        </h2>

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div v-for="practice in [
            'Use External CSS',
            'Use meaningful class names',
            'Keep CSS organized',
            'Avoid Inline CSS',
            'Use Flexbox for layouts',
            'Use rem for fonts',
            'Make every webpage responsive'
          ]" :key="practice"
            class="rounded-lg p-3 flex items-center gap-2"
            :class="isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-50 text-slate-600'"
          >
            <span class="text-green-400">✅</span>
            {{ practice }}
          </div>
        </div>

        <div class="mt-6 rounded-lg p-4 border-2 border-red-400/30" :class="isDarkMode ? 'bg-red-900/20' : 'bg-red-50'">
          <h3 class="font-semibold text-red-400">❌ Common Beginner Mistakes</h3>
          <div class="mt-2 space-y-2">
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-600' : 'bg-white'">
              <span class="text-red-400">❌</span>
              <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Forgetting to link the CSS file</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-600' : 'bg-white'">
              <span class="text-red-400">❌</span>
              <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Wrong file path</span>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-600' : 'bg-white'">
              <span class="text-red-400">❌</span>
              <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Missing semicolon</span>
              <pre class="mt-1 rounded p-1 text-xs" :class="isDarkMode ? 'bg-slate-700 text-red-400' : 'bg-slate-200 text-red-600'"><code>color: red /* ❌ Missing semicolon */</code></pre>
            </div>
            <div class="rounded p-2" :class="isDarkMode ? 'bg-slate-600' : 'bg-white'">
              <span class="text-red-400">❌</span>
              <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Using = instead of :</span>
              <pre class="mt-1 rounded p-1 text-xs" :class="isDarkMode ? 'bg-slate-700 text-red-400' : 'bg-slate-200 text-red-600'"><code>color = red; /* ❌ Wrong */</code></pre>
              <pre class="mt-1 rounded p-1 text-xs text-green-400" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"><code>color: red; /* ✅ Correct */</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 15: Mini Example -->
    <section id="wd-w2-t15" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">💡</span>
          Mini Example
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              HTML
            </h3>
            <pre class="mt-2 rounded p-3 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>&lt;div class="card"&gt;
  &lt;h2&gt;Web Development&lt;/h2&gt;
  &lt;p&gt;Learn HTML and CSS&lt;/p&gt;
  &lt;button&gt;Start Learning&lt;/button&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
            <h3 class="font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
              CSS
            </h3>
            <pre class="mt-2 rounded p-3 text-xs overflow-x-auto" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'"><code>.card {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background: #f5f5f5;
}

button {
  background: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}</code></pre>
          </div>
        </div>

        <div class="mt-4 rounded-lg p-6 text-center" :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'">
          <div class="inline-block p-6 rounded-lg text-left" style="background: #f5f5f5; width: 300px; max-width: 100%;">
            <h2 class="text-xl font-bold text-slate-800">Web Development</h2>
            <p class="text-slate-600">Learn HTML and CSS</p>
            <button class="mt-2 px-4 py-2 rounded text-white" style="background: #2563eb; border: none;">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 16: Summary -->
    <section id="wd-w2-t16" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300 border-2 border-indigo-500/30"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2 class="text-xl sm:text-2xl font-bold transition-colors duration-300 flex items-center gap-2" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
          <span class="text-2xl">📝</span>
          Week 2 Summary
        </h2>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'">
          <p class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-800'">
            By the end of Week 2, you should be able to:
          </p>
          <ul class="mt-3 space-y-2 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Explain the purpose of CSS.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Add CSS using inline, internal, and external methods.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Write CSS using proper syntax.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Style text, colors, backgrounds, and borders.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Understand the CSS Box Model.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Use classes and IDs effectively.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create layouts with Flexbox.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Build responsive webpages using media queries.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Design clean, attractive webpages that work across different devices.</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg p-4" :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'">
          <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            💡 <strong>Remember:</strong> HTML provides the structure of a webpage, while CSS transforms that structure into a visually appealing and responsive user experience. Consistent practice is the key to becoming comfortable with CSS.
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
    { id: 'wd-w2-t1', title: 'What is CSS?' },
    { id: 'wd-w2-t2', title: 'Ways to Add CSS' },
    { id: 'wd-w2-t3', title: 'CSS Syntax' },
    { id: 'wd-w2-t4', title: 'CSS Selectors' },
    { id: 'wd-w2-t5', title: 'CSS Colors' },
    { id: 'wd-w2-t6', title: 'Background Properties' },
    { id: 'wd-w2-t7', title: 'Text Properties' },
    { id: 'wd-w2-t8', title: 'Units in CSS' },
    { id: 'wd-w2-t9', title: 'CSS Box Model' },
    { id: 'wd-w2-t10', title: 'Display Property' },
    { id: 'wd-w2-t11', title: 'Flexbox' },
    { id: 'wd-w2-t12', title: 'Responsive Design' },
    { id: 'wd-w2-t13', title: 'Media Queries' },
    { id: 'wd-w2-t14', title: 'Best Practices' },
    { id: 'wd-w2-t15', title: 'Mini Example' },
    { id: 'wd-w2-t16', title: 'Week 2 Summary' },
  ];
  emit('topic-updated', topics);
});
</script>