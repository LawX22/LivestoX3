<!-- userProfile.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
    <!-- Sticky NavBar  -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <NavBar />
    </div>

    <!-- Toast Notification (Success and Error) -->
    <Toast 
      :visible="showToast" 
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      @close="showToast = false" 
    />

    <!-- Main content container with padding for navbar -->
    <div class="pt-16 relative">
      <!-- Floating Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
        <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
        <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-400 rounded-full opacity-35 animate-bounce"
          style="animation-delay: 1s"></div>
        <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-emerald-400 rounded-full opacity-20 animate-pulse"
          style="animation-delay: 0.5s"></div>
      </div>

      <!-- Background Pattern -->
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

      <!-- Skeleton Loading State -->
      <div v-if="loading" class="max-w-7xl mx-auto p-6 pt-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Main Profile Skeleton -->
          <div class="lg:col-span-3">
            <!-- Profile Header Skeleton -->
            <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40 mb-6">
              <!-- Banner Skeleton -->
              <div class="relative h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]">
                <!-- Profile Picture Skeleton -->
                <div class="absolute -bottom-16 left-8 z-10">
                  <div class="w-32 h-32 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] border-4 border-white"></div>
                </div>
                
                <!-- Rating Badge Skeleton -->
                <div class="absolute top-4 right-4">
                  <div class="bg-white/95 rounded-2xl px-4 py-2 shadow-lg">
                    <div class="h-5 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                  </div>
                </div>
              </div>

              <!-- Profile Info Skeleton -->
              <div class="px-8 pt-20 pb-8">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <!-- Left Column Skeleton -->
                  <div class="lg:col-span-2">
                    <!-- Name Skeleton -->
                    <div class="mb-6">
                      <div class="h-10 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded mb-3"></div>
                      <div class="h-6 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded mb-4"></div>
                      
                      <!-- Rating Stars Skeleton -->
                      <div class="flex items-center gap-6 mb-4">
                        <div class="h-5 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                        <div class="h-4 w-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                      </div>

                      <!-- Contact Info Skeleton -->
                      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div class="h-4 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                        <div class="h-4 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Right Column Skeleton - Buttons -->
                  <div class="lg:col-span-1">
                    <div class="space-y-3">
                      <div class="h-12 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-xl"></div>
                      <div class="grid grid-cols-2 gap-2">
                        <div class="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-xl"></div>
                        <div class="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Details Skeleton -->
            <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
              <!-- Tabs Skeleton -->
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                <div class="flex space-x-4">
                  <div class="h-10 w-40 bg-white/20 rounded-lg"></div>
                  <div class="h-10 w-36 bg-white/10 rounded-lg"></div>
                  <div class="h-10 w-32 bg-white/10 rounded-lg"></div>
                  <div class="h-10 w-44 bg-white/10 rounded-lg"></div>
                </div>
              </div>

              <!-- Content Skeleton -->
              <div class="p-8 space-y-6">
                <div class="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                <div class="h-6 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                <div class="h-6 w-4/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div class="space-y-4">
                    <div class="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                    <div class="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                    <div class="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                  </div>
                  <div class="space-y-4">
                    <div class="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                    <div class="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                    <div class="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar Skeleton -->
          <div class="space-y-6">
            <!-- Verification Card Skeleton -->
            <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                <div class="h-6 w-48 bg-white/30 rounded"></div>
              </div>
              <div class="p-6 space-y-4">
                <div class="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-lg"></div>
              </div>
            </div>

            <!-- Addresses Card Skeleton -->
            <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                <div class="h-6 w-32 bg-white/30 rounded mb-2"></div>
                <div class="h-4 w-48 bg-white/20 rounded"></div>
              </div>
              <div class="p-6 space-y-4">
                <!-- Address Item Skeleton -->
                <div class="border border-gray-200 rounded-xl p-4">
                  <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-lg"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-5 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                      <div class="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                      <div class="h-4 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                    </div>
                  </div>
                </div>

                <!-- Add Address Button Skeleton -->
                <div class="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-lg mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-7xl mx-auto p-6 pt-8 relative z-10">
        <div class="bg-red-100 border-l-4 border-red-500 rounded-lg p-6 text-center">
          <div class="text-red-800 mb-4">{{ error }}</div>
          <button @click="loadUserData" 
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer">
            Retry
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else-if="user" class="max-w-7xl mx-auto p-6 pt-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Main Profile Card -->
          <div class="lg:col-span-3">
            <!-- Enhanced Profile Header with Larger Images and Ratings -->
            <div
              class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40 mb-6 transition-all duration-300 hover:shadow-3xl">
              <!-- Larger Banner Section -->
              <div class="relative">
                <!-- Banner with increased height -->
                <div class="relative h-48 overflow-hidden group cursor-pointer" @click="triggerBannerUpload">
                  <!-- Default Banner or Custom Image -->
                  <div v-if="user.bannerImage"
                    class="absolute inset-0 bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700"
                    :style="{ backgroundImage: `url('${user.bannerImage}')` }">
                    <!-- Enhanced gradient overlay -->
                    <div class="absolute inset-0 bg-gradient-to-br from-green-600/70 via-emerald-600/60 to-teal-600/70">
                    </div>
                  </div>

                  <!-- Default Banner with geometric patterns -->
                  <div v-else class="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500">
                    <!-- Modern geometric background -->
                    <div class="absolute inset-0 opacity-20">
                      <div
                        class="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16">
                      </div>
                      <div
                        class="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12">
                      </div>
                      <div class="absolute top-1/2 left-1/3 w-16 h-16 bg-white transform rotate-45"></div>
                      <div class="absolute top-1/4 right-1/4 w-12 h-12 bg-white rounded-full"></div>
                    </div>

                    <!-- Upload indicator -->
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div
                        class="text-center text-white opacity-70 group-hover:opacity-100 transition-all duration-300">
                        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <p class="text-sm font-semibold">Add Cover Photo</p>
                      </div>
                    </div>
                  </div>

                  <!-- Banner hover overlay -->
                  <div v-if="user.bannerImage"
                    class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div class="text-center text-white">
                      <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                      </div>
                      <p class="text-sm font-semibold">Change Cover Photo</p>
                    </div>
                  </div>

                  <!-- Upload Progress Indicator -->
                  <div v-if="uploadingBanner"
                    class="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div class="text-center text-white">
                      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-2"></div>
                      <p class="text-sm font-semibold">Uploading banner...</p>
                    </div>
                  </div>
                </div>

                <!-- Larger Profile Picture -->
                <div class="absolute -bottom-16 left-8 z-10">
                  <div class="relative w-32 h-32 group cursor-pointer" @click.stop="triggerProfileUpload">
                    <!-- Animated ring -->
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full animate-spin opacity-75"
                      style="animation-duration: 4s;"></div>

                    <!-- Profile Picture Container -->
                    <div
                      class="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm flex items-center justify-center m-0.5">
                      <template v-if="user.profilePicture">
                        <img :src="user.profilePicture" class="w-full h-full object-cover" alt="Profile" />
                        <div
                          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          </svg>
                        </div>
                      </template>

                      <template v-else>
                        <div class="text-center text-gray-400 group-hover:text-green-500 transition-all duration-300">
                          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div
                          class="absolute inset-0 border-3 border-dashed border-gray-300 group-hover:border-green-400 rounded-full">
                        </div>
                      </template>

                      <!-- Upload Progress Indicator -->
                      <div v-if="uploadingProfile"
                        class="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    </div>

                    <!-- Online status -->
                    <div class="absolute bottom-1 right-1 w-6 h-6 bg-green-400 border-3 border-white rounded-full">
                    </div>
                  </div>
                </div>

                <!-- Ratings Badge -->
                <div class="absolute top-4 right-4 z-10">
                  <div class="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/40">
                    <div class="flex items-center gap-2">
                      <div class="flex items-center">
                        <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span class="text-lg font-bold text-gray-900 ml-1">4.8</span>
                      </div>
                      <div class="text-sm text-gray-600">
                        <span class="font-semibold">247</span> reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Enhanced Profile Info Section with more spacing for larger profile pic -->
              <div class="px-8 pt-20 pb-8">
                <!-- Main Profile Content - Two Column Layout -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                  <!-- Left Column - Primary Info -->
                  <div class="lg:col-span-2">
                    <!-- Name and Verification -->
                    <div class="flex items-start justify-between mb-6">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                          <h1 class="text-4xl font-bold text-gray-900 tracking-tight">
                            {{ user.firstName }} {{ user.lastName }}
                          </h1>
                          <span v-if="user.verificationStatus === 'verified'"
                            class="inline-flex items-center text-blue-600 text-sm border border-blue-200 px-3 py-1 rounded-full bg-blue-50 font-medium">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verified
                          </span>
                        </div>

                        <!-- Role and Status -->
                        <div class="flex items-center gap-4 mb-4">
                          <p class="text-xl text-gray-700 font-medium">{{ user.role }}</p>
                          <div class="flex items-center text-green-600 text-sm">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            Active now
                          </div>
                        </div>

                        <!-- Rating Summary -->
                        <div class="flex items-center gap-6 mb-4">
                          <div class="flex items-center gap-2">
                            <div class="flex">
                              <svg v-for="n in 5" :key="n" 
                                :class="['w-5 h-5 fill-current', n <= 4 ? 'text-yellow-400' : 'text-gray-300']" 
                                viewBox="0 0 24 24">
                                <path
                                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <span class="text-lg font-semibold text-gray-900">4.8</span>
                            <span class="text-gray-600">out of 5</span>
                          </div>
                          <div class="text-sm text-gray-600">
                            Based on <span class="font-semibold text-gray-900">247 customer reviews</span>
                          </div>
                        </div>

                        <!-- Contact Info - Email is NOT editable, shown here -->
                        <div class="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Cebu City, Central Visayas, Philippines
                          </div>
                          <div class="flex items-center text-blue-600">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {{ user.email }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right Column - Action Buttons and Quick Actions -->
                  <div class="lg:col-span-1">
                    <!-- Primary Actions -->
                    <div class="space-y-3 mb-6">
                      <button @click="toggleEdit"
                        class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                        {{ editing ? 'Cancel Edit' : 'Edit Profile' }}
                      </button>

                      <div class="grid grid-cols-2 gap-2">
                        <button
                          class="bg-white border-2 border-gray-200 hover:border-green-400 text-gray-700 hover:text-green-600 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center cursor-pointer">
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Message
                        </button>
                        <button
                          class="bg-white border-2 border-gray-200 hover:border-purple-400 text-gray-700 hover:text-purple-600 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center cursor-pointer">
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Hidden File Inputs -->
              <input type="file" ref="bannerInput" accept="image/*" @change="handleBannerUpload" class="hidden" />
              <input type="file" ref="profileInput" accept="image/*" @change="handleProfileUpload" class="hidden" />
            </div>

            <!-- Profile Details Card -->
            <div ref="profileDetailsSection" class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
              <!-- Tabs -->
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <nav class="flex space-x-4">
                  <button
                    :class="['px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer', activeTab === 'profile' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10']"
                    @click="activeTab = 'profile'">
                    Profile Information
                  </button>
                  <button
                    :class="['px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer', activeTab === 'farmer' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10']"
                    @click="activeTab = 'farmer'">
                    Farm Information
                  </button>
                  <button v-if="user?.role === 'Farmer'"
                    :class="['px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer', activeTab === 'livestock' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10']"
                    @click="activeTab = 'livestock'">
                    Livestock Posts
                  </button>
                  <button
                    :class="['px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer', activeTab === 'reviews' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10']"
                    @click="activeTab = 'reviews'">
                    Reviews & Ratings
                  </button>
                </nav>
              </div>

              <!-- Profile Info Tab - Pass userEmail separately to make it read-only -->
              <ProfileInfoTab v-if="activeTab === 'profile'" 
                :user="user" 
                v-model:editable-user="editableUser"
                :editing="editing" 
                :verificationStatus="user.verificationStatus || 'unverified'"
                :userEmail="user.email"
                @save-profile="saveProfile" 
                :upgradePending="upgradePending" />

              <!-- Farm Info Tab -->
              <FarmInfoTab v-if="activeTab === 'farmer'" :user="user" :editableUser="editableUser" :editing="editing"
                :verificationStatus="user.verificationStatus || 'unverified'" 
                :upgradePending="upgradePending" @upgrade="goToUpgradeForm" />

              <!-- Livestock Posts Tab (Farmer only) -->
              <LivestockPostsTab v-if="activeTab === 'livestock' && user?.role === 'Farmer'" :userId="user.userId" />

              <!-- Reviews & Ratings Tab -->
              <ReviewsRatingsTab v-if="activeTab === 'reviews'" :userId="user.userId" :userRole="user.role" />
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Verification Status Card -->
            <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <h3 class="text-lg font-semibold">Account Verification</h3>
              </div>

              <div class="p-6">
                <!-- Verified Status -->
                <div v-if="user.verificationStatus === 'verified'"
                  class="bg-green-100 border-l-4 border-green-500 rounded-lg p-4 mb-4">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-green-800">Account Verified</p>
                      <p class="text-xs text-green-700">Your account has been successfully verified</p>
                    </div>
                  </div>
                </div>

                <!-- Pending Status -->
                <div v-else-if="user.verificationStatus === 'pending'"
                  class="bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-blue-800">Verification Pending</p>
                      <p class="text-xs text-blue-700">Your verification request is being reviewed</p>
                    </div>
                  </div>
                  <div class="text-xs text-blue-600 mt-2">
                    <p>Submitted: {{ formatDate(user.verificationSubmittedAt) }}</p>
                  </div>
                </div>

                <!-- Rejected Status -->
                <div v-else-if="user.verificationStatus === 'rejected'"
                  class="bg-red-100 border-l-4 border-red-500 rounded-lg p-4 mb-4">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-red-800">Verification Rejected</p>
                      <p class="text-xs text-red-700">Your verification request was rejected</p>
                    </div>
                  </div>
                  <div v-if="user.verificationRejectionReason" class="text-xs text-red-600 mt-2">
                    <p>Reason: {{ user.verificationRejectionReason }}</p>
                  </div>
                  <button @click="openVerificationModal"
                    class="mt-3 w-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:from-red-700 hover:to-rose-700 transition cursor-pointer">
                    Resubmit Verification
                  </button>
                </div>

                <!-- Unverified Status -->
                <div v-else class="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-4 mb-4">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-yellow-800">Account Not Verified</p>
                      <p class="text-xs text-yellow-700">Please verify your account to access all features</p>
                    </div>
                  </div>
                  <button @click="openVerificationModal"
                    class="mt-3 w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:from-yellow-700 hover:to-amber-700 transition cursor-pointer">
                    Verify Account
                  </button>
                </div>
              </div>
            </div>

            <!-- Enhanced Addresses Card with Improved Default/Home Display -->
            <div
              class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 transition-all duration-300 hover:shadow-lg">
              <!-- Header with gradient background -->
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white relative overflow-hidden">
                <!-- Decorative elements -->
                <div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2">
                </div>
                <div
                  class="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2">
                </div>

                <div class="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 class="text-xl font-bold tracking-tight">My Addresses</h3>
                    <p class="text-emerald-100 text-sm opacity-90 mt-1">Manage your delivery addresses</p>
                  </div>
                  <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Address List -->
              <div class="p-6">
                <div v-if="addresses.length > 0" class="space-y-4">
                  <div v-for="(addr, index) in addresses" :key="index" @click="openAddressModal(addr, index)"
                    class="group relative border border-gray-200 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm">
                    <!-- Address type indicator - moved to top left -->
                    <div class="flex items-center gap-2 mb-2">
                      <!-- Home indicator (if labeled as home) -->
                      <div v-if="addr.label === 'Home'" class="flex items-center text-emerald-600">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="text-xs font-medium">Home</span>
                      </div>

                      <!-- Default badge - now more prominent -->
                      <div v-if="addr.isDefault"
                        class="flex items-center bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-xs font-medium">Default</span>
                      </div>
                    </div>

                    <!-- Address content -->
                    <div class="flex items-start space-x-3">
                      <!-- Icon -->
                      <div class="flex-shrink-0 mt-0.5">
                        <div
                          class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                      </div>

                      <!-- Address details -->
                      <div class="flex-1 overflow-hidden">
                        <h4 class="text-base font-semibold text-gray-900 break-words">
                          {{ addr.fullName || 'No name' }}
                        </h4>

                        <div class="mt-1 text-sm text-gray-600 space-y-1">
                          <div class="flex items-center">
                            <svg class="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span class="break-all">{{ addr.phoneNumber || 'No phone number' }}</span>
                          </div>

                          <div class="flex">
                            <svg class="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none"
                              stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span class="break-words">{{ formatAddress(addr) }}</span>
                          </div>

                          <div v-if="addr.description" class="flex items-start text-gray-500">
                            <svg class="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none"
                              stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="italic break-words">{{ addr.description }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Edit button (only shows on hover) -->
                    <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Empty state -->
                <div v-else class="text-center py-8">
                  <div class="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 class="text-lg font-medium text-gray-700 mb-1">No addresses saved</h4>
                  <p class="text-sm text-gray-500 max-w-xs mx-auto">Add your delivery addresses to make checkout faster
                  </p>
                </div>

                <!-- Add new address button -->
                <button @click="openAddressModal(null)"
                  class="mt-6 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add New Address</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No User Message -->
      <div v-else-if="!user && !loading && !error" class="max-w-7xl mx-auto p-6 pt-8 relative z-10">
        <div class="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-6 text-center">
          <div class="text-yellow-800 mb-4">No user is logged in.</div>
          <router-link to="/signin" class="text-blue-600 font-medium hover:underline cursor-pointer">Sign in</router-link>
          <span class="text-gray-600"> to view your profile.</span>
        </div>
      </div>

      <!-- Modals -->
      <AddressModal :visible="showAddressModal" :address="selectedAddress" @close="closeAddressModal"
        @save="handleAddressSave" @delete="handleAddressDelete" />

      <VerificationModal :visible="showVerificationModal" @close="closeVerificationModal"
        @verify="handleVerification" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ProfileService } from '@/services/profileService'
import NavBar from '../../components/NavBar.vue'
import AddressModal from '../../components/Profile/AddressModal.vue'
import VerificationModal from '../../components/Profile/VerificationModal.vue'
import ProfileInfoTab from '../../components/Profile/ProfileInfo.vue'
import FarmInfoTab from '../../components/Profile/FarmInfo.vue'
import LivestockPostsTab from '../../components/Profile/LivestockPosts.vue'
import ReviewsRatingsTab from '../../components/Profile/ReviewsRatings.vue'
import Toast from '../../components/Profile/Toast.vue'
import type { 
  User, 
  Address, 
  VerificationData 
} from '../../services/user'

const router = useRouter()
const authStore = useAuthStore()

// State
const user = ref<User | null>(null)
const editableUser = ref<Partial<User>>({})
const editing = ref(false)
const loading = ref(true)
const error = ref<string | null>(null)
const upgradePending = ref(false)
const addresses = ref<Address[]>([])
const activeTab = ref<'profile' | 'farmer' | 'livestock' | 'reviews'>('profile')
const showAddressModal = ref(false)
const selectedAddress = ref<Address | null>(null)
const selectedIndex = ref<number | null>(null)
const showVerificationModal = ref(false)
const bannerInput = ref<HTMLInputElement | null>(null)
const profileInput = ref<HTMLInputElement | null>(null)
const uploadingProfile = ref(false)
const uploadingBanner = ref(false)
const profileDetailsSection = ref<HTMLElement | null>(null)

// Toast notification state
const showToast = ref(false)
const toastType = ref<'success' | 'error'>('success')
const toastTitle = ref('Success!')
const toastMessage = ref('Operation completed successfully.')

// Methods
const displayToast = (type: 'success' | 'error', title: string, message: string) => {
  toastType.value = type
  toastTitle.value = title
  toastMessage.value = message
  showToast.value = true
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '—'
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const formatAddress = (addr: Address): string => {
  const parts = [addr.street, addr.barangay, addr.city, addr.province, addr.region].filter(Boolean)
  return parts.length ? parts.join(', ') : 'No location specified'
}

const toggleEdit = async (): Promise<void> => {
  if (editing.value && user.value) {
    const { addresses, email, ...userWithoutAddresses } = user.value
    editableUser.value = { ...userWithoutAddresses }
  }
  
  editing.value = !editing.value

  if (editing.value) {
    activeTab.value = 'profile'
    await nextTick()
    if (profileDetailsSection.value) {
      profileDetailsSection.value.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  }
}

const saveProfile = async (): Promise<void> => {
  if (!user.value || !editableUser.value) return

  try {
    const { addresses: _, email, ...profileData } = editableUser.value
    const result = await ProfileService.updateProfile(user.value.userId, profileData)
    
    if (result.success) {
      await loadUserData()
      editing.value = false
      displayToast('success', 'Profile Updated!', 'Your profile information has been successfully updated.')
    } else {
      displayToast('error', 'Update Failed', result.error || 'Failed to update profile. Please try again.')
    }
  } catch (error) {
    console.error('Error saving profile:', error)
    displayToast('error', 'Error Occurred', 'An unexpected error occurred while saving your profile.')
  }
}

const goToUpgradeForm = (): void => {
  router.push('/upgradeForm')
}

const triggerBannerUpload = (): void => {
  if (!uploadingBanner.value) {
    bannerInput.value?.click()
  }
}

const triggerProfileUpload = (): void => {
  if (!uploadingProfile.value) {
    profileInput.value?.click()
  }
}

const handleBannerUpload = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file && user.value) {
    uploadingBanner.value = true
    try {
      const result = await ProfileService.uploadBannerImage(user.value.userId, file)
      
      if (result.success && result.url) {
        await loadUserData()
        displayToast('success', 'Banner Updated!', 'Your cover photo has been successfully uploaded.')
      } else {
        displayToast('error', 'Upload Failed', result.error || 'Failed to upload banner image. Please try again.')
      }
    } catch (error) {
      console.error('Error uploading banner:', error)
      displayToast('error', 'Upload Error', 'An unexpected error occurred while uploading your banner.')
    } finally {
      uploadingBanner.value = false
    }
  }
  
  target.value = ''
}

const handleProfileUpload = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file && user.value) {
    uploadingProfile.value = true
    try {
      const result = await ProfileService.uploadProfilePicture(user.value.userId, file)
      
      if (result.success && result.url) {
        await loadUserData()
        displayToast('success', 'Profile Picture Updated!', 'Your profile picture has been successfully uploaded.')
      } else {
        displayToast('error', 'Upload Failed', result.error || 'Failed to upload profile picture. Please try again.')
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error)
      displayToast('error', 'Upload Error', 'An unexpected error occurred while uploading your profile picture.')
    } finally {
      uploadingProfile.value = false
    }
  }
  
  target.value = ''
}

