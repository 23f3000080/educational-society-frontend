<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📚 Week 6 – Lists, Tuples & Dictionaries</h1>
    </header>

    <!-- Python Collections Overview -->
    <section id="py-w6-t2" class="section">
      <h2>Python Collections</h2>
      <div class="content-card">
        <p>Python provides built-in collection data types to store multiple values.</p>
        
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Collection</th>
                <th>Ordered</th>
                <th>Mutable</th>
                <th>Duplicate Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>List</strong></td>
                <td>✅ Yes</td>
                <td>✅ Yes</td>
                <td>✅ Yes</td>
              </tr>
              <tr>
                <td><strong>Tuple</strong></td>
                <td>✅ Yes</td>
                <td>❌ No</td>
                <td>✅ Yes</td>
              </tr>
              <tr>
                <td><strong>Dictionary</strong></td>
                <td>✅ Yes</td>
                <td>✅ Yes</td>
                <td>Keys ❌ No</td>
              </tr>
              <tr>
                <td><strong>Set</strong></td>
                <td>❌ No</td>
                <td>✅ Yes</td>
                <td>❌ No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Lists -->
    <section id="py-w6-t3" class="section">
      <h2>Lists</h2>
      <div class="content-card">
        <p>A <strong>List</strong> is an ordered, mutable collection that can store multiple values.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>numbers = [10, 20, 30, 40]</code></pre>
        </div>

        <h3>Creating Lists</h3>
        <pre><code>fruits = ["Apple", "Banana", "Mango"]
print(fruits)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> ['Apple', 'Banana', 'Mango']</p>
        </div>

        <h3>List with Mixed Data Types</h3>
        <pre><code>data = ["Ankit", 21, True, 95.5]
print(data)</code></pre>

        <h3>List Indexing</h3>
        <pre><code>fruits = ["Apple", "Banana", "Mango"]
print(fruits[0])
print(fruits[2])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong></p>
          <pre>Apple
Mango</pre>
        </div>

        <h3>Negative Indexing</h3>
        <pre><code>fruits = ["Apple", "Banana", "Mango"]
print(fruits[-1])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Mango</p>
        </div>

        <h3>List Slicing</h3>
        <pre><code>numbers = [10,20,30,40,50]
print(numbers[1:4])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> [20, 30, 40]</p>
        </div>

        <h3>Modifying List Elements</h3>
        <pre><code>fruits = ["Apple", "Banana", "Mango"]
fruits[1] = "Orange"
print(fruits)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> ['Apple', 'Orange', 'Mango']</p>
        </div>
      </div>
    </section>

    <!-- List Methods -->
    <section id="py-w6-t4" class="section">
      <h2>List Methods</h2>
      <div class="content-card">
        <div class="methods-grid">
          <div class="method-box">
            <h4>append()</h4>
            <p>Adds an item to the end.</p>
            <pre><code>numbers = [1,2,3]
numbers.append(4)
print(numbers)</code></pre>
            <p class="method-output">Output: [1, 2, 3, 4]</p>
          </div>

          <div class="method-box">
            <h4>insert()</h4>
            <p>Inserts item at specific index.</p>
            <pre><code>numbers = [10,20,30]
numbers.insert(1,15)
print(numbers)</code></pre>
            <p class="method-output">Output: [10, 15, 20, 30]</p>
          </div>

          <div class="method-box">
            <h4>extend()</h4>
            <p>Adds all items from another list.</p>
            <pre><code>a = [1,2]
b = [3,4]
a.extend(b)
print(a)</code></pre>
            <p class="method-output">Output: [1, 2, 3, 4]</p>
          </div>

          <div class="method-box">
            <h4>remove()</h4>
            <p>Removes first occurrence of item.</p>
            <pre><code>fruits = ["Apple","Banana","Mango"]
fruits.remove("Banana")
print(fruits)</code></pre>
          </div>

          <div class="method-box">
            <h4>pop()</h4>
            <p>Removes element by index.</p>
            <pre><code>numbers = [10,20,30]
numbers.pop()
print(numbers)</code></pre>
            <p class="method-output">Output: [10, 20]</p>
          </div>

          <div class="method-box">
            <h4>clear()</h4>
            <p>Removes all elements.</p>
            <pre><code>numbers = [1,2,3]
