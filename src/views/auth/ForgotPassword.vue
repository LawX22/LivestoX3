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
              <p class="text-gray-600 text-sm">Enter your email to receive a password reset code</p>
            </div>

            <div class="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <div>
                  <h3 class="font-semibold text-gray-800 text-sm mb-0.5">Email Verification</h3>
                  <p class="text-xs text-gray-600">We'll send a secure reset code to your email</p>
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

              <button type="submit" :disabled="!form.email" :class="{
                'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700': form.email,
                'bg-gray-400 cursor-not-allowed': !form.email
              }"
                class="w-full text-white py-3 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                <span class="flex items-center justify-center">
                  Send Reset Code
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
            </form>
          </div>

          <!-- Step 2: Verification Code -->
          <div v-else-if="currentStep === 2">
            <div class="mb-6 text-center">
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Verify Reset Code</h2>
              <p class="text-gray-600 text-sm">Enter the code sent to your email</p>
            </div>

            <div class="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <div>
                  <h3 class="font-semibold text-gray-800 text-sm mb-0.5">Code Verification</h3>
                  <p class="text-xs text-gray-600">Check your email for the 6-digit reset code</p>
                </div>
              </div>
            </div>

            <div class="text-center mb-6">
              <p class="text-sm text-gray-600 mb-2">
                We've sent a 6-digit reset code to:
              </p>
              <div class="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 inline-block">
                <p class="text-sm font-bold text-green-700">{{ form.email }}</p>
              </div>
              <p class="text-xs text-gray-500">
                The code will expire in 15 minutes for security.
              </p>
            </div>

            <form @submit.prevent="verifyResetCode" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3 text-center">Enter 6-Digit Reset
                  Code</label>
                <div class="flex justify-center space-x-3 mb-3">
                  <input v-for="n in 6" :key="n" v-model="resetCode[n - 1]" @input="handleCodeInput(n, $event)"
                    @keydown.delete="handleCodeDelete(n, $event)" type="text" maxlength="1"
                    class="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 shadow-sm" />
                </div>
                <p class="text-xs text-gray-500 text-center">Enter the code exactly as received in your email</p>
              </div>

              <div v-if="codeError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                  <p class="text-sm text-red-700 font-medium">{{ codeError }}</p>
                </div>
              </div>

              <div class="text-center">
                <button @click="resendCode" type="button"
                  class="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-colors duration-200 flex items-center mx-auto">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Didn't receive the code? Resend
                </button>
              </div>

              <div class="flex justify-between gap-3">
                <button @click="goToPrevStep" type="button"
                  class="px-6 py-3 text-sm border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button type="submit" :disabled="!isResetCodeComplete" :class="{
                  'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg': isResetCodeComplete,
                  'bg-gray-400 cursor-not-allowed': !isResetCodeComplete
                }"
                  class="text-white py-3 px-6 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Verify Code
                </button>
              </div>
            </form>
          </div>

          <!-- Step 3: New Password -->
          <div v-else-if="currentStep === 3">
            <div class="mb-6 text-center">
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Create New Password</h2>
              <p class="text-gray-600 text-sm">Choose a strong password for your account</p>
            </div>

            <div class="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                <div>
                  <h3 class="font-semibold text-gray-800 text-sm mb-0.5">Password Reset</h3>
                  <p class="text-xs text-gray-600">Create a secure password for your account</p>
                </div>
              </div>
            </div>

            <form @submit.prevent="resetPassword" class="space-y-4">
              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  New Password *
                  <button type="button" @click="showPasswordRequirementsToast"
                    class="ml-1 text-blue-500 hover:text-blue-600">
                    <svg class="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </label>
                <div class="relative">
                  <input v-model="form.newPassword" :type="showNewPassword ? 'text' : 'password'" required
                    placeholder="Create a strong password"
                    class="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                  <button @click="showNewPassword = !showNewPassword" type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200">
                    <svg v-if="showNewPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password *</label>
                <div class="relative">
                  <input v-model="form.confirmNewPassword" :type="showConfirmNewPassword ? 'text' : 'password'"
                    required placeholder="Confirm your new password"
                    class="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                  <button @click="showConfirmNewPassword = !showConfirmNewPassword" type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200">
                    <svg v-if="showConfirmNewPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                <p v-if="passwordMismatch" class="text-sm text-red-500 mt-1 font-medium">Passwords do not match</p>
              </div>

              <!-- Password Strength Indicator -->
              <div class="bg-gray-50 rounded-lg p-4 border">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Password Requirements:</h4>
                <div class="space-y-2">
                  <div class="flex items-center text-sm">
                    <svg :class="[hasMinLength ? 'text-green-500' : 'text-gray-400']" class="w-4 h-4 mr-2"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span :class="[hasMinLength ? 'text-green-700' : 'text-gray-600']">At least 8 characters</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <svg :class="[hasNumber ? 'text-green-500' : 'text-gray-400']" class="w-4 h-4 mr-2"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span :class="[hasNumber ? 'text-green-700' : 'text-gray-600']">Contains a number</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <svg :class="[hasSpecialChar ? 'text-green-500' : 'text-gray-400']" class="w-4 h-4 mr-2"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span :class="[hasSpecialChar ? 'text-green-700' : 'text-gray-600']">Contains special character</span>
                  </div>
                </div>
              </div>

              <div v-if="passwordError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                  <p class="text-sm text-red-700 font-medium">{{ passwordError }}</p>
                </div>
              </div>

              <div class="flex justify-between gap-3">
                <button @click="goToPrevStep" type="button"
                  class="px-6 py-3 text-sm border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button type="submit" :disabled="passwordMismatch || !isPasswordValid" :class="{
                  'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700': !passwordMismatch && isPasswordValid,
                  'bg-gray-400 cursor-not-allowed': passwordMismatch || !isPasswordValid
                }"
                  class="text-white py-3 px-6 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Reset Password
                </button>
              </div>
            </form>
          </div>

          <!-- Back to Sign In link -->
          <p class="mt-6 text-center text-sm text-gray-600">
            Remember your password?
            <router-link to="/signin"
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
import type { User } from '../../services/user'

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

