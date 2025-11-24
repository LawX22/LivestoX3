<!-- adminDashboard.vue - WITH SKELETON LOADING -->
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
          <div v-if="isLoading"
            class="bg-white/95 backdrop-blur-xl rounded-xl p-6 animate-pulse">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gray-300 rounded-xl"></div>
                <div>
                  <div class="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                  <div class="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div class="flex space-x-4">
                <div class="h-10 bg-gray-300 rounded w-32"></div>
                <div class="h-10 bg-gray-300 rounded w-24"></div>
                <div class="h-10 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>

          <div v-else
            class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-xl backdrop-blur-sm">
            <!-- Left side - Logo and Title -->
            <div class="flex items-center min-w-0">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    opacity="0.3" />
                  <path
                    d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  <path
                    d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                    fill="#fff" />
                  <path d="M9.5 8.5L8 7l1.5-1.5L11 7l-1.5 1.5zM15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z" />
                  <path
                    d="M16.5 10.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"
                    fill="#4ade80" />
                  <path d="M12 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="#fff" />
                </svg>
              </div>
              <div class="min-w-0">
                <h1 class="text-2xl font-bold text-white truncate">Dashboard Overview</h1>
                <p class="text-green-100 text-sm opacity-90 truncate">Welcome back, Administrator</p>
              </div>
            </div>

            <!-- Right side - Last updated and controls -->
            <div class="flex items-center space-x-4">
              <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                <span class="opacity-90">Last updated:</span>
                <span class="font-medium ml-1">{{ lastUpdated }}</span>
              </div>
              <button 
                @click="refreshData"
                :disabled="isRefreshing"
                class="px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-sm text-white hover:bg-white/30 transition-colors disabled:opacity-50 flex items-center gap-2">
                <svg v-if="!isRefreshing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Refresh
              </button>
              <select v-model="selectedTimeRange" @change="updateChartData" 
                class="px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-white/50">
                <option value="7d" class="text-gray-800">Last 7 days</option>
                <option value="30d" class="text-gray-800">Last 30 days</option>
                <option value="90d" class="text-gray-800">Last 90 days</option>
                <option value="1y" class="text-gray-800">Last year</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Enhanced Stats Cards with Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Skeleton Loading for Stats Cards -->
          <template v-if="isLoading">
            <div v-for="n in 4" :key="n" 
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 animate-pulse">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="h-3 bg-gray-300 rounded w-24 mb-3"></div>
                  <div class="h-8 bg-gray-300 rounded w-20 mb-3"></div>
                  <div class="flex items-center space-x-2">
                    <div class="h-5 bg-gray-200 rounded w-16"></div>
                    <div class="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div class="w-12 h-12 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </template>

          <!-- Actual Stats Cards -->
          <template v-else>
            <router-link
              to="/userManagement"
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl group relative overflow-hidden"
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
                      {{ stats.userChange >= 0 ? '+' : '' }}{{ stats.userChange }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2.5 rounded-lg bg-emerald-100 text-emerald-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
            </router-link>

            <router-link
              to="/upgradeRequests"
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl group relative overflow-hidden"
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
                      {{ stats.requestChange >= 0 ? '+' : '' }}{{ stats.requestChange }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2.5 rounded-lg bg-blue-100 text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div v-if="stats.requests > 0" class="absolute top-4 right-4">
                <span
                  class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"
                >
                  {{ stats.requests }} pending
                </span>
              </div>
            </router-link>

            <router-link
              to="/admin/livestock"
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl group relative overflow-hidden"
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
                      {{ stats.livestockChange >= 0 ? '+' : '' }}{{ stats.livestockChange }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2.5 rounded-lg bg-amber-100 text-amber-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            </router-link>

            <router-link
              to="/admin/reports"
              class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 transition-all hover:shadow-2xl group relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative z-10 flex items-start justify-between">
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Reports Generated</p>
                  <h3 class="text-2xl font-bold mt-1 text-gray-900">
                    {{ formatNumber(stats.reports) }}
                  </h3>
                  <div class="flex items-center mt-2">
                    <span
                      :class="[
                        'text-xs font-medium px-1.5 py-0.5 rounded inline-flex items-center',
                        stats.reportChange >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      ]"
                    >
                      <svg v-if="stats.reportChange >= 0" class="-ml-0.5 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd" />
                      </svg>
                      {{ stats.reportChange >= 0 ? '+' : '' }}{{ stats.reportChange }}%
                    </span>
                    <span class="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div class="p-2.5 rounded-lg bg-purple-100 text-purple-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </router-link>
          </template>
        </div>

        <!-- Enhanced Charts Section with Skeleton -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          <!-- Skeleton Loading for Charts -->
          <template v-if="isLoading">
            <!-- User Growth Chart Skeleton - Span 8 columns -->
            <div class="xl:col-span-8">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                  <div class="animate-pulse">
                    <div class="h-5 bg-white/30 rounded w-48 mb-2"></div>
                    <div class="h-3 bg-white/20 rounded w-32"></div>
                  </div>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-2 gap-4 mb-6 animate-pulse">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="h-8 bg-gray-300 rounded w-16 mb-2"></div>
                      <div class="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div class="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="h-8 bg-gray-300 rounded w-16 mb-2"></div>
                      <div class="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div class="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                  <div class="h-80 bg-gray-100 rounded animate-pulse flex items-end justify-around px-4 pb-4">
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 45%"></div>
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 60%"></div>
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 40%"></div>
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 70%"></div>
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 55%"></div>
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 80%"></div>
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 65%"></div>
                    <div class="w-8 bg-gray-300 rounded-t" style="height: 50%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Demographics Chart Skeleton - Span 4 columns -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-teal-600 to-cyan-600">
                  <div class="animate-pulse">
                    <div class="h-5 bg-white/30 rounded w-40 mb-2"></div>
                    <div class="h-3 bg-white/20 rounded w-24"></div>
                  </div>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-3 gap-4 mb-6 animate-pulse">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="h-8 bg-gray-300 rounded w-12 mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div class="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="h-8 bg-gray-300 rounded w-12 mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div class="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="h-8 bg-gray-300 rounded w-12 mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div class="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                  <div class="h-64 flex items-center justify-center animate-pulse">
                    <div class="w-48 h-48 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Other Chart Skeletons -->
            <div class="xl:col-span-6">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-5 bg-white/30 rounded w-32 mb-2"></div>
                  <div class="h-3 bg-white/20 rounded w-40"></div>
                </div>
                <div class="p-6">
                  <div class="h-64 flex items-center justify-center animate-pulse">
                    <div class="w-56 h-56 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="xl:col-span-6">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-5 bg-white/30 rounded w-40 mb-2"></div>
                  <div class="h-3 bg-white/20 rounded w-36"></div>
                </div>
                <div class="p-6">
                  <div class="h-64 flex items-center justify-center animate-pulse">
                    <div class="w-56 h-56 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="xl:col-span-8">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-5 bg-white/30 rounded w-44 mb-2"></div>
                  <div class="h-3 bg-white/20 rounded w-28"></div>
                </div>
                <div class="p-6">
                  <div class="h-80 bg-gray-100 rounded animate-pulse flex items-end justify-around px-4 pb-4">
                    <div class="w-12 bg-gray-300 rounded-t" style="height: 70%"></div>
                    <div class="w-12 bg-gray-300 rounded-t" style="height: 50%"></div>
                    <div class="w-12 bg-gray-300 rounded-t" style="height: 35%"></div>
                    <div class="w-12 bg-gray-300 rounded-t" style="height: 60%"></div>
                    <div class="w-12 bg-gray-300 rounded-t" style="height: 45%"></div>
                    <div class="w-12 bg-gray-300 rounded-t" style="height: 55%"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse">
                  <div class="h-5 bg-white/30 rounded w-32 mb-2"></div>
                  <div class="h-3 bg-white/20 rounded w-40"></div>
                </div>
                <div class="p-6">
                  <div class="h-64 bg-gray-100 rounded animate-pulse flex items-end justify-around px-4 pb-4">
                    <div class="w-6 bg-gray-300 rounded-t" style="height: 35%"></div>
                    <div class="w-6 bg-gray-300 rounded-t" style="height: 25%"></div>
                    <div class="w-6 bg-gray-300 rounded-t" style="height: 15%"></div>
                    <div class="w-6 bg-gray-300 rounded-t" style="height: 40%"></div>
                    <div class="w-6 bg-gray-300 rounded-t" style="height: 60%"></div>
                    <div class="w-6 bg-gray-300 rounded-t" style="height: 85%"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Actual Charts (same as before) -->
          <template v-else>
            <!-- User Growth Chart - Span 8 columns -->
            <div class="xl:col-span-8">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 to-emerald-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-white">User Growth Analytics</h3>
                      <p class="mt-1 text-xs text-emerald-100">Detailed user registration trends</p>
                    </div>
                    <div class="flex space-x-2">
                      <button 
                        @click="setUserGrowthView('registrations')"
                        :class="[
                          'text-xs px-2 py-1 rounded transition-colors',
                          userGrowthView === 'registrations' 
                            ? 'bg-white/30 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        ]">
                        Registrations
                      </button>
                      <button 
                        @click="setUserGrowthView('active')"
                        :class="[
                          'text-xs px-2 py-1 rounded transition-colors',
                          userGrowthView === 'active' 
                            ? 'bg-white/30 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        ]">
                        Active Users
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="p-6">
                  <!-- Growth Metrics -->
                  <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-emerald-700">{{ userMetrics.newUsers }}</div>
                      <div class="text-sm text-emerald-600">New Users</div>
                      <div class="text-xs text-emerald-500 mt-1">+{{ userMetrics.newUsersChange }}% from last period</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-blue-700">{{ userMetrics.activeUsers }}</div>
                      <div class="text-sm text-blue-600">Active Users</div>
                      <div class="text-xs text-blue-500 mt-1">{{ userMetrics.activeUsersChange }}% activity rate</div>
                    </div>
                  </div>

                  <div class="h-80">
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

            <!-- User Demographics Chart - Span 4 columns -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-teal-600 to-cyan-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-white">User Demographics</h3>
                      <p class="mt-1 text-xs text-cyan-100">User distribution</p>
                    </div>
                  </div>
                </div>
                
                <div class="p-6">
                  <!-- Demographic Metrics -->
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-teal-700">{{ demographics.farmers }}</div>
                      <div class="text-sm text-teal-600">Farmers</div>
                      <div class="text-xs text-teal-500 mt-1">{{ demographics.farmersChange }}%</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-cyan-700">{{ demographics.buyers }}</div>
                      <div class="text-sm text-cyan-600">Buyers</div>
                      <div class="text-xs text-cyan-500 mt-1">{{ demographics.buyersChange }}%</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-purple-700">{{ demographics.guests }}</div>
                      <div class="text-sm text-purple-600">Guests</div>
                      <div class="text-xs text-purple-500 mt-1">{{ demographics.guestsChange }}%</div>
                    </div>
                  </div>

                  <div class="h-64">
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

            <!-- Requests Status Chart - Span 6 columns -->
            <div class="xl:col-span-6">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-white">Request Status</h3>
                      <p class="mt-1 text-xs text-emerald-100">Upgrade request distribution</p>
                    </div>
                    <router-link
                      to="/upgradeRequests"
                      class="text-xs font-medium text-white hover:text-emerald-100 flex items-center"
                    >
                      View all
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </router-link>
                  </div>
                </div>
                <div class="p-6">
                  <div class="h-64">
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

            <!-- Livestock Categories Chart - Span 6 columns -->
            <div class="xl:col-span-6">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-white">Livestock Categories</h3>
                      <p class="mt-1 text-xs text-emerald-100">Distribution by animal type</p>
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <div class="h-64">
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

            <!-- Geographic Distribution - Span 8 columns -->
            <div class="xl:col-span-8">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-white">Geographic Distribution</h3>
                      <p class="mt-1 text-xs text-emerald-100">Users by location</p>
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <div class="h-80">
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

            <!-- Activity Timeline - Span 4 columns -->
            <div class="xl:col-span-4">
              <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
                <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-white">Daily Activity</h3>
                      <p class="mt-1 text-xs text-emerald-100">User engagement patterns</p>
                    </div>
                    <div class="text-right">
                      <div class="text-lg font-bold text-white">{{ activityMetrics.peakHour }}:00</div>
                      <div class="text-xs text-emerald-100">Peak hour</div>
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <div class="h-64">
                    <Chart 
                      type="line" 
                      :data="activityTimelineChartData" 
                      :options="activityTimelineOptions" 
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Recent Activity with Skeleton -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all hover:shadow-2xl">
          <div class="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Recent Activity</h3>
                <p class="mt-1 text-xs text-emerald-100">Latest system activities</p>
              </div>
              <router-link
                to="/admin/activity"
                class="text-xs font-medium text-white hover:text-emerald-100 flex items-center"
              >
                View all
                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200/50">
              <thead class="bg-white sticky top-0 z-10">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200/50">
                <!-- Skeleton Loading for Table -->
                <template v-if="isLoading">
                  <tr v-for="n in 5" :key="n" class="animate-pulse">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div class="ml-4">
                          <div class="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div class="h-3 bg-gray-200 rounded w-40"></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="h-4 bg-gray-300 rounded w-28"></div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="h-4 bg-gray-200 rounded w-36"></div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="h-6 bg-gray-300 rounded-full w-20"></div>
                    </td>
                  </tr>
                </template>

                <!-- Actual Data -->
                <template v-else>
                  <tr v-for="(activity, index) in recentActivities" :key="index" class="hover:bg-gray-50/80 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-medium">
                            {{ getUserInitials(activity.user) }}
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ activity.user }}</div>
                          <div class="text-sm text-gray-500">{{ activity.userEmail }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ activity.action }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ activity.details }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ formatTime(activity.time) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
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
            <div v-if="!isLoading && recentActivities.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="mt-4 text-sm text-gray-500">No recent activity found.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'
