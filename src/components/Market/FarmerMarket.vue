<!-- FarmerMarket.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden">
    <!-- Sticky NavBar -->
    <NavBar class="sticky top-0 z-50" />

    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
      <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-400 rounded-full opacity-35 animate-bounce"
        style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-emerald-400 rounded-full opacity-20 animate-pulse"
        style="animation-delay: 0.5s"></div>
    </div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Toast Demo -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div
        class="max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 border-green-400 p-4 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">Success!</h4>
            <div class="text-sm text-gray-700">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false"
            class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full mx-auto mt-6 mb-6 px-4 border border-white/30 relative z-10 max-w-screen-2xl">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-white opacity-15 rounded-full -translate-y-10 translate-x-10 animate-pulse">
        </div>
        <div
          class="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-15 rounded-full translate-y-6 -translate-x-6 animate-pulse">
        </div>

        <div class="relative z-10">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div class="flex items-center mb-4 md:mb-0">
              <div
                class="w-12 h-12 bg-white bg-opacity-80 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                  Livestock Marketplace</h1>
                <p class="text-green-100 text-sm opacity-90">Discover quality livestock from verified farmers</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <router-link to="/yourLivestock"
                class="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Post Your Livestock
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Filters Section -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div class="space-y-4">
          <!-- Search Bar -->
          <div class="relative max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <input v-model="filters.search" type="text"
              class="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 placeholder-gray-500"
              placeholder="Search livestock, breeds, or farmers..." />
          </div>

          <!-- Filter Controls -->
          <div class="flex flex-wrap items-center gap-4">
            <!-- Type Filter -->
            <div class="min-w-[140px]">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Animal Type</label>
              <select v-model="filters.type"
                class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300">
                <option value="">All Types</option>
                <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <!-- Breed Filter -->
            <div class="min-w-[140px]">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Breed</label>
              <select v-model="filters.breed"
                class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300">
                <option value="">All Breeds</option>
                <option v-for="breed in uniqueBreeds" :key="breed" :value="breed">{{ breed }}</option>
              </select>
            </div>

            <!-- Location Filter -->
            <div class="min-w-[140px]">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Location</label>
              <select v-model="filters.location"
                class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300">
                <option value="">All Locations</option>
                <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
              </select>
            </div>

            <!-- Price Range Filter -->
            <div class="min-w-[140px]">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Price Range</label>
              <select v-model="filters.priceRange"
                class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300">
                <option value="">All Prices</option>
                <option value="0-5000">Below ₱5,000</option>
                <option value="5000-20000">₱5,000 - ₱20,000</option>
                <option value="20000-50000">₱20,000 - ₱50,000</option>
                <option value="50000-100000">₱50,000 - ₱100,000</option>
                <option value="100000+">Above ₱100,000</option>
              </select>
            </div>

            <!-- Reset Button -->
            <div class="pt-6">
              <button @click="resetFilters"
                class="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>

          <!-- Results Counter -->
          <div class="flex items-center justify-between pt-2 border-t border-gray-200">
            <p class="text-sm text-gray-600">
              <span class="font-semibold text-green-600">{{ filteredAnimals.length }}</span>
              {{ filteredAnimals.length === 1 ? 'listing' : 'listings' }} found
            </p>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Sort by:</span>
              <select
                class="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-green-500">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Distance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="p-6">
        <!-- Card Grid -->
        <div v-if="filteredAnimals.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div v-for="animal in filteredAnimals" :key="animal.id"
            class="group bg-white/80 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden hover:bg-white/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <!-- Image with enhanced overlay -->
            <div class="relative h-48 overflow-hidden">
              <img :src="animal.images[0]" alt="Animal"
                class="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500"
                @click="openModal(animal)" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>

              <!-- Status Badge -->
              <div class="absolute top-3 right-3">
                <span
                  :class="`px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm ${getStatusClass(animal.status)}`">
                  {{ animal.status }}
                </span>
              </div>

              <!-- Quick Stats Overlay -->
              <div
                class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="flex gap-2">
                  <div class="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-semibold text-gray-800">
                    {{ animal.quantity }} available
                  </div>
                  <div class="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-semibold text-gray-800">
                    {{ animal.weight }}kg avg
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-5 flex-1 flex flex-col">
              <!-- Header -->
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors">{{
                    animal.type }}</h3>
                  <p
                    class="text-sm bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold">
                    {{ animal.breed }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</p>
                  <p
                    class="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₱{{ animal.price.toLocaleString() }}</p>
                </div>
              </div>

              <!-- Farmer Info -->
              <div
                class="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div class="relative">
                  <img :src="animal.farmer.avatar" :alt="animal.farmer.name"
                    class="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                  </div>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ animal.farmer.farmName }}</p>
                  <p class="text-xs text-gray-600 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ animal.farmer.address.split(', ').slice(-2)[0] }}
                  </p>
                </div>
              </div>

              <!-- Description -->
              <div class="mb-4 flex-1">
                <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">{{ animal.description }}</p>
              </div>

              <!-- Quick Stats Grid -->
              <div class="grid grid-cols-3 gap-2 mb-4">
                <div
                  class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border group-hover:from-green-50 group-hover:to-emerald-50 group-hover:border-green-200 transition-all duration-300">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Weight</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.weight }}kg</p>
                </div>
                <div
                  class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border group-hover:from-green-50 group-hover:to-emerald-50 group-hover:border-green-200 transition-all duration-300">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Qty</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.quantity }}</p>
                </div>
                <div
                  class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border group-hover:from-green-50 group-hover:to-emerald-50 group-hover:border-green-200 transition-all duration-300">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Age</p>
                  <p class="text-sm font-bold text-gray-900 mt-1">{{ animal.age }}</p>
                </div>
              </div>

              <!-- Delivery Options -->
              <div class="mb-4">
                <p class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Delivery Options</p>
                <div class="flex flex-wrap gap-1">
                  <span v-for="option in animal.deliveryOptions" :key="option"
                    class="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs rounded-md capitalize font-medium border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200">
                    {{ option }}
                  </span>
                </div>
              </div>

              <!-- Date Posted -->
              <div class="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Posted {{ formatDate(animal.datePosted) }}
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 pt-4 border-t border-gray-100">
                <button @click="openModal(animal)"
                  class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 px-4 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
                <button @click="contactFarmer(animal)"
                  class="flex-1 px-4 py-2 text-sm border-2 border-green-300 rounded-lg text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-16">
          <div
            class="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 border border-green-200">
            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3
            class="text-xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
            No listings found</h3>
          <p class="text-sm text-gray-600 mb-6 text-center max-w-md">We couldn't find any livestock matching your search
            criteria. Try adjusting your filters or search terms.</p>
          <button @click="resetFilters"
            class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Reset All Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Animal Details Modal -->
    <AnimalDetailsModal v-if="isModalOpen" :animal="selectedAnimal" @close="closeModal"
      @contact="contactFarmerFromModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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

const isModalOpen = ref(false);
const selectedAnimal = ref<Animal | null>(null);
const showToast = ref(false);
const toastMessage = ref('');

const filters = ref<Filters>({
  search: '',
  type: '',
  breed: '',
  location: '',
  priceRange: ''
});

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
]);

