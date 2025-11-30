<!-- components/BuyerDashboard.vue -->
<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
      <!-- Total Orders Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
            <p class="text-lg font-bold text-gray-900 mt-0.5">{{ actualTotalOrders }}</p>
            <div class="mt-1 flex items-center text-[10px] text-gray-500">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                <svg class="-ml-0.5 mr-0.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {{ stats.ordersGrowth || 0 }}%
              </span>
            </div>
          </div>
          <div class="p-1.5 rounded-lg bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Pending Orders Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Pending Orders</p>
            <p class="text-lg font-bold text-gray-900 mt-0.5">{{ actualPendingOrders }}</p>
            <div class="mt-1">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800">
                Awaiting shipment
              </span>
            </div>
          </div>
          <div class="p-1.5 rounded-lg bg-yellow-100 text-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Spent Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md border border-white/30 p-3 transition-all hover:shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Total Spent</p>
            <p class="text-lg font-bold text-gray-900 mt-0.5">₱{{ formatNumber(actualTotalSpent) }}</p>
            <div class="mt-1 flex items-center text-[10px] text-gray-500">
              <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800">
                All purchases
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
            <p class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Buyer Rating</p>
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
        <!-- Quick Actions Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <h3 class="text-sm font-semibold text-white">Quick Actions</h3>
            <p class="mt-0.5 text-[10px] text-emerald-100">Manage your buyer account</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <router-link to="/marketplace" class="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors">
                <div class="bg-green-100 text-green-600 p-1.5 rounded-full inline-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p class="text-[10px] font-medium text-gray-700 mt-1.5">Browse Livestock</p>
              </router-link>

              <router-link to="/transactions" class="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors">
                <div class="bg-emerald-100 text-emerald-600 p-1.5 rounded-full inline-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p class="text-[10px] font-medium text-gray-700 mt-1.5">My Purchases</p>
              </router-link>

              <router-link to="/messages" class="bg-teal-50 hover:bg-teal-100 rounded-lg p-3 text-center transition-colors">
                <div class="bg-teal-100 text-teal-600 p-1.5 rounded-full inline-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p class="text-[10px] font-medium text-gray-700 mt-1.5">Messages</p>
              </router-link>

              <router-link to="/saved" class="bg-lime-50 hover:bg-lime-100 rounded-lg p-3 text-center transition-colors">
                <div class="bg-lime-100 text-lime-600 p-1.5 rounded-full inline-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p class="text-[10px] font-medium text-gray-700 mt-1.5">Saved Items</p>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Analytics Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-white">Purchase Analytics</h3>
                <p class="mt-0.5 text-[10px] text-emerald-100">Your spending patterns and trends</p>
              </div>
              <div class="flex space-x-1">
                <button class="text-[10px] px-2 py-1 bg-white/20 text-white rounded hover:bg-white/30 transition-colors"
                  @click="$emit('time-range-change', 'monthly')" :class="{ 'bg-white/30': timeRange === 'monthly' }">
                  Monthly
                </button>
                <button class="text-[10px] px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                  @click="$emit('time-range-change', 'quarterly')" :class="{ 'bg-white/30': timeRange === 'quarterly' }">
                  Quarterly
                </button>
              </div>
            </div>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Spending Chart -->
              <div>
                <h4 class="text-xs font-medium text-gray-700 mb-2">Monthly Spending</h4>
                <div class="h-48 relative">
                  <canvas :id="`spending-chart-${chartId}`"></canvas>
                </div>
              </div>

              <!-- Category Breakdown Chart -->
              <div>
                <h4 class="text-xs font-medium text-gray-700 mb-2">Purchase by Category</h4>
                <div class="h-48 relative">
                  <canvas :id="`category-chart-${chartId}`"></canvas>
                </div>
              </div>
            </div>

            <!-- Summary Cards -->
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-[10px] font-medium text-gray-500">Avg. Purchase Amount</p>
                <p class="text-base font-bold text-gray-900 mt-0.5">₱{{ formatNumber(actualAverageOrderValue) }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">Per order average</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-[10px] font-medium text-gray-500">Total Livestock Bought</p>
                <p class="text-base font-bold text-gray-900 mt-0.5">{{ actualTotalLivestockBought }} heads</p>
                <p class="text-[10px] text-gray-500 mt-0.5">From all purchases</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-[10px] font-medium text-gray-500">Preferred Category</p>
                <p class="text-base font-bold text-gray-900 mt-0.5">{{ preferredCategory }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">{{ preferredCategoryPercentage }}% of purchases</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Table Section -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-white">Your Recent Purchases</h3>
                <p class="mt-0.5 text-[10px] text-emerald-100">Track your livestock purchases</p>
              </div>
              <router-link to="/transactions"
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
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Livestock</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Seller</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th class="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200/50">
                  <tr v-if="tableData.length === 0" class="hover:bg-gray-50/80 transition-colors">
                    <td colspan="6" class="px-4 py-6 text-center text-gray-500">
                      <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p class="mt-2 text-xs">No purchase history found</p>
                    </td>
                  </tr>
                  <tr v-for="(item, index) in tableData.slice(0, 5)" :key="index" class="hover:bg-gray-50/80 transition-colors">
                    <td class="px-3 py-2.5 whitespace-nowrap">
                      <div class="text-xs font-medium text-gray-900">{{ item.id }}</div>
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-8 w-8 flex-shrink-0">
                          <img class="h-8 w-8 rounded-full object-cover" :src="item.image" :alt="item.livestock" />
                        </div>
                        <div class="ml-2">
                          <div class="text-xs font-medium text-gray-900">{{ item.livestock }}</div>
                          <div class="text-[10px] text-gray-500">{{ item.type }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap text-xs text-gray-900 font-semibold hidden sm:table-cell">
                      {{ item.seller }}
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap">
                      <span class="text-xs text-gray-900 font-semibold">₱{{ item.amount }}</span>
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap text-xs text-gray-900 hidden md:table-cell">
                      {{ item.date }}
                    </td>
                    <td class="px-3 py-2.5 whitespace-nowrap">
                      <span :class="item.statusClass" class="px-1.5 py-0.5 text-[10px] font-medium rounded-full">{{ item.status }}</span>
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
                <p class="mt-0.5 text-[10px] text-emerald-100">Communications with sellers</p>
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
        <!-- Purchase Analytics Section with PIE CHARTS -->
        <div class="bg-white/95 backdrop-blur-xl rounded-lg shadow-md overflow-hidden border border-white/30 transition-all hover:shadow-lg">
          <div class="px-4 py-2.5 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
            <h3 class="text-sm font-semibold text-white">Purchase Analytics</h3>
            <p class="mt-0.5 text-[10px] text-emerald-100">Your buying preferences and statistics</p>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <!-- PIE CHART: Livestock Preferences -->
              <div>
                <h4 class="text-[10px] font-medium text-gray-700 mb-2">Livestock Purchased by Type</h4>
                <div class="h-48 relative flex items-center justify-center">
                  <canvas :id="`preferences-chart-${chartId}`"></canvas>
                </div>
              </div>
              
              <!-- Purchase Breakdown -->
              <div>
                <h4 class="text-[10px] font-medium text-gray-700 mb-2">Purchase Breakdown</h4>
                <div class="space-y-2">
                  <div v-if="purchaseBreakdown.length === 0" class="text-center py-3">
                    <p class="text-xs text-gray-500">No purchases yet</p>
                  </div>
                  <div v-else v-for="purchase in purchaseBreakdown" :key="purchase.type" class="flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full mr-1.5" :style="`background-color: ${purchase.color}`"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-[10px]">
                        <span class="font-medium text-gray-700">{{ purchase.type }}</span>
                        <span class="text-gray-500">
                          {{ purchase.count }} ({{ purchase.percentage }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full" :style="`width: ${purchase.percentage}%; background-color: ${purchase.color}`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- PIE CHART: Status Overview -->
              <div>
                <h4 class="text-[10px] font-medium text-gray-700 mb-2">Order Status Overview</h4>
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
                        <span class="font-medium text-gray-700">Completed</span>
                        <span class="text-gray-500">
                          {{ actualCompletedOrders }} ({{ completedPercentage }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full bg-green-500" :style="`width: ${completedPercentage}%`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full mr-1.5 bg-blue-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-[10px]">
                        <span class="font-medium text-gray-700">Shipped</span>
                        <span class="text-gray-500">
                          {{ actualShippedOrders }} ({{ shippedPercentage }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full bg-blue-500" :style="`width: ${shippedPercentage}%`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="w-1.5 h-1.5 rounded-full mr-1.5 bg-yellow-500"></div>
                    <div class="flex-1">
                      <div class="flex justify-between text-[10px]">
                        <span class="font-medium text-gray-700">Pending</span>
                        <span class="text-gray-500">
                          {{ actualPendingOrders }} ({{ pendingPercentage }}%)
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                        <div class="h-1 rounded-full bg-yellow-500" :style="`width: ${pendingPercentage}%`"></div>
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
import type { BuyerTransaction } from '@/types/transactionTypes'
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
let spendingChart: Chart | null = null
let categoryChart: Chart | null = null
let preferencesChart: Chart | null = null
let statusChart: Chart | null = null

// Store transaction data
const transactionsData = ref<BuyerTransaction[]>([])

// Store conversations data
const conversations = ref<Conversation[]>([])

const formatNumber = (num: number): string => {
  return num.toLocaleString()
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
 * Format date to readable string
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * Get status badge class
 */
const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Shipped':
      return 'bg-blue-100 text-blue-800'
    case 'Accepted':
      return 'bg-emerald-100 text-emerald-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
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
 * Computed property for table data from actual transactions
 */
const tableData = computed(() => {
  return transactionsData.value.map(tx => ({
    id: tx.id,
    livestock: tx.animal.title,
    type: tx.animal.type,
    seller: tx.farmer.name,
    amount: formatNumber(tx.amount),
    date: formatDate(tx.date),
    status: tx.status,
    statusClass: getStatusClass(tx.status),
    image: tx.animal.images && tx.animal.images.length > 0 
      ? tx.animal.images[0] 
      : 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }))
})

/**
 * Computed property for actual total orders
 */
const actualTotalOrders = computed(() => {
  return transactionsData.value.length
})

/**
 * Computed property for actual pending orders
 */
const actualPendingOrders = computed(() => {
  return transactionsData.value.filter(tx => tx.status === 'Pending').length
})

/**
 * Computed property for actual shipped orders
 */
const actualShippedOrders = computed(() => {
  return transactionsData.value.filter(tx => tx.status === 'Shipped').length
})

/**
 * Computed property for actual completed orders
 */
const actualCompletedOrders = computed(() => {
  return transactionsData.value.filter(tx => tx.status === 'Completed').length
})

/**
 * Computed property for actual total spent
 */
const actualTotalSpent = computed(() => {
  return transactionsData.value.reduce((total, tx) => total + tx.amount, 0)
})

/**
 * Computed property for average order value
 */
const actualAverageOrderValue = computed(() => {
  const total = actualTotalOrders.value
  return total > 0 ? Math.round(actualTotalSpent.value / total) : 0
})

/**
 * Computed property for total livestock bought
 */
const actualTotalLivestockBought = computed(() => {
  return transactionsData.value.reduce((total, tx) => total + tx.quantity, 0)
})

/**
 * Computed property for purchase breakdown by type
 */
const purchaseBreakdown = computed(() => {
  const typeCount: { [key: string]: number } = {}
  
  transactionsData.value.forEach(tx => {
    const type = tx.animal.type
    if (!typeCount[type]) {
      typeCount[type] = 0
    }
    typeCount[type] += 1
  })
  
  const total = transactionsData.value.length
  
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

/**
 * Computed property for preferred category
 */
const preferredCategory = computed(() => {
  if (purchaseBreakdown.value.length === 0) return 'None'
  return purchaseBreakdown.value[0].type
})

/**
 * Computed property for preferred category percentage
 */
const preferredCategoryPercentage = computed(() => {
  if (purchaseBreakdown.value.length === 0) return 0
  return purchaseBreakdown.value[0].percentage
})

/**
 * Computed percentages for status breakdown
 */
const completedPercentage = computed(() => {
  const total = actualTotalOrders.value
  return total > 0 ? Math.round((actualCompletedOrders.value / total) * 100) : 0
})

const shippedPercentage = computed(() => {
  const total = actualTotalOrders.value
  return total > 0 ? Math.round((actualShippedOrders.value / total) * 100) : 0
})

const pendingPercentage = computed(() => {
  const total = actualTotalOrders.value
  return total > 0 ? Math.round((actualPendingOrders.value / total) * 100) : 0
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
    const result = await transactionService.getBuyerTransactions()
    if (result.success && result.data) {
      transactionsData.value = result.data
      console.log('✅ Loaded buyer transaction data:', transactionsData.value.length, 'transactions')
    }
  } catch (error) {
    console.error('❌ Error loading transaction data:', error)
  }
}

/**
 * Create Spending Chart with ACTUAL transaction data
 */
const createSpendingChart = async () => {
  const ctx = document.getElementById(`spending-chart-${chartId}`) as HTMLCanvasElement
  if (!ctx) return

  if (spendingChart) {
    spendingChart.destroy()
  }

  try {
    const transactions = transactionsData.value

    if (transactions.length === 0) {
      console.warn('⚠️ No transactions for spending chart')
      createEmptySpendingChart(ctx)
      return
    }

    const monthlySpending: { [key: string]: number } = {}
    
    transactions.forEach(tx => {
      const date = new Date(tx.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      if (!monthlySpending[monthKey]) {
        monthlySpending[monthKey] = 0
      }
      monthlySpending[monthKey] += tx.amount
    })

    const months: string[] = []
    const spendingData: number[] = []
    const currentDate = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short' })
      
      months.push(monthLabel)
      spendingData.push(monthlySpending[monthKey] || 0)
    }

    spendingChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Spending (₱)',
          data: spendingData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#3b82f6',
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

    console.log('✅ Spending chart created with actual transaction data')
  } catch (error) {
    console.error('❌ Error creating spending chart:', error)
    createEmptySpendingChart(ctx)
  }
}

const createEmptySpendingChart = (ctx: HTMLCanvasElement) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  
  spendingChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Spending (₱)',
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

    if (transactions.length === 0) {
      console.warn('⚠️ No transactions for category chart')
      createEmptyCategoryChart(ctx)
      return
    }

    const categorySpending: { [key: string]: number } = {}
    
    transactions.forEach(tx => {
      const type = tx.animal.type
      if (!categorySpending[type]) {
        categorySpending[type] = 0
      }
      categorySpending[type] += tx.amount
    })

    const totalSpending = Object.values(categorySpending).reduce((sum, val) => sum + val, 0)
    
    const sortedCategories = Object.entries(categorySpending)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const labels = sortedCategories.map(([type]) => type)
    const data = sortedCategories.map(([, spending]) => 
      Math.round((spending / totalSpending) * 100)
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
 * Create Preferences PIE Chart
 */
const createPreferencesChart = () => {
  const ctx = document.getElementById(`preferences-chart-${chartId}`) as HTMLCanvasElement
  if (!ctx) return

  if (preferencesChart) {
    preferencesChart.destroy()
  }

  const typeCount: { [key: string]: number } = {}
  
  transactionsData.value.forEach(tx => {
    const type = tx.animal.type
    if (!typeCount[type]) {
      typeCount[type] = 0
    }
    typeCount[type] += 1
  })

  const sortedTypes = Object.entries(typeCount)
    .sort((a, b) => b[1] - a[1])
  
  const labels = sortedTypes.map(([type]) => type)
  const data = sortedTypes.map(([, count]) => count)
  
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
    preferencesChart = new Chart(ctx, {
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
    preferencesChart = new Chart(ctx, {
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
 * Create Status PIE Chart
 */
const createStatusChart = () => {
  const ctx = document.getElementById(`status-chart-${chartId}`) as HTMLCanvasElement
  if (!ctx) return

  if (statusChart) {
    statusChart.destroy()
  }

  const pending = actualPendingOrders.value
  const shipped = actualShippedOrders.value
  const completed = actualCompletedOrders.value
  
  const total = pending + shipped + completed

  if (total === 0) {
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

    if (completed > 0) {
      labels.push('Completed')
      data.push(completed)
      colors.push('#10b981')
    }
    if (shipped > 0) {
      labels.push('Shipped')
      data.push(shipped)
      colors.push('#3b82f6')
    }
    if (pending > 0) {
      labels.push('Pending')
      data.push(pending)
      colors.push('#f59e0b')
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
  await loadConversations()
  await createSpendingChart()
  await createCategoryChart()
  createPreferencesChart()
  createStatusChart()
}

// Cleanup charts
const destroyCharts = () => {
  if (spendingChart) spendingChart.destroy()
  if (categoryChart) categoryChart.destroy()
  if (preferencesChart) preferencesChart.destroy()
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