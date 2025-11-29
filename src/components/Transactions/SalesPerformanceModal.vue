<!-- SalesPerformanceModal.vue - Wider Modal with Pie Chart (No Redundancy) -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="$emit('close')"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>

    <!-- Modal Container - WIDER -->
    <div class="flex min-h-screen items-center justify-center p-2">
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] max-h-[95vh] overflow-hidden transform transition-all"
        @click.stop
      >
        <!-- Header - COMPACT -->
        <div class="sticky top-0 z-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-4 py-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-base font-bold text-white">
                  {{ isFarmerView ? 'Sales Performance Report' : 'Purchase Analytics' }}
                </h2>
                <p class="text-xs text-green-100">
                  Comprehensive {{ isFarmerView ? 'revenue' : 'spending' }} analysis
                </p>
              </div>
            </div>
            <button
              @click="$emit('close')"
              class="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Period Selector - COMPACT -->
          <div class="mt-2 flex items-center gap-1.5">
            <button
              v-for="period in periods"
              :key="period.value"
              @click="selectedPeriod = period.value"
              :class="[
                'px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer',
                selectedPeriod === period.value
                  ? 'bg-white text-green-600 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              ]"
            >
              {{ period.label }}
            </button>
          </div>
        </div>

        <!-- Content - COMPACT -->
        <div class="overflow-y-auto max-h-[calc(95vh-140px)] p-4">
          <!-- Key Metrics Grid - SMALLER -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <!-- Total Revenue/Spending -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200 hover:shadow-md transition-shadow cursor-default">
              <div class="flex items-center justify-between mb-1.5">
                <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div :class="[
                  'px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                  stats.revenueChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                ]">
                  {{ stats.revenueChange >= 0 ? '↑' : '↓' }} {{ Math.abs(stats.revenueChange).toFixed(1) }}%
                </div>
              </div>
              <h3 class="text-[10px] font-medium text-gray-600 mb-0.5">
                {{ isFarmerView ? 'Total Revenue' : 'Total Spending' }}
              </h3>
              <p class="text-lg font-bold text-gray-900">₱{{ formatNumber(stats.totalRevenue) }}</p>
              <p class="text-[9px] text-gray-500 mt-0.5">{{ selectedPeriod === 'all' ? 'All time' : `Last ${selectedPeriod}` }}</p>
            </div>

            <!-- Total Orders -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200 hover:shadow-md transition-shadow cursor-default">
              <div class="flex items-center justify-between mb-1.5">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <div class="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                  {{ stats.completionRate }}%
                </div>
              </div>
              <h3 class="text-[10px] font-medium text-gray-600 mb-0.5">Total Orders</h3>
              <p class="text-lg font-bold text-gray-900">{{ stats.totalOrders }}</p>
              <p class="text-[9px] text-gray-500 mt-0.5">{{ stats.completedOrders }} completed</p>
            </div>

            <!-- Average Order Value -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200 hover:shadow-md transition-shadow cursor-default">
              <div class="flex items-center justify-between mb-1.5">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 class="text-[10px] font-medium text-gray-600 mb-0.5">Average Order Value</h3>
              <p class="text-lg font-bold text-gray-900">₱{{ formatNumber(stats.avgOrderValue) }}</p>
              <p class="text-[9px] text-gray-500 mt-0.5">Per transaction</p>
            </div>

            <!-- Total Livestock Sold/Bought -->
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200 hover:shadow-md transition-shadow cursor-default">
              <div class="flex items-center justify-between mb-1.5">
                <div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 class="text-[10px] font-medium text-gray-600 mb-0.5">
                Total Livestock {{ isFarmerView ? 'Sold' : 'Bought' }}
              </h3>
              <p class="text-lg font-bold text-gray-900">{{ stats.totalLivestock }}</p>
              <p class="text-[9px] text-gray-500 mt-0.5">Head count</p>
            </div>
          </div>

          <!-- Livestock Pie Chart - Full Width -->
          <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-4">
            <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Livestock Distribution by Type
              <span class="text-[10px] text-gray-500 font-normal">(Excludes Rejected Orders)</span>
            </h3>
            
            <!-- Empty State for Chart -->
            <div v-if="livestockPieData.length === 0" class="h-64 flex flex-col items-center justify-center text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                </svg>
              </div>
              <p class="text-xs text-gray-500">No livestock data available</p>
            </div>

            <!-- Pie Chart with Data -->
            <div v-else class="flex flex-col lg:flex-row items-center justify-center gap-8">
              <!-- Pie Chart SVG -->
              <div class="relative w-64 h-64 flex-shrink-0">
                <svg viewBox="0 0 200 200" class="transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#f3f4f6"
                    stroke-width="20"
                  />
                  <g v-for="(segment, index) in pieSegments" :key="index">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      :stroke="segment.color"
                      stroke-width="20"
                      :stroke-dasharray="`${segment.dashArray} ${segment.dashGap}`"
                      :stroke-dashoffset="segment.offset"
                      class="transition-all duration-300 hover:stroke-width-[25] cursor-pointer"
                      @mouseenter="hoveredSegment = index"
                      @mouseleave="hoveredSegment = null"
                    />
                  </g>
                </svg>
                
                <!-- Center Label -->
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <div class="text-center">
                    <p class="text-3xl font-bold text-gray-900">{{ stats.totalLivestock }}</p>
                    <p class="text-xs text-gray-500 uppercase font-medium">Total Heads</p>
                  </div>
                </div>
              </div>

              <!-- Legend -->
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                <div
                  v-for="(item, index) in livestockPieData"
                  :key="index"
                  :class="[
                    'flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer border-2',
                    hoveredSegment === index 
                      ? 'bg-gray-100 shadow-md border-gray-300' 
                      : 'hover:bg-gray-50 border-transparent'
                  ]"
                  @mouseenter="hoveredSegment = index"
                  @mouseleave="hoveredSegment = null"
                >
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      class="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                      :style="{ backgroundColor: item.color }"
                    ></div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-bold text-gray-900 truncate">{{ item.type }}</p>
                      <p class="text-xs text-gray-500">{{ item.count }} heads • {{ item.percentage }}%</p>
                    </div>
                  </div>
                  <div class="text-right ml-3">
                    <p class="text-sm font-bold text-gray-900">₱{{ formatNumber(item.revenue) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Status Distribution & Top Performers - COMPACT -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <!-- Order Status Distribution -->
            <div class="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Status
              </h3>

              <!-- Empty State -->
              <div v-if="statusDistribution.length === 0" class="flex flex-col items-center justify-center py-8">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p class="text-xs text-gray-500">No status data</p>
              </div>

              <!-- Data -->
              <div v-else class="space-y-2">
                <div
                  v-for="status in statusDistribution"
                  :key="status.name"
                  class="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div class="flex items-center gap-2">
                    <div
                      :class="[
                        'w-7 h-7 rounded-md flex items-center justify-center',
                        status.bgClass
                      ]"
                    >
                      <span class="text-xs font-bold" :class="status.textClass">{{ status.count }}</span>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-900">{{ status.name }}</p>
                      <p class="text-[10px] text-gray-500">{{ status.percentage }}% of total</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-bold text-gray-900">₱{{ formatNumber(status.revenue) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top Products/Breeds -->
            <div class="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Top Performers
              </h3>

              <!-- Empty State -->
              <div v-if="topProducts.length === 0" class="flex flex-col items-center justify-center py-8">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p class="text-xs text-gray-500">No top products yet</p>
              </div>

              <!-- Data -->
              <div v-else class="space-y-2">
                <div
                  v-for="(item, index) in topProducts"
                  :key="index"
                  class="flex items-center gap-2 p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div
                    :class="[
                      'w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px]',
                      index === 0 ? 'bg-amber-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-gray-200 text-gray-700'
                    ]"
                  >
                    #{{ index + 1 }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-gray-900 truncate">{{ item.name }}</p>
                    <p class="text-[10px] text-gray-500">{{ item.count }} sold • {{ item.quantity }} heads</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-bold text-gray-900">₱{{ formatNumber(item.revenue) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Transactions Table - COMPACT -->
          <div class="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
            <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Transactions
            </h3>

            <!-- Empty State -->
            <div v-if="recentTransactions.length === 0" class="flex flex-col items-center justify-center py-12">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-900 mb-1">No Transactions Yet</p>
              <p class="text-xs text-gray-500">Transaction history will appear here</p>
            </div>

            <!-- Table with Data -->
            <div v-else class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th class="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th class="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
                    <th class="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th class="px-3 py-2 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="tx in recentTransactions"
                    :key="tx.id"
                    class="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td class="px-3 py-2 text-gray-900">{{ formatDate(tx.date) }}</td>
                    <td class="px-3 py-2">
                      <div class="font-medium text-gray-900">{{ tx.animal.type }}</div>
                      <div class="text-[10px] text-gray-500">{{ tx.animal.breed }}</div>
                    </td>
                    <td class="px-3 py-2 text-gray-900">{{ tx.quantity }}</td>
                    <td class="px-3 py-2">
                      <span :class="getStatusBadgeClass(tx.status)">
                        {{ tx.status }}
                      </span>
                    </td>
                    <td class="px-3 py-2 text-right font-semibold text-gray-900">₱{{ formatNumber(tx.amount) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Footer Actions - COMPACT -->
        <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-2.5 flex items-center justify-between">
          <button
            @click="exportReport"
            class="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
          </button>
          <button
            @click="$emit('close')"
            class="px-5 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-xs font-medium hover:from-green-700 hover:to-emerald-700 transition-all cursor-pointer shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Transaction } from '@/types/transactionTypes'

interface Props {
  show: boolean
  transactions: Transaction[]
  isFarmerView: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const selectedPeriod = ref('30d')
const hoveredSegment = ref<number | null>(null)

const periods = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: 'All Time', value: 'all' }
]

// Filter transactions by period
const filteredTransactions = computed(() => {
  if (selectedPeriod.value === 'all') return props.transactions

  const days = parseInt(selectedPeriod.value)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return props.transactions.filter(tx => new Date(tx.date) >= cutoffDate)
})

// Filter out rejected transactions for analytics
const validTransactions = computed(() => {
  return filteredTransactions.value.filter(tx => tx.status !== 'Rejected')
})

// Calculate statistics (using valid transactions only)
const stats = computed(() => {
  const txs = validTransactions.value
  
  const totalRevenue = txs.reduce((sum, tx) => sum + tx.amount, 0)
  const totalOrders = txs.length
  const completedOrders = txs.filter(tx => tx.status === 'Completed').length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const totalLivestock = txs.reduce((sum, tx) => sum + tx.quantity, 0)
  const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0
  
  // Mock revenue change
  const revenueChange = Math.random() * 40 - 10

  return {
    totalRevenue,
    totalOrders,
    completedOrders,
    avgOrderValue,
    totalLivestock,
    completionRate,
    revenueChange
  }
})

// Livestock Pie Chart Data (excludes rejected)
const livestockPieData = computed(() => {
  const typeMap: Record<string, { count: number; revenue: number }> = {}
  
  validTransactions.value.forEach(tx => {
    const type = tx.animal.type
    if (!typeMap[type]) {
      typeMap[type] = { count: 0, revenue: 0 }
    }
    typeMap[type].count += tx.quantity
    typeMap[type].revenue += tx.amount
  })

  const colors = [
    '#10b981', // green
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#f59e0b', // amber
    '#ef4444', // red
    '#14b8a6', // teal
    '#f97316', // orange
    '#ec4899'  // pink
  ]

  const total = Object.values(typeMap).reduce((sum, data) => sum + data.count, 0)

  return Object.entries(typeMap)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([type, data], index) => ({
      type,
      count: data.count,
      revenue: data.revenue,
      percentage: total > 0 ? Math.round((data.count / total) * 100) : 0,
      color: colors[index % colors.length]
    }))
})

