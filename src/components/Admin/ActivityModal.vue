<!-- ActivityModal.vue - REDESIGNED WITH BLUR BACKGROUND -->
<template>
  <div v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20"
    @click.self="closeModal">
    <div class="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-6xl max-h-[95vh] relative flex flex-col overflow-hidden border border-gray-100">
      <!-- Close Button -->
      <button @click="closeModal"
        class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 z-50 group">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Loading State with Skeleton -->
      <div v-if="isLoading" class="flex flex-col h-full p-8">
        <!-- Header Skeleton -->
        <div class="mb-6 animate-pulse">
          <div class="h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-56"></div>
        </div>

        <!-- Filters Skeleton -->
        <div class="mb-6 animate-pulse">
          <div class="flex gap-4">
            <div class="h-20 bg-gray-200 rounded-xl flex-1"></div>
            <div class="h-20 bg-gray-200 rounded-xl flex-1"></div>
            <div class="h-20 bg-gray-200 rounded-xl flex-1"></div>
          </div>
        </div>

        <!-- Activities Skeleton -->
        <div class="flex-1 space-y-3">
          <div v-for="n in 5" :key="n" class="animate-pulse flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="flex flex-col gap-6 h-full min-h-0 p-8">
        <!-- Header -->
        <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          System Activity Log
        </h2>

        <!-- Filters -->
        <div class="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl border border-green-100 shadow-sm p-5">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <!-- Filter by Action Type -->
            <div class="flex-1 min-w-[200px]">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Filter by Action</label>
              <select
                v-model="filterAction"
                @change="filterActivities"
                class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm cursor-pointer"
              >
                <option value="all">All Activities</option>
                <option value="New Registration">New Registrations</option>
                <option value="Account Upgrade">Account Upgrades</option>
                <option value="Account Verified">Account Verifications</option>
                <option value="Listing Created">Livestock Listings</option>
                <option value="Forum Question">Forum Questions</option>
                <option value="Forum Answer">Forum Answers</option>
                <option value="Login">User Logins</option>
                <option value="Profile Update">Profile Updates</option>
              </select>
            </div>

            <!-- Filter by Status -->
            <div class="flex-1 min-w-[200px]">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Filter by Status</label>
              <select
                v-model="filterStatus"
                @change="filterActivities"
                class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <!-- Time Range Filter -->
            <div class="flex-1 min-w-[200px]">
              <label class="block text-xs font-semibold text-gray-700 mb-2">Time Range</label>
              <select
                v-model="timeRange"
                @change="loadActivities"
                class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm cursor-pointer"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>

            <!-- Refresh Button -->
            <div class="flex items-end">
              <button
                @click="loadActivities"
                :disabled="isLoading"
                class="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                <svg v-if="!isLoading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Refresh
              </button>
            </div>
          </div>

          <!-- Stats Summary -->
          <div class="grid grid-cols-4 gap-3">
            <div class="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
              <div class="text-xs text-gray-500 font-medium">Total Activities</div>
              <div class="text-xl font-bold text-gray-900">{{ filteredActivities.length }}</div>
            </div>
            <div class="bg-white rounded-xl p-3 border border-green-200 shadow-sm">
              <div class="text-xs text-green-600 font-medium">Completed</div>
              <div class="text-xl font-bold text-green-700">{{ completedCount }}</div>
            </div>
            <div class="bg-white rounded-xl p-3 border border-yellow-200 shadow-sm">
              <div class="text-xs text-yellow-600 font-medium">Pending</div>
              <div class="text-xl font-bold text-yellow-700">{{ pendingCount }}</div>
            </div>
            <div class="bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
              <div class="text-xs text-blue-600 font-medium">Recent (24h)</div>
              <div class="text-xl font-bold text-blue-700">{{ recentCount }}</div>
            </div>
          </div>
        </div>

        <!-- Activities List - Scrollable -->
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <!-- Activities List -->
          <div v-if="filteredActivities.length > 0" class="space-y-2">
            <div
              v-for="(activity, index) in paginatedActivities"
              :key="index"
              class="flex items-start space-x-3 p-3 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <!-- Icon -->
              <div :class="[
                'flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center shadow-sm',
                getActivityColor(activity.action)
              ]">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityIcon(activity.action)" />
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-1">
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ activity.user }}</p>
                    <p class="text-xs text-gray-500">{{ activity.userEmail }}</p>
                  </div>
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2',
                    activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]">
                    {{ activity.status }}
                  </span>
                </div>
                <p class="text-xs font-medium text-gray-700 mb-1">{{ activity.action }}</p>
                <p class="text-xs text-gray-600 mb-2">{{ activity.details }}</p>
                <div class="flex items-center space-x-3 text-xs text-gray-500">
                  <span class="flex items-center">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatTime(activity.time) }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(activity.time) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 py-12">
            <svg class="mx-auto h-16 w-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 class="text-sm font-semibold text-gray-900 mb-1">No activities found</h3>
            <p class="text-sm text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        </div>
      </div>

      <!-- Footer Actions with Pagination -->
      <div class="px-8 pb-8 pt-6 border-t border-gray-200 flex justify-between items-center">
        <!-- Export Button -->
        <button
          @click="exportActivities"
          class="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to CSV
        </button>

        <!-- Pagination -->
        <div v-if="filteredActivities.length > itemsPerPage" class="flex items-center gap-4">
          <div class="text-sm text-gray-700 font-medium">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredActivities.length) }} of {{ filteredActivities.length }}
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <div class="flex items-center space-x-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer',
                  page === currentPage
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
            >
              Next
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ActivityService } from '../../services/activityService'
import type { Activity } from '../../services/activityService'

