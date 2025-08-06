<!-- SignIn.vue -->
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

            <!-- Image Carousel -->
            <div class="mb-5 relative">
              <div class="bg-white bg-opacity-10 rounded-xl p-3 backdrop-blur-sm">
                <div class="relative h-32 overflow-hidden rounded-xl">
                  <div class="flex transition-transform duration-500 ease-in-out h-full"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                    <div v-for="(image, index) in carouselImages" :key="index"
                      class="w-full h-full flex-shrink-0 relative">
                      <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover rounded-lg" />
                      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p class="text-white text-xs font-medium">{{ image.caption }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Navigation arrows -->
                  <button @click="previousSlide"
                    class="absolute left-1.5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-all duration-200">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button @click="nextSlide"
                    class="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-all duration-200">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <!-- Dots indicator -->
                  <div class="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                    <button v-for="(_image, index) in carouselImages" :key="index" @click="currentSlide = index" :class="[
                      'w-1.5 h-1.5 rounded-full transition-all duration-200',
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    ]"></button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <h2 class="text-lg font-bold mb-2 leading-tight">Welcome Back!</h2>
              <p class="text-green-100 mb-3 text-xs leading-relaxed">Continue your journey in smart agriculture with our
                trusted platform.</p>
            </div>

            <div class="mb-4">
              <h3 class="text-base font-semibold mb-2 flex items-center">
                <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                Secure Access
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
                  <span class="text-green-50 text-xs leading-relaxed">Protected by encryption</span>
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
                  <span class="text-green-50 text-xs leading-relaxed">Instant access to dashboard</span>
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
                  <span class="text-green-50 text-xs leading-relaxed">Multi-device synchronization</span>
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
                  <span class="text-green-50 text-xs leading-relaxed">Session management</span>
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

        <!-- Right side - Login form -->
        <div class="p-4 lg:w-3/5 flex flex-col justify-center">
          <div class="max-w-md mx-auto w-full">
            <div class="mb-5 text-center">
              <h2
                class="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                Welcome Back
              </h2>
              <p class="text-gray-600 text-base">Please enter your credentials to continue</p>
            </div>

            <div class="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <div>
                  <h3 class="font-semibold text-gray-800 text-xs mb-0.5">Secure Login</h3>
                  <p class="text-xs text-gray-600">Access your Livestock account securely</p>
                </div>
              </div>
            </div>

            <form @submit.prevent="handleSignIn" class="space-y-4">
              <div class="group">
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address *
                  <button type="button" @click="showEmailHelpToast" class="ml-1 text-blue-500 hover:text-blue-600">
                    <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </label>
                <div class="relative">
                  <input v-model="email" type="email" required placeholder="your@email.com"
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
                  <button type="button" @click="showPasswordHelpToast" class="ml-1 text-blue-500 hover:text-blue-600">
                    <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </label>
                <div class="relative">
                  <input v-model="password" :type="showPassword ? 'text' : 'password'" required
                    placeholder="Enter your password"
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

              <div class="flex items-center justify-between">
                <div class="flex items-center group">
                  <input id="remember-me" name="remember-me" type="checkbox" v-model="rememberMe"
                    class="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors cursor-pointer" />
                  <label for="remember-me"
                    class="ml-2 block text-xs text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors">
                    Remember me
                  </label>
                </div>
                <div class="text-xs">
                  <router-link to="/forgotPassword"
                    class="font-semibold text-green-600 hover:text-green-500 transition-colors duration-200 hover:underline">
                    Forgot password?
                  </router-link>
                </div>
              </div>

              <button type="submit" :disabled="isLoading" :class="{
                'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700': !isLoading,
                'bg-gray-400 cursor-not-allowed': isLoading
              }"
                class="w-full text-white py-2 text-xs rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                <span v-if="!isLoading" class="flex items-center justify-center">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign in to your account
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Signing in...
                </span>
              </button>
            </form>

            <!-- Already have an account link -->
            <p class="mt-5 text-center text-xs text-gray-600">
              Don't have an account?
              <router-link to="/signup"
                class="text-green-600 font-semibold hover:text-green-500 transition-colors duration-200 hover:underline">
                Create Account
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { defaultUsers, type User } from '../../services/user'

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

  // Auto remove after 5 seconds
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
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const currentSlide = ref(0)

