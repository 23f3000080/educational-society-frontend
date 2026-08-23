<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📝 Week 5 – Strings & String Manipulation</h1>
      <p class="subtitle">Python Cheat Sheet for Text Processing</p>
    </header>

    <!-- What is a String -->
    <section id="py-w5-t2" class="section">
      <h2>What is a String?</h2>
      <div class="content-card">
        <p>A <strong>string</strong> is a sequence of characters enclosed in single quotes (<code>' '</code>), double quotes (<code>" "</code>), or triple quotes (<code>''' '''</code> or <code>""" """</code>).</p>
        
        <div class="example-box">
          <p class="example-title">Examples</p>
          <pre><code>name = "Python"
city = 'Delhi'
message = """Welcome to Python Programming"""</code></pre>
        </div>

        <h3>Creating Strings</h3>
        <pre><code>a = "Hello"
b = 'World'
c = """Python"""</code></pre>

        <h3>String Characteristics</h3>
        <ul class="feature-list">
          <li>📌 Strings are <strong>ordered</strong>.</li>
          <li>📌 Strings are <strong>immutable</strong> (cannot be changed after creation).</li>
          <li>📌 Strings support <strong>indexing</strong> and <strong>slicing</strong>.</li>
          <li>📌 Strings can contain letters, numbers, spaces, and symbols.</li>
        </ul>

        <h3>Printing Strings</h3>
        <pre><code>print("Hello Python")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Hello Python</p>
        </div>
      </div>
    </section>

    <!-- String Length -->
    <section id="py-w5-t3" class="section">
      <h2>String Length</h2>
      <div class="content-card">
        <p>Use the <code>len()</code> function.</p>
        <pre><code>language = "Python"
print(len(language))</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 6</p>
        </div>
      </div>
    </section>

    <!-- String Indexing -->
    <section id="py-w5-t4" class="section">
      <h2>String Indexing</h2>
      <div class="content-card">
        <p>Each character has an index.</p>
        
        <div class="index-diagram">
          <pre> P  y  t  h  o  n
 0  1  2  3  4  5
-6 -5 -4 -3 -2 -1</pre>
        </div>

        <h3>Positive Indexing</h3>
        <pre><code>text = "Python"
print(text[0])
print(text[2])
print(text[5])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>P
t
n</pre>
        </div>

        <h3>Negative Indexing</h3>
        <pre><code>text = "Python"
print(text[-1])
print(text[-2])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>n
o</pre>
        </div>
      </div>
    </section>

    <!-- String Slicing -->
    <section id="py-w5-t5" class="section">
      <h2>String Slicing</h2>
      <div class="content-card">
        <p>Slicing extracts a portion of a string.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>string[start:stop]</code></pre>
          <p>The <code>stop</code> index is <strong>not included</strong>.</p>
        </div>

        <h3>Basic Slicing</h3>
        <pre><code>text = "Python"
print(text[0:2])
print(text[2:5])
print(text[1:6])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>Py
tho
ython</pre>
        </div>

        <h3>Omitting Start</h3>
        <pre><code>text = "Programming"
print(text[:7])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Program</p>
        </div>

        <h3>Omitting Stop</h3>
        <pre><code>text = "Programming"
print(text[3:])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> gramming</p>
        </div>

        <h3>Entire String</h3>
        <pre><code>text = "Python"
print(text[:])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Python</p>
        </div>

        <h3>Step in Slicing</h3>
        <pre><code>text = "ABCDEFGHIJ"
print(text[::2])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> ACEGI</p>
        </div>

        <h3>Reverse a String</h3>
        <pre><code>text = "Python"
print(text[::-1])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> nohtyP</p>
        </div>
      </div>
    </section>

    <!-- Strings are Immutable -->
    <section id="py-w5-t6" class="section">
      <h2>Strings are Immutable</h2>
      <div class="content-card">
        <div class="mistake-box">
          <h4>❌ Wrong</h4>
          <pre><code>name = "Python"
name[0] = "J"</code></pre>
          <p>Produces an error.</p>
        </div>

        <div class="correction">
          <p class="correction-title">✅ Correct</p>
          <pre><code>name = "Python"
