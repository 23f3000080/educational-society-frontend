<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📘 CRUD Operations in SQL</h1>
    </header>

    <!-- What is CRUD -->
    <section id="sql-w4-t1" class="section">
      <h2>1. What is CRUD?</h2>
      <div class="content-card">
        <p>CRUD stands for the four basic operations performed on data in a database.</p>

        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Operation</th><th>SQL Command</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Create</strong></td><td><code>INSERT INTO</code></td><td>Add new records</td></tr>
              <tr><td><strong>Read</strong></td><td><code>SELECT</code></td><td>Retrieve records</td></tr>
              <tr><td><strong>Update</strong></td><td><code>UPDATE</code></td><td>Modify existing records</td></tr>
              <tr><td><strong>Delete</strong></td><td><code>DELETE</code></td><td>Remove records</td></tr>
            </tbody>
          </table>
        </div>

        <div class="example-box">
          <p class="example-title">Example Table: Students</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th><th>Age</th><th>Course</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>Ankit</td><td>21</td><td>SQL</td></tr>
                <tr><td>102</td><td>Rahul</td><td>20</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- INSERT INTO -->
    <section id="sql-w4-t2" class="section">
      <h2>2. INSERT INTO Statement</h2>
      <div class="content-card">
        <p>The <strong>INSERT INTO</strong> statement is used to add new records to a table.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);</code></pre>
        </div>
      </div>
    </section>

    <!-- Insert Single Record -->
    <section id="sql-w4-t3" class="section">
      <h2>3. Insert a Single Record</h2>
      <div class="content-card">
        <pre><code>INSERT INTO Students
(StudentID, Name, Age, Course)
VALUES
(103, 'Aman', 22, 'Java');</code></pre>

        <div class="example-box">
          <p class="example-title">Result</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th><th>Age</th><th>Course</th></tr></thead>
              <tbody>
                <tr><td>103</td><td>Aman</td><td>22</td><td>Java</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Insert Multiple Records -->
    <section id="sql-w4-t4" class="section">
      <h2>4. Insert Multiple Records</h2>
      <div class="content-card">
        <pre><code>INSERT INTO Students
(StudentID, Name, Age, Course)
VALUES
(104,'Priya',20,'Python'),
(105,'Riya',19,'SQL'),
(106,'Rohan',21,'Java');</code></pre>
      </div>
    </section>

    <!-- Insert Without All Columns -->
    <section id="sql-w4-t5" class="section">
      <h2>5. Insert Without Specifying All Columns</h2>
      <div class="content-card">
        <pre><code>INSERT INTO Students
(StudentID, Name)
VALUES
(107,'Neha');</code></pre>
        <p>Remaining columns become <strong>NULL</strong> or use their <strong>DEFAULT</strong> values.</p>
      </div>
    </section>

    <!-- DEFAULT Values -->
    <section id="sql-w4-t6" class="section">
      <h2>6. DEFAULT Values</h2>
      <div class="content-card">
        <p>Suppose the table is created as:</p>
        <pre><code>Status VARCHAR(20) DEFAULT 'Active'</code></pre>
        <p>Now</p>
        <pre><code>INSERT INTO Students
(StudentID, Name)
VALUES
(108,'Rahul');</code></pre>

        <div class="example-box">
          <p class="example-title">Result</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>108</td><td>Rahul</td><td>Active</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- INSERT Using Another Table -->
    <section id="sql-w4-t7" class="section">
      <h2>7. INSERT Using Another Table</h2>
      <div class="content-card">
        <pre><code>INSERT INTO Students_Backup
SELECT *
FROM Students;</code></pre>
        <p>Copies all records into another table.</p>
      </div>
    </section>

    <!-- UPDATE Statement -->
    <section id="sql-w4-t8" class="section">
      <h2>8. UPDATE Statement</h2>
      <div class="content-card">
        <p>Used to modify existing records.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>UPDATE table_name
SET column_name = value
WHERE condition;</code></pre>
        </div>
      </div>
    </section>

    <!-- Update One Record -->
    <section id="sql-w4-t9" class="section">
      <h2>9. Update One Record</h2>
      <div class="content-card">
        <pre><code>UPDATE Students
SET Course='Data Science'
WHERE StudentID=101;</code></pre>

        <div class="example-box">
          <p><strong>Before:</strong> 101 | Ankit | SQL</p>
          <p><strong>After:</strong> 101 | Ankit | Data Science</p>
        </div>
      </div>
    </section>

    <!-- Update Multiple Columns -->
    <section id="sql-w4-t10" class="section">
      <h2>10. Update Multiple Columns</h2>
      <div class="content-card">
        <pre><code>UPDATE Students
