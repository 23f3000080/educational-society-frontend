<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📘 Joins & Database Relationships</h1>
    </header>

    <!-- Database Relationships -->
    <section id="sql-w6-t1" class="section">
      <h2>1. What are Database Relationships?</h2>
      <div class="content-card">
        <p>A <strong>database relationship</strong> defines how two or more tables are connected using a <strong>Primary Key</strong> and a <strong>Foreign Key</strong>.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          
          <div class="table-responsive">
            <p><strong>Students Table</strong></p>
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>Ankit</td></tr>
                <tr><td>102</td><td>Rahul</td></tr>
              </tbody>
            </table>
          </div>

          <div class="table-responsive">
            <p><strong>Courses Table</strong></p>
            <table class="data-table">
              <thead><tr><th>CourseID</th><th>CourseName</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>SQL</td></tr>
                <tr><td>2</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>

          <div class="table-responsive">
            <p><strong>Enrollment Table</strong></p>
            <table class="data-table">
              <thead><tr><th>EnrollmentID</th><th>StudentID</th><th>CourseID</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>101</td><td>1</td></tr>
                <tr><td>2</td><td>102</td><td>2</td></tr>
              </tbody>
            </table>
          </div>
          <p>The <strong>StudentID</strong> and <strong>CourseID</strong> columns connect the tables.</p>
        </div>
      </div>
    </section>

    <!-- Why Use Relationships -->
    <section id="sql-w6-t2" class="section">
      <h2>2. Why Use Relationships?</h2>
      <div class="content-card">
        <p>Instead of storing duplicate data, relationships help to:</p>
        <ul class="feature-list">
          <li>📌 Reduce data redundancy</li>
          <li>📌 Improve data consistency</li>
          <li>📌 Save storage space</li>
          <li>📌 Make updates easier</li>
          <li>📌 Maintain data integrity</li>
        </ul>
      </div>
    </section>

    <!-- Primary Key vs Foreign Key -->
    <section id="sql-w6-t3" class="section">
      <h2>3. Primary Key vs Foreign Key</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Primary Key</th><th>Foreign Key</th></tr>
            </thead>
            <tbody>
              <tr><td>Uniquely identifies each row</td><td>References another table's Primary Key</td></tr>
              <tr><td>Must be unique</td><td>Can contain duplicate values</td></tr>
              <tr><td>Cannot be NULL</td><td>May contain NULL (depending on design)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>CREATE TABLE Students(
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50)
);</code></pre>
          <pre><code>CREATE TABLE Enrollment(
    EnrollmentID INT PRIMARY KEY,
    StudentID INT,
    FOREIGN KEY(StudentID)
    REFERENCES Students(StudentID)
);</code></pre>
        </div>
      </div>
    </section>

    <!-- Types of Relationships -->
    <section id="sql-w6-t4" class="section">
      <h2>4. Types of Relationships</h2>
      <div class="content-card">
        <p>There are three common relationship types:</p>
        <ul class="feature-list">
          <li>🔗 One-to-One (1:1)</li>
          <li>🔗 One-to-Many (1:M)</li>
          <li>🔗 Many-to-Many (M:N)</li>
        </ul>
      </div>
    </section>

    <!-- One-to-One -->
    <section id="sql-w6-t5" class="section">
      <h2>5. One-to-One Relationship</h2>
      <div class="content-card">
        <p>Each record in one table is related to <strong>only one</strong> record in another table.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <p><strong>Students</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th></tr></thead>
              <tbody><tr><td>101</td><td>Ankit</td></tr></tbody>
            </table>
          </div>
          <p><strong>Student_Profile</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>PassportNo</th></tr></thead>
              <tbody><tr><td>101</td><td>AB12345</td></tr></tbody>
            </table>
          </div>
          <p>One student has one profile.</p>
        </div>
      </div>
    </section>

    <!-- One-to-Many -->
    <section id="sql-w6-t6" class="section">
      <h2>6. One-to-Many Relationship</h2>
      <div class="content-card">
        <p>One record in the first table can relate to <strong>many</strong> records in another table.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <p><strong>Departments</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>DepartmentID</th><th>Department</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>IT</td></tr>
                <tr><td>2</td><td>HR</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Employees</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>EmployeeID</th><th>DepartmentID</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>1</td></tr>
                <tr><td>2</td><td>1</td></tr>
                <tr><td>3</td><td>2</td></tr>
              </tbody>
            </table>
          </div>
          <p>One department has many employees.</p>
        </div>
      </div>
    </section>

    <!-- Many-to-Many -->
    <section id="sql-w6-t7" class="section">
      <h2>7. Many-to-Many Relationship</h2>
      <div class="content-card">
        <p>Many records relate to many records.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <p><strong>Students</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>Ankit</td></tr>
                <tr><td>102</td><td>Rahul</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Courses</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>CourseID</th><th>Course</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>SQL</td></tr>
                <tr><td>2</td><td>Python</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Enrollment Table</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>CourseID</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>1</td></tr>
                <tr><td>101</td><td>2</td></tr>
                <tr><td>102</td><td>2</td></tr>
              </tbody>
            </table>
          </div>
          <p>A student can enroll in multiple courses, and a course can have multiple students.</p>
        </div>
      </div>
    </section>

    <!-- What is JOIN -->
    <section id="sql-w6-t8" class="section">
      <h2>8. What is JOIN?</h2>
      <div class="content-card">
        <p>A <strong>JOIN</strong> combines rows from two or more tables based on a related column.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <p><strong>Students</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Name</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>Ankit</td></tr>
                <tr><td>102</td><td>Rahul</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Marks</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>StudentID</th><th>Marks</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>95</td></tr>
                <tr><td>102</td><td>88</td></tr>
              </tbody>
            </table>
          </div>
          <p>JOIN combines both tables into one result.</p>
        </div>
      </div>
    </section>

    <!-- Types of SQL JOINs -->
    <section id="sql-w6-t9" class="section">
      <h2>9. Types of SQL JOINs</h2>
      <div class="content-card">
        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>JOIN</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td>INNER JOIN</td><td>Matching rows only</td></tr>
              <tr><td>LEFT JOIN</td><td>All rows from left table</td></tr>
              <tr><td>RIGHT JOIN</td><td>All rows from right table</td></tr>
              <tr><td>FULL JOIN</td><td>All rows from both tables</td></tr>
              <tr><td>CROSS JOIN</td><td>Every possible combination</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- INNER JOIN -->
    <section id="sql-w6-t10" class="section">
      <h2>10. INNER JOIN</h2>
      <div class="content-card">
        <p>Returns only matching records.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT Students.Name,
    Marks.Marks
