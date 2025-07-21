<template>
  <div class="bg-white rounded-xl shadow-md p-4">
    <h3 class="text-lg font-semibold mb-4">Top Content</h3>
    <table class="w-full text-sm">
      <thead>
        <tr class="text-gray-500">
          <th class="text-left py-2">Title</th>
          <th class="text-right py-2">Views</th>
          <th class="text-right py-2">Engagement</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t">
          <td class="py-2 font-medium text-gray-800 flex items-center">
            {{ item.title }}
          </td>
          <td class="py-2 text-right">{{ item.views.toLocaleString() }}</td>
          <td class="py-2 text-right">{{ item.engagement }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="!items || items.length === 0" class="text-gray-400 text-center py-4">No content data available.</div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script> 