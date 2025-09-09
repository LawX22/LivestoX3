<!-- BuyerDashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
    <!-- Sticky NavBar -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <NavBar />
    </div>

    <!-- Main content container with padding for navbar -->
    <div class="pt-16 relative">
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

      <div class="max-w-screen-2xl mx-auto px-8 pt-8 relative z-10">
        <!-- DYNAMIC COMBINED HEADER -->
        <div class="sticky top-0 z-40 mb-6">
          <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
            <!-- Left side - Logo and Title -->
            <div class="flex items-center min-w-0">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div class="min-w-0">
                <h1 class="text-xl font-bold text-white truncate">Buyer Dashboard</h1>
                <p class="text-green-100 text-sm opacity-90 truncate">Browse livestock and manage your purchases</p>
              </div>
            </div>

            <!-- Right side - Last updated and refresh button -->
            <div class="flex items-center space-x-4">
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Last updated:</span>
                <span class="font-medium ml-1">{{ new Date().toLocaleString() }}</span>
              </div>
              <button
                class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg shadow-sm transition-colors backdrop-blur-md border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <!-- Total Orders Card -->
          <div
            class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
                <p class="text-xl font-bold text-gray-900 mt-1">8</p>
                <div class="mt-2 flex items-center text-xs text-gray-500">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <svg class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    12%
                  </span>
                  <span class="ml-1">from last month</span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Pending Orders Card -->
          <div
            class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Orders</p>
                <p class="text-xl font-bold text-gray-900 mt-1">2</p>
                <div class="mt-2">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    Awaiting shipment
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Spent Card -->
          <div
            class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</p>
                <p class="text-xl font-bold text-gray-900 mt-1">₱96,500</p>
                <div class="mt-2 flex items-center text-xs text-gray-500">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <svg class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clip-rule="evenodd" />
                    </svg>
                    5%
                  </span>
                  <span class="ml-1">savings vs last month</span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Messages Card -->
          <div
            class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</p>
                <p class="text-xl font-bold text-gray-900 mt-1">5</p>
                <div class="mt-2">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    2 unread
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-emerald-100 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Buyer Rating Card -->
          <div
            class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Rating</p>
                <div class="flex items-center mt-1">
                  <span class="text-xl font-bold text-gray-900">4.9</span>
                  <div class="flex ml-2">
                    <svg v-for="i in 5" :key="i" class="h-4 w-4 text-yellow-400" fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.540 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div class="mt-2">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    18 reviews
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-teal-100 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Purchase Analytics Section -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Purchase Analytics</h3>
                    <p class="mt-1 text-xs text-emerald-100">Your spending patterns and trends</p>
                  </div>
                  <div class="flex space-x-2">
                    <button class="text-xs px-2 py-1 bg-white/20 text-white rounded hover:bg-white/30 transition-colors"
                      @click="setTimeRange('monthly')" :class="{ 'bg-white/30': timeRange === 'monthly' }">
                      Monthly
                    </button>
                    <button class="text-xs px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                      @click="setTimeRange('quarterly')" :class="{ 'bg-white/30': timeRange === 'quarterly' }">
                      Quarterly
                    </button>
                    <button class="text-xs px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                      @click="setTimeRange('yearly')" :class="{ 'bg-white/30': timeRange === 'yearly' }">
                      Yearly
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Spending Chart -->
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Monthly Spending</h4>
                    <div class="h-64">
                      <Chart type="line" :data="spendingChartData" :options="spendingChartOptions" />
                    </div>
                  </div>

                  <!-- Purchase Categories -->
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Purchase Categories</h4>
                    <div class="h-64">
                      <Chart type="doughnut" :data="categoryChartData" :options="categoryChartOptions" />
                    </div>
                  </div>
                </div>

                <!-- Summary Cards -->
                <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Avg. Purchase Amount</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">₱12,062</p>
                    <p class="text-xs text-gray-500 mt-1">+8% from last month</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Orders per Month</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">3.2</p>
                    <p class="text-xs text-gray-500 mt-1">+15% from last month</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Preferred Category</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">Cattle</p>
                    <p class="text-xs text-gray-500 mt-1">42% of purchases</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Purchases Section -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Your Recent Purchases</h3>
                    <p class="mt-1 text-xs text-emerald-100">Track your livestock purchases</p>
                  </div>
                  <router-link to="/myPurchases"
                    class="text-xs font-medium text-white hover:text-emerald-100 flex items-center">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
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
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livestock</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200/50">
                      <tr v-for="(order, index) in ordersData.slice(0, 5)" :key="index" class="hover:bg-gray-50/80 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {{ order.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                              <img class="h-10 w-10 rounded-full object-cover" :src="order.image" :alt="order.livestock" />
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">{{ order.livestock }}</div>
                              <div class="text-xs text-gray-500">{{ order.type }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {{ order.seller }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          {{ order.amount }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ order.date }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span :class="`px-2 py-1 text-xs font-medium rounded-full ${order.statusClass}`">
                            {{ order.status }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                          <button 
                            class="text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 p-2 rounded-full transition-all duration-200"
                            title="View Details">
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

            <!-- Saved Livestock Section -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Your Saved Livestock</h3>
                    <p class="mt-1 text-xs text-emerald-100">Livestock you're interested in</p>
                  </div>
                  <router-link to="/saved"
                    class="text-xs font-medium text-white hover:text-emerald-100 flex items-center">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(item, index) in savedLivestockData" :key="index" 
                    class="bg-gray-50 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow">
                    <img :src="item.image" :alt="item.name" class="h-12 w-12 rounded-full object-cover">
                    <div class="ml-3 flex-1">
                      <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
                      <p class="text-xs text-gray-500">{{ item.type }}</p>
                      <p class="text-sm font-semibold text-emerald-600 mt-1">{{ item.price }}</p>
                      <div class="flex items-center mt-1">
                        <span class="text-xs text-gray-500">From: {{ item.seller }}</span>
                      </div>
                    </div>
                    <button @click="removeFromSaved(item.id)" 
                      class="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove from saved">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-if="savedLivestockData.length === 0" class="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p class="mt-2 text-sm text-gray-600">No saved livestock yet</p>
                  <router-link to="/marketplace" class="mt-2 inline-block text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                    Browse livestock to save items
                  </router-link>
                </div>
                <div v-else class="mt-4 text-center">
                  <router-link to="/marketplace" class="text-xs text-emerald-600 hover:text-emerald-800 font-medium">
                    + Browse more livestock
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Quick Actions Section -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <h3 class="text-lg font-semibold text-white">Quick Actions</h3>
                <p class="mt-1 text-xs text-emerald-100">Manage your buyer account</p>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-2 gap-4">
                  <router-link to="/marketplace" class="bg-green-50 hover:bg-green-100 rounded-lg p-4 text-center transition-colors">
                    <div class="bg-green-100 text-green-600 p-2 rounded-full inline-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p class="text-xs font-medium text-gray-700 mt-2">Browse Livestock</p>
                  </router-link>

                  <router-link to="/myPurchases" class="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-4 text-center transition-colors">
                    <div class="bg-emerald-100 text-emerald-600 p-2 rounded-full inline-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p class="text-xs font-medium text-gray-700 mt-2">My Purchases</p>
                  </router-link>

                  <router-link to="/messages" class="bg-teal-50 hover:bg-teal-100 rounded-lg p-4 text-center transition-colors">
                    <div class="bg-teal-100 text-teal-600 p-2 rounded-full inline-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <p class="text-xs font-medium text-gray-700 mt-2">Messages</p>
                  </router-link>

                  <router-link to="/saved" class="bg-lime-50 hover:bg-lime-100 rounded-lg p-4 text-center transition-colors">
                    <div class="bg-lime-100 text-lime-600 p-2 rounded-full inline-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p class="text-xs font-medium text-gray-700 mt-2">Saved Items</p>
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Purchase Analytics Section -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <h3 class="text-lg font-semibold text-white">Purchase Analytics</h3>
                <p class="mt-1 text-xs text-emerald-100">Your buying preferences and statistics</p>
              </div>
              <div class="p-6">
                <div class="space-y-6">
                  <div>
                    <h4 class="text-xs font-medium text-gray-700 mb-3">Livestock Preferences</h4>
                    <div class="h-48">
                      <Chart type="doughnut" :data="preferencesChartData" :options="preferencesChartOptions" />
                    </div>
                  </div>
                  <div>
                    <h4 class="text-xs font-medium text-gray-700 mb-3">Purchase Status Overview</h4>
                    <div class="space-y-3">
                      <div class="flex items-center">
                        <div class="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                        <div class="flex-1">
                          <div class="flex justify-between text-xs">
                            <span class="font-medium text-gray-700">Completed</span>
                            <span class="text-gray-500">5 (62%)</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-green-500" style="width: 62%"></div>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div class="w-2 h-2 rounded-full mr-2 bg-yellow-500"></div>
                        <div class="flex-1">
                          <div class="flex justify-between text-xs">
                            <span class="font-medium text-gray-700">Processing</span>
                            <span class="text-gray-500">2 (25%)</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-yellow-500" style="width: 25%"></div>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div class="w-2 h-2 rounded-full mr-2 bg-blue-500"></div>
                        <div class="flex-1">
                          <div class="flex justify-between text-xs">
                            <span class="font-medium text-gray-700">Shipped</span>
                            <span class="text-gray-500">1 (13%)</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-blue-500" style="width: 13%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Messages Section -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Recent Messages</h3>
                    <p class="mt-1 text-xs text-emerald-100">Communications with sellers</p>
                  </div>
                  <router-link to="/messages"
                    class="text-xs font-medium text-white hover:text-emerald-100 flex items-center">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
              <div class="divide-y divide-gray-200/50">
                <div>
                  <ul class="divide-y divide-gray-200/50">
                    <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                      <div class="flex items-start">
                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Farm Fresh" />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">Farm Fresh</h4>
                            <span class="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p class="text-xs text-gray-600 mt-1 truncate">
                            Your order #ORD-2871 has been shipped and is on its way!
                          </p>
                          <div class="mt-2 flex space-x-2">
                            <button class="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                              Reply
                            </button>
                            <button class="text-xs font-medium text-gray-600 hover:text-gray-700">
                              Track Order
                            </button>
                          </div>
                        </div>
                        <span class="ml-2 flex-shrink-0">
                          <span class="h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                      </div>
                    </li>

                    <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                      <div class="flex items-start">
                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Green Pastures" />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">Green Pastures</h4>
                            <span class="text-xs text-gray-500">1 day ago</span>
                          </div>
                          <p class="text-xs text-gray-600 mt-1 truncate">
                            We have new Angus cattle available. Would you like to schedule a visit?
                          </p>
                          <div class="mt-2 flex space-x-2">
                            <button class="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                              Reply
                            </button>
                            <button class="text-xs font-medium text-gray-600 hover:text-gray-700">
                              View Listing
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                      <div class="flex items-start">
                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Livestock Direct" />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">Livestock Direct</h4>
                            <span class="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p class="text-xs text-gray-600 mt-1 truncate">
                            Thank you for your review! We're glad you're happy with your purchase.
                          </p>
                          <div class="mt-2 flex space-x-2">
                            <button class="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                              Reply
                            </button>
                            <button class="text-xs font-medium text-gray-600 hover:text-gray-700">
                              View Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Recommended Livestock Section -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <h3 class="text-lg font-semibold text-white">Recommended for You</h3>
                <p class="mt-1 text-xs text-emerald-100">Based on your browsing history</p>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="(item, index) in recommendedData.slice(0, 3)" :key="index" class="flex items-center">
                    <img :src="item.image" :alt="item.name" class="h-12 w-12 rounded-lg object-cover">
                    <div class="ml-3 flex-1">
                      <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
                      <p class="text-xs text-gray-500">{{ item.type }}</p>
                      <p class="text-sm font-semibold text-emerald-600 mt-1">{{ item.price }}</p>
                    </div>
                    <button @click="saveLivestock(item)" 
                      class="text-emerald-600 hover:text-emerald-800 text-xs font-medium p-1"
                      title="Save this item">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-4 text-center">
                  <button class="text-xs text-emerald-600 hover:text-emerald-800 font-medium">
                    See more recommendations
                  </button>
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
import { ref } from 'vue'
import NavBar from '../../components/NavBar.vue'
import Chart from 'primevue/chart'

interface SavedLivestock {
  id: number
  name: string
  type: string
  seller: string
  price: string
  image: string
}

// Time range state
const timeRange = ref('monthly')

// Orders data for the table
const ordersData = ref([
  {
    id: 'ORD-2871',
    livestock: 'Cattle',
    type: 'Angus',
    seller: 'Farm Fresh',
    amount: '₱45,000',
    date: 'Today',
    status: 'Shipped',
    statusClass: 'bg-blue-100 text-blue-800',
    image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'ORD-2870',
    livestock: 'Pigs',
    type: 'Large White',
    seller: 'Green Pastures',
    amount: '₱24,000',
    date: 'Yesterday',
    status: 'Delivered',
    statusClass: 'bg-green-100 text-green-800',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'ORD-2869',
    livestock: 'Goats',
    type: 'Boer',
    seller: 'Livestock Direct',
    amount: '₱17,000',
    date: '2 days ago',
    status: 'Processing',
    statusClass: 'bg-yellow-100 text-yellow-800',
    image: 'https://images.unsplash.com/photo-1554995202-568b4089a0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'ORD-2868',
    livestock: 'Sheep',
    type: 'Dorper',
    seller: 'Prime Stock',
    amount: '₱19,600',
    date: '3 days ago',
    status: 'Cancelled',
    statusClass: 'bg-red-100 text-red-800',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'ORD-2867',
    livestock: 'Poultry',
    type: 'Native Chicken',
    seller: 'Farm Fresh',
    amount: '₱8,750',
    date: '4 days ago',
    status: 'Delivered',
    statusClass: 'bg-green-100 text-green-800',
    image: 'https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
])

// Saved livestock data
const savedLivestockData = ref<SavedLivestock[]>([
  {
    id: 1,
    name: 'Cattle',
    type: 'Hereford',
    seller: 'Green Pastures',
    price: '₱42,000',
    image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Pig',
    type: 'Duroc',
    seller: 'Prime Stock',
    price: '₱11,500',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Goat',
    type: 'Saanen',
    seller: 'Livestock Direct',
    price: '₱9,200',
    image: 'https://images.unsplash.com/photo-1554995202-568b4089a0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    name: 'Sheep',
    type: 'Merino',
    seller: 'Farm Fresh',
    price: '₱10,500',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
])

// Recommended livestock data
const recommendedData = ref([
  {
    id: 5,
    name: 'Cattle',
    type: 'Simmental',
    seller: 'Prime Stock',
    price: '₱47,500',
    image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    name: 'Pig',
    type: 'Berkshire',
    seller: 'Green Pastures',
    price: '₱13,000',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 7,
    name: 'Goat',
    type: 'Nubian',
    seller: 'Farm Fresh',
    price: '₱8,800',
    image: 'https://images.unsplash.com/photo-1554995202-568b4089a0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
])

// Spending Chart Data
const spendingChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Monthly Spending',
      data: [8500, 12300, 15600, 11200, 18400, 22100, 19800],
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: '#10B981',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#10B981',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8
    }
  ]
})

const spendingChartOptions = ref({
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return '₱' + context.raw.toLocaleString()
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        }
      }
    },
    y: {
      beginAtZero: false,
      ticks: {
        callback: function (value: any) {
          return value >= 1000 ? `₱${(value / 1000).toFixed(0)}k` : `₱${value}`
        },
        font: {
          size: 11
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    }
  },
  maintainAspectRatio: false
})

