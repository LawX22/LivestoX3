<!-- adminSideBar.vue -->
<template>
  <aside 
    :class="[
      'min-h-screen bg-gradient-to-b from-white via-gray-50 to-white border-r border-gray-200 shadow-xl relative transition-all duration-300 ease-in-out flex flex-col',
      isMinimized ? 'w-20' : 'w-80'
    ]"
  >
    <!-- Header Section -->
    <div class="p-6 border-b border-gray-200 flex-shrink-0 bg-white/80 backdrop-blur-sm">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center min-w-0">
          <div 
            :class="[
              'w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/50 transition-all duration-300',
              isMinimized ? 'cursor-pointer hover:scale-110 hover:shadow-emerald-500/70 hover:rotate-6' : 'cursor-default'
            ]"
            @click="isMinimized ? toggleMinimize() : null"
          >
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          
          <div 
            v-if="!isMinimized"
            class="ml-4 min-w-0"
          >
            <h2 class="text-xl font-bold text-gray-900 tracking-tight">Admin Portal</h2>
            <p class="text-sm text-emerald-600 font-medium">Control Center</p>
          </div>
        </div>
        
        <!-- Toggle Button -->
        <button
          v-if="!isMinimized"
          @click="toggleMinimize"
          class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 flex-shrink-0"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation Container -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Scrollable Navigation -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div 
          v-for="item in navItems" 
          :key="item.path"
          class="relative"
        >
          <router-link
            :to="item.path"
            :class="[
              'flex items-center rounded-xl transition-all duration-200 relative group/link',
              isMinimized ? 'p-3 justify-center' : 'px-4 py-3.5',
              $route.path === item.path 
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30' 
                : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200'
            ]"
            @mouseenter="(e) => showTooltip(e, item)"
            @mouseleave="hideTooltip"
          >
            <!-- Icon -->
            <div :class="[
              'flex-shrink-0 transition-all duration-200',
              $route.path === item.path ? '' : 'group-hover/link:scale-110'
            ]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon"></path>
              </svg>
            </div>
            
            <!-- Text -->
            <div v-if="!isMinimized" class="ml-4 flex-1 min-w-0">
              <span class="text-sm font-semibold truncate block">
                {{ item.label }}
              </span>
              <span :class="[
                'text-xs truncate block mt-0.5',
                $route.path === item.path ? 'text-white/90' : 'text-gray-500 group-hover/link:text-emerald-600'
              ]">
                {{ item.description }}
              </span>
            </div>
            
            <!-- Badge for expanded state -->
            <div 
              v-if="!isMinimized && item.badge && item.badge > 0"
              class="ml-auto"
            >
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse">
                {{ item.badge }}
              </span>
            </div>

            <!-- Badge for minimized state -->
            <div 
              v-if="isMinimized && item.badge && item.badge > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg shadow-red-500/50 animate-pulse z-10"
            >
              <span class="text-xs font-bold text-white">{{ item.badge }}</span>
            </div>
            
            <!-- Active indicator for minimized state -->
            <div 
              v-if="isMinimized && $route.path === item.path"
              class="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-emerald-400 to-green-600 rounded-r shadow-lg shadow-emerald-500/50"
            ></div>
          </router-link>
        </div>
      </nav>

      <!-- Fixed Logout Button -->
      <div class="p-4 border-t border-gray-200 flex-shrink-0 mt-auto bg-gray-50/50">
        <button
          @click="showLogoutModal = true"
          :class="[
            'group/logout flex items-center w-full rounded-xl transition-all duration-200 relative overflow-hidden',
            isMinimized ? 'p-3 justify-center' : 'px-4 py-3.5',
            'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 shadow-sm hover:shadow-lg hover:shadow-red-500/30'
          ]"
          @mouseenter="isMinimized ? (tooltipContent = 'Sign Out', tooltipDescription = '', tooltipVisible = true) : null"
          @mouseleave="hideTooltip"
        >
          <div class="flex-shrink-0 transition-transform duration-200 group-hover/logout:scale-110">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          
          <span 
            v-if="!isMinimized"
            class="ml-4 text-sm font-semibold"
          >
            Sign Out
          </span>
        </button>
      </div>
    </div>

    <!-- Expand button when minimized -->
    <button
      v-if="isMinimized"
      @click="toggleMinimize"
      class="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-r-lg shadow-lg shadow-emerald-500/50 transition-all duration-200 flex items-center justify-center z-20"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </aside>

  <!-- Tooltip for minimized state -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 translate-x-2"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-2"
    >
      <div
        v-if="isMinimized && tooltipVisible"
        :style="tooltipStyle"
        class="fixed z-[10000] px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-xl border border-gray-700 pointer-events-none"
      >
        <div class="flex flex-col">
          <span class="font-semibold">{{ tooltipContent }}</span>
          <span v-if="tooltipDescription" class="text-xs text-gray-300 mt-0.5">{{ tooltipDescription }}</span>
        </div>
        <!-- Arrow -->
        <div class="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-l border-b border-gray-700"></div>
      </div>
    </Transition>
  </Teleport>

  <!-- Logout Confirmation Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showLogoutModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showLogoutModal = false"></div>
        
        <!-- Modal -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="showLogoutModal" class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md" @click.stop>
            <div class="p-6">
              <!-- Icon -->
              <div class="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-500/50">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              
              <!-- Text -->
              <h3 class="text-2xl font-bold text-gray-900 text-center mb-2">
                Sign Out
              </h3>
              <p class="text-gray-600 text-center mb-6">
                Are you sure you want to sign out of your account?
              </p>
              
              <!-- Buttons -->
              <div class="flex gap-3">
                <button 
                  @click="showLogoutModal = false"
                  class="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                
                <button 
                  @click="handleLogout"
                  class="flex-1 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { UpgradeRequestService } from '@/services/upgradeRequestService'

