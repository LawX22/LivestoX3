<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4 py-6 max-w-6xl">
      <!-- Page Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-5 rounded-xl mb-6 shadow-lg border border-green-200 flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm shadow-lg">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold">Checkout</h1>
            <p class="text-green-100 opacity-90">Complete your purchase</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="bg-white/20 px-3 py-1 rounded-lg text-sm font-semibold backdrop-blur-sm">
            {{ checkoutItems.length }} {{ checkoutItems.length === 1 ? 'Item' : 'Items' }}
          </span>
        </div>
      </div>

      <!-- Checkout Content -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Panel - Form -->
        <div class="flex-1">
          <!-- User Information (Display only) -->
          <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Information
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                <div class="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  {{ userInfo.firstName }}
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                <div class="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  {{ userInfo.lastName }}
                </div>
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                <div class="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  {{ userInfo.email }}
                </div>
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                <div class="w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  {{ userInfo.phone }}
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Method -->
          <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Delivery Method
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                class="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200"
                :class="deliveryMethod === 'delivery' ? 'border-green-500 bg-green-50' : 'border-gray-300'"
                @click="deliveryMethod = 'delivery'"
              >
                <div class="flex items-center">
                  <div class="flex items-center justify-center h-5">
                    <input 
                      type="radio" 
                      id="delivery"
                      value="delivery"
                      v-model="deliveryMethod"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    >
                  </div>
                  <label for="delivery" class="ml-3 flex items-center cursor-pointer">
                    <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md mr-3">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span class="block text-sm font-medium text-gray-700">Home Delivery</span>
                  </label>
                </div>
                <p class="text-xs text-gray-500 mt-2 ml-7">We'll deliver to your selected address</p>
              </div>
              
              <div 
                class="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200"
                :class="deliveryMethod === 'pickup' ? 'border-green-500 bg-green-50' : 'border-gray-300'"
                @click="deliveryMethod = 'pickup'"
              >
                <div class="flex items-center">
                  <div class="flex items-center justify-center h-5">
                    <input 
                      type="radio" 
                      id="pickup"
                      value="pickup"
                      v-model="deliveryMethod"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    >
                  </div>
                  <label for="pickup" class="ml-3 flex items-center cursor-pointer">
                    <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md mr-3">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span class="block text-sm font-medium text-gray-700">Pickup</span>
                  </label>
                </div>
                <p class="text-xs text-gray-500 mt-2 ml-7">Pick up from our nearest farm location</p>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div v-if="deliveryMethod === 'delivery'" class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Shipping Address
            </h2>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Address</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  v-for="(address, index) in userAddresses" 
                  :key="index"
                  class="border rounded-lg p-3 cursor-pointer transition-all duration-200"
                  :class="selectedAddressIndex === index ? 'border-2 border-green-500 bg-green-50' : 'border-gray-300'"
                  @click="selectedAddressIndex = index"
                >
                  <div class="flex items-start">
                    <div class="flex items-center h-5 mt-0.5">
                      <input 
                        type="radio" 
                        :name="'address-' + index"
                        :checked="selectedAddressIndex === index"
                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      >
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-800">{{ address.name }}</p>
                      <p class="text-xs text-gray-600 mt-1">{{ address.street }}</p>
                      <p class="text-xs text-gray-600">{{ address.city }}, {{ address.province }} {{ address.postalCode }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea 
                  v-model="selectedAddress.street"
                  rows="3"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="Enter complete delivery address"
                ></textarea>
                <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  v-model="selectedAddress.city"
                  type="text" 
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="Enter city"
                >
                <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Province</label>
                <select 
                  v-model="selectedAddress.province"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                >
                  <option value="" disabled selected>Select province</option>
                  <option v-for="province in phProvinces" :key="province" :value="province">{{ province }}</option>
                </select>
                <p v-if="errors.province" class="text-red-500 text-xs mt-1">{{ errors.province }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input 
                  v-model="selectedAddress.postalCode"
                  type="text" 
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="Enter postal code"
                >
                <p v-if="errors.postalCode" class="text-red-500 text-xs mt-1">{{ errors.postalCode }}</p>
              </div>
            </div>
          </div>

          <!-- Pickup Information -->
          <div v-if="deliveryMethod === 'pickup'" class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pickup Location
            </h2>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Pickup Location</label>
              <div class="grid grid-cols-1 gap-3">
                <div 
                  v-for="(location, index) in pickupLocations" 
                  :key="index"
                  class="border rounded-lg p-3 cursor-pointer transition-all duration-200"
                  :class="selectedPickupIndex === index ? 'border-2 border-green-500 bg-green-50' : 'border-gray-300'"
                  @click="selectedPickupIndex = index"
                >
                  <div class="flex items-start">
                    <div class="flex items-center h-5 mt-0.5">
                      <input 
                        type="radio" 
                        :name="'pickup-' + index"
                        :checked="selectedPickupIndex === index"
                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      >
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-800">{{ location.name }}</p>
                      <p class="text-xs text-gray-600 mt-1">{{ location.address }}</p>
                      <p class="text-xs text-gray-600">{{ location.hours }}</p>
                      <p class="text-xs text-green-600 font-medium mt-1">{{ location.distance }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Method
            </h2>
            
            <div class="space-y-4">
              <div 
                v-for="method in paymentMethods" 
                :key="method.id"
                class="border border-gray-300 rounded-lg p-4 cursor-pointer transition-all duration-200"
                :class="{ 'border-2 border-green-500 bg-green-50': paymentMethod === method.id }"
                @click="paymentMethod = method.id"
              >
                <div class="flex items-center">
                  <div class="flex items-center justify-center h-5">
                    <input 
                      type="radio" 
                      :id="method.id"
                      :value="method.id"
                      v-model="paymentMethod"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    >
                  </div>
                  <label :for="method.id" class="ml-3 flex items-center cursor-pointer">
                    <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md mr-3">
                      <component :is="method.icon" class="w-5 h-5 text-gray-600" />
                    </div>
                    <span class="block text-sm font-medium text-gray-700">{{ method.name }}</span>
                  </label>
                </div>
                
                <!-- GCash specific fields -->
                <div v-if="paymentMethod === 'gcash'" class="mt-3 ml-7 pl-1 border-t border-gray-200 pt-3">
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">GCash Number</label>
                      <input 
                        v-model="gcashInfo.number"
                        type="tel" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="09XX XXX XXXX"
                      >
                      <p v-if="errors.gcashNumber" class="text-red-500 text-xs mt-1">{{ errors.gcashNumber }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <input 
                        v-model="gcashInfo.name"
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Name on account"
                      >
                      <p v-if="errors.gcashName" class="text-red-500 text-xs mt-1">{{ errors.gcashName }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Bank Transfer specific fields -->
                <div v-if="paymentMethod === 'bank'" class="mt-3 ml-7 pl-1 border-t border-gray-200 pt-3">
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      <select 
                        v-model="bankInfo.bankName"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="" disabled selected>Select bank</option>
                        <option value="BDO">BDO (Banco de Oro)</option>
                        <option value="BPI">BPI (Bank of the Philippine Islands)</option>
                        <option value="Metrobank">Metrobank</option>
                        <option value="Landbank">Landbank</option>
                        <option value="PNB">PNB (Philippine National Bank)</option>
                      </select>
                      <p v-if="errors.bankName" class="text-red-500 text-xs mt-1">{{ errors.bankName }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input 
                        v-model="bankInfo.accountNumber"
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="XXXX-XXXX-XXXX"
                      >
                      <p v-if="errors.accountNumber" class="text-red-500 text-xs mt-1">{{ errors.accountNumber }}</p>
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <input 
                        v-model="bankInfo.accountName"
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Name on account"
                      >
                      <p v-if="errors.accountName" class="text-red-500 text-xs mt-1">{{ errors.accountName }}</p>
                    </div>
                  </div>
                </div>

                <!-- Cash on Delivery specific note -->
                <div v-if="paymentMethod === 'cod'" class="mt-3 ml-7 pl-1 border-t border-gray-200 pt-3">
                  <p class="text-sm text-gray-600">
                    Pay with cash when your order is delivered. An additional ₱50 processing fee applies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Order Summary -->
        <div class="w-full lg:w-96 flex-shrink-0">
          <!-- Order Summary -->
          <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60 sticky top-24">
            <h2 class="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <!-- Items List -->
            <div class="max-h-64 overflow-y-auto pr-2 mb-4">
              <div v-for="item in checkoutItems" :key="item.id" class="flex items-start py-3 border-b border-gray-100 last:border-0">
                <div class="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-3">
                  <img :src="item.images[0]" :alt="item.type" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-800 truncate">{{ item.type }} - {{ item.breed }}</h4>
                  <p class="text-xs text-gray-600">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-gray-800 ml-2">₱{{ (item.price * item.quantity).toLocaleString() }}</div>
              </div>
            </div>
            
            <!-- Price Breakdown -->
            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              
              <div v-if="deliveryMethod === 'delivery'" class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">₱{{ shippingCost.toLocaleString() }}</span>
              </div>

              <div v-if="paymentMethod === 'cod'" class="flex justify-between text-sm">
                <span class="text-gray-600">COD Fee</span>
                <span class="font-medium">₱{{ codFee.toLocaleString() }}</span>
              </div>
              
              <div v-if="discount > 0" class="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₱{{ discount.toLocaleString() }}</span>
              </div>
              
              <div class="border-t border-gray-200 pt-2 mt-1">
                <div class="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>₱{{ totalPrice.toLocaleString() }}</span>
                </div>
              </div>
            </div>
            
            <!-- Delivery Method Summary -->
            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium text-gray-700 mb-1">
                {{ deliveryMethod === 'delivery' ? 'Delivery to:' : 'Pickup from:' }}
              </p>
              <p class="text-xs text-gray-600" v-if="deliveryMethod === 'delivery' && selectedAddress">
                {{ selectedAddress.street }}, {{ selectedAddress.city }}, {{ selectedAddress.province }}
              </p>
              <p class="text-xs text-gray-600" v-if="deliveryMethod === 'pickup' && selectedPickup">
                {{ selectedPickup.name }}, {{ selectedPickup.address }}
              </p>
            </div>
            
            <!-- Promo Code -->
            <div class="mb-4">
              <div class="flex items-center">
                <input 
                  v-model="promoCode"
                  type="text" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Promo code"
                >
                <button 
                  @click="applyPromoCode"
                  class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-r-lg hover:from-green-700 hover:to-emerald-700 transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
              <p v-if="promoMessage" class="text-xs mt-2" :class="promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'">
                {{ promoMessage.text }}
              </p>
            </div>
            
            <!-- Terms Agreement -->
            <div class="flex items-start mb-4">
              <input 
                id="termsAgreement"
                v-model="termsAgreed"
                type="checkbox" 
                class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 mt-1"
              >
              <label for="termsAgreement" class="ml-2 block text-xs text-gray-700">
                I agree to the <a href="#" class="text-green-600 hover:underline">Terms of Service</a> and <a href="#" class="text-green-600 hover:underline">Privacy Policy</a>. I understand that livestock purchases are subject to availability and health conditions at the time of delivery.
              </label>
            </div>
            <p v-if="errors.termsAgreed" class="text-red-500 text-xs mb-3">{{ errors.termsAgreed }}</p>
            
            <!-- Place Order Button -->
            <button 
              @click="placeOrder"
              :disabled="isProcessingOrder"
              class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isProcessingOrder" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isProcessingOrder ? 'Processing Order...' : `Place Order - ₱${totalPrice.toLocaleString()}` }}
            </button>
            
            <p class="text-xs text-gray-500 mt-3 text-center">
              Your order will be processed within 24 hours. A confirmation will be sent to your email.
            </p>
          </div>
          
          <!-- Back to Cart -->
          <div class="mt-4 text-center">
            <button @click="goBackToCart" class="inline-flex items-center text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <button 
              @click="goToOrderConfirmation"
              class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
            >
              View Order Details
            </button>
            <button 
              @click="goToMarketplace"
              class="w-full py-2.5 mt-3 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

// Icons for payment methods
const CreditCardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>`
};

const GcashIcon = {
  template: `<svg width="20" height="20" viewBox="0 0 256 318" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M84.7208 32.9288C38.0928 59.5488 0 92.1648 0 141.685C0 191.205 29.7568 218.934 76.3848 245.342C123.013 271.75 177.066 302.4 177.066 302.4L196.61 290.112C196.61 290.112 149.982 259.462 127.21 245.342C84.7208 220.266 51.2 197.606 51.2 141.685C51.2 85.7648 84.7208 63.1048 127.21 38.0288C149.982 23.9088 196.61 -6.74079 196.61 -6.74079L177.066 -19.0288C177.066 -19.0288 131.349 6.30879 84.7208 32.9288Z" fill="#00A99D"/>
    <path d="M196.61 290.112C196.61 290.112 242.327 264.874 288.845 238.256C335.473 211.636 365.23 183.907 365.23 134.387C365.23 84.8668 327.137 52.2508 280.509 25.6308C233.881 -0.989197 179.828 -31.6388 179.828 -31.6388L160.284 -19.3508C160.284 -19.3508 207.022 11.2992 229.683 25.6308C272.173 50.7068 305.804 73.3668 305.804 129.287C305.804 185.208 272.173 207.868 229.683 232.944C207.022 247.275 160.284 277.824 160.284 277.824L179.828 290.112C179.828 290.112 196.61 290.112 196.61 290.112Z" fill="#00A99D"/>
  </svg>`
};

const BankIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-8m-8 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
};

const CashIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
};

const router = useRouter();

interface CheckoutItem {
  id: number;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  maxQuantity: number;
  age: string;
  gender: string;
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  dateAdded: string;
  farmer: {
    id: number;
    name: string;
    farmName?: string;
    contact: string;
    address: string;
    avatar: string;
  };
  location: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Address {
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

interface PickupLocation {
  name: string;
  address: string;
  hours: string;
  distance: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: object;
}

interface Errors {
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  gcashNumber?: string;
  gcashName?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  termsAgreed?: string;
}

// Refs
const checkoutItems = ref<CheckoutItem[]>([]);
const userInfo = ref<UserInfo>({
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  email: 'juan.delacruz@example.com',
  phone: '+63 912 345 6789'
});
const deliveryMethod = ref<string>('delivery');
const selectedAddressIndex = ref(0);
const selectedPickupIndex = ref(0);
const paymentMethod = ref<string>('card');
const gcashInfo = ref({
  number: '',
  name: ''
});
const bankInfo = ref({
  bankName: '',
  accountNumber: '',
  accountName: ''
});
const promoCode = ref('');
const discount = ref(0);
const termsAgreed = ref(false);
const isProcessingOrder = ref(false);
const showSuccessModal = ref(false);
const orderId = ref('');
const errors = ref<Errors>({});

// Constants
const phProvinces = [
  'Abra', 'Agusan del Norte', 'Agusan del Sur', 'Aklan', 'Albay', 'Antique', 'Apayao', 'Aurora',
  'Basilan', 'Bataan', 'Batanes', 'Batangas', 'Benguet', 'Biliran', 'Bohol', 'Bukidnon',
  'Bulacan', 'Cagayan', 'Camarines Norte', 'Camarines Sur', 'Camiguin', 'Capiz', 'Catanduanes',
  'Cavite', 'Cebu', 'Cotabato', 'Davao de Oro', 'Davao del Norte', 'Davao del Sur', 'Davao Occidental',
  'Davao Oriental', 'Dinagat Islands', 'Eastern Samar', 'Guimaras', 'Ifugao', 'Ilocos Norte',
  'Ilocos Sur', 'Iloilo', 'Isabela', 'Kalinga', 'La Union', 'Laguna', 'Lanao del Norte',
  'Lanao del Sur', 'Leyte', 'Maguindanao', 'Marinduque', 'Masbate', 'Metro Manila', 'Misamis Occidental',
  'Misamis Oriental', 'Mountain Province', 'Negros Occidental', 'Negros Oriental', 'Northern Samar',
  'Nueva Ecija', 'Nueva Vizcaya', 'Occidental Mindoro', 'Oriental Mindoro', 'Palawan', 'Pampanga',
  'Pangasinan', 'Quezon', 'Quirino', 'Rizal', 'Romblon', 'Samar', 'Sarangani', 'Siquijor',
  'Sorsogon', 'South Cotabato', 'Southern Leyte', 'Sultan Kudarat', 'Sulu', 'Surigao del Norte',
  'Surigao del Sur', 'Tarlac', 'Tawi-Tawi', 'Zambales', 'Zamboanga del Norte', 'Zamboanga del Sur',
  'Zamboanga Sibugay'
]

const userAddresses = ref<Address[]>([
  {
    name: 'Home Address',
    street: '123 Main Street, Barangay 123',
    city: 'Quezon City',
    province: 'Metro Manila',
    postalCode: '1100'
  },
  {
    name: 'Work Address',
    street: '456 Office Building, Ayala Avenue',
    city: 'Makati City',
    province: 'Metro Manila',
    postalCode: '1200'
  },
  {
    name: 'Farm Address',
    street: '789 Farm Road, Rural Area',
    city: 'San Jose del Monte',
    province: 'Bulacan',
    postalCode: '3023'
  }
]);

const pickupLocations = ref<PickupLocation[]>([
  {
    name: 'Main Farm - Quezon City',
    address: '123 Agriculture Road, Barangay Farming, Quezon City',
    hours: 'Mon-Sat: 8:00 AM - 5:00 PM',
    distance: '5 km from your location'
  },
  {
    name: 'South Farm - Laguna',
    address: '456 Livestock Avenue, Calamba, Laguna',
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    distance: '45 km from your location'
  },
  {
    name: 'North Farm - Bulacan',
    address: '789 Poultry Street, San Jose del Monte, Bulacan',
    hours: 'Mon-Sat: 7:00 AM - 4:00 PM',
    distance: '25 km from your location'
  }
]);

const paymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCardIcon },
  { id: 'gcash', name: 'GCash', icon: GcashIcon },
  { id: 'bank', name: 'Bank Transfer', icon: BankIcon },
  { id: 'cod', name: 'Cash on Delivery', icon: CashIcon }
];

const shippingCost = ref(500); // Flat rate shipping
const codFee = ref(50); // Cash on delivery fee
const promoMessage = ref<{text: string, type: string} | null>(null);

// Computed properties
const selectedAddress = computed(() => {
  return userAddresses.value[selectedAddressIndex.value];
});

const selectedPickup = computed(() => {
  return pickupLocations.value[selectedPickupIndex.value];
});

const subtotal = computed(() => {
  return checkoutItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const totalPrice = computed(() => {
  let total = subtotal.value;
  
  if (deliveryMethod.value === 'delivery') {
    total += shippingCost.value;
  }
  
  if (paymentMethod.value === 'cod') {
    total += codFee.value;
  }
  
  total -= discount.value;
  
  return total;
});

// Methods
const loadCheckoutItems = () => {
  const savedItems = localStorage.getItem('checkoutItems');
  if (savedItems) {
    checkoutItems.value = JSON.parse(savedItems);
  } else {
    // Redirect to cart if no items to checkout
    router.push('/cart');
  }
};

const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  // Validate shipping info if delivery is selected
  if (deliveryMethod.value === 'delivery') {
    if (!selectedAddress.value.street.trim()) {
      errors.value.address = 'Address is required';
      isValid = false;
    }

    if (!selectedAddress.value.city.trim()) {
      errors.value.city = 'City is required';
      isValid = false;
    }

    if (!selectedAddress.value.province) {
      errors.value.province = 'Province is required';
      isValid = false;
    }

    if (!selectedAddress.value.postalCode.trim()) {
      errors.value.postalCode = 'Postal code is required';
      isValid = false;
    }
  }

  // Validate payment method specific fields
  if (paymentMethod.value === 'gcash') {
    if (!gcashInfo.value.number.trim()) {
      errors.value.gcashNumber = 'GCash number is required';
      isValid = false;
    } else if (!/^09\d{9}$/.test(gcashInfo.value.number.replace(/\D/g, ''))) {
      errors.value.gcashNumber = 'Please enter a valid Philippine mobile number';
      isValid = false;
    }

    if (!gcashInfo.value.name.trim()) {
      errors.value.gcashName = 'Account name is required';
      isValid = false;
    }
  }

  if (paymentMethod.value === 'bank') {
    if (!bankInfo.value.bankName) {
      errors.value.bankName = 'Bank name is required';
      isValid = false;
    }

    if (!bankInfo.value.accountNumber.trim()) {
      errors.value.accountNumber = 'Account number is required';
      isValid = false;
    }

    if (!bankInfo.value.accountName.trim()) {
      errors.value.accountName = 'Account name is required';
      isValid = false;
    }
  }

  // Validate terms agreement
  if (!termsAgreed.value) {
    errors.value.termsAgreed = 'You must agree to the terms and conditions';
    isValid = false;
  }

  return isValid;
};

const applyPromoCode = () => {
  const code = promoCode.value.trim().toUpperCase();
  promoMessage.value = null;

  if (code === 'LIVESTOCK10') {
    discount.value = subtotal.value * 0.1; // 10% discount
    promoMessage.value = { text: '10% discount applied!', type: 'success' };
  } else if (code === 'FREESHIP' && deliveryMethod.value === 'delivery') {
    discount.value = shippingCost.value; // Free shipping
    promoMessage.value = { text: 'Free shipping applied!', type: 'success' };
  } else if (code === 'FREESHIP' && deliveryMethod.value === 'pickup') {
    promoMessage.value = { text: 'Promo code not applicable for pickup', type: 'error' };
  } else if (code === 'NOCOD' && paymentMethod.value === 'cod') {
    discount.value = codFee.value; // No COD fee
    promoMessage.value = { text: 'COD fee waived!', type: 'success' };
  } else if (code === '') {
    promoMessage.value = { text: 'Please enter a promo code', type: 'error' };
  } else {
    promoMessage.value = { text: 'Invalid promo code', type: 'error' };
  }
};

const placeOrder = () => {
  if (!validateForm()) return;

  isProcessingOrder.value = true;

  // Generate a random order ID
  orderId.value = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  // Simulate API call
  setTimeout(() => {
    isProcessingOrder.value = false;
    showSuccessModal.value = true;

    // Clear checkout items from localStorage
    localStorage.removeItem('checkoutItems');
  }, 2000);
};

const goBackToCart = () => {
  router.push('/carts');
};

const goToOrderConfirmation = () => {
  // In a real app, you would navigate to an order confirmation page with the order ID
  router.push(`/order-confirmation/${orderId.value}`);
};

const goToMarketplace = () => {
  router.push('/marketplace');
};

// Watchers
watch(deliveryMethod, (newValue) => {
  // Reset discount when delivery method changes as some promos may not apply
  if (newValue === 'pickup' && promoMessage.value?.text === 'Free shipping applied!') {
    discount.value = 0;
    promoMessage.value = null;
  }
});

watch(paymentMethod, (newValue) => {
  // Reset discount when payment method changes as some promos may not apply
  if (newValue !== 'cod' && promoMessage.value?.text === 'COD fee waived!') {
    discount.value = 0;
    promoMessage.value = null;
  }
});

// Lifecycle hooks
onMounted(() => {
  loadCheckoutItems();
});
</script>