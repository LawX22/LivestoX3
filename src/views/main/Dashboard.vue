<!-- Dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">

    <!-- Error State -->
    <div v-if="error" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div class="text-center">
          <svg class="mx-auto h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="mt-2 text-base font-medium text-gray-900">Error Loading Dashboard</h3>
          <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
          <div class="mt-4 flex space-x-3 justify-center">
            <button @click="retryLoad" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700">
              Try Again
            </button>
            <button @click="resetDashboard" class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div v-if="!error">
      <!-- Fixed NavBar -->
      <div class="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <!-- Main content container with padding for navbar -->
      <div class="pt-16 relative">
        <!-- Floating Background Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-20 left-10 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
          <div class="absolute top-32 right-16 w-10 h-10 bg-emerald-300 rounded-full opacity-30 animate-pulse"></div>
          <div class="absolute bottom-24 left-24 w-16 h-16 bg-teal-300 rounded-full opacity-15 animate-ping"></div>
        </div>

        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
          <!-- DYNAMIC COMBINED HEADER -->
          <div class="mb-4">
            <!-- Loading State Header Skeleton -->
            <div v-if="loading" class="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 p-3 rounded-lg border border-gray-200 shadow animate-pulse">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <!-- Left side skeleton -->
                <div class="flex items-center min-w-0 flex-1">
                  <div class="w-10 h-10 bg-gray-400/50 rounded-lg mr-2.5 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="space-y-2 flex-1">
                    <div class="h-4 bg-gray-400/50 rounded w-32 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-3 bg-gray-400/50 rounded w-40 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>
                </div>

                <!-- Right side skeleton -->
                <div class="flex items-center space-x-2 w-full sm:w-auto">
                  <div class="h-8 flex-1 sm:flex-none sm:w-24 bg-gray-400/50 rounded relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-8 flex-1 sm:flex-none sm:w-28 bg-gray-400/50 rounded relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-8 w-8 bg-gray-400/50 rounded relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actual Header -->
            <div v-else class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border border-green-200 shadow-md backdrop-blur-sm">
              <!-- Left side - Logo and Title -->
              <div class="flex items-center min-w-0">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-2.5 backdrop-blur-sm shadow">
                  <svg v-if="dashboardType === 'farmer'" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                    <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#fff" />
                  </svg>
                  <svg v-else class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <h1 class="text-lg font-bold text-white truncate">
                    {{ dashboardTitle }}
                  </h1>
                  <p class="text-green-100 text-xs opacity-90 truncate">
                    {{ dashboardSubtitle }}
                  </p>
                </div>
              </div>

              <!-- Right side - User info and refresh button -->
              <div class="flex items-center space-x-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                <div class="text-xs bg-white/20 backdrop-blur-md px-3 py-1.5 rounded text-white border border-white/30 flex-1 sm:flex-none">
                  <span class="opacity-90">Welcome,</span>
                  <span class="font-medium ml-1">{{ userName }}</span>
                </div>
                <div class="text-xs bg-white/20 backdrop-blur-md px-3 py-1.5 rounded text-white border border-white/30 hidden md:block">
                  <span class="opacity-90">Updated:</span>
                  <span class="font-medium ml-1">{{ lastUpdated }}</span>
                </div>
                <button @click="refreshData" :disabled="refreshing" class="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded shadow-sm transition-colors backdrop-blur-md border border-white/30 disabled:opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="{ 'animate-spin': refreshing }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Loading State with Skeleton -->
          <div v-if="loading" class="space-y-4">
            <!-- Stats Cards Skeleton -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div
                v-for="n in 5"
                :key="`stat-skeleton-${n}`"
                class="bg-white/95 backdrop-blur-sm rounded-lg border border-white/60 p-3 shadow animate-pulse"
              >
                <!-- Icon and Title -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1 space-y-2">
                    <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>
                  <div class="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>

                <!-- Growth Indicator -->
                <div class="flex items-center gap-1 mt-2">
                  <div class="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                  <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 relative overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table Section Skeleton -->
            <div class="bg-white/95 backdrop-blur-sm rounded-lg border border-white/60 shadow overflow-hidden">
              <!-- Table Header -->
              <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
                <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36 relative overflow-hidden">
                  <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
              </div>

              <!-- Table Rows -->
              <div class="divide-y divide-gray-200">
                <div
                  v-for="n in 3"
                  :key="`table-skeleton-${n}`"
                  class="px-4 py-3"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 flex-1">
                      <!-- Image -->
                      <div class="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg relative overflow-hidden shrink-0">
                        <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                      
                      <!-- Content -->
                      <div class="flex-1 space-y-1.5">
                        <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 relative overflow-hidden">
                          <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        </div>
                        <div class="h-2.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 relative overflow-hidden">
                          <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Status Badge -->
                    <div class="h-5 w-16 bg-gradient-to-r from-green-200 to-green-300 rounded-full relative overflow-hidden">
                      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dynamic Dashboard Content -->
          <div v-else>
            <FarmerDashboard
              v-if="dashboardType === 'farmer'"
              :user="user"
              :stats="stats"
              :table-data="tableData"
              :messages="messages"
              :last-updated="lastUpdated"
              :refreshing="refreshing"
              :time-range="timeRange"
              @refresh="refreshData"
              @time-range-change="setTimeRange"
            />
            <BuyerDashboard
              v-else
              :user="user"
              :stats="stats"
              :table-data="tableData"
              :messages="messages"
              :last-updated="lastUpdated"
              :refreshing="refreshing"
              :time-range="timeRange"
              @refresh="refreshData"
              @time-range-change="setTimeRange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FarmerDashboard from '@/components/Dashboard/FarmerDashboard.vue'
