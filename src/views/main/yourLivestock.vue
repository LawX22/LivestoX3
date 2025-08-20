<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse"
        style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse"
        style="animation-delay: 0.5s"></div>
    </div>

    <!-- Sticky Header -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div
        class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <div class="flex items-center min-w-0">
          <button @click="$router.go(-1)"
            class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-500/20 transition-colors mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div class="min-w-0">
            <h1 class="text-xl md:text-2xl font-bold text-white truncate">My Livestock Listings</h1>
            <p class="text-green-100 text-sm opacity-90 truncate">
              Manage your animal listings and track their status
            </p>
          </div>
        </div>

        <div class="flex gap-3 mt-3 md:mt-0">
          <button @click="toggleView"
            class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path v-if="viewMode === 'table'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {{ viewMode === 'table' ? 'Card View' : 'Table View' }}
          </button>
          <button @click="openAddModal"
            class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
            Add New
          </button>
        </div>
      </div>
    </div>

    <!-- Status Overview Cards -->
    <div class="sticky top-0 z-30 px-4 md:px-6 py-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
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

        <!-- Active -->
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
                {{farmerAnimals.filter(a => a.status === 'Out of Stock').length}}
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

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Enhanced Filters Sidebar with Collapse/Expand -->
      <div
        :class="`${isSidebarExpanded ? 'w-full md:w-52 lg:w-56' : 'w-14'} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-lg relative transition-all duration-300 ease-in-out`">
        <div class="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-emerald-50/20"></div>

        <!-- Toggle Button integrated into filter logo -->
        <div @click="toggleSidebar"
          class="absolute inset-0 flex items-center justify-center cursor-pointer group z-20"
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
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
              <div class="space-y-3">
                <!-- Animal Type Checkboxes -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-7 7a2 2 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Animal Type
                  </h3>
                  <div class="space-y-1 max-h-32 overflow-y-auto">
                    <label v-for="type in uniqueTypes" :key="type"
                      class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                      <input type="checkbox" :value="type" v-model="filters.types"
                        class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500">
                      <span class="truncate">{{ type }}</span>
                    </label>
                  </div>
                </div>
                <!-- Breed Checkboxes -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
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
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <!-- Results Summary -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-2">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div class="flex items-center gap-2">
              <div
                class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-gray-700">Sort By:</label>
              <select v-model="sortBy"
                class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                <option value="datePosted">Newest</option>
                <option value="datePosted-asc">Oldest</option>
                <option value="price">Price (Low)</option>
                <option value="price-desc">Price (High)</option>
              </select>
            </div>
          </div>
        </div>
        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto">

          <!-- Table View -->
          <div v-if="viewMode === 'table' && filteredAnimals.length > 0" class="h-full flex flex-col">
            <div class="overflow-x-auto flex-1 min-h-0">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                      Animal
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                      Details
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
                            class="h-12 w-12 rounded-lg object-cover border-2 border-gray-200 hover:border-green-500 transition-all cursor-pointer shadow-sm"
                            @click="openModal(animal)" />
                        </div>
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ animal.type }}</div>
                          <div class="text-xs text-green-600 font-semibold">{{ animal.breed }}</div>
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
                        <button @click="openModal(animal)"
                          class="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-all focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button @click="editAnimal(animal)"
                          class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button @click="deleteAnimal(animal.id)"
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

          <!-- Card View - Updated to match Marketplace design -->
          <div v-else-if="viewMode === 'card' && filteredAnimals.length > 0" class="p-3">
            <div class="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div v-for="animal in filteredAnimals" :key="animal.id"
                class="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-white/60 hover:border-green-300/60 transition-all duration-300 bg-white/95 backdrop-blur-sm flex flex-col h-full group">

                <!-- Premium Image Section -->
                <div class="relative h-28 overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10 z-10">
                  </div>
                  <img :src="getImageSource(animal.images)" :alt="animal.type"
                    class="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
                    @click="openModal(animal)" loading="lazy" />

                  <!-- Status Badge -->
                  <div class="absolute top-2 right-2 z-20">
                    <span
                      :class="`px-1.5 py-0.5 text-[10px] font-bold rounded-full shadow backdrop-blur-md border ${getStatusClass(animal.status)}`">
                      {{ animal.status }}
                    </span>
                  </div>

                  <!-- Price Badge -->
                  <div class="absolute top-2 left-2 z-20">
                    <div
                      class="bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full shadow border border-white/40">
                      <span
                        class="text-[10px] font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₱{{
                          animal.price.toLocaleString() }}</span>
                    </div>
                  </div>

                  <!-- Farmer Info Overlay -->
                  <div
                    class="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div
                      class="bg-black/70 backdrop-blur-md rounded-lg p-1 border border-white/20 flex items-center">
                      <div class="w-5 h-5 rounded-full border border-white/60 shadow-sm overflow-hidden mr-1">
                        <img :src="animal.farmer.avatar" :alt="animal.farmer.name"
                          class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p class="text-[10px] font-medium text-white truncate max-w-[80px]">{{
                          animal.farmer.farmName || animal.farmer.name }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Quick View Overlay -->
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm z-15">
                    <button @click="openModal(animal)"
                      class="bg-white/95 backdrop-blur-md text-gray-800 px-2 py-1 rounded font-semibold shadow hover:shadow-md transition-all duration-200 flex items-center gap-1 text-[10px] border border-white/40 hover:bg-white">
                      <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Quick View
                    </button>
                  </div>
                </div>

                <!-- Compact Card Content -->
                <div class="p-2 flex-1 flex flex-col relative">
                  <!-- Content Header with Date -->
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-0.5">
                        <h3
                          class="font-bold text-sm text-gray-800 group-hover:text-green-700 transition-colors leading-tight truncate">
                          {{ animal.type }}</h3>
                        <div class="text-[10px] text-gray-500 flex items-center gap-0.5">
                          <svg class="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{{ formatDate(animal.datePosted) }}</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-0.5">
                          <span
                            class="text-[10px] text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-500 px-1.5 py-0.5 rounded-md shadow-sm truncate max-w-[80px]">{{
                            animal.breed }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Stats Section - Quantity, Weight, Gender, Age -->
                  <div class="mb-2">
                    <!-- Quantity and Weight Row -->
                    <div class="grid grid-cols-2 gap-1 mb-1">
                      <!-- Quantity -->
                      <div
                        class="bg-blue-50 p-1 rounded-md border border-blue-200/60 flex items-center justify-center gap-1 relative group/quantity">
                        <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <p class="text-xs font-bold text-blue-800">{{ animal.quantity }}</p>
                        <div
                          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/quantity:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Quantity
                          <div
                            class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45">
                          </div>
                        </div>
                      </div>
                      <!-- Weight -->
                      <div
                        class="bg-purple-50 p-1 rounded-md border border-purple-200/60 flex items-center justify-center gap-1 relative group/weight">
                        <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                        </svg>
                        <p class="text-xs font-bold text-purple-800">{{ animal.weight }}</p>
                        <div
                          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/weight:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Weight (kg)
                          <div
                            class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45">
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Gender and Age Row -->
                    <div class="grid grid-cols-2 gap-1">
                      <!-- Gender -->
                      <div
                        class="bg-pink-50 p-1 rounded-md border border-pink-200/60 flex items-center justify-center gap-1 relative group/gender">
                        <svg class="w-3 h-3 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p class="text-xs font-bold text-pink-800">{{ animal.gender }}</p>
                        <div
                          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/gender:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Gender
                          <div
                            class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45">
                          </div>
                        </div>
                      </div>
                      <!-- Age -->
                      <div
                        class="bg-teal-50 p-1 rounded-md border border-teal-200/60 flex items-center justify-center gap-1 relative group/age">
                        <svg class="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-xs font-bold text-teal-800">{{ animal.age }}</p>
                        <div
                          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover/age:block bg-black text-white text-[10px] rounded py-0.5 px-1 whitespace-nowrap z-10">
                          Age
                          <div
                            class="absolute top-full left-1/2 w-1.5 h-1.5 bg-black transform -translate-x-1/2 rotate-45">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="mb-2 flex-1">
                    <p class="text-[11px] text-gray-600 leading-relaxed line-clamp-2 font-medium">{{
                      animal.description }}</p>
                  </div>

                  <!-- Enhanced Delivery Options -->
                  <div class="mb-2">
                    <div class="flex flex-wrap gap-0.5">
                      <span v-for="option in animal.deliveryOptions" :key="option"
                        class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full capitalize font-medium border border-green-200/60 truncate">
                        {{ option }}
                      </span>
                    </div>
                  </div>

                  <!-- Enhanced Action Buttons -->
                  <div class="flex gap-1">
                    <button @click="openModal(animal)"
                      class="flex-1 px-2 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 shadow hover:shadow-md border border-green-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button @click="editAnimal(animal)"
                      class="flex-1 px-2 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 shadow hover:shadow-md border border-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button @click="deleteAnimal(animal.id)"
                      class="flex-1 px-2 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 shadow hover:shadow-md border border-red-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24"
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
          </div>

          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center py-12">
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
              <p class="text-xs text-gray-500 mb-4 leading-relaxed">We couldn't find any livestock matching
                your current search criteria. Try adjusting your filters or add a new listing.</p>
              <button @click="resetFilters"
                class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset All Filters
              </button>
              <button @click="openAddModal"
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

    <!-- Animal Details Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

      <div
        class="relative bg-white rounded-xl overflow-hidden shadow-xl transform transition-all max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">{{ selectedAnimal.type }} Details</h3>
            <button @click="closeModal" class="text-white/80 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="bg-white px-6 py-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Image gallery -->
            <div>
              <div class="relative rounded-xl overflow-hidden bg-gray-100">
                <img :src="getImageSource(selectedAnimal.images)" alt="Main image"
                  class="w-full h-80 object-cover rounded-lg shadow-sm">
              </div>
              <div class="grid grid-cols-3 gap-2 mt-3">
                <div v-for="(img, index) in selectedAnimal.images" :key="index" class="cursor-pointer">
                  <img :src="img" alt="Thumbnail"
                    class="w-full h-24 object-cover rounded-lg border-2 border-gray-200 hover:border-green-500 transition-all">
                </div>
              </div>
            </div>

            <!-- Details section -->
            <div>
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">{{ selectedAnimal.type }}</h3>
                  <p class="text-lg text-green-600 font-semibold">{{ selectedAnimal.breed }}</p>
                </div>
                <span :class="`px-3 py-1 text-sm font-bold rounded-full ${getStatusClass(selectedAnimal.status)}`">
                  {{ selectedAnimal.status }}
                </span>
              </div>

              <div class="mb-6">
                <p class="text-3xl font-bold text-gray-900 mb-2">₱{{ selectedAnimal.price.toLocaleString() }}
                </p>
                <p class="text-gray-700 mb-6">{{ selectedAnimal.description }}</p>
              </div>

              <!-- Specifications -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p class="text-sm text-gray-500">Weight</p>
                  <p class="font-medium text-gray-900">{{ selectedAnimal.weight }} kg</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Quantity Available</p>
                  <p class="font-medium text-gray-900">{{ selectedAnimal.quantity }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Age</p>
                  <p class="font-medium text-gray-900">{{ selectedAnimal.age }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Date Posted</p>
                  <p class="font-medium text-gray-900">{{ formatDate(selectedAnimal.datePosted) }}</p>
                </div>
              </div>

              <!-- Delivery options -->
              <div class="mb-6">
                <p class="text-sm font-semibold text-gray-700 mb-2">DELIVERY OPTIONS</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="option in selectedAnimal.deliveryOptions" :key="option"
                    class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md capitalize font-medium">
                    {{ option }}
                  </span>
                </div>
              </div>

              <!-- Farmer info -->
              <div class="border-t border-gray-200 pt-4">
                <p class="text-sm font-semibold text-gray-700 mb-3">FARMER INFORMATION</p>
                <div class="flex items-center">
                  <img :src="selectedAnimal.farmer.avatar" alt="Farmer"
                    class="w-10 h-10 rounded-full object-cover border-2 border-green-300">
                  <div class="ml-3">
                    <p class="font-medium text-gray-900">{{ selectedAnimal.farmer.name }}</p>
                    <p class="text-sm text-gray-600">{{ selectedAnimal.farmer.farmName }}</p>
                  </div>
                </div>
                <div class="mt-3 text-sm text-gray-600">
                  <p class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ selectedAnimal.farmer.contact }}
                  </p>
                  <p class="flex items-center mt-1">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ selectedAnimal.farmer.address }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-end">
          <button @click="editAnimal(selectedAnimal)" type="button"
            class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow hover:shadow-md transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Listing
          </button>
          <button @click="deleteAnimal(selectedAnimal.id)" type="button"
            class="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium shadow hover:shadow-md transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Listing
          </button>
          <button @click="closeModal" type="button"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium shadow hover:shadow-md transition-all">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Animal Modal -->
    <div v-if="isFormModalOpen" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeFormModal">
      </div>
      <div
        class="relative bg-white rounded-xl overflow-hidden shadow-xl transform transition-all max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">
              {{ isEditMode ? 'Edit Livestock Listing' : 'Add New Livestock' }}
            </h3>
            <button @click="closeFormModal" class="text-white/80 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="bg-white px-6 py-5">
          <form @submit.prevent="handleFormSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <!-- Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Animal Type</label>
                <select v-model="formData.type"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required>
                  <option value="" disabled>Select type</option>
                  <option value="Cattle">Cattle</option>
                  <option value="Pig">Pig</option>
                  <option value="Goat">Goat</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Duck">Duck</option>
                </select>
              </div>
              <!-- Breed -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input v-model="formData.breed" type="text"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required placeholder="Enter breed">
              </div>

              <!-- Weight -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input v-model.number="formData.weight" type="number" min="0" step="0.1"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required placeholder="Enter weight">
              </div>

              <!-- Quantity -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input v-model.number="formData.quantity" type="number" min="0"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required placeholder="Enter quantity">
              </div>

              <!-- Age -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input v-model="formData.age" type="text"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required placeholder="e.g. 24 months">
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select v-model="formData.gender"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select v-model="formData.status"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required>
                  <option value="Available">Available</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <!-- Price -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                <input v-model.number="formData.price" type="number" min="0"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required placeholder="Enter price">
              </div>
              <!-- Delivery Options -->
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Options</label>
                <div class="flex flex-wrap gap-4">
                  <label class="inline-flex items-center">
                    <input v-model="formData.deliveryOptions" type="checkbox" value="pickup"
                      class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                    <span class="ml-2 text-sm text-gray-700">Pickup</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input v-model="formData.deliveryOptions" type="checkbox" value="delivery"
                      class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                    <span class="ml-2 text-sm text-gray-700">Delivery</span>
                  </label>
                </div>
              </div>
            </div>
            <!-- Description -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="formData.description" rows="3"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe the animal..." required></textarea>
            </div>

            <!-- Image Upload Section -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>

              <!-- Image previews -->
              <div v-if="formData.images && formData.images.length" class="flex flex-wrap gap-2 mb-4">
                <div v-for="(img, index) in formData.images" :key="index" class="relative">
                  <img :src="img" class="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  <button type="button" @click="removeImage(index)"
                    class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    &times;
                  </button>
                </div>
              </div>

              <!-- File upload -->
              <div class="flex items-center justify-center w-full">
                <label
                  class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500">
                      <span class="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500">PNG, JPG (MAX. 5MB each)</p>
                  </div>
                  <input type="file" multiple @change="handleImageUpload" accept="image/*" class="hidden" />
                </label>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-wrap gap-3 justify-end">
              <button type="submit"
                class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium shadow hover:shadow-md transition-all flex items-center gap-2">
                {{ isEditMode ? 'Update Listing' : 'Create Listing' }}
              </button>
              <button @click="closeFormModal" type="button"
                class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium shadow hover:shadow-md transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div
        class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false"
            class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Define interfaces
interface Farmer {
  id: number;
  name: string;
  farmName: string;
  avatar: string;
  contact: string;
  address: string;
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
}

interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  statuses: string[];
}

