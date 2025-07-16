<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-green-600 mb-6">Create Account</h2>

      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input v-model="form.firstName" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input v-model="form.lastName" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input v-model="form.username" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input v-model="form.phoneNumber" type="tel" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select v-model="form.gender" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600">
            <option disabled value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="form.password" type="password" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
          <input v-model="form.verificationCode" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-600 text-center">{{ errorMessage }}</p>

        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition">
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
import type { SignUpForm } from '../../services/user'

const router = useRouter()

const form = ref<SignUpForm>({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  gender: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  createdAt: ''
})

const errorMessage = ref('')

function generateUniqueUserId(existingIds: string[]): string {
  let id = ''
  let isUnique = false

  while (!isUnique) {
    id = Math.floor(100000 + Math.random() * 900000).toString()
    isUnique = !existingIds.includes(id)
  }

  return id
}

function generatePublicId(firstName: string, lastName: string): string {
  const base = `${firstName}.${lastName}`.toLowerCase().replace(/\s+/g, '')
  const random = Math.floor(100 + Math.random() * 900)
  return `${base}.${random}`
}

function handleSignUp() {
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  const userIds = JSON.parse(localStorage.getItem('userIds') || '[]')

  for (const id of userIds) {
    const existing = localStorage.getItem(`user_${id}`)
    if (existing) {
      const user = JSON.parse(existing)
      if (user.email === form.value.email) {
        errorMessage.value = 'Email already exists.'
        return
      }
    }
  }

  const role = 'Buyer'
  const userId = generateUniqueUserId(userIds)
  const publicId = generatePublicId(form.value.firstName, form.value.lastName)

  const newUser = {
    ...form.value,
    userId,
    publicId,
    role,
    isVerified: false,
    isBanned: false,
    verificationStatus: 'pending', // new status
    createdAt: new Date().toISOString()
  }

  localStorage.setItem(`user_${userId}`, JSON.stringify(newUser))
  userIds.push(userId)
  localStorage.setItem('userIds', JSON.stringify(userIds))

  router.push('/signin')
}
</script>