// Props
const props = defineProps<{
  isOpen: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'close'): void
}>()

// State
const isLoading = ref(false)
const activities = ref<Activity[]>([])
const filteredActivities = ref<Activity[]>([])
const filterAction = ref('all')
const filterStatus = ref('all')
const timeRange = ref('7d')
const currentPage = ref(1)
const itemsPerPage = ref(15)

// Computed
const completedCount = computed(() => 
  filteredActivities.value.filter(a => a.status === 'Completed').length
)

const pendingCount = computed(() => 
  filteredActivities.value.filter(a => a.status === 'Pending').length
)

const recentCount = computed(() => {
  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)
  return filteredActivities.value.filter(a => new Date(a.time) >= oneDayAgo).length
})

const totalPages = computed(() => 
  Math.ceil(filteredActivities.value.length / itemsPerPage.value)
)

const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredActivities.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push()
  }
  
  return pages
})

// Methods
const loadActivities = async () => {
  try {
    isLoading.value = true
    activities.value = await ActivityService.getAllActivities(timeRange.value)
    filterActivities()
  } catch (error) {
    console.error('Error loading activities:', error)
  } finally {
    isLoading.value = false
  }
}

const filterActivities = () => {
  let filtered = [...activities.value]
  
  if (filterAction.value !== 'all') {
    filtered = filtered.filter(a => a.action === filterAction.value)
  }
  
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(a => a.status === filterStatus.value)
  }
  
  filteredActivities.value = filtered
  currentPage.value = 1
}

const closeModal = () => {
  emit('close')
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date(date))
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}

const getActivityColor = (action: string) => {
  const colors: { [key: string]: string } = {
    'New Registration': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'Account Upgrade': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'Account Verified': 'bg-gradient-to-br from-green-500 to-green-600',
    'Listing Created': 'bg-gradient-to-br from-amber-500 to-amber-600',
    'Forum Question': 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    'Forum Answer': 'bg-gradient-to-br from-teal-500 to-teal-600',
    'Login': 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    'Profile Update': 'bg-gradient-to-br from-pink-500 to-pink-600',
  }
  return colors[action] || 'bg-gradient-to-br from-gray-500 to-gray-600'
}

const getActivityIcon = (action: string) => {
  const icons: { [key: string]: string } = {
    'New Registration': 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    'Account Upgrade': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    'Account Verified': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'Listing Created': 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    'Forum Question': 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    'Forum Answer': 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
    'Login': 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
    'Profile Update': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  }
  return icons[action] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const exportActivities = () => {
  const csv = ActivityService.exportToCSV(filteredActivities.value)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `activities_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

// Watch for modal open
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    loadActivities()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Load on mount
onMounted(() => {
  if (props.isOpen) {
    loadActivities()
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>