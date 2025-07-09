<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-green-600 mb-6">Upgrade to Farmer</h2>
      <p class="text-sm text-gray-600 text-center mb-6">
        Fill out this form to request an upgrade to a Farmer account.
      </p>

      <form @submit.prevent="handleUpgradeRequest" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            v-model="form.fullName"
            type="text"
            required
            placeholder="Juan Dela Cruz"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            v-model="form.phone"
            type="tel"
            required
            placeholder="09XXXXXXXXX"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
          <input
            v-model="form.location"
            type="text"
            required
            placeholder="Barangay, City"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <p v-if="submitted" class="text-green-600 text-sm text-center mt-2">
          Upgrade request submitted successfully!
        </p>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit Request
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Go back to
        <router-link to="/market" class="text-green-600 font-medium hover:underline">Home</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  fullName: '',
  phone: '',
  location: ''
})

const submitted = ref(false)

function handleUpgradeRequest() {
  const upgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Add email to request for tracking
  upgradeRequests.push({
    ...form.value,
    email: user.email,
    date: new Date().toISOString()
  })
  localStorage.setItem('upgradeRequests', JSON.stringify(upgradeRequests))

  submitted.value = true

  // Optional: Delay before redirecting
  setTimeout(() => {
    router.push('/market')
  }, 1000)
}
</script>

