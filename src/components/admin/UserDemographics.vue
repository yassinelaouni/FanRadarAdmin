<template>
  <div class="bg-white rounded-xl shadow-md p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">User Demographics</h3>
      <button v-if="hasData" @click="downloadChart" class="btn-secondary text-xs px-2 py-1">Download</button>
    </div>
    <div v-if="hasData">
      <div class="h-48 flex items-center justify-center">
        <canvas ref="chartRef" width="200" height="180"></canvas>
      </div>
    </div>
    <div v-else class="text-gray-400 text-center py-4">No demographic data available.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      '18-24': 3200,
      '25-34': 4100,
      '35-44': 2100,
      '45-54': 900,
      '55+': 300
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
    type: 'pie',
    data: {
      labels: Object.keys(props.data),
      datasets: [{
        data: Object.values(props.data),
        backgroundColor: ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B']
      }]
    },
    options: { responsive: false }
  })
}
const downloadChart = () => {
  if (chartRef.value) {
    const url = chartRef.value.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'demographics-chart.png'
    a.click()
  }
}
onMounted(() => { if (window.Chart) renderChart() })
watch(() => props.data, renderChart, { deep: true })
</script> 