// PLACEHOLDER IMAGE (SVG data URL)
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpath d='M21 15l-5-5L5 21'%3E%3C/path%3E%3C/svg%3E";

// Current farmer data
const currentFarmer: Farmer = {
  id: 1,
  name: "John Farmer",
  farmName: "Green Pastures Farm",
  avatar: placeholderImage,
  contact: "+63 912 345 6789",
  address: "123 Farm Road, Agriculture City"
};

// Reactive state
const viewMode = ref<'table' | 'card'>('card');
const isModalOpen = ref(false);
const isFormModalOpen = ref(false);
const isEditMode = ref(false);
const sortBy = ref('datePosted');
const isSidebarExpanded = ref(true);
const showToast = ref(false);
const toastMessage = ref('');
const selectedAnimal = ref<Animal>({} as Animal);
const currentAnimalForEdit = ref<Animal | null>(null);

const formData = ref({
  type: '',
  breed: '',
  weight: 0,
  quantity: 1,
  age: '',
  gender: 'Male',
  status: 'Available',
  price: 0,
  deliveryOptions: ['pickup'],
  images: [placeholderImage],
  description: ''
});

const statusOptions = ['Available', 'Low Stock', 'Out of Stock'];

// Sample animal data
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
    images: [placeholderImage],
    description: 'Healthy Angus cattle, vaccinated and dewormed. Raised in open pasture with organic feed.',
    datePosted: new Date().toISOString(),
    farmer: currentFarmer
  },
  {
    id: 2,
    type: 'Pig',
    breed: 'Duroc',
    weight: 120,
    quantity: 10,
    age: '8 months',
    gender: 'Mixed',
    status: 'Available',
    price: 12000,
    deliveryOptions: ['pickup'],
    images: [placeholderImage],
    description: 'Premium Duroc pigs, excellent for breeding or meat production.',
    datePosted: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    farmer: currentFarmer
  },
  {
    id: 3,
    type: 'Goat',
    breed: 'Boer',
    weight: 45,
    quantity: 2,
    age: '12 months',
    gender: 'Female',
    status: 'Low Stock',
    price: 8000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [placeholderImage],
    description: 'Purebred Boer goats, excellent for meat production.',
    datePosted: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    farmer: currentFarmer
  },
  {
    id: 4,
    type: 'Chicken',
    breed: 'Native',
    weight: 1.5,
    quantity: 0,
    age: '6 months',
    gender: 'Mixed',
    status: 'Out of Stock',
    price: 250,
    deliveryOptions: ['pickup', 'delivery'],
    images: [placeholderImage],
    description: 'Free-range native chickens, raised organically without antibiotics.',
    datePosted: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    farmer: currentFarmer
  }
]);

