<!-- AnimalDetailsModal.vue -->
<template>
  <!-- Full Screen Modal Overlay -->
  <div class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm">
    <!-- Full Screen Modal Container -->
    <div class="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden">
      
      <!-- Simplified Header with Title Only -->
      <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-full h-full">
            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div class="relative p-3 md:p-4">
          <div class="flex justify-between items-center">
            <!-- Title Section -->
            <div class="flex items-center gap-3">
              <!-- Animal Icon -->
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/30 shadow-lg backdrop-blur-sm">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 47.48 47.48 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.209-.138 2.43-.138 3.662s.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7c2.441.062 4.883.062 7.324 0a4.006 4.006 0 0 0 3.7-3.7c.092-1.209.138-2.43.138-3.662ZM15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" opacity="0.3" />
                  <path d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
                </svg>
              </div>
              
              <div>
                <h1 class="text-xl md:text-2xl font-bold tracking-tight">Animal Details</h1>
                <p class="text-emerald-100 text-xs font-medium opacity-90">Complete information and specifications</p>
              </div>
            </div>
            
            <!-- Close Button -->
            <button 
              @click="$emit('close')" 
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg backdrop-blur-sm group"
            >
              <svg class="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="h-[calc(100vh-100px)] overflow-y-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3 md:p-4 min-h-full">
          
          <!-- Left Column - Images and Gallery -->
          <div class="space-y-4">
            
            <!-- Main Image Display - Enhanced -->
            <div class="relative h-64 md:h-72 lg:h-[60vh] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                :src="animal.images[currentImageIndex]" 
                :alt="`${animal.type} - Image ${currentImageIndex + 1}`"
                class="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                loading="lazy"
              />
              
              <!-- Enhanced Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>

              <!-- Navigation Arrows (if multiple images) -->
              <div v-if="animal.images.length > 1" class="absolute inset-0 flex items-center justify-between px-3 z-20">
                <button 
                  @click="previousImage"
                  class="w-10 h-10 bg-white/95 hover:bg-white text-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 backdrop-blur-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  @click="nextImage"
                  class="w-10 h-10 bg-white/95 hover:bg-white text-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 backdrop-blur-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Image Counter -->
              <div v-if="animal.images.length > 1" class="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                {{ currentImageIndex + 1 }} / {{ animal.images.length }}
              </div>

              <!-- Status Badge -->
              <div class="absolute top-3 left-3">
                <span :class="`px-2 py-1 text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm ${getStatusClass(animal.status)}`">
                  {{ animal.status }}
                </span>
              </div>

              <!-- Thumbnail Preview at Bottom Center -->
              <div v-if="animal.images.length > 1" class="absolute bottom-4 left-0 right-0 flex justify-center">
                <div class="flex gap-2 overflow-x-auto pb-1 max-w-[90%] mx-auto">
                  <button
                    v-for="(image, index) in animal.images"
                    :key="index"
                    @click="currentImageIndex = index"
                    :class="`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'border-emerald-500 ring-2 ring-emerald-200 shadow-lg transform scale-110' 
                        : 'border-white/50 hover:border-emerald-300 hover:shadow-md'
                    }`"
                  >
                    <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Price Section - Enhanced Design -->
            <div class="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl p-4 text-white shadow-xl relative overflow-hidden">
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
              
              <div class="relative">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <span class="text-white/80 text-sm font-medium">Price</span>
                  </div>
                  <div class="flex items-center gap-1 text-white/70 text-xs">
                    <span>{{ animal.quantity }} available</span>
                  </div>
                </div>
                <div class="text-3xl md:text-4xl font-bold mb-1">₱{{ animal.price.toLocaleString() }}</div>
                <div class="text-emerald-100 text-sm font-medium">{{ animal.type }} - {{ animal.breed }}</div>
              </div>
            </div>

            <!-- Compact Stats Grid -->
            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-3 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div class="text-center">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <p class="text-lg font-bold text-gray-800">{{ animal.weight }}kg</p>
                  <p class="text-xs text-gray-600 font-medium">Weight</p>
                </div>
              </div>

              <div class="bg-white rounded-xl p-3 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div class="text-center">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p class="text-lg font-bold text-gray-800">{{ animal.age }}</p>
                  <p class="text-xs text-gray-600 font-medium">Age</p>
                </div>
              </div>

              <div class="bg-white rounded-xl p-3 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div class="text-center">
                  <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg class="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p class="text-lg font-bold text-gray-800">{{ animal.gender }}</p>
                  <p class="text-xs text-gray-600 font-medium">Gender</p>
                </div>
              </div>
            </div>

            <!-- Compact Location & Time Info -->
            <div class="flex items-center gap-3 flex-wrap">
              <div class="flex items-center gap-2 text-gray-600 bg-white rounded-lg px-3 py-2 shadow-sm text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span class="font-medium">{{ animal.location }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600 bg-white rounded-lg px-3 py-2 shadow-sm text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium">{{ getDaysListed(animal.datePosted) }} days ago</span>
              </div>
            </div>
          </div>

          <!-- Right Column - Compact Details -->
          <div class="space-y-4">
            
            <!-- Compact Description -->
            <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Description
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">{{ animal.description }}</p>
            </div>

            <!-- Compact Health Status -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 shadow-md border border-green-200">
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                Health Status
              </h3>
              <div class="flex flex-wrap gap-3">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-green-800 font-semibold text-sm">Healthy & Vaccinated</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-blue-800 font-semibold text-sm">Vet Certified</span>
                </div>
              </div>
            </div>

            <!-- Compact Delivery Options -->
            <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                Delivery Options
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="option in animal.deliveryOptions" 
                  :key="option"
                  class="px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 text-sm rounded-lg capitalize font-semibold border border-emerald-200 flex items-center gap-2 hover:shadow-md transition-all duration-300"
                >
                  <svg v-if="option === 'pickup'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {{ option }}
                </span>
              </div>
            </div>

            <!-- Compact Farmer Information -->
            <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Farmer Information
              </h3>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-200 shadow-md">
                  <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-base font-bold text-gray-800 mb-1 truncate">{{ animal.farmer.farmName || animal.farmer.name }}</h4>
                  <p v-if="animal.farmer.farmName" class="text-gray-600 mb-1 text-sm truncate">{{ animal.farmer.name }}</p>
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span class="text-sm truncate">{{ animal.farmer.address }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Compact Contact Actions -->
            <div class="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl p-4 text-white shadow-xl relative overflow-hidden">
              <!-- Background decorations -->
              <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              
              <div class="relative">
                <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
                  <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  Contact Information
                </h3>
                
                <div class="space-y-3">
                  <div class="bg-white/20 rounded-xl p-3 border border-white/30 backdrop-blur-sm">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-sm">Phone Number</span>
                      <span class="font-bold text-base">{{ animal.farmer.contact }}</span>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <button 
                      @click="contactFarmer"
                      class="px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm group text-sm"
                    >
                      <svg class="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Message
                    </button>
                    <button 
                      @click="callFarmer"
                      class="px-4 py-3 bg-white text-emerald-600 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-300 border border-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 group text-sm"
                    >
                      <svg class="w-4 h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Animal } from '../../services/animal'

// Props
const props = defineProps<{
  animal: Animal;
}>();

// Emits
const emit = defineEmits<{
  (e: 'close'): void
}>();

// State
const currentImageIndex = ref(0);

// Methods
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.animal.images.length;
};

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? props.animal.images.length - 1 
    : currentImageIndex.value - 1;
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Out of Stock':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};


const formatDate = (dateString: string) => {
  if (!dateString) return 'No date provided'
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

console.log(formatDate('')); 

const getDaysListed = (dateString: string) => {
  const now = new Date();
  const posted = new Date(dateString);
  const diffTime = Math.abs(now.getTime() - posted.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const contactFarmer = () => {
  // Copy contact info to clipboard
  navigator.clipboard.writeText(props.animal.farmer.contact);
  // You can add a toast notification here
  emit('close');
};

const callFarmer = () => {
  // Open phone dialer
  window.open(`tel:${props.animal.farmer.contact}`, '_self');
};
</script>