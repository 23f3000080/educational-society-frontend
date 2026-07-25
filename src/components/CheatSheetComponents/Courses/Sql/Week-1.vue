<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📘 Introduction to Databases & SQL Fundamentals</h1>
      <p class="subtitle-small">Quick Revision Notes – Perfect for beginners and interview preparation.</p>
    </header>

    <!-- What is a Database -->
    <section id="sql-w1-t1" class="section">
      <h2>1. What is a Database?</h2>
      <div class="content-card">
        <p>A <strong>Database</strong> is an organized collection of data that allows users to <strong>store, retrieve, update, and manage information efficiently</strong>.</p>
        
        <div class="example-box">
          <p class="example-title">Example</p>
          <p>Instead of saving student records in Excel files, a school stores them in a database.</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student_ID</th>
                  <th>Name</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>101</td><td>Ankit</td><td>Python</td></tr>
                <tr><td>102</td><td>Rahul</td><td>SQL</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3>Why Use Databases?</h3>
        <ul class="feature-list">
          <li>✅ Store large amounts of data</li>
          <li>✅ Fast searching</li>
          <li>✅ Data security</li>
          <li>✅ Data consistency</li>
          <li>✅ Multiple users can access simultaneously</li>
          <li>✅ Backup & Recovery</li>
        </ul>
      </div>
    </section>

    <!-- Types of Databases -->
    <section id="sql-w1-t2" class="section">
      <h2>2. Types of Databases</h2>
      <div class="content-card">
        <h3>1. Relational Database (RDBMS)</h3>
        <p>Stores data in <strong>tables</strong> consisting of rows and columns.</p>
        <p><strong>Examples:</strong></p>
        <ul class="example-list">
          <li>MySQL</li>
          <li>PostgreSQL</li>
          <li>Oracle</li>
          <li>SQL Server</li>
          <li>SQLite</li>
        </ul>
        
        <div class="example-box">
          <p class="example-title">Example Table: Students</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Course</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Ankit</td><td>Python</td></tr>
                <tr><td>2</td><td>Rahul</td><td>SQL</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3>2. NoSQL Database</h3>
        <p>Stores data as:</p>
        <ul class="example-list">
          <li>Documents</li>
          <li>Key-Value</li>
          <li>Graph</li>
          <li>Column-based</li>
        </ul>
        <p><strong>Examples:</strong></p>
        <ul class="example-list">
          <li>MongoDB</li>
          <li>Cassandra</li>
          <li>Redis</li>
          <li>Firebase</li>
        </ul>
      </div>
    </section>

    <!-- What is SQL -->
    <section id="sql-w1-t3" class="section">
      <h2>3. What is SQL?</h2>
      <div class="content-card">
        <p><strong>SQL (Structured Query Language)</strong> is the standard language used to communicate with relational databases.</p>
        
        <h3>SQL is used to:</h3>
        <ul class="feature-list">
          <li>✅ Create databases</li>
          <li>✅ Create tables</li>
          <li>✅ Insert data</li>
          <li>✅ Retrieve data</li>
          <li>✅ Update records</li>
          <li>✅ Delete records</li>
          <li>✅ Manage permissions</li>
        </ul>
      </div>
    </section>

    <!-- SQL Categories -->
    <section id="sql-w1-t4" class="section">
      <h2>4. SQL Categories</h2>
      <div class="content-card">
        <div class="category-grid">
          <div class="category-box ddl">
            <h4>DDL (Data Definition Language)</h4>
            <p>Used to define database structure.</p>
            <div class="commands">
              <span class="cmd">CREATE</span>
              <span class="cmd">ALTER</span>
              <span class="cmd">DROP</span>
              <span class="cmd">TRUNCATE</span>
              <span class="cmd">RENAME</span>
            </div>
          </div>

          <div class="category-box dml">
            <h4>DML (Data Manipulation Language)</h4>
            <p>Used to manipulate data.</p>
            <div class="commands">
              <span class="cmd">INSERT</span>
              <span class="cmd">UPDATE</span>
              <span class="cmd">DELETE</span>
            </div>
          </div>

          <div class="category-box dql">
            <h4>DQL (Data Query Language)</h4>
            <p>Retrieve data.</p>
            <div class="commands">
              <span class="cmd">SELECT</span>
            </div>
          </div>

          <div class="category-box dcl">
            <h4>DCL (Data Control Language)</h4>
            <p>Controls permissions.</p>
            <div class="commands">
              <span class="cmd">GRANT</span>
              <span class="cmd">REVOKE</span>
            </div>
          </div>

          <div class="category-box tcl">
            <h4>TCL (Transaction Control Language)</h4>
            <p>Manages transactions.</p>
            <div class="commands">
              <span class="cmd">COMMIT</span>
              <span class="cmd">ROLLBACK</span>
              <span class="cmd">SAVEPOINT</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Relational Database Concepts -->
    <section id="sql-w1-t5" class="section">
      <h2>5. Relational Database Concepts</h2>
      <div class="content-card">
        <p>A Relational Database stores data in <strong>tables</strong>.</p>

        <div class="example-box">
          <p class="example-title">Students Table</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th><th>Course</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Ankit</td><td>SQL</td></tr>
                <tr><td>2</td><td>Rahul</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="example-box">
          <p class="example-title">Courses Table</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>CourseID</th><th>CourseName</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>SQL</td></tr>
                <tr><td>102</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3>Row (Record)</h3>
        <p>Each horizontal entry.</p>
        <div class="example-box"><pre>1 | Ankit | SQL</pre></div>

        <h3>Column (Field)</h3>
        <p>Vertical information.</p>
        <ul class="example-list">
          <li>StudentID</li>
          <li>Name</li>
          <li>Course</li>
        </ul>

        <h3>Table</h3>
        <p>Collection of rows and columns.</p>

        <h3>Schema</h3>
        <p>Blueprint of the database.</p>
        <p>Contains:</p>
        <ul class="example-list">
          <li>Tables</li>
          <li>Relationships</li>
          <li>Constraints</li>
        </ul>
      </div>
    </section>

    <!-- Primary Key -->
    <section id="sql-w1-t6" class="section">
      <h2>6. Primary Key</h2>
      <div class="content-card">
        <p>A <strong>Primary Key</strong> uniquely identifies each row.</p>

        <div class="example-box">
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>ID</th><th>Name</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Ankit</td></tr>
                <tr><td>2</td><td>Rahul</td></tr>
              </tbody>
            </table>
          </div>
          <p>Here, <code>ID</code> is the Primary Key.</p>
        </div>

        <h3>Rules</h3>
        <ul class="feature-list">
          <li>✅ Unique</li>
          <li>✅ Cannot be NULL</li>
          <li>✅ One Primary Key per table</li>
        </ul>
      </div>
    </section>

    <!-- Foreign Key -->
    <section id="sql-w1-t7" class="section">
      <h2>7. Foreign Key</h2>
      <div class="content-card">
        <p>A <strong>Foreign Key</strong> connects two tables.</p>

        <div class="example-box">
          <p class="example-title">Students</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>CourseID</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>101</td></tr>
                <tr><td>2</td><td>102</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="example-box">
          <p class="example-title">Courses</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>CourseID</th><th>CourseName</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>SQL</td></tr>
                <tr><td>102</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
          <p><code>CourseID</code> is Foreign Key in Students table.</p>
        </div>
      </div>
    </section>

    <!-- SQL Naming Rules -->
    <section id="sql-w1-t8" class="section">
      <h2>8. SQL Naming Rules</h2>
      <div class="content-card">
        <div class="example-box correct">
          <p><strong>✅ Good Practice</strong></p>
          <pre>student_name
