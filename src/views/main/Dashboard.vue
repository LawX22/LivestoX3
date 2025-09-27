<!-- UnifiedDashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
        <p class="mt-4 text-emerald-600 font-medium">Loading dashboard...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">Error Loading Dashboard</h3>
          <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
          <div class="mt-6 flex space-x-4 justify-center">
            <button @click="retryLoad" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700">
              Try Again
            </button>
            <button @click="goToLogin" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div v-if="!loading && !error && user">
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
          <div class="sticky top-16 z-40 mb-6">
            <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-row justify-between items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
              <!-- Left side - Logo and Title -->
              <div class="flex items-center min-w-0">
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
                  <svg v-if="dashboardType === 'farmer'" class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                    <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#fff" />
                  </svg>
                  <svg v-else class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <h1 class="text-xl font-bold text-white truncate">
                    {{ dashboardTitle }}
                  </h1>
                  <p class="text-green-100 text-sm opacity-90 truncate">
                    {{ dashboardSubtitle }}
                  </p>
                </div>
              </div>

              <!-- Dashboard Type Toggle (only show if user has multiple roles) -->
              <div v-if="canToggleRole" class="flex items-center space-x-2">
                <button 
                  @click="toggleDashboardType"
                  class="text-xs font-medium text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-md border border-white/30">
                  Switch to {{ dashboardType === 'farmer' ? 'Buyer' : 'Farmer' }}
                </button>
              </div>

              <!-- Right side - User info and refresh button -->
              <div class="flex items-center space-x-4">
                <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                  <span class="opacity-90">Welcome,</span>
                  <span class="font-medium ml-1">{{ userName }}</span>
                </div>
                <div class="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/30">
                  <span class="opacity-90">Last updated:</span>
                  <span class="font-medium ml-1">{{ lastUpdated }}</span>
                </div>
                <button @click="refreshData" :disabled="refreshing" class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg shadow-sm transition-colors backdrop-blur-md border border-white/30 disabled:opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'animate-spin': refreshing }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Dynamic Dashboard Content -->
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
            @toggle-role="toggleDashboardType"
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
            @toggle-role="toggleDashboardType"
            @time-range-change="setTimeRange"
          />
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
import type { User, Stats, TableItem, Message } from '@/services/dashboard'
import { auth } from '@/services/auth-service'
import { supabase } from '@/supabase'

// Props
interface Props {
  userType?: 'farmer' | 'buyer'
}

const props = withDefaults(defineProps<Props>(), {
  userType: 'farmer'
})

// State
const loading = ref(true)
const error = ref<string | null>(null)
const refreshing = ref(false)
const user = ref<User | null>(null)
const dashboardType = ref<'farmer' | 'buyer'>(props.userType)
const timeRange = ref('monthly')
const stats = ref<Stats>({})
const tableData = ref<TableItem[]>([])
const messages = ref<Message[]>([])
const lastUpdated = ref(new Date().toLocaleString())

// Router
const router = useRouter()

// Computed Properties
const userRole = computed(() => user.value?.role || 'farmer')
const userName = computed(() => {
  if (user.value?.first_name && user.value?.last_name) {
    return `${user.value.first_name} ${user.value.last_name}`
  }
  return user.value?.username || user.value?.email?.split('@')[0] || 'User'
})

const canToggleRole = computed(() => user.value?.role === 'both')

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
  loadAnalyticsData()
}

const toggleDashboardType = () => {
  if (canToggleRole.value) {
    dashboardType.value = dashboardType.value === 'farmer' ? 'buyer' : 'farmer'
    loadDashboardData()
  }
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
  loadDashboardData()
}

const goToLogin = () => {
  router.push('/login')
}

// Data Loading Functions
const getCurrentUser = async (): Promise<User | null> => {
  try {
    const currentUser = await auth.getCurrentUser()
    
    if (!currentUser) {
      console.log('No user found, redirecting to login')
      router.push('/login')
      return null
    }

    return currentUser
  } catch (err) {
    console.error('Error getting current user:', err)
    // Redirect to login on error
    router.push('/login')
    return null
  }
}

