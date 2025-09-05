<!-- livestockManagement.vue -->
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
                <p class="text-green-100 text-sm opacity-90 truncate">Review livestock posts, auctions, and content moderation</p>
              </div>
            </div>

            <!-- Right side - Stats -->
            <div class="flex items-center space-x-4">
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Total: {{ filteredListings.length }}</span>
              </div>
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Under Review: {{ underReviewCount }}</span>
              </div>
            </div>
          </div>
        </div>

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
                <option value="live">Live Listings</option>
                <option value="under_review">Under Review</option>
                <option value="flagged">Flagged Content</option>
                <option value="hidden">Hidden</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <!-- Type Filter -->
            <div>
              <select
                v-model="typeFilter"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
              >
                <option value="all">All Types</option>
                <option value="auction">Auction</option>
                <option value="listing">Listing</option>
              </select>
            </div>

            <!-- Category Filter -->
            <div>
              <select
                v-model="categoryFilter"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white/80"
              >
                <option value="all">All Categories</option>
                <option value="cattle">Cattle</option>
                <option value="goat">Goat</option>
                <option value="pig">Pig</option>
                <option value="chicken">Chicken</option>
                <option value="carabao">Carabao</option>
                <option value="sheep">Sheep</option>
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
                <option value="ending_soon">Ending Soon</option>
                <option value="flagged_first">Flagged First</option>
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
                <p class="text-sm font-medium text-gray-500">Live</p>
                <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ liveCount }}</h3>
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
                <p class="text-sm font-medium text-gray-500">Under Review</p>
                <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ underReviewCount }}</h3>
              </div>
              <div class="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Auctions</p>
                <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ auctionCount }}</h3>
              </div>
              <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Flagged</p>
                <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ flaggedCount }}</h3>
              </div>
              <div class="p-2 bg-red-100 rounded-lg text-red-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Livestock Table -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all hover:shadow-2xl">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200/50">
              <thead class="bg-white/80 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Livestock
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Farmer
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type/Price
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created/Expires
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white/80 divide-y divide-gray-200/50">
                <tr
                  v-for="listing in paginatedListings"
                  :key="listing.id"
                  class="hover:bg-gray-50/80 transition-colors duration-150"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-12 w-12 relative">
                        <img
                          :src="getLivestockImage(listing)"
                          class="h-12 w-12 rounded-lg object-cover"
                          :alt="listing.title"
                          @error="handleImageError"
                        />
                        <span
                          v-if="listing.type === 'auction'"
                          class="absolute -top-1 -right-1 block h-4 w-4 rounded-full ring-1 ring-white bg-blue-400"
                          title="Auction"
                        >
                          <svg class="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                          </svg>
                        </span>
                        <span
                          v-if="listing.status === 'flagged'"
                          class="absolute -top-1 -left-1 block h-4 w-4 rounded-full ring-1 ring-white bg-red-500"
                          title="Flagged Content"
                        >
                          <svg class="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                          </svg>
                        </span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ listing.title }}</div>
                        <div class="text-sm text-gray-500">{{ listing.category }} • {{ listing.breed }}</div>
                        <div class="text-xs text-gray-400">{{ listing.weight }}kg • {{ listing.age }} months</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ listing.farmerName }}</div>
                    <div class="text-sm text-gray-500">{{ listing.farmerEmail }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      <span :class="typeBadgeClass(listing.type)">{{ getTypeLabel(listing.type) }}</span>
                    </div>
                    <div class="text-sm text-gray-900 font-semibold mt-1">
                      ₱{{ formatPrice(listing.startingPrice || listing.price) }}
                      <span v-if="listing.type === 'auction'" class="text-xs text-gray-500 font-normal">starting</span>
                    </div>
                    <div v-if="listing.currentBid && listing.type === 'auction'" class="text-xs text-green-600">
                      Current: ₱{{ formatPrice(listing.currentBid) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="statusBadgeClass(listing.status)">{{ getStatusLabel(listing.status) }}</span>
                    <div v-if="listing.flagReason" class="text-xs text-red-600 mt-1">
                      {{ listing.flagReason }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{{ formatDate(listing.createdAt) }}</div>
                    <div v-if="listing.endDate" class="text-xs" :class="getExpirationClass(listing.endDate)">
                      {{ getExpirationText(listing.endDate) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <button
                        @click="viewListingDetails(listing)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                      >
                        View Details
                      </button>
                      <button
                        v-if="listing.status === 'flagged'"
                        @click="reviewContent(listing)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                      >
                        Review
                      </button>
                      <button
                        v-if="listing.status === 'under_review'"
                        @click="approveListing(listing)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                      >
                        Approve
                      </button>
                      <button
                        v-if="listing.status === 'live'"
                        @click="flagContent(listing)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                      >
                        Flag
                      </button>
                      <button
                        v-if="listing.status === 'live' || listing.status === 'under_review'"
                        @click="hideListing(listing)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                      >
                        Hide
                      </button>
                    </div>
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
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'    

// Define the Livestock interface
interface LivestockListing {
  id: string
  title: string
  description: string
  category: string
  breed: string
  age: number
  weight: number
  price?: number
  startingPrice?: number
  currentBid?: number
  type: 'auction' | 'listing'
  status: 'live' | 'under_review' | 'flagged' | 'hidden' | 'expired' | 'sold'
  farmerId: string
  farmerName: string
  farmerEmail: string
  images: string[]
  location: string
  healthCertificates?: string[]
  vaccinations?: string[]
  createdAt: string | number | Date
  updatedAt: string | number | Date
  endDate?: string | number | Date
  reviewedAt?: string | number | Date
  hiddenAt?: string | number | Date
  flagReason?: string
  flaggedBy?: string
  bidCount?: number
  viewCount?: number
  reportCount?: number
}

// Reactive variables
const livestockListings = ref<LivestockListing[]>([])
const selectedListing = ref<LivestockListing | null>(null)
const showModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref<'all' | 'live' | 'under_review' | 'flagged' | 'hidden' | 'expired'>('all')
const typeFilter = ref<'all' | 'auction' | 'listing'>('all')
const categoryFilter = ref<'all' | 'cattle' | 'goat' | 'pig' | 'chicken' | 'carabao' | 'sheep'>('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const defaultImage = '/livestock-placeholder.png'

// Computed properties
const filteredListings = computed(() => {
  const query = searchQuery.value.toLowerCase()
  let filtered = livestockListings.value
    .filter((listing) => {
      const matchesSearch =
        !query ||
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.category.toLowerCase().includes(query) ||
        listing.breed.toLowerCase().includes(query) ||
        listing.farmerName.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter.value === 'all' || listing.status === statusFilter.value

      const matchesType =
        typeFilter.value === 'all' || listing.type === typeFilter.value

      const matchesCategory =
        categoryFilter.value === 'all' || listing.category === categoryFilter.value

      return matchesSearch && matchesStatus && matchesType && matchesCategory
    })

  // Apply sorting
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'price_high':
        return (b.price || b.startingPrice || 0) - (a.price || a.startingPrice || 0)
      case 'price_low':
        return (a.price || a.startingPrice || 0) - (b.price || b.startingPrice || 0)
      case 'ending_soon':
        if (!a.endDate && !b.endDate) return 0
        if (!a.endDate) return 1
        if (!b.endDate) return -1
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      case 'flagged_first':
        if (a.status === 'flagged' && b.status !== 'flagged') return -1
        if (a.status !== 'flagged' && b.status === 'flagged') return 1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default: // newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
const liveCount = computed(() => livestockListings.value.filter(l => l.status === 'live').length)
const underReviewCount = computed(() => livestockListings.value.filter(l => l.status === 'under_review').length)
const flaggedCount = computed(() => livestockListings.value.filter(l => l.status === 'flagged').length)
const auctionCount = computed(() => livestockListings.value.filter(l => l.type === 'auction').length)

// Methods
const getLivestockImage = (listing: LivestockListing): string => {
  try {
    if (listing.images && listing.images.length > 0) {
      const image = listing.images[0]
      if (image.startsWith('http')) {
        return image
      }
      return `/api/uploads/livestock/${image}`
    }
    return defaultImage
  } catch (error) {
    console.error('Error getting livestock image:', error)
    return defaultImage
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultImage
}

const loadListings = (): void => {
  try {
    // Generate sample data for demonstration
    const sampleListings: LivestockListing[] = [
      {
        id: '1',
        title: 'Premium Brahman Bull',
        description: 'Excellent breeding bull with outstanding genetics. This bull has proven fertility and comes from a champion bloodline. Perfect for improving herd genetics.',
        category: 'cattle',
        breed: 'Brahman',
        age: 24,
        weight: 650,
        startingPrice: 80000,
        currentBid: 85000,
        type: 'auction',
        status: 'live',
        farmerId: 'farmer1',
        farmerName: 'Juan Dela Cruz',
        farmerEmail: 'juan@email.com',
        images: ['bull1.jpg'],
        location: 'Cebu, Philippines',
        healthCertificates: ['health_cert_1.pdf'],
        vaccinations: ['FMD', 'Anthrax', 'Blackleg'],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        bidCount: 3,
        viewCount: 45
      },
      {
        id: '2',
        title: 'Healthy Angus Cows',
        description: 'Two pregnant Angus cows ready for breeding. Both cows are in excellent health and expected to calve within 3 months.',
        category: 'cattle',
        breed: 'Angus',
        age: 30,
        weight: 450,
        price: 120000,
        type: 'listing',
        status: 'live',
        farmerId: 'farmer2',
        farmerName: 'Maria Santos',
        farmerEmail: 'maria@email.com',
        images: ['cow1.jpg'],
        location: 'Bohol, Philippines',
        healthCertificates: ['health_cert_2.pdf'],
        vaccinations: ['FMD', 'IBR', 'BVD'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        viewCount: 78
      }
    ]

    // Store sample data in memory (no localStorage usage)
    livestockListings.value = sampleListings.map(listing => ({
      ...listing,
      createdAt: new Date(listing.createdAt),
      updatedAt: new Date(listing.updatedAt),
      endDate: listing.endDate ? new Date(listing.endDate) : undefined,
      reviewedAt: listing.reviewedAt ? new Date(listing.reviewedAt) : undefined,
      hiddenAt: listing.hiddenAt ? new Date(listing.hiddenAt) : undefined
    }))

  } catch (error) {
    console.error('Error loading listings:', error)
    livestockListings.value = []
  }
}

const formatDate = (date?: string | number | Date): string => {
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

const getExpirationText = (endDate?: string | number | Date): string => {
  if (!endDate) return ''
  const now = new Date()
  const end = new Date(endDate)
  const diffInDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays < 0) return 'Expired'
  if (diffInDays === 0) return 'Expires today'
  if (diffInDays === 1) return 'Expires tomorrow'
  if (diffInDays <= 7) return `Expires in ${diffInDays} days`
  return `Expires ${formatDate(endDate)}`
}

const getExpirationClass = (endDate?: string | number | Date): string => {
  if (!endDate) return ''
  const now = new Date()
  const end = new Date(endDate)
  const diffInDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays < 0) return 'text-red-600'
  if (diffInDays <= 1) return 'text-red-500'
  if (diffInDays <= 3) return 'text-orange-500'
  return 'text-gray-500'
}

const statusBadgeClass = (status: string): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  switch (status) {
    case 'live':
      return `${base} bg-green-100 text-green-800`
    case 'under_review':
      return `${base} bg-yellow-100 text-yellow-800`
    case 'flagged':
      return `${base} bg-red-100 text-red-800`
    case 'hidden':
      return `${base} bg-purple-100 text-purple-800`
    case 'expired':
      return `${base} bg-gray-100 text-gray-800`
    case 'sold':
      return `${base} bg-blue-100 text-blue-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const typeBadgeClass = (type: string): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  switch (type) {
    case 'auction':
      return `${base} bg-blue-100 text-blue-800`
    case 'listing':
      return `${base} bg-green-100 text-green-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'live':
      return 'Live'
    case 'under_review':
      return 'Under Review'
    case 'flagged':
      return 'Flagged'
    case 'hidden':
      return 'Hidden'
    case 'expired':
      return 'Expired'
    case 'sold':
      return 'Sold'
    default:
      return status
  }
}

const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'auction':
      return 'Auction'
    case 'listing':
      return 'Listing'
    default:
      return type
  }
}

const viewListingDetails = (listing: LivestockListing): void => {
  selectedListing.value = listing
  showModal.value = true
}

const approveListing = (listing: LivestockListing): void => {
  if (confirm(`Review complete. Approve "${listing.title}" to make it live?`)) {
    updateListing({
      ...listing,
      status: 'live',
      reviewedAt: new Date()
    })
  }
}

const flagContent = (listing: LivestockListing): void => {
  const reason = prompt('Reason for flagging this content:', 'Inappropriate content or suspicious activity')
  if (reason !== null && reason.trim()) {
    updateListing({
      ...listing,
      status: 'flagged',
      flagReason: reason.trim(),
      flaggedBy: 'admin'
    })
  }
}

const reviewContent = (listing: LivestockListing): void => {
  const action = confirm(`Review "${listing.title}". Click OK to approve or Cancel to keep under review.`)
  if (action) {
    updateListing({
      ...listing,
      status: 'live',
      reviewedAt: new Date(),
      flagReason: undefined,
      flaggedBy: undefined
    })
  } else {
    updateListing({
      ...listing,
      status: 'under_review',
      reviewedAt: new Date()
    })
  }
}

const hideListing = (listing: LivestockListing): void => {
  if (confirm(`Hide "${listing.title}" from public view? This will make it invisible to users.`)) {
    updateListing({
      ...listing,
      status: 'hidden',
      hiddenAt: new Date()
    })
  }
}

const updateListing = (updatedListing: LivestockListing): void => {
  try {
    // Update in local array
    const index = livestockListings.value.findIndex(l => l.id === updatedListing.id)
    if (index !== -1) {
      livestockListings.value[index] = {
        ...updatedListing,
        updatedAt: new Date()
      }
    }

    // Update selected listing if it's the same
    if (selectedListing.value?.id === updatedListing.id) {
      selectedListing.value = {
        ...updatedListing,
        updatedAt: new Date()
      }
    }

    // Show success message based on status
    const statusMessages = {
      live: 'is now live and visible to all users',
      flagged: 'has been flagged for review',
      under_review: 'is now under review',
      hidden: 'has been hidden from public view'
    }
    
    const action = statusMessages[updatedListing.status as keyof typeof statusMessages] || 'has been updated'
    alert(`"${updatedListing.title}" ${action}.`)
    
  } catch (error) {
    console.error('Error updating listing:', error)
    alert('Error updating listing. Please try again.')
  }
}

onMounted(() => {
  loadListings()
})
</script>