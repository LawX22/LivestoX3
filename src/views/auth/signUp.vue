<!-- SignUp.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
      <div class="flex flex-col">
        <!-- Header with logo -->
        <div class="bg-green-600 text-white p-6 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 16s.8 1 2 1 2-1 2-1"/><path d="M3 7h3m12 0h1.8M8 7h1m4 0h1m4 0h1.2M5 7l1 8h12l1-8"/><path d="M8 12l1-5h6l1 5"/>
          </svg>
          <h2 class="text-xl font-bold">Farmer's Marketplace</h2>
          <p class="text-xs text-green-100 mt-1">Connect with farmers and buyers</p>
        </div>
        
        <!-- Form content -->
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800">Create Account</h2>
            <div class="text-xs text-gray-500">
              Step {{ currentStep }} of 3
            </div>
          </div>
          
          <!-- Progress bar -->
          <div class="w-full bg-gray-200 rounded-full h-1.5 mb-6">
            <div 
              class="bg-green-600 h-1.5 rounded-full transition-all duration-300" 
              :style="`width: ${(currentStep / 3) * 100}%`">
            </div>
          </div>
          
          <!-- Step 1: Basic Information -->
          <div v-if="currentStep === 1" class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">First Name*</label>
                <input v-model="form.firstName" type="text" required
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Last Name*</label>
                <input v-model="form.lastName" type="text" required
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Phone Number*</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="text-gray-500 text-sm">+63</span>
                </div>
                <input 
                  v-model="form.phoneNumber" 
                  type="tel" 
                  required
                  maxlength="10"
                  @input="validatePhoneNumber"
                  class="w-full pl-12 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" 
                  placeholder="9123456789" />
              </div>
              <p v-if="phoneError" class="text-xs text-red-500 mt-1">{{ phoneError }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Gender*</label>
              <select v-model="form.gender" required
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent">
                <option disabled value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div class="pt-2">
              <button @click="goToNextStep" 
                class="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-sm rounded-md font-medium transition flex items-center justify-center">
                Continue
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 2: Account Details -->
          <div v-else-if="currentStep === 2" class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Username*</label>
              <input v-model="form.username" type="text" required
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" />
              <p class="text-xs text-gray-500 mt-1">This will be your public profile name</p>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Email*</label>
              <input v-model="form.email" type="email" required
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" />
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Password*</label>
              <div class="relative">
                <input 
                  v-model="form.password" 
                  :type="showPassword ? 'text' : 'password'" 
                  required
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" />
                <button 
                  @click="showPassword = !showPassword" 
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Password must contain:
                <ul class="list-disc list-inside pl-3">
                  <li :class="{'text-green-600': hasMinLength}">At least 8 characters</li>
                  <li :class="{'text-green-600': hasNumber}">At least 1 number</li>
                  <li :class="{'text-green-600': hasSpecialChar}">At least 1 special character</li>
                </ul>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Confirm Password*</label>
              <div class="relative">
                <input 
                  v-model="form.confirmPassword" 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  required
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" />
                <button 
                  @click="showConfirmPassword = !showConfirmPassword" 
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                  <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="passwordMismatch" class="text-xs text-red-500 mt-1">Passwords do not match</p>
            </div>

            <div class="flex justify-between pt-2">
              <button @click="goToPrevStep" type="button"
                class="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Back
              </button>
              <button @click="sendVerificationCode" :disabled="passwordMismatch || !isPasswordValid || !form.phoneNumber"
                :class="{
                  'bg-green-600 hover:bg-green-700': !passwordMismatch && isPasswordValid && form.phoneNumber,
                  'bg-gray-400 cursor-not-allowed': passwordMismatch || !isPasswordValid || !form.phoneNumber
                }"
                class="text-white py-1.5 px-4 text-sm rounded-md font-medium transition flex items-center">
                Send Code
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 3: Verification -->
          <div v-else-if="currentStep === 3" class="space-y-4">
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 class="mt-2 text-md font-medium text-gray-900">Verify Your Email</h3>
              <p class="mt-1 text-xs text-gray-500">
                We've sent a 6-digit code to <span class="font-medium">{{ form.email }}</span>.
                Enter it below to complete registration.
              </p>
            </div>

            <div class="flex justify-center">
              <div class="flex space-x-2">
                <input v-for="n in 6" :key="n" 
                  v-model="verificationCode[n-1]"
                  @input="handleCodeInput(n, $event)"
                  @keydown.delete="handleCodeDelete(n, $event)"
                  type="text" maxlength="1"
                  class="w-8 h-8 text-center text-sm font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent" />
              </div>
            </div>

            <div class="text-center text-xs">
              <p v-if="verificationError" class="text-red-500">{{ verificationError }}</p>
              <p class="text-gray-500 mt-1">
                Didn't receive a code? 
                <button @click="resendVerificationCode" class="text-green-600 hover:underline">Resend code</button>
              </p>
            </div>

            <div class="flex justify-between pt-3">
              <button @click="goToPrevStep" type="button"
                class="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Back
              </button>
              <button @click="handleSignUp" :disabled="!isVerificationCodeComplete"
                :class="{
                  'bg-green-600 hover:bg-green-700': isVerificationCodeComplete,
                  'bg-gray-400 cursor-not-allowed': !isVerificationCodeComplete
                }"
                class="text-white py-1.5 px-4 text-sm rounded-md font-medium transition flex items-center">
                Complete
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Already have an account link -->
          <div class="pt-4 text-center text-sm text-gray-600">
            Already have an account?
            <router-link to="/signin" class="text-green-600 hover:underline font-medium ml-1">
              Sign in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { SignUpForm, User } from '../../services/user'

