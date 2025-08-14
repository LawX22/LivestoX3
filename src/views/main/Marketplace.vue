<!-- Marketplace.vue -->
<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <!-- NavBar -->
    <div class="sticky top-0 z-50">
      <NavBar />
    </div>

    <!-- DYNAMIC COMBINED HEADER -->
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
            <p class="text-green-100 text-sm opacity-90 truncate">
              {{ isFarmerView ? 'Discover quality livestock from verified farmers' : 'Browse premium livestock from verified farmers' }}
            </p>
          </div>
        </div>

        <!-- Right side - Dynamic Content Area -->
        <div class="flex-1 flex justify-end min-w-0">
          <!-- Farmer View - Post Livestock Button -->
          <div v-if="isFarmerView" class="flex items-center">
            <router-link to="/yourLivestock" class="whitespace-nowrap bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Post Livestock
            </router-link>
          </div>

          <!-- Buyer View - Guest Mode Notice -->
          <div v-else-if="!currentUser?.email" class="bg-amber-100/80 text-amber-800 px-4 py-2 rounded-lg flex items-center gap-3 border border-amber-200 shadow-md max-w-full">
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

          <!-- Buyer View - Upgrade Prompts for Buyers -->
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
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 0118 0zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
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
      <!-- Enhanced Filters Sidebar with Collapse/Expand -->
      <div :class="`${isSidebarExpanded ? 'w-full md:w-52 lg:w-56' : 'w-14'} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative transition-all duration-300 ease-in-out`">
        <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-emerald-50/20"></div>

        <!-- Toggle Button integrated into filter logo -->
        <div 
          @click="toggleSidebar"
          class="absolute inset-0 flex items-center justify-center cursor-pointer group z-20"
          v-if="!isSidebarExpanded"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
            </svg>
          </div>
        </div>

        <div class="relative h-full flex flex-col">
          <!-- Expanded View -->
          <div v-if="isSidebarExpanded" class="h-full flex flex-col">
            <!-- Header with integrated close button -->
            <div class="flex justify-between items-center p-3 border-b border-green-100/50">
              <h2 class="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-1">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
                </svg>
                Filters
              </h2>
              <div class="flex gap-1">
                <button @click="resetFilters" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
                <button @click="toggleSidebar" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sticky Search & Active Filters -->
<div class="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-green-100/50 p-3 shadow-sm">
  <!-- Search -->
  <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100 mb-2">
    <div class="relative">
      <input v-model="filters.search" type="text" class="block w-full pl-8 pr-2 py-1.5 border border-green-200 rounded-md text-xs bg-green-50/30 focus:ring-2 focus:ring-green-500/50" placeholder="Search..." />
      <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <svg class="h-3 w-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Active Filters -->
  <div v-if="hasActiveFilters" class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-md p-2 border border-green-200">
    <div class="flex flex-wrap gap-1">
      <span v-if="filters.search" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">
        "{{ filters.search }}"
      </span>
      <span v-for="type in filters.types" :key="type" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ type }}</span>
      <span v-for="breed in filters.breeds" :key="breed" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ breed }}</span>
      <span v-for="location in filters.locations" :key="location" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ location }}</span>
      <span v-for="priceRange in filters.priceRanges" :key="priceRange" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ formatPriceRange(priceRange) }}</span>
      <span v-for="gender in filters.genders" :key="gender" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ gender }}</span>
    </div>
  </div>
</div>

