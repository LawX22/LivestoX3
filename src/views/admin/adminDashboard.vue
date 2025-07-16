<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin!</h1>

      <!-- Clickable Dashboard stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link 
          to="/userManagement" 
          class="bg-white p-6 rounded shadow hover:bg-gray-50 transition cursor-pointer"
        >
          <h2 class="text-xl font-semibold text-green-600">Total Users</h2>
          <p class="text-2xl font-bold mt-2">{{ stats.totalUsers }}</p>
          <p class="text-sm text-gray-500 mt-1">Click to manage users</p>
        </router-link>

        <router-link 
          to="/upgradeRequests" 
          class="bg-white p-6 rounded shadow hover:bg-gray-50 transition cursor-pointer"
        >
          <h2 class="text-xl font-semibold text-green-600">Upgrade Requests</h2>
          <p class="text-2xl font-bold mt-2">{{ stats.requests }}</p>
          <p class="text-sm text-gray-500 mt-1">Click to review requests</p>
        </router-link>

        <router-link 
          to="/livestock" 
          class="bg-white p-6 rounded shadow hover:bg-gray-50 transition cursor-pointer"
        >
          <h2 class="text-xl font-semibold text-green-600">Livestock Listings</h2>
          <p class="text-2xl font-bold mt-2">{{ stats.livestock }}</p>
          <p class="text-sm text-gray-500 mt-1">Click to manage listings</p>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminSidebar from '../../components/adminSideBar.vue'

const stats = ref({
  totalUsers: 0,
  requests: 0,
  livestock: 0
})

onMounted(() => {
  // Count all user entries in localStorage
  const userKeys = Object.keys(localStorage).filter(key => key.startsWith('user_'))
  stats.value.totalUsers = userKeys.length

  // Get other stats
  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
  const livestock = JSON.parse(localStorage.getItem('livestock') || '[]')

  stats.value.requests = requests.length
  stats.value.livestock = livestock.length
})
</script>