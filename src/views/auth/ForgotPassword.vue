<!-- ForgotPassword.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center p-3 relative overflow-hidden">
    <!-- Toast Container -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div v-for="toast in toasts" :key="toast.id" :class="[
        'max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4 transform transition-all duration-300 ease-in-out',
        toast.type === 'info' && 'border-blue-400',
        toast.type === 'warning' && 'border-amber-400',
        toast.type === 'error' && 'border-red-400',
        toast.type === 'success' && 'border-green-400'
      ]">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Info Icon -->
            <svg v-if="toast.type === 'info'" class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd" />
            </svg>
            <!-- Warning Icon -->
            <svg v-else-if="toast.type === 'warning'" class="w-5 h-5 text-amber-500" fill="currentColor"
              viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
            <!-- Error Icon -->
            <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-500" fill="currentColor"
              viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
            <!-- Success Icon -->
            <svg v-else-if="toast.type === 'success'" class="w-5 h-5 text-green-500" fill="currentColor"
              viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ toast.title }}</h4>
            <div class="text-sm text-gray-700">
              <div v-if="toast.content" v-html="toast.content"></div>
              <ul v-if="toast.list" class="list-disc list-inside space-y-1 mt-2">
                <li v-for="item in toast.list" :key="item" class="text-xs">{{ item }}</li>
              </ul>
            </div>
          </div>
          <button @click="removeToast(toast.id)"
            class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
      <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-400 rounded-full opacity-35 animate-bounce"
        style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-emerald-400 rounded-full opacity-20 animate-pulse"
        style="animation-delay: 0.5s"></div>
      <div class="absolute top-1/4 left-1/3 w-14 h-14 bg-teal-400 rounded-full opacity-25 animate-bounce"
        style="animation-delay: 1.5s"></div>
    </div>

    <!-- Enhanced Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div
      class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-white/30">
      <!-- Main form content -->
      <div class="p-6">
        <div class="max-w-md mx-auto w-full">
          <!-- Step 1: Email Verification -->
          <div v-if="currentStep === 1">
            <div class="mb-6 text-center">
              <div class="flex items-center justify-center mb-4">
              </div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
              <p class="text-gray-600 text-sm">Enter your email to receive a password reset link</p>
            </div>

            <div class="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <div>
                  <h3 class="font-semibold text-gray-800 text-sm mb-0.5">Email Verification</h3>
                  <p class="text-xs text-gray-600">We'll send a secure reset link to your email</p>
                </div>
              </div>
            </div>

            <form @submit.prevent="sendResetCode" class="space-y-4">
              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                  <button type="button" @click="showEmailHelpToast" class="ml-1 text-blue-500 hover:text-blue-600">
                    <svg class="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </label>
                <div class="relative">
                  <input v-model="form.email" type="email" required placeholder="Enter your registered email"
                    class="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Make sure this is the email associated with your account</p>
              </div>

              <div v-if="emailError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                  <p class="text-sm text-red-700 font-medium">{{ emailError }}</p>
                </div>
              </div>

              <button type="submit" :disabled="!form.email || loading" :class="{
                'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700': form.email && !loading,
                'bg-gray-400 cursor-not-allowed': !form.email || loading
              }"
                class="w-full text-white py-3 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                <span class="flex items-center justify-center">
                  <span v-if="loading">Sending...</span>
                  <span v-else>Send Reset Link</span>
                  <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
            </form>
          </div>

          <!-- Step 2: Success Message -->
          <div v-else-if="currentStep === 2">
            <div class="mb-6 text-center">
              <div class="flex items-center justify-center mb-4">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p class="text-gray-600 text-sm">We've sent a password reset link to your email</p>
            </div>

            <div class="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <div>
                  <h3 class="font-semibold text-gray-800 text-sm mb-0.5">Reset Link Sent</h3>
                  <p class="text-xs text-gray-600">Click the link in your email to reset your password</p>
                </div>
              </div>
            </div>

            <div class="text-center mb-6">
              <p class="text-sm text-gray-600 mb-2">
                We've sent a password reset link to:
              </p>
              <div class="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 inline-block">
                <p class="text-sm font-bold text-green-700">{{ form.email }}</p>
              </div>
              <p class="text-xs text-gray-500 mb-4">
                The link will expire in 1 hour for security.
              </p>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h4 class="text-sm font-semibold text-gray-800 mb-2">What to do next:</h4>
                <ul class="text-xs text-gray-600 space-y-1">
                  <li class="flex items-start">
                    <svg class="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Check your email inbox (and spam folder)
                  </li>
                  <li class="flex items-start">
                    <svg class="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Click the "Reset Password" link in the email
                  </li>
                  <li class="flex items-start">
                    <svg class="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Create your new password
                  </li>
                </ul>
              </div>
            </div>

            <div class="text-center space-y-3">
              <button @click="resendResetLink" type="button" :disabled="loading"
                class="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-colors duration-200 flex items-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Didn't receive the email? Resend
              </button>

              <button @click="goToSignIn" type="button"
                class="w-full px-6 py-3 text-sm border-2 border-green-600 rounded-lg text-green-600 hover:bg-green-50 transition-all duration-300 font-semibold flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Back to Sign In
              </button>
            </div>
          </div>

          <!-- Back to Sign In link (only show on step 1) -->
          <p v-if="currentStep === 1" class="mt-6 text-center text-sm text-gray-600">
            Remember your password?
            <router-link to="/login"
              class="text-green-600 font-semibold hover:text-green-500 transition-colors duration-200 hover:underline">
              Sign In
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()

