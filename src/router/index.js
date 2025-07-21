import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import AdminDashboard from '@/views/admin/Dashboard.vue'
import UserManagement from '@/views/admin/UserManagement.vue'
import ContentManager from '@/views/admin/ContentManager.vue'
import FandomTracker from '@/views/admin/FandomTracker.vue'
import ShopManagement from '@/views/admin/ShopManagement.vue'
import AnalyticsPanel from '@/views/admin/AnalyticsPanel.vue'
import WriterPosts from '@/views/writer/WriterPosts.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import PostNew from '@/views/writer/PostNew.vue'
import PostEditorWrapper from '@/views/writer/PostEditorWrapper.vue'
import Profile from '@/views/Profile.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: AuthLayout }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { layout: AuthLayout }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { layout: AuthLayout }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { layout: AuthLayout }
  },
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'DashboardHome',
        component: AdminDashboard
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: UserManagement,
      },
      {
        path: 'content',
        name: 'ContentManager',
        component: ContentManager,
      },
      {
        path: 'fandoms',
        name: 'FandomTracker',
        component: FandomTracker,
      },
      {
        path: 'shop',
        name: 'ShopManagement',
        component: ShopManagement,
      },
      {
        path: 'analytics',
        name: 'AnalyticsPanel',
        component: AnalyticsPanel,
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/writer',
    component: DashboardLayout,
    meta: { requiresAuth: true
     },
    children: [
      {
        path: '',
        component: WriterPosts
      },
      {
        path: 'posts',
        name: 'WriterPosts',
        component: WriterPosts
      },
      {
        path: 'posts/new',
        name: 'PostNew',
        component: PostNew
      },
      {
        path: 'posts/:id/edit',
        component: PostEditorWrapper
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth state
  if (!authStore.user) {
    authStore.initialize()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login')
    } else if (to.meta.role && to.meta.role !== authStore.user.role) {
      next(authStore.isAdmin ? '/dashboard' : '/writer/posts')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router