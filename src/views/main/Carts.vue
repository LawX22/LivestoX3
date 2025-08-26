<!-- Carts.vue -->
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
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold">Your Cart</h1>
            <p class="text-green-100 opacity-90">Manage your livestock selections</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="bg-white/20 px-3 py-1 rounded-lg text-sm font-semibold backdrop-blur-sm">
            {{ cartItems.length }} {{ cartItems.length === 1 ? 'Item' : 'Items' }}
          </span>
        </div>
      </div>

      <!-- Cart Content -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Cart Items -->
        <div class="flex-1">
          <!-- Empty State -->
          <div v-if="cartItems.length === 0" class="bg-white/95 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg border border-white/60">
            <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
            <p class="text-gray-600 mb-6">Browse our marketplace to add livestock to your cart</p>
            <router-link to="/marketplace" class="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Browse Marketplace
            </router-link>
          </div>

          <!-- Cart Items List -->
          <div v-else class="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 py-2" ref="scrollContainer">
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60 transition-all duration-300 hover:shadow-xl hover:border-green-200 relative group"
              :class="{ 'ring-2 ring-green-400': selectedItems.includes(item.id) }"
            >
              <!-- Top section with checkbox and delete button -->
              <div class="flex items-center justify-between mb-4">
                <!-- Selection Checkbox -->
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    :checked="selectedItems.includes(item.id)"
                    @change="toggleItemSelection(item.id)"
                    class="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                  >
                  <label class="ml-2 text-sm text-gray-600 cursor-pointer" @click="toggleItemSelection(item.id)">
                    Select for checkout
                  </label>
                </div>
                
                <!-- Delete Button -->
                <button 
                  @click="removeFromCart(item.id)"
                  class="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-sm font-medium transition-all duration-200 border border-red-200 hover:border-red-300 opacity-80 group-hover:opacity-100"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
              
              <div class="flex flex-col md:flex-row gap-5">
                <!-- Item Image -->
                <div class="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                  <img :src="item.images[0]" :alt="item.type" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>

                <!-- Item Details -->
                <div class="flex-1">
                  <div class="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
                    <div>
                      <h3 class="font-bold text-lg text-gray-800">{{ item.type }}</h3>
                      <p class="text-sm text-gray-600">{{ item.breed }}</p>
                    </div>
                    <div class="text-xl font-bold text-green-700">₱{{ (item.price * item.quantity).toLocaleString() }}</div>
                  </div>

                  <div class="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                    <div class="flex items-center bg-gray-50 px-2 py-1.5 rounded-lg">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {{ item.gender }}
                    </div>
                    <div class="flex items-center bg-gray-50 px-2 py-1.5 rounded-lg">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ item.age }}
                    </div>
                    <div class="flex items-center bg-gray-50 px-2 py-1.5 rounded-lg">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ item.location }}
                    </div>
                    <div class="flex items-center bg-gray-50 px-2 py-1.5 rounded-lg">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {{ item.status }}
                    </div>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                    <div class="flex items-center">
                      <span class="text-sm font-medium text-gray-700 mr-3">Quantity:</span>
                      <div class="flex items-center border border-gray-300 rounded-lg bg-white">
                        <button 
                          @click="updateQuantity(item.id, item.quantity - 1)" 
                          :disabled="item.quantity <= 1"
                          class="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span class="px-4 py-1.5 text-gray-800 font-medium border-l border-r border-gray-300">{{ item.quantity }}</span>
                        <button 
                          @click="updateQuantity(item.id, item.quantity + 1)" 
                          :disabled="item.quantity >= item.maxQuantity"
                          class="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                      <span class="text-xs text-gray-500 ml-2">Max: {{ item.maxQuantity }}</span>
                    </div>
                    <div class="text-sm text-gray-600 font-medium">
                      ₱{{ item.price.toLocaleString() }} each
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div v-if="cartItems.length > 0" class="w-full lg:w-80 flex-shrink-0">
          <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/60 sticky top-24">
            <h2 class="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal ({{ totalSelectedItems }} items)</span>
                <span class="font-medium">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              
              <div class="border-t border-gray-200 pt-3 mt-2">
                <div class="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>₱{{ totalPrice.toLocaleString() }}</span>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Items to Checkout</label>
              <div class="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  :checked="allItemsSelected"
                  @change="toggleAllItemsSelection"
                  class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  id="selectAllCheckbox"
                >
                <label for="selectAllCheckbox" class="text-sm text-gray-700 cursor-pointer">
                  Select all items ({{ selectedItems.length }}/{{ cartItems.length }})
                </label>
              </div>
            </div>
            
            <button 
              @click="proceedToCheckout" 
              class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isProcessingOrder || selectedItems.length === 0"
            >
              <svg v-if="isProcessingOrder" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isProcessingOrder ? 'Processing...' : `Checkout ${selectedItems.length} Item${selectedItems.length !== 1 ? 's' : ''}` }}
            </button>
            
            <p class="text-xs text-gray-500 mt-3 text-center">
              By completing your purchase you agree to our Terms of Service
            </p>
          </div>
          
          <!-- Continue Shopping -->
          <div class="mt-4 text-center">
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

    <!-- Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50 transition-opacity duration-300" :class="showToast ? 'opacity-100' : 'opacity-0'">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">Success!</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

