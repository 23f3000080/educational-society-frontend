<template>
  <div class="cheatsheet-container">
    <header class="cheatsheet-header">
      <h1>📘 Capstone Project & Real-World SQL Applications</h1>
    </header>

    <!-- What is a Capstone Project -->
    <section id="sql-w8-t1" class="section">
      <h2>1. What is a Capstone Project?</h2>
      <div class="content-card">
        <p>A <strong>Capstone Project</strong> is a practical project that demonstrates your ability to apply SQL concepts to solve real-world business problems.</p>

        <h3>In this project, you will:</h3>
        <ul class="feature-list">
          <li>✅ Design a database</li>
          <li>✅ Create tables</li>
          <li>✅ Define relationships</li>
          <li>✅ Insert sample data</li>
          <li>✅ Write SQL queries</li>
          <li>✅ Generate business reports</li>
          <li>✅ Optimize query performance</li>
        </ul>
      </div>
    </section>

    <!-- SQL Skills Used -->
    <section id="sql-w8-t2" class="section">
      <h2>2. SQL Skills Used</h2>
      <div class="content-card">
        <p>This project combines everything learned in previous weeks.</p>

        <div class="table-responsive">
          <table class="symbol-table">
            <thead>
              <tr><th>Topic</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td>CREATE TABLE</td><td>Design database</td></tr>
              <tr><td>INSERT</td><td>Store data</td></tr>
              <tr><td>UPDATE</td><td>Modify records</td></tr>
              <tr><td>DELETE</td><td>Remove records</td></tr>
              <tr><td>SELECT</td><td>Retrieve data</td></tr>
              <tr><td>WHERE</td><td>Filter records</td></tr>
              <tr><td>ORDER BY</td><td>Sort data</td></tr>
              <tr><td>Aggregate Functions</td><td>Generate reports</td></tr>
              <tr><td>GROUP BY</td><td>Summarize data</td></tr>
              <tr><td>HAVING</td><td>Filter grouped results</td></tr>
              <tr><td>JOIN</td><td>Combine multiple tables</td></tr>
              <tr><td>Subqueries</td><td>Advanced retrieval</td></tr>
              <tr><td>Views</td><td>Simplify reporting</td></tr>
              <tr><td>CASE</td><td>Conditional logic</td></tr>
              <tr><td>Indexes</td><td>Improve performance</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Database Design Fundamentals -->
    <section id="sql-w8-t3" class="section">
      <h2>3. Database Design Fundamentals</h2>
      <div class="content-card">
        <p>Before writing SQL, plan the database carefully.</p>

        <h3>Steps:</h3>
        <ol class="steps-list">
          <li>Identify entities</li>
          <li>Identify attributes</li>
          <li>Define Primary Keys</li>
          <li>Define Foreign Keys</li>
          <li>Create relationships</li>
          <li>Normalize tables</li>
          <li>Create schema</li>
        </ol>
      </div>
    </section>

    <!-- Example Business Scenario -->
    <section id="sql-w8-t4" class="section">
      <h2>4. Example Business Scenario</h2>
      <div class="content-card">
        <h3>E-Commerce Database</h3>
        <p>Main entities:</p>
        <ul class="feature-list">
          <li>🛒 Customers</li>
          <li>📦 Products</li>
          <li>📂 Categories</li>
          <li>📋 Orders</li>
          <li>📝 OrderItems</li>
          <li>💳 Payments</li>
        </ul>
      </div>
    </section>

    <!-- Database Schema -->
    <section id="sql-w8-t5" class="section">
      <h2>5. Database Schema</h2>
      <div class="content-card">
        <div class="schema-flow">
          <div class="schema-item">Customers</div>
          <div class="schema-arrow">│</div>
          <div class="schema-item">Orders</div>
          <div class="schema-arrow">│</div>
          <div class="schema-item">OrderItems</div>
          <div class="schema-arrow">│</div>
          <div class="schema-item">Products</div>
          <div class="schema-arrow">│</div>
          <div class="schema-item">Categories</div>
          <div class="schema-spacer">│</div>
          <div class="schema-item">Orders</div>
          <div class="schema-arrow">│</div>
          <div class="schema-item">Payments</div>
        </div>
      </div>
    </section>

    <!-- Schema Planning -->
    <section id="sql-w8-t6" class="section">
      <h2>6. Schema Planning</h2>
      <div class="content-card">
        <h3>Customers</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>Column</th><th>Data Type</th></tr></thead>
            <tbody>
              <tr><td>CustomerID</td><td>INT</td></tr>
              <tr><td>Name</td><td>VARCHAR(100)</td></tr>
              <tr><td>Email</td><td>VARCHAR(100)</td></tr>
              <tr><td>Phone</td><td>VARCHAR(15)</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Products</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>Column</th><th>Data Type</th></tr></thead>
            <tbody>
              <tr><td>ProductID</td><td>INT</td></tr>
              <tr><td>ProductName</td><td>VARCHAR(100)</td></tr>
              <tr><td>Price</td><td>DECIMAL(10,2)</td></tr>
              <tr><td>CategoryID</td><td>INT</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Orders</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>Column</th><th>Data Type</th></tr></thead>
            <tbody>
              <tr><td>OrderID</td><td>INT</td></tr>
              <tr><td>CustomerID</td><td>INT</td></tr>
              <tr><td>OrderDate</td><td>DATE</td></tr>
              <tr><td>TotalAmount</td><td>DECIMAL(10,2)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Creating Tables -->
    <section id="sql-w8-t7" class="section">
      <h2>7. Creating Tables</h2>
      <div class="content-card">
        <div class="example-box">
          <p class="example-title">Customers</p>
          <pre><code>CREATE TABLE Customers(
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(15)
);</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Products</p>
          <pre><code>CREATE TABLE Products(
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Price DECIMAL(10,2)
);</code></pre>
        </div>

        <div class="example-box">
          <p class="example-title">Orders</p>
          <pre><code>CREATE TABLE Orders(
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    FOREIGN KEY(CustomerID)
    REFERENCES Customers(CustomerID)
);</code></pre>
        </div>
      </div>
    </section>

    <!-- Insert Sample Data -->
    <section id="sql-w8-t8" class="section">
      <h2>8. Insert Sample Data</h2>
      <div class="content-card">
        <h3>Customers</h3>
        <pre><code>INSERT INTO Customers