employee_salary
course_id</pre>
        </div>

        <div class="example-box incorrect">
          <p><strong>❌ Avoid</strong></p>
          <pre>Student Name
123table
@salary</pre>
        </div>
      </div>
    </section>

    <!-- SQL Data Types -->
    <section id="sql-w1-t9" class="section">
      <h2>9. SQL Data Types</h2>
      <div class="content-card">
        <h3>Numeric</h3>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead><tr><th>Datatype</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>INT</td><td>Whole Numbers</td></tr>
              <tr><td>BIGINT</td><td>Large Integers</td></tr>
              <tr><td>SMALLINT</td><td>Small Integers</td></tr>
              <tr><td>FLOAT</td><td>Floating Numbers</td></tr>
              <tr><td>DOUBLE</td><td>Double Precision</td></tr>
              <tr><td>DECIMAL(p,s)</td><td>Fixed Decimal</td></tr>
            </tbody>
          </table>
        </div>
        <div class="example-box"><pre>salary DECIMAL(10,2)</pre></div>

        <h3>Character Types</h3>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead><tr><th>Datatype</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td>CHAR(n)</td><td>Fixed Length</td></tr>
              <tr><td>VARCHAR(n)</td><td>Variable Length</td></tr>
              <tr><td>TEXT</td><td>Large Text</td></tr>
            </tbody>
          </table>
        </div>
        <div class="example-box"><pre>name VARCHAR(100)</pre></div>

        <h3>Date & Time</h3>
        <div class="table-responsive">
          <table class="symbol-table">
            <thead><tr><th>Datatype</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td>DATE</td><td>YYYY-MM-DD</td></tr>
              <tr><td>TIME</td><td>HH:MM:SS</td></tr>
              <tr><td>DATETIME</td><td>Date + Time</td></tr>
              <tr><td>TIMESTAMP</td><td>Current Timestamp</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Boolean</h3>
        <pre><code>BOOLEAN</code></pre>
        <p>Values: <code>TRUE</code>, <code>FALSE</code></p>
      </div>
    </section>

    <!-- SQL Syntax -->
    <section id="sql-w1-t10" class="section">
      <h2>10. SQL Syntax Basics</h2>
      <div class="content-card">
        <p>SQL is <strong>not case-sensitive</strong>, but keywords are commonly written in uppercase.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT * FROM students;</code></pre>
          <p><strong>Equivalent</strong></p>
          <pre><code>select * from students;</code></pre>
        </div>

        <h3>SQL Statement Rules</h3>
        <p>Every statement usually ends with <code>;</code></p>
        <div class="example-box"><pre><code>SELECT * FROM students;</code></pre></div>

        <h3>Comments in SQL</h3>
        <p><strong>Single Line</strong></p>
        <pre><code>-- This is a comment</code></pre>
        <p><strong>Multi-line</strong></p>
        <pre><code>/*
Multiple
Line
Comment
*/</code></pre>
      </div>
    </section>

    <!-- SELECT Statement -->
    <section id="sql-w1-t11" class="section">
      <h2>11. SELECT Statement</h2>
      <div class="content-card">
        <p>Retrieve data from a table.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT column_name
