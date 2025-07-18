<!-- userProfile.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <!-- Banner Section -->
    <div class="relative h-60 bg-gradient-to-r from-gray-300 to-gray-400 bg-center bg-cover" :style="bannerStyle">
      <div class="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2">
        <div class="relative w-32 h-32">
          <div class="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold object-cover">
            <img v-if="editing ? tempProfileImage || profileImage : profileImage"
              :src="editing ? (tempProfileImage ?? profileImage ?? undefined) : (profileImage ?? undefined)"
              class="w-full h-full object-cover" alt="Profile" />
            <span v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A11.963 11.963 0 0112 15c2.25 0 4.355.663 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </div>
          <input type="file" accept="image/*" ref="profileInputRef" class="hidden" @change="onProfileChange" />
          <button v-if="editing" @click="profileInputRef?.click()"
            class="absolute bottom-0 right-0 bg-white text-xs px-2 py-0.5 rounded shadow">Change</button>
        </div>
      </div>

      <div v-if="editing" class="absolute top-4 right-4">
        <input type="file" accept="image/*" ref="bannerInputRef" class="hidden" @change="onBannerChange" />
        <button @click="bannerInputRef?.click()" class="bg-white text-sm px-3 py-1 rounded shadow hover:bg-gray-100">
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
            <button :class="['px-4 py-2 text-sm font-semibold rounded-t', activeTab === 'profile' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600']"
              @click="activeTab = 'profile'">Profile Information</button>
            <button :class="['px-4 py-2 text-sm font-semibold rounded-t', activeTab === 'farmer' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600']"
              @click="activeTab = 'farmer'">Farm Information</button>
          </div>

          <!-- Profile Info -->
          <div v-if="activeTab === 'profile'" class="p-8 pt-0 space-y-8">
            <section>
              <div class="flex justify-between items-center mb-3 border-b pb-3">
                <h3 class="text-lg font-bold text-green-700">Account Information</h3>
                <div class="flex gap-2">
                  <button v-if="!editing" @click="toggleEdit"
                    class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded shadow">
                    Edit Profile
                  </button>
                  <button @click="confirmDeleteAccount"
                    class="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded shadow">
                    Delete Account
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
                <div>
                  <p class="font-semibold">Username</p>
                  <input v-if="editing" v-model="editableUser.username" class="w-full border rounded px-3 py-1" />
                  <p v-else class="border px-3 py-1 rounded">{{ user.username }}</p>
                </div>
                <div>
                  <p class="font-semibold">Email</p>
                  <input v-if="editing" v-model="editableUser.email" type="email" class="w-full border rounded px-3 py-1" />
                  <p v-else class="border px-3 py-1 rounded">{{ user.email }}</p>
                </div>
                <div>
                  <p class="font-semibold">User Role</p>
                  <p class="flex items-center border px-3 py-1 rounded">
                    {{ user.role }}
                    <span v-if="upgradePending" class="ml-2 text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded text-xs font-medium">Pending Upgrade</span>
                  </p>
                </div>
                <div>
                  <p class="font-semibold">Verification Status</p>
                  <p class="flex items-center border px-3 py-1 rounded">
                    <span v-if="verificationStatus === 'verified'" class="flex items-center text-green-700">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      Verified
                    </span>
                    <span v-else-if="verificationStatus === 'pending'" class="flex items-center text-blue-700">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      Pending
                    </span>
                    <span v-else-if="verificationStatus === 'rejected'" class="flex items-center text-red-700">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                      Rejected
                    </span>
                    <span v-else class="flex items-center text-yellow-700">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      Unverified
                    </span>
                  </p>
                </div>
                <div>
                  <p class="font-semibold">Date Created</p>
                  <p class="border px-3 py-1 rounded">{{ formatDate(user.createdAt) }}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-lg font-bold text-green-700 mb-3 border-b pb-1">Personal Information</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
                <div>
                  <p class="font-semibold">Full Name</p>
                  <div v-if="editing" class="flex gap-2">
                    <input v-model="editableUser.firstName" class="w-1/2 border rounded px-3 py-1" placeholder="First name" />
                    <input v-model="editableUser.lastName" class="w-1/2 border rounded px-3 py-1" placeholder="Last name" />
                  </div>
                  <p v-else class="border px-3 py-1 rounded">{{ user.firstName }} {{ user.lastName }}</p>
                </div>
                <div>
                  <p class="font-semibold">Phone Number</p>
                  <input v-if="editing" v-model="editableUser.phoneNumber" type="tel" class="w-full border rounded px-3 py-1" />
                  <p v-else class="border px-3 py-1 rounded">{{ user.phoneNumber || 'Not provided' }}</p>
                </div>
                <div>
                  <p class="font-semibold">Gender</p>
                  <select v-if="editing" v-model="editableUser.gender" class="w-full border rounded px-3 py-1">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <p v-else class="border px-3 py-1 rounded">{{ user.gender || 'Not specified' }}</p>
                </div>
              </div>
            </section>

            <div v-if="editing" class="flex justify-end pt-4 gap-2">
              <button @click="toggleEdit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded shadow text-sm">Cancel</button>
              <button @click="saveProfile" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow text-sm">Save Changes</button>
            </div>
          </div>

          <!-- Farm Info -->
          <div v-if="activeTab === 'farmer'" class="p-8 pt-0 space-y-6">
            <h3 class="text-lg font-bold text-green-700 border-b pb-2">Farm Information</h3>
            <div v-if="user && user.role === 'Farmer'" class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
              <div>
                <p class="font-semibold">Farm Name</p>
                <input v-if="editing" v-model="editableUser.farmName" class="w-full border rounded px-3 py-1" />
                <p v-else class="border px-3 py-1 rounded">{{ user.farmName || 'Not provided' }}</p>
              </div>
              <div>
                <p class="font-semibold">Farm Location</p>
                <input v-if="editing" v-model="editableUser.farmLocation" class="w-full border rounded px-3 py-1" />
                <p v-else class="border px-3 py-1 rounded">{{ user.farmLocation || 'Not provided' }}</p>
              </div>
              <div>
                <p class="font-semibold">Farm Size</p>
                <input v-if="editing" v-model="editableUser.farmSize" type="number" class="w-full border rounded px-3 py-1" />
                <p v-else class="border px-3 py-1 rounded">{{ user.farmSize ? `${user.farmSize} hectares` : 'Not provided' }}</p>
              </div>
              <div>
                <p class="font-semibold">Livestock Type</p>
                <input v-if="editing" v-model="editableUser.livestockType" class="w-full border rounded px-3 py-1" />
                <p v-else class="border px-3 py-1 rounded">{{ user.livestockType || 'Not specified' }}</p>
              </div>
              <div>
                <p class="font-semibold">Experience</p>
                <input v-if="editing" v-model="editableUser.experience" type="number" class="w-full border rounded px-3 py-1" />
                <p v-else class="border px-3 py-1 rounded">{{ user.experience ? `${user.experience} years` : 'Not specified' }}</p>
              </div>
              <div class="sm:col-span-2">
                <p class="font-semibold">Description</p>
                <textarea v-if="editing" v-model="editableUser.description" class="w-full border rounded px-3 py-1" rows="3"></textarea>
                <p v-else class="whitespace-pre-line border px-3 py-1 rounded">{{ user.description || 'No description provided' }}</p>
              </div>
            </div>
            <div v-else class="text-sm text-gray-500">
                You need to be verified first in order to upgrade your account.
              <button 
                @click="goToUpgradeForm"
                :disabled="verificationStatus !== 'verified' || upgradePending"
                :class="[
                  'ml-2 text-xs font-medium px-4 py-1.5 rounded shadow transition',
                  verificationStatus === 'verified' && !upgradePending 
                    ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                ]"
                :title="verificationStatus !== 'verified' 
                  ? 'You must verify your account first' 
                  : upgradePending 
                    ? 'Upgrade request pending' 
                    : 'Upgrade to Farmer'"
              >
                <span v-if="upgradePending">Upgrade Pending</span>
                <span v-else>Upgrade to Farmer</span>
              </button>
            </div>
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
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
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
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
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
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
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
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
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
        <router-link to="/signin" class="text-green-700 font-semibold underline ml-1">Sign in</router-link> to view your profile.
      </div>
    </div>

    <!-- Address Modal -->
    <AddressModal 
      :visible="showAddressModal" 
      :address="selectedAddress" 
      @close="closeAddressModal" 
      @save="handleAddressSave" 
      @delete="handleAddressDelete" 
    />

    <!-- Verification Modal -->
    <VerificationModal 
      :visible="showVerificationModal" 
      @close="closeVerificationModal" 
      @verify="handleVerification" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import AddressModal from '../../components/Profile/AddressModal.vue'