numbers.clear()
print(numbers)</code></pre>
            <p class="method-output">Output: []</p>
          </div>

          <div class="method-box">
            <h4>sort()</h4>
            <p>Sorts the list in ascending order.</p>
            <pre><code>numbers = [5,1,8,3]
numbers.sort()
print(numbers)</code></pre>
            <p class="method-output">Output: [1, 3, 5, 8]</p>
          </div>

          <div class="method-box">
            <h4>reverse()</h4>
            <p>Reverses the list.</p>
            <pre><code>numbers = [1,2,3]
numbers.reverse()
print(numbers)</code></pre>
            <p class="method-output">Output: [3, 2, 1]</p>
          </div>

          <div class="method-box">
            <h4>count()</h4>
            <p>Counts occurrences of item.</p>
            <pre><code>numbers = [1,2,2,3,2]
print(numbers.count(2))</code></pre>
            <p class="method-output">Output: 3</p>
          </div>

          <div class="method-box">
            <h4>index()</h4>
            <p>Returns index of item.</p>
            <pre><code>fruits = ["Apple","Banana","Mango"]
print(fruits.index("Banana"))</code></pre>
            <p class="method-output">Output: 1</p>
          </div>
        </div>

        <h3>Loop Through a List</h3>
        <pre><code>fruits = ["Apple","Banana","Mango"]
for fruit in fruits:
    print(fruit)</code></pre>
      </div>
    </section>

    <!-- Tuples -->
    <section id="py-w6-t5" class="section">
      <h2>Tuple</h2>
      <div class="content-card">
        <p>A <strong>Tuple</strong> is an ordered but immutable collection.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>numbers = (10,20,30)</code></pre>
        </div>

        <h3>Creating Tuples</h3>
        <pre><code>colors = ("Red","Green","Blue")
print(colors)</code></pre>

        <h3>Accessing Tuple Elements</h3>
        <pre><code>colors = ("Red","Green","Blue")
print(colors[1])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Green</p>
        </div>

        <div class="warning-box">
          <p class="warning-title">⚠️ Tuple Cannot Be Modified</p>
          <p><strong>Wrong</strong></p>
          <pre><code>colors = ("Red","Green")
colors[0] = "Blue"  # TypeError</code></pre>
        </div>

        <h3>Tuple Methods</h3>
        <div class="methods-grid">
          <div class="method-box">
            <h4>count()</h4>
            <pre><code>numbers = (1,2,2,3)
print(numbers.count(2))</code></pre>
            <p class="method-output">Output: 2</p>
          </div>

          <div class="method-box">
            <h4>index()</h4>
            <pre><code>numbers = (10,20,30)
print(numbers.index(20))</code></pre>
            <p class="method-output">Output: 1</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dictionaries -->
    <section id="py-w6-t6" class="section">
      <h2>Dictionary</h2>
      <div class="content-card">
        <p>A <strong>Dictionary</strong> stores data as <strong>key-value pairs</strong>.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>student = {
    "name": "Ankit",
    "age": 21
}</code></pre>
        </div>

        <h3>Creating Dictionary</h3>
        <pre><code>student = {
    "name":"Rahul",
    "age":20,
    "city":"Delhi"
}
print(student)</code></pre>

        <h3>Access Dictionary Values</h3>
        <pre><code>student = {
    "name":"Rahul",
    "age":20
}
print(student["name"])</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> Rahul</p>
        </div>

        <h3>Using get()</h3>
        <pre><code>student = {
    "name":"Rahul"
}
print(student.get("name"))</code></pre>

        <h3>Adding New Key</h3>
        <pre><code>student = {
    "name":"Rahul"
}
student["marks"] = 95
print(student)</code></pre>

        <h3>Updating Dictionary</h3>
        <pre><code>student = {
    "age":20
}
student["age"] = 21
print(student)</code></pre>

        <h3>Removing Items</h3>
        <pre><code>student = {
    "name":"Rahul",
    "age":20
}
student.pop("age")
print(student)</code></pre>
      </div>
    </section>

    <!-- Dictionary Methods -->
    <section id="py-w6-t7" class="section">
      <h2>Dictionary Methods</h2>
      <div class="content-card">
        <div class="methods-grid">
          <div class="method-box">
            <h4>keys()</h4>
            <pre><code>student = {
    "name":"Rahul",
    "age":20
}
print(student.keys())</code></pre>
          </div>

          <div class="method-box">
            <h4>values()</h4>
            <pre><code>print(student.values())</code></pre>
          </div>

          <div class="method-box full-width">
            <h4>items()</h4>
            <pre><code>print(student.items())</code></pre>
          </div>
        </div>

        <h3>Loop Through Dictionary</h3>
        <pre><code>student = {
    "name":"Rahul",
    "age":20
}
for key, value in student.items():
    print(key, value)</code></pre>
      </div>
    </section>

    <!-- Sets -->
    <section id="py-w6-t8" class="section">
      <h2>Set</h2>
      <div class="content-card">
        <p>A <strong>Set</strong> is an unordered collection of unique values.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>numbers = {1,2,3}</code></pre>
        </div>

        <h3>Creating Sets</h3>
        <pre><code>numbers = {10,20,30}
