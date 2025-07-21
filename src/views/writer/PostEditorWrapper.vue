<template>
  <div class="p-6">
    <PostEditor
      :post="currentPost"
      :is-editing="isEditing"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostEditor from './PostEditor.vue'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const currentPost = ref({
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

// Watch for route changes
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadPost(newId.toString())
      isEditing.value = true
    } else {
      resetPost()
      isEditing.value = false
    }
  },
  { immediate: true }
)

function loadPost(id) {
  // In a real app, fetch from API
  console.log('Loading post', id)
  // Mock data for demo
  currentPost.value = {
    id: 1,
    title: 'Sample Post Title',
    content: 'This is the post content...',
    description: 'Sample description for the post',
    type: 'article',
    category: 'K-Pop',
    tags: ['BTS', 'Fan Art'],
    featuredImage: 'https://www.korea.net/upload/content/editImage/20220630111355999_E6JIHIDN.jpg',
    images: [],
    videos: [],
    pollQuestion: '',
    pollOptions: ['', ''],
    status: 'draft'
  }
}

function resetPost() {
  currentPost.value = {
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
  }
}

function handleSave(postData) {
  console.log('Saving post:', postData)
  // In a real app, call API to save
  router.push('/writer/posts')
}

function handleCancel() {
  router.push('/writer/posts')
}
</script>