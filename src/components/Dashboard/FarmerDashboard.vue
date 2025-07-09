<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sticky Navbar -->
    <NavBar />

    <!-- Farmer Dashboard Content -->
    <div class="p-6 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Farmer Dashboard</h1>
      <p class="text-gray-600 mb-6">Manage and post your livestock for sale.</p>

      <!-- Livestock Preview Section -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Recent Livestock Posts</h2>

        <div v-if="previewAnimals.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="animal in previewAnimals"
            :key="animal.id"
            class="bg-white rounded shadow p-4"
          >
            <img
              :src="resolveImage(animal.image)"
              :alt="animal.name"
              class="w-full h-40 object-cover rounded mb-3"
            />
            <h2 class="text-lg font-semibold text-gray-800">{{ animal.name }}</h2>
            <p class="text-sm text-gray-500">Breed: {{ animal.breed }}</p>
            <p class="text-sm text-gray-500">Age: {{ animal.age }} years</p>
            <p class="text-green-600 font-bold mt-2">₱{{ animal.price.toLocaleString() }}</p>
          </div>
        </div>

        <div v-else class="text-gray-500 text-sm">
          You haven't posted any livestock yet.
        </div>

        <!-- View All Listings Button -->
        <div class="mt-6">
          <router-link
            to="/yourLivestock"
            class="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition text-sm"
          >
            View All Listings
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'
import { Animal, initialAnimals } from '../../services/animalData'

const animals = ref<Animal[]>([])

// Get current user
const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

// Fetch animals from localStorage
onMounted(() => {
  const stored = localStorage.getItem('livestock')
  animals.value = stored ? JSON.parse(stored) : [...initialAnimals]
})

// Filter only current user's posts and limit to 3 for preview
const previewAnimals = computed(() =>
  animals.value
    .filter(a => !a.ownerEmail || a.ownerEmail === currentUser.email)
    .slice(0, 3)
)

function resolveImage(imagePath: string): string {
  return imagePath.startsWith('/src/assets/')
    ? new URL(imagePath, import.meta.url).href
    : imagePath
}
</script>
