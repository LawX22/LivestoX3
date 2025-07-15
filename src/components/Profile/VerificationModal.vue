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
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Front Photo <span class="text-red-500">*</span>
          </label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <div v-if="!frontImagePreview" class="space-y-2">
              <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
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
            <input ref="frontInputRef" 
                   type="file" 
                   accept="image/*" 
                   @change="onFrontImageChange" 
                   class="hidden">
            <button @click="frontInputRef?.click()" 
                    class="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              {{ frontImagePreview ? 'Change Photo' : 'Upload Photo' }}
            </button>
          </div>
        </div>

        <!-- Back Photo Upload -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Back Photo <span class="text-red-500">*</span>
          </label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <div v-if="!backImagePreview" class="space-y-2">
              <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
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
            <input ref="backInputRef" 
                   type="file" 
                   accept="image/*" 
                   @change="onBackImageChange" 
                   class="hidden">
            <button @click="backInputRef?.click()" 
                    class="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              {{ backImagePreview ? 'Change Photo' : 'Upload Photo' }}
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-sm text-red-700">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-3">
          <p class="text-sm text-green-700">{{ successMessage }}</p>
        </div>

        <!-- Loading State -->
        <div v-if="isSubmitting" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div class="flex items-center">
            <svg class="animate-spin w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-sm text-blue-700">Processing verification...</p>
          </div>
        </div>

        <!-- Privacy Notice -->
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-gray-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
            <div>
              <h4 class="text-sm font-medium text-gray-800">Privacy & Security</h4>
              <p class="text-xs text-gray-600 mt-1">
                Your ID information is encrypted and stored securely. We only use this information for account verification purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 p-6 border-t bg-gray-50">
        <button @click="closeModal" 
                :disabled="isSubmitting"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
          Cancel
        </button>
        <button @click="submitVerification" 
                :disabled="!canSubmit || isSubmitting"
                class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isSubmitting ? 'Submitting...' : 'Submit Verification' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface VerificationData {
  idType: string
  frontImage: string
  backImage: string
}

interface VerificationRecord extends VerificationData {
  userId: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
  reviewedBy: string | null
  reviewedAt: string | null
  comments: string | null
}

interface Props {
  visible: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'verify', data: VerificationData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const formData = ref({
  idType: '',
  frontImage: '',
  backImage: ''
})

// File inputs
const frontInputRef = ref<HTMLInputElement | null>(null)
const backInputRef = ref<HTMLInputElement | null>(null)

// Preview images
const frontImagePreview = ref<string | null>(null)
const backImagePreview = ref<string | null>(null)

// UI state
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Computed properties
const canSubmit = computed(() => {
  return formData.value.idType && 
         formData.value.frontImage && 
         formData.value.backImage
})

// Watch for modal visibility to reset form
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    resetForm()
  }
})

// Methods
const resetForm = () => {
  formData.value = {
    idType: '',
    frontImage: '',
    backImage: ''
  }
  frontImagePreview.value = null
  backImagePreview.value = null
  errorMessage.value = ''
  successMessage.value = ''
  isSubmitting.value = false
}

const closeModal = () => {
  if (!isSubmitting.value) {
    emit('close')
  }
}

const onFrontImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return
  
  // Validate file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    errorMessage.value = 'File size must be less than 10MB'
    return
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Please select a valid image file'
    return
  }
  
  errorMessage.value = ''
  
  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result as string
    formData.value.frontImage = result
    frontImagePreview.value = result
  }
  reader.readAsDataURL(file)
  
  // Reset input
  input.value = ''
}

const onBackImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return
  
  // Validate file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    errorMessage.value = 'File size must be less than 10MB'
    return
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Please select a valid image file'
    return
  }
  
  errorMessage.value = ''
  
  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result as string
    formData.value.backImage = result
    backImagePreview.value = result
  }
  reader.readAsDataURL(file)
  
  // Reset input
  input.value = ''
}

const removeFrontImage = () => {
  formData.value.frontImage = ''
  frontImagePreview.value = null
  if (frontInputRef.value) {
    frontInputRef.value.value = ''
  }
}

const removeBackImage = () => {
  formData.value.backImage = ''
  backImagePreview.value = null
  if (backInputRef.value) {
    backInputRef.value.value = ''
  }
}

const submitVerification = async () => {
  if (!canSubmit.value) return
  
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Get current user ID from localStorage
    const userId = localStorage.getItem('authUserId')
    if (!userId) {
      throw new Error('No authenticated user found')
    }
    
    // Prepare verification data
    const verificationData: VerificationData = {
      idType: formData.value.idType,
      frontImage: formData.value.frontImage,
      backImage: formData.value.backImage
    }
    
    // Create verification record with additional metadata
    const verificationRecord: VerificationRecord = {
      ...verificationData,
      userId: userId,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      reviewedBy: null,
      reviewedAt: null,
      comments: null
    }
    
    // Store verification data under the user's ID
    const userVerificationsKey = `user_${userId}_verifications`
    const existingVerifications = JSON.parse(localStorage.getItem(userVerificationsKey) || '[]') as VerificationRecord[]
    
    // Add new verification to user's verifications
    existingVerifications.push(verificationRecord)
    localStorage.setItem(userVerificationsKey, JSON.stringify(existingVerifications))
    
    // Also store in a general verification queue for admin review
    const verificationQueue = JSON.parse(localStorage.getItem('verificationQueue') || '[]') as VerificationRecord[]
    verificationQueue.push(verificationRecord)
    localStorage.setItem('verificationQueue', JSON.stringify(verificationQueue))
    
    // Update verification status in user profile
    const userKey = `user_${userId}`
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}')
    userData.verificationStatus = 'pending'
    localStorage.setItem(userKey, JSON.stringify(userData))
    
    successMessage.value = 'Verification submitted successfully! Please wait for admin approval.'
    
    // Emit the verification data to parent component
    emit('verify', verificationData)
    
    // Auto-close after success
    setTimeout(() => {
      if (props.visible) {
        closeModal()
      }
    }, 2000)
    
  } catch (error) {
    console.error('Verification submission error:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Failed to submit verification. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>