import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, normalizeRole } from '../utils/auth'
import { updateMeta } from '../utils/seo'
import Home from "../pages/HomePage.vue"
import DefaultBase from '../components/base/DefaultBase.vue'
import About from "../pages/AboutPage.vue"
import Contact from "../pages/ContactPage.vue"
import NotesPage from '../pages/NotesPage.vue'
import YoutubePage from '../pages/YoutubePage.vue'
import BooksPage from '../pages/BooksPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ForgotPage from '../pages/ForgotPage.vue'
import CoursesPage from '../pages/CoursesPage.vue'
import ExploreCoursePage from '../pages/ExploreCoursePage.vue'
import TermsPage from '../pages/TermsPage.vue'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.vue'
import RefundPolicy from '../pages/RefundPolicyPage.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import StudentDashboardPage from '../pages/student_temp/StudentDashboardPage.vue'
import StudentDefaultPage from '../components/student_base/StudentDefaultPage.vue'
import StudentHomePage from '../pages/student_temp/StudentHomePage.vue'
import StudentCoursesPage from '../pages/student_temp/StudentCoursesPage.vue'
import StudentTestsPage from '../pages/student_temp/StudentTestsPage.vue'
import StudentTestResultsPage from '../pages/student_temp/StudentTestResultsPage.vue'
import StudentAssignmentsPage from '../pages/student_temp/StudentAssignmentsPage.vue'
import StudentLiveClassPage from '../pages/student_temp/StudentLiveClassPage.vue'

import AdminDashboardPage from '../pages/admin_temp/AdminDashboardPage.vue'
import AdminDefaultPage from '../components/admin_base/AdminDefaultPage.vue'

import AdminCourses from '../composable/admin_comp/Courses.vue'
import AdminCourseDetail from '../composable/admin_comp/CourseDetail.vue'
import AdminAssignmentQuestions from '../composable/admin_comp/AssignmentQuestions.vue'
import AdminUsersPage from '../pages/admin_temp/AdminUsersPage.vue'
import AdminUserInsightsPage from '../pages/admin_temp/AdminUserInsightsPage.vue'
// import AdminAssignmentsPage from '../pages/admin_temp/AssignmentPage.vue/index.js'
import AdminNotificationsPage from '../pages/admin_temp/AdminNotificationsPage.vue'
import AdminTestsPage from '../pages/admin_temp/TestsPage.vue'
import AdminTestResultsPage from '../pages/admin_temp/TestResultsPage.vue'
import AdminTestQuestions from '../composable/admin_comp/TestQuestions.vue'
import AdminProfilePage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminProfilePage.vue'
import AdminSettingsPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminSettingsPage.vue'
import AdminManagementPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminManagementPage.vue'
import AdminAuditTrailPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminAuditTrailPage.vue'
import AdminHelpPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminHelpPage.vue'
import AdminLiveClassPage from '../pages/admin_temp/AdminLiveClassPage.vue'
import liveClassRoutes from './liveClassRoutes'

// courses details pages
import python_course from '../pages/courses_details_pages/python_course.vue'
import sql_course from '../pages/courses_details_pages/sql_course.vue'
import web_dev_bootcamp_course from '../pages/courses_details_pages/web-dev_bootcamp_course.vue'
import CheatSheet from '../components/CheatSheetComponents/CheatSheet.vue'

import CertificateGeneratorPage from '../pages/admin_temp/CertificateGeneratorPage.vue'

import MyCertificates from '../pages/student_temp/MyCertificates.vue'
import CertificateVerify from '../pages/CertificateVerify.vue'

import AssignmentSubmissions from '../pages/admin_temp/AssignmentSubmissions.vue'
import Assignment from '../pages/admin_temp/Assignment.vue'
import AssignmentPage from '../pages/admin_temp/AssignmentPage.vue'
import AssignmentEachStudentSubmission from '../pages/admin_temp/AssignmentEachStudentSubmission.vue'

import GradeCalculator from '../pages/GradeCalculator.vue'

import PaymentStatus from '../pages/enrollments_temp/PaymentStatus.vue'

