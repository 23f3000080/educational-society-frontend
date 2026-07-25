<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>🐍 Week 1 – Getting Started with Python</h1>
      <p class="subtitle">Complete Cheat Sheet for Python Beginners</p>
    </header>

    <!-- Python Introduction -->
    <section class="section" id="py-w1-t1">
      <h2>Python Introduction</h2>
      <div class="content-card">
        <h3>What is Python?</h3>
        <p>Python is a <strong>high-level, interpreted, object-oriented, and general-purpose programming language</strong>. It is one of the easiest programming languages to learn because of its simple syntax.</p>
        
        <h3>Why Learn Python?</h3>
        <ul class="feature-list">
          <li>✅ Easy to read and write</li>
          <li>✅ Beginner-friendly</li>
          <li>✅ Cross-platform (Windows, Linux, macOS)</li>
          <li>✅ Huge community support</li>
          <li>✅ Open-source and free</li>
          <li>✅ Used in multiple domains</li>
        </ul>

        <h3>Applications of Python</h3>
        <div class="app-grid">
          <span class="app-tag">🌐 Web Development</span>
          <span class="app-tag">🤖 Artificial Intelligence</span>
          <span class="app-tag">📊 Data Science</span>
          <span class="app-tag">📈 Data Analytics</span>
          <span class="app-tag">🎮 Game Development</span>
          <span class="app-tag">🖥 Desktop Applications</span>
          <span class="app-tag">🔒 Cyber Security</span>
          <span class="app-tag">☁ Cloud Computing</span>
          <span class="app-tag">⚙ Automation</span>
          <span class="app-tag">📱 Machine Learning</span>
        </div>
      </div>
    </section>

    <!-- Programming Fundamentals -->
    <section class="section" id="py-w1-t2">
      <h2>Programming Fundamentals</h2>
      <div class="content-card">
        <h3>What is Programming?</h3>
        <p>Programming is the process of writing instructions (code) that a computer follows to perform specific tasks.</p>
        <div class="flow-diagram">
          <span class="flow-step">Input</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">Processing</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">Output</span>
        </div>
        <div class="example-box">
          <p><strong>Example:</strong> User enters 10 and 20 → Computer adds them → Output = 30</p>
        </div>

        <h3>Algorithm</h3>
        <p>An algorithm is a <strong>step-by-step procedure</strong> to solve a problem.</p>
        <div class="algorithm-flow">
          <div class="algo-step">Start</div>
          <div class="algo-arrow">↓</div>
          <div class="algo-step">Input two numbers</div>
          <div class="algo-arrow">↓</div>
          <div class="algo-step">Add them</div>
          <div class="algo-arrow">↓</div>
          <div class="algo-step">Display result</div>
          <div class="algo-arrow">↓</div>
          <div class="algo-step">Stop</div>
        </div>

        <h3>Flowchart Symbols</h3>
        <table class="symbol-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>⭕ Oval</td>
              <td>Start/End</td>
            </tr>
            <tr>
              <td>▭ Rectangle</td>
              <td>Process</td>
            </tr>
            <tr>
              <td>▱ Parallelogram</td>
              <td>Input/Output</td>
            </tr>
            <tr>
              <td>◇ Diamond</td>
              <td>Decision</td>
            </tr>
            <tr>
              <td>➡ Arrow</td>
              <td>Flow</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Installation -->
    <section class="section" id="py-w1-t3">
      <h2>Installing Python</h2>
      <div class="content-card">
        <h3>Download Python</h3>
        <p>Official Website:</p>
        <a href="https://python.org" target="_blank" rel="noopener noreferrer"><code class="url-code link">https://python.org</code></a>
        <p>Choose the latest stable version.</p>

        <h3>Installation Steps (Windows)</h3>
        <ol class="install-steps">
          <li>Download installer</li>
          <li>Run installer</li>
          <li>✔ Check <strong>Add Python to PATH</strong></li>
          <li>Click Install Now</li>
          <li>Finish Installation</li>
        </ol>

        <h3>Verify Installation</h3>
        <p>Open Command Prompt:</p>
        <pre><code>python --version</code></pre>
        <p>or</p>
        <pre><code>python3 --version</code></pre>
        <div class="example-box">
          <p><strong>Example Output:</strong> Python 3.13.1</p>
        </div>

        <!-- note if beginner then use Google Colab-->
        <h3>Alternative for Beginners: Google Colab</h3>
        <p>If you don't want to install Python, you can use <strong>Google Colab</strong> to write and run Python code in your browser.</p>
        <a href="https://colab.research.google.com" target="_blank" rel="noopener noreferrer"><code class="url-code link">https://colab.research.google.com</code></a>
      </div>
    </section>

    


    <!-- VS Code Installation -->
    <section class="section" id="py-w1-t4">
      <h2>Installing VS Code</h2>
      <div class="content-card">
        <p>Download:</p>
        <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer"><code class="url-code link">https://code.visualstudio.com</code></a>
        <h3>Install Extensions</h3>
        <ul class="extension-list">
          <li>🔧 Python</li>
          <li>🔧 Pylance</li>
          <li>🔧 Code Runner (Optional)</li>
        </ul>
      </div>
    </section>

    <!-- Running Python Programs -->
    <section class="section" id="py-w1-t5">
      <h2>Running Python Programs</h2>
      <div class="content-card">
        <h3>Method 1: Command Prompt</h3>
        <pre><code>python file.py</code></pre>

        <h3>Method 2: VS Code</h3>
        <div class="flow-diagram small-flow">
          <span class="flow-step">Right Click</span>
          <span class="flow-arrow">↓</span>
          <span class="flow-step">Run Python File</span>
        </div>

        <h3>Method 3: Python IDLE</h3>
        <p>Write code → Run</p>
      </div>
    </section>

    <!-- First Program -->
    <section class="section" id="py-w1-t6">
      <h2>First Python Program</h2>
      <div class="content-card">
        <pre><code>print("Hello World")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Hello World</p>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <section class="section" id="py-w1-t7">
      <h2>Comments</h2>
      <div class="content-card">
        <p>Comments are ignored by Python.</p>
        <h3>Single Line</h3>
        <pre><code># This is a comment