import BuyerDashboard from '@/components/Dashboard/BuyerDashboard.vue'
import type { User, Stats, TableItem, Message, } from '@/services/dashboard'
import { DashboardService } from '../../services/dashboardService'

// State
const loading = ref(true)
const error = ref<string | null>(null)
const refreshing = ref(false)
const timeRange = ref('monthly')
const user = ref<User | null>(null)
const stats = ref<Stats>({})
const tableData = ref<TableItem[]>([])
const messages = ref<Message[]>([])
const lastUpdated = ref(new Date().toLocaleString())

// Router
const router = useRouter()

// Computed Properties
const userRole = computed(() => user.value?.role || 'farmer')

// Determine dashboard type based on user role
const dashboardType = computed<'farmer' | 'buyer'>(() => {
  if (!user.value) return 'farmer'
  
  // If user has 'buyer' role, show buyer dashboard
  if (user.value.role === 'buyer') {
    return 'buyer'
  }
  
  // If user has 'both' role, default to farmer (you can add toggle functionality later)
  if (user.value.role === 'both') {
    return 'farmer'
  }
  
  // Default to farmer dashboard
  return 'farmer'
})

const userName = computed(() => {
  if (!user.value) return 'User'
  
  const firstName = user.value.firstname
  const lastName = user.value.lastname
  const username = user.value.username
  
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  } else if (firstName) {
    return firstName
  } else if (username) {
    return username
  }
  
  return 'User'
})

const dashboardTitle = computed(() => {
  return dashboardType.value === 'farmer' ? 'Farmer Dashboard' : 'Buyer Dashboard'
})

const dashboardSubtitle = computed(() => {
  return dashboardType.value === 'farmer' 
    ? 'Manage your farm operations and livestock sales'
    : 'Browse livestock and manage your purchases'
})

// Functions
const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

const setTimeRange = (range: string) => {
  timeRange.value = range
  loadDashboardData()
}

const refreshData = async () => {
  refreshing.value = true
  try {
    await loadDashboardData()
    lastUpdated.value = new Date().toLocaleString()
  } finally {
    refreshing.value = false
  }
}

const retryLoad = () => {
  error.value = null
  loading.value = true
  initializeDashboard()
}

const resetDashboard = () => {
  error.value = null
  stats.value = {}
  tableData.value = []
  messages.value = []
  loading.value = true
  initializeDashboard()
}

/**
 * Load all dashboard data using DashboardService
 */
const loadDashboardData = async () => {
  try {
    if (!user.value) {
      throw new Error('User not loaded')
    }

    console.log('📊 Loading dashboard data...')

    // Use the DashboardService to load all data
    const result = await DashboardService.loadDashboardData(
      user.value.id,
      dashboardType.value,
      timeRange.value
    )

    if (!result.success) {
      throw new Error(result.error || 'Failed to load dashboard data')
    }

    // Update state with the fetched data
    stats.value = result.stats || {}
    tableData.value = result.tableData || []
    messages.value = result.messages || []

    console.log('✅ Dashboard data loaded successfully')

  } catch (err) {
    console.error('Dashboard loading error:', err)
    throw err
  }
}

// Initialize dashboard
const initializeDashboard = async () => {
  try {
    loading.value = true
    error.value = null

    console.log('🚀 Initializing dashboard...')

    // Fetch user data using DashboardService
    const userResult = await DashboardService.getCurrentUser()

    if (!userResult.success || !userResult.data) {
      throw new Error(userResult.error || 'Unable to load user data')
    }

    user.value = userResult.data
    console.log('✅ User loaded:', user.value?.email ?? 'unknown', 'Role:', user.value?.role ?? 'unknown')

    // Load dashboard data based on user role
    await loadDashboardData()

  } catch (err) {
    console.error('Dashboard initialization error:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load dashboard'
    
    // Redirect to login if not authenticated
    if (err instanceof Error && (err.message === 'Not authenticated' || err.message === 'No user found')) {
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

// Watchers
watch(dashboardType, () => {
  if (user.value) {
    loadDashboardData()
  }
})

// Lifecycle
onMounted(() => {
  initializeDashboard()
})

</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>