name = "Jython"</code></pre>
        </div>
      </div>
    </section>

    <!-- String Operations -->
    <section id="py-w5-t7" class="section">
      <h2>String Operations</h2>
      <div class="content-card">
        <h3>String Concatenation</h3>
        <p>Joining two or more strings using <code>+</code>.</p>
        <pre><code>first = "Hello"
second = "World"
print(first + " " + second)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Hello World</p>
        </div>

        <h3>String Repetition</h3>
        <pre><code>print("Python " * 3)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Python Python Python</p>
        </div>

        <h3>Membership Operators</h3>
        <p>Check if a substring exists.</p>
        <pre><code>text = "Python Programming"
print("Python" in text)
print("Java" in text)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>True
False</pre>
        </div>
      </div>
    </section>

    <!-- String Methods -->
    <section id="py-w5-t8" class="section">
      <h2>Common String Methods</h2>
      <div class="content-card">
        <div class="methods-grid">
          <div class="method-box">
            <h4>upper()</h4>
            <p>Converts all characters to uppercase.</p>
            <pre><code>name = "python"
print(name.upper())</code></pre>
            <p class="method-output">Output: PYTHON</p>
          </div>

          <div class="method-box">
            <h4>lower()</h4>
            <p>Converts all characters to lowercase.</p>
            <pre><code>name = "PYTHON"
print(name.lower())</code></pre>
            <p class="method-output">Output: python</p>
          </div>

          <div class="method-box">
            <h4>title()</h4>
            <p>Converts to title case.</p>
            <pre><code>text = "python programming"
print(text.title())</code></pre>
            <p class="method-output">Output: Python Programming</p>
          </div>

          <div class="method-box">
            <h4>capitalize()</h4>
            <p>Capitalizes first letter.</p>
            <pre><code>text = "python"
print(text.capitalize())</code></pre>
            <p class="method-output">Output: Python</p>
          </div>

          <div class="method-box">
            <h4>strip()</h4>
            <p>Removes spaces from both ends.</p>
            <pre><code>text = "   Python   "
print(text.strip())</code></pre>
            <p class="method-output">Output: Python</p>
          </div>

          <div class="method-box">
            <h4>lstrip() and rstrip()</h4>
            <p>Removes spaces from left or right.</p>
            <pre><code>text = "   Python   "
print(text.lstrip())
print(text.rstrip())</code></pre>
          </div>

          <div class="method-box">
            <h4>replace()</h4>
            <p>Replaces a substring.</p>
            <pre><code>text = "I like Java"
print(text.replace("Java", "Python"))</code></pre>
            <p class="method-output">Output: I like Python</p>
          </div>

          <div class="method-box">
            <h4>find()</h4>
            <p>Returns the first index of a substring.</p>
            <pre><code>text = "Python Programming"
print(text.find("Program"))</code></pre>
            <p class="method-output">Output: 7</p>
            <p class="method-note">If not found, returns <code>-1</code>.</p>
          </div>

          <div class="method-box">
            <h4>count()</h4>
            <p>Counts occurrences of a substring.</p>
            <pre><code>text = "banana"
print(text.count("a"))</code></pre>
            <p class="method-output">Output: 3</p>
          </div>

          <div class="method-box">
            <h4>startswith()</h4>
            <p>Checks if string starts with a substring.</p>
            <pre><code>text = "Python Programming"
print(text.startswith("Python"))</code></pre>
            <p class="method-output">Output: True</p>
          </div>

          <div class="method-box">
            <h4>endswith()</h4>
            <p>Checks if string ends with a substring.</p>
            <pre><code>text = "report.pdf"
print(text.endswith(".pdf"))</code></pre>
            <p class="method-output">Output: True</p>
          </div>

          <div class="method-box">
            <h4>split()</h4>
            <p>Splits a string into a list.</p>
            <pre><code>text = "Python Java C++"
print(text.split())</code></pre>
            <p class="method-output">Output: ['Python', 'Java', 'C++']</p>
          </div>

          <div class="method-box full-width">
            <h4>join()</h4>
            <p>Joins list elements into a string.</p>
            <pre><code>languages = ["Python", "Java", "C++"]
print(", ".join(languages))</code></pre>
            <p class="method-output">Output: Python, Java, C++</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Escape Characters -->
    <section id="py-w5-t9" class="section">
      <h2>Escape Characters</h2>
      <div class="content-card">
        <div class="table-responsive">
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
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>print("Hello\nPython")</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>Hello
Python</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- String Formatting -->
    <section id="py-w5-t10" class="section">
      <h2>String Formatting</h2>
      <div class="content-card">
        <p>Formatting helps create readable output.</p>

        <h3>f-Strings (Recommended)</h3>
        <pre><code>name = "Ankit"
