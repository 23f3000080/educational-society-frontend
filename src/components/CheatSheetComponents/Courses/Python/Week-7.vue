<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📂 Week 7 – File Handling & Error Management</h1>
    </header>

    <!-- Introduction -->
    <section id="py-w7-t2" class="section">
      <h2>Introduction to File Handling</h2>
      <div class="content-card">
        <p>Files allow programs to store data permanently.</p>
        <p>Without files, data is lost when the program ends.</p>

        <h3>Examples of files:</h3>
        <ul class="feature-list">
          <li>📄 Text Files (<code>.txt</code>)</li>
          <li>📊 CSV Files (<code>.csv</code>)</li>
          <li>📋 JSON Files (<code>.json</code>)</li>
          <li>🖼 Images (<code>.jpg</code>, <code>.png</code>)</li>
          <li>📑 PDFs (<code>.pdf</code>)</li>
        </ul>
      </div>
    </section>

    <!-- Opening Files -->
    <section id="py-w7-t3" class="section">
      <h2>Opening a File</h2>
      <div class="content-card">
        <p>Python uses the built-in <code>open()</code> function.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>file = open("filename.txt", "mode")</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>file = open("notes.txt", "r")</code></pre>
        </div>

        <h3>File Modes</h3>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Mode</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>"r"</code></td><td>Read (default)</td></tr>
              <tr><td><code>"w"</code></td><td>Write (Creates new or overwrites existing file)</td></tr>
              <tr><td><code>"a"</code></td><td>Append</td></tr>
              <tr><td><code>"x"</code></td><td>Create a new file</td></tr>
              <tr><td><code>"r+"</code></td><td>Read and Write</td></tr>
              <tr><td><code>"w+"</code></td><td>Write and Read</td></tr>
              <tr><td><code>"a+"</code></td><td>Append and Read</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Reading Files -->
    <section id="py-w7-t4" class="section">
      <h2>Reading a Text File</h2>
      <div class="content-card">
        <p>Suppose <code>notes.txt</code> contains:</p>
        <div class="example-box">
          <pre><code>Welcome to Python
Learning File Handling</code></pre>
        </div>

        <h3>read()</h3>
        <p>Reads the entire file.</p>
        <pre><code>file = open("notes.txt", "r")
content = file.read()
print(content)
file.close()</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>Welcome to Python
Learning File Handling</pre>
        </div>

        <h3>readline()</h3>
        <p>Reads one line at a time.</p>
        <pre><code>file = open("notes.txt", "r")
print(file.readline())
print(file.readline())
file.close()</code></pre>

        <h3>readlines()</h3>
        <p>Returns all lines as a list.</p>
        <pre><code>file = open("notes.txt", "r")
lines = file.readlines()
print(lines)
file.close()</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> ['Welcome to Python\n', 'Learning File Handling']</p>
        </div>

        <h3>Loop Through a File</h3>
        <pre><code>file = open("notes.txt", "r")
for line in file:
    print(line.strip())
file.close()</code></pre>
      </div>
    </section>

    <!-- Writing Files -->
    <section id="py-w7-t5" class="section">
      <h2>Writing to a File</h2>
      <div class="content-card">
        <p><code>w</code> creates a new file or overwrites an existing file.</p>
        <pre><code>file = open("notes.txt", "w")
file.write("Hello Python")
file.close()</code></pre>
        <div class="example-box">
          <p><strong>Contents of the file:</strong> Hello Python</p>
        </div>

        <h3>Writing Multiple Lines</h3>
        <pre><code>file = open("students.txt", "w")
file.write("Ankit\n")
file.write("Rahul\n")
file.write("Priya\n")
file.close()</code></pre>

        <h3>Appending Data</h3>
        <p><code>a</code> adds data without deleting existing content.</p>
        <pre><code>file = open("students.txt", "a")
file.write("Amit\n")
file.close()</code></pre>
      </div>
    </section>

    <!-- With Statement -->
    <section id="py-w7-t6" class="section">
      <h2>Using with Statement</h2>
      <div class="content-card">
        <p>The <code>with</code> statement automatically closes the file.</p>
        <pre><code>with open("notes.txt", "r") as file:
    print(file.read())</code></pre>
        <p class="highlight">✅ Recommended over manually calling <code>close()</code>.</p>

        <h3>File Exists Check</h3>
        <pre><code>import os

if os.path.exists("notes.txt"):
    print("File Exists")
else:
    print("File Not Found")</code></pre>
      </div>
    </section>

    <!-- CSV Files -->
    <section id="py-w7-t7" class="section">
      <h2>Working with CSV Files</h2>
      <div class="content-card">
        <p>CSV (Comma-Separated Values) files store tabular data.</p>

        <div class="example-box">
          <p><strong>Example (<code>students.csv</code>):</strong></p>
          <pre><code>Name,Age,Marks
