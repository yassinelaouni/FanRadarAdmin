<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
      <div class="flex flex-col items-center mb-8">
        <img src="/images/FanRadar.png" alt="FanRadar Logo" class="h-16 mb-4" />
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-2">Reset Password</h2>
        <p class="text-gray-600 text-center mb-4">Enter your new password below.</p>
      </div>
      <form v-if="!submitted" @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <div class="relative">
            <input 
              :type="showPassword ? 'text' : 'password'"
              id="password" 
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="Enter new password"
              required
            >
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15.54 15.54A8.963 8.963 0 0112 17c-4.478 0-8.268-2.943-9.542-7a9.014 9.014 0 012.042-3.338" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 012.042-3.338m1.664-2.043A8.963 8.963 0 0112 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div class="relative">
            <input 
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword" 
              v-model="confirmPassword"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="Confirm new password"
              required
            >
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none">
              <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15.54 15.54A8.963 8.963 0 0112 17c-4.478 0-8.268-2.943-9.542-7a9.014 9.014 0 012.042-3.338" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 012.042-3.338m1.664-2.043A8.963 8.963 0 0112 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <div>
          <button 
            type="submit"
            class="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </div>
      </form>
      <div v-else class="text-center text-green-600 font-medium">
        Your password has been reset successfully.<br>
        <router-link to="/login" class="text-blue-600 hover:underline">Back to Sign In</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const submitted = ref(false)
const error = ref('')
const router = useRouter()

function isStrongPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
}

const submit = () => {
  error.value = ''
  if (!isStrongPassword(password.value)) {
    error.value = 'Password must be at least 6 characters and contain at least one letter and one number.'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }
  submitted.value = true
}
</script> 