const router = useRouter()
const authStore = useAuthStore()

// Persistent minimize state using localStorage
const isMinimized = ref(false)
const showLogoutModal = ref(false)
const pendingUpgradesCount = ref(0)
const isLoadingStats = ref(false)

// Tooltip state
const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipDescription = ref('')
const tooltipStyle = ref({})

// Polling interval
let statsPollingInterval: number | null = null

// Load minimize state from localStorage
const loadMinimizeState = () => {
  const saved = localStorage.getItem('adminSidebarMinimized')
  if (saved !== null) {
    isMinimized.value = saved === 'true'
  }
}

// Save minimize state to localStorage
const saveMinimizeState = () => {
  localStorage.setItem('adminSidebarMinimized', isMinimized.value.toString())
}

// Nav items with new icons
const navItems = computed(() => [
  {
    path: '/adminDashboard',
    label: 'Dashboard',
    description: 'Overview & Stats',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    badge: null
  },
  {
    path: '/userManagement',
    label: 'Users',
    description: 'Manage Accounts',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    badge: null
  },
  {
    path: '/upgradeRequests',
    label: 'Upgrades',
    description: 'Pending Requests',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    badge: pendingUpgradesCount.value
  },
  {
    path: '/AdminLivestockManagement',
    label: 'Livestock',
    description: 'Animals & Auctions',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    badge: null
  },
  {
    path: '/forumManagement',
    label: 'Forums',
    description: 'Discussions',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    badge: null
  }
])

/**
 * Show tooltip on hover (only when minimized)
 */
const showTooltip = (event: MouseEvent, item: any) => {
  if (!isMinimized.value) return
  
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  
  tooltipContent.value = item.label
  tooltipDescription.value = item.description
  
  tooltipStyle.value = {
    top: `${rect.top + rect.height / 2}px`,
    left: `${rect.right + 12}px`,
    transform: 'translateY(-50%)'
  }
  
  tooltipVisible.value = true
}

/**
 * Hide tooltip
 */
const hideTooltip = () => {
  tooltipVisible.value = false
  tooltipContent.value = ''
  tooltipDescription.value = ''
}

/**
 * Fetch pending upgrade requests
 */
const fetchPendingCount = async () => {
  try {
    isLoadingStats.value = true
    const stats = await UpgradeRequestService.getRequestStats()
    pendingUpgradesCount.value = stats.pending
    console.log('✅ Pending upgrades:', stats.pending)
  } catch (error) {
    console.error('❌ Error fetching stats:', error)
  } finally {
    isLoadingStats.value = false
  }
}

/**
 * Start polling
 */
const startStatsPolling = () => {
  fetchPendingCount()
  statsPollingInterval = window.setInterval(() => {
    fetchPendingCount()
  }, 30000)
}

/**
 * Stop polling
 */
const stopStatsPolling = () => {
  if (statsPollingInterval) {
    clearInterval(statsPollingInterval)
    statsPollingInterval = null
  }
}

/**
 * Toggle minimize and save state
 */
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
  saveMinimizeState()
  hideTooltip() // Hide tooltip when toggling
}

/**
 * Handle logout
 */
const handleLogout = async () => {
  try {
    stopStatsPolling()
    await authStore.logout()
    showLogoutModal.value = false
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

/**
 * Handle keyboard events
 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    showLogoutModal.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  loadMinimizeState() // Load saved state
  startStatsPolling()
  console.log('📊 Admin sidebar mounted')
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  stopStatsPolling()
  console.log('📊 Admin sidebar unmounted')
})
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}
</style>