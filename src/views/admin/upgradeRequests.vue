<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <div class="p-6 max-w-7xl mx-auto">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Upgrade Requests</h1>
            <p class="text-gray-500 mt-1">Review and manage farmer upgrade applications</p>
          </div>
          <div class="mt-4 md:mt-0">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">Total: {{ filteredRequests.length }}</span>
              <div class="h-4 w-px bg-gray-300"></div>
              <span class="text-sm text-gray-500">Pending: {{ pendingCount }}</span>
            </div>
          </div>
        </div>

        <!-- Filters Card -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Search -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search requests..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <!-- Status Filter -->
            <div>
              <select
                v-model="statusFilter"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <!-- Sort Options -->
            <div>
              <select
                v-model="sortBy"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Total Requests</p>
                <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ filteredRequests.length }}</h3>
              </div>
              <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Pending Review</p>
                <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ pendingCount }}</h3>
              </div>
              <div class="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Approved Today</p>
                <h3 class="text-2xl font-bold mt-1 text-gray-800">{{ approvedTodayCount }}</h3>
              </div>
              <div class="p-2 bg-green-100 rounded-lg text-green-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Requests Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Farm Details
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Requested
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="request in paginatedRequests"
                  :key="request.userId"
                  class="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 relative">
                        <img
                          :src="getUserProfileImage(request.userId)"
                          class="h-10 w-10 rounded-full object-cover"
                          :alt="getUserFullName(request)"
                          @error="handleImageError"
                        />
                        <span
                          v-if="isNewRequest(request)"
                          class="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"
                        ></span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 flex items-center">
                          {{ getUserFullName(request) }}
                          <span v-if="isVerifiedUser(request.userId)" class="ml-1.5">
                            <svg
                              class="w-4 h-4 text-emerald-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ getUserEmail(request.userId) || request.email }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ request.farmDetails?.farmName || 'N/A' }}
                    </div>
                    <div class="text-sm text-gray-500 flex items-center mt-1">
                      <svg
                        class="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {{ request.farmAddress?.province }}, {{ request.farmAddress?.city }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span :class="statusBadgeClass(request)">{{
                        request.status || 'pending'
                      }}</span>
                      <span v-if="request.status === 'pending'" class="ml-2 text-xs text-gray-500">
                        {{ formatRelativeTime(request.date) }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(request.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <button
                        @click="viewRequestDetails(request)"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="paginatedRequests.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    <div class="flex flex-col items-center justify-center py-8">
                      <svg
                        class="w-16 h-16 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 class="mt-2 text-sm font-medium text-gray-700">
                        No upgrade requests found
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50',
                ]"
              >
                Previous
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                :class="[
                  'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50',
                ]"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to
                  <span class="font-medium">{{
                    Math.min(currentPage * itemsPerPage, filteredRequests.length)
                  }}</span>
                  of <span class="font-medium">{{ filteredRequests.length }}</span> requests
                </p>
              </div>
              <div>
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                      currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50',
                    ]"
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <template v-for="page in visiblePages" :key="page">
                    <button
                      @click="currentPage = page"
                      :class="[
                        page === currentPage
                          ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      ]"
                    >
                      {{ page }}
                    </button>
                  </template>
                  <button
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                      currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50',
                    ]"
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Request Details Modal -->
    <UpgradeRequestModal
      v-if="selectedRequest"
      :visible="showModal"
      :request="selectedRequest"
      @close="closeModal"
      @approved="handleApproval"
      @rejected="handleRejection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSideBar.vue'
import UpgradeRequestModal from '../../components/Admin/UpgradeRequestModal.vue'

interface FarmDetails {
  farmName?: string
  farmSize?: string
  livestockTypes?: string[]
  description?: string
}

interface FarmAddress {
  region?: string
  province?: string
  city?: string
  barangay?: string
  street?: string
}

interface Documents {
  businessPermit?: string
  farmPhotos?: string[]
}

interface UpgradeRequest {
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  farmDetails?: FarmDetails
  farmAddress?: FarmAddress
  documents?: Documents
  date?: string
  status?: 'pending' | 'approved' | 'rejected'
}

interface UserData {
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  profilePicture?: string
  role?: string
  isVerified?: boolean
}
const upgradeRequests = ref<UpgradeRequest[]>([])
const selectedRequest = ref<UpgradeRequest | null>(null)
const showModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const defaultAvatar = '/default-avatar.png'

const loadRequests = () => {
  try {
    const requests = localStorage.getItem('upgradeRequests')
    if (requests) {
      upgradeRequests.value = JSON.parse(requests).map((req: any) => ({
        ...req,
        userId: req.userId || getUserIdFromEmail(req.email),
        status: req.status || 'pending',
      }))
    } else {
      upgradeRequests.value = []
    }
  } catch (error) {
    console.error('Error loading upgrade requests:', error)
    upgradeRequests.value = []
  }
}

