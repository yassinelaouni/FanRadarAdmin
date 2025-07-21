<template>
  <div class="p-6">
    <PostEditor
      :post="newPost"
      :is-editing="false"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PostEditor from './PostEditor.vue'

const router = useRouter()

const newPost = ref({
  id: null,
  title: '',
  content: '',
  description: '',
  type: 'article',
  category: '',
  tags: [],
  featuredImage: '',
  images: [],
  videos: [],
  pollQuestion: '',
  pollOptions: ['', ''],
  status: 'draft'
})

function handleSave(postData) {
  console.log('Saving new post:', postData)
  // In a real app, call API to save
  router.push('/writer/posts')
}

function handleCancel() {
  router.push('/writer/posts')
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow-md overflow-hidden;
}
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500;
}
.btn-primary {
  @apply bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors;
}
.btn-secondary {
  @apply bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
}
</style>