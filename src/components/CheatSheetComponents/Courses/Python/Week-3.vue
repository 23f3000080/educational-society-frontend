<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>🔄 Week 3 – Loops & Iteration</h1>
    </header>

    <!-- Introduction to Loops -->
    <section id="py-w3-t2" class="section">
      <h2>Introduction to Loops</h2>
      <div class="content-card">
        <p>A <strong>loop</strong> is used to execute a block of code repeatedly until a condition becomes false or all items have been processed.</p>
        
        <div class="loop-comparison">
          <div class="comparison-box without-loop">
            <p class="comparison-title">❌ Without Loop</p>
            <pre><code>print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")</code></pre>
          </div>
          
          <div class="comparison-box with-loop">
            <p class="comparison-title">✅ Using Loop</p>
            <pre><code>for i in range(5):
    print("Hello")</code></pre>
            <div class="output-box">
              <p class="output-label">Output:</p>
              <pre><code>Hello
Hello
Hello
Hello
Hello</code></pre>
            </div>
          </div>
        </div>

        <h3>Types of Loops</h3>
        <div class="loop-types">
          <span class="loop-type for-loop">for Loop</span>
          <span class="loop-type while-loop">while Loop</span>
        </div>
      </div>
    </section>

    <!-- for Loop -->
    <section id="py-w3-t3" class="section">
      <h2>for Loop</h2>
      <div class="content-card">
        <p>A <strong>for loop</strong> is used to iterate over a sequence (numbers, strings, lists, etc.).</p>
        
        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>for variable in sequence:
    statements</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>for i in range(5):
    print(i)</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>0
1
2
3
4</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- range() Function -->
    <section id="py-w3-t4" class="section">
      <h2>range() Function</h2>
      <div class="content-card">
        <p><code>range()</code> generates a sequence of numbers.</p>

        <div class="range-examples">
          <div class="range-box">
            <p class="range-title">range(stop)</p>
            <pre><code>for i in range(5):
    print(i)</code></pre>
            <p class="range-output">Output: 0 1 2 3 4</p>
          </div>

          <div class="range-box">
            <p class="range-title">range(start, stop)</p>
            <pre><code>for i in range(2, 6):
    print(i)</code></pre>
            <p class="range-output">Output: 2 3 4 5</p>
          </div>

          <div class="range-box">
            <p class="range-title">range(start, stop, step)</p>
            <pre><code>for i in range(2, 11, 2):
    print(i)</code></pre>
            <p class="range-output">Output: 2 4 6 8 10</p>
          </div>
        </div>

        <h3>Counting Backwards</h3>
        <pre><code>for i in range(10, 0, -1):
    print(i)</code></pre>
        <div class="output-box">
          <p class="output-label">Output:</p>
          <pre><code>10 9 8 7 6 5 4 3 2 1</code></pre>
        </div>
      </div>
    </section>

    <!-- for Loop Examples -->
    <section id="py-w3-t5" class="section">
      <h2>for Loop Examples</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item">
            <h4>Print Message Multiple Times</h4>
            <pre><code>for i in range(5):
    print("Welcome to Python")</code></pre>
          </div>

          <div class="example-item">
            <h4>Sum of Numbers</h4>
            <pre><code>total = 0
for i in range(1, 6):
    total += i
print(total)  # 15</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Multiplication Table</h4>
            <pre><code>num = int(input("Enter Number: "))
for i in range(1, 11):
    print(num, "x", i, "=", num * i)</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Iterating Over a String</h4>
            <pre><code>name = "Python"
for ch in name:
    print(ch)</code></pre>
            <p class="example-output">Output: P y t h o n</p>
          </div>
        </div>
      </div>
    </section>

    <!-- while Loop -->
    <section id="py-w3-t6" class="section">
      <h2>while Loop</h2>
      <div class="content-card">
        <p>A <strong>while loop</strong> executes as long as the condition is <code>True</code>.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>while condition:
    statements</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>count = 1
while count <= 5:
    print(count)
    count += 1</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>1 2 3 4 5</code></pre>
          </div>
        </div>

        <div class="example-box">
          <p class="example-title">User-Controlled Loop</p>
          <pre><code>choice = "yes"