Ankit,21,95
Rahul,20,88
Priya,19,91</code></pre>
        </div>

        <h3>Reading CSV Files</h3>
        <pre><code>import csv

with open("students.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>['Name', 'Age', 'Marks']
['Ankit', '21', '95']
['Rahul', '20', '88']</pre>
        </div>

        <h3>Writing CSV Files</h3>
        <pre><code>import csv

with open("students.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Name", "Age", "Marks"])
    writer.writerow(["Ankit", 21, 95])
    writer.writerow(["Rahul", 20, 88])</code></pre>

        <h3>Appending to CSV</h3>
        <pre><code>import csv

with open("students.csv", "a", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Priya", 19, 91])</code></pre>

        <h3>Dictionary CSV Reader</h3>
        <pre><code>import csv

with open("students.csv") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["Name"], row["Marks"])</code></pre>
      </div>
    </section>

    <!-- Exceptions -->
    <section id="py-w7-t8" class="section">
      <h2>What is an Exception?</h2>
      <div class="content-card">
        <p>An <strong>exception</strong> is an error that occurs while the program is running.</p>

        <h3>Examples:</h3>
        <ul class="feature-list">
          <li>➗ Dividing by zero</li>
          <li>📂 Opening a missing file</li>
          <li>⌨️ Invalid user input</li>
          <li>🔑 Accessing a missing dictionary key</li>
        </ul>

        <h3>Common Exceptions</h3>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Exception</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ZeroDivisionError</td><td>Division by zero</td></tr>
              <tr><td>FileNotFoundError</td><td>File not found</td></tr>
              <tr><td>ValueError</td><td>Invalid value</td></tr>
              <tr><td>TypeError</td><td>Invalid data type</td></tr>
              <tr><td>IndexError</td><td>Invalid list index</td></tr>
              <tr><td>KeyError</td><td>Missing dictionary key</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Try Except -->
    <section id="py-w7-t9" class="section">
      <h2>try and except</h2>
      <div class="content-card">
        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>try:
    statements
except:
    statements</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>try:
    num = 10 / 0
except:
    print("An error occurred")</code></pre>
          <div class="output-box">
            <p class="output-label">Output:</p>
            <pre><code>An error occurred</code></pre>
          </div>
        </div>

        <h3>Handling Specific Exceptions</h3>
        <pre><code>try:
    number = int(input("Enter Number: "))
except ValueError:
    print("Please enter a valid integer.")</code></pre>

        <h3>Multiple Exceptions</h3>
        <pre><code>try:
    num = int(input("Enter Number: "))
    print(10 / num)
except ValueError:
    print("Invalid Number")
except ZeroDivisionError:
    print("Cannot divide by zero")</code></pre>
      </div>
    </section>

    <!-- Else and Finally -->
    <section id="py-w7-t10" class="section">
      <h2>else and finally Blocks</h2>
      <div class="content-card">
        <h3>else Block</h3>
        <p>The <code>else</code> block runs only if no exception occurs.</p>
        <pre><code>try:
    number = int(input("Enter Number: "))
except ValueError:
    print("Invalid Input")
else:
    print("You Entered:", number)</code></pre>

        <h3>finally Block</h3>
        <p>The <code>finally</code> block always executes, whether an exception occurs or not.</p>
        <pre><code>try:
    file = open("notes.txt", "r")
    print(file.read())
except FileNotFoundError:
    print("File not found")
finally:
    print("Program Finished")</code></pre>

        <h3>Complete Example</h3>
        <pre><code>try:
    a = int(input("First Number: "))
    b = int(input("Second Number: "))
    print(a / b)
except ValueError:
    print("Enter valid integers.")
except ZeroDivisionError:
    print("Division by zero is not allowed.")
finally:
    print("Thank you for using the program.")</code></pre>
      </div>
    </section>

    <!-- Raising Exceptions -->
    <section id="py-w7-t11" class="section">
      <h2>Raising Exceptions</h2>
      <div class="content-card">
        <p>You can raise your own exception.</p>
        <pre><code>age = int(input("Enter Age: "))
if age < 18:
    raise ValueError("Age must be 18 or above.")</code></pre>

        <h3>Logging Errors (Basic)</h3>
        <pre><code>try:
    print(10 / 0)
except ZeroDivisionError as error:
    print("Error:", error)</code></pre>
      </div>
    </section>

    <!-- Mini Projects -->
    <section id="py-w7-t12" class="section">
      <h2>Mini Projects</h2>
      <div class="content-card">
        <div class="mini-programs-grid">
          <div class="mini-program full-width">
            <h4>Project 1: Save Student Data</h4>
            <pre><code>name = input("Enter Name: ")
marks = input("Enter Marks: ")