print("Python")</code></pre>

        <h3>Multi-line</h3>
        <pre><code>"""
This is
a multi-line comment
"""</code></pre>
        <p>or</p>
        <pre><code>'''
Python
Programming
'''</code></pre>
      </div>
    </section>

    <!-- Python Syntax -->
    <section class="section" id="py-w1-t8">
      <h2>Python Syntax</h2>
      <div class="content-card">
        <p>Python uses <strong>indentation (spaces)</strong> instead of <code>{}</code> to define code blocks.</p>
        <div class="example-box correct">
          <p><strong>✅ Correct</strong></p>
          <pre><code>if True:
    print("Hello")</code></pre>
        </div>
        <div class="example-box incorrect">
          <p><strong>❌ Wrong</strong></p>
          <pre><code>if True:
print("Hello")</code></pre>
        </div>

        <h3>Case Sensitive</h3>
        <pre><code>name = "John"
print(name)</code></pre>
        <p>Different variables:</p>
        <pre><code>Name
name
NAME</code></pre>
        <p>All are different.</p>
      </div>
    </section>

    <!-- Variables -->
    <section class="section" id="py-w1-t9">
      <h2>Variables</h2>
      <div class="content-card">
        <p>A variable stores data in memory.</p>
        <h3>Syntax</h3>
        <pre><code>variable_name = value</code></pre>
        <h3>Example</h3>
        <pre><code>name = "Ankit"
age = 21
salary = 50000</code></pre>

        <h3>Variable Naming Rules</h3>
        <div class="example-box correct">
          <p><strong>✅ Allowed</strong></p>
          <pre><code>student_name
student1
_name
age</code></pre>
        </div>
        <div class="example-box incorrect">
          <p><strong>❌ Not Allowed</strong></p>
          <pre><code>1name
student-name
student name
class</code></pre>
        </div>

        <h3>Multiple Assignment</h3>
        <pre><code>a = b = c = 10</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 10 10 10</p>
        </div>

        <h3>Multiple Variables</h3>
        <pre><code>x, y, z = 10, 20, 30
print(x)
print(y)
print(z)</code></pre>

        <h3>Swapping Variables</h3>
        <p><strong>Traditional</strong></p>
        <pre><code>temp = a
a = b
b = temp</code></pre>
        <p><strong>Python Way</strong></p>
        <pre><code>a, b = b, a</code></pre>
      </div>
    </section>

    <!-- Constants -->
    <section class="section" id="py-w1-t10">
      <h2>Constants</h2>
      <div class="content-card">
        <p>Python has no built-in constant keyword.</p>
        <h3>Convention</h3>
        <pre><code>PI = 3.14159
