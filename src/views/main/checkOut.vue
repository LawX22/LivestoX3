<!-- checkOut.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-8 h-8 bg-green-300/20 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-12 h-12 bg-teal-300/15 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-4 h-4 bg-green-400/20 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <div class="flex-1 container mx-auto px-3 py-4 max-w-7xl">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-lg mb-4 shadow-md border border-green-200 flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold">Checkout</h1>
            <p class="text-green-100 opacity-90 text-xs">Complete your purchase</p>
          </div>
        </div>
        <span class="bg-white/20 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
          {{ checkoutItems.length }} {{ checkoutItems.length === 1 ? 'Item' : 'Items' }}
        </span>
      </div>

      <div class="flex flex-col xl:flex-row gap-4">
        <!-- Left Panel -->
        <div class="flex-1 max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
          <!-- User Information -->
          <div class="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/50 mb-4">
            <h2 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="(value, key) in userInfo" :key="key">
                <label class="block text-xs font-medium text-gray-500 mb-1">{{ formatLabel(key) }}</label>
                <div class="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">{{ value }}</div>
              </div>
            </div>
          </div>

          <!-- Delivery Method -->
          <div class="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/50 mb-4">
            <h2 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Delivery Method
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="method in deliveryMethods" :key="method.value" 
                   class="border-2 rounded-lg p-3 cursor-pointer transition-all duration-200"
                   :class="deliveryMethod === method.value ? 'border-green-500 bg-green-50' : 'border-gray-300'"
                   @click="deliveryMethod = method.value">
                <div class="flex items-center">
                  <input type="radio" :value="method.value" v-model="deliveryMethod" class="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300">
                  <label class="ml-2 flex items-center cursor-pointer">
                    <div class="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md mr-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon" />
                      </svg>
                    </div>
                    <span class="text-xs font-medium text-gray-700">{{ method.label }}</span>
                  </label>
                </div>
                <p class="text-xs text-gray-500 mt-1 ml-5">{{ method.description }}</p>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div v-if="deliveryMethod === 'delivery'" class="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/50 mb-4">
            <h2 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Shipping Address
            </h2>
            
            <div v-if="userAddresses.length > 0" class="mb-3">
              <label class="block text-xs font-medium text-gray-500 mb-1">Select Address</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div v-for="(address, index) in userAddresses" :key="index"
                     class="border rounded-lg p-2 cursor-pointer transition-all duration-200"
                     :class="selectedAddressIndex === index ? 'border-green-500 bg-green-50' : 'border-gray-300'"
                     @click="selectAddress(index)">
                  <div class="flex items-start">
                    <input type="radio" :checked="selectedAddressIndex === index" class="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 mt-0.5">
                    <div class="ml-2">
                      <p class="text-xs font-medium text-gray-800">{{ address.name }}</p>
                      <p class="text-xs text-gray-600 mt-0.5">{{ address.street }}</p>
                      <p class="text-xs text-gray-600">{{ address.city }}, {{ address.province }} {{ address.postalCode }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <button v-if="!showAddressForm" @click="showAddressForm = true" class="w-full cursor-pointer py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Address
                </button>
              </div>
            </div>

            <div v-else class="text-center py-4">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p class="text-sm text-gray-500 mb-4">No saved addresses found</p>
              <button v-if="!showAddressForm" @click="showAddressForm = true" class="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2 mx-auto">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Delivery Address
              </button>
            </div>
            
            <!-- Address Form -->
            <div v-if="showAddressForm" class="border-t border-gray-200 pt-4 mt-4">
              <h3 class="text-sm font-medium text-gray-800 mb-3">Add New Address</h3>
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Address Name</label>
                  <input v-model="newAddress.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm" placeholder="e.g., Home, Work, Farm">
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Delivery Address</label>
                  <textarea v-model="newAddress.street" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm" placeholder="Enter complete delivery address"></textarea>
                  <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">City</label>
                    <input v-model="newAddress.city" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm" placeholder="Enter city">
                    <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Province</label>
                    <select v-model="newAddress.province" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm">
                      <option value="" disabled selected>Select province</option>
                      <option v-for="province in phProvinces" :key="province" :value="province">{{ province }}</option>
                    </select>
                    <p v-if="errors.province" class="text-red-500 text-xs mt-1">{{ errors.province }}</p>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Postal Code</label>
                  <input v-model="newAddress.postalCode" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm" placeholder="Enter postal code">
                  <p v-if="errors.postalCode" class="text-red-500 text-xs mt-1">{{ errors.postalCode }}</p>
                </div>
                <div class="flex gap-2 pt-2">
                  <button @click="saveAddress" class="flex-1 cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium">Save Address</button>
                  <button @click="cancelAddAddress" class="flex-1 cursor-pointer px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">Cancel</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pickup Information -->
          <div v-if="deliveryMethod === 'pickup'" class="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/50 mb-4">
            <h2 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pickup Location
            </h2>
            <div class="mb-3">
              <label class="block text-xs font-medium text-gray-500 mb-1">Select Pickup Location</label>
              <div class="grid grid-cols-1 gap-2">
                <div v-for="(location, index) in pickupLocations" :key="index"
                     class="border rounded-lg p-2 cursor-pointer transition-all duration-200"
                     :class="selectedPickupIndex === index ? 'border-green-500 bg-green-50' : 'border-gray-300'"
                     @click="selectedPickupIndex = index">
                  <div class="flex items-start">
                    <input type="radio" :checked="selectedPickupIndex === index" class="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 mt-0.5">
                    <div class="ml-2">
                      <p class="text-xs font-medium text-gray-800">{{ location.name }}</p>
                      <p class="text-xs text-gray-600 mt-0.5">{{ location.address }}</p>
                      <p class="text-xs text-gray-600">{{ location.hours }}</p>
                      <p class="text-xs text-green-600 font-medium mt-0.5">{{ location.distance }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/50 mb-4">
            <h2 class="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Method
            </h2>
            
            <div class="mb-4">
              <label class="block text-xs font-medium text-gray-500 mb-1">Select Payment Method</label>
              <div class="relative">
                <select v-model="paymentMethod" class="w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm appearance-none bg-white">
                  <option v-for="method in paymentMethods" :key="method.value" :value="method.value" :disabled="method.disabled">
                    {{ method.label }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <div class="flex items-center">
                <div class="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md mr-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span class="text-xs font-medium text-gray-700">Cash on Delivery</span>
                <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Available</span>
              </div>
              <p class="text-xs text-gray-600 mt-2 ml-8">
                Pay with cash when your order is delivered. An additional ₱50 processing fee applies.
              </p>
            </div>
            
            <div class="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-xs text-yellow-800">
                <span class="font-medium">Note:</span> Online payment options are coming soon. Currently, only Cash on Delivery is available.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Panel - Order Summary -->
        <div class="w-full xl:w-72 flex-shrink-0">
          <div class="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/50 sticky top-20">
            <h2 class="text-base font-bold text-gray-800 mb-3">Order Summary</h2>
            
            <!-- Items List -->
            <div class="max-h-48 overflow-y-auto pr-1 mb-3">
              <div v-for="item in checkoutItems" :key="item.id" class="flex items-start py-2 border-b border-gray-100 last:border-0">
                <div class="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-2">
                  <img :src="item.images[0]" :alt="item.type" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-medium text-gray-800 truncate">{{ item.type }} - {{ item.breed }}</h4>
                  <p class="text-xs text-gray-600">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-xs font-medium text-gray-800 ml-1">₱{{ (item.price * item.quantity).toLocaleString() }}</div>
              </div>
            </div>
            
            <!-- Price Breakdown -->
            <div class="space-y-1 mb-3">
              <div class="flex justify-between text-xs">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              <div v-if="deliveryMethod === 'delivery'" class="flex justify-between text-xs">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">₱{{ shippingCost.toLocaleString() }}</span>
              </div>
              <div v-if="paymentMethod === 'cod'" class="flex justify-between text-xs">
                <span class="text-gray-600">COD Fee</span>
                <span class="font-medium">₱{{ codFee.toLocaleString() }}</span>
              </div>
              <div v-if="discount > 0" class="flex justify-between text-xs text-green-600">
                <span>Discount</span>
                <span>-₱{{ discount.toLocaleString() }}</span>
              </div>
              <div class="border-t border-gray-200 pt-1 mt-1 flex justify-between text-sm font-bold">
                <span>Total</span>
                <span class="text-green-700">₱{{ totalPrice.toLocaleString() }}</span>
              </div>
            </div>
            
            <!-- Delivery Summary -->
            <div class="mb-3 p-2 bg-gray-50 rounded-lg">
              <p class="text-xs font-medium text-gray-700 mb-0.5">
                {{ deliveryMethod === 'delivery' ? 'Delivery to:' : 'Pickup from:' }}
              </p>
              <p class="text-xs text-gray-600" v-if="deliveryMethod === 'delivery' && selectedAddress">
                {{ selectedAddress.street }}, {{ selectedAddress.city }}, {{ selectedAddress.province }}
              </p>
              <p class="text-xs text-gray-600" v-if="deliveryMethod === 'pickup' && selectedPickup">
                {{ selectedPickup.name }}, {{ selectedPickup.address }}
              </p>
            </div>
            
            <!-- Terms Agreement -->
            <div class="flex items-start mb-3">
              <input id="termsAgreement" v-model="termsAgreed" type="checkbox" class="h-3 w-3 text-green-600 rounded border-gray-300 focus:ring-green-500 mt-1">
              <label for="termsAgreement" class="ml-2 block text-xs text-gray-700">
                I agree to the <a href="#" class="text-green-600 hover:underline">Terms of Service</a> and <a href="#" class="text-green-600 hover:underline">Privacy Policy</a>. 
                I understand that livestock purchases are subject to availability and health conditions at the time of delivery.
              </label>
            </div>
            <p v-if="errors.termsAgreed" class="text-red-500 text-xs mb-2">{{ errors.termsAgreed }}</p>
            
            <!-- Place Order Button -->
            <button @click="placeOrder" :disabled="isProcessingOrder" class="w-full cursor-pointer py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
              <svg v-if="isProcessingOrder" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isProcessingOrder ? 'Processing Order...' : `Place Order - ₱${totalPrice.toLocaleString()}` }}
            </button>
          </div>
          
          <div class="mt-3 text-center">
            <button @click="goBackToCart" class="inline-flex cursor-pointer items-center text-xs text-green-600 hover:text-green-700 font-medium transition-colors">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100 opacity-100">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg class="h-10 w-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mt-5">Order Placed Successfully!</h3>
          <div class="mt-4 text-sm text-gray-600">
            <p>Your order #{{ orderId }} has been confirmed.</p>
            <p class="mt-2">A confirmation email has been sent to {{ userInfo.email }}.</p>
          </div>
          <div class="mt-6">
            <button @click="goTomyPurchase" class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300">View my purchases</button>
            <button @click="goToMarketplace" class="w-full py-2.5 mt-3 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { 
  CartItem, 
  UserInfo, 
  Address, 
  PickupLocation, 
  DeliveryMethod, 
  PaymentMethod, 
  FormErrors
} from '../../services/cart'