const loadUserData = async (): Promise<void> => {
  loading.value = true
  error.value = null

  try {
    await authStore.initialize()

    if (!authStore.user) {
      console.log('No authenticated user found')
      loading.value = false
      return
    }

    const userId = authStore.userId
    if (!userId) {
      error.value = 'User ID not found'
      loading.value = false
      return
    }

    console.log('Loading profile for user:', userId)

    const profile = await ProfileService.getProfile(userId)
    
    if (profile) {
      console.log('Profile loaded successfully:', profile)
      user.value = profile
      
      const { addresses: _, email, ...userWithoutAddresses } = profile
      editableUser.value = { ...userWithoutAddresses }
      delete editableUser.value.password
      
      addresses.value = profile.addresses || []
    } else {
      error.value = 'Failed to load profile'
      console.error('Profile not found for user:', userId)
    }
  } catch (err) {
    console.error('Error loading user data:', err)
    error.value = 'An error occurred while loading your profile'
  } finally {
    loading.value = false
  }
}

const openAddressModal = (address: Address | null, index: number | null = null): void => {
  selectedAddress.value = address ? { ...address } : null
  selectedIndex.value = index
  showAddressModal.value = true
}

const closeAddressModal = (): void => {
  showAddressModal.value = false
  selectedAddress.value = null
  selectedIndex.value = null
}