import VerificationModal from '../../components/Profile/VerificationModal.vue'

interface User {
  userId: string
  username: string
  email: string
  password?: string
  role: string
  createdAt?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: string
  farmName?: string
  farmLocation?: string
  farmSize?: number
  livestockType?: string
  experience?: number
  description?: string
  isVerified?: boolean
}

interface Address {
  fullName: string
  phoneNumber: string
  region: string
  province: string
  city: string
  barangay: string
  street: string
  description: string
  label: string
  isDefault: boolean
  createdAt?: string
}

interface VerificationData {
  idType: string
  frontImage: string
  backImage: string
}

interface VerificationRequest {
  userId: string
  idType: string
  frontImage: string
  backImage: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  rejectionReason?: string
}

interface UpgradeRequest {
  userId: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

const router = useRouter()

// User data
const user = ref<User | null>(null)
const editableUser = ref<Partial<User>>({})
const editing = ref(false)
const upgradePending = ref(false)
const addresses = ref<Address[]>([])
const activeTab = ref<'profile' | 'farmer'>('profile')

// Verification status
const verificationStatus = ref<'unverified' | 'pending' | 'verified' | 'rejected'>('unverified')
const verificationSubmittedAt = ref<string | null>(null)
const verificationRejectionReason = ref<string | null>(null)

// Refs for file inputs
const profileInputRef = ref<HTMLInputElement | null>(null)
const bannerInputRef = ref<HTMLInputElement | null>(null)

// Image handling
const profileImage = ref<string | null>(null)
const bannerImage = ref<string | null>(null)
const tempProfileImage = ref<string | null>(null)
const tempBannerImage = ref<string | null>(null)

// Address modal
const showAddressModal = ref(false)
const selectedAddress = ref<Address | null>(null)
const selectedIndex = ref<number | null>(null)

// Verification modal
const showVerificationModal = ref(false)

// Computed banner style
const bannerStyle = computed(() => {
  const bannerSrc = editing.value ? (tempBannerImage.value ?? bannerImage.value) : bannerImage.value
  return bannerSrc ? { backgroundImage: `url('${bannerSrc}')` } : {}
})

// Helper functions
const formatDate = (dateString?: string | null) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString()
}

