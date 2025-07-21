<template>
    <div class="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div class="flex-1">
        <Topbar />
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from './components/Sidebar.vue'
  import Topbar from './components/Topbar.vue'
  </script>