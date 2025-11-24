<!-- livestockManagement.vue -->
<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Skeleton Loading State - Show while checking authentication -->
    <div v-if="isLoading" class="flex-1 flex flex-col overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
        <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
      </div>

      <!-- Skeleton Header -->
      <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
          <!-- Left side skeleton -->
          <div class="flex items-center min-w-0">
            <div class="w-10 h-10 bg-white/20 rounded-xl mr-3 animate-pulse"></div>
            <div class="w-12 h-12 bg-white/20 rounded-xl mr-3 animate-pulse"></div>
            <div class="min-w-0 space-y-2">
              <div class="h-5 bg-white/20 rounded w-48 animate-pulse"></div>
              <div class="h-3 bg-white/20 rounded w-64 animate-pulse"></div>
            </div>
          </div>
          <!-- Right side skeleton -->
          <div class="flex items-center gap-3">
            <div class="h-9 w-32 bg-white/20 rounded-lg animate-pulse"></div>
            <div class="h-9 w-32 bg-white/20 rounded-lg animate-pulse"></div>
            <div class="flex gap-1 bg-white/10 rounded-lg p-1">
              <div class="h-9 w-20 bg-white/20 rounded-md animate-pulse"></div>
              <div class="h-9 w-20 bg-white/20 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Skeleton Sidebar -->
        <div class="w-64 bg-white/95 backdrop-blur-sm border-r border-white/60 p-4 space-y-4">
          <div class="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div class="space-y-3">
            <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Skeleton Status Cards -->
          <div class="sticky top-0 z-30 px-4 md:px-6 py-4 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
            <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div v-for="i in 6" :key="i" class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60">
                <div class="flex items-center justify-between">
                  <div class="space-y-2 flex-1">
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div class="h-6 bg-gray-300 rounded animate-pulse w-12"></div>
                  </div>
                  <div class="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skeleton Tabs and Sort -->
          <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
            <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-3">
              <div class="h-7 bg-gray-200 rounded animate-pulse w-40"></div>
              <div class="flex justify-center gap-2">
                <div class="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                <div class="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              <div class="flex justify-end">
                <div class="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Skeleton Cards Grid -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4">
              <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                <div v-for="i in 8" :key="i" class="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden border border-white/60 shadow-sm">
                  <!-- Image skeleton -->
                  <div class="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                  
                  <!-- Content skeleton -->
                  <div class="p-4 space-y-3">
                    <!-- Title -->
                    <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    
                    <!-- Type badge -->
                    <div class="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                    
                    <!-- Details -->
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                      <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                      <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                    </div>
                    
                    <!-- Price -->
                    <div class="h-6 bg-gray-300 rounded animate-pulse w-32"></div>
                    
                    <!-- Buttons -->
                    <div class="flex gap-2 pt-2">
                      <div class="h-9 bg-gray-200 rounded-lg animate-pulse flex-1"></div>
                      <div class="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Farmer Role Check - Show access denied for non-farmers (only after loading) -->
    <div v-else-if="!isFarmerUser" class="flex-1 flex items-center justify-center p-6">
      <div class="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-red-200/60 max-w-md text-center shadow-xl">
        <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Access Restricted</h3>
        <p class="text-gray-600 mb-6">
          This page is only available to registered farmers. Please ensure you have the proper farmer role to access livestock management features.
        </p>
        <div class="flex gap-3 justify-center">
          <button 
            @click="goBack"
            class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
          <button 
            @click="router.push('/profile')"
            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content - Only show for farmers after loading -->
    <template v-else>
      <!-- Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
        <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
      </div>
      
      <!-- DYNAMIC COMBINED HEADER -->
      <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
        <div
          class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm"
        >
          <!-- Left side - Return Button + Logo and Title -->
          <div class="flex items-center min-w-0">
            <!-- Return Button -->
            <button 
              @click="goBack"
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-105"
              title="Go back"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div
              class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg"
            >
              <svg
                class="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  opacity="0.3"
                />
                <path
                  d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                />
                <path
                  d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                  fill="#fff"
                />
                <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
                <path
                  d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"
                  fill="#4ade80"
                />
                <path
                  d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="text-xl font-bold text-white truncate">
                Manage Livestock Posts
              </h1>
              <p class="text-green-100 text-sm opacity-90 truncate">
                Keep track of your livestock listings and manage them easily
              </p>
            </div>
          </div>
          <!-- Right side - Create Buttons + View Toggle -->
          <div class="flex items-center gap-3">
            <!-- Create Buttons -->
            <div class="flex items-center gap-2">
              <!-- Create Listing Button -->
              <button
                @click="createListing"
                class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-sm border border-white/20 hover:scale-105 shadow-lg"
                title="Create new livestock listing"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="hidden sm:inline">Create Listing</span>
                <span class="sm:hidden">List</span>
              </button>
              
              <!-- Create Auction Button -->
              <button
                @click="createAuction"
                class="px-4 py-2 bg-gradient-to-r from-amber-500/90 to-orange-600/90 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-sm shadow-lg hover:scale-105"
                title="Create new auction"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="hidden sm:inline">Create Auction</span>
                <span class="sm:hidden">Auction</span>
              </button>
            </div>

            <!-- View Toggle -->
            <div class="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm border border-white/20">
              <button
                @click="displayMode = 'card'"
                :class="`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  displayMode === 'card'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span class="hidden sm:inline">Cards</span>
              </button>
              <button
                @click="displayMode = 'table'"
                :class="`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  displayMode === 'table'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span class="hidden sm:inline">Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content with Sidebar -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Enhanced Filters Sidebar Component -->
        <FilterSidebar 
          v-if="filtersReady"
          :isExpanded="isSidebarExpanded"
          :filters="filters"
          :activeTab="activeTab"
          :uniqueTypes="uniqueTypes"
          :uniqueBreeds="uniqueBreeds"
          :uniqueLocations="uniqueLocations"
          :uniqueHealthStatuses="uniqueHealthStatuses"
          @toggleSidebar="toggleSidebar"
          @filtersChanged="handleFiltersChanged"
          @resetFilters="resetFilters"
        />

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Status Overview Cards -->
          <div class="sticky top-0 z-30 px-4 md:px-6 py-4 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
              <!-- Total Listings -->
              <div
                class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-all">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs md:text-sm font-medium text-gray-600">Total Listings</p>
                    <p class="text-xl md:text-2xl font-bold text-gray-900">
                      {{ animals.length }}
                    </p>
                  </div>
                  <div class="p-2 bg-blue-100/80 rounded-lg">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Available -->
              <div
                class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-all">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs md:text-sm font-medium text-gray-600">Available</p>
                    <p class="text-xl md:text-2xl font-bold text-green-600">
                      {{ animals.filter(a => a.status === 'Available').length }}
                    </p>
                  </div>
                  <div class="p-2 bg-green-100/80 rounded-lg">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Low Stock -->
              <div
                class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-all">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs md:text-sm font-medium text-gray-600">Low Stock</p>
                    <p class="text-xl md:text-2xl font-bold text-yellow-600">
                      {{ animals.filter(a => a.status === 'Low Stock').length }}
                    </p>
                  </div>
                  <div class="p-2 bg-yellow-100/80 rounded-lg">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Out of Stock -->
              <div
                class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-all">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs md:text-sm font-medium text-gray-600">Out of Stock</p>
                    <p class="text-xl md:text-2xl font-bold text-red-600">
                      {{ animals.filter(a => a.status === 'Out of Stock' || a.status === 'No stock').length }}
                    </p>
                  </div>
                  <div class="p-2 bg-red-100/80 rounded-lg">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Total Value -->
              <div
                class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-all">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs md:text-sm font-medium text-gray-600">Total Value</p>
                    <p class="text-xl md:text-2xl font-bold text-purple-600">
                      ₱{{ totalValue.toLocaleString() }}
                    </p>
                  </div>
                  <div class="p-2 bg-purple-100/80 rounded-lg">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- STICKY Results Summary with Tabs and Sort -->
          <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
            <!-- Use grid to keep layout stable -->
            <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-3">
              
              <!-- Left side - Results Counter -->
              <div class="flex items-center gap-2 justify-start">
                <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-gray-800">
                  {{ currentFilteredAnimals.length }} {{ currentFilteredAnimals.length === 1 ? 'Listing' : 'Listings' }} Found
                </h3>
              </div>

              <!-- Center - Tabs -->
              <div class="flex justify-center gap-2">
                <!-- Buy Now Tab -->
                <button 
                  @click="activeTab = 'normal'"
                  :class="`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
                    activeTab === 'normal' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md border-green-500' 
                      : 'text-gray-600 hover:text-gray-800 border-gray-200'
                  }`"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span class="hidden sm:inline">Buy Now</span>
                  <span :class="`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === 'normal' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                  }`">{{ normalListings.length }}</span>
                </button>

                <!-- Auction Tab -->
                <button 
                  @click="activeTab = 'auction'"
                  :class="`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
                    activeTab === 'auction' 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md border-amber-500' 
                      : 'text-gray-600 hover:text-gray-800 border-gray-200'
                  }`"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="hidden sm:inline">Auctions</span>
                  <span :class="`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === 'auction' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                  }`">{{ auctionListings.length }}</span>
                </button>
              </div>

              <!-- Right side - Status + Sort -->
              <div class="flex items-center justify-end gap-4">
                <!-- Auction Status (space always reserved, inline with sort) -->
                <div class="flex items-center gap-2 min-w-[160px]">
                  <div v-if="activeTab === 'auction'" class="text-xs text-gray-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1">
                    <div class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span class="hidden sm:inline">Live bidding available</span>
                    <span class="sm:hidden">Live</span>
                  </div>
                </div>

                <!-- Sort -->
                <div class="flex items-center gap-2">
                  <label class="text-xs font-semibold text-gray-700 hidden sm:inline">Sort By:</label>
                  <select v-model="sortBy" class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                    <option value="datePosted">Newest</option>
                    <option value="datePosted-asc">Oldest</option>
                    <option value="price">Price (Low)</option>
                    <option value="price-desc">Price (High)</option>
                    <option v-if="activeTab === 'auction'" value="endTime">Ending Soon</option>
                    <option v-if="activeTab === 'auction'" value="bids">Most Bids</option>
                    <option v-if="activeTab === 'auction'" value="bidActivity">Most Active</option>
                    <option value="type">Type (A-Z)</option>
                    <option value="type-desc">Type (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <!-- SCROLLABLE Content Area -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4">
              <!-- Loading State for Listings -->
              <div v-if="isLoadingListings" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                <div v-for="i in 6" :key="i" class="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden border border-white/60 shadow-sm">
                  <!-- Image skeleton -->
                  <div class="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                  
                  <!-- Content skeleton -->
                  <div class="p-4 space-y-3">
                    <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div class="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                      <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                      <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                    </div>
                    <div class="h-6 bg-gray-300 rounded animate-pulse w-32"></div>
                    <div class="flex gap-2 pt-2">
                      <div class="h-9 bg-gray-200 rounded-lg animate-pulse flex-1"></div>
                      <div class="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Card View -->
              <div 
                v-else-if="displayMode === 'card' && currentFilteredAnimals.length > 0" 
                class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
              >
                <LivestockCard
                  v-for="animal in currentFilteredAnimals"
                  :key="animal.id"
                  :animal="animal"
                  :isSidebarExpanded="isSidebarExpanded"
                  :weightUnit="weightUnit"
                  :displayMode="'card'"
                  @openModal="openModal"
                  @quantityUpdate="handleQuantityUpdate"
                />
              </div>

              <!-- Table View - Updated implementation -->
              <div v-else-if="displayMode === 'table' && currentFilteredAnimals.length > 0" class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 overflow-hidden shadow-lg">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <LivestockCard
                      v-for="(animal, index) in currentFilteredAnimals"
                      :key="animal.id"
                      :animal="animal"
                      :isSidebarExpanded="isSidebarExpanded"
                      :weightUnit="weightUnit"
                      :displayMode="'table'"
                      :showTableHeader="index === 0"
                      @openModal="openModal"
                      @quantityUpdate="handleQuantityUpdate"
                    />
                  </table>
                </div>
              </div>

              <!-- Enhanced Empty State - Only show when NOT loading and no results -->
              <div v-else-if="!isLoadingListings && currentFilteredAnimals.length === 0" class="flex flex-col items-center justify-center py-12">
                <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl">
                  <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <svg v-if="activeTab === 'auction'" class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800 mb-2">
                    {{ activeTab === 'auction' ? 'No auctions found' : 'No listings found' }}
                  </h3>
                  <p class="text-xs text-gray-500 mb-4 leading-relaxed">
                    {{ activeTab === 'auction' 
                      ? 'You don\'t have any live auctions yet. Create your first auction to start selling your livestock through bidding!'
                      : animals.length === 0 
                        ? 'You haven\'t created any livestock listings yet. Click the "Create Listing" button above to get started!'
                        : 'No livestock match your current filters. Try adjusting your search criteria or reset filters to see all listings.'
                    }}
                  </p>
                  <div class="flex flex-col sm:flex-row gap-2 justify-center">
                    <button 
                      v-if="animals.length > 0"
                      @click="resetFilters" 
                      class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center transform hover:scale-105"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Filters
                    </button>
                    
                    <!-- Quick Create Button in Empty State -->
                    <button 
                      @click="activeTab === 'auction' ? createAuction() : createListing()"
                      class="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center transform hover:scale-105"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      {{ activeTab === 'auction' ? 'Create Auction' : 'Create Listing' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Animal Details Modal - FIXED: Added @updated and @deleted handlers -->
    <AnimalDetailsModal 
      v-if="isModalOpen && selectedAnimal && !selectedAnimal.isAuction" 
      :animal="selectedAnimal"
      @close="closeModal"
      @updated="handleListingUpdated"
      @deleted="handleListingDeleted"
    />

    <!-- Auction Details Modal -->
    <AuctionDetailsModal 
      v-if="isAuctionModalOpen && selectedAnimal && selectedAnimal.isAuction" 
      :animal="selectedAnimal"
      :isOpen="isAuctionModalOpen"
      @close="closeAuctionModal"
      @placeBid="handlePlaceBid"
    />

    <!-- Create Listing Modal -->
    <CreateListingModal
      v-if="showCreateListingModal"
      :isOpen="showCreateListingModal"
      @close="closeCreateListingModal"
      @created="handleListingCreated"
      @draft="handleListingDraft"
    />

    <!-- Create Auction Modal -->
    <CreateAuctionModal
      v-if="showCreateAuctionModal"
      :isOpen="showCreateAuctionModal"
      @close="closeCreateAuctionModal"
      @created="handleAuctionCreated"
      @draft="handleAuctionDraft"
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

    <!-- Low Stock Alert Modal -->
    <div v-if="showLowStockAlert" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Stock Alert</h3>
          <p class="text-gray-600 mb-6">
            {{ lowStockMessage }}
          </p>
          <div class="flex gap-3 justify-center">
            <button 
              @click="closeLowStockAlert"
              class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors duration-200"
            >
              Close
            </button>
            <button 
              @click="goToListing"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FilterSidebar from '../../components/LivestockManagement/FilterSidebar.vue';
import AnimalDetailsModal from '../../components/LivestockManagement/AnimalModal.vue';
import AuctionDetailsModal from '../../components/LivestockManagement/AuctionModal.vue';
import LivestockCard from '../../components/LivestockManagement/LivestockCard.vue';
import CreateListingModal from '../../components/LivestockManagement/CreateListingModal.vue';
import CreateAuctionModal from '../../components/LivestockManagement/CreateAuctionModal.vue';
import type { Animal, Filters, CreateListingForm, CreateAuctionForm, QuantityUpdateData, AuctionBidData } from '../../types/managementTypes';
import { LivestockService } from '../../services/livestockService';
import { supabase } from '@/supabase';

const router = useRouter();

// Auth state
const currentUser = ref<any>(null);
const isLoading = ref(true);
const isLoadingListings = ref(false);

// Check if user is a farmer
const isFarmerUser = computed(() => {
  return currentUser.value?.role === 'Farmer';
});

const showToast = ref(false);
const toastMessage = ref('');

// Low stock alert states
const showLowStockAlert = ref(false);
const lowStockMessage = ref('');
const alertAnimalId = ref('');

const isModalOpen = ref(false);
const isAuctionModalOpen = ref(false);
const selectedAnimal = ref<Animal | null>(null);

// Create modal states
const showCreateListingModal = ref(false);
const showCreateAuctionModal = ref(false);

const activeTab = ref<'normal' | 'auction'>('normal');
const displayMode = ref<'card' | 'table'>('card');

const isSidebarExpanded = ref(true);
const sortBy = ref('datePosted');
const weightUnit = ref('kg');
const filtersReady = ref(true);

const filters = ref<Filters>({
  search: '',
  types: [],
  breeds: [],
  locations: [],
  priceRanges: [],
  genders: [],
  healthStatuses: [],
  auctionStatuses: [],
  endTimeRanges: [],
  bidCountMin: null,
  bidCountMax: null,
  startingBidRanges: [],
  auctionDurations: [],
  bidActivities: []
});

// Data from backend
const animals = ref<Animal[]>([]);

// Load current user
const loadUser = async () => {
  try {
    isLoading.value = true;
    console.log('🔐 Loading user authentication...');
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ No authenticated user found');
      currentUser.value = null;
      isLoading.value = false;
      return;
    }

    console.log('✅ User authenticated:', user.id);

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('❌ Error loading profile:', profileError);
      currentUser.value = null;
      isLoading.value = false;
      return;
    }

    if (profile) {
      // Normalize role to handle case inconsistencies
      const normalizedRole = profile.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1).toLowerCase() : null;
      
      currentUser.value = {
        id: user.id,
        email: user.email,
        role: normalizedRole,
        firstName: profile.first_name,
        lastName: profile.last_name,
        name: profile.first_name && profile.last_name 
          ? `${profile.first_name} ${profile.last_name}`.trim()
          : profile.username || user.email,
      };
      
      console.log('✅ User profile loaded. Role:', normalizedRole);
    } else {
      console.log('❌ No profile found for user');
      currentUser.value = null;
    }
  } catch (error) {
    console.error('❌ Error in loadUser:', error);
    currentUser.value = null;
  } finally {
    isLoading.value = false;
    console.log('🔓 Authentication check complete. Loading:', isLoading.value, 'Is Farmer:', isFarmerUser.value);
  }
};

// Load livestock listings
const loadListings = async () => {
  if (!isFarmerUser.value) {
    console.log('⏭️ Skipping listings load - user is not a farmer');
    return;
  }

  isLoadingListings.value = true;
  try {
    console.log('📋 Loading livestock listings...');
    
    const result = await LivestockService.getMyListings();

    if (result.success && result.data) {
      animals.value = result.data;
      console.log(`✅ Loaded ${result.data.length} listings`);
    } else {
      console.error('❌ Error loading listings:', result.error);
      showToastNotification('Failed to load listings: ' + (result.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('❌ Error in loadListings:', error);
    showToastNotification('Failed to load listings');
  } finally {
    isLoadingListings.value = false;
  }
};

// Computed properties
const normalListings = computed(() => animals.value.filter(animal => !animal.isAuction));
const auctionListings = computed(() => animals.value.filter(animal => animal.isAuction));

// Calculate total value of all listings
const totalValue = computed(() => {
  return animals.value.reduce((total, animal) => {
    if (animal.isAuction) {
      return total + (animal.currentBid || animal.startingBid || 0) * animal.quantity;
    }
    return total + animal.price * animal.quantity;
  }, 0);
});

const uniqueTypes = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  return Array.from(new Set(currentAnimals.map(animal => animal.type))).sort();
});

const uniqueBreeds = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  return Array.from(new Set(currentAnimals.map(animal => animal.breed))).sort();
});

const uniqueLocations = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  return Array.from(new Set(currentAnimals.map(animal => animal.location))).sort();
});

const uniqueHealthStatuses = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  const allHealthStatuses = currentAnimals.flatMap(animal => animal.healthStatus || []);
  return Array.from(new Set(allHealthStatuses)).sort();
});

// Helper functions
const getAuctionStatus = (animal: Animal): string => {
  if (!animal.isAuction || !animal.endTime) return 'Unknown';
  const now = new Date().getTime();
  const endTime = new Date(animal.endTime).getTime();
  const timeLeft = endTime - now;
  if (timeLeft <= 0) return 'Ended';
  if (timeLeft <= 3600000) return 'Ending Soon';
  if (animal.bidCount && animal.bidCount >= 10) return 'Hot Auction';
  if (animal.datePosted && new Date(animal.datePosted).getTime() > now - 86400000) return 'New Listing';
  return 'Live';
};

const getAuctionDurationCategory = (animal: Animal): string => {
  if (!animal.isAuction || !animal.auctionStartTime || !animal.endTime) return 'unknown';
  const startTime = new Date(animal.auctionStartTime).getTime();
  const endTime = new Date(animal.endTime).getTime();
  const days = (endTime - startTime) / (1000 * 60 * 60 * 24);
  if (days <= 3) return '1-3d';
  if (days <= 7) return '3-7d';
  if (days <= 14) return '7-14d';
  return '14d+';
};

const getBidActivityCategory = (animal: Animal): string => {
  const bidCount = animal.bidCount || 0;
  if (bidCount === 0) return 'No Bids Yet';
  if (bidCount <= 5) return 'Low Activity (1-5 bids)';
  if (bidCount <= 10) return 'Moderate Activity (5-10 bids)';
  return 'High Activity (10+ bids)';
};

// Filtering & Sorting
const currentFilteredAnimals = computed(() => {
  const currentAnimals = activeTab.value === 'auction' ? auctionListings.value : normalListings.value;
  let filtered = currentAnimals.filter(animal => {
    const searchLower = filters.value.search.toLowerCase();
    const matchesSearch =
      !filters.value.search ||
      animal.type.toLowerCase().includes(searchLower) ||
      animal.breed.toLowerCase().includes(searchLower) ||
      animal.description.toLowerCase().includes(searchLower) ||
      animal.title.toLowerCase().includes(searchLower) ||
      (animal.farmer.farmName && animal.farmer.farmName.toLowerCase().includes(searchLower)) ||
      animal.farmer.name.toLowerCase().includes(searchLower);

    const matchesType = filters.value.types.length === 0 || filters.value.types.includes(animal.type);
    const matchesBreed = filters.value.breeds.length === 0 || filters.value.breeds.includes(animal.breed);
    const matchesLocation = filters.value.locations.length === 0 || filters.value.locations.includes(animal.location);
    const matchesGender = filters.value.genders.length === 0 || filters.value.genders.includes(animal.gender);
    
    const healthStatuses = Array.isArray(filters.value.healthStatuses) ? filters.value.healthStatuses : [];
    const matchesHealthStatus = healthStatuses.length === 0 || 
      healthStatuses.some(status => animal.healthStatus?.includes(status));

    let matchesPrice = true;
    if (filters.value.priceRanges.length > 0) {
      matchesPrice = filters.value.priceRanges.some(range => {
        const [min, max] = range.split('-');
        const animalPrice = animal.isAuction ? (animal.currentBid || animal.startingBid || 0) : animal.price;
        if (max) {
          return animalPrice >= parseInt(min) && animalPrice <= parseInt(max);
        } else {
          return animalPrice >= parseInt(min.replace('+', ''));
        }
      });
    }

    if (activeTab.value === 'auction' && animal.isAuction) {
      if (filters.value.auctionStatuses.length > 0) {
        const animalStatus = getAuctionStatus(animal);
        if (!filters.value.auctionStatuses.includes(animalStatus)) return false;
      }

      if (filters.value.endTimeRanges.length > 0) {
        const now = new Date().getTime();
        const endTime = animal.endTime ? new Date(animal.endTime).getTime() : 0;
        const timeLeft = endTime - now;
        const hoursLeft = timeLeft / (1000 * 60 * 60);

        const matchesEndTime = filters.value.endTimeRanges.some(range => {
          switch (range) {
            case '0-1h': return hoursLeft <= 1;
            case '0-3h': return hoursLeft <= 3;
            case '0-6h': return hoursLeft <= 6;
            case '0-12h': return hoursLeft <= 12;
            case '0-24h': return hoursLeft <= 24;
            case '24h+': return hoursLeft > 24;
            default: return false;
          }
        });

        if (!matchesEndTime) return false;
      }

      const bidCount = animal.bidCount || 0;
      if (filters.value.bidCountMin !== null && bidCount < filters.value.bidCountMin) return false;
      if (filters.value.bidCountMax !== null && bidCount > filters.value.bidCountMax) return false;

      if (filters.value.startingBidRanges.length > 0) {
        const startingBid = animal.startingBid || 0;
        const matchesStartingBid = filters.value.startingBidRanges.some(range => {
          const [min, max] = range.split('-');
          if (max) {
            return startingBid >= parseInt(min) && startingBid <= parseInt(max);
          } else {
            return startingBid >= parseInt(min.replace('+', ''));
          }
        });
        if (!matchesStartingBid) return false;
      }

      if (filters.value.auctionDurations.length > 0) {
        const durationCategory = getAuctionDurationCategory(animal);
        if (!filters.value.auctionDurations.includes(durationCategory)) return false;
      }

      if (filters.value.bidActivities.length > 0) {
        const activityCategory = getBidActivityCategory(animal);
        if (!filters.value.bidActivities.includes(activityCategory)) return false;
      }
    }

    return matchesSearch && matchesType && matchesBreed && matchesLocation && matchesPrice && matchesGender && matchesHealthStatus;
  });

  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'datePosted': return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'datePosted-asc': return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
      case 'price': {
        const aPrice = a.isAuction ? (a.currentBid || a.startingBid || 0) : a.price;
        const bPrice = b.isAuction ? (b.currentBid || b.startingBid || 0) : b.price;
        return aPrice - bPrice;
      }
      case 'price-desc': {
        const aPriceDesc = a.isAuction ? (a.currentBid || a.startingBid || 0) : a.price;
        const bPriceDesc = b.isAuction ? (b.currentBid || b.startingBid || 0) : b.price;
        return bPriceDesc - aPriceDesc;
      }
      case 'endTime':
        if (a.endTime && b.endTime) return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        return 0;
      case 'bids': return (b.bidCount || 0) - (a.bidCount || 0);
      case 'bidActivity': return (b.bidCount || 0) - (a.bidCount || 0);
      case 'type': return a.type.localeCompare(b.type);
      case 'type-desc': return b.type.localeCompare(a.type);
      default: return 0;
    }
  });
});

// Methods
const toggleSidebar = () => (isSidebarExpanded.value = !isSidebarExpanded.value);

const handleFiltersChanged = (newFilters: Filters) => {
  filters.value = { ...newFilters };
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 4000);
};

const openModal = (animal: Animal) => {
  selectedAnimal.value = animal;
  if (animal.isAuction) {
    isAuctionModalOpen.value = true;
  } else {
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedAnimal.value = null;
};

const closeAuctionModal = () => {
  isAuctionModalOpen.value = false;
  selectedAnimal.value = null;
};

const resetFilters = () => {
  filters.value = {
    search: '',
    types: [],
    breeds: [],
    locations: [],
    priceRanges: [],
    genders: [],
    healthStatuses: [],
    auctionStatuses: [],
    endTimeRanges: [],
    bidCountMin: null,
    bidCountMax: null,
    startingBidRanges: [],
    auctionDurations: [],
    bidActivities: []
  };
  sortBy.value = 'datePosted';
  showToastNotification('All filters have been reset');
};

// Navigation methods
const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};

// Create methods
const createListing = () => {
  showCreateListingModal.value = true;
};

const createAuction = () => {
  showToastNotification(LivestockService.getAuctionUnavailableMessage());
};

const closeCreateListingModal = () => {
  showCreateListingModal.value = false;
};

const closeCreateAuctionModal = () => {
  showCreateAuctionModal.value = false;
};

// Quantity update handler
const handleQuantityUpdate = async (data: QuantityUpdateData) => {
  const result = await LivestockService.updateQuantity(data);
  
  if (result.success) {
    await loadListings();
    
    let operationMessage = '';
    switch (data.operation) {
      case 'sold':
        operationMessage = `Successfully recorded sale! ${data.newQuantity} items remaining.`;
        break;
      case 'restocked':
        operationMessage = `Stock replenished! Updated quantity to ${data.newQuantity} items.`;
        break;
      case 'updated':
        operationMessage = `Quantity updated to ${data.newQuantity} items.`;
        break;
    }
    
    showToastNotification(operationMessage);
  } else {
    showToastNotification('Failed to update quantity: ' + (result.error || 'Unknown error'));
  }
};

// Low stock alert handlers
const closeLowStockAlert = () => {
  showLowStockAlert.value = false;
  lowStockMessage.value = '';
  alertAnimalId.value = '';
};

const goToListing = () => {
  const animal = animals.value.find(a => String(a.id) === alertAnimalId.value);
  if (animal) {
    openModal(animal);
  }
  closeLowStockAlert();
};

// CRUD Handlers
const handleListingCreated = async () => {
  showToastNotification('Listing created successfully!');
  closeCreateListingModal();
  await loadListings();
};

const handleListingDraft = (listingData: CreateListingForm) => {
  showToastNotification(`Draft saved for "${listingData.title}"`);
  closeCreateListingModal();
};

// NEW: Handler for when a listing is updated
const handleListingUpdated = async () => {
  console.log('📝 Listing updated, reloading listings...');
  showToastNotification('Listing updated successfully!');
  closeModal();
  await loadListings();
};

// NEW: Handler for when a listing is deleted
const handleListingDeleted = async () => {
  console.log('🗑️ Listing deleted, reloading listings...');
  showToastNotification('Listing deleted successfully!');
  closeModal();
  await loadListings();
};

const handleAuctionCreated = (auctionData: CreateAuctionForm) => {
  showToastNotification(LivestockService.getAuctionUnavailableMessage());
  closeCreateAuctionModal();
};

const handleAuctionDraft = (auctionData: CreateAuctionForm) => {
  showToastNotification(LivestockService.getAuctionUnavailableMessage());
  closeCreateAuctionModal();
};

const handlePlaceBid = (bidData: AuctionBidData) => {
  showToastNotification(LivestockService.getAuctionUnavailableMessage());
};

// Lifecycle
onMounted(async () => {
  console.log('🚀 Component mounted, starting authentication check...');
  await loadUser();
  
  if (isFarmerUser.value) {
    await loadListings();
  }
});
</script>