const handleAddressSave = async (addressData: Address): Promise<void> => {
  if (!user.value) return

  try {
    let result: { success: boolean; error?: string; data?: Address }

    if (selectedIndex.value !== null && addresses.value[selectedIndex.value]?.id) {
      const addressId = addresses.value[selectedIndex.value].id!
      
      if (addressData.isDefault) {
        const otherAddresses = addresses.value.filter((_, idx) => idx !== selectedIndex.value)
        for (const addr of otherAddresses) {
          if (addr.isDefault && addr.id) {
            await ProfileService.updateAddress(addr.id, user.value.userId, { ...addr, isDefault: false })
          }
        }
      }
      
      result = await ProfileService.updateAddress(addressId, user.value.userId, addressData)
      
      if (result.success) {
        addresses.value[selectedIndex.value] = { ...addressData, id: addressId }
      }
    } else {
      result = await ProfileService.addAddress(user.value.userId, addressData)
      
      if (result.success && result.data) {
        addresses.value.push(result.data)
      }
    }

    if (result.success) {
      if (user.value) {
        user.value.addresses = [...addresses.value]
      }
      closeAddressModal()
      displayToast('success', 'Address Saved!', 'Your address has been successfully saved.')
    } else {
      displayToast('error', 'Save Failed', result.error || 'Failed to save address. Please try again.')
    }
  } catch (error) {
    console.error('Error saving address:', error)
    displayToast('error', 'Save Error', 'An unexpected error occurred while saving your address.')
  }
}

