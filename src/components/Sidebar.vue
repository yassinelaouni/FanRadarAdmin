<template>
    <div class="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white min-h-screen p-4 flex flex-col">
      <div class="mb-10 mt-4 px-4 flex flex-col items-center">
        <img src="/images/FanRadarWhite.png" alt="FanRadar Logo" class="h-16 mb-2" />
      </div>
      
      <nav class="flex-1">
        <ul class="space-y-1">
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link 
              :to="item.path" 
              class="flex items-center px-4 py-3 rounded-lg transition-colors"
              :class="{
                'bg-indigo-900 text-white': $route.path === item.path,
                'text-indigo-200 hover:bg-indigo-600': $route.path !== item.path
              }"
            >
              <component :is="item.icon" class="h-5 w-5 mr-3" />
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
      
      <div class="mt-auto pt-4 border-t border-indigo-600">
        <button 
          @click="logout"
          class="flex items-center w-full px-4 py-3 text-indigo-200 hover:bg-indigo-600 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </template>



 <script setup>
 import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  HomeIcon, 
  NewspaperIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  PencilSquareIcon as PencilIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter()

const menuItems = computed(() => {
  const baseItems = [
    { path: '/admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/admin/users', label: 'User Management', icon: UsersIcon },
    { path: '/admin/content', label: 'Content', icon: NewspaperIcon },
    { path: '/admin/fandoms', label: 'Fandoms', icon: ArrowTrendingUpIcon },
    { path: '/admin/shop', label: 'Shop & Drops', icon: ShoppingCartIcon },
    { path: '/admin/analytics', label: 'Analytics', icon: ChartBarIcon }
  ]
  
  if (authStore.isWriter) {
    return [
    { path: '/writer/posts/new', label: 'New Post', icon: PencilIcon },
    { path: '/writer/posts', label: 'My Posts', icon: NewspaperIcon }
    ]
  }
  
  return baseItems
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>