const getUserIdFromEmail = (email: string): string => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('user_')) {
      const userData = localStorage.getItem(key)
      if (userData) {
        try {
          const user = JSON.parse(userData)
          if (user.email === email) {
            return key.replace('user_', '')
          }
        } catch (e) {
          console.error(`Error parsing user data for key ${key}:`, e)
        }
      }
    }
  }
  return 'unknown'
}

const getUserData = (userId: string): UserData | null => {
  const userKey = `user_${userId}`
  const userData = localStorage.getItem(userKey)
  if (userData) {
    try {
      return JSON.parse(userData)
    } catch (e) {
      console.error('Error parsing user data:', e)
    }
  }
  return null
}

const getUserProfileImage = (userId: string): string => {
  const profileImage = localStorage.getItem(`profileImage_${userId}`)
  if (profileImage) return profileImage

  const user = getUserData(userId)
  if (user?.profilePicture) return user.profilePicture

  return defaultAvatar
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = defaultAvatar
}

const getUserFullName = (request: UpgradeRequest): string => {
  const user = getUserData(request.userId)
  if (user) {
    if (user.fullName) return user.fullName
    if (user.firstName || user.lastName)
      return `${user.firstName || ''} ${user.lastName || ''}`.trim()
  }

  if (request.fullName) return request.fullName
  return `${request.firstName || ''} ${request.lastName || ''}`.trim() || 'N/A'
}

const getUserEmail = (userId: string): string => {
  const user = getUserData(userId)
  return user?.email || ''
}

const isVerifiedUser = (userId: string): boolean => {
  const user = getUserData(userId)
  return user?.isVerified || false
}

const isNewRequest = (request: UpgradeRequest): boolean => {
  if (!request.date) return false
  const requestDate = new Date(request.date)
  const now = new Date()
  const diffInHours = (now.getTime() - requestDate.getTime()) / (1000 * 60 * 60)
  return diffInHours < 24 && request.status === 'pending'
}

const filteredRequests = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return upgradeRequests.value
    .filter((request) => {
      const matchesSearch =
        !query ||
        request.email.toLowerCase().includes(query) ||
        getUserFullName(request).toLowerCase().includes(query) ||
        (request.farmDetails?.farmName &&
          request.farmDetails.farmName.toLowerCase().includes(query))

      const matchesStatus =
        statusFilter.value === 'all' || request.status === statusFilter.value

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Sort based on selected option
      switch (sortBy.value) {
        case 'oldest':
          return (a.date || '').localeCompare(b.date || '')
        case 'name':
          return getUserFullName(a).localeCompare(getUserFullName(b))
        default: // newest first
          return (b.date || '').localeCompare(a.date || '')
      }
    })
})

const pendingCount = computed(
  () => filteredRequests.value.filter((r) => r.status === 'pending').length,
)

const approvedTodayCount = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return filteredRequests.value.filter(
    (r) => r.status === 'approved' && r.date && r.date.startsWith(today),
  ).length
})

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredRequests.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredRequests.value.length / itemsPerPage.value))

const visiblePages = computed(() => {
  const max = 5
  let start = Math.max(1, currentPage.value - Math.floor(max / 2))
  const end = Math.min(totalPages.value, start + max - 1)
  if (end - start + 1 < max) start = Math.max(1, end - max + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateStr
  }
}

const formatRelativeTime = (dateString?: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}

const statusBadgeClass = (request: UpgradeRequest): string => {
  const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
  switch (request.status) {
    case 'approved':
      return `${base} bg-green-100 text-green-800`
    case 'rejected':
      return `${base} bg-red-100 text-red-800`
    case 'pending':
      return `${base} bg-yellow-100 text-yellow-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

const viewRequestDetails = (request: UpgradeRequest) => {
  selectedRequest.value = request
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedRequest.value = null
}

const handleApproval = (approvedRequest: UpgradeRequest) => {
  try {
    // Update user role in localStorage
    const userKey = `user_${approvedRequest.userId}`
    const userData = localStorage.getItem(userKey)
    if (userData) {
      const user = JSON.parse(userData)
      user.role = 'Farmer'
      localStorage.setItem(userKey, JSON.stringify(user))
    }

    // Update request status
    approvedRequest.status = 'approved'
    updateRequestInStorage(approvedRequest)

    // Reload requests
    loadRequests()
    closeModal()
  } catch (e) {
    console.error('Error approving request:', e)
  }
}

const handleRejection = (rejectedRequest: UpgradeRequest) => {
  try {
    // Update request status
    rejectedRequest.status = 'rejected'
    updateRequestInStorage(rejectedRequest)

    // Reload requests
    loadRequests()
    closeModal()
  } catch (e) {
    console.error('Error rejecting request:', e)
  }
}

const updateRequestInStorage = (updatedRequest: UpgradeRequest) => {
  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
  const updatedRequests = requests.map((req: UpgradeRequest) =>
    req.userId === updatedRequest.userId ? updatedRequest : req,
  )
  localStorage.setItem('upgradeRequests', JSON.stringify(updatedRequests))
}

onMounted(() => {
  loadRequests()
})
</script>