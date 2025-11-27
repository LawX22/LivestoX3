<!-- Cart.vue - Compact Design -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden">
    <!-- Enhanced Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl animate-pulse" style="animation-delay: 0.5s"></div>
      <div class="absolute bottom-1/3 left-1/4 w-28 h-28 bg-green-300/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 py-4 max-w-7xl">
      <!-- Enhanced Page Header -->
      <div class="bg-white/80 backdrop-blur-xl rounded-xl mb-4 shadow-lg border border-white/50 overflow-hidden">
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-md">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-lg font-bold text-white mb-0.5">Shopping Cart</h1>
                <p class="text-green-100 text-xs font-medium">
                  {{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'items' }} in your cart
                </p>
              </div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 shadow-md">
              <p class="text-xs text-green-100 mb-0.5">Total Amount</p>
              <p class="text-lg font-bold text-white">₱{{ totalPrice.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Content -->
      <div class="flex flex-col xl:flex-row gap-4">
        <!-- Cart Items Section -->
        <div class="flex-1">
          <!-- Empty State -->
          <div v-if="cartItems.length === 0" class="bg-white/80 backdrop-blur-xl rounded-xl p-8 text-center shadow-lg border border-white/50">
            <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Your Cart is Empty</h3>
            <p class="text-gray-600 mb-4 text-sm max-w-md mx-auto">Start adding premium livestock to your cart and build your farm today!</p>
            <router-link to="/marketplace" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Browse Marketplace
            </router-link>
          </div>

          <!-- Cart Items List -->
          <div v-else class="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar" ref="scrollContainer">
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="bg-white/80 backdrop-blur-xl rounded-xl p-4 shadow-md border border-white/50 transition-all duration-300 hover:shadow-lg hover:border-green-200 relative group"
              :class="{ 'ring-2 ring-green-500 bg-green-50/50 shadow-green-100': selectedItems.includes(item.id) }"
            >
              <!-- Header with checkbox and remove -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    :checked="selectedItems.includes(item.id)"
                    @change="toggleItemSelection(item.id)"
                    class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer transition-all"
                  >
                  <label class="text-xs text-gray-700 font-medium cursor-pointer select-none" @click="toggleItemSelection(item.id)">
                    Select Item
                  </label>
                </div>
                
                <button 
                  @click="removeFromCart(item.id)"
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-xs font-semibold transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md opacity-70 group-hover:opacity-100"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
              
              <div class="flex gap-3">
                <!-- Enhanced item image -->
                <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-sm ring-2 ring-white">
                  <img :src="item.images[0]" :alt="item.type" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>

                <!-- Enhanced item details -->
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-2">
                    <div class="min-w-0 flex-1">
                      <h3 class="font-bold text-base text-gray-900 mb-0.5">{{ item.type }} - {{ item.breed }}</h3>
                      <div class="flex items-center gap-1.5 text-xs text-gray-600">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {{ item.location }}
                      </div>
                    </div>
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 px-3 py-1.5 rounded-lg border border-green-200 ml-2">
                      <p class="text-xs text-green-700 font-medium mb-0">Subtotal</p>
                      <p class="text-base font-bold text-green-700">₱{{ (item.price * item.quantity).toLocaleString() }}</p>
                    </div>
                  </div>

                  <!-- Enhanced info grid -->
                  <div class="grid grid-cols-3 gap-1.5 mb-3">
                    <div class="flex items-center gap-1.5 bg-gradient-to-br from-blue-50 to-blue-100/50 px-2 py-1.5 rounded-lg border border-blue-200">
                      <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p class="text-xs text-blue-600 font-medium">{{ item.gender }}</p>
                    </div>
                    <div class="flex items-center gap-1.5 bg-gradient-to-br from-purple-50 to-purple-100/50 px-2 py-1.5 rounded-lg border border-purple-200">
                      <svg class="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p class="text-xs text-purple-600 font-medium">{{ item.age }}</p>
                    </div>
                    <div class="flex items-center gap-1.5 bg-gradient-to-br from-amber-50 to-amber-100/50 px-2 py-1.5 rounded-lg border border-amber-200">
                      <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <p class="text-xs text-amber-600 font-medium">{{ item.weight }}kg</p>
                    </div>
                  </div>

                  <!-- Enhanced quantity controls -->
                  <div class="flex items-center justify-between bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-gray-700">Quantity:</span>
                      <div class="flex items-center border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                        <button 
                          @click="updateQuantity(item.id, item.quantity - 1)" 
                          :disabled="item.quantity <= 1"
                          class="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-green-600"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span class="px-4 py-1 text-gray-900 font-bold text-sm border-l-2 border-r-2 border-gray-300 min-w-[50px] text-center">{{ item.quantity }}</span>
                        <button 
                          @click="updateQuantity(item.id, item.quantity + 1)" 
                          :disabled="item.quantity >= item.maxQuantity"
                          class="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:text-green-600"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                      <span class="text-xs text-gray-500 font-medium">Max: {{ item.maxQuantity }}</span>
                    </div>
                    <div class="text-right">
                      <p class="text-xs text-gray-500 mb-0">Price per unit</p>
                      <p class="text-sm text-gray-700 font-bold">₱{{ item.price.toLocaleString() }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Order Summary -->
        <div v-if="cartItems.length > 0" class="w-full xl:w-80 flex-shrink-0">
          <div class="bg-white/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/50 sticky top-4">
            <div class="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-100">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>
            </div>
            
            <div class="space-y-3 mb-4">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600 font-medium">Subtotal</span>
                <span class="font-semibold text-gray-900">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-500">Total items</span>
                <span class="text-gray-700 font-medium">{{ totalSelectedItems }}</span>
              </div>
              
              <div class="border-t-2 border-gray-100 pt-3 mt-3">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-base font-bold text-gray-900">Total</span>
                  <span class="text-xl font-bold text-green-600">₱{{ totalPrice.toLocaleString() }}</span>
                </div>
                <p class="text-xs text-gray-500 text-right">Tax included where applicable</p>
              </div>
            </div>
            
            <div class="mb-4 p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
              <div class="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  :checked="allItemsSelected"
                  @change="toggleAllItemsSelection"
                  class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  id="selectAllCheckbox"
                >
                <label for="selectAllCheckbox" class="text-sm text-gray-800 font-semibold cursor-pointer select-none">
                  Select all items
                </label>
              </div>
              <p class="text-xs text-gray-600 ml-6">{{ selectedItems.length }} of {{ cartItems.length }} items selected</p>
            </div>
            
            <button 
              @click="proceedToCheckout" 
              class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm transform hover:-translate-y-0.5"
              :disabled="isProcessingOrder || selectedItems.length === 0"
            >
              <svg v-if="isProcessingOrder" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isProcessingOrder ? 'Processing...' : `Proceed to Checkout (${selectedItems.length})` }}
            </button>
          </div>
          
          <!-- Continue Shopping -->
          <div class="mt-4 text-center">
            <router-link to="/marketplace" class="inline-flex items-center text-sm text-green-600 hover:text-green-700 font-semibold transition-colors gap-2 hover:gap-3 duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Success Toast -->
    <transition name="toast">
      <div v-if="showToast" class="fixed top-4 right-4 z-50 max-w-sm">
        <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-green-200 p-4 transform transition-all duration-300">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-bold text-gray-900 mb-0.5">Success!</h4>
              <p class="text-xs text-gray-700">{{ toastMessage }}</p>
            </div>
            <button @click="showToast = false" class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { CartItem } from '@/types/cartTypes'

const router = useRouter()

// Refs with typed interfaces
const cartItems = ref<CartItem[]>([])
const isProcessingOrder = ref<boolean>(false)
const showToast = ref<boolean>(false)
const toastMessage = ref<string>('')
const selectedItems = ref<number[]>([])
const scrollContainer = ref<HTMLElement | null>(null)

// Sample cart items data matching Animal/CartItem interface
const sampleCartItems: CartItem[] = [
  {
    id: 1,
    uuid: 'cart-001',
    title: 'Premium Angus Cattle',
    type: 'Cattle',
    breed: 'Angus',
    weight: 450,
    weightUnit: 'kg',
    quantity: 2,
    originalQuantity: 5,
    maxQuantity: 5,
    age: '24 months',
    gender: 'Male',
    status: 'Available',
    healthStatus: ['Vaccinated', 'Dewormed'],
    price: 45000,
    priceUnit: 'per head',
    deliveryOptions: ['pickup', 'delivery'],
    paymentMethods: ['cash', 'bank_transfer'],
    images: [
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Healthy Angus cattle, vaccinated and dewormed. Raised in open pasture with organic feed.',
    datePosted: new Date(Date.now() - 604800000).toISOString(),
    dateAdded: new Date().toISOString(),
    farmer: {
      id: 2,
      name: 'Maria Santos',
      farmName: 'Santos Ranch',
      contact: '+63 921 777 8888',
      email: 'maria.santos@example.com',
      address: '123 Poultry Lane, Barangay Fowl, Pampanga',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    location: 'Pampanga',
    isAuction: false
  },
  {
    id: 4,
    uuid: 'cart-004',
    title: 'Native Chicken Batch',
    type: 'Chicken',
    breed: 'Native',
    weight: 1.2,
    weightUnit: 'kg',
    quantity: 10,
    originalQuantity: 20,
    maxQuantity: 20,
    age: '6 months',
    gender: 'Mixed',
    status: 'Available',
    healthStatus: ['Healthy', 'Active'],
    price: 350,
    priceUnit: 'per head',
    deliveryOptions: ['pickup', 'delivery'],
    paymentMethods: ['cash', 'gcash'],
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Free-range native chickens, healthy and active.',
    datePosted: new Date(Date.now() - 259200000).toISOString(),
    dateAdded: new Date(Date.now() - 259200000).toISOString(),
    farmer: {
      id: 5,
      name: 'Lorna Tolentino',
      farmName: 'Tolentino Poultry',
      contact: '+63 921 333 9012',
      email: 'lorna.tolentino@example.com',
      address: '321 Poultry Avenue, Barangay Fowl, Batangas',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    location: 'Batangas',
    isAuction: false
  }
]

// Computed properties with proper return types
const subtotal = computed((): number => {
  return cartItems.value
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((total, item) => total + (item.price * item.quantity), 0)
})

const totalPrice = computed((): number => {
  return subtotal.value
})

const totalSelectedItems = computed((): number => {
  return cartItems.value
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((total, item) => total + item.quantity, 0)
})

const allItemsSelected = computed((): boolean => {
  return selectedItems.value.length === cartItems.value.length && cartItems.value.length > 0
})

// Methods with proper typing
const loadCartItems = (): void => {
  // Load sample data instead of localStorage
  cartItems.value = [...sampleCartItems]
}

const updateQuantity = (id: number, newQuantity: number): void => {
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    // Ensure quantity is within valid range
    if (newQuantity < 1) newQuantity = 1
    if (newQuantity > item.maxQuantity) newQuantity = item.maxQuantity
    
    item.quantity = newQuantity
    
    showToast.value = true
    toastMessage.value = 'Quantity updated successfully'
    setTimeout(() => showToast.value = false, 3000)
  }
}

const removeFromCart = (id: number): void => {
  const index = cartItems.value.findIndex(item => item.id === id)
  if (index !== -1) {
    const removedItem = cartItems.value[index]
    cartItems.value.splice(index, 1)
    
    // Remove from selected items if it was selected
    const selectedIndex = selectedItems.value.indexOf(id)
    if (selectedIndex !== -1) {
      selectedItems.value.splice(selectedIndex, 1)
    }
    
    showToast.value = true
    toastMessage.value = `${removedItem.type} removed from cart`
    setTimeout(() => showToast.value = false, 3000)
  }
}

const toggleItemSelection = (id: number): void => {
  const index = selectedItems.value.indexOf(id)
  if (index === -1) {
    selectedItems.value.push(id)
  } else {
    selectedItems.value.splice(index, 1)
  }
}

const toggleAllItemsSelection = (): void => {
  if (allItemsSelected.value) {
    // Deselect all items
    selectedItems.value = []
  } else {
    // Select all items
    selectedItems.value = cartItems.value.map(item => item.id)
  }
}

const proceedToCheckout = (): void => {
  if (selectedItems.value.length === 0) return
  
  isProcessingOrder.value = true
  
  // Get selected items data
  const selectedItemsData = cartItems.value.filter(item => selectedItems.value.includes(item.id))
  
  // Save to localStorage for checkout page
  localStorage.setItem('checkoutItems', JSON.stringify(selectedItemsData))
  
  // Simulate processing delay
  setTimeout(() => {
    isProcessingOrder.value = false
    
    // Navigate to checkout page
    router.push('/checkOut')
  }, 1000)
}

// Lifecycle hooks
onMounted(() => {
  loadCartItems()
})
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

/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>