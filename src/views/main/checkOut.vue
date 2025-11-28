<!-- checkOut.vue - DELIVERY DATE/TIME IN ADDRESS SECTION -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden">
    <!-- Enhanced Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl animate-pulse" style="animation-delay: 0.5s"></div>
      <div class="absolute bottom-1/3 left-1/4 w-28 h-28 bg-green-300/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s"></div>
    </div>

    <div class="relative z-10 container mx-auto px-3 py-3 max-w-6xl">
      <!-- Compact Header -->
      <div class="bg-white/80 backdrop-blur-xl rounded-lg mb-3 shadow-lg border border-white/50 overflow-hidden sticky top-0 z-20">
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-md">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-base font-bold text-white">Secure Checkout</h1>
                <p class="text-green-100 text-xs font-medium">{{ checkoutItems.length }} {{ checkoutItems.length === 1 ? 'Item' : 'Items' }}</p>
              </div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30 shadow-md">
              <p class="text-xs text-green-100">Total</p>
              <p class="text-base font-bold text-white">₱{{ totalPrice.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col xl:flex-row gap-3">
        <!-- Left Panel -->
        <div class="flex-1 max-h-[calc(100vh-140px)] overflow-y-auto pr-1 custom-scrollbar">
          <!-- Delivery Method -->
          <div class="bg-white/80 backdrop-blur-xl rounded-lg p-3 shadow-md border border-white/50 mb-3">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
              <div class="w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h2 class="text-sm font-bold text-gray-900">Delivery Method</h2>
            </div>
            
            <!-- Show available delivery methods based on listings -->
            <div v-if="availableDeliveryMethods.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl">
              <div v-for="method in availableDeliveryMethods" :key="method.value" 
                   class="border-2 rounded-lg p-2.5 cursor-pointer transition-all duration-300"
                   :class="deliveryMethod === method.value ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm' : 'border-gray-300 bg-white hover:border-green-300'"
                   @click="deliveryMethod = method.value">
                <div class="flex items-center gap-1.5 mb-1">
                  <input type="radio" :value="method.value" v-model="deliveryMethod" class="h-3.5 w-3.5 text-green-600 focus:ring-green-500 border-gray-300">
                  <div class="w-6 h-6 flex items-center justify-center rounded-md"
                       :class="deliveryMethod === method.value ? 'bg-green-500' : 'bg-gray-200'">
                    <svg class="w-3.5 h-3.5" :class="deliveryMethod === method.value ? 'text-white' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon" />
                    </svg>
                  </div>
                </div>
                <div class="ml-5">
                  <p class="font-bold text-gray-900 text-xs mb-0.5">{{ method.label }}</p>
                  <p class="text-xs text-gray-600 leading-snug">{{ method.description }}</p>
                  <div v-if="method.value === 'delivery'" class="mt-2 flex items-center gap-2">
                    <p class="text-xs font-semibold text-green-600">₱{{ calculatedShippingCost.toLocaleString() }} Shipping Fee</p>
                  </div>
                  <div v-if="method.value === 'pickup'" class="mt-2 flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-xs font-semibold text-green-600">Free - No Shipping Fee</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- No delivery methods available -->
            <div v-else class="text-center py-6 bg-red-50 rounded-lg border border-red-200">
              <svg class="w-12 h-12 mx-auto text-red-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="text-sm font-semibold text-red-800 mb-1">No Delivery Methods Available</p>
              <p class="text-xs text-red-600">The items in your cart don't have any delivery options configured by the farmer.</p>
            </div>
          </div>

          <!-- COMBINED: Delivery Address & Preferred Schedule -->
          <div v-if="deliveryMethod === 'delivery' && hasDeliveryOption" class="bg-white/80 backdrop-blur-xl rounded-lg p-3 shadow-md border border-white/50 mb-3">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h2 class="text-sm font-bold text-gray-900">Delivery Details</h2>
              </div>
              <button @click="showAddAddressModal = true" class="px-2.5 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-1.5 shadow-sm">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Address
              </button>
            </div>
            
            <!-- Loading state for addresses -->
            <div v-if="isLoadingAddresses" class="text-center py-4">
              <div class="inline-block w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p class="text-xs text-gray-600 mt-2">Loading addresses...</p>
            </div>
            
            <!-- Addresses grid -->
            <div v-else-if="savedAddresses.length > 0">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 max-w-4xl">
                <div v-for="(address, index) in savedAddresses" :key="index"
                     class="border-2 rounded-lg p-2.5 cursor-pointer transition-all duration-300"
                     :class="selectedAddressIndex === index ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm' : 'border-gray-300 bg-white hover:border-green-300'"
                     @click="selectedAddressIndex = index">
                  <div class="flex items-start gap-1.5">
                    <input type="radio" :checked="selectedAddressIndex === index" class="h-3.5 w-3.5 text-green-600 focus:ring-green-500 border-gray-300 mt-0.5">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <p class="text-xs font-bold text-gray-900">{{ address.label }}</p>
                        <span v-if="address.isDefault" class="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">Default</span>
                      </div>
                      <p class="text-xs font-semibold text-gray-900 mb-1">{{ address.contactPerson }}</p>
                      <p class="text-xs text-gray-600 mb-1">{{ address.phone }}</p>
                      <p class="text-xs text-gray-700 leading-relaxed">
                        {{ address.street }}, {{ address.city }}, {{ address.province }} {{ address.postalCode }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preferred Delivery Schedule - MOVED HERE -->
              <div class="border-t border-gray-200 pt-3 mb-3">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 class="text-sm font-bold text-gray-900">Preferred Delivery Schedule</h3>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mb-3">
                  <!-- Delivery Date -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Delivery Date *</label>
                    <input 
                      v-model="deliveryDate" 
                      type="date" 
                      :min="minDeliveryDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-sm"
                      placeholder="Select delivery date"
                    >
                    <p v-if="errors.deliveryDate" class="text-red-600 text-xs mt-1 font-semibold">{{ errors.deliveryDate }}</p>
                  </div>

                  <!-- Delivery Time -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Preferred Time *</label>
                    <select 
                      v-model="deliveryTime" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-sm"
                    >
                      <option value="">Select time slot</option>
                      <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                      <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                    </select>
                    <p v-if="errors.deliveryTime" class="text-red-600 text-xs mt-1 font-semibold">{{ errors.deliveryTime }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200 mb-3 max-w-2xl">
                  <svg class="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-xs text-blue-800">The farmer will be notified of your preferred delivery schedule. Actual delivery time may vary based on availability.</p>
                </div>
              </div>

              <!-- Delivery Instructions -->
              <div class="space-y-2 max-w-2xl">
                <label class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Delivery Instructions (Optional)</label>
                <textarea v-model="deliveryNotes" rows="3" class="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-xs" placeholder="Add delivery instructions, gate codes, landmarks..."></textarea>
              </div>
            </div>
            
            <!-- No addresses state -->
            <div v-else class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
              <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p class="text-sm text-gray-600 mb-3">No saved addresses yet</p>
              <button @click="showAddAddressModal = true" class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 mx-auto shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Address
              </button>
            </div>
          </div>

          <!-- Pickup Information -->
          <div v-if="deliveryMethod === 'pickup' && hasPickupOption" class="bg-white/80 backdrop-blur-xl rounded-lg p-3 shadow-md border border-white/50 mb-3">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
              <div class="w-7 h-7 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 class="text-sm font-bold text-gray-900">Pickup Schedule</h2>
            </div>
            
            <!-- Loading pickup schedules -->
            <div v-if="isLoadingFarmerLocations" class="text-center py-4">
              <div class="inline-block w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p class="text-xs text-gray-600 mt-2">Loading pickup schedules...</p>
            </div>
            
            <!-- Pickup Schedules -->
            <div v-else-if="farmerLocations.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl mb-3">
              <div v-for="(farmer, index) in farmerLocations" :key="index"
                   class="border-2 rounded-lg p-3 cursor-pointer transition-all duration-300"
                   :class="selectedFarmerIndex === index ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm' : 'border-gray-300 bg-white hover:border-green-300'"
                   @click="selectedFarmerIndex = index">
                <div class="flex items-start gap-2">
                  <input type="radio" :checked="selectedFarmerIndex === index" class="h-3.5 w-3.5 text-green-600 focus:ring-green-500 border-gray-300 mt-0.5">
                  <div class="flex-1">
                    <!-- Pickup Schedule ONLY -->
                    <div v-if="farmer.pickupSchedule" class="bg-emerald-50 rounded-md p-2 border border-emerald-200">
                      <div class="flex items-start gap-2">
                        <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div class="flex-1">
                          <p class="text-xs font-bold text-emerald-800 mb-1">📅 Available Days</p>
                          <div class="flex flex-wrap gap-1 mb-2">
                            <span v-for="day in farmer.pickupSchedule.availableDays" :key="day"
                                  class="px-2 py-1 bg-white text-emerald-700 text-xs font-semibold rounded border border-emerald-300">
                              {{ day }}
                            </span>
                          </div>
                          <div class="flex items-center gap-1.5 bg-white rounded-md p-2 border border-emerald-200">
                            <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="text-sm font-bold text-emerald-700">
                              🕐 {{ formatTime(farmer.pickupSchedule.startTime) }} - {{ formatTime(farmer.pickupSchedule.endTime) }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- If no schedule available -->
                    <div v-else class="bg-gray-50 rounded-md p-2 border border-gray-200">
                      <p class="text-xs text-gray-600 italic">Contact farmer for pickup schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- No pickup schedules -->
            <div v-else class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
              <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-sm text-gray-600">No pickup schedules available</p>
            </div>
            
            <div class="flex items-start gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl">
              <svg class="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs text-blue-800">Please bring a valid ID and your order confirmation when picking up your livestock. Make sure to arrive during the available hours.</p>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white/80 backdrop-blur-xl rounded-lg p-3 shadow-md border border-white/50 mb-3">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
              <div class="w-7 h-7 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 class="text-sm font-bold text-gray-900">Payment Method</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl">
              <div v-for="method in paymentMethods" :key="method.value"
                   class="border-2 rounded-lg p-2.5 transition-all duration-300"
                   :class="[
                     paymentMethod === method.value ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm' : 'border-gray-300 bg-white',
                     method.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-green-300'
                   ]"
                   @click="!method.disabled && (paymentMethod = method.value)">
                <div class="flex items-start gap-1.5">
                  <input type="radio" :value="method.value" v-model="paymentMethod" :disabled="method.disabled" class="h-3.5 w-3.5 text-green-600 focus:ring-green-500 border-gray-300 mt-0.5">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <p class="text-xs font-bold" :class="method.disabled ? 'text-gray-400' : 'text-gray-900'">{{ method.label }}</p>
                      <span v-if="method.disabled" class="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded">Coming Soon</span>
                    </div>
                    <p v-if="method.description" class="text-xs mt-0.5" :class="method.disabled ? 'text-gray-400' : 'text-gray-600'">{{ method.description }}</p>
                    
                    <p v-if="method.disabled" class="text-xs text-gray-500 italic mt-1">This payment method is currently unavailable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Order Summary -->
        <div class="w-full xl:w-80 flex-shrink-0">
          <div class="bg-white/80 backdrop-blur-xl rounded-lg p-3 shadow-lg border border-white/50 sticky top-20">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
              <div class="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 class="text-sm font-bold text-gray-900">Order Summary</h2>
            </div>
            
            <!-- Items List -->
            <div class="max-h-48 overflow-y-auto pr-2 mb-3 custom-scrollbar">
              <div v-for="item in checkoutItems" :key="item.uuid" class="flex items-start gap-2 py-2 border-b border-gray-100 last:border-0">
                <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-white shadow-sm">
                  <img :src="item.images[0]" :alt="item.type" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-bold text-gray-900 mb-0.5 truncate">{{ item.type }} - {{ item.breed }}</h4>
                  <p class="text-xs text-gray-600 mb-0.5">Quantity: {{ item.quantity }}</p>
                  <p class="text-sm font-bold text-green-600">₱{{ (item.price * item.quantity).toLocaleString() }}</p>
                </div>
              </div>
            </div>
            
            <!-- Price Breakdown -->
            <div class="space-y-2 mb-3 pb-3 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600 font-medium">Subtotal</span>
                <span class="text-sm font-bold text-gray-900">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              <div v-if="deliveryMethod === 'delivery' && hasDeliveryOption" class="flex justify-between items-center">
                <span class="text-xs text-gray-600 font-medium">Shipping Fee</span>
                <span class="text-sm font-bold text-gray-900">₱{{ calculatedShippingCost.toLocaleString() }}</span>
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 mb-3 border-2 border-green-200">
              <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-gray-900">Total Amount</span>
                <span class="text-lg font-bold text-green-600">₱{{ totalPrice.toLocaleString() }}</span>
              </div>
              <p class="text-xs text-gray-600 mt-1 text-right">Tax included where applicable</p>
            </div>
            
            <!-- Terms Agreement -->
            <div class="mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-start gap-2">
                <input id="termsAgreement" v-model="termsAgreed" type="checkbox" class="h-3.5 w-3.5 text-green-600 rounded border-gray-300 focus:ring-green-500 mt-0.5">
                <label for="termsAgreement" class="text-xs text-gray-700 leading-relaxed cursor-pointer">
                  I agree to the <a href="#" class="text-green-600 hover:underline font-semibold">Terms of Service</a> and <a href="#" class="text-green-600 hover:underline font-semibold">Privacy Policy</a>. 
                  I understand that livestock purchases are subject to availability and health conditions at the time of delivery.
                </label>
              </div>
              <p v-if="errors.termsAgreed" class="text-red-600 text-xs mt-1 font-semibold">{{ errors.termsAgreed }}</p>
            </div>
            
            <!-- Place Order Button -->
            <button 
              @click="placeOrder" 
              :disabled="isProcessingOrder || !canPlaceOrder"
              class="w-full cursor-pointer py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <svg v-if="isProcessingOrder" class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isProcessingOrder ? 'Processing Order...' : `Place Order - ₱${totalPrice.toLocaleString()}` }}
            </button>
          </div>
          
          <div class="mt-3 text-center">
            <button @click="goBackToCart" class="inline-flex cursor-pointer items-center text-sm text-green-600 hover:text-green-700 font-semibold transition-all gap-2 hover:gap-3 duration-300">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Address Modal -->
    <transition name="modal">
      <div v-if="showAddAddressModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-900">Add New Address</h3>
            <button @click="showAddAddressModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Address Label *</label>
              <input v-model="newAddress.label" type="text" placeholder="e.g., Home, Office, Farm" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Contact Person *</label>
                <input v-model="newAddress.contactPerson" type="text" placeholder="Full name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input v-model="newAddress.phone" type="tel" placeholder="+63 912 345 6789" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Street Address *</label>
              <input v-model="newAddress.street" type="text" placeholder="House/Unit No., Building, Street" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                <input v-model="newAddress.city" type="text" placeholder="City" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Province *</label>
                <input v-model="newAddress.province" type="text" placeholder="Province" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Postal Code *</label>
                <input v-model="newAddress.postalCode" type="text" placeholder="0000" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <input v-model="newAddress.isDefault" type="checkbox" id="setDefault" class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500">
              <label for="setDefault" class="text-sm text-gray-700 cursor-pointer">Set as default address</label>
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button @click="showAddAddressModal = false" class="flex-1 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm">Cancel</button>
            <button @click="saveNewAddress" :disabled="isSavingAddress" class="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-md hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <svg v-if="isSavingAddress" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSavingAddress ? 'Saving...' : 'Save Address' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Enhanced Success Modal -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100 opacity-100">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-4 shadow-lg">
              <svg class="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Order Placed Successfully!</h3>
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200">
              <p class="text-sm text-gray-800 font-semibold mb-1">Order Number</p>
              <p class="text-xl font-bold text-green-600">{{ orderId }}</p>
            </div>
            <div class="space-y-2">
              <button @click="goTomyPurchase" class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-md hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 text-sm">View My Purchases</button>
              <button @click="goToMarketplace" class="w-full py-2.5 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300 border-2 border-green-200 hover:border-green-300 text-sm">Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cartCheckoutService } from '@/services/cartCheckoutService'
import type { 
  CartItem, 
  SavedAddress, 
  FarmerLocation,
  DeliveryMethod, 
  PaymentMethod, 
  FormErrors
} from '@/types/cartTypes'

interface PickupSchedule {
  availableDays: string[]
  startTime: string
  endTime: string
}

interface FarmerLocationWithSchedule {
  farmerId: string
  pickupSchedule?: PickupSchedule
}

const router = useRouter()

// State
const checkoutItems = ref<CartItem[]>([])
const savedAddresses = ref<SavedAddress[]>([])
const farmerLocations = ref<FarmerLocationWithSchedule[]>([])
const deliveryMethod = ref<string>('')
const selectedAddressIndex = ref<number>(0)
const selectedFarmerIndex = ref<number>(0)
const paymentMethod = ref<string>('cod')
const termsAgreed = ref<boolean>(false)
const deliveryNotes = ref<string>('')
const deliveryDate = ref<string>('')
const deliveryTime = ref<string>('')
const isProcessingOrder = ref<boolean>(false)
const isLoadingAddresses = ref<boolean>(false)
const isLoadingFarmerLocations = ref<boolean>(false)
const isSavingAddress = ref<boolean>(false)
const showSuccessModal = ref<boolean>(false)
const showAddAddressModal = ref<boolean>(false)
const orderId = ref<string>('')
const errors = ref<FormErrors>({})

// New address form
const newAddress = ref<SavedAddress>({
  label: '',
  contactPerson: '',
  phone: '',
  street: '',
  city: '',
  province: '',
  postalCode: '',
  isDefault: false
})

// Data arrays
const allDeliveryMethods: DeliveryMethod[] = [
  { 
    value: 'delivery', 
    label: 'Home Delivery', 
    description: "We'll deliver to your selected address", 
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
  },
  { 
    value: 'pickup', 
    label: 'Pickup', 
    description: 'Pick up directly from the farmer', 
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' 
  }
]

const paymentMethods: PaymentMethod[] = [
  { value: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order', disabled: false },
  { value: 'card', label: 'Credit/Debit Card', description: 'Secure online payment', disabled: true },
  { value: 'gcash', label: 'GCash', description: 'Mobile wallet payment', disabled: true },
  { value: 'bank', label: 'Bank Transfer', description: 'Direct bank transfer', disabled: true }
]

// Computed: Minimum delivery date (tomorrow)
const minDeliveryDate = computed((): string => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

// ===== DELIVERY OPTIONS PARSING =====

interface ParsedDeliveryInfo {
  hasPickup: boolean
  hasDelivery: boolean
  deliveryFee?: number
  pickupSchedule?: PickupSchedule
}

const parseItemDeliveryOptions = (deliveryOptions: string[] | null | undefined): ParsedDeliveryInfo => {
  console.log('🔍 CHECKOUT: parseItemDeliveryOptions called with:', deliveryOptions)
  
  const result: ParsedDeliveryInfo = {
    hasPickup: false,
    hasDelivery: false
  }

  if (!deliveryOptions || !Array.isArray(deliveryOptions)) {
    console.warn('⚠️ CHECKOUT: Invalid deliveryOptions, returning empty result')
    return result
  }

  for (let i = 0; i < deliveryOptions.length; i++) {
    const option = deliveryOptions[i]
    console.log(`  📦 CHECKOUT: Option ${i}:`, option, 'Type:', typeof option)
    
    if (typeof option === 'string') {
      if (option.startsWith('pickup:')) {
        console.log('    🔸 CHECKOUT: Found pickup option, attempting to parse...')
        
        const match = option.match(/^pickup:([^:]+):(\d{2}:\d{2}):(\d{2}:\d{2})$/)
        console.log('    🔸 CHECKOUT: Regex match result:', match)
        
        if (match) {
          const [, daysStr, startTime, endTime] = match
          const days = daysStr.split('|').filter(day => day.trim().length > 0)
          
          console.log('    🔸 CHECKOUT: Parsed days:', days)
          console.log('    🔸 CHECKOUT: Start time:', startTime)
          console.log('    🔸 CHECKOUT: End time:', endTime)
          
          if (days.length > 0) {
            result.hasPickup = true
            result.pickupSchedule = {
              availableDays: days,
              startTime,
              endTime
            }
            console.log('    ✅ CHECKOUT: Pickup schedule set:', result.pickupSchedule)
          } else {
            console.error('    ❌ CHECKOUT: No valid days found')
          }
        } else {
          console.error('    ❌ CHECKOUT: Pickup format does not match expected pattern:', option)
        }
      } else if (option.startsWith('delivery:')) {
        console.log('    🔸 CHECKOUT: Found delivery option')
        result.hasDelivery = true
        const feeStr = option.substring(9).trim()
        const fee = parseFloat(feeStr)
        console.log('    🔸 CHECKOUT: Delivery fee:', fee)
        if (!isNaN(fee)) {
          result.deliveryFee = fee
        }
      } else {
        console.warn('    ⚠️ CHECKOUT: Unknown option format:', option)
      }
    } else {
      console.warn('    ⚠️ CHECKOUT: Option is not a string:', option)
    }
  }

  console.log('✅ CHECKOUT: parseItemDeliveryOptions result:', result)
  return result
}

// Computed properties
const hasPickupOption = computed((): boolean => {
  return checkoutItems.value.some(item => {
    const parsed = parseItemDeliveryOptions(item.deliveryOptions)
    return parsed.hasPickup
  })
})

const hasDeliveryOption = computed((): boolean => {
  return checkoutItems.value.some(item => {
    const parsed = parseItemDeliveryOptions(item.deliveryOptions)
    return parsed.hasDelivery
  })
})

const calculatedShippingCost = computed((): number => {
  if (deliveryMethod.value !== 'delivery') return 0
  
  let maxFee = 0
  for (const item of checkoutItems.value) {
    const parsed = parseItemDeliveryOptions(item.deliveryOptions)
    if (parsed.hasDelivery && parsed.deliveryFee !== undefined) {
      maxFee = Math.max(maxFee, parsed.deliveryFee)
    }
  }
  
  return maxFee
})

const availableDeliveryMethods = computed((): DeliveryMethod[] => {
  const methods: DeliveryMethod[] = []
  
  if (hasDeliveryOption.value) {
    methods.push(allDeliveryMethods.find(m => m.value === 'delivery')!)
  }
  
  if (hasPickupOption.value) {
    methods.push(allDeliveryMethods.find(m => m.value === 'pickup')!)
  }
  
  return methods
})

const subtotal = computed((): number => {
  return checkoutItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const totalPrice = computed((): number => {
  let total = subtotal.value
  if (deliveryMethod.value === 'delivery' && hasDeliveryOption.value) {
    total += calculatedShippingCost.value
  }
  return total
})

const canPlaceOrder = computed((): boolean => {
  if (!termsAgreed.value) return false
  if (!deliveryMethod.value) return false
  if (availableDeliveryMethods.value.length === 0) return false
  if (deliveryMethod.value === 'delivery') {
    if (savedAddresses.value.length === 0) return false
    if (!deliveryDate.value || !deliveryTime.value) return false
  }
  if (deliveryMethod.value === 'pickup' && farmerLocations.value.length === 0) return false
  return true
})

// Helper function to format time (24hr to 12hr with AM/PM)
const formatTime = (time: string): string => {
  if (!time) return ''
  try {
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
  } catch (error) {
    console.error('Error formatting time:', error)
    return time
  }
}

// Methods
const loadCheckoutItems = (): void => {
  const savedItems = localStorage.getItem('checkoutItems')
  if (savedItems) {
    checkoutItems.value = JSON.parse(savedItems)
    
    console.log('📦 CHECKOUT: Loaded checkout items:', checkoutItems.value.length)
    
    if (availableDeliveryMethods.value.length > 0) {
      deliveryMethod.value = availableDeliveryMethods.value[0].value
      console.log('✅ CHECKOUT: Auto-selected delivery method:', deliveryMethod.value)
    } else {
      console.warn('⚠️ CHECKOUT: No delivery methods available!')
    }
  } else {
    console.warn('⚠️ CHECKOUT: No checkout items found, redirecting to cart')
    router.push('/carts')
  }
}

const loadSavedAddresses = async (): Promise<void> => {
  isLoadingAddresses.value = true
  
  try {
    const result = await cartCheckoutService.getSavedAddresses()
    
    if (result.success && result.data) {
      savedAddresses.value = result.data
      console.log('✅ CHECKOUT: Loaded addresses:', savedAddresses.value.length)
      
      const defaultIndex = savedAddresses.value.findIndex(addr => addr.isDefault)
      selectedAddressIndex.value = defaultIndex !== -1 ? defaultIndex : 0
    } else {
      console.error('❌ CHECKOUT: Failed to load addresses:', result.error)
    }
  } catch (error) {
    console.error('❌ CHECKOUT: Error loading addresses:', error)
  } finally {
    isLoadingAddresses.value = false
  }
}

const loadFarmerLocations = async (): Promise<void> => {
  isLoadingFarmerLocations.value = true
  
  try {
    console.log('🔍 CHECKOUT: Starting to load farmer locations...')
    
    const farmerMap = new Map<string, CartItem>()
    
    for (const item of checkoutItems.value) {
      const parsed = parseItemDeliveryOptions(item.deliveryOptions)
      
      if (parsed.hasPickup && item.farmer) {
        const farmerId = item.farmer.id?.toString() || ''
        const farmerContact = item.farmer.contact || ''
        
        const farmerKey = farmerId 
          ? `${farmerId}-${farmerContact}`.replace(/\s+/g, '-')
          : `${item.farmer.name}-${farmerContact}`.replace(/\s+/g, '-')
        
        if (!farmerMap.has(farmerKey)) {
          farmerMap.set(farmerKey, item)
        }
      }
    }

    const locations: FarmerLocationWithSchedule[] = []
    
    for (const [farmerKey, cartItem] of farmerMap.entries()) {
      const parsed = parseItemDeliveryOptions(cartItem.deliveryOptions)
      const farmerId = cartItem.farmer.id?.toString() || farmerKey
      
      locations.push({
        farmerId: farmerId,
        pickupSchedule: parsed.pickupSchedule
      })
    }

    farmerLocations.value = locations
    console.log('✅ CHECKOUT: Loaded pickup schedules:', farmerLocations.value.length)
  } catch (error) {
    console.error('❌ CHECKOUT: Error loading pickup schedules:', error)
  } finally {
    isLoadingFarmerLocations.value = false
  }
}

const saveNewAddress = async (): Promise<void> => {
  if (!newAddress.value.label || !newAddress.value.contactPerson || !newAddress.value.phone ||
      !newAddress.value.street || !newAddress.value.city || !newAddress.value.province || !newAddress.value.postalCode) {
    alert('Please fill in all required fields')
    return
  }
  
  isSavingAddress.value = true
  
  try {
    const result = await cartCheckoutService.addAddress(newAddress.value)
    
    if (result.success) {
      console.log('✅ CHECKOUT: Address saved successfully')
      await loadSavedAddresses()
      
      showAddAddressModal.value = false
      newAddress.value = {
        label: '',
        contactPerson: '',
        phone: '',
        street: '',
        city: '',
        province: '',
        postalCode: '',
        isDefault: false
      }
    } else {
      alert(result.error || 'Failed to save address')
    }
  } catch (error) {
    console.error('❌ CHECKOUT: Error saving address:', error)
    alert('Failed to save address')
  } finally {
    isSavingAddress.value = false
  }
}

const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!deliveryMethod.value || availableDeliveryMethods.value.length === 0) {
    alert('No delivery methods available for these items')
    return false
  }

  if (deliveryMethod.value === 'delivery') {
    if (!hasDeliveryOption.value) {
      alert('Delivery is not available for these items')
      return false
    }
    if (savedAddresses.value.length === 0) {
      errors.value.address = 'Please add a delivery address'
      isValid = false
    }
    if (!deliveryDate.value) {
      errors.value.deliveryDate = 'Please select a delivery date'
      isValid = false
    }
    if (!deliveryTime.value) {
      errors.value.deliveryTime = 'Please select a delivery time'
      isValid = false
    }
  }

  if (deliveryMethod.value === 'pickup') {
    if (!hasPickupOption.value) {
      alert('Pickup is not available for these items')
      return false
    }
    if (farmerLocations.value.length === 0) {
      errors.value.pickup = 'No pickup locations available'
      isValid = false
    }
  }

  if (!termsAgreed.value) { 
    errors.value.termsAgreed = 'You must agree to the terms and conditions'
    isValid = false 
  }
  
  return isValid
}

const placeOrder = async (): Promise<void> => {
  if (!validateForm()) {
    alert('Please complete all required fields')
    return
  }
  
  isProcessingOrder.value = true
  
  try {
    const checkoutData = {
      items: checkoutItems.value,
      deliveryMethod: deliveryMethod.value,
      selectedAddressIndex: selectedAddressIndex.value,
      selectedFarmerIndex: selectedFarmerIndex.value,
      paymentMethod: paymentMethod.value,
      deliveryNotes: deliveryNotes.value,
      deliveryDate: deliveryDate.value,
      deliveryTime: deliveryTime.value,
      subtotal: subtotal.value,
      shippingFee: deliveryMethod.value === 'delivery' && hasDeliveryOption.value ? calculatedShippingCost.value : 0,
      codFee: 0,
      totalAmount: totalPrice.value
    }
    
    const result = await cartCheckoutService.createOrder(checkoutData)
    
    if (result.success && result.data) {
      orderId.value = result.data
      console.log('✅ CHECKOUT: Order created:', orderId.value)
      
      localStorage.removeItem('checkoutItems')
      showSuccessModal.value = true
    } else {
      alert(result.error || 'Failed to place order')
    }
  } catch (error) {
    console.error('❌ CHECKOUT: Error placing order:', error)
    alert('Failed to place order. Please try again.')
  } finally {
    isProcessingOrder.value = false
  }
}

const goBackToCart = (): void => { void router.push('/carts') }
const goTomyPurchase = (): void => { void router.push('/transactions') } 
const goToMarketplace = (): void => { void router.push('/marketplace') }

// Lifecycle
onMounted(async () => {
  loadCheckoutItems()
  await loadSavedAddresses()
  await loadFarmerLocations()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(229, 231, 235, 0.5);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #059669);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #047857);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>