while choice == "yes":
    print("Program Running")
    choice = input("Continue? (yes/no): ")</code></pre>
        </div>

        <div class="warning-box">
          <p class="warning-title">⚠️ Infinite Loop</p>
          <pre><code>while True:
    print("Hello")  # Press Ctrl + C to stop</code></pre>
        </div>
      </div>
    </section>

    <!-- Break and Continue -->
    <section id="py-w3-t7" class="section">
      <h2>Break and Continue Statements</h2>
      <div class="content-card">
        <div class="break-continue-grid">
          <div class="break-box">
            <h4>break Statement</h4>
            <p><code>break</code> immediately exits the loop.</p>
            <pre><code>for i in range(1, 11):
    if i == 6:
        break
    print(i)</code></pre>
            <p class="output-inline">Output: 1 2 3 4 5</p>
          </div>

          <div class="continue-box">
            <h4>continue Statement</h4>
            <p><code>continue</code> skips the current iteration.</p>
            <pre><code>for i in range(1, 6):
    if i == 3:
        continue
    print(i)</code></pre>
            <p class="output-inline">Output: 1 2 4 5</p>
          </div>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>break</th>
                <th>continue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stops the loop completely</td>
                <td>Skips current iteration</td>
              </tr>
              <tr>
                <td>Exits loop</td>
                <td>Continues next iteration</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="example-box">
          <h4>pass Statement</h4>
          <p>Used as a placeholder when no code is written yet.</p>
          <pre><code>for i in range(5):
    pass</code></pre>
        </div>
      </div>
    </section>

    <!-- Nested Loops -->
    <section id="py-w3-t8" class="section">
      <h2>Nested Loops</h2>
      <div class="content-card">
        <p>A loop inside another loop.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>for i in range():
    for j in range():
        statements</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>for i in range(3):
    for j in range(3):
        print(i, j)</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>0 0  0 1  0 2
1 0  1 1  1 2
2 0  2 1  2 2</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Pattern Printing -->
    <section id="py-w3-t9" class="section">
      <h2>Pattern Printing</h2>
      <div class="content-card">
        <div class="pattern-grid">
          <div class="pattern-box">
            <h4>Square Pattern</h4>
            <pre><code>for i in range(5):
    for j in range(5):
        print("*", end=" ")
    print()</code></pre>
            <div class="pattern-output">
              <pre>* * * * *
* * * * *
* * * * *
* * * * *
* * * * *</pre>
            </div>
          </div>

          <div class="pattern-box">
            <h4>Right Triangle</h4>
            <pre><code>for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()</code></pre>
            <div class="pattern-output">
              <pre>*
**
***
****
*****</pre>
            </div>
          </div>

          <div class="pattern-box">
            <h4>Inverted Triangle</h4>
            <pre><code>for i in range(5, 0, -1):
    for j in range(i):
        print("*", end="")
    print()</code></pre>
            <div class="pattern-output">
              <pre>*****
****
***
**
*</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Practical Programs -->
    <section id="py-w3-t10" class="section">
      <h2>Practical Programs</h2>
      <div class="content-card">
        <div class="programs-grid">
          <div class="program-item">
            <h4>Even Numbers</h4>
            <pre><code>for i in range(2, 21, 2):
    print(i)</code></pre>
          </div>

          <div class="program-item">
            <h4>Odd Numbers</h4>
            <pre><code>for i in range(1, 20, 2):
    print(i)</code></pre>
          </div>

          <div class="program-item full-width">
            <h4>Factorial Program</h4>
            <pre><code>num = int(input("Enter Number: "))
fact = 1
for i in range(1, num + 1):
    fact *= i
print("Factorial =", fact)</code></pre>
          </div>

          <div class="program-item">
            <h4>Reverse Counting</h4>
            <pre><code>for i in range(10, 0, -1):
    print(i)</code></pre>
          </div>

          <div class="program-item">
            <h4>Sum of Even Numbers</h4>
            <pre><code>total = 0
for i in range(2, 11, 2):
    total += i
print(total)  # 30</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Programs -->
    <section id="py-w3-t11" class="section">
      <h2>Interactive Programs</h2>
      <div class="content-card">
        <div class="interactive-grid">
          <div class="interactive-item">
            <h4>Guessing Game</h4>
            <pre><code>secret = 7
