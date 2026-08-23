<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📘 Working with Database Tables</h1>
    </header>

    <!-- What is a Database Table -->
    <section id="sql-w3-t1" class="section">
      <h2>1. What is a Database Table?</h2>
      <div class="content-card">
        <p>A <strong>table</strong> is the basic structure used to store data in a relational database. It consists of <strong>rows (records)</strong> and <strong>columns (fields)</strong>.</p>

        <div class="example-box">
          <p class="example-title">Example: Students Table</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr><th>StudentID</th><th>Name</th><th>Age</th><th>Course</th></tr>
              </thead>
              <tbody>
                <tr><td>101</td><td>Ankit</td><td>21</td><td>SQL</td></tr>
                <tr><td>102</td><td>Rahul</td><td>20</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>Columns</strong> define the type of data.</li>
            <li><strong>Rows</strong> store individual records.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- DDL -->
    <section id="sql-w3-t2" class="section">
      <h2>2. Data Definition Language (DDL)</h2>
      <div class="content-card">
        <p>DDL commands are used to <strong>create, modify, and delete</strong> database objects.</p>

        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Command</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td><code>CREATE</code></td><td>Create database objects</td></tr>
              <tr><td><code>ALTER</code></td><td>Modify existing objects</td></tr>
              <tr><td><code>DROP</code></td><td>Delete objects</td></tr>
              <tr><td><code>TRUNCATE</code></td><td>Remove all data from a table</td></tr>
              <tr><td><code>RENAME</code></td><td>Rename objects</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CREATE TABLE -->
    <section id="sql-w3-t3" class="section">
      <h2>3. CREATE TABLE</h2>
      <div class="content-card">
        <p>The <strong>CREATE TABLE</strong> statement creates a new table.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype
);</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>CREATE TABLE Students (
    StudentID INT,
    Name VARCHAR(50),
    Age INT,
    Course VARCHAR(50)
);</code></pre>
        </div>

        <h3>Output Structure</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>Column</th><th>Data Type</th></tr></thead>
            <tbody>
              <tr><td>StudentID</td><td>INT</td></tr>
              <tr><td>Name</td><td>VARCHAR(50)</td></tr>
              <tr><td>Age</td><td>INT</td></tr>
              <tr><td>Course</td><td>VARCHAR(50)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CREATE TABLE with Constraints -->
    <section id="sql-w3-t4" class="section">
      <h2>4. Creating a Table with Constraints</h2>
      <div class="content-card">
        <pre><code>CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT,
    Course VARCHAR(50)
);</code></pre>
        <p>Here,</p>
        <ul>
          <li>StudentID → Primary Key</li>
          <li>Name → Cannot be NULL</li>
        </ul>
      </div>
    </section>

    <!-- Data Types -->
    <section id="sql-w3-t5" class="section">
      <h2>5. Common SQL Data Types</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead><tr><th>Data Type</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>INT</td><td>Integer numbers</td></tr>
              <tr><td>VARCHAR(n)</td><td>Variable-length text</td></tr>
              <tr><td>CHAR(n)</td><td>Fixed-length text</td></tr>
              <tr><td>DATE</td><td>Stores date</td></tr>
              <tr><td>BOOLEAN</td><td>TRUE or FALSE</td></tr>
              <tr><td>DECIMAL(p,s)</td><td>Decimal numbers</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Viewing Table Structure -->
    <section id="sql-w3-t6" class="section">
      <h2>6. Viewing Table Structure</h2>
      <div class="content-card">
        <p>In MySQL</p>
        <pre><code>DESCRIBE Students;</code></pre>
        <p>or</p>
        <pre><code>DESC Students;</code></pre>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th></tr></thead>
              <tbody>
                <tr><td>StudentID</td><td>INT</td><td>NO</td><td>PRI</td></tr>
                <tr><td>Name</td><td>VARCHAR(50)</td><td>NO</td><td></td></tr>
                <tr><td>Age</td><td>INT</td><td>YES</td><td></td></tr>
                <tr><td>Course</td><td>VARCHAR(50)</td><td>YES</td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ALTER TABLE -->
    <section id="sql-w3-t7" class="section">
      <h2>7. ALTER TABLE</h2>
      <div class="content-card">
        <p>Used to modify an existing table.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>ALTER TABLE table_name
