<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Posts Management</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead class="border-b bg-gray-100">
            <tr>
              <th class="px-4 py-2">Title</th>
              <th class="px-4 py-2">Category</th>
              <th class="px-4 py-2">Author</th>
              <th class="px-4 py-2">Scheduled</th>
              <th class="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ post.title }}</td>
              <td class="px-4 py-2">{{ post.category }}</td>
              <td class="px-4 py-2">{{ post.author }}</td>
              <td class="px-4 py-2">{{ post.scheduled }}</td>
              <td class="px-4 py-2">
                <span :class="statusClass(post.status)">{{ post.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { mockPosts } from '../mock/posts.js'
  const posts = ref(mockPosts)
  function statusClass(status) {
    return status === 'Published' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'
  }
  </script>