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
            class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer">
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
              <div class="bg-green-400 bg-opacity-30 rounded-xl p-3 backdrop-blur-sm">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-base font-semibold text-white">Registration Progress</h3>
                  <span class="text-xs text-white">Step {{ currentStep }} of 3</span>
                </div>

                <!-- Progress bar -->
                <div class="w-full bg-green-400 bg-opacity-40 rounded-full h-1.5">
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
                  class="bg-green-400 bg-opacity-30 rounded-lg p-2.5 mb-1 backdrop-blur-sm group-hover:bg-opacity-40 transition-all duration-300">
                  <p class="text-xl font-bold text-white mb-0.5">10k+</p>
                  <p class="text-xs text-white font-medium tracking-wider">USERS</p>
                </div>
              </div>
              <div class="text-center group">
                <div
                  class="bg-green-400 bg-opacity-30 rounded-lg p-2.5 mb-1 backdrop-blur-sm group-hover:bg-opacity-40 transition-all duration-300">
                  <p class="text-xl font-bold text-white mb-0.5">50k+</p>
                  <p class="text-xs text-white font-medium tracking-wider">DEALS</p>
                </div>
              </div>
              <div class="text-center group">
                <div
                  class="bg-green-400 bg-opacity-30 rounded-lg p-2.5 mb-1 backdrop-blur-sm group-hover:bg-opacity-40 transition-all duration-300">
                  <p class="text-xl font-bold text-white mb-0.5">24/7</p>
                  <p class="text-xs text-white font-medium tracking-wider">SUPPORT</p>
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
                class="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
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
                      class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-text" />
                  </div>
                  <div class="group">
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Last Name *</label>
                    <input v-model="form.lastName" type="text" required placeholder="Doe"
                      class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-text" />
                  </div>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone Number *
                    <button type="button" @click="showPhoneToast" class="ml-1 text-blue-500 hover:text-blue-600 cursor-pointer">
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
                      class="w-full pl-12 pr-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-text" />
                  </div>
                  <p v-if="phoneError" class="text-xs text-red-500 mt-1 font-medium">{{ phoneError }}</p>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">Gender *</label>
                  <select v-model="form.gender" required
                    class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-pointer">
                    <option disabled value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <button type="submit"
                  class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 text-xs rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 cursor-pointer">
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
                    class="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-text" />
                  <p class="text-xs text-gray-500 mt-0.5">This will be your public profile name</p>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address *
                    <button type="button" @click="showEmailVerificationToast"
                      class="ml-1 text-amber-500 hover:text-amber-600 cursor-pointer">
                      <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </label>
                  <div class="relative">
                    <input v-model="form.email" type="email" required placeholder="your@email.com" @blur="validateEmail"
                      class="w-full px-3 py-2 pr-9 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-text" />
                    <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                      <svg class="w-3 h-3 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                  <p v-if="emailError" class="text-xs text-red-500 mt-1 font-medium">{{ emailError }}</p>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Password *
                    <button type="button" @click="showPasswordRequirementsToast"
                      class="ml-1 text-blue-500 hover:text-blue-600 cursor-pointer">
                      <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </label>
                  <div class="relative">
                    <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required minlength="6"
                      placeholder="Create a password"
                      class="w-full px-3 py-2 pr-9 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-text" />
                    <button @click="showPassword = !showPassword" type="button"
                      class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200 cursor-pointer">
                      <svg v-if="showPassword" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <svg v-else class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <!-- Password strength indicator -->
                  <div v-if="form.password.length > 0" class="mt-2 space-y-1">
                    <div class="text-xs">
                      <span class="font-medium text-gray-700">Password Strength:</span>
                      <span v-if="passwordStrength === 'strong'" class="text-green-600 font-semibold"> Strong ✓</span>
                      <span v-else-if="passwordStrength === 'moderate'" class="text-amber-600 font-semibold">
                        Moderate</span>
                      <span v-else class="text-red-600 font-semibold"> Weak</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div :class="[
                        'h-1.5 rounded-full transition-all duration-300',
                        passwordStrength === 'strong' ? 'bg-green-500 w-full' :
                          passwordStrength === 'moderate' ? 'bg-amber-500 w-2/3' :
                            'bg-red-500 w-1/3'
                      ]"></div>
                    </div>
                    <!-- Warning if password is weak -->
                    <div v-if="passwordStrength !== 'strong'"
                      class="p-2 bg-amber-50 border border-amber-200 rounded-lg">
                      <div class="flex items-start">
                        <svg class="w-3 h-3 text-amber-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor"
                          viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                        </svg>
                        <div class="text-xs text-amber-700">
                          <p class="font-medium">Consider making your password stronger:</p>
                          <ul class="mt-1 space-y-0.5 text-xs">
                            <li v-if="!hasMinLength" class="flex items-center">
                              <svg class="w-2.5 h-2.5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clip-rule="evenodd" />
                              </svg>
                              Use at least 8 characters
                            </li>
                            <li v-if="!hasNumber" class="flex items-center">
                              <svg class="w-2.5 h-2.5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clip-rule="evenodd" />
                              </svg>
                              Add at least 1 number
                            </li>
                            <li v-if="!hasSpecialChar" class="flex items-center">
                              <svg class="w-2.5 h-2.5 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clip-rule="evenodd" />
                              </svg>
                              Add special characters (!@#$%^&*) for better security
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="group">
                  <label class="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password *</label>
                  <div class="relative">
                    <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" required
                      placeholder="Confirm your password"
                      class="w-full px-3 py-2 pr-9 text-xs border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 cursor-text" />
                    <button @click="showConfirmPassword = !showConfirmPassword" type="button"
                      class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200 cursor-pointer">
                      <svg v-if="showConfirmPassword" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <svg v-else class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="passwordMismatch" class="text-xs text-red-500 mt-0.5 font-medium">Passwords do not match</p>
                </div>

                <div class="flex justify-between gap-3">
                  <button @click="goToPrevStep" type="button"
                    class="px-4 py-2 text-xs border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center cursor-pointer">
                    <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button type="submit" :disabled="isSendingCode || passwordMismatch || form.password.length < 6 || !form.phoneNumber || !!emailError"
                    :class="{
                      'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 cursor-pointer': !isSendingCode && !passwordMismatch && form.password.length >= 6 && form.phoneNumber && !emailError,
                      'bg-gray-400 cursor-not-allowed': isSendingCode || passwordMismatch || form.password.length < 6 || !form.phoneNumber || !!emailError
                    }"
                    class="text-white py-2 px-4 text-xs rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center">
                    <span v-if="isSendingCode" class="mr-2">
                      <svg class="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                    </span>
                    {{ isSendingCode ? 'Sending Code...' : 'Send Verification Code' }}
                    <svg v-if="!isSendingCode" class="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <!-- Step 3: Enhanced Email Verification with Timer -->
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

                <!-- Timer Display -->
                <div v-if="timeRemaining > 0" class="mb-3">
                  <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-bold text-blue-700">Code expires in: {{ formatTime(timeRemaining) }}</span>
                  </div>
                </div>
                <div v-else class="mb-3">
                  <div class="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm font-bold text-red-700">Code has expired</span>
                  </div>
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
                      class="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 shadow-sm cursor-text" />
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

                <!-- Resend Code Button -->
                <div class="text-center">
                  <button 
                    @click="resendCode" 
                    type="button"
                    :disabled="!canResend || isResending"
                    :class="{
                      'text-blue-600 hover:text-blue-800 hover:underline cursor-pointer': canResend && !isResending,
                      'text-gray-400 cursor-not-allowed': !canResend || isResending
                    }"
                    class="text-xs font-semibold transition-colors duration-200 flex items-center mx-auto">
                    <svg v-if="!isResending" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <svg v-else class="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isResending ? 'Resending...' : canResend ? 'Resend Code' : `Resend in ${formatTime(timeRemaining)}` }}
                  </button>
                </div>

                <!-- Email Help Button -->
                <div class="text-center">
                  <button @click="showEmailHelpToast" type="button"
                    class="text-gray-600 hover:text-gray-800 text-xs font-semibold hover:underline transition-colors duration-200 flex items-center mx-auto cursor-pointer">
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
                    class="px-4 py-2 text-xs border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center cursor-pointer">
                    <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button type="submit" :disabled="isLoading" :class="{
                    'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg cursor-pointer': !isLoading,
                    'bg-gray-400 cursor-not-allowed': isLoading
                  }"
                    class="text-white py-2 px-6 text-xs rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center">
                    <span v-if="isLoading" class="mr-2">
                      <svg class="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                    </span>
                    <svg v-else class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ isLoading ? 'Creating Account...' : 'Create My Account' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Already have an account link -->
            <p class="mt-5 text-center text-xs text-gray-600">
              Already have an account?
              <router-link to="/login"
                class="text-green-600 font-semibold hover:text-green-500 transition-colors duration-200 hover:underline cursor-pointer">
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
import { auth } from '@/services/auth-service'
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

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