age = 21
print(f"My name is {name} and I am {age} years old.")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> My name is Ankit and I am 21 years old.</p>
        </div>

        <h3>format()</h3>
        <pre><code>name = "Rahul"
marks = 92
print("Name: {} | Marks: {}".format(name, marks))</code></pre>

        <h3>Percentage Formatting</h3>
        <pre><code>name = "Python"
print("Welcome %s" % name)</code></pre>

        <h3>Formatting Numbers</h3>
        <pre><code>price = 1299.456
print(f"Price: {price:.2f}")</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Price: 1299.46</p>
        </div>
      </div>
    </section>

    <!-- User Input Processing -->
    <section id="py-w5-t11" class="section">
      <h2>User Input Processing</h2>
      <div class="content-card">
        <p>User input is always received as a string.</p>

        <h3>Basic Input</h3>
        <pre><code>name = input("Enter your name: ")
print(name)</code></pre>

        <h3>Removing Extra Spaces</h3>
        <pre><code>name = input("Enter Name: ").strip()
print(name)</code></pre>

        <h3>Converting User Input</h3>
        <pre><code>age = int(input("Enter Age: "))
salary = float(input("Enter Salary: "))</code></pre>

        <h3>Processing Full Name</h3>
        <pre><code>full_name = input("Enter Full Name: ").strip()
print(full_name.title())</code></pre>
      </div>
    </section>

    <!-- String Programs -->
    <section id="py-w5-t12" class="section">
      <h2>String Processing Programs</h2>
      <div class="content-card">
        <div class="programs-grid">
          <div class="program-item">
            <h4>Checking Palindrome</h4>
            <pre><code>text = input("Enter Text: ")
if text == text[::-1]:
    print("Palindrome")
else:
    print("Not Palindrome")</code></pre>
          </div>

          <div class="program-item">
            <h4>Counting Vowels</h4>
            <pre><code>text = input("Enter String: ").lower()
count = 0
for ch in text:
    if ch in "aeiou":
        count += 1
print("Vowels:", count)</code></pre>
          </div>

          <div class="program-item">
            <h4>Counting Words</h4>
            <pre><code>sentence = input("Enter Sentence: ")
words = sentence.split()
print(len(words))</code></pre>
          </div>

          <div class="program-item">
            <h4>Username Validation</h4>
            <pre><code>username = input("Enter Username: ").strip()
if len(username) >= 5:
    print("Valid Username")
else:
    print("Username Too Short")</code></pre>
          </div>

          <div class="program-item">
            <h4>Email Validation (Basic)</h4>
            <pre><code>email = input("Enter Email: ")
if "@" in email and "." in email:
    print("Valid Email")
else:
    print("Invalid Email")</code></pre>
          </div>

          <div class="program-item">
            <h4>Password Strength (Simple)</h4>
            <pre><code>password = input("Enter Password: ")
if len(password) >= 8:
    print("Strong Password")
else:
    print("Weak Password")</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Errors -->
    <section id="py-w5-t13" class="section">
      <h2>Common Errors</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Index Out of Range</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>text = "Python"
print(text[10])</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>print(text[5])</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Forgetting Parentheses</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>print(text.upper)</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>print(text.upper())</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Modifying a String</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>name[0] = "J"</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>name = "Jython"</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="py-w5-t14" class="section">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Use meaningful variable names.</li>
          <li>📌 Prefer <code>f-strings</code> for formatting.</li>
          <li>📌 Use <code>.strip()</code> to remove unwanted spaces from user input.</li>
          <li>📌 Convert user input to the correct data type when required.</li>
          <li>📌 Use string methods instead of manually processing text whenever possible.</li>
          <li>📌 Remember that strings are immutable.</li>
        </ul>
      </div>
    </section>

    <!-- Mini Programs -->
    <section id="py-w5-t15" class="section">
      <h2>Mini Programs</h2>
      <div class="content-card">
        <div class="mini-programs-grid">
          <div class="mini-program">
            <h4>Program 1: Reverse a String</h4>
            <pre><code>text = input("Enter Text: ")
