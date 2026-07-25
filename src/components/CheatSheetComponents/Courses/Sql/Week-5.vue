<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📘 SQL Functions & Aggregations</h1>
    </header>

    <!-- What are SQL Functions -->
    <section id="sql-w5-t1" class="section">
      <h2>1. What are SQL Functions?</h2>
      <div class="content-card">
        <p>SQL functions are <strong>built-in operations</strong> that perform calculations or manipulate data.</p>

        <p>Functions are mainly divided into two categories:</p>

        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Single Row Functions</strong></td><td>Work on each row individually</td></tr>
              <tr><td><strong>Aggregate Functions</strong></td><td>Work on multiple rows and return a single result</td></tr>
            </tbody>
          </table>
        </div>

        <div class="example-box">
          <p class="example-title">Single Row Function</p>
          <pre><code>SELECT UPPER(Name)
FROM Students;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Aggregate Function</p>
          <pre><code>SELECT COUNT(*)
FROM Students;</code></pre>
        </div>
      </div>
    </section>

    <!-- Aggregate Functions -->
    <section id="sql-w5-t2" class="section">
      <h2>2. Aggregate Functions</h2>
      <div class="content-card">
        <p>Aggregate functions calculate a value from a group of rows.</p>

        <h3>Common aggregate functions:</h3>
        <ul class="feature-list">
          <li>📊 COUNT()</li>
          <li>📊 SUM()</li>
          <li>📊 AVG()</li>
          <li>📊 MIN()</li>
          <li>📊 MAX()</li>
        </ul>
      </div>
    </section>

    <!-- Sample Table -->
    <section id="sql-w5-t3" class="section">
      <h2>3. Sample Employees Table</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr><th>EmployeeID</th><th>Name</th><th>Department</th><th>Salary</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Ankit</td><td>IT</td><td>50000</td></tr>
              <tr><td>2</td><td>Rahul</td><td>HR</td><td>40000</td></tr>
              <tr><td>3</td><td>Priya</td><td>IT</td><td>65000</td></tr>
              <tr><td>4</td><td>Riya</td><td>Sales</td><td>45000</td></tr>
              <tr><td>5</td><td>Aman</td><td>HR</td><td>55000</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- COUNT -->
    <section id="sql-w5-t4" class="section">
      <h2>4. COUNT()</h2>
      <div class="content-card">
        <p>Returns the number of rows.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT COUNT(*)
FROM Employees;</code></pre>
        </div>

        <div class="example-box">
          <p><strong>Output:</strong> 5</p>
        </div>
      </div>
    </section>

    <!-- COUNT(Column) -->
    <section id="sql-w5-t5" class="section">
      <h2>5. COUNT(Column)</h2>
      <div class="content-card">
        <p>Counts only non-NULL values.</p>
        <pre><code>SELECT COUNT(Salary)
FROM Employees;</code></pre>
        <p>If Salary contains NULL values, they are ignored.</p>
      </div>
    </section>

    <!-- COUNT(DISTINCT) -->
    <section id="sql-w5-t6" class="section">
      <h2>6. COUNT(DISTINCT)</h2>
      <div class="content-card">
        <p>Counts unique values.</p>
        <pre><code>SELECT COUNT(DISTINCT Department)
FROM Employees;</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 3</p>
          <p><strong>Departments:</strong></p>
          <ul>
            <li>IT</li>
            <li>HR</li>
            <li>Sales</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SUM -->
    <section id="sql-w5-t7" class="section">
      <h2>7. SUM()</h2>
      <div class="content-card">
        <p>Calculates the total of numeric values.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT SUM(Salary)
FROM Employees;</code></pre>
        </div>

        <div class="example-box">
          <p><strong>Output:</strong> 255000</p>
        </div>
      </div>
    </section>

    <!-- SUM with WHERE -->
    <section id="sql-w5-t8" class="section">
      <h2>8. SUM with WHERE</h2>
      <div class="content-card">
        <pre><code>SELECT SUM(Salary)
FROM Employees
WHERE Department='IT';</code></pre>
        <p>Calculates total salary of IT employees only.</p>
      </div>
    </section>

    <!-- AVG -->
    <section id="sql-w5-t9" class="section">
      <h2>9. AVG()</h2>
      <div class="content-card">
        <p>Returns the average value.</p>
        <pre><code>SELECT AVG(Salary)
FROM Employees;</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 51000</p>
        </div>
      </div>
    </section>

    <!-- AVG with Condition -->
    <section id="sql-w5-t10" class="section">
      <h2>10. AVG with Condition</h2>
      <div class="content-card">
        <pre><code>SELECT AVG(Salary)
