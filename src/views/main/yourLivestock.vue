<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <div class="p-6 max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-green-600">Your Livestock</h1>
          <p class="text-gray-600">View and manage the animals you're selling.</p>
        </div>

        <button
          @click="showModal = true"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm transition"
        >
          + Post New Livestock
        </button>
      </div>

      <!-- Livestock Cards -->
      <div v-if="filteredAnimals.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="animal in filteredAnimals"
          :key="animal.id"
          class="bg-white rounded-xl shadow hover:shadow-md transition p-4"
        >
          <img
            :src="resolveImage(animal.image)"
            :alt="animal.name"
            class="w-full h-40 object-cover rounded-md mb-3"
          />
          <div class="space-y-1">
            <h2 class="text-lg font-semibold text-gray-800">{{ animal.name }}</h2>
            <p class="text-sm text-gray-500">Breed: {{ animal.breed }}</p>
            <p class="text-sm text-gray-500">Age: {{ animal.age }} year(s)</p>
            <p class="text-green-600 font-bold text-base mt-2">₱{{ animal.price.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-600 text-sm mt-12">
        <p>You haven't posted any livestock yet.</p>
      </div>
    </div>

    <!-- Post Modal -->
    <PostAnimalModal :visible="showModal" @close="showModal = false" @submit="addAnimal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'
import PostAnimalModal from '../../components/Market/PostAnimalModal.vue'
import { Animal, initialAnimals } from '../../services/animalData'

const animals = ref<Animal[]>([])
const showModal = ref(false)

const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

onMounted(() => {
  const stored = localStorage.getItem('livestock')
  animals.value = stored ? JSON.parse(stored) : [...initialAnimals]
})

const filteredAnimals = computed(() =>
  animals.value.filter(a => !a.ownerEmail || a.ownerEmail === currentUser.email)
)

function resolveImage(imagePath: string): string {
  return imagePath.startsWith('/src/assets/')
    ? new URL(imagePath, import.meta.url).href
    : imagePath
}

function addAnimal(newAnimal: Animal) {
  animals.value.push(newAnimal)
  localStorage.setItem('livestock', JSON.stringify(animals.value))
}
</script>
