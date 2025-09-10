<!-- FilterSidebar.vue -->
<template>
  <div :class="`${isExpanded ? 'w-full md:w-52 lg:w-56' : 'w-14'} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative transition-all duration-300 ease-in-out`">
    <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-emerald-50/20"></div>

    <!-- Toggle Button integrated into filter logo -->
    <div 
      @click="toggleSidebar"
      class="absolute inset-0 flex items-center justify-center cursor-pointer group z-20"
      v-if="!isExpanded"
    >
      <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
        </svg>
      </div>
    </div>

    <div class="relative h-full flex flex-col">
      <!-- Expanded View -->
      <div v-if="isExpanded" class="h-full flex flex-col">
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
              <input v-model="localFilters.search" type="text" class="block w-full pl-8 pr-2 py-1.5 border border-green-200 rounded-md text-xs bg-green-50/30 focus:ring-2 focus:ring-green-500/50" placeholder="Search..." />
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
              <span v-if="localFilters.search" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">
                "{{ localFilters.search }}"
              </span>
              <span v-for="type in localFilters.types" :key="type" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ type }}</span>
              <span v-for="breed in localFilters.breeds" :key="breed" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ breed }}</span>
              <span v-for="location in localFilters.locations" :key="location" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ location }}</span>
              <span v-for="priceRange in localFilters.priceRanges" :key="priceRange" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ formatPriceRange(priceRange) }}</span>
              <span v-for="gender in localFilters.genders" :key="gender" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ gender }}</span>
              <span v-for="health in localFilters.healthStatuses" :key="health" class="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] rounded-full font-medium">{{ health }}</span>
              <!-- Auction-specific filters -->
              <span v-for="status in localFilters.auctionStatuses" :key="status" class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded-full font-medium">{{ status }}</span>
              <span v-for="timeRange in localFilters.endTimeRanges" :key="timeRange" class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded-full font-medium">{{ formatTimeRange(timeRange) }}</span>
              <span v-if="localFilters.bidCountMin" class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded-full font-medium">Min Bids: {{ localFilters.bidCountMin }}</span>
              <span v-if="localFilters.bidCountMax" class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded-full font-medium">Max Bids: {{ localFilters.bidCountMax }}</span>
            </div>
          </div>
        </div>

        <!-- Scrollable Filters Area -->
        <div class="flex-1 overflow-y-auto p-3">
          <!-- Compact Filter Group -->
          <div class="space-y-3">
            <!-- Animal Type Checkboxes - Enhanced with icons -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-7 7a2 2 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Animal Type
              </h3>
              <div class="space-y-1 max-h-32 overflow-y-auto">
                <label v-for="type in uniqueTypes" :key="type" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="type" 
                    v-model="localFilters.types" 
                    class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  >
                  <span class="flex items-center gap-1.5">
                    <span class="w-4 h-4 flex items-center justify-center">
                      <svg v-if="type === 'Cattle'" class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3"/>
                      </svg>
                      <svg v-else class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <span class="truncate">{{ type }}</span>
                  </span>
                </label>
              </div>
            </div>

            <!-- Breed Checkboxes -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Breed
              </h3>
              <div class="space-y-1 max-h-32 overflow-y-auto">
                <label v-for="breed in uniqueBreeds" :key="breed" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="breed" 
                    v-model="localFilters.breeds" 
                    class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  >
                  <span class="truncate">{{ breed }}</span>
                </label>
              </div>
            </div>

            <!-- Location Dropdown -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </h3>
              <select 
                @change="handleLocationChange($event)"
                class="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-white"
              >
                <option value="">Select a location</option>
                <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
              </select>
              <!-- Show selected locations -->
              <div v-if="localFilters.locations.length > 0" class="mt-2 space-y-1">
                <div v-for="location in localFilters.locations" :key="location" class="flex items-center justify-between text-xs bg-green-50 px-2 py-1 rounded">
                  <span>{{ location }}</span>
                  <button @click="removeLocation(location)" class="text-red-500 hover:text-red-700">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Price Range Checkboxes -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Price Range
              </h3>
              <div class="space-y-1">
                <label v-for="(range, index) in priceRanges" :key="index" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="range.value" 
                    v-model="localFilters.priceRanges" 
                    class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  >
                  <span class="truncate">{{ range.label }}</span>
                </label>
              </div>
            </div>

            <!-- Gender Checkboxes -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Gender
              </h3>
              <div class="space-y-1">
                <label v-for="gender in genders" :key="gender" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="gender" 
                    v-model="localFilters.genders" 
                    class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  >
                  <span class="truncate">{{ gender }}</span>
                </label>
              </div>
            </div>

            <!-- Health Status Checkboxes -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
              <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Health Status
              </h3>
              <div class="space-y-1 max-h-32 overflow-y-auto">
                <label v-for="health in uniqueHealthStatuses" :key="health" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="health" 
                    v-model="localFilters.healthStatuses" 
                    class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  >
                  <span class="truncate">{{ health }}</span>
                </label>
              </div>
            </div>

            <!-- NEW: Auction-Specific Filters (Only show when auction tab is active) -->
            <div v-if="activeTab === 'auction'" class="space-y-3">
              <!-- Auction Status -->
              <div class="bg-amber-50/80 backdrop-blur-sm rounded-lg p-2 border border-amber-200">
                <h3 class="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Auction Status
                </h3>
                <div class="space-y-1">
                  <label v-for="status in auctionStatuses" :key="status" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-amber-50/50 p-1 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      :value="status" 
                      v-model="localFilters.auctionStatuses" 
                      class="h-3 w-3 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                    >
                    <span class="truncate">{{ status }}</span>
                  </label>
                </div>
              </div>

              <!-- Time Remaining -->
              <div class="bg-amber-50/80 backdrop-blur-sm rounded-lg p-2 border border-amber-200">
                <h3 class="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Time Remaining
                </h3>
                <div class="space-y-1">
                  <label v-for="timeRange in endTimeRanges" :key="timeRange.value" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-amber-50/50 p-1 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      :value="timeRange.value" 
                      v-model="localFilters.endTimeRanges" 
                      class="h-3 w-3 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                    >
                    <span class="truncate">{{ timeRange.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Bid Count Range -->
              <div class="bg-amber-50/80 backdrop-blur-sm rounded-lg p-2 border border-amber-200">
                <h3 class="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  Number of Bids
                </h3>
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <div class="flex-1">
                      <label class="block text-xs text-gray-600 mb-1">Min Bids</label>
                      <input 
                        type="number" 
                        v-model.number="localFilters.bidCountMin"
                        min="0"
                        placeholder="0"
                        class="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white"
                      >
                    </div>
                    <div class="flex-1">
                      <label class="block text-xs text-gray-600 mb-1">Max Bids</label>
                      <input 
                        type="number" 
                        v-model.number="localFilters.bidCountMax"
                        min="0"
                        placeholder="∞"
                        class="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Starting Bid Range -->
              <div class="bg-amber-50/80 backdrop-blur-sm rounded-lg p-2 border border-amber-200">
                <h3 class="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Starting Bid Range
                </h3>
                <div class="space-y-1">
                  <label v-for="(range, index) in startingBidRanges" :key="index" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-amber-50/50 p-1 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      :value="range.value" 
                      v-model="localFilters.startingBidRanges" 
                      class="h-3 w-3 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                    >
                    <span class="truncate">{{ range.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Auction Duration -->
              <div class="bg-amber-50/80 backdrop-blur-sm rounded-lg p-2 border border-amber-200">
                <h3 class="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Auction Duration
                </h3>
                <div class="space-y-1">
                  <label v-for="duration in auctionDurations" :key="duration.value" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-amber-50/50 p-1 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      :value="duration.value" 
                      v-model="localFilters.auctionDurations" 
                      class="h-3 w-3 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                    >
                    <span class="truncate">{{ duration.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Bid Activity -->
              <div class="bg-amber-50/80 backdrop-blur-sm rounded-lg p-2 border border-amber-200">
                <h3 class="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Bid Activity
                </h3>
                <div class="space-y-1">
                  <label v-for="activity in bidActivities" :key="activity" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-amber-50/50 p-1 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      :value="activity" 
                      v-model="localFilters.bidActivities" 
                      class="h-3 w-3 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                    >
                    <span class="truncate">{{ activity }}</span>
                  </label>
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
import { computed, ref, watch } from 'vue';

interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  locations: string[];
  priceRanges: string[];
  genders: string[];
  healthStatuses: string[];
  // Auction-specific filters
  auctionStatuses: string[];
  endTimeRanges: string[];
  bidCountMin: number | null;
  bidCountMax: number | null;
  startingBidRanges: string[];
  auctionDurations: string[];
  bidActivities: string[];
}

const props = defineProps<{
  isExpanded: boolean;
  filters: Filters;
  activeTab: 'normal' | 'auction';
  uniqueTypes: string[];
  uniqueBreeds: string[];
  uniqueLocations: string[];
  uniqueHealthStatuses: string[];
}>();

const emit = defineEmits<{
  toggleSidebar: [];
  filtersChanged: [filters: Filters];
  resetFilters: [];
}>();

// Local copy of filters to avoid direct mutation
const localFilters = ref<Filters>({ ...props.filters });

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters };
}, { deep: true });

// Watch for local filter changes and emit them
watch(localFilters, (newFilters) => {
  emit('filtersChanged', { ...newFilters });
}, { deep: true });

// Filter options
const priceRanges = ref([
  { label: 'Below ₱5K', value: '0-5000' },
  { label: '₱5K - ₱20K', value: '5000-20000' },
  { label: '₱20K - ₱50K', value: '20000-50000' },
  { label: '₱50K - ₱100K', value: '50000-100000' },
  { label: 'Above ₱100K', value: '100000+' }
]);

const genders = ref(['Male', 'Female', 'Mixed']);

// Auction-specific filter options
const auctionStatuses = ref(['Live', 'Ending Soon', 'New Listing', 'Hot Auction']);

const endTimeRanges = ref([
  { label: 'Ending in 1 hour', value: '0-1h' },
  { label: 'Ending in 3 hours', value: '0-3h' },
  { label: 'Ending in 6 hours', value: '0-6h' },
  { label: 'Ending in 12 hours', value: '0-12h' },
  { label: 'Ending in 24 hours', value: '0-24h' },
  { label: 'More than 1 day', value: '24h+' }
]);

const startingBidRanges = ref([
  { label: 'Below ₱10K', value: '0-10000' },
  { label: '₱10K - ₱30K', value: '10000-30000' },
  { label: '₱30K - ₱60K', value: '30000-60000' },
  { label: '₱60K - ₱100K', value: '60000-100000' },
  { label: 'Above ₱100K', value: '100000+' }
]);

const auctionDurations = ref([
  { label: 'Quick (1-3 days)', value: '1-3d' },
  { label: 'Standard (3-7 days)', value: '3-7d' },
  { label: 'Extended (1-2 weeks)', value: '7-14d' },
  { label: 'Long term (2+ weeks)', value: '14d+' }
]);

const bidActivities = ref(['High Activity (10+ bids)', 'Moderate Activity (5-10 bids)', 'Low Activity (1-5 bids)', 'No Bids Yet']);

// Computed properties
const hasActiveFilters = computed(() => {
  return localFilters.value.search !== '' || 
    localFilters.value.types.length > 0 || 
    localFilters.value.breeds.length > 0 || 
    localFilters.value.locations.length > 0 || 
    localFilters.value.priceRanges.length > 0 || 
    localFilters.value.genders.length > 0 ||
    localFilters.value.healthStatuses.length > 0 ||
    // Auction filters
    localFilters.value.auctionStatuses.length > 0 ||
    localFilters.value.endTimeRanges.length > 0 ||
    localFilters.value.bidCountMin !== null ||
    localFilters.value.bidCountMax !== null ||
    localFilters.value.startingBidRanges.length > 0 ||
    localFilters.value.auctionDurations.length > 0 ||
    localFilters.value.bidActivities.length > 0;
});

// Methods
const toggleSidebar = () => {
  emit('toggleSidebar');
};

const resetFilters = () => {
  localFilters.value = {
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
  emit('resetFilters');
};

const handleLocationChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedLocation = target.value;
  
  if (selectedLocation && !localFilters.value.locations.includes(selectedLocation)) {
    localFilters.value.locations.push(selectedLocation);
  }
  
  // Reset dropdown
  target.value = '';
};

const removeLocation = (locationToRemove: string) => {
  localFilters.value.locations = localFilters.value.locations.filter(
    location => location !== locationToRemove
  );
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

const formatTimeRange = (range: string) => {
  switch (range) {
    case '0-1h': return 'Ending in 1 hour';
    case '0-3h': return 'Ending in 3 hours';
    case '0-6h': return 'Ending in 6 hours';
    case '0-12h': return 'Ending in 12 hours';
    case '0-24h': return 'Ending in 24 hours';
    case '24h+': return 'More than 1 day';
    default: return range;
  }
};

</script>