FROM Employees
WHERE Department='HR';</code></pre>
      </div>
    </section>

    <!-- MIN -->
    <section id="sql-w5-t11" class="section">
      <h2>11. MIN()</h2>
      <div class="content-card">
        <p>Returns the smallest value.</p>
        <pre><code>SELECT MIN(Salary)
FROM Employees;</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 40000</p>
        </div>
      </div>
    </section>

    <!-- MAX -->
    <section id="sql-w5-t12" class="section">
      <h2>12. MAX()</h2>
      <div class="content-card">
        <p>Returns the largest value.</p>
        <pre><code>SELECT MAX(Salary)
FROM Employees;</code></pre>
        <div class="example-box">
          <p><strong>Output:</strong> 65000</p>
        </div>
      </div>
    </section>

    <!-- Multiple Aggregate Functions -->
    <section id="sql-w5-t13" class="section">
      <h2>13. Using Multiple Aggregate Functions</h2>
      <div class="content-card">
        <pre><code>SELECT
    COUNT(*) AS TotalEmployees,
    SUM(Salary) AS TotalSalary,
    AVG(Salary) AS AverageSalary,
    MIN(Salary) AS LowestSalary,
    MAX(Salary) AS HighestSalary
FROM Employees;</code></pre>
      </div>
    </section>

    <!-- GROUP BY -->
    <section id="sql-w5-t14" class="section">
      <h2>14. GROUP BY Clause</h2>
      <div class="content-card">
        <p><code>GROUP BY</code> groups rows having the same value.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT column_name,
    aggregate_function(column_name)
FROM table_name
GROUP BY column_name;</code></pre>
        </div>
      </div>
    </section>

    <!-- GROUP BY Example -->
    <section id="sql-w5-t15" class="section">
      <h2>15. GROUP BY Example</h2>
      <div class="content-card">
        <pre><code>SELECT Department,
    COUNT(*)
FROM Employees
GROUP BY Department;</code></pre>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Department</th><th>Employees</th></tr></thead>
              <tbody>
                <tr><td>HR</td><td>2</td></tr>
                <tr><td>IT</td><td>2</td></tr>
                <tr><td>Sales</td><td>1</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- GROUP BY with SUM -->
    <section id="sql-w5-t16" class="section">
      <h2>16. GROUP BY with SUM</h2>
      <div class="content-card">
        <pre><code>SELECT Department,
    SUM(Salary)
FROM Employees
GROUP BY Department;</code></pre>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Department</th><th>Total Salary</th></tr></thead>
              <tbody>
                <tr><td>HR</td><td>95000</td></tr>
                <tr><td>IT</td><td>115000</td></tr>
                <tr><td>Sales</td><td>45000</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- GROUP BY with AVG -->
    <section id="sql-w5-t17" class="section">
      <h2>17. GROUP BY with AVG</h2>
      <div class="content-card">
        <pre><code>SELECT Department,
    AVG(Salary)
FROM Employees
GROUP BY Department;</code></pre>
      </div>
    </section>

    <!-- GROUP BY with MIN & MAX -->
    <section id="sql-w5-t18" class="section">
      <h2>18. GROUP BY with MIN & MAX</h2>
      <div class="content-card">
        <pre><code>SELECT Department,
    MIN(Salary),
    MAX(Salary)
FROM Employees
GROUP BY Department;</code></pre>
      </div>
    </section>

    <!-- HAVING -->
    <section id="sql-w5-t19" class="section">
      <h2>19. HAVING Clause</h2>
      <div class="content-card">
        <p><code>HAVING</code> filters grouped data.</p>
        <p>Unlike <code>WHERE</code>, it works <strong>after GROUP BY</strong>.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT column_name,
    COUNT(*)
FROM table_name
GROUP BY column_name
HAVING condition;</code></pre>
        </div>
      </div>
    </section>

    <!-- HAVING Example -->
    <section id="sql-w5-t20" class="section">
      <h2>20. HAVING Example</h2>
      <div class="content-card">
        <pre><code>SELECT Department,
    COUNT(*)
FROM Employees
GROUP BY Department
HAVING COUNT(*) > 1;</code></pre>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Department</th><th>Employees</th></tr></thead>
              <tbody>
                <tr><td>IT</td><td>2</td></tr>
                <tr><td>HR</td><td>2</td></tr>
              </tbody>
            </table>
          </div>
          <p>Sales is excluded because it has only one employee.</p>
        </div>
      </div>
    </section>

    <!-- WHERE vs HAVING -->
    <section id="sql-w5-t21" class="section">
      <h2>21. WHERE vs HAVING</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>WHERE</th><th>HAVING</th></tr>
            </thead>
            <tbody>
              <tr><td>Filters rows</td><td>Filters groups</td></tr>
              <tr><td>Used before GROUP BY</td><td>Used after GROUP BY</td></tr>
              <tr><td>Cannot use aggregate functions</td><td>Can use aggregate functions</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Example using WHERE</h3>
        <pre><code>SELECT *
