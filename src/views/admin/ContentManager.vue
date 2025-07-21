<template>
    <div class="content-manager">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Content Management</h1>
        <div class="flex space-x-4">
          <button @click="handleRefresh" class="btn-secondary w-32 flex items-center custom-bg justify-center">
            <ArrowPathIcon class="w-5 h-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>
      
      <ContentTabs :tabs="tabs" v-model:activeTab="activeTab" />
      
      <ContentList :content="filteredContent" @approve="handleApprove" @reject="handleReject" @delete="handleDelete" @view="handleViewDetails" />

      <!-- View Details Modal -->
      <div v-if="showDetailsModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96 max-h-96 overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Post Details</h2>
            <button @click="showDetailsModal = false" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div v-if="selectedContent" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Title</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedContent.title }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Author</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedContent.author }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedContent.description || 'No description provided' }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedContent.category || 'No category selected' }}</p>
            </div>
            
            <div v-if="selectedContent.tags && selectedContent.tags.length > 0">
              <label class="block text-sm font-medium text-gray-700">Tags</label>
              <div class="mt-1 flex flex-wrap gap-2">
                <span v-for="tag in selectedContent.tags" :key="tag" class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Type</label>
              <span :class="`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeClass(selectedContent.type)}`">
                {{ selectedContent.type }}
              </span>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span :class="`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(selectedContent.status)}`">
                {{ selectedContent.status }}
              </span>
            </div>
            
            <div v-if="selectedContent.rejectReason">
              <label class="block text-sm font-medium text-gray-700">Rejection Reason</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedContent.rejectReason }}</p>
            </div>
            
            <div v-if="selectedContent.type === 'poll'">
              <label class="block text-sm font-medium text-gray-700">Poll Options</label>
              <div class="mt-1 space-y-2">
                <div v-for="(option, index) in selectedContent.options || ['Option 1', 'Option 2', 'Option 3']" :key="index" class="flex items-center">
                  <span class="text-sm text-gray-900">{{ option }}</span>
                  <span v-if="selectedContent.votes" class="ml-2 text-xs text-gray-500">({{ selectedContent.votes[index] || 0 }} votes)</span>
                </div>
              </div>
            </div>
            
            <div v-if="selectedContent.type === 'article'">
              <label class="block text-sm font-medium text-gray-700">Content Preview</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedContent.content || 'Article content preview...' }}</p>
            </div>
            
            <div v-if="selectedContent.type === 'image'">
              <label class="block text-sm font-medium text-gray-700">Image</label>
              <div class="mt-1 w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                <span class="text-xs text-gray-500">Image Preview</span>
              </div>
            </div>
            
            <div v-if="selectedContent.type === 'video'">
              <label class="block text-sm font-medium text-gray-700">Video</label>
              <div class="mt-1 w-32 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span class="text-xs text-gray-500">Video Preview</span>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end space-x-2">
            <button @click="showDetailsModal = false" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">
              Close
            </button>
            <button v-if="selectedContent?.status === 'pending'" @click="handleApproveFromDetails" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Approve
            </button>
            <button v-if="selectedContent?.status === 'pending'" @click="handleRejectFromDetails" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Reject
            </button>
          </div>
        </div>
      </div>

      <!-- Add New Post Modal -->
      <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Create New Post</h2>
          <div class="mb-2">
            <label class="block text-sm">Title</label>
            <input v-model="newPost.title" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Author</label>
            <input v-model="newPost.author" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Type</label>
            <select v-model="newPost.type" class="w-full border rounded px-2 py-1">
              <option value="article">Article</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="poll">Poll</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm">Status</label>
            <select v-model="newPost.status" class="w-full border rounded px-2 py-1">
              <option value="pending">Pending</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="showAddModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="handleAddPost" class="px-4 py-1 bg-blue-600 text-white rounded">Create Post</button>
          </div>
        </div>
      </div>

      <!-- Approve Confirmation Modal -->
      <div v-if="showApproveModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Approve Content</h2>
          <p class="mb-4">Are you sure you want to approve "{{ contentToModify?.title }}"?</p>
          <div class="flex justify-end">
            <button @click="showApproveModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="confirmApprove" class="px-4 py-1 bg-green-600 text-white rounded">Approve</button>
          </div>
        </div>
      </div>

      <!-- Reject Confirmation Modal -->
      <div v-if="showRejectModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Reject Content</h2>
          <p class="mb-4">Are you sure you want to reject "{{ contentToModify?.title }}"?</p>
          <div class="mb-4">
            <label class="block text-sm">Reason (optional)</label>
            <textarea v-model="rejectReason" class="w-full border rounded px-2 py-1" rows="3" placeholder="Enter rejection reason..."></textarea>
          </div>
          <div class="flex justify-end">
            <button @click="showRejectModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="confirmReject" class="px-4 py-1 bg-red-600 text-white rounded">Reject</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
  import ContentTabs from '@/components/admin/ContentTabs.vue'
  import ContentList from '@/components/admin/ContentList.vue'
  
  const tabs = [
    { id: 'all', label: 'All Content' },
    { id: 'pending', label: 'Pending Approval' },
    { id: 'published', label: 'Published' }
  ]
  const activeTab = ref('all')
  
  const content = ref([
    { id: 1, title: 'New Anime Trends', author: 'Alex Johnson', status: 'published', type: 'article' },
    { id: 2, title: 'K-pop Fan Art', author: 'Sam Wilson', status: 'pending', type: 'image' },
    { id: 3, title: 'Gaming Tournament Results', author: 'Maria Garcia', status: 'pending', type: 'article' },
    { id: 4, title: 'Movie Review: Latest Blockbuster', author: 'John Lee', status: 'published', type: 'video' },
    { id: 5, title: 'Fan Poll: Best Character', author: 'Priya Singh', status: 'draft', type: 'poll' },
    { id: 6, title: 'Concert Highlights', author: 'Chen Wei', status: 'pending', type: 'image' }
  ])
  
  const filteredContent = computed(() => {
    if (activeTab.value === 'all') return content.value
    return content.value.filter(item => item.status === activeTab.value)
  })

  // Modal states
  const showAddModal = ref(false)
  const showApproveModal = ref(false)
  const showRejectModal = ref(false)
  const showDetailsModal = ref(false)
  const contentToModify = ref(null)
  const selectedContent = ref(null)
  const rejectReason = ref('')

  // New post data
  const newPost = ref({
    title: '',
    author: '',
    type: 'article',
    status: 'pending'
  })

  // Handlers
  const handleRefresh = () => {
    // Simulate refresh by shuffling content order
    content.value = [...content.value].sort(() => Math.random() - 0.5)
    console.log('Content refreshed!')
  }

  const handleAddPost = () => {
    const post = {
      id: content.value.length + 1,
      ...newPost.value
    }
    content.value.push(post)
    
    // Reset form
    newPost.value = {
      title: '',
      author: '',
      type: 'article',
      status: 'pending'
    }
    showAddModal.value = false
  }

  const handleApprove = (contentId) => {
    contentToModify.value = content.value.find(item => item.id === contentId)
    showApproveModal.value = true
  }

  const confirmApprove = () => {
    if (contentToModify.value) {
      const idx = content.value.findIndex(item => item.id === contentToModify.value.id)
      if (idx !== -1) {
        content.value[idx].status = 'published'
      }
    }
    showApproveModal.value = false
    contentToModify.value = null
  }

  const handleReject = (contentId) => {
    contentToModify.value = content.value.find(item => item.id === contentId)
    showRejectModal.value = true
  }

  const confirmReject = () => {
    if (contentToModify.value) {
      const idx = content.value.findIndex(item => item.id === contentToModify.value.id)
      if (idx !== -1) {
        content.value[idx].status = 'rejected'
        if (rejectReason.value) {
          content.value[idx].rejectReason = rejectReason.value
        }
      }
    }
    showRejectModal.value = false
    contentToModify.value = null
    rejectReason.value = ''
  }

  const handleDelete = (contentId) => {
    if (confirm('Are you sure you want to delete this content?')) {
      content.value = content.value.filter(item => item.id !== contentId)
    }
  }

  const handleViewDetails = (contentId) => {
    selectedContent.value = content.value.find(item => item.id === contentId)
    showDetailsModal.value = true
  }

  const handleApproveFromDetails = () => {
    if (selectedContent.value) {
      const idx = content.value.findIndex(item => item.id === selectedContent.value.id)
      if (idx !== -1) {
        content.value[idx].status = 'published'
      }
    }
    showDetailsModal.value = false
    selectedContent.value = null
  }

  const handleRejectFromDetails = () => {
    if (selectedContent.value) {
      contentToModify.value = selectedContent.value
      showDetailsModal.value = false
      showRejectModal.value = true
    }
  }

  const getTypeClass = (type) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800'
      case 'image': return 'bg-purple-100 text-purple-800'
      case 'video': return 'bg-red-100 text-red-800'
      case 'poll': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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

<style scoped>
.custom-bg {
  background-color: #e7e7e7 !important;
  border-radius: 0.5rem;
}
</style>