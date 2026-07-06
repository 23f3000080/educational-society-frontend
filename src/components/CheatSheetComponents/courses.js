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
          "Understand how the web works and build the foundation of every website using HTML.",
        topics: [
          { id: "wd-w1-t1", title: "Introduction to Web Development" },
          { id: "wd-w1-t2", title: "How the Internet Works" },
          { id: "wd-w1-t3", title: "HTML Document Structure" },
          { id: "wd-w1-t4", title: "HTML Elements & Semantic Tags" },
          { id: "wd-w1-t5", title: "Lists, Links, Images & Text Formatting" },
          { id: "wd-w1-t6", title: "Week 1 Cheat Sheet" }
        ]
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
        title: "Python Fundamentals",
        description: "Master the basics of Python programming including syntax, data types, and control flow.",
        topics: [
          { id: "py-w1-t1", title: "Introduction to Python" },
          { id: "py-w1-t2", title: "Data Types & Variables" },
          { id: "py-w1-t3", title: "Control Flow & Loops" },
          { id: "py-w1-t4", title: "Functions & Scope" },
          { id: "py-w1-t5", title: "Practical Examples" }
        ]
      },
      {
        number: 2,
        title: "Advanced Python Concepts",
        description: "Dive into object-oriented programming, modules, and working with files and APIs.",
        topics: [
          { id: "py-w2-t1", title: "OOP in Python" },
          { id: "py-w2-t2", title: "Modules & Packages" },
          { id: "py-w2-t3", title: "File I/O Operations" },
          { id: "py-w2-t4", title: "Working with APIs" },
          { id: "py-w2-t5", title: "Final Project" }
        ]
      }
    ]
  },

  {
    id: 3,
    title: "Vue.js",
    slug: "Vue",
    description: "Build modern, reactive web applications with Vue.js - the progressive JavaScript framework.",
    icon: "🟢",
    color: "from-green-600 to-teal-600",
    weeks: [
      {
        number: 1,
        title: "Vue.js Basics",
        description: "Get started with Vue.js, understand the Vue instance, and learn the fundamentals of reactive data.",
        topics: [
          { id: "vue-w1-t1", title: "Introduction to Vue.js" },
          { id: "vue-w1-t2", title: "Vue Instance & Lifecycle" },
          { id: "vue-w1-t3", title: "Template Syntax" },
          { id: "vue-w1-t4", title: "Reactivity & Data Binding" },
          { id: "vue-w1-t5", title: "Basic Examples" }
        ]
      },
      {
        number: 2,
        title: "Components & State Management",
        description: "Learn about Vue components, props, events, and state management with Pinia.",
        topics: [
          { id: "vue-w2-t1", title: "Component Fundamentals" },
          { id: "vue-w2-t2", title: "Props & Events" },
          { id: "vue-w2-t3", title: "Vue Router" },
          { id: "vue-w2-t4", title: "State Management with Pinia" },
          { id: "vue-w2-t5", title: "Building a Real App" }
        ]
      },
      {
        number: 3,
        title: "Advanced Vue.js Patterns",
        description: "Explore advanced patterns like composables, slots, and optimization techniques.",
        topics: [
          { id: "vue-w3-t1", title: "Composables & Hooks" },
          { id: "vue-w3-t2", title: "Slots & Content Distribution" },
          { id: "vue-w3-t3", title: "Async & Performance" },
          { id: "vue-w3-t4", title: "Testing Vue Apps" },
          { id: "vue-w3-t5", title: "Deployment & Best Practices" }
        ]
      }
    ]
  }
];