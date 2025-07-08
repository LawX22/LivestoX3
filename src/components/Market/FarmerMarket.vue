<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Your Livestock Listings</h1>
      <p class="text-gray-600 mb-6">Post and manage the animals you're selling.</p>

      <!-- Form -->
      <form @submit.prevent="addAnimal" class="bg-white p-6 rounded shadow mb-8 space-y-4">
        <h2 class="text-lg font-semibold text-gray-700">Post New Animal</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Animal Name</label>
            <input v-model="newAnimal.name" type="text" class="input-style" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Breed</label>
            <input v-model="newAnimal.breed" type="text" class="input-style" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Age (in years)</label>
            <input v-model.number="newAnimal.age" type="number" min="0" class="input-style" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Price (₱)</label>
            <input v-model.number="newAnimal.price" type="number" min="0" class="input-style" required />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
          <input
            v-model="newAnimal.image"
            type="text"
            placeholder="e.g., /src/assets/Bull.jpg"
            class="input-style w-full"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Post Animal
        </button>
      </form>

      <!-- Animal Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="animal in animals"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '../../components/NavBar.vue'
import { Animal, defaultAnimal, initialAnimals } from '../../services/animalData'

const animals = ref<Animal[]>([])
const newAnimal = ref<Animal>({ ...defaultAnimal })

function addAnimal() {
  const animal = { ...newAnimal.value, id: Date.now() }

  // Add to local array and localStorage
  animals.value.push(animal)
  localStorage.setItem('livestock', JSON.stringify(animals.value))

  newAnimal.value = { ...defaultAnimal }
}

function resolveImage(imagePath: string): string {
  return imagePath.startsWith('/src/assets/')
    ? new URL(imagePath, import.meta.url).href
    : imagePath
}

onMounted(() => {
  const stored = localStorage.getItem('livestock')
  animals.value = stored ? JSON.parse(stored) : [...initialAnimals]
})
</script>

