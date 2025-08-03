<!-- VerificationModal.vue -->
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
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click.self="closeModal"></div>

      <!-- Modal Container -->
      <div class="relative w-full max-w-4xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 transform transition-all duration-300 ease-out flex flex-col">
        
        <!-- Floating background elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-4 right-4 w-8 h-8 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div class="absolute top-12 right-16 w-6 h-6 bg-indigo-300 rounded-full opacity-15 animate-bounce" style="animation-delay: 1s"></div>
          <div class="absolute bottom-8 left-8 w-7 h-7 bg-purple-300 rounded-full opacity-25 animate-ping"></div>
        </div>

        <!-- Header - Fixed height -->
        <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white relative overflow-hidden flex-shrink-0">
          <!-- Header background elements -->
          <div class="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -translate-y-8 translate-x-8 animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-10 rounded-full translate-y-6 -translate-x-6 animate-pulse"></div>
          
          <div class="relative z-10 flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Account Verification
                </h3>
                <p class="text-blue-100 text-xs opacity-90">Verify your identity with government ID</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Area - Scrollable -->
        <div class="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-gray-50/50 to-white relative">
          <!-- Progress indicator -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Identity Verification</span>
              <span class="text-xs text-gray-500">Secure Process</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full w-full transition-all duration-500"></div>
            </div>
          </div>

          <!-- Instructions Banner -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200/50 mb-4">
            <div class="flex items-start">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-blue-800 mb-1">Verification Requirements</h4>
                <p class="text-xs text-blue-700">
                  Please provide a valid government-issued ID. Upload clear photos of both front and back sides.
                </p>
              </div>
            </div>
          </div>

          <!-- 2 Column Layout -->
          <div class="grid grid-cols-1 gap-4">
            <!-- ID Type Selection -->
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
              <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                ID Type Selection
              </h4>
              
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">
                  Select ID Type <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select
                    v-model="formData.idType"
                    class="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:border-gray-400 appearance-none"
                  >
                    <option value="">Choose ID Type</option>
                    <option value="drivers_license">🚗 Driver's License</option>
                    <option value="national_id">🆔 National ID (PhilID)</option>
                    <option value="passport">📔 Passport</option>
                    <option value="sss_id">🏛️ SSS ID</option>
                    <option value="postal_id">📮 Postal ID</option>
                    <option value="voters_id">🗳️ Voter's ID</option>
                    <option value="senior_citizen_id">👴 Senior Citizen ID</option>
                    <option value="pwd_id">♿ PWD ID</option>
                    <option value="barangay_id">🏘️ Barangay ID</option>
                    <option value="company_id">🏢 Company ID</option>
                    <option value="school_id">🎓 School ID</option>
                    <option value="tin_id">💼 TIN ID</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Photo Uploads - Side by Side -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Front Photo Upload -->
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  Front Photo Upload
                </h4>
                
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    Front Photo <span class="text-red-500">*</span>
                  </label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-500 transition-colors cursor-pointer" @click="triggerFrontInput">
                    <div v-if="!frontImagePreview" class="space-y-2">
                      <svg class="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <p class="text-xs text-gray-600">Click to upload front photo</p>
                      <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                    <div v-else class="relative">
                      <img :src="frontImagePreview" alt="Front ID" class="max-w-full max-h-24 mx-auto rounded border">
                      <button @click.stop="removeFrontImage"
                              class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                        ×
                      </button>
                    </div>
                    <input ref="frontInputRef" type="file" accept="image/*" @change="onFrontImageChange" class="hidden">
                  </div>
                  <button @click="triggerFrontInput" class="mt-2 w-full text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg py-2 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                    {{ frontImagePreview ? 'Change Photo' : 'Upload Photo' }}
                  </button>
                </div>
              </div>

              <!-- Back Photo Upload -->
              <div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
                <h4 class="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <div class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  Back Photo Upload
                </h4>
                
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    Back Photo <span class="text-red-500">*</span>
                  </label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-500 transition-colors cursor-pointer" @click="triggerBackInput">
                    <div v-if="!backImagePreview" class="space-y-2">
                      <svg class="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <p class="text-xs text-gray-600">Click to upload back photo</p>
                      <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                    <div v-else class="relative">
                      <img :src="backImagePreview" alt="Back ID" class="max-w-full max-h-24 mx-auto rounded border">
                      <button @click.stop="removeBackImage"
                              class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                        ×
                      </button>
                    </div>
                    <input ref="backInputRef" type="file" accept="image/*" @change="onBackImageChange" class="hidden">
                  </div>
                  <button @click="triggerBackInput" class="mt-2 w-full text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg py-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    {{ backImagePreview ? 'Change Photo' : 'Upload Photo' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Status Messages -->
            <div class="space-y-2">
              <!-- Error Message -->
              <div v-if="errorMessage" class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 border border-red-200/50">
                <div class="flex items-start">
                  <div class="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 000 2v4a1 1 0 102 0V7a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <p class="text-xs text-red-700 font-medium">{{ errorMessage }}</p>
                </div>
              </div>

              <!-- Success Message -->
              <div v-if="successMessage" class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200/50">
                <div class="flex items-start">
                  <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <p class="text-xs text-green-700 font-medium">{{ successMessage }}</p>
                </div>
              </div>

              <!-- Loading Message -->
              <div v-if="isSubmitting" class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200/50">
                <div class="flex items-start">
                  <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <svg class="animate-spin w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  </div>
                  <p class="text-xs text-blue-700 font-medium">Processing verification...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer - Fixed at bottom -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 flex justify-between items-center border-t border-gray-200/50 flex-shrink-0 backdrop-blur-sm">
          <div class="flex items-center text-xs text-gray-500">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            Secure & encrypted verification
          </div>
          
          <div class="flex items-center space-x-3">
            <button
              @click="closeModal"
              :disabled="isSubmitting"
              class="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              @click="submitVerification"
              :disabled="!canSubmit || isSubmitting"
              class="px-6 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg v-if="!isSubmitting" class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ isSubmitting ? 'Submitting...' : 'Submit Verification' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type IDType = 
  | 'drivers_license'
  | 'national_id'
  | 'passport'
  | 'sss_id'
  | 'postal_id'
  | 'voters_id'
  | 'senior_citizen_id'
  | 'pwd_id'
  | 'barangay_id'
  | 'company_id'
  | 'school_id'
  | 'tin_id'
  | '';

