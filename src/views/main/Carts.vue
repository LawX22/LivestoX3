<!-- Cart.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-8 h-8 bg-green-300/20 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-12 h-12 bg-teal-300/15 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-4 h-4 bg-green-400/20 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-3 py-4 max-w-7xl">
      <!-- Compact Page Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-lg mb-4 shadow-md border border-green-200 flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold">Shopping Cart</h1>
            <p class="text-green-100 opacity-90 text-xs">{{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'items' }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="bg-white/20 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
            ₱{{ totalPrice.toLocaleString() }}
          </span>
        </div>
      </div>

      <!-- Cart Content -->
      <div class="flex flex-col xl:flex-row gap-4">
        <!-- Cart Items -->
        <div class="flex-1">
          <!-- Empty State -->
          <div v-if="cartItems.length === 0" class="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-md border border-white/50">
            <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Cart is empty</h3>
            <p class="text-gray-600 mb-4 text-sm">Browse marketplace to add livestock</p>
            <router-link to="/marketplace" class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Browse Marketplace
            </router-link>
          </div>

          <!-- Compact Cart Items List -->
          <div v-else class="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-1" ref="scrollContainer">
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-white/50 transition-all duration-300 hover:shadow-lg hover:border-green-200 relative group"
              :class="{ 'ring-1 ring-green-400 bg-green-50/50': selectedItems.includes(item.id) }"
            >
              <!-- Compact header with checkbox and delete -->
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    :checked="selectedItems.includes(item.id)"
                    @change="toggleItemSelection(item.id)"
                    class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                  >
                  <label class="ml-2 text-xs text-gray-600 cursor-pointer" @click="toggleItemSelection(item.id)">
                    Select
                  </label>
                </div>
                
                <button 
                  @click="removeFromCart(item.id)"
                  class="flex items-center gap-1 px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded text-xs font-medium transition-all duration-200 border border-red-200 hover:border-red-300 opacity-70 group-hover:opacity-100"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
              
              <div class="flex gap-3">
                <!-- Smaller item image -->
                <div class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                  <img :src="item.images[0]" :alt="item.type" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>

                <!-- Compact item details -->
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-2">
                    <div class="min-w-0 flex-1">
                      <h3 class="font-bold text-sm text-gray-800 truncate">{{ item.type }} - {{ item.breed }}</h3>
                      <p class="text-xs text-gray-500">{{ item.location }}</p>
                    </div>
                    <div class="text-sm font-bold text-green-700 ml-2">₱{{ (item.price * item.quantity).toLocaleString() }}</div>
                  </div>

                  <!-- Compact info grid -->
                  <div class="grid grid-cols-2 gap-1 mb-2 text-xs text-gray-600">
                    <div class="flex items-center bg-gray-50 px-2 py-1 rounded">
                      <svg class="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span class="truncate">{{ item.gender }}</span>
                    </div>
                    <div class="flex items-center bg-gray-50 px-2 py-1 rounded">
                      <svg class="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="truncate">{{ item.age }}</span>
                    </div>
                  </div>

                  <!-- Compact quantity controls -->
                  <div class="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <div class="flex items-center">
                      <span class="text-xs font-medium text-gray-700 mr-2">Qty:</span>
                      <div class="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                          @click="updateQuantity(item.id, item.quantity - 1)" 
                          :disabled="item.quantity <= 1"
                          class="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span class="px-3 py-1 text-gray-800 font-medium text-sm border-l border-r border-gray-300">{{ item.quantity }}</span>
                        <button 
                          @click="updateQuantity(item.id, item.quantity + 1)" 
                          :disabled="item.quantity >= item.maxQuantity"
                          class="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                      <span class="text-xs text-gray-500 ml-1">Max: {{ item.maxQuantity }}</span>
                    </div>
                    <div class="text-xs text-gray-600 font-medium">
                      ₱{{ item.price.toLocaleString() }} each
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Compact Order Summary -->
        <div v-if="cartItems.length > 0" class="w-full xl:w-72 flex-shrink-0">
          <div class="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/50 sticky top-20">
            <h2 class="text-base font-bold text-gray-800 mb-3">Order Summary</h2>
            
            <div class="space-y-2 mb-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal ({{ totalSelectedItems }} items)</span>
                <span class="font-medium">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              
              <div class="border-t border-gray-200 pt-2 mt-2">
                <div class="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span class="text-green-700">₱{{ totalPrice.toLocaleString() }}</span>
                </div>
              </div>
            </div>
            
            <div class="mb-3">
              <div class="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  :checked="allItemsSelected"
                  @change="toggleAllItemsSelection"
                  class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  id="selectAllCheckbox"
                >
                <label for="selectAllCheckbox" class="text-sm text-gray-700 cursor-pointer">
                  Select all ({{ selectedItems.length }}/{{ cartItems.length }})
                </label>
              </div>
            </div>
            
            <button 
              @click="proceedToCheckout" 
              class="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              :disabled="isProcessingOrder || selectedItems.length === 0"
            >
              <svg v-if="isProcessingOrder" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isProcessingOrder ? 'Processing...' : `Checkout (${selectedItems.length})` }}
            </button>
            
            <p class="text-xs text-gray-500 mt-2 text-center">
              Secure checkout with terms agreement
            </p>
          </div>
          
          <!-- Continue Shopping -->
          <div class="mt-3 text-center">
            <router-link to="/marketplace" class="inline-flex items-center text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Compact Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50 transition-opacity duration-300" :class="showToast ? 'opacity-100' : 'opacity-0'">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-2 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { CartItem } from '../../services/cart';

