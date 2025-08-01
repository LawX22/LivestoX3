<!-- SignUp.vue -->
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
      class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl border border-white/30">
      <div class="flex flex-col lg:flex-row min-h-[600px]">
        <!-- Left side - Community info with carousel -->
        <div
          class="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-5 lg:w-2/5 flex flex-col justify-center text-white relative overflow-hidden">
          <!-- Decorative elements -->
          <div
            class="absolute top-0 right-0 w-20 h-20 bg-white opacity-15 rounded-full -translate-y-10 translate-x-10 animate-pulse">
          </div>
          <div
            class="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-15 rounded-full translate-y-6 -translate-x-6 animate-pulse">
          </div>
          <div class="absolute top-1/2 left-0 w-16 h-16 bg-white opacity-10 rounded-full -translate-x-8 animate-bounce"
            style="animation-delay: 2s"></div>

          <div class="relative z-10">
            <!-- Logo/Brand Area -->
            <div class="mb-5">
              <div class="flex items-center mb-3">
                <div
                  class="w-10 h-10 bg-white bg-opacity-80 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm">
                  <img src="/src/assets/vue.svg" alt="Logo" class="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h1 class="text-xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    Livestock</h1>
                  <p class="text-green-100 text-xs opacity-90">A platform for livestock animal transactions</p>
                </div>
              </div>
              <div class="h-0.5 w-12 bg-gradient-to-r from-white to-transparent rounded-full"></div>
            </div>

            <!-- Registration Steps Indicator -->
            <div class="mb-5">
              <div class="bg-white bg-opacity-10 rounded-xl p-3 backdrop-blur-sm">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-base font-semibold">Registration Progress</h3>
                  <span class="text-xs text-green-100">Step {{ currentStep }} of 3</span>
                </div>

                <!-- Progress bar -->
                <div class="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                  <div class="bg-white h-1.5 rounded-full transition-all duration-500 ease-in-out"
                    :style="`width: ${(currentStep / 3) * 100}%`">
                  </div>
                </div>

                <!-- Step labels -->
                <div class="flex justify-between mt-1.5 text-xs text-green-100">
                  <span :class="{ 'text-white font-medium': currentStep >= 1 }">Basic Info</span>
                  <span :class="{ 'text-white font-medium': currentStep >= 2 }">Account</span>
                  <span :class="{ 'text-white font-medium': currentStep >= 3 }">Verify</span>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <h2 class="text-lg font-bold mb-2 leading-tight">Start Your Journey</h2>
              <p class="text-green-100 mb-3 text-xs leading-relaxed">Join thousands of farmers and buyers building the
                future of agriculture together.</p>
            </div>

            <div class="mb-4">
              <h3 class="text-base font-semibold mb-2 flex items-center">
                <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                Why Choose Us?
              </h3>

              <ul class="space-y-1.5 mb-4">
                <li class="flex items-start group">
                  <div
                    class="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center mr-2.5 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-green-50 text-xs leading-relaxed">Trusted by verified members</span>
                </li>
                <li class="flex items-start group">
                  <div
                    class="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center mr-2.5 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-green-50 text-xs leading-relaxed">Fast & secure transactions</span>
                </li>
                <li class="flex items-start group">
                  <div
                    class="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center mr-2.5 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-green-50 text-xs leading-relaxed">24/7 expert support</span>
                </li>
                <li class="flex items-start group">
                  <div
                    class="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center mr-2.5 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-green-50 text-xs leading-relaxed">Modern farming insights</span>
                </li>
              </ul>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="text-center group">
                <div
                  class="bg-white bg-opacity-10 rounded-lg p-2.5 mb-1 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-300">
                  <p class="text-xl font-bold text-white mb-0.5">10k+</p>
                  <p class="text-xs text-green-100 font-medium tracking-wider">USERS</p>
                </div>
              </div>
              <div class="text-center group">
                <div
                  class="bg-white bg-opacity-10 rounded-lg p-2.5 mb-1 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-300">
                  <p class="text-xl font-bold text-white mb-0.5">50k+</p>
                  <p class="text-xs text-green-100 font-medium tracking-wider">DEALS</p>
                </div>
              </div>
              <div class="text-center group">
                <div
                  class="bg-white bg-opacity-10 rounded-lg p-2.5 mb-1 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-300">
                  <p class="text-xl font-bold text-white mb-0.5">24/7</p>
                  <p class="text-xs text-green-100 font-medium tracking-wider">SUPPORT</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Registration form -->
        <div class="p-4 lg:w-3/5 flex flex-col justify-center">
          <div class="max-w-md mx-auto w-full">
            <div class="mb-5 text-center">
              <h2
                class="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p class="text-gray-600 text-base">Join our growing community of farmers and buyers</p>
            </div>

            <!-- Step 1: Basic Information -->
            <div v-if="currentStep === 1">
              <div class="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <div>
                    <h3 class="font-semibold text-gray-800 text-xs mb-0.5">Personal Information</h3>
                    <p class="text-xs text-gray-600">Tell us about yourself</p>
                  </div>
                </div>
              </div>

              <form @submit.prevent="goToNextStep" class="space-y-4">
                <div class="grid grid-cols-2 gap-3">
                  <div class="group">
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">First Name *</label>
                    <input v-model="form.firstName" type="text" required placeholder="John"
                      class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                  </div>
                  <div class="group">
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Last Name *</label>
                    <input v-model="form.lastName" type="text" required placeholder="Doe"
                      class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                  </div>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone Number *
                    <button type="button" @click="showPhoneToast" class="ml-1 text-blue-500 hover:text-blue-600">
                      <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span class="text-gray-500 text-xs font-medium">+63</span>
                    </div>
                    <input v-model="form.phoneNumber" type="tel" required maxlength="10" @input="validatePhoneNumber"
                      placeholder="9123456789"
                      class="w-full pl-12 pr-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                  </div>
                  <p v-if="phoneError" class="text-xs text-red-500 mt-1 font-medium">{{ phoneError }}</p>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">Gender *</label>
                  <select v-model="form.gender" required
                    class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300">
                    <option disabled value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <button type="submit"
                  class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 text-xs rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                  <span class="flex items-center justify-center">
                    Continue
                    <svg class="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>

            <!-- Step 2: Account Details -->
            <div v-else-if="currentStep === 2">
              <div class="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  <div>
                    <h3 class="font-semibold text-gray-800 text-xs mb-0.5">Account Setup</h3>
                    <p class="text-xs text-gray-600">Create your login credentials</p>
                  </div>
                </div>
              </div>

              <form @submit.prevent="sendVerificationCode" class="space-y-4">
                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">Username *</label>
                  <input v-model="form.username" type="text" required placeholder="johndoe"
                    class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                  <p class="text-xs text-gray-500 mt-0.5">This will be your public profile name</p>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address *
                    <button type="button" @click="showEmailVerificationToast"
                      class="ml-1 text-amber-500 hover:text-amber-600">
                      <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </label>
                  <div class="relative">
                    <input v-model="form.email" type="email" required placeholder="your@email.com"
                      class="w-full px-3 py-2 pr-9 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                    <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                      <svg class="w-3 h-3 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Password *
                    <button type="button" @click="showPasswordRequirementsToast"
                      class="ml-1 text-blue-500 hover:text-blue-600">
                      <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </label>
                  <div class="relative">
                    <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                      placeholder="Create a strong password"
                      class="w-full px-3 py-2 pr-9 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                    <button @click="showPassword = !showPassword" type="button"
                      class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200">
                      <svg v-if="showPassword" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <svg v-else class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password *</label>
                  <div class="relative">
                    <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" required
                      placeholder="Confirm your password"
                      class="w-full px-3 py-2 pr-9 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                    <button @click="showConfirmPassword = !showConfirmPassword" type="button"
                      class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200">
                      <svg v-if="showConfirmPassword" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <svg v-else class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="passwordMismatch" class="text-xs text-red-500 mt-0.5 font-medium">Passwords do not match</p>
                </div>

                <div class="flex justify-between gap-3">
                  <button @click="goToPrevStep" type="button"
                    class="px-4 py-2 text-xs border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center">
                    <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button type="submit" :disabled="passwordMismatch || !isPasswordValid || !form.phoneNumber" :class="{
                    'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700': !passwordMismatch && isPasswordValid && form.phoneNumber,
                    'bg-gray-400 cursor-not-allowed': passwordMismatch || !isPasswordValid || !form.phoneNumber
                  }"
                    class="text-white py-2 px-4 text-xs rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center">
                    Send Verification Code
                    <svg class="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <!-- Step 3: Enhanced Email Verification -->
            <div v-else-if="currentStep === 3">
              <div class="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  <div>
                    <h3 class="font-semibold text-gray-800 text-xs mb-0.5">Email Verification Required</h3>
                    <p class="text-xs text-gray-600">Complete verification to activate your account</p>
                  </div>
                </div>
              </div>

              <div class="text-center mb-5">
                <div
                  class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4 shadow-lg">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Verify Your Email Address</h3>
                <p class="text-xs text-gray-600 mb-1">
                  We've sent a 6-digit verification code to:
                </p>
                <div class="bg-green-50 border border-green-200 rounded-lg p-2 mb-3 inline-block">
                  <p class="text-sm font-bold text-green-700">{{ form.email }}</p>
                </div>
                <p class="text-xs text-gray-500">
                  Please check your inbox (and spam folder) for the verification email.
                </p>
              </div>

              <form @submit.prevent="handleSignUp" class="space-y-5">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-3 text-center">Enter 6-Digit Verification
                    Code</label>
                  <div class="flex justify-center space-x-2 mb-2">
                    <input v-for="n in 6" :key="n" v-model="verificationCode[n - 1]" @input="handleCodeInput(n, $event)"
                      @keydown.delete="handleCodeDelete(n, $event)" type="text" maxlength="1"
                      class="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 shadow-sm" />
                  </div>
                  <p class="text-xs text-gray-500 text-center">Enter the code exactly as received in your email</p>
                </div>

                <div v-if="verificationError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                    <p class="text-xs text-red-700 font-medium">{{ verificationError }}</p>
                  </div>
                </div>

                <!-- Email Help Button -->
                <div class="text-center">
                  <button @click="showEmailHelpToast" type="button"
                    class="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline transition-colors duration-200 flex items-center mx-auto">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd" />
                    </svg>
                    Didn't receive the email?
                  </button>
                </div>

                <div class="flex justify-between gap-3">
                  <button @click="goToPrevStep" type="button"
                    class="px-4 py-2 text-xs border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center">
                    <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button type="submit" :disabled="!isVerificationCodeComplete" :class="{
                    'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg': isVerificationCodeComplete,
                    'bg-gray-400 cursor-not-allowed': !isVerificationCodeComplete
                  }"
                    class="text-white py-2 px-6 text-xs rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Create My Account
                  </button>
                </div>
              </form>
            </div>

            <!-- Already have an account link -->
            <p class="mt-5 text-center text-xs text-gray-600">
              Already have an account?
              <router-link to="/signin"
                class="text-green-600 font-semibold hover:text-green-500 transition-colors duration-200 hover:underline">
                Sign In
              </router-link>
            </p>
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
}

