import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Posts from '../views/Posts.vue'
import Users from '../views/Users.vue'
import Analytics from '../views/Analytics.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/posts', name: 'Posts', component: Posts },
  { path: '/users', name: 'Users', component: Users },
  { path: '/analytics', name: 'Analytics', component: Analytics }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router