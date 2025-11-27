<!-- upgradeForm.vue - COMPACT VERSION -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden p-3">
    <!-- Enhanced Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-16 h-16 bg-green-300/30 rounded-full blur-xl animate-pulse"></div>
      <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300/40 rounded-full blur-lg animate-bounce"></div>
      <div class="absolute bottom-32 right-20 w-20 h-20 bg-teal-300/20 rounded-full blur-xl animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-12 w-12 h-12 bg-emerald-400/25 rounded-full blur-xl animate-bounce" style="animation-delay: 0.5s"></div>
      <div class="absolute bottom-1/4 left-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-2xl animate-pulse" style="animation-delay: 1.5s"></div>
    </div>

    <!-- Enhanced Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Main Form Card with Enhanced Design -->
      <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/60 overflow-hidden">
        <!-- Animated Progress Bar -->
        <div class="relative h-1.5 bg-gradient-to-r from-gray-200 to-gray-100 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 animate-pulse"></div>
        </div>

        <!-- Enhanced Header Inside Card -->
        <div class="relative text-center py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
          <!-- Decorative circles -->
          <div class="absolute top-2 right-4 w-8 h-8 bg-green-200/30 rounded-full blur-sm"></div>
          <div class="absolute bottom-2 left-4 w-10 h-10 bg-teal-200/20 rounded-full blur-md"></div>
          
          <div class="relative inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-2 shadow-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3">
              </path>
            </svg>
          </div>
          <h1 class="text-xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
            Upgrade to Farmer Account
          </h1>
          <p class="text-gray-600 text-xs max-w-2xl mx-auto leading-relaxed px-4">
            Complete the form below to request an upgrade. Our team will review your application within 1-3 business days.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loadingData" class="flex items-center justify-center py-16">
          <div class="text-center">
            <div class="relative inline-flex items-center justify-center mb-4">
              <div class="absolute w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-ping"></div>
              <svg class="animate-spin w-12 h-12 text-green-600 relative z-10" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
            <p class="text-gray-700 text-sm font-semibold mb-1">Loading your information...</p>
            <p class="text-gray-500 text-xs">Please wait a moment</p>
          </div>
        </div>

        <!-- Already Has Pending Request Message -->
        <div v-else-if="hasPendingRequest" class="p-6">
          <div class="max-w-md mx-auto text-center">
            <div class="w-14 h-14 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg class="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900 mb-2">Request Already Pending</h2>
            <p class="text-gray-600 text-xs mb-4 leading-relaxed">
              You already have a pending upgrade request. Please wait for our admin team to review and approve your application.
            </p>
            <div class="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3 mb-5 shadow-sm">
              <div class="flex items-start gap-2">
                <div class="flex-shrink-0 w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-xs font-bold text-amber-900 mb-1">What happens next?</p>
                  <p class="text-xs text-amber-800 leading-relaxed">
                    Our team typically reviews upgrade requests within 1-3 business days. You'll receive a notification once your request is reviewed.
                  </p>
                </div>
              </div>
            </div>
            <button 
              @click="router.push('/marketplace')" 
              class="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Marketplace
            </button>
          </div>
        </div>

        <form v-else @submit.prevent="handleUpgradeRequest" class="flex flex-col">
          <!-- Main Content Area -->
          <div class="flex flex-col lg:flex-row">
            <!-- Left Side - Personal Info, Farm Details, Address (Scrollable) -->
            <div class="w-full lg:w-1/2 flex flex-col">
              <div class="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-280px)]">
                <!-- Personal Information Section -->
                <div class="space-y-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-3 rounded-lg border border-blue-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div class="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <span>Personal Information</span>
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                      <input v-model="form.fullName" type="text" readonly
                        class="w-full px-3 py-2 text-xs border-2 border-gray-200 bg-gray-50 rounded-lg focus:outline-none text-gray-600 font-medium shadow-sm cursor-not-allowed" />
                    </div>
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input v-model="form.phone" type="tel" readonly
                        class="w-full px-3 py-2 text-xs border-2 border-gray-200 bg-gray-50 rounded-lg focus:outline-none text-gray-600 font-medium shadow-sm cursor-not-allowed" />
                    </div>
                  </div>
                </div>

                <!-- Farm Information Section -->
                <div class="space-y-3 bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-3 rounded-lg border border-green-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div class="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                    </div>
                    <span>Farm Details</span>
                  </h3>

                  <div class="group">
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Farm Name *</label>
                    <input v-model="form.farmName" type="text" required
                      class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm hover:border-green-400 cursor-text"
                      placeholder="e.g., Green Valley Farm" />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Farm Size *</label>
                      <input v-model="form.farmSize" type="number" required min="0.1" step="0.1"
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm hover:border-green-400 cursor-text"
                        placeholder="0.0" />
                    </div>
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Unit *</label>
                      <select v-model="form.farmSizeUnit" required
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm hover:border-green-400 cursor-pointer">
                        <option value="" disabled>Select unit</option>
                        <option v-for="unit in farmSizeUnits" :key="unit" :value="unit">{{ unit }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="group">
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Type of Livestock *</label>
                    <div class="relative">
                      <select v-model="selectedLivestock" @change="addLivestockType"
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm hover:border-green-400 appearance-none cursor-pointer">
                        <option value="">Select livestock type</option>
                        <option v-for="type in livestockTypes" :key="type" :value="type" :disabled="form.livestockTypes.includes(type)">
                          {{ type }}
                        </option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    
                    <div v-if="form.livestockTypes.length > 0" class="mt-2 flex flex-wrap gap-1.5">
                      <div v-for="(type, index) in form.livestockTypes" :key="index" 
                           class="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs px-2.5 py-1 rounded-full border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                        <span class="font-semibold">{{ type }}</span>
                        <button type="button" @click="removeLivestockType(index)" class="ml-1.5 text-green-600 hover:text-green-800 hover:bg-green-200 rounded-full p-0.5 transition-colors cursor-pointer">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="group">
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Farm Description or Purpose *</label>
                    <textarea v-model="form.description" rows="3" required
                      class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none shadow-sm hover:border-green-400 cursor-text"
                      placeholder="Tell us about your farm, what you raise, and your farming experience..."></textarea>
                  </div>
                </div>

                <!-- Address Section -->
                <div class="space-y-3 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 p-3 rounded-lg border border-teal-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div class="w-7 h-7 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-md">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <span>Farm Address</span>
                  </h3>

                  <div v-if="userAddresses.length > 0" class="group">
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Select Saved Address (Optional)</label>
                    <select v-model="selectedAddressIndex" @change="applySelectedAddress"
                      class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-sm hover:border-teal-400 mb-2 cursor-pointer">
                      <option value="-1">— Enter New Address —</option>
                      <option v-for="(addr, idx) in userAddresses" :key="addr.id || idx" :value="idx">
                        {{ addr.label || 'Address' }} - {{ addr.street }}, {{ addr.barangay }}, {{ addr.city }}
                      </option>
                    </select>
                  </div>

                  <div v-if="selectedAddressIndex >= 0 && userAddresses[selectedAddressIndex]" class="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-2.5 text-xs shadow-sm">
                    <div class="grid grid-cols-2 gap-2">
                      <div class="flex items-center gap-1.5">
                        <span class="font-bold text-teal-700">Region:</span>
                        <span class="text-gray-700">{{ userAddresses[selectedAddressIndex].region }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <span class="font-bold text-teal-700">Province:</span>
                        <span class="text-gray-700">{{ userAddresses[selectedAddressIndex].province }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <span class="font-bold text-teal-700">City:</span>
                        <span class="text-gray-700">{{ userAddresses[selectedAddressIndex].city }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <span class="font-bold text-teal-700">Barangay:</span>
                        <span class="text-gray-700">{{ userAddresses[selectedAddressIndex].barangay }}</span>
                      </div>
                      <div class="col-span-2 flex items-center gap-1.5">
                        <span class="font-bold text-teal-700">Street:</span>
                        <span class="text-gray-700">{{ userAddresses[selectedAddressIndex].street }}</span>
                      </div>
                    </div>
                  </div>

                  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Region *</label>
                      <input v-model="form.region" required type="text" placeholder="e.g., Region VI"
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-sm hover:border-teal-400 cursor-text" />
                    </div>
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Province *</label>
                      <input v-model="form.province" required type="text" placeholder="e.g., Iloilo"
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-sm hover:border-teal-400 cursor-text" />
                    </div>
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                      <input v-model="form.city" required type="text" placeholder="e.g., Iloilo City"
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-sm hover:border-teal-400 cursor-text" />
                    </div>
                    <div class="group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Barangay *</label>
                      <input v-model="form.barangay" required type="text" placeholder="e.g., Mandurriao"
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-sm hover:border-teal-400 cursor-text" />
                    </div>
                    <div class="col-span-full group">
                      <label class="block text-xs font-semibold text-gray-700 mb-1">Street Address *</label>
                      <input v-model="form.street" required type="text" placeholder="e.g., 123 Farm Road"
                        class="w-full px-3 py-2 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-sm hover:border-teal-400 cursor-text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side - Documents -->
            <div class="w-full lg:w-1/2 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-100 flex flex-col bg-gradient-to-br from-gray-50/30 to-slate-50/30">
              <div class="p-3 border-b border-gray-100 bg-white/50">
                <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <div class="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                  </div>
                  <span>Required Documents</span>
                </h3>
              </div>

              <div class="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-280px)]">
                <!-- Business Permit -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">Business Permit / Registration *</label>
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-green-500 hover:bg-green-50/50 transition-all duration-300 cursor-pointer group">
                    <svg class="w-9 h-9 text-gray-400 group-hover:text-green-500 mx-auto mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                      </path>
                    </svg>
                    <input type="file" accept="image/*,.pdf" @change="(e) => handleFileUpload(e, 'businessPermit')"
                      class="hidden" id="businessPermit" />
                    <label for="businessPermit" class="cursor-pointer">
                      <span class="text-xs font-bold text-gray-700 group-hover:text-green-600 block transition-colors mb-1">
                        Click to upload business permit
                      </span>
                      <p class="text-[10px] text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    </label>
                  </div>
                  
                  <!-- Business Permit Preview -->
                  <div v-if="fileData.businessPermit" class="mt-3 bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-xs font-bold text-gray-700">Uploaded Successfully</span>
                      </div>
                      <button type="button" @click="fileData.businessPermit = ''"
                        class="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors cursor-pointer">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                    <div class="border border-gray-200 rounded-lg p-2 bg-gray-50">
                      <img
                        v-if="typeof fileData.businessPermit === 'string' && fileData.businessPermit.startsWith('data:image')"
                        :src="fileData.businessPermit" alt="Business Permit Preview" class="max-h-28 mx-auto rounded shadow-sm" />
                      <div v-else class="flex items-center justify-center p-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg text-xs">
                        <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                          </path>
                        </svg>
                        <span class="text-gray-700 font-semibold">PDF Document Uploaded</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Farm Photos -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">Farm Photos *</label>
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-green-500 hover:bg-green-50/50 transition-all duration-300 cursor-pointer group">
                    <svg class="w-9 h-9 text-gray-400 group-hover:text-green-500 mx-auto mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                      </path>
                    </svg>
                    <input type="file" multiple accept="image/*" @change="handleMultipleFileUpload" class="hidden"
                      id="farmPhotos" />
                    <label for="farmPhotos" class="cursor-pointer">
                      <span class="text-xs font-bold text-gray-700 group-hover:text-green-600 block transition-colors mb-1">
                        Click to upload farm photos
                      </span>
                      <p class="text-[10px] text-gray-500">Multiple images allowed (JPG, PNG)</p>
                    </label>
                  </div>
                  
                  <!-- Farm Photos Preview -->
                  <div v-if="fileData.farmPhotos.length > 0" class="mt-3 bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-xs font-bold text-gray-700">{{ fileData.farmPhotos.length }} Photo{{ fileData.farmPhotos.length > 1 ? 's' : '' }} Uploaded</span>
                      </div>
                      <button type="button" @click="fileData.farmPhotos = []"
                        class="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors cursor-pointer">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove All
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div v-for="(photo, index) in fileData.farmPhotos" :key="index" class="relative group">
                        <img :src="photo" alt="Farm Photo"
                          class="h-24 w-full object-cover rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-all cursor-pointer" />
                        <button type="button" @click="removeFarmPhoto(index)"
                          class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg transform hover:scale-110 cursor-pointer">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Messages - Centered above buttons -->
          <div class="px-4 py-2">
            <div v-if="submitted" class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg p-3 mb-2 shadow-md">
              <div class="flex items-center justify-center">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 shadow-md">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-green-800 font-bold text-xs">Request submitted successfully!</span>
              </div>
              <p class="text-green-700 text-xs mt-1 text-center font-medium">We'll review your application and get back to you within 1-3 business days.</p>
            </div>

            <div v-if="error" class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-300 rounded-lg p-3 mb-2 shadow-md">
              <div class="flex items-center justify-center">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 shadow-md">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-red-800 font-bold text-xs">{{ error }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons (Centered across both sides) -->
          <div class="flex justify-center gap-3 p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
            <button type="button" @click="router.push('/marketplace')"
              class="px-5 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 flex items-center gap-2 text-xs font-bold shadow-sm hover:shadow-md cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
              </svg>
              Cancel
            </button>
            <button type="submit" :disabled="isSubmitting"
              class="px-6 py-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
              <svg v-if="isSubmitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ isSubmitting ? 'Submitting Request...' : 'Submit Upgrade Request' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ProfileService } from '@/services/profileService'
import { UpgradeService } from '@/services/upgradeService'
import type { Address } from '@/types/user'
import { livestockTypes, farmSizeUnits } from '@/services/UpgradeFormDetails'

const router = useRouter()
const authStore = useAuthStore()

const loadingData = ref(true)
const hasPendingRequest = ref(false)
const submitted = ref(false)
const error = ref('')
const isSubmitting = ref(false)

const form = ref({
  fullName: '',
  phone: '',
  farmName: '',
  region: '',
  province: '',
  city: '',
  barangay: '',
  street: '',
  farmSize: '',
  farmSizeUnit: 'hectares',
  livestockTypes: [] as string[],
  description: ''
})

const fileData = ref({
  businessPermit: '',
  farmPhotos: [] as string[]
})

const userAddresses = ref<Address[]>([])
const selectedAddressIndex = ref(-1)
const selectedLivestock = ref('')

onMounted(async () => {
  await loadUserData()
})

const loadUserData = async () => {
  try {
    loadingData.value = true
    error.value = ''

    if (!authStore.initialized) {
      await authStore.initialize()
    }

    const userId = authStore.userId

    if (!userId) {
      error.value = 'You must be logged in to submit an upgrade request'
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    console.log('📋 Loading user data for:', userId)

    // Check for existing pending request FIRST
    const pendingRequest = await UpgradeService.getUserPendingRequest(userId)
    if (pendingRequest) {
      console.log('⚠️  Found existing pending request:', pendingRequest.id)
      hasPendingRequest.value = true
      loadingData.value = false
      return
    }

    const userProfile = await ProfileService.getProfile(userId)

    if (userProfile) {
      form.value.fullName = `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || authStore.userFullName
      form.value.phone = userProfile.phoneNumber || ''

      if (userProfile.addresses && userProfile.addresses.length > 0) {
        userAddresses.value = userProfile.addresses
        console.log('✅ Loaded', userAddresses.value.length, 'addresses')
      }
    } else {
      form.value.fullName = authStore.userFullName
      console.warn('⚠️  Profile not found, using auth store data')
    }

    console.log('✅ User data loaded successfully')
  } catch (err) {
    console.error('❌ Error loading user data:', err)
    error.value = 'Failed to load user data. Please try again.'
  } finally {
    loadingData.value = false
  }
}

const addLivestockType = () => {
  if (selectedLivestock.value && !form.value.livestockTypes.includes(selectedLivestock.value)) {
    form.value.livestockTypes.push(selectedLivestock.value)
    selectedLivestock.value = ''
  }
}

const removeLivestockType = (index: number) => {
  form.value.livestockTypes.splice(index, 1)
}

const applySelectedAddress = () => {
  const index = selectedAddressIndex.value
  if (index >= 0 && userAddresses.value[index]) {
    const selected = userAddresses.value[index]
    form.value.region = selected.region || ''
    form.value.province = selected.province || ''
    form.value.city = selected.city || ''
    form.value.barangay = selected.barangay || ''
    form.value.street = selected.street || ''
  } else {
    form.value.region = ''
    form.value.province = ''
    form.value.city = ''
    form.value.barangay = ''
    form.value.street = ''
  }
}

const handleFileUpload = (event: Event, field: 'businessPermit') => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target?.result) {
        fileData.value[field] = e.target.result as string
      }
    }

    reader.readAsDataURL(file)
  }
}

const handleMultipleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    Array.from(input.files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          fileData.value.farmPhotos.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

const removeFarmPhoto = (index: number) => {
  fileData.value.farmPhotos.splice(index, 1)
}

const handleUpgradeRequest = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  error.value = ''

  try {
    const userId = authStore.userId

    if (!userId) {
      throw new Error('User ID not found. Please log in again.')
    }

    // Double-check for pending request before submitting
    const existingRequest = await UpgradeService.getUserPendingRequest(userId)
    if (existingRequest) {
      hasPendingRequest.value = true
      error.value = 'You already have a pending upgrade request.'
      return
    }

    // Validate required fields
    if (
      !form.value.farmName || !form.value.region || !form.value.province || !form.value.city ||
      !form.value.barangay || !form.value.street || !form.value.farmSize ||
      form.value.livestockTypes.length === 0 || !form.value.description
    ) {
      throw new Error('Please fill in all required fields.')
    }

    if (!fileData.value.businessPermit) throw new Error('Business permit document is required.')
    if (fileData.value.farmPhotos.length === 0) throw new Error('At least one farm photo is required.')

    console.log('📤 Submitting upgrade request to Supabase...')

    // Create upgrade request using UpgradeService
    const result = await UpgradeService.createUpgradeRequest(
      userId,
      {
        farmName: form.value.farmName,
        farmSize: parseFloat(form.value.farmSize),
        farmSizeUnit: form.value.farmSizeUnit,
        livestockTypes: form.value.livestockTypes,
        description: form.value.description,
        region: form.value.region,
        province: form.value.province,
        city: form.value.city,
        barangay: form.value.barangay,
        street: form.value.street
      },
      fileData.value.businessPermit,
      fileData.value.farmPhotos
    )

    if (!result.success) {
      throw new Error(result.error || 'Failed to submit upgrade request')
    }

    // Save new address if not selected from existing ones
    if (selectedAddressIndex.value === -1) {
      const newAddress: Partial<Address> = {
        label: `${form.value.farmName} Farm`,
        region: form.value.region,
        province: form.value.province,
        city: form.value.city,
        barangay: form.value.barangay,
        street: form.value.street,
        isDefault: false
      }

      const addressExists = userAddresses.value.some((addr: Address) =>
        addr.region === newAddress.region &&
        addr.province === newAddress.province &&
        addr.city === newAddress.city &&
        addr.barangay === newAddress.barangay &&
        addr.street === newAddress.street
      )

      if (!addressExists) {
        const addressResult = await ProfileService.addAddress(userId, newAddress as Address)
        if (addressResult.success) {
          console.log('✅ New address saved')
        }
      }
    }

    console.log('✅ Upgrade request submitted successfully!')
    submitted.value = true
    
    setTimeout(() => {
      router.push('/marketplace')
    }, 2000)

  } catch (err) {
    console.error('❌ Error submitting upgrade request:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #059669);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #047857);
}

/* Smooth transitions for all interactive elements */
button, input, select, textarea {
  transition: all 0.3s ease;
}

/* Enhanced focus states */
input:focus, select:focus, textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

/* Hover effects for cards */
.group:hover {
  transform: translateY(-1px);
}
</style>