<!-- Scrollable Filters Area -->
<div class="flex-1 overflow-y-auto p-3">
  <!-- Compact Filter Group -->
  <div class="space-y-3">
    <!-- Animal Type Checkboxes -->
    <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
      <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-7 7a2 2 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Animal Type
      </h3>
      <div class="space-y-1 max-h-32 overflow-y-auto">
        <label v-for="type in uniqueTypes" :key="type" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
          <input 
            type="checkbox" 
            :value="type" 
            v-model="filters.types" 
            class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <span class="truncate">{{ type }}</span>
        </label>
      </div>
    </div>

    <!-- Breed Checkboxes -->
    <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
      <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Breed
      </h3>
      <div class="space-y-1 max-h-32 overflow-y-auto">
        <label v-for="breed in uniqueBreeds" :key="breed" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
          <input 
            type="checkbox" 
            :value="breed" 
            v-model="filters.breeds" 
            class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <span class="truncate">{{ breed }}</span>
        </label>
      </div>
    </div>

    <!-- Location Dropdown -->
    <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
      <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Location
      </h3>
      <div class="relative">
        <select v-model="filters.locations" multiple class="w-full text-xs border border-green-200 rounded-md bg-green-50/30 p-1.5 focus:ring-2 focus:ring-green-500/50 h-24 overflow-y-auto">
          <option v-for="location in uniqueLocations" :key="location" :value="location" class="p-1 hover:bg-green-100 rounded text-xs">
            {{ location }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Price Range Checkboxes -->
    <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
      <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Price Range
      </h3>
      <div class="space-y-1">
        <label v-for="(range, index) in priceRanges" :key="index" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
          <input 
            type="checkbox" 
            :value="range.value" 
            v-model="filters.priceRanges" 
            class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <span class="truncate">{{ range.label }}</span>
        </label>
      </div>
    </div>

    <!-- Gender Checkboxes -->
    <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
      <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Gender
      </h3>
      <div class="space-y-1">
        <label v-for="gender in genders" :key="gender" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
          <input 
            type="checkbox" 
            :value="gender" 
            v-model="filters.genders" 
            class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <span class="truncate">{{ gender }}</span>
        </label>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- STICKY Results Summary with Sort -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-2">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800">
                  {{ filteredAnimals.length }} {{ filteredAnimals.length === 1 ? 'Listing' : 'Listings' }} Found
                </h3>
              </div>
            </div>

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-gray-700">Sort By:</label>
              <select v-model="sortBy" class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                <option value="datePosted">Newest</option>
                <option value="datePosted-asc">Oldest</option>
                <option value="price">Price (Low)</option>
                <option value="price-desc">Price (High)</option>
                <option value="type">Type (A-Z)</option>
                <option value="type-desc">Type (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- SCROLLABLE Cards Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-3">
            <!-- Card View -->
            <div v-if="filteredAnimals.length > 0" :class="`grid gap-3 ${isFarmerView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`">
              <div v-for="animal in filteredAnimals" :key="animal.id" class="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-white/60 hover:border-green-300/60 transition-all duration-300 bg-white/95 backdrop-blur-sm flex flex-col h-full group">
                
                <!-- Premium Image Section -->
                <div class="relative h-28 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10 z-10"></div>
                  <img :src="animal.images[0]" :alt="animal.type" class="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110" @click="openModal(animal)" loading="lazy" />
                  
                  <!-- Status Badge -->
                  <div class="absolute top-2 right-2 z-20">
                    <span :class="`px-1.5 py-0.5 text-[10px] font-bold rounded-full shadow backdrop-blur-md border ${getStatusClass(animal.status)}`">
                      {{ animal.status }}
                    </span>
                  </div>

                  <!-- Price Badge -->
                  <div class="absolute top-2 left-2 z-20">
                    <div class="bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full shadow border border-white/40">
                      <span class="text-[10px] font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₱{{ animal.price.toLocaleString() }}</span>
                    </div>
                  </div>

                  <!-- Farmer Info Overlay -->
                  <div class="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div class="bg-black/70 backdrop-blur-md rounded-lg p-1 border border-white/20 flex items-center">
                      <div class="w-5 h-5 rounded-full border border-white/60 shadow-sm overflow-hidden mr-1">
                        <img :src="animal.farmer.avatar" :alt="animal.farmer.name" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p class="text-[10px] font-medium text-white truncate max-w-[80px]">{{ animal.farmer.farmName || animal.farmer.name }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Quick View Overlay -->
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm z-15">
                    <button @click="openModal(animal)" class="bg-white/95 backdrop-blur-md text-gray-800 px-2 py-1 rounded font-semibold shadow hover:shadow-md transition-all duration-200 flex items-center gap-1 text-[10px] border border-white/40 hover:bg-white">
                      <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Quick View
                    </button>
                  </div>
                </div>

                <!-- Compact Card Content -->
                <div class="p-2 flex-1 flex flex-col relative">
                  <!-- Content Header with Date and Location -->
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-0.5">
                        <h3 class="font-bold text-sm text-gray-800 group-hover:text-green-700 transition-colors leading-tight truncate">{{ animal.type }}</h3>
                        <div class="text-[10px] text-gray-500 flex items-center gap-0.5">
                          <svg class="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{{ formatDate(animal.datePosted) }}</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-0.5">
                          <span class="text-[10px] text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-500 px-1.5 py-0.5 rounded-md shadow-sm truncate max-w-[80px]">{{ animal.breed }}</span>
                        </div>
                        <div class="text-[10px] text-gray-500 flex items-center gap-0.5">
                          <svg class="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span class="truncate max-w-[70px]">{{ animal.location }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Stats Section - Quantity, Weight, Gender, Age -->
                  <div class="mb-2">
                    <!-- Quantity and Weight Row -->
                    <div class="grid grid-cols-2 gap-1 mb-1">
                      <!-- Quantity -->
                      <div class="bg-blue-50 p-1 rounded-md border border-blue-200/60 flex items-center justify-center gap-1 relative group/quantity">
                        <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <p class="text-xs font-bold text-blue-800">{{ animal.quantity }}</p>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/quantity:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Quantity
                          <div class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45"></div>
                        </div>
                      </div>
                      
                      <!-- Weight -->
                      <div class="bg-purple-50 p-1 rounded-md border border-purple-200/60 flex items-center justify-center gap-1 relative group/weight">
                        <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                        </svg>
                        <p class="text-xs font-bold text-purple-800">{{ animal.weight }}</p>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/weight:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Weight (kg)
                          <div class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45"></div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Gender and Age Row -->
                    <div class="grid grid-cols-2 gap-1">
                      <!-- Gender -->
                      <div class="bg-pink-50 p-1 rounded-md border border-pink-200/60 flex items-center justify-center gap-1 relative group/gender">
                        <svg class="w-3 h-3 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p class="text-xs font-bold text-pink-800">{{ animal.gender }}</p>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/gender:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Gender
                          <div class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45"></div>
                        </div>
                      </div>
                      
                      <!-- Age -->
                      <div class="bg-teal-50 p-1 rounded-md border border-teal-200/60 flex items-center justify-center gap-1 relative group/age">
                        <svg class="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-xs font-bold text-teal-800">{{ animal.age }}</p>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/age:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Age
                          <div class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="mb-2 flex-1">
                    <p class="text-[11px] text-gray-600 leading-relaxed line-clamp-2 font-medium">{{ animal.description }}</p>
                  </div>

                  <!-- Enhanced Delivery Options -->
                  <div class="mb-2">
                    <div class="flex flex-wrap gap-0.5">
                      <span v-for="option in animal.deliveryOptions" :key="option" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full capitalize font-medium border border-green-200/60 truncate">
                        {{ option }}
                      </span>
                    </div>
                  </div>

                  <!-- Enhanced Action Button -->
                  <button @click.stop="contactFarmer(animal)" class="w-full px-2 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 shadow hover:shadow-md border border-blue-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Farmer
                  </button>
                </div>
              </div>
            </div>

            <!-- Enhanced Empty State -->
            <div v-if="filteredAnimals.length === 0" class="flex flex-col items-center justify-center py-12">
              <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl">
                <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">No listings found</h3>
                <p class="text-xs text-gray-500 mb-4 leading-relaxed">We couldn't find any livestock matching your current search criteria. Try adjusting your filters or browse all available listings.</p>
                <button @click="resetFilters" class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animal Details Modal -->
    <AnimalDetailsModal 
        v-if="isModalOpen && selectedAnimal" 
        :animal="selectedAnimal"
        @close="closeModal"
        @contact="contactFarmerFromModal"
      />

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
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

interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  locations: string[];
  priceRanges: string[];
  genders: string[];
}

// Props to determine view mode
const props = defineProps<{
  viewMode?: 'buyer' | 'farmer';
}>();

const router = useRouter();
const currentUser = getCurrentUser();
const hasPendingUpgrade = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

const isModalOpen = ref(false);
const selectedAnimal = ref<Animal | null>(null);

// View mode - defaults to buyer if user is not a farmer
const isFarmerView = computed(() => {
  if (props.viewMode) return props.viewMode === 'farmer';
  return currentUser?.role === 'Farmer';
});

// Sidebar state
const isSidebarExpanded = ref(true);

// Sorting
const sortBy = ref('datePosted');

// Filter options
const priceRanges = ref([
  { label: 'Below ₱5K', value: '0-5000' },
  { label: '₱5K - ₱20K', value: '5000-20000' },
  { label: '₱20K - ₱50K', value: '20000-50000' },
  { label: '₱50K - ₱100K', value: '50000-100000' },
  { label: 'Above ₱100K', value: '100000+' }
]);

const genders = ref(['Male', 'Female', 'Mixed']);

// Filters
const filters = ref<Filters>({
  search: '',
  types: [],
  breeds: [],
  locations: [],
  priceRanges: [],
  genders: []
});

// Sample data
const animals = ref<Animal[]>([
  {
    id: 1,
    type: 'Cattle',
    breed: 'Angus',
    weight: 450,
    quantity: 5,
    age: '24 months',
    gender: 'Male',
    status: 'Available',
    price: 45000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1545468866-336d9336a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Healthy Angus cattle, vaccinated and dewormed. Raised in open pasture with organic feed.',
    datePosted: new Date().toISOString(),
    farmer: {
      id: 2,
      name: 'Maria Santos',
      farmName: 'Santos Ranch',
      contact: '+63 921 777 8888',
      address: '123 Poultry Lane, Barangay Fowl, Pampanga',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    location: 'Pampanga'
  },
  {
    id: 5,
    type: 'Buffalo',
    breed: 'Carabao',
    weight: 600,
    quantity: 2,
    age: '36 months',
    gender: 'Male',
    status: 'Available',
    price: 80000,
    deliveryOptions: ['pickup'],
    images: [
      'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Strong and healthy carabao, excellent for farming work and milk production.',
    datePosted: new Date(Date.now() - 432000000).toISOString(),
    farmer: {
      id: 6,
      name: 'Elena Mendoza',
      farmName: 'Mendoza Buffalo Ranch',
      contact: '+63 921 999 8877',
      address: '789 Buffalo Lane, Barangay Ranch, Nueva Ecija',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    },
    location: 'Nueva Ecija'
  },
  {
    id: 6,
    type: 'Duck',
    breed: 'Pekin',
    weight: 3.5,
    quantity: 25,
    age: '12 weeks',
    gender: 'Mixed',
    status: 'Available',
    price: 350,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Pekin ducks with excellent meat production qualities. Fast growing and efficient feed converters.',
    datePosted: new Date(Date.now() - 518400000).toISOString(),
    farmer: {
      id: 7,
      name: 'Antonio Lim',
      farmName: 'Lim Duck Farm',
      contact: '+63 922 789 3456',
      address: '135 Quack Lane, Barangay Waterfowl, Laguna',
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg'
    },
    location: 'Laguna'
  }
]);

// Computed properties
const uniqueTypes = computed(() => {
  const types = new Set(animals.value.map(animal => animal.type));
  return Array.from(types).sort();
});

const uniqueBreeds = computed(() => {
  const breeds = new Set(animals.value.map(animal => animal.breed));
  return Array.from(breeds).sort();
});

const uniqueLocations = computed(() => {
  const locations = new Set(animals.value.map(animal => animal.location));
  return Array.from(locations).sort();
});

const hasActiveFilters = computed(() => {
  return filters.value.search !== '' || 
    filters.value.types.length > 0 || 
    filters.value.breeds.length > 0 || 
    filters.value.locations.length > 0 || 
    filters.value.priceRanges.length > 0 || 
    filters.value.genders.length > 0;
});

const filteredAnimals = computed(() => {
  let filtered = animals.value.filter(animal => {
    // Search filter
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch = !filters.value.search ||
      animal.type.toLowerCase().includes(searchLower) ||
      animal.breed.toLowerCase().includes(searchLower) ||
      animal.description.toLowerCase().includes(searchLower) ||
      (animal.farmer.farmName && animal.farmer.farmName.toLowerCase().includes(searchLower)) ||
      animal.farmer.name.toLowerCase().includes(searchLower);

    // Type filter (multi-select)
    const matchesType = filters.value.types.length === 0 || 
      filters.value.types.includes(animal.type);

    // Breed filter (multi-select)
    const matchesBreed = filters.value.breeds.length === 0 || 
      filters.value.breeds.includes(animal.breed);

    // Location filter (multi-select)
    const matchesLocation = filters.value.locations.length === 0 || 
      filters.value.locations.includes(animal.location);

    // Gender filter (multi-select)
    const matchesGender = filters.value.genders.length === 0 || 
      filters.value.genders.includes(animal.gender);

    // Price range filter (multi-select)
    let matchesPrice = true;
    if (filters.value.priceRanges.length > 0) {
      matchesPrice = filters.value.priceRanges.some(range => {
        const [min, max] = range.split('-');
        if (max) {
          return animal.price >= parseInt(min) && animal.price <= parseInt(max);
        } else {
          return animal.price >= parseInt(min.replace('+', ''));
        }
      });
    }

    return matchesSearch && matchesType && matchesBreed && matchesLocation && matchesPrice && matchesGender;
  });

  // Sorting
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

// Methods
const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

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
  selectedAnimal.value = null;
};

const contactFarmer = (animal: Animal) => {
  if (!isFarmerView.value && !currentUser?.email) {
    router.push('/signin');
    return;
  }
  showToastNotification(`Contact request sent to ${animal.farmer.farmName || animal.farmer.name}`);
  // Copy contact info to clipboard
  navigator.clipboard.writeText(animal.farmer.contact);
};

const contactFarmerFromModal = (contactInfo: string) => {
  showToastNotification(`Contact information has been copied to clipboard: ${contactInfo}`);
  navigator.clipboard.writeText(contactInfo);
  closeModal();
};

const resetFilters = () => {
  filters.value = {
    search: '',
    types: [],
    breeds: [],
    locations: [],
    priceRanges: [],
    genders: []
  };
  sortBy.value = 'datePosted';
  showToastNotification('All filters have been reset');
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
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
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

// Lifecycle hooks
onMounted(() => {
  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]');
  hasPendingUpgrade.value = currentUser?.email
    ? requests.some((r: any) => r.email === currentUser.email)
    : false;
});
</script>