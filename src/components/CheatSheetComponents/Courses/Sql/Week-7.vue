<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📘 Advanced SQL Queries</h1>
    </header>

    <!-- What are Advanced SQL Queries -->
    <section id="sql-w7-t1" class="section">
      <h2>1. What are Advanced SQL Queries?</h2>
      <div class="content-card">
        <p>Advanced SQL queries allow you to:</p>
        <ul class="feature-list">
          <li>✅ Retrieve complex data</li>
          <li>✅ Combine multiple queries</li>
          <li>✅ Reuse query results</li>
          <li>✅ Improve database performance</li>
          <li>✅ Write cleaner and more efficient SQL code</li>
        </ul>

        <h3>Topics covered:</h3>
        <ul class="feature-list">
          <li>📌 Subqueries</li>
          <li>📌 Views</li>
          <li>📌 CASE Statements</li>
          <li>📌 UNION & UNION ALL</li>
          <li>📌 Indexes</li>
          <li>📌 Query Optimization</li>
        </ul>
      </div>
    </section>

    <!-- Subquery -->
    <section id="sql-w7-t2" class="section">
      <h2>2. What is a Subquery?</h2>
      <div class="content-card">
        <p>A <strong>Subquery</strong> (Nested Query) is a query written <strong>inside another SQL query</strong>.</p>
        <p>It is enclosed in parentheses <code>()</code>.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT column_name
FROM table_name
WHERE column_name =
(
    SELECT column_name
    FROM table_name
);</code></pre>
        </div>
      </div>
    </section>

    <!-- Single Row Subquery -->
    <section id="sql-w7-t3" class="section">
      <h2>3. Single Row Subquery</h2>
      <div class="content-card">
        <p>Find employees earning the highest salary.</p>
        <pre><code>SELECT *
FROM Employees
WHERE Salary =
(
    SELECT MAX(Salary)
    FROM Employees
);</code></pre>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>EmployeeID</th><th>Name</th><th>Salary</th></tr></thead>
              <tbody>
                <tr><td>3</td><td>Priya</td><td>65000</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Subquery with IN -->
    <section id="sql-w7-t4" class="section">
      <h2>4. Subquery with IN</h2>
      <div class="content-card">
        <p>Find employees working in departments located in Delhi.</p>
        <pre><code>SELECT *
FROM Employees
WHERE DepartmentID IN
(
    SELECT DepartmentID
    FROM Departments
    WHERE City='Delhi'
);</code></pre>
      </div>
    </section>

    <!-- Subquery with EXISTS -->
    <section id="sql-w7-t5" class="section">
      <h2>5. Subquery with EXISTS</h2>
      <div class="content-card">
        <p><code>EXISTS</code> checks whether the subquery returns any rows.</p>
        <pre><code>SELECT Name
FROM Students s
WHERE EXISTS
(
    SELECT *
    FROM Marks m
    WHERE s.StudentID = m.StudentID
);</code></pre>
        <p>Returns only students who have marks.</p>
      </div>
    </section>

    <!-- Correlated Subquery -->
    <section id="sql-w7-t6" class="section">
      <h2>6. Correlated Subquery</h2>
      <div class="content-card">
        <p>A correlated subquery depends on the outer query.</p>
        <pre><code>SELECT Name,
    Salary
FROM Employees e
WHERE Salary >
(
    SELECT AVG(Salary)
    FROM Employees
    WHERE DepartmentID = e.DepartmentID
);</code></pre>
      </div>
    </section>

    <!-- Views -->
    <section id="sql-w7-t7" class="section">
      <h2>7. What is a View?</h2>
      <div class="content-card">
        <p>A <strong>View</strong> is a virtual table created from one or more SQL queries.</p>
        <p>It stores the <strong>query</strong>, not the actual data.</p>
      </div>
    </section>

    <!-- Creating a View -->
    <section id="sql-w7-t8" class="section">
      <h2>8. Creating a View</h2>
      <div class="content-card">
        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>CREATE VIEW view_name AS
SELECT columns
FROM table_name;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>CREATE VIEW IT_Employees AS
SELECT Name, Salary
FROM Employees
WHERE Department='IT';</code></pre>
        </div>
      </div>
    </section>

    <!-- Using a View -->
    <section id="sql-w7-t9" class="section">
      <h2>9. Using a View</h2>
      <div class="content-card">
        <pre><code>SELECT *
FROM IT_Employees;</code></pre>
        <p>A view behaves like a normal table for reading data.</p>
      </div>
    </section>

    <!-- Updating a View -->
    <section id="sql-w7-t10" class="section">
      <h2>10. Updating a View</h2>
      <div class="content-card">
        <pre><code>CREATE OR REPLACE VIEW IT_Employees AS
SELECT Name,
    Salary,
    Department