const formatAddress = (addr: Address) => {
  const parts = [addr.street, addr.barangay, addr.city, addr.province, addr.region].filter(Boolean)
  return parts.length ? parts.join(', ') : 'No location specified'
}

// Lifecycle hooks
onMounted(() => {
  loadUserData()
})

const checkVerificationStatus = (userId: string) => {
  // First check user's isVerified flag
  const userData = localStorage.getItem(`user_${userId}`)
  if (userData) {
    const userObj = JSON.parse(userData) as User
    if (userObj.isVerified) {
      verificationStatus.value = 'verified'
      return
    }
  }

  // If not verified, check verification requests
  const verificationRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]') as VerificationRequest[]
  const userVerification = verificationRequests.find(req => req.userId === userId)
  
  if (!userVerification) {
    verificationStatus.value = 'unverified'
    return
  }
  
  // Update verification status based on request
  verificationStatus.value = userVerification.status === 'approved' ? 'verified' : 
                         userVerification.status === 'rejected' ? 'rejected' : 
                         'pending'
  
  verificationSubmittedAt.value = userVerification.submittedAt
  verificationRejectionReason.value = userVerification.rejectionReason || null
}

// Data loading
const loadUserData = () => {
  const authUserId = localStorage.getItem('authUserId')
  if (!authUserId) {
    console.log('No authenticated user found')
    return
  }

  // Load user data
  const userData = localStorage.getItem(`user_${authUserId}`)
  if (!userData) {
    console.error('User data not found in localStorage')
    return
  }

  try {
    const parsedUser = JSON.parse(userData)
    user.value = parsedUser
    editableUser.value = { ...parsedUser }
    delete editableUser.value.password

    // Check verification status
    checkVerificationStatus(authUserId)

    // Load images
    profileImage.value = localStorage.getItem(`profileImage_${authUserId}`)
    bannerImage.value = localStorage.getItem(`bannerImage_${authUserId}`)

    // Load farmer data if exists
    if (parsedUser.role === 'Farmer') {
      const farmerData = localStorage.getItem(`farmerData_${authUserId}`)
      if (farmerData) {
        const parsedData = JSON.parse(farmerData)
        user.value = {
          ...user.value,
          ...parsedData,
          farmLocation: formatAddress(parsedData.farmAddress || {})
        }
        editableUser.value = { ...user.value }
        delete editableUser.value.password
      }
    }

    // Check for upgrade requests
    const upgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]') as UpgradeRequest[]
    upgradePending.value = upgradeRequests.some((req: UpgradeRequest) => req.userId === authUserId && req.status === 'pending')

    // Load addresses
    const storedAddresses = localStorage.getItem(`addresses_${authUserId}`)
    if (storedAddresses) {
      addresses.value = JSON.parse(storedAddresses)
    }
  } catch (error) {
    console.error('Error loading user data:', error)
  }
}

