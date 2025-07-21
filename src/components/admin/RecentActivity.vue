<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul class="space-y-4">
        <li v-for="(activity, index) in activities" :key="index" class="flex items-start">
          <div class="flex-shrink-0 bg-blue-100 p-2 rounded-full">
            <component :is="activity.icon" class="h-5 w-5 text-blue-600" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
            <p class="text-sm text-gray-500">{{ activity.time }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ClockIcon, UserIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
  
  const activities = [
    { action: 'New post created', time: '5 minutes ago', icon: DocumentTextIcon },
    { action: 'User signed up', time: '1 hour ago', icon: UserIcon },
    { action: 'System update', time: '2 hours ago', icon: ClockIcon }
  ]
  </script>