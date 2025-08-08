<!-- BuyerMarket.vue -->
<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Simplified Background Elements (reduced for performance) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <!-- NavBar - Sticky -->
    <div class="sticky top-0 z-50">
      <NavBar />
    </div>

    <!-- COMPACT COMBINED HEADER - ALL IN ONE ROW -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#fff" />
              <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
              <path d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" fill="#4ade80" />
              <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#fff" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate">Livestock Marketplace</h1>
            <p class="text-green-100 text-sm opacity-90 truncate">Browse premium livestock from verified farmers</p>
          </div>
        </div>

        <!-- Right side - Dynamic Content Area -->
        <div class="flex-1 flex justify-end min-w-0">
          <!-- Guest Mode Notice -->
          <div v-if="!currentUser?.email" class="bg-amber-100/80 text-amber-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-amber-200 shadow-md max-w-full">
            <div class="flex items-center min-w-0">
              <svg class="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-semibold truncate ml-2">Guest mode - Sign In for full access</span>
            </div>
            <router-link to="/signin" class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
              Sign In
            </router-link>
          </div>

          <!-- Upgrade Prompt for Buyers -->
          <div v-else-if="currentUser?.role !== 'Farmer'" class="flex items-center gap-3 max-w-full">
            <!-- Account Not Verified -->
            <div v-if="!currentUser?.isVerified" class="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-blue-200 shadow-md">
              <div class="flex items-center min-w-0">
                <svg class="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span class="text-sm font-semibold truncate ml-2">Buyer account - Verify to upgrade</span>
              </div>
              <button @click="goToUserProfile" class="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
                Verify Account
              </button>
            </div>

            <!-- Pending Upgrade -->
            <div v-else-if="hasPendingUpgrade" class="bg-gray-100/80 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-200 shadow-md">
              <svg class="w-4 h-4 text-gray-500 animate-pulse shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-semibold">Upgrade pending</span>
            </div>

            <!-- Can Upgrade -->
            <div v-else class="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-blue-200 shadow-md">
              <div class="flex items-center min-w-0">
                <svg class="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span class="text-sm font-semibold truncate ml-2">Ready to become a Farmer?</span>
              </div>
              <button @click="goToUpgradeForm" class="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1 shrink-0">
                Upgrade Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content with Sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- COMPACT Filters Sidebar -->
      <div class="w-full md:w-56 lg:w-64 xl:w-72 bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative">
        <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 to-emerald-50/20"></div>

        <div class="relative p-4 h-full overflow-y-auto">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Filters
              </h2>
              <button @click="resetFilters" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>

            <!-- Search Bar -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Search Listings</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input v-model="filters.search" type="text" class="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg leading-4 bg-gray-50/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-xs" placeholder="Search by type, breed, farm..." />
              </div>
            </div>

            <!-- Type Filter -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Animal Type</label>
              <select v-model="filters.type" class="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg bg-gray-50/70">
                <option value="">All Types</option>
                <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <!-- Breed Filter -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Breed</label>
              <select v-model="filters.breed" class="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg bg-gray-50/70">
                <option value="">All Breeds</option>
                <option v-for="breed in uniqueBreeds" :key="breed" :value="breed">{{ breed }}</option>
              </select>
            </div>

            <!-- Location Filter -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Location</label>
              <select v-model="filters.location" class="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg bg-gray-50/70">
                <option value="">All Locations</option>
                <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
              </select>
            </div>

            <!-- Price Range Filter -->
            <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Price Range</label>
              <select v-model="filters.priceRange" class="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg bg-gray-50/70">
                <option value="">All Prices</option>
                <option value="0-5000">Below ₱5,000</option>
                <option value="5000-20000">₱5,000 - ₱20,000</option>
                <option value="20000-50000">₱20,000 - ₱50,000</option>
                <option value="50000-100000">₱50,000 - ₱100,000</option>
                <option value="100000+">Above ₱100,000</option>
              </select>
            </div>

            <!-- Active Filters Summary -->
            <div v-if="hasActiveFilters" class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <h3 class="text-xs font-semibold text-gray-700 mb-2">Active Filters</h3>
              <div class="flex flex-wrap gap-1">
                <span v-if="filters.search" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  "{{ filters.search }}"
                </span>
                <span v-if="filters.type" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {{ filters.type }}
                </span>
                <span v-if="filters.breed" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {{ filters.breed }}
                </span>
                <span v-if="filters.location" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {{ filters.location }}
                </span>
                <span v-if="filters.priceRange" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {{ formatPriceRange(filters.priceRange) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- STICKY Results Summary with Sort -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-gray-800">
                  {{ filteredAnimals.length }} {{ filteredAnimals.length === 1 ? 'Listing' : 'Listings' }} Found
                </h3>
                <p class="text-xs text-gray-600">
                  Showing {{ startIndex + 1 }}-{{ Math.min(startIndex + itemsPerPage, filteredAnimals.length) }} of {{ filteredAnimals.length }}
                </p>
              </div>
            </div>

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
              <label class="text-sm font-semibold text-gray-700">Sort By:</label>
              <select v-model="sortBy" @change="resetPagination" class="px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-lg bg-white shadow-sm">
                <option value="datePosted">Date Posted (Newest)</option>
                <option value="datePosted-asc">Date Posted (Oldest)</option>
                <option value="price">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="type">Animal Type (A-Z)</option>
                <option value="type-desc">Animal Type (Z-A)</option>
                <option value="breed">Breed (A-Z)</option>
                <option value="breed-desc">Breed (Z-A)</option>
                <option value="quantity">Quantity (Low to High)</option>
                <option value="quantity-desc">Quantity (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- SCROLLABLE Cards Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4">
            <!-- OPTIMIZED Card View -->
            <div v-if="paginatedAnimals.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              <div v-for="animal in paginatedAnimals" :key="animal.id" class="rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-white/40 hover:border-green-300 transition-all duration-200 bg-white/95 backdrop-blur-sm flex flex-col h-full group max-w-sm">
                <!-- Optimized Image -->
                <div class="relative h-32 overflow-hidden">
                  <img :src="animal.images[0]" :alt="animal.type" class="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105" @click="openModal(animal)" loading="lazy" />
                  <div class="absolute top-2 right-2">
                    <span :class="`px-2 py-1 text-xs font-bold rounded-full shadow-sm ${getStatusClass(animal.status)}`">
                      {{ animal.status }}
                    </span>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div class="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full border-2 border-white shadow-sm overflow-hidden">
                        <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div class="ml-2">
                        <p class="text-xs font-bold text-white drop-shadow-sm">{{ animal.farmer.farmName }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- Quick view overlay -->
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button @click="openModal(animal)" class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-lg font-semibold shadow-md hover:bg-white transition-colors duration-200 flex items-center gap-1 text-xs">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View
                    </button>
                  </div>
                </div>

                <!-- Card content -->
                <div class="p-3 flex-1 flex flex-col">
                  <!-- Header with type/breed and price -->
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="font-bold text-sm text-gray-800 group-hover:text-green-700 transition-colors">{{ animal.type }}</h3>
                      <p class="text-xs text-green-600 font-semibold bg-green-100 px-1.5 py-0.5 rounded-md inline-block mt-1">{{ animal.breed }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xs font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₱{{ animal.price.toLocaleString() }}</p>
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="grid grid-cols-2 gap-2 mb-2">
                    <div class="bg-gray-50 p-2 rounded-lg text-center border">
                      <p class="text-xs text-gray-500 font-medium">Qty</p>
                      <p class="text-xs font-bold text-gray-900">{{ animal.quantity }}</p>
                    </div>
                    <div class="bg-gray-50 p-2 rounded-lg text-center border">
                      <p class="text-xs text-gray-500 font-medium">Age</p>
                      <p class="text-xs font-bold text-gray-900">{{ animal.age }}</p>
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="mb-2 flex-1">
                    <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed">{{ animal.description }}</p>
                  </div>

                  <!-- Delivery options -->
                  <div class="mb-2">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="option in animal.deliveryOptions" :key="option" class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-md capitalize font-medium border border-green-200">
                        {{ option }}
                      </span>
                    </div>
                  </div>

                  <!-- Date posted -->
                  <div class="text-xs text-gray-500 mb-2 flex items-center gap-1 bg-gray-50 p-1.5 rounded-md">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium">{{ formatDate(animal.datePosted) }}</span>
                  </div>

                  <!-- Action buttons -->
                  <div class="flex gap-2">
                    <button @click.stop="openModal(animal)" class="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View
                    </button>
                    <button @click.stop="contactFarmer(animal)" class="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <!-- Page Info -->
              <div class="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40">
                Page {{ currentPage }} of {{ totalPages }}
              </div>

              <!-- Pagination Buttons -->
              <div class="flex items-center gap-2">
                <!-- First Page -->
                <button @click="goToPage(1)" :disabled="currentPage === 1" :class="[
                  'px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-1',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white/90 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-white/40 shadow-sm'
                ]">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                  First
                </button>

                <!-- Previous Page -->
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="[
                  'px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-1',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white/90 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-white/40 shadow-sm'
                ]">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <!-- Page Numbers -->
                <div class="flex items-center gap-1">
                  <template v-for="page in visiblePages" :key="page">
                    <button v-if="page !== '...'" @click="goToPage(page)" :class="[
                      'px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200',
                      page === currentPage
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm'
                        : 'bg-white/90 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-white/40 shadow-sm'
                    ]">
                      {{ page }}
                    </button>
                    <span v-else class="px-2 text-gray-500">...</span>
                  </template>
                </div>

                <!-- Next Page -->
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="[
                  'px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-1',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white/90 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-white/40 shadow-sm'
                ]">
                  Next
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <!-- Last Page -->
                <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages" :class="[
                  'px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-1',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white/90 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-white/40 shadow-sm'
                ]">
                  Last
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Items per page selector -->
              <div class="flex items-center gap-2 text-sm bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40">
                <label class="text-gray-600 font-medium">Show:</label>
                <select v-model="itemsPerPage" @change="resetPagination" class="px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded bg-white">
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                  <option value="96">96</option>
                </select>
                <span class="text-gray-600">per page</span>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredAnimals.length === 0" class="flex flex-col items-center justify-center py-12">
              <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/40 max-w-sm text-center shadow-md">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">No listings found</h3>
                <p class="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button @click="resetFilters" class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm flex items-center gap-2 mx-auto">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animal Details Modal -->
    <AnimalDetailsModal v-if="isModalOpen" :animal="selectedAnimal" @close="closeModal" @contact="contactFarmerFromModal" :showCloseButton="false" />

    <!-- Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-green-200 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">Success!</h4>
            <div class="text-sm text-gray-700">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
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
const showToast = ref(false);
const toastMessage = ref('');

const isModalOpen = ref(false);
const selectedAnimal = ref({} as Animal);

// Pagination and Sorting
const sortBy = ref('datePosted');
const currentPage = ref(1);
const itemsPerPage = ref(12);

const filters = ref({
  search: '',
  type: '',
  breed: '',
  location: '',
  priceRange: ''
} as Filters);

// Sample data - optimized for performance
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
    breed: 'Rhode Island Red',
    weight: 2,
    quantity: 50,
    age: '6 months',
    status: 'Available',
    price: 250,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Premium laying hens, healthy and productive. Perfect for egg production or breeding purposes.',
    datePosted: new Date(Date.now() - 86400000 * 3).toISOString(),
    farmer: {
      id: 5,
      name: 'Roberto Cruz',
      farmName: 'Cruz Poultry Farm',
      contact: '+63 920 111 2233',
      address: '123 Chicken Street, Barangay Poultry, Laguna',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  },
  {
    id: 5,
    type: 'Buffalo',
    breed: 'Carabao',
    weight: 600,
    quantity: 2,
    age: '36 months',
    status: 'Available',
    price: 80000,
    deliveryOptions: ['pickup'],
    images: [
      'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Strong and healthy carabao, excellent for farming work and milk production. Well-trained and docile.',
    datePosted: new Date(Date.now() - 86400000 * 5).toISOString(),
    farmer: {
      id: 6,
      name: 'Elena Mendoza',
      farmName: 'Mendoza Buffalo Ranch',
      contact: '+63 921 999 8877',
      address: '789 Buffalo Lane, Barangay Ranch, Nueva Ecija',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    }
  }
]);

