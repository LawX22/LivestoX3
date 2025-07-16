<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-green-600 mb-6">Sign In</h2>

      <form @submit.prevent="handleSignIn" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="example@gmail.com"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Enter password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-600 text-center">{{ errorMessage }}</p>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign In
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-green-600 font-medium hover:underline">
          Create one here
        </router-link>
      </p>
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