operation;</code></pre>
        </div>
      </div>
    </section>

    <!-- Add Column -->
    <section id="sql-w3-t8" class="section">
      <h2>8. Add a New Column</h2>
      <div class="content-card">
        <pre><code>ALTER TABLE Students
ADD Email VARCHAR(100);</code></pre>

        <p>Table becomes</p>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>StudentID</th><th>Name</th><th>Age</th><th>Course</th><th>Email</th></tr></thead>
            <tbody>
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Add Multiple Columns -->
    <section id="sql-w3-t9" class="section">
      <h2>9. Add Multiple Columns</h2>
      <div class="content-card">
        <pre><code>ALTER TABLE Students
ADD Phone VARCHAR(15),
ADD City VARCHAR(50);</code></pre>
      </div>
    </section>

    <!-- Modify Column -->
    <section id="sql-w3-t10" class="section">
      <h2>10. Modify Column Data Type</h2>
      <div class="content-card">
        <p><strong>(MySQL)</strong></p>
        <pre><code>ALTER TABLE Students
MODIFY Age SMALLINT;</code></pre>

        <p><strong>(SQL Server)</strong></p>
        <pre><code>ALTER TABLE Students
ALTER COLUMN Age SMALLINT;</code></pre>
      </div>
    </section>

    <!-- Rename Column -->
    <section id="sql-w3-t11" class="section">
      <h2>11. Rename a Column</h2>
      <div class="content-card">
        <p><strong>(MySQL 8+)</strong></p>
        <pre><code>ALTER TABLE Students
RENAME COLUMN Name TO Student_Name;</code></pre>
      </div>
    </section>

    <!-- Rename Table -->
    <section id="sql-w3-t12" class="section">
      <h2>12. Rename a Table</h2>
      <div class="content-card">
        <pre><code>ALTER TABLE Students
RENAME TO Student_Details;</code></pre>
        <p>or</p>
        <pre><code>RENAME TABLE Students TO Student_Details;</code></pre>
      </div>
    </section>

    <!-- Drop Column -->
    <section id="sql-w3-t13" class="section">
      <h2>13. Drop a Column</h2>
      <div class="content-card">
        <pre><code>ALTER TABLE Students
