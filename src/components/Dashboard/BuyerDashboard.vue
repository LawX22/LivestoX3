<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sticky Navbar -->
    <NavBar />

    <!-- Dashboard Content with same width as Market -->
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Buyer Dashboard</h1>
      <p class="text-gray-600 mb-6">
        Browse livestock, join forums, and manage your profile.
      </p>

      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <router-link
          to="/main/LivestockMarket"
          class="bg-white p-4 rounded shadow hover:bg-green-50 transition cursor-pointer"
        >
          🐄 View Livestock Market
        </router-link>

        <router-link
          to="/main/LivestockForum"
          class="bg-white p-4 rounded shadow hover:bg-green-50 transition cursor-pointer"
        >
          💬 Join Forum
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../../components/NavBar.vue'
</script>
