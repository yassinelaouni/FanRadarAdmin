<template>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fandom</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="trend in trends" :key="trend.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <span class="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                {{ trend.rank }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ trend.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryClass(trend.category)}`">
                {{ trend.category }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :class="trend.growth.startsWith('+') ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
              {{ trend.growth }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
              {{ trend.description || 'No description available' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps({
    trends: Array
  })

  defineEmits(['edit', 'delete'])

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Anime': return 'bg-blue-100 text-blue-800'
      case 'K-pop': return 'bg-purple-100 text-purple-800'
      case 'Gaming': return 'bg-red-100 text-red-800'
      case 'Movies': return 'bg-green-100 text-green-800'
      case 'TV Shows': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  </script>