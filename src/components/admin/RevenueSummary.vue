<template>
  <div class="bg-white rounded-xl shadow-md p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Revenue Summary</h3>
      <button v-if="hasData" @click="downloadChart" class="btn-secondary text-xs px-2 py-1">Download</button>
    </div>
    <div v-if="hasData">
      <div class="h-48 flex items-center justify-center">
        <canvas ref="chartRef" width="220" height="180"></canvas>
      </div>
    </div>
    <div v-else class="text-gray-400 text-center py-4">No revenue data available.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      'Subscriptions': 1200,
      'Merchandise': 3400,
      'Ads': 900,
      'Events': 600
    })
  }
})
const chartRef = ref(null)
let chartInstance = null
const hasData = computed(() => props.data && Object.keys(props.data).length > 0)
const renderChart = () => {
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  if (chartInstance) chartInstance.destroy && chartInstance.destroy()
  chartInstance = new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(props.data),
      datasets: [{
        data: Object.values(props.data),
        backgroundColor: '#3B82F6'
      }]
    },
    options: { responsive: false, plugins: { legend: { display: false } } }
  })
}
const downloadChart = () => {
  if (chartRef.value) {
    const url = chartRef.value.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'revenue-chart.png'
    a.click()
  }
}
onMounted(() => { if (window.Chart) renderChart() })
watch(() => props.data, renderChart, { deep: true })
</script> 