const router = useRouter()

const currentStep = ref(1)
const verificationCode = ref(['', '', '', '', '', ''])
const verificationError = ref('')
const phoneError = ref('')
const isCodeSent = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref<SignUpForm>({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  gender: '',
  password: '',
  confirmPassword: '',
  verificationCode: ''
})

// Password validation
const hasMinLength = computed(() => form.value.password.length >= 8)
const hasNumber = computed(() => /\d/.test(form.value.password))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(form.value.password))
const isPasswordValid = computed(() => hasMinLength.value && hasNumber.value && hasSpecialChar.value)
const passwordMismatch = computed(() => form.value.password !== form.value.confirmPassword && form.value.confirmPassword.length > 0)

// Verification code handling
const isVerificationCodeComplete = computed(() => verificationCode.value.every(digit => digit !== ''))

// Phone number validation for Philippines (11 digits total: +63 + 10 digits)
function validatePhoneNumber() {
  // Remove any non-digit characters
  form.value.phoneNumber = form.value.phoneNumber.replace(/\D/g, '')
  
  // Validate length (10 digits for PH number without country code)
  if (form.value.phoneNumber.length > 10) {
    form.value.phoneNumber = form.value.phoneNumber.slice(0, 10)
  }
  
  // Check if it starts with 9 (most PH mobile numbers start with 9)
  if (form.value.phoneNumber.length > 0 && !form.value.phoneNumber.startsWith('9')) {
    phoneError.value = 'Philippine mobile numbers usually start with 9'
  } else if (form.value.phoneNumber.length < 10 && form.value.phoneNumber.length > 0) {
    phoneError.value = 'Philippine mobile numbers must be 10 digits'
  } else {
    phoneError.value = ''
  }
}

function handleCodeInput(position: number, event: Event) {
  const input = event.target as HTMLInputElement
  if (input.value) {
    if (position < 6) {
      const nextInput = document.querySelector(`input:nth-child(${position + 1})`) as HTMLInputElement
      nextInput?.focus()
    }
  }
}

function handleCodeDelete(position: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && position > 1 && !verificationCode.value[position-1]) {
    const prevInput = document.querySelector(`input:nth-child(${position - 1})`) as HTMLInputElement
    prevInput?.focus()
  }
}

function goToNextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function goToPrevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function sendVerificationCode() {
  if (passwordMismatch.value || !isPasswordValid.value || !form.value.phoneNumber || phoneError.value) return
  
  // Validate phone number is complete
  if (form.value.phoneNumber.length !== 10) {
    phoneError.value = 'Please enter a complete 10-digit Philippine mobile number'
    return
  }
  
  // In a real app, this would send an actual email with a code
  console.log('Verification code sent to', form.value.email)
  isCodeSent.value = true
  goToNextStep()
}

function resendVerificationCode() {
  console.log('Resending verification code to', form.value.email)
  verificationError.value = ''
  // Reset and generate new code in a real app
}

function generateUniqueUserId(existingIds: string[]): string {
  let id = ''
  let isUnique = false

  while (!isUnique) {
    id = Math.floor(100000 + Math.random() * 900000).toString()
    isUnique = !existingIds.includes(id)
  }

  return id
}

function generatePublicId(firstName: string, lastName: string): string {
  const base = `${firstName}.${lastName}`.toLowerCase().replace(/\s+/g, '')
  const random = Math.floor(100 + Math.random() * 900)
  return `${base}.${random}`
}

function handleSignUp() {
  if (!isVerificationCodeComplete.value) {
    verificationError.value = 'Please enter the complete verification code'
    return
  }

  // Combine verification code
  form.value.verificationCode = verificationCode.value.join('')

  // Check if passwords match
  if (form.value.password !== form.value.confirmPassword) {
    verificationError.value = 'Passwords do not match'
    return
  }

  // Check if email already exists
  const userIds = JSON.parse(localStorage.getItem('userIds') || '[]')
  for (const id of userIds) {
    const existing = localStorage.getItem(`user_${id}`)
    if (existing) {
      const user: User = JSON.parse(existing)
      if (user.email === form.value.email) {
        verificationError.value = 'Email already exists'
        return
      }
    }
  }

  // Create new user according to User interface
  const userId = generateUniqueUserId(userIds)
  const publicId = generatePublicId(form.value.firstName, form.value.lastName)
  const createdAt = new Date().toISOString()

  const newUser: User = {
    userId,
    publicId,
    email: form.value.email,
    password: form.value.password,
    role: 'Buyer', // Default role
    username: form.value.username,
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    phoneNumber: `+63${form.value.phoneNumber}`,
    gender: form.value.gender as 'Male' | 'Female' | 'Other', // Cast to match enum
    createdAt,
    isVerified: true,
    isBanned: false
  }

  // Save to localStorage
  localStorage.setItem(`user_${userId}`, JSON.stringify(newUser))
  userIds.push(userId)
  localStorage.setItem('userIds', JSON.stringify(userIds))

  // Redirect to sign in
  router.push('/signin')
}
</script>