SET Age=22, Course='Python'
WHERE StudentID=102;</code></pre>
      </div>
    </section>

    <!-- Update Multiple Rows -->
    <section id="sql-w4-t11" class="section">
      <h2>11. Update Multiple Rows</h2>
      <div class="content-card">
        <pre><code>UPDATE Students
SET Course='SQL'
WHERE Age < 20;</code></pre>
        <p>All matching records are updated.</p>
      </div>
    </section>

    <!-- UPDATE Without WHERE -->
    <section id="sql-w4-t12" class="section">
      <h2>12. UPDATE Without WHERE</h2>
      <div class="content-card">
        <pre><code>UPDATE Students
SET Course='Python';</code></pre>
        <div class="warning-box">
          <p class="warning-title">⚠️ Warning</p>
          <p>Every row in the table will be updated.</p>
        </div>
      </div>
    </section>

    <!-- DELETE Statement -->
    <section id="sql-w4-t13" class="section">
      <h2>13. DELETE Statement</h2>
      <div class="content-card">
        <p>Deletes one or more rows from a table.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>DELETE FROM table_name
WHERE condition;</code></pre>
        </div>
      </div>
    </section>

    <!-- Delete One Record -->
    <section id="sql-w4-t14" class="section">
      <h2>14. Delete One Record</h2>
      <div class="content-card">
        <pre><code>DELETE FROM Students
WHERE StudentID=103;</code></pre>
        <p>Only StudentID 103 is removed.</p>
      </div>
    </section>

    <!-- Delete Multiple Records -->
    <section id="sql-w4-t15" class="section">
      <h2>15. Delete Multiple Records</h2>
      <div class="content-card">
        <pre><code>DELETE FROM Students
WHERE Age < 18;</code></pre>
        <p>Deletes every student younger than 18.</p>
      </div>
    </section>

    <!-- DELETE Without WHERE -->
    <section id="sql-w4-t16" class="section">
      <h2>16. DELETE Without WHERE</h2>
      <div class="content-card">
        <pre><code>DELETE FROM Students;</code></pre>
        <div class="warning-box">
          <p class="warning-title">⚠️ Warning</p>
          <p>Deletes <strong>all records</strong> but the table structure remains.</p>
        </div>
      </div>
    </section>

    <!-- TRUNCATE TABLE -->
    <section id="sql-w4-t17" class="section">
      <h2>17. TRUNCATE TABLE</h2>
      <div class="content-card">
        <p>Removes every record quickly.</p>
        <pre><code>TRUNCATE TABLE Students;</code></pre>
        <p>Difference:</p>
        <ul>
          <li>Table remains</li>
          <li>All rows removed</li>
          <li>Cannot use WHERE</li>
        </ul>
      </div>
    </section>

    <!-- DELETE vs TRUNCATE -->
    <section id="sql-w4-t18" class="section">
      <h2>18. DELETE vs TRUNCATE</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Feature</th><th>DELETE</th><th>TRUNCATE</th></tr>
            </thead>
            <tbody>
              <tr><td>Removes rows</td><td>✅</td><td>✅</td></tr>
              <tr><td>WHERE supported</td><td>✅</td><td>❌</td></tr>
              <tr><td>Faster</td><td>❌</td><td>✅</td></tr>
              <tr><td>Can rollback (depends on DBMS)</td><td>Usually Yes</td><td>Usually No</td></tr>
              <tr><td>Table structure remains</td><td>✅</td><td>✅</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Data Validation -->
    <section id="sql-w4-t19" class="section">
      <h2>19. Data Validation</h2>
      <div class="content-card">
        <p>Data validation ensures that only <strong>correct and meaningful data</strong> is stored.</p>

        <h3>Examples</h3>
        <ul class="feature-list">
          <li>✅ Age cannot be negative</li>
          <li>✅ Marks cannot exceed 100</li>
          <li>✅ Email should be unique</li>
          <li>✅ Name should not be empty</li>
        </ul>
      </div>
    </section>

    <!-- NOT NULL Validation -->
    <section id="sql-w4-t20" class="section">
      <h2>20. NOT NULL Validation</h2>
      <div class="content-card">
        <pre><code>CREATE TABLE Students(
    Name VARCHAR(50) NOT NULL
);</code></pre>
        <p>Cannot insert</p>
        <pre><code>INSERT INTO Students(Name)