const handleAddressDelete = async (): Promise<void> => {
  if (selectedIndex.value === null || !user.value) return
  
  const addressToDelete = addresses.value[selectedIndex.value]
  if (!addressToDelete.id) {
    displayToast('error', 'Delete Failed', 'Cannot delete address without ID.')
    return
  }

  try {
    const result = await ProfileService.deleteAddress(addressToDelete.id, user.value.userId)
    
    if (result.success) {
      addresses.value.splice(selectedIndex.value, 1)
      
      if (user.value) {
        user.value.addresses = [...addresses.value]
      }
      closeAddressModal()
      displayToast('success', 'Address Deleted!', 'Your address has been successfully removed.')
    } else {
      displayToast('error', 'Delete Failed', result.error || 'Failed to delete address. Please try again.')
    }
  } catch (error) {
    console.error('Error deleting address:', error)
    displayToast('error', 'Delete Error', 'An unexpected error occurred while deleting your address.')
  }
}

const openVerificationModal = (): void => {
  showVerificationModal.value = true
}

const closeVerificationModal = (): void => {
  showVerificationModal.value = false
}

const handleVerification = async (verificationData: VerificationData): Promise<void> => {
  if (!user.value) return

  try {
    const result = await ProfileService.submitVerification(user.value.userId, verificationData)
    
    if (result.success) {
      await loadUserData()
      closeVerificationModal()
      displayToast('success', 'Verification Submitted!', 'Your verification request has been submitted and is under review.')
    } else {
      displayToast('error', 'Submission Failed', result.error || 'Failed to submit verification. Please try again.')
    }
  } catch (error) {
    console.error('Error submitting verification:', error)
    displayToast('error', 'Submission Error', 'An unexpected error occurred while submitting your verification.')
  }
}

watch(() => authStore.user, (newUser) => {
  if (newUser && !loading.value) {
    console.log('Auth state changed, reloading profile')
    loadUserData()
  } else if (!newUser) {
    console.log('User logged out')
    user.value = null
    loading.value = false
  }
}, { immediate: false })

onMounted(async () => {
  console.log('Component mounted, loading user data')
  await loadUserData()
})
</script>

