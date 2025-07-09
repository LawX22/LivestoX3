<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-green-600 mb-6">Create Account</h2>

      <form @submit.prevent="handleSignUp" class="space-y-4">
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

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Confirm password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-600 text-center">{{ errorMessage }}</p>

        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Sign Up
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/signin" class="text-green-600 font-medium hover:underline">
          Sign in here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

function handleSignUp() {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  const newUser = {
    email: email.value,
    password: password.value,
    role: 'Buyer' // default role
  }

  const storedUsers = localStorage.getItem('registeredUsers')
  const users = storedUsers ? JSON.parse(storedUsers) : []

  const exists = users.some((user: any) => user.email === newUser.email)
  if (exists) {
    errorMessage.value = 'Email already exists.'
    return
  }

  users.push(newUser)
  localStorage.setItem('registeredUsers', JSON.stringify(users))
  router.push('/signin')
}
</script>
