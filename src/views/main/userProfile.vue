<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <!-- Banner Section -->
    <div class="relative h-60 bg-gradient-to-r from-gray-300 to-gray-400 bg-center bg-cover" :style="bannerStyle">
      <div class="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2">
        <div class="relative w-32 h-32">
          <div
            class="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold object-cover">
            <img v-if="editing ? tempProfileImage || profileImage : profileImage"
              :src="editing ? (tempProfileImage || profileImage) : (profileImage || undefined)"
              class="w-full h-full object-cover" alt="Profile" />
            <span v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A11.963 11.963 0 0112 15c2.25 0 4.355.663 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </div>
          <input type="file" accept="image/*" ref="profileInputRef" class="hidden" @change="onProfileChange" />
          <button v-if="editing" @click="$refs.profileInputRef.click()"
            class="absolute bottom-0 right-0 bg-white text-xs px-2 py-0.5 rounded shadow">Change</button>
        </div>
      </div>

      <div v-if="editing" class="absolute top-4 right-4">
        <input type="file" accept="image/*" ref="bannerInputRef" class="hidden" @change="onBannerChange" />
        <button @click="$refs.bannerInputRef.click()"
          class="bg-white text-sm px-3 py-1 rounded shadow hover:bg-gray-100">
          Change Banner
        </button>
      </div>
    </div>

    <div class="max-w-5xl mx-auto p-6 pt-24">
      <div v-if="user" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content Card -->
        <div class="lg:col-span-2 bg-white shadow-lg rounded-xl border border-gray-200">
          <!-- Tabs inside the card -->
          <div class="flex gap-4 mb-6 border-b px-8 pt-6">
            <button
              :class="['px-4 py-2 text-sm font-semibold rounded-t', activeTab === 'profile' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600']"
              @click="activeTab = 'profile'">Profile Information</button>
            <button
              :class="['px-4 py-2 text-sm font-semibold rounded-t', activeTab === 'farmer' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600']"
              @click="activeTab = 'farmer'">Farm Information</button>
          </div>

          <!-- Profile Info -->
          <div v-if="activeTab === 'profile'">
            <ProfileInfo :user="user" :verification-status="verificationStatus" :upgrade-pending="upgradePending"
              @save-profile="handleProfileSave" />
          </div>

          <!-- Farm Info -->
          <div v-if="activeTab === 'farmer'">
            <FarmInfo 
              :user="user" 
              :editable-user="editableUser" 
              :editing="editing"
              :verification-status="verificationStatus"
              :upgrade-pending="upgradePending"
            />
          </div>
        </div>

        <!-- Sidebar with separate sections -->
        <div class="space-y-6">
          <!-- Account Verification Section -->
          <div class="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <h3 class="text-lg font-semibold text-green-700 mb-4">Account Verification</h3>

            <!-- Verified Status -->
            <div v-if="verificationStatus === 'verified'" class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-green-800">Account Verified</p>
                  <p class="text-xs text-green-700">Your account has been successfully verified by admin</p>
                </div>
              </div>
            </div>

            <!-- Pending Approval Status -->
            <div v-else-if="verificationStatus === 'pending'" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-blue-800">Verification Pending</p>
                  <p class="text-xs text-blue-700">Your verification request is being reviewed by admin</p>
                </div>
              </div>
              <div class="mt-3 text-xs text-blue-600">
                <p>Submitted: {{ formatDate(verificationSubmittedAt) }}</p>
                <p>Status: Awaiting admin approval</p>
              </div>
            </div>

            <!-- Rejected Status -->
            <div v-else-if="verificationStatus === 'rejected'" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-red-800">Verification Rejected</p>
                  <p class="text-xs text-red-700">Your verification request was rejected by admin</p>
                </div>
              </div>
              <div class="mt-3 text-xs text-red-600">
                <p v-if="verificationRejectionReason">Reason: {{ verificationRejectionReason }}</p>
                <p>You can submit a new verification request</p>
              </div>
              <button @click="openVerificationModal"
                class="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded shadow transition">
                Resubmit Verification
              </button>
            </div>

            <!-- Unverified Status -->
            <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-yellow-800">Account Not Verified</p>
                    <p class="text-xs text-yellow-700">Please verify your account to access all features</p>
                  </div>
                </div>
              </div>
              <button @click="openVerificationModal"
                class="mt-3 w-full bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium px-4 py-2 rounded shadow transition">
                Verify Account
              </button>
            </div>
          </div>

          <!-- Address Panel -->
          <div class="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <h3 class="text-lg font-semibold text-green-700 mb-4">My Addresses</h3>
            <div v-if="addresses.length > 0">
              <ul class="space-y-3">
                <li v-for="(addr, index) in addresses" :key="index" @click="openAddressModal(addr, index)"
                  class="text-gray-700 text-sm border rounded p-3 space-y-1 cursor-pointer hover:bg-green-50 transition">
                  <div class="font-semibold">{{ addr.fullName || 'No name' }} ({{ addr.label || 'No label' }})</div>
                  <div>{{ addr.phoneNumber || 'No phone' }}</div>
                  <div>{{ formatAddress(addr) }}</div>
                  <div v-if="addr.description" class="italic text-gray-500">{{ addr.description }}</div>
                  <div v-if="addr.isDefault" class="text-xs font-semibold text-green-700">Default Address</div>
                </li>
              </ul>
            </div>
            <div v-else class="text-sm text-gray-500">No addresses added yet.</div>
            <button @click="openAddressModal(null)"
              class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm transition">
              Add New Address
            </button>
          </div>
        </div>
      </div>

      <div v-else class="mt-10 bg-yellow-100 text-yellow-800 px-6 py-4 rounded text-center text-sm">
        No user is logged in.
        <router-link to="/signin" class="text-green-700 font-semibold underline ml-1">Sign in</router-link> to view your
        profile.
      </div>
    </div>

    <!-- Address Modal -->
    <AddressModal :visible="showAddressModal" :address="selectedAddress" @close="closeAddressModal"
      @save="handleAddressSave" @delete="handleAddressDelete" />

    <!-- Verification Modal -->
    <VerificationModal :visible="showVerificationModal" @close="closeVerificationModal" @verify="handleVerification" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import AddressModal from '../../components/Profile/AddressModal.vue'