FROM table_name;</code></pre>
        </div>

        <h3>Select All Columns</h3>
        <pre><code>SELECT *
FROM students;</code></pre>

        <h3>Select Specific Columns</h3>
        <pre><code>SELECT name, age
FROM students;</code></pre>

        <h3>Rename Columns (Alias)</h3>
        <pre><code>SELECT name AS Student_Name
FROM students;</code></pre>
        <div class="example-box">
          <p><strong>Output</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Student_Name</th></tr></thead>
              <tbody><tr><td>Ankit</td></tr></tbody>
            </table>
          </div>
        </div>

        <h3>Mathematical Operations</h3>
        <pre><code>SELECT salary + 5000
FROM employees;</code></pre>

        <h3>DISTINCT</h3>
        <p>Removes duplicate values.</p>
        <pre><code>SELECT DISTINCT city
FROM students;</code></pre>
        <div class="example-box">
          <p><strong>Output</strong></p>
          <pre>Delhi
Mumbai
Patna</pre>
        </div>
      </div>
    </section>

    <!-- WHERE Clause -->
    <section id="sql-w1-t12" class="section">
      <h2>12. WHERE Clause</h2>
      <div class="content-card">
        <p>Filters records.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT *
FROM students
WHERE condition;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE age > 18;</code></pre>
        </div>
      </div>
    </section>

    <!-- Comparison Operators -->
    <section id="sql-w1-t13" class="section">
      <h2>13. Comparison Operators</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td>=</td><td>Equal</td></tr>
              <tr><td>!=</td><td>Not Equal</td></tr>
              <tr><td>&lt;&gt;</td><td>Not Equal</td></tr>
              <tr><td>&gt;</td><td>Greater Than</td></tr>
              <tr><td>&lt;</td><td>Less Than</td></tr>
              <tr><td>&gt;=</td><td>Greater Than Equal</td></tr>
              <tr><td>&lt;=</td><td>Less Than Equal</td></tr>
            </tbody>
          </table>
        </div>
        <div class="example-box">
          <pre><code>SELECT *
