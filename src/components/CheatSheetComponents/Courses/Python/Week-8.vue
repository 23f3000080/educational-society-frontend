<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>🚀 Week 8 – Capstone Project</h1>
    </header>

    <!-- Introduction -->
    <section id="py-w8-t2" class="section">
      <h2>Introduction to Python Projects</h2>
      <div class="content-card">
        <p>A <strong>Python Project</strong> is an application that combines multiple programming concepts to solve a real-world problem.</p>
        
        <h3>A project may include:</h3>
        <div class="concepts-grid">
          <span class="concept-tag">Variables</span>
          <span class="concept-tag">Operators</span>
          <span class="concept-tag">Conditional Statements</span>
          <span class="concept-tag">Loops</span>
          <span class="concept-tag">Functions</span>
          <span class="concept-tag">Strings</span>
          <span class="concept-tag">Lists</span>
          <span class="concept-tag">Dictionaries</span>
          <span class="concept-tag">File Handling</span>
          <span class="concept-tag">Exception Handling</span>
        </div>
      </div>
    </section>

    <!-- Software Development Process -->
    <section id="py-w8-t3" class="section">
      <h2>Software Development Process</h2>
      <div class="content-card">
        <p>A good project follows these stages:</p>
        <div class="development-flow">
          <div class="flow-step">Problem Identification</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Requirement Analysis</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Project Planning</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Program Design</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Coding</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Testing</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Debugging</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Deployment</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Maintenance</div>
        </div>
      </div>
    </section>

    <!-- Project Planning -->
    <section id="py-w8-t4" class="section">
      <h2>Step 1: Project Planning</h2>
      <div class="content-card">
        <p>Before writing code, answer these questions:</p>
        <ul class="planning-list">
          <li>❓ What problem will the project solve?</li>
          <li>❓ Who will use the application?</li>
          <li>❓ What inputs are required?</li>
          <li>❓ What output should be produced?</li>
          <li>❓ What features should be included?</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example: Student Management System</p>
          <p><strong>Requirements:</strong></p>
          <ul>
            <li>✅ Add Student</li>
            <li>✅ View Students</li>
            <li>✅ Search Student</li>
            <li>✅ Delete Student</li>
            <li>✅ Save Data to File</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Breaking into Modules -->
    <section id="py-w8-t5" class="section">
      <h2>Step 2: Break the Project into Modules</h2>
      <div class="content-card">
        <p>Instead of writing one large program, divide it into small functions.</p>
        
        <div class="module-example">
          <pre>Main Menu
   ↓
Add Student
View Student
Search Student
Delete Student
Save File
Exit</pre>
        </div>

        <h3>Step 3: Code Organization</h3>
        <p>Good projects organize code into reusable functions.</p>
        <pre><code>def add_student():
    pass

def view_students():
    pass

def delete_student():
    pass

def main():
    pass</code></pre>
      </div>
    </section>

    <!-- Main Function -->
    <section id="py-w8-t6" class="section">
      <h2>Main Function</h2>
      <div class="content-card">
        <p>Using a <code>main()</code> function keeps programs organized.</p>
        <pre><code>def main():
    print("Welcome to Student Management System")

main()</code></pre>

        <h3>Using Multiple Functions</h3>
        <pre><code>def greet():
    print("Welcome")

def menu():
    print("1. Start")
    print("2. Exit")

greet()
menu()</code></pre>

        <h3>Menu-Driven Program</h3>
        <pre><code>while True:
    print("\nMENU")
    print("1. Add")
    print("2. View")
    print("3. Exit")
    
    choice = input("Enter Choice: ")
    
    if choice == "1":
        print("Add Selected")
    elif choice == "2":
        print("View Selected")
    elif choice == "3":
        break
    else:
        print("Invalid Choice")</code></pre>
      </div>
    </section>

    <!-- Project Structure -->
    <section id="py-w8-t7" class="section">
      <h2>Project Structure</h2>
      <div class="content-card">
        <div class="example-box">
          <p><strong>Example folder structure:</strong></p>
          <pre>StudentManagement/
│
│── main.py
│── students.txt
│── utils.py
│── README.md</pre>
        </div>
        <p>For beginners, keeping everything in one file is acceptable. As projects grow, splitting code into multiple files improves maintainability.</p>
      </div>
    </section>

    <!-- Best Practices for Projects -->
    <section id="py-w8-t8" class="section">
      <h2>Best Practices for Projects</h2>
      <div class="content-card">
        <div class="practice-grid">
          <div class="practice-item">
            <h4>📝 Using Comments</h4>
            <pre><code># Add a new student
