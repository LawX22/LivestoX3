<!-- checkOut.vue - Enhanced with Address Selection & Farmer Pickup -->
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
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl">
              <div v-for="method in deliveryMethods" :key="method.value" 
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
                    <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <p class="text-xs font-semibold text-green-600">₱{{ shippingCost.toLocaleString() }} Shipping Fee</p>
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
          </div>

          <!-- Delivery Address Selection -->
          <div v-if="deliveryMethod === 'delivery'" class="bg-white/80 backdrop-blur-xl rounded-lg p-3 shadow-md border border-white/50 mb-3">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h2 class="text-sm font-bold text-gray-900">Delivery Address</h2>
              </div>
              <button @click="showAddAddressModal = true" class="px-2.5 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-1.5 shadow-sm">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-3 max-w-4xl">
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
            
            <div class="space-y-2 max-w-2xl">
              <label class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Delivery Instructions (Optional)</label>
              <textarea v-model="deliveryNotes" rows="3" class="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-xs" placeholder="Add delivery instructions, gate codes, landmarks..."></textarea>
            </div>
          </div>

          <!-- Pickup Information -->
          <div v-if="deliveryMethod === 'pickup'" class="bg-white/80 backdrop-blur-xl rounded-lg p-3 shadow-md border border-white/50 mb-3">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
              <div class="w-7 h-7 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 class="text-sm font-bold text-gray-900">Pickup from Farmer</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl mb-3">
              <div v-for="(farmer, index) in farmerLocations" :key="index"
                   class="border-2 rounded-lg p-2.5 cursor-pointer transition-all duration-300"
                   :class="selectedFarmerIndex === index ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm' : 'border-gray-300 bg-white hover:border-green-300'"
                   @click="selectedFarmerIndex = index">
                <div class="flex items-start gap-1.5">
                  <input type="radio" :checked="selectedFarmerIndex === index" class="h-3.5 w-3.5 text-green-600 focus:ring-green-500 border-gray-300 mt-0.5">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <div class="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p class="text-xs font-bold text-gray-900">{{ farmer.farmerName }}</p>
                    </div>
                    <p class="text-xs text-gray-600 mb-1 flex items-start gap-1">
                      <svg class="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>{{ farmer.farmName }}</span>
                    </p>
                    <p class="text-xs text-gray-500 mb-2">{{ farmer.address }}</p>
                    
                    <div class="space-y-1 pt-2 border-t border-gray-200">
                      <div class="flex items-center gap-2">
                        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p class="text-xs text-gray-700">{{ farmer.phone }}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-xs text-gray-700">{{ farmer.hours }}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <p class="text-xs font-semibold text-green-600">{{ farmer.distance }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex items-start gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl">
              <svg class="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs text-blue-800">Please bring a valid ID and your order confirmation when picking up your livestock</p>
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
                    
                    <!-- Show COD Fee for COD method -->
                    <div v-if="method.value === 'cod' && paymentMethod === 'cod'" class="mt-2 flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <p class="text-xs font-semibold text-green-600">₱{{ codFee.toLocaleString() }} COD Fee</p>
                    </div>
                    
                    <!-- Unavailable notice for disabled methods -->
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
              <div v-for="item in checkoutItems" :key="item.id" class="flex items-start gap-2 py-2 border-b border-gray-100 last:border-0">
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
              <div v-if="deliveryMethod === 'delivery'" class="flex justify-between items-center">
                <span class="text-xs text-gray-600 font-medium">Shipping Fee</span>
                <span class="text-sm font-bold text-gray-900">₱{{ shippingCost.toLocaleString() }}</span>
              </div>
              <div v-if="paymentMethod === 'cod'" class="flex justify-between items-center">
                <span class="text-xs text-gray-600 font-medium">COD Fee</span>
                <span class="text-sm font-bold text-gray-900">₱{{ codFee.toLocaleString() }}</span>
              </div>
              <div v-if="discount > 0" class="flex justify-between items-center text-green-600">
                <span class="text-xs font-medium">Discount</span>
                <span class="text-sm font-bold">-₱{{ discount.toLocaleString() }}</span>
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
            <button @click="placeOrder" :disabled="isProcessingOrder" class="w-full cursor-pointer py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
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

    <!-- Add Address Modal (Design Only) -->
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
              <input type="text" placeholder="e.g., Home, Office, Farm" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Contact Person *</label>
                <input type="text" placeholder="Full name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" placeholder="+63 912 345 6789" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Street Address *</label>
              <input type="text" placeholder="House/Unit No., Building, Street" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                <input type="text" placeholder="City" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Province *</label>
                <input type="text" placeholder="Province" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Postal Code *</label>
                <input type="text" placeholder="0000" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <input type="checkbox" id="setDefault" class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500">
              <label for="setDefault" class="text-sm text-gray-700 cursor-pointer">Set as default address</label>
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button @click="showAddAddressModal = false" class="flex-1 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm">Cancel</button>
            <button @click="showAddAddressModal = false" class="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-md hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-sm">Save Address</button>
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
import type { 
  CartItem, 
  DeliveryMethod, 
  PaymentMethod, 
  FormErrors,
  SavedAddress,
  FarmerLocation
} from '@/types/cartTypes'