while True:
    guess = int(input("Guess Number: "))
    if guess == secret:
        print("Correct!")
        break
    else:
        print("Try Again")</code></pre>
          </div>

          <div class="interactive-item">
            <h4>Menu Program</h4>
            <pre><code>while True:
    print("1. Add")
    print("2. Exit")
    choice = int(input("Enter Choice: "))
    if choice == 2:
        break</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Mistakes -->
    <section id="py-w3-t12" class="section">
      <h2>Common Mistakes</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Forgetting to Update Variable</h4>
            <p>This causes an <strong>infinite loop</strong>.</p>
            <pre><code>count = 1
while count <= 5:
    print(count)
    # count += 1  ← Missing!</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>count = 1
while count <= 5:
    print(count)
    count += 1</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Wrong Indentation</h4>
            <pre><code>for i in range(5):
print(i)  # Indentation Error!</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>for i in range(5):
    print(i)</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Incorrect range()</h4>
            <pre><code>range(10, 1)  # No output!</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>range(10, 0, -1)  # Counts backward</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="py-w3-t13" class="section">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Choose <code>for</code> loops when the number of iterations is known.</li>
          <li>📌 Use <code>while</code> loops when the stopping condition is unknown.</li>
          <li>📌 Avoid infinite loops unless intentionally required.</li>
          <li>📌 Use <code>break</code> to exit early when necessary.</li>
          <li>📌 Use <code>continue</code> to skip unwanted iterations.</li>
          <li>📌 Keep nested loops simple to improve readability.</li>
          <li>📌 Use meaningful variable names such as <code>count</code>, <code>row</code>, <code>column</code>, or <code>index</code>.</li>
        </ul>
      </div>
    </section>

    <!-- Mini Programs -->
    <section id="py-w3-t14" class="section">
      <h2>Mini Programs</h2>
      <div class="content-card">
        <div class="mini-programs-grid">
          <div class="mini-program">
            <h4>Program 1: Print Numbers 1 to 10</h4>
            <pre><code>for i in range(1, 11):
    print(i)</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 2: Sum of First 10 Numbers</h4>
            <pre><code>total = 0
for i in range(1, 11):
    total += i
print(total)</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 3: Countdown</h4>
            <pre><code>count = 10
while count >= 1:
    print(count)
    count -= 1
print("Blast Off!")</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 4: Multiplication Table</h4>
            <pre><code>num = int(input("Enter Number: "))
for i in range(1, 11):
    print(f"{num} x {i} = {num * i}")</code></pre>
          </div>

          <div class="mini-program full-width">
            <h4>Program 5: Star Pattern</h4>
            <pre><code>rows = 5
for i in range(1, rows + 1):
    print("*" * i)</code></pre>
            <div class="pattern-output small">
              <pre>*
**
***
****
*****</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Revision -->
    <section id="py-w3-t15" class="section revision-section">
      <h2>🚀 Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Loops execute a block of code repeatedly.</li>
          <li>✔ Python supports two loops: <code>for</code> and <code>while</code>.</li>
          <li>✔ <code>range()</code> generates sequences of numbers.</li>
          <li>✔ <code>range(stop)</code> starts from <code>0</code>.</li>
          <li>✔ <code>range(start, stop)</code> starts from a specified value.</li>
          <li>✔ <code>range(start, stop, step)</code> controls the increment or decrement.</li>
          <li>✔ <code>break</code> exits the loop immediately.</li>
          <li>✔ <code>continue</code> skips the current iteration.</li>
          <li>✔ Nested loops are loops inside other loops.</li>
          <li>✔ Always update the loop variable in a <code>while</code> loop to avoid infinite loops.</li>
          <li>✔ Nested loops are commonly used for pattern printing, tables, and matrix-like operations.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 3 | Loops & Iteration</p>
    </footer>
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
    { id: 'py-w3-t2', title: 'Introduction to Loops' },
    { id: 'py-w3-t3', title: 'for Loop' },
    { id: 'py-w3-t4', title: 'range() Function' },
    { id: 'py-w3-t5', title: 'for Loop Examples' },
    { id: 'py-w3-t6', title: 'while Loop' },
    { id: 'py-w3-t7', title: 'Break and Continue' },
    { id: 'py-w3-t8', title: 'Nested Loops' },
    { id: 'py-w3-t9', title: 'Pattern Printing' },
    { id: 'py-w3-t10', title: 'Practical Programs' },
    { id: 'py-w3-t11', title: 'Interactive Programs' },
    { id: 'py-w3-t12', title: 'Common Mistakes' },
    { id: 'py-w3-t13', title: 'Best Practices' },
    { id: 'py-w3-t14', title: 'Mini Programs' },
    { id: 'py-w3-t15', title: 'Quick Revision' },
  ];
  emit('topic-updated', topics);
});
</script>

