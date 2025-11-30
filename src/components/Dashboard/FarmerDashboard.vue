<!-- components/FarmerDashboard.vue -->
<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
      <!-- Total Listings Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Total Listings</p>
            <p class="text-lg font-bold text-gray-900 mt-0.5">{{ stats.totalListings || 0 }}</p>
            <div class="mt-1 flex items-center text-[10px] text-gray-500">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                <svg class="-ml-0.5 mr-0.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {{ stats.listingsGrowth || 0 }}%
              </span>
            </div>
          </div>
          <div class="p-1.5 rounded-lg bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Listings Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Active Listings</p>
            <p class="text-lg font-bold text-gray-900 mt-0.5">{{ stats.activeListings || 0 }}</p>
            <div class="mt-1">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800">
                {{ stats.totalViews || 0 }} views
              </span>
            </div>
          </div>
          <div class="p-1.5 rounded-lg bg-blue-100 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Revenue Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
            <p class="text-lg font-bold text-gray-900 mt-0.5">₱{{ formatNumber(actualTotalSoldRevenue) }}</p>
            <div class="mt-1 flex items-center text-[10px] text-gray-500">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                From sales
              </span>
            </div>
          </div>
          <div class="p-1.5 rounded-lg bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Messages Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Messages</p>
            <p class="text-lg font-bold text-gray-900 mt-0.5">{{ actualTotalMessages }}</p>
            <div class="mt-1">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800">
                {{ actualUnreadMessages }} unread
              </span>
            </div>
          </div>
          <div class="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Rating Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Farm Rating</p>
            <div class="flex items-center mt-0.5">
              <span class="text-lg font-bold text-gray-900">{{ stats.rating || '0.0' }}</span>
              <div class="flex ml-1.5">
                <svg v-for="i in 5" :key="i" 
                     class="h-3 w-3" 
                     :class="i <= Math.floor(stats.rating || 0) ? 'text-yellow-400' : 'text-gray-300'" 
                     fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.540 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div class="mt-1">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800">
                {{ stats.totalReviews || 0 }} reviews
              </span>
            </div>
          </div>
          <div class="p-1.5 rounded-lg bg-teal-100 text-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Analytics Section with Charts -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-white">Revenue & Sales Performance</h3>
                <p class="mt-0.5 text-[10px] text-emerald-100">Your earnings at a glance</p>
              </div>
              <div class="flex space-x-2">
                <!-- Sales Report Button -->
                <button 
                  @click="handleOpenSalesReport"
                  class="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded shadow-sm transition-colors backdrop-blur-md border border-white/30 flex items-center gap-1.5 cursor-pointer"
                  title="View Full Sales Report"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span class="hidden sm:inline text-xs font-medium">Sales Report</span>
                </button>
                
                <!-- Time Range Buttons -->
                <div class="flex space-x-1">
                  <button 
                    class="text-[10px] px-2 py-1 bg-white/20 text-white rounded hover:bg-white/30 transition-colors"
                    @click="$emit('time-range-change', 'monthly')" 
                    :class="{ 'bg-white/30': timeRange === 'monthly' }"
                  >
                    Monthly
                  </button>
                  <button 
                    class="text-[10px] px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                    @click="$emit('time-range-change', 'quarterly')" 
                    :class="{ 'bg-white/30': timeRange === 'quarterly' }"
                  >
                    Quarterly
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Revenue Chart -->
              <div>
                <h4 class="text-xs font-medium text-gray-700 mb-2">Earnings Overview</h4>
                <div class="h-48 relative">
                  <canvas :id="`revenue-chart-${chartId}`"></canvas>
                </div>
              </div>

              <!-- Category Breakdown Chart -->
              <div>
                <h4 class="text-xs font-medium text-gray-700 mb-2">Sales by Category</h4>
                <div class="h-48 relative">
                  <canvas :id="`category-chart-${chartId}`"></canvas>
                </div>
              </div>
            </div>

            <!-- Summary Cards - 3 CARDS -->
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- Total Sold Revenue -->
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-[10px] font-medium text-gray-500">Total Sold Revenue</p>
                <p class="text-base font-bold text-gray-900 mt-0.5">₱{{ formatNumber(actualTotalSoldRevenue) }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">From completed sales</p>
              </div>
              
              <!-- Total Orders Sold -->
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-[10px] font-medium text-gray-500">Total Orders Sold</p>
                <p class="text-base font-bold text-gray-900 mt-0.5">{{ actualTotalSold }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">{{ actualCompletedOrders }} completed orders</p>
              </div>
              
              <!-- Total Units Sold -->
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-[10px] font-medium text-gray-500">Total Livestock Sold</p>
                <p class="text-base font-bold text-gray-900 mt-0.5">{{ actualTotalUnitsSold }} heads</p>
                <p class="text-[10px] text-gray-500 mt-0.5">From completed transactions</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Table Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-white">Your Livestock Inventory</h3>
                <p class="mt-0.5 text-[10px] text-emerald-100">Manage your livestock listings</p>
              </div>
              <router-link to="/LivestockManagement"
                class="text-[10px] font-medium text-white hover:text-emerald-100 flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="relative">
            <div class="max-h-60 overflow-y-auto">
              <table class="w-full">
                <thead class="bg-white sticky top-0 z-10">
                  <tr>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Livestock</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200/50">
                  <tr v-if="tableData.length === 0" class="hover:bg-gray-50/80 transition-colors">
                    <td colspan="7" class="px-4 py-6 text-center text-gray-500">
                      <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p class="mt-2 text-xs">No livestock listings found</p>
                    </td>
                  </tr>
                  <tr v-for="(item, index) in tableData.slice(0, 3)" :key="index" class="hover:bg-gray-50/80 transition-colors">
                    <td class="px-3 py-2.5 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-8 w-8 flex-shrink-0">
                          <img class="h-8 w-8 rounded-full object-cover" :src="item.image" :alt="item.name" />
                        </div>
                        <div class="ml-2">
                          <div class="text-xs font-medium text-gray-900">{{ item.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap">
                      <span class="px-1.5 py-0.5 text-[10px] font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                        {{ item.type }}
                      </span>
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap text-xs text-gray-900 font-semibold">
                      {{ item.price }}
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap">
                      <span :class="item.statusClass" class="px-1.5 py-0.5 text-[10px] font-medium rounded-full">
                        {{ item.status }}
                      </span>
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap text-xs text-gray-900 hidden sm:table-cell">
                      {{ item.stock }}
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap hidden md:table-cell">
                      <span class="text-xs text-gray-500">{{ item.date }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">

        <!-- Messages Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-white">Recent Messages</h3>
                <p class="mt-0.5 text-[10px] text-emerald-100">Latest inquiries about your listings</p>
              </div>
              <router-link to="/messages" class="text-[10px] font-medium text-white hover:text-emerald-100 flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="divide-y divide-gray-200/50">
            <div v-if="displayMessages.length === 0" class="p-4 text-center text-gray-500">
              <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p class="mt-2 text-xs">No messages yet</p>
            </div>
            <div v-else>
              <ul class="divide-y divide-gray-200/50">
                <li v-for="message in displayMessages.slice(0, 2)" :key="message.id" class="px-4 py-3 hover:bg-gray-50/50 transition-colors">
                  <div class="flex items-start">
                    <img class="h-7 w-7 rounded-full" :src="message.avatar" :alt="message.name" />
                    <div class="ml-2.5 flex-1">
                      <div class="flex items-center justify-between">
                        <h4 class="text-xs font-medium text-gray-900">{{ message.name }}</h4>
                        <span class="text-[10px] text-gray-500">{{ message.time }}</span>
                      </div>
                      <p class="text-[10px] text-gray-600 mt-0.5 truncate">{{ message.message }}</p>
                      <div class="mt-1.5 flex space-x-2">
                        <router-link to="/messages" class="text-[10px] font-medium text-emerald-600 hover:text-emerald-700">Reply</router-link>
                        <button v-if="message.listingId" @click="viewListing(message.listingId)" class="text-[10px] font-medium text-gray-600 hover:text-gray-700">View Listing</button>
                      </div>
                    </div>
                    <span v-if="message.unread" class="ml-2 flex-shrink-0">
                      <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- ✅ UPDATED: Farm Analytics Section with PIE CHARTS -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <h3 class="text-sm font-semibold text-white">Farm Analytics</h3>
            <p class="mt-0.5 text-[10px] text-emerald-100">Your livestock statistics at a glance</p>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <!-- ✅ PIE CHART: Livestock Posted by Type -->
              <div>
                <h4 class="text-[10px] font-medium text-gray-700 mb-2">Livestock Posted by Type</h4>
                <div class="h-48 relative flex items-center justify-center">
                  <canvas :id="`distribution-chart-${chartId}`"></canvas>
                </div>
              </div>
              
              <!-- Posted Livestock Breakdown -->
              <div>
                <h4 class="text-[10px] font-medium text-gray-700 mb-2">Posted Livestock</h4>
                <div class="space-y-2">
                  <div v-if="postedLivestockBreakdown.length === 0" class="text-center py-3">
                    <p class="text-xs text-gray-500">No livestock posted yet</p>
                  </div>
                  <div v-else v-for="livestock in postedLivestockBreakdown" :key="livestock.type" class="flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full mr-1.5" :style="`background-color: ${livestock.color}`"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-[10px]">
                        <span class="font-medium text-gray-700">{{ livestock.type }}</span>
                        <span class="text-gray-500">
                          {{ livestock.count }} ({{ livestock.percentage }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full" :style="`width: ${livestock.percentage}%; background-color: ${livestock.color}`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- ✅ PIE CHART: Status Overview -->
              <div>
                <h4 class="text-[10px] font-medium text-gray-700 mb-2">Status Overview</h4>
                <div class="h-48 relative flex items-center justify-center">
                  <canvas :id="`status-chart-${chartId}`"></canvas>
                </div>
              </div>

              <!-- Status Breakdown List -->
              <div>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full mr-1.5 bg-green-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-[10px]">
                        <span class="font-medium text-gray-700">Available</span>
                        <span class="text-gray-500">
                          {{ stats.statusBreakdown?.available || 0 }} ({{ Math.round(((stats.statusBreakdown?.available || 0) / (stats.totalListings || 1)) * 100) }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full bg-green-500" :style="`width: ${Math.round(((stats.statusBreakdown?.available || 0) / (stats.totalListings || 1)) * 100)}%`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full mr-1.5 bg-yellow-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-[10px]">
                        <span class="font-medium text-gray-700">Low Stock</span>
                        <span class="text-gray-500">
                          {{ stats.statusBreakdown?.lowStock || 0 }} ({{ Math.round(((stats.statusBreakdown?.lowStock || 0) / (stats.totalListings || 1)) * 100) }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full bg-yellow-500" :style="`width: ${Math.round(((stats.statusBreakdown?.lowStock || 0) / (stats.totalListings || 1)) * 100)}%`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full mr-1.5 bg-red-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-[10px]">
                        <span class="font-medium text-gray-700">Out of Stock</span>
                        <span class="text-gray-500">
                          {{ stats.statusBreakdown?.outOfStock || 0 }} ({{ Math.round(((stats.statusBreakdown?.outOfStock || 0) / (stats.totalListings || 1)) * 100) }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full bg-red-500" :style="`width: ${Math.round(((stats.statusBreakdown?.outOfStock || 0) / (stats.totalListings || 1)) * 100)}%`"></div>
                      </div>
                    </div>
                  </div>
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
import { ref, computed, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Chart, registerables } from 'chart.js'
import type { DashboardProps, DashboardEmits } from '@/types/dashboardTypes'
import { transactionService } from '@/services/transactionsService'
import type { FarmerTransaction } from '@/types/transactionTypes'
import type { Animal } from '@/types/managementTypes'
import { LivestockService } from '@/services/livestockService'
import { MessagesService } from '@/services/messagesService'
import type { Conversation } from '@/types/messages'
import { supabase } from '@/supabase'

// Register Chart.js components
Chart.register(...registerables)

const props = defineProps<DashboardProps>()
const emit = defineEmits<DashboardEmits>()
const router = useRouter()

// Generate unique chart ID
const chartId = Math.random().toString(36).substring(7)

// Store chart instances
let revenueChart: Chart | null = null
let categoryChart: Chart | null = null
let distributionChart: Chart | null = null
let statusChart: Chart | null = null

// Store transaction data
const transactionsData = ref<FarmerTransaction[]>([])

// Store posted livestock data
const postedLivestock = ref<Animal[]>([])

// Store conversations data
const conversations = ref<Conversation[]>([])

const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

const handleOpenSalesReport = () => {
  emit('open-sales-report')
}

/**
 * Format relative time
 */
const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Navigate to listing detail
 */
const viewListing = (listingId: string) => {
  router.push(`/marketplace/${listingId}`)
}

/**
 * Computed property for display messages
 */
const displayMessages = computed(() => {
  return conversations.value
    .sort((a, b) => {
      const dateA = a.lastMessage?.createdAt || a.updatedAt
      const dateB = b.lastMessage?.createdAt || b.updatedAt
      return dateB.getTime() - dateA.getTime()
    })
    .map(conv => {
      const otherUser = conv.users.find(u => u.id !== currentUserId.value)
      
      return {
        id: conv.id,
        name: otherUser?.name || 'Unknown User',
        avatar: otherUser?.avatar || 'https://ui-avatars.com/api/?name=Unknown&background=10b981&color=fff',
        message: conv.lastMessage?.content || 'No messages yet',
        time: conv.lastMessage ? formatRelativeTime(conv.lastMessage.createdAt) : formatRelativeTime(conv.createdAt),
        unread: conv.unreadCount > 0,
        listingId: conv.listing?.id
      }
    })
})

/**
 * Computed property for actual total messages
 */
const actualTotalMessages = computed(() => {
  return conversations.value.length
})

/**
 * Computed property for actual unread messages
 */
const actualUnreadMessages = computed(() => {
  return conversations.value.reduce((total, conv) => total + conv.unreadCount, 0)
})

/**
 * Computed property for total sold revenue (from completed transactions)
 */
const actualTotalSoldRevenue = computed(() => {
  const completedTransactions = transactionsData.value.filter(
    tx => tx.status === 'Completed'
  )
  
  return completedTransactions.reduce((total, tx) => {
    return total + tx.amount
  }, 0)
})

/**
 * Computed property for actual total orders sold
 */
const actualTotalSold = computed(() => {
  const completedTransactions = transactionsData.value.filter(
    tx => tx.status === 'Completed'
  )
  return completedTransactions.length
})

/**
 * Computed property for actual completed orders count
 */
const actualCompletedOrders = computed(() => {
  return transactionsData.value.filter(
    tx => tx.status === 'Completed'
  ).length
})

/**
 * Computed property for actual total units (heads) sold
 */
const actualTotalUnitsSold = computed(() => {
  const completedTransactions = transactionsData.value.filter(
    tx => tx.status === 'Completed'
  )
  
  return completedTransactions.reduce((total, tx) => {
    return total + tx.quantity
  }, 0)
})

/**
 * Computed property for posted livestock breakdown
 */
const postedLivestockBreakdown = computed(() => {
  const typeCount: { [key: string]: number } = {}
  
  postedLivestock.value.forEach(animal => {
    const type = animal.type
    if (!typeCount[type]) {
      typeCount[type] = 0
    }
    typeCount[type] += 1
  })
  
  const total = postedLivestock.value.length
  
  const colors = [
    '#10b981', // green
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ef4444', // red
    '#14b8a6', // teal
    '#f97316', // orange
    '#ec4899'  // pink
  ]
  
  return Object.entries(typeCount)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count], index) => ({
      type,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      color: colors[index % colors.length]
    }))
})

// Current user ID
const currentUserId = ref<string>('')

/**
 * Load current user ID
 */
const loadCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      currentUserId.value = user.id
    }
  } catch (error) {
    console.error('❌ Error loading current user:', error)
  }
}

/**
 * Load conversations data
 */
const loadConversations = async () => {
  try {
    if (!currentUserId.value) return
    
    const result = await MessagesService.getConversations(currentUserId.value)
    if (result.success && result.data) {
      conversations.value = result.data
      console.log('✅ Loaded conversations:', conversations.value.length, 'conversations')
    }
  } catch (error) {
    console.error('❌ Error loading conversations:', error)
  }
}

/**
 * Load transaction data
 */
const loadTransactionData = async () => {
  try {
    const result = await transactionService.getFarmerTransactions()
    if (result.success && result.data) {
      transactionsData.value = result.data
      console.log('✅ Loaded transaction data:', transactionsData.value.length, 'transactions')
    }
  } catch (error) {
    console.error('❌ Error loading transaction data:', error)
  }
}

/**
 * Load posted livestock data
 */
const loadPostedLivestock = async () => {
  try {
    const result = await LivestockService.getMyListings()
    if (result.success && result.data) {
      postedLivestock.value = result.data
      console.log('✅ Loaded posted livestock:', postedLivestock.value.length, 'listings')
    }
  } catch (error) {
    console.error('❌ Error loading posted livestock:', error)
  }
}

/**
 * Create Revenue Chart with ACTUAL transaction data
 */
const createRevenueChart = async () => {
  const ctx = document.getElementById(`revenue-chart-${chartId}`) as HTMLCanvasElement
  if (!ctx) return

  if (revenueChart) {
    revenueChart.destroy()
  }

  try {
    const transactions = transactionsData.value
    
    const validTransactions = transactions.filter(
      tx => tx.status === 'Completed' || tx.status === 'Accepted'
    )

    if (validTransactions.length === 0) {
      console.warn('⚠️ No valid transactions for revenue chart')
      createEmptyRevenueChart(ctx)
      return
    }

    const monthlyRevenue: { [key: string]: number } = {}
    
    validTransactions.forEach(tx => {
      const date = new Date(tx.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0
      }
      monthlyRevenue[monthKey] += tx.amount
    })

    const months: string[] = []
    const revenueData: number[] = []
    const currentDate = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short' })
      
      months.push(monthLabel)
      revenueData.push(monthlyRevenue[monthKey] || 0)
    }

    revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Revenue (₱)',
          data: revenueData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 8,
            cornerRadius: 6,
            titleFont: { size: 11 },
            bodyFont: { size: 10 },
            callbacks: {
              label: (context) => '₱' + context.parsed.y.toLocaleString()
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 9 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              font: { size: 9 },
              callback: (value) => '₱' + (Number(value) / 1000).toFixed(0) + 'K'
            }
          }
        }
      }
    })

    console.log('✅ Revenue chart created with actual transaction data')
  } catch (error) {
    console.error('❌ Error creating revenue chart:', error)
    createEmptyRevenueChart(ctx)
  }
}

const createEmptyRevenueChart = (ctx: HTMLCanvasElement) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  
  revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Revenue (₱)',
        data: [0, 0, 0, 0, 0, 0],
        borderColor: '#d1d5db',
        backgroundColor: 'rgba(209, 213, 219, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 9 } }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
          ticks: {
            font: { size: 9 },
            callback: (value) => '₱0'
          }
        }
      }
    }
  })
}

