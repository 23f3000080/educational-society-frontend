<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>🎯 Week 2 – Operators & Conditional Statements</h1>
    </header>

    <!-- Operators Introduction -->
    <section class="section" id="py-w2-t1">
      <h2>Operators in Python</h2>
      <div class="content-card">
        <p>An <strong>operator</strong> is a symbol that performs an operation on one or more operands (values or variables).</p>
        <div class="example-box">
          <pre><code>a = 10
b = 5
print(a + b)</code></pre>
          <p><strong>Output:</strong> 15</p>
        </div>
        <h3>Types of Operators</h3>
        <ul class="operator-types">
          <li>🧮 Arithmetic Operators</li>
          <li>📊 Comparison (Relational) Operators</li>
          <li>🔗 Logical Operators</li>
          <li>📝 Assignment Operators <span class="badge">Preview</span></li>
          <li>🔑 Identity Operators <span class="badge">Later</span></li>
          <li>🔍 Membership Operators <span class="badge">Later</span></li>
          <li>⚡ Bitwise Operators <span class="badge">Advanced</span></li>
        </ul>
      </div>
    </section>

    <!-- Arithmetic Operators -->
    <section class="section" id="py-w2-t2">
      <h2>Arithmetic Operators</h2>
      <div class="content-card">
        <p>Arithmetic operators are used to perform mathematical calculations.</p>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Meaning</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>+</td><td>Addition</td><td>10 + 5</td></tr>
              <tr><td>-</td><td>Subtraction</td><td>10 - 5</td></tr>
              <tr><td>*</td><td>Multiplication</td><td>10 * 5</td></tr>
              <tr><td>/</td><td>Division</td><td>10 / 5</td></tr>
              <tr><td>//</td><td>Floor Division</td><td>10 // 3</td></tr>
              <tr><td>%</td><td>Modulus</td><td>10 % 3</td></tr>
              <tr><td>**</td><td>Exponent</td><td>2 ** 3</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Addition</h3>
        <pre><code>a = 20
b = 30
print(a + b)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 50</p></div>

        <h3>Subtraction</h3>
        <pre><code>print(20 - 5)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 15</p></div>

        <h3>Multiplication</h3>
        <pre><code>print(10 * 5)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 50</p></div>

        <h3>Division</h3>
        <pre><code>print(10 / 3)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 3.3333333333333335</p></div>
        <p>Division always returns a <strong>float</strong>.</p>

        <h3>Floor Division</h3>
        <p>Returns only the integer part.</p>
        <pre><code>print(10 // 3)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 3</p></div>

        <h3>Modulus (%)</h3>
        <p>Returns the remainder.</p>
        <pre><code>print(10 % 3)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 1</p></div>
        <pre><code>print(20 % 2)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 0</p></div>
        <p>Useful for checking <strong>even</strong> and <strong>odd</strong> numbers.</p>

        <h3>Exponent (**)</h3>
        <pre><code>print(2 ** 5)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> 32</p></div>

        <h3>Arithmetic Expression</h3>
        <pre><code>a = 15
b = 4
print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)</code></pre>
      </div>
    </section>

    <!-- Operator Precedence -->
    <section class="section" id="py-w2-t3">
      <h2>Operator Precedence (BODMAS)</h2>
      <div class="content-card">
        <p>Python follows mathematical precedence.</p>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Operator</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>() Parentheses</td></tr>
              <tr><td>2</td><td>** Exponent</td></tr>
              <tr><td>3</td><td>*, /, //, % Multiplication, Division</td></tr>
              <tr><td>4</td><td>+, - Addition, Subtraction</td></tr>
            </tbody>
          </table>
        </div>
        <div class="example-box">
          <pre><code>print(5 + 2 * 3)</code></pre>
          <p><strong>Output:</strong> 11</p>
        </div>
        <div class="example-box">
          <p><strong>Using Parentheses</strong></p>
          <pre><code>print((5 + 2) * 3)</code></pre>
          <p><strong>Output:</strong> 21</p>
        </div>
      </div>
    </section>

    <!-- Comparison Operators -->
    <section class="section" id="py-w2-t4">
      <h2>Comparison Operators</h2>
      <div class="content-card">
        <p>Comparison operators compare two values and return <strong>True</strong> or <strong>False</strong>.</p>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>==</td><td>Equal</td></tr>
              <tr><td>!=</td><td>Not Equal</td></tr>
              <tr><td>&gt;</td><td>Greater Than</td></tr>
              <tr><td>&lt;</td><td>Less Than</td></tr>
              <tr><td>&gt;=</td><td>Greater Than or Equal</td></tr>
              <tr><td>&lt;=</td><td>Less Than or Equal</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Equal To</h3>
        <pre><code>print(10 == 10)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>

        <h3>Not Equal</h3>
        <pre><code>print(10 != 5)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>

        <h3>Greater Than</h3>
        <pre><code>print(20 > 10)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>

        <h3>Less Than</h3>
        <pre><code>print(5 < 10)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>

        <h3>Greater Than or Equal</h3>
        <pre><code>print(10 >= 10)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>

        <h3>Less Than or Equal</h3>
        <pre><code>print(10 <= 5)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> False</p></div>

        <h3>Comparing Strings</h3>
        <pre><code>print("apple" == "apple")</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>
        <pre><code>print("apple" > "banana")</code></pre>
        <div class="example-box"><p><strong>Output:</strong> False</p></div>
        <p>Python compares strings alphabetically (lexicographically).</p>
      </div>
    </section>

    <!-- Logical Operators -->
    <section class="section" id="py-w2-t5">
      <h2>Logical Operators</h2>
      <div class="content-card">
        <p>Logical operators combine multiple conditions.</p>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>and</td><td>Both conditions must be True</td></tr>
              <tr><td>or</td><td>At least one condition is True</td></tr>
              <tr><td>not</td><td>Reverses the result</td></tr>
            </tbody>
          </table>
        </div>

        <h3>AND Operator</h3>
        <pre><code>age = 20
