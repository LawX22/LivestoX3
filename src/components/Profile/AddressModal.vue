<!-- AddressModal.vue -->
<template>
  <transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop with blur effect -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click.self="$emit('close')"></div>

      <!-- Modal Container - Changed to max-height instead of fixed height -->
      <div class="relative w-full max-w-5xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 transform transition-all duration-300 ease-out flex flex-col">
        
        <!-- Floating background elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-4 right-4 w-8 h-8 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
          <div class="absolute top-12 right-16 w-6 h-6 bg-emerald-300 rounded-full opacity-15 animate-bounce" style="animation-delay: 1s"></div>
          <div class="absolute bottom-8 left-8 w-7 h-7 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
        </div>

        <!-- Header - Fixed height -->
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4 text-white relative overflow-hidden flex-shrink-0">
          <!-- Header background elements -->
          <div class="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -translate-y-8 translate-x-8 animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-10 rounded-full translate-y-6 -translate-x-6 animate-pulse"></div>
          
          <div class="relative z-10 flex items-center">
            <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                {{ address ? 'Edit Address' : 'Add New Address' }}
              </h3>
              <p class="text-green-100 text-xs opacity-90">Complete your address information</p>
            </div>
          </div>
        </div>

        <!-- Content Area - Scrollable -->
        <div class="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-gray-50/50 to-white relative">
          <!-- Progress indicator -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Address Information</span>
              <span class="text-xs text-gray-500">Complete Form</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 h-1 rounded-full w-full transition-all duration-500"></div>
            </div>
          </div>

          <!-- Compact 3 Column Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!-- Column 1 - Personal Info -->
            <div class="space-y-3">
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  Personal Details
                </h4>
                
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                    <div class="relative">
                      <input
                        v-model="fullName"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 pl-7"
                        readonly
                      />
                      <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                    <div class="relative">
                      <input
                        v-model="phoneNumber"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 pl-7"
                        readonly
                      />
                      <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Default Address Toggle -->
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200/50">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    v-model="isDefault"
                    class="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all duration-200"
                  />
                  <label for="isDefault" class="ml-2 flex-1">
                    <div class="text-xs font-semibold text-gray-800">Set as Default</div>
                    <div class="text-xs text-gray-600">Primary delivery address</div>
                  </label>
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Column 2 - Location Info -->
            <div class="space-y-3">
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  Location Details
                </h4>
                
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Region</label>
                    <input
                      v-model="region"
                      placeholder="Enter region"
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Province</label>
                    <input
                      v-model="province"
                      placeholder="Enter province"
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">City</label>
                    <input
                      v-model="city"
                      placeholder="Enter city"
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Barangay</label>
                    <input
                      v-model="barangay"
                      placeholder="Enter barangay"
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Column 3 - Additional Info -->
            <div class="space-y-3">
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  Additional Info
                </h4>
                
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Street</label>
                    <input
                      v-model="street"
                      placeholder="Enter street address"
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Label</label>
                    <div class="relative">
                      <select
                        v-model="label"
                        class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 appearance-none"
                      >
                        <option value="Home">🏠 Home</option>
                        <option value="Work">🏢 Work</option>
                        <option value="Other">📍 Other</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="text-xs font-medium text-gray-600 mb-1 flex items-center">
                      <svg class="w-3 h-3 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                      </svg>
                      Additional Notes
                    </label>
                    <textarea
                      v-model="description"
                      rows="3"
                      placeholder="Special delivery instructions..."
                      class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer - Fixed at bottom -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 flex justify-between items-center border-t border-gray-200/50 flex-shrink-0 backdrop-blur-sm">
          <div class="flex items-center text-xs text-gray-500">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Secure & encrypted
          </div>
          
          <div class="flex items-center space-x-3">
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm"
            >
              Cancel
            </button>
            
            <button
              v-if="address"
              @click="deleteAddress"
              class="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v4a1 1 0 11-2 0V7z" clip-rule="evenodd" />
              </svg>
              Delete
            </button>
            
            <button
              @click="saveAddress"
              class="px-6 py-2 text-xs font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              <svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ address ? 'Update' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { getCurrentUser } from '../../services/user'

interface Address {
  fullName?: string
  phoneNumber?: string
  region?: string
  province?: string
  city?: string
  barangay?: string
  street?: string
  description?: string
  label?: string
  isDefault?: boolean
  createdAt?: string
}

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    address: {
      type: Object as () => Address | null,
      default: null
    }
  },

  emits: ['close', 'save', 'delete'],

  setup(props, { emit }) {
    const fullName = ref('')
    const phoneNumber = ref('')
    const region = ref('')
    const province = ref('')
    const city = ref('')
    const barangay = ref('')
    const street = ref('')
    const description = ref('')
    const label = ref('Home')
    const isDefault = ref(false)

    // Store original overflow value
    const originalOverflow = ref('')

    function lockBodyScroll() {
      originalOverflow.value = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }

    function unlockBodyScroll() {
      document.body.style.overflow = originalOverflow.value
    }

    function resetForm() {
      region.value = ''
      province.value = ''
      city.value = ''
      barangay.value = ''
      street.value = ''
      description.value = ''
      label.value = 'Home'
      isDefault.value = false
    }

    onMounted(() => {
      const user = getCurrentUser()
      if (user) {
        fullName.value = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
        phoneNumber.value = user.phoneNumber ?? ''
      }
    })

    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          lockBodyScroll()
        } else {
          unlockBodyScroll()
          resetForm()
        }
      }
    )

    watch(
      () => props.address,
      (addr) => {
        if (addr) {
          region.value = addr.region || ''
          province.value = addr.province || ''
          city.value = addr.city || ''
          barangay.value = addr.barangay || ''
          street.value = addr.street || ''
          description.value = addr.description || ''
          label.value = addr.label || 'Home'
          isDefault.value = addr.isDefault || false
        } else {
          resetForm()
        }
      },
      { immediate: true }
    )

    onBeforeUnmount(() => {
      unlockBodyScroll()
    })

    function saveAddress() {
      if (!fullName.value.trim()) {
        alert('Full name is required')
        return
      }

      const compiledAddress: Address = {
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        region: region.value,
        province: province.value,
        city: city.value,
        barangay: barangay.value,
        street: street.value,
        description: description.value,
        label: label.value,
        isDefault: isDefault.value,
        createdAt: props.address?.createdAt || new Date().toISOString()
      }

      emit('save', compiledAddress)
      resetForm()
    }

    function deleteAddress() {
      if (confirm('Are you sure you want to delete this address?')) {
        emit('delete')
      }
    }

    return {
      fullName,
      phoneNumber,
      region,
      province,
      city,
      barangay,
      street,
      description,
      label,
      isDefault,
      saveAddress,
      deleteAddress
    }
  }
}
</script>