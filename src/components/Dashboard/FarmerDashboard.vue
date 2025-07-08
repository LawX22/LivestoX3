<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sticky Navbar -->
    <NavBar />

    <!-- Farmer Dashboard Content -->
    <div class="p-6">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Farmer Dashboard</h1>
      <p class="text-gray-600">Manage and post your livestock for sale.</p>

      <div class="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
        <router-link
          to="/farmer/PostLivestockForms"
          class="bg-white p-4 rounded shadow hover:bg-green-50 transition cursor-pointer"
        >
          📤 Post New Livestock
        </router-link>

        <router-link
          to="/farmer/YourLivestocks"
          class="bg-white p-4 rounded shadow hover:bg-green-50 transition cursor-pointer"
        >
          📦 Manage Listings
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../../components/NavBar.vue';
</script>