const router = useRouter();

// Refs with typed interfaces
const cartItems = ref<CartItem[]>([]);
const isProcessingOrder = ref<boolean>(false);
const showToast = ref<boolean>(false);
const toastMessage = ref<string>('');
const selectedItems = ref<number[]>([]);
const scrollContainer = ref<HTMLElement | null>(null);

// Sample cart items data (replaces localStorage)
const sampleCartItems: CartItem[] = [
  {
    id: 1,
    type: 'Cattle',
    breed: 'Angus',
    weight: 450,
    quantity: 2,
    maxQuantity: 5,
    age: '24 months',
    gender: 'Male',
    status: 'Available',
    price: 45000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Healthy Angus cattle, vaccinated and dewormed. Raised in open pasture with organic feed.',
    dateAdded: new Date().toISOString(),
    farmer: {
      id: 2,
      name: 'Maria Santos',
      farmName: 'Santos Ranch',
      contact: '+63 921 777 8888',
      address: '123 Poultry Lane, Barangay Fowl, Pampanga',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    location: 'Pampanga'
  },
  {
    id: 4,
    type: 'Chicken',
    breed: 'Native',
    weight: 1.2,
    quantity: 10,
    maxQuantity: 20,
    age: '6 months',
    gender: 'Mixed',
    status: 'Available',
    price: 350,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Free-range native chickens, healthy and active.',
    dateAdded: new Date(Date.now() - 259200000).toISOString(),
    farmer: {
      id: 5,
      name: 'Lorna Tolentino',
      farmName: 'Tolentino Poultry',
      contact: '+63 921 333 9012',
      address: '321 Poultry Avenue, Barangay Fowl, Batangas',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    location: 'Batangas'
  }
];

// Computed properties with proper return types
const subtotal = computed((): number => {
  return cartItems.value
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((total, item) => total + (item.price * item.quantity), 0);
});

const totalPrice = computed((): number => {
  return subtotal.value;
});

const totalSelectedItems = computed((): number => {
  return cartItems.value
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((total, item) => total + item.quantity, 0);
});

const allItemsSelected = computed((): boolean => {
  return selectedItems.value.length === cartItems.value.length && cartItems.value.length > 0;
});

// Methods with proper typing
const loadCartItems = (): void => {
  // Load sample data instead of localStorage
  cartItems.value = [...sampleCartItems];
};

const updateQuantity = (id: number, newQuantity: number): void => {
  const item = cartItems.value.find(item => item.id === id);
  if (item) {
    // Ensure quantity is within valid range
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > item.maxQuantity) newQuantity = item.maxQuantity;
    
    item.quantity = newQuantity;
    
    showToast.value = true;
    toastMessage.value = 'Quantity updated';
    setTimeout(() => showToast.value = false, 3000);
  }
};

const removeFromCart = (id: number): void => {
  const index = cartItems.value.findIndex(item => item.id === id);
  if (index !== -1) {
    const removedItem = cartItems.value[index];
    cartItems.value.splice(index, 1);
    
    // Remove from selected items if it was selected
    const selectedIndex = selectedItems.value.indexOf(id);
    if (selectedIndex !== -1) {
      selectedItems.value.splice(selectedIndex, 1);
    }
    
    showToast.value = true;
    toastMessage.value = `${removedItem.type} removed from cart`;
    setTimeout(() => showToast.value = false, 3000);
  }
};

const toggleItemSelection = (id: number): void => {
  const index = selectedItems.value.indexOf(id);
  if (index === -1) {
    selectedItems.value.push(id);
  } else {
    selectedItems.value.splice(index, 1);
  }
};

const toggleAllItemsSelection = (): void => {
  if (allItemsSelected.value) {
    // Deselect all items
    selectedItems.value = [];
  } else {
    // Select all items
    selectedItems.value = cartItems.value.map(item => item.id);
  }
};

const proceedToCheckout = (): void => {
  if (selectedItems.value.length === 0) return;
  
  isProcessingOrder.value = true;
  
  // Get selected items data
  const selectedItemsData = cartItems.value.filter(item => selectedItems.value.includes(item.id));
  
  // Simulate processing delay
  setTimeout(() => {
    isProcessingOrder.value = false;
    
    // Navigate to checkout page with selected items as query parameter
    router.push({
      path: '/checkOut',
      query: {
        items: JSON.stringify(selectedItemsData.map(item => item.id))
      }
    });
  }, 1000);
};

// Lifecycle hooks
onMounted(() => {
  loadCartItems();
});
</script>