function removeToast(id: string) {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Form State
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

// Toast Functions
function showPhoneToast() {
  addToast({
    type: 'info',
    title: 'Philippine Phone Number Format',
    content: 'Enter your 10-digit mobile number without the country code (+63).',
    list: [
      'Most Philippine mobile numbers start with 9',
      'Example: 9123456789 for +63 9123456789',
      'Do not include spaces or dashes'
    ]
  })
}

function showEmailVerificationToast() {
  addToast({
    type: 'warning',
    title: 'Email Verification Required',
    content: 'You will need to verify this email address to complete your registration. Make sure you have access to this email account.'
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

function showEmailHelpToast() {
  addToast({
    type: 'info',
    title: 'Email Verification Help',
    content: 'Having trouble receiving the verification email? Try these steps:',
    list: [
      'Check your spam/junk folder',
      'Make sure the email address is correct',
      'Wait a few minutes for the email to arrive',
      'Contact support if the issue persists'
    ]
  })
}

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
  if (event.key === 'Backspace' && position > 1 && !verificationCode.value[position - 1]) {
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

  // Show success toast
  addToast({
    type: 'success',
    title: 'Verification Code Sent!',
    content: `A 6-digit verification code has been sent to ${form.value.email}. Please check your inbox and spam folder.`
  })

  console.log('Verification code sent to', form.value.email)
  isCodeSent.value = true
  goToNextStep()
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
    verificationError.value = 'Please enter the complete 6-digit verification code'
    return
  }

  // Combine verification code
  form.value.verificationCode = verificationCode.value.join('')

  // Simulate verification code validation (in real app, this would be verified server-side)
  if (form.value.verificationCode.length !== 6) {
    verificationError.value = 'Invalid verification code. Please enter all 6 digits.'
    return
  }

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
        verificationError.value = 'This email address is already registered'
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

  // Show success toast and redirect
  addToast({
    type: 'success',
    title: 'Account Created Successfully!',
    content: 'Your account has been created and verified. You can now sign in with your credentials.'
  })

  // Redirect after a short delay to show the success toast
  setTimeout(() => {
    router.push('/signin')
  }, 2000)
}
</script>