/**
 * Create Category Chart with ACTUAL transaction data
 */
const createCategoryChart = async () => {
  const ctx = document.getElementById(`category-chart-${chartId}`) as HTMLCanvasElement
  if (!ctx) return

  if (categoryChart) {
    categoryChart.destroy()
  }

  try {
    const transactions = transactionsData.value
    
    const validTransactions = transactions.filter(
      tx => tx.status === 'Completed' || tx.status === 'Accepted'
    )

    if (validTransactions.length === 0) {
      console.warn('⚠️ No valid transactions for category chart')
      createEmptyCategoryChart(ctx)
      return
    }

    const categoryRevenue: { [key: string]: number } = {}
    
    validTransactions.forEach(tx => {
      const type = tx.animal.type
      if (!categoryRevenue[type]) {
        categoryRevenue[type] = 0
      }
      categoryRevenue[type] += tx.amount
    })

    const totalRevenue = Object.values(categoryRevenue).reduce((sum, val) => sum + val, 0)
    
    const sortedCategories = Object.entries(categoryRevenue)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const labels = sortedCategories.map(([type]) => type)
    const data = sortedCategories.map(([, revenue]) => 
      Math.round((revenue / totalRevenue) * 100)
    )

    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#6b7280']

    categoryChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 10,
              font: { size: 9 }
            }
          },
          tooltip: {
            titleFont: { size: 10 },
            bodyFont: { size: 9 },
            callbacks: {
              label: (context) => {
                const label = context.label || ''
                const value = context.parsed || 0
                return `${label}: ${value}%`
              }
            }
          }
        }
      }
    })

    console.log('✅ Category chart created with actual transaction data')
  } catch (error) {
    console.error('❌ Error creating category chart:', error)
    createEmptyCategoryChart(ctx)
  }
}

