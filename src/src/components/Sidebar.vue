<template>
    <div class="w-64 bg-white shadow-md min-h-screen p-4">
      <h2 class="text-xl font-bold mb-6">Admin Panel</h2>
      <ul class="space-y-2">
        <li><router-link to="/" class="hover:text-blue-600">Dashboard</router-link></li>
        <li><router-link to="/posts" class="hover:text-blue-600">Posts</router-link></li>
        <li><router-link to="/users" class="hover:text-blue-600">Users</router-link></li>
        <li><router-link to="/analytics" class="hover:text-blue-600">Analytics</router-link></li>
      </ul>
    </div>
  </template>