// Memoized computations for better performance
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

const hasActiveFilters = computed(() => {
  return filters.value.search || filters.value.type || filters.value.breed || filters.value.location || filters.value.priceRange;
});

// Optimized filtered and sorted animals
const filteredAnimals = computed(() => {
  let filtered = animals.value.filter(animal => {
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch =
      filters.value.search === '' ||
      animal.type.toLowerCase().includes(searchLower) ||
      animal.breed.toLowerCase().includes(searchLower) ||
      animal.description.toLowerCase().includes(searchLower) ||
      animal.farmer.farmName.toLowerCase().includes(searchLower);

    const matchesType = filters.value.type === '' || animal.type === filters.value.type;
    const matchesBreed = filters.value.breed === '' || animal.breed === filters.value.breed;
    const matchesLocation = filters.value.location === '' || animal.farmer.address.includes(filters.value.location);

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

  // Optimized sorting
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'datePosted':
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'datePosted-asc':
        return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
      case 'price':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'type':
        return a.type.localeCompare(b.type);
      case 'type-desc':
        return b.type.localeCompare(a.type);
      case 'breed':
        return a.breed.localeCompare(b.breed);
      case 'breed-desc':
        return b.breed.localeCompare(a.breed);
      case 'quantity':
        return a.quantity - b.quantity;
      case 'quantity-desc':
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });
});

