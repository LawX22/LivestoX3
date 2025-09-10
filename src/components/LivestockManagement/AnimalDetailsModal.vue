<!-- AnimalDetailsModal.vue -->
<template>
  <div v-if="animal" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 border-b border-green-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Animal Details</h2>
              <p class="text-green-100 text-xs">Complete information about this livestock</p>
            </div>
          </div>
          <button @click="$emit('close')"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content - Two Section Layout -->
      <div class="overflow-y-auto max-h-[calc(95vh-80px)]">
        <div class="flex">
          
          <!-- Left Section - Images -->
          <div class="w-2/5 bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border-r border-gray-200">
            <div class="sticky top-0 space-y-4">
              <div class="text-center">
                <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Livestock Images
                </h3>
              </div>

              <!-- Main Image Preview -->
              <div class="relative">
                <div class="w-full h-64 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                  <img :src="animal.images[selectedImageIndex]" :alt="animal.title" class="w-full h-full object-cover rounded-lg" />
                </div>

                <!-- Navigation arrows for main preview -->
                <div v-if="animal.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                  <button @click="previousImage" type="button"
                    class="ml-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div v-if="animal.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                  <button @click="nextImage" type="button"
                    class="mr-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="animal.images.length > 0" class="grid grid-cols-5 gap-2">
                <div v-for="(image, index) in animal.images" :key="index"
                  class="relative group cursor-pointer" @click="selectedImageIndex = index">
                  <img :src="image" :alt="`Thumbnail ${index + 1}`"
                    :class="`w-full h-14 object-cover rounded-lg border-2 transition-all ${selectedImageIndex === index ? 'border-cyan-500 ring-2 ring-cyan-200' : 'border-gray-200 hover:border-gray-400'}`" />
                </div>
              </div>

              <!-- Image Counter -->
              <div class="text-center">
                <p class="text-xs text-cyan-600 font-medium">{{ selectedImageIndex + 1 }}/{{ animal.images.length }} images</p>
              </div>
            </div>
          </div>

          <!-- Right Section - Information -->
          <div class="w-3/5 p-4 bg-gray-50 flex flex-col" style="max-height: calc(95vh - 80px);">
            <div class="overflow-y-auto space-y-4">
              <!-- Title Section with ID -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Listing Details
                </h3>
                <h2 class="text-xl font-bold text-gray-900 mb-2">{{ animal.title }}</h2>
                <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span class="font-semibold">ID:</span>
                  <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ animal.id }}</span>
                </div>
                <p class="text-gray-600 text-sm">{{ animal.description }}</p>
              </div>

              <!-- Basic Information -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Animal Type</label>
                    <div class="text-sm font-medium text-gray-900">{{ animal.type }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Breed</label>
                    <div class="text-sm font-medium text-gray-900">{{ animal.breed }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
                    <div class="text-sm font-medium text-gray-900">{{ animal.gender }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Age</label>
                    <div class="text-sm font-medium text-gray-900">{{ animal.age }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Weight</label>
                    <div class="text-sm font-medium text-gray-900">{{ animal.weight }} kg</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Quantity</label>
                    <div class="text-sm font-medium text-gray-900">{{ animal.quantity }}</div>
                  </div>
                </div>
              </div>

              <!-- Pricing & Status -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Pricing & Status
                </h3>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Price</label>
                    <div class="text-lg font-bold text-green-600">₱{{ animal.price.toLocaleString() }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                    <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      animal.status === 'Available' ? 'bg-green-100 text-green-800' :
                      animal.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`">
                      {{ animal.status }}
                    </span>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Total Value</label>
                    <div class="text-md font-bold text-purple-600">₱{{ (animal.price * animal.quantity).toLocaleString() }}</div>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Date Posted</label>
                    <div class="text-sm font-medium text-gray-900">{{ formatDate(animal.datePosted) }}</div>
                  </div>
                </div>
              </div>

              <!-- Health Status -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Health Status
                </h3>

                <div class="flex flex-wrap gap-2">
                  <span v-for="(status, index) in animal.healthStatus" :key="index"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {{ status }}
                  </span>
                </div>
              </div>

              <!-- Delivery Options -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Delivery Options
                </h3>

                <div class="flex flex-wrap gap-2">
                  <span v-for="(option, index) in animal.deliveryOptions" :key="index"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {{ formatDeliveryOption(option) }}
                  </span>
                </div>
              </div>

              <!-- Location -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h3>
                <div class="text-sm font-medium text-gray-900">{{ animal.location }}</div>
              </div>

              <!-- Farmer Information -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Farmer Information
                </h3>

                <div class="flex items-center gap-3">
                  <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-12 h-12 rounded-full object-cover border-2 border-amber-200">
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">{{ animal.farmer.name }}</h4>
                    <p class="text-xs text-gray-600">{{ animal.farmer.farmName }}</p>
                    <p class="text-xs text-gray-500">{{ animal.farmer.contact }}</p>
                  </div>
                </div>
                <div class="mt-3 text-sm text-gray-700">
                  <p>{{ animal.farmer.address }}</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons - Sticky at the bottom -->
            <div class="sticky bottom-0 pt-4 bg-gray-50 mt-auto">
              <div class="flex gap-3 justify-center">
                <button @click="$emit('edit', animal)"
                  class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button @click="$emit('delete', animal)"
                  class="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
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
import { ref, type PropType } from 'vue';

interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
}

interface Animal {
  id: string;
  title: string;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  healthStatus: string[];
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
  isAuction?: boolean;
}

const props = defineProps({
  animal: {
    type: Object as PropType<Animal | null>,
    default: null
  }
});

const emit = defineEmits(['close', 'edit', 'delete']);

const selectedImageIndex = ref(0);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatDeliveryOption = (option: string) => {
  const optionsMap: Record<string, string> = {
    'pickup': 'Buyer Pickup',
    'delivery': 'Farm Delivery',
    'meetup': 'Meetup Point'
  };
  return optionsMap[option] || option;
};

const nextImage = () => {
  if (props.animal) {
    selectedImageIndex.value = selectedImageIndex.value < props.animal.images.length - 1
      ? selectedImageIndex.value + 1
      : 0;
  }
};

const previousImage = () => {
  if (props.animal) {
    selectedImageIndex.value = selectedImageIndex.value > 0
      ? selectedImageIndex.value - 1
      : props.animal.images.length - 1;
  }
};
</script>