// Image handling
const onProfileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = () => {
    tempProfileImage.value = reader.result as string
  }
  reader.readAsDataURL(file)
  input.value = ''
}

const onBannerChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = () => {
    tempBannerImage.value = reader.result as string
  }
  reader.readAsDataURL(file)
  input.value = ''
}

// Edit/save profile
const toggleEdit = () => {
  if (editing.value) {
    editableUser.value = { ...user.value }
    delete editableUser.value.password
    tempProfileImage.value = null
    tempBannerImage.value = null
  }
  editing.value = !editing.value
}

const saveProfile = () => {
  if (!user.value) return;

  const userId = user.value.userId;
  
  const originalUserData = JSON.parse(localStorage.getItem(`user_${userId}`) || '{}') as User;
  
  const updatedUser: User = {
    ...originalUserData,
    username: editableUser.value.username ?? originalUserData.username,
    email: editableUser.value.email ?? originalUserData.email,
    firstName: editableUser.value.firstName,
    lastName: editableUser.value.lastName,
    phoneNumber: editableUser.value.phoneNumber,
    gender: editableUser.value.gender,
    farmName: editableUser.value.farmName,
    farmLocation: editableUser.value.farmLocation,
    farmSize: editableUser.value.farmSize,
    livestockType: editableUser.value.livestockType,
    experience: editableUser.value.experience,
    description: editableUser.value.description,
    isVerified: verificationStatus.value === 'verified',
    userId: originalUserData.userId,
    password: originalUserData.password,
    role: originalUserData.role,
    createdAt: originalUserData.createdAt
  };

  user.value = updatedUser;
  localStorage.setItem(`user_${userId}`, JSON.stringify(updatedUser));

  if (tempProfileImage.value) {
    profileImage.value = tempProfileImage.value;
    localStorage.setItem(`profileImage_${userId}`, profileImage.value);
  }

  if (tempBannerImage.value) {
    bannerImage.value = tempBannerImage.value;
    localStorage.setItem(`bannerImage_${userId}`, bannerImage.value);
  }

  if (user.value.role === 'Farmer') {
    const farmAddressParts = user.value.farmLocation?.split(', ') || [];
    const farmData = {
      farmName: user.value.farmName,
      farmSize: user.value.farmSize,
      livestockType: user.value.livestockType,
      experience: user.value.experience,
      description: user.value.description,
      farmAddress: {
        street: farmAddressParts[0] || '',
        barangay: farmAddressParts[1] || '',
        city: farmAddressParts[2] || '',
        province: farmAddressParts[3] || '',
        region: farmAddressParts[4] || '',
      }
    }
    localStorage.setItem(`farmerData_${userId}`, JSON.stringify(farmData));
  }

  editing.value = false;
  tempProfileImage.value = null;
  tempBannerImage.value = null;
  loadUserData();
}