FROM Employees
WHERE Department='IT';</code></pre>
      </div>
    </section>

    <!-- Dropping a View -->
    <section id="sql-w7-t11" class="section">
      <h2>11. Dropping a View</h2>
      <div class="content-card">
        <pre><code>DROP VIEW IT_Employees;</code></pre>
        <p>Only the view is removed. Original table remains unchanged.</p>
      </div>
    </section>

    <!-- Advantages of Views -->
    <section id="sql-w7-t12" class="section">
      <h2>12. Advantages of Views</h2>
      <div class="content-card">
        <ul class="feature-list">
          <li>✅ Simplifies complex queries</li>
          <li>✅ Improves security</li>
          <li>✅ Hides unnecessary columns</li>
          <li>✅ Reusable SQL logic</li>
          <li>✅ Easier reporting</li>
        </ul>
      </div>
    </section>

    <!-- CASE Statement -->
    <section id="sql-w7-t13" class="section">
      <h2>13. CASE Statement</h2>
      <div class="content-card">
        <p>The <code>CASE</code> statement works like <strong>IF-ELSE</strong> in programming.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>CASE
WHEN condition THEN value
WHEN condition THEN value
ELSE value
END</code></pre>
        </div>
      </div>
    </section>

    <!-- CASE Example -->
    <section id="sql-w7-t14" class="section">
      <h2>14. CASE Example</h2>
      <div class="content-card">
        <p>Assign grades based on marks.</p>
        <pre><code>SELECT
    Name,
    Marks,
    CASE
        WHEN Marks>=90 THEN 'A'
        WHEN Marks>=75 THEN 'B'
        WHEN Marks>=60 THEN 'C'
        ELSE 'Fail'
    END AS Grade
FROM Students;</code></pre>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Name</th><th>Marks</th><th>Grade</th></tr></thead>
              <tbody>
                <tr><td>Ankit</td><td>95</td><td>A</td></tr>
                <tr><td>Rahul</td><td>78</td><td>B</td></tr>
                <tr><td>Riya</td><td>55</td><td>Fail</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- CASE in ORDER BY -->
    <section id="sql-w7-t15" class="section">
      <h2>15. CASE in ORDER BY</h2>
      <div class="content-card">
        <pre><code>SELECT Name,
    Department
FROM Employees
ORDER BY
CASE
    WHEN Department='IT' THEN 1
    WHEN Department='HR' THEN 2
    ELSE 3
END;</code></pre>
      </div>
    </section>

    <!-- UNION -->
    <section id="sql-w7-t16" class="section">
      <h2>16. UNION Operator</h2>
      <div class="content-card">
        <p><code>UNION</code> combines the results of two or more SELECT statements.</p>

        <h3>Rules</h3>
        <ul class="feature-list">
          <li>Same number of columns</li>
          <li>Same data types</li>
          <li>Duplicate rows are removed</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT Name
FROM Students

UNION

SELECT Name
FROM Teachers;</code></pre>
        </div>
      </div>
    </section>

    <!-- UNION ALL -->
    <section id="sql-w7-t17" class="section">
      <h2>17. UNION ALL</h2>
      <div class="content-card">
        <p>Works like UNION but <strong>keeps duplicate rows</strong>.</p>
        <pre><code>SELECT Name
FROM Students

UNION ALL

SELECT Name
FROM Teachers;</code></pre>
      </div>
    </section>

    <!-- UNION vs UNION ALL -->
    <section id="sql-w7-t18" class="section">
      <h2>18. UNION vs UNION ALL</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>UNION</th><th>UNION ALL</th></tr>
            </thead>
            <tbody>
              <tr><td>Removes duplicates</td><td>Keeps duplicates</td></tr>
              <tr><td>Slower</td><td>Faster</td></tr>
              <tr><td>Performs duplicate checking</td><td>No duplicate checking</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Indexes -->
    <section id="sql-w7-t19" class="section">
      <h2>19. Indexes</h2>
      <div class="content-card">
        <p>An <strong>Index</strong> improves the speed of searching data.</p>

        <div class="example-box">
          <p><strong>Without an index:</strong></p>
          <div class="flow-diagram small">
            <div class="flow-step">Database</div>
            <div class="flow-arrow">↓</div>
            <div class="flow-step">Search every row</div>
          </div>

          <p><strong>With an index:</strong></p>
          <div class="flow-diagram small">
            <div class="flow-step">Database</div>
            <div class="flow-arrow">↓</div>
            <div class="flow-step">Go directly to matching records</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Creating an Index -->
    <section id="sql-w7-t20" class="section">
      <h2>20. Creating an Index</h2>
      <div class="content-card">
        <pre><code>CREATE INDEX idx_name
