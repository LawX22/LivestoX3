<!-- adminLivestockManagement.vue - COMPACT TABLE VERSION -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
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

    <div class="flex min-h-screen relative z-10">
      <!-- Sticky Sidebar Component -->
      <div class="sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      <!-- Main Content -->
      <main class="flex-1 p-8 overflow-auto">
        <!-- Enhanced Header Section -->
        <div class="mb-6">
          <div
            class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-xl backdrop-blur-sm">
            <!-- Left side - Logo and Title -->
            <div class="flex items-center min-w-0">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div class="min-w-0">
                <h1 class="text-2xl font-bold text-white truncate">Livestock Management</h1>
                <p class="text-green-100 text-sm opacity-90 truncate">Review livestock posts and content moderation</p>
              </div>
            </div>

            <!-- Right side - Stats -->
            <div class="flex items-center space-x-4">
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Total: {{ filteredListings.length }}</span>
              </div>
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Available: {{ availableCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <svg class="animate-spin h-12 w-12 text-emerald-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-gray-600 font-medium">Loading livestock listings...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="text-red-800 font-semibold">Error Loading Listings</h3>
              <p class="text-red-600 text-sm">{{ error }}</p>
            </div>
          </div>
        </div>

        <template v-else>
          <!-- Filters Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <!-- Search -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search livestock..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
                />
              </div>

              <!-- Status Filter -->
              <div>
                <select
                  v-model="statusFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="all">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <!-- Type Filter -->
              <div>
                <select
                  v-model="typeFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="all">All Types</option>
                  <option value="Cattle">Cattle</option>
                  <option value="Goat">Goat</option>
                  <option value="Pig">Pig</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Carabao">Carabao</option>
                  <option value="Sheep">Sheep</option>
                </select>
              </div>

              <!-- Breed Filter -->
              <div>
                <select
                  v-model="breedFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="all">All Breeds</option>
                  <option v-for="breed in uniqueBreeds" :key="breed" :value="breed">{{ breed }}</option>
                </select>
              </div>

              <!-- Sort Options -->
              <div>
                <select
                  v-model="sortBy"
                  class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="quantity_low">Quantity: Low to High</option>
                  <option value="quantity_high">Quantity: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Listings</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ totalCount }}</h3>
                </div>
                <div class="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Available</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ availableCount }}</h3>
                </div>
                <div class="p-2 bg-green-100 rounded-lg text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Low Stock</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ lowStockCount }}</h3>
                </div>
                <div class="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Out of Stock</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ outOfStockCount }}</h3>
                </div>
                <div class="p-2 bg-red-100 rounded-lg text-red-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Value</p>
                  <h3 class="text-xl font-bold mt-1 text-gray-800">₱{{ formatPrice(totalValue) }}</h3>
                </div>
                <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Livestock Table - COMPACT VERSION -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all hover:shadow-2xl">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200/50">
                <thead class="bg-white/80 sticky top-0 z-10">
                  <tr>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Livestock
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Farmer
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price/Qty
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white/80 divide-y divide-gray-200/50">
                  <tr
                    v-for="listing in paginatedListings"
                    :key="listing.uuid"
                    class="hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    <!-- Livestock Column -->
                    <td class="px-3 py-3">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img
                            :src="listing.images[0]"
                            class="h-10 w-10 rounded-lg object-cover"
                            :alt="listing.title"
                            @error="handleImageError"
                          />
                        </div>
                        <div class="ml-2 max-w-[150px]">
                          <div class="text-xs font-medium text-gray-900 truncate" :title="listing.title">
                            {{ listing.title }}
                          </div>
                          <div class="text-xs text-gray-500">
                            {{ listing.weight }}{{ listing.weightUnit }}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <!-- Farmer Column -->
                    <td class="px-3 py-3">
                      <div class="text-xs font-medium text-gray-900 truncate max-w-[120px]" :title="listing.farmer.name">
                        {{ listing.farmer.name }}
                      </div>
                      <div class="text-xs text-gray-500 truncate max-w-[120px]" :title="listing.location">
                        {{ listing.location }}
                      </div>
                    </td>
                    
                    <!-- Details Column -->
                    <td class="px-3 py-3">
                      <div class="text-xs text-gray-900">{{ listing.type }}</div>
                      <div class="text-xs text-gray-500 truncate max-w-[100px]" :title="listing.breed">
                        {{ listing.breed }}
                      </div>
                    </td>
                    
                    <!-- Price/Qty Column -->
                    <td class="px-3 py-3">
                      <div class="text-xs text-gray-900 font-semibold">₱{{ formatPrice(listing.price) }}</div>
                      <div class="text-xs text-gray-500">{{ listing.quantity }}/{{ listing.originalQuantity }}</div>
                    </td>
                    
                    <!-- Status Column -->
                    <td class="px-3 py-3">
                      <span :class="statusBadgeClass(listing.status)" class="text-xs">{{ listing.status }}</span>
                    </td>
                    
                    <!-- Actions Column -->
                    <td class="px-3 py-3 text-center">
                      <button
                        @click="viewListingDetails(listing)"
                        class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                      >
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                  <tr v-if="paginatedListings.length === 0">
                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                      <div class="flex flex-col items-center justify-center py-8">
                        <svg
                          class="w-16 h-16 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-700">
                          No livestock found
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div
              class="bg-white/80 px-4 py-3 flex items-center justify-between border-t border-gray-200/50 sm:px-6"
            >
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50',
                  ]"
                >
                  Previous
                </button>
                <button
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  :class="[
                    'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50',
                  ]"
                >
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to
                    <span class="font-medium">{{
                      Math.min(currentPage * itemsPerPage, filteredListings.length)
                    }}</span>
                    of <span class="font-medium">{{ filteredListings.length }}</span> listings
                  </p>
                </div>
                <div>
                  <nav
                    class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      @click="currentPage = Math.max(1, currentPage - 1)"
                      :disabled="currentPage === 1"
                      :class="[
                        'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                        currentPage === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50',
                      ]"
                    >
                      <span class="sr-only">Previous</span>
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <template v-for="page in visiblePages" :key="page">
                      <button
                        @click="currentPage = page"
                        :class="[
                          page === currentPage
                            ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                          'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                        ]"
                      >
                        {{ page }}
                      </button>
                    </template>
                    <button
                      @click="currentPage = Math.min(totalPages, currentPage + 1)"
                      :disabled="currentPage === totalPages"
                      :class="[
                        'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                        currentPage === totalPages
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50',
                      ]"
                    >
                      <span class="sr-only">Next</span>
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </template>
      </main>
    </div>

    <!-- Livestock Detail Modal -->
    <LivestockDetailModal
      :visible="showModal"
      :listing="selectedListing"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'