MAX_SIZE = 100</code></pre>
        <p>Uppercase names indicate constants.</p>
      </div>
    </section>

    <!-- Data Types -->
    <section class="section" id="py-w1-t11">
      <h2>Data Types</h2>
      <div class="content-card">
        <p>Python automatically detects data types.</p>
        
        <h3>Integer</h3>
        <pre><code>age = 20</code></pre>
        <pre><code>print(type(age))</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> &lt;class 'int'&gt;</p>
        </div>

        <h3>Float</h3>
        <pre><code>price = 99.99</code></pre>

        <h3>String</h3>
        <pre><code>name = "Python"</code></pre>

        <h3>Boolean</h3>
        <pre><code>is_student = True</code></pre>

        <h3>Complex</h3>
        <pre><code>x = 3 + 4j</code></pre>

        <h3>NoneType</h3>
        <pre><code>value = None</code></pre>
      </div>
    </section>

    <!-- Type Checking -->
    <section class="section" id="py-w1-t12">
      <h2>Type Checking</h2>
      <div class="content-card">
        <pre><code>age = 20
print(type(age))</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> &lt;class 'int'&gt;</p>
        </div>
      </div>
    </section>

    <!-- Type Conversion -->
    <section class="section" id="py-w1-t13">
      <h2>Type Conversion</h2>
      <div class="content-card">
        <h3>Integer</h3>
        <pre><code>int("100")</code></pre>

        <h3>Float</h3>
        <pre><code>float("12.5")</code></pre>

        <h3>String</h3>
        <pre><code>str(100)</code></pre>

        <h3>Boolean</h3>
        <pre><code>bool(1)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> True</p>
        </div>
      </div>
    </section>

    <!-- Input Function -->
    <section class="section" id="py-w1-t14">
      <h2>Input Function</h2>
      <div class="content-card">
        <pre><code>name = input("Enter your name: ")</code></pre>
        <p>Input always returns a <strong>string</strong>.</p>

        <h3>Integer Input</h3>
        <pre><code>age = int(input("Enter Age: "))</code></pre>

        <h3>Float Input</h3>
        <pre><code>salary = float(input("Enter Salary: "))</code></pre>
      </div>
    </section>

    <!-- Output -->
    <section class="section" id="py-w1-t15">
      <h2>Output</h2>
      <div class="content-card">
        <pre><code>print("Hello")</code></pre>

        <h3>Multiple Values</h3>
        <pre><code>name = "Ankit"
age = 21
print(name, age)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Ankit 21</p>
        </div>

        <h3>Separator</h3>
        <pre><code>print(10, 20, 30, sep="-")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 10-20-30</p>
        </div>

        <h3>End Parameter</h3>
        <pre><code>print("Hello", end=" ")
print("World")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Hello World</p>
        </div>
      </div>
    </section>

    <!-- String Formatting -->
    <section class="section" id="py-w1-t16">
      <h2>String Formatting</h2>
      <div class="content-card">
        <h3>f-Strings (Recommended)</h3>
        <pre><code>name = "Ankit"
age = 21
print(f"My name is {name} and I am {age} years old.")</code></pre>

        <h3>format()</h3>
        <pre><code>print("Name: {}, Age: {}".format(name, age))</code></pre>

        <h3>Percentage Formatting</h3>
        <pre><code>print("Age = %d" % age)</code></pre>
      </div>
    </section>

    <!-- Escape Characters -->
    <section class="section" id="py-w1-t17">
      <h2>Escape Characters</h2>
      <div class="content-card">
        <table class="symbol-table">
          <thead>
            <tr>
              <th>Escape</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>\n</td><td>New Line</td></tr>
            <tr><td>\t</td><td>Tab</td></tr>
            <tr><td>\\</td><td>Backslash</td></tr>
            <tr><td>\'</td><td>Single Quote</td></tr>
            <tr><td>\"</td><td>Double Quote</td></tr>
          </tbody>
        </table>
        <h3>Example</h3>
        <pre><code>print("Hello\nWorld")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>Hello