// Timer Management
const timeRemaining = ref(300) // 5 minutes in seconds (300 seconds)
const timerInterval = ref<number | null>(null)
const isResending = ref(false)

const canResend = computed(() => timeRemaining.value === 0)

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const startTimer = () => {
  // Clear any existing timer
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }

  timeRemaining.value = 300 // Reset to 5 minutes

  timerInterval.value = window.setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      if (timerInterval.value) {
        clearInterval(timerInterval.value)
        timerInterval.value = null
      }
    }
  }, 1000)
}

const resendCode = async () => {
  if (!canResend.value || isResending.value) return

  isResending.value = true
  verificationError.value = ''

  try {
    console.log('🔄 Resending verification code to:', form.value.email)
    
    const error = await auth.resendEmailOtp(form.value.email)

    if (error) {
      console.error('❌ Error resending code:', error)
      addToast({
        type: 'error',
        title: 'Failed to Resend Code',
        content: 'Unable to resend verification code. Please try again later.'
      })
    } else {
      // Clear the verification code inputs
      verificationCode.value = ['', '', '', '', '', '']
      
      // Restart the timer
      startTimer()

      addToast({
        type: 'success',
        title: 'Code Resent!',
        content: `A new verification code has been sent to ${form.value.email}. Please check your inbox.`
      })
      
      console.log('✅ Verification code resent successfully')
    }
  } catch (error) {
    console.error('❌ Unexpected error resending code:', error)
    addToast({
      type: 'error',
      title: 'Error',
      content: 'An unexpected error occurred. Please try again.'
    })
  } finally {
    isResending.value = false
  }
}