// Calculate pie segments for SVG
const pieSegments = computed(() => {
  const circumference = 2 * Math.PI * 90 // radius is 90
  let currentOffset = 0

  return livestockPieData.value.map(item => {
    const dashArray = (item.percentage / 100) * circumference
    const dashGap = circumference - dashArray
    const offset = -currentOffset

    currentOffset += dashArray

    return {
      dashArray: dashArray.toFixed(2),
      dashGap: dashGap.toFixed(2),
      offset: offset.toFixed(2),
      color: item.color
    }
  })
})

// Status distribution (excludes rejected from calculations but can show it)
const statusDistribution = computed(() => {
  const statusMap: Record<string, { count: number; revenue: number }> = {}
  
  filteredTransactions.value.forEach(tx => {
    if (!statusMap[tx.status]) {
      statusMap[tx.status] = { count: 0, revenue: 0 }
    }
    statusMap[tx.status].count += 1
    statusMap[tx.status].revenue += tx.amount
  })

  const total = filteredTransactions.value.length

  const statusConfig: Record<string, { bgClass: string; textClass: string }> = {
    'Pending': { bgClass: 'bg-yellow-100', textClass: 'text-yellow-700' },
    'Accepted': { bgClass: 'bg-blue-100', textClass: 'text-blue-700' },
    'Shipped': { bgClass: 'bg-purple-100', textClass: 'text-purple-700' },
    'Completed': { bgClass: 'bg-green-100', textClass: 'text-green-700' },
    'Cancelled': { bgClass: 'bg-red-100', textClass: 'text-red-700' },
    'Rejected': { bgClass: 'bg-red-100', textClass: 'text-red-700' }
  }

  return Object.entries(statusMap)
    .map(([name, data]) => ({
      name,
      count: data.count,
      revenue: data.revenue,
      percentage: total > 0 ? Math.round((data.count / total) * 100) : 0,
      ...(statusConfig[name] || { bgClass: 'bg-gray-100', textClass: 'text-gray-700' })
    }))
    .sort((a, b) => b.count - a.count)
})

