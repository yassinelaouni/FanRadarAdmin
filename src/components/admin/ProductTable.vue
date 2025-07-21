<template>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="flex-shrink-0 h-10 w-10 rounded object-cover bg-gray-200"
                />
                <div v-else class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded"></div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.stock }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ product.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`">
                {{ product.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span v-if="product.availability === 'all'">All Time</span>
              <span v-else>
                Limited Time
                <span v-if="product.startTime && product.endTime" class="block text-xs text-gray-400 mt-1">
                  {{ formatDate(product.startTime) }} - {{ formatDate(product.endTime) }}
                </span>
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="$emit('edit', product.id)" class="text-blue-600 hover:text-blue-900">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps({
    products: Array
  })
  
  defineEmits(['edit'])

  function formatDate(dt) {
    if (!dt) return ''
    const d = new Date(dt)
    if (isNaN(d)) return dt
    return d.toLocaleString()
  }
  </script>