// Carousel images
const carouselImages = ref([
  {
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Cattle farming',
    caption: 'Premium Cattle Breeding'
  },
  {
    src: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Sheep farming',
    caption: 'Quality Sheep & Goats'
  },
  {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Poultry farming',
    caption: 'Modern Poultry Solutions'
  },
  {
    src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Farm technology',
    caption: 'Smart Farm Technology'
  }
])

let autoSlideInterval: NodeJS.Timeout | null = null

// Toast Functions
const showEmailHelpToast = () => {
  addToast({
    type: 'info',
    title: 'Email Sign In Help',
    content: 'Use the email address you registered with to sign in.',
    list: [
      'Make sure there are no typos in your email',
      'Check if caps lock is on',
      'Contact support if you forgot your email'
    ]
  })
}

const showPasswordHelpToast = () => {
  addToast({
    type: 'info',
    title: 'Password Help',
    content: 'Having trouble with your password?',
    list: [
      'Passwords are case-sensitive',
      'Make sure caps lock is off',
      'Try using the show/hide password button',
      'Use "Forgot password?" if you can\'t remember'
    ]
  })
}

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselImages.value.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? carouselImages.value.length - 1 : currentSlide.value - 1
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 4000) // Change slide every 4 seconds
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})

// Sign in function
const handleSignIn = () => {
  isLoading.value = true

  // Simulate loading delay
  setTimeout(() => {
    const userIds: string[] = JSON.parse(localStorage.getItem('userIds') || '[]')
    const localUsers: User[] = userIds
      .map(id => {
        const data = localStorage.getItem(`user_${id}`)
        return data ? JSON.parse(data) : null
      })
      .filter(Boolean)

    // Combine default users and local users
    const users: User[] = [...defaultUsers, ...localUsers]

    const user = users.find(u => u.email === email.value && u.password === password.value)

    if (!user) {
      addToast({
        type: 'error',
        title: 'Sign In Failed',
        content: 'Invalid email or password. Please check your credentials and try again.',
        list: [
          'Verify your email address is correct',
          'Check if your password is correct',
          'Make sure caps lock is off',
          'Contact support if you continue having issues'
        ]
      })
      isLoading.value = false
      return
    }

    // Check if banned
    if (user.isBanned) {
      const now = new Date()
      const banEnd = user.bannedUntil ? new Date(user.bannedUntil) : null

      if (banEnd && now < banEnd) {
        const remainingDays = Math.ceil((banEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        addToast({
          type: 'error',
          title: 'Account Suspended',
          content: `Your account is temporarily suspended. Please try again in ${remainingDays} day(s).`,
          list: [
            'Contact support for more information',
            'Review our terms of service',
            'Wait for the suspension period to end'
          ]
        })
        isLoading.value = false
        return
      } else {
        user.isBanned = false
        user.bannedUntil = ''
        localStorage.setItem(`user_${user.userId}`, JSON.stringify(user))
      }
    }

    // Save current session
    localStorage.setItem('authUserId', user.userId)
    localStorage.setItem('user', JSON.stringify(user))

    // Show success toast
    addToast({
      type: 'success',
      title: 'Welcome Back!',
      content: `Successfully signed in as ${user.firstName} ${user.lastName}`
    })

    // Redirect based on role after a short delay
    setTimeout(() => {
      if (user.role === 'Admin') {
        router.push('/adminDashboard')
      } else {
        router.push('/dashboard')
      }
    }, 1500)

    isLoading.value = false
  }, 1000)
}
</script>