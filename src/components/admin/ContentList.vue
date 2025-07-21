<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="item in content" :key="item.id">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-blue-600 truncate">{{ item.title }}</p>
              <div class="ml-2 flex-shrink-0 flex">
                <p :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`">
                  {{ item.status }}
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <UserIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {{ item.author }}
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <TagIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {{ item.type }}
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <button @click="$emit('view', item.id)" class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button v-if="item.status === 'pending'" @click="$emit('approve', item.id)" class="text-green-600 hover:text-green-900 mr-3">Approve</button>
                <button v-if="item.status === 'pending'" @click="$emit('reject', item.id)" class="text-red-600 hover:text-red-900 mr-3">Reject</button>
                <button v-if="item.status === 'rejected'" @click="$emit('delete', item.id)" class="text-red-600 hover:text-red-900">Delete</button>
                <span v-if="item.status === 'published'" class="text-green-600">Published</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { UserIcon, TagIcon } from '@heroicons/vue/24/outline'
  
  defineProps({
    content: Array
  })
  
  defineEmits(['approve', 'reject', 'delete', 'view'])
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  </script>