name = input("Enter Name: ")</code></pre>
          </div>

          <div class="practice-item">
            <h4>📝 Meaningful Variable Names</h4>
            <div class="practice-good">
              <p><strong>✅ Good</strong></p>
              <pre><code>student_name = "Rahul"
student_marks = 90</code></pre>
            </div>
            <div class="practice-bad">
              <p><strong>❌ Bad</strong></p>
              <pre><code>a = "Rahul"
b = 90</code></pre>
            </div>
          </div>

          <div class="practice-item full-width">
            <h4>📝 Input Validation</h4>
            <pre><code>age = int(input("Enter Age: "))
if age < 0:
    print("Invalid Age")</code></pre>
          </div>

          <div class="practice-item full-width">
            <h4>📝 Exception Handling</h4>
            <pre><code>try:
    marks = int(input("Enter Marks: "))
except ValueError:
    print("Invalid Input")</code></pre>
          </div>

          <div class="practice-item">
            <h4>📝 Saving Data to File</h4>
            <pre><code>with open("students.txt", "a") as file:
    file.write(name + "\n")</code></pre>
          </div>

          <div class="practice-item">
            <h4>📝 Reading Data from File</h4>
            <pre><code>with open("students.txt", "r") as file:
    for line in file:
        print(line.strip())</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Testing -->
    <section id="py-w8-t9" class="section">
      <h2>Testing</h2>
      <div class="content-card">
        <p>Testing checks whether the program works correctly.</p>
        
        <h3>Test different cases such as:</h3>
        <ul class="test-cases">
          <li>✅ Normal Input</li>
          <li>✅ Empty Input</li>
          <li>✅ Invalid Input</li>
          <li>✅ Large Numbers</li>
          <li>✅ Negative Values</li>
          <li>✅ Special Characters</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>number = int(input("Enter Number: "))
print(number * 2)</code></pre>
          <p><strong>Test With:</strong></p>
          <pre>10
0
-5
abc
999999</pre>
        </div>
      </div>
    </section>

    <!-- Types of Errors -->
    <section id="py-w8-t10" class="section">
      <h2>Types of Errors</h2>
      <div class="content-card">
        <div class="error-types">
          <div class="error-type">
            <h4>Syntax Error</h4>
            <pre><code>if True
    print("Hello")</code></pre>
          </div>

          <div class="error-type">
            <h4>Runtime Error</h4>
            <pre><code>print(10 / 0)</code></pre>
          </div>

          <div class="error-type full-width">
            <h4>Logical Error</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>length = 5
