<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Trending Fandoms</h3>
      <ul class="divide-y divide-gray-200">
        <li v-for="fandom in fandoms" :key="fandom.rank" class="py-3 flex justify-between items-center">
          <div class="flex items-center">
            <span class="text-gray-500 w-6 text-center">{{ fandom.rank }}</span>
            <span class="ml-3 font-medium">{{ fandom.name }}</span>
          </div>
          <span :class="`px-2 py-1 text-xs rounded-full ${fandom.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
            {{ fandom.growth }}
          </span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const fandoms = [
    { rank: 1, name: 'Demon Slayer', growth: '+42%' },
    { rank: 2, name: 'BTS', growth: '+35%' },
    { rank: 3, name: 'Marvel Cinematic Universe', growth: '+28%' },
    { rank: 4, name: 'Attack on Titan', growth: '+22%' },
    { rank: 5, name: 'Taylor Swift', growth: '+18%' }
  ]
  </script>