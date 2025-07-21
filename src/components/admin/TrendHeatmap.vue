<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Fandom Heatmap</h3>
      <div class="overflow-x-auto">
        <div class="heatmap-container">
          <!-- Header row with categories -->
          <div class="heatmap-header">
            <div class="heatmap-cell header-cell"></div>
            <div 
              v-for="category in data.categories" 
              :key="category" 
              class="heatmap-cell header-cell text-center text-xs font-medium text-gray-600"
            >
              {{ category }}
            </div>
          </div>
          
          <!-- Data rows -->
          <div 
            v-for="(day, dayIndex) in data.series" 
            :key="day.name" 
            class="heatmap-row"
          >
            <div class="heatmap-cell header-cell text-xs font-medium text-gray-600 pr-2">
              {{ day.name }}
            </div>
            <div 
              v-for="(value, categoryIndex) in day.data" 
              :key="categoryIndex"
              class="heatmap-cell"
              :class="getHeatmapClass(value)"
              :title="`${data.categories[categoryIndex]}: ${value}% activity`"
            >
              <span class="heatmap-value">{{ value }}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="mt-4 flex items-center justify-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-gray-100 rounded"></div>
          <span class="text-xs text-gray-600">Low (0-25%)</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-yellow-200 rounded"></div>
          <span class="text-xs text-gray-600">Medium (26-50%)</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-orange-300 rounded"></div>
          <span class="text-xs text-gray-600">High (51-75%)</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-red-400 rounded"></div>
          <span class="text-xs text-gray-600">Very High (76-100%)</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })

  const getHeatmapClass = (value) => {
    if (value >= 76) return 'bg-red-400 text-white'
    if (value >= 51) return 'bg-orange-300 text-gray-800'
    if (value >= 26) return 'bg-yellow-200 text-gray-800'
    return 'bg-gray-100 text-gray-600'
  }
  </script>

<style scoped>
.heatmap-container {
  display: inline-block;
  min-width: 600px;
}

.heatmap-header {
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  gap: 2px;
  margin-bottom: 2px;
}

.heatmap-row {
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  gap: 2px;
  margin-bottom: 2px;
}

.heatmap-cell {
  padding: 8px 4px;
  border-radius: 4px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heatmap-cell:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-cell {
  background-color: #f9fafb;
  font-weight: 600;
  cursor: default;
}

.header-cell:hover {
  transform: none;
  box-shadow: none;
}

.heatmap-value {
  font-size: 0.7rem;
}
</style>