// Clean up timer on component unmount
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})

// Form State
const currentStep = ref(1)
const verificationCode = ref(['', '', '', '', '', ''])
const verificationError = ref('')
const phoneError = ref('')
const emailError = ref('')
const isCodeSent = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const isSendingCode = ref(false)

// Form interface
interface SignUpForm {
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  gender: string
  password: string
  confirmPassword: string
  verificationCode: string
}

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

// Password strength calculation
const passwordStrength = computed(() => {
  const password = form.value.password
  if (password.length < 6) return 'weak'

  let score = 0
  if (password.length >= 8) score += 1
  if (/\d/.test(password)) score += 1
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1

  if (score >= 4) return 'strong'
  if (score >= 2) return 'moderate'
  return 'weak'
})

const passwordMismatch = computed(() => form.value.password !== form.value.confirmPassword && form.value.confirmPassword.length > 0)

// Email validation function
const validateEmail = async () => {
  if (!form.value.email) {
    emailError.value = ''
    return
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  try {
    console.log('🔍 Checking if email is already in use:', form.value.email)
    
    const { available, error } = await auth.checkEmailAvailable(form.value.email)

    if (error) {
      console.error('❌ Error checking email:', error)
      emailError.value = 'Unable to verify email availability'
      return
    }

    if (!available) {
      emailError.value = 'This email is already registered. Please use a different email or sign in.'
      addToast({
        type: 'error',
        title: 'Email Already Registered',
        content: 'This email address is already associated with an account. Please sign in or use a different email address.'
      })
    } else {
      emailError.value = ''
      console.log('✅ Email is available')
    }
  } catch (error) {
    console.error('❌ Unexpected error checking email:', error)
    emailError.value = 'Unable to verify email availability'
  }
}

// Toast Functions
const showPhoneToast = () => {
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

const showEmailVerificationToast = () => {
  addToast({
    type: 'warning',
    title: 'Email Verification Required',
    content: 'You will need to verify this email address to complete your registration. Make sure you have access to this email account.'
  })
}

const showPasswordRequirementsToast = () => {
  addToast({
    type: 'info',
    title: 'Password Guidelines',
    content: 'Create a password that works for you. While any password with at least 6 characters will work, we recommend:',
    list: [
      'At least 8 characters long',
      'Contains at least 1 number (0-9)',
      'Contains at least 1 special character (!@#$%^&*)',
      'Mix of uppercase and lowercase letters',
      'Avoid common words or personal information'
    ]
  })
}

const showEmailHelpToast = () => {
  addToast({
    type: 'info',
    title: 'Email Verification Help',
    content: 'Having trouble receiving the verification email? Try these steps:',
    list: [
      'Check your spam/junk folder',
      'Make sure the email address is correct',
      'Wait a few minutes for the email to arrive',
      'Use the "Resend Code" button if the code expired',
      'Contact support if the issue persists'
    ]
  })
}

// Phone number validation for Philippines (11 digits total: +63 + 10 digits)
const validatePhoneNumber = () => {
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

const handleCodeInput = (position: number, event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.value) {
    if (position < 6) {
      const nextInput = input.parentElement?.children[position] as HTMLInputElement
      nextInput?.focus()
    }
  }
}

const handleCodeDelete = (position: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && position > 1 && !verificationCode.value[position - 1]) {
    const prevInput = (event.target as HTMLInputElement).parentElement?.children[position - 2] as HTMLInputElement
    prevInput?.focus()
  }
}

const goToNextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const goToPrevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    verificationError.value = ''
    
    // Stop timer if going back from step 3
    if (currentStep.value === 2 && timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
      timeRemaining.value = 300
    }
  }
}

