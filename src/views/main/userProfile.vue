<!-- ProfilePage.vue -->
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
        <div class="lg:col-span-3">
          <div class="flex gap-4 mb-6 border-b pb-2">
            <button :class="['px-4 py-2 text-sm font-semibold rounded-t', activeTab === 'profile' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600']"
              @click="activeTab = 'profile'">Profile Information</button>
            <button :class="['px-4 py-2 text-sm font-semibold rounded-t', activeTab === 'farmer' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600']"
              @click="activeTab = 'farmer'">Farm Information</button>
          </div>
        </div>

        <!-- Profile Info -->
        <div v-if="activeTab === 'profile'" class="lg:col-span-2 bg-white shadow-lg rounded-xl p-8 space-y-8 border border-gray-200">
          <section>
            <div class="flex justify-between items-center mb-3 border-b pb-3">
              <h3 class="text-lg font-bold text-green-700">Account Information</h3>
              <button v-if="!editing" @click="toggleEdit"
                class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded shadow">
                Edit Profile
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
              <div>
                <p class="font-semibold">Username</p>
                <input v-if="editing" v-model="editableUser.username" class="w-full border rounded px-3 py-1" />
                <p v-else class="border px-3 py-1 rounded">{{ user.username }}</p>
              </div>
              <div>
                <p class="font-semibold">Email</p>
                <input v-if="editing" v-model="editableUser.email" class="w-full border rounded px-3 py-1" />
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
                <p class="font-semibold">Date Created</p>
                <p class="border px-3 py-1 rounded">{{ user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—' }}</p>
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
                <input v-if="editing" v-model="editableUser.phoneNumber" class="w-full border rounded px-3 py-1" />
                <p v-else class="border px-3 py-1 rounded">{{ user.phoneNumber }}</p>
              </div>
              <div>
                <p class="font-semibold">Gender</p>
                <select v-if="editing" v-model="editableUser.gender" class="w-full border rounded px-3 py-1">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <p v-else class="border px-3 py-1 rounded">{{ user.gender }}</p>
              </div>
            </div>
          </section>

          <div v-if="editing" class="flex justify-end pt-4 gap-2">
            <button @click="toggleEdit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded shadow text-sm">Cancel</button>
            <button @click="saveProfile" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow text-sm">Save Changes</button>
          </div>
        </div>

        <!-- Farm Info -->
        <div v-if="activeTab === 'farmer'" class="lg:col-span-2 bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-200">
          <h3 class="text-lg font-bold text-green-700 border-b pb-2">Farm Informations</h3>
          <div v-if="user.role === 'Farmer'" class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
            <div>
              <p class="font-semibold">Farm Name</p>
              <input v-if="editing" v-model="editableUser.farmName" class="w-full border rounded px-3 py-1" />
              <p v-else class="border px-3 py-1 rounded">{{ user.farmName }}</p>
            </div>
            <div>
              <p class="font-semibold">Farm Location</p>
              <input v-if="editing" v-model="editableUser.farmLocation" class="w-full border rounded px-3 py-1" />
              <p v-else class="border px-3 py-1 rounded">{{ user.farmLocation }}</p>
            </div>
            <div>
              <p class="font-semibold">Farm Size</p>
              <input v-if="editing" v-model="editableUser.farmSize" class="w-full border rounded px-3 py-1" />
              <p v-else class="border px-3 py-1 rounded">{{ user.farmSize }}</p>
            </div>
            <div>
              <p class="font-semibold">Livestock Type</p>
              <input v-if="editing" v-model="editableUser.livestockType" class="w-full border rounded px-3 py-1" />
              <p v-else class="border px-3 py-1 rounded">{{ user.livestockType }}</p>
            </div>
            <div>
              <p class="font-semibold">Experience</p>
              <input v-if="editing" v-model="editableUser.experience" type="number" class="w-full border rounded px-3 py-1" />
              <p v-else class="border px-3 py-1 rounded">{{ user.experience }} years</p>
            </div>
            <div class="sm:col-span-2">
              <p class="font-semibold">Description</p>
              <textarea v-if="editing" v-model="editableUser.description" class="w-full border rounded px-3 py-1" rows="3"></textarea>
              <p v-else class="whitespace-pre-line border px-3 py-1 rounded">{{ user.description }}</p>
            </div>
          </div>
          <div v-else class="text-sm text-gray-500">
            You are not a farmer yet.
            <button v-if="!upgradePending" @click="goToUpgradeForm"
              class="ml-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-1.5 rounded shadow">
              Upgrade to Farmer
            </button>
            <span v-else class="ml-2 text-yellow-600 text-xs">Upgrade Pending</span>
          </div>
        </div>

        <!-- Address Panel -->
        <div class="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-green-700 mb-4">My Address</h3>
          <div v-if="addresses.length">
            <ul class="space-y-3">
              <li v-for="(addr, index) in addresses" :key="index" @click="openAddressModal(addr, index)"
                class="text-gray-700 text-sm border rounded p-3 space-y-1 cursor-pointer hover:bg-green-50 transition">
                <div class="font-semibold">{{ addr.fullName }} ({{ addr.label }})</div>
                <div>{{ addr.phoneNumber }}</div>
                <div>{{ addr.street }}, {{ addr.barangay }}, {{ addr.city }}, {{ addr.province }}, {{ addr.region }}</div>
                <div v-if="addr.description" class="italic text-gray-500">{{ addr.description }}</div>
                <div v-if="addr.isDefault" class="text-xs font-semibold text-green-700">Default Address</div>
              </li>
            </ul>
          </div>
          <div v-else class="text-sm text-gray-500">No address added yet.</div>
          <button @click="openAddressModal(null)"
            class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm transition">
            Add New Address
          </button>
        </div>
      </div>

      <div v-else class="mt-10 bg-yellow-100 text-yellow-800 px-6 py-4 rounded text-center text-sm">
        No user is logged in.
        <router-link to="/signin" class="text-green-700 font-semibold underline ml-1">Sign in</router-link> to view your profile.
      </div>
    </div>

    <!-- Address Modal -->
    <AddressModal :visible="showAddressModal" :address="selectedAddress" @close="closeModal" @save="handleAddressSave" @delete="handleAddressDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import AddressModal from '../../components/Profile/AddressModal.vue'

const router = useRouter()
const user = ref<any>(null)
const editableUser = ref<any>({})
const editing = ref(false)
const upgradePending = ref(false)
const addresses = ref<Record<string, any>[]>([])
const activeTab = ref<'profile' | 'farmer'>('profile')

const profileInputRef = ref<HTMLInputElement | null>(null)
const bannerInputRef = ref<HTMLInputElement | null>(null)

const profileImage = ref<string | null>(null)
const bannerImage = ref<string | null>(null)
const tempProfileImage = ref<string | null>(null)
const tempBannerImage = ref<string | null>(null)

const showAddressModal = ref(false)
const selectedAddress = ref<Record<string, any> | null>(null)
const selectedIndex = ref<number | null>(null)

const bannerStyle = computed(() => {
  const bannerSrc = editing.value ? (tempBannerImage.value ?? bannerImage.value) : bannerImage.value
  return bannerSrc ? { backgroundImage: `url('${bannerSrc}')` } : {}
})

function formatAddress(addr?: Record<string, string>) {
  if (!addr) return 'No location'
  const parts = [addr.street, addr.barangay, addr.city, addr.province, addr.region].filter(Boolean)
  return parts.length ? parts.join(', ') : 'No location'
}

onMounted(() => {
  const authEmail = localStorage.getItem('authEmail')
  if (!authEmail) return

  const storedUser = localStorage.getItem(`user_${authEmail}`)
  const profileImg = localStorage.getItem(`profileImage_${authEmail}`)
  const bannerImg = localStorage.getItem(`bannerImage_${authEmail}`)
  const farmerDataRaw = localStorage.getItem(`farmerData_${authEmail}`)

  if (storedUser) {
    user.value = JSON.parse(storedUser)

    if (farmerDataRaw) {
      try {
        const farmerData = JSON.parse(farmerDataRaw)
        user.value = {
          ...user.value,
          farmName: farmerData.farmName,
          farmLocation: formatAddress(farmerData.farmAddress),
          farmSize: farmerData.farmSize,
          livestockType: farmerData.livestockType,
          experience: farmerData.experience,
          description: farmerData.description,
        }
      } catch {
        console.error('Failed to parse farmerData')
      }
    }

    editableUser.value = { ...user.value }

    const upgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
    upgradePending.value = upgradeRequests.some((req: any) => req.email === user.value.email)

    const storedAddresses = localStorage.getItem(`addresses_${user.value.email}`)
    if (storedAddresses) addresses.value = JSON.parse(storedAddresses)
  }

  if (profileImg) profileImage.value = profileImg
  if (bannerImg) bannerImage.value = bannerImg
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    const authEmail = localStorage.getItem('authEmail')
    const updatedUser = JSON.parse(localStorage.getItem(`user_${authEmail}`) || '{}')
    if (updatedUser && updatedUser.role !== user.value.role) {
      user.value = updatedUser
      editableUser.value = { ...updatedUser }
    }
  }
})

function onProfileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => tempProfileImage.value = reader.result as string
  reader.readAsDataURL(file)
  input.value = ''
}

function onBannerChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => tempBannerImage.value = reader.result as string
  reader.readAsDataURL(file)
  input.value = ''
}

function toggleEdit() {
  if (editing.value) {
    editableUser.value = { ...user.value }
    tempProfileImage.value = null
    tempBannerImage.value = null
  }
  editing.value = !editing.value
}

function saveProfile() {
  if (!user.value) return

  user.value = { ...editableUser.value }
  const emailKey = user.value.email

  localStorage.setItem(`user_${emailKey}`, JSON.stringify(user.value))
  localStorage.setItem('authEmail', emailKey)

  if (tempProfileImage.value) {
    profileImage.value = tempProfileImage.value
    localStorage.setItem(`profileImage_${emailKey}`, profileImage.value)
  }

  if (tempBannerImage.value) {
    bannerImage.value = tempBannerImage.value
    localStorage.setItem(`bannerImage_${emailKey}`, bannerImage.value)
  }

  if (user.value.role === 'Farmer') {
    const farmAddressParts = user.value.farmLocation?.split(', ') || []
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
    localStorage.setItem(`farmerData_${emailKey}`, JSON.stringify(farmData))
  }

  tempProfileImage.value = null
  tempBannerImage.value = null
  editing.value = false
}

function openAddressModal(address: Record<string, any> | null, index: number | null = null) {
  selectedAddress.value = address ? { ...address } : null
  selectedIndex.value = index
  showAddressModal.value = true
}

function closeModal() {
  showAddressModal.value = false
  selectedAddress.value = null
  selectedIndex.value = null
}

function handleAddressSave(updated: Record<string, any>) {
  if (selectedIndex.value !== null) {
    addresses.value[selectedIndex.value] = updated
  } else {
    addresses.value.push(updated)
  }

  localStorage.setItem(`addresses_${user.value.email}`, JSON.stringify(addresses.value))
  closeModal()
}

function handleAddressDelete() {
  if (selectedIndex.value !== null) {
    addresses.value.splice(selectedIndex.value, 1)
    localStorage.setItem(`addresses_${user.value.email}`, JSON.stringify(addresses.value))
  }
  closeModal()
}

function goToUpgradeForm() {
  router.push('/upgrade-account')
}
</script>
