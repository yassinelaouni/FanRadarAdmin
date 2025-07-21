<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Upcoming Drops</h3>
      <div class="space-y-4">
        <div v-for="event in events" :key="event.id" class="border-l-4 border-blue-500 p-4 bg-gray-50">
          <div class="flex justify-between">
            <h4 class="font-medium">{{ event.title }}</h4>
            <span class="text-sm text-gray-500">{{ event.date }} at {{ event.time }}</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">Status: {{ event.status }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    events: Array
  })
  </script>