const filters = ref<Filters>({
  search: '',
  types: [],
  breeds: [],
  statuses: []
});

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
      default:
        return 0;
    }
  });
});

// Methods
const toggleSidebar = (): void => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const toggleView = (): void => {
  viewMode.value = viewMode.value === 'table' ? 'card' : 'table';
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};

const openModal = (animal: Animal): void => {
  selectedAnimal.value = animal;
  isModalOpen.value = true;
};

const closeModal = (): void => {
  isModalOpen.value = false;
};

const openAddModal = (): void => {
  resetFormData();
  isEditMode.value = false;
  isFormModalOpen.value = true;
};

const closeFormModal = (): void => {
  isFormModalOpen.value = false;
};

const editAnimal = (animal: Animal): void => {
  currentAnimalForEdit.value = animal;
  formData.value = { ...animal };
  isEditMode.value = true;
  isFormModalOpen.value = true;
};

const handleFormSubmit = (): void => {
  if (isEditMode.value && currentAnimalForEdit.value) {
    const index = animals.value.findIndex(a => a.id === currentAnimalForEdit.value?.id);
    if (index !== -1) {
      animals.value[index] = {
        ...formData.value,
        id: currentAnimalForEdit.value.id,
        farmer: currentFarmer,
        datePosted: animals.value[index].datePosted
      } as Animal;
      showToastNotification('Listing updated successfully!');
    }
  } else {
    const newId = Math.max(0, ...animals.value.map(a => a.id)) + 1;
    animals.value.push({
      ...formData.value,
      id: newId,
      farmer: currentFarmer,
      datePosted: new Date().toISOString()
    } as Animal);
    showToastNotification('New listing created successfully!');
  }
  closeFormModal();
};