// Toast System
interface Toast {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  content?: string
  list?: string[]
}

const toasts = ref<Toast[]>([])

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substr(2, 9)
  toasts.value.push({ ...toast, id })
  
  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

const removeToast = (id: string) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Form State
const currentStep = ref(1)
const emailError = ref('')
const loading = ref(false)

// Form data
const form = ref({
  email: ''
})

// Toast Functions
const showEmailHelpToast = () => {
  addToast({
    type: 'info',
    title: 'Email Help',
    content: 'Make sure to enter the exact email address you used to register your account.',
    list: [
      'Check for typos in your email address',
      'Use the email you registered with',
      'Contact support if you forgot your email'
    ]
  })
}

// Navigation functions
const goToSignIn = () => {
  router.push('/login')
}

// Step 1: Send reset link via Supabase
const sendResetCode = async () => {
  emailError.value = ''
  loading.value = true
  
  try {
    // Send password reset email using Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(form.value.email, {
      redirectTo: `${window.location.origin}/reset-password`, // You can customize this redirect URL
    })
    
    if (error) {
      // Check if error is due to email not found
      if (error.message.includes('User not found') || error.message.includes('not found')) {
        emailError.value = 'No account found with this email address'
      } else {
        emailError.value = error.message
      }
      
      addToast({
        type: 'error',
        title: 'Error',
        content: emailError.value
      })
      return
    }
    
    // Success - Supabase will send the reset email
    addToast({
      type: 'success',
      title: 'Reset Link Sent!',
      content: `A password reset link has been sent to ${form.value.email}. Please check your inbox and spam folder.`
    })
    
    // Move to success step
    currentStep.value = 2
    
  } catch (err: any) {
    emailError.value = err.message || 'Failed to send reset link. Please try again.'
    addToast({
      type: 'error',
      title: 'Error',
      content: emailError.value
    })
  } finally {
    loading.value = false
  }
}

// Resend reset link
const resendResetLink = async () => {
  if (loading.value) return
  
  loading.value = true
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(form.value.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    
    if (error) {
      addToast({
        type: 'error',
        title: 'Error',
        content: error.message
      })
    } else {
      addToast({
        type: 'success',
        title: 'Link Resent!',
        content: 'A new password reset link has been sent to your email address.'
      })
    }
  } catch (err: any) {
    addToast({
      type: 'error',
      title: 'Error',
      content: err.message || 'Failed to resend link'
    })
  } finally {
    loading.value = false
  }
}
</script>