const sendVerificationCode = async () => {
  // Prevent multiple submissions
  if (isSendingCode.value) return

  // Check if email is already taken
  if (emailError.value) {
    addToast({
      type: 'error',
      title: 'Email Already Registered',
      content: 'Please use a different email address or sign in to your existing account.'
    })
    return
  }

  // Validate email first
  await validateEmail()
  
  if (emailError.value) {
    return
  }

  // Only check basic requirements: password length and matching confirmation
  if (passwordMismatch.value || form.value.password.length < 6 || !form.value.phoneNumber || phoneError.value) return

  // Validate phone number is complete
  if (form.value.phoneNumber.length !== 10) {
    phoneError.value = 'Please enter a complete 10-digit Philippine mobile number'
    return
  }

  isSendingCode.value = true

  try {
    console.log('📝 Sending signup data:', {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      username: form.value.username,
      phoneNumber: form.value.phoneNumber,
      gender: form.value.gender,
      role: 'Buyer'
    })

    const { error } = await auth.signUp(form.value.email, form.value.password, {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      username: form.value.username,
      phoneNumber: form.value.phoneNumber,
      gender: form.value.gender,
      role: 'Buyer'
    })

    if (error) {
      console.error('❌ Error signing up:', error)
      
      // Handle specific error for existing email
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        emailError.value = 'This email is already registered'
        addToast({
          type: 'error',
          title: 'Email Already Registered',
          content: 'This email address is already associated with an account. Please sign in or use a different email.'
        })
      } else {
        addToast({
          type: 'error',
          title: 'Failed to Send Code',
          content: error.message || 'Unable to send verification code. Please try again later.'
        })
      }
      return
    }

    // Show success toast
    addToast({
      type: 'success',
      title: 'Verification Code Sent!',
      content: `A 6-digit verification code has been sent to ${form.value.email}. The code will expire in 5 minutes.`
    })

    console.log('✅ Verification code sent to:', form.value.email)
    isCodeSent.value = true
    
    // Start the countdown timer
    startTimer()
    
    goToNextStep()
  } catch (error) {
    console.error('❌ Error sending verification code:', error)
    addToast({
      type: 'error',
      title: 'Failed to Send Code',
      content: 'Unable to send verification code. Please try again later.'
    })
  } finally {
    isSendingCode.value = false
  }
}

const handleSignUp = async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  verificationError.value = ''

  try {
    // Combine verification code
    form.value.verificationCode = verificationCode.value.join('')

    // Check if code is complete
    if (form.value.verificationCode.length !== 6) {
      verificationError.value = 'Please enter the complete 6-digit code'
      return
    }

    // Check if passwords match
    if (form.value.password !== form.value.confirmPassword) {
      verificationError.value = 'Passwords do not match'
      return
    }

    // Check minimum password length (6 characters)
    if (form.value.password.length < 6) {
      verificationError.value = 'Password must be at least 6 characters long'
      return
    }

    const { error } = await auth.verifyEmailOtp(form.value.email, form.value.verificationCode)

    if (error) {
      verificationError.value = error.message || 'Verification failed. Please try again.'
      
      // If code expired, suggest resending
      if (error.message?.includes('expired')) {
        addToast({
          type: 'warning',
          title: 'Code Expired',
          content: 'Your verification code has expired. Please request a new one using the "Resend Code" button.'
        })
      } else {
        addToast({
          type: 'error',
          title: 'Verification Failed',
          content: error.message || 'There was an issue with your verification. Please try again.'
        })
      }
      return
    }

    // Clear the timer on successful verification
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }

    // Show success toast
    addToast({
      type: 'success',
      title: 'Account Created Successfully!',
      content: 'Your account has been created and verified. You can now sign in with your credentials.'
    })

    router.push('/login')
  } catch (error: any) {
    console.error('❌ Sign up error:', error)

    // Handle specific error cases
    if (error.message?.includes('email already exists')) {
      verificationError.value = 'This email address is already registered'
    } else if (error.message?.includes('username already taken')) {
      verificationError.value = 'This username is already taken. Please choose another.'
    } else {
      verificationError.value = 'Failed to create account. Please try again later.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>