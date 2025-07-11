<template>
  <aside class="w-64 bg-white shadow-md p-6 space-y-6">
    <h2 class="text-2xl font-bold text-green-600 mb-4">Admin Panel</h2>

    <nav class="space-y-2">
      <router-link
        to="/adminDashboard"
        class="block px-4 py-2 rounded hover:bg-green-100 text-gray-700"
        active-class="bg-green-200 font-semibold"
      >
        Dashboard Overview
      </router-link>

      <router-link
        to="/userManagement"
        class="block px-4 py-2 rounded hover:bg-green-100 text-gray-700"
        active-class="bg-green-200 font-semibold"
      >
        User Management
      </router-link>
      
       <router-link
        to="/upgradeRequests"
        class="block px-4 py-2 rounded hover:bg-green-100 text-gray-700"
        active-class="bg-green-200 font-semibold"
      >
        Upgrade Requests
      </router-link>

      <router-link
        to="/admin/livestock"
        class="block px-4 py-2 rounded hover:bg-green-100 text-gray-700"
        active-class="bg-green-200 font-semibold"
      >
        Livestock Listings
      </router-link>

      <button
        @click="logout"
        class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded"
      >
        Logout
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('user')
  router.push('/')
}
</script>