// Address management
const openAddressModal = (address: Address | null, index: number | null = null) => {
  selectedAddress.value = address ? { ...address } : null
  selectedIndex.value = index
  showAddressModal.value = true
}

const closeAddressModal = () => {
  showAddressModal.value = false
  selectedAddress.value = null
  selectedIndex.value = null
}

const handleAddressSave = (addressData: Address) => {
  if (!user.value) return

  const userId = user.value.userId
  let updatedAddresses = [...addresses.value]

  if (selectedIndex.value !== null) {
    // Update existing address
    updatedAddresses[selectedIndex.value] = addressData
  } else {
    // Add new address
    updatedAddresses.push(addressData)
  }

  // If this address is set as default, ensure no others are default
  if (addressData.isDefault) {
    updatedAddresses = updatedAddresses.map(addr => ({
      ...addr,
      isDefault: addr === addressData ? true : false
    }))
  }

  // Save to localStorage
  localStorage.setItem(`addresses_${userId}`, JSON.stringify(updatedAddresses))
  
  // Update local state
  addresses.value = updatedAddresses
  closeAddressModal()
}

const handleAddressDelete = () => {
  if (!user.value || selectedIndex.value === null) return

  const userId = user.value.userId
  const updatedAddresses = [...addresses.value]
  updatedAddresses.splice(selectedIndex.value, 1)

  // Save to localStorage
  localStorage.setItem(`addresses_${userId}`, JSON.stringify(updatedAddresses))
  
  // Update local state
  addresses.value = updatedAddresses
  closeAddressModal()
}

// Verification management
const openVerificationModal = () => {
  showVerificationModal.value = true
}

const closeVerificationModal = () => {
  showVerificationModal.value = false
}

const handleVerification = (verificationData: VerificationData) => {
  if (!user.value) return

  const userId = user.value.userId
  const verificationRequest: VerificationRequest = {
    userId,
    idType: verificationData.idType,
    frontImage: verificationData.frontImage,
    backImage: verificationData.backImage,
    status: 'pending',
    submittedAt: new Date().toISOString()
  }

  const existingRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]') as VerificationRequest[]
  const filteredRequests = existingRequests.filter(req => req.userId !== userId)
  filteredRequests.push(verificationRequest)
  
  localStorage.setItem('verificationRequests', JSON.stringify(filteredRequests))
  
  verificationStatus.value = 'pending'
  verificationSubmittedAt.value = verificationRequest.submittedAt
  verificationRejectionReason.value = null
  
  closeVerificationModal()
}

// Account deletion
const confirmDeleteAccount = () => {
  if (!user.value) return

  const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.')
  if (!confirmed) return

  const userId = user.value.userId

  localStorage.removeItem(`user_${userId}`)
  localStorage.removeItem(`profileImage_${userId}`)
  localStorage.removeItem(`bannerImage_${userId}`)
  localStorage.removeItem(`addresses_${userId}`)
  localStorage.removeItem(`farmerData_${userId}`)
  
  const verificationRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]') as VerificationRequest[]
  const filteredRequests = verificationRequests.filter((req: VerificationRequest) => req.userId !== userId)
  localStorage.setItem('verificationRequests', JSON.stringify(filteredRequests))
  
  const upgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]') as UpgradeRequest[]
  const filteredUpgrades = upgradeRequests.filter((req: UpgradeRequest) => req.userId !== userId)
  localStorage.setItem('upgradeRequests', JSON.stringify(filteredUpgrades))
  
  localStorage.removeItem('authUserId')
  router.push('/signin')
}

const goToUpgradeForm = () => {
  if (verificationStatus.value !== 'verified' || upgradePending.value) {
    return
  }
  router.push('/upgradeForm')
}
</script>