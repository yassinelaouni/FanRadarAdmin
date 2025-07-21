<template>
  <div class="min-h-screen flex bg-gray-100">
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'

</script>