width = 10
area = length + width  # Should be *</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>area = length * width</code></pre>
            </div>
          </div>
        </div>

        <h3>Debugging</h3>
        <p>Debugging means finding and fixing errors.</p>
        <ul class="debugging-tips">
          <li>🔍 Read error messages carefully.</li>
          <li>🔍 Use <code>print()</code> statements to inspect variables.</li>
          <li>🔍 Test one feature at a time.</li>
          <li>🔍 Fix one error before moving to the next.</li>
        </ul>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="py-w8-t11" class="section">
      <h2>Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Use meaningful variable names.</li>
          <li>📌 Keep functions small.</li>
          <li>📌 Avoid repeating code.</li>
          <li>📌 Write comments when necessary.</li>
          <li>📌 Handle exceptions properly.</li>
          <li>📌 Use consistent indentation (4 spaces).</li>
          <li>📌 Test every feature before adding a new one.</li>
          <li>📌 Save work regularly.</li>
          <li>📌 Follow the PEP 8 style guide for Python code.</li>
        </ul>
      </div>
    </section>

    <!-- Sample Final Project -->
    <section id="py-w8-t12" class="section">
      <h2>Sample Final Project</h2>
      <div class="content-card">
        <div class="project-details">
          <h3>📋 Student Management System</h3>
          
          <h4>Features</h4>
          <ul>
            <li>✅ Add Student</li>
            <li>✅ View Students</li>
            <li>✅ Search Student</li>
            <li>✅ Delete Student</li>
            <li>✅ Save Data to File</li>
            <li>✅ Read Data from File</li>
            <li>✅ Input Validation</li>
            <li>✅ Error Handling</li>
            <li>✅ Menu-Driven Interface</li>
          </ul>

          <h4>Concepts Used</h4>
          <div class="concepts-grid">
            <span class="concept-tag">Variables</span>
            <span class="concept-tag">Operators</span>
            <span class="concept-tag">Conditional Statements</span>
            <span class="concept-tag">Loops</span>
            <span class="concept-tag">Functions</span>
            <span class="concept-tag">Lists</span>
            <span class="concept-tag">Dictionaries</span>
            <span class="concept-tag">Strings</span>
            <span class="concept-tag">File Handling</span>
            <span class="concept-tag">Exception Handling</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Ideas -->
    <section id="py-w8-t13" class="section">
      <h2>🌟 Project Ideas for Python Course</h2>
      <div class="content-card">
        <p>Here are 5 project ideas to apply all the concepts you've learned:</p>

        <div class="project-ideas">
          <div class="project-card">
            <h4>📚 1. Library Management System</h4>
            <div class="project-description">
              <p><strong>Description:</strong> Create a system to manage books in a library. Users can add, view, search, and delete books. Each book should have details like title, author, ISBN, and availability status.</p>
              <div class="project-skills">
                <span class="skill-tag">Dictionaries</span>
                <span class="skill-tag">File Handling</span>
                <span class="skill-tag">Functions</span>
                <span class="skill-tag">Exception Handling</span>
              </div>
              <div class="project-features">
                <p><strong>Key Features:</strong></p>
                <ul>
                  <li>Add new books with details</li>
                  <li>View all available books</li>
                  <li>Search books by title or author</li>
                  <li>Borrow and return books</li>
                  <li>Save and load data from files</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="project-card">
            <h4>💰 2. Personal Expense Tracker</h4>
            <div class="project-description">
              <p><strong>Description:</strong> Build an application to track daily expenses. Users can add expenses, view spending history, and see summaries by category.</p>
              <div class="project-skills">
                <span class="skill-tag">Lists</span>
                <span class="skill-tag">CSV Files</span>
                <span class="skill-tag">Functions</span>
                <span class="skill-tag">Loops</span>
              </div>
              <div class="project-features">
                <p><strong>Key Features:</strong></p>
                <ul>
                  <li>Add expenses with category and amount</li>
                  <li>View expense history</li>
                  <li>Calculate total and category-wise spending</li>
                  <li>Export data to CSV files</li>
                  <li>Monthly summary reports</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="project-card">
            <h4>📞 3. Contact Book Application</h4>
            <div class="project-description">
              <p><strong>Description:</strong> Create a digital contact book to store and manage contact information including names, phone numbers, and email addresses.</p>
              <div class="project-skills">
                <span class="skill-tag">Dictionaries</span>
                <span class="skill-tag">JSON</span>
                <span class="skill-tag">Functions</span>
                <span class="skill-tag">String Methods</span>
              </div>
              <div class="project-features">
                <p><strong>Key Features:</strong></p>
                <ul>
                  <li>Add new contacts with multiple fields</li>
                  <li>Search contacts by name</li>
                  <li>Update and delete contacts</li>
                  <li>Display all contacts sorted alphabetically</li>
                  <li>Save to JSON file</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="project-card">
            <h4>🎯 4. Quiz Application</h4>
            <div class="project-description">
              <p><strong>Description:</strong> Develop an interactive quiz application that presents multiple-choice questions, tracks scores, and provides feedback.</p>
              <div class="project-skills">
                <span class="skill-tag">Dictionaries</span>
                <span class="skill-tag">Loops</span>
                <span class="skill-tag">Conditional Statements</span>
                <span class="skill-tag">Functions</span>
              </div>
              <div class="project-features">
                <p><strong>Key Features:</strong></p>
                <ul>
                  <li>Store questions and answers in a dictionary</li>
                  <li>Randomize question order</li>
                  <li>Track and display scores</li>
                  <li>Show correct answers after each question</li>
                  <li>Multiple difficulty levels</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="project-card">
            <h4>🏦 5. Banking System (Simple)</h4>
            <div class="project-description">
              <p><strong>Description:</strong> Build a simple banking system where users can create accounts, deposit, withdraw money, and check balances.</p>
              <div class="project-skills">
                <span class="skill-tag">Dictionaries</span>
                <span class="skill-tag">File Handling</span>
                <span class="skill-tag">Exception Handling</span>
                <span class="skill-tag">Functions</span>
              </div>
              <div class="project-features">
                <p><strong>Key Features:</strong></p>
                <ul>
                  <li>Create new accounts with unique ID</li>
                  <li>Deposit and withdraw money with validation</li>
                  <li>Check account balance</li>
                  <li>View transaction history</li>
                  <li>Save account data persistently</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final Project Checklist -->
    <section id="py-w8-t14" class="section">
      <h2>Final Project Checklist</h2>
      <div class="content-card">
        <p>Before submitting your project, ensure that:</p>
        <ul class="checklist">
          <li>✅ The program runs without syntax errors.</li>
          <li>✅ All features work correctly.</li>
          <li>✅ Invalid user input is handled gracefully.</li>
          <li>✅ Files are opened using the <code>with</code> statement.</li>
          <li>✅ Functions are used to organize the code.</li>
          <li>✅ Variable names are meaningful.</li>
          <li>✅ The code is properly indented.</li>
          <li>✅ Comments are included where needed.</li>
          <li>✅ Unused code has been removed.</li>
          <li>✅ The program has been tested with different inputs.</li>
        </ul>
      </div>
    </section>

    <!-- Common Mistakes -->
    <section id="py-w8-t15" class="section">
      <h2>Common Mistakes</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box full-width">
            <h4>❌ Writing Everything in One Function</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>def program():
    # Hundreds of lines of code</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Better</p>
              <pre><code>def add_student():
    pass

