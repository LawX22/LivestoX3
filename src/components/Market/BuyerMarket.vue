<!-- BuyerMarket.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-green-100 flex flex-col">
    <!-- NavBar -->
    <NavBar />

    <!-- Header Section -->
    <div class="p-4 md:p-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">Livestock Marketplace</h1>
          <p class="text-green-100 mt-1">Browse livestock listings from farmers</p>
        </div>
      </div>
    </div>

    <!-- Guest Mode Notice and Upgrade Prompt -->
    <div class="px-4 md:px-6 pt-4">
      <!-- Guest Mode Notice -->
      <div v-if="!currentUser?.email" class="bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-800 p-4 rounded-xl mb-4 flex flex-col sm:flex-row justify-between items-center gap-3 border border-amber-200">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm sm:text-base">
            You are viewing as a guest. Sign In to view listings, save favorites, or contact sellers.
          </span>
        </div>
        <router-link to="/signin" class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md">
          Sign In
        </router-link>
      </div>

      <!-- Upgrade Prompt for Buyers -->
      <div v-else-if="currentUser?.role !== 'Farmer'" class="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 p-4 rounded-xl mb-4 flex flex-col sm:flex-row justify-between items-center gap-3 border border-blue-200">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm sm:text-base">
            You are currently a <strong>Buyer</strong>. Upgrade to Farmer to post livestock.
          </span>
        </div>
        
        <!-- Account Not Verified -->
        <div v-if="!currentUser?.isVerified" class="flex flex-col items-center">
          <div class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Account not verified
          </div>
          <button 
            disabled
            class="whitespace-nowrap bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Verify to Upgrade
          </button>
        </div>
        
        <!-- Pending Upgrade -->
        <div v-else-if="hasPendingUpgrade" class="flex items-center">
          <button 
            disabled
            class="whitespace-nowrap bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed flex items-center"
          >
            <svg class="w-4 h-4 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            Pending Approval
          </button>
        </div>
        
        <!-- Can Upgrade -->
        <div v-else>
          <button 
            @click="goToUpgradeForm"
            class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Request Upgrade
          </button>
        </div>
      </div>
    </div>

    <!-- Compact Filters Section -->
    <div class="p-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div class="flex flex-col gap-3">
        <!-- Search Bar -->
        <div class="w-full">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="filters.search"
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-sm shadow-sm"
              placeholder="Search listings..."
            />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- Type Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.type"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg border bg-white shadow-sm"
            >
              <option value="">All Types</option>
              <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          
          <!-- Breed Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.breed"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg border bg-white shadow-sm"
            >
              <option value="">All Breeds</option>
              <option v-for="breed in uniqueBreeds" :key="breed" :value="breed">{{ breed }}</option>
            </select>
          </div>
          
          <!-- Location Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.location"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg border bg-white shadow-sm"
            >
              <option value="">All Locations</option>
              <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
            </select>
          </div>
          
          <!-- Price Range Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.priceRange"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg border bg-white shadow-sm"
            >
              <option value="">All Prices</option>
              <option value="0-5000">Below ₱5,000</option>
              <option value="5000-20000">₱5,000 - ₱20,000</option>
              <option value="20000-50000">₱20,000 - ₱50,000</option>
              <option value="50000-100000">₱50,000 - ₱100,000</option>
              <option value="100000+">Above ₱100,000</option>
            </select>
          </div>

          <!-- Reset Button -->
          <button 
            @click="resetFilters"
            class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area (Scrollable) -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-6">
        <!-- Card View -->
        <div v-if="filteredAnimals.length > 0" class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="animal in filteredAnimals"
            :key="animal.id"
            class="rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 hover:border-green-300 transition-all bg-white/80 backdrop-blur-sm flex flex-col h-full group"
          >
            <!-- Image with status badge -->
            <div class="relative h-48">
              <img 
                :src="animal.images[0]" 
                alt="Animal" 
                class="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                @click="openModal(animal)"
              />
              <div class="absolute top-3 right-3">
                <span :class="`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${getStatusClass(animal.status)}`">
                  {{ animal.status }}
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="absolute bottom-3 left-3">
                <div class="flex items-center">
                  <img 
                    :src="animal.farmer.avatar" 
                    :alt="animal.farmer.name"
                    class="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                  <div class="ml-2">
                    <p class="text-xs font-semibold text-white drop-shadow-md">{{ animal.farmer.farmName }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Main card content -->
            <div class="p-5 flex-1 flex flex-col">
              <!-- Header with type/breed and price -->
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors">{{ animal.type }}</h3>
                  <p class="text-sm text-green-600 font-semibold">{{ animal.breed }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</p>
                  <p class="font-bold text-lg text-gray-900">₱{{ animal.price.toLocaleString() }}</p>
                </div>
              </div>
              
              <!-- Quick stats -->
              <div class="grid grid-cols-3 gap-2 mb-4">
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Weight</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.weight }} kg</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quantity</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.quantity }}</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Age</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.age }}</p>
                </div>
              </div>
              
              <!-- Description -->
              <div class="mb-4 flex-1">
                <p class="text-sm text-gray-600 line-clamp-3 leading-relaxed">{{ animal.description }}</p>
              </div>
              
              <!-- Delivery options -->
              <div class="mb-4">
                <p class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Delivery Options</p>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="option in animal.deliveryOptions" 
                    :key="option"
                    class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md capitalize font-medium border border-green-200"
                  >
                    {{ option }}
                  </span>
                </div>
              </div>
              
              <!-- Date posted -->
              <div class="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Posted: {{ formatDate(animal.datePosted) }}
              </div>
              
              <!-- Action buttons -->
              <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                <button 
                  @click.stop="openModal(animal)"
                  class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
                <button 
                  @click.stop="contactFarmer(animal)"
                  class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-12">
          <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 max-w-md text-center">
            <svg class="w-16 h-16 text-gray-400 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-bold text-gray-800 mb-1">No listings found</h3>
            <p class="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button 
              @click="resetFilters"
              class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Animal Details Modal (without close button) -->
    <AnimalDetailsModal
      v-if="isModalOpen"
      :animal="selectedAnimal"
      @close="closeModal"
      @contact="contactFarmerFromModal"
      :showCloseButton="false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import AnimalDetailsModal from '../../components/Market/AnimalDetailsModal.vue';
