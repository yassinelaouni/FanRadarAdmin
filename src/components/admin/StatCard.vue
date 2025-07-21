<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div :class="`p-3 rounded-full bg-${color}-100`">
          <component :is="icon" :class="`w-6 h-6 text-${color}-600`" />
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500">{{ title }}</p>
          <p class="text-2xl font-semibold">{{ value }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    value: [String, Number],
    icon: {
      type: [Object, Function],
      required: true
    },
    color: {
      type: String,
      default: 'blue'
    }
  });
  </script>