FROM Students
INNER JOIN Marks
ON Students.StudentID = Marks.StudentID;</code></pre>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Name</th><th>Marks</th></tr></thead>
              <tbody>
                <tr><td>Ankit</td><td>95</td></tr>
                <tr><td>Rahul</td><td>88</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3>INNER JOIN Flow</h3>
        <div class="join-flow">
          <div class="join-circle">Students</div>
          <div class="join-intersection">∩</div>
          <div class="join-circle">Marks</div>
        </div>
        <p>Only common records appear.</p>
      </div>
    </section>

    <!-- LEFT JOIN -->
    <section id="sql-w6-t11" class="section">
      <h2>11. LEFT JOIN</h2>
      <div class="content-card">
        <p>Returns <strong>all rows from the left table</strong>, whether matching rows exist or not.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT *
FROM Students
LEFT JOIN Marks
ON Students.StudentID = Marks.StudentID;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Name</th><th>Marks</th></tr></thead>
              <tbody>
                <tr><td>Ankit</td><td>95</td></tr>
                <tr><td>Rahul</td><td>88</td></tr>
                <tr><td>Priya</td><td>NULL</td></tr>
              </tbody>
            </table>
          </div>
          <p>Priya has no marks but still appears.</p>
        </div>

        <h3>LEFT JOIN Flow</h3>
        <div class="join-flow">
          <div class="join-circle full">Students</div>
          <div class="join-intersection">∩</div>
          <div class="join-circle">Marks</div>
        </div>
        <p>Everything from the left table is included.</p>
      </div>
    </section>

    <!-- RIGHT JOIN -->
    <section id="sql-w6-t12" class="section">
      <h2>12. RIGHT JOIN</h2>
      <div class="content-card">
        <p>Returns <strong>all rows from the right table</strong>.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>SELECT *
