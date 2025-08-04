<!-- BuyerDashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
    <!-- Sticky NavBar -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <NavBar />
    </div>

    <!-- Main content container with padding for navbar -->
    <div class="pt-16 relative">
      <!-- Floating Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
        <div class="absolute top-32 right-16 w-12 h-12 bg-indigo-300 rounded-full opacity-40 animate-pulse"></div>
        <div class="absolute bottom-24 left-24 w-20 h-20 bg-purple-300 rounded-full opacity-25 animate-ping"></div>
        <div class="absolute top-1/2 right-8 w-10 h-10 bg-blue-400 rounded-full opacity-35 animate-bounce"
          style="animation-delay: 1s"></div>
        <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-indigo-400 rounded-full opacity-20 animate-pulse"
          style="animation-delay: 0.5s"></div>
      </div>

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" stroke-width="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div class="max-w-screen-2xl mx-auto px-8 pt-8 relative z-10">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Buyer Dashboard</h1>
            <p class="text-gray-600 mt-2">Discover quality livestock and manage your purchases</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <span class="text-gray-500">Last activity:</span>
              <span class="font-medium ml-1">{{ new Date().toLocaleString() }}</span>
            </div>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <!-- Watchlist Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Watchlist</p>
                <p class="text-xl font-bold text-gray-900 mt-1">7</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    2 new updates
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Recent Purchases Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Purchases</p>
                <p class="text-xl font-bold text-gray-900 mt-1">3</p>
                <div class="mt-2 flex items-center text-xs text-gray-500">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <svg class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                    1 this month
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2H10a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Spent Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</p>
                <p class="text-xl font-bold text-gray-900 mt-1">₱95,000</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    All time
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Saved Searches Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Saved Searches</p>
                <p class="text-xl font-bold text-gray-900 mt-1">5</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                    3 active alerts
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-orange-100 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Forum Activity Card -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-5 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Forum Posts</p>
                <p class="text-xl font-bold text-gray-900 mt-1">12</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                    Expert Level
                  </span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-indigo-100 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Featured Livestock Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Featured Livestock</h3>
                    <p class="mt-1 text-xs text-blue-100">Premium listings from verified farmers</p>
                  </div>
                  <router-link to="/market" class="text-xs font-medium text-white hover:text-blue-100 flex items-center">
                    Browse All
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <!-- Premium Cattle -->
                  <div class="group relative rounded-xl border border-gray-200/50 bg-white overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-32">
                      <img
                        src="https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Premium Cattle"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div class="absolute top-2 left-2">
                        <span class="px-1.5 py-0.5 text-xs font-bold rounded-full shadow-sm bg-yellow-100 text-yellow-800">
                          ⭐ Featured
                        </span>
                      </div>
                      <div class="absolute top-2 right-2">
                        <button class="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="p-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Premium Angus Cattle
                          </h3>
                          <p class="text-xs text-blue-600 font-medium">Angus • 2.5 years old</p>
                          <p class="text-xs text-gray-500 mt-1">by Santos Farm</p>
                        </div>
                        <p class="text-sm font-bold text-gray-900">₱48,000</p>
                      </div>
                      <div class="mt-3 flex justify-between items-center">
                        <div class="flex items-center text-xs text-gray-500">
                          <svg class="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Batangas
                        </div>
                        <router-link
                          to="/livestock/1"
                          class="text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </router-link>
                      </div>
                    </div>
                  </div>

                  <!-- Quality Pig -->
                  <div class="group relative rounded-xl border border-gray-200/50 bg-white overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-32">
                      <img
                        src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Quality Pig"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div class="absolute top-2 right-2">
                        <button class="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="p-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Large White Pig
                          </h3>
                          <p class="text-xs text-blue-600 font-medium">Large White • 8 months</p>
                          <p class="text-xs text-gray-500 mt-1">by Cruz Farm</p>
                        </div>
                        <p class="text-sm font-bold text-gray-900">₱13,500</p>
                      </div>
                      <div class="mt-3 flex justify-between items-center">
                        <div class="flex items-center text-xs text-gray-500">
                          <svg class="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Laguna
                        </div>
                        <router-link
                          to="/livestock/2"
                          class="text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </router-link>
                      </div>
                    </div>
                  </div>

                  <!-- Healthy Goat -->
                  <div class="group relative rounded-xl border border-gray-200/50 bg-white overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-32">
                      <img
                        src="https://images.unsplash.com/photo-1554995202-568b4089a0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Healthy Goat"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div class="absolute top-2 right-2">
                        <button class="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="p-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Boer Goat
                          </h3>
                          <p class="text-xs text-blue-600 font-medium">Boer • 1.5 years old</p>
                          <p class="text-xs text-gray-500 mt-1">by Reyes Farm</p>
                        </div>
                        <p class="text-sm font-bold text-gray-900">₱9,200</p>
                      </div>
                      <div class="mt-3 flex justify-between items-center">
                        <div class="flex items-center text-xs text-gray-500">
                          <svg class="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Cavite
                        </div>
                        <router-link
                          to="/livestock/3"
                          class="text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Market Insights Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Market Insights & Trends</h3>
                    <p class="mt-1 text-xs text-blue-100">Price trends and market analysis</p>
                  </div>
                  <div class="flex space-x-2">
                    <button class="text-xs px-2 py-1 bg-white/20 text-white rounded hover:bg-white/30 transition-colors">
                      Weekly
                    </button>
                    <button class="text-xs px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors">
                      Monthly
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Price Trends</h4>
                    <div class="h-64">
                      <canvas ref="priceChart"></canvas>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Available Livestock</h4>
                    <div class="h-64">
                      <canvas ref="availabilityChart"></canvas>
                    </div>
                  </div>
                </div>
                <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Avg. Market Price</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">₱18,500</p>
                    <p class="text-xs text-green-600 mt-1">+5% from last week</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">Active Listings</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">847</p>
                    <p class="text-xs text-blue-600 mt-1">+12% from last week</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs font-medium text-gray-500">New This Week</p>
                    <p class="text-lg font-bold text-gray-900 mt-1">156</p>
                    <p class="text-xs text-purple-600 mt-1">Fresh listings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Watchlist Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Your Watchlist</h3>
                    <p class="mt-1 text-xs text-blue-100">Items you're following</p>
                  </div>
                  <router-link to="/watchlist" class="text-xs font-medium text-white hover:text-blue-100 flex items-center">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
              <div class="divide-y divide-gray-200/50">
                <ul class="divide-y divide-gray-200/50">
                  <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div class="flex items-center">
                      <img class="h-12 w-12 rounded-lg object-cover" src="https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Cattle" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Angus Cattle</h4>
                          <span class="text-xs text-green-600 font-medium">Price dropped</span>
                        </div>
                        <p class="text-xs text-gray-600 mt-1">₱45,000 → ₱42,000</p>
                        <div class="mt-2 flex space-x-2">
                          <button class="text-xs font-medium text-blue-600 hover:text-blue-700">
                            View
                          </button>
                          <button class="text-xs font-medium text-red-600 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div class="flex items-center">
                      <img class="h-12 w-12 rounded-lg object-cover" src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Pig" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Large White Pig</h4>
                          <span class="text-xs text-blue-600 font-medium">New photos</span>
                        </div>
                        <p class="text-xs text-gray-600 mt-1">₱12,500</p>
                        <div class="mt-2 flex space-x-2">
                          <button class="text-xs font-medium text-blue-600 hover:text-blue-700">
                            View
                          </button>
                          <button class="text-xs font-medium text-red-600 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div class="flex items-center">
                      <img class="h-12 w-12 rounded-lg object-cover" src="https://images.unsplash.com/photo-1554995202-568b4089a0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Goat" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Boer Goat</h4>
                          <span class="text-xs text-gray-500 font-medium">No updates</span>
                        </div>
                        <p class="text-xs text-gray-600 mt-1">₱8,800</p>
                        <div class="mt-2 flex space-x-2">
                          <button class="text-xs font-medium text-blue-600 hover:text-blue-700">
                            View
                          </button>
                          <button class="text-xs font-medium text-red-600 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Recent Forum Activity Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-white">Forum Activity</h3>
                    <p class="mt-1 text-xs text-blue-100">Latest discussions and updates</p>
                  </div>
                  <router-link to="/forum" class="text-xs font-medium text-white hover:text-blue-100 flex items-center">
                    Join Forum
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
              <div class="divide-y divide-gray-200/50">
                <ul class="divide-y divide-gray-200/50">
                  <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div class="flex items-start">
                      <img class="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Expert" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Dr. Garcia</h4>
                          <span class="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p class="text-xs text-gray-600 mt-1 line-clamp-2">
                          "Tips for selecting healthy cattle: Look for clear eyes, good body condition..."
                        </p>
                        <div class="mt-2 flex items-center space-x-4">
                          <span class="text-xs text-gray-500">🔥 Hot Topic</span>
                          <button class="text-xs font-medium text-blue-600 hover:text-blue-700">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div class="flex items-start">
                      <img class="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/women/32.jpg" alt="Farmer" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Maria Santos</h4>
                          <span class="text-xs text-gray-500">5 hours ago</span>
                        </div>
                        <p class="text-xs text-gray-600 mt-1 line-clamp-2">
                          "Question about pig vaccination schedules for first-time buyers..."
                        </p>
                        <div class="mt-2 flex items-center space-x-4">
                          <span class="text-xs text-gray-500">❓ Q&A</span>
                          <button class="text-xs font-medium text-blue-600 hover:text-blue-700">
                            Answer
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div class="flex items-start">
                      <img class="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/28.jpg" alt="Buyer" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Juan Reyes</h4>
                          <span class="text-xs text-gray-500">1 day ago</span>
                        </div>
                        <p class="text-xs text-gray-600 mt-1 line-clamp-2">
                          "Great experience buying from Verde Farm! Highly recommend their goats..."
                        </p>
                        <div class="mt-2 flex items-center space-x-4">
                          <span class="text-xs text-gray-500">⭐ Review</span>
                          <button class="text-xs font-medium text-blue-600 hover:text-blue-700">
                            Read Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Quick Actions Section -->
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h3 class="text-lg font-semibold text-white">Quick Actions</h3>
                <p class="mt-1 text-xs text-blue-100">Essential tools at your fingertips</p>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-2 gap-4">
                  <router-link to="/market" class="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div class="p-2 bg-blue-100 rounded-full text-blue-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">Browse Market</span>
                  </router-link>
                  
                  <router-link to="/search" class="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div class="p-2 bg-purple-100 rounded-full text-purple-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">Advanced Search</span>
                  </router-link>
                  
                  <router-link to="/forum" class="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div class="p-2 bg-green-100 rounded-full text-green-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">Join Discussion</span>
                  </router-link>
                  
                  <router-link to="/profile" class="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <div class="p-2 bg-orange-100 rounded-full text-orange-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700 text-center">My Profile</span>
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
      priceChart: null,
      availabilityChart: null
    }
  },
  mounted() {
    // Register all Chart.js components
    Chart.register(...registerables)
    
    // Initialize price trends chart (Line)
    this.initPriceChart()
    
    // Initialize availability chart (Bar)
    this.initAvailabilityChart()
  },
  beforeUnmount() {
    // Clean up charts to prevent memory leaks
    if (this.priceChart) {
      this.priceChart.destroy()
    }
    if (this.availabilityChart) {
      this.availabilityChart.destroy()
    }
  },
  methods: {
    initPriceChart() {
      const ctx = this.$refs.priceChart.getContext('2d')
      this.priceChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Cattle',
              data: [42000, 45000, 43000, 47000, 46000, 48000, 45000],
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              fill: false,
              tension: 0.3,
              borderWidth: 2,
              pointBackgroundColor: '#3B82F6',
              pointRadius: 2
            },
            {
              label: 'Pigs',
              data: [12000, 13000, 12500, 14000, 13500, 13800, 13500],
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
              fill: false,
              tension: 0.3,
              borderWidth: 2,
              pointBackgroundColor: '#10B981',
              pointRadius: 2
            },
            {
              label: 'Goats',
              data: [8000, 8500, 8200, 9000, 8800, 9200, 8800],
              borderColor: '#F59E0B',
              backgroundColor: 'rgba(245, 158, 11, 0.05)',
              fill: false,
              tension: 0.3,
              borderWidth: 2,
              pointBackgroundColor: '#F59E0B',
              pointRadius: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ₱' + context.raw.toLocaleString()
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
    initAvailabilityChart() {
      const ctx = this.$refs.availabilityChart.getContext('2d')
      this.availabilityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Cattle', 'Pigs', 'Goats', 'Sheep', 'Poultry'],
          datasets: [{
            label: 'Available',
            data: [234, 156, 198, 87, 445],
            backgroundColor: [
              '#3B82F6',
              '#10B981', 
              '#F59E0B',
              '#8B5CF6',
              '#EC4899'
            ],
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