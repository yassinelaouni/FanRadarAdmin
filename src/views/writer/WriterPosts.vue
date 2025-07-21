<template>
  <div class="p-6">
    <!-- Router View for Editor -->
    <router-view v-if="$route.params.id"></router-view>
    
    <!-- List View -->
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">My Submissions</h1>
        <router-link to="/writer/posts/new" class="btn-primary">
          Create New Post
        </router-link>
      </div>

      <!-- Performance Widgets -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-medium text-gray-500">Approval Rate</h3>
          <p class="text-xl font-bold">{{ stats.approvalRate }}%</p>
          <p class="text-sm">{{ stats.pendingCount }} pending review</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-medium text-gray-500">Total Views</h3>
          <p class="text-xl font-bold">{{ stats.totalViews.toLocaleString() }}</p>
          <p class="text-sm">{{ stats.publishedCount }} published posts</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-medium text-gray-500">Top Fandom</h3>
          <p class="text-xl font-bold">{{ stats.topFandom }}</p>
          <p class="text-sm">{{ stats.fandomBoost }}× more engagement</p>
        </div>
      </div>

      <!-- Posts Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="post in posts" :key="post.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded object-cover" :src="post.thumbnail" :alt="post.title">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ post.title }}</div>
                    <div class="text-sm text-gray-500">{{ post.category }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="typeClass(post.type)">
                  {{ getTypeLabel(post.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="statusClass(post.status)">
                  {{ post.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(post.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ post.views.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <router-link 
                  :to="`/writer/posts/${post.id}/edit`" 
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </router-link>
                <button 
                  @click="confirmDelete(post.id)" 
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="posts.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">No posts yet</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
        <div class="mt-6">
          <router-link to="/writer/posts/new" class="btn-primary">
            Create Post
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Sample data - replace with API calls
const posts = ref([
  {
    id: 1,
    title: 'BTS Fan Art Collection',
    type: 'image',
    category: 'K-Pop',
    status: 'published',
    date: '2023-07-15',
    views: 1243,
    thumbnail: 'https://www.korea.net/upload/content/editImage/20220630111355999_E6JIHIDN.jpg'
  },
  {
    id: 2,
    title: 'Marvel Cinematic Universe Theory',
    type: 'article',
    category: 'Movies',
    status: 'pending',
    date: '2023-07-18',
    views: 0,
    thumbnail: 'https://sm.mashable.com/mashable_in/seo/default/image_q24w.png'
  },
  {
    id: 3,
    title: 'Anime Opening Compilation',
    type: 'video',
    category: 'Anime',
    status: 'rejected',
    date: '2023-07-10',
    views: 0,
    thumbnail: 'https://c4.wallpaperflare.com/wallpaper/976/569/72/solo-leveling-manga-edit-sung-jin-woo-anime-hd-wallpaper-preview.jpg',
    feedback: 'Contains copyrighted material'
  },
  {
    id: 4,
    title: 'Best Gaming Character Poll',
    type: 'poll',
    category: 'Gaming',
    status: 'draft',
    date: '2023-07-20',
    views: 0,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'
  }
])

const stats = ref({
  approvalRate: 78,
  pendingCount: 1,
  totalViews: 5321,
  publishedCount: 8,
  topFandom: 'K-Pop',
  fandomBoost: 2.3
})

function getTypeLabel(type: string) {
  const labels: { [key: string]: string } = {
    'article': 'Article',
    'image': 'Image',
    'video': 'Video',
    'poll': 'Poll'
  }
  return labels[type] || type
}

function typeClass(type: string) {
  const classes: { [key: string]: string } = {
    'article': 'bg-blue-100 text-blue-800',
    'image': 'bg-purple-100 text-purple-800',
    'video': 'bg-red-100 text-red-800',
    'poll': 'bg-orange-100 text-orange-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

function statusClass(status: string) {
  const classes: { [key: string]: string } = {
    'published': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'rejected': 'bg-red-100 text-red-800',
    'draft': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function confirmDelete(id: number) {
  if (confirm('Are you sure you want to delete this post?')) {
    // In a real app, call API to delete
    posts.value = posts.value.filter(post => post.id !== id)
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors;
}
</style>