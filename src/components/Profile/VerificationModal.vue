<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-xl font-bold text-green-700">Account Verification</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Instructions -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            <div>
              <h4 class="text-sm font-medium text-blue-800">Verification Requirements</h4>
              <p class="text-sm text-blue-700 mt-1">
                Please provide a valid government-issued ID. Upload clear photos of both front and back sides.
              </p>
            </div>
          </div>
        </div>

        <!-- ID Type Selection -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Select ID Type <span class="text-red-500">*</span>
          </label>
          <select v-model="formData.idType"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Choose ID Type</option>
            <option value="drivers_license">Driver's License</option>
            <option value="national_id">National ID (PhilID)</option>
            <option value="passport">Passport</option>
            <option value="sss_id">SSS ID</option>
            <option value="postal_id">Postal ID</option>
            <option value="voters_id">Voter's ID</option>
            <option value="senior_citizen_id">Senior Citizen ID</option>
            <option value="pwd_id">PWD ID</option>
            <option value="barangay_id">Barangay ID</option>
            <option value="company_id">Company ID</option>
            <option value="school_id">School ID</option>
            <option value="tin_id">TIN ID</option>
          </select>
        </div>

        <!-- Front Photo Upload -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Front Photo <span class="text-red-500">*</span></label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <div v-if="!frontImagePreview" class="space-y-2">
              <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-sm text-gray-600">Click to upload front photo</p>
              <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
            <div v-else class="relative">
              <img :src="frontImagePreview" alt="Front ID" class="max-w-full max-h-32 mx-auto rounded">
              <button @click="removeFrontImage"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                ×
              </button>
            </div>
            <input ref="frontInputRef" type="file" accept="image/*" @change="onFrontImageChange" class="hidden">
            <button @click="$refs.frontInputRef.click()" class="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              {{ frontImagePreview ? 'Change Photo' : 'Upload Photo' }}
            </button>
          </div>
        </div>

        <!-- Back Photo Upload -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Back Photo <span class="text-red-500">*</span></label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <div v-if="!backImagePreview" class="space-y-2">
              <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-sm text-gray-600">Click to upload back photo</p>
              <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
            <div v-else class="relative">
              <img :src="backImagePreview" alt="Back ID" class="max-w-full max-h-32 mx-auto rounded">
              <button @click="removeBackImage"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                ×
              </button>
            </div>
            <input ref="backInputRef" type="file" accept="image/*" @change="onBackImageChange" class="hidden">
            <button @click="$refs.backInputRef.click()" class="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              {{ backImagePreview ? 'Change Photo' : 'Upload Photo' }}
            </button>
          </div>
        </div>

        <!-- Error -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-sm text-red-700">{{ errorMessage }}</p>
        </div>

        <!-- Success -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-3">
          <p class="text-sm text-green-700">{{ successMessage }}</p>
        </div>

        <!-- Loading -->
        <div v-if="isSubmitting" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div class="flex items-center">
            <svg class="animate-spin w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <p class="text-sm text-blue-700">Processing verification...</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 p-6 border-t bg-gray-50">
        <button @click="closeModal" :disabled="isSubmitting"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
          Cancel
        </button>
        <button @click="submitVerification" :disabled="!canSubmit || isSubmitting"
                class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isSubmitting ? 'Submitting...' : 'Submit Verification' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'verify'],
  data() {
    return {
      formData: {
        idType: '',
        frontImage: '',
        backImage: ''
      },
      frontImagePreview: null,
      backImagePreview: null,
      isSubmitting: false,
      errorMessage: '',
      successMessage: ''
    }
  },
  computed: {
    canSubmit() {
      return (
        this.formData.idType &&
        this.formData.frontImage &&
        this.formData.backImage
      )
    }
  },
  watch: {
    visible(visible) {
      if (visible) this.resetForm()
    }
  },
  methods: {
    resetForm() {
      this.formData = {
        idType: '',
        frontImage: '',
        backImage: ''
      }
      this.frontImagePreview = null
      this.backImagePreview = null
      this.errorMessage = ''
      this.successMessage = ''
      this.isSubmitting = false
    },
    closeModal() {
      if (!this.isSubmitting) this.$emit('close')
    },
    onFrontImageChange(event) {
      const input = event.target
      const file = input.files?.[0]
      if (!file) return
      
      if (file.size > 10 * 1024 * 1024 || !file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file under 10MB'
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        this.formData.frontImage = reader.result
        this.frontImagePreview = reader.result
      }
      reader.readAsDataURL(file)
      input.value = ''
    },
    onBackImageChange(event) {
      const input = event.target
      const file = input.files?.[0]
      if (!file) return
      
      if (file.size > 10 * 1024 * 1024 || !file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file under 10MB'
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        this.formData.backImage = reader.result
        this.backImagePreview = reader.result
      }
      reader.readAsDataURL(file)
      input.value = ''
    },
    removeFrontImage() {
      this.formData.frontImage = ''
      this.frontImagePreview = null
    },
    removeBackImage() {
      this.formData.backImage = ''
      this.backImagePreview = null
    },
    getCurrentUserId() {
      const userId = localStorage.getItem('authUserId')
      if (!userId) throw new Error('No user is logged in.')
      return userId
    },
    async submitVerification() {
      if (!this.canSubmit) return

      this.isSubmitting = true
      this.errorMessage = ''
      this.successMessage = ''

      try {
        const userId = this.getCurrentUserId()
        const userData = JSON.parse(localStorage.getItem(`user_${userId}`)) || {}
        
        // Create verification record
        const verificationRecord = {
          idType: this.formData.idType,
          frontImage: this.formData.frontImage,
          backImage: this.formData.backImage,
          status: 'pending',
          submittedAt: new Date().toISOString()
        }

        // Update user data
        userData.verificationStatus = 'pending'
        userData.verification = verificationRecord
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData))

        // Add to verification queue (for admin)
        const verificationQueue = JSON.parse(localStorage.getItem('verificationQueue')) || []
        verificationQueue.push({
          userId,
          ...verificationRecord
        })
        localStorage.setItem('verificationQueue', JSON.stringify(verificationQueue))

        this.successMessage = 'Verification submitted successfully!'
        this.$emit('verify', this.formData)

        setTimeout(() => {
          if (this.visible) this.closeModal()
        }, 2000)

      } catch (err) {
        console.error('Verification error:', err)
        this.errorMessage = err?.message || 'Failed to submit verification. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>