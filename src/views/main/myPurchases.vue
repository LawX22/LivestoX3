<!-- myPurchases.vue -->
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

    <!-- Combined Header -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate">My Purchases</h1>
            <p class="text-green-100 text-sm opacity-90 truncate">
              Track your livestock orders and purchases
            </p>
          </div>
        </div>

        <!-- Right side - Stats Cards (Compact) -->
        <div class="grid grid-cols-3 gap-2 w-full md:w-auto">
          <div class="bg-white/20 backdrop-blur-sm rounded-md p-1.5 border border-white/20">
            <div class="flex items-center gap-1.5">
              <div class="p-1 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] font-medium text-green-100 leading-tight">Total Orders</p>
                <p class="text-sm font-bold text-white">{{ transactions.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/20 backdrop-blur-sm rounded-md p-1.5 border border-white/20">
            <div class="flex items-center gap-1.5">
              <div class="p-1 rounded-full bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] font-medium text-green-100 leading-tight">Pending</p>
                <p class="text-sm font-bold text-white">{{ pendingCount }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/20 backdrop-blur-sm rounded-md p-1.5 border border-white/20">
            <div class="flex items-center gap-1.5">
              <div class="p-1 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] font-medium text-green-100 leading-tight">Total Spent</p>
                <p class="text-sm font-bold text-white">₱{{ totalSpent.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
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
                  <input v-model="filters.search" type="text" class="block w-full pl-8 pr-2 py-1.5 border border-green-200 rounded-md text-xs bg-green-50/30 focus:ring-2 focus:ring-green-500/50 focus:border-green-500" placeholder="Search..." />
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
                  <span v-for="status in filters.statuses" :key="status" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ status }}</span>
                  <span v-for="type in filters.types" :key="type" class="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">{{ type }}</span>
                </div>
              </div>
            </div>

            <!-- Scrollable Filters Area -->
            <div class="flex-1 overflow-y-auto p-3">
              <div class="space-y-3">
                <!-- Status Checkboxes -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Status
                  </h3>
                  <div class="space-y-1">
                    <label v-for="status in statusOptions" :key="status" class="flex items-center gap-1.5 text-xs text-gray-700 hover:bg-green-50/50 p-1 rounded cursor-pointer">
                      <input 
                        type="checkbox" 
                        :value="status" 
                        v-model="filters.statuses" 
                        class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500"
                      >
                      <span class="truncate">{{ status }}</span>
                    </label>
                  </div>
                </div>
                
                <!-- Livestock Type Checkboxes -->
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
                
                <!-- Date Filter -->
                <div class="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-green-100">
                  <h3 class="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Date Range
                  </h3>
                  <div class="space-y-2">
                    <div>
                      <label class="text-xs text-gray-600 block mb-1">From</label>
                      <input v-model="filters.dateFrom" type="date" class="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500/50" />
                    </div>
                    <div>
                      <label class="text-xs text-gray-600 block mb-1">To</label>
                      <input v-model="filters.dateTo" type="date" class="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500/50" />
                    </div>
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
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800">
                  {{ filteredTransactions.length }} {{ filteredTransactions.length === 1 ? 'Order' : 'Orders' }} Found
                </h3>
              </div>
            </div>

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-gray-700">Sort By:</label>
              <select v-model="sortBy" class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                <option value="date-desc">Newest</option>
                <option value="date-asc">Oldest</option>
                <option value="price-asc">Price (Low)</option>
                <option value="price-desc">Price (High)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- FIXED Table with Aligned Headers and Body -->
        <div class="flex-1 overflow-hidden">
          <div class="h-full flex flex-col">
            <!-- Table Container -->
            <div class="flex-1 overflow-auto bg-white">
              <table class="w-full">
                <!-- Fixed Table Header -->
                <thead class="bg-gradient-to-r from-green-50 to-emerald-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/4">Livestock</th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/4">Seller</th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/6">Date</th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/6">Status</th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/6">Amount</th>
                    <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider w-1/12">Actions</th>
                  </tr>
                </thead>
                <!-- Table Body -->
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-green-50/50 transition-colors">
                    <td class="px-4 py-3 whitespace-nowrap w-1/4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-xl object-cover border border-gray-200" :src="transaction.livestock.image" alt="">
                        </div>
                        <div class="ml-3 min-w-0">
                          <div class="text-sm font-medium text-gray-900 truncate">{{ transaction.livestock.type }}</div>
                          <div class="text-xs text-gray-500 truncate">{{ transaction.livestock.breed }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap w-1/4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full object-cover border border-gray-200" :src="transaction.seller.avatar" alt="">
                        </div>
                        <div class="ml-3 min-w-0">
                          <div class="text-sm font-medium text-gray-900 truncate">{{ transaction.seller.name }}</div>
                          <div class="text-xs text-gray-500 truncate">{{ transaction.seller.farm }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 w-1/6">
                      {{ formatDate(transaction.date) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap w-1/6">
                      <span :class="`px-3 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusClass(transaction.status)}`">
                        {{ transaction.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 w-1/6">
                      <div class="flex items-center">
                        <span class="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-xs mr-2">₱</span>
                        {{ transaction.amount.toLocaleString() }}
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium w-1/12">
                      <div class="flex justify-end gap-1">
                        <button 
                          @click="viewDetails(transaction)"
                          class="text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 p-1.5 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          v-if="transaction.status === 'Pending'"
                          @click="cancelOrder(transaction.id)"
                          class="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 p-1.5 rounded-lg transition-colors"
                          title="Cancel Order"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button 
                          v-if="transaction.status === 'Shipped'"
                          @click="confirmDelivery(transaction.id)"
                          class="text-emerald-600 hover:text-emerald-800 bg-emerald-100 hover:bg-emerald-200 p-1.5 rounded-lg transition-colors"
                          title="Confirm Delivery"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Empty State -->
              <div 
                v-if="filteredTransactions.length === 0"
                class="text-center py-12"
              >
                <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md mx-auto text-center shadow-xl">
                  <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800 mb-2">No orders found</h3>
                  <p class="text-xs text-gray-500 mb-4 leading-relaxed">We couldn't find any orders matching your current search criteria. Try adjusting your filters.</p>
                  <button 
                    @click="resetFilters"
                    class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset All Filters
                  </button>
                </div>
              </div>

              <!-- Pagination -->
              <div class="flex items-center justify-between mt-4 px-4 py-2 bg-white/50">
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Showing <span class="font-medium">1</span> to <span class="font-medium">{{ Math.min(filteredTransactions.length, 5) }}</span> of <span class="font-medium">{{ filteredTransactions.length }}</span> results
                    </p>
                  </div>
                  <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Previous</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </button>
                      <button aria-current="page" class="z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        1
                      </button>
                      <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        2
                      </button>
                      <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        3
                      </button>
                      <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Next</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Modal - Fixed Background Interaction -->
    <div v-if="selectedTransaction" class="fixed inset-0 overflow-hidden z-50">
      <div class="absolute inset-0 overflow-hidden">
        <!-- Non-blurred background overlay with pointer-events-none for background visibility -->
        <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <!-- Clickable overlay only on the left side to close modal -->
        <div class="absolute inset-0 pointer-events-auto" @click="closeModalIfClickedOutside"></div>
        
        <!-- Modal positioned on the right -->
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex pointer-events-none">
          <div class="w-screen max-w-md pointer-events-auto">
            <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900">Order Details</h2>
                  <div class="ml-3 h-7 flex items-center">
                    <button 
                      @click="selectedTransaction = null"
                      class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <span class="sr-only">Close panel</span>
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <div class="border-b border-gray-200 pb-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden border border-gray-200">
                          <img :src="selectedTransaction.livestock.image" class="h-full w-full object-cover">
                        </div>
                        <div class="ml-4 flex-1">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>{{ selectedTransaction.livestock.type }} ({{ selectedTransaction.livestock.breed }})</h3>
                              <p class="ml-4 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">
                                ₱{{ selectedTransaction.amount.toLocaleString() }}
                              </p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">{{ selectedTransaction.livestock.description }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="py-6 border-b border-gray-200">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">Seller Information</h3>
                      <div class="flex items-start">
                        <div class="flex-shrink-0">
                          <img class="h-12 w-12 rounded-full border border-gray-200" :src="selectedTransaction.seller.avatar" alt="">
                        </div>
                        <div class="ml-4">
                          <h4 class="text-sm font-medium text-gray-900">{{ selectedTransaction.seller.name }}</h4>
                          <p class="text-sm text-gray-500">{{ selectedTransaction.seller.farm }}</p>
                          <p class="text-sm text-gray-500">{{ selectedTransaction.seller.contact }}</p>
                          <p class="text-sm text-gray-500">{{ selectedTransaction.seller.location }}</p>
                        </div>
                      </div>
                    </div>

                    <div class="py-6 border-b border-gray-200">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                      <dl class="space-y-4">
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Order ID</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ selectedTransaction.id }}</dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Order Date</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ formatDate(selectedTransaction.date) }}</dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Status</dt>
                          <dd class="text-sm font-medium text-gray-900">
                            <span :class="`px-3 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusClass(selectedTransaction.status)}`">
                              {{ selectedTransaction.status }}
                            </span>
                          </dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Payment Method</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ selectedTransaction.paymentMethod }}</dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Delivery Method</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ selectedTransaction.deliveryMethod }}</dd>
                        </div>
                        <div v-if="selectedTransaction.trackingNumber" class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Tracking Number</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ selectedTransaction.trackingNumber }}</dd>
                        </div>
                        <div v-if="selectedTransaction.estimatedDelivery" class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Estimated Delivery</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ formatDate(selectedTransaction.estimatedDelivery) }}</dd>
                        </div>
                      </dl>
                    </div>

                    <div class="py-6">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">Your Message</h3>
                      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p class="text-sm text-gray-700">{{ selectedTransaction.message || "No message provided." }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900 mb-2">
                  <p>Total</p>
                  <p>₱{{ selectedTransaction.amount.toLocaleString() }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                <div class="flex space-x-3">
                  <button 
                    v-if="selectedTransaction.status === 'Pending'"
                    @click="cancelOrder(selectedTransaction.id)"
                    class="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md py-2.5 px-4 flex items-center justify-center text-sm font-medium transition-all shadow hover:shadow-md"
                  >
                    Cancel Order
                  </button>
                  <button 
                    v-if="selectedTransaction.status === 'Shipped'"
                    @click="confirmDelivery(selectedTransaction.id)"
                    class="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-md py-2.5 px-4 flex items-center justify-center text-sm font-medium transition-all shadow hover:shadow-md"
                  >
                    Confirm Delivery
                  </button>
                  <button 
                    @click="selectedTransaction = null"
                    class="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-md py-2.5 px-4 flex items-center justify-center text-sm font-medium transition-all shadow hover:shadow-md border border-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
import { ref, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'

// Interfaces remain the same
interface Livestock {
  id: number
  type: string
  breed: string
  description: string
  image: string
}

interface Seller {
  id: number
  name: string
  farm: string
  contact: string
  location: string
  avatar: string
}

interface Transaction {
  id: string
  livestock: Livestock
  seller: Seller
  date: string
  status: 'Pending' | 'Accepted' | 'Shipped' | 'Completed' | 'Cancelled'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  message?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

// Reactive state
const isSidebarExpanded = ref(true);
const selectedTransaction = ref<Transaction | null>(null);
const sortBy = ref('date-desc');
const showToast = ref(false);
const toastMessage = ref('');

const filters = ref({
  search: '',
  statuses: [] as string[],
  types: [] as string[],
  sellers: [] as string[],
  dateFrom: '',
  dateTo: ''
});

const statusOptions = ['Pending', 'Accepted', 'Shipped', 'Completed', 'Cancelled'];

// Sample data
const transactions = ref<Transaction[]>([
  {
    id: 'ORD-78901',
    livestock: {
      id: 1,
      type: 'Cattle',
      breed: 'Angus',
      description: 'Healthy Angus cattle, vaccinated and dewormed',
      image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 201,
      name: 'Farmers Co-op',
      farm: 'Green Pastures Farm',
      contact: '+63 917 765 4321',
      location: 'Tarlac',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'Pending',
    amount: 45000,
    paymentMethod: 'Bank Transfer',
    deliveryMethod: 'Pickup',
    message: 'I would like to visit the farm to see the cattle before finalizing the purchase.'
  },
  {
    id: 'ORD-78902',
    livestock: {
      id: 2,
      type: 'Pig',
      breed: 'Large White',
      description: 'Healthy pigs ready for market',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 202,
      name: 'Juan Dela Cruz',
      farm: 'Delacruz Swine Farm',
      contact: '+63 918 123 4567',
      location: 'Bulacan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'Accepted',
    amount: 12000,
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Delivery',
    message: 'Need 10 pigs for my restaurant. Can you deliver next week?',
    estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString()
  },
  {
    id: 'ORD-78903',
    livestock: {
      id: 3,
      type: 'Goat',
      breed: 'Boer',
      description: 'Purebred Boer goats, excellent for breeding',
      image: 'https://images.unsplash.com/photo-1551290464-66719418ca54?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 203,
      name: 'Maria Santos',
      farm: 'Mountain View Goat Farm',
      contact: '+63 919 555 6789',
      location: 'Rizal',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    status: 'Completed',
    amount: 24000,
    paymentMethod: 'GCash',
    deliveryMethod: 'Pickup',
    message: 'Looking for quality breeding goats. Please contact me.'
  },
  {
    id: 'ORD-78904',
    livestock: {
      id: 4,
      type: 'Chicken',
      breed: 'Rhode Island Red',
      description: 'Laying hens, 6 months old',
      image: 'https://images.unsplash.com/photo-1589923186200-85bae8f239d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 204,
      name: 'Roberto Cruz',
      farm: 'Cruz Poultry Farm',
      contact: '+63 920 111 2222',
      location: 'Laguna',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
    },
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: 'Shipped',
    amount: 8000,
    paymentMethod: 'GCash',
    deliveryMethod: 'Delivery',
    trackingNumber: 'TRK-789456123',
    estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString()
  },
  {
    id: 'ORD-78905',
    livestock: {
      id: 5,
      type: 'Sheep',
      breed: 'Dorper',
      description: 'Dorper sheep known for excellent meat quality',
      image: 'https://images.unsplash.com/photo-1593369196682-6d8ec3ff3d0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 205,
      name: 'Elena Rodriguez',
      farm: 'Rodriguez Livestock',
      contact: '+63 921 456 2345',
      location: 'Benguet',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: 'Cancelled',
    amount: 30000,
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Pickup',
    message: 'Changed my mind about the purchase.'
  }
]);

// Computed properties
const pendingCount = computed(() => 
  transactions.value.filter(t => t.status === 'Pending').length
);

const totalSpent = computed(() => {
  return transactions.value
    .filter(t => t.status === 'Completed' || t.status === 'Shipped' || t.status === 'Accepted')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});

const uniqueTypes = computed(() => {
  return [...new Set(transactions.value.map(t => t.livestock.type))].sort();
});

const hasActiveFilters = computed(() => {
  return filters.value.search !== '' || 
    filters.value.statuses.length > 0 || 
    filters.value.types.length > 0 ||
    filters.value.sellers.length > 0 ||
    filters.value.dateFrom !== '' ||
    filters.value.dateTo !== '';
});

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => {
    const f = filters.value;
    const matchesSearch = !f.search || 
      transaction.livestock.type.toLowerCase().includes(f.search.toLowerCase()) || 
      transaction.livestock.breed.toLowerCase().includes(f.search.toLowerCase()) || 
      transaction.seller.name.toLowerCase().includes(f.search.toLowerCase()) ||
      transaction.seller.farm.toLowerCase().includes(f.search.toLowerCase()) ||
      transaction.id.toLowerCase().includes(f.search.toLowerCase());
    
    const matchesStatus = f.statuses.length === 0 || f.statuses.includes(transaction.status);
    const matchesType = f.types.length === 0 || f.types.includes(transaction.livestock.type);
    const matchesSeller = f.sellers.length === 0 || f.sellers.includes(transaction.seller.name);
    
    // Date filtering
    let matchesDate = true;
    if (f.dateFrom || f.dateTo) {
      const transactionDate = new Date(transaction.date);
      const fromDate = f.dateFrom ? new Date(f.dateFrom) : null;
      const toDate = f.dateTo ? new Date(f.dateTo) : null;
      
      if (fromDate && transactionDate < fromDate) matchesDate = false;
      if (toDate && transactionDate > toDate) matchesDate = false;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesSeller && matchesDate;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    switch (sortBy.value) {
      case 'date-desc': return dateB - dateA;
      case 'date-asc': return dateA - dateB;
      case 'price-asc': return a.amount - b.amount;
      case 'price-desc': return b.amount - a.amount;
      default: return dateB - dateA;
    }
  });
});

// Methods
const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const resetFilters = () => {
  filters.value = {
    search: '',
    statuses: [],
    types: [],
    sellers: [],
    dateFrom: '',
    dateTo: ''
  };
  showToastNotification('All filters have been reset');
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};

const viewDetails = (transaction: Transaction): void => {
  selectedTransaction.value = transaction;
};

const cancelOrder = (id: string): void => {
  const index = transactions.value.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.value[index].status = 'Cancelled';
    selectedTransaction.value = null;
    showToastNotification('Order cancelled successfully!');
  }
};

const confirmDelivery = (id: string): void => {
  const index = transactions.value.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.value[index].status = 'Completed';
    selectedTransaction.value = null;
    showToastNotification('Delivery confirmed successfully!');
  }
};

const closeModalIfClickedOutside = (event: Event) => {
  if (event.target === event.currentTarget) {
    selectedTransaction.value = null;
  }
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Accepted': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'Completed': return 'bg-green-100 text-green-800 border-green-300';
    case 'Cancelled': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};
</script>