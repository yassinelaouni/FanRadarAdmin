<template>
    <div class="fandom-tracker">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Fandom Radar</h1>
        <div class="flex space-x-4">
          <button @click="handleSyncData" class="btn-secondary custom-bg flex items-center w-32 justify-center">
            <ArrowPathIcon class="w-5 h-5 mr-2" />
            Sync Data
          </button>
        </div>
      </div>
      
      <!-- Chart Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Trend Chart -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Trending Growth</h3>
          <div class="h-64 flex items-center justify-center">
            <canvas ref="trendChart" width="400" height="200"></canvas>
          </div>
        </div>
        
        <!-- Category Distribution -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Category Distribution</h3>
          <div class="h-64 flex items-center justify-center">
            <canvas ref="categoryChart" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
      
      <TrendHeatmap :data="heatmapData" />
      
      <div class="mt-8">
        <TrendingTable :trends="trendingFandoms" @edit="handleEditTrend" @delete="handleDeleteTrend" />
      </div>

      <!-- Add Trend Modal -->
      <div v-if="showAddTrendModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Add New Trend</h2>
          <div class="mb-2">
            <label class="block text-sm">Trend Name</label>
            <input v-model="newTrend.name" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Category</label>
            <select v-model="newTrend.category" class="w-full border rounded px-2 py-1">
              <option value="Anime">Anime</option>
              <option value="K-pop">K-pop</option>
              <option value="Gaming">Gaming</option>
              <option value="Movies">Movies</option>
              <option value="TV Shows">TV Shows</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="block text-sm">Growth Rate (%)</label>
            <input v-model="newTrend.growth" type="number" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label class="block text-sm">Description</label>
            <textarea v-model="newTrend.description" rows="3" class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="flex justify-end">
            <button @click="showAddTrendModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="handleAddTrend" class="px-4 py-1 bg-blue-600 text-white rounded">Add Trend</button>
          </div>
        </div>
      </div>

      <!-- Edit Trend Modal -->
      <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white p-6 rounded shadow w-96">
          <h2 class="text-lg font-bold mb-4">Edit Trend</h2>
          <div class="mb-2">
            <label class="block text-sm">Trend Name</label>
            <input v-model="editingTrend.name" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-2">
            <label class="block text-sm">Category</label>
            <select v-model="editingTrend.category" class="w-full border rounded px-2 py-1">
              <option value="Anime">Anime</option>
              <option value="K-pop">K-pop</option>
              <option value="Gaming">Gaming</option>
              <option value="Movies">Movies</option>
              <option value="TV Shows">TV Shows</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="block text-sm">Growth Rate (%)</label>
            <input v-model="editingTrend.growth" type="number" class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-4">
            <label class="block text-sm">Description</label>
            <textarea v-model="editingTrend.description" rows="3" class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="flex justify-end">
            <button @click="showEditModal = false" class="mr-2 px-4 py-1 border rounded">Cancel</button>
            <button @click="saveEditTrend" class="px-4 py-1 bg-blue-600 text-white rounded">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
  import TrendHeatmap from '@/components/admin/TrendHeatmap.vue'
  import TrendingTable from '@/components/admin/TrendingTable.vue'
  
  const heatmapData = ref({
    categories: ['Anime', 'K-pop', 'Gaming', 'Movies', 'TV Shows'],
    series: [
      { name: 'Monday', data: [65, 59, 80, 81, 56] },
      { name: 'Tuesday', data: [28, 48, 40, 19, 86] },
      { name: 'Wednesday', data: [45, 67, 55, 34, 72] },
      { name: 'Thursday', data: [78, 23, 89, 45, 61] },
      { name: 'Friday', data: [92, 34, 76, 28, 83] },
      { name: 'Saturday', data: [56, 78, 43, 67, 91] },
      { name: 'Sunday', data: [34, 89, 67, 23, 78] }
    ]
  })
  
  const trendingFandoms = ref([
    { id: 1, rank: 1, name: 'Demon Slayer', category: 'Anime', growth: '+42%', description: 'Latest season breaking records' },
    { id: 2, rank: 2, name: 'BTS', category: 'K-pop', growth: '+35%', description: 'New album release' },
    { id: 3, rank: 3, name: 'League of Legends', category: 'Gaming', growth: '+28%', description: 'World Championship hype' },
    { id: 4, rank: 4, name: 'Marvel Cinematic Universe', category: 'Movies', growth: '+22%', description: 'New movie announcements' },
    { id: 5, rank: 5, name: 'Stranger Things', category: 'TV Shows', growth: '+18%', description: 'Season 5 anticipation' }
  ])

  // Modal states
  const showAddTrendModal = ref(false)
  const showEditModal = ref(false)
  const editingTrend = ref(null)

  // New trend data
  const newTrend = ref({
    name: '',
    category: 'Anime',
    growth: 0,
    description: ''
  })

  // Chart refs
  const trendChart = ref(null)
  const categoryChart = ref(null)

  // Handlers
  const handleSyncData = () => {
    // Simulate data sync
    console.log('Syncing fandom data...')
    // In a real app, this would fetch latest data from APIs
    setTimeout(() => {
      console.log('Data sync completed!')
      // Update charts and data
      updateCharts()
    }, 1000)
  }

  const handleAddTrend = () => {
    const trend = {
      id: trendingFandoms.value.length + 1,
      rank: trendingFandoms.value.length + 1,
      ...newTrend.value,
      growth: `+${newTrend.value.growth}%`
    }
    trendingFandoms.value.push(trend)
    
    // Reset form
    newTrend.value = {
      name: '',
      category: 'Anime',
      growth: 0,
      description: ''
    }
    showAddTrendModal.value = false
    
    // Update charts
    updateCharts()
  }

  const handleEditTrend = (trendId) => {
    const trend = trendingFandoms.value.find(t => t.id === trendId)
    if (trend) {
      editingTrend.value = { ...trend }
      showEditModal.value = true
    }
  }

  const saveEditTrend = () => {
    const idx = trendingFandoms.value.findIndex(t => t.id === editingTrend.value.id)
    if (idx !== -1) {
      trendingFandoms.value[idx] = { ...editingTrend.value }
    }
    showEditModal.value = false
    editingTrend.value = null
    
    // Update charts
    updateCharts()
  }

  const handleDeleteTrend = (trendId) => {
    if (confirm('Are you sure you want to delete this trend?')) {
      trendingFandoms.value = trendingFandoms.value.filter(t => t.id !== trendId)
      // Update ranks
      trendingFandoms.value.forEach((trend, index) => {
        trend.rank = index + 1
      })
      
      // Update charts
      updateCharts()
    }
  }

  // Chart functions
  const createTrendChart = () => {
    const ctx = trendChart.value.getContext('2d')
    
    // Sample trend data
    const labels = trendingFandoms.value.slice(0, 5).map(t => t.name)
    const data = trendingFandoms.value.slice(0, 5).map(t => parseInt(t.growth.replace('+', '').replace('%', '')))
    
    // Create simple bar chart using canvas
    const maxValue = Math.max(...data)
    const chartHeight = 200
    const chartWidth = 400
    const barWidth = chartWidth / labels.length - 10
    
    // Clear canvas
    ctx.clearRect(0, 0, chartWidth, chartHeight)
    
    // Draw bars
    labels.forEach((label, index) => {
      const barHeight = (data[index] / maxValue) * (chartHeight - 40)
      const x = index * (barWidth + 10) + 5
      const y = chartHeight - barHeight - 20
      
      // Draw bar
      ctx.fillStyle = '#3B82F6'
      ctx.fillRect(x, y, barWidth, barHeight)
      
      // Draw value
      ctx.fillStyle = '#1F2937'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(data[index] + '%', x + barWidth/2, y - 5)
      
      // Draw label
      ctx.fillText(label.substring(0, 8), x + barWidth/2, chartHeight - 5)
    })
  }

  const createCategoryChart = () => {
    const ctx = categoryChart.value.getContext('2d')
    
    // Count trends by category
    const categories = ['Anime', 'K-pop', 'Gaming', 'Movies', 'TV Shows']
    const data = categories.map(cat => 
      trendingFandoms.value.filter(t => t.category === cat).length
    )
    
    // Create simple pie chart using canvas
    const chartWidth = 400
    const chartHeight = 200
    const centerX = chartWidth / 2
    const centerY = chartHeight / 2
    const radius = Math.min(centerX, centerY) - 20
    
    const colors = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B']
    const total = data.reduce((sum, val) => sum + val, 0)
    
    // Clear canvas
    ctx.clearRect(0, 0, chartWidth, chartHeight)
    
    let currentAngle = 0
    data.forEach((value, index) => {
      if (value > 0) {
        const sliceAngle = (value / total) * 2 * Math.PI
        
        // Draw slice
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
        ctx.closePath()
        ctx.fillStyle = colors[index]
        ctx.fill()
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)
        
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(value.toString(), labelX, labelY + 4)
        
        currentAngle += sliceAngle
      }
    })
    
    // Draw legend
    categories.forEach((category, index) => {
      const legendY = 20 + index * 20
      ctx.fillStyle = colors[index]
      ctx.fillRect(10, legendY, 15, 15)
      ctx.fillStyle = '#1F2937'
      ctx.font = '12px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(category, 30, legendY + 12)
    })
  }

  const updateCharts = () => {
    // Clear existing charts and recreate
    if (trendChart.value) {
      createTrendChart()
    }
    if (categoryChart.value) {
      createCategoryChart()
    }
  }

  onMounted(() => {
    // Initialize charts
    createTrendChart()
    createCategoryChart()
  })
  </script>

<style scoped>
.custom-bg {
  background-color: #e7e7e7 !important;
  border-radius: 0.5rem;
}
</style>