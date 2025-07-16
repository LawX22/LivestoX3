<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />
    
    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">User Management</h1>
        
        <!-- Filters and Search -->
        <div class="mb-6 bg-white p-4 rounded-lg shadow">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users by name, email..."
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
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
                <option value="pending">Pending Requests</option>
                <option value="rejected">Rejected</option>
                <option value="banned">Banned</option>
              </select>
              
              <select
                v-model="roleFilter"
                class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Farmer">Farmer</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Users Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in paginatedUsers" :key="user.userId" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img 
                          :src="getProfileImage(user)" 
                          class="h-10 w-10 rounded-full object-cover"
                          :alt="`${user.firstName} ${user.lastName}`"
                          onerror="this.src='/default-avatar.png'"
                        >
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.firstName }} {{ user.lastName }}
                        </div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="roleBadgeClass(user.role)">{{ user.role || 'User' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="statusBadgeClass(user)">{{ getStatusLabel(user) }}</span>
                    <div v-if="user.bannedUntil" class="text-xs text-red-500 mt-1">
                      Until: {{ formatDate(user.bannedUntil) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="viewUserDetails(user)"
                      class="text-green-600 hover:text-green-900 mr-3"
                    >
                      View
                    </button>
                    <button
                      v-if="user.isBanned"
                      @click="unbanUser(user)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Unban
                    </button>
                    <button
                      v-else
                      @click="banUser(user)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Ban
                    </button>
                  </td>
                </tr>
                <tr v-if="paginatedUsers.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No users found matching your criteria
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
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}</span>
                  of
                  <span class="font-medium">{{ filteredUsers.length }}</span>
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
    
    <!-- User Details Modal -->
    <UserDetailsModal
      v-if="selectedUser"
      :visible="showModal"
      :user="selectedUser"
      :is-admin="true"
      @close="closeModal"
      @approve="handleVerificationApproval"
      @reject="handleVerificationRejection"
      @update-user="handleUserUpdate"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/adminSideBar.vue'
import UserDetailsModal from '../../components/Admin/UserDetailsModal.vue'

export default {
  components: {
    AdminSidebar,
    UserDetailsModal
  },
  setup() {
    const registeredUsers = ref([])
    const selectedUser = ref(null)
    const showModal = ref(false)
    const searchQuery = ref('')
    const statusFilter = ref('all')
    const roleFilter = ref('all')
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    const defaultAvatar = '/default-avatar.png'

    const getProfileImage = (user) => {
      // First check if profile image is stored in localStorage
      const storedProfileImage = localStorage.getItem(`profileImage_${user.userId}`)
      if (storedProfileImage) {
        return storedProfileImage
      }
      
      // Then check if user has a profile picture in their data
      if (user.profilePicture) {
        // If it's a full URL, use it directly
        if (user.profilePicture.startsWith('http')) {
          return user.profilePicture
        }
        // If it's a path, prepend your API base URL
        return `/api/uploads/${user.profilePicture}`
      }
      
      // Fallback to default avatar
      return defaultAvatar
    }

    const loadUsers = () => {
      try {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('user_'))
        registeredUsers.value = keys.map(k => {
          const raw = localStorage.getItem(k)
          if (!raw) return null
          
          try {
            const u = JSON.parse(raw)

            // Determine verification status
            let status = 'unverified'
            if (u.verification?.status === 'approved') {
              status = 'approved'
            } else if (u.verification?.status === 'rejected') {
              status = 'rejected'
            } else if (u.verification?.status === 'pending' || u.submittedId) {
              status = 'pending'
            }

            // Determine isVerified
            const isVerified = status === 'approved' || u.isVerified === true

            return {
              ...u,
              userId: k.replace('user_', ''),
              isVerified,
              isBanned: u.isBanned ?? false,
              verificationStatus: status,
              submittedId: !!u.verification || u.submittedId,
              // Ensure profilePicture is properly set
              profilePicture: u.profilePicture || null
            }
          } catch (error) {
            console.error('Error parsing user data:', error)
            return null
          }
        }).filter(Boolean)
      } catch (error) {
        console.error('Error loading users:', error)
        registeredUsers.value = []
      }
    }

    const filteredUsers = computed(() => {
      const query = searchQuery.value.toLowerCase()
      return registeredUsers.value.filter(u => {
        const matchesSearch =
          !query ||
          u.email.toLowerCase().includes(query) ||
          (u.username && u.username.toLowerCase().includes(query)) ||
          `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase().includes(query)

        const matchesStatus =
          statusFilter.value === 'all' ||
          (statusFilter.value === 'verified' && u.isVerified && !u.isBanned) ||
          (statusFilter.value === 'unverified' && u.verificationStatus === 'unverified') ||
          (statusFilter.value === 'banned' && u.isBanned) ||
          (statusFilter.value === 'pending' && u.verificationStatus === 'pending') ||
          (statusFilter.value === 'rejected' && u.verificationStatus === 'rejected')

        const matchesRole =
          roleFilter.value === 'all' || u.role === roleFilter.value

        return matchesSearch && matchesStatus && matchesRole
      })
    })

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      return filteredUsers.value.slice(start, start + itemsPerPage.value)
    })

    const totalPages = computed(() =>
      Math.ceil(filteredUsers.value.length / itemsPerPage.value)
    )

    const visiblePages = computed(() => {
      const max = 5
      let start = Math.max(1, currentPage.value - Math.floor(max / 2))
      let end = Math.min(totalPages.value, start + max - 1)
      if (end - start + 1 < max) start = Math.max(1, end - max + 1)
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    })

    const formatDate = (d) => {
      if (!d) return ''
      try {
        return new Date(d).toLocaleDateString()
      } catch (error) {
        return ''
      }
    }

    const roleBadgeClass = (r) => {
      const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
      switch (r) {
        case 'Admin':
          return `${base} bg-purple-100 text-purple-800`
        case 'Farmer':
          return `${base} bg-green-100 text-green-800`
        case 'Buyer':
          return `${base} bg-blue-100 text-blue-800`
        default:
          return `${base} bg-gray-100 text-gray-800`
      }
    }

    const statusBadgeClass = (u) => {
      const base = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
      if (u.isBanned) {
        return `${base} bg-red-100 text-red-800`
      } else if (u.verificationStatus === 'pending') {
        return `${base} bg-yellow-100 text-yellow-800`
      } else if (u.verificationStatus === 'rejected') {
        return `${base} bg-red-100 text-red-800`
      } else if (u.isVerified) {
        return `${base} bg-green-100 text-green-800`
      } else {
        return `${base} bg-gray-100 text-gray-800`
      }
    }

    const getStatusLabel = (u) => {
      if (u.isBanned) return 'Banned'
      if (u.verificationStatus === 'pending') return 'Pending'
      if (u.verificationStatus === 'rejected') return 'Rejected'
      if (u.isVerified) return 'Verified'
      return 'Unverified'
    }

    const viewUserDetails = (u) => {
      selectedUser.value = u
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      selectedUser.value = null
    }

    const banUser = (u) => {
      const days = prompt('Enter number of days to ban:', '7')
      if (!days) return
      const d = parseInt(days)
      if (isNaN(d) || d <= 0) {
        alert('Invalid number of days')
        return
      }
      
      const bannedUntil = new Date(Date.now() + d * 86400000).toISOString()
      updateUser({
        ...u,
        isBanned: true,
        bannedUntil
      })
    }

    const unbanUser = (u) => {
      if (confirm('Are you sure you want to unban this user?')) {
        updateUser({ 
          ...u, 
          isBanned: false, 
          bannedUntil: undefined 
        })
      }
    }

    const handleVerificationApproval = (userId) => {
      const user = registeredUsers.value.find(u => u.userId === userId)
      if (user) {
        updateUser({
          ...user,
          isVerified: true,
          verificationStatus: 'approved',
          verification: {
            ...user.verification,
            status: 'approved',
            approvedAt: new Date().toISOString()
          }
        })
      }
    }

    const handleVerificationRejection = ({ userId, reason }) => {
      const user = registeredUsers.value.find(u => u.userId === userId)
      if (user) {
        updateUser({
          ...user,
          isVerified: false,
          verificationStatus: 'rejected',
          verification: {
            ...user.verification,
            status: 'rejected',
            rejectedAt: new Date().toISOString(),
            reason
          }
        })
      }
    }

    const handleUserUpdate = (updatedUser) => {
      updateUser(updatedUser)
    }

    const updateUser = (u) => {
      try {
        // Get existing user data
        const existingData = localStorage.getItem(`user_${u.userId}`)
        let existingUser = existingData ? JSON.parse(existingData) : {}
        
        // Merge updates while preserving critical fields
        const updatedUser = {
          ...existingUser,
          ...u,
          // Explicitly maintain verification-related fields
          isVerified: u.isVerified !== undefined ? u.isVerified : existingUser.isVerified,
          verificationStatus: u.verificationStatus || existingUser.verificationStatus || 'unverified',
          verification: u.verification || existingUser.verification,
          submittedId: u.submittedId !== undefined ? u.submittedId : existingUser.submittedId,
          // Maintain ban status if not being explicitly changed
          isBanned: u.isBanned !== undefined ? u.isBanned : existingUser.isBanned,
          bannedUntil: u.bannedUntil !== undefined ? u.bannedUntil : existingUser.bannedUntil,
          // Maintain profile picture
          profilePicture: u.profilePicture !== undefined ? u.profilePicture : existingUser.profilePicture
        }

        localStorage.setItem(`user_${u.userId}`, JSON.stringify(updatedUser))
        
        // Update the user in the reactive array
        const index = registeredUsers.value.findIndex(user => user.userId === u.userId)
        if (index !== -1) {
          registeredUsers.value[index] = updatedUser
        }
        
        // If this is the selected user, update it too
        if (selectedUser.value?.userId === u.userId) {
          selectedUser.value = updatedUser
        }
      } catch (error) {
        console.error('Error updating user:', error)
        alert('Error updating user. Please try again.')
      }
    }

    onMounted(() => {
      loadUsers()
    })

    return {
      registeredUsers,
      selectedUser,
      showModal,
      searchQuery,
      statusFilter,
      roleFilter,
      currentPage,
      itemsPerPage,
      filteredUsers,
      paginatedUsers,
      totalPages,
      visiblePages,
      getProfileImage,
      formatDate,
      roleBadgeClass,
      statusBadgeClass,
      getStatusLabel,
      viewUserDetails,
      closeModal,
      banUser,
      unbanUser,
      handleVerificationApproval,
      handleVerificationRejection,
      handleUserUpdate
    }
  }
}
</script>