print(age > 18 and age < 30)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>

        <h3>OR Operator</h3>
        <pre><code>marks = 40
print(marks > 90 or marks >= 40)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> True</p></div>

        <h3>NOT Operator</h3>
        <pre><code>print(not True)</code></pre>
        <div class="example-box"><p><strong>Output:</strong> False</p></div>

        <h3>Truth Table</h3>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>A and B</th>
                <th>A or B</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>True</td><td>True</td><td>True</td><td>True</td></tr>
              <tr><td>True</td><td>False</td><td>False</td><td>True</td></tr>
              <tr><td>False</td><td>True</td><td>False</td><td>True</td></tr>
              <tr><td>False</td><td>False</td><td>False</td><td>False</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Conditional Statements -->
    <section class="section" id="py-w2-t6">
      <h2>Conditional Statements</h2>
      <div class="content-card">
        <p>Conditional statements allow programs to make decisions.</p>
        <div class="example-box">
          <p><strong>Syntax</strong></p>
          <pre><code>if condition:
    statement</code></pre>
        </div>

        <h3>if Statement</h3>
        <pre><code>age = 20
if age >= 18:
    print("Eligible to Vote")</code></pre>
        <div class="example-box"><p><strong>Output:</strong> Eligible to Vote</p></div>

        <h3>if-else Statement</h3>
        <pre><code>age = 15
if age >= 18:
    print("Eligible")
else:
    print("Not Eligible")</code></pre>
        <div class="example-box"><p><strong>Output:</strong> Not Eligible</p></div>

        <h3>Flow of if-else</h3>
        <div class="flow-diagram vertical">
          <div class="flow-step">Condition</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">True? → if</div>
          <div class="flow-arrow">↕</div>
          <div class="flow-step">False? → else</div>
        </div>

        <h3>elif Statement</h3>
        <p>Used when checking multiple conditions.</p>
        <pre><code>marks = 75
if marks >= 90:
    print("Grade A")
elif marks >= 75:
    print("Grade B")
elif marks >= 50:
    print("Grade C")
else:
    print("Fail")</code></pre>
        <div class="example-box"><p><strong>Output:</strong> Grade B</p></div>

        <h3>Multiple elif Example</h3>
        <pre><code>num = int(input("Enter Number: "))
if num > 0:
    print("Positive")
elif num < 0:
    print("Negative")
else:
    print("Zero")</code></pre>

        <h3>Nested if</h3>
        <p>A condition inside another condition.</p>
        <pre><code>age = 22
citizen = True
if age >= 18:
    if citizen:
        print("Eligible to Vote")</code></pre>
        <div class="example-box"><p><strong>Output:</strong> Eligible to Vote</p></div>

        <h3>Nested if-else</h3>
        <pre><code>age = 20
if age >= 18:
    if age >= 60:
        print("Senior Citizen")
    else:
        print("Adult")
else:
    print("Minor")</code></pre>

        <h3>Using Logical Operators with if</h3>
        <pre><code>username = "admin"
password = "1234"
if username == "admin" and password == "1234":
    print("Login Successful")
else:
    print("Invalid Credentials")</code></pre>
      </div>
    </section>

    <!-- Programs -->
    <section class="section" id="py-w2-t7">
      <h2>Program Examples</h2>
      <div class="content-card">
        <div class="program-box">
          <h3>Checking Even or Odd</h3>
          <pre><code>num = int(input("Enter Number: "))