<style scoped>
.cheatsheet-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
  color: #2d3748;
}

.cheatsheet-header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #306998 0%, #4584b6 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 30px;
}

.cheatsheet-header h1 {
  font-size: 2.5em;
  margin: 0;
  word-break: break-word;
}

.subtitle {
  font-size: 1.2em;
  opacity: 0.9;
  margin-top: 10px;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #306998;
  border-bottom: 3px solid #4584b6;
  padding-bottom: 10px;
  font-size: 1.8em;
  word-break: break-word;
}

.content-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  margin-top: 15px;
  overflow-x: hidden;
}

.content-card h3 {
  color: #2d3748;
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 1.3em;
  word-break: break-word;
}

.content-card h3:first-of-type {
  margin-top: 0;
}

.content-card p {
  line-height: 1.6;
  margin: 10px 0;
  word-break: break-word;
}

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
  margin: 6px 0;
  word-break: break-word;
}

pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.95em;
  margin: 10px 0;
  word-wrap: break-word;
  max-width: 100%;
}

pre code {
  background: none;
  color: inherit;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.cheatsheet-footer {
  text-align: center;
  padding: 30px 20px;
  color: #718096;
  border-top: 2px solid #e2e8f0;
  margin-top: 40px;
  font-size: 1.1em;
}

/* Loop Comparison */
.loop-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 15px 0;
}

.comparison-box {
  padding: 15px;
  border-radius: 8px;
}

.comparison-box.without-loop {
  background: #fff5f5;
  border-left: 4px solid #e53e3e;
}

.comparison-box.with-loop {
  background: #f0fff4;
  border-left: 4px solid #38a169;
}

.comparison-title {
  font-weight: bold;
  margin-bottom: 10px;
}

/* Loop Types */
.loop-types {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
}

.loop-type {
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
}

.loop-type.for-loop {
  background: #bee3f8;
  color: #2b6cb0;
}

.loop-type.while-loop {
  background: #e9d8fd;
  color: #6b46c1;
}

/* Syntax Box */
.syntax-box {
  background: #f7fafc;
  border-left: 4px solid #4299e1;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
}

.syntax-title {
  font-weight: 600;
  margin-bottom: 8px;
}