// Category Chart Data
const categoryChartData = ref({
  labels: ['Cattle', 'Pigs', 'Goats', 'Sheep', 'Poultry'],
  datasets: [
    {
      data: [42, 28, 15, 10, 5],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899'],
      hoverBackgroundColor: ['#059669', '#2563EB', '#D97706', '#7C3AED', '#DB2777']
    }
  ]
})

const categoryChartOptions = ref({
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10,
        padding: 12,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 10
        }
      }
    }
  },
  cutout: '70%',
  maintainAspectRatio: false
})

// Preferences Chart Data (for sidebar analytics)
const preferencesChartData = ref({
  labels: ['Cattle', 'Pigs', 'Goats', 'Sheep', 'Poultry'],
  datasets: [
    {
      data: [40, 25, 20, 10, 5],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899'],
      hoverBackgroundColor: ['#059669', '#2563EB', '#D97706', '#7C3AED', '#DB2777']
    }
  ]
})

const preferencesChartOptions = ref({
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10,
        padding: 12,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 10
        }
      }
    }
  },
  cutout: '70%',
  maintainAspectRatio: false
})

// Functions
const setTimeRange = (range: string) => {
  timeRange.value = range
  // Here you would typically update the chart data based on the selected time range
}

// Function to remove an item from saved livestock
const removeFromSaved = (id: number) => {
  const index = savedLivestockData.value.findIndex(item => item.id === id)
  if (index !== -1) {
    savedLivestockData.value.splice(index, 1)
  }
}

// Function to save a livestock item
const saveLivestock = (item: any) => {
  // Check if already saved
  if (!savedLivestockData.value.some(savedItem => savedItem.id === item.id)) {
    savedLivestockData.value.push({
      id: item.id,
      name: item.name,
      type: item.type,
      seller: item.seller,
      price: item.price,
      image: item.image
    })
    
    // Show some feedback that item was saved
    alert(`${item.name} (${item.type}) has been saved to your list!`)
  } else {
    alert('This item is already in your saved list.')
  }
}
</script>