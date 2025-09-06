<!-- yourLivestock.vue -->
<template>
  <div
    class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse"
        style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse"
        style="animation-delay: 0.5s"></div>
    </div>

    <!-- DYNAMIC COMBINED HEADER -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div
        class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Return button, Logo and Title -->
        <div class="flex items-center min-w-0">
          <!-- Return Button -->
          <button @click="goBack"
            class="mr-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                opacity="0.3" />
              <path
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              <path
                d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                fill="#fff" />
              <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
              <path
                d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"
                fill="#4ade80" />
              <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#fff" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate">My Livestock Listings</h1>
            <p class="text-green-100 text-sm opacity-90 truncate">
              Manage your animal listings and track their status
            </p>
          </div>
        </div>

        <!-- Right side - Dynamic Content Area -->
        <div class="flex-1 flex justify-end min-w-0">
          <!-- View Toggle Button -->
          <div class="flex items-center gap-3">
            <button @click="toggleView"
              class="whitespace-nowrap bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path v-if="viewMode === 'table'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {{ viewMode === 'table' ? 'Card View' : 'Table View' }}
            </button>

            <!-- Add New Livestock Button -->
            <button @click="handleAddNew"
              class="whitespace-nowrap bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
              Create Listing
            </button>

            <button
              class="whitespace-nowrap bg-gradient-to-r from-amber-500/80 to-orange-500/80 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
              Create Auction
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Overview Cards -->
    <div class="sticky top-0 z-30 px-4 md:px-6 py-4 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <!-- Total Listings -->
        <div
          class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs md:text-sm font-medium text-gray-600">Total Listings</p>
              <p class="text-xl md:text-2xl font-bold text-gray-900">
                {{ farmerAnimals.length }}
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
                {{farmerAnimals.filter(a => a.status === 'Available').length}}
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
                {{farmerAnimals.filter(a => a.status === 'Low Stock').length}}
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
                {{farmerAnimals.filter(a => a.status === 'Out of Stock' || a.status === 'No stock').length}}
              </p>
            </div>
            <div class="p-2 bg-red-100/80 rounded-lg">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content with Sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Enhanced Filters Sidebar with Collapse/Expand -->
      <div
        :class="`${isSidebarExpanded ? 'w-full md:w-52 lg:w-56' : 'w-14'} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative transition-all duration-300 ease-in-out`">
        <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-emerald-50/20"></div>

        <!-- Toggle Button integrated into filter logo -->
        <div @click="toggleSidebar" class="absolute inset-0 flex items-center justify-center cursor-pointer group z-20"
          v-if="!isSidebarExpanded">
          <div
            class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
            </svg>
          </div>
        </div>

        <div class="relative h-full flex flex-col">
          <!-- Expanded View -->
          <div v-if="isSidebarExpanded" class="h-full flex flex-col">
            <!-- Header with integrated close button -->
            <div class="flex justify-between items-center p-3 border-b border-green-100/50">
              <h2
                class="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-1">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 10h18M3 16h18M3 22h18" />
                </svg>
                Filters
              </h2>
              <div class="flex gap-1">
                <button @click="resetFilters"
                  class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
                <button @click="toggleSidebar"
                  class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition flex items-center gap-1">
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
                  <input v-model="filters.search" type="text"
                    class="block w-full pl-8 pr-2 py-1.5 border border-green-200 rounded-md text-xs bg-green-50/30 focus:ring-2 focus:ring-green-500/50"
                    placeholder="Search..." />
                  <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg class="h-3 w-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Active Filters -->
              <div v-if="hasActiveFilters"
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-md p-2 border border-green-200">
                <div class="flex flex-wrap gap-1">
                  <span v-if="filters.search"
                    class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">
                    "{{ filters.search }}"
                  </span>
                  <span v-for="type in filters.types" :key="type"
                    class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ type
                    }}</span>
                  <span v-for="breed in filters.breeds" :key="breed"
                    class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ breed
                    }}</span>
                  <span v-for="status in filters.statuses" :key="status"
                    class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ status
                    }}</span>
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
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-7 7a2 2 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Animal Type
                  </h3>
                  <div class="space-y-1 max-h-32 overflow-y-auto">
                    <label v-for="type in uniqueTypes" :key="type"
                      class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                      <input type="checkbox" :value="type" v-model="filters.types"
                        class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500">
                      <span class="flex items-center gap-1.5">
                        <span class="w-4 h-4 flex items-center justify-center">
                          <svg v-if="type === 'Cattle'" class="w-3 h-3 text-green-600" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                              opacity="0.3" />
                            <path
                              d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                            <path
                              d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                              fill="#dc2626" />
                            <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
                            <path
                              d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"
                              fill="#dc2626" />
                            <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#dc2626" />
                          </svg>
                          <svg v-else-if="type === 'Sheep'" class="w-3 h-3 text-gray-600" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                              opacity="0.3" />
                            <path
                              d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                            <path
                              d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                              fill="#6b7280" />
                            <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
                            <path
                              d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"
                              fill="#6b7280" />
                            <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#6b7280" />
                          </svg>
                          <svg v-else class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Breed
                  </h3>
                  <div class="space-y-1 max-h-32 overflow-y-auto">
                    <label v-for="breed in uniqueBreeds" :key="breed"
                      class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                      <input type="checkbox" :value="breed" v-model="filters.breeds"
                        class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500">
                      <span class="truncate">{{ breed }}</span>
                    </label>
                  </div>
                </div>

                <!-- Status Checkboxes -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 01118 0z" />
                    </svg>
                    Status
                  </h3>
                  <div class="space-y-1">
                    <label v-for="status in statusOptions" :key="status"
                      class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                      <input type="checkbox" :value="status" v-model="filters.statuses"
                        class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500">
                      <span class="truncate">{{ status }}</span>
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
              <div
                class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800">
                  {{ filteredAnimals.length }} {{ filteredAnimals.length === 1 ? 'Listing' : 'Listings' }} Found
                </h3>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <!-- Sort By Filter -->
              <div class="flex items-center gap-2">
                <label class="text-xs font-semibold text-gray-700">Sort By:</label>
                <select v-model="sortBy"
                  class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
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
        </div>

        <!-- SCROLLABLE Cards Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4">
            <!-- Table View -->
            <div v-if="viewMode === 'table' && filteredAnimals.length > 0" class="h-full flex flex-col">
              <div class="overflow-x-auto flex-1 min-h-0">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                        Listing Title
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                        Animal Details
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                        Price
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                        Status
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                        Date Posted
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-for="(animal, index) in filteredAnimals" :key="animal.id"
                      :class="['hover:bg-green-50 transition-colors', index % 2 === 0 ? 'bg-white' : 'bg-gray-50']">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-12 w-12 mr-4">
                            <img :src="getImageSource(animal.images)" alt="Animal"
                              class="h-12 w-12 rounded-lg object-cover border-2 border-gray-200 hover:border-green-500 transition-all cursor-pointer shadow-sm" />
                          </div>
                          <div>
                            <div class="text-sm font-medium text-gray-900">{{ animal.title }}</div>
                            <div class="text-xs text-green-600 font-semibold">{{ animal.type }} - {{ animal.breed }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">Weight: {{ animal.weight }} kg</div>
                        <div class="text-xs text-gray-500">Age: {{ animal.age }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-bold text-gray-900">₱{{ animal.price.toLocaleString() }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="`px-2 py-1 text-xs font-bold rounded-full ${getStatusClass(animal.status)}`">
                          {{ animal.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(animal.datePosted) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex justify-end gap-2">
                          <button @click="handleView(animal)"
                            class="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-all focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button @click="handleEdit(animal)"
                            class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button @click="handleDelete(animal.id)"
                            class="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Card View with 4 Cards Per Row -->
            <div v-else-if="viewMode === 'card' && filteredAnimals.length > 0"
              class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="animal in filteredAnimals" :key="animal.id"
                class="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-white/60 hover:border-green-300/60 transition-all duration-300 bg-white/95 backdrop-blur-sm flex flex-col h-full group">

                <!-- Premium Image Section -->
                <div class="relative h-48 overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10 z-10">
                  </div>
                  <img :src="getImageSource(animal.images)" :alt="animal.type"
                    class="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
                    loading="lazy" />

                  <!-- Status Badge - Top Right -->
                  <div class="absolute top-3 right-3 z-20">
                    <span
                      :class="`px-2 py-1 text-xs font-bold rounded-full shadow backdrop-blur-md border ${getStatusClass(animal.status)}`">
                      {{ animal.status }}
                    </span>
                  </div>

                  <!-- Types Badge on Image - Top Left -->
                  <div class="absolute top-3 left-3 z-20">
                    <div
                      :class="`px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-white/40 flex items-center gap-1.5 ${getTypeBadgeClassForImage(animal.type)}`">
                      <span class="w-3 h-3 flex items-center justify-center">
                        <svg v-if="animal.type === 'Cattle'" class="w-3 h-3 text-current" fill="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                            opacity="0.3" />
                          <path
                            d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        </svg>
                        <svg v-else-if="animal.type === 'Buffalo'" class="w-3 h-3 text-current" fill="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                            opacity="0.3" />
                        </svg>
                        <svg v-else class="w-3 h-3 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <span class="text-xs font-bold text-white">{{ animal.type }}</span>
                    </div>
                  </div>

                  <!-- Price Badge on Image - Bottom Right -->
                  <div class="absolute bottom-3 right-3 z-20">
                    <div
                      class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-1">
                      <span class="text-sm font-black">₱ {{ animal.price.toLocaleString() }}</span>
                    </div>
                  </div>

                  <!-- Quick View Overlay -->
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm z-15">
                    <button @click="handleView(animal)"
                      class="bg-white/95 backdrop-blur-md text-gray-800 px-3 py-2 rounded-lg font-semibold shadow hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm border border-white/40 hover:bg-white">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Quick View
                    </button>
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-4 flex-1 flex flex-col">
                  <!-- Header with Title and Date -->
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1 pr-3">
                      <h3 class="font-bold text-sm text-emerald-700 mb-1 leading-tight line-clamp-2">
                        {{ animal.title }}
                      </h3>
                    </div>

                    <div class="flex flex-col items-end text-right min-w-0">
                      <div class="text-xs text-gray-500 flex items-center gap-1 mb-1">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{{ formatDate(animal.datePosted) }}</span>
                      </div>
                      <!-- Location -->
                      <div class="text-xs text-gray-500 flex items-center gap-1">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="truncate max-w-[100px]">{{ animal.location }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Stats Section -->
                  <div class="mb-4">
                    <div :class="`grid gap-1.5 ${isSidebarExpanded ? 'grid-cols-2' : 'grid-cols-2'}`">
                      <!-- Quantity -->
                      <div
                        :class="`bg-blue-50 rounded-md border border-blue-200/60 flex items-center justify-center gap-1 relative group/quantity ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
                        <svg :class="`text-blue-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <p :class="`font-bold text-blue-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{
                          animal.quantity }}</p>
                      </div>

                      <!-- Weight -->
                      <div
                        :class="`bg-purple-50 rounded-md border border-purple-200/60 flex items-center justify-center gap-1 relative group/weight ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
                        <svg :class="`text-purple-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                        </svg>
                        <p :class="`font-bold text-purple-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{
                          animal.weight }}</p>
                      </div>

                      <!-- Gender -->
                      <div
                        :class="`bg-pink-50 rounded-md border border-pink-200/60 flex items-center justify-center gap-1 relative group/gender ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
                        <svg :class="`text-pink-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p :class="`font-bold text-pink-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{
                          animal.gender }}</p>
                      </div>

                      <!-- Age -->
                      <div
                        :class="`bg-teal-50 rounded-md border border-teal-200/60 flex items-center justify-center gap-1 relative group/age ${isSidebarExpanded ? 'p-1.5' : 'p-2'}`">
                        <svg :class="`text-teal-600 ${isSidebarExpanded ? 'w-3 h-3' : 'w-4 h-4'}`" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p :class="`font-bold text-teal-800 ${isSidebarExpanded ? 'text-xs' : 'text-sm'}`">{{ animal.age
                          }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Enhanced Action Buttons -->
                  <div class="flex gap-2 mt-auto">
                    <button @click="handleEdit(animal)"
                      class="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md border border-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button @click="handleDelete(animal.id)"
                      class="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md border border-red-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Empty State -->
            <div v-if="filteredAnimals.length === 0" class="flex flex-col items-center justify-center py-12">
              <div
                class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">No listings found</h3>
                <p class="text-xs text-gray-500 mb-4 leading-relaxed">We couldn't find any livestock matching your
                  current search criteria. Try adjusting your filters or add a new listing.</p>
                <button @click="resetFilters"
                  class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All Filters
                </button>
                <button @click="handleAddNew"
                  class="mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD NEW LIVESTOCK MODAL -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="closeAddModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <!-- Modal Header -->
        <div
          class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold">Add New Livestock</h2>
              <p class="text-green-100 text-sm">Create a new listing for your farm</p>
            </div>
          </div>
          <button @click="closeAddModal"
            class="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 max-h-96 overflow-y-auto">
          <form @submit.prevent="submitAddForm" class="space-y-6">
            <!-- Listing Title -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Listing Title *</label>
              <input v-model="newAnimal.title" type="text" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Premium Angus Cattle - Ready for New Home!" />
            </div>

            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Animal Type *</label>
                <select v-model="newAnimal.type" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select Type</option>
                  <option value="Cattle">Cattle</option>
                  <option value="Buffalo">Buffalo</option>
                  <option value="Pig">Pig</option>
                  <option value="Goat">Goat</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Duck">Duck</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Breed *</label>
                <input v-model="newAnimal.breed" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Angus, Holstein..." />
              </div>
            </div>

            <!-- Physical Details -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Weight (kg) *</label>
                <input v-model.number="newAnimal.weight" type="number" required min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="150" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                <input v-model.number="newAnimal.quantity" type="number" required min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="5" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                <select v-model="newAnimal.gender" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>

            <!-- Age and Health Status -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Age Range *</label>
                <select v-model="newAnimal.age" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select Age Range</option>
                  <option value="0-6 months">0-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12-18 months">12-18 months</option>
                  <option value="18-24 months">18-24 months</option>
                  <option value="2+ years">2+ years</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Health Status *</label>
                <select v-model="newAnimal.healthStatus" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select Health Status</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Attention">Needs Attention</option>
                </select>
              </div>
            </div>

            <!-- Price and Address -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Price (₱) *</label>
                <input v-model.number="newAnimal.price" type="number" required min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="45000" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Farm Address *</label>
                <input v-model="newAnimal.address" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="123 Farm Road, Barangay..." />
              </div>
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Location (City/Province) *</label>
              <input v-model="newAnimal.location" type="text" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Pampanga, Bulacan" />
            </div>

            <!-- Delivery Options -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Delivery Options *</label>
              <div class="grid grid-cols-2 gap-4">
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="pickup" v-model="newAnimal.deliveryOptions"
                    class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500">
                  <span class="text-sm text-gray-700">Farm Pickup</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="delivery" v-model="newAnimal.deliveryOptions"
                    class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500">
                  <span class="text-sm text-gray-700">Local Delivery</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="shipping" v-model="newAnimal.deliveryOptions"
                    class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500">
                  <span class="text-sm text-gray-700">Provincial Shipping</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="transport" v-model="newAnimal.deliveryOptions"
                    class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500">
                  <span class="text-sm text-gray-700">Live Transport</span>
                </label>
              </div>
            </div>

            <!-- File Upload for Images -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Images</label>
              <div class="space-y-3">
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> livestock
                        images</p>
                      <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                    </div>
                    <input type="file" class="hidden" multiple accept="image/*" @change="handleFileUpload"
                      ref="fileInput" />
                  </label>
                </div>

                <!-- Image Preview Section -->
                <div v-if="uploadedImages.length > 0" class="grid grid-cols-3 gap-2">
                  <div v-for="(image, index) in uploadedImages" :key="index" class="relative">
                    <img :src="image.url" :alt="`Preview ${index + 1}`"
                      class="w-full h-20 object-cover rounded-lg border border-gray-200" />
                    <button @click="removeImage(index)"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                      ×
                    </button>
                    <p class="text-xs text-gray-500 mt-1 truncate">{{ image.name }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea v-model="newAnimal.description" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 h-24 resize-none"
                placeholder="Describe your livestock, health condition, feeding, certifications, etc..."></textarea>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
          <button @click="closeAddModal"
            class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-all">
            Cancel
          </button>
          <button @click="submitAddForm"
            class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Create Livestock Listing
          </button>
        </div>
      </div>
    </div>

    <!-- EDIT LIVESTOCK MODAL -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="closeEditModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <!-- Modal Header -->
        <div
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold">Edit Livestock</h2>
              <p class="text-blue-100 text-sm">Update your listing information</p>
            </div>
          </div>
          <button @click="closeEditModal"
            class="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 max-h-96 overflow-y-auto">
          <form @submit.prevent="submitEditForm" class="space-y-6">
            <!-- Listing Title -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Listing Title *</label>
              <input v-model="editAnimal.title" type="text" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Animal Type *</label>
                <select v-model="editAnimal.type" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="">Select Type</option>
                  <option value="Cattle">Cattle</option>
                  <option value="Buffalo">Buffalo</option>
                  <option value="Pig">Pig</option>
                  <option value="Goat">Goat</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Duck">Duck</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Breed *</label>
                <input v-model="editAnimal.breed" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <!-- Physical Details -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Weight (kg) *</label>
                <input v-model.number="editAnimal.weight" type="number" required min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                <input v-model.number="editAnimal.quantity" type="number" required min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                <select v-model="editAnimal.gender" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>

            <!-- Age and Health Status -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Age Range *</label>
                <select v-model="editAnimal.age" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="">Select Age Range</option>
                  <option value="0-6 months">0-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12-18 months">12-18 months</option>
                  <option value="18-24 months">18-24 months</option>
                  <option value="2+ years">2+ years</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Health Status *</label>
                <select v-model="editAnimal.healthStatus" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="">Select Health Status</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Attention">Needs Attention</option>
                </select>
              </div>
            </div>

            <!-- Status and Price -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                <select v-model="editAnimal.status" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="No stock">No stock</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Price (₱) *</label>
                <input v-model.number="editAnimal.price" type="number" required min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <!-- Address and Location -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Farm Address *</label>
                <input v-model="editAnimal.address" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Location (City/Province) *</label>
                <input v-model="editAnimal.location" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <!-- Delivery Options -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Delivery Options *</label>
              <div class="grid grid-cols-2 gap-4">
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="pickup" v-model="editAnimal.deliveryOptions"
                    class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                  <span class="text-sm text-gray-700">Farm Pickup</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="delivery" v-model="editAnimal.deliveryOptions"
                    class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                  <span class="text-sm text-gray-700">Local Delivery</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="shipping" v-model="editAnimal.deliveryOptions"
                    class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                  <span class="text-sm text-gray-700">Provincial Shipping</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" value="transport" v-model="editAnimal.deliveryOptions"
                    class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                  <span class="text-sm text-gray-700">Live Transport</span>
                </label>
              </div>
            </div>

            <!-- File Upload for Images (Edit) -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Update Images</label>
              <div class="space-y-3">
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> new
                        images</p>
                      <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                    </div>
                    <input type="file" class="hidden" multiple accept="image/*" @change="handleEditFileUpload"
                      ref="editFileInput" />
                  </label>
                </div>

                <!-- Image Preview Section -->
                <div v-if="editUploadedImages.length > 0" class="grid grid-cols-3 gap-2">
                  <div v-for="(image, index) in editUploadedImages" :key="index" class="relative">
                    <img :src="image.url" :alt="`Edit Preview ${index + 1}`"
                      class="w-full h-20 object-cover rounded-lg border border-gray-200" />
                    <button @click="removeEditImage(index)"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                      ×
                    </button>
                    <p class="text-xs text-gray-500 mt-1 truncate">{{ image.name }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea v-model="editAnimal.description" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"></textarea>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
          <button @click="closeEditModal"
            class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-all">
            Cancel
          </button>
          <button @click="submitEditForm"
            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Update Livestock
          </button>
        </div>
      </div>
    </div>

    <!-- QUICK VIEW MODAL -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="closeViewModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden">
        <!-- Modal Header -->
        <div
          class="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold">Livestock Details</h2>
              <p class="text-emerald-100 text-sm">{{ viewAnimal?.type }} - {{ viewAnimal?.breed }}</p>
            </div>
          </div>
          <button @click="closeViewModal"
            class="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 max-h-96 overflow-y-auto">
          <div v-if="viewAnimal" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Image Section -->
            <div class="lg:col-span-1 space-y-4">
              <div class="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img :src="getImageSource(viewAnimal.images)" :alt="viewAnimal.type"
                  class="w-full h-full object-cover" />
              </div>

              <!-- Status and Price Banner -->
              <div class="flex gap-3">
                <div
                  class="flex-1 text-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <p class="text-xs font-medium text-gray-600 mb-1">Status</p>
                  <span :class="`px-3 py-1 text-sm font-bold rounded-full ${getStatusClass(viewAnimal.status)}`">
                    {{ viewAnimal.status }}
                  </span>
                </div>
                <div
                  class="flex-1 text-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <p class="text-xs font-medium text-gray-600 mb-1">Price</p>
                  <p class="text-xl font-black text-green-600">₱{{ viewAnimal.price.toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <!-- Details Section -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Title -->
              <div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ viewAnimal.title }}</h3>
                <p class="text-green-600 font-semibold">{{ viewAnimal.type }} - {{ viewAnimal.breed }}</p>
              </div>

              <!-- Health Status -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                <p class="text-xs font-medium text-gray-600 mb-1">Health Status</p>
                <span
                  :class="`px-3 py-1 text-sm font-bold rounded-full ${getHealthStatusClass(viewAnimal.healthStatus)}`">
                  {{ viewAnimal.healthStatus }}
                </span>
              </div>

              <!-- Key Stats Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-700">Quantity</span>
                  </div>
                  <p class="text-2xl font-bold text-blue-800">{{ viewAnimal.quantity }}</p>
                </div>

                <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-700">Weight</span>
                  </div>
                  <p class="text-2xl font-bold text-purple-800">{{ viewAnimal.weight }} <span
                      class="text-sm font-medium text-purple-600">kg</span></p>
                </div>

                <div class="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-700">Gender</span>
                  </div>
                  <p class="text-2xl font-bold text-pink-800">{{ viewAnimal.gender }}</p>
                </div>

                <div class="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-700">Age</span>
                  </div>
                  <p class="text-2xl font-bold text-teal-800">{{ viewAnimal.age }}</p>
                </div>
              </div>

              <!-- Farmer Details Section -->
              <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Farmer Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex items-center gap-3">
                    <img :src="viewAnimal.farmer.avatar" :alt="viewAnimal.farmer.name"
                      class="w-12 h-12 rounded-full object-cover border-2 border-amber-300" />
                    <div>
                      <p class="font-semibold text-gray-800">{{ viewAnimal.farmer.name }}</p>
                      <p class="text-sm text-amber-700 font-medium">{{ viewAnimal.farmer.farmName }}</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-gray-700">
                      <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {{ viewAnimal.farmer.contact }}
                    </div>
                    <div class="flex items-start gap-2 text-sm text-gray-700">
                      <svg class="w-4 h-4 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="line-clamp-2">{{ viewAnimal.farmer.address }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h4 class="text-lg font-semibold text-gray-800 mb-3">Description</h4>
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p class="text-gray-700 leading-relaxed">{{ viewAnimal.description }}</p>
                </div>
              </div>

              <!-- Delivery Options -->
              <div>
                <h4 class="text-lg font-semibold text-gray-800 mb-3">Delivery Options</h4>
                <div class="flex flex-wrap gap-2">
                  <span v-for="option in viewAnimal.deliveryOptions" :key="option"
                    class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {{ formatDeliveryOption(option) }}
                  </span>
                </div>
              </div>

              <!-- Additional Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-700">Location</span>
                  </div>
                  <p class="text-green-800 font-medium">{{ viewAnimal.location }}</p>
                </div>

                <div class="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-700">Date Posted</span>
                  </div>
                  <p class="text-amber-800 font-medium">{{ formatDate(viewAnimal.datePosted) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
          <button @click="closeViewModal"
            class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-all">
            Close
          </button>
          <button @click="handleEditFromView"
            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Listing
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="closeDeleteModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-2xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold">Delete Livestock</h2>
              <p class="text-red-100 text-sm">This action cannot be undone</p>
            </div>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p class="text-gray-700 mb-6">Are you sure you want to delete this livestock listing? This action cannot be
            undone and all data will be permanently removed.</p>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-6 py-4 flex gap-3 justify-end rounded-b-2xl">
          <button @click="closeDeleteModal"
            class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-all">
            Cancel
          </button>
          <button @click="confirmDelete"
            class="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Define interfaces
interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  avatar: string;
  contact: string;
  address: string;
}

interface Animal {
  id: number;
  title: string;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  healthStatus: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
  address: string;
}

interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  statuses: string[];
}

interface NewAnimal {
  title: string;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  healthStatus: string;
  price: number;
  location: string;
  address: string;
  deliveryOptions: string[];
  description: string;
}

interface EditAnimal extends NewAnimal {
  id: number;
  status: string;
}

interface UploadedImage {
  file: File;
  url: string;
  name: string;
}

// Use router for navigation
const router = useRouter();

// Current farmer data
const currentFarmer: Farmer = {
  id: 2,
  name: "Maria Santos",
  farmName: "Santos Ranch",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  contact: "+63 921 777 8888",
  address: "123 Poultry Lane, Barangay Fowl, Pampanga"
};

// Reactive state
const viewMode = ref<'table' | 'card'>('card');
const sortBy = ref('datePosted');
const isSidebarExpanded = ref(true);
const showAddModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const deleteItemId = ref<number | null>(null);
const viewAnimal = ref<Animal | null>(null);

// File upload refs
const fileInput = ref<HTMLInputElement | null>(null);
const editFileInput = ref<HTMLInputElement | null>(null);
const uploadedImages = ref<UploadedImage[]>([]);
const editUploadedImages = ref<UploadedImage[]>([]);

const filters = ref<Filters>({
  search: '',
  types: [],
  breeds: [],
  statuses: []
});

const newAnimal = ref<NewAnimal>({
  title: '',
  type: '',
  breed: '',
  weight: 0,
  quantity: 0,
  age: '',
  gender: '',
  healthStatus: '',
  price: 0,
  location: '',
  address: '',
  deliveryOptions: [],
  description: ''
});

const editAnimal = ref<EditAnimal>({
  id: 0,
  title: '',
  type: '',
  breed: '',
  weight: 0,
  quantity: 0,
  age: '',
  gender: '',
  healthStatus: '',
  price: 0,
  location: '',
  address: '',
  deliveryOptions: [],
  description: '',
  status: ''
});

const statusOptions = ['Available', 'Low Stock', 'Out of Stock', 'No stock'];

// Sample animal data with user-inputted fields
const animals = ref<Animal[]>([
  {
    id: 1,
    title: 'Premium Angus Cattle - Ready for New Home!',
    type: 'Cattle',
    breed: 'Angus',
    weight: 450,
    quantity: 5,
    age: '18-24 months',
    gender: 'Male',
    status: 'Available',
    healthStatus: 'Excellent',
    price: 45000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
    location: 'Pampanga',
    address: '123 Poultry Lane, Barangay Fowl, Pampanga'
  }
]);

// Computed properties
const farmerAnimals = computed(() => animals.value.filter(animal => animal.farmer.id === currentFarmer.id));

const uniqueTypes = computed(() => [...new Set(farmerAnimals.value.map(a => a.type))].sort());
const uniqueBreeds = computed(() => [...new Set(farmerAnimals.value.map(a => a.breed))].sort());

const hasActiveFilters = computed(() => {
  return filters.value.search !== '' ||
    filters.value.types.length > 0 ||
    filters.value.breeds.length > 0 ||
    filters.value.statuses.length > 0;
});

const filteredAnimals = computed(() => {
  let filtered = farmerAnimals.value.filter(animal => {
    const f = filters.value;
    const matchesSearch = !f.search ||
      animal.type.toLowerCase().includes(f.search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(f.search.toLowerCase()) ||
      animal.title.toLowerCase().includes(f.search.toLowerCase()) ||
      animal.description.toLowerCase().includes(f.search.toLowerCase());
    const matchesType = f.types.length === 0 || f.types.includes(animal.type);
    const matchesBreed = f.breeds.length === 0 || f.breeds.includes(animal.breed);
    const matchesStatus = f.statuses.length === 0 || f.statuses.includes(animal.status);

    return matchesSearch && matchesType && matchesBreed && matchesStatus;
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
      default:
        return 0;
    }
  });
});

// Methods
const goBack = (): void => {
  router.go(-1);
};

const toggleSidebar = (): void => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const toggleView = (): void => {
  viewMode.value = viewMode.value === 'table' ? 'card' : 'table';
};

// FILE UPLOAD METHODS
const handleFileUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImages.value.push({
          file: file,
          url: e.target?.result as string,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // Reset the input
  if (target) target.value = '';
};

const handleEditFileUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        editUploadedImages.value.push({
          file: file,
          url: e.target?.result as string,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // Reset the input
  if (target) target.value = '';
};

const removeImage = (index: number): void => {
  uploadedImages.value.splice(index, 1);
};

const removeEditImage = (index: number): void => {
  editUploadedImages.value.splice(index, 1);
};

// ADD MODAL METHODS
const handleAddNew = (): void => {
  showAddModal.value = true;
};

const closeAddModal = (): void => {
  showAddModal.value = false;
  uploadedImages.value = [];
  // Reset form
  newAnimal.value = {
    title: '',
    type: '',
    breed: '',
    weight: 0,
    quantity: 0,
    age: '',
    gender: '',
    healthStatus: '',
    price: 0,
    location: '',
    address: '',
    deliveryOptions: [],
    description: ''
  };
};

const submitAddForm = (): void => {
  // Validate required fields
  if (!newAnimal.value.title || !newAnimal.value.type || !newAnimal.value.breed ||
    !newAnimal.value.weight || !newAnimal.value.quantity || !newAnimal.value.age ||
    !newAnimal.value.gender || !newAnimal.value.healthStatus || !newAnimal.value.price ||
    !newAnimal.value.location || !newAnimal.value.address || !newAnimal.value.description) {
    alert('Please fill in all required fields');
    return;
  }

  if (newAnimal.value.deliveryOptions.length === 0) {
    alert('Please select at least one delivery option');
    return;
  }

  // Create images array from uploaded files
  const images: string[] = uploadedImages.value.map(img => img.url);

  // Create new animal object
  const animal: Animal = {
    id: Date.now(),
    title: newAnimal.value.title,
    type: newAnimal.value.type,
    breed: newAnimal.value.breed,
    weight: newAnimal.value.weight,
    quantity: newAnimal.value.quantity,
    age: newAnimal.value.age,
    gender: newAnimal.value.gender,
    healthStatus: newAnimal.value.healthStatus,
    status: newAnimal.value.quantity > 10 ? 'Available' : newAnimal.value.quantity > 0 ? 'Low Stock' : 'No stock',
    price: newAnimal.value.price,
    location: newAnimal.value.location,
    address: newAnimal.value.address,
    deliveryOptions: [...newAnimal.value.deliveryOptions],
    images: images.length > 0 ? images : ['data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23ccc" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpath d="M21 15l-5-5L5 21"%3E%3C/path%3E%3C/svg%3E'],
    description: newAnimal.value.description,
    datePosted: new Date().toISOString(),
    farmer: currentFarmer
  };

  // Add to animals array
  animals.value.push(animal);

  // Close modal and reset form
  closeAddModal();

  console.log('New animal added:', animal);
};

// EDIT MODAL METHODS
const handleEdit = (animal: Animal): void => {
  editAnimal.value = {
    id: animal.id,
    title: animal.title,
    type: animal.type,
    breed: animal.breed,
    weight: animal.weight,
    quantity: animal.quantity,
    age: animal.age,
    gender: animal.gender,
    healthStatus: animal.healthStatus,
    price: animal.price,
    location: animal.location,
    address: animal.address,
    deliveryOptions: [...animal.deliveryOptions],
    description: animal.description,
    status: animal.status
  };
  editUploadedImages.value = [];
  showEditModal.value = true;
};

const closeEditModal = (): void => {
  showEditModal.value = false;
  editUploadedImages.value = [];
  // Reset form
  editAnimal.value = {
    id: 0,
    title: '',
    type: '',
    breed: '',
    weight: 0,
    quantity: 0,
    age: '',
    gender: '',
    healthStatus: '',
    price: 0,
    location: '',
    address: '',
    deliveryOptions: [],
    description: '',
    status: ''
  };
};

const submitEditForm = (): void => {
  // Validate required fields
  if (!editAnimal.value.title || !editAnimal.value.type || !editAnimal.value.breed ||
    !editAnimal.value.weight || !editAnimal.value.quantity || !editAnimal.value.age ||
    !editAnimal.value.gender || !editAnimal.value.healthStatus || !editAnimal.value.price ||
    !editAnimal.value.location || !editAnimal.value.address || !editAnimal.value.description || !editAnimal.value.status) {
    alert('Please fill in all required fields');
    return;
  }

  if (editAnimal.value.deliveryOptions.length === 0) {
    alert('Please select at least one delivery option');
    return;
  }

  // Find and update the animal
  const index = animals.value.findIndex(animal => animal.id === editAnimal.value.id);
  if (index !== -1) {
    // Prepare new images if uploaded
    const newImages = editUploadedImages.value.map(img => img.url);

    // Update the existing animal
    animals.value[index] = {
      ...animals.value[index],
      title: editAnimal.value.title,
      type: editAnimal.value.type,
      breed: editAnimal.value.breed,
      weight: editAnimal.value.weight,
      quantity: editAnimal.value.quantity,
      age: editAnimal.value.age,
      gender: editAnimal.value.gender,
      healthStatus: editAnimal.value.healthStatus,
      price: editAnimal.value.price,
      location: editAnimal.value.location,
      address: editAnimal.value.address,
      deliveryOptions: [...editAnimal.value.deliveryOptions],
      description: editAnimal.value.description,
      status: editAnimal.value.status,
      images: newImages.length > 0 ? newImages : animals.value[index].images
    };
  }

  // Close modal and reset form
  closeEditModal();

  console.log('Animal updated:', editAnimal.value);
};

// VIEW MODAL METHODS
const handleView = (animal: Animal): void => {
  viewAnimal.value = animal;
  showViewModal.value = true;
};

const closeViewModal = (): void => {
  showViewModal.value = false;
  viewAnimal.value = null;
};

const handleEditFromView = (): void => {
  if (viewAnimal.value) {
    handleEdit(viewAnimal.value);
    closeViewModal();
  }
};

// DELETE MODAL METHODS
const handleDelete = (animalId: number): void => {
  deleteItemId.value = animalId;
  showDeleteModal.value = true;
};

const closeDeleteModal = (): void => {
  showDeleteModal.value = false;
  deleteItemId.value = null;
};

const confirmDelete = (): void => {
  if (deleteItemId.value) {
    const index = animals.value.findIndex(animal => animal.id === deleteItemId.value);
    if (index !== -1) {
      animals.value.splice(index, 1);
    }
  }
  closeDeleteModal();
  console.log('Animal deleted with ID:', deleteItemId.value);
};

// UTILITY METHODS
const resetFilters = (): void => {
  filters.value = {
    search: '',
    types: [],
    breeds: [],
    statuses: []
  };
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Available': return 'bg-green-100/90 text-green-800 border-green-300';
    case 'Low Stock': return 'bg-yellow-100/90 text-yellow-800 border-yellow-300';
    case 'Out of Stock':
    case 'No stock': return 'bg-red-100/90 text-red-800 border-red-300';
    default: return 'bg-gray-100/90 text-gray-800 border-gray-300';
  }
};

const getHealthStatusClass = (healthStatus: string): string => {
  switch (healthStatus) {
    case 'Excellent': return 'bg-green-100/90 text-green-800 border-green-300';
    case 'Very Good': return 'bg-blue-100/90 text-blue-800 border-blue-300';
    case 'Good': return 'bg-teal-100/90 text-teal-800 border-teal-300';
    case 'Fair': return 'bg-yellow-100/90 text-yellow-800 border-yellow-300';
    case 'Needs Attention': return 'bg-red-100/90 text-red-800 border-red-300';
    default: return 'bg-gray-100/90 text-gray-800 border-gray-300';
  }
};

// Get type badge class for image overlay
const getTypeBadgeClassForImage = (type: string): string => {
  switch (type) {
    case 'Cattle':
      return 'bg-green-500/90 text-white';
    case 'Pig':
      return 'bg-pink-500/90 text-white';
    case 'Goat':
      return 'bg-amber-500/90 text-white';
    case 'Chicken':
      return 'bg-red-500/90 text-white';
    case 'Buffalo':
      return 'bg-blue-500/90 text-white';
    case 'Duck':
      return 'bg-indigo-500/90 text-white';
    case 'Sheep':
      return 'bg-gray-500/90 text-white';
    default:
      return 'bg-gray-500/90 text-white';
  }
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDeliveryOption = (option: string): string => {
  const formatMap: { [key: string]: string } = {
    'pickup': 'Farm Pickup',
    'delivery': 'Local Delivery',
    'shipping': 'Provincial Shipping',
    'transport': 'Live Transport'
  };
  return formatMap[option] || option;
};

// Get image source with fallback to placeholder
const getImageSource = (images: string[] | undefined) => {
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpath d='M21 15l-5-5L5 21'%3E%3C/path%3E%3C/svg%3E";
  return images && images.length > 0 ? images[0] : placeholderImage;
};

// Lifecycle hooks
onMounted(() => {
  // Any initialization code if needed
});
</script>