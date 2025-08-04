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
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Farmer Dashboard</h1>
            <p class="text-gray-600 mt-2">Manage your farm operations and livestock sales</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <span class="text-gray-500">Last updated:</span>
              <span class="font-medium ml-1">{{ new Date().toLocaleString() }}</span>
            </div>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <!-- Total Listings Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Listings</p>
                <p class="text-xl font-bold text-gray-900 mt-1">12</p>
                <div class="mt-2 flex items-center text-xs text-gray-500">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <svg class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                    15%
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
                <p class="text-xl font-bold text-gray-900 mt-1">8</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    342 views
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
                <p class="text-xl font-bold text-gray-900 mt-1">₱185,000</p>
                <div class="mt-2 flex items-center text-xs text-gray-500">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <svg class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                    8%
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
                <p class="text-xl font-bold text-gray-900 mt-1">3</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    3 unread
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Farm Rating Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Farm Rating</p>
                <div class="flex items-center mt-1">
                  <span class="text-xl font-bold text-gray-900">4.8</span>
                  <div class="flex ml-2">
                    <svg v-for="i in 5" :key="i" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div class="mt-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    24 reviews
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-indigo-100 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Recent Listings Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Your Recent Livestock Posts</h3>
                    <p class="mt-1 text-xs text-emerald-100">Listings you've recently added or updated</p>
                  </div>
                  <router-link to="/yourLivestock" class="text-xs font-medium text-white hover:text-emerald-100 flex items-center">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
              <div class="divide-y divide-gray-200/50">
                <div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    <!-- Cattle Listing -->
                    <div class="group relative rounded-xl border border-gray-200/50 bg-white overflow-hidden hover:shadow-lg transition-all">
                      <div class="relative h-32">
                        <img
                          src="https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                          alt="Cattle"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div class="absolute top-2 right-2">
                          <span class="px-1.5 py-0.5 text-xs font-bold rounded-full shadow-sm bg-green-100 text-green-800">
                            Available
                          </span>
                        </div>
                      </div>
                      <div class="p-4">
                        <div class="flex justify-between items-start">
                          <div>
                            <h3 class="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              Cattle
                            </h3>
                            <p class="text-xs text-emerald-600 font-medium">Angus • 2 years old</p>
                          </div>
                          <p class="text-sm font-bold text-gray-900">₱45,000</p>
                        </div>
                        <div class="mt-3 flex justify-between items-center">
                          <div class="flex items-center text-xs text-gray-500">
                            <svg class="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Today
                          </div>
                          <router-link
                            to="/yourLivestock/edit/1"
                            class="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            Edit
                          </router-link>
                        </div>
                      </div>
                    </div>

                    <!-- Pig Listing -->
                    <div class="group relative rounded-xl border border-gray-200/50 bg-white overflow-hidden hover:shadow-lg transition-all">
                      <div class="relative h-32">
                        <img
                          src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                          alt="Pig"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div class="absolute top-2 right-2">
                          <span class="px-1.5 py-0.5 text-xs font-bold rounded-full shadow-sm bg-green-100 text-green-800">
                            Available
                          </span>
                        </div>
                      </div>
                      <div class="p-4">
                        <div class="flex justify-between items-start">
                          <div>
                            <h3 class="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              Pig
                            </h3>
                            <p class="text-xs text-emerald-600 font-medium">Large White • 6 months</p>
                          </div>
                          <p class="text-sm font-bold text-gray-900">₱12,000</p>
                        </div>
                        <div class="mt-3 flex justify-between items-center">
                          <div class="flex items-center text-xs text-gray-500">
                            <svg class="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            1 day ago
                          </div>
                          <router-link
                            to="/yourLivestock/edit/2"
                            class="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            Edit
                          </router-link>
                        </div>
                      </div>
                    </div>

                    <!-- Goat Listing -->
                    <div class="group relative rounded-xl border border-gray-200/50 bg-white overflow-hidden hover:shadow-lg transition-all">
                      <div class="relative h-32">
                        <img
                          src="https://images.unsplash.com/photo-1554995202-568b4089a0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                          alt="Goat"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div class="absolute top-2 right-2">
                          <span class="px-1.5 py-0.5 text-xs font-bold rounded-full shadow-sm bg-yellow-100 text-yellow-800">
                            Low Stock
                          </span>
                        </div>
                      </div>
                      <div class="p-4">
                        <div class="flex justify-between items-start">
                          <div>
                            <h3 class="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              Goat
                            </h3>
                            <p class="text-xs text-emerald-600 font-medium">Boer • 1 year old</p>
                          </div>
                          <p class="text-sm font-bold text-gray-900">₱8,500</p>
                        </div>
                        <div class="mt-3 flex justify-between items-center">
                          <div class="flex items-center text-xs text-gray-500">
                            <svg class="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            3 days ago
                          </div>
                          <router-link
                            to="/yourLivestock/edit/3"
                            class="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            Edit
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Revenue Trends Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Revenue & Sales Performance</h3>
                    <p class="mt-1 text-xs text-emerald-100">Your sales trends and projections</p>
                  </div>
                  <div class="flex space-x-2">
                    <button class="text-xs px-2 py-1 bg-white/20 text-white rounded hover:bg-white/30 transition-colors">
                      Monthly
                    </button>
                    <button class="text-xs px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors">
                      Quarterly
                    </button>
                    <button class="text-xs px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors">
                      Yearly
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Revenue Trends</h4>
                    <div class="h-64">
                      <canvas ref="revenueChart"></canvas>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Sales Volume</h4>
                    <div class="h-64">
                      <canvas ref="salesChart"></canvas>
                    </div>
                  </div>
                </div>
                <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Avg. Selling Price</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">₱15,417</p>
                    <p class="text-xs text-gray-500 mt-1">+12% from last month</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Total Units Sold</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">24</p>
                    <p class="text-xs text-gray-500 mt-1">+8% from last month</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Conversion Rate</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">18.5%</p>
                    <p class="text-xs text-gray-500 mt-1">+3.2% from last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Quick Stats Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <h3 class="text-lg font-semibold text-white">Farm Analytics</h3>
                <p class="mt-1 text-xs text-emerald-100">Your livestock statistics at a glance</p>
              </div>
              <div class="p-6">
                <div class="space-y-6">
                  <div>
                    <h4 class="text-xs font-medium text-gray-700 mb-3">Livestock Distribution</h4>
                    <div class="h-48">
                      <canvas ref="livestockChart"></canvas>
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
                            <span class="text-gray-500">8 (67%)</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-green-500" style="width: 67%"></div>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div class="w-2 h-2 rounded-full mr-2 bg-yellow-500"></div>
                        <div class="flex-1">
                          <div class="flex justify-between text-xs">
                            <span class="font-medium text-gray-700">Low Stock</span>
                            <span class="text-gray-500">2 (17%)</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-yellow-500" style="width: 17%"></div>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div class="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                        <div class="flex-1">
                          <div class="flex justify-between text-xs">
                            <span class="font-medium text-gray-700">Out of Stock</span>
                            <span class="text-gray-500">1 (8%)</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-red-500" style="width: 8%"></div>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div class="w-2 h-2 rounded-full mr-2 bg-blue-500"></div>
                        <div class="flex-1">
                          <div class="flex justify-between text-xs">
                            <span class="font-medium text-gray-700">Pending Review</span>
                            <span class="text-gray-500">1 (8%)</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-blue-500" style="width: 8%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Messages Section -->
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
                <div>
                  <ul class="divide-y divide-gray-200/50">
                    <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                      <div class="flex items-start">
                        <img class="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Juan Dela Cruz" />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">Juan Dela Cruz</h4>
                            <span class="text-xs text-gray-500">1 hour ago</span>
                          </div>
                          <p class="text-xs text-gray-600 mt-1 truncate">
                            Hello, I'm interested in your Angus cattle. Are they still available?
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
                        <span class="ml-2 flex-shrink-0">
                          <span class="h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                      </div>
                    </li>

                    <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                      <div class="flex items-start">
                        <img class="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Santos" />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">Maria Santos</h4>
                            <span class="text-xs text-gray-500">1 day ago</span>
                          </div>
                          <p class="text-xs text-gray-600 mt-1 truncate">
                            Can you provide more details about the vaccination history of the pigs?
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
                        <img class="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/75.jpg" alt="Carlos Reyes" />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">Carlos Reyes</h4>
                            <span class="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p class="text-xs text-gray-600 mt-1 truncate">
                            I'd like to visit your farm to see the goats. When would be a good time?
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
                  </ul>
                </div>
              </div>
            </div>

            <!-- Quick Actions Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                <h3 class="text-lg font-semibold text-white">Quick Actions</h3>
                <p class="mt-1 text-xs text-emerald-100">Common tasks at your fingertips</p>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-2 gap-4">
                  <router-link to="/yourLivestock/new" class="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                    <div class="p-2 bg-emerald-100 rounded-full text-emerald-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">New Listing</span>
                  </router-link>
                  
                  <router-link to="/messages" class="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div class="p-2 bg-blue-100 rounded-full text-blue-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">Messages</span>
                  </router-link>
                  
                  <router-link to="/analytics" class="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div class="p-2 bg-purple-100 rounded-full text-purple-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">Analytics</span>
                  </router-link>
                  
                  <router-link to="/settings" class="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                    <div class="p-2 bg-yellow-100 rounded-full text-yellow-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">Settings</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import { Chart, registerables } from 'chart.js'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      livestockChart: null,
      revenueChart: null,
      salesChart: null
    }
  },
  mounted() {
    // Register all Chart.js components
    Chart.register(...registerables)
    
    // Initialize livestock distribution chart (Doughnut)
    this.initLivestockChart()
    
    // Initialize revenue trends chart (Line)
    this.initRevenueChart()
    
    // Initialize sales volume chart (Bar)
    this.initSalesChart()
  },
  beforeUnmount() {
    // Clean up charts to prevent memory leaks
    if (this.livestockChart) {
      this.livestockChart.destroy()
    }
    if (this.revenueChart) {
      this.revenueChart.destroy()
    }
    if (this.salesChart) {
      this.salesChart.destroy()
    }
  },
  methods: {
    initLivestockChart() {
      const ctx = this.$refs.livestockChart.getContext('2d')
      this.livestockChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Cattle', 'Pigs', 'Goats', 'Sheep', 'Poultry'],
          datasets: [{
            data: [35, 25, 20, 10, 10],
            backgroundColor: [
              '#10B981', // green
              '#3B82F6', // blue
              '#F59E0B', // yellow
              '#8B5CF6', // purple
              '#EC4899'  // pink
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
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
          }
        }
      })
    },
    initRevenueChart() {
      const ctx = this.$refs.revenueChart.getContext('2d')
      this.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Monthly Revenue',
            data: [120000, 135000, 145000, 155000, 165000, 175000, 185000],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: '#10B981',
            pointRadius: 3,
            pointHoverRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
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
                  size: 10
                }
              }
            },
            y: {
              beginAtZero: false,
              ticks: {
                callback: function(value) {
                  if (value >= 1000) {
                    return '₱' + (value / 1000).toFixed(0) + 'k'
                  }
                  return '₱' + value
                },
                font: {
                  size: 10
                }
              },
              grid: {
                drawBorder: false
              }
            }
          }
        }
      })
    },
    initSalesChart() {
      const ctx = this.$refs.salesChart.getContext('2d')
      this.salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Units Sold',
            data: [3, 4, 2, 5, 3, 4, 3],
            backgroundColor: '#3B82F6',
            borderRadius: 4,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                font: {
                  size: 10
                }
              },
              grid: {
                drawBorder: false
              }
            }
          }
        }
      })
    }
  }
}
</script>