if num % 2 == 0:
    print("Even")
else:
    print("Odd")</code></pre>
        </div>

        <div class="program-box">
          <h3>Finding Largest Number</h3>
          <pre><code>a = 20
b = 15
if a > b:
    print(a)
else:
    print(b)</code></pre>
        </div>

        <div class="program-box">
          <h3>Largest Among Three Numbers</h3>
          <pre><code>a = 25
b = 15
c = 30
if a > b and a > c:
    print(a)
elif b > c:
    print(b)
else:
    print(c)</code></pre>
        </div>

        <div class="program-box">
          <h3>Check Leap Year</h3>
          <pre><code>year = int(input("Enter Year: "))
if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):
    print("Leap Year")
else:
    print("Not a Leap Year")</code></pre>
        </div>

        <div class="program-box">
          <h3>Calculator Program</h3>
          <pre><code>a = float(input("Enter First Number: "))
b = float(input("Enter Second Number: "))
choice = input("Enter (+,-,*,/): ")
if choice == "+":
    print(a + b)
elif choice == "-":
    print(a - b)
elif choice == "*":
    print(a * b)
elif choice == "/":
    if b != 0:
        print(a / b)
    else:
        print("Division by Zero is not allowed")
else:
    print("Invalid Operator")</code></pre>
        </div>

        <div class="program-box">
          <h3>Grade Calculator</h3>
          <pre><code>marks = int(input("Enter Marks: "))
if marks >= 90:
    print("Grade A")
elif marks >= 80:
    print("Grade B")
elif marks >= 70:
    print("Grade C")
elif marks >= 60:
    print("Grade D")
else:
    print("Fail")</code></pre>
        </div>

        <div class="program-box">
          <h3>Eligibility Checker</h3>
          <pre><code>age = int(input("Enter Age: "))
if age >= 18:
    print("Eligible for Driving License")
else:
    print("Not Eligible")</code></pre>
        </div>

        <div class="program-box">
          <h3>Temperature Checker</h3>
          <pre><code>temp = int(input("Temperature: "))
if temp > 35:
    print("Hot")
elif temp >= 20:
    print("Pleasant")
else:
    print("Cold")</code></pre>
        </div>
      </div>
    </section>

    <!-- Mini Programs -->
    <section class="section" id="py-w2-t8">
      <h2>Mini Programs</h2>
      <div class="content-card">
        <div class="program-box">
          <h3>Program 1: Positive or Negative</h3>
          <pre><code>num = int(input("Enter Number: "))
if num >= 0:
    print("Positive")
else:
    print("Negative")</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 2: Pass or Fail</h3>
          <pre><code>marks = int(input("Enter Marks: "))
if marks >= 40:
    print("Pass")
else:
    print("Fail")</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 3: Simple Login</h3>
          <pre><code>username = input("Username: ")
password = input("Password: ")
if username == "admin" and password == "1234":
    print("Login Successful")
else:
    print("Access Denied")</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 4: Even or Odd</h3>
          <pre><code>num = int(input("Enter Number: "))
if num % 2 == 0:
    print("Even")
else:
    print("Odd")</code></pre>
        </div>

        <div class="program-box">
          <h3>Program 5: Maximum of Two Numbers</h3>
          <pre><code>a = int(input("First Number: "))
b = int(input("Second Number: "))
if a > b:
    print("Maximum =", a)
else:
    print("Maximum =", b)</code></pre>
        </div>
      </div>
    </section>

    <!-- Common Mistakes -->
    <section class="section" id="py-w2-t9">
      <h2>Common Mistakes</h2>
      <div class="content-card">
        <div class="error-box">
          <h3>❌ Using <code>=</code> instead of <code>==</code></h3>
          <p><strong>Wrong</strong></p>
          <pre><code>if age = 18:</code></pre>
          <p><strong>Correct</strong></p>
          <pre><code>if age == 18:</code></pre>
        </div>

        <div class="error-box">
          <h3>❌ Missing Colon</h3>
          <p><strong>Wrong</strong></p>
          <pre><code>if age > 18</code></pre>
          <p><strong>Correct</strong></p>
          <pre><code>if age > 18:</code></pre>
        </div>

        <div class="error-box">
          <h3>❌ Wrong Indentation</h3>
          <p><strong>Wrong</strong></p>
          <pre><code>if age > 18:
print("Adult")</code></pre>
          <p><strong>Correct</strong></p>
          <pre><code>if age > 18:
    print("Adult")</code></pre>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section class="section" id="py-w2-t10">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices">
          <li>📌 Use meaningful variable names.</li>
          <li>📌 Keep conditions simple and readable.</li>
          <li>📌 Use <code>elif</code> instead of multiple <code>if</code> statements when only one condition should execute.</li>
          <li>📌 Avoid deep nesting where possible.</li>
          <li>📌 Add comments for complex conditions.</li>
          <li>📌 Always validate user input when needed.</li>
        </ul>
      </div>
    </section>

    <!-- Quick Revision -->
    <section class="section revision-section" id="py-w2-t11">
      <h2>🚀 Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Operators perform operations on values.</li>
          <li>✔ Arithmetic operators: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code>, <code>**</code>.</li>
          <li>✔ Comparison operators return <code>True</code> or <code>False</code>.</li>
          <li>✔ Logical operators (<code>and</code>, <code>or</code>, <code>not</code>) combine conditions.</li>
          <li>✔ <code>if</code> executes code when a condition is <code>True</code>.</li>
          <li>✔ <code>if-else</code> chooses between two paths.</li>
          <li>✔ <code>elif</code> is used to test multiple conditions.</li>
          <li>✔ Nested <code>if</code> allows one condition inside another.</li>
          <li>✔ Use <code>==</code> for comparison, not <code>=</code>.</li>
          <li>✔ Maintain proper indentation and always end <code>if</code>, <code>elif</code>, and <code>else</code> statements with a colon (<code>:</code>).</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 2 | Operators & Conditional Statements</p>
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
    { id: 'py-w2-t1', title: 'Operators in Python' },
    { id: 'py-w2-t2', title: 'Arithmetic Operators' },
    { id: 'py-w2-t3', title: 'Operator Precedence (BODMAS)' },
    { id: 'py-w2-t4', title: 'Comparison Operators' },
    { id: 'py-w2-t5', title: 'Logical Operators' },
    { id: 'py-w2-t6', title: 'Conditional Statements' },
    { id: 'py-w2-t7', title: 'Program Examples' },
    { id: 'py-w2-t8', title: 'Mini Programs' },
    { id: 'py-w2-t9', title: 'Common Mistakes' },
    { id: 'py-w2-t10', title: 'Best Practices' },
    { id: 'py-w2-t11', title: 'Quick Revision' },
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

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
  margin: 6px 0;
}

.operator-types {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.operator-types li {
  padding: 10px 15px;
  background: #edf2f7;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: #306998;
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.7em;
  margin-left: auto;
}

.table-responsive {
  overflow-x: auto;
  margin: 10px 0;
}

.symbol-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
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

.example-box {
  background: #f7fafc;
  border-left: 4px solid #306998;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
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
  flex-wrap: wrap;
}

.flow-diagram.vertical {
  flex-direction: column;
  max-width: 200px;
  margin: 10px auto;
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

/* Responsive Styles */
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

  .operator-types {
    grid-template-columns: 1fr;
  }

  .operator-types li {
    padding: 8px 12px;
    font-size: 0.95em;
  }

  .badge {
    font-size: 0.6em;
  }

  .symbol-table th,
  .symbol-table td {
    padding: 8px 10px;
    font-size: 0.9em;
  }

  .flow-diagram {
    gap: 8px;
    padding: 10px;
  }

  .flow-step {
    padding: 6px 14px;
    font-size: 0.9em;
  }

  .flow-arrow {
    font-size: 1.2em;
  }

  pre {
    padding: 12px;
    font-size: 0.85em;
  }

  .program-box {
    padding: 12px;
    margin: 10px 0;
  }

  .program-box h3 {
    font-size: 1.05em;
  }

  .error-box {
    padding: 12px;
  }

  .best-practices li {
    padding: 8px 12px;
    font-size: 0.95em;
  }

  .revision-list li {
    font-size: 0.95em;
    padding: 6px 0;
  }

  .objectives-list li {
    font-size: 0.95em;
    padding: 6px 10px;
  }

  .cheatsheet-footer {
    font-size: 0.95em;
    padding: 20px 15px;
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

  .symbol-table th,
  .symbol-table td {
    padding: 6px 8px;
    font-size: 0.8em;
  }

  pre {
    padding: 10px;
    font-size: 0.8em;
  }

  .flow-diagram {
    gap: 5px;
    padding: 8px;
  }

  .flow-step {
    padding: 5px 10px;
    font-size: 0.8em;
  }

  .flow-arrow {
    font-size: 1em;
  }

  .program-box {
    padding: 10px;
  }

  .error-box {
    padding: 10px;
  }

  .error-box h3 {
    font-size: 1em;
  }
}
</style>