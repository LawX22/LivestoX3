<!-- adminDashboard.vue - UPDATED WITH SIDEBAR ICONS & COMPACT DESIGN -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
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
      <main class="flex-1 p-6 overflow-auto">
        <!-- Enhanced Header Section -->
        <div class="mb-5">
          <div v-if="isLoading"
            class="bg-white/95 backdrop-blur-xl rounded-xl p-5 animate-pulse">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-300 rounded-xl"></div>
                <div>
                  <div class="h-5 bg-gray-300 rounded w-48 mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div class="flex space-x-4">
                <div class="h-9 bg-gray-300 rounded w-32"></div>
                <div class="h-9 bg-gray-300 rounded w-24"></div>
                <div class="h-9 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>

          <div v-else
            class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-5 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-xl backdrop-blur-sm">
            <!-- Left side - Logo and Title -->
            <div class="flex items-center min-w-0">
              <div
                class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    opacity="0.3" />
                  <path
                    d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  <path
                    d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                    fill="#fff" />
                </svg>
              </div>
              <div class="min-w-0">
                <h1 class="text-xl font-bold text-white truncate">Dashboard Overview</h1>
                <p class="text-green-100 text-xs opacity-90 truncate">Welcome back, Administrator</p>
              </div>
            </div>

            <!-- Right side - Last updated and controls -->
            <div class="flex items-center space-x-3">
              <div class="text-xs bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Last updated:</span>
                <span class="font-medium ml-1">{{ lastUpdated }}</span>
              </div>
              <button 
                @click="refreshData"
                :disabled="isRefreshing"
                class="px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-xs text-white hover:bg-white/30 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                <svg v-if="!isRefreshing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Refresh
              </button>
              <select v-model="selectedTimeRange" @change="updateChartData" 
                class="px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-xs text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-white/50 cursor-pointer">
                <option value="7d" class="text-gray-800">Last 7 days</option>
                <option value="30d" class="text-gray-800">Last 30 days</option>
                <option value="90d" class="text-gray-800">Last 90 days</option>
                <option value="1y" class="text-gray-800">Last year</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Enhanced Stats Cards - COMPACT & NEW ICONS -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <!-- Skeleton Loading for Stats Cards -->
          <template v-if="isLoading">
            <div v-for="n in 4" :key="n" 
              class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 p-4 animate-pulse">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                  <div class="h-7 bg-gray-300 rounded w-16 mb-2"></div>
                  <div class="flex items-center space-x-2">
                    <div class="h-4 bg-gray-200 rounded w-14"></div>
                    <div class="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div class="w-10 h-10 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </template>

          <!-- Actual Stats Cards -->
          <template v-else>
            <!-- Total Users Card -->
            <router-link
              to="/userManagement"
              class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 p-4 transition-all hover:shadow-xl group relative overflow-hidden cursor-pointer"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative z-10 flex items-start justify-between">
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-900">
                    {{ formatNumber(stats.totalUsers) }}
                  </h3>
                  <div class="flex items-center mt-2">
                    <span
                      :class="[
                        'text-xs font-medium px-1.5 py-0.5 rounded inline-flex items-center',
                        stats.userChange >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      ]"
                    >
                      <svg v-if="stats.userChange >= 0" class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg v-else class="-ml-0.5 mr-0.5 h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      {{ stats.userChange >= 0 ? '+' : '' }}{{ Math.abs(stats.userChange).toFixed(1) }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </router-link>

            <!-- Upgrade Requests Card -->
            <router-link
              to="/upgradeRequests"
              class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 p-4 transition-all hover:shadow-xl group relative overflow-hidden cursor-pointer"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative z-10 flex items-start justify-between">
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Upgrade Requests</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-900">
                    {{ formatNumber(stats.requests) }}
                  </h3>
                  <div class="flex items-center mt-2">
                    <span
                      :class="[
                        'text-xs font-medium px-1.5 py-0.5 rounded inline-flex items-center',
                        stats.requestChange >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      ]"
                    >
                      <svg v-if="stats.requestChange >= 0" class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg v-else class="-ml-0.5 mr-0.5 h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      {{ stats.requestChange >= 0 ? '+' : '' }}{{ Math.abs(stats.requestChange).toFixed(1) }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div v-if="stats.requests > 0" class="absolute top-3 right-3">
                <span
                  class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"
                >
                  {{ stats.requests }} pending
                </span>
              </div>
            </router-link>

            <!-- Livestock Listings Card -->
            <router-link
              to="/AdminLivestockManagement"
              class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 p-4 transition-all hover:shadow-xl group relative overflow-hidden cursor-pointer"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative z-10 flex items-start justify-between">
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Livestock Listings</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-900">
                    {{ formatNumber(stats.livestock) }}
                  </h3>
                  <div class="flex items-center mt-2">
                    <span
                      :class="[
                        'text-xs font-medium px-1.5 py-0.5 rounded inline-flex items-center',
                        stats.livestockChange >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      ]"
                    >
                      <svg v-if="stats.livestockChange >= 0" class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg v-else class="-ml-0.5 mr-0.5 h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      {{ stats.livestockChange >= 0 ? '+' : '' }}{{ Math.abs(stats.livestockChange).toFixed(1) }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2 rounded-lg bg-amber-100 text-amber-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </router-link>

            <!-- Forum Questions Card -->
            <router-link
              to="/forumManagement"
              class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 p-4 transition-all hover:shadow-xl group relative overflow-hidden cursor-pointer"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative z-10 flex items-start justify-between">
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Forum Questions</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-900">
                    {{ formatNumber(stats.forumQuestions) }}
                  </h3>
                  <div class="flex items-center mt-2">
                    <span
                      :class="[
                        'text-xs font-medium px-1.5 py-0.5 rounded inline-flex items-center',
                        stats.forumChange >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      ]"
                    >
                      <svg v-if="stats.forumChange >= 0" class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      <svg v-else class="-ml-0.5 mr-0.5 h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      {{ stats.forumChange >= 0 ? '+' : '' }}{{ Math.abs(stats.forumChange).toFixed(1) }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </router-link>
          </template>
        </div>

        <!-- Charts Section - COMPACT -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-6">
          <!-- Skeleton Loading for Charts -->
          <template v-if="isLoading">
            <!-- User Growth Chart Skeleton -->
            <div class="xl:col-span-8">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                  <div class="animate-pulse">
                    <div class="h-4 bg-white/30 rounded w-40 mb-2"></div>
                    <div class="h-3 bg-white/20 rounded w-28"></div>
                  </div>
                </div>
                <div class="p-5">
                  <div class="h-56 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Demographics Chart Skeleton -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-teal-600 to-cyan-600">
                  <div class="animate-pulse">
                    <div class="h-4 bg-white/30 rounded w-36 mb-2"></div>
                    <div class="h-3 bg-white/20 rounded w-20"></div>
                  </div>
                </div>
                <div class="p-5">
                  <div class="h-48 flex items-center justify-center animate-pulse">
                    <div class="w-32 h-32 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Other Charts Skeletons -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-4 bg-white/30 rounded w-28 mb-2"></div>
                </div>
                <div class="p-5">
                  <div class="h-48 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-4 bg-white/30 rounded w-36 mb-2"></div>
                </div>
                <div class="p-5">
                  <div class="h-48 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-4 bg-white/30 rounded w-40 mb-2"></div>
                </div>
                <div class="p-5">
                  <div class="h-48 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div class="xl:col-span-12">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-4 bg-white/30 rounded w-28 mb-2"></div>
                </div>
                <div class="p-5">
                  <div class="h-48 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </template>

          <!-- Actual Charts -->
          <template v-else>
            <!-- User Growth Chart -->
            <div class="xl:col-span-8">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30 transition-all hover:shadow-xl">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-semibold text-white">User Growth Analytics</h3>
                      <p class="mt-0.5 text-xs text-emerald-100">Detailed user registration trends</p>
                    </div>
                    <div class="flex space-x-2">
                      <button 
                        @click="setUserGrowthView('registrations')"
                        :class="[
                          'text-xs px-2 py-1 rounded transition-colors cursor-pointer',
                          userGrowthView === 'registrations' 
                            ? 'bg-white/30 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        ]">
                        Registrations
                      </button>
                      <button 
                        @click="setUserGrowthView('active')"
                        :class="[
                          'text-xs px-2 py-1 rounded transition-colors cursor-pointer',
                          userGrowthView === 'active' 
                            ? 'bg-white/30 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        ]">
                        Active Users
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="p-5">
                  <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="bg-gray-50 rounded-lg p-3">
                      <div class="text-xl font-bold text-emerald-700">{{ userMetrics.newUsers }}</div>
                      <div class="text-xs text-emerald-600">New Users</div>
                      <div class="text-xs text-emerald-500 mt-0.5">+{{ userMetrics.newUsersChange }}% from last period</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                      <div class="text-xl font-bold text-blue-700">{{ userMetrics.activeUsers }}</div>
                      <div class="text-xs text-blue-600">Active Users</div>
                      <div class="text-xs text-blue-500 mt-0.5">{{ userMetrics.activeUsersChange }}% activity rate</div>
                    </div>
                  </div>

                  <div class="h-56">
                    <Chart 
                      type="line" 
                      :data="userGrowthData" 
                      :options="enhancedUserGrowthOptions" 
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- User Demographics Chart -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30 transition-all hover:shadow-xl">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-teal-600 to-cyan-600">
                  <div>
                    <h3 class="text-base font-semibold text-white">User Demographics</h3>
                    <p class="mt-0.5 text-xs text-cyan-100">User distribution</p>
                  </div>
                </div>
                
                <div class="p-5">
                  <div class="h-48">
                    <Chart 
                      type="doughnut" 
                      :data="demographicsChartData" 
                      :options="demographicsOptions" 
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Requests Status Chart -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30 transition-all hover:shadow-xl">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-semibold text-white">Request Status</h3>
                      <p class="mt-0.5 text-xs text-emerald-100">Upgrade request distribution</p>
                    </div>
                    <router-link
                      to="/upgradeRequests"
                      class="text-xs font-medium text-white hover:text-emerald-100 flex items-center cursor-pointer"
                    >
                      View all
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </router-link>
                  </div>
                </div>
                <div class="p-5">
                  <div class="h-48">
                    <Chart 
                      type="doughnut" 
                      :data="requestsStatusChartData" 
                      :options="requestsStatusOptions" 
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Livestock Categories Chart -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30 transition-all hover:shadow-xl">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  <div>
                    <h3 class="text-base font-semibold text-white">Livestock Categories</h3>
                    <p class="mt-0.5 text-xs text-emerald-100">Distribution by animal type</p>
                  </div>
                </div>
                <div class="p-5">
                  <div class="h-48">
                    <Chart 
                      type="polarArea" 
                      :data="livestockCategoriesChartData" 
                      :options="livestockCategoriesOptions" 
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Geographic Distribution -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30 transition-all hover:shadow-xl">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  <div>
                    <h3 class="text-base font-semibold text-white">Geographic Distribution</h3>
                    <p class="mt-0.5 text-xs text-emerald-100">Users by location</p>
                  </div>
                </div>
                <div class="p-5">
                  <div class="h-48">
                    <Chart 
                      type="bar" 
                      :data="geographicChartData" 
                      :options="geographicOptions" 
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Forum Analytics -->
            <div class="xl:col-span-12">
              <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30 transition-all hover:shadow-xl">
                <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-semibold text-white">Forum Analytics</h3>
                      <p class="mt-0.5 text-xs text-purple-100">Community engagement metrics</p>
                    </div>
                    <router-link
                      to="/forumManagement"
                      class="text-xs font-medium text-white hover:text-purple-100 flex items-center cursor-pointer"
                    >
                      View forum
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </router-link>
                  </div>
                </div>
                <div class="p-5">
                  <div class="grid grid-cols-5 gap-3 mb-4">
                    <div class="bg-purple-50 rounded-lg p-3">
                      <div class="text-xl font-bold text-purple-700">{{ forumAnalytics.totalQuestions }}</div>
                      <div class="text-xs text-purple-600">Total Questions</div>
                    </div>
                    <div class="bg-indigo-50 rounded-lg p-3">
                      <div class="text-xl font-bold text-indigo-700">{{ forumAnalytics.totalAnswers }}</div>
                      <div class="text-xs text-indigo-600">Total Answers</div>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-3">
                      <div class="text-xl font-bold text-blue-700">{{ forumAnalytics.avgAnswersPerQuestion }}</div>
                      <div class="text-xs text-blue-600">Avg. Answers/Question</div>
                    </div>
                    <div class="bg-cyan-50 rounded-lg p-3">
                      <div class="text-xl font-bold text-cyan-700">{{ forumAnalytics.recentActivity }}</div>
                      <div class="text-xs text-cyan-600">Questions (Last 7 Days)</div>
                    </div>
                    <div class="bg-teal-50 rounded-lg p-3">
                      <div class="text-xl font-bold text-teal-700">{{ forumAnalytics.topCategories.length }}</div>
                      <div class="text-xs text-teal-600">Active Categories</div>
                    </div>
                  </div>

                  <div v-if="forumAnalytics.topCategories.length > 0" class="mt-3">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Top Categories</h4>
                    <div class="grid grid-cols-5 gap-2">
                      <div v-for="(cat, index) in forumAnalytics.topCategories" :key="index"
                        class="bg-gray-50 rounded-lg p-2 border border-gray-200">
                        <div class="text-base font-bold text-gray-800">{{ cat.count }}</div>
                        <div class="text-xs text-gray-600 truncate">{{ cat.category }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Recent Activity - COMPACT -->
        <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30 transition-all hover:shadow-xl">
          <div class="px-5 py-3 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-semibold text-white">Recent Activity</h3>
                <p class="mt-0.5 text-xs text-emerald-100">Latest system activities</p>
              </div>
              <button
                @click="showActivityModal = true"
                class="text-xs font-medium text-white hover:text-emerald-100 flex items-center transition-colors cursor-pointer"
              >
                View all
                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200/50">
              <thead class="bg-white sticky top-0 z-10">
                <tr>
                  <th scope="col" class="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" class="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th scope="col" class="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th scope="col" class="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" class="px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200/50">
                <template v-if="isLoading">
                  <tr v-for="n in 5" :key="n" class="animate-pulse">
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-9 w-9 bg-gray-300 rounded-full"></div>
                        <div class="ml-3">
                          <div class="h-3 bg-gray-300 rounded w-28 mb-2"></div>
                          <div class="h-3 bg-gray-200 rounded w-36"></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="h-3 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="h-3 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="h-3 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="h-5 bg-gray-300 rounded-full w-18"></div>
                    </td>
                  </tr>
                </template>

                <template v-else>
                  <tr v-for="(activity, index) in recentActivities" :key="index" class="hover:bg-gray-50/80 transition-colors">
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-9 w-9">
                          <div class="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-medium text-sm">
                            {{ getUserInitials(activity.user) }}
                          </div>
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-900">{{ activity.user }}</div>
                          <div class="text-xs text-gray-500">{{ activity.userEmail }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ activity.action }}</div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ activity.details }}</div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ formatTime(activity.time) }}</div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">
                      <span :class="[
                        'px-2 py-1 text-xs font-medium rounded-full',
                        activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      ]">
                        {{ activity.status }}
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div v-if="!isLoading && recentActivities.length === 0" class="text-center py-6">
              <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="mt-3 text-sm text-gray-500">No recent activity found.</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Activity Modal Component -->
    <ActivityModal 
      :is-open="showActivityModal" 
      @close="showActivityModal = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'
