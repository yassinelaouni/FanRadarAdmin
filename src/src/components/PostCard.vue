<template>
    <div class="bg-white p-4 rounded shadow hover:shadow-md">
      <h2 class="text-lg font-bold mb-2">{{ title }}</h2>
      <p class="text-sm text-gray-600">{{ category }} • {{ author }}</p>
      <p class="text-xs text-gray-400">Scheduled: {{ scheduled }}</p>
      <span :class="statusClass(status)" class="text-sm font-medium">{{ status }}</span>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['title', 'category', 'author', 'scheduled', 'status'])
  function statusClass(status) {
    return status === 'Published'
      ? 'text-green-600'
      : 'text-yellow-600'
  }
  </script>