def search_student():
    pass

def delete_student():
    pass</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Not Handling Exceptions</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>age = int(input())</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>try:
    age = int(input())
except ValueError:
    print("Invalid Input")</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Forgetting to Save Data</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>students.append(name)</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Better</p>
              <pre><code>with open("students.txt", "a") as file:
    file.write(name + "\n")</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Real-World Projects -->
    <section id="py-w8-t16" class="section">
      <h2>Real-World Python Projects</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Concepts Used</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Student Management System</td><td>Functions, Lists, Files</td></tr>
              <tr><td>Library Management System</td><td>Dictionaries, Files</td></tr>
              <tr><td>Banking System</td><td>Functions, Loops, Exception Handling</td></tr>
              <tr><td>Contact Book</td><td>Dictionaries, Functions</td></tr>
              <tr><td>Expense Tracker</td><td>Lists, File Handling</td></tr>
              <tr><td>Quiz Application</td><td>Loops, Functions, Dictionaries</td></tr>
              <tr><td>Calculator</td><td>Functions, Operators</td></tr>
              <tr><td>Attendance System</td><td>Files, Dictionaries</td></tr>
              <tr><td>Inventory Management</td><td>Lists, Dictionaries</td></tr>
              <tr><td>Password Manager (Basic)</td><td>Strings, Files</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Quick Revision -->
    <section id="py-w8-t17" class="section revision-section">
      <h2>🚀 Quick Revision</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ A project combines multiple Python concepts to solve a real-world problem.</li>
          <li>✔ Plan the project before writing code.</li>
          <li>✔ Break large programs into small, reusable functions.</li>
          <li>✔ Organize code with a clear structure and meaningful names.</li>
          <li>✔ Validate user input and handle exceptions to make programs robust.</li>
          <li>✔ Use files to save and retrieve data permanently.</li>
          <li>✔ Test programs with valid, invalid, and edge-case inputs.</li>
          <li>✔ Debug by reading error messages and checking variable values.</li>
          <li>✔ Follow coding best practices such as proper indentation, comments, and code reuse.</li>
          <li>✔ Completing a real-world project is the best way to strengthen your Python programming skills and prepare for more advanced topics.</li>
        </ul>
      </div>
    </section>

    <!-- Next Course Section -->
    <section class="section next-course-section" id="next-dsa">
    <div class="content-card next-course-card">
        <div class="next-course-content">
        <div class="next-course-icon">📊</div>
        <div class="next-course-text">
            <h2>🎯 What's Next? – Data Structures & Algorithms (DSA) in Python</h2>
            <p class="next-course-description">
            Congratulations on completing the Python Basics course! 🎉 You've built a strong foundation in Python programming. 
            Now it's time to take your skills to the next level with <strong>Data Structures & Algorithms (DSA)</strong>.
            </p>
            <div class="next-course-topics">
            <div class="topic-item">
                <span class="topic-icon">📚</span>
                <div>
                <h4>Advanced Data Structures</h4>
                <p>Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables</p>
                </div>
            </div>
            <div class="topic-item">
                <span class="topic-icon">⚡</span>
                <div>
                <h4>Algorithms</h4>
                <p>Sorting, Searching, Recursion, Dynamic Programming, Greedy Algorithms</p>
                </div>
            </div>
            <div class="topic-item">
                <span class="topic-icon">🧠</span>
                <div>
                <h4>Problem Solving</h4>
                <p>LeetCode, HackerRank, CodeChef, Competitive Programming</p>
                </div>
            </div>
            <div class="topic-item">
                <span class="topic-icon">💡</span>
                <div>
                <h4>Complexity Analysis</h4>
                <p>Time Complexity, Space Complexity, Big O Notation</p>
                </div>
            </div>
            </div>
            <div class="next-course-cta">
            <p class="cta-text">🚀 Ready to become a problem-solving expert?</p>
            <p class="cta-subtext">DSA is the key to cracking coding interviews and building efficient applications!</p>
            </div>
        </div>
        </div>
    </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>🐍 Python Cheat Sheet - Week 8 | Capstone Project</p>
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
    { id: 'py-w8-t2', title: 'Introduction to Python Projects' },
    { id: 'py-w8-t3', title: 'Software Development Process' },
    { id: 'py-w8-t4', title: 'Project Planning' },
    { id: 'py-w8-t5', title: 'Breaking into Modules' },
    { id: 'py-w8-t6', title: 'Main Function' },
    { id: 'py-w8-t7', title: 'Project Structure' },
    { id: 'py-w8-t8', title: 'Best Practices for Projects' },
    { id: 'py-w8-t9', title: 'Testing' },
    { id: 'py-w8-t10', title: 'Types of Errors' },
    { id: 'py-w8-t11', title: 'Best Practices' },
    { id: 'py-w8-t12', title: 'Sample Final Project' },
    { id: 'py-w8-t13', title: 'Project Ideas' },
    { id: 'py-w8-t14', title: 'Final Project Checklist' },
    { id: 'py-w8-t15', title: 'Common Mistakes' },
    { id: 'py-w8-t16', title: 'Real-World Python Projects' },
    { id: 'py-w8-t17', title: 'Quick Revision' },
    { id: 'next-dsa', title: "What's Next?" },
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