import ActivityModal from '../../components/Admin/ActivityModal.vue'
import Chart from 'primevue/chart'
import { DashboardService } from '@/services/admindashboardService'
import type { 
  DashboardStats, 
  UserMetrics, 
  Demographics, 
  ActivityMetrics, 
  RecentActivity,
  ForumAnalyticsData 
} from '@/services/admindashboardService'

// Loading states
const isLoading = ref(true)
const isRefreshing = ref(false)
const lastUpdated = ref('')

// View controls
const selectedTimeRange = ref('30d')
const userGrowthView = ref('registrations')

// Activity modal state
const showActivityModal = ref(false)

// Data from backend
const stats = ref<DashboardStats>({
  totalUsers: 0,
  userChange: 0,
  requests: 0,
  requestChange: 0,
  livestock: 0,
  livestockChange: 0,
  forumQuestions: 0,
  forumChange: 0,
})

const userMetrics = ref<UserMetrics>({
  newUsers: 0,
  newUsersChange: 0,
  activeUsers: 0,
  activeUsersChange: 0,
  retention: 0,
  retentionTrend: 0,
  avgSession: 0,
  sessionTrend: 0,
})

const demographics = ref<Demographics>({
  farmers: 0,
  farmersChange: 0,
  buyers: 0,
  buyersChange: 0,
  guests: 0,
  guestsChange: 0,
  sources: {
    organic: 0,
    referral: 0,
    social: 0,
    direct: 0,
  },
})

