<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-full max-h-[95vh] p-6 relative flex flex-col">
      <!-- Close Button -->
      <button @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition-colors z-50">
        &times;
      </button>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-6 h-full min-h-0">
        <!-- LEFT: User Details -->
        <div class="w-full lg:w-2/5 flex flex-col min-h-0">
          <h2 class="text-2xl font-bold text-green-700 border-b pb-2 mb-4">User Details</h2>

          <div class="flex-1 min-h-0">
            <!-- Profile Section -->
            <div class="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div class="relative flex-shrink-0">
                <img :src="computedProfilePicture" alt="Profile"
                  class="w-20 h-20 rounded-full object-cover border-3 border-green-200 shadow-md"
                  onerror="this.src=defaultAvatar" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-lg text-gray-800 truncate">{{ fullName }}</h3>

                  <!-- Dynamic status badge beside name -->
                  <span v-if="verificationStatus" :class="{
                    'bg-green-500 text-white': verificationStatus === 'verified',
                    'bg-yellow-400 text-white': verificationStatus === 'pending',
                    'bg-red-500 text-white': verificationStatus === 'rejected',
                    'bg-gray-400 text-white': verificationStatus === 'unverified'
                  }" class="rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium"
                    :title="getVerificationStatusText(verificationStatus)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path v-if="verificationStatus === 'verified'" fill-rule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />  
                      <circle v-else cx="10" cy="10" r="4" fill="currentColor" />
                    </svg>
                    <span>{{ getVerificationStatusText(verificationStatus) }}</span>
                  </span>
                </div>

                <p class="text-sm text-gray-600 truncate">{{ user.email }}</p>
              </div>
            </div>

            <!-- Account Information -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Information
              </h3>

              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div class="space-y-3">
                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">User ID</span>
                    </div>
                    <span class="font-mono text-sm text-gray-600 truncate max-w-32" :title="user.userId">{{ user.userId
                      }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Role</span>
                    </div>
                    <span class="text-sm text-gray-600 capitalize">{{ user.role }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Phone Number</span>
                    </div>
                    <span class="text-sm text-gray-600">{{ user.phoneNumber || 'Not provided' }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2v-6a2 2 0 00-2-2h-4" />
                      </svg>
                      <span class="font-medium text-gray-700 text-sm">Date Joined</span>
                    </div>
                    <span class="text-sm text-gray-600">{{ formatDate(user.createdAt) }}</span>
                  </div>

                  <div v-if="user.bannedUntil"
                    class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                      </svg>
                      <span class="font-medium text-red-700 text-sm">Banned Until</span>
                    </div>
                    <span class="text-sm text-red-600 font-medium">{{ formatDate(user.bannedUntil) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Address Section - Improved Horizontal Layout -->
            <div class="flex-1 min-h-0">
              <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address Information
              </h3>

              <div class="space-y-3 max-h-60 overflow-y-auto">
                <div v-if="addresses.length > 0">
                  <div v-for="(address, index) in addresses" :key="index"
                    class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <!-- Left Column - Address Details -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                          <h4 class="font-medium text-gray-800 text-sm truncate">
                            {{ address.fullName || 'No name' }}
                          </h4>
                          <span v-if="address.isDefault"
                            class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                            Default
                          </span>
                        </div>

                        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
                          <div class="flex items-start gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mt-0.5 text-gray-500 flex-shrink-0"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span class="truncate">{{ address.street || 'No street' }}</span>
                          </div>

                          <div class="flex items-start gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mt-0.5 text-gray-500 flex-shrink-0"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span class="truncate">{{ address.phoneNumber || 'No phone' }}</span>
                          </div>

                          <div class="flex items-start gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mt-0.5 text-gray-500 flex-shrink-0"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span class="truncate">{{ address.barangay || 'No barangay' }}</span>
                          </div>

                          <div class="flex items-start gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mt-0.5 text-gray-500 flex-shrink-0"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span class="truncate">{{ address.city || 'No city' }}, {{ address.province || 'No province'
                              }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Right Column - Additional Info -->
                      <div v-if="address.description"
                        class="md:w-1/3 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
                        <p class="font-medium text-gray-600 mb-1">Notes:</p>
                        <p class="line-clamp-3">{{ address.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p class="text-gray-500 text-sm">No addresses found</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Verification Review -->
        <div
          class="w-full lg:w-3/5 text-gray-800 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 flex flex-col min-h-0">
          <h2 class="text-2xl font-bold text-green-700 border-b pb-2 mb-4">Verification ID Review</h2>

          <div class="flex-1 min-h-0 overflow-y-auto">
            <div v-if="verificationRequest" class="space-y-4">
              <!-- Verification Status Badge -->
              <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <h3 class="font-semibold text-gray-700 text-sm mb-1">Verification Status</h3>
                  <div class="flex items-center gap-2">
                    <span :class="{
                      'bg-yellow-100 text-yellow-800': verificationRequest.status === 'pending',
                      'bg-green-100 text-green-800': verificationRequest.status === 'approved',
                      'bg-red-100 text-red-800': verificationRequest.status === 'rejected'
                    }" class="px-2 py-0.5 rounded-full text-xs font-medium">
                      {{ verificationRequest.status.toUpperCase() }}
                    </span>
                    <span v-if="verificationRequest.status === 'pending'" class="text-gray-500 text-xs">
                      (Under review)
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">
                    Submitted on: {{ formatDate(verificationRequest.submittedAt) }}
                  </p>
                </div>
                <div v-if="isAdmin && verificationRequest.status === 'pending'" class="flex gap-2">
                  <button @click="approveVerification"
                    class="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    Approve
                  </button>
                  <button @click="rejectVerification"
                    class="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>

              <!-- Rejection Reason (if rejected) -->
              <div v-if="verificationRequest.status === 'rejected' && verificationRequest.reason"
                class="bg-red-50 p-3 rounded-lg border border-red-200 text-sm">
                <h3 class="font-semibold text-red-700 mb-1">Rejection Reason</h3>
                <p class="text-red-600">{{ verificationRequest.reason }}</p>
                <button v-if="isAdmin" @click="resetVerification"
                  class="mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">
                  Allow Resubmission
                </button>
              </div>

              <!-- ID Document Section -->
              <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div class="mb-3">
                  <p class="text-xs text-gray-500 uppercase tracking-wider">ID Type</p>
                  <p class="font-medium text-sm">{{ formatIdType(verificationRequest.idType) }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <!-- Front ID Image -->
                  <div>
                    <p class="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Front Side
                    </p>
                    <div v-if="verificationRequest.frontImage" class="flex flex-col gap-1">
                      <div class="relative group">
                        <img :src="verificationRequest.frontImage" @click="openDocument(verificationRequest.frontImage)"
                          class="w-full h-40 object-contain rounded-lg border border-gray-300 cursor-pointer hover:shadow-md transition-all"
                          alt="Front ID">
                        <div
                          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button @click="openDocument(verificationRequest.frontImage)"
                            class="bg-white bg-opacity-90 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium shadow-md flex items-center gap-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            View Full
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-else
                      class="h-40 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                      <p class="text-gray-500 text-xs">Not provided</p>
                    </div>
                  </div>

                  <!-- Back ID Image -->
                  <div>
                    <p class="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Back Side
                    </p>
                    <div v-if="verificationRequest.backImage" class="flex flex-col gap-1">
                      <div class="relative group">
                        <img :src="verificationRequest.backImage" @click="openDocument(verificationRequest.backImage)"
                          class="w-full h-40 object-contain rounded-lg border border-gray-300 cursor-pointer hover:shadow-md transition-all"
                          alt="Back ID">
                        <div
                          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button @click="openDocument(verificationRequest.backImage)"
                            class="bg-white bg-opacity-90 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium shadow-md flex items-center gap-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            View Full
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-else
                      class="h-40 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                      <p class="text-gray-500 text-xs">Not provided</p>
                    </div>
                  </div>
                </div>

                <!-- Additional Verification Info -->
                <div v-if="verificationRequest.additionalInfo" class="mt-3 text-sm">
                  <p class="font-medium text-gray-700 mb-1">Additional Information:</p>
                  <p class="text-gray-600 bg-white p-2 rounded border border-gray-200 text-xs">{{
                    verificationRequest.additionalInfo }}</p>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-6">
              <div class="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-700">No Verification Request</h3>
                <p class="mt-1 text-gray-500 text-xs">This user hasn't submitted any ID verification documents yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rejection Modal -->
      <div v-if="showRejectionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-4 rounded-lg max-w-md w-full mx-4 shadow-xl">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-base text-gray-800">Reason for Rejection</h3>
            <button @click="showRejectionModal = false" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-xs text-gray-500 mb-2">Please provide a clear reason why this verification is being rejected.
          </p>
          <textarea v-model="rejectionReason"
            placeholder="Example: The ID photo is blurry and unreadable. Please submit a clearer copy of your government-issued ID."
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 mb-3 text-sm"></textarea>
          <div class="flex justify-end gap-2">
            <button @click="showRejectionModal = false"
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
              Cancel
            </button>
            <button @click="confirmRejection"
              class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm"
              :disabled="!rejectionReason">
              Submit Rejection
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserDetailsModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'approve', 'reject', 'update-user'],
  data() {
    return {
      defaultAvatar: '/default-avatar.png',
      verificationRequest: null,
      showRejectionModal: false,
      rejectionReason: '',
      addresses: []
    }
  },
  computed: {
    fullName() {
      return this.user.fullName || `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim()
    },
    computedProfilePicture() {
      const storedProfileImage = localStorage.getItem(`profileImage_${this.user.userId}`)
      if (storedProfileImage) return storedProfileImage

      if (this.user.profilePicture) {
        return this.user.profilePicture.startsWith('http')
          ? this.user.profilePicture
          : `/api/uploads/${this.user.profilePicture}`
      }

      return this.defaultAvatar
    },
    verificationStatus() {
      if (!this.verificationRequest) return 'unverified'
      return this.verificationRequest.status === 'approved' ? 'verified' :
        this.verificationRequest.status || 'unverified'
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadVerificationData()
          this.loadAddresses()
        }
      }
    }
  },
  methods: {
    getVerificationStatusText(status) {
      const statusMap = {
        'verified': 'Verified',
        'pending': 'Pending Review',
        'rejected': 'Rejected',
        'unverified': 'Not Verified'
      }
      return statusMap[status] || 'Not Verified'
    },
    loadVerificationData() {
      try {
        const stored = JSON.parse(localStorage.getItem(`user_${this.user.userId}`) || 'null') || this.user
        if (stored?.verification) {
          this.verificationRequest = stored.verification
          this.$emit('update-user', {
            ...stored,
            verificationStatus: stored.verification?.status || 'unverified',
            isVerified: stored.verification?.status === 'approved',
            submittedId: !!stored.verification
          })
        } else {
          this.verificationRequest = null
        }
      } catch (error) {
        console.error('Error loading verification data:', error)
        this.verificationRequest = null
      }
    },
    loadAddresses() {
      try {
        const storedAddresses = localStorage.getItem(`addresses_${this.user.userId}`)
        this.addresses = storedAddresses ? JSON.parse(storedAddresses) : []
      } catch (error) {
        console.error('Error loading addresses:', error)
        this.addresses = []
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '-'
      try {
        return new Date(dateStr).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {
        console.error('Error formatting date:', error)
        return '-'
      }
    },
    formatIdType(idType) {
      if (!idType) return 'Not specified'

      const types = {
        'passport': 'Passport',
        'drivers_license': "Driver's License",
        'national_id': 'National ID Card',
        'other': 'Other Government ID'
      }

      return types[idType] || idType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    },
    openDocument(url) {
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    },
    approveVerification() {
      try {
        const userData = JSON.parse(localStorage.getItem(`user_${this.user.userId}`) || '{}') || this.user
        const updatedUser = {
          ...userData,
          isVerified: true,
          verification: {
            ...userData.verification,
            status: 'approved',
            reviewedAt: new Date().toISOString()
          }
        }

        localStorage.setItem(`user_${this.user.userId}`, JSON.stringify(updatedUser))
        this.$emit('approve', this.user.userId)
        this.$emit('update-user', {
          ...updatedUser,
          verificationStatus: 'approved',
          isVerified: true,
          submittedId: true
        })

        this.loadVerificationData()
        alert('Verification approved successfully!')
      } catch (error) {
        console.error('Error approving verification:', error)
        alert('Error approving verification. Please try again.')
      }
    },
    rejectVerification() {
      this.showRejectionModal = true
    },
    confirmRejection() {
      if (this.rejectionReason) {
        try {
          const userData = JSON.parse(localStorage.getItem(`user_${this.user.userId}`) || '{}') || this.user
          const updatedUser = {
            ...userData,
            verification: {
              ...userData.verification,
              status: 'rejected',
              reason: this.rejectionReason,
              reviewedAt: new Date().toISOString()
            }
          }

          localStorage.setItem(`user_${this.user.userId}`, JSON.stringify(updatedUser))
          this.$emit('reject', {
            userId: this.user.userId,
            reason: this.rejectionReason
          })
          this.$emit('update-user', {
            ...updatedUser,
            verificationStatus: 'rejected',
            isVerified: userData.isVerified,
            submittedId: true
          })

          this.showRejectionModal = false
          this.rejectionReason = ''
          this.loadVerificationData()
          alert('Verification has been rejected.')
        } catch (error) {
          console.error('Error rejecting verification:', error)
          alert('Error rejecting verification. Please try again.')
        }
      }
    },
    resetVerification() {
      if (confirm('Are you sure you want to reset this verification?')) {
        try {
          const userData = JSON.parse(localStorage.getItem(`user_${this.user.userId}`) || '{}') || this.user
          const updatedUser = {
            ...userData,
            verification: undefined
          }

          localStorage.setItem(`user_${this.user.userId}`, JSON.stringify(updatedUser))
          this.$emit('update-user', {
            ...updatedUser,
            verificationStatus: 'unverified',
            submittedId: false
          })
          this.loadVerificationData()
        } catch (error) {
          console.error('Error resetting verification:', error)
          alert('Error resetting verification. Please try again.')
        }
      }
    }
  }
})
</script>