VALUES(NULL);</code></pre>
      </div>
    </section>

    <!-- UNIQUE Validation -->
    <section id="sql-w4-t21" class="section">
      <h2>21. UNIQUE Validation</h2>
      <div class="content-card">
        <pre><code>Email VARCHAR(100) UNIQUE</code></pre>
        <p>Duplicate emails are rejected.</p>
      </div>
    </section>

    <!-- CHECK Constraint -->
    <section id="sql-w4-t22" class="section">
      <h2>22. CHECK Constraint</h2>
      <div class="content-card">
        <pre><code>Age INT CHECK(Age>=18)</code></pre>
        <p><strong>Accepted:</strong> 20, 25, 30</p>
        <p><strong>Rejected:</strong> 15, 16, 17</p>
      </div>
    </section>

    <!-- DEFAULT Constraint -->
    <section id="sql-w4-t23" class="section">
      <h2>23. DEFAULT Constraint</h2>
      <div class="content-card">
        <pre><code>Status VARCHAR(20) DEFAULT 'Active'</code></pre>
        <p>If no value is provided, SQL stores <code>'Active'</code>.</p>
      </div>
    </section>

    <!-- PRIMARY KEY Validation -->
    <section id="sql-w4-t24" class="section">
      <h2>24. PRIMARY KEY Validation</h2>
      <div class="content-card">
        <pre><code>StudentID INT PRIMARY KEY</code></pre>
        <h3>Rules</h3>
        <ul class="feature-list">
          <li>✅ Unique</li>
          <li>✅ Not NULL</li>
          <li>✅ No duplicate values</li>
        </ul>
      </div>
    </section>

    <!-- Transaction Example -->
    <section id="sql-w4-t25" class="section">
      <h2>25. Transaction Example</h2>
      <div class="content-card">
        <p>Suppose</p>
        <pre><code>UPDATE Accounts
SET Balance = Balance - 500
WHERE AccountID=1;</code></pre>
        <p>and</p>
        <pre><code>UPDATE Accounts
SET Balance = Balance + 500
WHERE AccountID=2;</code></pre>
        <p>Both operations should complete successfully together to maintain data integrity.</p>
      </div>
    </section>

    <!-- CRUD Flow -->
    <section id="sql-w4-t26" class="section">
      <h2>26. CRUD Flow</h2>
      <div class="content-card">
        <div class="crud-flow">
          <div class="crud-step">Create</div>
          <div class="crud-arrow">│</div>
          <div class="crud-step">INSERT</div>
          <div class="crud-arrow">│</div>
          <div class="crud-step">↓</div>
          <div class="crud-step">Read</div>
          <div class="crud-arrow">│</div>
          <div class="crud-step">SELECT</div>
          <div class="crud-arrow">│</div>
          <div class="crud-step">↓</div>
          <div class="crud-step">Update</div>
          <div class="crud-arrow">│</div>
          <div class="crud-step">UPDATE</div>
          <div class="crud-arrow">│</div>
          <div class="crud-step">↓</div>
          <div class="crud-step">Delete</div>
          <div class="crud-arrow">│</div>
          <div class="crud-step">DELETE</div>
        </div>
      </div>
    </section>

    <!-- Practical Example -->
    <section id="sql-w4-t27" class="section">
      <h2>27. Practical Example</h2>
      <div class="content-card">
        <h3>Create table</h3>
        <pre><code>CREATE TABLE Employees(
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(50),
    Salary DECIMAL(10,2)
);</code></pre>

        <h3>Insert</h3>
        <pre><code>INSERT INTO Employees
VALUES (1,'Ankit',50000);</code></pre>

        <h3>Update</h3>
        <pre><code>UPDATE Employees
SET Salary=55000
WHERE EmployeeID=1;</code></pre>

        <h3>Delete</h3>
        <pre><code>DELETE FROM Employees
WHERE EmployeeID=1;</code></pre>
      </div>
    </section>

    <!-- Common Errors -->
    <section id="sql-w4-t28" class="section">
      <h2>28. Common Errors</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Forgetting WHERE</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>UPDATE Students
SET Course='SQL';</code></pre>
            <p>Updates every row.</p>
          </div>

          <div class="mistake-box">
            <h4>❌ Deleting Entire Table Data</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>DELETE FROM Students;</code></pre>
            <p>Deletes all records.</p>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Wrong Number of Values</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>INSERT INTO Students
VALUES(1,'Ankit');</code></pre>
            <p>If the table has four columns, SQL returns an error.</p>
            <div class="correction">
              <p class="correction-title">✅ Always specify the column names</p>
              <pre><code>INSERT INTO Students