const createEmptyCategoryChart = (ctx: HTMLCanvasElement) => {
  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['No Data'],
      datasets: [{
        data: [100],
        backgroundColor: ['#e5e7eb'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 10,
            font: { size: 9 }
          }
        },
        tooltip: { enabled: false }
      }
    }
  })
}

/**
 * ✅ NEW: Create Distribution PIE Chart with ACTUAL posted livestock data
 */
const createDistributionChart = () => {
  const ctx = document.getElementById(`distribution-chart-${chartId}`) as HTMLCanvasElement
  if (!ctx) return

  if (distributionChart) {
    distributionChart.destroy()
  }

  // Count posted livestock by type
  const typeCounts: { [key: string]: number } = {}
  
  postedLivestock.value.forEach(animal => {
    const type = animal.type
    if (!typeCounts[type]) {
      typeCounts[type] = 0
    }
    typeCounts[type] += 1
  })

  // Get unique types and their counts
  const sortedTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
  
  const labels = sortedTypes.map(([type]) => type)
  const data = sortedTypes.map(([, count]) => count)
  
  // Define colors for different types
  const colors = [
    '#10b981', // green
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ef4444', // red
    '#14b8a6', // teal
    '#f97316', // orange
    '#ec4899'  // pink
  ]

  if (data.length === 0) {
    // Show empty state
    distributionChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['No Data'],
        datasets: [{
          data: [100],
          backgroundColor: ['#e5e7eb'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 8,
              font: { size: 9 }
            }
          },
          tooltip: { enabled: false }
        }
      }
    })
  } else {
    distributionChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 8,
              font: { size: 9 }
            }
          },
          tooltip: {
            titleFont: { size: 10 },
            bodyFont: { size: 9 },
            callbacks: {
              label: (context) => {
                const label = context.label || ''
                const value = context.parsed || 0
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              }
            }
          }
        }
      }
    })
  }
}