const deleteAnimal = (animalId: number): void => {
  animals.value = animals.value.filter(animal => animal.id !== animalId);
  showToastNotification('Listing deleted successfully!');
  if (isModalOpen.value && selectedAnimal.value.id === animalId) {
    closeModal();
  }
};

const resetFilters = (): void => {
  filters.value = {
    search: '',
    types: [],
    breeds: [],
    statuses: []
  };
  showToastNotification('All filters have been reset');
};

const resetFormData = (): void => {
  formData.value = {
    type: '',
    breed: '',
    weight: 0,
    quantity: 1,
    age: '',
    gender: 'Male',
    status: 'Available',
    price: 0,
    deliveryOptions: ['pickup'],
    images: [placeholderImage],
    description: ''
  };
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Available': return 'bg-green-100/90 text-green-800 border-green-300';
    case 'Low Stock': return 'bg-yellow-100/90 text-yellow-800 border-yellow-300';
    case 'Out of Stock': return 'bg-red-100/90 text-red-800 border-red-300';
    default: return 'bg-gray-100/90 text-gray-800 border-gray-300';
  }
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Handle image upload
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const files = Array.from(input.files);

    files.forEach(file => {
      // Check if file is an image
      if (!file.type.match('image.*')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          formData.value.images = formData.value.images || [];
          formData.value.images.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

// Remove image from form
const removeImage = (index: number) => {
  if (formData.value.images) {
    formData.value.images.splice(index, 1);

    // Ensure at least one image remains
    if (formData.value.images.length === 0) {
      formData.value.images = [placeholderImage];
    }
  }
};

// Get image source with fallback to placeholder
const getImageSource = (images: string[] | undefined) => {
  return images && images.length > 0 ? images[0] : placeholderImage;
};
</script>

