<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div class="card w-full max-w-md p-8">
        <div class="text-center mb-8">
          <div class="mx-auto bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-800">FantRadars</h1>
          <p class="text-gray-600 mt-2">Admin Portal</p>
        </div>
        <router-view />
      </div>
    </div>
  </template>