const routes = [
  {
    path: '/',
    component: DefaultBase,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Home',
          description: 'Explore courses, resources and live classes at Educational Society.'
        }
      },

      {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
          title: 'About Us',
          description: 'About Educational Society — mission, team and values.'
        }
      },

      {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: {
          title: 'Contact',
          description: 'Get in touch with Educational Society for support and partnerships.'
        }
      },

      {
        path: '/courses',
        name: 'Courses',
        component: CoursesPage,
        meta: {
          title: 'Courses',
          description: 'Browse available courses and learning paths.'
        }
      },

      {
        path: '/courses/:slug',
        name: 'ExploreCourse',
        component: ExploreCoursePage,
        meta: {
          title: 'Course Detail',
          description: 'Course details, syllabus, and enrollment information.'
        }
      },

      {
        path: '/resource/notes',
        name: 'Notes',
        component: NotesPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Notes',
          description: 'Access study notes and materials for your courses.'
         }
      },

      {
        path: '/resource/youtube',
        name: 'Youtube',
        component: YoutubePage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Youtube',
          description: 'Access educational videos and tutorials.'
        }
      },

      {
        path: '/resource/books',
        name: 'Books',
        component: BooksPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Books',
          description: 'Access educational books and resources.'
        }
      },

      {
        path: '/signup',
        name: 'Signup',
        component: SignUpPage,
        meta: { title: 'Student-Sign Up', description: 'Create an account to access courses and resources.' }
      },
      
      {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { title: 'Student-Login', description: 'Sign in to your Educational Society account.' }
      },

      {
        path: '/forgot/password',
        name: 'Forgot',
        component: ForgotPage,
        meta: { title: 'Forgot Password', description: 'Reset your password if you have forgotten it.' }
      },

      {
        path: '/terms',
        name: 'Terms',
        component: TermsPage,
        meta: { title: 'Terms & Conditions', description: 'Terms and conditions of Educational Society.' }
      },

      {
        path: '/privacy',
        name: 'Privacy',
        component: PrivacyPolicyPage,
        meta: { title: 'Privacy Policy', description: 'Privacy policy and data handling practices.' }
      },

      {
        path: '/refund',
        name: 'Refund',
        component: RefundPolicy,
        meta: { title: 'Refund Policy', description: 'Information about refunds and cancellations.' }
      },
      
      // verify certificate route
      {
        path: '/verify-certificate/:token?',
        name: 'CertificateVerify',
        component: CertificateVerify,
        meta: { title: 'Verify Certificate', description: 'Verify the authenticity of a certificate issued by Educational Society.' }
      },

      {
        path: '/grade-calculator',
        name: 'GradeCalculator',
        component: GradeCalculator,
        meta: { title: 'Grade Calculator', description: 'Calculate your grades and Marks easily.' }
      }
    ]
  },

  {
    path: '/student',
    component: StudentDefaultPage,
    children: [
      {
        path: '/student/home',
        name: 'StudentHome',
        component: StudentHomePage,
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/dashboard',
        name: 'StudentDashboard',
        component: StudentDashboardPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Dashboard',
          description: 'Access your courses, tests, assignments, and notifications from the student dashboard.'
         }
      },

      {
        path: '/student/courses',
        name: 'StudentCourses',
        component: StudentCoursesPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Courses',
          description: 'Browse and access your enrolled courses.'
         }
      },

      {
        path: '/student/tests',
        name: 'StudentTests',
        component: StudentTestsPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Tests',
          description: 'Take and manage your tests.'
         }
      },
      {
        path: '/student/tests/:id/results',
        name: 'StudentTestResults',
        component: StudentTestResultsPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Test Results',
          description: 'View the results of your tests.'
         }
      },

      {
        path: '/student/assignments',
        name: 'StudentAssignments',
        component: StudentAssignmentsPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Assignments',
          description: 'View and submit your assignments.'
         }
      },

      {
        path: '/student/notifications',
        name: 'StudentNotifications',
        component: () => import('../pages/student_temp/StudentNotificationsPage.vue'),
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Notifications',
          description: 'Stay updated with the latest news and announcements.'
         }
      },

      {
        path: '/student/profile',
        name: 'StudentProfile',
        component: () => import('../pages/student_temp/student_profile_dropdown/StudentProfilePage.vue'),
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Profile',
          description: 'Manage your profile information and preferences.'
         }
      }, 

      {
        path: '/student/settings',
        name: 'StudentSettings',
        component: () => import('../pages/student_temp/student_profile_dropdown/StudentSettingsPage.vue'),
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Settings',
          description: 'Manage your account settings and preferences.'
         }
      },

      {
        path: '/student/help',
        name: 'StudentHelp',
        component: () => import('../pages/student_temp/student_profile_dropdown/StudentHelpPage.vue'),
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Help',
          description: 'Get assistance and support for your student account.'
         }
      },

      {
        path: '/student/my-purchase',
        name: 'StudentMyPurchase',
        component: () => import('../pages/student_temp/student_profile_dropdown/MyPurchase.vue'),
        meta: { requiresAuth: true, role: 'student',
          title: 'Student My Purchase',
          description: 'View your purchase history and manage your orders.'
         }
      },

      // path to enroll in a course
      {
        path: '/courses/:id/enroll',
        name: 'CourseEnrollment',
        component: () => import('../pages/enrollments_temp/CourseEnrollmentPage.vue'),
        meta: { requiresAuth: true, role: 'student',
          title: 'Course Enrollment',
          description: 'Enroll in a course and start learning.'
         }
      },

      {
        path: '/payment-status',
        name: 'PaymentStatus',
        component: PaymentStatus,
        meta: { requiresAuth: false }
      },

      // path for live class page
      {
        path: '/student/live-class',
        name: 'StudentLiveClass',
        component: StudentLiveClassPage,
        meta: { requiresAuth: true, role: 'student',
          title: 'Student Live Class',
          description: 'Join live classes and interact with instructors.'
         }
      },

      // student certificates page
      {
        path: '/my-certificates',
        name: 'StudentMyCertificates',
        component: MyCertificates,
        meta: { requiresAuth: true, role: 'student',
          title: 'Student My Certificates',
          description: 'View your earned certificates.'
         }
      }
    ]
  },

  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: () => import('../pages/courses_temp/CourseDetailPage.vue'),
  },

  ...liveClassRoutes,

  {
    path: '/admin',
    component: AdminDefaultPage,
    children: [
      {
        path: '/admin/dashboard',
        name: 'AdminDashboardHome',
        component: AdminDashboardPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Dashboard',
          description: 'Access the admin dashboard to manage courses, users, and system settings.'
         }
      },

      {
        path: '/admin/courses',
        name: 'AdminCourses',
        component: AdminCourses,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Courses',
          description: 'Manage courses and their details.'
         }
      },
      {
        path: '/admin/courses/:id',
        name: 'AdminCourseDetail',
        component: AdminCourseDetail,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Course Detail',
          description: 'View and manage course details.'
         }
      },
      // {
      //   path: '/admin/assignments',
      //   name: 'AdminAssignments',
      //   component: AdminAssignmentsPage,
      //   meta: { requiresAuth: true, role: 'admin' }
      // },
      {
        path: '/admin/tests',
        name: 'AdminTests',
        component: AdminTestsPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Tests',
          description: 'Manage tests and their details.'
         }
      },
      {
        path: '/admin/notifications',
        name: 'AdminNotifications',
        component: AdminNotificationsPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Notifications',
          description: 'Manage system notifications.'
         }
      },
      {
        path: '/admin/assignments/:id',
        name: 'AdminAssignmentQuestions',
        component: AdminAssignmentQuestions,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Assignment Questions',
          description: 'Manage assignment questions and their details.'
         }
      },
      {
        path: '/admin/tests/:id',
        name: 'AdminTestQuestions',
        component: AdminTestQuestions,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Test Questions',
          description: 'Manage test questions and their details.'
         }
      },
      {
        path: '/admin/tests/:id/results',
        name: 'AdminTestResults',
        component: AdminTestResultsPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Test Results',
          description: 'View test results and performance analytics.'
         }
      },

      {
        path: '/admin/users',
        name: 'AdminUsers',
        component: AdminUsersPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Users',
          description: 'Manage user accounts and their details.'
         }
      },
      {
        path: '/admin/users/:id/insights',
        name: 'AdminUserInsights',
        component: AdminUserInsightsPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin User Insights',
          description: 'View insights and analytics for individual users.'
         }
      },
      {
        path: '/admin/profile',
        name: 'AdminProfile',
        component: AdminProfilePage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Profile',
          description: 'Manage your admin profile and settings.'
         }
      },
      {
        path: '/admin/settings',
        name: 'AdminSettings',
        component: AdminSettingsPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Settings',
          description: 'Manage system settings and configurations.'
         }
      },
      {
        path: '/admin/management',
        name: 'AdminManagement',
        component: AdminManagementPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Management',
          description: 'Manage administrative functions and features.'
         }
      },
      {
        path: '/admin/audit',
        name: 'AdminAuditTrail',
        component: AdminAuditTrailPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Audit Trail',
          description: 'View and manage audit trails for administrative actions.'
         }
      },
      {
        path: '/admin/help',
        name: 'AdminHelp',
        component: AdminHelpPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Help',
          description: 'Get assistance and support for administrative functions.'
         }
      },

      // path to admin live class management page
      {
        path: '/admin/live-classes',
        name: 'AdminLiveClasses',
        component: AdminLiveClassPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Live Classes',
          description: 'Manage live classes and their details.'
         }
      },

      // certificate management routes
      {
        path: '/admin/certificates',
        name: 'AdminCertificates',
        component: CertificateGeneratorPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Certificates',
          description: 'Manage certificates and their details.'
         }
      },
      // assignment management routes
      {
        path: '/admin/assignments',
        name: 'Assignments',
        component: Assignment,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Assignments',
          description: 'Manage assignments and their details.'
         }
      },
      {
        path: '/admin/assignments/:assignmentId',
        name: 'AdminAssignment',
        component: AssignmentPage,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Admin Assignment',
          description: 'View and manage a specific assignment.'
         }
      },

      {
        path: '/admin/assignments/submissions',
        name: 'AssignmentSubmissions',
        component: AssignmentSubmissions,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Assignment Submissions',
          description: 'View and manage assignment submissions.'
         }
      },

      {
        path: '/admin/assignments/student-submission',
        name: 'AssignmentEachStudentSubmission',
        component: AssignmentEachStudentSubmission,
        meta: { requiresAuth: true, role: 'admin',
          title: 'Student Assignment Submission',
          description: 'View and manage individual student assignment submissions.'
         }
      }

    ]
  },

  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage,
    meta: { title: 'Error', description: 'An error occurred while processing your request.' }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ErrorPage,
    meta: { title: 'Not Found', description: 'The page you are looking for does not exist.' }
  },

  // website map
  {
    path: '/website-map',
    name: 'WebsiteMap',
    component: () => import('../pages/WebsiteMap.vue'),
    meta: { requiresAuth: true, title: 'Website Map', description: 'View the structure and navigation of the website.' }
  },

  // courses details pages
  {
    path: '/courses/python-course',
    name: 'PythonCourse',
    component: python_course,
    meta: {
      title: 'Python Course',
      description: 'Learn Python programming from basics to advanced concepts.'
    }
  },

  {
    path: '/courses/sql-course',
    name: 'SqlCourse',
    component: sql_course,
    meta: {
      title: 'SQL Course',
      description: 'Learn SQL programming and database fundamentals with a practical curriculum.'
    }
  },

  {
    path: '/courses/web-development-bootcamp',
    name: 'WebDevelopmentBootcampCourse',
    component: web_dev_bootcamp_course,
    meta: {
      title: 'Web Development Bootcamp',
      description: 'Build modern responsive websites with HTML, CSS, JavaScript, and practical projects.'
    }
  },

  
]