print(numbers)</code></pre>

        <h3>Duplicate Values Removed</h3>
        <pre><code>numbers = {1,2,2,3,3,4}
print(numbers)</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> {1, 2, 3, 4}</p>
        </div>

        <h3>Set Methods</h3>
        <div class="methods-grid">
          <div class="method-box">
            <h4>add()</h4>
            <pre><code>numbers = {1,2}
numbers.add(3)
print(numbers)</code></pre>
          </div>

          <div class="method-box">
            <h4>remove()</h4>
            <pre><code>numbers = {1,2,3}
numbers.remove(2)
print(numbers)</code></pre>
          </div>

          <div class="method-box">
            <h4>discard()</h4>
            <pre><code>numbers = {1,2,3}
numbers.discard(5)  # No error</code></pre>
            <p class="method-note">Unlike <code>remove()</code>, <code>discard()</code> does not raise an error if the element is missing.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Set Operations -->
    <section id="py-w6-t9" class="section">
      <h2>Basic Set Operations</h2>
      <div class="content-card">
        <div class="operations-grid">
          <div class="operation-box">
            <h4>Union (|)</h4>
            <pre><code>A = {1,2,3}
B = {3,4,5}
print(A | B)</code></pre>
            <p class="method-output">Output: {1, 2, 3, 4, 5}</p>
          </div>

          <div class="operation-box">
            <h4>Intersection (&amp;)</h4>
            <pre><code>A = {1,2,3}
B = {3,4,5}
print(A & B)</code></pre>
            <p class="method-output">Output: {3}</p>
          </div>

          <div class="operation-box">
            <h4>Difference (-)</h4>
            <pre><code>A = {1,2,3}
B = {3,4,5}
print(A - B)</code></pre>
            <p class="method-output">Output: {1, 2}</p>
          </div>

          <div class="operation-box">
            <h4>Symmetric Difference (^)</h4>
            <pre><code>A = {1,2,3}
B = {3,4,5}
print(A ^ B)</code></pre>
            <p class="method-output">Output: {1, 2, 4, 5}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Collection Functions -->
    <section id="py-w6-t10" class="section">
      <h2>Collection Functions</h2>
      <div class="content-card">
        <div class="methods-grid">
          <div class="method-box">
            <h4>len()</h4>
            <pre><code>numbers = [10,20,30]
print(len(numbers))</code></pre>
            <p class="method-output">Output: 3</p>
          </div>

          <div class="method-box">
            <h4>max()</h4>
            <pre><code>numbers = [10,50,20]
print(max(numbers))</code></pre>
            <p class="method-output">Output: 50</p>
          </div>

          <div class="method-box">
            <h4>min()</h4>
            <pre><code>numbers = [10,50,20]
print(min(numbers))</code></pre>
            <p class="method-output">Output: 10</p>
          </div>

          <div class="method-box">
            <h4>sum()</h4>
            <pre><code>numbers = [10,20,30]
print(sum(numbers))</code></pre>
            <p class="method-output">Output: 60</p>
          </div>

          <div class="method-box full-width">
            <h4>sorted()</h4>
            <pre><code>numbers = [5,2,8,1]
print(sorted(numbers))</code></pre>
            <p class="method-output">Output: [1, 2, 5, 8]</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mini Programs -->
    <section id="py-w6-t11" class="section">
      <h2>Mini Programs</h2>
      <div class="content-card">
        <div class="mini-programs-grid">
          <div class="mini-program">
            <h4>Program 1: Sum of List Elements</h4>
            <pre><code>numbers = [10,20,30,40]
print(sum(numbers))</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 2: Find Maximum Number</h4>
            <pre><code>numbers = [45,23,89,12]
