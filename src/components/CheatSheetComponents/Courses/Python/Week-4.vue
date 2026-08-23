<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📦 Week 4 – Functions & Code Reusability</h1>
    </header>

    <!-- What is a Function -->
    <section id="py-w4-t2" class="section">
      <h2>What is a Function?</h2>
      <div class="content-card">
        <p>A <strong>function</strong> is a reusable block of code that performs a specific task.</p>
        <p>Instead of writing the same code multiple times, you can write it once inside a function and call it whenever needed.</p>

        <h3>Why Use Functions?</h3>
        <ul class="feature-list">
          <li>♻️ Reuse code</li>
          <li>📉 Reduce repetition</li>
          <li>📖 Improve readability</li>
          <li>🐛 Make debugging easier</li>
          <li>📁 Organize large programs</li>
          <li>🔧 Simplify maintenance</li>
        </ul>
      </div>
    </section>

    <!-- Function Syntax -->
    <section id="py-w4-t3" class="section">
      <h2>Function Syntax</h2>
      <div class="content-card">
        <pre><code>def function_name():
    # Function Body
    print("Hello Python")</code></pre>

        <h3>Calling the Function</h3>
        <pre><code>function_name()</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Hello Python</p>
        </div>
      </div>
    </section>

    <!-- First Function -->
    <section id="py-w4-t4" class="section">
      <h2>Defining Your First Function</h2>
      <div class="content-card">
        <pre><code>def greet():
    print("Welcome to Python Programming!")

greet()</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Welcome to Python Programming!</p>
        </div>
      </div>
    </section>

    <!-- Calling Multiple Times -->
    <section id="py-w4-t5" class="section">
      <h2>Calling a Function Multiple Times</h2>
      <div class="content-card">
        <pre><code>def hello():
    print("Hello!")

hello()
hello()
hello()</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>Hello!
Hello!
Hello!</pre>
        </div>
      </div>
    </section>

    <!-- Parameters -->
    <section id="py-w4-t6" class="section">
      <h2>Function with Parameters</h2>
      <div class="content-card">
        <p>Parameters are variables that receive values when a function is called.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>def function_name(parameter):
    statements</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>def greet(name):
    print("Hello", name)

greet("Alex")</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>Hello Alex</code></pre>
          </div>
        </div>

        <h3>Multiple Parameters</h3>
        <pre><code>def student(name, age):
    print("Name:", name)
    print("Age:", age)

student("Rahul", 20)</code></pre>

        <h3>Arguments</h3>
        <p>Arguments are the actual values passed to a function.</p>
        <pre><code>def add(a, b):
    print(a + b)

add(10, 20)</code></pre>
        <p>Here:</p>
        <ul>
          <li>Parameters → <code>a</code>, <code>b</code></li>
          <li>Arguments → <code>10</code>, <code>20</code></li>
        </ul>
      </div>
    </section>

    <!-- Positional and Keyword Arguments -->
    <section id="py-w4-t7" class="section">
      <h2>Positional and Keyword Arguments</h2>
      <div class="content-card">
        <h3>Positional Arguments</h3>
        <p>Arguments are matched according to their position.</p>
        <pre><code>def info(name, city):
    print(name)
    print(city)

info("Alex", "New York")</code></pre>

        <h3>Keyword Arguments</h3>
        <p>Arguments are passed using parameter names.</p>
        <pre><code>def info(name, city):
    print(name)
    print(city)

info(city="Delhi", name="Aman")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>Aman
Delhi</pre>
        </div>

        <h3>Default Parameters</h3>
        <p>A default value is used if no argument is provided.</p>
        <pre><code>def greet(name="Guest"):
    print("Welcome", name)

greet()
greet("Alex")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>Welcome Guest
Welcome Alex</pre>
        </div>
      </div>
    </section>

    <!-- Return Statement -->
    <section id="py-w4-t8" class="section">
      <h2>Return Statement</h2>
      <div class="content-card">
        <p>The <code>return</code> statement sends a value back to the caller.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>def function():
    return value</code></pre>
        </div>

        <h3>Function Returning a Value</h3>
        <pre><code>def square(num):
    return num * num

result = square(5)
print(result)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 25</p>
        </div>

        <h3>Returning Multiple Values</h3>
        <pre><code>def calculation(a, b):
    return a + b, a - b

sum_result, diff = calculation(10, 5)
print(sum_result)
print(diff)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>15
5</pre>
        </div>

        <h3>Function Without Return</h3>
        <pre><code>def message():
    print("Python is Awesome!")

message()</code></pre>
        <p>Functions without <code>return</code> automatically return <code>None</code>.</p>
      </div>
    </section>

    <!-- print vs return -->
    <section id="py-w4-t9" class="section">
      <h2>Difference Between print() and return</h2>
      <div class="content-card">
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>print()</th>
                <th>return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Displays output</td>
                <td>Sends value back</td>
              </tr>
              <tr>
                <td>Cannot reuse output</td>
                <td>Can store the returned value</td>
              </tr>
              <tr>
                <td>Used for displaying</td>
                <td>Used for calculations</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>def add(a, b):
    return a + b