function addToast(toast: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substr(2, 9)
  toasts.value.push({ ...toast, id })
  
  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

function removeToast(id: string) {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Form State
const currentStep = ref(1)
const resetCode = ref(['', '', '', '', '', ''])
const emailError = ref('')
const codeError = ref('')
const passwordError = ref('')
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)
const foundUser = ref<User | null>(null)

// Form data
const form = ref({
  email: '',
  newPassword: '',
  confirmNewPassword: ''
})

// Password validation
const hasMinLength = computed(() => form.value.newPassword.length >= 8)
const hasNumber = computed(() => /\d/.test(form.value.newPassword))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(form.value.newPassword))
const isPasswordValid = computed(() => hasMinLength.value && hasNumber.value && hasSpecialChar.value)
const passwordMismatch = computed(() => form.value.newPassword !== form.value.confirmNewPassword && form.value.confirmNewPassword.length > 0)

// Reset code validation
const isResetCodeComplete = computed(() => resetCode.value.every(digit => digit !== ''))

// Toast Functions
function showEmailHelpToast() {
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

function showPasswordRequirementsToast() {
  addToast({
    type: 'info',
    title: 'Password Requirements',
    content: 'Create a strong password that meets all the requirements below:',
    list: [
      'At least 8 characters long',
      'Contains at least 1 number (0-9)',
      'Contains at least 1 special character (!@#$%^&*)',
      'Mix of uppercase and lowercase letters (recommended)'
    ]
  })
}

// Navigation functions
function goToPrevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function goToNextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

// Code input handling
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
  if (event.key === 'Backspace' && position > 1 && !resetCode.value[position - 1]) {
    const prevInput = document.querySelector(`input:nth-child(${position - 1})`) as HTMLInputElement
    prevInput?.focus()
  }
}

// Step 1: Send reset code
function sendResetCode() {
  emailError.value = ''
  
  // Check if email exists in localStorage
  const userIds = JSON.parse(localStorage.getItem('userIds') || '[]')
  let userFound = false
  
  for (const id of userIds) {
    const userData = localStorage.getItem(`user_${id}`)
    if (userData) {
      const user: User = JSON.parse(userData)
      if (user.email.toLowerCase() === form.value.email.toLowerCase()) {
        foundUser.value = user
        userFound = true
        break
      }
    }
  }
  
  if (!userFound) {
    emailError.value = 'No account found with this email address'
    return
  }
  
  // Simulate sending reset code
  addToast({
    type: 'success',
    title: 'Reset Code Sent!',
    content: `A 6-digit reset code has been sent to ${form.value.email}. Please check your inbox and spam folder.`
  })
  
  console.log('Reset code sent to:', form.value.email)
  goToNextStep()
}

// Step 2: Verify reset code
function verifyResetCode() {
  codeError.value = ''
  
  if (!isResetCodeComplete.value) {
    codeError.value = 'Please enter the complete 6-digit reset code'
    return
  }
  
  const enteredCode = resetCode.value.join('')
  
  // Simulate code verification (in real app, this would be verified server-side)
  // For demo purposes, accept any 6-digit code
  if (enteredCode.length !== 6) {
    codeError.value = 'Invalid reset code. Please enter all 6 digits.'
    return
  }
  
  addToast({
    type: 'success',
    title: 'Code Verified!',
    content: 'Your reset code has been verified. You can now create a new password.'
  })
  
  goToNextStep()
}

// Step 3: Reset password
function resetPassword() {
  passwordError.value = ''
  
  if (passwordMismatch.value) {
    passwordError.value = 'Passwords do not match'
    return
  }
  
  if (!isPasswordValid.value) {
    passwordError.value = 'Password does not meet the requirements'
    return
  }
  
  if (!foundUser.value) {
    passwordError.value = 'Session expired. Please start over.'
    return
  }
  
  // Update user password in localStorage
  const updatedUser: User = {
    ...foundUser.value,
    password: form.value.newPassword
  }
  
  localStorage.setItem(`user_${foundUser.value.userId}`, JSON.stringify(updatedUser))
  
  addToast({
    type: 'success',
    title: 'Password Reset Successfully!',
    content: 'Your password has been updated. You can now sign in with your new password.'
  })
  
  // Redirect to sign in after a short delay
  setTimeout(() => {
    router.push('/signin')
  }, 2000)
}

// Resend code function
function resendCode() {
  addToast({
    type: 'info',
    title: 'Code Resent!',
    content: 'A new reset code has been sent to your email address.'
  })
  
  console.log('Reset code resent to:', form.value.email)
}
</script>