/**
 * ✅ NEW: Create Status PIE Chart
 */
const createStatusChart = () => {
  const ctx = document.getElementById(`status-chart-${chartId}`) as HTMLCanvasElement
  if (!ctx) return

  if (statusChart) {
    statusChart.destroy()
  }

  const available = props.stats.statusBreakdown?.available || 0
  const lowStock = props.stats.statusBreakdown?.lowStock || 0
  const outOfStock = props.stats.statusBreakdown?.outOfStock || 0
  
  const total = available + lowStock + outOfStock

  if (total === 0) {
    // Show empty state
    statusChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['No Data'],
        datasets: [{
          data: [100],
          backgroundColor: ['#e5e7eb'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 8,
              font: { size: 9 }
            }
          },
          tooltip: { enabled: false }
        }
      }
    })
  } else {
    const labels: string[] = []
    const data: number[] = []
    const colors: string[] = []

    if (available > 0) {
      labels.push('Available')
      data.push(available)
      colors.push('#10b981')
    }
    if (lowStock > 0) {
      labels.push('Low Stock')
      data.push(lowStock)
      colors.push('#f59e0b')
    }
    if (outOfStock > 0) {
      labels.push('Out of Stock')
      data.push(outOfStock)
      colors.push('#ef4444')
    }

    statusChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 8,
              font: { size: 9 }
            }
          },
          tooltip: {
            titleFont: { size: 10 },
            bodyFont: { size: 9 },
            callbacks: {
              label: (context) => {
                const label = context.label || ''
                const value = context.parsed || 0
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              }
            }
          }
        }
      }
    })
  }
}

// Initialize all charts
const initializeCharts = async () => {
  await nextTick()
  await loadCurrentUser()
  await loadTransactionData()
  await loadPostedLivestock()
  await loadConversations()
  await createRevenueChart()
  await createCategoryChart()
  createDistributionChart()
  createStatusChart()
}

// Cleanup charts
const destroyCharts = () => {
  if (revenueChart) revenueChart.destroy()
  if (categoryChart) categoryChart.destroy()
  if (distributionChart) distributionChart.destroy()
  if (statusChart) statusChart.destroy()
}

onMounted(() => {
  initializeCharts()
})

watch(() => props.stats, () => {
  initializeCharts()
}, { deep: true })

onBeforeUnmount(() => {
  destroyCharts()
})
</script>