FROM Students
RIGHT JOIN Marks
ON Students.StudentID = Marks.StudentID;</code></pre>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Name</th><th>Marks</th></tr></thead>
              <tbody>
                <tr><td>Ankit</td><td>95</td></tr>
                <tr><td>Rahul</td><td>88</td></tr>
                <tr><td>NULL</td><td>90</td></tr>
              </tbody>
            </table>
          </div>
          <p>A marks record exists without a matching student.</p>
        </div>

        <h3>RIGHT JOIN Flow</h3>
        <div class="join-flow">
          <div class="join-circle">Students</div>
          <div class="join-intersection">∩</div>
          <div class="join-circle full">Marks</div>
        </div>
        <p>Everything from the right table is included.</p>
      </div>
    </section>

    <!-- FULL OUTER JOIN -->
    <section id="sql-w6-t13" class="section">
      <h2>13. FULL OUTER JOIN</h2>
      <div class="content-card">
        <p>Returns every record from both tables.</p>

        <div class="syntax-box">
          <p class="syntax-title">Syntax</p>
          <pre><code>SELECT *
FROM Students
FULL OUTER JOIN Marks
ON Students.StudentID = Marks.StudentID;</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Output</p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>Name</th><th>Marks</th></tr></thead>
              <tbody>
                <tr><td>Ankit</td><td>95</td></tr>
                <tr><td>Rahul</td><td>88</td></tr>
                <tr><td>Priya</td><td>NULL</td></tr>
                <tr><td>NULL</td><td>90</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3>FULL JOIN Flow</h3>
        <div class="join-flow">
          <div class="join-circle full">Students</div>
          <div class="join-intersection">∩</div>
          <div class="join-circle full">Marks</div>
        </div>
        <p>Includes:</p>
        <ul>
          <li>Matching rows</li>
          <li>Left-only rows</li>
          <li>Right-only rows</li>
        </ul>
      </div>
    </section>

    <!-- CROSS JOIN -->
    <section id="sql-w6-t14" class="section">
      <h2>14. CROSS JOIN</h2>
      <div class="content-card">
        <p>Returns every possible combination.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <p>Students: 3 rows</p>
          <p>Courses: 2 rows</p>
          <p><strong>Result:</strong> 3 × 2 = 6 rows</p>
          <pre><code>SELECT *
FROM Students
CROSS JOIN Courses;</code></pre>
        </div>
      </div>
    </section>

    <!-- Table Aliases -->
    <section id="sql-w6-t15" class="section">
      <h2>15. Table Aliases</h2>
      <div class="content-card">
        <p>Aliases make queries shorter.</p>

        <h3>Instead of</h3>
        <pre><code>SELECT Students.Name
FROM Students;</code></pre>

        <h3>Use</h3>
        <pre><code>SELECT s.Name
FROM Students s;</code></pre>
      </div>
    </section>

    <!-- JOIN Using Aliases -->
    <section id="sql-w6-t16" class="section">
      <h2>16. JOIN Using Aliases</h2>
      <div class="content-card">
        <pre><code>SELECT
    s.Name,
    m.Marks
FROM Students s
INNER JOIN Marks m
ON s.StudentID = m.StudentID;</code></pre>
      </div>
    </section>

    <!-- Joining Three Tables -->
    <section id="sql-w6-t17" class="section">
      <h2>17. Joining Three Tables</h2>
      <div class="content-card">
        <p>Students → Enrollment → Courses</p>

        <pre><code>SELECT
    s.Name,
    c.CourseName
