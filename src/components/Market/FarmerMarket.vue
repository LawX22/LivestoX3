<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Your Livestock Listings</h1>
      <p class="text-gray-600 mb-6">
        Manage the animals you're selling. To post new livestock, go to the post livestock page.
      </p>

      <router-link
        to="yourLivestock"
        class="inline-block mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition text-sm"
      >
        Go to Post Livestock Page
      </router-link>

      <!-- Animal Cards -->
      <div
        v-if="filteredAnimals.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="animal in filteredAnimals"
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

      <div v-else class="text-gray-600 text-sm mt-8">
        You haven't posted any livestock yet.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'
import { Animal, initialAnimals } from '../../services/animalData'

const animals = ref<Animal[]>([])

// Get current user from localStorage
const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

// Load all animals from localStorage or fallback
onMounted(() => {
  const stored = localStorage.getItem('livestock')
  animals.value = stored ? JSON.parse(stored) : [...initialAnimals]
})

// Filter: Only show sample animals (no ownerEmail) and those owned by current user
const filteredAnimals = computed(() =>
  animals.value.filter(a => !a.ownerEmail || a.ownerEmail === currentUser.email)
)

function resolveImage(imagePath: string): string {
  return imagePath.startsWith('/src/assets/')
    ? new URL(imagePath, import.meta.url).href
    : imagePath
}
</script>