VALUES
(1,'Ankit','ankit@email.com','9876543210'),
(2,'Rahul','rahul@email.com','9876500000');</code></pre>

        <h3>Products</h3>
        <pre><code>INSERT INTO Products
VALUES
(101,'Laptop',65000),
(102,'Mouse',800),
(103,'Keyboard',1500);</code></pre>
      </div>
    </section>

    <!-- Business Queries -->
    <section id="sql-w8-t9" class="section">
      <h2>9. Business Queries</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item full-width">
            <h4>List all customers</h4>
            <pre><code>SELECT *
FROM Customers;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Products above 1000</h4>
            <pre><code>SELECT *
FROM Products
WHERE Price>1000;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Orders sorted by date</h4>
            <pre><code>SELECT *
FROM Orders
ORDER BY OrderDate DESC;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- JOIN Queries -->
    <section id="sql-w8-t10" class="section">
      <h2>10. JOIN Queries</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item full-width">
            <h4>Customer orders</h4>
            <pre><code>SELECT
    c.Name,
    o.OrderID,
    o.OrderDate
FROM Customers c
INNER JOIN Orders o
ON c.CustomerID = o.CustomerID;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Products ordered</h4>
            <pre><code>SELECT
    o.OrderID,
    p.ProductName
FROM OrderItems oi
INNER JOIN Orders o
ON oi.OrderID = o.OrderID
INNER JOIN Products p
ON oi.ProductID = p.ProductID;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Business Reports -->
    <section id="sql-w8-t11" class="section">
      <h2>11. Business Reports</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item">
            <h4>Total sales</h4>
            <pre><code>SELECT
SUM(TotalAmount)
FROM Orders;</code></pre>
          </div>

          <div class="example-item">
            <h4>Average order value</h4>
            <pre><code>SELECT
AVG(TotalAmount)
FROM Orders;</code></pre>
          </div>

          <div class="example-item">
            <h4>Highest priced product</h4>
            <pre><code>SELECT
MAX(Price)
FROM Products;</code></pre>
          </div>

          <div class="example-item">
            <h4>Most expensive order</h4>
            <pre><code>SELECT
MAX(TotalAmount)
FROM Orders;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- GROUP BY Reports -->
    <section id="sql-w8-t12" class="section">
      <h2>12. GROUP BY Reports</h2>
      <div class="content-card">
        <div class="examples-grid">
          <div class="example-item full-width">
            <h4>Orders per customer</h4>
            <pre><code>SELECT
    CustomerID,
    COUNT(*)