FROM Students s
INNER JOIN Enrollment e
ON s.StudentID = e.StudentID
INNER JOIN Courses c
ON e.CourseID = c.CourseID;</code></pre>
      </div>
    </section>

    <!-- SELF JOIN -->
    <section id="sql-w6-t18" class="section">
      <h2>18. SELF JOIN</h2>
      <div class="content-card">
        <p>A table joins with itself.</p>

        <div class="example-box">
          <p class="example-title">Example</p>
          <p><strong>Employees</strong></p>
          <div class="table-responsive">
            <table class="data-table">
              <thead><tr><th>EmployeeID</th><th>Name</th><th>ManagerID</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Ankit</td><td>NULL</td></tr>
                <tr><td>2</td><td>Rahul</td><td>1</td></tr>
                <tr><td>3</td><td>Priya</td><td>1</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>SELECT
    e.Name AS Employee,
    m.Name AS Manager
FROM Employees e
LEFT JOIN Employees m
ON e.ManagerID = m.EmployeeID;</code></pre>
        </div>
      </div>
    </section>

    <!-- Common JOIN Mistakes -->
    <section id="sql-w6-t19" class="section">
      <h2>19. Common JOIN Mistakes</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Missing ON Clause</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>SELECT *
FROM Students
JOIN Marks;</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Always specify the join condition</p>
              <pre><code>SELECT *
FROM Students
JOIN Marks
ON Students.StudentID = Marks.StudentID;</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Wrong Join Column</h4>
            <p>Join using related keys only.</p>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>ON Students.StudentID =
Marks.StudentID</code></pre>
            </div>
          </div>

          <div class="mistake-box full-width">
            <h4>❌ Ambiguous Column Names</h4>
            <p><strong>Wrong</strong></p>
            <pre><code>SELECT StudentID
FROM Students
JOIN Marks;</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Correct</p>
              <pre><code>SELECT Students.StudentID
FROM Students
JOIN Marks
ON Students.StudentID = Marks.StudentID;</code></pre>
              <p>Or use aliases.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Practical Examples -->
    <section id="sql-w6-t20" class="section">
      <h2>20. Practical Examples</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item full-width">
            <h4>Student names with marks</h4>
            <pre><code>SELECT s.Name,
    m.Marks
FROM Students s
INNER JOIN Marks m
ON s.StudentID = m.StudentID;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Department and employees</h4>
            <pre><code>SELECT
    e.Name,
    d.Department
FROM Employees e
INNER JOIN Departments d
ON e.DepartmentID = d.DepartmentID;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Students without marks</h4>
            <pre><code>SELECT s.Name
FROM Students s
LEFT JOIN Marks m
ON s.StudentID = m.StudentID
WHERE m.StudentID IS NULL;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Courses with enrolled students</h4>
            <pre><code>SELECT
    c.CourseName,
    s.Name
