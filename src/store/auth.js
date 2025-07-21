import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async login({ email, password }) {
      this.loading = true
      try {
        // Mock API call
        const response = await new Promise((resolve) => 
          setTimeout(() => {
            if (email === 'admin@fanradars.com' && password === 'admin123') {
              resolve({
                id: 1,
                name: 'Admin User',
                email: 'admin@fanradars.com',
                role: 'admin',
                token: 'admin-token-123'
              })
            } else if (email === 'writer@fanradars.com' && password === 'writer123') {
              resolve({
                id: 2,
                name: 'Content Writer',
                email: 'writer@fanradars.com',
                role: 'writer',
                token: 'writer-token-456'
              })
            } else {
              throw new Error('Invalid credentials')
            }
          }, 1000)
        )
        
        this.user = response
        localStorage.setItem('auth', JSON.stringify(response))
        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('auth')
    },
    initialize() {
      const auth = localStorage.getItem('auth')
      if (auth) {
        this.user = JSON.parse(auth)
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isWriter: (state) => state.user?.role === 'writer'
  }
})