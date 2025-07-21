<template>
    <div class="user-management">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">User Management</h1>
      </div>
      
      <UserTable :users="users" @edit-user="handleEdit" @delete-user="handleDelete" />
      
      <Pagination 
        :current-page="currentPage" 
        :total-pages="totalPages" 
        @page-change="handlePageChange"
      />

      <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Edit User</h2>
          <div class="mb-2">
            <label class="block text-sm">Name</label>
            <input v-model="editingUser.name" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Email</label>
            <input v-model="editingUser.email" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Role</label>
            <input v-model="editingUser.role" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label class="block text-sm">Status</label>
            <select v-model="editingUser.status" class="w-full border rounded px-2 py-1">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="showEditModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="saveEdit" class="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { PlusIcon } from '@heroicons/vue/24/outline'
  import UserTable from '@/components/admin/UserTable.vue'
  import Pagination from '@/components/Pagination.vue'
  
  const users = ref([
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Sam Wilson', email: 'sam@example.com', role: 'user', status: 'inactive' },
    { id: 3, name: 'Maria Garcia', email: 'maria.garcia@example.com', role: 'editor', status: 'active' },
    { id: 4, name: 'John Lee', email: 'john.lee@example.com', role: 'user', status: 'active' },
    { id: 5, name: 'Fatima Al-Farsi', email: 'fatima.alfarsi@example.com', role: 'moderator', status: 'inactive' },
    { id: 6, name: 'Chen Wei', email: 'chen.wei@example.com', role: 'user', status: 'active' },
    { id: 7, name: 'Priya Singh', email: 'priya.singh@example.com', role: 'editor', status: 'active' },
    { id: 8, name: 'Liam O\'Connor', email: 'liam.oconnor@example.com', role: 'user', status: 'inactive' },
    { id: 9, name: 'Sofia Rossi', email: 'sofia.rossi@example.com', role: 'admin', status: 'active' },
    { id: 10, name: 'Ahmed Hassan', email: 'ahmed.hassan@example.com', role: 'moderator', status: 'active' }
  ])
  
  const currentPage = ref(1)
  const totalPages = ref(5)
  
  const editingUser = ref(null)
  const showEditModal = ref(false)

  const handleEdit = (userId) => {
    const user = users.value.find(u => u.id === userId)
    if (user) {
      editingUser.value = { ...user }
      showEditModal.value = true
    }
  }

  const saveEdit = () => {
    const idx = users.value.findIndex(u => u.id === editingUser.value.id)
    if (idx !== -1) {
      users.value[idx] = { ...editingUser.value }
    }
    showEditModal.value = false
  }

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      users.value = users.value.filter(u => u.id !== userId)
    }
  }
  
  const handlePageChange = (page) => {
    currentPage.value = page
    // Fetch users for new page
  }
  </script>