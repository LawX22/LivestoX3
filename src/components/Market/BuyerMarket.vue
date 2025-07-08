<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <div class="p-6 max-w-5xl mx-auto">
      <!-- Guest Mode Banner (matches forum style) -->
      <div
        v-if="!isLoggedIn"
        class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded mb-6 flex items-center justify-between"
      >
        <span>You are viewing as a guest. Sign in to interact with listings.</span>
        <router-link
          to="/signin"
          class="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-sm"
        >
          Sign In
        </router-link>
      </div>

      <!-- Market Content -->
      <h1 class="text-2xl font-bold text-green-600 mb-4">Livestock Market</h1>
      <p class="text-gray-600 mb-6">Browse animals available for purchase.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="animal in animals"
          :key="animal.id"
          class="bg-white rounded shadow hover:shadow-lg transition p-4"
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

          <!-- Action Buttons -->
          <div v-if="isLoggedIn" class="mt-4">
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm">
              Contact Seller
            </button>
          </div>
          <p v-else class="text-xs text-gray-400 mt-3 italic">Sign in to contact seller</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '../../components/NavBar.vue'
import { Animal, animalList } from '../../services/animalData'

const animals = ref<Animal[]>([])
const isLoggedIn = ref(false)

function resolveImage(imagePath: string): string {
  return imagePath.startsWith('/src/assets/')
    ? new URL(imagePath, import.meta.url).href
    : imagePath
}

onMounted(() => {
  const stored = localStorage.getItem('livestock')
  const posted = stored ? JSON.parse(stored) : []
  animals.value = [...animalList, ...posted]

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  isLoggedIn.value = !!user.role
})
</script>