print(max(numbers))</code></pre>
          </div>

          <div class="mini-program full-width">
            <h4>Program 3: Student Dictionary</h4>
            <pre><code>student = {
    "Name":"Ankit",
    "Age":21,
    "Course":"Python"
}
for key, value in student.items():
    print(key, ":", value)</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 4: Remove Duplicates Using Set</h4>
            <pre><code>numbers = [1,2,2,3,4,4,5]
unique = list(set(numbers))
print(unique)</code></pre>
          </div>

          <div class="mini-program">
            <h4>Program 5: Shopping List</h4>
            <pre><code>shopping = ["Milk","Bread"]
shopping.append("Eggs")
shopping.append("Butter")
print(shopping)</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Errors -->
    <section id="py-w6-t12" class="section">
      <h2>Common Errors</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Index Out of Range</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>numbers = [10,20]
print(numbers[5])</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>print(numbers[1])</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Accessing Missing Dictionary Key</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>student = {"name":"Rahul"}
print(student["age"])</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>print(student.get("age"))</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Modifying Tuple</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>colors = ("Red","Blue")
colors[0] = "Green"  # TypeError</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>colors = ("Green","Blue")</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="py-w6-t13" class="section">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Use <strong>Lists</strong> when data needs to be modified.</li>
          <li>📌 Use <strong>Tuples</strong> for fixed or constant data.</li>
          <li>📌 Use <strong>Dictionaries</strong> for key-value relationships.</li>
          <li>📌 Use <strong>Sets</strong> to remove duplicate values and perform mathematical set operations.</li>
          <li>📌 Prefer <code>.get()</code> over direct key access when a key might be missing.</li>
          <li>📌 Choose descriptive variable names for collections.</li>
        </ul>
      </div>
    </section>

    <!-- Quick Revision -->
    <section id="py-w6-t14" class="section revision-section">
      <h2>📌 Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Lists are ordered and mutable.</li>
          <li>✔ Tuples are ordered but immutable.</li>
          <li>✔ Dictionaries store data as <strong>key-value pairs</strong>.</li>
          <li>✔ Sets store unique values and automatically remove duplicates.</li>
          <li>✔ Lists support methods like <code>append()</code>, <code>insert()</code>, <code>remove()</code>, <code>pop()</code>, <code>sort()</code>, and <code>reverse()</code>.</li>
          <li>✔ Tuples mainly support <code>count()</code> and <code>index()</code>.</li>
          <li>✔ Dictionaries provide methods such as <code>keys()</code>, <code>values()</code>, <code>items()</code>, <code>get()</code>, <code>pop()</code>, and <code>update()</code>.</li>
          <li>✔ Sets support operations like <strong>union (<code>|</code>)</strong>, <strong>intersection (<code>&amp;</code>)</strong>, <strong>difference (<code>-</code>)</strong>, and <strong>symmetric difference (<code>^</code>)</strong>.</li>
          <li>✔ Built-in functions like <code>len()</code>, <code>sum()</code>, <code>max()</code>, <code>min()</code>, and <code>sorted()</code> work with many collection types.</li>
          <li>✔ Choosing the right collection type improves program performance, readability, and maintainability.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 6 | Lists, Tuples & Dictionaries</p>
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
    { id: 'py-w6-t2', title: 'Python Collections' },
    { id: 'py-w6-t3', title: 'Lists' },
    { id: 'py-w6-t4', title: 'List Methods' },
    { id: 'py-w6-t5', title: 'Tuple' },
    { id: 'py-w6-t6', title: 'Dictionary' },
    { id: 'py-w6-t7', title: 'Dictionary Methods' },
    { id: 'py-w6-t8', title: 'Set' },
    { id: 'py-w6-t9', title: 'Set Operations' },
    { id: 'py-w6-t10', title: 'Collection Functions' },
    { id: 'py-w6-t11', title: 'Mini Programs' },
    { id: 'py-w6-t12', title: 'Common Errors' },
    { id: 'py-w6-t13', title: 'Best Practices' },
    { id: 'py-w6-t14', title: 'Quick Revision' },
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

/* Operations Grid */
.operations-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.operation-box {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.operation-box h4 {
  margin-top: 0;
  margin-bottom: 8px;
  color: #2b6cb0;
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

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .method-box.full-width {
    grid-column: 1;
  }

  .operations-grid {
    grid-template-columns: 1fr;
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

  .method-box {
    padding: 12px;
  }

  .operation-box {
    padding: 12px;
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