FROM Enrollment e
INNER JOIN Students s
ON e.StudentID = s.StudentID
INNER JOIN Courses c
ON e.CourseID = c.CourseID;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="sql-w6-t21" class="section">
      <h2>21. Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Always join tables using <strong>Primary Key</strong> and <strong>Foreign Key</strong> relationships.</li>
          <li>📌 Use table aliases (<code>s</code>, <code>e</code>, <code>c</code>) to improve readability.</li>
          <li>📌 Specify only the columns you need instead of using <code>SELECT *</code>.</li>
          <li>📌 Always include an <code>ON</code> clause with joins (except <code>CROSS JOIN</code>).</li>
          <li>📌 Use <code>LEFT JOIN</code> when unmatched records are also important.</li>
          <li>📌 Add indexes to frequently joined columns for better performance.</li>
        </ul>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w6-t22" class="section revision-section">
      <h2>22. Week 6 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ Relationships connect tables using <strong>Primary Keys</strong> and <strong>Foreign Keys</strong>.</li>
          <li>✔ One-to-One: one record relates to one record.</li>
          <li>✔ One-to-Many: one record relates to many records.</li>
          <li>✔ Many-to-Many: many records relate to many records through a junction table.</li>
          <li>✔ <code>INNER JOIN</code> returns only matching rows.</li>
          <li>✔ <code>LEFT JOIN</code> returns all rows from the left table and matching rows from the right.</li>
          <li>✔ <code>RIGHT JOIN</code> returns all rows from the right table and matching rows from the left.</li>
          <li>✔ <code>FULL OUTER JOIN</code> returns all matching and non-matching rows from both tables.</li>
          <li>✔ Table aliases make complex queries shorter and easier to read.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w6-t23" class="section">
      <h2>🧠 Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 A <strong>Primary Key</strong> uniquely identifies each row, while a <strong>Foreign Key</strong> creates relationships between tables.</li>
          <li>💡 <code>INNER JOIN</code> returns only matching records.</li>
          <li>💡 <code>LEFT JOIN</code> is commonly used to find records without matching data using <code>WHERE right_table.column IS NULL</code>.</li>
          <li>💡 <code>RIGHT JOIN</code> is supported in many databases, but some developers prefer rewriting it as a <code>LEFT JOIN</code> for readability.</li>
          <li>💡 <code>FULL OUTER JOIN</code> is not supported in some databases like MySQL without using workarounds such as <code>UNION</code>.</li>
          <li>💡 Always use meaningful aliases in multi-table queries.</li>
          <li>💡 Join conditions should use related key columns to avoid incorrect results or duplicate rows.</li>
        </ul>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 6 | Joins & Database Relationships</p>
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
    { id: 'sql-w6-t1', title: 'Database Relationships' },
    { id: 'sql-w6-t2', title: 'Why Use Relationships?' },
    { id: 'sql-w6-t3', title: 'Primary Key vs Foreign Key' },
    { id: 'sql-w6-t4', title: 'Types of Relationships' },
    { id: 'sql-w6-t5', title: 'One-to-One Relationship' },
    { id: 'sql-w6-t6', title: 'One-to-Many Relationship' },
    { id: 'sql-w6-t7', title: 'Many-to-Many Relationship' },
    { id: 'sql-w6-t8', title: 'What is JOIN?' },
    { id: 'sql-w6-t9', title: 'Types of SQL JOINs' },
    { id: 'sql-w6-t10', title: 'INNER JOIN' },
    { id: 'sql-w6-t11', title: 'LEFT JOIN' },
    { id: 'sql-w6-t12', title: 'RIGHT JOIN' },
    { id: 'sql-w6-t13', title: 'FULL OUTER JOIN' },
    { id: 'sql-w6-t14', title: 'CROSS JOIN' },
    { id: 'sql-w6-t15', title: 'Table Aliases' },
    { id: 'sql-w6-t16', title: 'JOIN Using Aliases' },
    { id: 'sql-w6-t17', title: 'Joining Three Tables' },
    { id: 'sql-w6-t18', title: 'SELF JOIN' },
    { id: 'sql-w6-t19', title: 'Common JOIN Mistakes' },
    { id: 'sql-w6-t20', title: 'Practical Examples' },
    { id: 'sql-w6-t21', title: 'Best Practices' },
    { id: 'sql-w6-t22', title: 'Week 6 Quick Summary' },
    { id: 'sql-w6-t23', title: 'Exam Tips' },
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

/* Join Flow */
.join-flow {
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

.join-circle {
  background: #2b6cb0;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 500;
}

.join-circle.full {
  background: #38a169;
}

.join-intersection {
  font-size: 2em;
  color: #2b6cb0;
  font-weight: bold;
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

  .join-flow {
    flex-direction: column;
    gap: 8px;
  }

  .join-intersection {
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

  .join-circle {
    padding: 6px 16px;
    font-size: 0.9em;
  }
}
</style>