import { getCurrentUser } from '../../services/user';

interface Farmer {
  id: number;
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

interface Filters {
  search: string;
  type: string;
  breed: string;
  location: string;
  priceRange: string;
}
const router = useRouter();
const currentUser = getCurrentUser();
const hasPendingUpgrade = ref(false);

const isModalOpen = ref(false);
const selectedAnimal = ref({} as Animal);
const filters = ref({
  search: '',
  type: '',
  breed: '',
  location: '',
  priceRange: ''
} as Filters);

const animals = ref<Animal[]>([
  {
    id: 1,
    type: 'Cattle',
    breed: 'Angus',
    weight: 450,
    quantity: 5,
    age: '24 months',
    status: 'Available',
    price: 45000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1545468866-336d9336a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Healthy Angus cattle, vaccinated and dewormed. Raised in open pasture with organic feed. Excellent breeding stock with documented lineage.',
    datePosted: new Date().toISOString(),
    farmer: {
      id: 2,
      name: 'Maria Santos',
      farmName: 'Santos Ranch',
      contact: '+63 917 123 4567',
      address: '456 Ranch Road, Barangay Pasture, Bukidnon',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: 2,
    type: 'Pig',
    breed: 'Large White',
    weight: 120,
    quantity: 10,
    age: '8 months',
    status: 'Available',
    price: 12000,
    deliveryOptions: ['pickup'],
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Healthy pigs ready for market. Fed with organic feed and raised in hygienic conditions. All vaccinations up to date.',
    datePosted: new Date(Date.now() - 86400000).toISOString(),
    farmer: {
      id: 3,
      name: 'Carlos Reyes',
      farmName: 'Reyes Swine Farm',
      contact: '+63 918 765 4321',
      address: '789 Pig Farm, Barangay Livestock, Batangas',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  },
  {
    id: 3,
    type: 'Goat',
    breed: 'Boer',
    weight: 35,
    quantity: 3,
    age: '14 months',
    status: 'Low Stock',
    price: 8000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1551290464-66719418ca54?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Purebred Boer goats, excellent for breeding. High quality genetics with good growth rates. All health certificates available.',
    datePosted: new Date(Date.now() - 86400000 * 7).toISOString(),
    farmer: {
      id: 4,
      name: 'Lorna Tan',
      farmName: 'Tan Goat Farm',
      contact: '+63 919 555 1234',
      address: '321 Goat Hills, Barangay Grazing, Rizal',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  }
]);

const uniqueTypes = computed(() => {
  const types = new Set(animals.value.map(animal => animal.type));
  return Array.from(types).sort();
});

const uniqueBreeds = computed(() => {
  const breeds = new Set(animals.value.map(animal => animal.breed));
  return Array.from(breeds).sort();
});

const uniqueLocations = computed(() => {
  const locations = new Set(animals.value.map(animal => animal.farmer.address.split(', ').slice(-2)[0]));
  return Array.from(locations).sort();
});

const filteredAnimals = computed(() => {
  return animals.value.filter(animal => {
    const matchesSearch =
      filters.value.search === '' ||
      animal.type.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      animal.description.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      animal.farmer.farmName.toLowerCase().includes(filters.value.search.toLowerCase());

    const matchesType =
      filters.value.type === '' ||
      animal.type === filters.value.type;

    const matchesBreed =
      filters.value.breed === '' ||
      animal.breed === filters.value.breed;

    const matchesLocation =
      filters.value.location === '' ||
      animal.farmer.address.includes(filters.value.location);

    let matchesPrice = true;
    if (filters.value.priceRange) {
      const [min, max] = filters.value.priceRange.split('-');
      if (max) {
        matchesPrice = animal.price >= parseInt(min) && animal.price <= parseInt(max);
      } else {
        matchesPrice = animal.price >= parseInt(min.replace('+', ''));
      }
    }

    return matchesSearch && matchesType && matchesBreed && matchesLocation && matchesPrice;
  });
});

onMounted(() => {
  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]');
  hasPendingUpgrade.value = currentUser?.email
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? requests.some((r: any) => r.email === currentUser.email)
    : false;
});

const openModal = (animal: Animal) => {
  selectedAnimal.value = animal;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const contactFarmer = (animal: Animal) => {
  if (!currentUser?.email) {
    router.push('/signin');
    return;
  }
  alert(`Contacting ${animal.farmer.name} at ${animal.farmer.contact}`);
};

const contactFarmerFromModal = () => {
  contactFarmer(selectedAnimal.value);
  closeModal();
};

const resetFilters = () => {
  filters.value = {
    search: '',
    type: '',
    breed: '',
    location: '',
    priceRange: ''
  };
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800';
    case 'Low Stock':
      return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800';
    case 'Out of Stock':
      return 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800';
    default:
      return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const goToUpgradeForm = () => {
  router.push('/upgradeForm');
};
</script>

<style scoped>
/* Smooth transitions */
.card-transition {
  transition: all 0.3s ease;
}

/* Enhance glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(6px);
}

/* Add subtle shadow depth */
.shadow-depth {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Hover effects */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradient text */
.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>