DROP COLUMN Email;</code></pre>
        <p>The Email column is permanently deleted.</p>
      </div>
    </section>

    <!-- DROP TABLE -->
    <section id="sql-w3-t14" class="section">
      <h2>14. DROP TABLE</h2>
      <div class="content-card">
        <p>Deletes the entire table and all its data.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>DROP TABLE table_name;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>DROP TABLE Students;</code></pre>
        </div>

        <div class="warning-box">
          <p class="warning-title">⚠️ Warning</p>
          <p>This action <strong>cannot be undone</strong>.</p>
        </div>
      </div>
    </section>

    <!-- DROP Multiple Tables -->
    <section id="sql-w3-t15" class="section">
      <h2>15. DROP Multiple Tables</h2>
      <div class="content-card">
        <pre><code>DROP TABLE Students, Courses;</code></pre>
      </div>
    </section>

    <!-- IF EXISTS -->
    <section id="sql-w3-t16" class="section">
      <h2>16. IF EXISTS</h2>
      <div class="content-card">
        <p>Avoids errors if the table doesn't exist.</p>
        <pre><code>DROP TABLE IF EXISTS Students;</code></pre>
      </div>
    </section>

    <!-- TRUNCATE -->
    <section id="sql-w3-t17" class="section">
      <h2>17. TRUNCATE TABLE</h2>
      <div class="content-card">
        <p>Removes <strong>all rows</strong> but keeps the table structure.</p>
        <pre><code>TRUNCATE TABLE Students;</code></pre>

        <div class="example-box">
          <p><strong>Before</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>ID</th><th>Name</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Ankit</td></tr>
                <tr><td>2</td><td>Rahul</td></tr>
              </tbody>
            </table>
          </div>

          <p><strong>After</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>ID</th><th>Name</th></tr></thead>
              <tbody></tbody>
            </table>
          </div>
          <p>Table still exists.</p>
        </div>
      </div>
    </section>

    <!-- DELETE vs TRUNCATE vs DROP -->
    <section id="sql-w3-t18" class="section">
      <h2>18. DELETE vs TRUNCATE vs DROP</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Feature</th><th>DELETE</th><th>TRUNCATE</th><th>DROP</th></tr>
            </thead>
            <tbody>
              <tr><td>Removes rows</td><td>✅</td><td>✅</td><td>❌</td></tr>
              <tr><td>Removes structure</td><td>❌</td><td>❌</td><td>✅</td></tr>
              <tr><td>WHERE allowed</td><td>✅</td><td>❌</td><td>❌</td></tr>
              <tr><td>Faster</td><td>❌</td><td>✅</td><td>✅</td></tr>
              <tr><td>Can keep table</td><td>✅</td><td>✅</td><td>❌</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Primary Key -->
    <section id="sql-w3-t19" class="section">
      <h2>19. Primary Key</h2>
      <div class="content-card">
        <p>A <strong>Primary Key</strong> uniquely identifies every record.</p>

        <h3>Rules</h3>
        <ul class="feature-list">
          <li>✅ Must be unique</li>
          <li>✅ Cannot contain NULL</li>
          <li>✅ Only one Primary Key per table</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50)
);</code></pre>
        </div>
      </div>
    </section>

    <!-- Composite Primary Key -->
    <section id="sql-w3-t20" class="section">
      <h2>20. Composite Primary Key</h2>
      <div class="content-card">
        <p>More than one column forms the Primary Key.</p>
        <pre><code>CREATE TABLE Enrollment (
    StudentID INT,
    CourseID INT,
    PRIMARY KEY (StudentID, CourseID)
);</code></pre>
      </div>
    </section>

    <!-- Constraints -->
    <section id="sql-w3-t21" class="section">
      <h2>21. Constraints</h2>
      <div class="content-card">
        <p>Constraints enforce rules on table data.</p>

        <div class="table-responsive">
          <table class="symbol-table">
            <thead><tr><th>Constraint</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td>PRIMARY KEY</td><td>Unique identifier</td></tr>
              <tr><td>NOT NULL</td><td>Value required</td></tr>
              <tr><td>UNIQUE</td><td>No duplicate values</td></tr>
              <tr><td>DEFAULT</td><td>Assigns default value</td></tr>
              <tr><td>CHECK</td><td>Restricts values</td></tr>
              <tr><td>FOREIGN KEY</td><td>Links two tables</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- NOT NULL -->
    <section id="sql-w3-t22" class="section">
      <h2>22. NOT NULL Constraint</h2>
      <div class="content-card">
        <p>Ensures a column cannot have NULL values.</p>
        <pre><code>CREATE TABLE Students (
    Name VARCHAR(50) NOT NULL
);</code></pre>
      </div>
    </section>

    <!-- UNIQUE -->
    <section id="sql-w3-t23" class="section">
      <h2>23. UNIQUE Constraint</h2>
      <div class="content-card">
        <p>Allows only unique values.</p>
        <pre><code>CREATE TABLE Students (
    Email VARCHAR(100) UNIQUE
);</code></pre>
        <p>Duplicate email is not allowed.</p>
      </div>
    </section>

    <!-- DEFAULT -->
    <section id="sql-w3-t24" class="section">
      <h2>24. DEFAULT Constraint</h2>
      <div class="content-card">
        <p>Assigns a value automatically if none is provided.</p>
        <pre><code>CREATE TABLE Students (
    Status VARCHAR(20) DEFAULT 'Active'
);</code></pre>
        <p>If Status isn't specified, SQL stores <code>'Active'</code>.</p>
      </div>
    </section>

    <!-- CHECK -->
    <section id="sql-w3-t25" class="section">
      <h2>25. CHECK Constraint</h2>
      <div class="content-card">
        <p>Restricts acceptable values.</p>
        <pre><code>CREATE TABLE Students (
    Age INT CHECK (Age >= 18)
);</code></pre>
        <p>Age below 18 will not be accepted.</p>
      </div>
    </section>

    <!-- FOREIGN KEY -->
    <section id="sql-w3-t26" class="section">
      <h2>26. FOREIGN KEY</h2>
      <div class="content-card">
        <p>Creates a relationship between two tables.</p>

        <div class="example-box">
          <p class="example-title">Students Table</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>CourseID</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>1</td></tr>
                <tr><td>102</td><td>2</td></tr>
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
                <tr><td>1</td><td>SQL</td></tr>
                <tr><td>2</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <pre><code>CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    CourseID INT,
    FOREIGN KEY (CourseID)
    REFERENCES Courses(CourseID)
);</code></pre>
      </div>
    </section>

    <!-- DEFAULT with CURRENT_DATE -->
    <section id="sql-w3-t27" class="section">
      <h2>27. DEFAULT with CURRENT_DATE</h2>
      <div class="content-card">
        <p>Automatically stores today's date.</p>
        <pre><code>CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderDate DATE DEFAULT CURRENT_DATE
);</code></pre>
      </div>
    </section>

    <!-- Practical Example -->
    <section id="sql-w3-t28" class="section">
      <h2>28. Practical Example</h2>
      <div class="content-card">
        <pre><code>CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Department VARCHAR(50),
    Salary DECIMAL(10,2),
    Status VARCHAR(20) DEFAULT 'Active'
);</code></pre>
      </div>
    </section>

    <!-- Table Creation Flow -->
    <section id="sql-w3-t29" class="section">
      <h2>29. Table Creation Flow</h2>
      <div class="content-card">
        <div class="flow-diagram">
          <div class="flow-step">Choose Table Name</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Define Columns</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Select Data Types</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Apply Constraints</div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">Create Table</div>
        </div>
      </div>
    </section>

    <!-- Common Errors -->
    <section id="sql-w3-t30" class="section">
      <h2>30. Common Errors</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Missing Data Type</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>CREATE TABLE Students (
    Name
);</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>CREATE TABLE Students (
    Name VARCHAR(50)
);</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Duplicate Primary Keys</h4>
            <pre><code>PRIMARY KEY(StudentID)