interface CartItem {
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

const router = useRouter();
const cartItems = ref<CartItem[]>([]);
const isProcessingOrder = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const selectedItems = ref<number[]>([]);
const scrollContainer = ref<HTMLElement | null>(null);

// Example data function
const getExampleCartItems = (): CartItem[] => [
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
    id: 2,
    type: 'Goat',
    breed: 'Boer',
    weight: 35,
    quantity: 3,
    maxQuantity: 8,
    age: '12 months',
    gender: 'Female',
    status: 'Available',
    price: 8000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1543944165-ef2f5469bafe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Healthy Boer goats, excellent for meat production.',
    dateAdded: new Date(Date.now() - 86400000).toISOString(),
    farmer: {
      id: 3,
      name: 'Juan Dela Cruz',
      farmName: 'Dela Cruz Goat Farm',
      contact: '+63 921 555 1234',
      address: '456 Goat Street, Barangay Livestock, Bulacan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    location: 'Bulacan'
  },
  {
    id: 3,
    type: 'Pig',
    breed: 'Berkshire',
    weight: 80,
    quantity: 1,
    maxQuantity: 3,
    age: '8 months',
    gender: 'Male',
    status: 'Available',
    price: 12000,
    deliveryOptions: ['pickup', 'delivery'],
    images: [
      'https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Premium Berkshire pig, raised organically.',
    dateAdded: new Date(Date.now() - 172800000).toISOString(),
    farmer: {
      id: 4,
      name: 'Pedro Reyes',
      farmName: 'Reyes Swine Farm',
      contact: '+63 921 444 5678',
      address: '789 Pig Farm Road, Barangay Pork, Laguna',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    location: 'Laguna'
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
  },
  {
    id: 5,
    type: 'Buffalo',
    breed: 'Carabao',
    weight: 600,
    quantity: 1,
    maxQuantity: 2,
    age: '36 months',
    gender: 'Male',
    status: 'Available',
    price: 80000,
    deliveryOptions: ['pickup'],
    images: [
      'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    description: 'Strong and healthy carabao, excellent for farming work and milk production.',
    dateAdded: new Date(Date.now() - 432000000).toISOString(),
    farmer: {
      id: 6,
      name: 'Elena Mendoza',
      farmName: 'Mendoza Buffalo Ranch',
      contact: '+63 921 999 8877',
      address: '789 Buffalo Lane, Barangay Ranch, Nueva Ecija',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    },
    location: 'Nueva Ecija'
  }
];

// Computed properties
const subtotal = computed(() => {
  return cartItems.value
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((total, item) => total + (item.price * item.quantity), 0);
});

const totalPrice = computed(() => {
  return subtotal.value;
});

const totalSelectedItems = computed(() => {
  return cartItems.value
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((total, item) => total + item.quantity, 0);
});

const allItemsSelected = computed(() => {
  return selectedItems.value.length === cartItems.value.length && cartItems.value.length > 0;
});

// Methods
const loadCartItems = () => {
  const savedCart = localStorage.getItem('livestockCart');
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
  } else {
    // Load example data if no cart exists
    cartItems.value = getExampleCartItems();
    saveCartItems();
  }
};

const saveCartItems = () => {
  localStorage.setItem('livestockCart', JSON.stringify(cartItems.value));
};

const updateQuantity = (id: number, newQuantity: number) => {
  const item = cartItems.value.find(item => item.id === id);
  if (item) {
    // Ensure quantity is within valid range
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > item.maxQuantity) newQuantity = item.maxQuantity;
    
    item.quantity = newQuantity;
    saveCartItems();
    
    showToast.value = true;
    toastMessage.value = 'Quantity updated';
    setTimeout(() => showToast.value = false, 3000);
  }
};

const removeFromCart = (id: number) => {
  const index = cartItems.value.findIndex(item => item.id === id);
  if (index !== -1) {
    const removedItem = cartItems.value[index];
    cartItems.value.splice(index, 1);
    saveCartItems();
    
    // Remove from selected items if it was selected
    const selectedIndex = selectedItems.value.indexOf(id);
    if (selectedIndex !== -1) {
      selectedItems.value.splice(selectedIndex, 1);
    }
    
    showToast.value = true;
    toastMessage.value = `${removedItem.type} removed from cart`;
    setTimeout(() => showToast.value = false, 3000);
    
    // If cart is empty after deletion, load example data
    if (cartItems.value.length === 0) {
      setTimeout(() => {
        cartItems.value = getExampleCartItems();
        saveCartItems();
        showToast.value = true;
        toastMessage.value = 'Example items loaded';
        setTimeout(() => showToast.value = false, 3000);
      }, 1500);
    }
  }
};

const toggleItemSelection = (id: number) => {
  const index = selectedItems.value.indexOf(id);
  if (index === -1) {
    selectedItems.value.push(id);
  } else {
    selectedItems.value.splice(index, 1);
  }
};

const toggleAllItemsSelection = () => {
  if (allItemsSelected.value) {
    // Deselect all items
    selectedItems.value = [];
  } else {
    // Select all items
    selectedItems.value = cartItems.value.map(item => item.id);
  }
};

const proceedToCheckout = () => {
  if (selectedItems.value.length === 0) return;
  
  isProcessingOrder.value = true;
  
  // Get selected items data
  const selectedItemsData = cartItems.value.filter(item => selectedItems.value.includes(item.id));
  
  // Store selected items in localStorage for checkout page
  localStorage.setItem('checkoutItems', JSON.stringify(selectedItemsData));
  
  // Simulate processing delay
  setTimeout(() => {
    isProcessingOrder.value = false;
    
    // Navigate to checkout page
    router.push('/checkOut');
  }, 1000);
};

// Lifecycle hooks
onMounted(() => {
  loadCartItems();
});
</script>

