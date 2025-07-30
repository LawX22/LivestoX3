<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
      <div class="flex flex-col">
        <!-- Header with logo -->
        <div class="bg-green-600 text-white p-6 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 16s.8 1 2 1 2-1 2-1"/><path d="M3 7h3m12 0h1.8M8 7h1m4 0h1m4 0h1.2M5 7l1 8h12l1-8"/><path d="M8 12l1-5h6l1 5"/>
          </svg>
          <h2 class="text-xl font-bold">Farmer's Marketplace</h2>
          <p class="text-xs text-green-100 mt-1">Connect with farmers and buyers</p>
        </div>
        
        <!-- Form content -->
        <div class="p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-6 text-center">Sign In to Your Account</h2>
          
          <form @submit.prevent="handleSignIn" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Email*</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="example@gmail.com"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Password*</label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="Enter password"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                />
                <button 
                  @click="showPassword = !showPassword" 
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <p v-if="errorMessage" class="text-xs text-red-600 text-center">{{ errorMessage }}</p>

            <button
              type="submit"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-sm rounded-md font-medium transition"
            >
              Sign In
            </button>
          </form>

          <p class="mt-6 text-center text-xs text-gray-600">
            Don't have an account?
            <router-link to="/signup" class="text-green-600 font-medium hover:underline">
              Create one here
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defaultUsers, type User } from '../../services/user'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false)

function handleSignIn() {
  errorMessage.value = ''

  const userIds: string[] = JSON.parse(localStorage.getItem('userIds') || '[]')
  const localUsers: User[] = userIds
    .map(id => {
      const data = localStorage.getItem(`user_${id}`)
      return data ? JSON.parse(data) : null
    })
    .filter(Boolean)

  // Combine default users and local users
  const users: User[] = [...defaultUsers, ...localUsers]

  const user = users.find(u => u.email === email.value && u.password === password.value)

  if (!user) {
    errorMessage.value = 'Invalid email or password.'
    return
  }

  // Check if banned
  if (user.isBanned) {
    const now = new Date()
    const banEnd = user.bannedUntil ? new Date(user.bannedUntil) : null

    if (banEnd && now < banEnd) {
      const remainingDays = Math.ceil((banEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      errorMessage.value = `Your account is banned. Try again in ${remainingDays} day(s).`
      return
    } else {
      user.isBanned = false
      user.bannedUntil = ''
      localStorage.setItem(`user_${user.userId}`, JSON.stringify(user))
    }
  }

  // Save current session
  localStorage.setItem('authUserId', user.userId)
  localStorage.setItem('user', JSON.stringify(user))

  // Redirect based on role
  if (user.role === 'Admin') {
    router.push('/adminDashboard')
  } else {
    router.push('/dashboard')
  }
}
</script>