<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium">Engagement Metrics</h3>
      <button @click="downloadChart" class="btn-secondary text-xs px-2 py-1">Download</button>
    </div>
    <div class="h-64 flex items-center justify-center">
      <canvas ref="chartRef" width="400" height="220"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
let chartInstance = null
const chartRef = ref(null)
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      labels: ['Likes', 'Comments', 'Shares', 'Bookmarks'],
      datasets: [
        { label: 'Count', data: [320, 180, 90, 60] }
      ]
    })
  }
})

const renderChart = () => {
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  if (chartInstance) chartInstance.destroy && chartInstance.destroy()
  chartInstance = new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.data.labels,
      datasets: props.data.datasets.map((ds, i) => ({
        ...ds,
        backgroundColor: i === 0 ? '#3B82F6' : '#F59E0B',
        borderColor: i === 0 ? '#3B82F6' : '#F59E0B',
        borderWidth: 1
      }))
    },
    options: {
      responsive: false,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  })
}

const downloadChart = () => {
  if (chartRef.value) {
    const url = chartRef.value.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'engagement-chart.png'
    a.click()
  }
}

onMounted(() => {
  if (window.Chart) renderChart()
})
watch(() => props.data, renderChart, { deep: true })
</script>