/* Example Box */
.example-box {
  background: #f7fafc;
  border-left: 4px solid #306998;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}

.example-title {
  font-weight: 600;
  margin-bottom: 8px;
}

/* Output Box */
.output-box {
  background: #edf2f7;
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
}

.output-label {
  font-weight: 600;
  font-size: 0.9em;
  margin-bottom: 5px;
}

/* Warning Box */
.warning-box {
  background: #fffff0;
  border-left: 4px solid #ecc94b;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}

.warning-title {
  font-weight: 600;
  color: #d69e2e;
}

/* Range Examples */
.range-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.range-box {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.range-title {
  font-weight: 600;
  color: #2b6cb0;
  margin-bottom: 8px;
}

.range-output {
  font-size: 0.9em;
  color: #4a5568;
  margin-top: 8px;
}

/* Examples Grid */
.examples-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.example-item {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.example-item.full-width {
  grid-column: 1 / -1;
}

.example-item h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2d3748;
  word-break: break-word;
}

.example-output {
  font-size: 0.9em;
  color: #4a5568;
  margin-top: 8px;
}

/* Break Continue Grid */
.break-continue-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 15px 0;
}

.break-box,
.continue-box {
  padding: 15px;
  border-radius: 8px;
}

.break-box {
  background: #ebf8ff;
  border: 1px solid #bee3f8;
}

.continue-box {
  background: #f0fff4;
  border: 1px solid #c6f6d5;
}

.break-box h4,
.continue-box h4 {
  margin-top: 0;
  color: #2d3748;
}

.output-inline {
  font-weight: 600;
  margin-top: 8px;
  padding: 6px 12px;
  background: white;
  border-radius: 4px;
  display: inline-block;
}

/* Comparison Table */
.comparison-table-wrapper {
  overflow-x: auto;
  margin: 15px 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 200px;
}

.comparison-table th,
.comparison-table td {
  padding: 10px 15px;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.comparison-table th {
  background: #edf2f7;
  font-weight: 600;
}

.comparison-table tr:nth-child(even) {
  background: #f7fafc;
}

/* Pattern Grid */
.pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 15px 0;
}

.pattern-box {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.pattern-box h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2d3748;
}

.pattern-output {
  background: #2d3748;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  overflow-x: auto;
}

.pattern-output pre {
  background: none;
  padding: 0;
  margin: 0;
  color: #e2e8f0;
}

.pattern-output.small pre {
  font-size: 0.85em;
}

/* Programs Grid */
.programs-grid,
.interactive-grid,
.mini-programs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.program-item,
.interactive-item,
.mini-program {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.program-item.full-width,
.mini-program.full-width {
  grid-column: 1 / -1;
}

.program-item h4,
.interactive-item h4,
.mini-program h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2d3748;
}

/* Mistakes Grid */
.mistakes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.mistake-box {
  background: #fff5f5;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #feb2b2;
}

.mistake-box.full-width {
  grid-column: 1 / -1;
}

.mistake-box h4 {
  margin-top: 0;
  color: #e53e3e;
}

.correction {
  background: #f0fff4;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
  border-left: 3px solid #38a169;
}

.correction-title {
  font-weight: 600;
  color: #38a169;
}

/* Best Practices List */
.best-practices-list {
  list-style: none;
  padding: 0;
}

.best-practices-list li {
  padding: 10px 15px;
  margin: 8px 0;
  background: #f0fff4;
  border-radius: 6px;
  border-left: 3px solid #38a169;
  word-break: break-word;
}

/* Revision List */
.revision-list {
  list-style: none;
  padding: 0;
}

.revision-list li {
  padding: 8px 0;
  border-bottom: 1px solid #edf2f7;
  font-size: 1.05em;
  word-break: break-word;
}

.revision-list li:last-child {
  border-bottom: none;
}

.revision-list code {
  background: #edf2f7;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

/* Responsive */
@media (max-width: 1024px) {
  .cheatsheet-header h1 {
    font-size: 2.2em;
  }
}

@media (max-width: 768px) {
  .cheatsheet-container {
    padding: 12px;
  }

  .cheatsheet-header {
    padding: 25px 15px;
  }

  .cheatsheet-header h1 {
    font-size: 1.6em;
  }

  .subtitle {
    font-size: 1em;
  }

  .section h2 {
    font-size: 1.4em;
  }

  .content-card {
    padding: 15px;
  }

  .content-card h3 {
    font-size: 1.1em;
  }

  .loop-comparison {
    grid-template-columns: 1fr;
  }

  .examples-grid,
  .programs-grid,
  .interactive-grid,
  .mini-programs-grid,
  .mistakes-grid {
    grid-template-columns: 1fr;
  }

  .break-continue-grid {
    grid-template-columns: 1fr;
  }

  .range-examples {
    grid-template-columns: 1fr;
  }

  .pattern-grid {
    grid-template-columns: 1fr;
  }

  .example-item.full-width,
  .program-item.full-width,
  .mini-program.full-width,
  .mistake-box.full-width {
    grid-column: 1;
  }

  pre {
    padding: 12px;
    font-size: 0.85em;
  }

  .cheatsheet-footer {
    font-size: 0.95em;
    padding: 20px 15px;
  }

  .comparison-table {
    font-size: 0.9em;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 8px 10px;
  }
}

@media (max-width: 480px) {
  .cheatsheet-header h1 {
    font-size: 1.3em;
  }

  .subtitle {
    font-size: 0.9em;
  }

  .section h2 {
    font-size: 1.2em;
  }

  .content-card {
    padding: 12px;
  }

  pre {
    padding: 10px;
    font-size: 0.8em;
  }

  .loop-type {
    padding: 6px 14px;
    font-size: 0.9em;
  }

  .range-box {
    padding: 12px;
  }

  .pattern-box {
    padding: 12px;
  }

  .program-item,
  .interactive-item,
  .mini-program {
    padding: 12px;
  }

  .mistake-box {
    padding: 12px;
  }

  .revision-list li {
    font-size: 0.95em;
  }
}
</style>