<!-- AnimalDetailsModal.vue -->
<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 class="text-xl font-bold text-green-800">Animal Details</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="overflow-y-auto flex-1">
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Animal Images Gallery -->
            <div class="w-full md:w-2/5 space-y-4">
              <div class="relative rounded-lg overflow-hidden bg-gray-100">
                <img
                  :src="animal.images[currentImageIndex]"
                  alt="Main animal image"
                  class="w-full h-64 object-cover rounded-lg shadow hover:shadow-md transition-shadow"
                />
                <div class="absolute top-2 left-2">
                  <span :class="`px-2 py-1 text-white text-xs font-bold rounded ${getStatusClass(animal.status)}`">
                    {{ animal.status.toUpperCase() }}
                  </span>
                </div>
                <button 
                  v-if="animal.images.length > 1"
                  @click="() => prevImage(animal.images)"
                  class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button 
                  v-if="animal.images.length > 1"
                  @click="() => nextImage(animal.images)"
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div 
                  v-for="(img, index) in animal.images" 
                  :key="index"
                  class="aspect-square"
                >
                  <img 
                    :src="img" 
                    @click="currentImageIndex = index"
                    :class="`h-full w-full object-cover rounded cursor-pointer border-2 ${currentImageIndex === index ? 'border-green-500' : 'border-transparent hover:border-gray-300'}`"
                  />
                </div>
              </div>
            </div>
            
            <!-- Animal Details Section -->
            <div class="w-full md:w-3/5">
              <div class="space-y-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ animal.type }} - {{ animal.breed }}</h3>
                  <p class="text-sm text-gray-500 mt-1">Posted on {{ formatDate(animal.datePosted) }}</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-xs font-medium text-gray-500">Weight</p>
                    <p class="text-lg font-semibold text-gray-900">{{ animal.weight }} kg</p>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-xs font-medium text-gray-500">Quantity Available</p>
                    <p class="text-lg font-semibold text-gray-900">{{ animal.quantity }}</p>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-xs font-medium text-gray-500">Age</p>
                    <p class="text-lg font-semibold text-gray-900">{{ animal.age || 'N/A' }}</p>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-xs font-medium text-gray-500">Price</p>
                    <p class="text-lg font-semibold text-gray-900">{{ animal.price ? `₱${animal.price.toLocaleString()}` : 'Negotiable' }}</p>
                  </div>
                </div>

                <div class="bg-gray-50 p-3 rounded-lg">
                  <p class="text-xs font-medium text-gray-500">Status</p>
                  <div class="mt-1 flex items-center">
                    <span :class="`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(animal.status)}`">
                      {{ animal.status }}
                    </span>
                  </div>
                </div>

                <div class="bg-gray-50 p-3 rounded-lg">
                  <p class="text-xs font-medium text-gray-500">Delivery Options</p>
                  <div class="mt-1">
                    <span v-if="animal.deliveryOptions.includes('pickup')" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      <svg class="-ml-0.5 mr-1.5 h-2 w-2 text-blue-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Pick Up
                    </span>
                    <span v-if="animal.deliveryOptions.includes('delivery')" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg class="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Delivery
                    </span>
                  </div>
                </div>

                <div>
                  <p class="text-sm font-medium text-gray-700 mb-2">Description</p>
                  <p class="text-sm text-gray-600 whitespace-pre-line">{{ animal.description }}</p>
                </div>
              </div>
              
              <!-- Farmer Information Section -->
              <div class="mt-6 border-t pt-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">Seller Information</h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="flex-shrink-0">
                      <img 
                        :src="animal.farmer.avatar" 
                        alt="Farmer" 
                        class="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">{{ animal.farmer.name }}</p>
                      <p class="text-xs text-gray-500">{{ animal.farmer.farmName }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p class="text-xs font-medium text-gray-500">Contact Number</p>
                      <p class="text-sm text-gray-900">{{ animal.farmer.contact }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-500">Verification Status</p>
                      <div class="flex items-center">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                        <svg class="ml-1 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="md:col-span-2">
                      <p class="text-xs font-medium text-gray-500">Farm Address</p>
                      <p class="text-sm text-gray-900">{{ animal.farmer.address }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with action buttons -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
        <button 
          v-if="isFarmer"
          @click="$emit('delete')"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
        >
          Delete Listing
        </button>
        <button 
          v-if="isFarmer"
          @click="$emit('edit', animal)"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
        >
          Edit Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getCurrentUser } from '../../services/user';

interface Farmer {
  name: string;
  farmName: string;
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
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
}

defineProps<{
  animal: Animal;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'edit', animal: Animal): void;
  (e: 'delete'): void;
}>();

const currentImageIndex = ref(0);
const currentUser = getCurrentUser();

const isFarmer = computed(() => currentUser?.role === 'Farmer');

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const nextImage = (images: string[]) => {
  if (currentImageIndex.value < images.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
}

const prevImage = (images: string[]) => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = images.length - 1;
  }
}

const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'sold':
      return 'bg-red-100 text-red-800';
    case 'reserved':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
</script>