import VerificationModal from '../../components/Profile/VerificationModal.vue'
import ProfileInfo from '../../components/Profile/ProfileInfo.vue'
import FarmInfo from '../../components/Profile/FarmInfo.vue'

export default {
  components: {
    NavBar,
    AddressModal,
    VerificationModal,
    ProfileInfo,
    FarmInfo
  },

  setup() {
    const router = useRouter()

    const user = ref(null)
    const editableUser = ref({})
    const editing = ref(false)
    const upgradePending = ref(false)
    const addresses = ref([])
    const activeTab = ref('profile')
    const verificationStatus = ref('unverified')
    const verificationSubmittedAt = ref(null)
    const verificationRejectionReason = ref(null)
    const profileInputRef = ref(null)
    const bannerInputRef = ref(null)
    const profileImage = ref(null)
    const bannerImage = ref(null)
    const tempProfileImage = ref(null)
    const tempBannerImage = ref(null)
    const showAddressModal = ref(false)
    const selectedAddress = ref(null)
    const selectedIndex = ref(null)
    const showVerificationModal = ref(false)

    const bannerStyle = computed(() => {
      const bannerSrc = editing.value ? (tempBannerImage.value || bannerImage.value) : bannerImage.value
      return bannerSrc ? { backgroundImage: `url('${bannerSrc}')` } : {}
    })

    const formatDate = (dateString) => {
      if (!dateString) return '—'
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formatAddress = (addr) => {
      const parts = [addr.street, addr.barangay, addr.city, addr.province, addr.region].filter(Boolean)
      return parts.length ? parts.join(', ') : 'No location specified'
    }

    const checkVerificationStatus = (userId) => {
      const userData = localStorage.getItem(`user_${userId}`)
      if (userData) {
        const userObj = JSON.parse(userData)
        if (userObj.isVerified) {
          verificationStatus.value = 'verified'
          return
        }
      }

      const verificationRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]')
      const userVerification = verificationRequests.find(req => req.userId === userId)

      if (!userVerification) {
        verificationStatus.value = 'unverified'
        return
      }

      verificationStatus.value = userVerification.status
      verificationSubmittedAt.value = userVerification.submittedAt
      verificationRejectionReason.value = userVerification.rejectionReason || null
    }

    const loadUserData = () => {
      const authUserId = localStorage.getItem('authUserId')
      if (!authUserId) return

      const userData = localStorage.getItem(`user_${authUserId}`)
      if (!userData) return

      try {
        const parsedUser = JSON.parse(userData)
        user.value = parsedUser
        editableUser.value = { ...parsedUser }
        delete editableUser.value.password

        checkVerificationStatus(authUserId)

        profileImage.value = localStorage.getItem(`profileImage_${authUserId}`)
        bannerImage.value = localStorage.getItem(`bannerImage_${authUserId}`)

        if (parsedUser.role === 'Farmer') {
          const upgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
          const approvedRequest = upgradeRequests.find(req =>
            req.userId === authUserId && req.status === 'approved'
          )

          if (approvedRequest) {
            user.value = {
              ...user.value,
              farmName: approvedRequest.farmDetails.farmName,
              farmSize: approvedRequest.farmDetails.farmSize,
              farmSizeUnit: approvedRequest.farmDetails.farmSizeUnit,
              livestockTypes: approvedRequest.farmDetails.livestockTypes,
              description: approvedRequest.farmDetails.description,
              farmAddress: approvedRequest.farmAddress
            }
            editableUser.value = { ...user.value }
            delete editableUser.value.password
          }
        }

        const upgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
        upgradePending.value = upgradeRequests.some(req =>
          req.userId === authUserId && req.status === 'pending'
        )

        const storedAddresses = localStorage.getItem(`addresses_${authUserId}`)
        if (storedAddresses) {
          addresses.value = JSON.parse(storedAddresses)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }

    const onProfileChange = (event) => {
      const input = event.target
      const file = input.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        tempProfileImage.value = reader.result
      }
      reader.readAsDataURL(file)
      input.value = ''
    }

    const onBannerChange = (event) => {
      const input = event.target
      const file = input.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        tempBannerImage.value = reader.result
      }
      reader.readAsDataURL(file)
      input.value = ''
    }

    const handleProfileSave = (updatedUser) => {
      if (!user.value) return

      const userId = user.value.userId
      const originalUserData = JSON.parse(localStorage.getItem(`user_${userId}`) || '{}')

      const newUserData = {
        ...originalUserData,
        username: updatedUser.username || originalUserData.username,
        email: updatedUser.email || originalUserData.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        gender: updatedUser.gender,
        isVerified: verificationStatus.value === 'verified',
        userId: originalUserData.userId,
        password: originalUserData.password,
        role: originalUserData.role,
        createdAt: originalUserData.createdAt
      }

      user.value = newUserData
      localStorage.setItem(`user_${userId}`, JSON.stringify(newUserData))

      if (tempProfileImage.value) {
        profileImage.value = tempProfileImage.value
        localStorage.setItem(`profileImage_${userId}`, profileImage.value)
      }

      if (tempBannerImage.value) {
        bannerImage.value = tempBannerImage.value
        localStorage.setItem(`bannerImage_${userId}`, bannerImage.value)
      }

      editing.value = false
      tempProfileImage.value = null
      tempBannerImage.value = null
      loadUserData()
    }

    const openAddressModal = (address, index = null) => {
      selectedAddress.value = address ? { ...address } : null
      selectedIndex.value = index
      showAddressModal.value = true
    }

    const closeAddressModal = () => {
      showAddressModal.value = false
      selectedAddress.value = null
      selectedIndex.value = null
    }

    const handleAddressSave = (addressData) => {
      if (!user.value) return

      const userId = user.value.userId
      let updatedAddresses = [...addresses.value]

      if (selectedIndex.value !== null) {
        updatedAddresses[selectedIndex.value] = addressData
      } else {
        updatedAddresses.push(addressData)
      }

      if (addressData.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: addr === addressData
        }))
      }

      localStorage.setItem(`addresses_${userId}`, JSON.stringify(updatedAddresses))
      addresses.value = updatedAddresses
      closeAddressModal()
    }

    const handleAddressDelete = () => {
      if (!user.value || selectedIndex.value === null) return

      const userId = user.value.userId
      const updatedAddresses = [...addresses.value]
      updatedAddresses.splice(selectedIndex.value, 1)

      localStorage.setItem(`addresses_${userId}`, JSON.stringify(updatedAddresses))
      addresses.value = updatedAddresses
      closeAddressModal()
    }

    const openVerificationModal = () => {
      showVerificationModal.value = true
    }

    const closeVerificationModal = () => {
      showVerificationModal.value = false
    }

    const handleVerification = (verificationData) => {
      if (!user.value) return

      const userId = user.value.userId
      const verificationRequest = {
        userId,
        idType: verificationData.idType,
        frontImage: verificationData.frontImage,
        backImage: verificationData.backImage,
        status: 'pending',
        submittedAt: new Date().toISOString()
      }

      const existingRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]')
      const filteredRequests = existingRequests.filter(req => req.userId !== userId)
      filteredRequests.push(verificationRequest)

      localStorage.setItem('verificationRequests', JSON.stringify(filteredRequests))
      verificationStatus.value = 'pending'
      verificationSubmittedAt.value = verificationRequest.submittedAt
      verificationRejectionReason.value = null
      closeVerificationModal()
    }

    onMounted(() => {
      loadUserData()
    })

    return {
      user,
      editableUser,
      editing,
      upgradePending,
      addresses,
      activeTab,
      verificationStatus,
      verificationSubmittedAt,
      verificationRejectionReason,
      profileInputRef,
      bannerInputRef,
      profileImage,
      bannerImage,
      tempProfileImage,
      tempBannerImage,
      showAddressModal,
      selectedAddress,
      selectedIndex,
      showVerificationModal,
      bannerStyle,
      formatDate,
      formatAddress,
      onProfileChange,
      onBannerChange,
      handleProfileSave,
      openAddressModal,
      closeAddressModal,
      handleAddressSave,
      handleAddressDelete,
      openVerificationModal,
      closeVerificationModal,
      handleVerification
    }
  }
}
</script>