const router = useRouter()

// Refs with typed interfaces
const checkoutItems = ref<CartItem[]>([])
const userInfo = ref<UserInfo>({ 
  firstName: 'Juan', 
  lastName: 'Dela Cruz', 
  email: 'juan.delacruz@example.com', 
  phone: '+63 912 345 6789' 
})
const deliveryMethod = ref<string>('delivery')
const selectedAddressIndex = ref<number>(0)
const selectedPickupIndex = ref<number>(0)
const paymentMethod = ref<string>('cod')
const discount = ref<number>(0)
const termsAgreed = ref<boolean>(false)
const isProcessingOrder = ref<boolean>(false)
const showSuccessModal = ref<boolean>(false)
const orderId = ref<string>('')
const errors = ref<FormErrors>({})
const showAddressForm = ref<boolean>(false)
const newAddress = ref<Address>({ 
  name: '', 
  street: '', 
  city: '', 
  province: '', 
  postalCode: '' 
})

// Constants with proper typing
const phProvinces: string[] = ['Davao', 'Manila', 'Cebu']
const userAddresses = ref<Address[]>([{ 
  name: 'Home', 
  street: '123 Mango Street, Barangay Lahug', 
  city: 'Cebu City', 
  province: 'Cebu', 
  postalCode: '6000' 
}])