PRIMARY KEY(Email)</code></pre>
            <p>Only one Primary Key is allowed.</p>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Wrong DEFAULT Syntax</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>DEFAULT Active</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>DEFAULT 'Active'</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="sql-w3-t31" class="section">
      <h2>31. Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Use meaningful table names (<code>Students</code>, <code>Employees</code>).</li>
          <li>📌 Use <code>PRIMARY KEY</code> for every table.</li>
          <li>📌 Choose appropriate data types.</li>
          <li>📌 Apply constraints to improve data integrity.</li>
          <li>📌 Use <code>DEFAULT</code> values where appropriate.</li>
          <li>📌 Avoid dropping production tables without backups.</li>
          <li>📌 Use <code>IF EXISTS</code> with <code>DROP TABLE</code> to prevent errors.</li>
        </ul>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w3-t32" class="section revision-section">
      <h2>32. Week 3 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ <code>CREATE TABLE</code> creates a new database table.</li>
          <li>✔ <code>ALTER TABLE</code> modifies an existing table.</li>
          <li>✔ <code>DROP TABLE</code> permanently deletes a table and its data.</li>
          <li>✔ <code>TRUNCATE TABLE</code> removes all rows while keeping the table structure.</li>
          <li>✔ <code>PRIMARY KEY</code> uniquely identifies each row.</li>
          <li>✔ <code>NOT NULL</code>, <code>UNIQUE</code>, <code>DEFAULT</code>, <code>CHECK</code>, and <code>FOREIGN KEY</code> help maintain data integrity.</li>
          <li>✔ Use the correct data types and constraints when designing tables.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w3-t33" class="section">
      <h2>🧠 Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 <code>CREATE TABLE</code> is used only once when creating a new table.</li>
          <li>💡 <code>ALTER TABLE</code> changes an existing table without recreating it.</li>
          <li>💡 <code>DROP TABLE</code> removes both the table structure and all stored data.</li>
          <li>💡 <code>TRUNCATE TABLE</code> is faster than <code>DELETE</code> when removing all records.</li>
          <li>💡 Every table should have a <code>PRIMARY KEY</code>.</li>
          <li>💡 <code>DEFAULT</code> automatically fills missing values during insertion.</li>
          <li>💡 <code>FOREIGN KEY</code> maintains relationships and enforces referential integrity between tables.</li>
          <li>💡 Always double-check <code>DROP</code> and <code>ALTER</code> statements before executing them, as they can permanently change your database.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 3 | Working with Database Tables</p>
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
    { id: 'sql-w3-t1', title: 'What is a Database Table?' },
    { id: 'sql-w3-t2', title: 'Data Definition Language (DDL)' },
    { id: 'sql-w3-t3', title: 'CREATE TABLE' },
    { id: 'sql-w3-t4', title: 'Creating Table with Constraints' },
    { id: 'sql-w3-t5', title: 'Common SQL Data Types' },
    { id: 'sql-w3-t6', title: 'Viewing Table Structure' },
    { id: 'sql-w3-t7', title: 'ALTER TABLE' },
    { id: 'sql-w3-t8', title: 'Add a New Column' },
    { id: 'sql-w3-t9', title: 'Add Multiple Columns' },
    { id: 'sql-w3-t10', title: 'Modify Column Data Type' },
    { id: 'sql-w3-t11', title: 'Rename a Column' },
    { id: 'sql-w3-t12', title: 'Rename a Table' },
    { id: 'sql-w3-t13', title: 'Drop a Column' },
    { id: 'sql-w3-t14', title: 'DROP TABLE' },
    { id: 'sql-w3-t15', title: 'DROP Multiple Tables' },
    { id: 'sql-w3-t16', title: 'IF EXISTS' },
    { id: 'sql-w3-t17', title: 'TRUNCATE TABLE' },
    { id: 'sql-w3-t18', title: 'DELETE vs TRUNCATE vs DROP' },
    { id: 'sql-w3-t19', title: 'Primary Key' },
    { id: 'sql-w3-t20', title: 'Composite Primary Key' },
    { id: 'sql-w3-t21', title: 'Constraints' },
    { id: 'sql-w3-t22', title: 'NOT NULL Constraint' },
    { id: 'sql-w3-t23', title: 'UNIQUE Constraint' },
    { id: 'sql-w3-t24', title: 'DEFAULT Constraint' },
    { id: 'sql-w3-t25', title: 'CHECK Constraint' },
    { id: 'sql-w3-t26', title: 'FOREIGN KEY' },
    { id: 'sql-w3-t27', title: 'DEFAULT with CURRENT_DATE' },
    { id: 'sql-w3-t28', title: 'Practical Example' },
    { id: 'sql-w3-t29', title: 'Table Creation Flow' },
    { id: 'sql-w3-t30', title: 'Common Errors' },
    { id: 'sql-w3-t31', title: 'Best Practices' },
    { id: 'sql-w3-t32', title: 'Week 3 Quick Summary' },
    { id: 'sql-w3-t33', title: 'Exam Tips' },
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

/* Flow Diagram */
.flow-diagram {
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

.flow-step {
  background: #2b6cb0;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.flow-arrow {
  font-size: 1.5em;
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

  .flow-diagram {
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

  .flow-diagram {
    max-width: 160px;
  }

  .flow-step {
    font-size: 0.9em;
    padding: 6px 14px;
  }
}
</style>