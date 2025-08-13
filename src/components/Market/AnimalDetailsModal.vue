<!-- AnimalDetailsModal.vue -->
<template>
  <!-- Full Screen Modal Overlay -->
  <div class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
    <!-- Full Screen Modal Container -->
    <div class="w-full h-full bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 overflow-hidden">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 md:p-6 flex justify-between items-center border-b border-green-500/20">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl md:text-2xl font-bold">{{ animal.type }} - {{ animal.breed }}</h1>
            <p class="text-green-100 text-sm md:text-base opacity-90">
              {{ animal.farmer.farmName || animal.farmer.name }} • {{ animal.location }}
            </p>
          </div>
        </div>
        
        <button 
          @click="$emit('close')" 
          class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Main Content - Full Height -->
      <div class="h-[calc(100vh-88px)] md:h-[calc(100vh-104px)] overflow-y-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 min-h-full">
          
          <!-- Left Column - Images and Gallery -->
          <div class="space-y-6">
            <!-- Main Image Display -->
            <div class="relative h-64 md:h-96 lg:h-[60vh] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-100 to-emerald-100">
              <div class="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10 z-10"></div>
              <img 
                :src="animal.images[currentImageIndex]" 
                :alt="`${animal.type} - Image ${currentImageIndex + 1}`"
                class="w-full h-full object-cover transition-all duration-500"
                loading="lazy"
              />
              
              <!-- Status Badge -->
              <div class="absolute top-4 right-4 z-20">
                <span :class="`px-3 py-2 text-sm font-bold rounded-full shadow-lg backdrop-blur-md border ${getStatusClass(animal.status)}`">
                  {{ animal.status }}
                </span>
              </div>

              <!-- Price Badge -->
              <div class="absolute top-4 left-4 z-20">
                <div class="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/40">
                  <span class="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₱{{ animal.price.toLocaleString() }}
                  </span>
                </div>
              </div>

              <!-- Navigation Arrows (if multiple images) -->
              <div v-if="animal.images.length > 1" class="absolute inset-0 flex items-center justify-between px-4 z-20">
                <button 
                  @click="previousImage"
                  class="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  @click="nextImage"
                  class="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Image Thumbnails -->
            <div v-if="animal.images.length > 1" class="flex gap-3 overflow-x-auto pb-2">
              <button
                v-for="(image, index) in animal.images"
                :key="index"
                @click="currentImageIndex = index"
                :class="`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'border-green-500 ring-2 ring-green-200 shadow-lg' 
                    : 'border-gray-200 hover:border-green-300'
                }`"
              >
                <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>

            <!-- Key Stats Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Quantity -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <p class="text-2xl font-bold text-gray-800">{{ animal.quantity }}</p>
                <p class="text-xs text-gray-600 font-medium">Available</p>
              </div>

              <!-- Weight -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                  </svg>
                </div>
                <p class="text-2xl font-bold text-gray-800">{{ animal.weight }}</p>
                <p class="text-xs text-gray-600 font-medium">kg avg.</p>
              </div>

              <!-- Age -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-teal-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-lg font-bold text-gray-800">{{ animal.age }}</p>
                <p class="text-xs text-gray-600 font-medium">Age</p>
              </div>

              <!-- Gender -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-pink-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p class="text-lg font-bold text-gray-800">{{ animal.gender }}</p>
                <p class="text-xs text-gray-600 font-medium">Gender</p>
              </div>
            </div>
          </div>

          <!-- Right Column - Details -->
          <div class="space-y-6">
            
            <!-- Description -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm">
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Description
              </h3>
              <p class="text-gray-700 leading-relaxed">{{ animal.description }}</p>
            </div>

            <!-- Delivery Options -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm">
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Delivery Options
              </h3>
              <div class="flex flex-wrap gap-3">
                <span 
                  v-for="option in animal.deliveryOptions" 
                  :key="option"
                  class="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full capitalize font-medium border border-green-200/60 flex items-center gap-2"
                >
                  <svg v-if="option === 'pickup'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {{ option }}
                </span>
              </div>
            </div>

            <!-- Farmer Information -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm">
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Farmer Information
              </h3>
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200 shadow-md">
                  <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-gray-800">{{ animal.farmer.farmName || animal.farmer.name }}</h4>
                  <p v-if="animal.farmer.farmName" class="text-sm text-gray-600 mb-1">{{ animal.farmer.name }}</p>
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {{ animal.farmer.address }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Date Posted -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Listed On
                  </h3>
                  <p class="text-gray-600">{{ formatDate(animal.datePosted) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-500">Days listed</p>
                  <p class="text-xl font-bold text-gray-800">{{ getDaysListed(animal.datePosted) }}</p>
                </div>
              </div>
            </div>

            <!-- Contact Actions -->
            <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Information
              </h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <span class="text-sm font-medium">Phone Number</span>
                  <span class="font-bold">{{ animal.farmer.contact }}</span>
                </div>
                <button 
                  @click="contactFarmer"
                  class="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-bold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center justify-center gap-2 shadow hover:shadow-md"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Farmer
                </button>
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

interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
}

interface Animal {
  id: number;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
}

// Props
const props = defineProps<{
  animal: Animal;
}>();

// Emits
const emit = defineEmits<{
  close: [];
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
      return 'bg-green-100/90 text-green-800 border-green-300';
    case 'Low Stock':
      return 'bg-yellow-100/90 text-yellow-800 border-yellow-300';
    case 'Out of Stock':
      return 'bg-red-100/90 text-red-800 border-red-300';
    default:
      return 'bg-gray-100/90 text-gray-800 border-gray-300';
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

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
</script>