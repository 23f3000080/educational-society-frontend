<template>
  <div class="space-y-6 pb-20 md:pb-0">
    <!-- Topic 1: What is the DOM? -->
    <section id="wd-w5-t1" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">🌐</span>
          What is the DOM?
        </h2>

        <p
          class="mt-2 text-sm transition-colors duration-300 sm:text-base"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          <strong>DOM</strong> stands for <strong>Document Object Model</strong>.
        </p>

        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
        >
          <p
            class="text-sm"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
          >
            When a browser loads an HTML page, it converts the HTML into a tree-like structure called the DOM.
          </p>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Left Column: What JavaScript can do -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              JavaScript can use the DOM to:
            </h3>
            <ul
              class="mt-2 space-y-1 text-sm"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
            >
              <li class="flex items-center gap-2">✅ Read webpage content</li>
              <li class="flex items-center gap-2">✅ Change text</li>
              <li class="flex items-center gap-2">✅ Add new elements</li>
              <li class="flex items-center gap-2">✅ Remove elements</li>
              <li class="flex items-center gap-2">✅ Change styles</li>
              <li class="flex items-center gap-2">✅ Handle button clicks</li>
              <li class="flex items-center gap-2">✅ Handle forms</li>
            </ul>
          </div>

          <!-- Right Column: DOM Tree Structure -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              DOM Tree Structure
            </h3>

            <div
              class="mt-2 rounded-lg p-3 font-mono text-xs"
              :class="
                isDarkMode
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-200 text-slate-700'
              "
            >
              <div class="pl-0">Document</div>
              <div class="pl-4">├── html</div>
              <div class="pl-8">├── head</div>
              <div class="pl-8">└── body</div>
              <div class="pl-12">├── h1</div>
              <div class="pl-12">├── p</div>
              <div class="pl-12">└── button</div>
            </div>

            <p
              class="mt-2 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Think of the DOM as a bridge between <strong>HTML</strong> and
              <strong>JavaScript</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 2: Selecting Elements -->
    <section id="wd-w5-t2" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">🎯</span>
          Selecting HTML Elements
        </h2>

        <p
          class="mt-2 text-sm transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          JavaScript must first select an element before changing it.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Select by ID -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Select by ID
            </h3>
            <code-slicer
              code='const heading = document.getElementById("title");'
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Returns one element.
            </p>
          </div>

          <!-- Select by Class -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Select by Class
            </h3>
            <code-slicer
              code='const info = document.getElementsByClassName("info");'
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Returns a collection of elements.
            </p>
          </div>

          <!-- Select by Tag Name -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Select by Tag Name
            </h3>
            <code-slicer
              code='const paragraphs = document.getElementsByTagName("p");'
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Returns all matching tags.
            </p>
          </div>

          <!-- querySelector() - Highlighted -->
          <div
            class="rounded-lg border-2 border-indigo-500/30 p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              querySelector() ⭐
            </h3>
            <code-slicer
              code='const heading = document.querySelector("#title");'
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Returns the <strong>first matching element</strong>.
            </p>

            <div
              class="mt-2 space-y-1 text-xs"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
            >
              <div
                class="rounded p-1"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <code>document.querySelector(".card");</code>
              </div>
              <div
                class="rounded p-1"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <code>document.querySelector("button");</code>
              </div>
            </div>
          </div>
        </div>

        <!-- querySelectorAll() -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
        >
          <h3
            class="font-semibold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            querySelectorAll()
          </h3>
          <code-slicer
            code='const cards = document.querySelectorAll(".card");'
            :is-dark="isDarkMode"
          />
          <p
            class="mt-1 text-xs"
            :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
          >
            Returns <strong>all matching elements</strong>.
          </p>
          <code-slicer
            class="mt-2"
            code="cards.forEach(card => {\n  console.log(card);\n});"
            :is-dark="isDarkMode"
          />
        </div>
      </div>
    </section>

    <!-- Topic 3: Changing Content -->
    <section id="wd-w5-t3" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">✏️</span>
          Changing HTML Content
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <!-- innerHTML -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              innerHTML
            </h3>
            <code-slicer
              code='heading.innerHTML = "<h2>Hello Students</h2>";'
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Allows HTML tags.
            </p>
          </div>

          <!-- textContent -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              textContent
            </h3>
            <code-slicer
              code='heading.textContent = "Welcome";'
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Safer than <code>innerHTML</code>.
            </p>
          </div>

          <!-- innerText -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              innerText
            </h3>
            <code-slicer
              code='heading.innerText = "Learning JavaScript";'
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Changes visible text only.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 4: Changing CSS -->
    <section id="wd-w5-t4" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">🎨</span>
          Changing CSS with JavaScript
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Inline Styles -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Inline Styles
            </h3>
            <code-slicer
              code="heading.style.color = 'blue';\nheading.style.fontSize = '40px';\nheading.style.backgroundColor = 'yellow';"
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              You can modify almost any CSS property.
            </p>
          </div>

          <!-- Toggle Classes - Highlighted -->
          <div
            class="rounded-lg border-2 border-indigo-500/30 p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Toggle Classes ⭐
            </h3>

            <div class="mt-2 space-y-2">
              <div
                class="rounded p-2"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <p
                  class="text-xs font-semibold"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  Add Class
                </p>
                <code class="text-xs">card.classList.add("active");</code>
              </div>

              <div
                class="rounded p-2"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <p
                  class="text-xs font-semibold"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  Remove Class
                </p>
                <code class="text-xs">card.classList.remove("active");</code>
              </div>

              <div
                class="rounded p-2"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <p
                  class="text-xs font-semibold"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  Toggle Class
                </p>
                <code class="text-xs">card.classList.toggle("active");</code>
              </div>
            </div>

            <p
              class="mt-2 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Very useful for: Dark mode, Mobile menu, Dropdowns, Accordions
            </p>
          </div>
        </div>

        <!-- Changing Attributes -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
        >
          <h3
            class="font-semibold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            Changing Attributes
          </h3>
          <code-slicer
            code="const image = document.getElementById('photo');\nimage.src = 'new.jpg';\nlink.href = 'https://google.com';"
            :is-dark="isDarkMode"
          />
        </div>
      </div>
    </section>

    <!-- Topic 5: Creating & Removing Elements -->
    <section id="wd-w5-t5" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">➕</span>
          Creating &amp; Removing Elements
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Creating Elements -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Creating New Elements
            </h3>
            <code-slicer
              code="const para = document.createElement('p');\npara.textContent = 'Hello Students!';\ndocument.body.appendChild(para);"
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Removing Elements -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Removing Elements
            </h3>
            <code-slicer
              code="const card = document.getElementById('card');\ncard.remove();"
              :is-dark="isDarkMode"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 6: Event Handling -->
    <section id="wd-w5-t6" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">🖱️</span>
          Event Handling
        </h2>

        <p
          class="mt-2 text-sm transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          An event is something that happens on a webpage.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- onclick Event -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              onclick Event
            </h3>

            <div class="mt-2 space-y-2">
              <div
                class="rounded p-2"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <p
                  class="text-xs font-semibold"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  HTML
                </p>
                <code class="text-xs"
                  >&lt;button onclick="showMessage()"&gt;Click Me&lt;/button&gt;</code
                >
              </div>

              <div
                class="rounded p-2"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <p
                  class="text-xs font-semibold"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  JavaScript
                </p>
                <code class="text-xs"
                  >function showMessage(){ alert("Hello!"); }</code
                >
              </div>
            </div>

            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Works, but not recommended for larger projects.
            </p>
          </div>

          <!-- Event Listeners - Highlighted -->
          <div
            class="rounded-lg border-2 border-indigo-500/30 p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Event Listeners ⭐
            </h3>

            <div class="mt-2 space-y-2">
              <div
                class="rounded p-2"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <p
                  class="text-xs font-semibold"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  HTML
                </p>
                <code class="text-xs"
                  >&lt;button id="btn"&gt;Click Me&lt;/button&gt;</code
                >
              </div>

              <div
                class="rounded p-2"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <p
                  class="text-xs font-semibold"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  JavaScript
                </p>
                <code-slicer
                  code="const button = document.getElementById('btn');\nbutton.addEventListener('click', function(){\n  alert('Button Clicked');\n});"
                  :is-dark="isDarkMode"
                />
              </div>
            </div>

            <p class="mt-1 text-xs text-green-400">✅ Preferred method.</p>
          </div>
        </div>

        <!-- Common Events -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
        >
          <h3
            class="font-semibold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            Common Events
          </h3>

          <div class="mt-2 grid grid-cols-2 gap-1 text-xs sm:grid-cols-4">
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>click</strong><br />Mouse click
            </div>
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>dblclick</strong><br />Double click
            </div>
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>mouseover</strong><br />Mouse enters
            </div>
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>mouseout</strong><br />Mouse leaves
            </div>
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>keydown</strong><br />Key pressed
            </div>
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>keyup</strong><br />Key released
            </div>
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>input</strong><br />Input changes
            </div>
            <div
              class="rounded p-1.5 text-center"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>submit</strong><br />Form submitted
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 7: Forms -->
    <section id="wd-w5-t7" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">📝</span>
          Forms &amp; Input Handling
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Reading Input Values -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Reading Input Values
            </h3>
            <code-slicer
              code="const input = document.getElementById('name');\nconsole.log(input.value);"
              :is-dark="isDarkMode"
            />

            <div
              class="mt-2 rounded p-2"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <code class="text-xs"
                >button.addEventListener("click", () => {<br />
                &nbsp;&nbsp;console.log(input.value);<br />
                });</code
              >
            </div>
          </div>

          <!-- Prevent Form Refresh -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Prevent Form Refresh
            </h3>
            <code-slicer
              code="form.addEventListener('submit', function(event){\n  event.preventDefault();\n});"
              :is-dark="isDarkMode"
            />
            <p
              class="mt-1 text-xs"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              Forms refresh the page by default.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 8: Local Storage -->
    <section id="wd-w5-t8" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">💾</span>
          Local Storage
        </h2>

        <p
          class="mt-2 text-sm transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          Local Storage stores data in the browser. Data remains even after
          refreshing the page.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Save Data -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Save Data
            </h3>
            <code-slicer
              code='localStorage.setItem("name", "Ankit");'
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Read Data -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Read Data
            </h3>
            <code-slicer
              code='const name = localStorage.getItem("name");'
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Remove Data -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Remove Data
            </h3>
            <code-slicer
              code='localStorage.removeItem("name");'
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Clear All -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Clear All
            </h3>
            <code-slicer code="localStorage.clear();" :is-dark="isDarkMode" />
          </div>
        </div>

        <!-- Why Use Local Storage? -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
        >
          <h3
            class="font-semibold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            Why Use Local Storage?
          </h3>

          <div class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="use in [
                'Dark Mode',
                'To-Do Lists',
                'Shopping Cart',
                'Saving Preferences',
                'Login Status (basic apps only)',
              ]"
              :key="use"
              class="rounded-full px-3 py-1 text-xs"
              :class="
                isDarkMode
                  ? 'bg-indigo-900/30 text-indigo-300'
                  : 'bg-indigo-100 text-indigo-700'
              "
            >
              {{ use }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 9: JSON -->
    <section id="wd-w5-t9" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">📄</span>
          JSON Basics
        </h2>

        <p
          class="mt-2 text-sm transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          JSON stands for <strong>JavaScript Object Notation</strong>. It is
          used to exchange data between applications.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- JSON Example -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              JSON Example
            </h3>
            <code-slicer
              code='{\n  "name": "Ankit",\n  "course": "Web Development",\n  "age": 20\n}'
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Convert Object to JSON -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Convert Object to JSON
            </h3>
            <code-slicer
              code="const student = {\n  name: 'Ankit',\n  age: 20\n};\nconst data = JSON.stringify(student);"
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Convert JSON Back to Object -->
          <div
            class="rounded-lg p-4 sm:col-span-2"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Convert JSON Back to Object
            </h3>
            <code-slicer
              code="const obj = JSON.parse(data);"
              :is-dark="isDarkMode"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 10: Fetch API -->
    <section id="wd-w5-t10" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">📡</span>
          Fetch API
        </h2>

        <p
          class="mt-2 text-sm transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          Fetch API gets data from a server.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Basic Fetch -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Basic Fetch
            </h3>
            <code-slicer
              code="fetch('https://jsonplaceholder.typicode.com/posts')\n.then(response => response.json())\n.then(data => {\n  console.log(data);\n});"
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Understanding the Steps -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Understanding the Steps
            </h3>

            <div
              class="mt-2 space-y-1 text-xs"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
            >
              <div
                class="rounded p-1.5"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <strong>Step 1:</strong> Send request
                <code>fetch(url)</code>
              </div>
              <div
                class="rounded p-1.5"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <strong>Step 2:</strong> Receive response
              </div>
              <div
                class="rounded p-1.5"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <strong>Step 3:</strong> Convert to JSON
                <code>response.json()</code>
              </div>
              <div
                class="rounded p-1.5"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
              >
                <strong>Step 4:</strong> Display data
              </div>
            </div>
          </div>

          <!-- Display API Data -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Display API Data
            </h3>
            <code-slicer
              code="fetch('https://jsonplaceholder.typicode.com/users')\n.then(response => response.json())\n.then(users => {\n  users.forEach(user => {\n    console.log(user.name);\n  });\n});"
              :is-dark="isDarkMode"
            />
          </div>

          <!-- Error Handling -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Error Handling
            </h3>
            <code-slicer
              code="fetch(url)\n.then(response => response.json())\n.then(data => {\n  console.log(data);\n})\n.catch(error => {\n  console.log(error);\n});"
              :is-dark="isDarkMode"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 11: Async Await -->
    <section id="wd-w5-t11" class="scroll-mt-4">
      <div
        class="rounded-xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">⚡</span>
          Async &amp; Await
        </h2>

        <p
          class="mt-2 text-sm transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          Modern way to write asynchronous code. Cleaner and easier to read.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Async/Await Example -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Async/Await Example
            </h3>
            <code-slicer
              code="async function getUsers() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/users');\n  const data = await response.json();\n  console.log(data);\n}\ngetUsers();"
              :is-dark="isDarkMode"
            />
            <p class="mt-1 text-xs text-green-400">
              ✅ Cleaner and easier to read.
            </p>
          </div>

          <!-- Async with Error Handling -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Async with Error Handling
            </h3>
            <code-slicer
              code="async function getUsers() {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.log(error);\n  }\n}"
              :is-dark="isDarkMode"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Topic 12: Mini Project -->
    <section id="wd-w5-t12" class="scroll-mt-4">
      <div
        class="rounded-xl border-2 border-purple-500/30 p-4 shadow-lg transition-colors duration-300 sm:p-6"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">🚀</span>
          Mini Project: Random User Viewer
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Features -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Features
            </h3>
            <ul
              class="mt-2 space-y-1 text-sm"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
            >
              <li class="flex items-center gap-2">✅ Button to fetch random user</li>
              <li class="flex items-center gap-2">✅ Display user photo</li>
              <li class="flex items-center gap-2">✅ Show user name</li>
              <li class="flex items-center gap-2">✅ Show user email</li>
            </ul>
          </div>

          <!-- Skills Used -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Skills Used
            </h3>
            <ul
              class="mt-2 space-y-1 text-sm"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
            >
              <li class="flex items-center gap-2">✅ DOM Manipulation</li>
              <li class="flex items-center gap-2">✅ API Integration</li>
              <li class="flex items-center gap-2">✅ Event Handling</li>
              <li class="flex items-center gap-2">✅ Fetch API</li>
            </ul>
          </div>
        </div>

        <!-- Example Code -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
        >
          <h3
            class="font-semibold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            Example Code
          </h3>
          <code-slicer
            code="async function loadUser() {\n  const response = await fetch('https://randomuser.me/api/');\n  const data = await response.json();\n  const user = data.results[0];\n  \n  document.getElementById('name').textContent = `${user.name.first} ${user.name.last}`;\n  document.getElementById('email').textContent = user.email;\n  document.getElementById('photo').src = user.picture.medium;\n}"
            :is-dark="isDarkMode"
          />
        </div>
      </div>
    </section>

    <!-- Topic 13: Best Practices & Summary -->
    <section id="wd-w5-t13" class="scroll-mt-4">
      <div
        class="rounded-xl border-2 border-indigo-500/30 p-4 shadow-lg transition-colors duration-300 sm:p-6"
        :class="isDarkMode ? 'bg-slate-700' : 'bg-white'"
      >
        <h2
          class="flex items-center gap-2 text-xl font-bold transition-colors duration-300 sm:text-2xl"
          :class="isDarkMode ? 'text-white' : 'text-slate-800'"
        >
          <span class="text-2xl">✅</span>
          Best Practices &amp; Summary
        </h2>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <!-- Best Practices -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              Best Practices
            </h3>
            <ul
              class="mt-2 space-y-1 text-sm"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
            >
              <li class="flex items-center gap-2">
                ✅ Use <code>querySelector()</code> or
                <code>querySelectorAll()</code>
              </li>
              <li class="flex items-center gap-2">
                ✅ Prefer <code>addEventListener()</code> over inline events
              </li>
              <li class="flex items-center gap-2">
                ✅ Toggle CSS classes instead of inline styles
              </li>
              <li class="flex items-center gap-2">
                ✅ Validate form input before processing
              </li>
              <li class="flex items-center gap-2">
                ✅ Always handle API errors
              </li>
              <li class="flex items-center gap-2">
                ✅ Store only non-sensitive data in Local Storage
              </li>
              <li class="flex items-center gap-2">
                ✅ Keep JavaScript organized with functions
              </li>
            </ul>
          </div>

          <!-- Common Mistakes -->
          <div
            class="rounded-lg p-4"
            :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
          >
            <h3
              class="font-semibold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-slate-800'"
            >
              ❌ Common Mistakes
            </h3>
            <ul
              class="mt-2 space-y-1 text-sm"
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
            >
              <li class="flex items-center gap-2">
                ❌ Selecting the wrong element
              </li>
              <li class="flex items-center gap-2">
                ❌ Forgetting to wait for page load
              </li>
              <li class="flex items-center gap-2">
                ❌ Using <code>innerHTML</code> when
                <code>textContent</code> is enough
              </li>
              <li class="flex items-center gap-2">
                ❌ Forgetting <code>event.preventDefault()</code>
              </li>
              <li class="flex items-center gap-2">
                ❌ Not checking if API request failed
              </li>
              <li class="flex items-center gap-2">
                ❌ Storing sensitive data in Local Storage
              </li>
            </ul>
          </div>
        </div>

        <!-- Real-World Examples -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-slate-50'"
        >
          <h3
            class="font-semibold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            Real-World Examples
          </h3>

          <div class="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
            <div
              class="rounded p-2"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>Like button</strong><br />Event Listener
            </div>
            <div
              class="rounded p-2"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>Dark Mode</strong><br />Toggle Class + Local Storage
            </div>
            <div
              class="rounded p-2"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>Weather App</strong><br />Fetch API
            </div>
            <div
              class="rounded p-2"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>Login Form</strong><br />DOM + Form Handling
            </div>
            <div
              class="rounded p-2"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>Shopping Cart</strong><br />Local Storage
            </div>
            <div
              class="rounded p-2"
              :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'"
            >
              <strong>Infinite Scrolling</strong><br />DOM + Events + API
            </div>
          </div>
        </div>

        <!-- Learning Outcomes -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-slate-600' : 'bg-indigo-50'"
        >
          <p
            class="text-sm font-semibold transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-800'"
          >
            By the end of Week 5, you should be able to:
          </p>

          <ul
            class="mt-3 space-y-2 text-sm"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
          >
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span
                >Understand what the DOM is and how JavaScript interacts with
                HTML.</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Select and modify HTML elements.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Change styles and attributes dynamically.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Create, remove, and update webpage content.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span
                >Handle user interactions using events and event
                listeners.</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Read and validate form inputs.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Store and retrieve data using Local Storage.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span>Work with JSON data.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span
                >Fetch information from external APIs using the Fetch
                API.</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span
                >Use <code>async</code> and <code>await</code> to write cleaner
                asynchronous code.</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400">✅</span>
              <span
                >Build interactive, dynamic web applications using
                JavaScript.</span
              >
            </li>
          </ul>
        </div>

        <!-- Remember -->
        <div
          class="mt-4 rounded-lg p-4"
          :class="isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'"
        >
          <p
            class="text-sm"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
          >
            💡 <strong>Remember:</strong> HTML provides the structure, CSS
            controls the appearance, and JavaScript brings your website to life.
            Mastering the DOM and APIs is the first major step toward building
            real-world web applications that users can interact with.
          </p>
        </div>

        <!-- Resource Links -->
        <div class="mt-4 flex flex-wrap gap-3">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
            target="_blank"
            class="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200"
            :class="
              isDarkMode
                ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            "
          >
            📚 DOM Documentation
          </a>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
            target="_blank"
            class="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200"
            :class="
              isDarkMode
                ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            "
          >
            📚 Fetch API Docs
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
    { id: 'wd-w5-t1', title: 'What is the DOM?' },
    { id: 'wd-w5-t2', title: 'Selecting HTML Elements' },
    { id: 'wd-w5-t3', title: 'Changing HTML Content' },
    { id: 'wd-w5-t4', title: 'Changing CSS with JavaScript' },
    { id: 'wd-w5-t5', title: 'Creating & Removing Elements' },
    { id: 'wd-w5-t6', title: 'Event Handling' },
    { id: 'wd-w5-t7', title: 'Forms & Input Handling' },
    { id: 'wd-w5-t8', title: 'Local Storage' },
    { id: 'wd-w5-t9', title: 'JSON Basics' },
    { id: 'wd-w5-t10', title: 'Fetch API' },
    { id: 'wd-w5-t11', title: 'Async & Await' },
    { id: 'wd-w5-t12', title: 'Mini Project: Random User Viewer' },
    { id: 'wd-w5-t13', title: 'Best Practices & Summary' },
  ];
  emit('topic-updated', topics);
});
</script>

<style scoped>


</style>