FROM Employees
WHERE Salary > 50000;</code></pre>

        <h3>Example using HAVING</h3>
        <pre><code>SELECT Department,
    AVG(Salary)
FROM Employees
GROUP BY Department
HAVING AVG(Salary) > 50000;</code></pre>
      </div>
    </section>

    <!-- WHERE + GROUP BY + HAVING -->
    <section id="sql-w5-t22" class="section">
      <h2>22. WHERE + GROUP BY + HAVING</h2>
      <div class="content-card">
        <pre><code>SELECT Department,
    AVG(Salary)
FROM Employees
WHERE Salary > 40000
GROUP BY Department
HAVING AVG(Salary) > 50000;</code></pre>

        <h3>Execution order</h3>
        <ol>
          <li>WHERE filters rows.</li>
          <li>GROUP BY creates groups.</li>
          <li>Aggregate function calculates values.</li>
          <li>HAVING filters groups.</li>
        </ol>
      </div>
    </section>

    <!-- Aggregate Functions Ignore NULL -->
    <section id="sql-w5-t23" class="section">
      <h2>23. Aggregate Functions Ignore NULL</h2>
      <div class="content-card">
        <p>Suppose</p>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>Salary</th></tr></thead>
            <tbody>
              <tr><td>50000</td></tr>
              <tr><td>NULL</td></tr>
              <tr><td>60000</td></tr>
            </tbody>
          </table>
        </div>

        <pre><code>SELECT AVG(Salary)
FROM Employees;</code></pre>
        <p>Average is calculated using only 50000 and 60000.</p>
        <p>NULL values are ignored.</p>
      </div>
    </section>

    <!-- Practical Examples -->
    <section id="sql-w5-t24" class="section">
      <h2>24. Practical Examples</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item full-width">
            <h4>Total students</h4>
            <pre><code>SELECT COUNT(*)
FROM Students;</code></pre>
          </div>

          <div class="example-item">
            <h4>Highest marks</h4>
            <pre><code>SELECT MAX(Marks)
FROM Students;</code></pre>
          </div>

          <div class="example-item">
            <h4>Lowest marks</h4>
            <pre><code>SELECT MIN(Marks)
FROM Students;</code></pre>
          </div>

          <div class="example-item">
            <h4>Average marks</h4>
            <pre><code>SELECT AVG(Marks)
FROM Students;</code></pre>
          </div>

          <div class="example-item">
            <h4>Total marks</h4>
            <pre><code>SELECT SUM(Marks)
FROM Students;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Department-wise average salary</h4>
            <pre><code>SELECT Department,
    AVG(Salary)
FROM Employees
GROUP BY Department;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Departments with more than 5 employees</h4>
            <pre><code>SELECT Department,
    COUNT(*)
FROM Employees
GROUP BY Department
HAVING COUNT(*) > 5;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Query Execution Order -->
    <section id="sql-w5-t25" class="section">
      <h2>25. SQL Query Execution Order</h2>
      <div class="content-card">
        <div class="execution-flow">
          <div class="exec-step">FROM</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">WHERE</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">GROUP BY</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">Aggregate Functions</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">HAVING</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">SELECT</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">ORDER BY</div>
        </div>
      </div>
    </section>

    <!-- Common Mistakes -->
    <section id="sql-w5-t26" class="section">
      <h2>26. Common Mistakes</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Using Aggregate Function in WHERE</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>SELECT Department
FROM Employees
WHERE COUNT(*) > 1;</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>SELECT Department
FROM Employees
GROUP BY Department
HAVING COUNT(*) > 1;</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Missing GROUP BY</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>SELECT Department,
    COUNT(*)
FROM Employees;</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>SELECT Department,
    COUNT(*)
