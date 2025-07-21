<template>
  <header class="bg-white shadow-sm">
    <div class="flex items-center justify-between h-16 px-6">
      <div class="flex items-center">
        <button class="md:hidden mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 v-if="displayTitle" class="text-lg font-semibold text-gray-900">{{ displayTitle }}</h1>
      </div>
      
      <div v-if="authStore.user" class="flex items-center space-x-4">
        <!-- Notification Bell -->
        <div class="relative">
          <button class="text-gray-500 hover:text-gray-700" @click="toggleNotifications">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          <!-- Notification Popup -->
          <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
            <div class="p-4 border-b font-semibold text-gray-700">Notifications</div>
            <ul>
              <li v-for="(notif, idx) in notifications" :key="idx" class="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 border-b last:border-b-0">
                {{ notif }}
              </li>
            </ul>
            <div v-if="notifications.length === 0" class="p-4 text-gray-400 text-sm">No notifications</div>
          </div>
        </div>
        
        <!-- Profile Dropdown -->
        <div class="relative flex items-center">
          <button class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium focus:outline-none" @click="toggleProfileMenu">
            {{ userInitials }}
          </button>
          <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none" @click="toggleProfileMenu">
          <!-- Profile Menu Popup -->
          <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
            <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</router-link>
            <div class="px-4 py-2 text-xs text-gray-400 border-t">Role: {{ authStore.user.role }}</div>
          </div>
          <div class="ml-3 hidden md:block">
            <p class="text-sm font-medium text-gray-900">{{ authStore.user.name }}</p>
            <p class="text-xs text-gray-500 capitalize">{{ authStore.user.role }}</p>
          </div>
        </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const props = defineProps({
  title: { type: String, default: '' }
})

const route = useRoute()
const authStore = useAuthStore()

const showNotifications = ref(false)
const showProfileMenu = ref(false)

const notifications = ref([
  'Your post was approved!',
  'New comment on your article.',
  'System maintenance scheduled for Friday.'
])

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
  showProfileMenu.value = false
}

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
  showNotifications.value = false
}

const computedTitle = computed(() => { 
  const routeNames = {
    '/admin': 'Dashboard',
    '/posts': 'Posts Management',
    '/fandoms': 'Fandoms Tracker',
    '/analytics': 'Analytics Overview',
    '/writer/posts': 'My Posts',
    '/writer/submissions': 'My Submissions'
  }
  return ''
})

const displayTitle = computed(() => props.title || computedTitle.value)

const userInitials = computed(() => {
  if (!authStore.user?.name) return 'U'
  return authStore.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
})
</script>