FROM employees
WHERE salary >= 50000;</code></pre>
        </div>
      </div>
    </section>

    <!-- Logical Operators -->
    <section id="sql-w1-t14" class="section">
      <h2>14. Logical Operators</h2>
      <div class="content-card">
        <h3>AND</h3>
        <p>Both conditions true.</p>
        <pre><code>SELECT *
FROM students
WHERE age > 18
AND city='Patna';</code></pre>

        <h3>OR</h3>
        <p>Either condition true.</p>
        <pre><code>SELECT *
FROM students
WHERE city='Delhi'
OR city='Mumbai';</code></pre>

        <h3>NOT</h3>
        <p>Reverse condition.</p>
        <pre><code>SELECT *
FROM students
WHERE NOT city='Delhi';</code></pre>
      </div>
    </section>

    <!-- IN Operator -->
    <section id="sql-w1-t15" class="section">
      <h2>15. IN Operator</h2>
      <div class="content-card">
        <p>Checks multiple values.</p>
        <pre><code>SELECT *
FROM students
WHERE city IN ('Delhi','Patna');</code></pre>
      </div>
    </section>

    <!-- BETWEEN Operator -->
    <section id="sql-w1-t16" class="section">
      <h2>16. BETWEEN Operator</h2>
      <div class="content-card">
        <p>Range selection.</p>
        <pre><code>SELECT *
FROM employees
WHERE salary BETWEEN 30000 AND 70000;</code></pre>
      </div>
    </section>

    <!-- LIKE Operator -->
    <section id="sql-w1-t17" class="section">
      <h2>17. LIKE Operator</h2>
      <div class="content-card">
        <p>Pattern matching.</p>

        <h3>Starts With</h3>
        <pre><code>SELECT *
FROM students
WHERE name LIKE 'A%';</code></pre>

        <h3>Ends With</h3>
        <pre><code>SELECT *
FROM students
WHERE name LIKE '%t';</code></pre>

        <h3>Contains</h3>
        <pre><code>SELECT *
FROM students
WHERE name LIKE '%ank%';</code></pre>

        <h3>Single Character</h3>
        <pre><code>SELECT *
FROM students
WHERE name LIKE '_mit';</code></pre>
      </div>
    </section>

    <!-- IS NULL / IS NOT NULL -->
    <section id="sql-w1-t18" class="section">
      <h2>18-19. IS NULL / IS NOT NULL</h2>
      <div class="content-card">
        <h3>IS NULL</h3>
        <p>Find missing values.</p>
        <pre><code>SELECT *
FROM students
WHERE phone IS NULL;</code></pre>

        <h3>IS NOT NULL</h3>
        <pre><code>SELECT *
FROM students
WHERE phone IS NOT NULL;</code></pre>
      </div>
    </section>

    <!-- SQL Query Execution Flow -->
    <section id="sql-w1-t19" class="section">
      <h2>20. Order of SQL Query Execution</h2>
      <div class="content-card">
        <p>Although we write:</p>
        <pre><code>SELECT