import Chart from 'primevue/chart'
import { DashboardService } from '@/services/admindashboardService'
import type { DashboardStats , UserMetrics , Demographics , ActivityMetrics , RecentActivity , } from '@/services/admindashboardService'

// Loading states
const isLoading = ref(true)
const isRefreshing = ref(false)
const lastUpdated = ref('')

// View controls
const selectedTimeRange = ref('30d')
const userGrowthView = ref('registrations')

// Data from backend
const stats = ref<DashboardStats>({
  totalUsers: 0,
  userChange: 0,
  requests: 0,
  requestChange: 0,
  livestock: 0,
  livestockChange: 0,
  reports: 0,
  reportChange: 0,
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

const activityTimelineChartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Active Users',
      data: [] as number[],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
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
        padding: 20,
        font: {
          size: 12,
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
          size: 11,
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
          size: 11,
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
        padding: 20,
        font: {
          size: 12,
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
        padding: 20,
        font: {
          size: 12,
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
        padding: 15,
        font: {
          size: 11,
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
          const percentage = Math.round((context.parsed.x * 100) / total)
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
          size: 11,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
})

const activityTimelineOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
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
        title: function (context: any) {
          return `${context[0].label}`
        },
        label: function (context: any) {
          return `Active Users: ${context.parsed.y}`
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
          size: 11,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          size: 11,
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

    // Update all data
    stats.value = data.stats
    userMetrics.value = data.userMetrics
    demographics.value = data.demographics
    activityMetrics.value = data.activityMetrics
    recentActivities.value = data.recentActivities

    // Update chart data
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

    activityTimelineChartData.value.labels = data.charts.activityTimeline.labels
    activityTimelineChartData.value.datasets[0].data = data.charts.activityTimeline.data

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
      pointRadius: 6,
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
      pointRadius: 6,
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
        pointRadius: 6,
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
        pointRadius: 6,
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

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
/* Additional shimmer animation for skeleton */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>