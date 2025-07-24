<!-- FarmerMarket.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- NavBar -->
    <NavBar />

    <!-- Header Section -->
    <div class="p-4 md:p-6 border-b border-gray-200 bg-white">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-green-800">Marketplace</h1>
          <p class="text-gray-500 mt-1">Browse livestock listings from other farmers</p>
        </div>
        <div class="flex items-center gap-3">
          <router-link
            to="/yourLivestock"
            class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Post Your Livestock
          </router-link>
        </div>
      </div>
    </div>

    <!-- Compact Filters Section -->
    <div class="p-3 border-b border-gray-200 bg-white">
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
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              placeholder="Search listings..."
            />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- Type Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.type"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
            >
              <option value="">All Types</option>
              <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          
          <!-- Breed Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.breed"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
            >
              <option value="">All Breeds</option>
              <option v-for="breed in uniqueBreeds" :key="breed" :value="breed">{{ breed }}</option>
            </select>
          </div>
          
          <!-- Location Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.location"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
            >
              <option value="">All Locations</option>
              <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
            </select>
          </div>
          
          <!-- Price Range Filter -->
          <div class="min-w-[120px]">
            <select 
              v-model="filters.priceRange"
              class="w-full pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-lg border bg-white"
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
            class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
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
            class="rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all bg-white flex flex-col h-full group"
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
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
              
              <!-- Farmer info -->
              <div class="flex items-center gap-2 mb-3">
                <img 
                  :src="animal.farmer.avatar" 
                  :alt="animal.farmer.name"
                  class="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ animal.farmer.farmName }}</p>
                  <p class="text-xs text-gray-500">{{ animal.farmer.address }}</p>
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
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
                <button 
                  @click.stop="contactFarmer(animal)"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
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
          <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-1">No listings found</h3>
          <p class="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button 
            @click="resetFilters"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Animal Details Modal -->
    <AnimalDetailsModal
      v-if="isModalOpen"
      :animal="selectedAnimal"
      @close="closeModal"
      @contact="contactFarmerFromModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../../components/NavBar.vue';
import AnimalDetailsModal from '../../components/Market/AnimalDetailsModal.vue';

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

export default defineComponent({
  name: 'FarmerMarket',
  components: {
    NavBar,
    AnimalDetailsModal
  },
  data() {
    return {
      isModalOpen: false,
      selectedAnimal: {} as Animal,
      filters: {
        search: '',
        type: '',
        breed: '',
        location: '',
        priceRange: ''
      } as Filters,
      animals: [
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
        },
        {
          id: 4,
          type: 'Chicken',
          breed: 'Broiler',
          weight: 2,
          quantity: 50,
          age: '6 weeks',
          status: 'Available',
          price: 250,
          deliveryOptions: ['pickup', 'delivery'],
          images: [
            'https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          ],
          description: 'Broiler chickens ready for processing. Raised without antibiotics with proper ventilation and space.',
          datePosted: new Date(Date.now() - 86400000 * 3).toISOString(),
          farmer: {
            id: 5,
            name: 'Roberto Cruz',
            farmName: 'Cruz Poultry Farm',
            contact: '+63 920 123 7890',
            address: '654 Poultry Avenue, Barangay Fowl, Pampanga',
            avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
          }
        },
        {
          id: 5,
          type: 'Sheep',
          breed: 'Dorper',
          weight: 60,
          quantity: 8,
          age: '18 months',
          status: 'Available',
          price: 15000,
          deliveryOptions: ['pickup'],
          images: [
            'https://images.unsplash.com/photo-1593369196682-6d8ec3ff3d0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          ],
          description: 'Dorper sheep known for excellent meat quality and easy maintenance. Suitable for both small and large scale farming.',
          datePosted: new Date(Date.now() - 86400000 * 10).toISOString(),
          farmer: {
            id: 6,
            name: 'Elena Gonzales',
            farmName: 'Gonzales Sheep Farm',
            contact: '+63 921 456 2345',
            address: '987 Wool Road, Barangay Shepherd, Benguet',
            avatar: 'https://randomuser.me/api/portraits/women/66.jpg'
          }
        },
        {
          id: 6,
          type: 'Duck',
          breed: 'Pekin',
          weight: 3.5,
          quantity: 25,
          age: '12 weeks',
          status: 'Available',
          price: 350,
          deliveryOptions: ['pickup', 'delivery'],
          images: [
            'https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          ],
          description: 'Pekin ducks with excellent meat production qualities. Fast growing and efficient feed converters. Healthy stock available.',
          datePosted: new Date(Date.now() - 86400000 * 5).toISOString(),
          farmer: {
            id: 7,
            name: 'Antonio Lim',
            farmName: 'Lim Duck Farm',
            contact: '+63 922 789 3456',
            address: '135 Quack Lane, Barangay Waterfowl, Laguna',
            avatar: 'https://randomuser.me/api/portraits/men/77.jpg'
          }
        }
      ] as Animal[]
    }
  },
  computed: {
    uniqueTypes(): string[] {
      const types = new Set(this.animals.map(animal => animal.type));
      return Array.from(types).sort();
    },
    uniqueBreeds(): string[] {
      const breeds = new Set(this.animals.map(animal => animal.breed));
      return Array.from(breeds).sort();
    },
    uniqueLocations(): string[] {
      const locations = new Set(this.animals.map(animal => animal.farmer.address.split(', ').slice(-2)[0]));
      return Array.from(locations).sort();
    },
    filteredAnimals(): Animal[] {
      return this.animals.filter(animal => {
        const matchesSearch = 
          this.filters.search === '' ||
          animal.type.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          animal.breed.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          animal.description.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          animal.farmer.farmName.toLowerCase().includes(this.filters.search.toLowerCase());
        
        const matchesType = 
          this.filters.type === '' || 
          animal.type === this.filters.type;
        
        const matchesBreed = 
          this.filters.breed === '' || 
          animal.breed === this.filters.breed;
        
        const matchesLocation = 
          this.filters.location === '' || 
          animal.farmer.address.includes(this.filters.location);
        
        let matchesPrice = true;
        if (this.filters.priceRange) {
          const [min, max] = this.filters.priceRange.split('-');
          if (max) {
            matchesPrice = animal.price >= parseInt(min) && animal.price <= parseInt(max);
          } else {
            matchesPrice = animal.price >= parseInt(min.replace('+', ''));
          }
        }
        
        return matchesSearch && matchesType && matchesBreed && matchesLocation && matchesPrice;
      });
    }
  },
  methods: {
    openModal(animal: Animal): void {
      this.selectedAnimal = animal;
      this.isModalOpen = true;
    },
    closeModal(): void {
      this.isModalOpen = false;
    },
    contactFarmer(animal: Animal): void {
      alert(`Contacting ${animal.farmer.name} at ${animal.farmer.contact}`);
    },
    contactFarmerFromModal(): void {
      this.contactFarmer(this.selectedAnimal);
      this.closeModal();
    },
    resetFilters(): void {
      this.filters = {
        search: '',
        type: '',
        breed: '',
        location: '',
        priceRange: ''
      };
    },
    getStatusClass(status: string): string {
      switch (status) {
        case 'Available':
          return 'bg-green-100 text-green-800';
        case 'Low Stock':
          return 'bg-yellow-100 text-yellow-800';
        case 'Out of Stock':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    formatDate(dateString: string): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
});
</script>