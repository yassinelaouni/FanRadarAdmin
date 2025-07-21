<template>
    <div>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            {{ isEditing ? 'Edit Post' : 'Create New Post' }}
          </h1>
          <p class="text-gray-600">Craft engaging content for the FanRadars community</p>
        </div>
        <div class="flex space-x-2">
          <button 
            @click="$emit('cancel')"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button 
            @click="saveDraft"
            class="btn-secondary"
            :disabled="isSaving"
          >
            <span v-if="isSaving">Saving...</span>
            <span v-else>Save Draft</span>
          </button>
          <button 
            @click="submitForReview"
            class="btn-primary"
            :disabled="isSaving"
          >
            <span v-if="isSaving">Submitting...</span>
            <span v-else>Submit for Review</span>
          </button>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <!-- Content Type Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                v-for="type in contentTypes" 
                :key="type.value"
                @click="post.type = type.value"
                :class="[
                  'p-4 border-2 rounded-lg text-center transition-colors',
                  post.type === type.value 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <component :is="type.icon" class="w-8 h-8 mx-auto mb-2" />
                <div class="font-medium">{{ type.label }}</div>
                <div class="text-xs text-gray-500">{{ type.description }}</div>
              </button>
            </div>
          </div>

          <!-- Title -->
          <div class="mb-6">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
            <input 
              type="text" 
              id="title" 
              v-model="post.title"
              placeholder="Catchy title that grabs attention"
              class="input-field"
            >
          </div>

          <!-- Content Editor - Different based on type -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ getContentLabel() }}
            </label>
            
            <!-- Article Editor -->
            <div v-if="post.type === 'article'" class="border border-gray-300 rounded-lg">
              <!-- Toolbar -->
              <div class="flex flex-wrap items-center border-b border-gray-200 bg-gray-50 p-2">
                <button type="button" class="p-2 text-gray-700 hover:bg-gray-200 rounded-md" title="Bold" @click="execCommand('bold')">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 010 8H6zm0 8h8a4 4 0 010 8H6z" />
                  </svg>
                </button>
                <button type="button" class="p-2 text-gray-700 hover:bg-gray-200 rounded-md" title="Italic" @click="execCommand('italic')">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h-6m6 16h-6m3-16v16" />
                  </svg>
                </button>
                <div class="h-4 w-px bg-gray-300 mx-1"></div>
                <button type="button" class="p-2 text-gray-700 hover:bg-gray-200 rounded-md" title="Heading 1" @click="execCommand('formatBlock', '<h1>')">
                  <span class="font-bold">H1</span>
                </button>
                <button type="button" class="p-2 text-gray-700 hover:bg-gray-200 rounded-md" title="Heading 2" @click="execCommand('formatBlock', '<h2>')">
                  <span class="font-bold text-sm">H2</span>
                </button>
                <button type="button" class="p-2 text-gray-700 hover:bg-gray-200 rounded-md" title="Link" @click="insertLink">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
              <div 
                ref="editor" 
                contenteditable="true" 
                @input="updateContent"
                class="w-full p-4 focus:outline-none min-h-[300px] prose max-w-none"
                v-html="post.content"
              ></div>
            </div>

            <!-- Image Upload -->
            <div v-if="post.type === 'image'" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <PhotoIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p class="text-lg font-medium text-gray-900 mb-2">Upload your image</p>
              <p class="text-sm text-gray-600 mb-4">Share your fan art, memes, or event photos</p>
              <input 
                type="file" 
                id="imageUpload" 
                class="hidden" 
                accept="image/*" 
                @change="handleImageUpload"
                multiple
              >
              <label for="imageUpload" class="btn-primary cursor-pointer">
                Select Images
              </label>
              <div v-if="post.images && post.images.length > 0" class="mt-6 grid grid-cols-2 gap-4">
                <div v-for="(image, index) in post.images" :key="index" class="relative">
                  <img :src="image" alt="Uploaded" class="w-full h-32 object-cover rounded-lg">
                  <button @click="removeImage(index)" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                    <XMarkIcon class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Video Upload -->
            <div v-if="post.type === 'video'" class="space-y-4">
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p class="text-lg font-medium text-gray-900 mb-2">Add your video</p>
                <p class="text-sm text-gray-600 mb-4">Upload video file or add YouTube/Vimeo link</p>
                <input 
                  type="file" 
                  id="videoUpload" 
                  class="hidden" 
                  accept="video/*" 
                  @change="handleVideoUpload"
                >
                <label for="videoUpload" class="btn-primary cursor-pointer mr-2">
                  Upload Video
                </label>
                <button @click="showVideoUrlInput = true" class="btn-secondary">
                  Add URL
                </button>
              </div>
              
              <!-- Video URL Input -->
              <div v-if="showVideoUrlInput" class="border border-gray-300 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <div class="flex">
                  <input 
                    v-model="videoUrl"
                    type="url" 
                    placeholder="https://youtube.com/watch?v=..." 
                    class="input-field rounded-r-none"
                  >
                  <button @click="addVideoUrl" class="btn-primary rounded-l-none">Add</button>
                </div>
              </div>

              <div v-if="post.videos && post.videos.length > 0" class="space-y-4">
                <div v-for="(video, index) in post.videos" :key="index" class="relative">
                  <video v-if="video.type === 'file'" :src="video.url" controls class="w-full rounded-lg"></video>
                  <iframe v-else :src="video.url" frameborder="0" allowfullscreen class="w-full h-64 rounded-lg"></iframe>
                  <button @click="removeVideo(index)" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                    <XMarkIcon class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Poll Creator -->
            <div v-if="post.type === 'poll'" class="space-y-4">
              <div class="border border-gray-300 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Poll Question</label>
                <input 
                  v-model="post.pollQuestion"
                  type="text" 
                  placeholder="What's your favorite anime character?"
                  class="input-field"
                >
              </div>
              
              <div class="border border-gray-300 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Poll Options</label>
                <div class="space-y-2">
                  <div v-for="(option, index) in post.pollOptions" :key="index" class="flex">
                    <input 
                      v-model="post.pollOptions[index]"
                      type="text" 
                      :placeholder="`Option ${index + 1}`"
                      class="input-field rounded-r-none"
                    >
                    <button 
                      v-if="post.pollOptions.length > 2"
                      @click="removePollOption(index)" 
                      class="bg-red-500 text-white px-3 rounded-r-lg hover:bg-red-600"
                    >
                      <XMarkIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button 
                  v-if="post.pollOptions.length < 6"
                  @click="addPollOption" 
                  class="mt-2 btn-secondary"
                >
                  Add Option
                </button>
              </div>
            </div>
          </div>
          
          <!-- Description -->
          <div class="mb-6">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              id="description" 
              v-model="post.description"
              rows="3"
              placeholder="Brief description of your content"
              class="input-field"
            ></textarea>
          </div>
        </div>
        
        <div class="lg:col-span-1">
          <!-- Category -->
          <div class="card mb-6">
            <div class="p-4 border-b border-gray-200">
              <h3 class="font-medium text-gray-900">Category & Tags</h3>
            </div>
            <div class="p-4">
              <div class="mb-4">
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  id="category" 
                  v-model="post.category"
                  class="input-field"
                >
                  <option value="">Select a category</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
              
              <div>
                <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span v-for="(tag, index) in post.tags" :key="index" class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {{ tag }}
                    <button @click="removeTag(index)" class="ml-2 text-indigo-600 hover:text-indigo-900">
                      <XMarkIcon class="h-4 w-4" />
                    </button>
                  </span>
                </div>
                <div class="flex">
                  <input 
                    type="text" 
                    v-model="tagInput"
                    @keydown.enter.prevent="addTag"
                    placeholder="Add a tag and press Enter"
                    class="input-field rounded-r-none"
                  >
                  <button 
                    @click="addTag"
                    class="bg-gray-200 hover:bg-gray-300 px-3 rounded-r-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { 
    XMarkIcon, 
    PhotoIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    ChartBarIcon
  } from '@heroicons/vue/24/outline'
  
  const router = useRouter()

  const props = defineProps({
    post: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['save', 'cancel'])
  
  // Editor state
  const editor = ref(null)
  const isSaving = ref(false)
  const tagInput = ref('')
  const showVideoUrlInput = ref(false)
  const videoUrl = ref('')
  
  // Content types
  const contentTypes = ref([
    {
      value: 'article',
      label: 'Article',
      description: 'Text content, reviews, guides',
      icon: DocumentTextIcon
    },
    {
      value: 'image',
      label: 'Image',
      description: 'Photos, fan art, memes',
      icon: PhotoIcon
    },
    {
      value: 'video',
      label: 'Video',
      description: 'Clips, reviews, tutorials',
      icon: VideoCameraIcon
    },
    {
      value: 'poll',
      label: 'Poll',
      description: 'Surveys, voting',
      icon: ChartBarIcon
    }
  ])
  
  // Static data
  const categories = ref([
    'Anime', 'K-pop', 'Gaming', 'Movies', 'TV Shows', 
    'Music', 'E-Sports', 'Comics', 'Celebrities', 'Events'
  ])
  
  // Initialize post data if not provided
  if (!props.post.type) {
    props.post.type = 'article'
  }
  if (!props.post.images) {
    props.post.images = []
  }
  if (!props.post.videos) {
    props.post.videos = []
  }
  if (!props.post.pollQuestion) {
    props.post.pollQuestion = ''
  }
  if (!props.post.pollOptions) {
    props.post.pollOptions = ['', '']
  }
  if (!props.post.tags) {
    props.post.tags = []
  }
  if (!props.post.description) {
    props.post.description = ''
  }
  
  // Methods
  function getContentLabel() {
    switch (props.post.type) {
      case 'article': return 'Article Content'
      case 'image': return 'Images'
      case 'video': return 'Videos'
      case 'poll': return 'Poll Details'
      default: return 'Content'
    }
  }
  
  function execCommand(command, value = '') {
    if (editor.value) {
      document.execCommand(command, false, value)
      editor.value.focus()
    }
  }
  
  function updateContent() {
    if (editor.value) {
      props.post.content = editor.value.innerHTML
    }
  }

  function insertLink() {
    const url = prompt('Enter the URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }
  
  function addTag() {
    if (tagInput.value.trim() && !props.post.tags.includes(tagInput.value.trim())) {
      props.post.tags.push(tagInput.value.trim())
      tagInput.value = ''
    }
  }
  
  function removeTag(index) {
    props.post.tags.splice(index, 1)
  }
  
  function handleImageUpload(e) {
    const input = e.target
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            props.post.images.push(reader.result)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  function removeImage(index) {
    props.post.images.splice(index, 1)
  }

  function handleVideoUpload(e) {
    const input = e.target
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          props.post.videos.push({
            url: reader.result,
            type: 'file'
          })
        }
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  function addVideoUrl() {
    if (videoUrl.value.trim()) {
      props.post.videos.push({
        url: videoUrl.value.trim(),
        type: 'url'
      })
      videoUrl.value = ''
      showVideoUrlInput.value = false
    }
  }

  function removeVideo(index) {
    props.post.videos.splice(index, 1)
  }

  function addPollOption() {
    if (props.post.pollOptions.length < 6) {
      props.post.pollOptions.push('')
    }
  }

  function removePollOption(index) {
    if (props.post.pollOptions.length > 2) {
      props.post.pollOptions.splice(index, 1)
    }
  }
  
  async function saveDraft() {
    isSaving.value = true
    props.post.status = 'draft'
    emit('save', props.post)
    isSaving.value = false
  }
  
  async function submitForReview() {
    isSaving.value = true
    props.post.status = 'pending'
    emit('save', props.post)
    isSaving.value = false
  }
  
  // Initialize editor
  onMounted(() => {
    if (editor.value && !props.post.content) {
      editor.value.innerHTML = '<p>Start writing your amazing content here...</p>'
    }
  })
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