const router = useRouter()

// Refs with typed interfaces
const checkoutItems = ref<CartItem[]>([])

const deliveryMethod = ref<string>('delivery')
const selectedAddressIndex = ref<number>(0)
const selectedFarmerIndex = ref<number>(0)
const paymentMethod = ref<string>('cod')
const discount = ref<number>(0)
const termsAgreed = ref<boolean>(false)
const isProcessingOrder = ref<boolean>(false)
const showSuccessModal = ref<boolean>(false)
const showAddAddressModal = ref<boolean>(false)
const orderId = ref<string>('')
const errors = ref<FormErrors>({})
const deliveryNotes = ref<string>('')

// Saved Addresses (Mock Data)
const savedAddresses = ref<SavedAddress[]>([
  {
    label: 'Home',
    contactPerson: 'Juan Dela Cruz',
    phone: '+63 912 345 6789',
    street: '123 Mango Street, Barangay Lahug',
    city: 'Cebu City',
    province: 'Cebu',
    postalCode: '6000',
    isDefault: true
  },
  {
    label: 'Office',
    contactPerson: 'Juan Dela Cruz',
    phone: '+63 912 345 6789',
    street: '456 Business Park, IT Center',
    city: 'Cebu City',
    province: 'Cebu',
    postalCode: '6000',
    isDefault: false
  },
  {
    label: 'Farm',
    contactPerson: 'Maria Santos',
    phone: '+63 923 456 7890',
    street: '789 Agriculture Road, Barangay Farming',
    city: 'Mandaue City',
    province: 'Cebu',
    postalCode: '6014',
    isDefault: false
  }
])

// Farmer Locations (Mock Data)
const farmerLocations = ref<FarmerLocation[]>([
  {
    farmerId: 1,
    farmerName: 'Pedro Santos',
    farmName: 'Santos Ranch',
    address: 'Barangay San Isidro, Toledo City, Cebu',
    phone: '+63 917 234 5678',
    hours: 'Mon-Sat: 7:00 AM - 5:00 PM',
    distance: '12 km from your location'
  },
  {
    farmerId: 2,
    farmerName: 'Maria Garcia',
    farmName: 'Garcia Livestock Farm',
    address: 'Barangay Poblacion, Minglanilla, Cebu',
    phone: '+63 928 345 6789',
    hours: 'Mon-Sun: 8:00 AM - 6:00 PM',
    distance: '8 km from your location'
  },
  {
    farmerId: 3,
    farmerName: 'Jose Reyes',
    farmName: 'Reyes Cattle Ranch',
    address: 'Barangay Bulacao, Talisay City, Cebu',
    phone: '+63 939 456 7890',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM',
    distance: '5 km from your location'
  }
])

const shippingCost: number = 500
const codFee: number = 50

// Data arrays with proper typing
const deliveryMethods: DeliveryMethod[] = [
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

// Computed properties
const selectedAddress = computed((): SavedAddress | undefined => savedAddresses.value[selectedAddressIndex.value])
const selectedFarmer = computed((): FarmerLocation | undefined => farmerLocations.value[selectedFarmerIndex.value])
const subtotal = computed((): number => checkoutItems.value.reduce((total, item) => total + (item.price * item.quantity), 0))
const totalPrice = computed((): number => {
  let total = subtotal.value
  if (deliveryMethod.value === 'delivery') total += shippingCost
  if (paymentMethod.value === 'cod') total += codFee
  return total - discount.value
})

// Methods
const loadCheckoutItems = (): void => {
  const savedItems = localStorage.getItem('checkoutItems')
  if (savedItems) {
    checkoutItems.value = JSON.parse(savedItems)
  } else {
    router.push('/cart')
  }
}

const validateForm = (): boolean => {
  errors.value = {}; 
  let isValid = true

  if (deliveryMethod.value === 'delivery' && !selectedAddress.value) {
    errors.value.address = 'Please select a delivery address'
    isValid = false
  }

  if (deliveryMethod.value === 'pickup' && !selectedFarmer.value) {
    errors.value.pickup = 'Please select a pickup location'
    isValid = false
  }

  if (!termsAgreed.value) { 
    errors.value.termsAgreed = 'You must agree to the terms and conditions'; 
    isValid = false 
  }
  return isValid
}

const placeOrder = (): void => {
  if (!validateForm()) return
  isProcessingOrder.value = true
  orderId.value = 'ORD-' + Math.floor(100000 + Math.random() * 900000)
  
  setTimeout(() => {
    isProcessingOrder.value = false
    showSuccessModal.value = true
    
    // Clear checkout items from localStorage
    localStorage.removeItem('checkoutItems')
  }, 2000)
}

const goBackToCart = (): void => { void router.push('/carts') }
const goTomyPurchase = (): void => { void router.push('/transactions') } 
const goToMarketplace = (): void => { void router.push('/marketplace') } 

onMounted(() => loadCheckoutItems())
</script>

<style scoped>
/* Custom scrollbar */
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

/* Modal animation */
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