<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Available Livestock Listings</h1>
      <p class="text-gray-600 mb-6">Browse animals available for purchase.</p>

      <!-- Guest Mode Notice -->
      <div v-if="!currentUser?.email"
        class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded mb-4 flex justify-between items-center">
        <span>
          You are viewing the market as a guest. Sign In to view detailed listings, save favorites, or contact sellers.
        </span>
        <router-link to="/signin" class="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 text-sm">
          Sign In
        </router-link>
      </div>

      <!-- Upgrade Prompt for Buyers -->
      <div v-else-if="currentUser?.role !== 'Farmer'"
        class="mb-6 bg-yellow-100 text-yellow-800 p-4 rounded flex items-center justify-between">
        <span>
          You are currently a <strong>Buyer</strong>. Upgrade to Farmer to post livestock.
        </span>

        <button v-if="hasPendingUpgrade" disabled
          class="bg-gray-400 text-white px-4 py-1.5 rounded text-sm cursor-not-allowed">
          Pending Approval
        </button>
        <button v-else @click="goToUpgradeForm"
          class="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-sm">
          Request Upgrade
        </button>
      </div>

      <!-- Filter Section -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <input v-model="filters.name" placeholder="Filter by name" class="input-style w-full sm:w-1/2" />
        <input v-model="filters.breed" placeholder="Filter by breed" class="input-style w-full sm:w-1/2" />
      </div>

      <!-- Display Animals -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="animal in filteredAnimals" :key="animal.id" class="bg-white rounded shadow p-4">
          <img :src="resolveImage(animal.image)" :alt="animal.name" class="w-full h-40 object-cover rounded mb-3" />
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import { Animal, initialAnimals } from '../../services/animalData'
import { getCurrentUser } from '../../services/user'

const router = useRouter()
const animals = ref<Animal[]>([])
const filters = ref({ name: '', breed: '' })
const currentUser = getCurrentUser()
const hasPendingUpgrade = ref(false)

function resolveImage(imagePath: string): string {
  return imagePath.startsWith('/src/assets/')
    ? new URL(imagePath, import.meta.url).href
    : imagePath
}

const filteredAnimals = computed(() =>
  animals.value.filter((animal) => {
    const matchesName = animal.name.toLowerCase().includes(filters.value.name.toLowerCase())
    const matchesBreed = animal.breed.toLowerCase().includes(filters.value.breed.toLowerCase())
    return matchesName && matchesBreed
  })
)

onMounted(() => {
  const stored = localStorage.getItem('livestock')
  animals.value = stored ? JSON.parse(stored) : [...initialAnimals]

  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
  hasPendingUpgrade.value = currentUser?.email
    ? requests.some((r: any) => r.email === currentUser.email)
    : false
})

function goToUpgradeForm() {
  router.push('/upgradeForm')
}
</script>

<style scoped>
.input-style {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 6px;
}
</style>