import LivestockDetailModal from '../../components/Admin/LivestockDetailModal.vue'
import { LivestockService } from '../../services/livestockService'
import type { Animal } from '../../types/managementTypes'

// Reactive variables
const livestockListings = ref<Animal[]>([])
const selectedListing = ref<Animal | null>(null)
const showModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref<'all' | 'Available' | 'Low Stock' | 'Out of Stock'>('all')
const typeFilter = ref('all')
const breedFilter = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const loading = ref(true)
const error = ref('')
const defaultImage = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

// Computed properties
const uniqueBreeds = computed(() => {
  const breeds = new Set(livestockListings.value.map(l => l.breed))
  return Array.from(breeds).sort()
})

const filteredListings = computed(() => {
  const query = searchQuery.value.toLowerCase()
  let filtered = livestockListings.value
    .filter((listing) => {
      const matchesSearch =
        !query ||
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.type.toLowerCase().includes(query) ||
        listing.breed.toLowerCase().includes(query) ||
        listing.farmer.name.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter.value === 'all' || listing.status === statusFilter.value

      const matchesType =
        typeFilter.value === 'all' || listing.type === typeFilter.value

      const matchesBreed =
        breedFilter.value === 'all' || listing.breed === breedFilter.value

      return matchesSearch && matchesStatus && matchesType && matchesBreed
    })

  // Apply sorting
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
      case 'price_high':
        return b.price - a.price
      case 'price_low':
        return a.price - b.price
      case 'quantity_high':
        return b.quantity - a.quantity
      case 'quantity_low':
        return a.quantity - b.quantity
      default: // newest first
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
    }
  })
})

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredListings.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredListings.value.length / itemsPerPage.value))

const visiblePages = computed(() => {
  const max = 5
  let start = Math.max(1, currentPage.value - Math.floor(max / 2))
  const end = Math.min(totalPages.value, start + max - 1)
  if (end - start + 1 < max) start = Math.max(1, end - max + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const totalCount = computed(() => livestockListings.value.length)
const availableCount = computed(() => livestockListings.value.filter(l => l.status === 'Available').length)
const lowStockCount = computed(() => livestockListings.value.filter(l => l.status === 'Low Stock').length)
const outOfStockCount = computed(() => livestockListings.value.filter(l => l.status === 'Out of Stock').length)
const totalValue = computed(() => livestockListings.value.reduce((sum, l) => sum + (l.price * l.quantity), 0))

// Methods
const loadListings = async (): Promise<void> => {
  try {
    loading.value = true
    error.value = ''
    
    console.log('🔄 Loading livestock listings from database...')
    const result = await LivestockService.getAllListings()
    
    if (result.success && result.data) {
      livestockListings.value = result.data
      console.log('✅ Loaded', result.data.length, 'listings')
      console.log('📦 Sample listing:', result.data[0])
    } else {
      error.value = result.error || 'Failed to load listings'
      console.error('❌ Error loading listings:', result.error)
    }
  } catch (err: any) {
    error.value = err.message || 'An unexpected error occurred'
    console.error('❌ Exception in loadListings:', err)
  } finally {
    loading.value = false
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultImage
}

const formatDate = (date?: string): string => {
  if (!date) return ''
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

const formatPrice = (price?: number): string => {
  if (!price) return '0'
  return price.toLocaleString('en-PH')
}

const statusBadgeClass = (status: string): string => {
  const base = 'px-2 inline-flex leading-5 font-semibold rounded-full'
  switch (status) {
    case 'Available':
      return `${base} bg-green-100 text-green-800`
    case 'Low Stock':
      return `${base} bg-yellow-100 text-yellow-800`
    case 'Out of Stock':
      return `${base} bg-red-100 text-red-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const viewListingDetails = (listing: Animal): void => {
  selectedListing.value = listing
  showModal.value = true
}

onMounted(() => {
  loadListings()
})
</script>