const pickupLocations = ref<PickupLocation[]>([{ 
  name: 'Main Farm - Quezon City', 
  address: '123 Agriculture Road, Barangay Farming, Quezon City', 
  hours: 'Mon-Sat: 8:00 AM - 5:00 PM', 
  distance: '5 km from your location' 
}])

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
    description: 'Pick up from our nearest farm location', 
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' 
  }
]

const paymentMethods: PaymentMethod[] = [
  { value: 'cod', label: 'Cash on Delivery', disabled: false },
  { value: 'card', label: 'Credit/Debit Card (Coming Soon)', disabled: true },
  { value: 'gcash', label: 'GCash (Coming Soon)', disabled: true },
  { value: 'bank', label: 'Bank Transfer (Coming Soon)', disabled: true }
]

// Computed properties with proper return types
const selectedAddress = computed((): Address | undefined => userAddresses.value[selectedAddressIndex.value])
const selectedPickup = computed((): PickupLocation | undefined => pickupLocations.value[selectedPickupIndex.value])
const subtotal = computed((): number => checkoutItems.value.reduce((total, item) => total + (item.price * item.quantity), 0))
const totalPrice = computed((): number => {
  let total = subtotal.value
  if (deliveryMethod.value === 'delivery') total += shippingCost
  if (paymentMethod.value === 'cod') total += codFee
  return total - discount.value
})