FROM Orders
GROUP BY CustomerID;</code></pre>
          </div>

          <div class="example-item full-width">
            <h4>Total sales by customer</h4>
            <pre><code>SELECT
    CustomerID,
    SUM(TotalAmount)
FROM Orders
GROUP BY CustomerID;</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- CASE Statement -->
    <section id="sql-w8-t13" class="section">
      <h2>13. CASE Statement Example</h2>
      <div class="content-card">
        <pre><code>SELECT
    Name,
    CASE
        WHEN TotalSpent >= 100000 THEN 'Premium'
        WHEN TotalSpent >= 50000 THEN 'Gold'
        ELSE 'Regular'
    END AS CustomerType
FROM CustomerSummary;</code></pre>
      </div>
    </section>

    <!-- Creating a View -->
    <section id="sql-w8-t14" class="section">
      <h2>14. Creating a View</h2>
      <div class="content-card">
        <pre><code>CREATE VIEW CustomerOrders AS
SELECT
    c.Name,
    o.OrderID,
    o.TotalAmount
FROM Customers c
INNER JOIN Orders o
ON c.CustomerID = o.CustomerID;</code></pre>

        <p><strong>Use</strong></p>
        <pre><code>SELECT *
FROM CustomerOrders;</code></pre>
      </div>
    </section>

    <!-- Performance Optimization -->
    <section id="sql-w8-t15" class="section">
      <h2>15. Performance Optimization Basics</h2>
      <div class="content-card">
        <p>Improve query performance by:</p>
        <ul class="feature-list">
          <li>✅ Creating indexes</li>
          <li>✅ Avoiding <code>SELECT *</code></li>
          <li>✅ Filtering rows using <code>WHERE</code></li>
          <li>✅ Limiting returned rows</li>
          <li>✅ Using JOINs efficiently</li>
          <li>✅ Indexing frequently searched columns</li>
        </ul>

        <div class="example-box">
          <p class="example-title">Example</p>
          <pre><code>CREATE INDEX idx_customer
ON Orders(CustomerID);</code></pre>
        </div>
      </div>
    </section>

    <!-- Normalization -->
    <section id="sql-w8-t16" class="section">
      <h2>16. Database Normalization</h2>
      <div class="content-card">
        <p>Normalization reduces duplicate data.</p>

        <h3>First Normal Form (1NF)</h3>
        <ul>
          <li>Atomic values</li>
          <li>No repeating groups</li>
        </ul>

        <h3>Second Normal Form (2NF)</h3>
        <ul>
          <li>Remove partial dependency</li>
          <li>Every non-key attribute depends on the entire Primary Key</li>
        </ul>

        <h3>Third Normal Form (3NF)</h3>
        <ul>
          <li>Remove transitive dependency</li>
          <li>Non-key attributes depend only on the Primary Key</li>
        </ul>
      </div>
    </section>

    <!-- Development Workflow -->
    <section id="sql-w8-t17" class="section">
      <h2>17. Database Development Workflow</h2>
      <div class="content-card">
        <div class="workflow-flow">
          <div class="workflow-step">Requirements</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Database Design</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Create Tables</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Define Relationships</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Insert Data</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Write Queries</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Generate Reports</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Optimize Queries</div>
        </div>
      </div>
    </section>

    <!-- Capstone Workflow -->
    <section id="sql-w8-t18" class="section">
      <h2>18. Capstone Project Workflow</h2>
      <div class="content-card">
        <div class="workflow-flow">
          <div class="workflow-step">Problem Statement</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Identify Entities</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Design ER Diagram</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Create Tables</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Insert Sample Data</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Write CRUD Queries</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Write JOIN Queries</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Generate Reports</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Optimize Database</div>
          <div class="workflow-arrow">↓</div>
          <div class="workflow-step">Project Presentation</div>
        </div>
      </div>
    </section>

    <!-- Sample Capstone Requirements -->
    <section id="sql-w8-t19" class="section">
      <h2>19. Sample Capstone Project Requirements</h2>
      <div class="content-card">
        <h3>Project Title: E-Commerce Database Management System</h3>

        <h4>Features</h4>
        <ul class="feature-list">
          <li>✅ Customer Management</li>
          <li>✅ Product Management</li>
          <li>✅ Order Management</li>
          <li>✅ Payment Tracking</li>
          <li>✅ Sales Reports</li>
          <li>✅ Inventory Reports</li>
          <li>✅ Customer Purchase History</li>
        </ul>
      </div>
    </section>

    <!-- Business Questions -->
    <section id="sql-w8-t20" class="section">
      <h2>20. Sample Business Questions</h2>
      <div class="content-card">
        <p>Write SQL queries to answer:</p>
        <ol class="questions-list">
          <li>Which customer placed the most orders?</li>
          <li>Which product generated the highest revenue?</li>
          <li>What is the average order value?</li>
          <li>Which category has the highest sales?</li>
          <li>Which customers have never placed an order?</li>
          <li>Which products have never been sold?</li>
          <li>What are the monthly sales?</li>
          <li>Which customer spent the most money?</li>
          <li>What are today's orders?</li>
          <li>Which products are low in stock?</li>
        </ol>
      </div>
    </section>

    <!-- Common Mistakes -->
    <section id="sql-w8-t21" class="section">
      <h2>21. Common Mistakes</h2>
      <div class="content-card">
        <div class="mistakes-grid">
          <div class="mistake-box">
            <h4>❌ Missing Relationships</h4>
            <p>Creating tables without Foreign Keys leads to inconsistent data.</p>
          </div>

          <div class="mistake-box">
            <h4>❌ Duplicate Data</h4>
            <p>Avoid storing the same information in multiple tables. Use normalization.</p>
          </div>

          <div class="mistake-box">
            <h4>❌ Using SELECT *</h4>
            <p><strong>Avoid</strong></p>
            <pre><code>SELECT *