with open("students.txt", "a") as file:
    file.write(name + "," + marks + "\n")

print("Data Saved Successfully!")</code></pre>
          </div>

          <div class="mini-program full-width">
            <h4>Project 2: Read Student Data</h4>
            <pre><code>with open("students.txt", "r") as file:
    for line in file:
        print(line.strip())</code></pre>
          </div>

          <div class="mini-program">
            <h4>Project 3: Simple Notes App</h4>
            <pre><code>note = input("Write a Note: ")
with open("notes.txt", "a") as file:
    file.write(note + "\n")
print("Note Saved!")</code></pre>
          </div>

          <div class="mini-program">
            <h4>Project 4: Safe Calculator</h4>
            <pre><code>try:
    a = float(input("Enter First Number: "))
    b = float(input("Enter Second Number: "))
    print("Result =", a / b)
except ZeroDivisionError:
    print("Cannot divide by zero.")
except ValueError:
    print("Please enter valid numbers.")</code></pre>
          </div>

          <div class="mini-program full-width">
            <h4>Project 5: Count File Lines</h4>
            <pre><code>with open("notes.txt", "r") as file:
    count = 0
    for line in file:
        count += 1
print("Total Lines:", count)</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Errors -->
    <section id="py-w7-t13" class="section">
      <h2>Common Errors</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Forgetting to Close a File</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>file = open("notes.txt", "r")
print(file.read())</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>with open("notes.txt", "r") as file:
    print(file.read())</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Reading a Missing File</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>file = open("abc.txt", "r")</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>try:
    file = open("abc.txt", "r")
except FileNotFoundError:
    print("File Not Found")</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Incorrect File Mode</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>open("notes.txt", "read")</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>open("notes.txt", "r")</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="py-w7-t14" class="section">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Use the <code>with</code> statement to automatically close files.</li>
          <li>📌 Handle expected exceptions using specific <code>except</code> blocks.</li>
          <li>📌 Avoid using a generic <code>except</code> unless necessary.</li>
          <li>📌 Store important data in CSV files when working with tabular information.</li>
          <li>📌 Validate user input before processing it.</li>
          <li>📌 Keep file operations inside <code>try</code> blocks if file availability is uncertain.</li>
          <li>📌 Write clear error messages to help users understand what went wrong.</li>
        </ul>
      </div>
    </section>

    <!-- Quick Revision -->
    <section id="py-w7-t15" class="section revision-section">
      <h2>📌 Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Use <code>open()</code> to open files.</li>
          <li>✔ File modes include <code>"r"</code>, <code>"w"</code>, <code>"a"</code>, and <code>"x"</code>.</li>
          <li>✔ <code>read()</code>, <code>readline()</code>, and <code>readlines()</code> are used to read file contents.</li>
          <li>✔ <code>write()</code> writes data, while append mode (<code>"a"</code>) adds data without overwriting existing content.</li>
          <li>✔ The <code>with</code> statement automatically closes files after use.</li>
          <li>✔ The <code>csv</code> module simplifies reading and writing CSV files.</li>
          <li>✔ Exceptions are runtime errors that can interrupt program execution.</li>
          <li>✔ Use <code>try</code> to wrap code that might fail and <code>except</code> to handle errors gracefully.</li>
          <li>✔ The <code>else</code> block runs only when no exception occurs, and <code>finally</code> always executes.</li>
          <li>✔ Proper exception handling and file management make programs more reliable and user-friendly.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 7 | File Handling & Error Management</p>
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
    { id: 'py-w7-t2', title: 'Introduction to File Handling' },
    { id: 'py-w7-t3', title: 'Opening a File' },
    { id: 'py-w7-t4', title: 'Reading a Text File' },
    { id: 'py-w7-t5', title: 'Writing to a File' },
    { id: 'py-w7-t6', title: 'Using with Statement' },
    { id: 'py-w7-t7', title: 'Working with CSV Files' },
    { id: 'py-w7-t8', title: 'What is an Exception?' },
    { id: 'py-w7-t9', title: 'try and except' },
    { id: 'py-w7-t10', title: 'else and finally Blocks' },
    { id: 'py-w7-t11', title: 'Raising Exceptions' },
    { id: 'py-w7-t12', title: 'Mini Projects' },
    { id: 'py-w7-t13', title: 'Common Errors' },
    { id: 'py-w7-t14', title: 'Best Practices' },
    { id: 'py-w7-t15', title: 'Quick Revision' },
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

/* Table */
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

/* Highlight */
.highlight {
  background: #ebf8ff;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #3182ce;
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

  .mini-programs-grid {
    grid-template-columns: 1fr;
  }

  .mini-program.full-width {
    grid-column: 1;
  }

  .mistakes-grid {
    grid-template-columns: 1fr;
  }

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