result = add(5, 7)
print(result * 2)</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>24</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Variable Scope -->
    <section id="py-w4-t10" class="section">
      <h2>Variable Scope</h2>
      <div class="content-card">
        <p>Variable scope determines where a variable can be accessed.</p>
        <p>There are two main types:</p>
        <ul>
          <li>Local Variables</li>
          <li>Global Variables</li>
        </ul>

        <h3>Local Variables</h3>
        <p>A local variable exists only inside a function.</p>
        <pre><code>def test():
    x = 10
    print(x)

test()</code></pre>
        <p>Trying to use <code>x</code> outside the function will produce a <code>NameError</code>.</p>

        <h3>Global Variables</h3>
        <p>A global variable is defined outside all functions.</p>
        <pre><code>name = "Python"

def show():
    print(name)

show()</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Python</p>
        </div>

        <h3>Using global Keyword</h3>
        <pre><code>count = 0

def increase():
    global count
    count += 1

increase()
print(count)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 1</p>
        </div>
      </div>
    </section>

    <!-- Built-in Functions -->
    <section id="py-w4-t11" class="section">
      <h2>Built-in Functions</h2>
      <div class="content-card">
        <p>Python provides many built-in functions.</p>
        
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>print()</td><td>Display output</td></tr>
              <tr><td>input()</td><td>Read user input</td></tr>
              <tr><td>len()</td><td>Length of object</td></tr>
              <tr><td>type()</td><td>Data type</td></tr>
              <tr><td>max()</td><td>Largest value</td></tr>
              <tr><td>min()</td><td>Smallest value</td></tr>
              <tr><td>sum()</td><td>Sum of values</td></tr>
              <tr><td>abs()</td><td>Absolute value</td></tr>
              <tr><td>round()</td><td>Round a number</td></tr>
              <tr><td>sorted()</td><td>Sort data</td></tr>
              <tr><td>range()</td><td>Generate sequence</td></tr>
              <tr><td>int()</td><td>Convert to integer</td></tr>
              <tr><td>float()</td><td>Convert to float</td></tr>
              <tr><td>str()</td><td>Convert to string</td></tr>
            </tbody>
          </table>
        </div>

        <h3>len()</h3>
        <pre><code>name = "Python"
print(len(name))</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 6</p></div>

        <h3>max() and min()</h3>
        <pre><code>numbers = [12, 8, 35, 20]
print(max(numbers))
print(min(numbers))</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>35
8</pre>
        </div>

        <h3>sum()</h3>
        <pre><code>marks = [80, 75, 90]
print(sum(marks))</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 245</p></div>

        <h3>abs()</h3>
        <pre><code>print(abs(-25))</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 25</p></div>

        <h3>round()</h3>
        <pre><code>print(round(12.786, 2))</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 12.79</p></div>

        <h3>sorted()</h3>
        <pre><code>numbers = [5, 2, 9, 1]
print(sorted(numbers))</code></pre>
        <div class="example-box"><p><strong>Output:</strong> [1, 2, 5, 9]</p></div>
      </div>
    </section>

    <!-- Recursive Function -->
    <section id="py-w4-t12" class="section">
      <h2>Recursive Function (Introduction)</h2>
      <div class="content-card">
        <p>A recursive function calls itself.</p>
        <pre><code>def countdown(n):
    if n == 0:
        print("Done!")
    else:
        print(n)
        countdown(n - 1)

countdown(5)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>5
4
3
2
1
Done!</pre>
        </div>
      </div>
    </section>

    <!-- Function Examples -->
    <section id="py-w4-t13" class="section">
      <h2>Function Examples</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item">
            <h4>Calculator</h4>
            <pre><code>def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(add(15, 10))
print(subtract(15, 10))</code></pre>
          </div>

          <div class="example-item">
            <h4>Even or Odd</h4>
            <pre><code>def is_even(num):
    return num % 2 == 0

number = 10
if is_even(number):
    print("Even")
else:
    print("Odd")</code></pre>
          </div>

          <div class="example-item">
            <h4>Largest Number</h4>
            <pre><code>def largest(a, b):
    if a > b:
        return a
    return b

print(largest(20, 35))</code></pre>
          </div>

          <div class="example-item">
            <h4>Area of Circle</h4>
            <pre><code>def area(radius):
    pi = 3.14159
    return pi * radius * radius

print(area(5))</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Lambda Functions -->
    <section id="py-w4-t14" class="section">
      <h2>Lambda Function (Introduction)</h2>
      <div class="content-card">
        <p>A lambda function is a small anonymous function.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>lambda arguments: expression</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>square = lambda x: x * x
print(square(6))</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>36</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Errors -->
    <section id="py-w4-t15" class="section">
      <h2>Common Errors</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Forgetting Parentheses While Calling</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>greet</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>greet()</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Missing Return</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>def add(a, b):
    a + b</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>def add(a, b):
    return a + b</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Incorrect Number of Arguments</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>def add(a, b):
    return a + b