FROM Products;</code></pre>
            <div class="correction">
              <p class="correction-title">✅ Use specific columns</p>
              <pre><code>SELECT
    ProductName,
    Price
FROM Products;</code></pre>
            </div>
          </div>

          <div class="mistake-box">
            <h4>❌ Missing Indexes</h4>
            <p>Large tables become slower without proper indexing.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section id="sql-w8-t22" class="section">
      <h2>22. Best Practices</h2>
      <div class="content-card">
        <ul class="best-practices-list">
          <li>📌 Design the database before writing SQL.</li>
          <li>📌 Use meaningful table and column names.</li>
          <li>📌 Define Primary Keys and Foreign Keys correctly.</li>
          <li>📌 Normalize data to reduce redundancy.</li>
          <li>📌 Use constraints to maintain data integrity.</li>
          <li>📌 Create indexes on frequently searched columns.</li>
          <li>📌 Test queries with sample data before deployment.</li>
          <li>📌 Write readable SQL with proper indentation and aliases.</li>
          <li>📌 Document your schema and important queries.</li>
        </ul>
      </div>
    </section>

    <!-- Final Checklist -->
    <section id="sql-w8-t23" class="section">
      <h2>23. Final Course Revision Checklist</h2>
      <div class="content-card">
        <div class="checklist-grid">
          <span class="check-item">✅ Database Fundamentals</span>
          <span class="check-item">✅ SQL Syntax</span>
          <span class="check-item">✅ SELECT & WHERE</span>
          <span class="check-item">✅ Sorting & Filtering</span>
          <span class="check-item">✅ CREATE, ALTER & DROP TABLE</span>
          <span class="check-item">✅ CRUD Operations</span>
          <span class="check-item">✅ Aggregate Functions</span>
          <span class="check-item">✅ GROUP BY & HAVING</span>
          <span class="check-item">✅ Relationships</span>
          <span class="check-item">✅ JOINs</span>
          <span class="check-item">✅ Subqueries</span>
          <span class="check-item">✅ Views</span>
          <span class="check-item">✅ CASE Statements</span>
          <span class="check-item">✅ UNION & UNION ALL</span>
          <span class="check-item">✅ Indexes</span>
          <span class="check-item">✅ Query Optimization</span>
          <span class="check-item">✅ Database Design</span>
        </div>
      </div>
    </section>

    <!-- Quick Summary -->
    <section id="sql-w8-t24" class="section revision-section">
      <h2>24. Week 8 Quick Summary</h2>
      <div class="content-card">
        <ul class="revision-list">
          <li>✔ A Capstone Project demonstrates your end-to-end SQL skills.</li>
          <li>✔ Start by designing a well-structured database schema.</li>
          <li>✔ Use <strong>Primary Keys</strong> and <strong>Foreign Keys</strong> to create relationships.</li>
          <li>✔ Apply CRUD operations to manage data.</li>
          <li>✔ Use <code>JOIN</code>, <code>GROUP BY</code>, and aggregate functions to generate business insights.</li>
          <li>✔ Create <code>VIEW</code>s to simplify frequently used queries.</li>
          <li>✔ Use indexes and optimized queries to improve database performance.</li>
          <li>✔ Normalize your database to reduce redundancy and maintain consistency.</li>
          <li>✔ Present your project with a clear schema, sample data, business queries, and analytical reports.</li>
        </ul>
      </div>
    </section>

    <!-- Exam Tips -->
    <section id="sql-w8-t25" class="section">
      <h2>🧠 Final Exam Tips</h2>
      <div class="content-card">
        <ul class="exam-tips">
          <li>💡 Understand the complete SQL workflow: <strong>Design → Create → Populate → Query → Analyze → Optimize</strong>.</li>
          <li>💡 Choose the correct SQL command based on the task (<code>CREATE</code>, <code>INSERT</code>, <code>SELECT</code>, <code>UPDATE</code>, <code>DELETE</code>, etc.).</li>
          <li>💡 Practice writing <code>JOIN</code>, <code>GROUP BY</code>, <code>HAVING</code>, and subquery-based questions.</li>
          <li>💡 Always define appropriate <strong>Primary Keys</strong>, <strong>Foreign Keys</strong>, and constraints.</li>
          <li>💡 Avoid redundant data by applying normalization principles.</li>
          <li>💡 Use indexes thoughtfully to improve search and join performance.</li>
          <li>💡 Test your queries with sample data before considering them complete.</li>
          <li>💡 In project presentations, explain <strong>why</strong> you designed the database the way you did, not just <strong>how</strong> you wrote the SQL queries.</li>
        </ul>
      </div>
    </section>

    <!-- Thank You Section -->
    <section class="section thank-you-section">
      <div class="content-card thank-you-card">
        <div class="thank-you-content">
          <div class="thank-you-icon">🎉</div>
          <h2>Congratulations for Completing the SQL Course!</h2>
          <p class="thank-you-message">
            Congratulations on completing this comprehensive SQL journey! 🎊 You've built a strong foundation in SQL from basic queries to advanced database design.
          </p>
          <div class="thank-you-highlights">
            <div class="highlight-item">
              <span class="highlight-icon">📚</span>
              <div>
                <h4>What You've Learned</h4>
                <p>Database fundamentals, CRUD operations, joins, subqueries, views, functions, and optimization techniques</p>
              </div>
            </div>
            <div class="highlight-item">
              <span class="highlight-icon">💪</span>
              <div>
                <h4>Skills You've Gained</h4>
                <p>Writing complex SQL queries, designing normalized databases, generating business reports, and optimizing performance</p>
              </div>
            </div>
            <div class="highlight-item">
              <span class="highlight-icon">🚀</span>
              <div>
                <h4>What's Next?</h4>
                <p>Practice with real datasets, prepare for SQL interviews, build projects, and explore advanced topics like stored procedures and triggers</p>
              </div>
            </div>
          </div>
          <div class="thank-you-cta">
            <p class="cta-main">🌟 Keep Practicing & Keep Learning!</p>
            <p class="cta-sub">You're now ready to work with databases in real-world applications. Good luck on your SQL journey!</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="cheatsheet-footer">
      <p>📘 SQL Cheatsheet - Week 8 | Capstone Project & Real-World SQL Applications</p>
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
    { id: 'sql-w8-t1', title: 'What is a Capstone Project?' },
    { id: 'sql-w8-t2', title: 'SQL Skills Used' },
    { id: 'sql-w8-t3', title: 'Database Design Fundamentals' },
    { id: 'sql-w8-t4', title: 'Example Business Scenario' },
    { id: 'sql-w8-t5', title: 'Database Schema' },
    { id: 'sql-w8-t6', title: 'Schema Planning' },
    { id: 'sql-w8-t7', title: 'Creating Tables' },
    { id: 'sql-w8-t8', title: 'Insert Sample Data' },
    { id: 'sql-w8-t9', title: 'Business Queries' },
    { id: 'sql-w8-t10', title: 'JOIN Queries' },
    { id: 'sql-w8-t11', title: 'Business Reports' },
    { id: 'sql-w8-t12', title: 'GROUP BY Reports' },
    { id: 'sql-w8-t13', title: 'CASE Statement' },
    { id: 'sql-w8-t14', title: 'Creating a View' },
    { id: 'sql-w8-t15', title: 'Performance Optimization' },
    { id: 'sql-w8-t16', title: 'Database Normalization' },
    { id: 'sql-w8-t17', title: 'Development Workflow' },
    { id: 'sql-w8-t18', title: 'Capstone Project Workflow' },
    { id: 'sql-w8-t19', title: 'Sample Capstone Requirements' },
    { id: 'sql-w8-t20', title: 'Sample Business Questions' },
    { id: 'sql-w8-t21', title: 'Common Mistakes' },
    { id: 'sql-w8-t22', title: 'Best Practices' },
    { id: 'sql-w8-t23', title: 'Final Course Revision Checklist' },
    { id: 'sql-w8-t24', title: 'Week 8 Quick Summary' },
    { id: 'sql-w8-t25', title: 'Final Exam Tips' },
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