World</pre>
        </div>
      </div>
    </section>

    <!-- Python Keywords -->
    <section class="section" id="py-w1-t18">
      <h2>Python Keywords</h2>
      <div class="content-card">
        <div class="keywords-grid">
          <span class="keyword">False</span>
          <span class="keyword">True</span>
          <span class="keyword">None</span>
          <span class="keyword">if</span>
          <span class="keyword">else</span>
          <span class="keyword">elif</span>
          <span class="keyword">for</span>
          <span class="keyword">while</span>
          <span class="keyword">break</span>
          <span class="keyword">continue</span>
          <span class="keyword">return</span>
          <span class="keyword">class</span>
          <span class="keyword">def</span>
          <span class="keyword">import</span>
          <span class="keyword">from</span>
          <span class="keyword">try</span>
          <span class="keyword">except</span>
          <span class="keyword">finally</span>
          <span class="keyword">with</span>
          <span class="keyword">lambda</span>
          <span class="keyword">pass</span>
          <span class="keyword">global</span>
          <span class="keyword">nonlocal</span>
        </div>
        <p>To view all keywords:</p>
        <pre><code>import keyword
print(keyword.kwlist)</code></pre>
      </div>
    </section>

    <!-- Common Errors -->
    <section class="section" id="py-w1-t19">
      <h2>Common Errors</h2>
      <div class="content-card">
        <div class="error-box">
          <h3>Syntax Error</h3>
          <pre><code>print("Hello"</code></pre>
          <p class="error-desc">Missing closing bracket.</p>
        </div>

        <div class="error-box">
          <h3>Name Error</h3>
          <pre><code>print(age)</code></pre>
          <p class="error-desc">Variable not defined.</p>
        </div>

        <div class="error-box">
          <h3>Type Error</h3>
          <pre><code>print("10" + 10)</code></pre>
          <p class="error-desc">Cannot add string and integer directly.</p>
        </div>

        <div class="error-box">
          <h3>Value Error</h3>
          <pre><code>int("abc")</code></pre>
          <p class="error-desc">Cannot convert text to integer.</p>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section class="section" id="py-w1-t20">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices">
          <li>📌 Use meaningful variable names.</li>
          <li>📌 Follow snake_case naming.</li>
          <li>📌 Add comments where necessary.</li>
          <li>📌 Keep code properly indented.</li>
          <li>📌 Use <code>f-strings</code> for formatting.</li>
          <li>📌 Avoid hardcoding values.</li>
          <li>📌 Write small and readable programs.</li>
        </ul>
      </div>
    </section>

    <!-- Mini Programs -->
    <section class="section">
      <h2>Mini Programs</h2>
      <div class="content-card">
        <div class="program-box">
          <h3>Program 1: Print Name</h3>
          <pre><code>print("My Name is Alex")</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 2: Add Two Numbers</h3>
          <pre><code>a = 10
b = 20
print(a + b)</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 3: User Input</h3>
          <pre><code>name = input("Enter Name: ")
print(f"Welcome {name}")</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 4: Area of Rectangle</h3>
          <pre><code>length = float(input("Length: "))
width = float(input("Width: "))
area = length * width
print("Area =", area)</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 5: Swap Variables</h3>
          <pre><code>a = 10
b = 20
a, b = b, a
print(a)
print(b)</code></pre>
        </div>
      </div>
    </section>

    <!-- Quick Revision -->
    <section class="section revision-section">
      <h2>Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Python is interpreted and easy to learn.</li>
          <li>✔ <code>print()</code> displays output.</li>
          <li>✔ <code>input()</code> takes user input.</li>
          <li>✔ Variables store values.</li>
          <li>✔ Python is case-sensitive.</li>
          <li>✔ Indentation defines code blocks.</li>
          <li>✔ Main data types: <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>, <code>complex</code>, <code>NoneType</code>.</li>
          <li>✔ Use <code>type()</code> to check data types.</li>
          <li>✔ Use <code>int()</code>, <code>float()</code>, <code>str()</code>, and <code>bool()</code> for type conversion.</li>
          <li>✔ Use <code>f-strings</code> for clean and readable output formatting.</li>
          <li>✔ Follow meaningful variable naming and proper indentation for readable code.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 1</p>
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
    { id: 'py-w1-t1', title: 'Python Introduction' },
    { id: 'py-w1-t2', title: 'Programming Fundamentals' },
    { id: 'py-w1-t3', title: 'Installing Python' },
    { id: 'py-w1-t4', title: 'Installing VS Code' },
    { id: 'py-w1-t5', title: 'Running Python Programs' },
    { id: 'py-w1-t6', title: 'First Python Program' },
    { id: 'py-w1-t7', title: 'Comments' },
    { id: 'py-w1-t8', title: 'Python Syntax' },
    { id: 'py-w1-t9', title: 'Variables' },
    { id: 'py-w1-t10', title: 'Constants' },
    { id: 'py-w1-t11', title: 'Data Types' },
    { id: 'py-w1-t12', title: 'Type Checking' },
    { id: 'py-w1-t13', title: 'Type Conversion' },
    { id: 'py-w1-t14', title: 'Input Function' },
    { id: 'py-w1-t15', title: 'Output' },
    { id: 'py-w1-t16', title: 'String Formatting' },
    { id: 'py-w1-t17', title: 'Escape Characters' },
    { id: 'py-w1-t18', title: 'Python Keywords' },
    { id: 'py-w1-t19', title: 'Common Errors' },
    { id: 'py-w1-t20', title: 'Best Practices' },
    { id: 'py-w1-t21', title: 'Mini Programs' },
    { id: 'py-w1-t22', title: 'Quick Revision' },
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
}

