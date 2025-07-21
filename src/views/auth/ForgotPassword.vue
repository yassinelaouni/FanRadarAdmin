<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
      <div class="flex flex-col items-center mb-8">
        <img src="/images/FanRadar.png" alt="FanRadar Logo" class="h-16 mb-4" />
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-2">Forgot Password</h2>
        <p class="text-gray-600 text-center mb-4">Enter your email address and we'll send you a link to reset your password.</p>
      </div>
      <form v-if="!submitted" @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            id="email" 
            type="email" 
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email address"
            required
          >
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <div>
          <button 
            type="submit"
            class="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </div>
      </form>
      <div v-else class="text-center text-green-600 font-medium">
        If an account with that email exists, a reset link has been sent.
        <!-- REMOVE THIS LINK LATER: For demo/testing only -->
        <div class="mt-4">
          <router-link to="/reset-password" class="text-blue-600 hover:underline">Go to Reset Password</router-link>
        </div>
      </div>
      <div class="text-center mt-6">
        <router-link to="/login" class="text-blue-600 hover:underline">Back to Sign In</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const submitted = ref(false)
const error = ref('')
const router = useRouter()

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const submit = () => {
  error.value = ''
  if (!isValidEmail(email.value)) {
    error.value = 'Please enter a valid email address.'
    return
  }
  submitted.value = true
  // Simulate sending email
}
</script> 