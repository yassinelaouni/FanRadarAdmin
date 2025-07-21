<template>
    <div class="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Topbar :title="route.path === '/writer/posts/new' ? '' : undefined" />
        <main class="flex-1 overflow-y-auto p-6 bg-gray-50">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Sidebar.vue'
  import Topbar from '@/components/Topbar.vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  </script>