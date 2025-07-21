<template>
    <div class="shop-management">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Shop & Drops</h1>
        <div class="flex flex-row gap-4">
          <button @click="showAddModal = true" class="btn-primary w-40 flex items-center">
            <PlusIcon class="w-5 h-5 mr-2" />
            Add Product
          </button>
          <button @click="showDropModal = true" class="btn-secondary w-40 flex items-center">
            <ClockIcon class="w-5 h-5 mr-2" />
            Schedule Drop
          </button>
        </div>
      </div>
      
      <ProductTable :products="products" @edit="handleEditProduct" />
      
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Upcoming Drops</h2>
        <DropCalendar :events="drops" />
      </div>

      <!-- Add Product Modal -->
      <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Add New Product</h2>
          <div class="mb-2">
            <label class="block text-sm">Product Name</label>
            <input v-model="newProduct.name" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Stock</label>
            <input v-model="newProduct.stock" type="number" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Price</label>
            <input v-model="newProduct.price" type="number" step="0.01" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Availability</label>
            <select v-model="newProduct.availability" class="w-full border rounded px-2 py-1">
              <option value="all">All Time</option>
              <option value="limited">Limited Time</option>
            </select>
          </div>
          <div v-if="newProduct.availability === 'limited'" class="mb-2">
            <label class="block text-sm">Start Time</label>
            <input v-model="newProduct.startTime" type="datetime-local" class="w-full border rounded px-2 py-1" />
            <label class="block text-sm mt-2">End Time</label>
            <input v-model="newProduct.endTime" type="datetime-local" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label class="block text-sm">Status</label>
            <select v-model="newProduct.status" class="w-full border rounded px-2 py-1">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="showAddModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="handleAddProduct" class="px-4 py-1 bg-blue-600 text-white rounded">Add Product</button>
          </div>
        </div>
      </div>

      <!-- Schedule Drop Modal -->
      <div v-if="showDropModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Schedule New Drop</h2>
          <div class="mb-2">
            <label class="block text-sm">Drop Title</label>
            <input v-model="newDrop.title" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Date</label>
            <input v-model="newDrop.date" type="date" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Time</label>
            <input v-model="newDrop.time" type="time" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label class="block text-sm">Status</label>
            <select v-model="newDrop.status" class="w-full border rounded px-2 py-1">
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="showDropModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="handleAddDrop" class="px-4 py-1 bg-blue-600 text-white rounded">Schedule Drop</button>
          </div>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Edit Product</h2>
          <div class="mb-2">
            <label class="block text-sm">Product Name</label>
            <input v-model="editingProduct.name" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Stock</label>
            <input v-model="editingProduct.stock" type="number" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Price</label>
            <input v-model="editingProduct.price" type="number" step="0.01" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Availability</label>
            <select v-model="editingProduct.availability" class="w-full border rounded px-2 py-1">
              <option value="all">All Time</option>
              <option value="limited">Limited Time</option>
            </select>
          </div>
          <div v-if="editingProduct.availability === 'limited'" class="mb-2">
            <label class="block text-sm">Start Time</label>
            <input v-model="editingProduct.startTime" type="datetime-local" class="w-full border rounded px-2 py-1" />
            <label class="block text-sm mt-2">End Time</label>
            <input v-model="editingProduct.endTime" type="datetime-local" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Image URL</label>
            <input v-model="editingProduct.image" class="w-full border rounded px-2 py-1" placeholder="Paste image URL or upload below" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Or Upload Image</label>
            <input type="file" accept="image/*" @change="onEditImageUpload" class="w-full" />
          </div>
          <div v-if="editingProduct.image" class="mb-2">
            <img :src="editingProduct.image" alt="Product Image" class="h-20 w-20 object-cover rounded border" />
          </div>
          <div class="mb-4">
            <label class="block text-sm">Status</label>
            <select v-model="editingProduct.status" class="w-full border rounded px-2 py-1">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="showEditModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="saveEditProduct" class="px-4 py-1 bg-blue-600 text-white rounded">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { PlusIcon, ClockIcon } from '@heroicons/vue/24/outline'
  import ProductTable from '@/components/admin/ProductTable.vue'
  import DropCalendar from '@/components/admin/DropCalendar.vue'
  
  const products = ref([
    { id: 1, name: 'Limited Edition Poster', stock: 42, price: 29.99, status: 'active', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', availability: 'limited', startTime: '', endTime: '' },
    { id: 2, name: 'Fan Club Membership', stock: 120, price: 9.99, status: 'active', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', availability: 'all', startTime: '', endTime: '' },
    { id: 3, name: 'Collector\'s Box Set', stock: 15, price: 89.99, status: 'active', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', availability: 'limited', startTime: '', endTime: '' },
    { id: 4, name: 'Exclusive T-Shirt', stock: 78, price: 24.99, status: 'inactive', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', availability: 'all', startTime: '', endTime: '' }
  ])
  
  const drops = ref([
    { id: 1, title: 'Summer Collection', date: '2023-07-15', time: '14:00', status: 'scheduled' },
    { id: 2, title: 'Anime Expo Exclusive', date: '2023-07-22', time: '10:00', status: 'scheduled' },
    { id: 3, title: 'Holiday Special', date: '2023-12-01', time: '12:00', status: 'draft' }
  ])

  // Modal states
  const showAddModal = ref(false)
  const showDropModal = ref(false)
  const showEditModal = ref(false)
  const editingProduct = ref(null)

  // New product/drop data
  const newProduct = ref({
    name: '',
    stock: 0,
    price: 0,
    status: 'active',
    availability: 'all',
    startTime: '',
    endTime: ''
  })

  const newDrop = ref({
    title: '',
    date: '',
    time: '',
    status: 'scheduled'
  })

  // Handlers
  const handleAddProduct = () => {
    const product = {
      id: products.value.length + 1,
      ...newProduct.value
    }
    products.value.push(product)
    
    // Reset form
    newProduct.value = {
      name: '',
      stock: 0,
      price: 0,
      status: 'active',
      availability: 'all',
      startTime: '',
      endTime: ''
    }
    showAddModal.value = false
  }

  const handleAddDrop = () => {
    const drop = {
      id: drops.value.length + 1,
      ...newDrop.value
    }
    drops.value.push(drop)
    
    // Reset form
    newDrop.value = {
      title: '',
      date: '',
      time: '',
      status: 'scheduled'
    }
    showDropModal.value = false
  }

  const handleEditProduct = (productId) => {
    const product = products.value.find(p => p.id === productId)
    if (product) {
      editingProduct.value = { ...product }
      showEditModal.value = true
    }
  }

  const saveEditProduct = () => {
    const idx = products.value.findIndex(p => p.id === editingProduct.value.id)
    if (idx !== -1) {
      products.value[idx] = { ...editingProduct.value }
    }
    showEditModal.value = false
  }

  const onEditImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        editingProduct.value.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  </script>