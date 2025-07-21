<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
      <div class="flex flex-col items-center mb-4">
        <img src="/images/FanRadar.png" alt="FanRadar Logo" class="h-16 mb-4" />
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-1">Create new account</h2>
        <p class="text-center text-gray-500 text-sm mb-2">Writer Account Only</p>
      </div>
      <form @submit.prevent="signup" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              id="firstName" 
              type="text" 
              v-model="form.firstName"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              required
            >
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              id="lastName" 
              type="text" 
              v-model="form.lastName"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
              required
            >
          </div>
        </div>
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
          <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
          <input 
            id="telephone" 
            type="tel" 
            v-model="form.telephone"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your telephone number"
            required
          >
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            id="password" 
            type="password" 
            v-model="form.password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          >
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input 
            id="confirmPassword" 
            type="password" 
            v-model="form.confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your confirm password"
            required
          >
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <div class="flex items-center mb-2">
          <input 
            id="terms" 
            type="checkbox" 
            v-model="form.terms"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required
          >
          <label for="terms" class="ml-2 block text-sm text-gray-700">
            I've read and agreed to <a href="#" class="text-blue-500 hover:underline">User Agreement</a> and <a href="#" class="text-blue-500 hover:underline">Privacy Policy</a>
          </label>
        </div>
        <div>
          <button 
            type="submit"
            class="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-60 flex justify-center items-center"
            :disabled="!form.terms"
          >
            Sign up
          </button>
        </div>
      </form>
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="font-medium text-blue-600 hover:underline">Back to Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  password: '',
  confirmPassword: '',
  terms: false
})
const error = ref('')

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function isStrongPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
}

const signup = () => {
  error.value = ''
  if (!isValidEmail(form.email)) {
    error.value = 'Please enter a valid email address.'
    return
  }
  if (!isStrongPassword(form.password)) {
    error.value = 'Password must be at least 6 characters and contain at least one letter and one number.'
    return
  }
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }
  if (!form.terms) return
  // In a real app, this would call your backend API
  console.log('Signup data:', form)
  router.push('/login')
}
</script>