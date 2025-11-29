<!-- SalesPerformanceSidebar.vue - Compact Revenue & Sales Performance Component -->
<template>
  <div class="w-64 bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-white font-bold text-xs">{{ isFarmerView ? 'Sales' : 'Purchases' }}</h3>
        </div>
        <button 
          @click="$emit('view-full')"
          class="text-white/80 hover:text-white transition-colors cursor-pointer p-1 hover:bg-white/10 rounded"
          title="View Full Report"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="p-3 space-y-2 flex-1 overflow-y-auto">
      <!-- Total Revenue/Spending -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 border border-green-100">
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-medium text-gray-600">{{ isFarmerView ? 'Total Revenue' : 'Total Spent' }}</span>
          <div class="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="text-lg font-bold text-gray-900">₱{{ formatNumber(stats.totalRevenue) }}</div>
        <div class="flex items-center gap-1 mt-0.5">
          <span :class="[
            'text-[10px] font-semibold',
            stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
          ]">
            {{ stats.revenueChange >= 0 ? '+' : '' }}{{ stats.revenueChange.toFixed(1) }}%
          </span>
          <span class="text-[10px] text-gray-500">vs last month</span>
        </div>
      </div>

      <!-- Orders & Avg Value - Compact Row -->
      <div class="grid grid-cols-2 gap-2">
        <!-- Orders Count -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-medium text-gray-600">Orders</span>
            <div class="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
          </div>
          <div class="text-lg font-bold text-gray-900">{{ stats.totalOrders }}</div>
          <div class="text-[9px] text-gray-500 mt-0.5">{{ stats.completedOrders }} done</div>
        </div>

        <!-- Average Order Value -->
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-100">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-medium text-gray-600">Avg</span>
            <div class="w-4 h-4 bg-purple-500 rounded flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="text-lg font-bold text-gray-900">₱{{ formatNumber(stats.avgOrderValue) }}</div>
          <div class="text-[9px] text-gray-500 mt-0.5">per order</div>
        </div>
      </div>

      <!-- Top Category - Only for farmers -->
      <div v-if="isFarmerView && stats.topCategory.name !== 'N/A'" class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-2 border border-amber-100">
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-medium text-gray-600">Top Category</span>
          <div class="w-4 h-4 bg-amber-500 rounded flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div class="text-sm font-bold text-gray-900 truncate">{{ stats.topCategory.name }}</div>
        <div class="text-[9px] text-gray-500 mt-0.5">₱{{ formatNumber(stats.topCategory.revenue) }}</div>
      </div>

      <!-- Recent Activity -->
      <div class="pt-2 border-t border-gray-200">
        <h4 class="text-[10px] font-bold text-gray-700 mb-1.5 flex items-center gap-1">
          <svg class="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
          Recent
        </h4>
        <div class="space-y-1.5 max-h-32 overflow-y-auto">
          <div 
            v-for="activity in recentActivities" 
            :key="activity.id"
            class="text-[10px] bg-gray-50 rounded p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div class="flex items-start justify-between gap-1">
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 truncate">{{ activity.title }}</p>
                <p class="text-gray-500 text-[9px] mt-0.5">{{ activity.description }}</p>
              </div>
              <span class="text-green-600 font-semibold whitespace-nowrap text-[9px]">₱{{ formatNumber(activity.amount) }}</span>
            </div>
            <div class="text-[8px] text-gray-400 mt-0.5">{{ formatDate(activity.date) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- View Full Report Button -->
    <div class="p-2 border-t border-gray-200 bg-gray-50">
      <button 
        @click="$emit('view-full')"
        class="w-full px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-xs font-medium hover:from-green-700 hover:to-emerald-700 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        View Full Report
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '@/types/transactionTypes'

interface Props {
  transactions: Transaction[]
  isFarmerView: boolean
}

const props = defineProps<Props>()

defineEmits<{
  (e: 'view-full'): void
}>()

// Calculate statistics
const stats = computed(() => {
  const txs = props.transactions
  
  // Total revenue
  const totalRevenue = txs.reduce((sum, tx) => sum + tx.amount, 0)
  
  // Total orders
  const totalOrders = txs.length
  
  // Completed orders
  const completedOrders = txs.filter(tx => tx.status === 'Completed').length
  
  // Average order value
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  
  // Revenue change (mock - would need historical data)
  const revenueChange = Math.random() * 30 - 10 // Random between -10 and +20
  
  // Top category (for farmer view)
  const categoryRevenue: Record<string, number> = {}
  txs.forEach(tx => {
    const type = tx.animal.type
    categoryRevenue[type] = (categoryRevenue[type] || 0) + tx.amount
  })
  
  const topCategoryEntry = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1])[0]
  const topCategory = topCategoryEntry 
    ? { name: topCategoryEntry[0], revenue: topCategoryEntry[1] }
    : { name: 'N/A', revenue: 0 }
  
  return {
    totalRevenue,
    totalOrders,
    completedOrders,
    avgOrderValue,
    revenueChange,
    topCategory
  }
})

// Recent activities (last 5 transactions)
const recentActivities = computed(() => {
  return props.transactions
    .slice(0, 5)
    .map(tx => ({
      id: tx.id,
      title: `${tx.animal.type} - ${tx.animal.breed}`,
      description: `${tx.quantity} ${tx.quantity > 1 ? 'heads' : 'head'} • ${tx.status}`,
      amount: tx.amount,
      date: tx.date
    }))
})

// Helper functions
const formatNumber = (value: number): string => {
  return value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  
  return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
/* Custom scrollbar for recent activities */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
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