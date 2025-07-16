<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />

    <main class="flex-1 p-8 max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Upgrade Requests</h1>
        <div class="relative w-64">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search requests..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="request in paginatedRequests" :key="request.userId" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{{ request.userId }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ request.fullName || `${request.firstName || ''} ${request.lastName || ''}`.trim() || 'N/A' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ request.farmName || 'N/A' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ request.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(request.date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="viewDetails(request)"
                    class="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredRequests.length === 0" class="p-8 text-center text-gray-500">
          No upgrade requests found
        </div>

        <!-- Pagination -->
        <div v-if="filteredRequests.length > 0" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to 
            <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredRequests.length) }}</span> of 
            <span class="font-medium">{{ filteredRequests.length }}</span> requests
          </div>
          <div class="flex space-x-2">
            <button 
              @click="currentPage = 1" 
              :disabled="currentPage === 1"
              class="px-3 py-1 border rounded-md text-sm font-medium"
              :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'"
            >
              First
            </button>
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-1 border rounded-md text-sm font-medium"
              :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'"
            >
              Previous
            </button>
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              class="px-3 py-1 border rounded-md text-sm font-medium"
              :class="currentPage === page ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50'"
            >
              {{ page }}
            </button>
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="px-3 py-1 border rounded-md text-sm font-medium"
              :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'"
            >
              Next
            </button>
            <button 
              @click="currentPage = totalPages" 
              :disabled="currentPage === totalPages"
              class="px-3 py-1 border rounded-md text-sm font-medium"
              :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'"
            >
              Last
            </button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <UpgradeRequestModal
        v-if="selectedRequest"
        :visible="showModal"
        :request="selectedRequest"
        @close="showModal = false"
        @approved="handleApproval"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/adminSideBar.vue'
import UpgradeRequestModal from '../../components/Admin/UpgradeRequestModal.vue'

interface UpgradeRequest {
  userId: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  farmName?: string
  date?: string
  status?: string
}

const upgradeRequests = ref<UpgradeRequest[]>([])
const selectedRequest = ref<UpgradeRequest | null>(null)
const showModal = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Load upgrade requests from localStorage
onMounted(() => {
  loadRequests()
})

const loadRequests = () => {
  const requests = localStorage.getItem('upgradeRequests')
  if (requests) {
    try {
      // Parse requests and ensure they have userId
      upgradeRequests.value = JSON.parse(requests).map((req: any) => ({
        ...req,
        userId: req.userId || getUserIdFromEmail(req.email)
      }))
    } catch (e) {
      console.error('Error parsing upgrade requests:', e)
    }
  }
}

// Helper function to get userId from email by checking user_ keys in localStorage
const getUserIdFromEmail = (email: string): string => {
  const userKeys = Object.keys(localStorage).filter(key => key.startsWith('user_'))
  for (const key of userKeys) {
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
  return 'N/A'
}

// Filter requests based on search query
const filteredRequests = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return upgradeRequests.value

  return upgradeRequests.value.filter(request => {
    const name = `${request.firstName || ''} ${request.lastName || ''}`.toLowerCase()
    return (
      request.email.toLowerCase().includes(query) ||
      name.includes(query) ||
      (request.farmName && request.farmName.toLowerCase().includes(query)) ||
      request.userId.toLowerCase().includes(query)
    )
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredRequests.value.length / itemsPerPage.value))
const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredRequests.value.slice(start, end)
})
const visiblePages = computed(() => {
  const maxVisible = 5
  const pages = []
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '-'
  try {
    return new Date(dateStr).toLocaleDateString()
  } catch {
    return dateStr
  }
}

const viewDetails = (request: UpgradeRequest) => {
  selectedRequest.value = request
  showModal.value = true
}

const handleApproval = (approvedRequest: UpgradeRequest) => {
  // Update user role in localStorage
  const userKey = `user_${approvedRequest.userId}`
  const userData = localStorage.getItem(userKey)
  if (userData) {
    try {
      const user = JSON.parse(userData)
      user.role = 'Farmer'
      localStorage.setItem(userKey, JSON.stringify(user))
    } catch (e) {
      console.error(`Error updating user role for ${userKey}:`, e)
    }
  }

  // Remove from upgradeRequests
  upgradeRequests.value = upgradeRequests.value.filter(req => req.userId !== approvedRequest.userId)
  localStorage.setItem('upgradeRequests', JSON.stringify(upgradeRequests.value))

  // Close modal
  showModal.value = false
}
</script>
