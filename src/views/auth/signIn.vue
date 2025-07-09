<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
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

        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Sign In
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
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
import { users as defaultUsers } from '../../services/users'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

function handleSignIn() {
  const storedUsers = localStorage.getItem('registeredUsers')
  const customUsers = storedUsers ? JSON.parse(storedUsers) : []

  const allUsers = [...defaultUsers, ...customUsers]

  const user = allUsers.find(
    (u) => u.email === email.value && u.password === password.value
  )

  if (!user) {
    errorMessage.value = 'Invalid email or password.'
    return
  }

  localStorage.setItem('user', JSON.stringify(user))

  router.push('/dashboard')
}
</script>

