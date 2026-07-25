// courses.js

export default [
  {
    id: 1,
    title: "Web Development",
    slug: "WebDevelopmentBootCamp",
    description:
      "Master full-stack web development from scratch using HTML, CSS, Bootstrap, JavaScript, Flask, SQLite, and build real-world responsive websites and web applications.",
    icon: "🌐",
    color: "from-blue-500 to-indigo-600",
    weeks: [
      {
        number: 1,
        title: "Introduction to Web Development & HTML Fundamentals",
        description:
          "Understand how the web works and build the foundation of every website using HTML."
      },

      {
        number: 2,
        title: "CSS Fundamentals & Responsive Design",
        description:
          "Learn to style webpages using modern CSS and build responsive layouts.",
        topics: [
          { id: "wd-w2-t1", title: "Introduction to CSS" },
          { id: "wd-w2-t2", title: "Selectors & CSS Properties" },
          { id: "wd-w2-t3", title: "Box Model, Margin & Padding" },
          { id: "wd-w2-t4", title: "Flexbox Layout" },
          { id: "wd-w2-t5", title: "Responsive Design & Media Queries" },
          { id: "wd-w2-t6", title: "Week 2 Cheat Sheet" }
        ]
      },

      {
        number: 3,
        title: "Advanced CSS & Bootstrap",
        description:
          "Create professional user interfaces using advanced CSS concepts and Bootstrap.",
        topics: [
          { id: "wd-w3-t1", title: "CSS Grid Layout" },
          { id: "wd-w3-t2", title: "Transitions & Animations" },
          { id: "wd-w3-t3", title: "Bootstrap Grid System" },
          { id: "wd-w3-t4", title: "Bootstrap Components" },
          { id: "wd-w3-t5", title: "Responsive Bootstrap Layouts" },
          { id: "wd-w3-t6", title: "Week 3 Cheat Sheet" }
        ]
      },

      {
        number: 4,
        title: "JavaScript Fundamentals",
        description:
          "Learn programming fundamentals and make webpages interactive using JavaScript.",
        topics: [
          { id: "wd-w4-t1", title: "JavaScript Basics" },
          { id: "wd-w4-t2", title: "Variables, Data Types & Operators" },
          { id: "wd-w4-t3", title: "Conditions & Loops" },
          { id: "wd-w4-t4", title: "Functions" },
          { id: "wd-w4-t5", title: "Arrays & Objects" },
          { id: "wd-w4-t6", title: "Week 4 Cheat Sheet" }
        ]
      },

      {
        number: 5,
        title: "DOM Manipulation & API Integration",
        description:
          "Build dynamic websites by manipulating HTML and working with external APIs.",
        topics: [
          { id: "wd-w5-t1", title: "DOM Fundamentals" },
          { id: "wd-w5-t2", title: "Selecting & Modifying Elements" },
          { id: "wd-w5-t3", title: "Events & Event Listeners" },
          { id: "wd-w5-t4", title: "Local Storage" },
          { id: "wd-w5-t5", title: "Fetch API & JSON" },
          { id: "wd-w5-t6", title: "Week 5 Cheat Sheet" }
        ]
      },

      {
        number: 6,
        title: "Backend Development with Flask",
        description:
          "Learn Python Flask to build dynamic web applications with templates and routing.",
        topics: [
          { id: "wd-w6-t1", title: "Introduction to Flask" },
          { id: "wd-w6-t2", title: "Routing & URL Parameters" },
          { id: "wd-w6-t3", title: "Jinja Templating" },
          { id: "wd-w6-t4", title: "Forms & Request Handling" },
          { id: "wd-w6-t5", title: "Static Files & Project Structure" },
          { id: "wd-w6-t6", title: "Week 6 Cheat Sheet" }
        ]
      },

      {
        number: 7,
        title: "SQLite Database Integration",
        description:
          "Store and manage application data using SQLite with Flask.",
        topics: [
          { id: "wd-w7-t1", title: "Introduction to Databases" },
          { id: "wd-w7-t2", title: "SQLite Fundamentals" },
          { id: "wd-w7-t3", title: "Connecting Flask with SQLite" },
          { id: "wd-w7-t4", title: "CRUD Operations" },
          { id: "wd-w7-t5", title: "Database Relationships" },
          { id: "wd-w7-t6", title: "Week 7 Cheat Sheet" }
        ]
      },

      {
        number: 8,
        title: "Capstone Project & Deployment",
        description:
          "Combine everything you've learned to build, test, and deploy a complete full-stack web application.",
        topics: [
          { id: "wd-w8-t1", title: "Project Planning" },
          { id: "wd-w8-t2", title: "Frontend Development" },
          { id: "wd-w8-t3", title: "Backend Integration" },
          { id: "wd-w8-t4", title: "Database Integration" },
          { id: "wd-w8-t5", title: "Testing & Deployment" },
          { id: "wd-w8-t6", title: "Final Project Showcase" }
        ]
      }
    ]
  },

  {
    id: 2,
    title: "Python",
    slug: "Python",
    description: "Learn Python programming from basics to advanced concepts with practical examples.",
    icon: "🐍",
    color: "from-green-500 to-emerald-600",
    weeks: [
      {
        number: 1,
        title: "Getting Started with Python",
        description: "Learn the basics of Python programming including syntax, variables, data types, and control flow.",
      },
      {
        number: 2,
        title: "Operators & Conditional Statements",
        description: "Explore Python operators and conditional statements for controlling program flow.",
      },
      {
        number: 3,
        title: "Loops & Iteration",
        description: "Master loops and iteration techniques in Python for efficient programming.",
      },
      {
        number: 4,
        title: "Functions & Code Reusability",
        description: "Learn to create and use functions for writing reusable and maintainable code.",
      },
      {
        number: 5,
        title: "Strings & String Manipulation",
        description: "Learn to work with strings and utilize Python's built-in string methods.",
      },
      {
        number: 6,
        title: "Lists, Tuples & Dictionaries",
        description: "Understand lists and perform various operations on them in Python.",
      },
      {
        number: 7,
        title: "File Handling & Error Management",
        description: "Learn to read from and write to files, and handle exceptions in Python.",
      },
      {
        number: 8,
        title: "Capstone Project & Advanced Topics",
        description: "Apply your Python knowledge in a final project and explore advanced topics.",
      }
    ]
  },

  {
    id: 3,
    title: "SQL",
    slug: "Sql",
    description: "Learn SQL programming from basics to advanced concepts with practical examples.",
    icon: "🛢️",
    color: "from-green-200 to-emerald-600",
    weeks: [
      {
        number: 1,
        title: "Introduction to Databases & SQL Fundamentals",
        description: "Learn the basics of databases and SQL, including data types, tables, and basic queries.",
      },
      {
        number: 2,
        title: "Sorting, Filtering & Data Retrieval",
        description: "Learn to sort and filter data using SQL queries, and retrieve specific information from databases.",
      },

      {
        number: 3,
        title: "Working with Database Tables",
        description: "Learn to create, modify, and manage database tables using SQL commands.",
      },
      {
        number: 4,
        title: "CRUD Operations in SQL",
        description: "Learn to perform Create, Read, Update, and Delete operations in SQL.",
      },
      {
        number: 5,
        title: "SQL Functions & Aggregations",
        description: "Learn to use SQL functions and aggregate data for analysis.",
      },
      {
        number: 6,
        title: "Joins & Database Relationships",
        description: "Learn to combine data from multiple tables using SQL joins and understand table relationships.",
      },
      {
        number: 7,
        title: "Advanced SQL Queries",
        description: "Learn advanced SQL query techniques, including subqueries, nested queries, and complex filtering.",
      },
      {
        number: 8,
        title: "Capstone Project & SQL Optimization",
        description: "Apply your SQL knowledge in a final project and learn techniques for optimizing SQL queries.",
      }
    ]
  }
];