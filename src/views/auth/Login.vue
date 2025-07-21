<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
      <div class="flex flex-col items-center mb-8">
        <img src="/images/FanRadar.png" alt="FanRadar Logo" class="h-16 mb-4" />
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-2">Sign in to your account</h2>
      </div>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            id="email" 
            type="email" 
            v-model="form.email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email address"
            required
          >
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <router-link to="/forgot-password" class="text-sm text-blue-500 hover:underline">Forgot password?</router-link>
          </div>
          <div class="relative">
            <input 
              :type="showPassword ? 'text' : 'password'"
              id="password" 
              v-model="form.password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="Enter your password"
              required
            >
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15.54 15.54A8.963 8.963 0 0112 17c-4.478 0-8.268-2.943-9.542-7a9.014 9.014 0 012.042-3.338" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 012.042-3.338m1.664-2.043A8.963 8.963 0 0112 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <div>
          <button 
            type="submit"
            class="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-60 flex justify-center items-center"
            :disabled="authStore.loading"
          >
            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="font-medium text-blue-600 hover:underline">Create Account</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const error = ref('')

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function isStrongPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
}

const login = async () => {
  error.value = ''
  if (!isValidEmail(form.email)) {
    error.value = 'Please enter a valid email address.'
    return
  }
  if (!isStrongPassword(form.password)) {
    error.value = 'Password must be at least 6 characters and contain at least one letter and one number.'
    return
  }
  const success = await authStore.login(form)
  if (success) {
    router.push(authStore.isAdmin ? '/admin' : '/writer/posts')
  }
}
</script>