(StudentID, Name)
VALUES(1,'Ankit');</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="sql-w4-t29" class="section">
      <h2>29. Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Always use <code>WHERE</code> with <code>UPDATE</code> and <code>DELETE</code>.</li>
          <li>📌 Validate data before inserting records.</li>
          <li>📌 Use <code>PRIMARY KEY</code> and <code>UNIQUE</code> to prevent duplicate data.</li>
          <li>📌 Use <code>DEFAULT</code> values where appropriate.</li>
          <li>📌 Test <code>SELECT</code> queries before running <code>UPDATE</code> or <code>DELETE</code>.</li>
          <li>📌 Keep regular database backups before making bulk changes.</li>
        </ul>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w4-t30" class="section revision-section">
      <h2>30. Week 4 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ <code>INSERT INTO</code> adds new records.</li>
          <li>✔ <code>UPDATE</code> modifies existing records.</li>
          <li>✔ <code>DELETE</code> removes selected records.</li>
          <li>✔ <code>TRUNCATE</code> removes all records but keeps the table structure.</li>
          <li>✔ Data validation ensures accuracy and consistency.</li>
          <li>✔ Constraints such as <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code>, and <code>PRIMARY KEY</code> help maintain data integrity.</li>
          <li>✔ Always use <code>WHERE</code> with <code>UPDATE</code> and <code>DELETE</code> unless you intentionally want to affect all rows.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w4-t31" class="section">
      <h2>🧠 Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 CRUD stands for <strong>Create, Read, Update, Delete</strong>.</li>
          <li>💡 <code>INSERT INTO</code> is used to add new rows.</li>
          <li>💡 <code>UPDATE</code> without a <code>WHERE</code> clause updates every record.</li>
          <li>💡 <code>DELETE</code> without a <code>WHERE</code> clause removes every row but keeps the table.</li>
          <li>💡 <code>TRUNCATE</code> is generally faster than <code>DELETE</code> for clearing an entire table.</li>
          <li>💡 Use constraints to protect the database from invalid or duplicate data.</li>
          <li>💡 Always verify your <code>SELECT</code> results before executing <code>UPDATE</code> or <code>DELETE</code> statements on production data.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 4 | CRUD Operations in SQL</p>
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
    { id: 'sql-w4-t1', title: 'What is CRUD?' },
    { id: 'sql-w4-t2', title: 'INSERT INTO Statement' },
    { id: 'sql-w4-t3', title: 'Insert a Single Record' },
    { id: 'sql-w4-t4', title: 'Insert Multiple Records' },
    { id: 'sql-w4-t5', title: 'Insert Without All Columns' },
    { id: 'sql-w4-t6', title: 'DEFAULT Values' },
    { id: 'sql-w4-t7', title: 'INSERT Using Another Table' },
    { id: 'sql-w4-t8', title: 'UPDATE Statement' },
    { id: 'sql-w4-t9', title: 'Update One Record' },
    { id: 'sql-w4-t10', title: 'Update Multiple Columns' },
    { id: 'sql-w4-t11', title: 'Update Multiple Rows' },
    { id: 'sql-w4-t12', title: 'UPDATE Without WHERE' },
    { id: 'sql-w4-t13', title: 'DELETE Statement' },
    { id: 'sql-w4-t14', title: 'Delete One Record' },
    { id: 'sql-w4-t15', title: 'Delete Multiple Records' },
    { id: 'sql-w4-t16', title: 'DELETE Without WHERE' },
    { id: 'sql-w4-t17', title: 'TRUNCATE TABLE' },
    { id: 'sql-w4-t18', title: 'DELETE vs TRUNCATE' },
    { id: 'sql-w4-t19', title: 'Data Validation' },
    { id: 'sql-w4-t20', title: 'NOT NULL Validation' },
    { id: 'sql-w4-t21', title: 'UNIQUE Validation' },
    { id: 'sql-w4-t22', title: 'CHECK Constraint' },
    { id: 'sql-w4-t23', title: 'DEFAULT Constraint' },
    { id: 'sql-w4-t24', title: 'PRIMARY KEY Validation' },
    { id: 'sql-w4-t25', title: 'Transaction Example' },
    { id: 'sql-w4-t26', title: 'CRUD Flow' },
    { id: 'sql-w4-t27', title: 'Practical Example' },
    { id: 'sql-w4-t28', title: 'Common Errors' },
    { id: 'sql-w4-t29', title: 'Best Practices' },
    { id: 'sql-w4-t30', title: 'Week 4 Quick Summary' },
    { id: 'sql-w4-t31', title: 'Exam Tips' },
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

/* CRUD Flow */
.crud-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px auto;
  max-width: 200px;
}

.crud-step {
  background: #2b6cb0;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.crud-arrow {
  font-size: 1.2em;
  color: #2b6cb0;
  padding: 2px 0;
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

  .crud-flow {
    max-width: 160px;
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

  .crud-step {
    font-size: 0.9em;
    padding: 6px 14px;
  }
}
</style>