import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, normalizeRole } from '../utils/auth'
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

import AdminDashboardPage from '../pages/admin_temp/AdminDashboardPage.vue'
import AdminDefaultPage from '../components/admin_base/AdminDefaultPage.vue'

import AdminCourses from '../composable/admin_comp/Courses.vue'
import AdminCourseDetail from '../composable/admin_comp/CourseDetail.vue'
import AdminAssignmentQuestions from '../composable/admin_comp/AssignmentQuestions.vue'
import AdminUsersPage from '../pages/admin_temp/AdminUsersPage.vue'
import AdminUserInsightsPage from '../pages/admin_temp/AdminUserInsightsPage.vue'
import AdminAssignmentsPage from '../pages/admin_temp/AssignmentsPage.vue'
import AdminNotificationsPage from '../pages/admin_temp/AdminNotificationsPage.vue'
import AdminTestsPage from '../pages/admin_temp/TestsPage.vue'
import AdminTestResultsPage from '../pages/admin_temp/TestResultsPage.vue'
import AdminTestQuestions from '../composable/admin_comp/TestQuestions.vue'
import AdminProfilePage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminProfilePage.vue'
import AdminSettingsPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminSettingsPage.vue'
import AdminSystemlogsPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminSystemlogsPage.vue'
import AdminAuditTrailPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminAuditTrailPage.vue'
import AdminHelpPage from '../pages/admin_temp/admin_profile_dropdown_temp/AdminHelpPage.vue'

const routes = [
  {
    path: '/',
    component: DefaultBase,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },

      {
        path: '/about',
        name: 'About',
        component: About
      },

      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      },

      {
        path: '/courses',
        name: 'Courses',
        component: CoursesPage
      },

      {
        path: '/courses/:slug',
        name: 'ExploreCourse',
        component: ExploreCoursePage
      },

      {
        path: '/resource/notes',
        name: 'Notes',
        component: NotesPage,
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/resource/youtube',
        name: 'Youtube',
        component: YoutubePage,
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/resource/books',
        name: 'Books',
        component: BooksPage,
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/signup',
        name: 'Signup',
        component: SignUpPage
      },
      
      {
        path: '/login',
        name: 'Login',
        component: LoginPage
      },

      {
        path: '/forgot/password',
        name: 'Forgot',
        component: ForgotPage
      },

      {
        path: '/terms',
        name: 'Terms',
        component: TermsPage
      },

      {
        path: '/privacy',
        name: 'Privacy',
        component: PrivacyPolicyPage
      },

      {
        path: '/refund',
        name: 'Refund',
        component: RefundPolicy
      },
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
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/courses',
        name: 'StudentCourses',
        component: StudentCoursesPage,
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/tests',
        name: 'StudentTests',
        component: StudentTestsPage,
        meta: { requiresAuth: true, role: 'student' }
      },
      {
        path: '/student/tests/:id/results',
        name: 'StudentTestResults',
        component: StudentTestResultsPage,
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/assignments',
        name: 'StudentAssignments',
        component: StudentAssignmentsPage,
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/notifications',
        name: 'StudentNotifications',
        component: () => import('../pages/student_temp/StudentNotificationsPage.vue'),
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/profile',
        name: 'StudentProfile',
        component: () => import('../pages/student_temp/student_profile_dropdown/StudentProfilePage.vue'),
        meta: { requiresAuth: true, role: 'student' }
      }, 

      {
        path: '/student/settings',
        name: 'StudentSettings',
        component: () => import('../pages/student_temp/student_profile_dropdown/StudentSettingsPage.vue'),
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/help',
        name: 'StudentHelp',
        component: () => import('../pages/student_temp/student_profile_dropdown/StudentHelpPage.vue'),
        meta: { requiresAuth: true, role: 'student' }
      },

      {
        path: '/student/my-purchase',
        name: 'StudentMyPurchase',
        component: () => import('../pages/student_temp/student_profile_dropdown/MyPurchase.vue'),
        meta: { requiresAuth: true, role: 'student' }
      },

      // path to enroll in a course
      {
        path: '/courses/:id/enroll',
        name: 'CourseEnrollment',
        component: () => import('../pages/enrollments_temp/CourseEnrollmentPage.vue'),
        meta: { requiresAuth: true, role: 'student' }
      }
    ]
  },

  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: () => import('../pages/courses_temp/CourseDetailPage.vue'),
  },

  {
    path: '/admin',
    component: AdminDefaultPage,
    children: [
      {
        path: '/admin/dashboard',
        name: 'AdminDashboardHome',
        component: AdminDashboardPage,
        meta: { requiresAuth: true, role: 'admin' }
      },

      {
        path: '/admin/courses',
        name: 'AdminCourses',
        component: AdminCourses,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/courses/:id',
        name: 'AdminCourseDetail',
        component: AdminCourseDetail,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/assignments',
        name: 'AdminAssignments',
        component: AdminAssignmentsPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/tests',
        name: 'AdminTests',
        component: AdminTestsPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/notifications',
        name: 'AdminNotifications',
        component: AdminNotificationsPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/assignments/:id',
        name: 'AdminAssignmentQuestions',
        component: AdminAssignmentQuestions,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/tests/:id',
        name: 'AdminTestQuestions',
        component: AdminTestQuestions,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/tests/:id/results',
        name: 'AdminTestResults',
        component: AdminTestResultsPage,
        meta: { requiresAuth: true, role: 'admin' }
      },

      {
        path: '/admin/users',
        name: 'AdminUsers',
        component: AdminUsersPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/users/:id/insights',
        name: 'AdminUserInsights',
        component: AdminUserInsightsPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/profile',
        name: 'AdminProfile',
        component: AdminProfilePage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/settings',
        name: 'AdminSettings',
        component: AdminSettingsPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/logs',
        name: 'AdminSystemLogs',
        component: AdminSystemlogsPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/audit',
        name: 'AdminAuditTrail',
        component: AdminAuditTrailPage,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '/admin/help',
        name: 'AdminHelp',
        component: AdminHelpPage,
        meta: { requiresAuth: true, role: 'admin' }
      }

    ]
  },

  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage,
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ErrorPage,
  },
]

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
                query: { msg: "Please login to continue" }
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


export default router