const uniqueTypes = computed(() => Array.from(new Set(animals.value.map(a => a.type))).sort());
const uniqueBreeds = computed(() => Array.from(new Set(animals.value.map(a => a.breed))).sort());
const uniqueLocations = computed(() => Array.from(new Set(animals.value.map(a => a.farmer.address.split(', ').slice(-2)[0]))).sort());

const filteredAnimals = computed(() => {
  return animals.value.filter(animal => {
    const matchesSearch =
      filters.value.search === '' ||
      animal.type.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      animal.description.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      animal.farmer.farmName.toLowerCase().includes(filters.value.search.toLowerCase());

    const matchesType = filters.value.type === '' || animal.type === filters.value.type;
    const matchesBreed = filters.value.breed === '' || animal.breed === filters.value.breed;
    const matchesLocation = filters.value.location === '' || animal.farmer.address.includes(filters.value.location);
    const matchesPriceRange = filters.value.priceRange === '' || checkPriceRange(animal.price, filters.value.priceRange);

    return matchesSearch && matchesType && matchesBreed && matchesLocation && matchesPriceRange;
  });
});

function openModal(animal: Animal) {
  selectedAnimal.value = animal;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function contactFarmer(animal: Animal) {
  showToast.value = true;
  toastMessage.value = `Contact information for ${animal.farmer.farmName} has been copied to clipboard: ${animal.farmer.contact}`;
  navigator.clipboard.writeText(animal.farmer.contact);
  setTimeout(() => showToast.value = false, 5000);
}

function contactFarmerFromModal(contactInfo: string) {
  showToast.value = true;
  toastMessage.value = `Contact information has been copied to clipboard: ${contactInfo}`;
  navigator.clipboard.writeText(contactInfo);
  setTimeout(() => showToast.value = false, 5000);
}

function resetFilters() {
  filters.value = {
    search: '',
    type: '',
    breed: '',
    location: '',
    priceRange: ''
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'available': return 'bg-green-100/80 text-green-800';
    case 'low stock': return 'bg-yellow-100/80 text-yellow-800';
    case 'sold out': return 'bg-red-100/80 text-red-800';
    default: return 'bg-gray-100/80 text-gray-800';
  }
}

function checkPriceRange(price: number, range: string): boolean {
  if (range === '') return true;
  const [minStr, maxStr] = range.split('-');
  const min = Number(minStr.replace('+', ''));
  const max = maxStr?.includes('+') ? Infinity : Number(maxStr);
  return price >= min && price <= (isNaN(max) ? Infinity : max);
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
.animate-delay-100 {
  animation-delay: 0.1s;
}
.animate-delay-200 {
  animation-delay: 0.2s;
}
.animate-delay-300 {
  animation-delay: 0.3s;
}
.transition-slow {
  transition: all 0.5s ease;
}
</style>