ON Students(Name);</code></pre>
        <p>Searching by Name becomes faster.</p>
      </div>
    </section>

    <!-- Unique Index -->
    <section id="sql-w7-t21" class="section">
      <h2>21. Unique Index</h2>
      <div class="content-card">
        <pre><code>CREATE UNIQUE INDEX idx_email
ON Students(Email);</code></pre>
        <p>Duplicate emails are not allowed.</p>
      </div>
    </section>

    <!-- Dropping an Index -->
    <section id="sql-w7-t22" class="section">
      <h2>22. Dropping an Index</h2>
      <div class="content-card">
        <p><strong>(MySQL)</strong></p>
        <pre><code>DROP INDEX idx_name
ON Students;</code></pre>
      </div>
    </section>

    <!-- Query Optimization -->
    <section id="sql-w7-t23" class="section">
      <h2>23. Query Optimization</h2>
      <div class="content-card">
        <p>Query optimization means writing SQL queries that execute faster and use fewer resources.</p>
      </div>
    </section>

    <!-- Optimization Tips -->
    <section id="sql-w7-t24" class="section">
      <h2>24. Optimization Tips</h2>
      <div class="content-card">
        <div class="tip-item">
          <h4>✔ Select only required columns</h4>
          <p><strong>Good</strong></p>
          <pre><code>SELECT Name, Salary
FROM Employees;</code></pre>
          <p><strong>Avoid</strong></p>
          <pre><code>SELECT *
FROM Employees;</code></pre>
        </div>

        <div class="tip-item">
          <h4>✔ Filter data using WHERE</h4>
          <pre><code>SELECT *
FROM Employees
WHERE Salary>50000;</code></pre>
        </div>

        <div class="tip-item">
          <h4>✔ Create indexes on frequently searched columns</h4>
        </div>

        <div class="tip-item">
          <h4>✔ Avoid unnecessary subqueries</h4>
        </div>

        <div class="tip-item">
          <h4>✔ Use JOINs instead of repeated queries when appropriate</h4>
        </div>

        <div class="tip-item">
          <h4>✔ Limit returned rows</h4>
          <pre><code>SELECT *
FROM Employees
LIMIT 10;</code></pre>
        </div>
      </div>
    </section>

    <!-- Practical Examples -->
    <section id="sql-w7-t25" class="section">
      <h2>25. Practical Examples</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item full-width">
            <h4>Employees earning above average salary</h4>
            <pre><code>SELECT *
FROM Employees
WHERE Salary >
(
    SELECT AVG(Salary)
    FROM Employees
);</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Create a view</h4>
            <pre><code>CREATE VIEW HighSalaryEmployees AS
SELECT *
FROM Employees
WHERE Salary>50000;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Use CASE</h4>
            <pre><code>SELECT Name,
    CASE
        WHEN Salary>60000 THEN 'High'
        ELSE 'Normal'
    END AS SalaryLevel
FROM Employees;</code></pre>
          </div>

          <div class="example-item">
            <h4>Combine two tables</h4>
            <pre><code>SELECT Name
FROM Students

UNION

SELECT Name
FROM Teachers;</code></pre>
          </div>

          <div class="example-item">
            <h4>Create an index</h4>
            <pre><code>CREATE INDEX idx_department
ON Employees(Department);</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Mistakes -->
    <section id="sql-w7-t26" class="section">
      <h2>26. Common Mistakes</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Missing Parentheses in Subquery</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>WHERE Salary =
SELECT MAX(Salary)
FROM Employees;</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>WHERE Salary =
(
    SELECT MAX(Salary)
    FROM Employees
);</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Different Number of Columns in UNION</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>SELECT Name
FROM Students

UNION

SELECT Name,
    Age
FROM Teachers;</code></pre>
            <p>Both SELECT statements must return the same number of columns.</p>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Forgetting ELSE in CASE</h4>
            <pre><code>CASE
    WHEN Marks>=90 THEN 'A'