/* Steps List */
.steps-list {
  padding-left: 25px;
  line-height: 2;
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

/* Schema Flow */
.schema-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px auto;
  max-width: 250px;
}

.schema-item {
  background: #2b6cb0;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.schema-arrow {
  font-size: 1.2em;
  color: #2b6cb0;
  padding: 2px 0;
}

.schema-spacer {
  padding: 4px 0;
}

/* Workflow Flow */
.workflow-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #edf2f7;
  border-radius: 8px;
  margin: 10px auto;
  max-width: 300px;
}

.workflow-step {
  background: #38a169;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.workflow-arrow {
  font-size: 1.2em;
  color: #38a169;
  padding: 2px 0;
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

/* Checklist Grid */
.checklist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.check-item {
  padding: 10px 15px;
  background: #f0fff4;
  border-radius: 6px;
  border-left: 3px solid #38a169;
}

/* Questions List */
.questions-list {
  padding-left: 25px;
  line-height: 2.2;
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

/* Thank You Section */
.thank-you-section {
  margin-top: 40px;
}

.thank-you-card {
  background: linear-gradient(135deg, #f7fafc 0%, #ebf8ff 100%);
  border: 2px solid #38a169;
  border-radius: 12px;
  padding: 35px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.thank-you-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(56, 161, 105, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.thank-you-content {
  position: relative;
  z-index: 1;
}

.thank-you-icon {
  font-size: 4.5em;
  animation: bounce-icon 2s ease-in-out infinite;
}

@keyframes bounce-icon {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.thank-you-content h2 {
  color: #2b6cb0;
  border-bottom: none;
  padding-bottom: 0;
  margin-top: 15px;
  font-size: 2em;
}

.thank-you-message {
  font-size: 1.15em;
  color: #2d3748;
  max-width: 700px;
  margin: 10px auto 25px auto;
  line-height: 1.8;
}

.thank-you-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 25px 0;
  text-align: left;
}

.highlight-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  background: white;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(56, 161, 105, 0.12);
  border-color: #68d391;
}

.highlight-icon {
  font-size: 2em;
  flex-shrink: 0;
}

.highlight-item h4 {
  margin: 0 0 4px 0;
  color: #2b6cb0;
  font-size: 1.05em;
}

.highlight-item p {
  margin: 0;
  color: #4a5568;
  font-size: 0.92em;
  line-height: 1.5;
}

.thank-you-cta {
  margin-top: 25px;
  padding: 20px 25px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  border-radius: 10px;
  text-align: center;
}

.cta-main {
  font-size: 1.3em;
  font-weight: 700;
  color: white;
  margin: 0;
}

.cta-sub {
  color: #c6f6d5;
  margin: 8px 0 0 0;
  font-size: 1em;
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

  .checklist-grid {
    grid-template-columns: 1fr;
  }

  .thank-you-highlights {
    grid-template-columns: 1fr;
  }

  .highlight-item {
    padding: 15px;
  }

  .thank-you-card {
    padding: 25px 20px;
  }

  .thank-you-icon {
    font-size: 3.5em;
  }

  .thank-you-content h2 {
    font-size: 1.6em;
  }

  .thank-you-message {
    font-size: 1em;
  }

  .workflow-flow {
    max-width: 240px;
  }

  .schema-flow {
    max-width: 200px;
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

  .thank-you-card {
    padding: 20px 15px;
  }

  .thank-you-icon {
    font-size: 2.8em;
  }

  .thank-you-content h2 {
    font-size: 1.3em;
  }

  .highlight-item {
    padding: 12px;
  }

  .highlight-icon {
    font-size: 1.6em;
  }

  .cta-main {
    font-size: 1.1em;
  }

  .cta-sub {
    font-size: 0.9em;
  }

  .workflow-step {
    font-size: 0.9em;
    padding: 6px 14px;
  }

  .schema-item {
    font-size: 0.9em;
    padding: 6px 14px;
  }

  .check-item {
    font-size: 0.9em;
    padding: 8px 12px;
  }
}
</style>