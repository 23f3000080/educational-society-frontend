```vue
<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>Sorting, Filtering & Data Retrieval</h1>
    </header>

    <!-- Data Retrieval -->
    <section id="sql-w2-t1" class="section">
      <h2>1. Data Retrieval in SQL</h2>
      <div class="content-card">
        <p>Data retrieval means <strong>fetching required records</strong> from one or more database tables.</p>
        <p>The main command used is:</p>
        <pre><code>SELECT</code></pre>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students;</code></pre>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr><th>StudentID</th><th>Name</th><th>Age</th><th>City</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Ankit</td><td>21</td><td>Patna</td></tr>
                <tr><td>2</td><td>Rahul</td><td>20</td><td>Delhi</td></tr>
                <tr><td>3</td><td>Aman</td><td>22</td><td>Mumbai</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ORDER BY -->
    <section id="sql-w2-t2" class="section">
      <h2>2. ORDER BY Clause</h2>
      <div class="content-card">
        <p>The <strong>ORDER BY</strong> clause is used to <strong>sort records</strong> in ascending or descending order.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT column_name
FROM table_name
ORDER BY column_name;</code></pre>
        </div>
        <p>Default order is <strong>Ascending (ASC)</strong>.</p>
      </div>
    </section>

    <!-- ORDER BY ASC -->
    <section id="sql-w2-t3" class="section">
      <h2>3. ORDER BY ASC (Ascending)</h2>
      <div class="content-card">
        <p>Sorts data from:</p>
        <ul class="example-list">
          <li>A → Z</li>
          <li>0 → 9</li>
          <li>Smallest → Largest</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
ORDER BY name ASC;</code></pre>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Name</th></tr></thead>
              <tbody>
                <tr><td>Aman</td></tr>
                <tr><td>Ankit</td></tr>
                <tr><td>Rahul</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ORDER BY DESC -->
    <section id="sql-w2-t4" class="section">
      <h2>4. ORDER BY DESC (Descending)</h2>
      <div class="content-card">
        <p>Sorts data from:</p>
        <ul class="example-list">
          <li>Z → A</li>
          <li>Largest → Smallest</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
ORDER BY marks DESC;</code></pre>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Marks</th></tr></thead>
              <tbody>
                <tr><td>98</td></tr>
                <tr><td>92</td></tr>
                <tr><td>80</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ORDER BY Multiple Columns -->
    <section id="sql-w2-t5" class="section">
      <h2>5. ORDER BY Multiple Columns</h2>
      <div class="content-card">
        <p>SQL sorts by the first column. If values are equal, it sorts by the next column.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
ORDER BY city ASC, marks DESC;</code></pre>
          <p>This means:</p>
          <ol>
            <li>Sort by city alphabetically.</li>
            <li>If two students belong to the same city, sort them by marks in descending order.</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ORDER BY Column Position -->
    <section id="sql-w2-t6" class="section">
      <h2>6. ORDER BY Column Position</h2>
      <div class="content-card">
        <p>Instead of column names, you can use the column number.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT id, name, marks
FROM students
ORDER BY 3 DESC;</code></pre>
          <p>Here, <code>3 = marks</code></p>
        </div>

        <div class="warning-box">
          <p class="warning-title">⚠️ Note</p>
          <p>Using column positions is not recommended because queries become harder to read.</p>
        </div>
      </div>
    </section>

    <!-- DISTINCT -->
    <section id="sql-w2-t7" class="section">
      <h2>7. DISTINCT Keyword</h2>
      <div class="content-card">
        <p><strong>DISTINCT</strong> removes duplicate values.</p>

        <h3>Without DISTINCT</h3>
        <pre><code>SELECT city
FROM students;</code></pre>
        <div class="example-box">
          <p><strong>Output</strong></p>
          <pre>Delhi
Delhi
Patna
Mumbai
Patna</pre>
        </div>

        <h3>With DISTINCT</h3>
        <pre><code>SELECT DISTINCT city
FROM students;</code></pre>
        <div class="example-box">
          <p><strong>Output</strong></p>
          <pre>Delhi
Patna
Mumbai</pre>
        </div>
      </div>
    </section>

    <!-- DISTINCT Multiple Columns -->
    <section id="sql-w2-t8" class="section">
      <h2>8. DISTINCT on Multiple Columns</h2>
      <div class="content-card">
        <p>SQL removes duplicate combinations.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT DISTINCT city, course
FROM students;</code></pre>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>City</th><th>Course</th></tr></thead>
              <tbody>
                <tr><td>Delhi</td><td>Python</td></tr>
                <tr><td>Delhi</td><td>SQL</td></tr>
                <tr><td>Patna</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- LIMIT -->
    <section id="sql-w2-t9" class="section">
      <h2>9. LIMIT Clause</h2>
      <div class="content-card">
        <p>LIMIT restricts the number of rows returned.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT *
FROM students
LIMIT 5;</code></pre>
        </div>
        <p>Returns only the first <strong>5 rows</strong>.</p>
      </div>
    </section>

    <!-- LIMIT with ORDER BY -->
    <section id="sql-w2-t10" class="section">
      <h2>10. LIMIT with ORDER BY</h2>
      <div class="content-card">
        <p>Usually used together to get Top or Bottom records.</p>

        <h3>Top 3 Highest Marks</h3>
        <pre><code>SELECT *
FROM students
ORDER BY marks DESC
LIMIT 3;</code></pre>

        <h3>Bottom 3 Marks</h3>
        <pre><code>SELECT *
FROM students
ORDER BY marks ASC
LIMIT 3;</code></pre>
      </div>
    </section>

    <!-- LIMIT with OFFSET -->
    <section id="sql-w2-t11" class="section">
      <h2>11. LIMIT with OFFSET</h2>
      <div class="content-card">
        <p>Skip a certain number of rows.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
LIMIT 5 OFFSET 10;</code></pre>
          <p>Meaning:</p>
          <ul>
            <li>Skip first 10 rows</li>
            <li>Return next 5 rows</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- WHERE Review -->
    <section id="sql-w2-t12" class="section">
      <h2>12. WHERE Clause Review</h2>
      <div class="content-card">
        <p>Filters rows before displaying results.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE age > 18;</code></pre>
        </div>
      </div>
    </section>

    <!-- AND Operator -->
    <section id="sql-w2-t13" class="section">
      <h2>13. AND Operator</h2>
      <div class="content-card">
        <p>Returns rows where <strong>all conditions are true</strong>.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT *
FROM table
WHERE condition1
AND condition2;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE city='Patna'
AND marks > 80;</code></pre>
          <p>Only students from Patna scoring above 80.</p>
        </div>
      </div>
    </section>

    <!-- OR Operator -->
    <section id="sql-w2-t14" class="section">
      <h2>14. OR Operator</h2>
      <div class="content-card">
        <p>Returns rows if <strong>any one condition is true</strong>.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE city='Patna'
OR city='Delhi';</code></pre>
          <p>Students belonging to either Patna or Delhi.</p>
        </div>
      </div>
    </section>

    <!-- NOT Operator -->
    <section id="sql-w2-t15" class="section">
      <h2>15. NOT Operator</h2>
      <div class="content-card">
        <p>Returns rows that do <strong>not</strong> satisfy the condition.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE NOT city='Delhi';</code></pre>
          <p>All students except those from Delhi.</p>
        </div>
      </div>
    </section>

    <!-- Combining AND & OR -->
    <section id="sql-w2-t16" class="section">
      <h2>16. Combining AND & OR</h2>
      <div class="content-card">
        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE city='Patna'
AND (marks > 80 OR age < 20);</code></pre>
          <p><strong>Explanation</strong></p>
          <p>Student must:</p>
          <ul>
            <li>Be from Patna</li>
            <li>And either score above 80 or be younger than 20</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Operator Precedence -->
    <section id="sql-w2-t17" class="section">
      <h2>17. Operator Precedence</h2>
      <div class="content-card">
        <p>SQL evaluates conditions in this order:</p>
        <div class="precedence-flow">
          <div class="prec-step">1. NOT</div>
          <div class="prec-arrow">→</div>
          <div class="prec-step">2. AND</div>
          <div class="prec-arrow">→</div>
          <div class="prec-step">3. OR</div>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>WHERE city='Delhi'
OR city='Patna'
AND marks > 80;</code></pre>
          <p>Actually becomes</p>
          <pre><code>city='Delhi'
OR
(city='Patna' AND marks>80)</code></pre>
          <p>Use parentheses to avoid confusion.</p>
        </div>
      </div>
    </section>

    <!-- IN Operator -->
    <section id="sql-w2-t18" class="section">
      <h2>18. IN Operator</h2>
      <div class="content-card">
        <p>Checks multiple values without using many OR conditions.</p>

        <h3>Instead of</h3>
        <pre><code>SELECT *
FROM students
WHERE city='Patna'
OR city='Delhi'
OR city='Mumbai';</code></pre>

        <h3>Use</h3>
        <pre><code>SELECT *
FROM students
WHERE city IN ('Patna','Delhi','Mumbai');</code></pre>
        <p>Cleaner and easier to read.</p>
      </div>
    </section>

    <!-- NOT IN -->
    <section id="sql-w2-t19" class="section">
      <h2>19. NOT IN</h2>
      <div class="content-card">
        <p>Returns rows <strong>not matching</strong> a list.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE city NOT IN ('Delhi','Mumbai');</code></pre>
        </div>
      </div>
    </section>

    <!-- BETWEEN -->
    <section id="sql-w2-t20" class="section">
      <h2>20. BETWEEN Operator</h2>
      <div class="content-card">
        <p>Used to filter values within a range.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT *
FROM employees
WHERE salary BETWEEN 30000 AND 70000;</code></pre>
        </div>
        <p>Equivalent to</p>
        <pre><code>salary >= 30000
AND salary <= 70000</code></pre>

        <h3>BETWEEN with Dates</h3>
        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM orders
WHERE order_date
BETWEEN '2026-01-01'
AND '2026-12-31';</code></pre>
          <p>Returns orders placed during 2026.</p>
        </div>
      </div>
    </section>

    <!-- NOT BETWEEN -->
    <section id="sql-w2-t21" class="section">
      <h2>21. NOT BETWEEN</h2>
      <div class="content-card">
        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE marks NOT BETWEEN 40 AND 80;</code></pre>
          <p>Returns marks below 40 or above 80.</p>
        </div>
      </div>
    </section>

    <!-- LIKE Operator -->
    <section id="sql-w2-t22" class="section">
      <h2>22. LIKE Operator</h2>
      <div class="content-card">
        <p>Used for <strong>pattern matching</strong>.</p>

        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Wildcard</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              <tr><td>%</td><td>Zero or more characters</td></tr>
              <tr><td>_</td><td>Exactly one character</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- LIKE Examples -->
    <section id="sql-w2-t23" class="section">
      <h2>23. LIKE Examples</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item">
            <h4>Starts with A</h4>
            <pre><code>SELECT *
FROM students
WHERE name LIKE 'A%';</code></pre>
          </div>

          <div class="example-item">
            <h4>Ends with t</h4>
            <pre><code>SELECT *
FROM students
WHERE name LIKE '%t';</code></pre>
          </div>

          <div class="example-item">
            <h4>Contains "ank"</h4>
            <pre><code>SELECT *
FROM students
WHERE name LIKE '%ank%';</code></pre>
          </div>

          <div class="example-item">
            <h4>Second character is a</h4>
            <pre><code>SELECT *
FROM students
WHERE name LIKE '_a%';</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Exactly four letters</h4>
            <pre><code>SELECT *
FROM students
WHERE name LIKE '____';</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- NOT LIKE -->
    <section id="sql-w2-t24" class="section">
      <h2>24. NOT LIKE</h2>
      <div class="content-card">
        <p>Exclude matching patterns.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE name NOT LIKE 'A%';</code></pre>
          <p>Returns names not starting with A.</p>
        </div>
      </div>
    </section>

    <!-- Combining LIKE with AND -->
    <section id="sql-w2-t25" class="section">
      <h2>25. Combining LIKE with AND</h2>
      <div class="content-card">
        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM students
WHERE city='Patna'
AND name LIKE 'A%';</code></pre>
        </div>
      </div>
    </section>

    <!-- Practical Examples -->
    <section id="sql-w2-t26" class="section">
      <h2>26. Practical Examples</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item full-width">
            <h4>Students scoring above 90</h4>
            <pre><code>SELECT *
FROM students
WHERE marks > 90;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Top 5 students</h4>
            <pre><code>SELECT *
FROM students
ORDER BY marks DESC
LIMIT 5;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Students from Patna or Delhi</h4>
            <pre><code>SELECT *
FROM students
WHERE city IN ('Patna','Delhi');</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Names ending with "a"</h4>
            <pre><code>SELECT *
FROM students
WHERE name LIKE '%a';</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Students aged between 18 and 22</h4>
            <pre><code>SELECT *
FROM students
WHERE age BETWEEN 18 AND 22;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Mistakes -->
    <section id="sql-w2-t27" class="section">
      <h2>27. Common Mistakes</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Forgetting quotes around text values</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>WHERE city = Delhi;</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>WHERE city = 'Delhi';</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Using AND instead of OR</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>WHERE city='Patna'
AND city='Delhi';</code></pre>
            <p>A row cannot have both values at the same time.</p>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>WHERE city='Patna'
OR city='Delhi';</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Using LIKE without wildcards</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>WHERE name LIKE 'Ankit';</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>WHERE name = 'Ankit';</code></pre>
              <p>Or use</p>
              <pre><code>WHERE name LIKE 'Ank%';</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Performance Tips -->
    <section id="sql-w2-t28" class="section">
      <h2>28. Performance Tips</h2>
      <div class="content-card">
        <ul class="performance-tips">
          <li>⚡ Use <code>WHERE</code> to filter unnecessary records early.</li>
          <li>⚡ Combine <code>ORDER BY</code> with <code>LIMIT</code> to retrieve only the required rows.</li>
          <li>⚡ Prefer <code>IN</code> instead of multiple <code>OR</code> conditions for readability.</li>
          <li>⚡ Avoid sorting huge datasets unless needed.</li>
          <li>⚡ Create indexes on frequently filtered or sorted columns in large databases.</li>
        </ul>
      </div>
    </section>

    <!-- SQL Query Execution Flow -->
    <section id="sql-w2-t29" class="section">
      <h2>29. SQL Query Execution Flow</h2>
      <div class="content-card">
        <div class="execution-flow">
          <div class="exec-step">FROM</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">WHERE</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">SELECT</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">DISTINCT</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">ORDER BY</div>
          <div class="exec-arrow">↓</div>
          <div class="exec-step">LIMIT</div>
        </div>
        <p>Understanding this order helps explain why filtering happens before sorting and why <code>LIMIT</code> is applied at the end.</p>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w2-t30" class="section revision-section">
      <h2>30. Week 2 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ <code>ORDER BY</code> sorts records using <code>ASC</code> (default) or <code>DESC</code>.</li>
          <li>✔ <code>DISTINCT</code> removes duplicate values or duplicate combinations of columns.</li>
          <li>✔ <code>LIMIT</code> restricts the number of rows returned and can be combined with <code>OFFSET</code>.</li>
          <li>✔ <code>AND</code> requires all conditions to be true.</li>
          <li>✔ <code>OR</code> requires at least one condition to be true.</li>
          <li>✔ <code>NOT</code> reverses a condition.</li>
          <li>✔ <code>IN</code> checks multiple values in a concise way.</li>
          <li>✔ <code>BETWEEN</code> filters values within an inclusive range.</li>
          <li>✔ <code>LIKE</code> performs pattern matching using <code>%</code> and <code>_</code>.</li>
          <li>✔ Parentheses improve readability when combining multiple conditions.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w2-t31" class="section">
      <h2>🧠 Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 <code>ORDER BY</code> sorts <strong>after</strong> rows are filtered.</li>
          <li>💡 <code>ASC</code> is the default sort order; writing it is optional.</li>
          <li>💡 <code>BETWEEN</code> includes both boundary values.</li>
          <li>💡 <code>%</code> matches any number of characters, while <code>_</code> matches exactly one character.</li>
          <li>💡 <code>IN</code> is often cleaner than writing multiple <code>OR</code> conditions.</li>
          <li>💡 Remember SQL operator precedence: <strong>NOT → AND → OR</strong>.</li>
          <li>💡 Combine <code>ORDER BY</code> with <code>LIMIT</code> to retrieve the top or bottom records efficiently.</li>
          <li>💡 Use <code>DISTINCT</code> only when needed, as removing duplicates can increase query cost on large datasets.</li>
        </ul>
      </div>
    </section>


    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 2 | Sorting, Filtering & Data Retrieval</p>
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
    { id: 'sql-w2-t1', title: 'Data Retrieval' },
    { id: 'sql-w2-t2', title: 'ORDER BY Clause' },
    { id: 'sql-w2-t3', title: 'ORDER BY ASC' },
    { id: 'sql-w2-t4', title: 'ORDER BY DESC' },
    { id: 'sql-w2-t5', title: 'ORDER BY Multiple Columns' },
    { id: 'sql-w2-t6', title: 'ORDER BY Column Position' },
    { id: 'sql-w2-t7', title: 'DISTINCT Keyword' },
    { id: 'sql-w2-t8', title: 'DISTINCT Multiple Columns' },
    { id: 'sql-w2-t9', title: 'LIMIT Clause' },
    { id: 'sql-w2-t10', title: 'LIMIT with ORDER BY' },
    { id: 'sql-w2-t11', title: 'LIMIT with OFFSET' },
    { id: 'sql-w2-t12', title: 'WHERE Clause Review' },
    { id: 'sql-w2-t13', title: 'AND Operator' },
    { id: 'sql-w2-t14', title: 'OR Operator' },
    { id: 'sql-w2-t15', title: 'NOT Operator' },
    { id: 'sql-w2-t16', title: 'Combining AND & OR' },
    { id: 'sql-w2-t17', title: 'Operator Precedence' },
    { id: 'sql-w2-t18', title: 'IN Operator' },
    { id: 'sql-w2-t19', title: 'NOT IN' },
    { id: 'sql-w2-t20', title: 'BETWEEN Operator' },
    { id: 'sql-w2-t21', title: 'NOT BETWEEN' },
    { id: 'sql-w2-t22', title: 'LIKE Operator' },
    { id: 'sql-w2-t23', title: 'LIKE Examples' },
    { id: 'sql-w2-t24', title: 'NOT LIKE' },
    { id: 'sql-w2-t25', title: 'Combining LIKE with AND' },
    { id: 'sql-w2-t26', title: 'Practical Examples' },
    { id: 'sql-w2-t27', title: 'Common Mistakes' },
    { id: 'sql-w2-t28', title: 'Performance Tips' },
    { id: 'sql-w2-t29', title: 'SQL Query Execution Flow' },
    { id: 'sql-w2-t30', title: 'Week 2 Quick Summary' },
    { id: 'sql-w2-t31', title: 'Exam Tips' },
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

/* Precedence Flow */
.precedence-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px 0;
  flex-wrap: wrap;
}

.prec-step {
  background: #2b6cb0;
  color: white;
  padding: 6px 16px;
  border-radius: 6px;
  font-weight: 500;
}

.prec-arrow {
  font-size: 1.2em;
  color: #2b6cb0;
  font-weight: bold;
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
  max-width: 250px;
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

/* Performance Tips */
.performance-tips {
  list-style: none;
  padding: 0;
}

.performance-tips li {
  padding: 10px 15px;
  margin: 8px 0;
  background: #ebf8ff;
  border-radius: 6px;
  border-left: 3px solid #3182ce;
  word-break: break-word;
}

.performance-tips code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
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

  .precedence-flow {
    flex-direction: column;
    gap: 5px;
  }

  .prec-arrow {
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

  .performance-tips li {
    padding: 8px 12px;
    font-size: 0.95em;
  }

  .execution-flow {
    max-width: 180px;
  }

  .exec-step {
    font-size: 0.9em;
    padding: 6px 14px;
  }
}
</style>
```