// Pagination computations
const totalPages = computed(() => Math.ceil(filteredAnimals.value.length / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const paginatedAnimals = computed(() => {
  const start = startIndex.value;
  const end = start + itemsPerPage.value;
  return filteredAnimals.value.slice(start, end);
});

// Optimized visible pages computation
const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current > 4) pages.push('...');
    
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) pages.push(i);
    }
    
    if (current < total - 3) pages.push('...');
    if (total > 1) pages.push(total);
  }

  return pages;
});

// Debounced filter watcher for better performance
watch([filters, sortBy], () => {
  currentPage.value = 1;
}, { deep: true });

onMounted(() => {
  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]');
  hasPendingUpgrade.value = currentUser?.email
    ? requests.some((r: any) => r.email === currentUser.email)
    : false;
});

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};

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
  showToastNotification(`Contact request sent to ${animal.farmer.name}`);
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
  sortBy.value = 'datePosted';
  currentPage.value = 1;
  showToastNotification('All filters have been reset');
};

const resetPagination = () => {
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Scroll to top of scrollable content area
    const scrollableArea = document.querySelector('.flex-1.overflow-y-auto');
    if (scrollableArea) {
      scrollableArea.scrollTop = 0;
    }
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Out of Stock':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatPriceRange = (range: string) => {
  switch (range) {
    case '0-5000': return 'Below ₱5K';
    case '5000-20000': return '₱5K - ₱20K';
    case '20000-50000': return '₱20K - ₱50K';
    case '50000-100000': return '₱50K - ₱100K';
    case '100000+': return 'Above ₱100K';
    default: return range;
  }
};

const goToUpgradeForm = () => {
  router.push('/upgradeForm');
};

const goToUserProfile = () => {
  router.push('/userProfile');
};
</script>