const CheatSheetRoutes = [
  {
    path: '/cheatsheet',
    name: 'CheatSheet',
    component: CheatSheet,
    meta: {
      title: 'Cheat Sheet',
      description: 'Quick reference guides and cheat sheets for programming languages and tools.',
      hideChatbot: true
    }
  }
]

routes.push(...CheatSheetRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
        return { top: 0 };
  },
});

/* 🔐 GLOBAL AUTH GUARD */
router.beforeEach((to, from, next) => {
    const { token, user } = getAuth();
  const userRole = normalizeRole(user?.role);
  const requiredRole = normalizeRole(to.meta?.role);

    if (to.meta.requiresAuth) {

        // ❌ No token OR no user OR no role
    if (!token || !user || !userRole) {
            return next({
                path: "/login",
          query: {
            msg: "Please login to continue",
            redirect: to.fullPath
          }
            });
        }

        // ❌ Role mismatch
    if (requiredRole && userRole !== requiredRole) {
            return next({
                path: "/login",
                query: { msg: "Access denied" }
            });
        }
    }

    next();
});

  router.onError(() => {
    router.push('/error');
  });

// Update document head meta after each navigation
router.afterEach((to) => {
  try {
    updateMeta(to.meta || {});
  } catch (e) {
    // fail silently
  }
});


export default router