const loadStats = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (dashboardType.value === 'farmer') {
      stats.value = {
        totalListings: 24,
        activeListings: 18,
        totalRevenue: 125000,
        totalOrders: 45,
        pendingOrders: 3,
        totalSpent: 0,
        totalMessages: 12,
        unreadMessages: 3,
        rating: 4.5,
        totalReviews: 28,
        listingsGrowth: 15,
        revenueGrowth: 22,
        totalViews: 342,
        averagePrice: 5200,
        priceGrowth: 8,
        totalUnits: 67,
        unitsGrowth: 12,
        conversionRate: 4.2,
        conversionGrowth: 3,
        statusBreakdown: {
          available: 15,
          lowStock: 7,
          outOfStock: 2
        }
      }
    } else {
      stats.value = {
        totalListings: 0,
        activeListings: 0,
        totalRevenue: 0,
        totalOrders: 18,
        pendingOrders: 2,
        totalSpent: 67500,
        totalMessages: 8,
        unreadMessages: 2,
        rating: 4.8,
        totalReviews: 15,
        ordersGrowth: 25,
        savingsPercentage: 12,
        averagePrice: 3750,
        priceGrowth: -5,
        ordersPerMonth: 4,
        orderFrequencyGrowth: 15,
        preferredCategory: 'Cattle',
        categoryPercentage: 42,
        statusBreakdown: {
          completed: 12,
          processing: 4,
          shipped: 2
        }
      }
    }
  } catch (err) {
    console.error('Error loading stats:', err)
    // Use fallback data
    stats.value = {
      totalListings: 0,
      activeListings: 0,
      totalRevenue: 0,
      totalOrders: 0,
      pendingOrders: 0,
      totalSpent: 0,
      totalMessages: 0,
      unreadMessages: 0,
      rating: 0,
      totalReviews: 0
    }
  }
}

const loadTableData = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (dashboardType.value === 'farmer') {
      tableData.value = [
        {
          id: '1',
          name: 'Angus Cattle',
          type: 'Cattle',
          price: '₱45,000',
          status: 'Available',
          statusClass: 'bg-green-100 text-green-800',
          stock: 15,
          date: '2024-01-15',
          image: '/api/placeholder/40/40'
        }
      ]
    } else {
      tableData.value = [
        {
          id: 'ORD-001',
          livestock: 'Angus Cattle',
          type: 'Cattle',
          seller: 'Farm Fresh',
          amount: '₱45,000',
          date: '2024-01-15',
          status: 'Completed',
          statusClass: 'bg-green-100 text-green-800',
          image: '/api/placeholder/40/40'
        }
      ]
    }
  } catch (err) {
    console.error('Error loading table data:', err)
    tableData.value = []
  }
}

const loadMessages = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200))
    
    messages.value = [
      {
        id: '1',
        name: 'John Buyer',
        message: 'Interested in your Angus cattle. Are they available for immediate purchase?',
        time: '2 hours ago',
        avatar: '/api/placeholder/32/32',
        unread: true
      }
    ]
  } catch (err) {
    console.error('Error loading messages:', err)
    messages.value = []
  }
}

const loadAnalyticsData = () => {
  // This would load chart data based on timeRange
}

const loadDashboardData = async () => {
  try {
    loading.value = true
    error.value = null

    // Get current user using auth service
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      error.value = 'Unable to load user data. Please try logging in again.'
      return
    }

    user.value = currentUser

    // Set dashboard type based on user role if not explicitly set
    if (currentUser.role !== 'both') {
      dashboardType.value = currentUser.role
    }

    // Load all dashboard data
    await Promise.all([
      loadStats(),
      loadTableData(),
      loadMessages()
    ])

  } catch (err) {
    console.error('Dashboard loading error:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load dashboard'
  } finally {
    loading.value = false
  }
}

// Watchers
watch(dashboardType, () => {
  if (!loading.value && user.value) {
    loadDashboardData()
  }
})

// Lifecycle
onMounted(() => {
  loadDashboardData()
})

// Auth state change listener
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session)
  if (event === 'SIGNED_OUT' || !session) {
    router.push('/login')
  } else if (event === 'SIGNED_IN') {
    // Reload dashboard when user signs in
    loadDashboardData()
  }
})
</script>