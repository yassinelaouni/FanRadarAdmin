<template>
    <div class="analytics-panel">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Analytics Dashboard</h1>
        <div class="flex items-center space-x-4">
          <DateRangePicker v-model="dateRange" />
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TrafficChart :data="trafficData" />
        <EngagementChart :data="engagementData" />
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopContent :items="topContent" />
        <UserDemographics :data="demographics" />
        <RevenueSummary :data="revenueData" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
  import DateRangePicker from '@/components/admin/DateRangePicker.vue'
  import TrafficChart from '@/components/admin/charts/TrafficChart.vue'
  import EngagementChart from '@/components/admin/charts/EngagementChart.vue'
  import TopContent from '@/components/admin/TopContent.vue'
  import UserDemographics from '@/components/admin/UserDemographics.vue'
  import RevenueSummary from '@/components/admin/RevenueSummary.vue'
  
  const dateRange = ref({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date()
  })
  
  const trafficData = ref({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Visitors', data: [1200, 1900, 1700, 2100, 2400, 1800, 1500] },
      { label: 'Page Views', data: [2400, 3900, 3700, 4100, 4400, 3800, 3500] }
    ]
  })
  
  const engagementData = ref({
    labels: ['Likes', 'Comments', 'Shares', 'Bookmarks'],
    datasets: [
      { label: 'Count', data: [320, 180, 90, 60] }
    ]
  })
  
  const topContent = ref([
    { id: 1, title: 'Anime Trends Report', views: 8420, engagement: '68%' },
    { id: 2, title: 'K-pop Fan Poll', views: 7215, engagement: '72%' },
    // ... more content
  ])
  
  const demographics = ref({
    '18-24': 3200,
    '25-34': 4100,
    '35-44': 2100,
    '45-54': 900,
    '55+': 300
  })
  
  const revenueData = ref({
    'Subscriptions': 1200,
    'Merchandise': 3400,
    'Ads': 900,
    'Events': 600
  })
  </script>