const activityMetrics = ref<ActivityMetrics>({
  peakHour: 14,
})

const recentActivities = ref<RecentActivity[]>([])

const forumAnalytics = ref<ForumAnalyticsData>({
  totalQuestions: 0,
  totalAnswers: 0,
  avgAnswersPerQuestion: 0,
  topCategories: [],
  recentActivity: 0
})

// Chart data
const userGrowthData = ref({
  labels: [] as string[],
  datasets: [] as any[],
})

const demographicsChartData = computed(() => ({
  labels: ['Farmers', 'Buyers', 'Guests'],
  datasets: [
    {
      data: [demographics.value.farmers, demographics.value.buyers, demographics.value.guests],
      backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6'],
      borderWidth: 0,
      borderRadius: 4,
      hoverBackgroundColor: ['#059669', '#2563EB', '#7C3AED'],
      hoverBorderWidth: 2,
      hoverBorderColor: '#ffffff',
    },
  ],
}))

const requestsStatusChartData = ref({
  labels: ['Approved', 'Pending', 'Rejected'],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0,
      borderRadius: 4,
      hoverBackgroundColor: ['#059669', '#D97706', '#DC2626'],
      hoverBorderWidth: 2,
      hoverBorderColor: '#ffffff',
    },
  ],
})

const livestockCategoriesChartData = ref({
  labels: [] as string[],
  datasets: [
    {
      data: [] as number[],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
      borderColor: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#6B7280'],
      borderWidth: 2,
    },
  ],
})

const geographicChartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Users',
      data: [] as number[],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: '#10B981',
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
})

// Chart options
const enhancedUserGrowthOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 12,
        font: {
          size: 10,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: function (context: any) {
          return `${context[0].label} Analytics`
        },
        label: function (context: any) {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat().format(context.parsed.y)
          }
          return label
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 9,
        },
      },
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          size: 9,
        },
        callback: function (value: any) {
          return new Intl.NumberFormat().format(value)
        },
      },
    },
  },
})

const demographicsOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 12,
        font: {
          size: 9,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: function (context: any) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = Math.round((context.parsed * 100) / total)
          return `${context.label}: ${percentage}% (${context.parsed} users)`
        },
      },
    },
  },
})

const requestsStatusOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 12,
        font: {
          size: 9,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: function (context: any) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = total > 0 ? Math.round((context.parsed * 100) / total) : 0
          return `${context.label}: ${context.parsed} (${percentage}%)`
        },
      },
    },
  },
})

const livestockCategoriesOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 10,
        font: {
          size: 8,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      angleLines: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        display: false,
      },
    },
  },
})

const geographicOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: function (context: any) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = total > 0 ? Math.round((context.parsed.x * 100) / total) : 0
          return `${context.parsed.x} users (${percentage}%)`
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          size: 9,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 9,
        },
      },
    },
  },
})