.content-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  margin-top: 15px;
}

.content-card h3 {
  color: #2d3748;
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 1.3em;
}

.content-card h3:first-of-type {
  margin-top: 0;
}

.content-card p {
  line-height: 1.6;
  margin: 10px 0;
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

.app-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
}

.app-tag {
  background: #ebf4ff;
  color: #2b6cb0;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9em;
  border: 1px solid #bee3f8;
}

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px 0;
}

.flow-diagram.small-flow {
  gap: 10px;
  padding: 10px;
}

.flow-step {
  background: #2d3748;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
}

.flow-arrow {
  font-size: 1.5em;
  color: #306998;
}

.algorithm-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px 0;
}

.algo-step {
  background: white;
  padding: 8px 20px;
  border-radius: 6px;
  border: 2px solid #306998;
  font-weight: 500;
}

.algo-arrow {
  font-size: 1.5em;
  color: #306998;
}

.example-box {
  background: #f7fafc;
  border-left: 4px solid #306998;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
}

.example-box.correct {
  border-left-color: #38a169;
}

.example-box.incorrect {
  border-left-color: #e53e3e;
}

.symbol-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
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

.url-code {
  background: #2d3748;
  color: #63b3ed;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  display: inline-block;
  margin: 5px 0;
}

.install-steps {
  padding-left: 25px;
  line-height: 2;
}

.extension-list {
  list-style: none;
  padding: 0;
}

.extension-list li {
  padding: 6px 0;
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
}

pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.keywords-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}

.keyword {
  background: #edf2f7;
  color: #2d3748;
  padding: 6px 14px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  border: 1px solid #e2e8f0;
}

.error-box {
  background: #fff5f5;
  border-left: 4px solid #e53e3e;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}

.error-box h3 {
  color: #e53e3e;
  margin-top: 0;
}

.error-desc {
  color: #742a2a;
  font-weight: 500;
}

.best-practices {
  list-style: none;
  padding: 0;
}

.best-practices li {
  padding: 10px 15px;
  margin: 8px 0;
  background: #f0fff4;
  border-radius: 6px;
  border-left: 3px solid #38a169;
}

.program-box {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  border: 1px solid #e2e8f0;
}

.program-box h3 {
  margin-top: 0;
  color: #306998;
}

.revision-list {
  list-style: none;
  padding: 0;
}

.revision-list li {
  padding: 8px 0;
  border-bottom: 1px solid #edf2f7;
  font-size: 1.05em;
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

.cheatsheet-footer {
  text-align: center;
  padding: 30px 20px;
  color: #718096;
  border-top: 2px solid #e2e8f0;
  margin-top: 40px;
  font-size: 1.1em;
}

/* Responsive */
@media (max-width: 768px) {
  .cheatsheet-header h1 {
    font-size: 1.8em;
  }
  
  .feature-list {
    grid-template-columns: 1fr;
  }
  
  .flow-diagram {
    flex-wrap: wrap;
  }
  
  .app-grid {
    gap: 6px;
  }
  
  .app-tag {
    font-size: 0.8em;
    padding: 4px 10px;
  }
  
  .content-card {
    padding: 15px;
  }
}
</style>