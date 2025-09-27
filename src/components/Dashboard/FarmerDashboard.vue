<!-- components/FarmerDashboard.vue -->
<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <!-- Total Listings Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Listings</p>
            <p class="text-xl font-bold text-gray-900 mt-1">{{ stats.totalListings || 0 }}</p>
            <div class="mt-2 flex items-center text-xs text-gray-500">
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                <svg class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {{ stats.listingsGrowth || 0 }}%
              </span>
              <span class="ml-1">from last month</span>
            </div>
          </div>
          <div class="p-2.5 rounded-lg bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Listings Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Listings</p>
            <p class="text-xl font-bold text-gray-900 mt-1">{{ stats.activeListings || 0 }}</p>
            <div class="mt-2">
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {{ stats.totalViews || 0 }} views
              </span>
            </div>
          </div>
          <div class="p-2.5 rounded-lg bg-blue-100 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Revenue Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
            <p class="text-xl font-bold text-gray-900 mt-1">₱{{ formatNumber(stats.totalRevenue || 0) }}</p>
            <div class="mt-2 flex items-center text-xs text-gray-500">
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                <svg class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {{ stats.revenueGrowth || 0 }}%
              </span>
              <span class="ml-1">from last month</span>
            </div>
          </div>
          <div class="p-2.5 rounded-lg bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Messages Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</p>
            <p class="text-xl font-bold text-gray-900 mt-1">{{ stats.totalMessages || 0 }}</p>
            <div class="mt-2">
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                {{ stats.unreadMessages || 0 }} unread
              </span>
            </div>
          </div>
          <div class="p-2.5 rounded-lg bg-emerald-100 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Rating Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Farm Rating</p>
            <div class="flex items-center mt-1">
              <span class="text-xl font-bold text-gray-900">{{ stats.rating || '0.0' }}</span>
              <div class="flex ml-2">
                <svg v-for="i in 5" :key="i" 
                     class="h-4 w-4" 
                     :class="i <= Math.floor(stats.rating || 0) ? 'text-yellow-400' : 'text-gray-300'" 
                     fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.540 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div class="mt-2">
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {{ stats.totalReviews || 0 }} reviews
              </span>
            </div>
          </div>
          <div class="p-2.5 rounded-lg bg-teal-100 text-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Analytics Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
          <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Revenue & Sales Performance</h3>
                <p class="mt-1 text-xs text-emerald-100">Your earnings at a glance</p>
              </div>
              <div class="flex space-x-2">
                <button class="text-xs px-2 py-1 bg-white/20 text-white rounded hover:bg-white/30 transition-colors"
                  @click="$emit('time-range-change', 'monthly')" :class="{ 'bg-white/30': timeRange === 'monthly' }">
                  Monthly
                </button>
                <button class="text-xs px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                  @click="$emit('time-range-change', 'quarterly')" :class="{ 'bg-white/30': timeRange === 'quarterly' }">
                  Quarterly
                </button>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Chart Placeholder -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-3">Earnings Overview</h4>
                <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500">Chart will load here</p>
                  </div>
                </div>
              </div>

              <!-- Breakdown Placeholder -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-3">Earnings Breakdown</h4>
                <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500">Breakdown chart will load here</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary Cards -->
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-xs font-medium text-gray-500">Avg. Selling Price</p>
                <p class="text-lg font-bold text-gray-900 mt-1">₱{{ formatNumber(stats.averagePrice || 0) }}</p>
                <p class="text-xs text-gray-500 mt-1">+{{ stats.priceGrowth || 0 }}% from last month</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-xs font-medium text-gray-500">Total Units Sold</p>
                <p class="text-lg font-bold text-gray-900 mt-1">{{ stats.totalUnits || 0 }}</p>
                <p class="text-xs text-gray-500 mt-1">+{{ stats.unitsGrowth || 0 }}% from last month</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-xs font-medium text-gray-500">Conversion Rate</p>
                <p class="text-lg font-bold text-gray-900 mt-1">{{ stats.conversionRate || '0.0' }}%</p>
                <p class="text-xs text-gray-500 mt-1">+{{ stats.conversionGrowth || 0 }}% from last month</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Table Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
          <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Your Livestock Inventory</h3>
                <p class="mt-1 text-xs text-emerald-100">Manage your livestock listings</p>
              </div>
              <router-link to="/your-livestock"
                class="text-xs font-medium text-white hover:text-emerald-100 flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="relative">
            <div class="max-h-64 overflow-y-auto">
              <table class="w-full">
                <thead class="bg-white sticky top-0 z-10">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livestock</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200/50">
                  <tr v-if="tableData.length === 0" class="hover:bg-gray-50/80 transition-colors">
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p class="mt-2">No livestock listings found</p>
                    </td>
                  </tr>
                  <tr v-for="(item, index) in tableData.slice(0, 3)" :key="index" class="hover:bg-gray-50/80 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img class="h-10 w-10 rounded-full object-cover" :src="item.image" :alt="item.name" />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                        {{ item.type }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {{ item.price }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="item.statusClass" class="px-2 py-1 text-xs font-medium rounded-full">
                        {{ item.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.stock }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm text-gray-500">{{ item.date }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <button class="text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 p-2 rounded-full transition-all duration-200" title="View Details">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Analytics Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
          <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <h3 class="text-lg font-semibold text-white">Farm Analytics</h3>
            <p class="mt-1 text-xs text-emerald-100">Your livestock statistics at a glance</p>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div>
                <h4 class="text-xs font-medium text-gray-700 mb-3">Livestock Distribution</h4>
                <div class="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500">Analytics chart will load here</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-xs font-medium text-gray-700 mb-3">Status Overview</h4>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <div class="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-xs">
                        <span class="font-medium text-gray-700">Available</span>
                        <span class="text-gray-500">
                          {{ stats.statusBreakdown?.available || 0 }} ({{ Math.round(((stats.statusBreakdown?.available || 0) / (stats.totalListings || 1)) * 100) }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div class="h-1.5 rounded-full bg-green-500" :style="`width: ${Math.round(((stats.statusBreakdown?.available || 0) / (stats.totalListings || 1)) * 100)}%`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="w-2 h-2 rounded-full mr-2 bg-yellow-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-xs">
                        <span class="font-medium text-gray-700">Low Stock</span>
                        <span class="text-gray-500">
                          {{ stats.statusBreakdown?.lowStock || 0 }} ({{ Math.round(((stats.statusBreakdown?.lowStock || 0) / (stats.totalListings || 1)) * 100) }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div class="h-1.5 rounded-full bg-yellow-500" :style="`width: ${Math.round(((stats.statusBreakdown?.lowStock || 0) / (stats.totalListings || 1)) * 100)}%`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-xs">
                        <span class="font-medium text-gray-700">Out of Stock</span>
                        <span class="text-gray-500">
                          {{ stats.statusBreakdown?.outOfStock || 0 }} ({{ Math.round(((stats.statusBreakdown?.outOfStock || 0) / (stats.totalListings || 1)) * 100) }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div class="h-1.5 rounded-full bg-red-500" :style="`width: ${Math.round(((stats.statusBreakdown?.outOfStock || 0) / (stats.totalListings || 1)) * 100)}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Messages Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
          <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Recent Messages</h3>
                <p class="mt-1 text-xs text-emerald-100">Latest inquiries about your listings</p>
              </div>
              <router-link to="/messages" class="text-xs font-medium text-white hover:text-emerald-100 flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="divide-y divide-gray-200/50">
            <div v-if="messages.length === 0" class="p-6 text-center text-gray-500">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p class="mt-2">No messages yet</p>
            </div>
            <div v-else>
              <ul class="divide-y divide-gray-200/50">
                <li v-for="message in messages.slice(0, 2)" :key="message.id" class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <div class="flex items-start">
                    <img class="h-8 w-8 rounded-full" :src="message.avatar" :alt="message.name" />
                    <div class="ml-3 flex-1">
                      <div class="flex items-center justify-between">
                        <h4 class="text-sm font-medium text-gray-900">{{ message.name }}</h4>
                        <span class="text-xs text-gray-500">{{ message.time }}</span>
                      </div>
                      <p class="text-xs text-gray-600 mt-1 truncate">{{ message.message }}</p>
                      <div class="mt-2 flex space-x-2">
                        <button class="text-xs font-medium text-emerald-600 hover:text-emerald-700">Reply</button>
                        <button class="text-xs font-medium text-gray-600 hover:text-gray-700">View Listing</button>
                      </div>
                    </div>
                    <span v-if="message.unread" class="ml-2 flex-shrink-0">
                      <span class="h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardProps, DashboardEmits } from '@/services/dashboard'

defineProps<DashboardProps>()
const emit = defineEmits<DashboardEmits>()

const formatNumber = (num: number): string => {
  return num.toLocaleString()
}
</script>