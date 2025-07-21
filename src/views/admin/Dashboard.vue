<template>
    <div class="admin-dashboard">
      <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Users" 
          :value="stats.totalUsers" 
          :icon="UsersIcon" 
          trend="up" 
          trendValue="12%" 
        />
        <StatCard 
          title="Active Content" 
          :value="stats.activePosts" 
          :icon="DocumentTextIcon" 
          trend="down" 
          trendValue="5%" 
        />
        <StatCard 
          title="Revenue (30d)" 
          :value="`$${stats.revenue}k`" 
          :icon="CurrencyDollarIcon" 
          trend="up" 
          trendValue="24%" 
        />
      </div>
      
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <TrendingFandoms />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import StatCard from '@/components/admin/StatCard.vue'
  import RecentActivity from '@/components/admin/RecentActivity.vue'
  import TrendingFandoms from '@/components/admin/TrendingFandoms.vue'
  import {
    UsersIcon,
    DocumentTextIcon,
    CurrencyDollarIcon
  } from '@heroicons/vue/24/outline'
  
  const stats = ref({
    totalUsers: '12.8k',
    activePosts: '1,243',
    revenue: '8.2'
  })
  </script>