.content-card h4 {
  color: #2d3748;
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 1.1em;
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

/* Concepts Grid */
.concepts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}

.concept-tag {
  background: #ebf8ff;
  color: #2b6cb0;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9em;
  border: 1px solid #bee3f8;
}

/* Development Flow */
.development-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px 0;
}

.flow-step {
  background: white;
  padding: 8px 20px;
  border-radius: 6px;
  border: 2px solid #306998;
  font-weight: 500;
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.flow-arrow {
  font-size: 1.5em;
  color: #306998;
}

/* Planning List */
.planning-list {
  list-style: none;
  padding: 0;
}

.planning-list li {
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
  margin: 6px 0;
}

/* Module Example */
.module-example {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.95em;
  margin: 10px 0;
  overflow-x: auto;
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

/* Practice Grid */
.practice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.practice-item {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.practice-item.full-width {
  grid-column: 1 / -1;
}

.practice-item h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2b6cb0;
}

.practice-good {
  background: #f0fff4;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  border-left: 3px solid #38a169;
}

.practice-bad {
  background: #fff5f5;
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid #e53e3e;
}

/* Test Cases */
.test-cases {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

.test-cases li {
  padding: 6px 12px;
  background: #edf2f7;
  border-radius: 6px;
  text-align: center;
}

/* Error Types */
.error-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.error-type {
  background: #fff5f5;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #feb2b2;
}

.error-type.full-width {
  grid-column: 1 / -1;
}

.error-type h4 {
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

/* Debugging Tips */
.debugging-tips {
  list-style: none;
  padding: 0;
}

.debugging-tips li {
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
  margin: 6px 0;
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

/* Project Details */
.project-details {
  padding: 10px 0;
}

.project-details ul {
  padding-left: 20px;
  line-height: 1.8;
}

/* Project Ideas */
.project-ideas {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.project-card {
  background: #f7fafc;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.project-card h4 {
  margin-top: 0;
  color: #2b6cb0;
  font-size: 1.2em;
}

.project-description {
  margin: 10px 0;
}

.project-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0;
}

.skill-tag {
  background: #ebf8ff;
  color: #2b6cb0;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85em;
  border: 1px solid #bee3f8;
}

.project-features {
  margin-top: 10px;
}

.project-features ul {
  padding-left: 20px;
  line-height: 1.8;
}

/* Checklist */
.checklist {
  list-style: none;
  padding: 0;
}

.checklist li {
  padding: 8px 12px;
  background: #f0fff4;
  border-radius: 6px;
  margin: 6px 0;
  border-left: 3px solid #38a169;
}

.checklist code {
  background: #edf2f7;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
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

  .practice-grid {
    grid-template-columns: 1fr;
  }

  .practice-item.full-width {
    grid-column: 1;
  }

  .error-types {
    grid-template-columns: 1fr;
  }

  .error-type.full-width {
    grid-column: 1;
  }

  .mistakes-grid {
    grid-template-columns: 1fr;
  }

  .mistake-box.full-width {
    grid-column: 1;
  }

  .test-cases {
    grid-template-columns: 1fr 1fr;
  }

  .project-card {
    padding: 15px;
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

  .module-example {
    font-size: 0.85em;
    padding: 12px;
  }

  .development-flow {
    padding: 10px;
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

  .test-cases {
    grid-template-columns: 1fr;
  }

  .project-card {
    padding: 12px;
  }

  .mistake-box {
    padding: 12px;
  }

  .revision-list li {
    font-size: 0.95em;
  }

  .flow-step {
    font-size: 0.9em;
    padding: 6px 14px;
  }

  .concept-tag {
    font-size: 0.8em;
    padding: 4px 10px;
  }

  .skill-tag {
    font-size: 0.75em;
    padding: 3px 10px;
  }
}

.next-course-section {
  margin-top: 40px;
}

.next-course-card {
  background: linear-gradient(135deg, #f7fafc 0%, #e8f0fe 100%);
  border: 2px solid #4299e1;
  border-radius: 12px;
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.next-course-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(66, 153, 225, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.next-course-content {
  display: flex;
  gap: 25px;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.next-course-icon {
  font-size: 4em;
  flex-shrink: 0;
  animation: pulse-icon 2s ease-in-out infinite;
}

@keyframes pulse-icon {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.next-course-text {
  flex: 1;
}

.next-course-text h2 {
  color: #2b6cb0;
  border-bottom: none;
  padding-bottom: 0;
  margin-top: 0;
  font-size: 1.8em;
}

.next-course-description {
  font-size: 1.1em;
  color: #2d3748;
  margin: 10px 0 20px 0;
  line-height: 1.7;
}

.next-course-description strong {
  color: #2b6cb0;
}

.next-course-topics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}

.topic-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.topic-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.15);
  border-color: #bee3f8;
}

.topic-icon {
  font-size: 1.8em;
  flex-shrink: 0;
}

.topic-item h4 {
  margin: 0 0 4px 0;
  color: #2b6cb0;
  font-size: 1.05em;
}

.topic-item p {
  margin: 0;
  color: #4a5568;
  font-size: 0.95em;
  line-height: 1.4;
}

.next-course-cta {
  margin-top: 20px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #2b6cb0, #3182ce);
  border-radius: 8px;
  text-align: center;
}

.cta-text {
  font-size: 1.2em;
  font-weight: 600;
  color: white;
  margin: 0;
}

.cta-subtext {
  color: #bee3f8;
  margin: 5px 0 0 0;
  font-size: 0.95em;
}

/* Responsive */
@media (max-width: 768px) {
  .next-course-card {
    padding: 20px;
  }

  .next-course-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .next-course-icon {
    font-size: 3em;
  }

  .next-course-text h2 {
    font-size: 1.4em;
  }

  .next-course-topics {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .topic-item {
    padding: 12px;
  }

  .topic-item h4 {
    font-size: 1em;
  }

  .topic-item p {
    font-size: 0.9em;
  }

  .cta-text {
    font-size: 1.1em;
  }

  .cta-subtext {
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .next-course-card {
    padding: 15px;
  }

  .next-course-icon {
    font-size: 2.5em;
  }

  .next-course-text h2 {
    font-size: 1.2em;
  }

  .next-course-description {
    font-size: 1em;
  }

  .topic-item {
    padding: 10px;
    gap: 10px;
  }

  .topic-icon {
    font-size: 1.5em;
  }

  .cta-text {
    font-size: 1em;
  }
}
</style>