FROM
WHERE;</code></pre>
        <p>The database internally processes it as:</p>
        <div class="execution-flow">
          <div class="exec-step">FROM</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">WHERE</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">SELECT</div>
        </div>
        <p>This helps understand how SQL evaluates queries.</p>
      </div>
    </section>

    <!-- Common SQL Keywords -->
    <section id="sql-w1-t20" class="section">
      <h2>21. Common SQL Keywords</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead><tr><th>Keyword</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td>SELECT</td><td>Retrieve data</td></tr>
              <tr><td>FROM</td><td>Specify table</td></tr>
              <tr><td>WHERE</td><td>Filter rows</td></tr>
              <tr><td>DISTINCT</td><td>Remove duplicates</td></tr>
              <tr><td>AS</td><td>Rename column</td></tr>
              <tr><td>AND</td><td>Both conditions</td></tr>
              <tr><td>OR</td><td>Any condition</td></tr>
              <tr><td>NOT</td><td>Negate condition</td></tr>
              <tr><td>IN</td><td>Match multiple values</td></tr>
              <tr><td>BETWEEN</td><td>Range filter</td></tr>
              <tr><td>LIKE</td><td>Pattern matching</td></tr>
              <tr><td>IS NULL</td><td>Find NULL values</td></tr>
              <tr><td>IS NOT NULL</td><td>Exclude NULL values</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w1-t21" class="section revision-section">
      <h2>22. Week 1 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Database stores organized data.</li>
          <li>✔ RDBMS stores data in related tables.</li>
          <li>✔ SQL is used to interact with databases.</li>
          <li>✔ Tables contain rows (records) and columns (fields).</li>
          <li>✔ Primary Keys uniquely identify rows.</li>
          <li>✔ Foreign Keys create relationships between tables.</li>
          <li>✔ Common SQL data types include <code>INT</code>, <code>VARCHAR</code>, <code>DATE</code>, and <code>BOOLEAN</code>.</li>
          <li>✔ <code>SELECT</code> retrieves data from tables.</li>
          <li>✔ <code>WHERE</code> filters records based on conditions.</li>
          <li>✔ Operators like <code>AND</code>, <code>OR</code>, <code>IN</code>, <code>BETWEEN</code>, <code>LIKE</code>, and <code>IS NULL</code> make filtering more powerful.</li>
          <li>✔ Use <code>DISTINCT</code> to remove duplicate values and <code>AS</code> to create readable column aliases.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w1-t22" class="section">
      <h2>🧠 Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 Always end SQL statements with <code>;</code>.</li>
          <li>💡 Remember the difference between <code>CHAR</code> (fixed length) and <code>VARCHAR</code> (variable length).</li>
          <li>💡 <code>PRIMARY KEY</code> = Unique + Not NULL.</li>
          <li>💡 <code>FOREIGN KEY</code> links tables together.</li>
          <li>💡 <code>SELECT *</code> returns all columns, while selecting specific columns improves readability and performance.</li>
          <li>💡 <code>WHERE</code> filters rows <strong>before</strong> the selected data is returned.</li>
          <li>💡 <code>LIKE '%'</code> matches any number of characters, while <code>_</code> matches exactly one character.</li>
          <li>💡 <code>NULL</code> is <strong>not</strong> the same as <code>0</code> or an empty string (<code>''</code>).</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 1 | Introduction to Databases & SQL Fundamentals</p>
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
    { id: 'sql-w1-t1', title: 'What is a Database?' },
    { id: 'sql-w1-t2', title: 'Types of Databases' },
    { id: 'sql-w1-t3', title: 'What is SQL?' },
    { id: 'sql-w1-t4', title: 'SQL Categories' },
    { id: 'sql-w1-t5', title: 'Relational Database Concepts' },
    { id: 'sql-w1-t6', title: 'Primary Key' },
    { id: 'sql-w1-t7', title: 'Foreign Key' },
    { id: 'sql-w1-t8', title: 'SQL Naming Rules' },
    { id: 'sql-w1-t9', title: 'SQL Data Types' },
    { id: 'sql-w1-t10', title: 'SQL Syntax Basics' },
    { id: 'sql-w1-t11', title: 'SELECT Statement' },
    { id: 'sql-w1-t12', title: 'WHERE Clause' },
    { id: 'sql-w1-t13', title: 'Comparison Operators' },
    { id: 'sql-w1-t14', title: 'Logical Operators' },
    { id: 'sql-w1-t15', title: 'IN Operator' },
    { id: 'sql-w1-t16', title: 'BETWEEN Operator' },
    { id: 'sql-w1-t17', title: 'LIKE Operator' },
    { id: 'sql-w1-t18', title: 'IS NULL / IS NOT NULL' },
    { id: 'sql-w1-t19', title: 'SQL Query Execution Flow' },
    { id: 'sql-w1-t20', title: 'Common SQL Keywords' },
    { id: 'sql-w1-t21', title: 'Week 1 Quick Summary' },
    { id: 'sql-w1-t22', title: 'Exam Tips' },
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
  background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%);
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