// Methods
const loadDashboardData = async () => {
  try {
    isLoading.value = true
    console.log('🚀 Loading dashboard data...')

    const data = await DashboardService.getAllDashboardData()

    stats.value = data.stats
    userMetrics.value = data.userMetrics
    demographics.value = data.demographics
    activityMetrics.value = data.activityMetrics
    recentActivities.value = data.recentActivities
    forumAnalytics.value = data.charts.forumAnalytics

    updateUserGrowthChart(data.charts.userGrowth)
    
    requestsStatusChartData.value.datasets[0].data = [
      data.charts.requestsStatus.approved,
      data.charts.requestsStatus.pending,
      data.charts.requestsStatus.rejected,
    ]

    livestockCategoriesChartData.value.labels = data.charts.livestockCategories.labels
    livestockCategoriesChartData.value.datasets[0].data = data.charts.livestockCategories.data

    geographicChartData.value.labels = data.charts.geographic.labels
    geographicChartData.value.datasets[0].data = data.charts.geographic.data

    lastUpdated.value = new Date().toLocaleString()

    console.log('✅ Dashboard data loaded successfully')
  } catch (error) {
    console.error('❌ Error loading dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

const refreshData = async () => {
  try {
    isRefreshing.value = true
    await loadDashboardData()
  } finally {
    isRefreshing.value = false
  }
}

const setUserGrowthView = (view: string) => {
  userGrowthView.value = view
  updateUserGrowthChartView()
}

const updateUserGrowthChart = (data: any) => {
  userGrowthData.value.labels = data.labels
  userGrowthData.value.datasets = [
    {
      label: 'New Registrations',
      data: data.newRegistrations,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#10B981',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
    {
      label: 'Active Users',
      data: data.activeUsers,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
    }
  ]
  updateUserGrowthChartView()
}

const updateUserGrowthChartView = () => {
  if (userGrowthView.value === 'registrations') {
    userGrowthData.value.datasets = [
      {
        label: 'New Registrations',
        data: userGrowthData.value.datasets[0]?.data || [],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ]
  } else {
    userGrowthData.value.datasets = [
      {
        label: 'Active Users',
        data: userGrowthData.value.datasets[1]?.data || [],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ]
  }
}

const updateChartData = () => {
  console.log('Updating charts for time range:', selectedTimeRange.value)
  loadDashboardData()
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

const getUserInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>