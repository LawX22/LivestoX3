<!-- upgradeRequests.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />
    
    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Upgrade Requests</h1>
        
        <!-- Filters and Search -->
        <div class="mb-6 bg-white p-4 rounded-lg shadow">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search requests by name, email, farm..."
                class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
              <svg
                class="absolute left-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-2">
              <select
                v-model="statusFilter"
                class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Requests Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm Details</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="request in paginatedRequests" :key="request.userId" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img 
                          :src="getUserProfileImage(request.userId)" 
                          class="h-10 w-10 rounded-full object-cover"
                          :alt="getUserFullName(request)"
                          @error="handleImageError"
                        >
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ getUserFullName(request) }}
                        </div>
                        <div class="text-sm text-gray-500">{{ getUserEmail(request.userId) || request.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 font-medium">{{ request.farmDetails?.farmName || 'N/A' }}</div>
                    <div class="text-sm text-gray-500">{{ request.farmAddress?.province }}, {{ request.farmAddress?.city }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="statusBadgeClass(request)">{{ request.status || 'pending' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(request.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="viewRequestDetails(request)"
                      class="text-green-600 hover:text-green-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
                <tr v-if="paginatedRequests.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No upgrade requests found matching your criteria
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredRequests.length) }}</span>
                  of
                  <span class="font-medium">{{ filteredRequests.length }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <template v-for="page in visiblePages" :key="page">
                    <button
                      @click="currentPage = page"
                      :class="[page === currentPage ? 'z-10 bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50', 'relative inline-flex items-center px-4 py-2 border text-sm font-medium']"
                    >
                      {{ page }}
                    </button>
                  </template>
                  <button
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
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

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/adminSideBar.vue'
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
}

export default {
  components: {
    AdminSidebar,
    UpgradeRequestModal
  },
  setup() {
    const upgradeRequests = ref<UpgradeRequest[]>([])
    const selectedRequest = ref<UpgradeRequest | null>(null)
    const showModal = ref(false)
    const searchQuery = ref('')
    const statusFilter = ref('all')
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
            status: req.status || 'pending'
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
      // First try to get from profileImage storage
      const profileImage = localStorage.getItem(`profileImage_${userId}`)
      if (profileImage) {
        return profileImage
      }
      
      // Then try to get from user data
      const user = getUserData(userId)
      if (user?.profilePicture) {
        return user.profilePicture
      }
      
      // Fallback to default avatar
      return defaultAvatar
    }

    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement
      img.src = defaultAvatar
    }

    const getUserFullName = (request: UpgradeRequest): string => {
      // First try to get from user data
      const user = getUserData(request.userId)
      if (user) {
        if (user.fullName) return user.fullName
        if (user.firstName || user.lastName) {
          return `${user.firstName || ''} ${user.lastName || ''}`.trim()
        }
      }
      
      // Fallback to request data
      if (request.fullName) return request.fullName
      return `${request.firstName || ''} ${request.lastName || ''}`.trim() || 'N/A'
    }

    const getUserEmail = (userId: string): string => {
      const user = getUserData(userId)
      return user?.email || ''
    }

    const filteredRequests = computed(() => {
      const query = searchQuery.value.toLowerCase()
      return upgradeRequests.value.filter(request => {
        const matchesSearch =
          !query ||
          request.email.toLowerCase().includes(query) ||
          getUserFullName(request).toLowerCase().includes(query) ||
          (request.farmDetails?.farmName && request.farmDetails.farmName.toLowerCase().includes(query))

        const matchesStatus =
          statusFilter.value === 'all' ||
          request.status === statusFilter.value

        return matchesSearch && matchesStatus
      }).sort((a, b) => {
        // Sort by status (pending first) then by date (newest first)
        if (a.status === 'pending' && b.status !== 'pending') return -1
        if (a.status !== 'pending' && b.status === 'pending') return 1
        return (b.date || '').localeCompare(a.date || '')
      })
    })

    const paginatedRequests = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      return filteredRequests.value.slice(start, start + itemsPerPage.value)
    })

    const totalPages = computed(() =>
      Math.ceil(filteredRequests.value.length / itemsPerPage.value)
    )

    const visiblePages = computed(() => {
      const max = 5
      let start = Math.max(1, currentPage.value - Math.floor(max / 2))
      let end = Math.min(totalPages.value, start + max - 1)
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
          minute: '2-digit'
        })
      } catch (error) {
        return dateStr
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
        req.userId === updatedRequest.userId ? updatedRequest : req
      )
      localStorage.setItem('upgradeRequests', JSON.stringify(updatedRequests))
    }

    onMounted(() => {
      loadRequests()
    })

    return {
      upgradeRequests,
      selectedRequest,
      showModal,
      searchQuery,
      statusFilter,
      currentPage,
      itemsPerPage,
      filteredRequests,
      paginatedRequests,
      totalPages,
      visiblePages,
      getUserProfileImage,
      handleImageError,
      getUserFullName,
      getUserEmail,
      formatDate,
      statusBadgeClass,
      viewRequestDetails,
      closeModal,
      handleApproval,
      handleRejection
    }
  }
}
</script>