FROM Employees
GROUP BY Department;</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Confusing COUNT(*) and COUNT(Column)</h4>
            <ul>
              <li><code>COUNT(*)</code> counts <strong>all rows</strong>.</li>
              <li><code>COUNT(column)</code> counts only <strong>non-NULL values</strong>.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="sql-w5-t27" class="section">
      <h2>27. Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Use <code>COUNT(*)</code> when counting all records.</li>
          <li>📌 Use <code>COUNT(DISTINCT column)</code> to count unique values.</li>
          <li>📌 Apply <code>WHERE</code> before grouping to reduce unnecessary rows.</li>
          <li>📌 Use <code>HAVING</code> only for conditions involving aggregate functions.</li>
          <li>📌 Give meaningful aliases using <code>AS</code> for better readability.</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT Department,
    AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY Department;</code></pre>
        </div>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w5-t28" class="section revision-section">
      <h2>28. Week 5 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Aggregate functions summarize multiple rows into a single value.</li>
          <li>✔ <code>COUNT()</code> counts rows or non-NULL values.</li>
          <li>✔ <code>SUM()</code> calculates the total of numeric values.</li>
          <li>✔ <code>AVG()</code> returns the average value.</li>
          <li>✔ <code>MIN()</code> finds the smallest value.</li>
          <li>✔ <code>MAX()</code> finds the largest value.</li>
          <li>✔ <code>GROUP BY</code> groups rows based on one or more columns.</li>
          <li>✔ <code>HAVING</code> filters grouped data using aggregate conditions.</li>
          <li>✔ <code>WHERE</code> filters rows before grouping, while <code>HAVING</code> filters groups after aggregation.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w5-t29" class="section">
      <h2>🧠 Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 <code>COUNT(*)</code> counts every row, while <code>COUNT(column)</code> ignores <code>NULL</code> values.</li>
          <li>💡 <code>AVG()</code>, <code>SUM()</code>, <code>MIN()</code>, and <code>MAX()</code> work only on numeric or comparable data types.</li>
          <li>💡 <code>GROUP BY</code> is required when selecting non-aggregated columns along with aggregate functions.</li>
          <li>💡 Use <code>HAVING</code> instead of <code>WHERE</code> when filtering based on aggregate results like <code>COUNT()</code> or <code>AVG()</code>.</li>
          <li>💡 Remember the SQL execution order: <strong>FROM → WHERE → GROUP BY → Aggregate Functions → HAVING → SELECT → ORDER BY</strong>.</li>
          <li>💡 Aggregate functions (except <code>COUNT(*)</code>) generally ignore <code>NULL</code> values.</li>
          <li>💡 Use column aliases (<code>AS</code>) to make query results easier to understand.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 5 | SQL Functions & Aggregations</p>
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
    { id: 'sql-w5-t1', title: 'What are SQL Functions?' },
    { id: 'sql-w5-t2', title: 'Aggregate Functions' },
    { id: 'sql-w5-t3', title: 'Sample Employees Table' },
    { id: 'sql-w5-t4', title: 'COUNT()' },
    { id: 'sql-w5-t5', title: 'COUNT(Column)' },
    { id: 'sql-w5-t6', title: 'COUNT(DISTINCT)' },
    { id: 'sql-w5-t7', title: 'SUM()' },
    { id: 'sql-w5-t8', title: 'SUM with WHERE' },
    { id: 'sql-w5-t9', title: 'AVG()' },
    { id: 'sql-w5-t10', title: 'AVG with Condition' },
    { id: 'sql-w5-t11', title: 'MIN()' },
    { id: 'sql-w5-t12', title: 'MAX()' },
    { id: 'sql-w5-t13', title: 'Multiple Aggregate Functions' },
    { id: 'sql-w5-t14', title: 'GROUP BY Clause' },
    { id: 'sql-w5-t15', title: 'GROUP BY Example' },
    { id: 'sql-w5-t16', title: 'GROUP BY with SUM' },
    { id: 'sql-w5-t17', title: 'GROUP BY with AVG' },
    { id: 'sql-w5-t18', title: 'GROUP BY with MIN & MAX' },
    { id: 'sql-w5-t19', title: 'HAVING Clause' },
    { id: 'sql-w5-t20', title: 'HAVING Example' },
    { id: 'sql-w5-t21', title: 'WHERE vs HAVING' },
    { id: 'sql-w5-t22', title: 'WHERE + GROUP BY + HAVING' },
    { id: 'sql-w5-t23', title: 'Aggregate Functions Ignore NULL' },
    { id: 'sql-w5-t24', title: 'Practical Examples' },
    { id: 'sql-w5-t25', title: 'SQL Query Execution Order' },
    { id: 'sql-w5-t26', title: 'Common Mistakes' },
    { id: 'sql-w5-t27', title: 'Best Practices' },
    { id: 'sql-w5-t28', title: 'Week 5 Quick Summary' },
    { id: 'sql-w5-t29', title: 'Exam Tips' },
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

/* Execution Flow */
.execution-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px auto;
  max-width: 250px;
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

  .execution-flow {
    max-width: 200px;
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

  .execution-flow {
    max-width: 160px;
  }

  .exec-step {
    font-size: 0.9em;
    padding: 6px 14px;
  }
}
</style>