.subtitle-small {
  font-size: 0.95em;
  opacity: 0.8;
  margin-top: 5px;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #2b6cb0;
  border-bottom: 3px solid #4299e1;
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

/* Feature List */
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

/* Example List */
.example-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.example-list li {
  padding: 6px 14px;
  background: #ebf8ff;
  border-radius: 16px;
  border: 1px solid #bee3f8;
  color: #2b6cb0;
}

/* Example Box */
.example-box {
  background: #f7fafc;
  border-left: 4px solid #4299e1;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
}

.example-box.correct {
  border-left-color: #38a169;
  background: #f0fff4;
}

.example-box.incorrect {
  border-left-color: #e53e3e;
  background: #fff5f5;
}

.example-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: #2b6cb0;
}

/* Syntax Box */
.syntax-box {
  background: #f7fafc;
  border-left: 4px solid #805ad5;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
}

.syntax-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: #6b46c1;
}

/* Tables */
.table-responsive {
  overflow-x: auto;
  margin: 10px 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 200px;
}

.data-table th,
.data-table td {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.data-table th {
  background: #edf2f7;
  font-weight: 600;
}

.data-table tr:nth-child(even) {
  background: #f7fafc;
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

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.category-box {
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.category-box.ddl {
  background: #fefcbf;
  border-color: #d69e2e;
}

.category-box.dml {
  background: #c6f6d5;
  border-color: #38a169;
}

.category-box.dql {
  background: #bee3f8;
  border-color: #3182ce;
}

.category-box.dcl {
  background: #e9d8fd;
  border-color: #805ad5;
}

.category-box.tcl {
  background: #fbd38d;
  border-color: #dd6b20;
}

.category-box h4 {
  margin-top: 0;
  margin-bottom: 8px;
}

.commands {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.cmd {
  background: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
  border: 1px solid #e2e8f0;
}

/* Execution Flow */
.execution-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px 0;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.exec-step {
  background: #2b6cb0;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.exec-arrow {
  font-size: 1.5em;
  color: #2b6cb0;
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

/* Exam Tips */
.exam-tips {
  list-style: none;
  padding: 0;
}

.exam-tips li {
  padding: 10px 15px;
  margin: 8px 0;
  background: #ebf8ff;
  border-radius: 6px;
  border-left: 3px solid #3182ce;
  word-break: break-word;
}

.exam-tips code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

/* Footer */
.cheatsheet-footer {
  text-align: center;
  padding: 30px 20px;
  color: #718096;
  border-top: 2px solid #e2e8f0;
  margin-top: 40px;
  font-size: 1.1em;
}

/* Next Course Section */
.next-course-section {
  margin-top: 40px;
}

.next-course-card {
  background: linear-gradient(135deg, #f7fafc 0%, #ebf8ff 100%);
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

  .category-grid {
    grid-template-columns: 1fr;
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
    text-align: left;
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

  .data-table {
    font-size: 0.9em;
  }

  .data-table th,
  .data-table td {
    padding: 6px 10px;
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

  .exam-tips li {
    padding: 8px 12px;
  }

  .revision-list li {
    font-size: 0.95em;
  }

  .example-list li {
    font-size: 0.85em;
    padding: 4px 10px;
  }

  .cmd {
    font-size: 0.75em;
    padding: 3px 8px;
  }
}
</style>