END</code></pre>
            <p>Rows not matching any condition return <code>NULL</code>.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="sql-w7-t27" class="section">
      <h2>27. Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Use subqueries only when they improve readability.</li>
          <li>📌 Prefer <code>JOIN</code> over nested subqueries when suitable.</li>
          <li>📌 Use views for frequently used complex queries.</li>
          <li>📌 Use <code>CASE</code> to simplify conditional logic.</li>
          <li>📌 Use <code>UNION ALL</code> when duplicate rows are acceptable for better performance.</li>
          <li>📌 Create indexes only on columns that are frequently searched or joined.</li>
          <li>📌 Avoid <code>SELECT *</code> in production queries.</li>
        </ul>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w7-t28" class="section revision-section">
      <h2>28. Week 7 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ A <strong>Subquery</strong> is a query inside another query.</li>
          <li>✔ A <strong>View</strong> is a virtual table based on a SQL query.</li>
          <li>✔ The <code>CASE</code> statement adds conditional logic to SQL queries.</li>
          <li>✔ <code>UNION</code> combines result sets and removes duplicate rows.</li>
          <li>✔ <code>UNION ALL</code> combines result sets without removing duplicates.</li>
          <li>✔ <strong>Indexes</strong> improve query performance by speeding up data retrieval.</li>
          <li>✔ Query optimization techniques improve efficiency and reduce execution time.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w7-t29" class="section">
      <h2>🧠 Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 Subqueries must be enclosed in parentheses <code>()</code>.</li>
          <li>💡 Use <code>EXISTS</code> to check whether a subquery returns any rows.</li>
          <li>💡 Views do not store data; they store the SQL query definition.</li>
          <li>💡 <code>CASE</code> expressions should usually include an <code>ELSE</code> clause to handle unmatched conditions.</li>
          <li>💡 <code>UNION</code> removes duplicates, while <code>UNION ALL</code> keeps them and is generally faster.</li>
          <li>💡 Indexes speed up <code>SELECT</code> queries but may slightly slow down <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> operations because the indexes must also be maintained.</li>
          <li>💡 Avoid creating indexes on columns that are rarely searched or frequently modified, as unnecessary indexes can reduce overall performance.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 7 | Advanced SQL Queries</p>
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
    { id: 'sql-w7-t1', title: 'What are Advanced SQL Queries?' },
    { id: 'sql-w7-t2', title: 'What is a Subquery?' },
    { id: 'sql-w7-t3', title: 'Single Row Subquery' },
    { id: 'sql-w7-t4', title: 'Subquery with IN' },
    { id: 'sql-w7-t5', title: 'Subquery with EXISTS' },
    { id: 'sql-w7-t6', title: 'Correlated Subquery' },
    { id: 'sql-w7-t7', title: 'What is a View?' },
    { id: 'sql-w7-t8', title: 'Creating a View' },
    { id: 'sql-w7-t9', title: 'Using a View' },
    { id: 'sql-w7-t10', title: 'Updating a View' },
    { id: 'sql-w7-t11', title: 'Dropping a View' },
    { id: 'sql-w7-t12', title: 'Advantages of Views' },
    { id: 'sql-w7-t13', title: 'CASE Statement' },
    { id: 'sql-w7-t14', title: 'CASE Example' },
    { id: 'sql-w7-t15', title: 'CASE in ORDER BY' },
    { id: 'sql-w7-t16', title: 'UNION Operator' },
    { id: 'sql-w7-t17', title: 'UNION ALL' },
    { id: 'sql-w7-t18', title: 'UNION vs UNION ALL' },
    { id: 'sql-w7-t19', title: 'Indexes' },
    { id: 'sql-w7-t20', title: 'Creating an Index' },
    { id: 'sql-w7-t21', title: 'Unique Index' },
    { id: 'sql-w7-t22', title: 'Dropping an Index' },
    { id: 'sql-w7-t23', title: 'Query Optimization' },
    { id: 'sql-w7-t24', title: 'Optimization Tips' },
    { id: 'sql-w7-t25', title: 'Practical Examples' },
    { id: 'sql-w7-t26', title: 'Common Mistakes' },
    { id: 'sql-w7-t27', title: 'Best Practices' },
    { id: 'sql-w7-t28', title: 'Week 7 Quick Summary' },
    { id: 'sql-w7-t29', title: 'Exam Tips' },
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
}

.feature-list li {
  padding: 8px 12px;
  background: #edf2f7;
  border-radius: 6px;
  margin: 4px 0;
}

/* Example Box */
.example-box {
  background: #f7fafc;
  border-left: 4px solid #4299e1;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
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

/* Flow Diagram */
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

.flow-diagram.small {
  gap: 8px;
  padding: 10px;
  max-width: 300px;
  margin: 10px auto;
}

.flow-step {
  background: #2b6cb0;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
}

.flow-arrow {
  font-size: 1.5em;
  color: #2b6cb0;
}

/* Tip Items */
.tip-item {
  background: #f7fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin: 10px 0;
}

.tip-item h4 {
  margin-top: 0;
  color: #2b6cb0;
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
  color: #2b6cb0;
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

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .example-item.full-width {
    grid-column: 1;
  }

  .mistakes-grid {
    grid-template-columns: 1fr;
  }

  .mistake-box.full-width {
    grid-column: 1;
  }

  .flow-diagram {
    flex-direction: column;
    gap: 8px;
  }

  .flow-arrow {
    transform: rotate(90deg);
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

  .exam-tips li {
    padding: 8px 12px;
  }

  .revision-list li {
    font-size: 0.95em;
  }

  .best-practices-list li {
    padding: 8px 12px;
    font-size: 0.95em;
  }

  .tip-item {
    padding: 12px;
  }

  .flow-step {
    font-size: 0.9em;
    padding: 6px 14px;
  }
}
</style>