interface FormData {
  idType: IDType;
  frontImage: string;
  backImage: string;
}

interface VerificationRecord {
  idType: IDType;
  frontImage: string;
  backImage: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface UserData {
  verificationStatus?: 'pending' | 'verified' | 'unverified';
  verification?: VerificationRecord;
  [key: string]: any;
}

export default defineComponent({
  name: 'VerificationModal',
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
      } as FormData,
      frontImagePreview: null as string | null,
      backImagePreview: null as string | null,
      isSubmitting: false,
      errorMessage: '',
      successMessage: '',
      originalOverflow: ''
    };
  },
  computed: {
    canSubmit(): boolean {
      return (
        !!this.formData.idType &&
        !!this.formData.frontImage &&
        !!this.formData.backImage
      );
    }
  },
  watch: {
    visible(visible: boolean) {
      if (visible) {
        this.lockBodyScroll();
        this.resetForm();
      } else {
        this.unlockBodyScroll();
      }
    }
  },
  beforeUnmount() {
    this.unlockBodyScroll();
  },
  methods: {
    lockBodyScroll(): void {
      this.originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    },
    unlockBodyScroll(): void {
      document.body.style.overflow = this.originalOverflow;
    },
    resetForm(): void {
      this.formData = {
        idType: '',
        frontImage: '',
        backImage: ''
      };
      this.frontImagePreview = null;
      this.backImagePreview = null;
      this.errorMessage = '';
      this.successMessage = '';
      this.isSubmitting = false;
    },
    closeModal(): void {
      if (!this.isSubmitting) {
        this.unlockBodyScroll();
        this.$emit('close');
      }
    },
    triggerFrontInput(): void {
      (this.$refs.frontInputRef as HTMLInputElement)?.click();
    },
    triggerBackInput(): void {
      (this.$refs.backInputRef as HTMLInputElement)?.click();
    },
    onFrontImageChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      
      if (!file) return;
      
      if (file.size > 10 * 1024 * 1024 || !file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file under 10MB';
        return;
      }

      this.errorMessage = '';
      const reader = new FileReader();
      reader.onload = () => {
        this.formData.frontImage = reader.result as string;
        this.frontImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      input.value = '';
    },
    onBackImageChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      
      if (!file) return;
      
      if (file.size > 10 * 1024 * 1024 || !file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file under 10MB';
        return;
      }

      this.errorMessage = '';
      const reader = new FileReader();
      reader.onload = () => {
        this.formData.backImage = reader.result as string;
        this.backImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      input.value = '';
    },
    removeFrontImage(): void {
      this.formData.frontImage = '';
      this.frontImagePreview = null;
    },
    removeBackImage(): void {
      this.formData.backImage = '';
      this.backImagePreview = null;
    },
    getCurrentUserId(): string {
      const userId = localStorage.getItem('authUserId');
      if (!userId) throw new Error('No user is logged in.');
      return userId;
    },
    async submitVerification(): Promise<void> {
      if (!this.canSubmit) return;

      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const userId = this.getCurrentUserId();
        const userData: UserData = JSON.parse(localStorage.getItem(`user_${userId}`) || '{}');
        
        // Create verification record
        const verificationRecord: VerificationRecord = {
          idType: this.formData.idType as IDType,
          frontImage: this.formData.frontImage,
          backImage: this.formData.backImage,
          status: 'pending',
          submittedAt: new Date().toISOString()
        };

        // Update user data
        userData.verificationStatus = 'pending';
        userData.verification = verificationRecord;
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        // Add to verification queue (for admin)
        const verificationQueue = JSON.parse(localStorage.getItem('verificationQueue') || '[]') as Array<{
          userId: string;
          idType: IDType;
          frontImage: string;
          backImage: string;
          status: 'pending' | 'approved' | 'rejected';
          submittedAt: string;
        }>;
        
        verificationQueue.push({
          userId,
          ...verificationRecord
        });
        localStorage.setItem('verificationQueue', JSON.stringify(verificationQueue));

        this.successMessage = 'Verification submitted successfully!';
        this.$emit('verify', this.formData);

        setTimeout(() => {
          if (this.visible) this.closeModal();
        }, 2000);

      } catch (err) {
        console.error('Verification error:', err);
        this.errorMessage = err instanceof Error ? err.message : 'Failed to submit verification. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
});
</script>