// Methods with proper typing
const formatLabel = (key: string): string => key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')

const loadCheckoutItems = (): void => {
  const savedItems = localStorage.getItem('checkoutItems')
  if (savedItems) {
    checkoutItems.value = JSON.parse(savedItems)
  } else {
    router.push('/cart')
  }
}

const selectAddress = (index: number): void => { 
  selectedAddressIndex.value = index; 
  showAddressForm.value = false 
}

const saveAddress = (): void => {
  if (!newAddress.value.name || !newAddress.value.street || !newAddress.value.city || !newAddress.value.province || !newAddress.value.postalCode) {
    alert('Please fill in all address fields'); 
    return
  }
  userAddresses.value.push({ ...newAddress.value })
  selectedAddressIndex.value = userAddresses.value.length - 1
  newAddress.value = { name: '', street: '', city: '', province: '', postalCode: '' }
  showAddressForm.value = false
}

const cancelAddAddress = (): void => {
  showAddressForm.value = false
  newAddress.value = { name: '', street: '', city: '', province: '', postalCode: '' }
}

const validateForm = (): boolean => {
  errors.value = {}; 
  let isValid = true
  if (deliveryMethod.value === 'delivery') {
    if (userAddresses.value.length === 0 && !showAddressForm.value) {
      errors.value.address = 'Please add a delivery address'; 
      isValid = false
    } else if (userAddresses.value.length > 0 && selectedAddress.value) {
      if (!selectedAddress.value.street.trim()) { 
        errors.value.address = 'Address is required'; 
        isValid = false 
      }
      if (!selectedAddress.value.city.trim()) { 
        errors.value.city = 'City is required'; 
        isValid = false 
      }
      if (!selectedAddress.value.province) { 
        errors.value.province = 'Province is required'; 
        isValid = false 
      }
      if (!selectedAddress.value.postalCode.trim()) { 
        errors.value.postalCode = 'Postal code is required'; 
        isValid = false 
      }
    }
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
    localStorage.removeItem('checkoutItems')
  }, 2000)
}

const goBackToCart = (): void => { void router.push('/carts') }
const goTomyPurchase = (): void => { void router.push('/transactions') } 
const goToMarketplace = (): void => { void router.push('/marketplace') } 

onMounted(() => loadCheckoutItems())
</script>