print(text[::-1])</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 2: Count Characters</h4>
            <pre><code>text = input("Enter Text: ")
print("Characters:", len(text))</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 3: Check Palindrome</h4>
            <pre><code>text = input("Enter Text: ")
if text.lower() == text.lower()[::-1]:
    print("Palindrome")
else:
    print("Not Palindrome")</code></pre>
          </div>

          <div class="mini-program full-width">
            <h4>Program 4: Initials Generator</h4>
            <pre><code>name = input("Enter Full Name: ").title()
parts = name.split()
initials = ""
for word in parts:
    initials += word[0]
print("Initials:", initials)</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 5: Word Counter</h4>
            <pre><code>sentence = input("Enter Sentence: ")
words = sentence.split()
print("Number of Words:", len(words))</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Revision -->
    <section id="py-w5-t16" class="section revision-section">
      <h2>🚀 Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ A string is a sequence of characters enclosed in quotes.</li>
          <li>✔ Strings are <strong>immutable</strong>.</li>
          <li>✔ Use indexing (<code>text[0]</code>) to access individual characters.</li>
          <li>✔ Use slicing (<code>text[start:stop:step]</code>) to extract parts of a string.</li>
          <li>✔ Negative indexing starts from the end of the string.</li>
          <li>✔ Common string methods include <code>upper()</code>, <code>lower()</code>, <code>title()</code>, <code>strip()</code>, <code>replace()</code>, <code>find()</code>, <code>split()</code>, and <code>join()</code>.</li>
          <li>✔ Use <code>f-strings</code> for clean and readable string formatting.</li>
          <li>✔ User input is always returned as a string by <code>input()</code>.</li>
          <li>✔ Convert input using <code>int()</code>, <code>float()</code>, or other conversion functions when needed.</li>
          <li>✔ String processing is widely used for text validation, searching, formatting, and user interaction.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 5 | Strings & String Manipulation</p>
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
    { id: 'py-w5-t2', title: 'What is a String?' },
    { id: 'py-w5-t3', title: 'String Length' },
    { id: 'py-w5-t4', title: 'String Indexing' },
    { id: 'py-w5-t5', title: 'String Slicing' },
    { id: 'py-w5-t6', title: 'Strings are Immutable' },
    { id: 'py-w5-t7', title: 'String Operations' },
    { id: 'py-w5-t8', title: 'Common String Methods' },
    { id: 'py-w5-t9', title: 'Escape Characters' },
    { id: 'py-w5-t10', title: 'String Formatting' },
    { id: 'py-w5-t11', title: 'User Input Processing' },
    { id: 'py-w5-t12', title: 'String Processing Programs' },
    { id: 'py-w5-t13', title: 'Common Errors' },
    { id: 'py-w5-t14', title: 'Best Practices' },
    { id: 'py-w5-t15', title: 'Mini Programs' },
    { id: 'py-w5-t16', title: 'Quick Revision' },
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
}

.feature-list li {
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
  margin: 6px 0;
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

/* Index Diagram */
.index-diagram {
  background: #edf2f7;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin: 10px 0;
  font-family: 'Courier New', monospace;
  overflow-x: auto;
}

.index-diagram pre {
  background: none;
  color: #2d3748;
  padding: 0;
  margin: 0;
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

/* Symbol Table */
.table-responsive {
  overflow-x: auto;
  margin: 10px 0;
}

.symbol-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 200px;
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

/* Methods Grid */
.methods-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.method-box {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.method-box.full-width {
  grid-column: 1 / -1;
}

.method-box h4 {
  margin-top: 0;
  margin-bottom: 8px;
  color: #2b6cb0;
  font-size: 1.1em;
}

.method-box p {
  margin: 5px 0;
  font-size: 0.95em;
}

.method-output {
  font-weight: 600;
  color: #2d3748;
  background: white;
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 5px;
}

.method-note {
  font-size: 0.85em !important;
  color: #4a5568;
}

/* Programs Grid */
.programs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.program-item {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.program-item h4 {
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

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .method-box.full-width {
    grid-column: 1;
  }

  .programs-grid {
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

  .method-box {
    padding: 12px;
  }

  .program-item {
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

  .index-diagram {
    font-size: 0.8em;
    padding: 10px;
  }
}
</style>