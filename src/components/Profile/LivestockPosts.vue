<!-- LivestockPosts.vue -->
<template>
  <div class="p-8 space-y-6 relative">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div class="absolute top-8 right-12 w-8 h-8 bg-green-300 rounded-full animate-pulse"></div>
      <div class="absolute bottom-12 left-8 w-6 h-6 bg-emerald-300 rounded-full animate-bounce"></div>
    </div>

    <!-- Header Section -->
    <section class="relative z-10">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">My Livestock Posts</h3>
          <p class="text-gray-600">Preview of your livestock listings</p>
        </div>
        <router-link 
          to="/yourLivestock"
          class="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Manage Livestock
        </router-link>
      </div>

      <!-- Livestock Posts Grid -->
      <div v-if="livestockPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="post in livestockPosts" :key="post.id" class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="post.images[0] || 'https://via.placeholder.com/300x200?text=Livestock'" 
              class="w-full h-full object-cover"
              alt="Livestock image"
            >
            <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow-sm">
              {{ post.status }}
            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-lg font-bold text-gray-900">{{ post.title }}</h4>
              <span class="text-lg font-bold text-green-600">₱{{ post.price.toLocaleString() }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ post.description }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(post.createdAt) }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ post.views }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl p-8 text-center">
        <svg class="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h4 class="text-xl font-bold text-gray-800 mt-4">No Livestock Posts Yet</h4>
        <p class="text-gray-600 mt-2 max-w-md mx-auto">
          You haven't created any livestock listings yet. Manage your livestock to create new listings.
        </p>
        <router-link 
          to="/yourLivestock"
          class="mt-6 inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Manage Livestock
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface LivestockPost {
  id: string
  title: string
  description: string
  price: number
  status: string
  images: string[]
  views: number
  createdAt: string
}

const props = defineProps<{
  userId: string
}>()

const livestockPosts = ref<LivestockPost[]>([])

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const loadLivestockPosts = () => {
  const storedPosts = localStorage.getItem(`livestockPosts_${props.userId}`)
  if (storedPosts) {
    livestockPosts.value = JSON.parse(storedPosts)
  } else {
    livestockPosts.value = [
      {
        id: '1',
        title: 'Premium Dairy Goats',
        description:
          'Healthy and productive dairy goats ready for breeding. Raised organically with proper care.',
        price: 8000,
        status: 'Available',
        images: ['https://source.unsplash.com/random/300x200?goat'],
        views: 124,
        createdAt: '2023-05-15T10:30:00Z'
      },
      {
        id: '2',
        title: 'Free Range Chickens',
        description:
          'Organic free-range chickens, perfect for egg production or meat.',
        price: 350,
        status: 'Sold',
        images: ['https://source.unsplash.com/random/300x200?chicken'],
        views: 89,
        createdAt: '2023-04-22T14:15:00Z'
      }
    ]
    localStorage.setItem(
      `livestockPosts_${props.userId}`,
      JSON.stringify(livestockPosts.value)
    )
  }
}

onMounted(() => {
  loadLivestockPosts()
})
</script>