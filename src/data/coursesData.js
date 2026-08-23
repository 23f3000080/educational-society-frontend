// data/coursesData.js
export const coursesData = [
  {
    id: 1,
    name: "Python",
    description: "Learn the basics of Python programming language.",
    image: "https://example.com/python-course.jpg",
    total_content: 8,
    weeks: [
      {
        week: 1,
        videos: {
          Lecture1: "https://youtu.be/2ZIt21oDbrg?si=kRiCgHnD3mxdRS8s",
          Lecture2: "https://www.youtube.com/watch?v=ys38EH53w4k",
          Lecture3: "https://drive.google.com/file/d/1Bl5TMnRKcz-inLEUI7n16_hT3cfR4e9W/view?usp=drive_link"
        },
        assignments: {
          assignment1: {
            title: "Python Basics Assignment",
            description: "Practice basic Python syntax and concepts.",
            dueDate: "2024-07-01",
            questions: {
              question1: {
                question: "What is a variable in Python?",
                answer: "A variable is a container for storing data values."
              },
              question2: {
                question: "How do you write a comment in Python?",
                answer: "Use the `#` symbol before the comment text."
              }
            }
          },
          assignment2: {
            title: "Data Types Assignment",
            description: "Practice different data types in Python.",
            dueDate: "2024-07-05",
            questions: {
              question1: {
                question: "Name three built-in data types in Python.",
                answer: "Examples include `int`, `str`, and `list`."
              },
              question2: {
                question: "What is the difference between a list and a tuple?",
                answer: "A list is mutable, while a tuple is immutable."
              }
            }
          }
        },
        notes: "https://drive.google.com/file/d/1h9oOinMhwNgfE8XOfi2XuLA0wkixRnqA/view?usp=sharing"
      },
      {
        week: 2,
        videos: {
          Lecture1: "https://example.com/python-week2-video1.mp4",
          Lecture2: "https://example.com/python-week2-video2.mp4"
        },
        assignments: {
          assignment1: {
            title: "Control Flow Assignment",
            description: "Practice if-else statements and loops.",
            dueDate: "2024-07-08",
            questions: {
              question1: {
                question: "Write a Python program to check if a number is even or odd.",
                answer: "Use `if number % 2 == 0` to check even, else odd."
              },
              question2: {
                question: "What are loops used for in Python?",
                answer: "Loops are used to execute a block of code multiple times."
              }
            }
          }
        },
        notes: "https://drive.google.com/file/d/1-FSI_pwyqyIY5PuA1OQRlA78-iPHBW3C/view?usp=drive_link"
      }
    ]
  },
  
  {
    id: 2,
    name: "JavaScript",
    description: "Learn the fundamentals of JavaScript programming language.",
    image: "https://example.com/javascript-course.jpg",
    weeks: [
      {
        week: 1,
        videos: {
          video1: "https://example.com/javascript-week1-video1.mp4",
          video2: "https://example.com/javascript-week1-video2.mp4"
        },
        assignments: {
          assignment1: {
            title: "JavaScript Basics Assignment",
            description: "Practice basic JavaScript syntax and concepts.",
            dueDate: "2024-07-02",
            questions: {
              question1: {
                question: "What is a variable in JavaScript?",
                answer: "A variable is a container for storing data values."
              },
              question2: {
                question: "How do you write a comment in JavaScript?",
                answer: "Use `//` for single-line comments and `/* */` for multi-line comments."
              }
            }
          }
        },
        notes: "https://example.com/javascript-week1-notes.pdf"
      }
    ]
  },
]