add(10)</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>add(10, 20)</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="py-w4-t16" class="section">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Give functions meaningful names.</li>
          <li>📌 Keep each function focused on one task.</li>
          <li>📌 Avoid writing very long functions.</li>
          <li>📌 Use parameters instead of hardcoding values.</li>
          <li>📌 Use <code>return</code> whenever a value is needed later.</li>
          <li>📌 Add comments or docstrings for complex functions.</li>
          <li>📌 Reuse functions instead of duplicating code.</li>
        </ul>
      </div>
    </section>

    <!-- Mini Programs -->
    <section id="py-w4-t17" class="section">
      <h2>Mini Programs</h2>
      <div class="content-card">
        <div class="mini-programs-grid">
          <div class="mini-program">
            <h4>Program 1: Greeting Function</h4>
            <pre><code>def greet(name):
    print(f"Welcome, {name}!")

greet("Ankit")</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 2: Addition Function</h4>
            <pre><code>def add(a, b):
    return a + b

print(add(15, 25))</code></pre>
          </div>

          <div class="mini-program full-width">
            <h4>Program 3: Factorial Function</h4>
            <pre><code>def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(factorial(5))</code></pre>
          </div>

          <div class="mini-program full-width">
            <h4>Program 4: Check Prime Number</h4>
            <pre><code>def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

print(is_prime(17))</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 5: Average of Three Numbers</h4>
            <pre><code>def average(a, b, c):
    return (a + b + c) / 3

print(average(10, 20, 30))</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Revision -->
    <section id="py-w4-t18" class="section revision-section">
      <h2>📌 Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ A function is a reusable block of code.</li>
          <li>✔ Functions are created using the <code>def</code> keyword.</li>
          <li>✔ Parameters receive values; arguments are the values passed during function calls.</li>
          <li>✔ <code>return</code> sends a value back to the caller.</li>
          <li>✔ Local variables exist only inside a function.</li>
          <li>✔ Global variables can be accessed throughout the program.</li>
          <li>✔ Built-in functions like <code>len()</code>, <code>sum()</code>, <code>max()</code>, <code>min()</code>, and <code>sorted()</code> simplify programming tasks.</li>
          <li>✔ Lambda functions provide a concise way to create small anonymous functions.</li>
          <li>✔ Well-designed functions improve code readability, reusability, and maintenance.</li>
          <li>✔ Break large programs into small, reusable functions for better organization and easier debugging.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 4 | Functions & Code Reusability</p>
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
    { id: 'py-w4-t2', title: 'What is a Function?' },
    { id: 'py-w4-t3', title: 'Function Syntax' },
    { id: 'py-w4-t4', title: 'Defining Your First Function' },
    { id: 'py-w4-t5', title: 'Calling a Function Multiple Times' },
    { id: 'py-w4-t6', title: 'Function with Parameters' },
    { id: 'py-w4-t7', title: 'Positional and Keyword Arguments' },
    { id: 'py-w4-t8', title: 'Return Statement' },
    { id: 'py-w4-t9', title: 'print() vs return' },
    { id: 'py-w4-t10', title: 'Variable Scope' },
    { id: 'py-w4-t11', title: 'Built-in Functions' },
    { id: 'py-w4-t12', title: 'Recursive Function' },
    { id: 'py-w4-t13', title: 'Function Examples' },
    { id: 'py-w4-t14', title: 'Lambda Function' },
    { id: 'py-w4-t15', title: 'Common Errors' },
    { id: 'py-w4-t16', title: 'Best Practices' },
    { id: 'py-w4-t17', title: 'Mini Programs' },
    { id: 'py-w4-t18', title: 'Quick Revision' },
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

.feature-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.feature-list li {
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
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

/* Symbol Table */
.table-responsive {
  overflow-x: auto;
  margin: 10px 0;
}

.symbol-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 300px;
}

.symbol-table th,
.symbol-table td {
  padding: 10px 15px;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.symbol-table th {
  background: #edf2f7;
  font-weight: 600;
}

.symbol-table tr:nth-child(even) {
  background: #f7fafc;
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

.example-item h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2d3748;
  word-break: break-word;
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

/* Mini Programs Grid */
.mini-programs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.mini-program {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.mini-program.full-width {
  grid-column: 1 / -1;
}

.mini-program h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2d3748;
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

  .feature-list {
    grid-template-columns: 1fr;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .mistakes-grid {
    grid-template-columns: 1fr;
  }

  .mistake-box.full-width {
    grid-column: 1;
  }

  .mini-programs-grid {
    grid-template-columns: 1fr;
  }

  .mini-program.full-width {
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

  .symbol-table {
    font-size: 0.9em;
  }

  .symbol-table th,
  .symbol-table td {
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

  .example-item {
    padding: 12px;
  }

  .mistake-box {
    padding: 12px;
  }

  .mini-program {
    padding: 12px;
  }

  .revision-list li {
    font-size: 0.95em;
  }
}
</style>