// Top products (excludes rejected)
const topProducts = computed(() => {
  const productMap: Record<string, { count: number; revenue: number; quantity: number }> = {}
  
  validTransactions.value.forEach(tx => {
    const key = `${tx.animal.type} - ${tx.animal.breed}`
    if (!productMap[key]) {
      productMap[key] = { count: 0, revenue: 0, quantity: 0 }
    }
    productMap[key].count += 1
    productMap[key].revenue += tx.amount
    productMap[key].quantity += tx.quantity
  })

  return Object.entries(productMap)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([name, data]) => ({
      name,
      count: data.count,
      revenue: data.revenue,
      quantity: data.quantity
    }))
})

// Recent transactions (last 10, includes all statuses)
const recentTransactions = computed(() => {
  return filteredTransactions.value.slice(0, 10)
})

// Helper functions
const formatNumber = (value: number): string => {
  return value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-PH', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

const getStatusBadgeClass = (status: string): string => {
  const classes: Record<string, string> = {
    'Pending': 'px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-medium',
    'Accepted': 'px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium',
    'Shipped': 'px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-medium',
    'Completed': 'px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium',
    'Cancelled': 'px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-medium',
    'Rejected': 'px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-medium'
  }
  return classes[status] || 'px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] font-medium'
}

const exportReport = () => {
  // Mock export functionality
  console.log('Exporting report...')
  alert('Export functionality would generate a PDF/Excel report here')
}
</script>

<style scoped>
/* Smooth scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #059669;
}
</style>